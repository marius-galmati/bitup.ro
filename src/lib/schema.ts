/**
 * Generatoare JSON-LD (ARHITECTURA.md § SEO). Textele în limba paginii; valorile din site.ts.
 * Organization + ProfessionalService pe toate paginile; restul (Person, Service, FAQPage, Article) se adaugă pe paginile lor.
 */
import { site } from './site';
import type { Locale } from '../i18n/routes';

const ORG_ID = `${site.url}/#organization`;
const SERVICE_ID = `${site.url}/#professionalservice`;

export function organization(locale: Locale) {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.legalName,
    alternateName: site.name,
    url: `${site.url}/`,
    logo: `${site.url}/logo-bitup.png`,
    telephone: site.phone.e164,
    email: site.email,
    sameAs: [site.linkedin],
    foundingDate: site.founded,
    founder: { '@type': 'Person', name: site.founder.name, jobTitle: site.founder.jobTitle[locale], sameAs: site.founder.linkedin },
    // `availableLanguage` e proprietate validă pe ContactPoint, nu pe Organization (Schema.org); o punem unde e validă.
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: site.phone.e164,
      email: site.email,
      contactType: 'customer service',
      availableLanguage: site.availableLanguage,
      areaServed: 'RO',
    },
  };
}

export function professionalService(locale: Locale) {
  return {
    '@type': 'ProfessionalService',
    '@id': SERVICE_ID,
    name: site.name,
    legalName: site.legalName,
    url: `${site.url}/`,
    telephone: site.phone.e164,
    email: site.email,
    image: `${site.url}/logo-bitup.png`,
    parentOrganization: { '@id': ORG_ID },
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.country.code,
    },
    areaServed: site.areaServed,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: site.hours.schemaDays,
      opens: site.hours.open,
      closes: site.hours.close,
    },
    founder: { '@type': 'Person', name: site.founder.name, jobTitle: site.founder.jobTitle[locale] },
    sameAs: [site.linkedin],
    // `inLanguage` nu e o proprietate validă pe ProfessionalService (validator.schema.org: UNKNOWN_FIELD); rămâne doar pe Article (Faza 3).
  };
}

/** Service, pe paginile de servicii (ARHITECTURA § SEO): name, provider, areaServed, description. */
export function service(locale: Locale, name: string, description: string, url: string) {
  return {
    '@type': 'Service',
    name,
    description,
    url,
    // fără `inLanguage`: și pe Service e UNKNOWN_FIELD la validator.schema.org (Faza 2b); limba e dată de `url` și de `areaServed`
    provider: { '@id': ORG_ID },
    areaServed: locale === 'ro' ? 'România' : 'Romania',
    serviceType: name,
  };
}

/** Person (Marius), pe /despre. */
export function person(locale: Locale, imageUrl?: string) {
  return {
    '@type': 'Person',
    '@id': `${site.url}/#founder`,
    name: site.founder.name,
    jobTitle: site.founder.jobTitle[locale],
    worksFor: { '@id': ORG_ID },
    sameAs: site.founder.linkedin,
    ...(imageUrl ? { image: imageUrl } : {}),
  };
}

/** Article (ARHITECTURA § SEO): articole de blog și studii de caz publicate. `about` = Organization a clientului, doar când cazul nu e draft. */
export function article(
  locale: Locale,
  a: { headline: string; description: string; url: string; datePublished: Date; dateModified?: Date; imageUrl?: string; about?: { name: string; url?: string } },
) {
  return {
    '@type': 'Article',
    headline: a.headline,
    description: a.description,
    url: a.url,
    mainEntityOfPage: a.url,
    inLanguage: locale,
    datePublished: a.datePublished.toISOString().slice(0, 10),
    ...(a.dateModified ? { dateModified: a.dateModified.toISOString().slice(0, 10) } : {}),
    author: { '@id': `${site.url}/#founder` },
    publisher: { '@id': ORG_ID },
    ...(a.imageUrl ? { image: a.imageUrl } : {}),
    ...(a.about ? { about: { '@type': 'Organization', name: a.about.name, ...(a.about.url ? { url: a.about.url } : {}) } } : {}),
  };
}

/** Graful de bază, pe toate paginile. */
export function baseGraph(locale: Locale, extra: Record<string, unknown>[] = []) {
  return {
    '@context': 'https://schema.org',
    '@graph': [organization(locale), professionalService(locale), ...extra],
  };
}
