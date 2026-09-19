/**
 * Textul paginii /echipa, copiat exact din spec/continut/16-echipa.md.
 * Pagina e `noindex` cât timp `[[ACORD_ECHIPA]]` e necompletat (vezi spec/PLACEHOLDERS.md § Rămase).
 * `linkedin: null` înseamnă că linkul e încă placeholder: se randează `[[LINKEDIN_CRISTIAN]]`, nu un link.
 */

export interface TeamMember {
  /** Cheia fotografiei din `TeamPage.astro`; fără intrare acolo, se randează substituentul cu inițiale. */
  id: 'marius' | 'petre' | 'samuel' | 'cristian';
  name: string;
  /** Inițialele din substituentul pătrat, cât timp lipsește fotografia. */
  initials: string;
  role: string;
  experience: string;
  /** Textul alternativ al fotografiei; gol pentru cine n-are încă poză. */
  photoAlt: string;
  /** Numele placeholder-ului de fotografie, pentru listare; rămâne și după ce poza intră în repo. */
  photoPlaceholder: string;
  linkedin: string | null;
  /** Placeholder-ul vizibil în pagină când `linkedin` e null. */
  linkedinPlaceholder?: string;
  linkedinAriaLabel: string;
  paragraphs: string[];
}

export interface TeamCopy {
  title: string; description: string;
  hero: { eyebrow: string; h1: string; lead: string };
  intro: { text: string };
  people: TeamMember[];
  linkedinLabel: string;
  closing: { eyebrow: string; h2: string; paragraphs: string[] };
  cta: { title: string; text: string; button: string };
}

export const teamRo: TeamCopy = {
  title: 'Echipa BitUp Technology · BitUp',
  description: 'Oamenii din spatele BitUp: securitate informațională, securitate ofensivă și Red Team, inteligență artificială și automatizări, dezvoltare software. Experiență formată în Bosch, NTT DATA, Marsh și Concentrix.',
  hero: {
    eyebrow: 'Echipa',
    h1: 'Oamenii din spatele BitUp.',
    lead: 'Patru specializări care se completează: securitate informațională și infrastructură, securitate ofensivă, inteligență artificială și automatizări, dezvoltare software. Experiența fiecăruia s-a format în companii internaționale — Bosch, NTT DATA, Marsh, Concentrix.',
  },
  intro: {
    text: 'BitUp funcționează cu un nucleu permanent și cu specialiști dedicați pe zonele unde nu improvizăm. Fiecare problemă ajunge la omul care a mai întâlnit-o, nu la primul disponibil. [[RELATIE_ECHIPA]]',
  },
  linkedinLabel: 'LinkedIn',
  people: [
    {
      id: 'marius',
      name: 'Marius Galmati',
      photoAlt: 'Marius Galmati, fondatorul BitUp',
      initials: 'MG',
      role: 'Fondator',
      experience: 'Experiență enterprise: Concentrix (Fortune 500)',
      photoPlaceholder: '[[FOTO_MARIUS]]',
      linkedin: 'https://www.linkedin.com/in/nicolae-marius-galmati',
      linkedinAriaLabel: 'Profilul de LinkedIn al lui Marius Galmati',
      paragraphs: [
        'Peste zece ani în IT, de la companii locale până la mediul enterprise, într-o corporație americană din Fortune 500. În toate a regăsit aceeași problemă: organizații cu tehnologie cumpărată corect, dar fără structură în spatele ei. Fără proceduri scrise, fără procese care să se repete identic, fără nimeni responsabil de imaginea de ansamblu, iar securitatea amânată pentru „după”.',
        'A parcurs administrarea de sisteme, infrastructura și suportul pe SLA, apoi a intrat în securitate informațională și acolo a rămas. A făcut parte din echipa care a pregătit auditul ISO 27001: a scris documentația și procedurile, a implementat controale și procese, a acoperit planurile de continuitate și protecția stațiilor și a serverelor. Acolo a văzut că ordinea se poate construi, se poate scrie și se poate dovedi.',
        'A fondat BitUp în 2020, ca să aducă ordinea aceea la scara companiilor românești, fără aparatul unei corporații. Obiectivul lui acum: companiile din România să ajungă la standardele de securitate cerute de partenerii și clienții lor din afară, cu procese, proceduri și digitalizare puse în ordinea care are sens pentru business, nu pentru bifat.',
      ],
    },
    {
      id: 'petre',
      name: 'Petre Radu Cătălin',
      photoAlt: 'Petre Radu Cătălin, Red Team și securitate ofensivă',
      initials: 'PR',
      role: 'Red Team & Securitate ofensivă',
      experience: 'Experiență enterprise: NTT DATA',
      photoPlaceholder: '[[FOTO_PETRE]]',
      linkedin: 'https://www.linkedin.com/in/petreradu',
      linkedinAriaLabel: 'Profilul de LinkedIn al lui Petre Radu Cătălin',
      paragraphs: [
        'Petre este penetration tester în cadrul NTT DATA, cu activitate în zona de securitate ofensivă. Experiența lui acoperă testarea de penetrare a aplicațiilor web și a API-urilor, a infrastructurilor de rețea și a mediilor cloud, cu un focus deosebit pe abuzurile de tip IAM și pe căile de escaladare a privilegiilor, exact zonele unde atacatorii reali lovesc primii.',
        'A lucrat într-un mediu enterprise, pentru clienți de dimensiuni foarte mari, și știe ce înseamnă un test de penetrare făcut corect: nu doar findings, ci risc real pentru business. Pe partea de Red Team, abordează fiecare simulare ca pe o campanie reală, de la recon și prima vulnerabilitate exploatată, până la compromiterea domeniului și raportul care explică pe înțelesul tuturor cum s-a întâmplat.',
        'Ce îl recomandă în proiectele cu clienți este că acoperă integral ciclul unui engagement: de la prima discuție și definirea scope-ului, până la execuție, raport final și retestare după remediere, ca să nu rămână nimic deschis. Comunică clar cu toată lumea implicată într-un proiect, de la tehnicieni la management, iar calificarea lui de coach se simte în fiecare prezentare de rezultate: tehnic exact, dar pe înțelesul fiecărui public.',
      ],
    },
    {
      id: 'samuel',
      name: 'Samuel Bota',
      photoAlt: 'Samuel Bota, AI & Innovation Specialist',
      initials: 'SB',
      role: 'AI & Innovation Specialist',
      experience: 'Experiență enterprise: Marsh',
      photoPlaceholder: '[[FOTO_SAMUEL]]',
      linkedin: 'https://www.linkedin.com/in/samuel-bota-6b7aa31a9',
      linkedinAriaLabel: 'Profilul de LinkedIn al lui Samuel Bota',
      paragraphs: [
        'Samuel este AI & Innovation Specialist, pasionat de felul în care tehnologiile noi pot rezolva probleme reale. Activitatea lui acoperă cercetarea și dezvoltarea în AI, modelele lingvistice mari, sistemele agentice și soluțiile AI aplicate. Îi place să ducă ideile de la experiment la aplicații care funcționează în realitate, explorând continuu tehnologii și abordări noi. Îl interesează în mod special cum poate AI-ul să întărească securitatea cibernetică, automatizarea și modul în care operează o companie. Samuel aduce în echipă curiozitate, expertiză tehnică și pasiune pentru inovație, și contribuie la transformarea ideilor ambițioase în realitate.',
      ],
    },
    {
      id: 'cristian',
      name: 'Cristian Boanca',
      photoAlt: '',
      initials: 'CB',
      role: 'Full Stack Developer',
      experience: 'Experiență enterprise: Bosch',
      photoPlaceholder: '[[FOTO_CRISTIAN]]',
      linkedin: null,
      linkedinPlaceholder: '[[LINKEDIN_CRISTIAN]]',
      linkedinAriaLabel: 'Profilul de LinkedIn al lui Cristian Boanca',
      paragraphs: [
        'Dezvoltator full stack, în domeniu de trei ani, cu experiență formată într-un mediu industrial de mari dimensiuni. Next.js și React pe partea din față, NestJS și Python pe server, TypeScript și PostgreSQL în rest. Sunt tehnologiile alese deliberat, ca să putem întreține ce construim, nu doar să livrăm.',
        'La BitUp construiește aplicațiile comandate de clienți și integrările care leagă programele pe care aceștia le au deja. Pornește de la cerințe scrise: ce intră, ce iese, cine ce vede, ce se întâmplă la excepții. Abia apoi scrie cod. E motivul pentru care livrările vin fără surprize și pentru care aplicația rămâne explicabilă și peste un an, când cineva întreabă de ce a fost făcută așa.',
      ],
    },
  ],
  closing: {
    eyebrow: 'Ce înseamnă pentru tine',
    h2: 'Patru specializări, un singur punct de contact',
    paragraphs: [
      'Nu ajungi să coordonezi tu patru oameni. Fiecare proiect are un responsabil din partea BitUp, care implică specialistul potrivit atunci când e nevoie și răspunde de rezultatul final. Tu ai un singur număr de telefon, un singur raport lunar și o singură persoană care îți explică ce s-a făcut.',
      'Combinația contează mai mult decât suma: securitatea proiectată de la început, verificată de cineva care sparge sisteme pentru profesie, cu automatizări și aplicații construite de oameni care lucrează pe cerințe scrise. Rareori se găsesc împreună la scara unei companii mijlocii.',
    ],
  },
  cta: {
    title: 'Vrei să vezi ce poate face echipa asta pentru compania ta?',
    text: '30 de minute, gratuit, fără obligații. Îți spunem exact unde stai și cine ar prelua ce.',
    button: 'Programează Radiografia IT',
  },
};
