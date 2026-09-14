/** Textul paginii /suport, copiat exact din spec/continut/10-suport-clienti.md. */

export interface SupportCopy {
  title: string; description: string;
  hero: { eyebrow: string; h1: string; lead: string; whatsapp: string; helpdesk: string };
  ways: { eyebrow: string; h2: string; cards: { title: string; text: string; numberLabel?: string; hours?: string; linkLabel?: string }[] };
  priorities: { eyebrow: string; h2: string; head: string[]; rows: { level: string; examples: string; action: string }[]; row: string };
  after: { h2: string; steps: string[] };
  tips: { eyebrow: string; h2: string; items: { title: string; text: string }[] };
  not: { eyebrow: string; h2: string; text: string };
  notClient: { h2: string; before: string; after: string; link: string };
}

export const supportRo: SupportCopy = {
  title: 'Suport pentru clienți: WhatsApp, helpdesk, urgențe · BitUp',
  description: 'Ești client BitUp și ai o problemă? Scrie-i lui Cipri pe WhatsApp, deschide un tichet pe helpdesk.bitup.ro sau sună la numărul de urgență.',
  hero: {
    eyebrow: 'Suport pentru clienți',
    h1: 'Ai o problemă? Scrie-i lui Cipri.',
    lead: 'Pagina asta e pentru firmele care lucrează deja cu BitUp. Dacă nu ești încă client și vrei să vezi cum arată suportul înainte, ai ajuns totuși unde trebuie: așa arată.',
    whatsapp: 'Scrie-i lui Cipri pe WhatsApp',
    helpdesk: 'Deschide un tichet pe helpdesk.bitup.ro',
  },
  ways: {
    eyebrow: 'Trei căi',
    h2: 'Trei căi, același sistem',
    cards: [
      { title: 'WhatsApp, cu Cipri', text: 'Scrie cu cuvintele tale, ca oricui: „nu-mi merge VPN-ul”, „nu pot deschide fișierul”. Cipri te recunoaște după număr, pune două-trei întrebări, propune pași. Dacă nu se rezolvă, deschide singur tichetul și îl preia un om. Statusul îl primești tot pe WhatsApp.', numberLabel: 'Număr:' },
      { title: 'Formular pe helpdesk.bitup.ro', text: 'Pentru cine preferă să scrie mai mult sau să atașeze mai multe fișiere. Deschizi tichetul, primești confirmarea și statusurile pe email.', linkLabel: 'helpdesk.bitup.ro' },
      { title: 'Telefon, pentru urgențe', text: 'Când nu merge emailul la nimeni, a picat serverul sau ai primit un mesaj de răscumpărare. Nu pentru „nu-mi merge imprimanta”.', numberLabel: 'Număr:', hours: 'Program: luni–vineri, 08:00–18:00; în afara lui, doar pentru urgențe' },
    ],
  },
  priorities: {
    eyebrow: 'Priorități',
    h2: 'Ca să știm amândoi la ce să ne așteptăm',
    head: ['Cât de grav', 'Exemple', 'Ce facem'],
    rows: [
      { level: 'Critic', examples: 'Nu lucrează nimeni: a picat serverul, nu merge emailul la toți, suspiciune de atac, fișiere criptate', action: 'Răspundem imediat, inclusiv în afara programului, la numărul de urgență. Prioritate peste orice.' },
      { level: 'Important', examples: 'O parte din firmă nu poate lucra: un departament fără acces, o aplicație critică jos, un laptop al unui om-cheie', action: 'Răspundem în program, în mai puțin de două ore prin contract (media reală: sub 30 de minute), și rezolvăm în aceeași zi lucrătoare, de obicei.' },
      { level: 'Obișnuit', examples: 'O persoană, o problemă: parolă uitată, imprimantă, un program de instalat, o întrebare', action: 'Cipri răspunde pe loc; ce nu rezolvă el, rezolvăm în ordinea sosirii, în program.' },
    ],
    row: 'Timpii exacți sunt în contractul tău. Ce scrie acolo bate ce scrie aici.',
  },
  after: {
    h2: 'Ce se întâmplă după ce scrii',
    steps: [
      'Scrii pe WhatsApp sau pe helpdesk.',
      'Cipri răspunde pe loc și încearcă să rezolve din pași.',
      'Dacă nu se rezolvă, tichetul e deschis automat și îl preluăm. Primești confirmarea.',
      'Când e rezolvat, primești statusul pe același canal. La sfârșitul lunii, tot ce s-a întâmplat e în raport.',
    ],
  },
  tips: {
    eyebrow: 'Ajută-ne să te ajutăm',
    h2: 'Trei lucruri care scurtează orice tichet',
    items: [
      { title: 'O captură de ecran cu eroarea.', text: 'Valorează mai mult decât trei paragrafe. Cipri o preia direct de pe WhatsApp.' },
      { title: 'Ce făceai când s-a întâmplat.', text: '„Am dat click pe linkul din email” sau „am pornit laptopul dimineață” schimbă complet diagnosticul.' },
      { title: 'Dacă mai are cineva aceeași problemă.', text: 'Unul sau toți? E diferența dintre un laptop și un server.' },
    ],
  },
  not: {
    eyebrow: 'Ca să fie clar',
    h2: 'Ce nu face asistentul',
    text: 'Cipri nu intră în calculatorul tău, nu-ți schimbă parole, nu execută comenzi și nu decide singur că o problemă e închisă dacă tu spui că nu e. E prima linie: ascultă, întreabă, propune, notează. Tot ce nu se rezolvă din pași ajunge la un om, cu numele lui pe tichet. Dacă vrei să sari peste el, scrii „vreau ticket” și ajungi direct la pasul următor.',
  },
  notClient: {
    h2: 'Pentru cine nu e încă client',
    before: 'Nu ești client și ai o problemă acum? Sună la +40 757 150 894. Răspundem, fără să semnezi nimic înainte. Dacă vrei să vezi unde stă firma ta cu IT-ul, începe cu ',
    link: 'Radiografia IT gratuită',
    after: '.',
  },
};
