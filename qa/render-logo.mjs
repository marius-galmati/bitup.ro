/**
 * Randează logo-urile SVG (public/logos/) pentru control vizual și produce rasterele pentru favicon: node qa/render-logo.mjs
 * Ieșire: qa/fonturi/logo-test.png (foaie de control, fundal deschis și închis, lângă PNG-ul original), qa/fonturi/mark-{16,32,48,180}.png.
 */
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
const svg = (f) => 'data:image/svg+xml;base64,' + Buffer.from(readFileSync(resolve('public/logos', f))).toString('base64');
const png = 'data:image/png;base64,' + readFileSync(resolve('BITUP-Final-logo.png')).toString('base64');
const html = `<body style="margin:0;font:14px sans-serif">
<div style="padding:32px;background:#F5F8F8;display:flex;gap:40px;align-items:center"><img src="${svg('bitup.svg')}" width="400"><img src="${svg('bitup-marca.svg')}" width="80"><img src="${svg('bitup.svg')}" width="132"></div>
<div style="padding:32px;background:#0C181D;display:flex;gap:40px;align-items:center"><img src="${svg('bitup-dark.svg')}" width="400"><img src="${svg('bitup-marca.svg')}" width="80" style="color-scheme:dark"><img src="${svg('bitup-dark.svg')}" width="132"></div>
<div style="padding:16px;background:#fff;display:flex;gap:24px;align-items:center"><img src="${svg('bitup.svg')}" width="260"><img src="${png}" width="260"><span>← vector | original PNG</span></div></body>`;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1000, height: 480 } });
await p.setContent(html);
await p.screenshot({ path: 'qa/fonturi/logo-test.png' });
for (const size of [16, 32, 48, 180]) {
  const m = await b.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
  await m.setContent(`<body style="margin:0;background:transparent"><img src="${svg('bitup-marca.svg')}" width="${size}" height="${size}" style="display:block"></body>`);
  await m.screenshot({ path: `qa/fonturi/mark-${size}.png`, omitBackground: true });
  await m.close();
}
await b.close();
console.log('randat: qa/fonturi/logo-test.png, mark-16/32/48/180.png');
