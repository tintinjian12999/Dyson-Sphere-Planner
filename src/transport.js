import { BELTS, SORTERS } from './data.js';

export function planMachineTransport(recipe, effect, nominalCrafts, equipment) {
  const beltCapacity = BELTS[equipment.belt].capacity;
  const sorterRates = SORTERS[equipment.sorter].rates;
  if (!recipe.detailed) {
    const direct = ['ray-receiver','energy-exchanger'].includes(recipe.machine);
    const inputs = Object.entries(recipe.inputs).map(([item,q])=>({item,rate:q*nominalCrafts}));
    const outputs = Object.entries(recipe.outputs).map(([item,q])=>({item,rate:q*nominalCrafts*effect.yield}));
    const max = Math.max(...[...inputs,...outputs].map(l=>l.rate));
    const ratio = Math.min(1,beltCapacity/max,direct?1:sorterRates[0]/max);
    const lane = l=>({item:l.item,perMachine:l.rate*ratio,span:1,sorters:direct?0:1});
    return {ratio,beltCapacity,sorterRates,limited:ratio<1-1e-9, reasons:ratio<1-1e-9?['獨立物料通道容量']:[],
      lanes:inputs.map(lane),outputLanes:outputs.map(lane),outputCount:direct?0:outputs.length,
      cost:direct?0:inputs.length+outputs.length,generic:true,direct};
  }
  const lanes = Object.entries(recipe.inputs).map(([item, quantity]) => ({ item, rate: nominalCrafts * quantity }))
    .sort((a,b) => b.rate - a.rate);
  const nominalOutput = nominalCrafts * recipe.output * effect.yield;
  const beltRatio = Math.min(1, beltCapacity / Math.max(nominalOutput, ...lanes.map(l=>l.rate)));
  let best = null;
  // Search the three input ports. Output ports are on the opposite machine side.
  function allocate(counts = [], used = 0) {
    if (counts.length < lanes.length) {
      const remaining = lanes.length - counts.length - 1;
      for (let count = 1; count <= 3 - used - remaining; count++) allocate([...counts,count],used+count);
      return;
    }
    const sorterRatio = Math.min(1, 3 * sorterRates[0] / nominalOutput,
      ...lanes.map((lane,i)=>counts[i]*sorterRates[i]/lane.rate));
    const ratio = Math.min(beltRatio,sorterRatio);
    const inputCounts = lanes.map((lane,i)=>Math.max(1,Math.ceil(lane.rate*ratio/sorterRates[i]-1e-10)));
    const outputCount = Math.max(1,Math.ceil(nominalOutput*ratio/sorterRates[0]-1e-10));
    const cost = inputCounts.reduce((a,b)=>a+b,0)+outputCount;
    if (!best || ratio > best.ratio + 1e-10 || (Math.abs(ratio-best.ratio)<1e-10 && cost<best.cost)) {
      best = { ratio, cost, sorterRatio, inputCounts, outputCount };
    }
  }
  allocate();
  if (!best || best.ratio <= 0) throw new Error('目前模板無法配置此配方的分揀器接口。');
  return { ...best, beltCapacity, sorterRates, beltRatio,
    limited: best.ratio < 1 - 1e-9,
    reasons: [beltRatio < 1-1e-9 && beltRatio <= best.ratio+1e-9 ? '單台輸送帶容量' : '',
      best.sorterRatio < 1-1e-9 && best.sorterRatio <= best.ratio+1e-9 ? '分揀器速度／接口數' : ''].filter(Boolean),
    lanes: lanes.map((lane,i)=>({ item:lane.item, perMachine:lane.rate*best.ratio, span:i+1, y:10-i, sorters:best.inputCounts[i] })),
  };
}
