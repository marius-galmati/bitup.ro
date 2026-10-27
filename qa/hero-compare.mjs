/**
 * HeroStack v3 față de bitup.ro (Marius, 28 octombrie 2026: stiva se copiază exact, captură lângă captură, în ambele teme).
 *   node qa/hero-compare.mjs
 * Pentru fiecare temă (light, dark) și lățime (1440, 390), pe bitup.ro (LIVE_URL) și pe serverul local (BASE_URL):
 *   1. cadrele căderii la 0,5 / 1,5 / 2,5 s (animațiile CSS oprite la același moment pe ambele site-uri);
 *   2. un cadru din tura de 360° (ceasul paginii controlat de Playwright, deci același unghi pe ambele);
 *   3. repausul, plus geometria: punctele fiecărui poligon, elipsele și transformările plăcilor, comparate exact;
 *   4. hover pe fiecare dintre cele 5 plăci.
 * Rezultatul: qa/v3-faza-2/hero/<temă>-<lățime>.png (stânga bitup.ro, dreapta v3) și un rezumat în consolă.
 * Doar cereri GET către bitup.ro; nimic nu se trimite.
 */
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const LIVE_URL = process.env.LIVE_URL ?? 'https://bitup.ro/';
const BASE_URL = process.env.BASE_URL ?? 'http://localhost:4321/';
const OUT = path.join('qa', 'v3-faza-2', 'hero');
await mkdir(path.join(OUT, 'cadre'), { recursive: true });

const SITES = [['bitup.ro', LIVE_URL], ['v3', BASE_URL]];
const THEMES = (process.env.THEMES ?? 'light,dark').split(',');
const WIDTHS = (process.env.WIDTHS ?? '1440,390').split(',').map(Number);
const DROP = [500, 1500, 2500];
const browser = await chromium.launch();

/** Zona capturată: scena stivei, cu loc deasupra pentru plăcile împinse în sus, iconița ridicată și etichetă. */
async function clip(page) {
  const r = await page.evaluate(() => {
    const b = document.querySelector('[data-hstack] .hs__stage').getBoundingClientRect();
    return { x: b.x + scrollX, y: b.y + scrollY, width: b.width, height: b.height };
  });
  const vw = page.viewportSize().width;
  const x = Math.max(0, r.x - 40), w = Math.min(vw - x, r.width + 80);
  return { x, y: r.y - 170, width: w, height: 170 + r.height + 90 };
}

/** Geometria în repaus, în coordonatele desenului (independentă de lățimea ecranului). */
const geometry = (page) => page.evaluate(() => {
  const fig = document.querySelector('[data-hstack]');
  const svg = fig.querySelector('svg.hs__art');
  return {
    viewBox: svg.getAttribute('viewBox'),
    slabs: [...fig.querySelectorAll('.hs__slab')].map((g) => ({
      transform: getComputedStyle(g).transform,
      // Doar fețele vizibile: cele ascunse (display: none) păstrează punctele din ultimul cadru în care s-au văzut.
      polys: [...g.querySelectorAll('polygon')].filter((p) => getComputedStyle(p).display !== 'none').map((p) => p.getAttribute('points')),
      ellipses: [...g.querySelectorAll('ellipse')].map((e) => ['cx', 'cy', 'rx', 'ry'].map((a) => e.getAttribute(a)).join(' ')),
    })),
    pins: [...fig.querySelectorAll('.hs__pin')].map((g) => getComputedStyle(g).transform),
    ground: ['cx', 'cy', 'rx', 'ry'].map((a) => fig.querySelector('.hs__ground').getAttribute(a)).join(' '),
    stageWidth: fig.querySelector('.hs__stage').getBoundingClientRect().width,
  };
});

/** Punctul de hover al plăcii i: colțul din față al laturilor (nu e acoperit de placa de deasupra), în pixeli de ecran. */
const hoverPoint = (page, i) => page.evaluate((i) => {
  const fig = document.querySelector('[data-hstack]');
  const svg = fig.querySelector('svg.hs__art');
  const slab = fig.querySelectorAll('.hs__slab')[i];
  const y = parseFloat(slab.style.getPropertyValue('--base-y'));
  const g = Number(slab.dataset.g);
  const pt = svg.createSVGPoint();
  pt.x = 230; pt.y = y + 72 + g / 2;
  const s = pt.matrixTransform(svg.getScreenCTM());
  return { x: s.x, y: s.y };
}, i);

const results = {};
for (const theme of THEMES) {
  for (const width of WIDTHS) {
    const key = `${theme}-${width}`;
    results[key] = {};
    for (const [name, url] of SITES) {
      const ctx = await browser.newContext({ viewport: { width, height: 1000 }, deviceScaleFactor: 1 });
      await ctx.addInitScript((t) => localStorage.setItem('bitup-theme', t), theme);
      const page = await ctx.newPage();
      await page.clock.install();
      await page.goto(url, { waitUntil: 'load' });
      // Loc deasupra stivei pe ambele site-uri (doar pentru captură), ca încadrarea să fie aceeași: pe v3 hero-ul e chiar
      // sus în pagină, iar plăcile împinse în sus și eticheta stratului 5 ar ieși din captură.
      await page.addStyleTag({ content: 'body{margin-top:240px!important}' });
      // Banner de cookie-uri sau alte elemente fixe peste stivă: ascunse doar pentru captură.
      await page.addStyleTag({ content: '.consent, [data-consent], .cookie-banner{display:none!important}' });
      const shots = {};
      // 1. Căderea: toate animațiile CSS oprite, apoi duse la același moment.
      await page.evaluate(() => document.getAnimations().forEach((a) => a.pause()));
      for (const t of DROP) {
        await page.evaluate((t) => document.getAnimations().forEach((a) => { a.currentTime = t; }), t);
        await page.waitForTimeout(80);
        const f = path.join(OUT, 'cadre', `${key}-${name}-drop-${t}.png`);
        await page.screenshot({ path: f, clip: await clip(page), fullPage: true });
        shots[`cădere ${t / 1000} s`] = f;
      }
      // Sfârșitul căderii: animațiile se termină, `animationend` pornește tura (pe ceasul controlat).
      // Pe unele încărcări `animationend` nu vine după finish(); atunci tura pornește din plasa de siguranță (3,5 s).
      // Ceasul avansează până când stiva e gata, ca tura să înceapă din același punct pe ambele site-uri.
      await page.evaluate(() => document.getAnimations().forEach((a) => a.finish()));
      await page.waitForTimeout(100);
      for (let n = 0; n < 50 && !(await page.locator('[data-hstack].is-ready').count()); n++) await page.clock.runFor(100);
      await page.clock.runFor(1000);
      await page.waitForTimeout(80);
      const fs = path.join(OUT, 'cadre', `${key}-${name}-spin.png`);
      await page.screenshot({ path: fs, clip: await clip(page), fullPage: true });
      shots['tura, 1 s'] = fs;
      await page.clock.runFor(4000);
      await page.waitForTimeout(150);
      const fr = path.join(OUT, 'cadre', `${key}-${name}-rest.png`);
      await page.screenshot({ path: fr, clip: await clip(page), fullPage: true });
      shots['repaus'] = fr;
      const geo = await geometry(page);
      // 4. Hover pe fiecare placă (tranzițiile CSS merg în timp real). Stiva trebuie să fie în ecran (la 390 px stă sub text).
      await page.evaluate(() => document.querySelector('[data-hstack]').scrollIntoView({ block: 'center' }));
      await page.waitForTimeout(100);
      for (let i = 0; i < 5; i++) {
        const p = await hoverPoint(page, i);
        await page.mouse.move(p.x, p.y);
        await page.waitForTimeout(700);
        const f = path.join(OUT, 'cadre', `${key}-${name}-hover-${i + 1}.png`);
        await page.screenshot({ path: f, clip: await clip(page), fullPage: true });
        shots[`hover stratul ${i + 1}`] = f;
        await page.mouse.move(2, 2);
        await page.waitForTimeout(600);
      }
      results[key][name] = { shots, geo };
      await ctx.close();
    }

    // Geometria: aceeași, exact?
    const a = results[key]['bitup.ro'].geo, b = results[key]['v3'].geo;
    const diffs = [];
    if (a.viewBox !== b.viewBox) diffs.push(`viewBox ${a.viewBox} ≠ ${b.viewBox}`);
    if (a.ground !== b.ground) diffs.push(`ground ${a.ground} ≠ ${b.ground}`);
    a.slabs.forEach((s, i) => {
      const t = b.slabs[i];
      if (s.transform !== t.transform) diffs.push(`placa ${i + 1} transform ${s.transform} ≠ ${t.transform}`);
      if (JSON.stringify(s.polys) !== JSON.stringify(t.polys)) diffs.push(`placa ${i + 1} poligoane diferite: ${JSON.stringify(s.polys)} ≠ ${JSON.stringify(t.polys)}`);
      if (JSON.stringify(s.ellipses) !== JSON.stringify(t.ellipses)) diffs.push(`placa ${i + 1} elipse diferite`);
    });
    a.pins.forEach((p, i) => { if (p !== b.pins[i]) diffs.push(`iconița ${i + 1} transform ${p} ≠ ${b.pins[i]}`); });
    console.log(`${key}: geometrie ${diffs.length ? 'DIFERITĂ' : 'identică'}; scena ${a.stageWidth.toFixed(1)} px (bitup.ro) / ${b.stageWidth.toFixed(1)} px (v3)`);
    diffs.forEach((d) => console.log(`  - ${d}`));

    // Planșa: stânga bitup.ro, dreapta v3.
    const rows = Object.keys(results[key]['bitup.ro'].shots).map((label) => `
      <tr><th>${label}</th>
      <td><img src="${pathToFileURL(path.resolve(results[key]['bitup.ro'].shots[label]))}"></td>
      <td><img src="${pathToFileURL(path.resolve(results[key]['v3'].shots[label]))}"></td></tr>`).join('');
    const bg = theme === 'dark' ? '#1a1a1a' : '#f4f4f4', fg = theme === 'dark' ? '#eee' : '#111';
    const html = `<!doctype html><meta charset="utf-8"><style>
      body{margin:16px;font:14px Arial;background:${bg};color:${fg}} table{border-collapse:collapse} th{text-align:left;padding:8px;white-space:nowrap;vertical-align:top}
      td{padding:6px;vertical-align:top} img{display:block;max-width:${width === 1440 ? 640 : 420}px;outline:1px solid #888}
      thead th{font-size:16px}</style>
      <h1 style="font-size:18px">HeroStack · ${theme} · ${width} px</h1>
      <table><thead><tr><th></th><th>bitup.ro (acum)</th><th>v3 (local)</th></tr></thead>${rows}</table>`;
    const htmlPath = path.join(OUT, `${key}.html`);
    await writeFile(htmlPath, html);
    const ctx = await browser.newContext({ viewport: { width: 1500, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(pathToFileURL(path.resolve(htmlPath)).href);
    await page.screenshot({ path: path.join(OUT, `${key}.png`), fullPage: true });
    await ctx.close();
  }
}
await browser.close();
