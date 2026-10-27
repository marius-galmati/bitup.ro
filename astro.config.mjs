// @ts-check
import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// docs/spec-tehnica.md § 2–4. Astro (versiunea din package.json), static, fără adapter (nginx servește dist/ pe serverul Dokploy; vezi Dockerfile).
/*
  Blocarea roboților, DOAR pe serverul local (`astro dev` și `astro preview`).
  Cerut de Marius pe 24 septembrie 2026: vrea să expună public serverul local, printr-un tunel, ca să arate
  site-ul cuiva, fără ca adresa aceea să ajungă în vreun index.

  De ce e sigur că nu ajunge în producție: `server.headers` configurează exclusiv serverul local de
  dezvoltare și de previzualizare. Nu scrie nimic în `dist/`, deci build-ul care intră în imaginea de producție
  rămâne neschimbat, iar headerele reale de producție sunt tot cele din `ARHITECTURA.md` § Headere (deploy/nginx/).
  Nu există `robots.txt` și nu trebuie creat: `public/robots.txt` ar intra în build, deci în producție.

  De ce un antet și NU `Disallow: /` în `robots.txt`: sunt două lucruri diferite. `Disallow` oprește *citirea*
  paginii, `noindex` oprește *indexarea* ei. Un robot care n-are voie să citească pagina nu apucă să vadă
  `noindex`, așa că adresa poate ajunge totuși în rezultate, ca link gol, dacă o leagă cineva de undeva —
  e chiar avertismentul din documentația Google. Aici lipsa lui `robots.txt` (404) înseamnă „citește ce vrei”,
  exact ce trebuie ca `noindex` să fie văzut și respectat.

  `X-Robots-Tag: noindex` e echivalentul lui `<meta name="robots">`, dar se aplică la tot ce servește serverul
  (HTML, SVG, `sitemap-0.xml`, imagini), nu doar la paginile HTML, și nu trebuie scris în fișierele din `dist/`.

  Atenție: asta oprește indexarea, nu accesul. Cine are adresa, vede site-ul. Dacă vrei și acces restrâns,
  tunelul trebuie pus în spatele unei parole (Cloudflare Access, `cloudflared --basic-auth`, ngrok cu auth).
*/
const ROBOTI_BLOCATI = 'noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate';

/*
  Gazdele acceptate când serverul local e expus în afară (`npm run share`, `npm run dev:host`).
  Vite 8 verifică antetul `Host` și răspunde „Blocked request” la orice nume care nu e localhost sau IP —
  protecție împotriva atacurilor de tip DNS rebinding. Un IP din rețea (10.10.101.7) trece din start;
  un nume de tunel (`ceva.trycloudflare.com`) e respins, iar tunelul pare picat fără niciun motiv vizibil.

  Enumerăm gazdele, cu punct în față (Vite acceptă așa toate subdomeniile), în loc de `true`:
  `true` ar dezactiva verificarea pentru orice nume. Dacă folosești alt furnizor de tunel, adaugă-l aici.

  `.bitup.ro` acoperă subdomeniile proprii folosite pentru demo (`temp.bitup.ro` pe 24 septembrie 2026,
  și oricare altul de mai târziu). E domeniul nostru, deci nu lărgim suprafața către nimeni din afară.
*/
const TUNELURI = ['.bitup.ro', '.trycloudflare.com', '.ngrok-free.app', '.ngrok.io', '.ngrok.app', '.loca.lt', '.serveo.net'];

export default defineConfig({
  // Markdown: opțiunea `smartypants` e depreciată în Astro 7 și s-a scos în faza 1; ghilimelele din articole se verifică în faza 4.
  site: 'https://bitup.ro',
  // Doar serverul local; vezi comentariile de sus. Nu are efect asupra `dist/`.
  // `host` rămâne implicit (doar loopback): expunerea în rețea se cere explicit, cu `--host`.
  server: { headers: { 'X-Robots-Tag': ROBOTI_BLOCATI }, allowedHosts: TUNELURI },
  output: 'static',
  trailingSlash: 'never',
  // Din Astro 7 implicitul e 'jsx' (păstrează spațiile); vrem HTML comprimat, ca înainte.
  compressHTML: true,
  build: {
    // `/despre` → dist/despre.html, `/en` → dist/en.html: nginx le servește fără slash final (try_files $uri.html).
    format: 'file',
  },
  i18n: {
    defaultLocale: 'ro',
    locales: ['ro', 'en'],
    // Fără redirecționare automată după limbă (ARHITECTURA § Limbi). `redirectToDefaultLocale` nu se mai setează când prefixDefaultLocale e false.
    routing: { prefixDefaultLocale: false },
  },
  env: {
    schema: {
      // Doar chei publice aici. Secretele (Resend, Turnstile secret, LEAD_TO_EMAIL) stau în .dev.vars / Dokploy → Environment.
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_GA4_ID: envField.string({ context: 'client', access: 'public', optional: true }),
    },
  },
  integrations: [
    // Alternativele de limbă (hreflang) se generează din src/i18n/routes.ts prin `serialize`, în Faza 5;
    // opțiunea `i18n` a integrării presupune același slug în ambele limbi, ceea ce nu e cazul aici.
    sitemap({
      // Excluse: 404 și /styleguide (pagină internă, noindex; scoasă din build-ul de producție în faza 6).
      filter: (page) => !/\/(404|styleguide)(\/|$)/.test(page),
    }),
    // Doar setul `lucide` (componente.md § Iconițe: un singur set de linie). Lista crește pe măsură ce iconițele sunt folosite.
    icon({ include: { lucide: ['sun', 'moon', 'chevron-down', 'chevron-right', 'plus', 'mail', 'phone', 'shield', 'cloud', 'code-xml', 'zap', 'sparkles', 'headset'] } }),
  ],
});
