/** Textul paginii /radiografie-it, copiat exact din spec/continut/06-radiografie-it.md. */
import type { FormLabels } from '../components/Form.astro';

export interface HealthCheckCopy {
  title: string; description: string;
  hero: { eyebrow: string; h1: string; lead: string; jumpToForm: string };
  checks: { eyebrow: string; h2: string; items: { title: string; text: string }[] };
  how: { eyebrow: string; h2: string; steps: { title: string; text: string }[]; capacity: string };
  get: { eyebrow: string; h2: string; p1: string; p2: string; figureCaption: string };
  form: FormLabels;
  who: { eyebrow: string; h2: string; text: string; link: string; portraitAlt: string };
  faq: { h2: string; items: { q: string; a: string; link?: { label: string; href: string; after?: string } }[] };
}

export const healthCheckRo: HealthCheckCopy = {
  title: 'Radiografie IT gratuită, 30 de minute · BitUp',
  description: '30 de minute, remote, 10 verificări. Pleci cu o pagină: ce e bine, ce e urgent, ce ar costa. Fără obligații.',
  hero: {
    eyebrow: 'Radiografie IT gratuită',
    h1: 'În 30 de minute afli unde stă firma ta cu backup-ul, securitatea și accesele',
    lead: 'Remote, cu tine sau cu omul tău de IT. La final primești o pagină cu ce e în regulă, ce e urgent și ce ar costa să rezolvi. Fără obligații și fără prezentare de vânzare.',
    jumpToForm: 'Sari la formular',
  },
  checks: {
    eyebrow: 'Ce verificăm',
    h2: 'Zece întrebări la care ar trebui să știi răspunsul',
    items: [
      { title: 'Backup-ul există și l-a restaurat cineva vreodată?', text: 'Nu „rulează”, ci „am scos ceva din el luna asta”.' },
      { title: 'Cine are drepturi de administrator și de ce?', text: 'De obicei prea mulți, și cel puțin unul care nu mai lucrează la voi.' },
      { title: 'Parolele și autentificarea în doi pași.', text: 'Pe Microsoft 365 sau Google, pe bancă, pe tot ce contează.' },
      { title: 'Actualizările pe servere și stații.', text: 'Când s-au făcut ultima dată și cine se uită.' },
      { title: 'Antivirus sau EDR, și cine se uită la alerte.', text: 'Un antivirus la care nu se uită nimeni e o iconiță.' },
      { title: 'Firewall-ul și accesul de la distanță.', text: 'Ce e deschis spre internet și de ce.' },
      { title: 'Emailul poate fi falsificat?', text: 'SPF, DKIM, DMARC: dacă lipsesc, cineva poate trimite emailuri „de la tine”.' },
      { title: 'Cine deține domeniul, hostingul și licențele?', text: 'Pe ce cont, cu ce card, cu ce email. Am văzut firme care și-au pierdut domeniul.' },
      { title: 'Ce se întâmplă când pleacă omul care știe parolele?', text: 'Dacă răspunsul e „nu știu”, e cel mai urgent punct din listă.' },
      { title: 'Ce obligații are firma (NIS2, GDPR) și cât de departe e de ele.', text: 'Da, nu, sau „probabil, din motivul X”.' },
    ],
  },
  how: {
    eyebrow: 'Cum decurge',
    h2: 'Trei pași, niciunul nu cere să instalezi ceva',
    steps: [
      { title: 'Completezi formularul.', text: 'Două minute. Te sunăm în maximum o zi lucrătoare și stabilim un slot de 30 de minute.' },
      { title: 'Vorbim 30 de minute, pe video.', text: 'Tu sau omul vostru de IT. Trecem prin cele 10 puncte. Ne arăți ce ai, întrebăm, notăm. Nu ne conectăm la nimic, nu instalăm nimic.' },
      { title: 'Primești pagina în aceeași zi.', text: 'Semafor pe cele 10 puncte, trei recomandări în ordinea urgenței și o estimare de cost, dacă vrei să mergi mai departe. Cu noi sau cu altcineva.' },
    ],
    capacity: '[[CAPACITATE_RADIOGRAFII]]',
  },
  get: {
    eyebrow: 'Ce primești',
    h2: 'O pagină, nu un raport de 40',
    p1: 'O singură pagină, pe care o poți citi în două minute și o poți da mai departe omului tău de IT sau asociatului. Pe ea: cele 10 puncte cu verde, galben sau roșu și o propoziție la fiecare; cele trei lucruri pe care le-am face primele, cu motivul; și, dacă ceri, ce ar costa să le rezolvăm, în abonament sau ca proiect.',
    p2: 'Ce nu primești: o prezentare de vânzare, un telefon de urmărire la trei zile, sau un email săptămânal. Dacă vrei să continuăm, ne scrii tu.',
    figureCaption: 'Exemplu de raport. Culorile sunt ale firmei din exemplu, nu ale tale.',
  },
  form: {
    title: 'Programează radiografia',
    intro: 'Două minute. Te sunăm.',
    name: 'Numele tău', company: 'Firma', employees: 'Câți angajați sunteți', employeesOptions: ['sub 10', '10–30', '30–100', 'peste 100'],
    phone: 'Telefon', email: 'Email',
    message: 'Ce te îngrijorează cel mai tare la IT-ul vostru? (opțional)', messagePlaceholder: 'De exemplu: nu știu dacă backup-ul merge',
    button: 'Trimite și te sunăm',
  },
  who: {
    eyebrow: 'Cine',
    h2: 'Cine face radiografia',
    text: 'Marius Galmati, fondator BitUp. Lucrez în IT din 2017, ultimii doi ani și jumătate în securitate informațională, într-o corporație din Fortune 500, la audituri ISO 27001 și planuri de continuitate. Radiografia o fac eu, nu un formular automat: în 30 de minute văd lucruri pe care un formular nu le vede.',
    link: 'Despre mine',
    portraitAlt: 'Marius Galmati, fondatorul BitUp',
  },
  faq: {
    h2: 'Întrebări',
    items: [
      { q: 'Chiar e gratuit? Care e prinderea?', a: 'Da, gratuit. Prinderea, dacă vrei s-o numești așa: o parte din firmele care fac radiografia devin clienți, pentru că văd cum lucrăm. Restul pleacă cu o pagină utilă. Amândouă variantele sunt în regulă pentru noi.' },
      { q: 'Trebuie să instalez ceva sau să-ți dau parole?', a: 'Nu. Nu ne conectăm la nimic, nu instalăm nimic, nu ne dai nicio parolă. Ne arăți pe ecran ce ai și răspunzi la întrebări.' },
      { q: 'Ce se întâmplă cu ce ne spui?', a: 'Rămâne între noi. Notițele stau în sistemul nostru, nu le dăm nimănui; dacă nu continuăm, le ștergem la cerere. Detalii în', link: { label: 'Politica de confidențialitate', href: '/confidentialitate', after: '.' } },
      { q: 'Dacă nu vreau să continui după?', a: 'Nu se întâmplă nimic. Nu te sunăm, nu trimitem oferte. Ai pagina, faci ce vrei cu ea.' },
      { q: 'Poate participa omul nostru de IT?', a: 'Da, chiar recomandăm. Nu e un test pentru el; de multe ori el știe deja problemele și n-a avut cine să-l asculte.' },
    ],
  },
};
