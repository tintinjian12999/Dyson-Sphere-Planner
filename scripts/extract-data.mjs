import fs from 'node:fs';
import OpenCC from 'opencc-js';

const source = JSON.parse(fs.readFileSync('docs/factoriolab-dsp-source.json', 'utf8'));
const subset = {
  commit: '3709b0682893e812db365dd31b3d2bb5ef35a6f1', version: source.version,
  recipes: source.recipes.filter(r => !r.flags?.includes('technology')),
  items: source.items.filter(i => ['components','buildings','buildings-alt','effects'].includes(i.category)),
  productivity: source.limitations.productivity,
};
fs.writeFileSync('src/catalog.js', '// Pinned FactorioLab DSP data; see docs/SOURCES.md.\nexport const CATALOG = ' + JSON.stringify(subset, null, 2) + ';\n');
const html = fs.readFileSync('upstream.html', 'utf8');
const match = html.match(/const ICON=(\{[^\n]+\});/);
if (!match) throw new Error('The upstream icon map was not found');
fs.writeFileSync('src/icons.js', 'export const ICONS = ' + JSON.stringify(JSON.parse(match[1])) + ';\n');
const names = html.match(/const NAME_ZH=(\{[^\n]+\});/);
if (!names) throw new Error('Missing upstream Chinese names');
const convert = OpenCC.Converter({ from: 'cn', to: 'tw' });
fs.writeFileSync('src/names.js', '// Upstream names converted to Traditional Chinese with OpenCC.\nexport const CATALOG_NAMES = ' + JSON.stringify(Object.fromEntries(Object.entries(JSON.parse(names[1])).map(([id,name]) => [id,convert(name)])),null,2) + ';\n');
console.log('Extracted all physical products, non-technology recipes and Traditional Chinese names.');
