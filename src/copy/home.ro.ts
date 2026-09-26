/**
 * Textul homepage-ului, copiat exact din spec/continut/01-acasa.md. Nu se rescrie aici; se schimbă în spec.
 * Scurtat pe 27 septembrie 2026, la cererea lui Marius: stilul nou cere o idee pe ecran, iar textul fusese
 * scris pentru stilul vechi, dens. Înțelesul fiecărei secțiuni a rămas; au ieșit reluările și precizările
 * care se repetau pe paginile de serviciu. Vezi NOTES.md § Scurtarea homepage-ului.
 */
import type { HomeCopy } from './home.types';

export const homeRo: HomeCopy = {
  title: 'Suport IT și securitate pentru firme din Cluj · BitUp',
  description: 'Proiectăm, securizăm și administrăm infrastructura IT a firmei tale: servere, rețea, cloud, aplicații și automatizări. Radiografie IT gratuită.',

  hero: {
    // Text schimbat de Marius pe 17 septembrie 2026, scurtat pe 27: la --fs-hero (56–112 px) titlul vechi
    // de 14 cuvinte ocupa jumătate de ecran. Cele trei verbe ale lui rămân.
    h1: 'Proiectăm, securizăm și administrăm tot IT-ul firmei tale.',
    lead: 'De la servere și rețea până la aplicații, automatizări și agenți AI. Securitatea intră din prima zi, nu la final.',
    primary: 'Radiografie IT gratuită',
    secondary: 'Explorează serviciile',
  },

  situation: {
    eyebrow: 'De unde pornim de obicei',
    h2: 'Trei propoziții pe care le auzim în aproape fiecare firmă nouă',
    cards: [
      { quote: '„Avem un băiat care se pricepe. Dar când e în concediu, nu știe nimeni parolele.”', text: 'Tot IT-ul stă într-un singur om.' },
      { quote: '„Avem trei furnizori. Când pică ceva, fiecare zice că e la celălalt.”', text: 'Nimeni nu răspunde de ansamblu.' },
      { quote: '„Avem backup. Cred. Nu l-a testat nimeni.”', text: 'Un backup netestat nu e backup.' },
    ],
    closing: 'Te-ai regăsit? Radiografia IT durează 30 de minute.',
    closingLink: 'Cum decurge',
  },

  services: {
    eyebrow: 'Servicii',
    h2: 'Trei lucruri, făcute până la capăt',
    cards: [
      { title: 'Suport și administrare IT', text: 'Calculatoare, servere, rețea, cloud și Microsoft 365, în abonament lunar. Raport la sfârșitul fiecărei luni.', link: 'Vezi ce include abonamentul', route: 'itSupport' },
      { title: 'Securitate și continuitate', text: 'Protecție, accese controlate și backup testat. NIS2 și ISO 27001, traduse în pași concreți.', link: 'Vezi ce protejăm și cum', route: 'security' },
      { title: 'Automatizări și software', text: 'Mutăm procesele din Excel și emailuri într-un sistem. Pornim de la proces, nu de la tehnologie.', link: 'Vezi exemple reale', route: 'automation' },
    ],
  },

  how: {
    eyebrow: 'Cum lucrăm',
    h2: 'Patru pași. Al patrulea nu se termină.',
    steps: [
      { title: 'Radiografie.', text: 'Treizeci de minute, gratuit. Zece verificări și o pagină de concluzii.' },
      { title: 'Plan.', text: 'Ce facem în prima lună, ce poate aștepta, cu prețul lângă.' },
      { title: 'Preluare.', text: 'Documentăm tot, schimbăm parolele, punem backup-ul la punct și îl testăm.' },
      { title: 'Lună de lună.', text: 'Monitorizare, suport pe WhatsApp, raport lunar. Știi ce se întâmplă fără să întrebi.' },
    ],
    link: 'Tot procesul, etapă cu etapă',
  },

  why: {
    eyebrow: 'Ce e diferit',
    h2: 'Ce primești când răspunde un singur partener de tot',
    items: [
      { title: 'Un număr de telefon, nu trei furnizori.', text: 'Suni și se rezolvă.' },
      { title: 'Securitatea e făcută, nu vândută separat.', text: 'Nu funcționează altfel.' },
      { title: 'Vezi tot, fără să întrebi.', text: 'Fiecare cerere intră într-un tichet pe care îl vezi.' },
      { title: 'Raport lunar din fapte, nu din memorie.', text: 'Știi exact pentru ce plătești.' },
      { title: 'Experiență de la scară mare, la scara ta.', text: 'Fortune 500, fără complexitatea inutilă.' },
    ],
  },

  support: {
    eyebrow: 'Suport',
    h2: 'Scrii pe WhatsApp. Primești răspuns pe loc. Nimic nu se pierde.',
    text: 'Echipa ta scrie pe WhatsApp, ca oricui. Cipri preia problema și o rezolvă pe loc, la orice oră. Ce nu poate el devine tichet și îl preia un om.',
    text2: 'Sistemul e construit de noi.',
    link: 'Cum l-am construit',
    linkPath: '/blog/cum-ne-am-construit-propriul-helpdesk',
    imageAlt: 'Conversația pe WhatsApp cu Cipri: mesajul „nu mă pot conecta la VPN”, întrebările de clarificare și butoanele de răspuns',
  },

  founder: {
    eyebrow: 'Cine răspunde',
    h2: 'Marius Galmati, fondator BitUp',
    // Rămâne la persoana I: e declarația semnată a fondatorului (CLAUDE.md § Voce).
    text: 'Lucrez în IT din 2017, ultimii doi ani și jumătate în securitate informațională, într-o corporație din Fortune 500. Am făcut BitUp pentru că văzusem prea multe firme cu tehnologie, dar fără cineva care să răspundă de ea.',
    storyLink: 'Povestea, pe scurt',
    teamLink: 'Echipa',
    linkedinLabel: 'LinkedIn',
    portraitAlt: 'Marius Galmati, fondatorul BitUp',
  },

  results: {
    eyebrow: 'Rezultate',
    h2: 'Ce am făcut, cu nume',
    readCase: 'Citește cazul',
    nextCase: 'Următorul caz, în curând, cu acordul clientului.',
  },

  partners: {
    eyebrow: 'Parteneri',
    h2: 'Cu ce lucrăm',
    names: ['Microsoft Partner', 'Fortinet Advocate', 'Veeam Partner', 'Anthropic Partner'],
  },

  tech: {
    eyebrow: 'Tehnologii',
    h2: 'Tehnologii cu care lucrăm zilnic',
    list: 'Microsoft 365, Fortinet, Veeam, CrowdStrike, Palo Alto Networks, WireGuard, Proxmox / VMware, Synology.',
  },

  blog: {
    eyebrow: 'Din interior',
    h2: 'Cum lucrăm, scris de noi',
  },

  faq: {
    eyebrow: 'Întrebări',
    h2: 'Ce ne întreabă un patron înainte să scrie',
    items: [
      { q: 'Putem externaliza doar o parte din IT?', a: 'Da. Alături de omul vostru intern, parțial sau complet. Alegem la radiografie, după ce vedem ce aveți.' },
      { q: 'Trebuie să schimbăm tot ce avem?', a: 'Nu. Pornim de la ce funcționează. Schimbăm doar ce e riscant sau ce costă mai mult decât face.' },
      { q: 'Cât costă?', a: 'Depinde de câte stații și servere aveți și de ce preluăm. Prețul îl afli la finalul radiografiei. Pe site ar fi fals pentru jumătate din firme.' },
      { q: 'Putem începe cu o problemă punctuală?', a: 'Da. O migrare, un backup pus la punct, un audit — e o intrare bună. Vedem după dacă are sens un abonament.' },
    ],
  },
};
