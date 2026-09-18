/**
 * Harta rutelor RO ↔ EN (ARHITECTURA.md § Rute). Sursa unică pentru comutatorul de limbă, hreflang și sitemap.
 * Slug-urile sunt traduse, nu doar prefixate. Româna e la rădăcină, engleza sub /en.
 */

export type Locale = 'ro' | 'en';
export const locales: readonly Locale[] = ['ro', 'en'] as const;
export const defaultLocale: Locale = 'ro';

export const routes = {
  home: { ro: '/', en: '/en' },
  services: { ro: '/servicii', en: '/en/services' },
  itSupport: { ro: '/servicii/suport-it', en: '/en/services/it-support' },
  security: { ro: '/servicii/securitate', en: '/en/services/security' },
  automation: { ro: '/servicii/automatizari', en: '/en/services/automation' },
  healthCheck: { ro: '/radiografie-it', en: '/en/it-health-check' },
  howWeWork: { ro: '/cum-lucram', en: '/en/how-we-work' },
  results: { ro: '/rezultate', en: '/en/results' },
  about: { ro: '/despre', en: '/en/about' },
  // Pagina nu e încă implementată (ARHITECTURA § Rute, `16-…`); ruta stă aici de la început ca linkul din /despre să aibă o singură sursă.
  team: { ro: '/echipa', en: '/en/team' },
  blog: { ro: '/blog', en: '/en/blog' },
  support: { ro: '/suport', en: '/en/support' },
  contact: { ro: '/contact', en: '/en/contact' },
  thankYou: { ro: '/multumesc', en: '/en/thank-you' },
  terms: { ro: '/termeni', en: '/en/terms' },
  privacy: { ro: '/confidentialitate', en: '/en/privacy' },
  cookies: { ro: '/cookies', en: '/en/cookies' },
  rss: { ro: '/rss.xml', en: '/en/rss.xml' },
} as const;

export type RouteKey = keyof typeof routes;

/** Rute cu parametru: /rezultate/[slug], /blog/[slug]. Slug-ul cazurilor e același în ambele limbi; slug-ul articolelor e tradus (din frontmatter, `translationOf`). */
export const dynamicRoutes = {
  caseStudy: { ro: '/rezultate', en: '/en/results' },
  post: { ro: '/blog', en: '/en/blog' },
} as const;

export type DynamicRouteKey = keyof typeof dynamicRoutes;

/** Ancorele cerute în ARHITECTURA.md § Rute, diferite pe limbă. */
export const anchors = {
  itSupport: {
    ro: { included: 'ce-include', cloud: 'cloud', equipment: 'echipamente', faq: 'intrebari' },
    en: { included: 'whats-included', cloud: 'cloud', equipment: 'equipment', faq: 'faq' },
  },
  security: {
    ro: { backup: 'backup', audit: 'audit', nis2: 'nis2', incidents: 'incidente', faq: 'intrebari' },
    en: { backup: 'backup', audit: 'audit', nis2: 'nis2', incidents: 'incidents', faq: 'faq' },
  },
  automation: {
    ro: { software: 'software', faq: 'intrebari' },
    en: { software: 'software', faq: 'faq' },
  },
  healthCheck: {
    ro: { howItWorks: 'cum-decurge', form: 'formular', faq: 'intrebari' },
    en: { howItWorks: 'how-it-works', form: 'form', faq: 'faq' },
  },
} as const;

/** Pagini excluse din sitemap și marcate noindex. */
export const noindexRoutes: readonly RouteKey[] = ['thankYou'] as const;
