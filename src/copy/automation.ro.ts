/** Textul paginii /servicii/automatizari, copiat exact din spec/continut/05-automatizari.md. */

export interface AutomationCopy {
  title: string; description: string; serviceName: string;
  hero: { eyebrow: string; h1: string; lead: string; button: string };
  situation: { eyebrow: string; h2: string; items: string[]; text: string };
  how: { eyebrow: string; h2: string; steps: { title: string; text: string }[] };
  build: { eyebrow: string; h2: string; cards: { title: string; text: string; anchor?: boolean }[] };
  proof: { eyebrow: string; h2: string; p1: string; p2: string; link: string; linkPath: string; imageAlt: string };
  software: { eyebrow: string; h2: string; p1: string; p2: string; caseLink: string; p3: string; p4: string };
  honest: { eyebrow: string; h2: string; items: { title: string; text: string }[] };
  faq: { h2: string; items: { q: string; a: string }[] };
  cta: { title: string; text: string; button: string };
}

export const automationRo: AutomationCopy = {
  title: 'Automatizări, AI și software la comandă pentru firme · BitUp',
  description: 'Automatizări între aplicațiile pe care le ai, asistenți AI cu scop clar, aplicații făcute pentru firma ta. Pornim de la proces, nu de la tehnologie.',
  serviceName: 'Automatizări și software',
  hero: {
    eyebrow: 'Automatizări și software',
    h1: 'Ce se repetă în firma ta ar trebui să facă un sistem, nu un om',
    lead: 'Aceleași date introduse în trei programe. Aprobări urmărite pe email și rapoarte făcute din fișiere separate, luni de luni. Pornim de la procesul care vă mănâncă timp și vedem ce merită automatizat, ce merită integrat și ce merită construit.',
    button: 'Radiografie IT gratuită',
  },
  situation: {
    eyebrow: 'De unde pornim',
    h2: 'Semnele că un proces a crescut mai mult decât Excelul lui',
    items: [
      'Cineva copiază date dintr-un program în altul, de mână, în fiecare zi.',
      'Un document trece prin trei aprobări, pe email, și nimeni nu știe unde e acum.',
      'Raportul de luni dimineață se face din patru fișiere, de o persoană care știe „cum se face”.',
      'Un program cumpărat acum câțiva ani nu mai acoperă cum lucrează firma, și oamenii au făcut ocolișuri.',
      'Clienții întreabă același lucru pe telefon, de zece ori pe zi, și răspunde același om.',
    ],
    text: 'Niciunul dintre astea nu e o problemă de tehnologie. E un proces care a rămas în capul unui om. Când omul e în concediu, procesul se oprește. Asta rezolvăm.',
  },
  how: {
    eyebrow: 'Cum lucrăm',
    h2: 'Întâi procesul, apoi tehnologia',
    steps: [
      { title: 'Ne uităm la cum lucrează echipa.', text: 'Nu la ce program vrea cineva să cumpere. Ce intră, ce iese, unde se blochează, cine ia decizia.' },
      { title: 'Alegem cea mai mică soluție care rezolvă problema.', text: 'De multe ori e o automatizare între două aplicații pe care le ai deja. Uneori e un asistent AI. Rar e o aplicație nouă. Ordinea asta e deliberată.' },
      { title: 'Construim și testăm cu oamenii care o vor folosi.', text: 'Nu cu managerul. Cu contabila, cu omul de la recepție, cu tehnicianul.' },
      { title: 'Măsurăm același lucru înainte și după.', text: 'Ore pe săptămână, pași de mână, erori. Dacă nu s-a schimbat, n-am terminat.' },
    ],
  },
  build: {
    eyebrow: 'Ce construim',
    h2: 'Trei feluri de lucruri',
    cards: [
      { title: 'Automatizări între aplicațiile pe care le ai', text: 'Facturile intră singure în contabilitate. Comanda din magazinul online ajunge în depozit fără email. Un formular completat de client deschide o sarcină cuiva. Folosim API-urile aplicațiilor voastre și, când trebuie, cod. Fiecare automatizare are un om care primește alertă dacă ceva pică.' },
      { title: 'Asistenți AI cu scop clar', text: 'Un asistent care răspunde pe WhatsApp la întrebările frecvente ale clienților și deschide tichet când nu știe. Unul care citește emailurile de comandă și le pune în tabel. Unul care scrie prima versiune a unui răspuns, pe care omul o verifică. Nu „AI în firmă”; un asistent, o treabă, un om responsabil.' },
      { title: 'Software la comandă', text: 'Când nu există nimic potrivit sau când ce există costă mai mult decât face, construim o aplicație pentru voi. Doar dacă putem asigura și mentenanța ei după.', anchor: true },
    ],
  },
  proof: {
    eyebrow: 'Dovada',
    h2: 'Cipri, asistentul nostru de suport',
    p1: 'Înainte să propunem cuiva un asistent AI, am construit unul pentru noi. Cipri stă pe numărul de WhatsApp de suport al BitUp. Recunoaște firma după numărul de telefon, pune întrebările potrivite, propune pași, preia capturi de ecran. Când nu poate rezolva singur, deschide tichetul în BitUp Helpdesk și îl dă unui om. Îl folosesc clienții noștri zilnic.',
    p2: 'Nu spunem asta ca să vindem AI, ci ca să știi că, când îți propunem ceva, l-am rulat în producție înainte.',
    link: 'Cum l-am construit și ce am învățat',
    linkPath: '/blog/cum-ne-am-construit-propriul-helpdesk',
    imageAlt: 'Conversația pe WhatsApp cu Cipri: mesajul „nu mă pot conecta la VPN”, întrebările de clarificare și butoanele de răspuns',
  },
  software: {
    eyebrow: 'Software la comandă',
    h2: 'ProQ: un produs întreg, pornit de la o nevoie dintr-o fabrică',
    p1: 'Cel mai mare lucru pe care l-am construit e ProQ, o platformă pentru furnizorii din industria auto care trebuie să dovedească clienților că procesul lor e sub control: planificare, analiză de riscuri, plan de control, dosar de omologare. 29 de module, găzduite în cloud-ul nostru privat, în UE.',
    p2: 'Chiar dacă nu ești din auto, ProQ e dovada că putem duce un software de la o idee dintr-o fabrică la un produs întreținut de ani de zile. La fel lucrăm și la o aplicație internă de 5 utilizatori.',
    caseLink: 'Citește cazul ProQ',
    p3: 'Ce construim de obicei: aplicații interne (evidențe, aprobări, planificări) care înlocuiesc Excel-uri împărțite pe email; portaluri pentru clienți sau furnizori; integrări între sistemele pe care le ai. Web, cu bază de date PostgreSQL, găzduit de noi sau la tine, cu backup și actualizări incluse în mentenanță.',
    p4: 'Ce nu construim: aplicații mobile native, site-uri de prezentare, magazine online. Există oameni mai buni la asta și îți spunem cine.',
  },
  honest: {
    eyebrow: 'Onest',
    h2: 'Trei lucruri pe care le spunem la prima discuție',
    items: [
      { title: 'Nu orice proces are nevoie de AI.', text: 'De cele mai multe ori, o automatizare simplă face mai mult, mai ieftin și fără surprize. Îți spunem când AI-ul e răspunsul și când e doar la modă.' },
      { title: 'Nu promitem economii pe care nu le-am măsurat.', text: 'Măsurăm împreună înainte și după. Dacă nu se vede, n-a meritat.' },
      { title: 'Nu construim ce nu putem întreține.', text: 'Orice aplicație vine cu răspunsul la «și când se strică, cine o repară?». Răspunsul e scris în contract.' },
    ],
  },
  faq: {
    h2: 'Întrebări frecvente',
    items: [
      { q: 'Cât costă o automatizare?', a: 'De la câteva ore de lucru, pentru o legătură între două aplicații care au API, până la săptămâni, pentru un flux complicat cu excepții multe. Îți spunem după ce vedem procesul, nu înainte. Prima discuție e gratuită și nu ai nevoie de nicio specificație.' },
      { q: 'Trebuie să schimbăm programele pe care le avem?', a: 'De obicei nu. Cele mai bune automatizări leagă ce ai deja. Schimbăm ceva doar când programul vechi e chiar piedica.' },
      { q: 'Datele noastre ajung la vreun AI din afară?', a: 'Depinde de ce construim și îți spunem exact. Pentru asistenții AI folosim modele comerciale (cum e ChatGPT) prin API, cu date minime, sau modele rulate la noi, când datele sunt sensibile. Decidem împreună înainte, în scris.' },
      { q: 'Cine întreține ce ați construit?', a: 'Noi, prin contract de mentenanță, cu același helpdesk ca pentru restul IT-ului. Codul e al vostru; documentația și accesul le primiți de la început.' },
      { q: 'Puteți prelua ceva construit de altcineva?', a: 'Uneori. Ne uităm la cod și îți spunem sincer dacă merită întreținut sau rescris. Nu preluăm ce nu înțelegem.' },
    ],
  },
  cta: {
    title: 'Ai un proces care trăiește în Excel și în emailuri?',
    text: 'Spune-ne ce se repetă și unde se pierd lucrurile. În 30 de minute vedem dacă merită automatizat și cum.',
    button: 'Programează Radiografia IT',
  },
};
