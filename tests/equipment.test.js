import test from 'node:test';
import assert from 'node:assert/strict';
import { defaultState, normalizeState } from '../src/state.js';
import { solvePlan } from '../src/planner.js';
import { planTemplate, cellGeometry, layoutTotals } from '../src/templates.js';
import { DEFAULT_EQUIPMENT, EQUIPMENT_OPTIONS, MACHINES, BELTS, SORTERS } from '../src/data.js';
import { layoutSVG, layoutDetails } from '../src/render.js';

const close = (a,b) => assert.ok(Math.abs(a-b)<1e-7,`${a} != ${b}`);
const solve = equipment => solvePlan({...defaultState(),equipment:{...DEFAULT_EQUIPMENT,...equipment}});

test('basic machines match independent counts without changing ore requirements', () => {
  const basic = solve({belt:'conveyor-belt-1',sorter:'sorter-1',assembler:'assembling-machine-1',smelter:'arc-smelter'});
  assert.equal(basic.totalMachines,275);
  assert.equal(layoutTotals(basic).machines['arc-smelter'],140);
  assert.equal(layoutTotals(basic).machines['assembling-machine-1'],135);
  assert.equal(basic.demand['iron-ore'],6000);
  assert.equal(basic.demand['copper-ore'],1200);
  assert.ok(basic.blocks.every(b=>!b.transport.limited));
});

test('slower sorters constrain motor throughput instead of inventing full-speed capacity', () => {
  const plan = solve({sorter:'sorter-1'}), motor = plan.byId['electric-motor'];
  close(motor.nominalPerMachine,45);
  close(motor.perMachine,30);
  assert.equal(motor.count,40);
  assert.ok(motor.transport.reasons.includes('分揀器速度／接口數'));
  const turbine = plan.byId['electromagnetic-turbine'], t = planTemplate(turbine);
  assert.equal(t.sorters.filter(s=>s.direction==='in').length,3);
  close(turbine.perMachine,45);
  assert.deepEqual(plan.demand,solve({}).demand);
});

test('belt grades change grouping and constrain a machine that would overload one belt', () => {
  const first = solve({belt:'conveyor-belt-1'}), second = solve({belt:'conveyor-belt-2'}), third = solve({});
  assert.equal(planTemplate(first.byId['electromagnetic-turbine']).machinesPerCell,4);
  assert.equal(planTemplate(second.byId['electromagnetic-turbine']).machinesPerCell,8);
  assert.equal(planTemplate(third.byId['electromagnetic-turbine']).machinesPerCell,12);
  const p = solvePlan({...defaultState(),equipment:{...DEFAULT_EQUIPMENT,belt:'conveyor-belt-1',assembler:'df-recomposing-assembler'},proliferation:{tier:3,mode:'speed'}});
  const b = p.byId['magnetic-coil'];
  close(b.nominalPerMachine,720);
  close(b.perMachine,360);
  assert.ok(b.transport.limited);
  assert.ok(b.transport.reasons.includes('單台輸送帶容量'));
});

test('all equipment combinations conserve flow and fit belt and physical sorter ports', () => {
  for (const belt of EQUIPMENT_OPTIONS.belt) for (const sorter of EQUIPMENT_OPTIONS.sorter)
    for (const assembler of EQUIPMENT_OPTIONS.assembler) for (const smelter of EQUIPMENT_OPTIONS.smelter)
      for (const tier of [0,1,2,3]) for (const mode of ['products','speed']) for (const layout of ['row','split3','parallel3']) {
        const p = solvePlan({...defaultState(),rate:617.5,equipment:{belt,sorter,assembler,smelter},proliferation:{tier,mode},layout});
        for (const b of p.blocks) {
          const t = planTemplate(b);
          assert.ok(b.count*b.perMachine >= b.output-1e-7);
          assert.ok((b.count-1)*b.perMachine < b.output+1e-7);
          assert.ok(b.perMachine <= b.nominalPerMachine+1e-7);
          close(b.nominalPerMachine,60*MACHINES[b.recipe.machine].speed*b.effect.speed/b.recipe.time*b.recipe.output*b.effect.yield);
          assert.ok(t.sorters.filter(s=>s.direction==='in').length<=3);
          assert.ok(t.sorters.filter(s=>s.direction==='out').length<=3);
          for (const lane of t.inputLanes) assert.ok(lane.perMachine<=lane.sorters*SORTERS[sorter].rates[lane.span-1]+1e-7);
          assert.ok(b.perMachine<=b.transport.outputCount*SORTERS[sorter].rates[0]+1e-7);
          for (const cell of [t.cells[0],t.cells.at(-1)]) {
            const g = cellGeometry(b,t,cell.index);
            for (const path of [...g.belts,...(g.links??[])]) assert.ok(path.fullRate<=BELTS[belt].capacity+1e-7);
            for (const s of g.sorters) {
              assert.ok(s.from.every(Number.isInteger) && s.to.every(Number.isInteger));
              close(Math.abs(s.from[1]-s.to[1]),s.span);
            }
          }
        }
        const totals=layoutTotals(p);
        assert.ok(Object.keys(totals.machines).every(id=>[assembler,smelter].includes(id)));
        const inputs=p.blocks.flatMap(b=>Object.entries(b.inputs));
        close(inputs.filter(([id])=>id==='iron-ore').reduce((n,[,r])=>n+r,0),p.demand['iron-ore']);
      }
});

test('equipment selection migrates, validates and survives plan JSON roundtrip', () => {
  const old=defaultState();delete old.equipment;
  assert.deepEqual(normalizeState(old).equipment,DEFAULT_EQUIPMENT);
  const equipment={...DEFAULT_EQUIPMENT,belt:'conveyor-belt-2',sorter:'sorter-1',assembler:'assembling-machine-2',smelter:'df-negentropy-smelter'};
  assert.deepEqual(normalizeState(JSON.parse(JSON.stringify({...old,equipment}))).equipment,equipment);
  for (const equipment of [null,[],5,{belt:'__proto__'},{belt:'sorter-1'},{sorter:'sorter-4'},{assembler:null},{smelter:'invalid'}]) {
    assert.throws(()=>normalizeState({...old,equipment}));
  }
  const state=defaultState();state.equipment.belt='conveyor-belt-1';
  assert.equal(defaultState().equipment.belt,'conveyor-belt-3');
});

test('rendered and exported capacities and equipment names follow selections', () => {
  const p=solve({belt:'conveyor-belt-1',sorter:'sorter-1',assembler:'assembling-machine-2',smelter:'arc-smelter'});
  const b=p.byId['electric-motor'],t=planTemplate(b),g=cellGeometry(b,t);
  const svg=layoutSVG(b,t,0),html=layoutDetails(b,t,g);
  assert.ok(svg.includes('輸送帶 Mk.I · 分揀器 Mk.I'));
  assert.ok(svg.includes('製造台 Mk.II'));
  assert.ok(html.includes('單帶 360 件／分鐘'));
  assert.ok(!html.includes('1,800'));
  assert.ok(!svg.includes('NaN'));
});
