/**
 * Imaginea de producție în browser (docker compose local, http://localhost:8080): fiecare pagină din sitemap plus cele din afara lui,
 * cu CSP-ul și headerele reale din deploy/nginx/. Consola trebuie să fie curată (fără „Refused to …” de la CSP, fără 404),
 * iar formularele merg cap-coadă, fără interceptare: Turnstile (cheia de test) → nginx → bitup-api → Resend.
 * Cu o cheie Resend falsă, rezultatul corect e 502 `mail` și starea de eroare, cu textul păstrat în câmpuri.
 *   node qa/deploy-browser.mjs [BASE_URL]
 * Pe un URL care nu e localhost, formularele NU se trimit (acolo cheile sunt reale și ar pleca emailuri): se verifică doar paginile.
 */
import { chromium } from 'playwright';

const BASE = process.argv[2] ?? 'http://localhost:8080';
const sitemap = await (await fetch(`${BASE}/sitemap-0.xml`)).text();
const fromSitemap = [...sitemap.matchAll(/<loc>https:\/\/bitup\.ro([^<]*)<\/loc>/g)].map((m) => m[1] || '/');
const PATHS = [...new Set([...fromSitemap, '/multumesc', '/en/thank-you', '/echipa', '/en/team', '/pagina-inexistenta'])];
// Cunoscut, doar local: widgetul Turnstile cu cheia de test pe localhost loghează un postMessage refuzat (la fel în qa/formstates.mjs).
const KNOWN = /postMessage.*challenges\.cloudflare\.com|\[Cloudflare Turnstile\] Ignored message from unexpected source/;

const browser = await chromium.launch();
const problems = [];

for (const scheme of ['light', 'dark']) {
  for (const path of PATHS) {
    const ctx = await browser.newContext({ colorScheme: scheme, viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    page.on('console', (m) => {
      // Pe pagina 404, browserul raportează chiar documentul (status 404 cerut); orice altă resursă lipsă apare la `response`, mai jos.
      if (path === '/pagina-inexistenta' && /status of 404/.test(m.text()) && m.location().url === `${BASE}${path}`) return;
      if ((m.type() === 'error' || m.type() === 'warning') && !KNOWN.test(m.text())) problems.push(`${path} (${scheme}): ${m.type()}: ${m.text()}`);
    });
    page.on('requestfailed', (r) => problems.push(`${path} (${scheme}): cerere eșuată ${r.url()} ${r.failure()?.errorText}`));
    page.on('response', (r) => {
      const notFoundPage = path === '/pagina-inexistenta' && r.url() === `${BASE}${path}`;
      if (r.status() >= 400 && !notFoundPage) problems.push(`${path} (${scheme}): ${r.status()} ${r.url()}`);
    });
    await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' });
    await ctx.close();
  }
  console.log(`${PATHS.length} pagini parcurse (${scheme})`);
}

const LOCAL = /^http:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/.test(BASE);
const FORMS = LOCAL ? [
  { path: '/radiografie-it', kind: 'radiografie' },
  { path: '/contact', kind: 'contact' },
  { path: '/en/it-health-check', kind: 'radiografie' },
  { path: '/en/contact', kind: 'contact' },
] : [];
if (!LOCAL) console.log('URL real: formularele nu se trimit.');
for (const f of FORMS) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  page.on('console', (m) => {
    const t = m.text();
    if (KNOWN.test(t) || /Failed to load resource.*502/.test(t)) return; // 502 e rezultatul așteptat (cheie Resend falsă)
    if (m.type() === 'error' || m.type() === 'warning') problems.push(`${f.path} formular: ${m.type()}: ${t}`);
  });
  await page.goto(`${BASE}${f.path}`, { waitUntil: 'networkidle' });
  const form = page.locator(`form[data-form="${f.kind}"]`).first();
  await form.scrollIntoViewIfNeeded();
  await form.locator('input[name="name"]').fill('Test Deploy');
  await form.locator('input[name="company"]').fill('Firma Test SRL');
  if (f.kind === 'radiografie') await form.locator('select[name="employees"]').selectOption({ index: 2 });
  await form.locator('input[name="phone"]').fill('0740 123 456');
  await form.locator('input[name="email"]').fill('test@example.com');
  const text = 'Text care trebuie să rămână după eroare.';
  await form.locator('textarea[name="message"]').fill(text);
  await form.locator('input[name="consent"]').check();
  // Tokenul Turnstile (widget invizibil, cheia de test) vine în câteva sute de ms; îl așteptăm, ca să testăm drumul complet.
  await page.waitForFunction(() => (document.querySelector('[name="cf-turnstile-response"]')?.value ?? '') !== '', null, { timeout: 15000 })
    .catch(() => problems.push(`${f.path}: tokenul Turnstile n-a venit în 15 s`));
  const [res] = await Promise.all([
    page.waitForResponse((r) => r.url().endsWith('/api/lead'), { timeout: 20000 }),
    form.locator('button[type="submit"]').click(),
  ]);
  const body = await res.text();
  await page.waitForSelector('.form__status:not([hidden])');
  const kept = await form.locator('textarea[name="message"]').inputValue();
  const csp = res.headers()['content-security-policy'] ? 'cu CSP' : 'FĂRĂ CSP';
  console.log(`${f.path}: /api/lead → ${res.status()} ${body} (${csp}); textul ${kept === text ? 'a rămas' : 'S-A PIERDUT'}`);
  if (res.status() !== 502 || !body.includes('"mail"')) problems.push(`${f.path}: așteptat 502 mail, primit ${res.status()} ${body}`);
  if (kept !== text) problems.push(`${f.path}: textul nu a rămas în câmp după eroare`);
  await ctx.close();
}

await browser.close();
if (problems.length) { console.log('\nProbleme:'); problems.forEach((p) => console.log('  · ' + p)); process.exit(1); }
console.log(`\nConsolă curată pe toate paginile, în ambele teme (în afara avertismentului Turnstile de pe localhost)${LOCAL ? '; formularele ajung la Resend prin serviciul api.' : '.'}`);
