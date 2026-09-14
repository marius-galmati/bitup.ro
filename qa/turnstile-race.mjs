/**
 * Testul cursei Turnstile (4a → 4b): completare și trimitere în mai puțin de 2 secunde de la primul focus, cu rețeaua încetinită la „Slow 4G”
 * (presetul Chrome DevTools: 400 kbps în jos și în sus, 2.000 ms latență), RO și EN, ambele formulare. /api/lead e interceptat (răspunde 200)
 * ca să vedem comportamentul clientului: butonul intră în „Se trimite…”, așteaptă tokenul cel mult 5 s, apoi trimite; pagina ajunge pe /multumesc.
 * Al doilea scenariu: scriptul Turnstile blocat complet → după 5 s se trimite fără token, funcția (simulată) răspunde 400 turnstile → mesajul
 * de anti-spam, butonul se reactivează, textul rămâne.
 *   node qa/turnstile-race.mjs   (serverul de preview pe :4321)
 */
import { chromium } from 'playwright';
const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const SLOW_4G = { offline: false, downloadThroughput: (400 * 1000) / 8, uploadThroughput: (400 * 1000) / 8, latency: 2000 };
const FAST_4G = { offline: false, downloadThroughput: (1.6 * 1000 * 1000) / 8, uploadThroughput: (750 * 1000) / 8, latency: 562.5 };
const PAGES = [
  { lang: 'ro', kind: 'radiografie', path: '/radiografie-it', thank: '/multumesc' },
  { lang: 'ro', kind: 'contact', path: '/contact', thank: '/multumesc' },
  { lang: 'en', kind: 'radiografie', path: '/en/it-health-check', thank: '/en/thank-you' },
  { lang: 'en', kind: 'contact', path: '/en/contact', thank: '/en/thank-you' },
];
const browser = await chromium.launch();
let failures = 0;
const fill = async (form, pg) => {
  await form.locator('input[name="name"]').fill('Ana Pop');
  await form.locator('input[name="company"]').fill('Firma Test SRL');
  if (pg.kind === 'radiografie') await form.locator('select[name="employees"]').selectOption({ index: 2 });
  await form.locator('input[name="phone"]').fill('0740 123 456');
  await form.locator('input[name="email"]').fill('ana@firma-test.ro');
  await form.locator('textarea[name="message"]').fill('Trimis repede.');
  await form.locator('input[name="consent"]').check();
};

for (const [name, net] of [['Scenariul 1: Slow 4G (400 kbps, 2.000 ms)', SLOW_4G], ['Scenariul 1b: Fast 4G (1,6 Mbps, 562 ms)', FAST_4G]]) {
console.log(`=== ${name}, trimitere în < 2 s de la primul focus ===`);
for (const pg of PAGES) {
  const ctx = await browser.newContext({ viewport: { width: 1024, height: 900 } });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Network.enable');
  let sent = null;
  await page.route('**/api/lead', async (route) => { sent = { at: Date.now(), body: JSON.parse(route.request().postData() || '{}') }; return route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }); });
  await page.goto(`${BASE}${pg.path}`, { waitUntil: 'load' });
  await page.waitForFunction(() => !document.querySelector('form[data-form] button[type="submit"]')?.disabled);
  await cdp.send('Network.emulateNetworkConditions', net); // încetinim abia acum: Turnstile se încarcă doar de la primul focus
  const form = page.locator(`form[data-form="${pg.kind}"]`).first();
  await form.scrollIntoViewIfNeeded();
  const t0 = Date.now();
  await form.locator('input[name="name"]').focus();
  await fill(form, pg);
  await form.locator('button[type="submit"]').click();
  const tClick = Date.now() - t0;
  const label = await form.locator('button[type="submit"]').textContent();
  const disabled = await form.locator('button[type="submit"]').isDisabled();
  await page.waitForURL(`**${pg.thank}?kind=${pg.kind}`, { timeout: 20000 }).catch(() => {});
  const arrived = page.url().includes(pg.thank);
  const waited = sent ? sent.at - t0 - tClick : null;
  const withToken = sent ? Boolean(sent.body.turnstileToken) : false;
  const ok = tClick < 2000 && disabled && arrived && sent && waited <= 5600;
  if (!ok) failures++;
  console.log(`${ok ? 'OK ' : 'NU '} ${pg.lang} ${pg.kind}: focus→trimite ${tClick} ms; buton „${label?.trim()}” (dezactivat: ${disabled}); cererea a plecat după ${waited} ms de la click, token ${withToken ? 'prezent' : 'lipsă (a decis funcția)'}; /multumesc: ${arrived}`);
  await ctx.close();
}
}

console.log('\n=== Scenariul 2: scriptul Turnstile blocat → după 5 s se trimite fără token → 400 turnstile → mesaj, buton reactivat, text păstrat ===');
for (const pg of PAGES.filter((p) => p.kind === 'contact')) {
  const ctx = await browser.newContext({ viewport: { width: 1024, height: 900 } });
  const page = await ctx.newPage();
  await page.route('**/challenges.cloudflare.com/**', (route) => route.abort());
  let sent = null;
  await page.route('**/api/lead', async (route) => { sent = { at: Date.now(), body: JSON.parse(route.request().postData() || '{}') }; return route.fulfill({ status: 400, contentType: 'application/json', body: '{"ok":false,"error":"turnstile"}' }); });
  await page.goto(`${BASE}${pg.path}`, { waitUntil: 'load' });
  await page.waitForFunction(() => !document.querySelector('form[data-form] button[type="submit"]')?.disabled);
  const form = page.locator(`form[data-form="${pg.kind}"]`).first();
  await fill(form, pg);
  const t0 = Date.now();
  await form.locator('button[type="submit"]').click();
  await page.waitForSelector('.form__status:not([hidden])', { timeout: 15000 });
  const status = await form.locator('.form__status').textContent();
  const enabled = !(await form.locator('button[type="submit"]').isDisabled());
  const kept = (await form.locator('textarea[name="message"]').inputValue()) === 'Trimis repede.';
  const waited = sent ? sent.at - t0 : null;
  const ok = sent && !sent.body.turnstileToken && waited >= 4900 && waited <= 6500 && /anti-spam/.test(status || '') && enabled && kept;
  if (!ok) failures++;
  console.log(`${ok ? 'OK ' : 'NU '} ${pg.lang} ${pg.kind}: cererea a plecat după ${waited} ms fără token; mesaj: „${status?.trim().slice(0, 60)}…”; buton reactivat: ${enabled}; text păstrat: ${kept}`);
  await ctx.close();
}
await browser.close();
if (failures) { console.log(`\n${failures} scenarii picate.`); process.exit(1); }
console.log('\nToate scenariile trec.');
