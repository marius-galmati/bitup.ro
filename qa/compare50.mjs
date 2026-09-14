/**
 * Captură comparativă (PLAN § Faza 2b): paginile de serviciu 02–05 la 1440 px, zoom 50%, full page, una lângă alta.
 *   node qa/compare50.mjs <faza> <cale> [<cale>…]   (serverul de preview trebuie să ruleze)
 * Scrie <faza>/comparativ-50/<cale>.png per pagină și <faza>/comparativ-50/side-by-side.png cu toate, aliniate sus.
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
const BASE_URL = process.env.BASE_URL ?? 'http://localhost:4321';
const [phase, ...paths] = process.argv.slice(2);
const dir = `qa/${phase}/comparativ-50`; mkdirSync(dir, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 0.5, colorScheme: 'light' });
const shots = [];
for (const p of paths) {
  const page = await ctx.newPage();
  await page.goto(`${BASE_URL}/${p.replace(/^\/+/, '')}`, { waitUntil: 'networkidle' });
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 800) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } window.scrollTo(0, 0); });
  const file = `${dir}/${p.replace(/\//g, '_')}.png`;
  const buf = await page.screenshot({ path: file, fullPage: true });
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  shots.push({ p, file, buf, h });
  console.log(`${p}: ${h}px înălțime, ${file}`);
  await page.close();
}
// compunere una lângă alta, într-o pagină HTML randată tot cu Playwright (fără biblioteci de imagini)
const html = `<body style="margin:0;background:#888;display:flex;gap:16px;align-items:flex-start">${shots.map((s) => `<figure style="margin:0"><figcaption style="font:12px monospace;padding:4px;background:#fff">${s.p}</figcaption><img src="data:image/png;base64,${s.buf.toString('base64')}" style="display:block;width:720px"></figure>`).join('')}</body>`;
const page = await ctx.newPage();
await page.setContent(html);
await page.screenshot({ path: `${dir}/side-by-side.png`, fullPage: true });
console.log(`side-by-side: ${dir}/side-by-side.png`);
await browser.close();
