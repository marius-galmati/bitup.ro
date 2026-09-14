/**
 * Test de tastatură (CLAUDE.md § Cum verifici): node qa/keyboard.mjs <cale> [BASE_URL]
 * - parcurge cu Tab toate elementele interactive și verifică că fiecare focus e vizibil (outline sau alt indicator);
 * - pe desktop: deschide „Servicii” cu Enter, verifică aria-expanded, închide cu Esc și verifică focusul revenit;
 * - pe mobil (375): deschide meniul cu butonul, verifică aria-expanded, închide cu Esc, verifică focusul pe buton.
 */
import { chromium } from 'playwright';

const [rawPath = '/', base = 'http://localhost:4321'] = process.argv.slice(2);
const path = rawPath === 'index' ? '/' : rawPath.startsWith('/') && !/^[A-Za-z]:\//.test(rawPath) ? rawPath : `/${rawPath.replace(/^[A-Za-z]:\/[^/]+\/[^/]+\//, '')}`; // „index” = /; Git Bash rescrie „/x” în cale Windows
const browser = await chromium.launch();
let failures = 0;
const check = (ok, msg) => { console.log(`${ok ? 'OK ' : 'NU '} ${msg}`); if (!ok) failures++; };

// Desktop
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${base}${path}`, { waitUntil: 'networkidle' });
  const seen = [];
  for (let i = 0; i < 80; i++) {
    await page.keyboard.press('Tab');
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const cs = getComputedStyle(el);
      const visible = el.getClientRects().length > 0 && cs.visibility !== 'hidden';
      const outline = cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0;
      const label = (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 40);
      const key = Array.prototype.indexOf.call(document.querySelectorAll('*'), el); // identitatea elementului, nu textul
      return { tag: el.tagName.toLowerCase(), label, outline, visible, key };
    });
    if (!info) break;
    if (seen.some((s) => s.key === info.key)) break; // am făcut un tur complet
    seen.push(info);
  }
  console.log(`Desktop: ${seen.length} elemente atinse cu Tab`);
  const noOutline = seen.filter((s) => s.visible && !s.outline);
  check(noOutline.length === 0, `focus vizibil pe toate (${noOutline.map((s) => `${s.tag}:${s.label}`).join(', ') || 'niciunul fără'})`);
  check(seen[0]?.label.toLowerCase().includes('sari') || seen[0]?.label.toLowerCase().includes('skip'), `primul element e skip-link (${seen[0]?.label})`);

  // Dropdown Servicii
  const btn = page.locator('[data-services-toggle]');
  await btn.focus();
  await page.keyboard.press('Enter');
  check((await btn.getAttribute('aria-expanded')) === 'true', 'Servicii: Enter deschide (aria-expanded=true)');
  check(await page.locator('#services-menu').isVisible(), 'Servicii: submeniul e vizibil');
  await page.keyboard.press('Tab');
  check(await page.evaluate(() => document.activeElement?.closest('#services-menu') !== null), 'Servicii: Tab intră în submeniu');
  await page.keyboard.press('Escape');
  check((await btn.getAttribute('aria-expanded')) === 'false', 'Servicii: Esc închide');
  check(await page.evaluate(() => document.activeElement?.hasAttribute('data-services-toggle')), 'Servicii: focusul revine pe buton');
  await btn.click();
  await page.mouse.click(720, 600);
  check((await btn.getAttribute('aria-expanded')) === 'false', 'Servicii: click în afară închide');
  await page.close();
}

// Mobil
{
  const page = await browser.newPage({ viewport: { width: 375, height: 800 } });
  await page.goto(`${base}${path}`, { waitUntil: 'networkidle' });
  const burger = page.locator('[data-menu-toggle]');
  check(await burger.isVisible(), 'Mobil: butonul de meniu e vizibil');
  await burger.focus();
  await page.keyboard.press('Enter');
  check((await burger.getAttribute('aria-expanded')) === 'true', 'Mobil: Enter deschide meniul');
  check(await page.locator('#mobile-menu').isVisible(), 'Mobil: panoul e vizibil');
  check(await page.evaluate(() => document.activeElement?.closest('#mobile-menu') !== null), 'Mobil: focusul intră în panou');
  check((await burger.getAttribute('aria-label')) !== null && (await burger.getAttribute('aria-label')) !== '', `Mobil: aria-label la deschis = „${await burger.getAttribute('aria-label')}”`);
  // focus trap: Tab de multe ori rămâne în panou sau pe buton
  let inside = true;
  for (let i = 0; i < 30; i++) {
    await page.keyboard.press('Tab');
    const ok = await page.evaluate(() => { const el = document.activeElement; return !!el && (el.closest('#mobile-menu') !== null || el.hasAttribute('data-menu-toggle')); });
    if (!ok) { inside = false; break; }
  }
  check(inside, 'Mobil: Tab rămâne în meniu (focus trap)');
  await page.keyboard.press('Escape');
  check((await burger.getAttribute('aria-expanded')) === 'false', 'Mobil: Esc închide meniul');
  check(await page.evaluate(() => document.activeElement?.hasAttribute('data-menu-toggle')), 'Mobil: focusul revine pe buton');
  await page.close();
}

await browser.close();
console.log(failures ? `\n${failures} verificări au picat.` : '\nToate verificările de tastatură au trecut.');
process.exit(failures ? 1 : 0);
