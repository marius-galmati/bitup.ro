/**
 * Constantele site-ului: valorile din spec/PLACEHOLDERS.md § Completate, o singură dată.
 * Orice pagină, componentă sau JSON-LD le ia de aici, nu le rescrie.
 */
export const site = {
  url: 'https://bitup.ro',
  name: 'BitUp',
  legalName: 'BitUp Technology SRL',

  /** Orașul publicat: Cluj-Napoca, atât (fără stradă). Identic în Google Business Profile. */
  city: 'Cluj-Napoca',
  region: 'Cluj',
  country: { ro: 'România', en: 'Romania', code: 'RO' },
  /** Aria deservită (JSON-LD `areaServed`). */
  areaServed: ['Cluj-Napoca', 'România'],

  /** Sediul social: DOAR pe /termeni și /confidentialitate, în blocul de identificare a operatorului. Nu în footer, contact, despre sau JSON-LD. */
  registeredOffice: 'Câmpia Turzii, Str. Lazăr Gheorghe nr. 60, jud. Cluj',

  cui: 'RO42613248',
  regCom: 'J12/1556/2020',

  phone: {
    display: '+40 757 150 894',
    e164: '+40757150894',
    href: 'tel:+40757150894',
  },

  /** WhatsApp suport (Cipri). Afișat doar pe /suport și în meniul mobil (prin /suport). */
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

  /** Contractual: sub 2 ore în program; media reală din helpdesk: sub 30 de minute (apare doar în text, nu în FactStrip). */
  responseTime: {
    contractual: { ro: 'sub 2 ore în program', en: 'under 2 hours during business hours' },
    helpdeskAverage: { ro: 'sub 30 de minute', en: 'under 30 minutes' },
  },

  since: 2020,
  founded: '2020-06',

  linkedin: 'https://www.linkedin.com/company/bitup-technology',

  founder: {
    name: 'Marius Galmati',
    jobTitle: { ro: 'Fondator', en: 'Founder' },
    /** Apare pe Despre, pe Contact și în caseta de autor. Nu în footer. */
    linkedin: 'https://www.linkedin.com/in/nicolae-marius-galmati',
  },

  calendly: 'https://calendly.com/marius-galmati-bitup/30min',
  helpdesk: 'https://helpdesk.bitup.ro',

  partners: ['Microsoft Partner', 'Fortinet Advocate', 'Veeam Partner', 'Anthropic Partner'],

  /** Data de pe paginile legale. */
  legalUpdated: '2026-09-10',

  languages: ['ro', 'en'] as const,
  /** JSON-LD `availableLanguage`. */
  availableLanguage: ['Romanian', 'English'],
} as const;

export type Site = typeof site;
