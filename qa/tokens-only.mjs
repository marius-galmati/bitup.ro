/**
 * A doua verificare, lângă brand_check: în src/ nu există valori de design scrise direct (CLAUDE.md § Reguli scurte).
 *   node qa/tokens-only.mjs   → cod de ieșire 1 dacă găsește ceva.
 * Caută, în blocurile <style> din .astro și în .css: culori hex / rgb() / hsl(), `box-shadow`, gradiente, `border-radius`
 * care nu vine din var(--radius…), `font-family` care nu vine din var(--font-…), `font-size` în px / rem scris direct.
 * Excepții: brand/ (sursa tokens-urilor), comentariile, `0` și `50%` (cercuri) la border-radius.
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..', 'src');
const files = [];
async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else if (/\.(astro|css)$/.test(e.name)) files.push(p);
  }
}
await walk(ROOT);

const rules = [
  [/#[0-9a-f]{3,8}\b(?![\w-])/gi, 'culoare hex'],
  [/\b(rgba?|hsla?|oklch|lab)\(/gi, 'culoare funcțională'],
  [/box-shadow\s*:(?!\s*none)/gi, 'umbră'],
  [/(linear|radial|conic)-gradient\(/gi, 'gradient'],
  [/border-radius\s*:\s*([^;}]+)/gi, 'border-radius fără token', (v) => !/^(var\(--radius[\w-]*\)|0|50%)$/.test(v.trim())],
  [/font-family\s*:\s*([^;}]+)/gi, 'font-family fără token', (v) => !/^(var\(--font-[\w-]+\)|inherit)$/.test(v.trim())],
  [/font-size\s*:\s*[\d.]+(px|rem|em)\b/gi, 'font-size scris direct'],
];

const problems = [];
for (const f of files) {
  const src = await readFile(f, 'utf8');
  // Doar CSS: în .astro, conținutul blocurilor <style> și al atributelor style=""; fără comentarii.
  const css = f.endsWith('.css')
    ? src
    : [...src.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n') + '\n' + [...src.matchAll(/style=\{?[`"]([^`"]*)[`"]/g)].map((m) => m[1]).join('\n');
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, '');
  for (const [re, why, bad] of rules) {
    for (const m of clean.matchAll(re)) if (!bad || bad(m[1])) problems.push(`${path.relative(ROOT, f)}: ${why}: ${m[0].trim().slice(0, 80)}`);
  }
}
if (problems.length) {
  console.log(problems.map((p) => '✗ ' + p).join('\n'));
  console.log(`\n${problems.length} probleme`);
  process.exit(1);
}
console.log(`✓ tokens-only: ${files.length} fișiere, nicio valoare scrisă direct`);
