import { readdirSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

for (const dir of ['src', 'scripts', 'tests']) {
  for (const file of readdirSync(dir).filter(name => /\.(m?js)$/.test(name))) {
    const result = spawnSync(process.execPath, ['--check', `${dir}/${file}`], { encoding: 'utf8' });
    if (result.status) { console.error(result.stderr); process.exit(result.status); }
  }
}
const html = readFileSync('index.html', 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
if (new Set(ids).size !== ids.length) throw new Error('Duplicate HTML IDs');
console.log('JavaScript syntax and document IDs passed.');
