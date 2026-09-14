/**
 * Ierarhia titlurilor: exact un h1, fără sărituri de nivel (h2 → h4), în ordinea din document.
 *   node qa/headings.mjs dist/index.html [dist/en.html …]
 */
import { readFileSync } from 'node:fs';
let bad = 0;
for (const file of process.argv.slice(2)) {
  const html = readFileSync(file, 'utf8').replace(/<script[\s\S]*?<\/script>/gi, '');
  const hs = [...html.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({ level: +m[1], text: m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 60) }));
  const h1 = hs.filter((h) => h.level === 1).length;
  const jumps = [];
  let prev = 0;
  for (const h of hs) { if (h.level > prev + 1 && prev !== 0) jumps.push(`${prev}→${h.level} la „${h.text}”`); prev = h.level; }
  const ok = h1 === 1 && jumps.length === 0;
  if (!ok) bad++;
  console.log(`${ok ? 'OK ' : 'NU '} ${file}: ${h1} h1, ${hs.length} titluri${jumps.length ? '; sărituri: ' + jumps.join(', ') : ''}`);
  if (process.env.VERBOSE) hs.forEach((h) => console.log(`     ${'  '.repeat(h.level - 1)}h${h.level} ${h.text}`));
}
process.exit(bad ? 1 : 0);
