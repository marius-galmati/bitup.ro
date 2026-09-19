/**
 * Microcopy de interfață, română. Textul e copiat exact din spec/continut/00-global.md.
 * Textul paginilor NU stă aici: e în componentele fiecărei pagini, copiat din spec/continut/NN-….md.
 */

export const ro = {
  lang: 'ro',
  siteName: 'BitUp',
  titleSeparator: ' · ',

  skipLink: 'Sari la conținut',

  nav: {
    ariaLabel: 'Navigare principală',
    footerAriaLabel: 'Navigare secundară',
    services: 'Servicii',
    servicesItems: [
      { label: 'Suport și administrare IT', route: 'itSupport' },
      { label: 'Securitate și continuitate', route: 'security' },
      { label: 'Automatizări și software', route: 'automation' },
      { label: 'Toate serviciile', route: 'services' },
    ],
    howWeWork: 'Cum lucrăm',
    results: 'Rezultate',
    about: 'Despre',
    team: 'Echipa',
    blog: 'Blog',
    primary: 'Radiografie IT gratuită',
    menuOpen: 'Meniu',
    menuClose: 'Închide meniul',
    mobile: {
      call: 'Sună: +40 757 150 894',
      clients: 'Clienți: scrie-i lui Cipri pe WhatsApp',
    },
  },

  // Meniul „Servicii”, desfășurat (design-ul din meniu (2).png). Textele sunt copiate din
  // 00-global § Meniu, 02-servicii-index § Hero și § Cele trei grupuri, și § Banda finală de CTA.
  // Meniul doar le reașază; niciun cuvânt nou.
  megaMenu: {
    eyebrow: 'Servicii',
    title: 'Trei grupuri de servicii. Un singur responsabil.',
    lead: 'Le poți lua separat. Merg cel mai bine împreună: securitatea și backup-ul țin de cum administrezi IT-ul, nu se adaugă după.',
    allLink: 'Toate serviciile',
    items: [
      { label: 'Suport și administrare IT', text: 'Abonament lunar. Preluăm tot ce ține de calculatoare, servere, rețea, cloud și Microsoft 365, și răspundem de rezultat.', route: 'itSupport' },
      { label: 'Securitate și continuitate', text: 'Protecția pe care o faci înainte, nu după. Și dovada că poți reveni când se întâmplă ceva.', route: 'security' },
      { label: 'Automatizări și software', text: 'Când un proces trăiește în Excel, pe email și în capul unui om, îl mutăm într-un sistem.', route: 'automation' },
    ],
    asideEyebrow: 'Radiografie IT gratuită',
    asideTitle: 'Cum ar fi o zi fără grija sistemelor, a backup-urilor și a securității datelor?',
    asideLink: 'Programează Radiografia IT',
    supportLink: 'Suport pentru clienți',
  },

  // Graficul din hero (hero.png, cerut de Marius pe 18 septembrie 2026). Etichetele sunt text nou,
  // luat din mockup: nu sunt în spec și nu se suprapun peste cele trei grupuri de servicii.
  heroDiagram: {
    benzi: ['Securitate cibernetică', 'Automatizări', 'Agentic AI', 'Software development', 'Infrastructură IT'],
    de: 'De la fragmentare',
    la: 'La progres',
    descriere: 'De la fragmentare la progres: cinci direcții împrăștiate se adună într-un singur traseu.',
  },

  langSwitch: { ariaLabel: 'Schimbă limba', ro: 'RO', en: 'EN', separator: ' · ' },
  theme: { ariaLabel: 'Comută tema: luminos / întunecat' },

  footer: {
    company: {
      name: 'BitUp Technology SRL',
      city: 'Cluj-Napoca, România',
      ids: 'CUI RO42613248 · J12/1556/2020',
      linkedinLabel: 'LinkedIn: ',
      linkedinCompany: 'BitUp Technology',
    },
    services: [
      { label: 'Suport și administrare IT', route: 'itSupport' },
      { label: 'Securitate și continuitate', route: 'security' },
      { label: 'Automatizări și software', route: 'automation' },
      { label: 'Radiografie IT gratuită', route: 'healthCheck' },
    ],
    companyLinks: [
      { label: 'Cum lucrăm', route: 'howWeWork' },
      { label: 'Rezultate', route: 'results' },
      { label: 'Despre', route: 'about' },
      { label: 'Echipa', route: 'team' },
      { label: 'Blog', route: 'blog' },
      { label: 'Contact', route: 'contact' },
      { label: 'Suport pentru clienți', route: 'support' },
    ],
    partners: ['Microsoft Partner', 'Fortinet Advocate', 'Veeam Partner', 'Anthropic Partner'],
    bottom: {
      copyright: '© 2026 BitUp Technology SRL',
      terms: 'Termeni',
      privacy: 'Confidențialitate',
      cookies: 'Cookies',
      cookieSettings: 'Setări cookie-uri',
    },
  },

  consent: {
    title: 'Cookie-uri de statistici, doar dacă vrei',
    text: 'Folosim Google Analytics ca să vedem ce pagini se citesc și de unde vin vizitatorii. Nu pornește până nu accepți, nu face reclame și nu vinde nimic nimănui. Te poți răzgândi oricând din „Setări cookie-uri”, jos în pagină.',
    linkLabel: 'Cum folosim cookie-urile',
    accept: 'Accept',
    decline: 'Refuz',
    currentAccepted: 'Acum: acceptat',
    currentDeclined: 'Acum: refuzat',
    regionLabel: 'Cookie-uri',
  },

  ctaBand: {
    default: {
      title: 'Cum ar fi o zi fără grija sistemelor, a backup-urilor și a securității datelor?',
      text: 'Începe cu 30 de minute. Îți spunem exact unde stai și ce ar însemna să preluăm noi grija asta.',
      button: 'Programează Radiografia IT',
      contactLine: '+40 757 150 894 · office@bitup.ro',
    },
    blog: {
      title: 'Vrei să vezi unde stă firma ta cu IT-ul?',
      text: '30 de minute, remote, 10 verificări, o pagină cu ce e bine, ce e urgent și ce ar costa. Fără obligații.',
      button: 'Programează Radiografia IT',
    },
  },

  factStrip: {
    since: 'Din 2020',
    city: 'Cluj-Napoca',
    response: 'Răspuns sub 2 ore în program',
    partners: ['Microsoft Partner', 'Fortinet Advocate', 'Veeam Partner', 'Anthropic Partner'],
  },

  formSignature: 'Îți răspunde un om, în maximum o zi lucrătoare.',

  consentCheckbox: {
    before: 'Sunt de acord ca BitUp Technology SRL să folosească datele de mai sus ca să-mi răspundă la această cerere. Nu le folosim pentru altceva și nu le dăm mai departe. Detalii în ',
    linkLabel: 'Politica de confidențialitate',
    after: '.',
    fieldName: 'Consimțământ', // numele câmpului din lista de câmpuri (06, 11), pentru „Completează [numele câmpului]…”
  },

  form: {
    required: (field: string) => `Completează ${field}, ca să te putem suna înapoi.`,
    emailInvalid: 'Emailul nu arată bine. Verifică-l, te rog.',
    phoneInvalid: 'Scrie numărul cu prefix, de exemplu 0740 123 456.',
    sendError: 'Nu s-a trimis. Nu e vina ta. Textul tău e încă aici; încearcă din nou peste un minut sau sună-ne direct la +40 757 150 894 / scrie-ne la office@bitup.ro.',
    turnstileFailed: 'Verificarea anti-spam n-a trecut. Reîncarcă pagina și încearcă din nou; dacă se repetă, scrie-ne direct la office@bitup.ro.',
    sending: 'Se trimite…',
    noscript: 'Formularul are nevoie de JavaScript pentru verificarea anti-spam. Sună la +40 757 150 894, scrie la office@bitup.ro sau alege direct o oră în calendar.',
  },

  thankYou: {
    title: 'Am primit. Ce urmează',
    description: 'Cererea ta a ajuns la noi. Uite ce se întâmplă în continuare.',
    radiografie: {
      h1: 'Am primit. Te sunăm.',
      text: 'Cererea a ajuns la noi, nu într-o coadă. Te sunăm în maximum o zi lucrătoare, stabilim un slot de 30 de minute pentru radiografie și îți spunem ce avem nevoie de la tine înainte (aproape nimic: cine e omul vostru de IT, dacă există, și ce te-a adus aici).',
      calendlyBefore: 'Dacă vrei să sari peste telefon, alege direct un slot de 30 de minute: ',
      calendlyLabel: 'Alege ora în calendar',
      meanwhile: 'Între timp, două lucruri utile: ',
      links: [
        { label: 'Cum decurge o radiografie', route: 'healthCheck', anchor: 'cum-decurge' },
        { label: 'Cum lucrăm după', route: 'howWeWork' },
      ],
    },
    contact: {
      h1: 'Am primit mesajul.',
      text: 'Îți răspundem personal, în maximum o zi lucrătoare, de la office@bitup.ro. Dacă e urgent, sună la +40 757 150 894.',
      calendlyBefore: 'Vrei să vorbim direct? ',
      calendlyLabel: 'Alege un slot de 30 de minute',
    },
  },

  notFound: {
    title: 'Pagina nu există',
    h1: 'Pagina asta nu există.',
    text: 'Poate s-a mutat când am refăcut site-ul, poate e o greșeală de scriere. Ce cauți, cel mai probabil, e aici:',
    links: [
      { label: 'Serviciile', route: 'services' },
      { label: 'Radiografie IT gratuită', route: 'healthCheck' },
      { label: 'Cum lucrăm', route: 'howWeWork' },
      { label: 'Contact', route: 'contact' },
    ],
    under: 'Dacă ai ajuns aici dintr-un link de pe alt site, scrie-ne la office@bitup.ro și îl reparăm.',
  },

  /** Caseta de autor (00-global § Caseta de autor): la persoana a III-a, deliberat (bio, nu vocea firmei). */
  authorBox: {
    text: 'Marius Galmati, fondator BitUp. În IT din 2017, cu ultimii doi ani și jumătate în securitate informațională într-o corporație din Fortune 500. Scrie despre ce iese la iveală când administrezi IT-ul unor firme mici: ce se strică, ce se repetă, ce merită automatizat.',
    linkLabel: 'LinkedIn',
    portraitAlt: 'Marius Galmati',
  },
  misc: {
    whatsappButton: 'Scrie-i lui Cipri pe WhatsApp',
    readTime: (minutes: number) => `${minutes} minute de citit`,
    draft: 'Draft, nepublicat',
    legalUpdated: 'Ultima actualizare: 10 septembrie 2026',
    legalToc: 'Cuprins',
    blogEyebrow: 'Blog',
    externalRel: 'noopener',
  },
} as const;

export type Dictionary = typeof ro;
