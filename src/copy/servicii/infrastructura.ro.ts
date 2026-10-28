/** /servicii/infrastructura. Cu secțiunea BitUp Cloud (copy.md: ~6 ani, 99,98 %, Hostero) și link spre /bitup-cloud. */
import type { ServiceCopy } from './types';
import { cta, costFaq } from './comun.ro';

export const infrastructura: ServiceCopy = {
  key: 'infrastructure',
  meta: {
    title: 'Infrastructură IT: Microsoft 365, rețele, servere · BitUp',
    description: 'Microsoft 365, Active Directory hibrid, rețele, servere și BitUp Cloud, cloudul nostru privat, proiectate și administrate de aceeași echipă.',
  },
  hero: {
    label: 'Infrastructură',
    h1: 'Servere, rețele și Microsoft 365 care lucrează împreună',
    lead: 'Proiectăm și punem în ordine Microsoft 365, Active Directory hibrid, rețelele și serverele. Pentru găzduire avem cloudul nostru privat, BitUp Cloud.',
  },
  problem: {
    h2: 'Fiecare piesă a pus-o altcineva',
    paragraphs: [
      'Serverul din birou l-a instalat un furnizor, rețeaua altul, iar Microsoft 365 l-a configurat cineva din firmă, cum a știut. Conturile se fac de mână, în două locuri.',
      'Când pleacă un coleg, nimeni nu știe sigur din ce sisteme trebuie scos.',
    ],
  },
  cost: {
    h2: 'Cât te costă piesele care nu se potrivesc',
    paragraphs: [
      'Fă socoteala pe o săptămână obișnuită: parole resetate, imprimanta care nu se vede în rețea, fișiere căutate în trei locuri. O oră pe zi înseamnă aproximativ 20 de ore pe lună.',
      'Un cont rămas activ după plecarea cuiva e o ușă deschisă spre datele firmei.',
    ],
  },
  wellRun: {
    h2: 'Cum arată o infrastructură pusă în ordine',
    items: [
      { title: 'Un cont pentru fiecare om', text: 'Active Directory hibrid leagă conturile din birou de Microsoft 365. Un cont se creează sau se oprește o singură dată.' },
      { title: 'Microsoft 365 configurat', text: 'Email, fișiere și echipe, cu drepturile puse pe roluri, nu pe persoane.' },
      { title: 'Rețeaua e cunoscută', text: 'Știi ce echipamente sunt în rețea și cine are acces la ce.' },
      { title: 'Fiecare server la locul lui', text: 'Ce trebuie să stea în birou stă în birou. Restul poate sta în BitUp Cloud.' },
      { title: 'Totul e documentat', text: 'Configurările sunt scrise, așa că nu depind de memoria unui singur om.' },
    ],
  },
  extra: {
    id: 'bitup-cloud',
    label: 'BitUp Cloud',
    h2: 'Cloudul nostru privat',
    paragraphs: [
      'BitUp Cloud e cloudul privat pe care îl operăm de aproximativ 6 ani, cu 99,98 % disponibilitate. Pe el rulează și Hostero, platforma publică de găzduire hostero.ro.',
      'Pe BitUp Cloud oferim cloud computing, VPS și VPS administrat, backup și recuperare după dezastru.',
    ],
    stats: [
      { value: '99,98 %', caption: 'Disponibilitate' },
      { value: '6 ani', caption: 'De aproximativ 6 ani operăm cloudul privat BitUp' },
    ],
    link: { label: 'Despre BitUp Cloud', href: '/bitup-cloud' },
  },
  steps: {
    h2: 'Ce facem concret',
    items: [
      { title: 'Facem inventarul', text: 'Conturi, licențe, echipamente, servere și locurile în care stau datele.' },
      { title: 'Proiectăm', text: 'Stabilim ce rămâne, ce se mută în cloud și în ce ordine.' },
      { title: 'Migrăm', text: 'Mutăm conturile, fișierele și serverele pe etape.' },
      { title: 'Documentăm', text: 'Scriem configurările și le predăm. Dacă vrei, le administrăm noi mai departe.' },
    ],
  },
  projects: { h2: 'Proiecte legate' },
  faq: {
    h2: 'Întrebări frecvente',
    items: [
      { q: 'Trebuie să mutăm totul în cloud?', a: 'Nu. Unele servere au sens în birou, altele în cloud. Decidem pentru fiecare în parte, după ce face și după cât costă să ruleze.' },
      { q: 'Lucrați cu Microsoft 365-ul pe care îl avem deja?', a: 'Da. Pornim de la ce ai și configurăm ce lipsește.' },
      { q: 'Ce este BitUp Cloud?', a: 'Cloudul nostru privat, operat de aproximativ 6 ani, cu 99,98 % disponibilitate. Oferim pe el cloud computing, VPS și VPS administrat, backup și recuperare după dezastru.' },
      costFaq('câți oameni, servere și locații are firma'),
    ],
  },
  cta,
};
