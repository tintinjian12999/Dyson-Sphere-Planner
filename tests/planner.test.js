import test from 'node:test';
import assert from 'node:assert/strict';
import { solvePlan } from '../src/planner.js';
import { defaultState, normalizeState, loadState } from '../src/state.js';
import { planTemplate, cellGeometry, layoutTotals } from '../src/templates.js';
import { LEGACY_TARGETS as TARGETS, PRESET } from '../src/data.js';

const close = (actual, expected, message) => assert.ok(Math.abs(actual - expected) < 1e-7, `${message ?? ''}: ${actual} != ${expected}`);

test('600 turbines/min matches independently derived recipes and raw ore demand', () => {
  const p = solvePlan(defaultState());
  assert.equal(p.blocks.length, 7);
  assert.equal(p.demand['iron-ore'], 6000);
  assert.equal(p.demand['copper-ore'], 1200);
  assert.equal(p.byId['electric-motor'].output, 1200);
  assert.equal(p.byId['magnetic-coil'].output, 2400);
  assert.equal(p.byId['iron-ingot'].count, 30);
  assert.equal(p.byId.magnet.count, 30);
  assert.equal(p.byId['electromagnetic-turbine'].count, 14);
  assert.equal(p.totalMachines, 139);
});

test('extra products apply to the final recipe and compound upstream', () => {
  const p = solvePlan({ ...defaultState(), proliferation: { tier: 3, mode: 'products' } });
  close(p.byId['electromagnetic-turbine'].crafts, 480);
  close(p.byId['electric-motor'].output, 960);
  close(p.byId['magnetic-coil'].output, 1728);
  // Iron: (1536 + 768 / 1.25) / 1.25 + (1728 * 2 / 2.5) / 1.25.
  close(p.demand['iron-ore'], 2826.24);
  close(p.demand['copper-ore'], 552.96);
  close(p.sources.find(s => s.item === 'proliferator-3').rate, 184.32);
});

test('speed mode reduces machines without inventing extra materials', () => {
  const p = solvePlan({ ...defaultState(), proliferation: { tier: 3, mode: 'speed' } });
  assert.equal(p.demand['iron-ore'], 6000);
  assert.equal(p.demand['copper-ore'], 1200);
  assert.equal(p.byId['electromagnetic-turbine'].count, 7);
});

test('explicit off and mode overrides are independent of global defaults', () => {
  const p = solvePlan({ ...defaultState(), proliferation: { tier: 3, mode: 'products' }, overrides: {
    'electromagnetic-turbine': { tier: 0, mode: 'products' }, 'electric-motor': { tier: 1, mode: 'speed' },
  } });
  assert.equal(p.byId['electromagnetic-turbine'].sprayRate, 0);
  assert.equal(p.byId['electric-motor'].output, 1200);
  assert.equal(p.byId['electric-motor'].effect.speed, 1.25);
  assert.equal(p.byId['magnetic-coil'].effect.yield, 1.25);
});

test('reserved existing supply model fills deficits once after shared demands aggregate', () => {
  const p = solvePlan({ ...defaultState(), supplies: { 'electric-motor': 400, 'magnetic-coil': 1000 } });
  assert.equal(p.byId['electric-motor'].output, 800);
  assert.equal(p.byId['magnetic-coil'].output, 1000);
  for (const id of ['electric-motor', 'magnetic-coil']) {
    close(p.edges.filter(e => e.item === id).reduce((n, e) => n + e.rate, 0), p.demand[id]);
  }
  const full = solvePlan({ ...defaultState(), supplies: { 'electric-motor': 1200 } });
  assert.ok(!full.byId['electric-motor']);
  assert.ok(!full.byId.gear);
  assert.ok(full.byId['magnetic-coil']);
});

test('all supported products and proliferation modes conserve flows and fit template constraints', () => {
  for (const logistics of ['belt', 'pls', 'ils']) for (const target of TARGETS) for (const tier of [0, 1, 2, 3]) for (const mode of ['products', 'speed']) {
    const p = solvePlan({ ...defaultState(), logistics, target, rate: 2345.67, proliferation: { tier, mode } });
    for (const b of p.blocks) {
      const t = planTemplate(b);
      assert.ok(b.capacity + 1e-8 >= b.output);
      assert.ok(t.slotCount <= t.logistics.slots);
      close(t.cells.reduce((n, c) => n + c.output, 0), b.output);
      for (const [item, amount] of Object.entries(b.inputs)) {
        close(p.edges.filter(e => e.target === b.id && e.item === item).reduce((n, e) => n + e.rate, 0), amount);
      }
      for (const cell of t.cells) {
        const g = cellGeometry(b, t, cell.index);
        assert.ok(cell.maxBeltLoad <= 1 + 1e-10);
        assert.equal(g.machines.length, cell.count);
        for (const belt of g.belts) assert.ok(belt.fullRate <= PRESET.beltCapacity + 1e-8);
        for (const sorter of g.sorters) assert.ok(sorter.span >= 1 && sorter.span <= 3);
      }
    }
    assert.equal(layoutTotals(p).stations > 0, logistics !== 'belt');
  }
});

test('tiny positive demand and the maximum rate retain finite plans', () => {
  for (const rate of [0.001, 60000]) {
    const p = solvePlan({ ...defaultState(), rate });
    assert.ok(p.blocks.every(b => Number.isFinite(b.count) && b.count > 0));
    assert.ok(Number.isFinite(layoutTotals(p).belts));
  }
});

test('invalid persisted or imported settings are rejected, never rendered as trusted HTML', () => {
  for (const rate of [0, 0.00001, -1, NaN, Infinity, 60001, '600']) assert.throws(() => normalizeState({ ...defaultState(), rate }));
  assert.throws(() => normalizeState({ ...defaultState(), target: '<script>' }));
  assert.throws(() => normalizeState({ ...defaultState(), proliferation: { tier: 4, mode: 'products' } }));
  assert.throws(() => normalizeState({ ...defaultState(), version: 99 }));
  assert.equal(loadState({ getItem: () => 'not json' }).state.target, 'electromagnetic-turbine');
  assert.equal(normalizeState(JSON.parse(JSON.stringify(defaultState()))).rate, 600);
});

test('ground belts remain separate and do not pass through production buildings', () => {
  for (const layout of ['row','split3','parallel3']) for (const logistics of ['belt', 'pls', 'ils']) for (const target of TARGETS) for (const tier of [0, 3]) for (const mode of ['products','speed']) {
    const p = solvePlan({ ...defaultState(), layout, logistics, target, proliferation: { tier, mode } });
    for (const block of p.blocks) {
      const template = planTemplate(block);
      const g = cellGeometry(block, template);
      const occupied = new Map();
      for (const belt of g.belts.filter(b => !b.elevated)) {
        const points = new Set();
        for (let i = 1; i < belt.points.length; i++) {
          const a = belt.points[i - 1], b = belt.points[i];
          const dx = Math.sign(b[0] - a[0]), dy = Math.sign(b[1] - a[1]);
          assert.ok(dx === 0 || dy === 0, 'Belts must be orthogonal');
          const length = Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1]);
          for (let n = 0; n <= length; n++) {
            const x = a[0] + n * dx, y = a[1] + n * dy;
            points.add(`${x},${y}`);
            for (const m of g.machines) assert.ok(Math.abs(x - m.x) > 1 || Math.abs(y - m.y) > 1, 'Belt intersects a machine footprint');
          }
        }
        for (const point of points) {
          assert.ok(!occupied.has(point), `${target}: ${belt.item} intersects ${occupied.get(point)} at ${point}`);
          occupied.set(point, belt.item);
        }
      }
      for (const sorter of g.sorters) {
        const inputLane = template.inputLanes.find(lane => lane.item === sorter.item);
        const rate = sorter.direction === 'in' ? inputLane.perMachine / inputLane.sorters : block.perMachine / template.sorters.filter(s => s.direction === 'out').length;
        assert.ok(rate <= PRESET.sorterNominalPerMinute / sorter.span + 1e-8);
      }
    }
  }
});

test('belt layouts remove stations, shorten routes, and retain exact flow at open ports', () => {
  const baseline = solvePlan(defaultState());
  const plan = solvePlan({ ...defaultState(), logistics: 'belt' });
  assert.deepEqual(plan.demand, baseline.demand);
  assert.equal(plan.totalMachines, 139);
  assert.equal(layoutTotals(plan).stations, 0);
  assert.ok(layoutTotals(plan).belts < layoutTotals(baseline).belts);
  for (const b of plan.blocks) {
    const t = planTemplate(b), g = cellGeometry(b, t);
    assert.equal(t.stations, 0);
    assert.equal(g.station, null);
    assert.equal(g.ports.length, Object.keys(b.inputs).length + 1);
    close(g.ports.find(port => port.direction === 'out').rate, g.output);
    assert.equal(g.ports.find(port => port.direction === 'out').point[0], 2);
  }
});

test('four-slot PLS with three ingredients routes spray through an external port', () => {
  const plan = solvePlan({ ...defaultState(), logistics: 'pls', proliferation: { tier: 3, mode: 'products' } });
  const motor = plan.byId['electric-motor'];
  const template = planTemplate(motor), geometry = cellGeometry(motor, template);
  assert.equal(template.slotCount, 4);
  assert.equal(template.externalSpray, true);
  assert.equal(geometry.station.item, 'planetary-logistics-station');
  assert.equal(geometry.ports.length, 1);
  assert.equal(geometry.ports[0].item, 'proliferator-3');
  close(geometry.ports[0].rate, motor.sprayRate * geometry.output / motor.output);
  const turbine = planTemplate(plan.byId['electromagnetic-turbine']);
  assert.equal(turbine.externalSpray, false);
  assert.equal(turbine.slotCount, 4);
});

test('mixed interfaces persist independently from proliferation and global logistics', () => {
  const state = { ...defaultState(), logistics: 'pls', logisticsOverrides: { 'electromagnetic-turbine': 'belt', gear: 'ils' } };
  const plan = solvePlan(normalizeState(JSON.parse(JSON.stringify(state))));
  const totals = layoutTotals(plan);
  assert.equal(totals.stationsByType['interstellar-logistics-station'], 2);
  assert.equal(totals.stationsByType['planetary-logistics-station'], 12);
  assert.equal(totals.stations, 14);
  const switched = solvePlan({ ...state, logistics: 'belt', proliferation: { tier: 2, mode: 'speed' } });
  assert.equal(switched.byId.gear.logistics, 'ils');
  assert.equal(switched.byId['electric-motor'].logistics, 'belt');
  assert.equal(switched.byId.gear.effect.tier, 2);
});

test('legacy plans retain ILS and invalid interface settings are rejected', () => {
  const old = defaultState(); delete old.logistics; delete old.logisticsOverrides;
  const migrated = normalizeState(old);
  assert.equal(migrated.logistics, 'ils');
  assert.deepEqual(migrated.logisticsOverrides, {});
  for (const logistics of ['invalid', null, '__proto__']) assert.throws(() => normalizeState({ ...old, logistics }));
  assert.throws(() => normalizeState({ ...old, logisticsOverrides: { gear: 'invalid' } }));
});
