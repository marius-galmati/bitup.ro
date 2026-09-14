/**
 * Verificări structurale pe toate paginile din dist/ (PLAN § Faza 2b):
 *   node qa/pagecheck.mjs
 * Per pagină: număr de h1, salturi de nivel în heading-uri, FAQPage în JSON-LD (și limba lui) față de <details> din pagină,
 * apariții vizibile de orange (.btn--primary, fără dublura din meniul mobil; maximum 3), placeholder-e [[…]], imagini fără width/height, ancorele cerute prezente ca id.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : []; });
const pages = walk('dist').map((p) => p.replace(/\\/g, '/')).filter((p) => !/\/qa\//.test(p));
const decode = (s) => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
const ANCHORS = /^(backup|cloud|echipamente|equipment|software|incidente|incidents|audit|nis2|intrebari|faq|ce-include|whats-included|cum-decurge|how-it-works|formular|form)$/;

console.log('pagina | h1 | salturi | FAQPage (limbă, întrebări) / details | orange | [[…]] | img fără w/h | ancore');
let problems = 0;
for (const p of pages) {
  const html = readFileSync(p, 'utf8');
  const lang = (html.match(/<html[^>]*lang="(\w+)"/) || [])[1];
  // variantele ascunse cu `hidden` (pagina /multumesc randează ambele variante, una singură e vizibilă) nu intră în ierarhia titlurilor
  const visible = html.replace(/<div class="ty__variant"[^>]*\bhidden[^>]*>[\s\S]*?<\/div>/g, '');
  const hs = [...visible.matchAll(/<h([1-6])\b/g)].map((m) => +m[1]);
  const h1 = hs.filter((h) => h === 1).length;
  let jumps = 0; for (let i = 1; i < hs.length; i++) if (hs[i] > hs[i - 1] + 1) jumps++;
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(decode(m[1])));
  const faq = ld.flatMap((d) => d['@graph'] || [d]).filter((n) => n['@type'] === 'FAQPage');
  const details = (html.match(/<details/g) || []).length;
  const faqInfo = faq.length ? `da (${faq.map((f) => f.inLanguage || '-').join(',')}, ${faq[0].mainEntity?.length} Q)` : 'nu';
  // orange vizibil: butonul din header apare o dată în nav (desktop) și o dată în meniul mobil; la orice lățime e vizibil unul singur
  const orange = (html.match(/btn--primary/g) || []).length - (html.match(/mobile__cta/g) || []).length;
  const ph = [...new Set([...html.matchAll(/\[\[([A-Z0-9_]+)\]\]/g)].map((m) => m[1]))];
  const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  const noDim = imgs.filter((i) => !/\bwidth=/.test(i) || !/\bheight=/.test(i)).length;
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]).filter((i) => ANCHORS.test(i));
  const bad = h1 !== 1 || jumps > 0 || orange > 3 || noDim > 0 || (faq.length > 0 && details === 0) || (faq.length > 0 && faq[0].inLanguage !== lang)
    // homepage: întrebări în pagină, dar JSON-LD doar global, cum cere 01-acasa („Fără altceva”)
    || (faq.length === 0 && details > 0 && !/^dist\/(index|en)\.html$/.test(p));
  if (bad) problems++;
  console.log(`${bad ? '!! ' : ''}${p.replace('dist/', '')} (${lang}) | ${h1} | ${jumps} | ${faqInfo} / ${details} | ${orange} | ${ph.join(',') || '-'} | ${noDim}/${imgs.length} | ${ids.join(',') || '-'}`);
}
console.log(`${pages.length} pagini, ${problems} cu probleme.`);
process.exit(problems ? 1 : 0);
