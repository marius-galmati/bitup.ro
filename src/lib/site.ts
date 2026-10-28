/**
 * Constantele site-ului, din .claude/skills/bitup-brand/references/copy.md § Fapte aprobate, o singură dată.
 * Orice pagină, componentă sau JSON-LD le ia de aici, nu le rescrie.
 */
export const site = {
  url: 'https://bitup.ro',
  name: 'BitUp Technology',
  legalName: 'BitUp Technology SRL',

  /** Orașul publicat: Cluj-Napoca, atât (fără stradă). Identic în Google Business Profile. */
  city: 'Cluj-Napoca',
  region: 'Cluj',
  country: { ro: 'România', en: 'Romania', code: 'RO' },

  /** Sediul social: DOAR în paginile legale (Legea 365/2002), ca text. Nu în subsol, Contact sau JSON-LD. */
  registeredOffice: 'Câmpia Turzii, Str. Lazăr Gheorghe nr. 60, jud. Cluj',

  cui: 'RO42613248',
  regCom: 'J12/1556/2020',

  phone: {
    display: '+40 757 150 894',
    e164: '+40757150894',
    href: 'tel:+40757150894',
  },

  /** WhatsApp pentru suportul clienților existenți: în subsol și pe Contact (copy.md § Contact). */
  whatsapp: {
    display: '+40 750 263 653',
    number: '40750263653',
    href: 'https://wa.me/40750263653',
  },

  email: 'office@bitup.ro',
  emailHref: 'mailto:office@bitup.ro',

  /** Program: luni–vineri, 08:00–18:00; în afara lui, doar urgențele, la telefon. */
  hours: {
    days: { ro: 'luni–vineri', en: 'Monday to Friday' },
    open: '08:00',
    close: '18:00',
    /** Pentru JSON-LD `openingHoursSpecification`. */
    schemaDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  },

  /** Garanțiile IT-ului administrat: DOAR pe /servicii/it-administrat (copy.md § Interzis). */
  responseTime: {
    contractual: { ro: 'sub 2 ore în program', en: 'under 2 hours during business hours' },
    helpdeskAverage: { ro: 'sub 30 de minute', en: 'under 30 minutes' },
  },

  since: 2020,
  founded: '2020-06',

  linkedin: 'https://www.linkedin.com/company/bitup-technology',

  founder: {
    name: 'Marius Galmati',
    jobTitle: { ro: 'CEO și fondator', en: 'CEO and founder' },
    /** Apare pe Despre și ca autor pe articole. */
    linkedin: 'https://www.linkedin.com/in/nicolae-marius-galmati',
  },

  calendly: 'https://calendly.com/marius-galmati-bitup/30min',
  helpdesk: 'https://helpdesk.bitup.ro',

  /** Doar text, fără logo-uri; „Fortinet” fără alt titlu. */
  partners: { ro: ['Microsoft Partner', 'Fortinet', 'Veeam Partner', 'partener Anthropic'], en: ['Microsoft Partner', 'Fortinet', 'Veeam Partner', 'Anthropic partner'] },

  /** Data de pe paginile legale. */
  legalUpdated: '2026-09-10',

  languages: ['ro', 'en'] as const,
  /** JSON-LD `availableLanguage`. */
  availableLanguage: ['Romanian', 'English'],
} as const;

export type Site = typeof site;
