import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS, TARGETS, RECIPES, nameOf, DEFAULT_EQUIPMENT } from '../src/data.js';
import { defaultState, normalizeState } from '../src/state.js';
import { solvePlan } from '../src/planner.js';
import { planTemplate, cellGeometry, layoutTotals } from '../src/templates.js';
import { graphPositions, layoutSVG, layoutDetails, icon } from '../src/render.js';

const close = (a,b) => assert.ok(Math.abs(a-b) <= 1e-7*Math.max(1,Math.abs(a),Math.abs(b)), `${a} != ${b}`);
const solve = (target, extra={}) => solvePlan({...defaultState(),target,rate:60,...extra});
function assertBalance(p) {
  const balance = {[p.state.target]:-p.state.rate};
  const add = (id,rate) => { balance[id]=(balance[id]??0)+rate; };
  for (const b of p.blocks) {
    for (const [id,rate] of Object.entries(b.inputs)) add(id,-rate);
    for (const [id,rate] of Object.entries(b.outputs)) add(id,rate);
    if (b.sprayRate) add(`proliferator-${b.effect.tier}`,-b.sprayRate);
    for (const [id,rate] of Object.entries(b.inputs)) close(p.edges.filter(e=>e.target===b.id&&e.item===id&&e.kind==='ingredient').reduce((n,e)=>n+e.rate,0),rate);
  }
  for (const s of p.sources) add(s.item,s.rate);
  for (const s of p.surplus) add(s.item,-s.rate);
  for (const amount of Object.values(balance)) close(amount,0);
}

test('catalog exposes every physical item exactly once with translated labels', () => {
  assert.equal(PRODUCTS.length,173);
  assert.equal(TARGETS.length,new Set(TARGETS).size);
  assert.equal(Object.keys(RECIPES).length,151);
  assert.deepEqual([...TARGETS].sort(),PRODUCTS.map(i=>i.id).sort());
  assert.ok(TARGETS.every(id=>/[\u3400-\u9fff]/.test(nameOf(id))));
  assert.ok(!TARGETS.includes('universe-matrix-technology'));
  assert.ok(icon('holo-beacon').includes('◇'));
});

test('all 173 items across all proliferation settings conserve materials and render finite layouts', () => {
  for (const target of TARGETS) for (const tier of [0,1,2,3]) for (const mode of ['products','speed']) {
    const p=solve(target,{rate:617.5,proliferation:{tier,mode}});
    assertBalance(p);
    const positions=graphPositions(p);
    assert.ok(Object.values(positions).every(pos=>Number.isFinite(pos.x+pos.y)));
    assert.equal(new Set(p.blocks.map(b=>b.recipe.recipeId)).size,p.blocks.length);
    assert.ok(Number.isFinite(layoutTotals(p).belts));
    for (const b of p.blocks) {
      assert.ok(b.count>0 && b.perMachine>0 && Number.isFinite(b.nominalPerMachine));
      assert.ok(b.count*b.perMachine>=b.output-1e-7);
      const t=planTemplate(b);
      close(t.cells.reduce((n,c)=>n+c.count,0),b.count);
      close(t.cells.reduce((n,c)=>n+c.output,0),b.output);
      assert.ok(t.slotCount<=t.logistics.slots || !t.logistics.stationId);
      const g=cellGeometry(b,t,0);
      for(const lane of [...g.belts,...(g.links??[])]) assert.ok(lane.fullRate<=t.beltCapacity+1e-7);
      const svg=layoutSVG(b,t,0),details=layoutDetails(b,t,g);
      assert.ok(!/NaN|undefined|Infinity/.test(svg+details),target);
    }
  }
});

test('resource and Dark Fog loot targets remain explicit external demands', () => {
  for(const target of TARGETS.filter(id=>!RECIPES[id])) {
    const p=solve(target);
    assert.equal(p.blocks.length,0);
    assert.equal(p.totalMachines,0);
    assert.deepEqual(p.sources.map(s=>[s.item,s.rate]),[[target,60]]);
    assertBalance(p);
  }
});

test('refining exposes both outputs and combines hydrogen and oil in one recipe job', () => {
  const oil=solve('refined-oil',{rate:600});
  assert.equal(oil.byId['refined-oil'].crafts,300);
  assert.deepEqual(oil.sources.map(s=>[s.item,s.rate]),[['crude-oil',600]]);
  assert.deepEqual(oil.surplus,[{item:'hydrogen',rate:300}]);
  const h=solve('hydrogen',{rate:600});
  assert.deepEqual(h.surplus,[{item:'refined-oil',rate:1200}]);
  close(h.byId.hydrogen.output,600);
  const science=solve('universe-matrix');
  assert.equal(science.blocks.filter(b=>b.recipe.recipeId==='plasma-refining').length,1);
  assertBalance(science);
});

test('mass energy conversion reuses coproduct hydrogen before extra refining', () => {
  const anti=solve('antimatter');
  assert.equal(anti.byId['critical-photon'].count,10);
  assert.deepEqual(anti.surplus,[{item:'hydrogen',rate:60}]);
  assert.equal(anti.byId['critical-photon'].recipe.machine,'ray-receiver');
  const rod=solve('antimatter-fuel-rod');
  const routes=rod.edges.filter(e=>e.item==='hydrogen'&&e.target==='antimatter-fuel-rod');
  assert.deepEqual(routes.map(e=>e.source),['antimatter']);
  assertBalance(rod);
});

test('six-ingredient matrix layouts divide material slots across multiple stations', () => {
  for(const logistics of ['belt','pls','ils']) for(const layout of ['row','split3','parallel3']) {
    const p=solve('universe-matrix',{logistics,layout,proliferation:{tier:3,mode:'products'}});
    const b=p.byId['universe-matrix'],t=planTemplate(b),g=cellGeometry(b,t);
    assert.ok(t.schematic);
    assert.equal(t.inputLanes.length,6);
    assert.equal(t.outputLanes.length,1);
    assert.equal(t.materials.length,8);
    assert.equal(t.stationGroups.length,logistics==='belt'?0:2);
    assert.ok(t.stationGroups.every(group=>group.length<=t.logistics.slots));
    assert.ok(layoutTotals(p).schematicGroups>0);
    assert.equal(g.beltCount,0);
    assert.match(layoutSVG(b,t,0),/供需配置示意/);
    assert.match(layoutDetails(b,t,g),/不計輸送帶格數/);
  }
});

test('multi-output layouts retain independent outlets for every coproduct', () => {
  const p=solve('refined-oil'),b=p.byId['refined-oil'],t=planTemplate(b),g=cellGeometry(b,t);
  assert.deepEqual(t.outputLanes.map(l=>l.item).sort(),['hydrogen','refined-oil']);
  for(const item of ['hydrogen','refined-oil']) close(g.belts.filter(l=>l.item===item).reduce((n,l)=>n+l.rate,0),b.outputs[item]);
});

test('chemical and research equipment speed selections change counts without changing resources', () => {
  for(const [target,category,machine] of [['plastic','chemical','quantum-chemical-plant'],['universe-matrix','lab','df-self-evolution-lab']]) {
    const base=solve(target),fast=solve(target,{equipment:{...DEFAULT_EQUIPMENT,[category]:machine}});
    assert.equal(fast.byId[target].recipe.machine,machine);
    assert.ok(fast.byId[target].count<base.byId[target].count);
    assert.deepEqual(fast.demand,base.demand);
    assert.equal(normalizeState(JSON.parse(JSON.stringify(fast.state))).equipment[category],machine);
  }
});

test('unsupported productivity explicitly falls back and non-spray machines stay unmodified', () => {
  const building=solve('interstellar-logistics-station',{proliferation:{tier:3,mode:'products'}}).byId['interstellar-logistics-station'];
  assert.equal(building.effect.mode,'speed');
  assert.equal(building.effect.fallback,true);
  assert.equal(building.effect.yield,1);
  const ray=solve('critical-photon',{proliferation:{tier:3,mode:'products'}}).byId['critical-photon'];
  assert.equal(ray.effect.tier,0);
  assert.equal(ray.sprayRate,0);
  assert.equal(ray.effect.fallback,true);
});

test('existing supply can replace newly supported products without breaking coproduct balance', () => {
  for(const supplies of [{hydrogen:20000},{antimatter:20000},{'refined-oil':20000},{'universe-matrix':60}]) {
    const p=solve('universe-matrix',{supplies});
    assertBalance(p);
  }
});
