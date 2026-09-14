/** Textul paginii /servicii/securitate, copiat exact din spec/continut/04-securitate.md. */

export interface SecurityCopy {
  title: string; description: string; serviceName: string;
  hero: { eyebrow: string; h1: string; lead: string; button: string };
  situation: { eyebrow: string; h2: string; paragraphs: string[] };
  protect: { eyebrow: string; h2: string; cards: { title: string; text: string; anchor?: boolean }[] };
  backup: { eyebrow: string; h2: string; paragraphs: string[]; example: string; caseLink: string };
  audit: { eyebrow: string; h2: string; paragraphs: string[] };
  nis2: { eyebrow: string; h2: string; paragraphs: string[] };
  incidents: { eyebrow: string; h2: string; steps: { title: string; text: string }[]; row: string };
  faq: { h2: string; items: { q: string; a: string }[] };
}

export const securityRo: SecurityCopy = {
  title: 'Securitate IT, backup și continuitate pentru firme · BitUp',
  description: 'Protecție împotriva atacurilor, accese sub control, backup testat, plan de continuitate. NIS2 și ISO 27001 traduse în pași concreți.',
  serviceName: 'Securitate și continuitate',
  hero: {
    eyebrow: 'Securitate și continuitate',
    h1: 'Firmele mici nu sunt atacate pentru că sunt interesante. Sunt atacate pentru că sunt ușoare.',
    lead: 'Atacurile sunt automate: un program scanează internetul și intră unde e mai simplu. Avem grijă să nu fii tu locul simplu și să poți reveni repede dacă totuși se întâmplă ceva.',
    button: 'Radiografie IT gratuită',
  },
  situation: {
    eyebrow: 'De unde pornim',
    h2: '„Suntem prea mici să ne atace cineva”',
    paragraphs: [
      'Auzim asta la fiecare a doua firmă. Și înțelegem de unde vine: în filme, hackerul alege o țintă. În realitate, un program scanează internetul, găsește un server cu o parolă slabă sau un email fără protecție, și intră. Nu contează dacă ai 5 sau 500 de angajați. Contează dacă ușa e deschisă.',
      'Ce vedem cel mai des într-o firmă nouă: aceeași parolă la mai multe conturi, fără autentificare în doi pași; conturi ale unor foști angajați încă active; un singur om cu drepturi de administrator peste tot; actualizări amânate de luni; backup care rulează, dar pe care nu l-a restaurat nimeni; și niciun plan pentru dimineața în care nimic nu mai merge.',
      'Niciuna dintre astea nu cere tehnologie scumpă. Cer pe cineva care să le facă și să le țină făcute.',
    ],
  },
  protect: {
    eyebrow: 'Ce facem',
    h2: 'Șase lucruri, în ordinea în care contează',
    cards: [
      { title: 'Accese și parole', text: 'Autentificare în doi pași pentru toată lumea, manager de parole pentru firmă, drepturi de administrator doar unde e nevoie, conturi închise în ziua în care pleacă cineva.' },
      { title: 'Emailul', text: 'Cel mai folosit drum de intrare. Configurăm protecția împotriva phishing-ului și a emailurilor falsificate (SPF, DKIM, DMARC), filtre, și învățăm oamenii ce să nu deschidă.' },
      { title: 'Stații și servere', text: 'Antivirus sau EDR administrat, cu cineva care se uită la alerte. Actualizări la timp. Hard-disk-uri criptate pe laptopuri. Sistemele vechi izolate, nu lăsate la vedere.' },
      { title: 'Rețea și acces de la distanță', text: 'Firewall configurat corect, Wi-Fi separat pentru vizitatori, VPN pentru cine lucrează de acasă, acces limitat la ce are nevoie fiecare.' },
      { title: 'Backup și continuitate', text: 'Backup local și în alt loc, testat periodic, cu un plan scris pentru cât timp poate sta firma fără sisteme și cum revenim.', anchor: true },
      { title: 'Oameni', text: 'Cele mai multe incidente încep cu un click. O oră pe an cu echipa ta, cu exemple reale.' },
    ],
  },
  backup: {
    eyebrow: 'Backup și continuitate',
    h2: 'Ai backup. Ai și restore?',
    paragraphs: [
      'Backup-ul e bun doar dacă, în dimineața în care serverul nu mai pornește, firma lucrează din nou până la prânz. Și asta știi doar dacă cineva a încercat restaurarea înainte să fie nevoie.',
      'Ce facem: două copii, în două locuri (local, pentru viteză, și în alt datacenter, pentru dezastre), cu retenție care ține și greșelile descoperite după săptămâni. Test de restaurare periodic, cu raport. Și două cifre pe care le scriem în contract: câte date poți pierde în cel mai rău caz (de exemplu, ultimele 4 ore) și în cât timp revine firma (de exemplu, sub o zi lucrătoare).',
      'Planul de continuitate răspunde la întrebările pe care nu vrei să ți le pui într-o dimineață proastă: ce pornim întâi, cine sună pe cine, de unde lucrează oamenii, ce le spunem clienților.',
    ],
    example: 'Exemplu real: pentru Cosmio, o platformă de contabilitate, replicăm serverele în alt datacenter la fiecare 4 ore și testăm recuperarea în fiecare trimestru.',
    caseLink: 'Citește cazul',
  },
  audit: {
    eyebrow: 'Audit de securitate',
    h2: 'Când vrei să știi exact unde stai',
    paragraphs: [
      'Radiografia IT gratuită îți arată, în 30 de minute, culorile: ce e verde, ce e roșu. Auditul de securitate e pasul de după, pentru firmele care vor tot tabloul, cu dovezi.',
      'Verificăm tot: accesele, emailul, stațiile, serverele, rețeaua și backup-ul. Vorbim scurt cu oamenii-cheie. Un raport pe înțelesul patronului, cu prioritățile în ordine: ce am găsit, ce risc înseamnă, ce costă să repari. Apoi îl parcurgem împreună, într-o ședință. Durează între câteva zile și două săptămâni, în funcție de mărime. Îl plătești separat, cu ofertă înainte.',
      'Ce nu include: nu e un test de penetrare cu „hackeri etici” și nu e un certificat. Dacă ai nevoie de ele, îți spunem când și de la cine.',
    ],
  },
  nis2: {
    eyebrow: 'Conformitate',
    h2: 'NIS2 și ISO 27001, fără hârtii de dragul hârtiilor',
    paragraphs: [
      'Două cuvinte pe care le auzim tot mai des de la patroni, de obicei cu îngrijorare. Pe scurt: NIS2 e legea europeană (în România, OUG 155/2024) care obligă firmele din unele domenii, peste o anumită mărime, să aibă măsuri de securitate reale și să raporteze incidentele. ISO 27001 e standardul internațional pentru cum îți organizezi securitatea, pe care îl ceri sau ți-l cere un client mare.',
      'Îți spunem în cuvinte simple dacă te privește și cât de departe ești. Transformăm cerințele în lucruri concrete de făcut, nu în documente de bifat. Facem partea tehnică și scriem documentele care chiar descriu ce faci. Dacă e cazul, te pregătim pentru un audit extern.',
      'De unde știm: experiența de securitate cu care a venit fondatorul, doi ani și jumătate de audituri ISO 27001, interne și externe, într-o corporație din Fortune 500. Am văzut ce cer auditorii și ce nu contează. Aducem la scara ta doar ce contează.',
    ],
  },
  incidents: {
    eyebrow: 'Incidente',
    h2: 'Primele 24 de ore',
    steps: [
      { title: 'Izolăm.', text: 'Oprim răspândirea: deconectăm ce trebuie deconectat, schimbăm parolele critice, blocăm accesele suspecte. În prima oră.' },
      { title: 'Înțelegem.', text: 'Ce s-a întâmplat, de unde a intrat, ce a fost atins. Fără presupuneri, cu loguri.' },
      { title: 'Revenim.', text: 'Din backup curat sau din replica din alt datacenter, în ordinea din planul de continuitate. Întâi ce ține firma în picioare.' },
      { title: 'Închidem ușa.', text: 'Reparăm ce a permis intrarea, documentăm, și dacă legea cere raportare (NIS2, GDPR), o facem la timp și corect.' },
    ],
    row: 'Dacă ai un incident acum și nu ești client, sună. Răspundem, și pentru asta nu trebuie să semnezi nimic înainte.',
  },
  faq: {
    h2: 'Întrebări frecvente',
    items: [
      { q: 'Avem antivirus. Nu e suficient?', a: 'Antivirusul e o parte. Cele mai multe intrări de azi nu trec prin fișiere infectate, ci prin parole furate, emailuri false și conturi neînchise. Antivirusul nu vede niciuna dintre ele.' },
      { q: 'Cât costă securitatea pentru o firmă de 30 de oameni?', a: 'Mai puțin decât crezi, dacă e făcută ca parte din administrare, și mult mai mult dacă e făcută după un incident. Pentru clienții cu abonament de suport, măsurile de bază sunt incluse. Auditul și pregătirea pentru NIS2 sau ISO au ofertă separată.' },
      { q: 'Ne privește NIS2?', a: 'Depinde de domeniu și de mărime. Îți răspundem în cinci minute la radiografie, cu da, nu sau „probabil, din motivul X”. Nu te trimitem să citești legea.' },
      { q: 'Ce faceți cu datele noastre?', a: 'Le administrăm, nu le colecționăm. Accesul e documentat, parolele stau într-un manager de parole, iar când colaborarea se termină, primești tot și accesul se închide. Detaliile sunt în contract, nu pe o pagină de marketing.' },
      { q: 'Poți garanta că nu vom fi atacați?', a: 'Nu. Nimeni nu poate, și cine spune că poate minte. Ce garantăm: că ușile evidente sunt închise, că observăm repede dacă cineva încearcă, și că poți reveni dintr-un backup testat.' },
    ],
  },
};
