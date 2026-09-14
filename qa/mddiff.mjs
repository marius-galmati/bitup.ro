/**
 * Diff textual pentru intrările de colecție (PLAN § Faza 3): fișierul din spec (frontmatter + corp Markdown) față de pagina construită.
 *   node qa/mddiff.mjs spec/continut/studii-de-caz/proq.md dist/rezultate/proq.html
 * Verifică: title, summary/description, facts, numbers din frontmatter și fiecare paragraf, titlu, element de listă și citat din corp
 * (fără marcajul Markdown, cu spațiile normalizate). Notele de layout din corp („(Se randează din `numbers`.)”, nota de subsol) sunt sărite;
 * nota de subsol e verificată separat (o randează layout-ul). Ieșire: lista fragmentelor lipsă; zero lipsă = zero diferențe de text.
 */
import { readFileSync } from 'node:fs';

const [mdPath, htmlPath] = process.argv.slice(2);
const md = readFileSync(mdPath, 'utf8');
const html = readFileSync(htmlPath, 'utf8');
const norm = (s) => s.replace(/\s+/g, ' ').replace(/ /g, ' ').trim();
const decode = (s) => s.replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');
const pageText = norm(decode(html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+\balt="([^"]*)"[^>]*>/gi, ' $1 ').replace(/<meta[^>]+content="([^"]*)"[^>]*>/gi, ' $1 ').replace(/<title>([^<]*)<\/title>/gi, ' $1 ')
  .replace(/<span aria-hidden="true"> →<\/span>/g, '').replace(/<\/?(a|strong|em|b|i|code|abbr|time|span)(\s[^>]*)?>/gi, '').replace(/<[^>]+>/g, ' ')));

const [, fm, body] = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
const fragments = [];
// frontmatter: valorile între ghilimele (title, summary, description, k/v din facts și numbers); nu: căi (logo, heroImage), slug-uri, [[placeholder]]-uri
// (tag-urile nu sunt text de pagină: doar primul apare, ca eyebrow; căile și slug-urile nu sunt text)
for (const m of fm.matchAll(/(?:^|[\s{,])(?:title|client|kicker|summary|description|k|v|unit|footnote)\s*:\s*"([^"]*)"/g)) { const v = m[1]; if (/^\[\[/.test(v) || v.length < 3) continue; fragments.push(v); }
// corpul: pe linii; sare notele de layout și nota de subsol (verificată din frontmatter-ul intrării construite)
let inFoot = false;
for (let line of body.split('\n')) {
  line = line.trim();
  if (!line) continue;
  if (/^(---|Notă de subsol|Footnote)/.test(line)) { inFoot = true; continue; }
  if (inFoot) continue;
  line = line.replace(/^#+\s*/, '').replace(/^>\s*/, '').replace(/^-\s+/, '').replace(/^\d+\.\s+/, '');
  line = line.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1'); // imagini → alt (devine legendă)
  line = line.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');   // linkuri → eticheta
  line = line.replace(/ \((Se randează din|Rendered from) `numbers`\.\)/, '').replace(/`([^`]*)`/g, '$1').replace(/\*\*/g, '');
  line = line.replace(/\s*\((opțional|optional)[^)]*\)/, '').replace(/^—\s*/, ''); // nota de după citat, liniuța atribuirii
  if (line.length >= 3) fragments.push(line);
}
const missing = fragments.filter((f) => !pageText.includes(norm(f)));
console.log(`${fragments.length} fragmente din ${mdPath}; ${fragments.length - missing.length} găsite identic în ${htmlPath}.`);
if (missing.length) { console.log('Lipsă / diferite:'); missing.forEach((m) => console.log('  · ' + norm(m))); process.exit(1); }
console.log('Zero diferențe de text.');
