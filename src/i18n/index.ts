/**
 * Helpers i18n: t(), getLocale(), altUrl(), localePath(), absoluteUrl().
 * Ruta pereche vine mereu din routes.ts (ARHITECTURA.md § Limbi).
 */
import { ro } from './ro';
import { en } from './en';
import {
  routes,
  dynamicRoutes,
  anchors,
  defaultLocale,
  locales,
  type Locale,
  type RouteKey,
  type DynamicRouteKey,
} from './routes';

export { routes, dynamicRoutes, anchors, defaultLocale, locales };
export type { Locale, RouteKey, DynamicRouteKey };

const SITE = 'https://bitup.ro';

const dictionaries = { ro, en } as const;

/** Dicționarul de microcopy pentru o limbă. Tipul e cel al dicționarului RO; EN are aceeași formă. */
export function t(locale: Locale): typeof ro {
  return dictionaries[locale];
}

/** Limba se deduce din URL: tot ce începe cu /en este engleză; restul e română. */
export function getLocale(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'ro';
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'ro' ? 'en' : 'ro';
}

/** Calea unei rute statice în limba dată. */
export function localePath(key: RouteKey, locale: Locale, anchor?: string): string {
  const path = routes[key][locale];
  return anchor ? `${path}#${anchor}` : path;
}

/** Calea unei intrări din colecție (studiu de caz, articol) în limba dată. */
export function dynamicPath(key: DynamicRouteKey, locale: Locale, slug: string): string {
  return `${dynamicRoutes[key][locale]}/${slug}`;
}

/**
 * URL-ul paginii pereche în cealaltă limbă (pentru LangSwitch și hreflang).
 * Pentru intrări fără pereche (articol netradus), se dă `fallbackKey` (indexul secțiunii).
 */
export function altUrl(
  current: { key: RouteKey } | { dynamic: DynamicRouteKey; slug: string | null; fallbackKey: RouteKey },
  locale: Locale,
): string {
  const target = otherLocale(locale);
  if ('key' in current) return routes[current.key][target];
  if (current.slug) return dynamicPath(current.dynamic, target, current.slug);
  return routes[current.fallbackKey][target];
}

/** URL absolut, fără slash final (trailingSlash: 'never'). */
export function absoluteUrl(path: string): string {
  if (path === '/') return `${SITE}/`;
  return `${SITE}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Toate variantele de limbă ale unei rute statice, pentru hreflang și sitemap. x-default = română. */
export function alternates(key: RouteKey): { ro: string; en: string; xDefault: string } {
  return {
    ro: absoluteUrl(routes[key].ro),
    en: absoluteUrl(routes[key].en),
    xDefault: absoluteUrl(routes[key].ro),
  };
}

/** Găsește cheia rutei pentru o cale statică (sau null). */
export function routeKeyForPath(pathname: string): RouteKey | null {
  for (const key of Object.keys(routes) as RouteKey[]) {
    for (const loc of locales) {
      if (routes[key][loc] === pathname) return key;
    }
  }
  return null;
}

/** Formatare de dată după limbă: „10 septembrie 2026” / „September 10, 2026”. */
export function formatDate(date: Date, locale: Locale): string {
  const intl = new Intl.DateTimeFormat(locale === 'ro' ? 'ro-RO' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
  return intl.format(date);
}

/** `lang` pentru <html>. */
export function htmlLang(locale: Locale): string {
  return locale;
}
