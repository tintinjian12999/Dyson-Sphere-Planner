import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.md': 'text/plain; charset=utf-8' };
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    const relative = path.relative(root, file);
    if (relative.startsWith('..') || path.isAbsolute(relative) || relative.split(path.sep).some(part => part.startsWith('.'))) {
      res.writeHead(403); res.end('Forbidden'); return;
    }
    const contents = await fs.readFile(file);
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] ?? 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    res.end(contents);
  } catch { res.writeHead(404); res.end('Not found'); }
});
server.listen(Number(process.env.PORT ?? 4173), '127.0.0.1', () => console.log('Dyson planner ready at http://127.0.0.1:' + server.address().port));
