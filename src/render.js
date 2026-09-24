import { ICONS } from './icons.js';
import { nameOf, COLORS, PRESET, DATA_VERSION } from './data.js';
import { cellGeometry } from './templates.js';
import { schematicSVG, schematicDetails } from './schematic.js';

export const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const fmt = (value, digits = 2) => {
  const fractionDigits = value && Math.abs(value) < 1 ? Math.min(9, Math.max(digits, Math.ceil(-Math.log10(Math.abs(value))) + 2)) : digits;
  return new Intl.NumberFormat('zh-TW', { maximumFractionDigits: fractionDigits }).format(value);
};
export const pct = value => `${fmt(value * 100, 1)}%`;
export const effectLabel = effect => effect.tier === 0 ? '無增產' : `Mk.${['', 'I', 'II', 'III'][effect.tier]} · ${effect.mode === 'products' ? '額外產出' : '生產加速'}`;

export function icon(id, size = 28) {
  if (!ICONS[id]) return `<span class="icon-sprite" aria-hidden="true" style="width:${size}px;height:${size}px;background-image:none;text-align:center">◇</span>`;
  const [x, y] = ICONS[id];
  const scale = size / 64;
  return `<span class="icon-sprite" aria-hidden="true" style="width:${size}px;height:${size}px;background-size:${1472 * scale}px ${1472 * scale}px;background-position:-${x * scale}px -${y * scale}px"></span>`;
}

export function svgIcon(id, x, y, size) {
  const pos = ICONS[id];
  if (!pos) return '';
  return `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="${pos[0]} ${pos[1]} 64 64"><use href="#layout-sprite"/></svg>`;
}

export function graphPositions(plan) {
  const layers = {}, memo = {};
  function depth(id) {
    if (memo[id] !== undefined) return memo[id];
    const incoming = plan.edges.filter(e => e.target === id);
    return memo[id] = incoming.length ? 1 + Math.max(...incoming.map(e => depth(e.source))) : 0;
  }
  for (const node of [...plan.sources, ...plan.blocks]) (layers[depth(node.id)] ??= []).push(node.id);
  const maxRows = Math.max(1, ...Object.values(layers).map(l => l.length));
  const height = maxRows * 235;
  const positions = {};
  for (const [level, ids] of Object.entries(layers)) {
    ids.forEach((id, index) => {
      positions[id] = plan.state.positions[id] ?? { x: 30 + Number(level) * 320, y: 55 + (height - ids.length * 235) / 2 + index * 235 };
    });
  }
  return positions;
}

export function graphEdges(plan, positions, selected) {
  let bypass = 0;
  const bottom = Math.max(...Object.values(positions).map(p => p.y)) + 235;
  const content = plan.edges.map(edge => {
    const from = positions[edge.source], to = positions[edge.target];
    if (!from || !to) return '';
    const x1 = from.x + 222, y1 = from.y + (edge.source.startsWith('external:') ? 59 : 84);
    const incoming = plan.edges.filter(e => e.target === edge.target);
    const offset = (incoming.indexOf(edge) - (incoming.length - 1) / 2) * 15;
    const x2 = to.x - 3, y2 = to.y + 84 + offset;
    let path, lx, ly;
    if (x2 - x1 > 180) {
      const channel = bottom + bypass++ * 30;
      path = `M${x1},${y1} C${x1 + 35},${y1} ${x1 + 35},${channel} ${x1 + 70},${channel} L${x2 - 50},${channel} C${x2 - 15},${channel} ${x2 - 20},${y2} ${x2},${y2}`;
      lx = (x1 + x2) / 2; ly = channel - 8;
    } else {
      const curve = Math.max(45, Math.abs(x2 - x1) / 2);
      path = `M${x1},${y1} C${x1 + curve},${y1} ${x2 - curve},${y2} ${x2},${y2}`;
      lx = (x1 + x2) / 2; ly = (y1 + y2) / 2 - 10;
    }
    const related = edge.source === selected || edge.target === selected;
    return `<g><path class="flow-path${related ? ' related' : ''}" d="${path}" stroke="${COLORS[edge.item] ?? '#8497ac'}" ${edge.source.startsWith('external:') ? 'stroke-dasharray="6 5"' : ''} marker-end="url(#flow-arrow)"/><text class="edge-label" x="${lx}" y="${ly}" text-anchor="middle">${fmt(edge.rate)}</text><title>${esc(nameOf(edge.item))}：${fmt(edge.rate)} 個／分鐘</title></g>`;
  }).join('');
  return `<defs><marker id="flow-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#8da3b7"/></marker></defs>${content}`;
}

export function layoutSVG(block, template, cellIndex) {
  if (template.schematic) return schematicSVG(block,template,cellIndex);
  const g = cellGeometry(block, template, cellIndex), multi = template.layout !== 'row', s = multi ? 12 : 18, ox = 24, oy = 78;
  const width = Math.max(760, g.width * s + 48), height = multi ? g.height * s + 190 : 550;
  const footerY = height - 80;
  const point = ([x, y]) => `${ox + x * s},${oy + y * s}`;
  const col = id => COLORS[id] ?? '#9babc0';
  let drawing = `<rect width="${width}" height="${height}" fill="#121a22"/><rect x="${ox}" y="${oy}" width="${width - 48}" height="${height - 190}" fill="url(#tile-grid)"/>`;
  drawing += `<text x="24" y="30" fill="#e8edf3" font-size="17">${esc(nameOf(block.id))} · 第 ${cellIndex + 1} 組 / ${template.cells.length} 組</text><text x="24" y="53" fill="#91a5b7" font-size="12">${esc(nameOf(block.recipe.machine))} × ${g.count}　目標 ${fmt(g.output)} / min　｜　${nameOf(block.equipment.belt)} · ${nameOf(block.equipment.sorter)}</text>`;
  if (g.schematicDistribution) drawing += `<rect x="${ox}" y="${oy}" width="${28*s}" height="${height-190}" fill="#17212c"/><line x1="${ox+28*s}" y1="${oy}" x2="${ox+28*s}" y2="${height-112}" stroke="#8b778e" stroke-dasharray="5 5"/><text x="${ox+8}" y="${oy+17}" fill="#d6b879" font-size="11">分配網路 · 非格線路徑</text>`;
  const stations = g.stations ?? (g.station ? [g.station] : []), st = stations[0];
  for (const st of stations) drawing += `<rect x="${ox + (st.x - st.w / 2) * s}" y="${oy + (st.y - st.h / 2) * s}" width="${st.w * s}" height="${st.h * s}" rx="7" fill="#253647" stroke="#91a6c2" stroke-width="2"/>${svgIcon(st.item, ox + st.x * s - 27, oy + st.y * s - 31, 54)}<text x="${ox + st.x * s}" y="${oy + st.y * s + 35}" text-anchor="middle" font-size="10" fill="#dae5ed">${template.logistics.short} · ${template.slotCount}/${template.logistics.slots}</text>`;
  if (!stations.length && !multi) drawing += `<text x="24" y="${oy + 11 * s}" fill="#91a5b7" font-size="13">傳送帶直出 · 無物流站</text>`;
  if (multi) drawing += `<text x="24" y="69" fill="#d6b879" font-size="11">${template.arrangement.label}${g.schematicDistribution ? ' · 左側為連接示意，右側為格線排列' : ' · 各列獨立進出料'}</text>`;
  for (const row of g.rowLabels ?? []) drawing += `<text x="${ox + row.x * s}" y="${oy + row.y * s - 5}" fill="#c7d7e6" font-size="11">第 ${row.index + 1} 列 · ${row.count} 台 · ${fmt(row.output)} / min</text>`;
  for (const link of g.links ?? []) {
    const x1 = ox + link.from[0] * s, y1 = oy + link.from[1] * s;
    const x2 = ox + link.to[0] * s, y2 = oy + link.to[1] * s;
    drawing += `<path d="M${x1},${y1} C${(x1+x2)/2},${y1} ${(x1+x2)/2},${y2} ${x2},${y2}" fill="none" stroke="${col(link.item)}" stroke-width="2" stroke-dasharray="4 4" marker-end="url(#belt-arrow)"><title>${esc(nameOf(link.item))} · ${link.role === 'trunk' ? '主幹' : '分支'} ${fmt(link.rate)} / min；滿載 ${fmt(link.fullRate)} / min</title></path>`;
  }
  for (const splitter of g.splitters ?? []) drawing += `<rect x="${ox + splitter.x*s - 12}" y="${oy + splitter.y*s - 12}" width="24" height="24" rx="3" fill="#3d3549" stroke="#d1a5ec"/>${svgIcon('splitter', ox + splitter.x*s - 10, oy + splitter.y*s - 10, 20)}<text x="${ox + splitter.x*s - 15}" y="${oy + splitter.y*s - 17}" fill="#dcc5ec" font-size="10">${esc(nameOf(splitter.item))} ${splitter.direction === 'out' ? '合流' : '分流'}</text>`;
  for (const belt of g.belts) {
    drawing += `<polyline points="${belt.points.map(point).join(' ')}" fill="none" stroke="${col(belt.item)}" stroke-width="4" stroke-linejoin="round" ${belt.elevated ? 'stroke-dasharray="7 4"' : ''} marker-end="url(#belt-arrow)"/><title>${esc(nameOf(belt.item))} ${fmt(belt.rate)} / min</title>`;
    if (belt.direction === 'in') {
      const last = belt.points.at(-1);
      drawing += `<text x="${ox + last[0] * s + 8}" y="${oy + last[1] * s + 4}" fill="${col(belt.item)}" font-size="11">${esc(nameOf(belt.item))}</text>`;
    }
  }
  for (const coater of g.coaters) {
    drawing += `<rect x="${ox + coater.x * s - 10}" y="${oy + coater.y * s - 13}" width="20" height="26" rx="3" fill="#224b6c" stroke="#87c5ed"/><text x="${ox + coater.x * s}" y="${oy + coater.y * s + 4}" text-anchor="middle" fill="#d3efff" font-size="10">噴</text>`;
  }
  for (const port of g.ports) {
    const [x, y] = port.point;
    const label = port.direction === 'out' ? '輸出' : port.direction === 'spray' ? '增產劑外接' : '輸入';
    drawing += `<circle cx="${ox + x * s}" cy="${oy + y * s}" r="5" fill="#121a22" stroke="${col(port.item)}" stroke-width="2"/><text x="${ox + x * s + 10}" y="${oy + y * s - 6}" fill="${col(port.item)}" font-size="10">${label} · ${esc(nameOf(port.item))}</text>`;
  }
  for (const machine of g.machines) {
    drawing += `<rect x="${ox + (machine.x - 1.5) * s}" y="${oy + (machine.y - 1.5) * s}" width="${3 * s}" height="${3 * s}" rx="4" fill="#253d36" stroke="#69b995" stroke-width="1.5"/>${svgIcon(block.recipe.machine, ox + machine.x * s - 18, oy + machine.y * s - 21, 36)}<text x="${ox + machine.x * s}" y="${oy + machine.y * s + 21}" font-size="9" text-anchor="middle" fill="#cfddd6">${String(machine.id).padStart(2, '0')}</text>`;
  }
  for (const sorter of g.sorters) {
    drawing += `<line x1="${ox + sorter.from[0] * s}" y1="${oy + sorter.from[1] * s}" x2="${ox + sorter.to[0] * s}" y2="${oy + sorter.to[1] * s}" stroke="#d7e1e9" stroke-width="2" marker-end="url(#sorter-arrow)"/><circle cx="${ox + sorter.from[0] * s}" cy="${oy + sorter.from[1] * s}" r="2.5" fill="#d7e1e9"/>`;
  }
  for (const tower of g.towers) drawing += `<circle cx="${ox + tower.x * s}" cy="${oy + tower.y * s}" r="6" fill="#192534" stroke="#94acd4"/><path d="M${ox + tower.x * s - 2},${oy + tower.y * s - 4} l4 3 -4 3" fill="none" stroke="#a5c3e8"/>`;
  drawing += `<text x="24" y="${footerY}" fill="#77d9ba" font-size="12">輸出 → ${esc(nameOf(block.id))}　${fmt(g.output)} / min　　單組模板產能 ${fmt(g.capacity)} / min</text>`;
  drawing += `<text x="24" y="${footerY + 25}" fill="#91a5b7" font-size="11">${st ? `${template.logistics.label} · 同配方各組可分開建造，平行排列時物流站中心預留至少 ${PRESET.cellSpacing} 格。` : '傳送帶直出 · 各組依標示接口接入原料與取出產品；區塊之間的實際走帶由玩家連接。'}</text>`;
  drawing += `<text x="24" y="${footerY + 48}" fill="#c6ae84" font-size="11">${g.schematicDistribution ? '左側虛線為分配連線示意，非格線施工路徑；不計入帶長。' : block.effect.tier ? '藍色虛線為架高增產劑供料帶；落接噴塗機上層接口。' : '按單層輸送帶與單件分揀計算。'}　模板已檢查流量，尚未經遊戲內驗證。</text>`;
  if (block.transport.limited) drawing += `<text x="24" y="${height-10}" fill="#efb86d" font-size="10">輸送瓶頸：${esc(block.transport.reasons.join('、'))}；每台名義 ${fmt(block.nominalPerMachine)} → 有效 ${fmt(block.perMachine)} / min（${pct(block.transport.ratio)}）。</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" class="layout-svg" role="img" aria-label="${esc(nameOf(block.id))}生產列配置圖" viewBox="0 0 ${width + 80} ${height}" font-family="Noto Sans TC, Microsoft JhengHei, sans-serif"><defs><image id="layout-sprite" href="./assets/icons.webp" width="1472" height="1472"/><pattern id="tile-grid" width="${s}" height="${s}" patternUnits="userSpaceOnUse" x="${ox}" y="${oy}"><path d="M${s} 0H0V${s}" fill="none" stroke="#2a3644" stroke-width=".5"/></pattern><marker id="belt-arrow" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto"><path d="M0 0L4 2L0 4Z" fill="#c4b694"/></marker><marker id="sorter-arrow" markerWidth="3" markerHeight="3" refX="2" refY="1.5" orient="auto"><path d="M0 0L3 1.5L0 3Z" fill="#e0e8ef"/></marker></defs>${drawing}</svg>`;
}

function equipmentDetails(block) {
  const note = block.transport.limited
    ? `受${block.transport.reasons.join('、')}限制，每台名義產能 ${fmt(block.nominalPerMachine)} → 模板有效產能 ${fmt(block.perMachine)}／分鐘（${pct(block.transport.ratio)}）。設備數已按此受限速度重算；這是供料瓶頸估算，並非遊戲內速度設定。`
    : '此設備組合在名義流量模型下可供應生產設備滿速運作。';
  return `<p class="status-note">${icon(block.equipment.belt,20)}${nameOf(block.equipment.belt)} · ${icon(block.equipment.sorter,20)}${nameOf(block.equipment.sorter)} · ${nameOf(block.recipe.machine)}<br>${note}</p>`;
}

function multiRowDetails(block, template, g) {
  const shared = template.arrangement.shared;
  const spray = block.effect.tier ? `所有原料帶均需噴塗，模式為${effectLabel(block.effect)}；增產劑${template.externalSpray ? '使用外部傳送帶接口' : '由物流站供應'}。` : '目前不使用增產劑。';
  const rows = g.rows.map(row => `<tr><td>第 ${row.index + 1} 列</td><td>${row.count} 台</td><td>${fmt(row.output)}</td><td>${fmt(row.capacity)}</td></tr>`).join('');
  const items = [...Object.entries(block.inputs), [block.id, block.output], ...(block.effect.tier ? [[`proliferator-${block.effect.tier}`, block.sprayRate]] : [])];
  const flowRows = items.map(([id, rate]) => {
    const branchFlows = g.rows.map(row => fmt(rate * row.output / block.output));
    const full = g.belts.filter(b => b.item === id).map(b => b.fullRate);
    return `<tr><td>${icon(id,22)}${nameOf(id)}</td><td>${shared ? fmt(rate * g.output / block.output) : '各列獨立'}</td><td>${branchFlows.join(' / ')}</td><td>${pct((shared ? full.reduce((a,b)=>a+b,0) : Math.max(...full)) / template.beltCapacity)}</td></tr>`;
  }).join('');
  return `${equipmentDetails(block)}<div class="layout-summary"><div>本組排列<strong>${g.rows.map(r => r.count).join(' + ')}<small> 台</small></strong>${template.arrangement.label}</div><div>分支最高帶速占用<strong>${pct(g.branchBeltLoad)}</strong>每條帶 ${fmt(template.beltCapacity)}／分鐘</div><div>${shared ? '共用主幹最高占用' : '獨立供料列數'}<strong>${shared ? pct(g.trunkBeltLoad) : g.rows.length}</strong>${shared ? '分流不會增加主幹容量' : '各列產品分別輸出，不合流'}</div></div>
    <p class="status-note">${shared ? '分流器分配原料並合併產品；主幹與輸出合流帶都受單帶上限限制，必要時會降低每組設備數。左側虛線僅表示接線關係，實際跨列走帶、架高及分流器方向需在遊戲中安排，尚未求解格線路徑。' : '各列有獨立輸入及輸出；超過單帶總流量時，不能再合併至同一條帶。物流站模式每列配置一座站，按 40 格站心距預留；傳送帶模式需上游提供多條獨立供料帶。'}</p>
    <h4 class="table-section-heading">各列設備與產量</h4><table class="materials-table"><thead><tr><th>列</th><th>設備</th><th>目標 / min</th><th>模板產能 / min</th></tr></thead><tbody>${rows}</tbody></table>
    <h4 class="table-section-heading">主幹與分支流量</h4><table class="materials-table"><thead><tr><th>物料</th><th>共用主幹 / min</th><th>各列 / min</th><th>滿載瓶頸占用</th></tr></thead><tbody>${flowRows}</tbody></table>
    <div class="layout-instructions"><h4>建造條件</h4><ol><li>本組 ${g.count} 台${nameOf(block.recipe.machine)}；依上表分列，設備中心間距 6 格，每列最多 ${template.machinesPerRow} 台。</li><li>${g.stations.length ? `${template.logistics.label} ${g.stations.length} 座，每站 ${template.slotCount}／${template.logistics.slots} 槽；原料設本地需求，產品設本地供應。${template.mode === 'ils' ? '遠端預設儲存。' : ''}` : '不放置物流站，依標示接入原料並取出產品。'}</li><li>${g.splitters.length ? `本組四向分流器 ${g.splitters.length} 個：每種原料各用一個分流，產品用一個合流，增產劑啟用時另設分流器。不假設可指定精確分配比例；不同列長靠供需與背壓平衡。` : '不需要跨列分流器；各列保持獨立輸送。'}</li><li>${spray}</li><li>依圖接上分揀器、噴塗機與電力塔，並提供足夠電力及物流運力。每組最多 ${template.machinesPerCell} 台，末組依剩餘需求分配。每列設定 ${template.requestedRowSize} 台，帶速允許每列最多 ${template.machinesPerRow} 台${shared ? '；共用主幹容量另限制每組總台數' : ''}。</li></ol></div>
    <p class="materials-subnote">輸送帶數量只計列內格線路徑，不含${shared ? '物流站至分流器、分流器至各列的分配網路、' : ''}區塊間連接與架高斜坡。配置與分流吞吐尚未經遊戲內驗證；SVG 不是遊戲藍圖。資料版本：DSP ${DATA_VERSION}。</p>`;
}

export function layoutDetails(block, template, g) {
  if (template.schematic) return schematicDetails(block,template,g);
  if (template.layout !== 'row') return multiRowDetails(block, template, g);
  const hasStation = Boolean(template.logistics.stationId);
  const materialRows = [
    ...Object.entries(block.inputs).map(([id, rate]) => [id, hasStation ? '本地需求' : '傳送帶輸入', rate * g.output / block.output]),
    [block.id, hasStation ? '本地供應' : '傳送帶輸出', g.output],
  ];
  if (block.effect.tier) materialRows.push([`proliferator-${block.effect.tier}`, template.externalSpray ? '外部傳送帶輸入' : '本地需求', block.sprayRate * g.output / block.output]);
  const interfaceSummary = hasStation
    ? `物流站槽位<strong>${template.slotCount} / ${template.logistics.slots}</strong>${template.logistics.label}`
    : `傳送帶接口<strong>${g.ports.length} 個</strong>輸入 ${g.ports.length - 1} · 輸出 1`;
  const firstStep = hasStation
    ? `在平坦且不跨緯度格線接縫的位置，放置${template.logistics.label}，依上表設定本地供需。${template.mode === 'ils' ? '遠端預設儲存，原料輸入站可按來源改為遠端需求。' : '行星物流站僅處理本星球物流。'}`
    : '依圖上的圓形接口接入各項原料，以產品輸出接口連接下游；本組不放置物流站。區塊之間的實際傳送帶路徑需自行連接。';
  const sprayNotice = hasStation && template.externalSpray
    ? '<p class="status-note">行星物流站的 4 個槽位用於配方原料與產品；增產劑改由圖上獨立的外部傳送帶接口供應，不占物流站槽位。</p>' : '';
  return `${equipmentDetails(block)}<div class="layout-key"><span><i class="key-box"></i>生產設備</span><span><i class="key-box belt"></i>輸送帶（箭頭為流向）</span><span><i class="key-box sorter"></i>分揀器</span><span><i class="key-box coater"></i>噴塗機</span><span>○ 外接接口／電力塔</span></div>
    <div class="layout-summary"><div>本組設備<strong>${g.count}<small> 台</small></strong>${nameOf(block.recipe.machine)}</div><div>滿載最高帶速占用<strong>${pct(g.maxBeltLoad)}</strong>單帶 ${fmt(template.beltCapacity)} 件／分鐘</div><div>${interfaceSummary}</div></div>${sprayNotice}
    <h4 class="table-section-heading">本組${hasStation ? '物流站與接口設定' : '傳送帶接口'}</h4><table class="materials-table"><thead><tr><th>物品</th><th>連接方式</th><th>流量 / min</th></tr></thead><tbody>${materialRows.map(([id, mode, rate]) => `<tr><td>${icon(id,24)}${nameOf(id)}</td><td>${mode}</td><td>${fmt(rate)}</td></tr>`).join('')}</tbody></table>
    <div class="layout-instructions"><h4>建造順序與條件</h4><ol><li>${firstStep}</li><li>依格線放置 ${g.count} 台${nameOf(block.recipe.machine)}，中心間隔 6 格。每台選擇「${nameOf(block.id)}」配方。</li><li>依箭頭連接輸送帶。分揀器跨度為 ${template.inputLanes.map(l => `${nameOf(l.item)} ${l.span} 格`).join('、')}；輸出為 1 格。</li>${block.effect.tier ? `<li>每條輸入帶均需噴塗。增產劑${template.externalSpray ? '由外部接口' : '由物流站'}以架高輸送帶接入噴塗機上層接口。設定${effectLabel(block.effect)}。</li>` : ''}<li>補上電力塔並接入電網，供應足夠原料。${hasStation ? '提供物流運輸機；物流運力與充電尚未模擬。' : '各組預留獨立輸入／輸出帶，不可把多組流量合併到容量不足的單一輸送帶。'}</li><li>其餘 ${template.cells.length - 1} 組可由上方選單查看。末組可能未滿載；以供需平衡達到目標產量。</li></ol></div><p class="materials-subnote">輸送帶清單為格線路徑估算，不含區塊間連接與架高斜坡額外長度；圖示尚非可匯入遊戲的藍圖。資料版本：DSP ${DATA_VERSION}。</p>`;
}
