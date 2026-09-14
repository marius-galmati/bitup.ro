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
    // `inLanguage` nu e o proprietate validă pe ProfessionalService (validator.schema.org: UNKNOWN_FIELD); rămâne pe Article/Service.
  };
}

/** Graful de bază, pe toate paginile. */
export function baseGraph(locale: Locale, extra: Record<string, unknown>[] = []) {
  return {
    '@context': 'https://schema.org',
    '@graph': [organization(locale), professionalService(locale), ...extra],
  };
}
