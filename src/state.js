import { RECIPES, TARGETS, LOGISTICS, LAYOUTS, DEFAULT_EQUIPMENT, EQUIPMENT_OPTIONS } from './data.js';

export const STORAGE_KEY = 'dyson-planner-v1';
export const defaultState = () => ({
  equipment: { ...DEFAULT_EQUIPMENT },
  version: 1, target: 'electromagnetic-turbine', rate: 600,
  proliferation: { tier: 0, mode: 'products' }, overrides: {},
  supplies: {}, positions: {}, planetId: 'home',
  logistics: 'ils', logisticsOverrides: {}, layout: 'row', layoutOverrides: {}, rowSize: 4, rowSizeOverrides: {},
});

export function normalizeEffect(value) {
  if (!value || ![0, 1, 2, 3].includes(value.tier) || !['products', 'speed'].includes(value.mode)) {
    throw new Error('增產設定無效：等級須為 0–3，模式須為額外產出或生產加速。');
  }
  return { tier: value.tier, mode: value.mode };
}

export function normalizeState(input) {
  if (!input || input.version !== 1) throw new Error('不支援這份計畫的格式版本。');
  if (!TARGETS.includes(input.target)) throw new Error('這個產品不在目前的資料集中。');
  if (typeof input.rate !== 'number' || !Number.isFinite(input.rate) || input.rate < 0.001 || input.rate > 60000) {
    throw new Error('目標產量須介於 0.001 與 60,000 個／分鐘。');
  }
  const state = { ...defaultState(), target: input.target, rate: input.rate, proliferation: normalizeEffect(input.proliferation) };
  if (input.equipment !== undefined && (!input.equipment || typeof input.equipment !== 'object' || Array.isArray(input.equipment))) throw new Error('設備設定格式無效。');
  for (const [category, choices] of Object.entries(EQUIPMENT_OPTIONS)) {
    const value = input.equipment?.[category] ?? DEFAULT_EQUIPMENT[category];
    if (typeof value !== 'string' || !choices.includes(value) || input.equipment?.[category] === null) throw new Error('設備等級設定無效。');
    state.equipment[category] = value;
  }
  // Older version-1 plans omitted these fields and retain their ILS layout.
  const normalizeLogistics = value => {
    if (typeof value !== 'string' || !Object.hasOwn(LOGISTICS, value)) throw new Error('建造接口設定無效。');
    return value;
  };
  state.logistics = normalizeLogistics(input.logistics === undefined ? 'ils' : input.logistics);
  const normalizeLayout = value => {
    if (typeof value !== 'string' || !Object.hasOwn(LAYOUTS, value)) throw new Error('產線排列設定無效。');
    return value;
  };
  const normalizeRowSize = value => {
    if (!Number.isInteger(value) || value < 1 || value > 60) throw new Error('每列設備上限須為 1–60 的整數。');
    return value;
  };
  state.rowSize = normalizeRowSize(input.rowSize === undefined ? 4 : input.rowSize);
  state.layout = normalizeLayout(input.layout === undefined ? 'row' : input.layout);
  for (const id of Object.keys(RECIPES)) {
    if (Object.hasOwn(input.rowSizeOverrides ?? {}, id)) state.rowSizeOverrides[id] = normalizeRowSize(input.rowSizeOverrides[id]);
    if (Object.hasOwn(input.layoutOverrides ?? {}, id)) state.layoutOverrides[id] = normalizeLayout(input.layoutOverrides[id]);
    if (Object.hasOwn(input.logisticsOverrides ?? {}, id)) state.logisticsOverrides[id] = normalizeLogistics(input.logisticsOverrides[id]);
    if (Object.hasOwn(input.overrides ?? {}, id)) state.overrides[id] = normalizeEffect(input.overrides[id]);
    if (Object.hasOwn(input.supplies ?? {}, id)) {
      const value = input.supplies[id];
      if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > 1e9) throw new Error('既有供應量無效。');
      state.supplies[id] = value;
    }
  }
  for (const [id, pos] of Object.entries(input.positions ?? {})) {
    if (!/^(external:)?[a-z0-9-]+$/.test(id) || !pos || !Number.isFinite(pos.x) || !Number.isFinite(pos.y)) continue;
    state.positions[id] = { x: Math.max(0, Math.min(10000, pos.x)), y: Math.max(0, Math.min(10000, pos.y)) };
  }
  return state;
}

export function loadState(storage) {
  try {
    const stored = storage.getItem(STORAGE_KEY);
    return { state: stored ? normalizeState(JSON.parse(stored)) : defaultState(), warning: '' };
  } catch {
    return { state: defaultState(), warning: '無法讀取儲存的計畫，已載入預設案例。' };
  }
}
