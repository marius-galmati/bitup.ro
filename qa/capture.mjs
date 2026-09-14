/**
 * Capturi Playwright pentru QA (CLAUDE.md § Cum verifici):
 *   node qa/capture.mjs <faza> <cale> [<cale>…]
 * Exemplu: node qa/capture.mjs faza-0 /faza-0
 * Face capturi full-page la 375, 768, 1024 și 1440 px, în light și dark, și le salvează în qa/<faza>/.
 * În plus, listează toate gazdele externe cerute de pagină (trebuie să fie zero în afara celor din ARHITECTURA § Domenii permise).
 * Serverul trebuie să ruleze deja (npm run preview → http://localhost:4321) sau se dă BASE_URL.
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

// Căile se pot da și fără slash inițial („faza-0”, „en/about”): Git Bash pe Windows rescrie argumentele care încep cu „/”.
const [phase, ...rawPaths] = process.argv.slice(2);
const paths = rawPaths.map((p) => (p === 'index' ? '/' : p.startsWith('/') ? p : `/${p}`));
if (!phase || paths.length === 0) {
  console.error('Folosire: node qa/capture.mjs <faza> <cale> [<cale>…]');
  process.exit(1);
}
const BASE_URL = process.env.BASE_URL ?? 'http://localhost:4321';
const WIDTHS = [375, 768, 1024, 1440];
const THEMES = ['light', 'dark'];
const outDir = path.join('qa', phase);
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const external = new Map();
let count = 0;

for (const p of paths) {
  for (const theme of THEMES) {
    for (const width of WIDTHS) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
      await context.addInitScript((t) => localStorage.setItem('bitup-theme', t), theme);
      const page = await context.newPage();
      page.on('request', (req) => {
        const url = new URL(req.url());
        if (url.origin !== new URL(BASE_URL).origin) {
          external.set(url.host, (external.get(url.host) ?? 0) + 1);
        }
      });
      const response = await page.goto(`${BASE_URL}${p}`, { waitUntil: 'networkidle' });
      const name = p === '/' ? 'index' : p.replace(/^\//, '').replace(/[\/#?]/g, '_');
      const file = path.join(outDir, `${name}-${width}-${theme}.png`);
      await page.screenshot({ path: file, fullPage: true });
      console.log(`${response?.status() ?? '???'}  ${file}`);
      count++;
      await context.close();
    }
  }
}
await browser.close();

console.log(`\n${count} capturi în ${outDir}/`);
if (external.size === 0) {
  console.log('Cereri externe: niciuna.');
} else {
  console.log('Cereri externe (gazdă: număr):');
  for (const [host, n] of external) console.log(`  ${host}: ${n}`);
}
