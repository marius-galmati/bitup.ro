/** Textul paginii /servicii/suport-it, copiat exact din spec/continut/03-suport-it.md. */

export interface ItSupportCopy {
  title: string; description: string; serviceName: string;
  hero: { eyebrow: string; h1: string; lead: string; button: string; note: string };
  situation: { eyebrow: string; h2: string; paragraphs: string[] };
  included: { h2Section: string; eyebrow: string; h2: string; weTitle: string; we: string[]; youTitle: string; you: string[]; row: string };
  options: { eyebrow: string; h2: string; cards: { title: string; text: string }[] };
  cloud: { h2Section: string; eyebrow: string; h2: string; paragraphs: string[]; example: string; caseLink: string };
  equipment: { h2Section: string; eyebrow: string; h2: string; paragraphs: string[] };
  month: { eyebrow: string; h2: string; p1: string; p2: string; figureCaption: string; p3: string };
  fit: { eyebrow: string; h2: string; yesTitle: string; yes: string[]; noTitle: string; no: string[] };
  faq: { h2: string; items: { q: string; a: string; link?: { label: string; href: string; after?: string } }[] };
}

export const itSupportRo: ItSupportCopy = {
  title: 'Suport și administrare IT în abonament, Cluj · BitUp',
  description: 'Suport IT pentru companii: administrare servere, Microsoft 365, cloud, echipamente, cu securitatea inclusă. Suport pe WhatsApp, raport lunar, un singur responsabil.',
  serviceName: 'Suport și administrare IT',
  hero: {
    eyebrow: 'Suport și administrare IT',
    h1: 'Suport și administrare IT, în abonament lunar',
    lead: 'Tot ce ține de calculatoare, servere, rețea, Microsoft 365 și securitate, administrat de un singur partener care răspunde de rezultat.',
    button: 'Radiografie IT gratuită',
    note: 'Prețul depinde de numărul de stații, servere și de ce preluăm. Îl afli la finalul radiografiei, fără obligații.',
  },
  situation: {
    eyebrow: 'De unde pornim',
    h2: 'Cum arată IT-ul într-o firmă care ne caută',
    paragraphs: [
      'De obicei firma a crescut mai repede decât IT-ul ei. Sunt 20, 40, 60 de oameni. Există un server pe undeva, cumpărat acum câțiva ani. Microsoft 365 e configurat pe jumătate: fiecare și-a făcut contul cum a știut. Parolele sunt într-un Excel sau în capul unui om. Backup-ul rulează, probabil. Nimeni n-a încercat să scoată ceva din el.',
      'Suportul e „băiatul care se pricepe”, cu alt job pe lângă. Sau un furnizor care apare când se strică ceva și facturează ore. Când pică ceva important, patronul sună, așteaptă, sună din nou. Nimeni nu știe câte probleme au fost luna trecută sau cât au costat.',
      'Nu e vina nimănui. Așa crește IT-ul când nu-l administrează cineva. Asta preluăm.',
    ],
  },
  included: {
    h2Section: 'Ce include abonamentul',
    eyebrow: 'Ce include',
    h2: 'Ce faci tu, ce facem noi',
    weTitle: 'Ce preluăm, lună de lună',
    we: [
      'Suport pentru angajați: scriu pe WhatsApp, Cipri răspunde pe loc, ce nu rezolvă el devine tichet. Remote, și la birou când e nevoie.',
      'Administrarea serverelor și a stațiilor: monitorizare, actualizări, antivirus sau EDR administrat, curățenie periodică.',
      'Microsoft 365: conturi, licențe, autentificare în doi pași pentru toată lumea, reguli de email, permisiuni.',
      'Rețea și acces: router, firewall, Wi-Fi, VPN pentru cine lucrează de acasă.',
      'Backup configurat, monitorizat și testat periodic. „Rulează” nu înseamnă nimic până nu scoți ceva din el.',
      'Documentație: ce aveți, unde e, cine are acces. Inventar la zi.',
      'Furnizori: internet, telefonie, licențe. Vorbim noi cu ei, nu tu.',
      'Raport lunar: ce s-a cerut, ce s-a rezolvat, cât a durat, ce urmează.',
    ],
    youTitle: 'Ce rămâne la tine',
    you: [
      'Deciziile: ce cumpărăm, ce schimbăm, când. Recomandăm cu prețul lângă, tu decizi.',
      'Aplicațiile voastre de business (contabilitate, ERP, CRM): le administrează furnizorul lor. Ne asigurăm că au pe ce să ruleze și că sunt în backup.',
      'Un om de contact în firmă, pentru aprobări. Nu trebuie să știe IT.',
    ],
    row: 'Ce nu intră în abonament și se face ca proiect separat, cu ofertă înainte: migrări mari, hardware nou, dezvoltare de software, implementări de la zero. Fără surprize pe factură.',
  },
  options: {
    eyebrow: 'Trei formule',
    h2: 'Nu trebuie să externalizezi tot',
    cards: [
      { title: 'Alături de omul vostru', text: 'Aveți deja pe cineva. El rămâne pe zi cu zi. Preluăm securitatea, backup-ul, Microsoft 365 și lucrurile pe care nu le știe sau nu are timp să le facă. Suntem acolo când el nu e.' },
      { title: 'Parțial', text: 'Doar serverele și Microsoft 365, de exemplu. Sau doar backup-ul și securitatea. Delimităm clar ce e al nostru și ce e al vostru.' },
      { title: 'Complet', text: 'Tot IT-ul, în abonament. Un număr de telefon, un raport lunar, un singur responsabil. E formula pe care o aleg cele mai multe firme după prima lună.' },
    ],
  },
  cloud: {
    h2Section: 'Cloud, hosting și Microsoft 365',
    eyebrow: 'Cloud și Microsoft 365',
    h2: 'Serverul din birou sau în cloud? Depinde, și îți spunem de ce.',
    paragraphs: [
      'Nu împingem pe nimeni în cloud și pe nimeni afară din el. Unii clienți au tot în Microsoft 365 și niciun server în birou, alții au nevoie de un server local pentru o aplicație veche care nu merge altfel. Amândouă sunt corecte, dacă sunt făcute cu cap.',
      'Administrăm Microsoft 365 până la capăt: autentificare în doi pași, reguli împotriva phishing-ului, permisiuni curate. Găzduim aplicații și servere virtuale într-un datacenter din Cluj-Napoca certificat ISO 27001, cu backup și replicare. Migrăm ce trebuie migrat, fără să oprim firma. Îți explicăm diferența de cost pe un an, nu pe o lună.',
    ],
    example: 'Exemplu real: pentru Cosmio, o platformă de contabilitate, găzduim și operăm serverele de producție, cu backup local, replicare în alt datacenter la 4 ore și test de recuperare trimestrial.',
    caseLink: 'Citește cazul',
  },
  equipment: {
    h2Section: 'Echipamente',
    eyebrow: 'Echipamente',
    h2: 'Alegem, cumpărăm, instalăm și răspundem de ele după',
    paragraphs: [
      'Nu suntem magazin. Când firma ta are nevoie de un laptop, un server, un switch sau un firewall, îți spunem ce ar trebui să cumperi și de ce. Îl cumpărăm la prețul furnizorului sau îl cumperi tu, dacă preferi. Ajunge la angajat configurat și trecut în inventar. Când se strică, știm exact ce e, de când și ce garanție are.',
      'Lucrăm cu Fortinet pentru firewall-uri, Synology pentru NAS-uri, Microsoft pentru licențe, și cu ce are sens pentru laptopuri și servere în bugetul tău. Statusurile de partener (Microsoft Partner, Fortinet Partner, Veeam Partner) înseamnă acces la suportul lor direct, nu comision pe spatele tău.',
    ],
  },
  month: {
    eyebrow: 'O lună tipică',
    h2: 'Ce se întâmplă când nu se întâmplă nimic',
    p1: 'Cele mai bune luni sunt cele în care nu ne suni. Asta nu înseamnă că nu s-a lucrat. Într-o lună obișnuită verificăm zilnic că backup-urile au rulat și că nu sunt alerte. Instalăm actualizările în ferestre anunțate: weekend sau seara, niciodată marți la 10. Răspundem la cererile echipei tale pe WhatsApp, cu Cipri în prima linie, și rezolvăm ce apare. La sfârșitul lunii primești raportul.',
    p2: 'Raportul e generat din tichete, nu scris din memorie: ce s-a cerut, cine, când, cât a durat, ce am făcut proactiv, ce recomandăm pentru luna următoare.',
    figureCaption: 'Un raport lunar real, anonimizat.',
    p3: 'Când se întâmplă ceva, incidentele care blochează munca au prioritate și un timp de răspuns pe care îl scriem în contract, nu pe site. Aici spunem atât: prin contract, în program, răspundem în mai puțin de două ore; în practică, media din helpdesk e sub 30 de minute. În afara programului ai un număr pentru urgențe.',
  },
  fit: {
    eyebrow: 'Potrivire',
    h2: 'Ca să nu pierdem timpul amândoi',
    yesTitle: 'E pentru tine dacă',
    yes: [
      'IT-ul a devenit o grijă, nu un avantaj;',
      'vrei un singur responsabil, nu trei furnizori;',
      'accepți un abonament lunar în loc de facturi pe ore, când se strică;',
      'vrei să știi ce se întâmplă, lună de lună, fără să întrebi.',
    ],
    noTitle: 'Nu e pentru tine dacă',
    no: [
      'vrei doar „să vină cineva când se strică”;',
      'cauți cel mai mic preț. Nu suntem cei mai ieftini și nu încercăm să fim.',
    ],
  },
  faq: {
    h2: 'Întrebări frecvente',
    items: [
      { q: 'Avem deja pe cineva. Ce se întâmplă cu el?', a: 'Rămâne, dacă vrei. Formula „alături de omul vostru” e făcută pentru asta: el ține zi de zi, preluăm ce nu știe sau nu are timp să facă, și suntem acolo când lipsește. Am văzut relații din astea funcționând ani de zile.' },
      { q: 'Cât durează preluarea?', a: 'Primele 30 de zile: documentăm tot, schimbăm parolele care trebuie schimbate, punem la punct și testăm backup-ul, rezolvăm urgențele. După 30 de zile ai primul raport lunar și o listă cu ce recomandăm mai departe.' },
      { q: 'Ce se întâmplă dacă renunțăm?', a: 'Primești toată documentația, toate parolele și accesele, într-un format pe care îl poate prelua oricine. Nu ținem nimic ostatic. Contractul are preaviz de o lună.' },
      { q: 'Lucrezi și cu firme din afara Clujului?', a: 'Da. Aproape tot se face remote. Pentru ce trebuie făcut la birou (rețea, echipamente), venim în zona Cluj sau lucrăm cu un tehnician local în restul țării.' },
      { q: 'Cum se facturează?', a: 'Lunar, o sumă fixă stabilită după radiografie, în funcție de stații, servere și ce preluăm. Proiectele separate au ofertă înainte. Fără ore „surpriză”.' },
      { q: 'Ce înseamnă „securitatea inclusă”?', a: 'Că nu vindem securitatea separat de administrare. Autentificarea în doi pași, antivirusul administrat, actualizările, backup-ul testat, accesele curate sunt parte din abonament, nu opțiuni cu plus. Auditul de securitate complet și pregătirea pentru NIS2 sau ISO 27001 sunt proiecte separate.', link: { label: 'Vezi securitatea', href: '/servicii/securitate' } },
    ],
  },
};
