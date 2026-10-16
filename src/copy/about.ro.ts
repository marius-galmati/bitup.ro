/**
 * Textul paginii /despre, copiat exact din spec/continut/09-despre.md.
 * Pagina e integral la persoana I plural (CLAUDE.md § Voce): e vocea firmei, nu a fondatorului.
 * Profilurile individuale — și singularul care le însoțește — trec pe /echipa.
 */

export interface AboutCopy {
  title: string; description: string;
  hero: { eyebrow: string; h1: string; lead: string };
  origin: { eyebrow: string; h2: string; paragraphs: string[] };
  team: { eyebrow: string; h2: string; paragraphs: string[]; link: string };
  audience: { eyebrow: string; h2: string; items: string[]; closing: string };
  problems: { eyebrow: string; h2: string; cards: { title: string; text: string }[] };
  tech: { eyebrow: string; h2: string; paragraphs: string[]; link: string };
  values: { eyebrow: string; h2: string; cards: { title: string; text: string }[] };
  company: { eyebrow: string; h2: string; facts: { k: string; v: string }[]; companyLink: string };
  cta: { title: string; text: string; button: string };
}

export const aboutRo: AboutCopy = {
  title: 'Despre BitUp Technology · BitUp',
  description: 'BitUp Technology: o echipă de specialiști IT formată în companii internaționale, care aduce structură, tehnologie modernă și securitate proiectată de la început în companiile din România.',
  hero: {
    eyebrow: 'Despre',
    h1: 'Standarde enterprise, aduse la scara companiei tale.',
    lead: 'BitUp Technology este o echipă de specialiști IT formată în companii internaționale. Pagina asta spune cine suntem și cum putem aduce plus valoare în business-ul tău.',
  },
  origin: {
    eyebrow: 'De ce existăm',
    h2: 'De ce am fondat BitUp',
    paragraphs: [
      'Ne-am format în organizații mari, unde IT-ul funcționează pe proceduri scrise, standarde internaționale și responsabilități clare. În companiile din România am regăsit aceeași tehnologie, folosită fără niciuna dintre ele: sisteme cumpărate corect, administrate la întâmplare, cu securitatea tratată ca opțiune.',
      'BitUp Technology a fost fondată în 2020, pornind de la o observație simplă: diferența dintre o companie care controlează tehnologia și una controlată de ea nu vine din buget. Vine din structură — cine răspunde, ce se documentează, ce se verifică și la ce interval.',
      'Aducem în companii de orice dimensiune modul de operare al organizațiilor mari: guvernanță, procese, documentație și securitate proiectată de la început, calibrate la realitatea și la bugetul fiecăreia.',
    ],
  },
  team: {
    eyebrow: 'Echipa',
    h2: 'Specialiști pe zone diferite din IT, nu un singur om bun la toate',
    paragraphs: [
      'În spatele BitUp stă o echipă cu experiență acumulată în companii precum Bosch, NTT DATA, Marsh și Concentrix: infrastructură și securitate informațională, dezvoltare software, inteligență artificială și automatizări, livrare de proiecte în echipe internaționale. Fiecare zonă are omul ei, iar problemele tale ajung la cineva care le-a mai întâlnit la scară mare.',
      'Standardele după care operăm vin din locurile unde ne-am format: audituri ISO 27001, management al riscului, control al schimbărilor, documentație care rămâne la client.',
    ],
    link: 'Vezi echipa',
  },
  audience: {
    eyebrow: 'Cui ne adresăm',
    h2: 'Cu cine ne potrivim',
    items: [
      'Companii care depind de sistemele lor și nu au pe cineva care să răspundă de ansamblu.',
      'Companii cu mai mulți furnizori, unde nimeni nu are imaginea completă și responsabilitatea finală.',
      'Companii care au deja o echipă IT internă și au nevoie de expertiză pe zone punctuale: securitate, cloud, automatizări, dezvoltare software.',
      'Companii cu cerințe de conformitate — NIS2, ISO 27001, cerințe venite de la clienți sau din audituri — care trebuie traduse în măsuri concrete.',
      'Companii care vor să digitalizeze procese și să folosească automatizări și AI fără să-și crească riscul.',
    ],
    closing: 'Nu suntem potriviți pentru cine caută cel mai mic preț. Prioritatea noastră este rezultatul în timp, nu cea mai mică poziție din ofertă.',
  },
  problems: {
    eyebrow: 'Ce rezolvăm',
    h2: 'Patru probleme care se repetă',
    cards: [
      { title: 'Responsabilitate difuză', text: 'Tehnologia există, dar nu răspunde nimeni de ea în ansamblu. Preluăm rolul ăsta, cu un punct unic de contact și cu raport lunar scris din tichete.' },
      { title: 'Securitate adăugată la final', text: 'Sistemele se construiesc întâi și se protejează după, dacă mai rămâne buget. Noi proiectăm securitatea în fiecare etapă, nu o vindem separat.' },
      { title: 'Procese care trăiesc în Excel și în memoria unui om', text: 'Informația nu circulă, se pierde la fiecare plecare. Le mutăm în sisteme, cu automatizări și integrări între aplicațiile existente.' },
      { title: 'Tehnologie cumpărată, nu integrată', text: 'Licențe și echipamente care nu comunică între ele. Facem inventarul, eliminăm suprapunerile și construim o arhitectură coerentă.' },
    ],
  },
  tech: {
    eyebrow: 'Tehnologia',
    h2: 'Tehnologie modernă, aplicată pragmatic',
    paragraphs: [
      'Digitalizare, cloud, automatizări între aplicații, agenți AI cu scop definit: toate intră în discuție doar acolo unde rezolvă o problemă măsurabilă. Fiecare tehnologie nouă trece prin aceleași întrebări înainte să ajungă în producție — ce problemă rezolvă, cine o administrează, ce riscuri aduce și cum o oprim dacă nu dă rezultatul așteptat.',
      'Dezvoltăm și produse proprii: CyberXscore, prin care o companie își poate evalua singură riscul cibernetic în termeni de business, și ProQ, platformă pentru furnizorii din industria auto.',
    ],
    link: 'Citește cazul ProQ',
  },
  values: {
    eyebrow: 'Valorile',
    h2: 'Trei valori, cu ce înseamnă fiecare în practică',
    cards: [
      { title: 'Integritate', text: 'Spunem ce am făcut, ce nu am reușit și unde am greșit. Raportul lunar se scrie din tichete, nu din memorie. Recomandăm și varianta care nu ne aduce venit, când e cea corectă pentru tine.' },
      { title: 'Inovație', text: 'Tehnologiile noi intră unde produc un rezultat măsurabil, nu unde sună bine. Se testează înainte, se documentează după, iar ce nu funcționează se retrage.' },
      { title: 'Profesionalism', text: 'Proceduri scrise, control al schimbărilor, termene asumate și documentație care rămâne la client. Aceleași standarde ca într-o organizație mare, fără birocrația ei.' },
    ],
  },
  company: {
    eyebrow: 'Datele firmei',
    h2: 'BitUp Technology SRL',
    facts: [
      { k: 'Din', v: 'iunie 2020' },
      { k: 'Unde', v: 'Cluj-Napoca' },
      { k: 'CUI', v: 'RO42613248 · J12/1556/2020' },
      { k: 'Parteneriate', v: 'Microsoft Partner · Fortinet Partner · Veeam Partner · Anthropic Partner' },
    ],
    companyLink: 'LinkedIn BitUp',
  },
  cta: {
    title: 'Vrei să vezi unde stă compania ta, înainte de orice decizie?',
    text: '30 de minute, gratuit, fără obligații. Îți spunem exact unde stai și ce ar însemna să preluăm noi grija asta.',
    button: 'Programează Radiografia IT',
  },
};
