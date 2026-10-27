/**
 * Linkurile interne din dist/: fiecare href local trebuie să ducă la un fișier din build (build.format: 'file' →
 * /despre = dist/despre.html) și, dacă are ancoră, la un id din pagina țintă.
 *   node qa/links.mjs [--expected <cale>,<cale>…]
 * Rutele din routes.ts ale căror pagini vin în fazele următoare se raportează separat, ca „așteptate”, nu ca erori.
 */
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { routes, dynamicRoutes } from '../src/i18n/routes.ts';

const DIST = path.resolve(import.meta.dirname, '..', 'dist');
const pages = [];
async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p); else if (e.name.endsWith('.html')) pages.push(p);
  }
}
await walk(DIST);

const fileFor = (url) => {
  const clean = url.replace(/\/$/, '') || '/';
  if (clean === '/') return path.join(DIST, 'index.html');
  const direct = path.join(DIST, clean);
  if (/\.[a-z0-9]+$/i.test(clean)) return direct;
  return existsSync(direct + '.html') ? direct + '.html' : path.join(direct, 'index.html');
};
// Rutele cunoscute (toate fazele): o țintă lipsă care e aici e o pagină din fazele următoare.
const known = new Set([...Object.values(routes).flatMap((r) => [r.ro, r.en]), ...Object.values(dynamicRoutes).flatMap((r) => [r.ro, r.en])]);
const isKnown = (u) => known.has(u) || [...known].some((k) => k !== '/' && u.startsWith(k + '/'));

const broken = [], pending = new Map(), anchors = [];
const idsCache = new Map();
const ids = async (file) => {
  if (!idsCache.has(file)) idsCache.set(file, new Set([...(await readFile(file, 'utf8')).matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  return idsCache.get(file);
};
let total = 0;
for (const page of pages) {
  const html = await readFile(page, 'utf8');
  const from = '/' + path.relative(DIST, page).replace(/\\/g, '/').replace(/(index)?\.html$/, '');
  for (const m of html.matchAll(/\shref="([^"]+)"/g)) {
    const href = m[1];
    if (!href.startsWith('/') || href.startsWith('//')) {
      if (href.startsWith('#') && href.length > 1 && !(await ids(page)).has(href.slice(1))) anchors.push(`${from}: ${href}`);
      continue;
    }
    total++;
    const [url, hash] = href.split('#');
    const file = fileFor(url);
    if (!existsSync(file)) {
      if (isKnown(url.replace(/\/$/, '') || '/')) { const s = pending.get(url) ?? new Set(); s.add(from); pending.set(url, s); }
      else broken.push(`${from} → ${href}`);
      continue;
    }
    if (hash && file.endsWith('.html') && !(await ids(file)).has(hash)) anchors.push(`${from} → ${href}`);
  }
}
console.log(`${pages.length} pagini, ${total} linkuri interne`);
console.log(`Rupte: ${broken.length}`); broken.forEach((b) => console.log('  ✗ ' + b));
console.log(`Ancore lipsă (în pagini existente): ${anchors.length}`); anchors.forEach((a) => console.log('  ✗ ' + a));
console.log(`Așteptate (pagini din fazele următoare): ${pending.size}`);
[...pending.keys()].sort().forEach((u) => console.log(`  · ${u}`));
process.exit(broken.length || anchors.length ? 1 : 0);
