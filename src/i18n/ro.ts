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

  /** Cele 5 straturi din diagramă (copy.md § Serviciile, ca straturi), de jos în sus, plus al șaselea serviciu. */
  layers: {
    ariaLabel: 'Serviciile BitUp, ca straturi peste fundația de securitate',
    items: ['Securitate cibernetică', 'Infrastructură', 'Dezvoltare software', 'Automatizări', 'Agenți AI'],
    foundation: 'fundația',
    managed: 'IT administrat și suport',
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
