/**
 * Capturile formularelor în toate stările (PLAN § Faza 4a): gol cu erori de validare, completat, se trimite, eroare de trimitere, Turnstile eșuat,
 * succes (pagina /multumesc), la 375 și 1024 px, light și dark, RO și EN. /api/lead e interceptat de Playwright (răspunsuri simulate), ca stările să fie
 * reproductibile fără chei reale. Turnstile rulează cu cheia publică de test (widget „always passes”).
 *   node qa/formstates.mjs <faza>   (serverul de preview pe :4321)
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const phase = process.argv[2] ?? 'faza-4a';
const dir = `qa/${phase}/formular`; mkdirSync(dir, { recursive: true });
const PAGES = [
  { lang: 'ro', kind: 'radiografie', path: '/radiografie-it', thank: '/multumesc' },
  { lang: 'ro', kind: 'contact', path: '/contact', thank: '/multumesc' },
  { lang: 'en', kind: 'radiografie', path: '/en/it-health-check', thank: '/en/thank-you' },
  { lang: 'en', kind: 'contact', path: '/en/contact', thank: '/en/thank-you' },
];
const browser = await chromium.launch();
const problems = [];
let count = 0;
for (const scheme of ['light', 'dark']) for (const width of [375, 1024]) for (const pg of PAGES) {
  const ctx = await browser.newContext({ viewport: { width, height: width === 375 ? 812 : 900 }, colorScheme: scheme });
  const page = await ctx.newPage();
  const known = [];
  page.on('console', (m) => {
    if (m.type() !== 'error' && m.type() !== 'warning') return;
    const text = m.text();
    // așteptate: răspunsurile 502/400 simulate pentru stările de eroare (browserul le loghează ca „Failed to load resource”)
    if (/Failed to load resource.*(502|400)/.test(text) && (mode === 'error' || mode === 'turnstile')) return;
    // cunoscut, doar local: widgetul Turnstile cu cheia de test pe 127.0.0.1 (origine neînregistrată) loghează un postMessage refuzat
    if (/postMessage.*challenges\.cloudflare\.com|\[Cloudflare Turnstile\] Ignored message from unexpected source/.test(text)) { known.push(text); return; }
    problems.push(`${pg.path} ${width} ${scheme}: consolă ${m.type()}: ${text}`);
  });
  let mode = 'ok';
  const shot = async (name) => { await page.locator(`form[data-form="${pg.kind}"]`).first().screenshot({ path: `${dir}/${pg.lang}-${pg.kind}-${name}-${width}-${scheme}.png` }); count++; };
  await page.route('**/api/lead', async (route) => {
    if (mode === 'slow') { await new Promise((r) => setTimeout(r, 1500)); return route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }); }
    if (mode === 'error') return route.fulfill({ status: 502, contentType: 'application/json', body: '{"ok":false,"error":"mail"}' });
    if (mode === 'turnstile') return route.fulfill({ status: 400, contentType: 'application/json', body: '{"ok":false,"error":"turnstile"}' });
    return route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
  });
  await page.goto(`${BASE}${pg.path}`, { waitUntil: 'networkidle' });
  const form = page.locator(`form[data-form="${pg.kind}"]`).first();
  await form.scrollIntoViewIfNeeded();
  await page.waitForFunction(() => !document.querySelector('form[data-form] button[type="submit"]')?.disabled);

  // 1. gol → erori de validare sub câmpuri
  await form.locator('button[type="submit"]').click();
  await page.waitForSelector('.form__error:not([hidden])');
  await shot('1-validare');
  const errCount = await form.locator('.form__error:not([hidden])').count();
  if (errCount < 4) problems.push(`${pg.path}: doar ${errCount} erori de validare la formular gol`);

  // 2. completat corect (email greșit întâi, ca să vedem mesajul de email)
  await form.locator('input[name="name"]').fill('Ana Pop');
  await form.locator('input[name="company"]').fill('Firma Test SRL');
  if (pg.kind === 'radiografie') await form.locator('select[name="employees"]').selectOption({ index: 2 });
  await form.locator('input[name="phone"]').fill('0740 123 456');
  await form.locator('input[name="email"]').fill('ana@firma');
  await form.locator('textarea[name="message"]').fill(pg.lang === 'ro' ? 'Nu știu dacă backup-ul merge.' : "I don't know if the backup works.");
  await form.locator('input[name="consent"]').check();
  await form.locator('button[type="submit"]').click();
  await page.waitForSelector('.form__error:not([hidden])');
  await shot('2-email-gresit');
  await form.locator('input[name="email"]').fill('ana@firma-test.ro');
  await shot('3-completat');

  // 3. se trimite (răspuns întârziat) → apoi succes → /multumesc
  mode = 'slow';
  await form.locator('button[type="submit"]').click();
  await page.waitForFunction(() => document.querySelector('form[data-form] button[type="submit"]')?.disabled === true);
  await shot('4-se-trimite');
  await page.waitForURL(`**${pg.thank}?kind=${pg.kind}`, { timeout: 15000 });
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: `${dir}/${pg.lang}-${pg.kind}-7-multumesc-${width}-${scheme}.png`, fullPage: true }); count++;
  const visibleH1 = await page.locator('.ty__variant:not([hidden]) h1').textContent();
  const hiddenCount = await page.locator('.ty__variant[hidden]').count();
  if (hiddenCount !== 1) problems.push(`${pg.thank}: ${hiddenCount} variante ascunse (așteptat 1)`);

  // 4. înapoi: eroare de trimitere (textul rămâne) și Turnstile eșuat
  await page.goto(`${BASE}${pg.path}`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => !document.querySelector('form[data-form] button[type="submit"]')?.disabled);
  const f2 = page.locator(`form[data-form="${pg.kind}"]`).first();
  await f2.scrollIntoViewIfNeeded();
  await f2.locator('input[name="name"]').fill('Ana Pop'); await f2.locator('input[name="company"]').fill('Firma Test SRL');
  if (pg.kind === 'radiografie') await f2.locator('select[name="employees"]').selectOption({ index: 2 });
  await f2.locator('input[name="phone"]').fill('0740 123 456'); await f2.locator('input[name="email"]').fill('ana@firma-test.ro');
  await f2.locator('textarea[name="message"]').fill('Text care trebuie să rămână după eroare.'); await f2.locator('input[name="consent"]').check();
  mode = 'error';
  await f2.locator('button[type="submit"]').click();
  await page.waitForSelector('.form__status:not([hidden])');
  const kept = await f2.locator('textarea[name="message"]').inputValue();
  if (kept !== 'Text care trebuie să rămână după eroare.') problems.push(`${pg.path}: textul nu a rămas în câmp după eroare`);
  await shot('5-eroare');
  mode = 'turnstile';
  await f2.locator('button[type="submit"]').click();
  await page.waitForFunction(() => { const s = document.querySelector('.form__status'); return s && !s.hidden && /anti-spam/.test(s.textContent || ''); });
  await shot('6-turnstile-esuat');
  console.log(`${pg.lang} ${pg.kind} ${width} ${scheme}: ok (mulțumesc: „${visibleH1?.trim()}”)`);
  await ctx.close();
}
await browser.close();
console.log(`\n${count} capturi în ${dir}/`);
if (problems.length) { console.log('Probleme:'); problems.forEach((p) => console.log('  · ' + p)); process.exit(1); }
console.log('Consolă curată (în afara răspunsurilor de eroare simulate și a avertismentului Turnstile de pe localhost), toate stările au apărut, textul rămâne după eroare.');
