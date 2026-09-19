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
  .replace(/<span aria-hidden="true"> →<\/span>/g, '') // săgeata decorativă a linkurilor
  .replace(/<\/?(a|strong|em|b|i|code|abbr)(\s[^>]*)?>/gi, '') // tag-urile inline nu rup propoziția („…cu <a>link</a>.”)
  .replace(/<[^>]+>/g, ' ')));

const SKIP = /^(Notă|Note for|Text \([^)]*\):\s*$|Text:|Trei carduri|Three cards|Patru carduri|Four cards|Patru rânduri|Four rows|Fotografie:|Photo:|LinkedIn:|Indexare:|Indexing:|Three large|Steps:|Steps \(|Faq \(|Faq:|Card:|Două carduri|Two cards|Două liste|Two lists|Două coloane|Two columns|Listă scurtă|Short list|Listă cronologică|Chronological list|Ultimele|Latest|Rând static|Static row|Trei coloane|Three columns|Aliniat|Left-aligned|Modelul|The [“"]two columns|Antetul|The section head|Rând discret|Discreet|Propoziție de închidere|Closing sentence|Imagine:|Image:|Varianta|Post-launch|Tipografic|Typographic|Imediat sub|Right under|Listă de|List of|Secțiune compactă|Compact section|CtaBand|JSON-LD|\*\*JSON-LD|Ancore|Required anchors|Mandatory anchors|Butoane:|Buttons:|Buton:|Button:|Buton \(|Button \(|Dreapta:|Right:|Stânga:|Left:|Pagina nu are|The page has no|\|---|Linkuri:|Links:|Link:|FactStrip:|Tabel|Table|Simple table|Numbered list|Listă numerotată|Câmpuri|Fields|Pe desktop|On desktop|---|#)/;

const fragments = [];
for (let raw of md.split('\n')) {
  let line = raw.trim().replace(/^- /, '');
  // linii de layout de formular și note scurte: „Sub buton: …”, „Succes → …”, „Consimțământ * (textul din …)”, „Șase carduri:”, „Listă:”
  if (/^(Sub buton|Under the button|Succes|Success|Consimțământ \*|Consent \*|Șase carduri|Six cards|Listă|List|Trei formule|Three options|Diagramă|Inline SVG|Rând:|Line:)/.test(line) && !/^(Listă|List) (de|of) \d/.test(line)) {
    if (/^(Rând|Line):/.test(line)) { line = line.replace(/^(Rând|Line):\s*/, ''); } else continue;
  }
  line = line.replace(/^(Text sub listă|Text under list) \([^)]*\):\s*/, '');
  line = line.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // linkuri Markdown → eticheta
  if (!line || SKIP.test(line.replace(/\*\*/g, ''))) {
    // butoanele și linkurile: extragem etichetele îngroșate / după săgeată
    if (/^(Butoane|Buttons|Buton|Button)\b/.test(line)) {
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
  // etichete de layout urmate de text de pagină: „Rând sub liste: …”, „Sub buton, `--muted`: …”, „Rând simplu, la final, `--muted`: …”, „Text (70ch): …”
  line = line.replace(/^(Rând sub liste|Row under the lists|Sub buton, `--muted`|Under the button, `--muted`|Rând simplu, la final, `--muted`|Simple line, at the end, `--muted`|Rând sub pași|Row under the steps|Rând sub text|Row under text|Rând sub tabel|Line under the table|Titlu deasupra formularului|Title above the form|Sub H1, `--muted`|Under H1, `--muted`|Titlu|Title|Text scurt|Short text|Text \([^)]*\)):\s*/, '');
  line = line.replace(/^(Rol|Role|Experiență|Experience)\s*\([^)]*\):\s*/, '');
  line = line.replace(/^- /, '');
  // câmpuri de formular: „Etichetă * (select: …)”, „Etichetă (opțional) — placeholder: „…””: eticheta și placeholder-ul, separat
  if (/\s\*(\s|$)|placeholder:/.test(line) && !/^\*\*/.test(line)) {
    const parts = line.split(/\s·\s/);
    for (const p of parts) {
      const label = p.split(/\s\*|\s—\s|,?\s*placeholder:|\s\(select:|\s\(textarea/)[0].replace(/\)$/, '').trim();
      if (label.length >= 3) fragments.push(label);
      for (const m of p.matchAll(/placeholder:\s*[„"]([^”"]+)[”"]/g)) fragments.push(m[1]);
    }
    continue;
  }
  // „→ Etichetă (`/cale`)” și „→ link „Etichetă” (`/cale`)”
  line = line.replace(/→ link [„"]([^”"]+)[”"] \(`[^`]*`\)\.?/g, '$1').replace(/→ ([^(`]+?) \(`[^`]*`\)\.?/g, '$1');
  // note de layout între paranteze: „(Figure cu legenda: …)”, „(`/cale`, doar când `draft: false`)”
  line = line.replace(/\((?:[^()]*(?:Figure|doar când|only when|draft:|link|tab nou|new tab|data-event)[^()]*)\)/g, '');
  line = line.replace(/\s*→\s*`[#/][^`]*`/g, '').replace(/\s*\{#[^}]*\}/g, '');
  line = line.replace(/\(`[^`]*`\)/g, '').replace(/`([^`]*)`/g, '$1');
  line = line.replace(/\*\*/g, '').replace(/^\d+\.\s+/, '').replace(/→/g, ' ').trim();
  if (line.length < 3) continue;
  fragments.push(line);
}

const missing = [];
const expected = [];
const found = (s) => pageText.includes(norm(s));
// abatere așteptată, cu condiție (decizia din Faza 2b): propoziția care linkuiește un studiu de caz draft nu se randează deloc;
// e acceptată ca lipsă doar dacă pagina chiar nu are link către cazul respectiv
const draftCase = (f) => /Cosmio/.test(f) && !/href="[^"]*\/(rezultate|results)\/cosmio"/.test(html);
for (const f of fragments) {
  if (found(f)) continue;
  // toleranță doar de formatare: un rând compus („Titlu · meta · text”, „Etichetă: valoare”, rând de tabel „| a | b |”) e ok
  // dacă fiecare parte a lui apare identic în pagină (URL-urile brute nu sunt text de pagină)
  const parts = f.replace(/https?:\/\/\S+/g, '').split(/\s*[|·]\s*|:\s+|(?=\[\[)|(?<=\]\])/).map((p) => p.trim()).filter((p) => p.length >= 3);
  if (parts.length > 1 && parts.every(found)) continue;
  if (draftCase(f)) { expected.push(norm(f)); continue; }
  missing.push(norm(f));
}
console.log(`${fragments.length} fragmente din ${mdPath}; ${fragments.length - missing.length - expected.length} găsite identic în ${htmlPath}.`);
if (expected.length) { console.log(`Așteptat lipsă (cazul Cosmio e draft, propoziția nu se randează): ${expected.length}`); expected.forEach((m) => console.log('  ~ ' + m)); }
if (missing.length) { console.log('Lipsă / diferite:'); missing.forEach((m) => console.log('  · ' + m)); process.exit(1); }
console.log('Zero diferențe de text.');
