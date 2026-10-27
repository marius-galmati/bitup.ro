/**
 * Microcopy de interfață, română. Textele de pagină stau în paginile lor (fazele 2–4).
 * Faptele vin din .claude/skills/bitup-brand/references/copy.md; nimic inventat.
 */

export const ro = {
  lang: 'ro',
  siteName: 'BitUp Technology',
  titleSeparator: ' · ',

  skipLink: 'Sari la conținut',
  logoAlt: 'BitUp Technology, pagina principală',

  langSwitch: { ariaLabel: 'Limba site-ului', ro: 'RO', en: 'EN' },
  theme: { ariaLabel: 'Tema închisă' },

  breadcrumb: { ariaLabel: 'Ești aici', home: 'Acasă' },

  /** Antetul (componente.md § Antet; brief § 5: Servicii · Proiecte · NIS2 · Despre · Blog · Contact, plus butonul principal). */
  nav: {
    ariaLabel: 'Navigația principală',
    services: 'Servicii',
    projects: 'Proiecte',
    nis2: 'NIS2',
    about: 'Despre',
    blog: 'Blog',
    contact: 'Contact',
    allServices: 'Toate serviciile',
    cloud: 'BitUp Cloud',
    cta: 'Scrie-ne problema',
    menuOpen: 'Deschide meniul',
    menuClose: 'Închide meniul',
    menu: 'Meniu',
  },

  footer: {
    services: 'Servicii',
    company: 'Companie',
    contact: 'Contact',
    clients: 'Pentru clienții existenți',
    helpdesk: 'Helpdesk',
    whatsapp: 'WhatsApp suport',
    partners: 'Parteneri',
    legalAria: 'Informații legale',
    terms: 'Termeni',
    privacy: 'Confidențialitate',
    cookies: 'Cookie-uri',
    cookieSettings: 'Setări cookie-uri',
  },

  notFound: {
    title: 'Pagina nu există',
    text: 'Adresa nu duce la nicio pagină de pe site. Poate a fost mutată sau are o greșeală de scriere.',
    home: 'Mergi la pagina principală',
    services: 'Vezi serviciile',
    contact: 'Scrie-ne',
  },

  /** Cele 5 straturi din diagramă (copy.md § Serviciile, ca straturi), de jos în sus, plus al șaselea serviciu. */
  layers: {
    ariaLabel: 'Serviciile BitUp, ca straturi peste fundația de securitate',
    items: ['Securitate cibernetică', 'Infrastructură', 'Dezvoltare software', 'Automatizări', 'Agenți AI'],
    foundation: 'fundația',
    managed: 'IT administrat și suport',
  },

  /** Stiva din hero (HeroStack): numele straturilor, ca în diagramă; textul pentru cititoarele de ecran, ca pe bitup.ro. */
  heroStack: {
    straturi: ['Securitate cibernetică', 'Infrastructură', 'Dezvoltare software', 'Automatizări', 'Agenți AI'],
    fundatia: 'fundația',
    ariaLabel: 'Securitatea stă la baza fiecărui serviciu',
  },

  consent: {
    title: 'Cookie-uri de statistici, doar cu acordul tău',
    text: 'Folosim Google Analytics ca să vedem ce pagini se citesc și de unde vin vizitatorii. Nu pornește până nu accepți. Poți schimba alegerea oricând din „Setări cookie-uri”, jos în pagină.',
    linkLabel: 'Cum folosim cookie-urile',
    accept: 'Accept',
    decline: 'Refuz',
    regionLabel: 'Cookie-uri',
  },

  form: {
    required: 'obligatoriu',
    optional: 'opțional',
  },
};
