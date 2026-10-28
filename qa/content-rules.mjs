/**
 * Regulile de conținut din copy.md, verificate pe textul vizibil din dist/*.html (faza 3).
 *   node qa/content-rules.mjs   → cod de ieșire 1 dacă o regulă pică.
 * - Formulări interzise: „audit NIS2”, BitUp ca auditor, „certificăm”, „garantăm conformitatea”, IMM / SMB, „arhitect IT”, „Radiografie IT”.
 * - Garanțiile IT-ului administrat (sub 2 ore, raport lunar, 08:00–18:00, sub 30 de minute) doar pe /servicii/it-administrat.
 * - Referința enterprise („500 de companii”) cel mult o dată pe pagină.
 * - JSON-LD: FAQPage = întrebările vizibile, în aceeași ordine; BreadcrumbList = traseul vizibil, pe paginile care îl au.
 * - <title> ≤ 60 de caractere, description ≤ 155 (checklist.md).
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const DIST = path.resolve(import.meta.dirname, '..', 'dist');
const pages = [];
async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p); else if (e.name.endsWith('.html')) pages.push(p);
  }
}
await walk(DIST);

const decode = (s) => s.replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/ /g, ' ');
const visible = (html) => decode(html
  .replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<svg[\s\S]*?<\/svg>/g, ' ')
  .replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');

const BANNED = [
  [/audit(ul|ului)? NIS2/i, '„audit NIS2”'],
  [/\bcertificăm\b/i, '„certificăm”'],
  [/garantăm conformitatea/i, '„garantăm conformitatea”'],
  [/\bIMM\b|\bSMB\b/, 'IMM / SMB'],
  [/arhitect IT/i, '„arhitect IT”'],
  [/Radiografie IT/i, '„Radiografie IT”'],
];
const GUARANTEES = [/sub 2 ore/i, /raport(ul)? lunar|raportul de activitate și de securitate/i, /08:00–18:00/, /sub 30 de minute|sub 30 min/i];
const GUARANTEE_PAGE = 'servicii/it-administrat.html';

const problems = [];
let checked = 0;
for (const file of pages) {
  const rel = path.relative(DIST, file).replace(/\\/g, '/');
  if (rel.startsWith('styleguide')) continue; // pagina internă, cu exemple
  checked++;
  const html = await readFile(file, 'utf8');
  const text = visible(html);
  const bad = (m) => problems.push(`${rel}: ${m}`);

  for (const [re, label] of BANNED) if (re.test(text)) bad(`formulare interzisă ${label}`);
  // „auditor” doar ca auditorul acreditat / independent, nu BitUp.
  for (const m of text.matchAll(/auditor\w*/gi)) {
    const ctx = text.slice(m.index, m.index + 40);
    if (!/auditor (acreditat|independent)/i.test(ctx)) bad(`„auditor” în context nepermis: „${text.slice(Math.max(0, m.index - 30), m.index + 40)}”`);
  }
  if (rel !== GUARANTEE_PAGE) for (const re of GUARANTEES) if (re.test(text)) bad(`garanție de IT administrat în afara paginii ei: ${re}`);
  const ent = (text.match(/500 de companii/g) ?? []).length;
  if (ent > 1) bad(`referința enterprise de ${ent} ori`);

  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  const desc = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  if (title.length > 60) bad(`title de ${title.length} caractere: „${title}”`);
  if (desc.length > 155) bad(`description de ${desc.length} caractere`);

  const ld = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap((m) => JSON.parse(m[1])['@graph'] ?? []);
  const faqLd = ld.find((n) => n['@type'] === 'FAQPage');
  const faqVisible = [...html.matchAll(/<summary[^>]*>([\s\S]*?)<\/summary>/g)].map((m) => visible(m[1]).trim());
  if (faqVisible.length) {
    const qs = (faqLd?.mainEntity ?? []).map((q) => decode(q.name).trim());
    if (JSON.stringify(qs) !== JSON.stringify(faqVisible)) bad(`FAQPage diferit de întrebările vizibile (${qs.length} în JSON-LD, ${faqVisible.length} pe pagină)`);
  } else if (faqLd) bad('FAQPage fără întrebări vizibile');
  const crumbs = html.match(/<nav class="crumbs[\s\S]*?<\/nav>/)?.[0];
  if (crumbs) {
    const names = [...crumbs.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map((m) => visible(m[1]).trim());
    const bl = ld.find((n) => n['@type'] === 'BreadcrumbList');
    const blNames = (bl?.itemListElement ?? []).map((i) => i.name);
    if (JSON.stringify(blNames) !== JSON.stringify(names)) bad(`BreadcrumbList diferit de traseul vizibil (${blNames.join(' › ')} / ${names.join(' › ')})`);
  }
}
console.log(`${checked} pagini verificate`);
if (problems.length) { problems.forEach((p) => console.log('✗ ' + p)); console.log(`\n${problems.length} probleme`); process.exit(1); }
console.log('✓ regulile de conținut: nicio problemă');
