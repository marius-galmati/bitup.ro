/** Textul paginii /despre, copiat exact din spec/continut/09-despre.md. Hero, § Povestea și § Traseul rămân la persoana I (declarație semnată). */

export interface AboutCopy {
  title: string; description: string;
  hero: { eyebrow: string; h1: string; lead: string; portraitAlt: string };
  story: { eyebrow: string; h2: string; paragraphs: string[] };
  timeline: { eyebrow: string; h2: string; items: { years: string; text: string }[] };
  principles: { eyebrow: string; h2: string; cards: { title: string; text: string }[] };
  else: { eyebrow: string; h2: string; text: string; link: string };
  company: { eyebrow: string; h2: string; facts: { k: string; v: string }[]; personal: string; companyLink: string };
  cta: { title: string; text: string; button: string };
}

export const aboutRo: AboutCopy = {
  title: 'Despre Marius Galmati și BitUp · BitUp',
  description: 'Cine răspunde de IT-ul tău: Marius Galmati, în IT din 2017, cu experiență de securitate într-o corporație din Fortune 500. De ce există BitUp.',
  hero: {
    eyebrow: 'Despre',
    h1: 'Am văzut prea multe firme cu tehnologie, dar fără cineva care să răspundă de ea.',
    lead: 'Sunt Marius Galmati. Am făcut BitUp ca să fiu eu acela, pentru firmele mici din Cluj și din România.',
    portraitAlt: 'Marius Galmati, fondatorul BitUp',
  },
  story: {
    eyebrow: 'Cine sunt',
    h2: 'Din 2017, în IT-ul firmelor mici. Apoi la scară mare. Apoi înapoi, cu ce am învățat.',
    paragraphs: [
      'Lucrez în IT din 2017. Am început ca administrator de sistem în firme mici din Cluj, unde făceam de toate: servere, rețea, backup, firewall, utilizatori, telefonul care sună când nu merge imprimanta. Acolo am înțeles că într-o firmă mică IT-ul nu e un departament, e un om. Și când omul acela nu e, nu e nimeni.',
      'Am trecut apoi printr-o companie de software în creștere, unde am proiectat infrastructura noului sediu și am ținut suportul la nivel de SLA, cu tichete, timpi de răspuns și rapoarte. Iar din 2024 până în 2026 am lucrat la Concentrix, o corporație din Fortune 500, în securitate informațională: audituri ISO 27001 interne și externe, politici și guvernanță, planuri de continuitate și recuperare, protecție pe stații și servere, Microsoft 365 și Active Directory. La scara aceea, o greșeală se vede imediat.',
      'BitUp l-am pornit în 2020, din ce vedeam la firmele mici: aveau tehnologie, dar nu aveau structură; aveau furnizori, dar nu aveau un partener; aveau inițiative de digitalizare, dar nimeni nu-și asuma imaginea de ansamblu. Iar securitatea era mereu „extra”, ceva ce se adaugă după, dacă mai rămân bani. Am construit BitUp ca să fie invers: un singur partener care răspunde de tot IT-ul, cu securitatea făcută de la început, nu vândută separat.',
      'Aduc la scara firmei tale ce am învățat la scară mare, fără complexitate inutilă și fără hype de furnizor.',
    ],
  },
  timeline: {
    eyebrow: 'Traseul',
    h2: 'Pe scurt',
    items: [
      { years: '2010–2014', text: 'Calculatoare, Universitatea Tehnică din Cluj-Napoca' },
      { years: '2017–2021', text: 'Administrator de sistem într-o firmă din Cluj: virtualizare, Active Directory, firewall Fortinet, backup și recuperare cu Veeam' },
      { years: '2020', text: 'Pornesc BitUp Technology' },
      { years: '2021–2024', text: 'Administrator de sistem senior într-o companie de software în creștere: infrastructura noului sediu, suport pe SLA' },
      { years: '2024–2026', text: 'Concentrix (Fortune 500), securitate informațională: audituri ISO 27001, continuitate, EDR/XDR, patch management, Microsoft 365 și AD' },
      { years: '2026', text: 'BitUp, full-time' },
    ],
  },
  principles: {
    eyebrow: 'Principii',
    h2: 'Trei lucruri în care credem, cu ce înseamnă ele pentru tine',
    cards: [
      { title: 'Securitatea înainte de funcționalități', text: 'Nu instalăm nimic fără partea de securitate făcută. Nu vindem securitatea separat pentru că nu funcționează separat. Uneori asta înseamnă un „nu” la ceva ce ai vrea.' },
      { title: 'Claritatea înaintea vitezei', text: 'Spunem ce facem, de ce și cât costă, înainte să facem. Raportul lunar e scris din tichete, nu din memorie. Dacă nu înțelegi ceva din ce spunem, e problema noastră, nu a ta.' },
      { title: 'Gândirea pe termen lung', text: 'Alegem ce merge și peste cinci ani, nu ce arată bine luna asta. Nu-ți vindem ce nu ai nevoie și îți spunem când poți aștepta.' },
    ],
  },
  else: {
    eyebrow: 'În paralel',
    h2: 'Ce mai facem',
    text: 'Construim CyberXscore, o platformă prin care patronii își pot evalua singuri riscul cibernetic, în termeni de business, nu de IT. Și ProQ, o platformă pentru furnizorii din industria auto, folosită în patru țări.',
    link: 'Citește cazul ProQ',
  },
  company: {
    eyebrow: 'Datele firmei',
    h2: 'BitUp Technology SRL',
    facts: [
      { k: 'Din', v: 'iunie 2020' },
      { k: 'Unde', v: 'Cluj-Napoca' },
      { k: 'CUI', v: 'RO42613248 · J12/1556/2020' },
      { k: 'Parteneriate', v: 'Microsoft Partner · Fortinet Advocate · Veeam Partner' },
    ],
    personal: 'LinkedIn personal',
    companyLink: 'LinkedIn BitUp',
  },
  cta: {
    title: 'Vrei să vezi cum lucrăm, înainte să semnezi ceva?',
    text: '30 de minute, gratuit, fără obligații. Îți spunem exact unde stai.',
    button: 'Programează Radiografia IT',
  },
};
