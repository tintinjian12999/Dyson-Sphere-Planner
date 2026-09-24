import { PRESET, LOGISTICS, LAYOUTS } from './data.js';
import { schematicTemplate, schematicGeometry } from './schematic.js';

export function planTemplate(block) {
  if (!block.recipe.detailed) return schematicTemplate(block);
  const mode = block.logistics ?? 'ils';
  const logistics = LOGISTICS[mode];
  if (!logistics) throw new Error('不支援此建造接口。');
  const { beltCapacity, sorterRates } = block.transport;
  const inputLanes = block.transport.lanes.map(lane => ({ ...lane }));
  let port = 0;
  const sorters = [];
  for (const lane of inputLanes) {
    for (let n = 0; n < lane.sorters; n++) sorters.push({ item: lane.item, span: lane.span, xOffset: port++ - 1, y: lane.y, direction: 'in' });
  }
  if (port > 3) throw new Error('此設定超過模板的輸入分揀器接口數量。');
  const outputSorters = block.transport.outputCount;
  if (outputSorters > 3) throw new Error('此設定超過模板的輸出分揀器接口數量。');
  for (let n = 0; n < outputSorters; n++) sorters.push({ item: block.id, span: 1, xOffset: n - (outputSorters === 1 ? 0 : 1), y: 14, direction: 'out' });
  const layout = block.layout ?? 'row', arrangement = LAYOUTS[layout];
  if (!arrangement) throw new Error('不支援此產線排列。');
  const largestFlow = Math.max(block.perMachine, ...inputLanes.map(l => l.perMachine));
  const beltMachineLimit = Math.floor(beltCapacity / largestFlow + 1e-10);
  const requestedRowSize = arrangement.rows === 1 ? 12 : (block.rowSize ?? 4);
  const machinesPerRow = Math.min(requestedRowSize, beltMachineLimit);
  const machinesPerCell = arrangement.shared ? Math.min(requestedRowSize * arrangement.rows, beltMachineLimit) : machinesPerRow * arrangement.rows;
  if (machinesPerCell < 1) throw new Error('單台設備的流量超過模板輸送能力。');
  const materialCount = inputLanes.length + 1;
  // Keep recipe materials in the station; overflow spray supply gets its own belt port.
  const externalSpray = Boolean(block.effect.tier && (!logistics.stationId || materialCount + 1 > logistics.slots));
  const slotCount = logistics.stationId ? materialCount + (block.effect.tier && !externalSpray ? 1 : 0) : 0;
  if (slotCount > logistics.slots) throw new Error(`物料種類超過${logistics.label}槽位。`);
  const cells = [];
  let remaining = block.count, remainingOutput = block.output;
  while (remaining > 0) {
    const count = Math.min(machinesPerCell, remaining);
    const output = Math.min(count * block.perMachine, remainingOutput);
    const rowCount = Math.min(arrangement.rows, count);
    let rowRemaining = count;
    const rows = Array.from({ length: rowCount }, (_, rowIndex) => {
      const rowMachines = Math.ceil(rowRemaining / (rowCount - rowIndex));
      rowRemaining -= rowMachines;
      return { index: rowIndex, count: rowMachines, output: output * rowMachines / count, capacity: rowMachines * block.perMachine };
    });
    cells.push({ rows, branchBeltLoad: largestFlow * Math.max(...rows.map(r => r.count)) / beltCapacity,
      trunkBeltLoad: arrangement.shared ? largestFlow * count / beltCapacity : null, index: cells.length, count, output, capacity: count * block.perMachine,
      width: 26 + (count - 1) * PRESET.machinePitch, height: 26,
      maxBeltLoad: largestFlow * (arrangement.shared ? count : Math.max(...rows.map(r => r.count))) / beltCapacity });
    remaining -= count; remainingOutput = Math.max(0, remainingOutput - output);
  }
  return { id: `${mode}-${layout}-v1`, beltCapacity, sorterRates, layout, arrangement, machinesPerRow, requestedRowSize, beltMachineLimit, mode, logistics, externalSpray, inputLanes, sorters, machinesPerCell, cells, slotCount,
    stations: logistics.stationId ? cells.reduce((sum, c) => sum + (arrangement.shared ? 1 : c.rows.length), 0) : 0, sorterCount: block.count * sorters.length,
    coaterCount: block.effect.tier ? cells.reduce((sum, c) => sum + c.rows.length * inputLanes.length, 0) : 0,
    validation: 'model-checked', gameValidated: false };
}

export function cellGeometry(block, template, index = 0) {
  if (template.schematic) return schematicGeometry(block,template,index);
  const cell = template.cells[index];
  if (!cell) throw new Error('找不到這組配置。');
  if (template.layout !== 'row') return multiRowGeometry(block, template, cell);
  const end = 22 + (cell.count - 1) * PRESET.machinePitch;
  const machines = Array.from({ length: cell.count }, (_, i) => ({ id: i + 1, x: 20 + i * PRESET.machinePitch, y: 12, w: 3, h: 3 }));
  const hasStation = Boolean(template.logistics.stationId);
  // Station-to-belt routing uses separate exits and orthogonal, non-crossing paths.
  const belts = template.inputLanes.map((lane, i) => ({ item: lane.item, direction: 'in',
    rate: block.inputs[lane.item] * cell.output / block.output,
    points: hasStation
      ? [[6 - i, 9], [6 - i, 4 - i], [12 + i * 2, 4 - i], [12 + i * 2, lane.y], [end, lane.y]]
      : [[2, 4 - i], [12 + i * 2, 4 - i], [12 + i * 2, lane.y], [end, lane.y]],
    fullRate: lane.perMachine * cell.count,
  }));
  belts.push({ item: block.id, direction: 'out', rate: cell.output, fullRate: cell.capacity,
    points: hasStation ? [[end, 14], [11, 14], [11, 18], [6, 18], [6, 15]] : [[end, 14], [2, 14]] });
  const coaters = block.effect.tier ? template.inputLanes.map((l, i) => ({ x: 12 + i * 2, y: 6, item: l.item })) : [];
  if (block.effect.tier) belts.push({ item: `proliferator-${block.effect.tier}`, direction: 'spray', elevated: true,
    rate: block.sprayRate * cell.output / block.output,
    fullRate: template.inputLanes.reduce((sum, l) => sum + l.perMachine, 0) * cell.count / block.effect.sprays,
    points: template.externalSpray
      ? [[2, 6], [12 + (template.inputLanes.length - 1) * 2, 6]]
      : [[8, 11], [10, 11], [10, 6], [12 + (template.inputLanes.length - 1) * 2, 6]] });
  const sorters = machines.flatMap(m => template.sorters.map(s => ({ ...s,
    from: [m.x + s.xOffset, s.direction === 'in' ? s.y : 13],
    to: [m.x + s.xOffset, s.direction === 'in' ? 11 : 14],
  })));
  const towers = [...(hasStation ? [{ x: 9, y: 15 }] : []), ...machines.map(m => ({ x: m.x, y: 17 }))];
  const ports = belts.filter(belt => !hasStation || (belt.direction === 'spray' && template.externalSpray)).map(belt => ({
    item: belt.item, direction: belt.direction, rate: belt.rate,
    point: belt.direction === 'out' ? belt.points.at(-1) : belt.points[0],
  }));
  const beltCount = belts.reduce((sum, belt) => sum + 1 + belt.points.slice(1).reduce((length, p, i) => length + Math.abs(p[0] - belt.points[i][0]) + Math.abs(p[1] - belt.points[i][1]), 0), 0);
  return { ...cell, end, station: hasStation ? { x: 5, y: 12, w: 5, h: 5, item: template.logistics.stationId } : null,
    ports, machines, belts, coaters, sorters, towers, beltCount };
}

function multiRowGeometry(block, template, cell) {
  const shared = template.arrangement.shared;
  const rowPitch = !shared && template.logistics.stationId ? PRESET.cellSpacing : 26;
  const dx = shared ? 28 : 0;
  const result = { ...cell, machines: [], belts: [], coaters: [], sorters: [], towers: [], ports: [], stations: [],
    splitters: [], links: [], rowLabels: [], beltCount: 0, station: null, schematicDistribution: shared };
  const rowPorts = [];
  let machineId = 0;
  for (const row of cell.rows) {
    const dy = row.index * rowPitch;
    const p = point => [point[0] + dx, point[1] + dy];
    const move = obj => ({ ...obj, x: obj.x + dx, y: obj.y + dy });
    const rowTemplate = { ...template, layout: 'row', cells: [{ ...row, width: 26 + (row.count - 1) * PRESET.machinePitch, height: 26 }],
      logistics: shared ? LOGISTICS.belt : template.logistics, externalSpray: shared ? Boolean(block.effect.tier) : template.externalSpray };
    const g = cellGeometry(block, rowTemplate, 0);
    result.machines.push(...g.machines.map(m => ({ ...move(m), id: ++machineId })));
    result.belts.push(...g.belts.map(b => ({ ...b, row: row.index, points: b.points.map(p) })));
    result.coaters.push(...g.coaters.map(move));
    result.sorters.push(...g.sorters.map(s => ({ ...s, from: p(s.from), to: p(s.to) })));
    result.towers.push(...g.towers.map(move));
    if (g.station) result.stations.push(move(g.station));
    const ports = g.ports.map(port => ({ ...port, row: row.index, point: p(port.point) }));
    rowPorts.push(ports);
    if (!shared) result.ports.push(...ports);
    result.beltCount += g.beltCount;
    result.rowLabels.push({ x: dx + 2, y: dy + 1, ...row });
  }
  result.width = dx + 26 + (Math.max(...cell.rows.map(r => r.count)) - 1) * PRESET.machinePitch;
  result.height = (cell.rows.length - 1) * rowPitch + 26;
  result.end = result.width - 4;
  if (!shared) return result;
  const centerY = 12 + (cell.rows.length - 1) * rowPitch / 2;
  if (template.logistics.stationId) {
    result.stations.push({ x: 5, y: centerY, w: 5, h: 5, item: template.logistics.stationId });
    result.towers.push({ x: 9, y: centerY + 3 });
  }
  const materials = rowPorts[0].map(port => ({ item: port.item, direction: port.direction }));
  for (const [index, material] of materials.entries()) {
    const ports = rowPorts.map(row => row.find(p => p.item === material.item));
    const rate = ports.reduce((sum, p) => sum + p.rate, 0);
    const fullRate = result.belts.filter(b => b.item === material.item).reduce((sum, b) => sum + b.fullRate, 0);
    const point = [template.logistics.stationId ? 8 : 2, centerY - 10 + index * 5];
    const open = !template.logistics.stationId || (material.direction === 'spray' && template.externalSpray);
    if (open) result.ports.push({ ...material, rate, point });
    const split = { ...material, x: 18, y: centerY - 10 + index * 5, rate, fullRate, branches: ports.length };
    // Distribution links describe connectivity, not buildable grid routes or ramp lengths.
    if (ports.length > 1) result.splitters.push(split);
    const hub = ports.length > 1 ? [split.x, split.y] : point;
    const link = (from, to, flow, maximum, role) => result.links.push({ ...material,
      from: material.direction === 'out' ? to : from, to: material.direction === 'out' ? from : to,
      rate: flow, fullRate: maximum, role });
    if (ports.length > 1) link(point, hub, rate, fullRate, 'trunk');
    for (const port of ports) {
      const belt = result.belts.find(b => b.item === port.item && b.row === port.row);
      link(hub, port.point, port.rate, belt.fullRate, 'branch');
    }
  }
  return result;
}

export function layoutTotals(plan) {
  const result = { stations: 0, stationsByType: { 'planetary-logistics-station': 0, 'interstellar-logistics-station': 0 },
    schematicGroups:0, splitters: 0, sorters: 0, coaters: 0, belts: 0, towers: 0, machines: {} };
  for (const block of plan.blocks) {
    const template = planTemplate(block);
    if (template.schematic) result.schematicGroups+=template.cells.length;
    result.stations += template.stations;
    if (template.logistics.stationId) result.stationsByType[template.logistics.stationId] += template.stations;
    result.sorters += template.sorterCount;
    result.coaters += template.coaterCount;
    result.machines[block.recipe.machine] = (result.machines[block.recipe.machine] ?? 0) + block.count;
    for (const cell of template.cells) {
      const geometry = cellGeometry(block, template, cell.index);
      result.splitters += geometry.splitters?.length ?? 0;
      result.belts += geometry.beltCount;
      result.towers += geometry.towers.length;
    }
  }
  return result;
}
