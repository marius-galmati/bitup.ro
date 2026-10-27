/**
 * Generatoare JSON-LD (ARHITECTURA.md § SEO). Textele în limba paginii; valorile din site.ts.
 * Organization + ProfessionalService pe toate paginile; restul (Person, Service, FAQPage, Article) se adaugă pe paginile lor.
 */
import { site } from './site';
import type { Locale } from '../i18n/routes';

const ORG_ID = `${site.url}/#organization`;
const SERVICE_ID = `${site.url}/#professionalservice`;
const FOUNDER_ID = `${site.url}/#founder`;

export function organization(locale: Locale) {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.legalName,
    alternateName: site.name,
    url: `${site.url}/`,
    logo: `${site.url}/icon-512.png`,
    telephone: site.phone.e164,
    email: site.email,
    sameAs: [site.linkedin],
    foundingDate: site.founded,
    founder: { '@type': 'Person', '@id': FOUNDER_ID, name: site.founder.name, jobTitle: site.founder.jobTitle[locale], sameAs: site.founder.linkedin },
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
    image: `${site.url}/icon-512.png`,
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

/** Person (Marius). A ieșit de pe /despre odată cu rescrierea paginii (18 septembrie 2026); intră pe /echipa. */
export function person(locale: Locale, imageUrl?: string) {
  return {
    '@type': 'Person',
    '@id': FOUNDER_ID,
    name: site.founder.name,
    jobTitle: site.founder.jobTitle[locale],
    worksFor: { '@id': ORG_ID },
    sameAs: site.founder.linkedin,
    ...(imageUrl ? { image: imageUrl } : {}),
  };
}

/**
 * AboutPage (/despre, /en/about). `mainEntity` trimite la nodul Organization: pagina e despre firmă, nu despre o persoană.
 * Fondatorul rămâne vizibil în graf prin `Organization.founder`; profilurile individuale vor sta pe /echipa.
 */
export function aboutPage(locale: Locale, a: { name: string; description: string; url: string }) {
  return {
    '@type': 'AboutPage',
    name: a.name,
    description: a.description,
    url: a.url,
    inLanguage: locale,
    mainEntity: { '@id': ORG_ID },
  };
}

/**
 * ProfilePage (/echipa, /en/team). Pagina e `noindex` cât timp `[[ACORD_ECHIPA]]` e necompletat,
 * dar graful se emite corect de la început, ca să nu fie nevoie de o a doua trecere la publicare.
 */
export function profilePage(locale: Locale, p: { name: string; url: string }) {
  return {
    '@type': 'ProfilePage',
    name: p.name,
    url: p.url,
    inLanguage: locale,
  };
}

/**
 * Un membru al echipei, pe /echipa (16-echipa.md § JSON-LD).
 * `worksFor` se pune DOAR pentru fondator: relația celorlalți cu firma nu e stabilită în text
 * (`[[RELATIE_ECHIPA]]`) și nu o declarăm în date structurate înaintea textului.
 * Numele companiilor din rândul de experiență nu intră aici sub nicio formă.
 */
export function teamMember(m: { name: string; jobTitle: string; linkedin?: string | null; isFounder?: boolean }) {
  return {
    '@type': 'Person',
    ...(m.isFounder ? { '@id': FOUNDER_ID } : {}),
    name: m.name,
    jobTitle: m.jobTitle,
    ...(m.linkedin ? { sameAs: m.linkedin } : {}),
    ...(m.isFounder ? { worksFor: { '@id': ORG_ID } } : {}),
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
    author: { '@id': FOUNDER_ID },
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
