import { TARGETS, PRODUCT_BY_ID, RECIPES, nameOf, LOGISTICS, LAYOUTS, EQUIPMENT_OPTIONS, BELTS, SORTERS, MACHINES } from './data.js';
import { loadState, normalizeState, STORAGE_KEY } from './state.js';
import { solvePlan } from './planner.js';
import { planTemplate, cellGeometry, layoutTotals } from './templates.js';
import { icon, fmt, pct, esc, effectLabel, graphPositions, graphEdges, layoutSVG, layoutDetails } from './render.js';

const $ = id => document.getElementById(id);
let storage;
try { storage = window.localStorage; } catch { storage = { getItem: () => null, setItem: () => { throw new Error('Storage unavailable'); } }; }
const loaded = loadState(storage);
let state = loaded.state, plan, totals, selected = state.target, positions = {}, currentView = 'network', cellIndex = 0;
let camera = { x: 0, y: 0, scale: 1 }, drag = null, suppressClick = false, toastTimeout, layoutScale = 1;

function toast(message, error = false) {
  $('toast').textContent = message;
  $('toast').className = `visible${error ? ' error' : ''}`;
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => { $('toast').className = ''; }, 4200);
}

function save() {
  try { storage.setItem(STORAGE_KEY, JSON.stringify(state)); $('save-status').textContent = '已儲存在此裝置'; }
  catch { $('save-status').textContent = '無法自動儲存，請匯出計畫'; }
}

function dataRow(id, value, unit = '/ min') {
  return `<div class="data-row"><span class="row-label">${icon(id, 22)}${esc(nameOf(id))}</span><span class="number">${fmt(value)}<small>${unit}</small></span></div>`;
}

const productCategories = [
  ['all', '全部'], ['materials', '材料與產品'], ['buildings', '建築與設備'],
  ['matrix', '科研矩陣'], ['combat', '黑霧與戰鬥'], ['resources', '資源與掉落物'],
];
let productCategory = 'all';
function categoryOf(id) {
  if (!RECIPES[id]) return 'resources';
  if (PRODUCT_BY_ID[id].category === 'buildings') return 'buildings';
  if (id.endsWith('-matrix')) return 'matrix';
  if (id.startsWith('df-')) return 'combat';
  return 'materials';
}

function renderProductOptions() {
  const query = $('target-search').value.trim().toLocaleLowerCase();
  const matches = TARGETS.filter(id => (productCategory === 'all' || categoryOf(id) === productCategory)
    && [nameOf(id), PRODUCT_BY_ID[id].name, id].some(text => text.toLocaleLowerCase().includes(query)));
  $('target-name').textContent = nameOf(state.target);
  $('picker-selection').textContent = '目前：' + nameOf(state.target);
  $('target-count').textContent = matches.length + ' / ' + TARGETS.length + ' 種物品';
  $('clear-product-search').hidden = !query && productCategory === 'all';
  document.querySelectorAll('[data-product-category]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.productCategory === productCategory));
  });
  $('product-results').innerHTML = matches.length ? productCategories.slice(1).map(([key,label]) => {
    const items = matches.filter(id => categoryOf(id) === key);
    if (!items.length) return '';
    return '<section class="picker-group" aria-labelledby="picker-group-'+key+'"><h3 id="picker-group-'+key+'">'+label+'<span>'+items.length+'</span></h3><div class="product-grid">'+items.map(id =>
      '<button type="button" class="product-card" data-product="'+id+'" aria-label="選擇'+esc(nameOf(id))+'" aria-pressed="'+(id===state.target)+'" title="'+esc(nameOf(id)+' · '+PRODUCT_BY_ID[id].name)+'">'+icon(id,44)+'<span class="product-card-name">'+esc(nameOf(id))+'</span>'+(id===state.target?'<span class="product-check" aria-hidden="true">✓</span>':'')+'</button>'
    ).join('')+'</div></section>';
  }).join('') : '<div class="picker-empty"><span aria-hidden="true">⌕</span><h3>找不到符合的物品</h3><p>試試其他關鍵字，或清除分類篩選。</p></div>';
}

function resetProductSearch() {
  productCategory = 'all';
  $('target-search').value = '';
  renderProductOptions();
  $('product-results').scrollTop = 0;
}

function renderControls() {
  renderProductOptions();
  $('target-icon').innerHTML = icon(state.target, 30);
  $('rate').value = state.rate;
  $('global-tier').value = state.proliferation.tier;
  $('global-mode').value = state.proliferation.mode;
  $('global-mode').disabled = state.proliferation.tier === 0;
  for (const category of Object.keys(EQUIPMENT_OPTIONS)) $(`equipment-${category}`).value = state.equipment[category];
  $('equipment-summary').textContent = `單帶 ${fmt(BELTS[state.equipment.belt].capacity)}／分鐘；分揀器 1／2／3 格：${SORTERS[state.equipment.sorter].rates.map(rate=>fmt(rate)).join('／')} 件／分鐘。`;
  $('global-logistics').value = state.logistics;
  $('global-layout').value = state.layout;
  $('global-row-size').value = state.rowSize;
  document.querySelectorAll('[data-rate]').forEach(b => b.classList.toggle('chosen', Number(b.dataset.rate) === state.rate));
}

function rebuild({ fit = false, notify = false } = {}) {
  try {
    const next = solvePlan(state);
    const nextTotals = layoutTotals(next);
    plan = next; totals = nextTotals; state = next.state;
    if (!plan.byId[selected] && !plan.sources.some(s => s.id === selected)) selected = plan.byId[state.target] ? state.target : plan.sources[0]?.id;
    cellIndex = 0;
    positions = graphPositions(plan);
    renderControls(); renderMetrics(); renderGraph(); renderInspector(); renderMaterials(); renderLayout(); save();
    if (fit) requestAnimationFrame(fitView);
    if (notify) toast('已更新生產鏈與配置');
  } catch (error) { toast(error.message, true); return false; }
  return true;
}

function commit(nextState, options) {
  const previous = state;
  state = nextState;
  if (!rebuild(options)) { state = previous; renderControls(); return false; }
  return true;
}

function renderMetrics() {
  $('plan-title').textContent = `${nameOf(state.target)}生產計畫`;
  document.title = `${nameOf(state.target)} ${fmt(state.rate)}/min · 星鏈工坊`;
  const values = [
    ['生產區塊', plan.blocks.length, '個', '每個區塊一道配方'],
    ['生產設備', plan.totalMachines, '台', '依設備與輸送能力取整'],
    ['物流站合計', totals.stations, '座', `行星 ${totals.stationsByType['planetary-logistics-station']} · 星際 ${totals.stationsByType['interstellar-logistics-station']}`],
    ['增產劑需求', plan.sprayRate, '/ min', plan.sprayRate ? '外部供應 · 未自噴塗' : '目前未使用增產劑'],
  ];
  $('metrics').innerHTML = values.map(([label, value, unit, detail]) => `<div class="metric"><div class="metric-label">${label}</div><div class="metric-value">${fmt(value, 1)}<small>${unit}</small></div><div class="metric-detail">${detail}</div></div>`).join('');
  $('validation-status').textContent = `✓ 物料平衡已計算 · ${plan.blocks.length} 個區塊${totals.schematicGroups ? ` · ${totals.schematicGroups} 組為供需示意` : ''}`;
}

function renderGraph() {
  const sourceNodes = plan.sources.map(source => {
    const pos = positions[source.id];
    return `<button type="button" class="graph-node external-node${selected === source.id ? ' selected' : ''}" data-node="${source.id}" aria-label="外部供應：${nameOf(source.item)}" aria-pressed="${selected === source.id}" style="left:${pos.x}px;top:${pos.y}px"><span class="node-kicker">EXTERNAL SUPPLY <span>↗</span></span><span class="node-title">${icon(source.item, 30)}${nameOf(source.item)}</span><span class="node-rate">${fmt(source.rate)}<small>/ min</small></span><span class="node-port out"></span></button>`;
  });
  const blockNodes = plan.blocks.map((block, index) => {
    const pos = positions[block.id], template = planTemplate(block);
    return `<button type="button" class="graph-node${selected === block.id ? ' selected' : ''}${block.id === state.target ? ' target-node' : ''}" data-node="${block.id}" aria-label="工廠區塊：${nameOf(block.id)}" aria-pressed="${selected === block.id}" style="left:${pos.x}px;top:${pos.y}px"><span class="node-kicker">BLOCK ${String(index + 1).padStart(2, '0')} <span>${block.id === state.target ? '目標產品' : '生產區塊'}</span></span><span class="node-title">${icon(block.id, 32)}${nameOf(block.id)}</span><span class="node-rate">${fmt(block.output)}<small>/ min</small></span><span class="node-meta"><span>${nameOf(block.recipe.machine)} × ${block.count}</span><span>${template.cells.length} 組 · ${template.logistics.short}</span></span><span class="node-footer">${state.overrides[block.id] ? '<span class="override-mark">個別設定</span> · ' : ''}${effectLabel(block.effect)}</span><span class="node-port in"></span><span class="node-port out"></span></button>`;
  });
  $('graph-nodes').innerHTML = [...sourceNodes, ...blockNodes].join('');
  drawEdges();
}

function drawEdges() { $('graph-edges').innerHTML = graphEdges(plan, positions, selected); }

function selectNode(id) {
  selected = id; cellIndex = 0;
  document.querySelectorAll('[data-node]').forEach(node => { node.classList.toggle('selected', node.dataset.node === id); node.setAttribute('aria-pressed', String(node.dataset.node === id)); });
  drawEdges(); renderInspector(); renderLayout();
}

function logisticsOptions(id) {
  const selectedMode = state.logisticsOverrides[id] ?? 'inherit';
  return [['inherit', `跟隨全域（${LOGISTICS[state.logistics].label}）`], ...Object.entries(LOGISTICS).map(([key, value]) => [key, value.label])]
    .map(([key, label]) => `<option value="${key}"${selectedMode === key ? ' selected' : ''}>${label}</option>`).join('');
}

function setBlockLogistics(value) {
  if (!plan.byId[selected]) return;
  const logisticsOverrides = { ...state.logisticsOverrides };
  if (value === 'inherit') delete logisticsOverrides[selected];
  else logisticsOverrides[selected] = value;
  commit({ ...state, logisticsOverrides });
}

function layoutOptions(id) {
  const current = state.layoutOverrides[id] ?? 'inherit';
  return [['inherit', `跟隨全域（${LAYOUTS[state.layout].label}）`], ...Object.entries(LAYOUTS).map(([key, value]) => [key, value.label])]
    .map(([key, label]) => `<option value="${key}"${current === key ? ' selected' : ''}>${label}</option>`).join('');
}
function setBlockLayout(value) {
  if (!plan.byId[selected]) return;
  const layoutOverrides = { ...state.layoutOverrides };
  if (value === 'inherit') delete layoutOverrides[selected]; else layoutOverrides[selected] = value;
  commit({ ...state, layoutOverrides });
}
function renderInspector() {
  const block = plan.byId[selected];
  if (!block) {
    const source = plan.sources.find(s => s.id === selected);
    $('block-index').textContent = 'EXT';
    if (!source) { $('inspector-content').innerHTML = '<p class="empty-state">選取一個工廠區塊。</p>'; return; }
    const consumers = plan.edges.filter(e => e.source === selected);
    $('inspector-content').innerHTML = `<div class="inspector-title">${icon(source.item, 46)}<div><h2>${nameOf(source.item)}</h2><p>EXTERNAL SUPPLY</p></div></div><div class="block-summary"><div class="block-rate">${fmt(source.rate)}<small>個／分鐘</small></div><p class="inspector-caption">需要送達各生產區塊的外部供應量。</p></div><section class="inspector-section"><h3>供應對象</h3>${consumers.map(e => dataRow(e.target, e.rate)).join('')}${source.item === state.target ? dataRow(state.target, state.rate, '/ min · 目標') : ''}</section><section class="inspector-section"><p class="status-note">${source.item.startsWith('proliferator') ? '增產劑本身的生產鏈未展開；採未噴塗的增產劑，並計入所有投入物料的噴塗消耗。' : '此物品由採集、掉落或既有供應取得；目前只計算需求，不生成採集或戰鬥配置。'}</p></section>`;
    return;
  }
  const template = planTemplate(block);
  const local = state.overrides[block.id];
  $('block-index').textContent = `${String(plan.blocks.indexOf(block) + 1).padStart(2, '0')} / ${String(plan.blocks.length).padStart(2, '0')}`;
  $('inspector-content').innerHTML = `<div class="inspector-title">${icon(block.id, 46)}<div><h2>${nameOf(block.id)}</h2><p>${block.id.toUpperCase()}</p></div></div>
    <div class="block-summary"><div class="block-rate">${fmt(block.output)}<small>個／分鐘</small></div><p class="inspector-caption">${Object.keys(block.outputs).length > 1 ? '本製程主產品總產出（含剩餘量）' : block.id === state.target ? '目標淨產量' : '所有下游區塊的合計需求'}</p><button id="open-block-layout" class="primary-button">展開建造配置 <span>↗</span></button></div>
    <section class="inspector-section"><h3>建造接口</h3><label for="block-logistics">此區塊的輸入／輸出方式</label><select id="block-logistics">${logisticsOptions(block.id)}</select><p class="field-note">${template.externalSpray && template.logistics.stationId ? '物流站槽位已滿；增產劑由獨立外部傳送帶供應。' : '改變接口會同步更新配置圖與建造清單。'}</p></section><section class="inspector-section"><h3>每分鐘投入</h3>${Object.entries(block.inputs).map(([id, rate]) => dataRow(id, rate)).join('')}${block.sprayRate ? dataRow(`proliferator-${block.effect.tier}`, block.sprayRate) : ''}</section>
    ${Object.keys(block.outputs).length > 1 ? `<section class="inspector-section"><h3>每分鐘全部產出</h3>${Object.entries(block.outputs).map(([id,rate]) => dataRow(id,rate)).join('')}<p class="field-note">共同產物會抵扣其他區塊需求；剩餘量列於建造清單，須安排出口。</p></section>` : ''}<section class="inspector-section"><h3>產線排列</h3><label for="block-layout">此區塊 Layout</label><select id="block-layout">${layoutOptions(block.id)}</select><p class="field-note">${template.layout === 'row' ? '單列最多 12 台。' : `每列設定上限 ${template.requestedRowSize} 台，帶速允許 ${template.beltMachineLimit} 台；三列${template.arrangement.shared ? '共用主幹' : '獨立供料'}。`}每列上限可在區塊配置調整。</p></section><section class="inspector-section"><h3>設備與配置</h3>${dataRow(block.recipe.machine, block.count, '台')}${template.logistics.stationId ? dataRow(template.logistics.stationId, template.stations, '座') : '<p class="inspector-caption">傳送帶直出 · 不使用物流站</p>'}<div class="data-row"><span class="row-label">模板產能</span><span class="number">${fmt(block.capacity)}<small>/ min</small></span></div><div class="data-row"><span class="row-label">預期利用率</span><span class="number">${pct(block.utilization)}</span></div>${block.transport.limited ? `<p class="status-note">受${block.transport.reasons.join('、')}限制：每台名義 ${fmt(block.nominalPerMachine)} → 模板 ${fmt(block.perMachine)}／分鐘（${pct(block.transport.ratio)}）。設備數按受限速度計算，並非遊戲內設定降速。</p>` : ''}<div class="utilization-track"><span style="width:${block.utilization * 100}%"></span></div><p class="inspector-caption">每組最多 ${template.machinesPerCell} 台，超出時複製產線。利用率為需求／模板產能，非遊戲內速度設定。</p></section>
    <section class="inspector-section"><h3>此區塊的增產設定</h3><label for="override-source">設定來源</label><select id="override-source"><option value="inherit"${!local ? ' selected' : ''}>跟隨全域預設</option><option value="custom"${local ? ' selected' : ''}>個別設定</option></select><div class="override-controls"><div><label for="block-tier">增產劑等級</label><select id="block-tier"${!local ? ' disabled' : ''}>${[0,1,2,3].map(tier => `<option value="${tier}"${block.effect.requested.tier === tier ? ' selected' : ''}>${tier ? `Mk.${['','I','II','III'][tier]}` : '不使用'}</option>`).join('')}</select></div><div><label for="block-mode">作用模式</label><select id="block-mode"${!local || !block.effect.requested.tier ? ' disabled' : ''}><option value="products"${block.effect.requested.mode === 'products' ? ' selected' : ''}>額外產出</option><option value="speed"${block.effect.requested.mode === 'speed' ? ' selected' : ''}>生產加速</option></select></div></div>${block.effect.fallback ? `<p class="status-note">${block.effect.tier ? '此配方不支援額外產出，改採生產加速。' : '此製程無可噴塗投入，不套用增產。'}</p>` : ''}<p class="field-note">切換後會重算整條生產鏈。${local ? '此區塊不受全域設定變動影響。' : `目前：${effectLabel(block.effect)}。`}</p></section>
    <section class="inspector-section"><p class="status-note">流量與槽位已通過模型檢查。球面格線、物流運輸及實際建造仍需遊戲內驗證。</p></section>`;
}

function renderLayout() {
  const block = plan.byId[selected];
  if (!block) {
    $('layout-title').textContent = '選取生產區塊';
    $('layout-drawing').innerHTML = '<div class="empty-state">外部供應沒有生產設備配置。<br>請回到生產網路，選取一個工廠區塊。</div>';
    $('layout-details').innerHTML = ''; $('layout-arrangement').disabled = true; $('layout-arrangement').innerHTML = ''; $('layout-row-size').disabled = true; $('layout-row-size').value = ''; $('row-size-hint').textContent = ''; $('layout-logistics').disabled = true; $('layout-logistics').innerHTML = ''; $('cell-select').innerHTML = ''; $('export-layout').disabled = true; return;
  }
  const template = planTemplate(block);
  cellIndex = Math.max(0, Math.min(cellIndex, template.cells.length - 1));
  const g = cellGeometry(block, template, cellIndex);
  $('layout-title').textContent = `${nameOf(block.id)} · ${template.logistics.label}`;
  $('layout-kind').textContent = template.schematic ? '供需示意 · 非實體格線配置' : '格線配置 · 可水平捲動';
  $('layout-arrangement').disabled = false;
  $('layout-arrangement').innerHTML = layoutOptions(block.id);
  $('layout-row-size').disabled = template.layout === 'row';
  $('layout-row-size').value = state.rowSizeOverrides[block.id] ?? '';
  $('layout-row-size').placeholder = `全域：${state.rowSize} 台`;
  $('row-size-hint').textContent = template.layout === 'row' ? '單列固定上限 12 台' : `留空跟隨全域；設定 ${template.requestedRowSize} 台，依帶速每列最多 ${template.machinesPerRow} 台${template.arrangement.shared ? '，另受主幹總量限制' : ''}`;
  $('layout-logistics').disabled = false;
  $('layout-logistics').innerHTML = logisticsOptions(block.id);
  $('cell-select').innerHTML = template.cells.map(c => `<option value="${c.index}"${c.index === cellIndex ? ' selected' : ''}>第 ${c.index + 1} 組 · ${c.count} 台</option>`).join('');
  $('export-layout').disabled = false;
  $('layout-drawing').innerHTML = layoutSVG(block, template, cellIndex);
  applyLayoutScale();
  $('layout-details').innerHTML = layoutDetails(block, template, g);
}

function materialRows() {
  return [...Object.entries(totals.machines), ...Object.entries(totals.stationsByType).filter(([, count]) => count > 0), ['splitter', totals.splitters], [state.equipment.sorter, totals.sorters], [state.equipment.belt, totals.belts], ['spray-coater', totals.coaters], ['tesla-tower', totals.towers]];
}

function partialEstimate(id) { return totals.schematicGroups && (id === state.equipment.belt || id === 'tesla-tower'); }
function renderMaterials() {
  $('materials-content').innerHTML = `${totals.schematicGroups ? `<p class="status-note">本計畫含 ${totals.schematicGroups} 組供需示意；這些組別尚未估算輸送帶與電力塔，其他設備按通道與產能估算。下列部分數量不是完整施工總數。</p>` : ''}<table class="materials-table"><thead><tr><th>建築</th><th>規格</th><th>數量</th></tr></thead><tbody>${materialRows().map(([id, count]) => `<tr><td>${icon(id,28)}${nameOf(id)}</td><td>${id.startsWith('conveyor-belt-') ? '路徑格數估算' : id === 'tesla-tower' ? '依模板配置' : '按模板計數'}</td><td>${fmt(count,0)}${partialEstimate(id) ? ' + 未估部分' : ''}</td></tr>`).join('')}</tbody></table><h4 class="table-section-heading">每分鐘外部供應</h4><table class="materials-table"><thead><tr><th>物品</th><th>用途</th><th>個／分鐘</th></tr></thead><tbody>${plan.sources.map(s => `<tr><td>${icon(s.item,28)}${nameOf(s.item)}</td><td>${s.item.startsWith('proliferator') ? '噴塗耗材' : '供應原料'}</td><td>${fmt(s.rate)}</td></tr>`).join('')}</tbody></table>${plan.surplus.length ? `<h4 class="table-section-heading">每分鐘剩餘產物</h4><p class="status-note">以下為供應所有需求後的餘量，需安排儲存、使用或外送，避免出口堵塞。</p><table class="materials-table"><thead><tr><th>物品</th><th>用途</th><th>個／分鐘</th></tr></thead><tbody>${plan.surplus.map(s => `<tr><td>${icon(s.item,28)}${nameOf(s.item)}</td><td>剩餘共同產物</td><td>${fmt(s.rate)}</td></tr>`).join('')}</tbody></table>` : ''}<p class="materials-subnote">清單是需要放置的建築，不包含建築本身的製造材料、物流運輸機、運輸船、發電設施及地基。輸送帶為格線估算，不含多列分流的分配網路、區塊間連接與架高斜坡；實際長度取決於施工路徑。</p>`;
}

function switchView(view) {
  currentView = view;
  for (const name of ['network','layout','materials']) {
    $(`${name}-view`).hidden = name !== view; $(`${name}-view`).classList.toggle('active', name === view);
    $(`tab-${name}`).classList.toggle('active', name === view); $(`tab-${name}`).setAttribute('aria-selected', String(name === view));
    $(`tab-${name}`).tabIndex = name === view ? 0 : -1;
  }
  $('network-tools').hidden = view !== 'network';
  if (view === 'network') requestAnimationFrame(fitView);
}

function applyLayoutScale() {
  const svg = $('layout-drawing').querySelector('svg');
  if (!svg) return;
  const nativeWidth = svg.viewBox.baseVal.width;
  svg.style.width = `${nativeWidth * layoutScale}px`;
  $('layout-zoom-value').textContent = `${Math.round(layoutScale * 100)}%`;
}

function applyCamera() {
  $('graph-world').style.transform = `translate(${camera.x}px,${camera.y}px) scale(${camera.scale})`;
  $('zoom-value').textContent = `${Math.round(camera.scale * 100)}%`;
}

function fitView() {
  if (currentView !== 'network' || !Object.keys(positions).length) return;
  const viewport = $('graph-viewport');
  const xs = Object.values(positions).map(p => p.x), ys = Object.values(positions).map(p => p.y);
  const minX = Math.min(...xs) - 10, minY = Math.min(...ys) - 15;
  const width = Math.max(...xs) - minX + 250;
  const skips = plan.edges.filter(e => positions[e.target].x - positions[e.source].x > 400).length;
  const height = Math.max(...ys) - minY + 255 + skips * 30;
  const scale = Math.max(.14, Math.min(1, (viewport.clientWidth - 28) / width, (viewport.clientHeight - 100) / height));
  camera = { scale, x: (viewport.clientWidth - width * scale) / 2 - minX * scale,
    y: (viewport.clientHeight - height * scale) / 2 - minY * scale + 12 };
  applyCamera();
}

function zoom(factor, clientX, clientY) {
  const rect = $('graph-viewport').getBoundingClientRect();
  const x = clientX === undefined ? rect.width / 2 : clientX - rect.left;
  const y = clientY === undefined ? rect.height / 2 : clientY - rect.top;
  const next = Math.max(.12, Math.min(2, camera.scale * factor));
  camera.x = x - (x - camera.x) * next / camera.scale;
  camera.y = y - (y - camera.y) * next / camera.scale;
  camera.scale = next; applyCamera();
}

function download(content, type, filename) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement('a'); link.href = url; link.download = filename; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

$('global-layout').innerHTML = Object.entries(LAYOUTS).map(([key, value]) => `<option value="${key}">${value.label}</option>`).join('');
$('product-categories').innerHTML = productCategories.map(([id,label]) => '<button type="button" data-product-category="'+id+'" aria-pressed="'+(id==='all')+'">'+label+'</button>').join('');
$('target-search').addEventListener('input', () => { renderProductOptions(); $('product-results').scrollTop = 0; });
$('target-search').addEventListener('keydown', event => {
  if (event.key === 'ArrowDown') { event.preventDefault(); $('product-results').querySelector('[data-product]')?.focus(); }
});
$('open-product-picker').addEventListener('click', () => {
  resetProductSearch();
  $('product-picker').showModal();
  $('target-search').focus();
});
$('close-product-picker').addEventListener('click', () => $('product-picker').close());
$('product-picker').addEventListener('keydown', event => {
  if (event.key === 'Escape') { event.preventDefault(); $('product-picker').close(); }
});
$('product-picker').addEventListener('click', event => {
  if (event.target !== $('product-picker')) return;
  const rect = event.target.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) event.target.close();
});
$('clear-product-search').addEventListener('click', () => { resetProductSearch(); $('target-search').focus(); });
$('product-categories').addEventListener('click', event => {
  const button = event.target.closest('[data-product-category]');
  if (!button) return;
  productCategory = button.dataset.productCategory;
  renderProductOptions();
  $('product-results').scrollTop = 0;
});
$('product-results').addEventListener('click', event => {
  const button = event.target.closest('[data-product]');
  if (!button) return;
  if (!$('rate').checkValidity()) { $('product-picker').close(); $('rate').reportValidity(); return; }
  const previous = selected;
  selected = button.dataset.product;
  if (commit({ ...state, target:selected, rate:Number($('rate').value) }, {fit:true})) $('product-picker').close();
  else selected = previous;
});
$('product-results').addEventListener('keydown', event => {
  const button = event.target.closest('[data-product]');
  if (!button || !['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key)) return;
  event.preventDefault();
  const grid = button.parentElement, cards = [...grid.children], index = cards.indexOf(button);
  const columns = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? cards.length-1 : index + ({ArrowLeft:-1,ArrowRight:1,ArrowUp:-columns,ArrowDown:columns}[event.key]);
  cards[Math.max(0,Math.min(cards.length-1,next))].focus();
});
const equipmentLabels = { belt:'輸送帶等級', sorter:'分揀器等級', assembler:'製造台等級', smelter:'熔爐等級', chemical:'化工廠等級', lab:'研究站等級' };
$('equipment-list').innerHTML = Object.entries(EQUIPMENT_OPTIONS).map(([category,choices]) => `<label for="equipment-${category}">${equipmentLabels[category]}</label><select id="equipment-${category}">${choices.map(id=>`<option value="${id}">${nameOf(id)} · ${category === 'belt' ? BELTS[id].capacity/60 + ' 件/s' : category === 'sorter' ? SORTERS[id].rates[0]/60 + ' 次/s/格' : MACHINES[id].speed + '×'}</option>`).join('')}</select>`).join('');
for (const category of Object.keys(EQUIPMENT_OPTIONS)) $(`equipment-${category}`).addEventListener('change',event => commit({ ...state, equipment:{...state.equipment,[category]:event.target.value} }));

$('plan-form').addEventListener('submit', event => { event.preventDefault(); commit({ ...state, rate: Number($('rate').value) }, { fit: true, notify: true }); });
document.querySelectorAll('[data-rate]').forEach(button => button.addEventListener('click', () => commit({ ...state, rate: Number(button.dataset.rate) }, { fit: false })));
for (const id of ['global-tier', 'global-mode']) $(id).addEventListener('change', () => commit({ ...state, proliferation: { tier: Number($('global-tier').value), mode: $('global-mode').value } }, { fit: true }));
$('global-layout').addEventListener('change', () => commit({ ...state, layout: $('global-layout').value }));
$('global-row-size').addEventListener('change', () => commit({ ...state, rowSize: Number($('global-row-size').value) }));
$('layout-arrangement').addEventListener('change', event => setBlockLayout(event.target.value));
$('layout-row-size').addEventListener('change', event => {
  if (!plan.byId[selected]) return;
  const rowSizeOverrides = { ...state.rowSizeOverrides };
  if (event.target.value === '') delete rowSizeOverrides[selected]; else rowSizeOverrides[selected] = Number(event.target.value);
  if (!commit({ ...state, rowSizeOverrides })) renderLayout();
});
$('global-logistics').addEventListener('change', () => commit({ ...state, logistics: $('global-logistics').value }));
$('layout-logistics').addEventListener('change', event => setBlockLogistics(event.target.value));
$('inspector-content').addEventListener('change', event => {
  if (!plan.byId[selected]) return;
  if (event.target.id === 'block-layout') { setBlockLayout(event.target.value); return; }
  if (event.target.id === 'block-logistics') { setBlockLogistics(event.target.value); return; }
  const overrides = { ...state.overrides };
  if (event.target.id === 'override-source') {
    if (event.target.value === 'inherit') delete overrides[selected];
    else overrides[selected] = { ...state.proliferation };
  } else if (['block-tier','block-mode'].includes(event.target.id)) {
    overrides[selected] = { tier: Number($('block-tier').value), mode: $('block-mode').value };
  } else return;
  commit({ ...state, overrides }, { fit: true });
});
$('inspector-content').addEventListener('click', event => { if (event.target.closest('#open-block-layout')) switchView('layout'); });
for (const view of ['network','layout','materials']) $(`tab-${view}`).addEventListener('click', () => switchView(view));
document.querySelector('[role="tablist"]').addEventListener('keydown', event => {
  if (!['ArrowLeft','ArrowRight'].includes(event.key)) return;
  event.preventDefault(); const views = ['network','layout','materials'];
  const next = views[(views.indexOf(currentView) + (event.key === 'ArrowRight' ? 1 : 2)) % 3];
  switchView(next); $(`tab-${next}`).focus();
});
$('cell-select').addEventListener('change', () => { cellIndex = Number($('cell-select').value); renderLayout(); });
$('layout-zoom-in').addEventListener('click', () => { layoutScale = Math.min(2, layoutScale * 1.25); applyLayoutScale(); });
$('layout-zoom-out').addEventListener('click', () => { layoutScale = Math.max(.2, layoutScale / 1.25); applyLayoutScale(); });
$('layout-fit').addEventListener('click', () => {
  const svg = $('layout-drawing').querySelector('svg');
  if (svg) { layoutScale = Math.min(1, $('layout-drawing').clientWidth / svg.viewBox.baseVal.width); applyLayoutScale(); }
});
$('fit-view').addEventListener('click', fitView);
$('focus-view').addEventListener('click', () => {
  const active = document.querySelector('.app-shell').classList.toggle('focus-mode');
  $('focus-view').textContent = active ? '↙ 返回設定' : '⛶ 專注畫布';
  $('focus-view').setAttribute('aria-pressed', String(active));
  requestAnimationFrame(fitView);
});
$('auto-layout').addEventListener('click', () => { state.positions = {}; positions = graphPositions(plan); plan.state.positions = {}; positions = graphPositions(plan); renderGraph(); fitView(); save(); });
$('zoom-in').addEventListener('click', () => zoom(1.2));
$('zoom-out').addEventListener('click', () => zoom(1 / 1.2));
$('graph-viewport').addEventListener('wheel', event => { event.preventDefault(); zoom(Math.exp(-event.deltaY * .0015), event.clientX, event.clientY); }, { passive: false });
$('graph-viewport').addEventListener('pointerdown', event => {
  if (event.button !== 0) return;
  const node = event.target.closest('[data-node]');
  drag = { node: node?.dataset.node, startX: event.clientX, startY: event.clientY, oldX: node ? positions[node.dataset.node].x : camera.x, oldY: node ? positions[node.dataset.node].y : camera.y, moved: false };
  $('graph-viewport').setPointerCapture(event.pointerId);
});
$('graph-viewport').addEventListener('pointermove', event => {
  if (!drag) return;
  const dx = event.clientX - drag.startX, dy = event.clientY - drag.startY;
  if (Math.abs(dx) + Math.abs(dy) > 4) drag.moved = true;
  if (!drag.moved) return;
  if (drag.node) {
    positions[drag.node] = { x: Math.max(0, Math.min(10000, drag.oldX + dx / camera.scale)), y: Math.max(0, Math.min(10000, drag.oldY + dy / camera.scale)) };
    const node = document.querySelector(`[data-node="${drag.node}"]`);
    node.style.left = `${positions[drag.node].x}px`; node.style.top = `${positions[drag.node].y}px`; drawEdges();
  } else { camera.x = drag.oldX + dx; camera.y = drag.oldY + dy; applyCamera(); }
});
function endDrag() {
  if (!drag) return;
  if (drag.moved && drag.node) { state.positions[drag.node] = { ...positions[drag.node] }; save(); }
  if (!drag.moved && drag.node) selectNode(drag.node);
  suppressClick = true; setTimeout(() => { suppressClick = false; }, 0); drag = null;
}
$('graph-viewport').addEventListener('pointerup', endDrag);
$('graph-viewport').addEventListener('pointercancel', endDrag);
$('graph-nodes').addEventListener('click', event => { const node = event.target.closest('[data-node]'); if (node && !suppressClick) selectNode(node.dataset.node); });
$('graph-viewport').addEventListener('keydown', event => {
  if (event.target !== $('graph-viewport')) return;
  if (event.key === '+' || event.key === '=') zoom(1.2);
  if (event.key === '-') zoom(1 / 1.2);
});
new ResizeObserver(() => { if (currentView === 'network') fitView(); }).observe($('graph-viewport'));

$('export-plan').addEventListener('click', () => { download(JSON.stringify(state, null, 2), 'application/json', `dyson-${state.target}-${state.rate}.json`); toast('已匯出可重新載入的計畫'); });
$('import-plan').addEventListener('click', () => $('import-file').click());
$('import-file').addEventListener('change', async event => {
  const file = event.target.files[0];
  try {
    if (!file) return;
    if (file.size > 1024 * 1024) throw new Error('計畫檔案不可超過 1 MB。');
    const next = normalizeState(JSON.parse(await file.text()));
    solvePlan(next); selected = next.target;
    if (commit(next, { fit: true })) toast('已載入計畫');
  } catch (error) { toast(`無法匯入：${error.message}`, true); }
  finally { event.target.value = ''; }
});
$('export-materials').addEventListener('click', () => {
  const rows = [['類別','物品','數量','單位'], ['估算說明',`帶長不含多列分配網路、區塊間連接與架高斜坡；另有 ${totals.schematicGroups} 組供需示意未估輸送帶與電力塔`,'',''], ...materialRows().map(([id, count]) => ['建築', nameOf(id), count, partialEstimate(id) ? '部分估算，另有未估數量' : id.startsWith('conveyor-belt-') ? '格線估算' : '個']), ...plan.sources.map(s => ['外部供應', nameOf(s.item), s.rate, '個/分鐘']), ...plan.surplus.map(s => ['剩餘產物', nameOf(s.item), s.rate, '個/分鐘'])];
  download('\uFEFF' + rows.map(row => row.map(value => `"${String(value).replaceAll('"','""')}"`).join(',')).join('\r\n'), 'text/csv;charset=utf-8', 'dyson-materials.csv');
});
$('export-layout').addEventListener('click', async () => {
  try {
    const block = plan.byId[selected]; if (!block) return;
    const response = await fetch('./assets/icons.webp');
    if (!response.ok) throw new Error('圖示載入失敗');
    const imageBlob = await response.blob();
    const data = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(imageBlob); });
    const svg = layoutSVG(block, planTemplate(block), cellIndex).replaceAll('./assets/icons.webp', data);
    download(svg, 'image/svg+xml;charset=utf-8', `${selected}-cell-${cellIndex + 1}.svg`); toast('已匯出配置圖（非遊戲藍圖）');
  } catch (error) { toast(`匯出失敗：${error.message}`, true); }
});

rebuild({ fit: true });
if (loaded.warning) toast(loaded.warning, true);
