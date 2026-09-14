// @ts-check
import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// ARHITECTURA.md § Stack, § Limbi, § Rute. Astro 5, static, fără adapter (Cloudflare Pages servește dist/).
export default defineConfig({
  site: 'https://bitup.ro',
  output: 'static',
  trailingSlash: 'never',
  build: {
    // `/despre` → dist/despre.html, `/en` → dist/en.html: Cloudflare Pages le servește fără slash final.
    format: 'file',
  },
  i18n: {
    defaultLocale: 'ro',
    locales: ['ro', 'en'],
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
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
    sitemap(),
    // Doar setul `lucide`, maximum 12 iconițe în tot site-ul (DESIGN.md § Imagini și grafică). Lista crește pe măsură ce sunt folosite.
    icon({ include: { lucide: ['sun', 'moon'] } }),
  ],
});
