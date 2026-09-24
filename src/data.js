import { CATALOG } from './catalog.js';
import { CATALOG_NAMES } from './names.js';

export const NAMES = {
  ...CATALOG_NAMES,
  'wireless-power-tower':'無線輸電塔', 'satellite-substation':'衛星配電站',
  'wind-turbine':'風力渦輪機', 'thermal-power-plant':'火力發電廠', 'solar-panel':'太陽能板',
  'geothermal-power-station':'地熱發電站', 'mini-fusion-power-plant':'微型聚變發電站',
  'energy-exchanger':'能量樞紐', accumulator:'蓄電器', 'accumulator-full':'蓄電器（滿）',
  'ray-receiver':'射線接收站', 'artificial-star':'人造恆星', 'automatic-piler':'自動集裝機',
  'traffic-monitor':'流速監測器', 'storage-1':'小型儲物倉', 'storage-2':'大型儲物倉', 'storage-tank':'儲液罐',
  'logistics-distributor':'物流配送器', 'orbital-collector':'軌道採集器', 'sorter-4':'集裝分揀器',
  'mining-machine':'採礦機', 'advanced-mining-machine':'大型採礦機', 'water-pump':'抽水站',
  'oil-extractor':'原油萃取站', 'oil-refinery':'原油精煉廠', fractionator:'分餾塔',
  'chemical-plant':'化工廠', 'quantum-chemical-plant':'量子化工廠',
  'miniature-particle-collider':'微型粒子對撞機', 'matrix-lab':'矩陣研究站',
  'df-self-evolution-lab':'自演化研究站', 'holo-beacon':'全息投影器',
  'em-rail-ejector':'電磁軌道彈射器', 'vertical-launching-silo':'垂直發射井',
  'df-gauss-turret':'高斯機槍塔', 'df-missile-turret':'導彈防禦塔', 'df-implosion-cannon':'聚爆加農炮',
  'df-laser-turret':'高頻雷射塔', 'df-plasma-turret':'電漿炮', 'df-plasma-turret-sr':'近程電漿塔',
  'df-battlefield-analysis-base':'戰場分析基站', 'df-jammer-tower':'干擾塔', 'df-signal-tower':'信號塔',
  'df-planetary-shield-generator':'行星護盾發生器', 'df-magnum-ammo-box':'機槍彈箱',
  'df-dark-fog-matrix':'黑霧矩陣', 'df-energy-shard':'能量碎片', 'df-silicon-based-neuron':'矽基神經元',
  'df-negentropy-singularity':'負熵奇點', 'df-matter-recombinator':'物質重組器',
  'df-jamming-capsule':'干擾膠囊', 'df-suppressing-capsule':'壓制膠囊',
  'iron-ore': '鐵礦', 'copper-ore': '銅礦', 'iron-ingot': '鐵塊',
  'copper-ingot': '銅塊', magnet: '磁鐵', 'magnetic-coil': '磁線圈',
  gear: '齒輪', 'electric-motor': '電動機', 'electromagnetic-turbine': '電磁渦輪',
  'proliferator-1': '增產劑 Mk.I', 'proliferator-2': '增產劑 Mk.II', 'proliferator-3': '增產劑 Mk.III',
  'assembling-machine-3': '製造台 Mk.III', 'plane-smelter': '位面熔爐',
  'conveyor-belt-3': '輸送帶 Mk.III', 'sorter-3': '分揀器 Mk.III',
  'spray-coater': '噴塗機', 'interstellar-logistics-station': '星際物流站',
  'planetary-logistics-station': '行星物流站',
  'tesla-tower': '電力感應塔', splitter: '四向分流器',
  'conveyor-belt-1': '輸送帶 Mk.I', 'conveyor-belt-2': '輸送帶 Mk.II',
  'sorter-1': '分揀器 Mk.I', 'sorter-2': '分揀器 Mk.II',
  'assembling-machine-1': '製造台 Mk.I', 'assembling-machine-2': '製造台 Mk.II',
  'df-recomposing-assembler': '重組式製造台', 'arc-smelter': '電弧熔爐', 'df-negentropy-smelter': '負熵熔爐',
};
export const PRODUCTS = CATALOG.items.filter(i => ['components','buildings'].includes(i.category));
export const PRODUCT_BY_ID = Object.fromEntries(PRODUCTS.map(i => [i.id,i]));
export const nameOf = id => NAMES[id] ?? PRODUCT_BY_ID[id]?.name ?? id;
export const LEGACY_TARGETS = ['electromagnetic-turbine', 'electric-motor', 'magnetic-coil', 'gear', 'magnet', 'iron-ingot', 'copper-ingot'];
export const TARGETS = [...LEGACY_TARGETS, ...PRODUCTS.map(i=>i.id).filter(id=>!LEGACY_TARGETS.includes(id))];
const aliases = { hydrogen:'plasma-refining', 'refined-oil':'plasma-refining', antimatter:'mass-energy-storage' };
const raw = new Set(['iron-ore','copper-ore','silicon-ore','titanium-ore','stone','coal','water','crude-oil','fire-ice','kimberlite-ore','fractal-silicon','optical-grating-crystal','spiniform-stalagmite-crystal','unipolar-magnet','log','plant-fuel']);
export const RECIPES = {};
for (const product of PRODUCTS) {
  if (raw.has(product.id)) continue;
  const r = CATALOG.recipes.find(r=>r.id===(aliases[product.id]??product.id) && r.out?.[product.id] && !r.flags?.includes('mining'));
  if (!r) continue;
  const machine = r.producers.includes('plane-smelter') ? 'plane-smelter' : r.producers.includes('assembling-machine-3') ? 'assembling-machine-3' : r.producers[0];
  RECIPES[product.id] = { id:product.id, recipeId:r.id, primary:r.id==='plasma-refining'?'refined-oil':r.id==='mass-energy-storage'?'antimatter':product.id,
    time:r.time, inputs:r.in??{}, outputs:r.out, output:r.out[product.id], producers:r.producers, machine,
    canProliferate:CATALOG.productivity.includes(r.id),
    detailed:['plane-smelter','assembling-machine-3'].includes(machine) && Object.keys(r.in??{}).length<=3 && Object.keys(r.out).length===1 };
}
export function machineFor(recipe, equipment) {
  return Object.values(equipment).find(id=>recipe.producers.includes(id)) ?? recipe.machine;
}
export const MACHINES = Object.fromEntries(CATALOG.items.filter(i => i.machine).map(i => [i.id, i.machine]));
export const BELTS = Object.fromEntries(CATALOG.items.filter(i => i.belt).map(i => [i.id, { capacity: i.belt.speed * 60 }]));
// Nominal single-item trips per minute at spans 1, 2 and 3; no stacking upgrades.
export const SORTERS = {
  'sorter-1': { rates: [90,45,30] },
  'sorter-2': { rates: [180,90,60] },
  'sorter-3': { rates: [360,180,120] },
};
export const EQUIPMENT_OPTIONS = {
  belt: ['conveyor-belt-1','conveyor-belt-2','conveyor-belt-3'],
  sorter: ['sorter-1','sorter-2','sorter-3'],
  assembler: ['assembling-machine-1','assembling-machine-2','assembling-machine-3','df-recomposing-assembler'],
  smelter: ['arc-smelter','plane-smelter','df-negentropy-smelter'],
  chemical: ['chemical-plant','quantum-chemical-plant'],
  lab: ['matrix-lab','df-self-evolution-lab'],
};
export const DEFAULT_EQUIPMENT = Object.freeze({
  belt: 'conveyor-belt-3', sorter: 'sorter-3', assembler: 'assembling-machine-3', smelter: 'plane-smelter',
  chemical:'chemical-plant', lab:'matrix-lab',
});
export const EFFECTS = Object.fromEntries(CATALOG.items.filter(i => i.module).map(i => [i.id, i.module]));
export const PRESET = Object.freeze({
  beltCapacity: 1800, sorterNominalPerMinute: 360, sorterMargin: 1,
  stationSlots: 5, stationPorts: 12, maxMachinesPerCell: 12, machinePitch: 6,
  cellSpacing: 40, beltStack: 1,
});
export const DATA_VERSION = CATALOG.version.DSP;
export const LOGISTICS = Object.freeze({
  belt: { label: '傳送帶直出', short: 'BELT', stationId: null, slots: 0 },
  pls: { label: '行星物流站', short: 'PLS', stationId: 'planetary-logistics-station', slots: 4 },
  ils: { label: '星際物流站', short: 'ILS', stationId: 'interstellar-logistics-station', slots: 5 },
});
export const LAYOUTS = Object.freeze({
  row: { label: '單列 · 最多 12 台', rows: 1, shared: false },
  split3: { label: '三列分流 · 共用主幹', rows: 3, shared: true },
  parallel3: { label: '三列獨立供料', rows: 3, shared: false },
});
export const COLORS = {
  'iron-ore': '#a5b5ce', 'copper-ore': '#df9e6d', 'iron-ingot': '#9cb4d4',
  'copper-ingot': '#e8a577', magnet: '#72aeed', 'magnetic-coil': '#e5a361',
  gear: '#a7b8d2', 'electric-motor': '#e5c46f', 'electromagnetic-turbine': '#77d9ba',
  'proliferator-1': '#eea257', 'proliferator-2': '#92cd5d', 'proliferator-3': '#74b5fb',
};
