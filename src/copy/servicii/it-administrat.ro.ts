/**
 * /servicii/it-administrat. SINGURA pagină cu garanțiile IT-ului administrat (copy.md § Interzis): răspuns în sub 2 ore
 * prin contract, raport lunar, program 08:00–18:00, timp mediu în helpdesk sub 30 de minute (medie, nu garanție).
 * Acoperire: la sediu în Cluj și Transilvania, de la distanță în toată țara.
 */
import type { ServiceCopy } from './types';
import { cta, costFaq } from './comun.ro';

export const itAdministrat: ServiceCopy = {
  key: 'managedIt',
  meta: {
    title: 'IT administrat și suport, cu un singur responsabil · BitUp',
    description: 'Preluăm întreaga infrastructură a firmei și suportul pentru utilizatori. Răspuns în sub 2 ore prin contract, raport lunar, program 08:00–18:00.',
  },
  hero: {
    label: 'IT administrat și suport',
    h1: 'Un singur partener răspunde de tot IT-ul firmei',
    lead: 'Preluăm întreaga infrastructură a firmei și suportul pentru utilizatori. În locul mai multor furnizori, ai un singur responsabil.',
  },
  problem: {
    h2: 'Fiecare furnizor răspunde de partea lui',
    paragraphs: [
      'Unul se ocupă de imprimante, altul de server, altul de licențe. Când ceva se oprește, primul pas e să afli pe cine suni.',
      'Colegii nu mai raportează problemele mici, pentru că durează prea mult. Le ocolesc, până devin mari.',
    ],
  },
  cost: {
    h2: 'Cât costă problemele mărunte',
    paragraphs: [
      'Socotește timpul: dacă fiecare dintre 20 de colegi pierde un sfert de oră pe zi cu probleme mărunte, sunt 5 ore pe zi, adică aproximativ 100 de ore pe lună.',
      'La asta se adaugă timpul cuiva din firmă care coordonează furnizorii, deși nu asta e treaba lui.',
    ],
  },
  wellRun: {
    h2: 'Cum arată IT-ul administrat bine',
    items: [
      { title: 'Un singur loc de contact', text: 'Orice problemă, de la o parolă la un server, ajunge la aceeași echipă.' },
      { title: 'Suportul e la îndemână', text: 'Colegii scriu în helpdesk sau pe WhatsApp, fără să caute pe cine să sune.' },
      { title: 'Știi ce s-a făcut', text: 'În fiecare lună primești raportul de activitate și de securitate.' },
      { title: 'Securitatea e inclusă', text: 'Administrarea pornește de la fundație: actualizări, backup testat, protecția stațiilor.' },
      { title: 'La sediu, când e nevoie', text: 'Venim la tine în Cluj și în Transilvania. În restul țării lucrăm de la distanță.' },
    ],
  },
  extra: {
    id: 'garantii',
    label: 'În contract',
    h2: 'Ce garantăm prin contract',
    paragraphs: [
      'Timpul de răspuns și programul sunt scrise în contract. Timpul din helpdesk e o medie măsurată, nu o garanție. În fiecare lună primești raportul de activitate și de securitate.',
    ],
    stats: [
      { value: 'sub 2 ore', caption: 'Timpul de răspuns, prin contract' },
      { value: '08:00–18:00', caption: 'Programul, de luni până vineri' },
      { value: 'sub 30 min', caption: 'Timpul mediu de răspuns în helpdesk (o medie, nu o garanție)' },
    ],
  },
  steps: {
    h2: 'Ce facem concret',
    items: [
      { title: 'Preluăm', text: 'Facem inventarul: echipamente, conturi, licențe, furnizori, parole de administrator.' },
      { title: 'Securizăm', text: 'Punem în ordine fundația: actualizări, backup testat, protecția stațiilor.' },
      { title: 'Administrăm', text: 'Ne ocupăm zi de zi de infrastructură și de suportul pentru utilizatori.' },
      { title: 'Raportăm', text: 'În fiecare lună primești raportul de activitate și de securitate.' },
    ],
  },
  projects: { h2: 'Proiecte legate' },
  faq: {
    h2: 'Întrebări frecvente',
    items: [
      { q: 'Cum ne contactează colegii?', a: 'Prin helpdesk.bitup.ro sau pe WhatsApp, la +40 750 263 653.' },
      { q: 'Veniți și la sediu?', a: 'Da, în Cluj și în Transilvania. În restul țării lucrăm de la distanță.' },
      { q: 'Ce înseamnă „sub 2 ore”?', a: 'E timpul de răspuns scris în contract, în programul de lucru, 08:00–18:00, de luni până vineri. Separat, timpul mediu de răspuns în helpdesk e sub 30 de minute; e o medie, nu o garanție.' },
      costFaq('câți oameni, echipamente și locații are firma'),
    ],
  },
  cta,
};
