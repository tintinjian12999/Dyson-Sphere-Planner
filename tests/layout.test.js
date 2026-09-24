import test from 'node:test';
import assert from 'node:assert/strict';
import { defaultState, normalizeState } from '../src/state.js';
import { solvePlan } from '../src/planner.js';
import { planTemplate, cellGeometry, layoutTotals } from '../src/templates.js';
import { layoutSVG, layoutDetails } from '../src/render.js';
import { LEGACY_TARGETS as TARGETS, PRESET } from '../src/data.js';

const close = (a,b) => assert.ok(Math.abs(a-b) < 1e-7, `${a} != ${b}`);
const targetBlock = options => {
  const plan = solvePlan({ ...defaultState(), ...options });
  const block = plan.byId[plan.state.target];
  return { plan, block, template: planTemplate(block) };
};

test('twelve machines split into three rows of four with conserved splitter flows', () => {
  const { plan, block, template } = targetBlock({ rate: 540, layout: 'split3', logistics: 'belt' });
  const g = cellGeometry(block, template);
  assert.deepEqual(g.rows.map(r=>r.count), [4,4,4]);
  assert.equal(g.splitters.length, 3);
  assert.equal(g.stations.length, 0);
  close(g.branchBeltLoad, .2);
  close(g.trunkBeltLoad, .6);
  assert.equal(g.ports.length, 3);
  for (const splitter of g.splitters) {
    const links = g.links.filter(l=>l.item===splitter.item);
    close(links.filter(l=>l.role==='branch').reduce((n,l)=>n+l.rate,0), splitter.rate);
    close(links.find(l=>l.role==='trunk').fullRate, splitter.fullRate);
  }
  assert.equal(plan.totalMachines, solvePlan({ ...defaultState(), rate:540 }).totalMachines);
});

test('custom row size changes grouping while shared trunks retain the single-belt cap', () => {
  const a = targetBlock({ rate: 1080, layout: 'split3', rowSize: 8 });
  assert.deepEqual(a.template.cells[0].rows.map(r=>r.count), [7,7,6]);
  assert.equal(a.template.machinesPerCell, 20);
  const b = targetBlock({ rate:1080, layout:'parallel3', rowSize:8 });
  assert.equal(b.template.cells.length, 1);
  assert.deepEqual(b.template.cells[0].rows.map(r=>r.count), [8,8,8]);
  assert.equal(cellGeometry(b.block,b.template).stations.length, 3);
  const c = targetBlock({ target:'magnetic-coil', rate: 4320, layout:'parallel3', rowSize:12,
    proliferation:{tier:3,mode:'speed'} });
  assert.equal(c.template.machinesPerRow, 5);
  assert.equal(c.template.machinesPerCell, 15);
  assert.equal(c.template.cells[0].count, 12);
  const shared = planTemplate({...c.block, layout:'split3'});
  assert.equal(shared.machinesPerCell, 5);
  assert.equal(shared.cells.length, 3);
});

test('partial groups and all multi-row combinations conserve flows and respect every belt', () => {
  for (const layout of ['split3','parallel3']) for (const logistics of ['belt','pls','ils'])
    for (const target of TARGETS) for (const rowSize of [1,4,12]) for (const tier of [0,1,2,3]) for (const mode of ['products','speed']) {
      const plan = solvePlan({ ...defaultState(), target, rate:2345.67, layout, logistics, rowSize, proliferation:{tier,mode} });
      const counts = { machines:0, stations:0, coaters:0, splitters:0 };
      for (const b of plan.blocks) {
        const t = planTemplate(b);
        let output = 0;
        for (const cell of t.cells) {
          const g = cellGeometry(b,t,cell.index);
          output += g.output;
          counts.machines += g.machines.length;
          counts.stations += g.stations.length;
          counts.coaters += g.coaters.length;
          counts.splitters += g.splitters.length;
          assert.equal(g.machines.length, cell.count);
          assert.ok(g.rows.length <= 3);
          close(g.rows.reduce((sum,r)=>sum+r.output,0),cell.output);
          assert.ok(g.rows.every(r=>r.count<=rowSize && r.count>=1));
          for (const belt of [...g.belts,...g.links]) assert.ok(belt.fullRate <= PRESET.beltCapacity + 1e-8);
          for (const [id, rate] of [...Object.entries(b.inputs),[b.id,b.output]]) {
            close(g.belts.filter(belt=>belt.item===id).reduce((sum,belt)=>sum+belt.rate,0), rate*cell.output/b.output);
          }
        }
        close(output,b.output);
      }
      const totals = layoutTotals(plan);
      assert.equal(counts.machines,plan.totalMachines);
      assert.equal(counts.stations,totals.stations);
      assert.equal(counts.coaters,totals.coaters);
      assert.equal(counts.splitters,totals.splitters);
    }
});

test('layout and row-size overrides survive JSON roundtrip and legacy defaults', () => {
  const state = normalizeState(JSON.parse(JSON.stringify({ ...defaultState(), layout:'split3', rowSize:8,
    layoutOverrides:{gear:'parallel3'}, rowSizeOverrides:{gear:2} })));
  const plan = solvePlan({...state, layout:'row',rowSize:12});
  assert.equal(plan.byId.gear.layout,'parallel3');
  assert.equal(plan.byId.gear.rowSize,2);
  assert.equal(plan.byId['electric-motor'].layout,'row');
  const old = defaultState(); delete old.layout; delete old.rowSize;
  assert.equal(normalizeState(old).layout,'row');
  assert.equal(normalizeState(old).rowSize,4);
  for (const layout of [null,'invalid','__proto__']) assert.throws(()=>normalizeState({...state,layout}));
  for (const rowSize of [0,61,2.5,null,'4',Infinity]) assert.throws(()=>normalizeState({...state,rowSize}));
  assert.throws(()=>normalizeState({...state,rowSizeOverrides:{gear:0}}));
});

test('multi-row export includes all machines, splitters, station types and routing limits', () => {
  for (const layout of ['split3','parallel3']) {
    const {block,template} = targetBlock({layout,logistics:'pls',proliferation:{tier:3,mode:'products'}});
    const g = cellGeometry(block,template), svg = layoutSVG(block,template,0), html = layoutDetails(block,template,g);
    assert.ok(svg.includes('第 3 列'));
    assert.ok(svg.includes('PLS ·'));
    assert.ok(svg.includes('尚未經遊戲內驗證'));
    assert.ok(!svg.includes('NaN'));
    assert.ok(html.includes('每列設定 4 台'));
    if (layout==='split3') { assert.ok(svg.includes('分流')); assert.ok(html.includes('尚未求解格線路徑')); }
    else assert.ok(html.includes('各列產品分別輸出，不合流'));
  }
});
