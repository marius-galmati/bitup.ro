/** Textul paginii /cum-lucram, copiat exact din spec/continut/07-cum-lucram.md. */

export interface HowWeWorkCopy {
  title: string; description: string;
  hero: { eyebrow: string; h1: string; lead: string };
  overview: { eyebrow: string; h2: string; nodes: { title: string; meta: string; text: string }[] };
  step1: { eyebrow: string; h2: string; text: string; link: string };
  step2: { eyebrow: string; h2: string; text: string };
  step3: { eyebrow: string; h2: string; items: { title: string; text: string }[] };
  step4: { eyebrow: string; h2: string; text: string };
  help: { eyebrow: string; h2: string; steps: string[]; row: string; link: string; linkPath: string; imageAlt: string };
  report: { eyebrow: string; h2: string; text: string };
  incidents: { eyebrow: string; h2: string; text: string; link: string };
  billing: { eyebrow: string; h2: string; text: string };
  exit: { eyebrow: string; h2: string; text: string };
  faq: { h2: string; items: { q: string; a: string }[] };
}

export const howWeWorkRo: HowWeWorkCopy = {
  title: 'Cum lucrăm: de la radiografie la raportul lunar · BitUp',
  description: 'Ce se întâmplă concret: radiografia, planul, primele 30 de zile, o lună obișnuită, raportul lunar și ce facem la un incident.',
  hero: {
    eyebrow: 'Cum lucrăm',
    h1: 'Concret, cum o să fie?',
    lead: 'E întrebarea pe care o pune orice patron înainte să semneze și la care puțini furnizori răspund. Uite răspunsul, pas cu pas, de la prima discuție până la ziua în care ne-am putea despărți.',
  },
  overview: {
    eyebrow: 'Pe scurt',
    h2: 'Patru pași. Al patrulea nu se termină.',
    nodes: [
      { title: 'Radiografie', meta: '30 min, gratuit', text: 'Zece verificări. O pagină cu verde, galben, roșu.' },
      { title: 'Plan', meta: '1 săptămână', text: 'Ce facem prima lună, ce așteaptă, ce nu merită. Cu preț.' },
      { title: 'Preluare', meta: 'primele 30 de zile', text: 'Documentăm, securizăm, testăm backup-ul.' },
      { title: 'Lună de lună', meta: 'în continuu', text: 'Monitorizare, suport, actualizări, raport.' },
    ],
  },
  step1: {
    eyebrow: 'Pasul 1',
    h2: 'Radiografia: 30 de minute în care aflăm amândoi cu ce avem de-a face',
    text: 'Nu e o discuție de vânzare. Trecem prin zece puncte: backup, accese, parole, actualizări, antivirus, firewall, email, cine deține ce, ce se întâmplă dacă pleacă omul-cheie, ce obligații ai. Pleci cu o pagină cu semafor și trei recomandări. Dacă vrei să continuăm, ne scrii.',
    link: 'Cum decurge',
  },
  step2: {
    eyebrow: 'Pasul 2',
    h2: 'Planul: ce facem, în ce ordine, cât costă',
    text: 'Într-o săptămână după radiografie primești planul. E scurt: ce facem în prima lună (de obicei lucrurile roșii), ce poate aștepta, ce nu merită făcut deloc și de ce. Fiecare lucru are prețul lângă: ce intră în abonament, ce e proiect separat. Alegem împreună formula (alături de omul vostru, parțial, complet). Semnăm un contract scurt, pe care îl poți citi fără avocat.',
  },
  step3: {
    eyebrow: 'Pasul 3',
    h2: 'Primele 30 de zile: punem ordine',
    items: [
      { title: 'Documentăm tot ce aveți:', text: 'echipamente, conturi, licențe, furnizori, cine are acces la ce. Inventarul devine al vostru.' },
      { title: 'Preluăm accesele:', text: 'schimbăm parolele care trebuie schimbate, închidem conturile vechi, punem autentificare în doi pași unde lipsește, mutăm parolele într-un manager.' },
      { title: 'Punem backup-ul la punct și îl testăm.', text: 'Nu plecăm din luna 1 fără o restaurare reușită.' },
      { title: 'Rezolvăm roșurile din radiografie', text: ', în ordinea din plan.' },
      { title: 'Pornim suportul:', text: 'echipa voastră primește numărul de WhatsApp al lui Cipri și două rânduri despre cum se cere ajutor. Atât cât trebuie să învețe cineva.' },
      { title: 'Primul raport lunar', text: 'la 30 de zile, cu ce am găsit, ce am făcut și ce urmează.' },
    ],
  },
  step4: {
    eyebrow: 'Pasul 4',
    h2: 'O lună obișnuită, în care nu ne suni',
    text: 'Verificăm zilnic backup-urile și alertele, instalăm actualizările în ferestre anunțate. Răspundem cererilor echipei tale și rezolvăm ce apare, mic sau mare. Îți spunem proactiv când vedem ceva ce ar trebui să știi (o licență care expiră, un laptop care dă semne, un cont ciudat). La sfârșitul lunii îți trimitem raportul.',
  },
  help: {
    eyebrow: 'Suport',
    h2: 'Scrii pe WhatsApp. Restul se întâmplă singur.',
    steps: [
      'Un angajat scrie pe WhatsApp, cu cuvintele lui. Fără cont, fără formular.',
      'Cipri, asistentul nostru, recunoaște firma după număr, pune întrebările potrivite, propune pași. Dacă se rezolvă, se închide acolo.',
      'Dacă nu, deschide singur tichetul în BitUp Helpdesk, cu tot contextul și atașamentele. Îl preluăm.',
      'Statusul vine înapoi pe același canal. La sfârșitul lunii, raportul.',
    ],
    row: 'Preferi email? Deschizi tichetul pe helpdesk.bitup.ro și primești statusurile pe email. Același sistem.',
    link: 'Cum l-am construit',
    linkPath: '/blog/cum-ne-am-construit-propriul-helpdesk',
    imageAlt: 'Conversația pe WhatsApp cu Cipri: mesajul „nu mă pot conecta la VPN”, întrebările de clarificare și butoanele de răspuns',
  },
  report: {
    eyebrow: 'Raportul',
    h2: 'Ce primești la sfârșitul lunii',
    text: 'O pagină sau două, generate din tichete, nu scrise din memorie. Acolo scrie câte cereri au fost și de la cine, ce s-a rezolvat și cât a durat. Scrie și ce am făcut fără să ne cheme cineva (actualizări, verificări, curățenie), ce am observat și ce recomandăm pentru luna următoare. Când s-a făcut testul de restaurare a backup-ului, intră și rezultatul lui.',
  },
  incidents: {
    eyebrow: 'Incidente',
    h2: 'Cum tratăm o urgență',
    text: 'Incidentele care blochează munca (nu merge emailul la nimeni, a picat serverul, cineva a dat click unde nu trebuia) au prioritate peste orice altceva și un timp de răspuns scris în contract. În program răspundem în mai puțin de două ore, prin contract; media reală din helpdesk e sub 30 de minute. În afara programului, ai un număr de urgență pentru situațiile care chiar sunt urgențe. Ce facem în primele 24 de ore după un incident de securitate e pe pagina de securitate.',
    link: 'Primele 24 de ore',
  },
  billing: {
    eyebrow: 'Bani',
    h2: 'O sumă fixă pe lună. Proiectele, cu ofertă înainte.',
    text: 'Abonamentul e o sumă fixă lunară, stabilită după radiografie, în funcție de stații, servere și ce preluăm. Nu facturăm ore pentru suportul obișnuit, pentru că asta ar însemna că ne convine să ai probleme. Proiectele separate (migrări, hardware nou, software) au ofertă înainte și se fac doar după acordul tău scris. Factura vine la începutul lunii, cu raportul lunii trecute.',
  },
  exit: {
    eyebrow: 'Ieșirea',
    h2: 'Dacă vrei să pleci, pleci cu tot',
    text: 'Contractul are preaviz de o lună, fără penalități. La încheiere primești toată documentația, inventarul, parolele și accesele într-un format pe care îl poate prelua oricine, și ne închidem accesul în ziua convenită. Nu ținem nimic ostatic.',
  },
  faq: {
    h2: 'Întrebări',
    items: [
      { q: 'Cât durează până văd o diferență?', a: 'La 30 de zile ai primul raport și backup-ul testat. Cele mai multe „roșuri” din radiografie dispar în prima lună. Liniștea vine cam în luna a doua, când oamenii tăi s-au obișnuit să scrie pe WhatsApp în loc să sune.' },
      { q: 'Trebuie să fiu eu, patronul, implicat?', a: 'La radiografie și la plan, da, 30 de minute plus o ședință. După, doar la decizii (ce cumpărăm, ce schimbăm). Restul merge fără tine. Asta e ideea.' },
      { q: 'Câți oameni sunt în spatele BitUp?', a: 'Un nucleu mic și colaboratori pe specialități: tehnicieni locali unde e nevoie de cineva la fața locului în afara Clujului, dezvoltatori pentru partea de software. Întrebarea din spatele întrebării e ce se întâmplă când cineva lipsește. Nimic nu stă în memoria unui om: fiecare client are documentația lui, accesele sunt înregistrate, tichetele și rapoartele sunt în platformă. Dacă mâine vrei să pleci la alt furnizor, primești tot în 30 de zile, scris în contract.' },
    ],
  },
};
