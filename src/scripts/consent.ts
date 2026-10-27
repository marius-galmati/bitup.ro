/**
 * Consimțământul pentru statistici (docs/spec-tehnica.md § 7): GA4 cu Consent Mode v2, încărcat doar după „Accept”.
 * - Alegerea se ține în localStorage['bitup-consent'] ({ v: 'granted' | 'denied', t: data }), 6 luni; apoi bannerul revine.
 * - Fără alegere: bannerul apare și nu se încarcă nimic. „Refuz”: nu se încarcă nimic.
 * - „Accept”: `consent default` cu toate semnalele `denied`, apoi `update` doar pentru `analytics_storage`; publicitatea
 *   rămâne refuzată. Abia apoi se încarcă gtag.js (PUBLIC_GA4_ID, din mediu; fără el, nu se încarcă nimic).
 * - Butoanele [data-consent-open] (subsolul, pagina de cookie-uri) redeschid bannerul. Retragerea acordului oprește
 *   colectarea (`update` cu `denied`) și șterge cookie-urile _ga.
 */
import { PUBLIC_GA4_ID } from 'astro:env/client';

const KEY = 'bitup-consent';
const MAX_AGE = 1000 * 60 * 60 * 24 * 182; // ~6 luni
type Choice = 'granted' | 'denied';

declare global {
  interface Window { dataLayer: unknown[]; gtag: (...args: unknown[]) => void }
}

const read = (): Choice | null => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const { v, t } = JSON.parse(raw) as { v: Choice; t: number };
    if ((v !== 'granted' && v !== 'denied') || Date.now() - t > MAX_AGE) return null;
    return v;
  } catch { return null; }
};
const write = (v: Choice) => { try { localStorage.setItem(KEY, JSON.stringify({ v, t: Date.now() })); } catch {} };

let loaded = false;
function gtagInit() {
  window.dataLayer = window.dataLayer || [];
  // gtag cere obiectul `arguments`, nu un tablou.
  window.gtag = function gtag() { window.dataLayer.push(arguments); } as Window['gtag'];
}
function grant() {
  if (!PUBLIC_GA4_ID) return;
  if (!loaded) {
    gtagInit();
    window.gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' });
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(PUBLIC_GA4_ID)}`;
    document.head.appendChild(s);
    window.gtag('js', new Date());
    window.gtag('config', PUBLIC_GA4_ID);
    loaded = true;
  } else {
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
  }
}
function revoke() {
  if (loaded) window.gtag('consent', 'update', { analytics_storage: 'denied' });
  // Cookie-urile GA4 (_ga, _ga_<id>), pe domeniul curent și pe cel de bază.
  const host = location.hostname.replace(/^www\./, '');
  document.cookie.split(';').map((c) => c.split('=')[0].trim()).filter((n) => n === '_ga' || n.startsWith('_ga_')).forEach((n) => {
    for (const domain of ['', `; domain=.${host}`]) document.cookie = `${n}=; Max-Age=0; path=/${domain}`;
  });
}

const banner = document.querySelector<HTMLElement>('[data-consent-banner]');
if (banner) {
  const show = () => { banner.hidden = false; banner.focus(); };
  const hide = () => { banner.hidden = true; };
  const choice = read();
  if (choice === 'granted') grant();
  if (choice === null) banner.hidden = false;

  banner.querySelectorAll<HTMLElement>('[data-consent]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const v: Choice = btn.dataset.consent === 'accept' ? 'granted' : 'denied';
      write(v);
      if (v === 'granted') grant(); else revoke();
      hide();
    });
  });
  document.querySelectorAll<HTMLElement>('[data-consent-open]').forEach((b) => b.addEventListener('click', show));
}
