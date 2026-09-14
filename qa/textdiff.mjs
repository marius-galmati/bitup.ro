/**
 * Diff textual între un fișier de conținut din spec și pagina construită (CLAUDE.md § Cum verifici).
 *   node qa/textdiff.mjs spec/continut/01-acasa.md dist/index.html
 * Extrage din Markdown fragmentele de text de pagină (title, description, eyebrow-uri, titluri, paragrafe, carduri, pași, FAQ, etichete de link),
 * sare peste notele de layout, și verifică dacă fiecare fragment apare, identic (spații normalizate), în textul paginii.
 * Ieșire: lista fragmentelor lipsă. Zero lipsă = zero diferențe de text.
 */
import { readFileSync } from 'node:fs';

const [mdPath, htmlPath] = process.argv.slice(2);
if (!mdPath || !htmlPath) { console.error('Folosire: node qa/textdiff.mjs <spec.md> <dist.html>'); process.exit(1); }

const md = readFileSync(mdPath, 'utf8');
const html = readFileSync(htmlPath, 'utf8');

const norm = (s) => s.replace(/\s+/g, ' ').replace(/ /g, ' ').trim();
const decode = (s) => s.replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');
// textul paginii: fără script/style, tag-urile devin spații, alt-urile și placeholder-ele intră în text
const pageText = norm(decode(html
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+\balt="([^"]*)"[^>]*>/gi, ' $1 ')
  .replace(/<[^>]+\bplaceholder="([^"]*)"[^>]*>/gi, ' $1 ')
  .replace(/<meta[^>]+content="([^"]*)"[^>]*>/gi, ' $1 ')
  .replace(/<title>([^<]*)<\/title>/gi, ' $1 ')
  .replace(/<[^>]+>/g, ' ')));

const SKIP = /^(Notă|Note for|Text \(|Trei carduri|Three cards|Three large|Steps:|Faq \(|Card:|Două carduri|Two cards|Ultimele|Latest|Rând static|Static row|Rând discret|Discreet|Imagine:|Image:|Varianta|Post-launch|Tipografic|Typographic|Imediat sub|Right under|Listă de|List of|Secțiune compactă|Compact section|CtaBand|JSON-LD|\*\*JSON-LD|Ancore|Required anchors|Butoane:|Buttons:|Linkuri:|Links:|Link:|---|#)/;

const fragments = [];
for (let raw of md.split('\n')) {
  let line = raw.trim();
  if (!line || SKIP.test(line)) {
    // butoanele și linkurile: extragem etichetele îngroșate / după săgeată
    if (/^(Butoane|Buttons):/.test(line)) {
      for (const m of line.matchAll(/\*\*([^*]+)\*\*/g)) fragments.push(m[1]);
    } else if (/^(Linkuri|Links|Link):/.test(line)) {
      for (const m of line.replace(/^(Linkuri|Links|Link):\s*/, '').split('·')) { const lbl = m.split('→')[0].trim(); if (lbl) fragments.push(lbl); }
    }
    continue;
  }
  line = line.replace(/^\*\*(Title|Description):\*\*\s*/, '');
  line = line.replace(/^\*\*H1\*\* \([^)]*\)\*\*:\*\*\s*/, '').replace(/^\*\*H[12]:\*\*\s*/, '');
  line = line.replace(/^Eyebrow:\s*`([^`]*)`/, '$1').replace(/^Lead(?: \([^)]*\))?:\s*/, '');
  line = line.replace(/^Rând de închidere \([^)]*\):\s*/, '').replace(/^Closing row \([^)]*\):\s*/, '');
  // „→ Etichetă (`/cale`)” și „→ link „Etichetă” (`/cale`)”
  line = line.replace(/→ link [„"]([^”"]+)[”"] \(`[^`]*`\)/g, '$1').replace(/→ ([^(`]+?) \(`[^`]*`\)/g, '$1');
  line = line.replace(/\(`[^`]*`\)/g, '').replace(/`[^`]*`/g, '');
  line = line.replace(/\*\*/g, '').replace(/^\d+\.\s+/, '').replace(/→/g, ' ').trim();
  if (line.length < 3) continue;
  fragments.push(line);
}

const missing = [];
for (const f of fragments) {
  const n = norm(f);
  if (!pageText.includes(n)) missing.push(n);
}
console.log(`${fragments.length} fragmente din ${mdPath}; ${fragments.length - missing.length} găsite identic în ${htmlPath}.`);
if (missing.length) { console.log('Lipsă / diferite:'); missing.forEach((m) => console.log('  · ' + m)); process.exit(1); }
console.log('Zero diferențe de text.');
