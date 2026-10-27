/**
 * Capturi Playwright pentru QA:
 *   node qa/capture.mjs <faza> <cale> [<cale>…]
 * Exemplu: node qa/capture.mjs faza-0 /faza-0
 * Face capturi full-page la 390, 768 și 1440 px (CLAUDE.md § Cum lucrăm), în light și dark, și le salvează în qa/<faza>/.
 * În plus, listează toate gazdele externe cerute de pagină (trebuie să fie zero).
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
const WIDTHS = [390, 768, 1440];
const THEMES = ['light', 'dark'];
const outDir = path.join('qa', phase);
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const external = new Map();
const consoleIssues = [];
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
      // Consola trebuie să fie curată: erori JS, avertismente și răspunsuri 4xx/5xx (favicon inclus)
      page.on('console', (msg) => { if (msg.type() === 'error' || msg.type() === 'warning') consoleIssues.push(`${p} @${width}/${theme}: [${msg.type()}] ${msg.text().slice(0, 160)}`); });
      page.on('pageerror', (err) => consoleIssues.push(`${p} @${width}/${theme}: [pageerror] ${String(err).slice(0, 160)}`));
      page.on('response', (res) => { if (res.status() >= 400 && !(res.url().endsWith(p) && res.status() === 404)) consoleIssues.push(`${p} @${width}/${theme}: [${res.status()}] ${res.url()}`); });
      const response = await page.goto(`${BASE_URL}${p}`, { waitUntil: 'networkidle' });
      // Derulăm pagina ca imaginile lazy să se încarce, apoi așteptăm toate imaginile și revenim sus.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
        await Promise.all(Array.from(document.images).map((img) => img.complete ? null : new Promise((r) => { img.onload = img.onerror = r; })));
        window.scrollTo(0, 0);
      });
      await page.waitForLoadState('networkidle');
      const name = p === '/' ? 'index' : p.replace(/^\//, '').replace(/[\/#?]/g, '_');
      const file = path.join(outDir, `${name}-${width}-${theme}.png`);
      // `animations: 'disabled'` derulează animațiile finite până la capăt înainte de captură:
      // altfel secvența de la încărcare a graficului din hero (~1,9 s) prinde captura la mijloc,
      // iar două rulări succesive dau imagini diferite.
      await page.screenshot({ path: file, fullPage: true, animations: 'disabled' });
      console.log(`${response?.status() ?? '???'}  ${file}`);
      count++;
      await context.close();
    }
  }
}
await browser.close();

console.log(`\n${count} capturi în ${outDir}/`);
if (consoleIssues.length === 0) console.log('Consolă: curată (fără erori, avertismente sau răspunsuri 4xx/5xx).');
else { console.log(`Consolă: ${consoleIssues.length} probleme:`); [...new Set(consoleIssues)].forEach((c) => console.log('  ' + c)); }
if (external.size === 0) {
  console.log('Cereri externe: niciuna.');
} else {
  console.log('Cereri externe (gazdă: număr):');
  for (const [host, n] of external) console.log(`  ${host}: ${n}`);
}
