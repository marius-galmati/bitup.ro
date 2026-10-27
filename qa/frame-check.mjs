/**
 * Faza 2: interacțiunile antetului, ale bannerului de cookie-uri și ale stivei din hero.
 *   node qa/frame-check.mjs        (serverul pornit; pentru testul GA4, build-ul făcut cu PUBLIC_GA4_ID setat)
 * Cererile către Google sunt blocate în test (route.abort), deci nu pleacă nicio afișare reală spre GA4; se numără doar încercările.
 * Capturile: qa/v3-faza-2/interactiuni/. Codul de ieșire e 1 dacă vreo verificare pică.
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const OUT = path.join('qa', 'v3-faza-2', 'interactiuni');
await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
const results = [];
const check = (name, ok, detail = '') => { results.push({ name, ok }); console.log(`${ok ? '✓' : '✗'} ${name}${detail ? ` (${detail})` : ''}`); };
const denied = (t) => ({ v: 'denied', t: Date.now() });

async function ctx(opts = {}, { theme = 'light', consent = 'denied' } = {}) {
  const c = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
  await c.addInitScript(([th, co]) => {
    localStorage.setItem('bitup-theme', th);
    if (co) localStorage.setItem('bitup-consent', JSON.stringify({ v: co, t: Date.now() }));
  }, [theme, consent]);
  return c;
}

// 1. Lista „Servicii” (desktop): clic deschide, Esc închide și focusul revine pe buton.
for (const theme of ['light', 'dark']) {
  const c = await ctx({}, { theme });
  const p = await c.newPage();
  await p.goto(BASE + '/', { waitUntil: 'networkidle' });
  const t = p.locator('[data-services-toggle]');
  await t.click();
  check(`servicii (${theme}): se deschide`, (await t.getAttribute('aria-expanded')) === 'true' && (await p.locator('#meniu-servicii').isVisible()));
  await p.screenshot({ path: path.join(OUT, `servicii-deschis-1440-${theme}.png`), clip: { x: 0, y: 0, width: 1440, height: 560 } });
  await p.keyboard.press('Escape');
  check(`servicii (${theme}): Esc închide, focusul pe buton`, !(await p.locator('#meniu-servicii').isVisible()) && (await p.evaluate(() => document.activeElement?.hasAttribute('data-services-toggle'))));
  await c.close();
}

// 2. Meniul mobil: se deschide, focusul rămâne în panou, Esc închide și focusul revine; pagina nu se derulează.
for (const theme of ['light', 'dark']) {
  const c = await ctx({ viewport: { width: 390, height: 844 } }, { theme });
  const p = await c.newPage();
  await p.goto(BASE + '/', { waitUntil: 'networkidle' });
  const b = p.locator('[data-menu-toggle]');
  await b.click();
  const open = (await b.getAttribute('aria-expanded')) === 'true' && (await p.locator('#meniu-mobil').isVisible());
  check(`meniu mobil (${theme}): se deschide`, open);
  check(`meniu mobil (${theme}): pagina blocată`, await p.evaluate(() => getComputedStyle(document.documentElement).overflow === 'hidden'));
  await p.screenshot({ path: path.join(OUT, `meniu-mobil-390-${theme}.png`) });
  let escaped = false;
  for (let i = 0; i < 40; i++) {
    await p.keyboard.press('Tab');
    if (!(await p.evaluate(() => !!document.activeElement?.closest('[data-mobile-menu]') || document.activeElement?.hasAttribute('data-menu-toggle')))) { escaped = true; break; }
  }
  check(`meniu mobil (${theme}): focusul rămâne în panou (40 × Tab)`, !escaped);
  await p.keyboard.press('Escape');
  check(`meniu mobil (${theme}): Esc închide, focusul pe buton`, !(await p.locator('#meniu-mobil').isVisible()) && (await p.evaluate(() => document.activeElement?.hasAttribute('data-menu-toggle'))));
  await c.close();
}

// 3. Cookie-uri și GA4: nimic înainte de „Accept”; după „Accept”, gtag.js; „Refuz” nu încarcă nimic; subsolul redeschide bannerul.
{
  const google = [];
  const c = await ctx({}, { consent: null });
  await c.route(/google|doubleclick/, (r) => { google.push(r.request().url()); return r.abort(); });
  const p = await c.newPage();
  await p.goto(BASE + '/', { waitUntil: 'networkidle' });
  check('consent: bannerul apare la prima vizită', await p.locator('[data-consent-banner]').isVisible());
  await p.screenshot({ path: path.join(OUT, 'banner-1440-light.png') });
  check('consent: zero cereri spre Google înainte de alegere', google.length === 0, `${google.length}`);
  await p.locator('[data-consent="accept"]').click();
  await p.waitForTimeout(500);
  const gtag = google.some((u) => u.includes('googletagmanager.com/gtag/js'));
  check('consent: după Accept se cere gtag.js', gtag, gtag ? '' : 'build fără PUBLIC_GA4_ID?');
  const consentDefault = await p.evaluate(() => JSON.stringify((window.dataLayer || []).map((a) => Array.from(a))));
  check('consent: default denied, apoi update doar analytics_storage', /"consent","default",\{"ad_storage":"denied","ad_user_data":"denied","ad_personalization":"denied","analytics_storage":"denied"\}\].*"consent","update",\{"analytics_storage":"granted"\}/.test(consentDefault));
  await p.reload({ waitUntil: 'networkidle' });
  check('consent: după Accept, bannerul nu mai apare', !(await p.locator('[data-consent-banner]').isVisible()));
  await p.locator('[data-consent-open]').click();
  check('consent: „Setări cookie-uri” redeschide bannerul', await p.locator('[data-consent-banner]').isVisible());
  await c.close();

  const google2 = [];
  const c2 = await ctx({}, { consent: null });
  await c2.route(/google|doubleclick/, (r) => { google2.push(r.request().url()); return r.abort(); });
  const p2 = await c2.newPage();
  await p2.goto(BASE + '/', { waitUntil: 'networkidle' });
  await p2.locator('[data-consent="decline"]').click();
  await p2.reload({ waitUntil: 'networkidle' });
  check('consent: după Refuz, zero cereri spre Google și fără banner', google2.length === 0 && !(await p2.locator('[data-consent-banner]').isVisible()), `${google2.length}`);
  await c2.close();
}

// 4. Stiva cu prefers-reduced-motion: fără cădere, fără tură, fără tranziții; nu se rotește la tragere.
{
  const c = await ctx({ reducedMotion: 'reduce' });
  const p = await c.newPage();
  await p.goto(BASE + '/', { waitUntil: 'networkidle' });
  const st = await p.evaluate(() => {
    const fig = document.querySelector('[data-hstack]');
    const slab = fig.querySelector('.hs__slab-pos');
    return { ready: fig.classList.contains('is-ready'), live: fig.classList.contains('is-live'), anims: document.getAnimations().length, tr: getComputedStyle(slab).transitionDuration };
  });
  check('stiva, mișcare redusă: gata imediat, fără tură', st.ready && !st.live, JSON.stringify(st));
  check('stiva, mișcare redusă: nicio animație în curs', st.anims === 0);
  check('stiva, mișcare redusă: fără tranziții', st.tr.split(',').every((d) => parseFloat(d) === 0));
  const before = await p.locator('.hs__slab--5 [data-top]').getAttribute('points');
  const box = await p.locator('.hs__art').boundingBox();
  // Din colțul gol al desenului: pe o placă, fără rotație, gestul ar fi un clic (link).
  await p.mouse.move(box.x + 4, box.y + 4);
  await p.mouse.down(); await p.mouse.move(box.x + 124, box.y + 4, { steps: 8 }); await p.mouse.up();
  await p.waitForTimeout(300);
  check('stiva, mișcare redusă: tragerea nu rotește', before === (await p.locator('.hs__slab--5 [data-top]').getAttribute('points')));
  await c.close();
}

// 5. Stiva pe ecran tactil: prima atingere arată eticheta, a doua deschide linkul stratului.
{
  const c = await ctx({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, reducedMotion: 'reduce' });
  const p = await c.newPage();
  await p.goto(BASE + '/', { waitUntil: 'networkidle' });
  await p.evaluate(() => document.querySelector('[data-hstack]').scrollIntoView({ block: 'center' }));
  const pt = await p.evaluate(() => {
    const svg = document.querySelector('.hs__art'), slab = document.querySelectorAll('.hs__slab')[2];
    const q = svg.createSVGPoint(); q.x = 230; q.y = parseFloat(slab.style.getPropertyValue('--base-y')) + 72 + 9;
    const s = q.matrixTransform(svg.getScreenCTM()); return { x: s.x, y: s.y };
  });
  await p.touchscreen.tap(pt.x, pt.y);
  await p.waitForTimeout(400);
  const active = await p.evaluate(() => document.querySelector('.hs__label.is-active')?.textContent?.trim());
  check('stiva, atingere 1: eticheta stratului 3, fără navigare', active === 'Dezvoltare software' && new URL(p.url()).pathname === '/', `${active}`);
  await p.screenshot({ path: path.join(OUT, 'stiva-atingere-390-light.png') });
  await Promise.all([p.waitForURL(/dezvoltare-software/, { timeout: 5000 }).catch(() => {}), p.touchscreen.tap(pt.x, pt.y)]);
  check('stiva, atingere 2: deschide /servicii/dezvoltare-software', new URL(p.url()).pathname === '/servicii/dezvoltare-software');
  await c.close();
}

// 6. Tastatura: primul Tab = skip-link; etichetele stivei se ating cu Tab și activează placa.
{
  const c = await ctx({ reducedMotion: 'reduce' });
  const p = await c.newPage();
  await p.goto(BASE + '/', { waitUntil: 'networkidle' });
  await p.keyboard.press('Tab');
  check('tastatură: primul Tab = skip-link', await p.evaluate(() => document.activeElement?.classList.contains('skip-link')));
  const seen = new Set();
  let visibleFocus = true;
  for (let i = 0; i < 60; i++) {
    await p.keyboard.press('Tab');
    const s = await p.evaluate(() => {
      const a = document.activeElement;
      const label = a?.closest('.hs__label');
      // Linkul care acoperă un card își desenează focusul pe card (Card.astro).
      const ring = a?.classList.contains('card__link') ? a.closest('.card') : a;
      const cs = ring ? getComputedStyle(ring) : null;
      return { label: label ? Number(label.dataset.index) : null, hovered: label ? document.querySelectorAll('.hs__slab')[Number(label.dataset.index)].classList.contains('is-hovered') : null, outline: cs ? cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0 : false, tag: a?.tagName };
    });
    if (s.tag && s.tag !== 'BODY' && !s.outline) visibleFocus = false;
    if (s.label !== null && s.hovered) seen.add(s.label);
  }
  check('tastatură: toate cele 5 etichete ale stivei activează placa', seen.size === 5, [...seen].sort().join(','));
  check('tastatură: focus vizibil pe fiecare oprire (primele 60)', visibleFocus);
  await c.close();
}

await browser.close();
const bad = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - bad}/${results.length} verificări trecute`);
process.exit(bad ? 1 : 0);
