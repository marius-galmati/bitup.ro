// @ts-check
import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// ARHITECTURA.md § Stack, § Limbi, § Rute. Astro (versiunea din package.json), static, fără adapter (Cloudflare Pages servește dist/).
export default defineConfig({
  // Markdown: fără smartypants (Astro 7 îl are pornit implicit și transforma "…" și ' din textul EN în “…” și ’, adică alt text decât cel din spec).
  markdown: { smartypants: false },
  site: 'https://bitup.ro',
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
      // Excluse: 404, pagina de mulțumire (noindex) și pagina de QA (doar dev/staging).
      filter: (page) => !/\/(404|multumesc|en\/thank-you|qa)(\/|$)/.test(page),
    }),
    // Doar setul `lucide`, maximum 12 iconițe în tot site-ul (DESIGN.md § Imagini și grafică). Lista crește pe măsură ce sunt folosite.
    icon({ include: { lucide: ['sun', 'moon'] } }),
  ],
});
