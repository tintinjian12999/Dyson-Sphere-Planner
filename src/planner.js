import { RECIPES, MACHINES, EFFECTS, machineFor } from './data.js';
import { normalizeState } from './state.js';
import { planMachineTransport } from './transport.js';

export function effectFor(state, id) {
  const requested = state.overrides[id] ?? state.proliferation;
  const recipe = RECIPES[id];
  const canSpray = MACHINES[machineFor(recipe,state.equipment)]?.modules && Object.keys(recipe.inputs).length;
  const choice = !canSpray ? {tier:0,mode:requested.mode} : requested.tier && requested.mode==='products' && !recipe.canProliferate ? {...requested,mode:'speed'} : requested;
  const effect = choice.tier ? EFFECTS[`proliferator-${choice.tier}-${choice.mode}`] : {};
  return {...choice, requested, fallback:requested.tier>0 && (requested.tier!==choice.tier || requested.mode!==choice.mode),
    yield:1+(effect.productivity??0),speed:1+(effect.speed??0),sprays:effect.sprays??0,energy:1+(effect.consumption??0)};
}

export function solvePlan(input) {
  const state=normalizeState(input),jobs=new Map(),active=new Set();
  function visit(id) {
    const base=RECIPES[id];
    if (!base) return;
    if (active.has(base.recipeId)) throw new Error('預設配方存在循環，需要指定外部供應或替代配方。');
    if (jobs.has(base.recipeId)) return;
    active.add(base.recipeId);
    const primary=base.outputs[state.target] ? state.target : base.primary;
    const recipe={...base,id:primary,output:base.outputs[primary],machine:machineFor(base,state.equipment)};
    jobs.set(base.recipeId,{id:primary,recipe,effect:effectFor(state,primary),crafts:0});
    for (const item of Object.keys(recipe.inputs)) visit(item);
    active.delete(base.recipeId);
  }
  visit(state.target);
  const all=[...jobs.values()];
  function demands() {
    const result={[state.target]:state.rate};
    for (const j of all) for (const [id,q] of Object.entries(j.recipe.inputs)) result[id]=(result[id]??0)+q*j.crafts;
    return result;
  }
  // Canonical routes are acyclic. Credit secondary products before expanding their primary provider.
  let demand,converged=false;
  for (let iteration=0;iteration<256;iteration++) {
    demand=demands();
    const coproducts={};
    for (const j of all) for (const [id,q] of Object.entries(j.recipe.outputs)) if (RECIPES[id]?.recipeId!==j.recipe.recipeId) coproducts[id]=(coproducts[id]??0)+q*j.crafts*j.effect.yield;
    const next=all.map(j=>Math.max(0,...Object.entries(j.recipe.outputs).filter(([id])=>RECIPES[id]?.recipeId===j.recipe.recipeId)
      .map(([id,q])=>((demand[id]??0)-(state.supplies[id]??0)-(coproducts[id]??0))/(q*j.effect.yield))));
    const delta=Math.max(0,...all.map((j,i)=>Math.abs(j.crafts-next[i])/Math.max(1,next[i])));
    all.forEach((j,i)=>{j.crafts=next[i];});
    if (delta<1e-13) {converged=true;break;}
  }
  if (!converged) throw new Error('共同產物平衡未收斂，無法產生可靠計畫。');
  demand=demands();
  const blocks=all.filter(j=>j.crafts>1e-12).map(j=>{
    const {id,recipe,effect,crafts}=j,nominalCrafts=60*MACHINES[recipe.machine].speed*effect.speed/recipe.time;
    const transport=planMachineTransport(recipe,effect,nominalCrafts,state.equipment),craftsPerMachine=nominalCrafts*transport.ratio;
    const outputs=Object.fromEntries(Object.entries(recipe.outputs).map(([item,q])=>[item,q*crafts*effect.yield]));
    const output=outputs[id],perMachine=craftsPerMachine*recipe.output*effect.yield,exactMachines=crafts/craftsPerMachine,count=Math.ceil(exactMachines-1e-10);
    const inputs=Object.fromEntries(Object.entries(recipe.inputs).map(([item,q])=>[item,q*crafts]));
    return {id,recipe,effect,crafts,inputs,outputs,output,demand:demand[id]??0,transport,equipment:{...state.equipment},craftsPerMachine,perMachine,
      count,exactMachines,capacity:count*perMachine,utilization:exactMachines/count,nominalPerMachine:nominalCrafts*recipe.output*effect.yield,
      nominalCapacity:count*nominalCrafts*recipe.output*effect.yield,sprayRate:effect.tier?Object.values(inputs).reduce((a,b)=>a+b,0)/effect.sprays:0,
      planetId:state.planetId,sourceType:'production',rowSize:state.rowSizeOverrides[id]??state.rowSize,
      layout:state.layoutOverrides[id]??state.layout,logistics:state.logisticsOverrides[id]??state.logistics};
  }).reverse();
  const byId=Object.fromEntries(blocks.map(b=>[b.id,b])),external={},edges=[],surplus=[];
  const addExternal=(item,rate)=>{external[item]=(external[item]??0)+rate;};
  for (const item of new Set([...Object.keys(demand),...blocks.flatMap(b=>Object.keys(b.outputs))])) {
    const pools=blocks.filter(b=>b.outputs[item]).map(b=>({source:b.id,left:b.outputs[item],secondary:b.recipe.recipeId!==RECIPES[item]?.recipeId})).sort((a,b)=>Number(b.secondary)-Number(a.secondary));
    let supplied=Math.min(state.supplies[item]??0,demand[item]??0);
    const consumers=blocks.filter(b=>b.inputs[item]).map(b=>({target:b.id,rate:b.inputs[item]}));
    if (item===state.target) consumers.push({target:null,rate:state.rate});
    for (const consumer of consumers) {
      let left=consumer.rate;
      const allocate=(source,rate)=>{if (rate>1e-10 && consumer.target) edges.push({source,target:consumer.target,item,rate,kind:'ingredient'});left-=rate;};
      const existing=Math.min(left,supplied);supplied-=existing;
      if (existing>0) {addExternal(item,existing);allocate(`external:${item}`,existing);}
      for (const pool of pools) {const used=Math.max(0,Math.min(left,pool.left));pool.left-=used;allocate(pool.source,used);}
      if (left>1e-8) {addExternal(item,left);allocate(`external:${item}`,left);}
    }
    const excess=pools.reduce((n,p)=>n+p.left,0);
    if (excess>1e-8) surplus.push({item,rate:excess});
  }
  // Spray consumables remain explicitly external, even when a proliferator is the target.
  for (const b of blocks) if (b.sprayRate) {
    const item=`proliferator-${b.effect.tier}`;addExternal(item,b.sprayRate);
    edges.push({source:`external:${item}`,target:b.id,item,rate:b.sprayRate,kind:'spray'});
  }
  const sources=Object.entries(external).map(([item,rate])=>({id:`external:${item}`,item,rate,sourceType:'external'}));
  return {state,blocks,byId,edges,sources,demand,surplus,totalMachines:blocks.reduce((n,b)=>n+b.count,0),
    rawRate:sources.filter(s=>!s.item.startsWith('proliferator')).reduce((n,s)=>n+s.rate,0),sprayRate:blocks.reduce((n,b)=>n+b.sprayRate,0)};
}
