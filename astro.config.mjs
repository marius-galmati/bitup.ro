// @ts-check
import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// ARHITECTURA.md § Stack, § Limbi, § Rute. Astro (versiunea din package.json), static, fără adapter (Cloudflare Pages servește dist/).
/*
  Blocarea roboților, DOAR pe serverul local (`astro dev` și `astro preview`).
  Cerut de Marius pe 24 septembrie 2026: vrea să expună public serverul local, printr-un tunel, ca să arate
  site-ul cuiva, fără ca adresa aceea să ajungă în vreun index.

  De ce e sigur că nu ajunge în producție: `server.headers` configurează exclusiv serverul local de
  dezvoltare și de previzualizare. Nu scrie nimic în `dist/`, deci build-ul pe care îl publică Cloudflare Pages
  rămâne neschimbat, iar headerele reale de producție sunt tot cele din `ARHITECTURA.md` § Headere.
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
export default defineConfig({
  // Markdown: fără smartypants (Astro 7 îl are pornit implicit și transforma "…" și ' din textul EN în “…” și ’, adică alt text decât cel din spec).
  markdown: { smartypants: false },
  site: 'https://bitup.ro',
  // Doar serverul local; vezi comentariul de sus. Nu are efect asupra `dist/`.
  server: { headers: { 'X-Robots-Tag': ROBOTI_BLOCATI } },
  output: 'static',
  trailingSlash: 'never',
  // Din Astro 7 implicitul e 'jsx' (păstrează spațiile); vrem HTML comprimat, ca înainte.
  compressHTML: true,
  build: {
    // `/despre` → dist/despre.html, `/en` → dist/en.html: Cloudflare Pages le servește fără slash final.
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
      // Doar chei publice aici. Secretele (Resend, Turnstile secret, LEAD_TO_EMAIL) stau în .dev.vars / Cloudflare Pages.
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_GA4_ID: envField.string({ context: 'client', access: 'public', optional: true }),
    },
  },
  integrations: [
    // Alternativele de limbă (hreflang) se generează din src/i18n/routes.ts prin `serialize`, în Faza 5;
    // opțiunea `i18n` a integrării presupune același slug în ambele limbi, ceea ce nu e cazul aici.
    sitemap({
      // Excluse: 404, pagina de mulțumire (noindex), pagina de QA (doar dev/staging) și /echipa,
      // care stă în afara sitemap-ului cât timp `[[ACORD_ECHIPA]]` e necompletat (16-echipa.md § Indexare).
      filter: (page) => !/\/(404|multumesc|en\/thank-you|qa|echipa|en\/team)(\/|$)/.test(page),
    }),
    // Doar setul `lucide`, maximum 12 iconițe în tot site-ul (DESIGN.md § Imagini și grafică). Lista crește pe măsură ce sunt folosite.
    icon({ include: { lucide: ['sun', 'moon'] } }),
  ],
});
