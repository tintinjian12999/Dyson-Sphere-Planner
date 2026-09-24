import test from 'node:test';
import assert from 'node:assert/strict';
import { fmt, layoutSVG, layoutDetails } from '../src/render.js';
import { defaultState } from '../src/state.js';
import { solvePlan } from '../src/planner.js';
import { planTemplate, cellGeometry } from '../src/templates.js';

test('small valid production and spray rates never display as zero', () => {
  assert.equal(fmt(0.001), '0.001');
  assert.notEqual(fmt(0.000000123), '0');
});

test('exported layouts and instructions follow the selected interface', () => {
  for (const logistics of ['belt','pls','ils']) {
    const plan = solvePlan({ ...defaultState(), logistics, target: 'electric-motor', proliferation: {tier:3,mode:'products'} });
    const b = plan.byId['electric-motor'], t = planTemplate(b), g = cellGeometry(b,t);
    const svg = layoutSVG(b,t,0), html = layoutDetails(b,t,g);
    if (logistics === 'belt') {
      assert.ok(svg.includes('傳送帶直出 · 無物流站'));
      assert.ok(!svg.includes('ILS ·'));
      assert.ok(html.includes('傳送帶輸出'));
      assert.ok(!html.includes('物流站槽位'));
    } else if (logistics === 'pls') {
      assert.ok(svg.includes('PLS · 4/4'));
      assert.ok(html.includes('增產劑改由圖上獨立'));
      assert.ok(!html.includes('遠端預設'));
    } else {
      assert.ok(svg.includes('ILS · 5/5'));
      assert.ok(html.includes('遠端預設'));
    }
  }
});

test('SVG exports reference one shared sprite and expose the verification status', () => {
  const plan = solvePlan(defaultState()), block = plan.byId[plan.state.target];
  const svg = layoutSVG(block, planTemplate(block), 1);
  assert.equal((svg.match(/\.\/assets\/icons\.webp/g) ?? []).length, 1);
  assert.ok(svg.includes('目標 60 / min'));
  assert.ok(svg.includes('尚未經遊戲內驗證'));
  assert.ok(svg.includes('viewBox='));
});
