/**
 * A doua verificare, lângă brand_check: în src/ nu există valori de design scrise direct (CLAUDE.md § Reguli scurte).
 *   node qa/tokens-only.mjs   → cod de ieșire 1 dacă găsește ceva.
 * Caută, în blocurile <style> din .astro și în .css: culori hex / rgb() / hsl(), `box-shadow`, gradiente, `border-radius`
 * care nu vine din var(--radius…), `font-family` care nu vine din var(--font-…), `font-size` în px / rem scris direct.
 * În marcaj (.astro): filtrele SVG de blur / umbră și gradienții SVG.
 * Excepții: brand/ (sursa tokens-urilor), comentariile, `0` și `50%` (cercuri) la border-radius.
 * Excepția de fișier: HeroStack.astro poate avea umbre, blur și gradienți (umbrele moi), pentru că stiva din hero se
 * copiază exact cum e pe bitup.ro (Marius, 28 octombrie 2026). Restul regulilor se aplică și acolo.
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
  [/box-shadow\s*:(?!\s*none)/gi, 'umbră', null, 'efect'],
  [/drop-shadow\(/gi, 'umbră', null, 'efect'],
  [/\bblur\(/gi, 'blur', null, 'efect'],
  [/(linear|radial|conic)-gradient\(/gi, 'gradient', null, 'efect'],
  [/border-radius\s*:\s*([^;}]+)/gi, 'border-radius fără token', (v) => !/^(var\(--radius[\w-]*\)|0|50%)$/.test(v.trim())],
  [/font-family\s*:\s*([^;}]+)/gi, 'font-family fără token', (v) => !/^(var\(--font-[\w-]+\)|inherit)$/.test(v.trim())],
  [/font-size\s*:\s*[\d.]+(px|rem|em)\b/gi, 'font-size scris direct'],
];

// Marcaj: filtre și gradienți SVG.
const markupRules = [
  [/<fe(GaussianBlur|DropShadow)\b/g, 'filtru SVG de blur / umbră'],
  [/<(linear|radial)Gradient\b/g, 'gradient SVG'],
];
/** Fișierele care au voie să aibă efecte (umbre, blur, gradienți); motivul e în antetul fișierului. */
const EFFECTS_ALLOWED = [path.join('components', 'home', 'HeroStack.astro')];

const problems = [];
for (const f of files) {
  const src = await readFile(f, 'utf8');
  // Doar CSS: în .astro, conținutul blocurilor <style> și al atributelor style=""; fără comentarii.
  const css = f.endsWith('.css')
    ? src
    : [...src.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n') + '\n' + [...src.matchAll(/style=\{?[`"]([^`"]*)[`"]/g)].map((m) => m[1]).join('\n');
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const rel = path.relative(ROOT, f);
  const effectsOk = EFFECTS_ALLOWED.includes(rel);
  for (const [re, why, bad, kind] of rules) {
    if (kind === 'efect' && effectsOk) continue;
    for (const m of clean.matchAll(re)) if (!bad || bad(m[1])) problems.push(`${rel}: ${why}: ${m[0].trim().slice(0, 80)}`);
  }
  if (f.endsWith('.astro') && !effectsOk) {
    const markup = src.replace(/<style[^>]*>[\s\S]*?<\/style>/g, '').replace(/<!--[\s\S]*?-->/g, '');
    for (const [re, why] of markupRules) for (const m of markup.matchAll(re)) problems.push(`${rel}: ${why}: ${m[0]}`);
  }
}
if (problems.length) {
  console.log(problems.map((p) => '✗ ' + p).join('\n'));
  console.log(`\n${problems.length} probleme`);
  process.exit(1);
}
console.log(`✓ tokens-only: ${files.length} fișiere, nicio valoare scrisă direct (efecte permise doar în: ${EFFECTS_ALLOWED.join(', ')})`);
