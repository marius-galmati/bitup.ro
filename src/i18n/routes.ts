/**
 * Harta rutelor RO ↔ EN (docs/brief-site-v3.md § 5, planul v3). Sursa unică pentru comutatorul de limbă, hreflang și sitemap.
 * Slug-urile sunt traduse, nu doar prefixate. Româna e la rădăcină, engleza sub /en.
 * Paginile se construiesc pe faze; o rută poate exista aici înaintea paginii ei.
 */

export type Locale = 'ro' | 'en';
export const locales: readonly Locale[] = ['ro', 'en'] as const;
export const defaultLocale: Locale = 'ro';

export const routes = {
  home: { ro: '/', en: '/en' },
  services: { ro: '/servicii', en: '/en/services' },
  security: { ro: '/servicii/securitate-cibernetica', en: '/en/services/cybersecurity' },
  infrastructure: { ro: '/servicii/infrastructura', en: '/en/services/infrastructure' },
  software: { ro: '/servicii/dezvoltare-software', en: '/en/services/software-development' },
  automation: { ro: '/servicii/automatizari', en: '/en/services/automation' },
  aiAgents: { ro: '/servicii/agenti-ai', en: '/en/services/ai-agents' },
  managedIt: { ro: '/servicii/it-administrat', en: '/en/services/managed-it' },
  cloud: { ro: '/bitup-cloud', en: '/en/bitup-cloud' },
  nis2: { ro: '/nis2', en: '/en/nis2' },
  projects: { ro: '/proiecte', en: '/en/projects' },
  about: { ro: '/despre', en: '/en/about' },
  blog: { ro: '/blog', en: '/en/blog' },
  contact: { ro: '/contact', en: '/en/contact' },
  terms: { ro: '/termeni', en: '/en/terms' },
  privacy: { ro: '/confidentialitate', en: '/en/privacy' },
  cookies: { ro: '/cookies', en: '/en/cookies' },
  rss: { ro: '/rss.xml', en: '/en/rss.xml' },
} as const;

export type RouteKey = keyof typeof routes;

/** Rute cu parametru: /proiecte/[slug], /blog/[slug]. Slug-ul proiectelor e același în ambele limbi; al articolelor e tradus (`translationOf`). */
export const dynamicRoutes = {
  project: { ro: '/proiecte', en: '/en/projects' },
  post: { ro: '/blog', en: '/en/blog' },
} as const;

export type DynamicRouteKey = keyof typeof dynamicRoutes;

/** Ancore diferite pe limbă. Se completează odată cu paginile. */
export const anchors = {} as const;

/** Pagini excluse din sitemap și marcate noindex. */
export const noindexRoutes: readonly RouteKey[] = [] as const;
