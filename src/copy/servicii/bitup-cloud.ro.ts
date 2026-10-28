/**
 * /bitup-cloud: produsul stratului de infrastructură (brief § 5). Fapte: copy.md (≈6 ani, 99,98 %, Hostero, ofertele).
 * Despre Cosmio: DOAR ce e deja în studiul de caz aprobat (src/content/cases/ro/cosmio.md), cerut de Marius pe 28 octombrie 2026.
 */
import { cta, costFaq } from './comun.ro';

export const bitupCloud = {
  meta: {
    title: 'BitUp Cloud: cloud privat, VPS și backup · BitUp',
    description: 'Cloudul privat BitUp, operat de aproximativ 6 ani cu 99,98 % disponibilitate: cloud computing, VPS, VPS administrat, backup și recuperare după dezastru.',
  },
  hero: {
    label: 'BitUp Cloud',
    h1: 'Cloudul privat BitUp',
    lead: 'Îl operăm de aproximativ 6 ani, cu 99,98 % disponibilitate. Pe el rulează și Hostero, platforma publică de găzduire hostero.ro.',
  },
  stats: [
    { value: '99,98 %', caption: 'Disponibilitate' },
    { value: '6 ani', caption: 'De aproximativ 6 ani operăm cloudul privat BitUp' },
  ],
  offer: {
    h2: 'Ce găsești pe BitUp Cloud',
    items: [
      { title: 'Cloud privat', text: 'Infrastructura firmei, găzduită în cloudul nostru.' },
      { title: 'Cloud computing', text: 'Resurse de calcul pentru aplicațiile și serverele firmei.' },
      { title: 'VPS', text: 'Servere virtuale de care te ocupi tu.' },
      { title: 'VPS administrat', text: 'Servere virtuale de care ne ocupăm noi: actualizări și backup.' },
      { title: 'Backup și recuperare după dezastru', text: 'Copii ale datelor și un plan de repornire, testat.' },
    ],
  },
  /** Din studiul de caz Cosmio (acord scris), fără nimic în plus. */
  cosmio: {
    label: 'Studiu de caz',
    h2: 'Cosmio, pe BitUp Cloud',
    paragraphs: [
      'Cosmio este o platformă de contabilitate automatizată pentru SRL-uri din servicii. Din martie 2026, BitUp găzduiește, protejează și operează infrastructura ei de producție, în abonament lunar, cu obiective de recuperare scrise în contract și testate trimestrial.',
      'Datele stau exclusiv în UE: producția în Cluj-Napoca, recuperarea după dezastru în Germania.',
    ],
    table: {
      caption: 'Obiectivele de recuperare din contractul Cosmio',
      columns: [{ label: 'Obiectiv' }, { label: 'Valoare', numeric: true }],
      rows: [
        ['RPO: pierderea maximă de date admisă, aliniată replicării la 4 ore', '≤ 4 ore'],
        ['RTO tehnic: serverul pornit din replica de recuperare', '≤ 15 min'],
        ['RTO de la un capăt la altul: aplicația funcțională și validată de client', '1–2 ore'],
        ['Teste de recuperare după dezastru, fără oprirea producției, cu raport aprobat de client', '4 / an'],
      ],
    },
    link: 'Citește studiul de caz',
  },
  projects: { h2: 'Construit pe BitUp Cloud' },
  faq: {
    h2: 'Întrebări frecvente',
    items: [
      { q: 'Ce înseamnă 99,98 % disponibilitate?', a: 'Că, în aproximativ 6 ani de funcționare, cloudul a fost disponibil 99,98 % din timp. Pe un an, restul de 0,02 % înseamnă aproximativ o oră și trei sferturi.' },
      { q: 'Care e diferența dintre VPS și VPS administrat?', a: 'La un VPS, de sistem și de aplicații te ocupi tu. La un VPS administrat, de actualizări și de backup ne ocupăm noi.' },
      { q: 'Ce legătură are BitUp Cloud cu Hostero?', a: 'Hostero, platforma publică de găzduire hostero.ro, e construită de BitUp și rulează pe BitUp Cloud.' },
      costFaq('resursele de care ai nevoie și de cât administrare vrei de la noi'),
    ],
  },
  cta,
};
