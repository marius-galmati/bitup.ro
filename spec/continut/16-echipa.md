# 16 — Echipa (`/echipa`)

**Title:** Echipa BitUp Technology · BitUp
**Description:** Oamenii din spatele BitUp: securitate informațională, securitate ofensivă și Red Team, inteligență artificială și automatizări, dezvoltare software. Experiență formată în Bosch, NTT DATA, Marsh și Concentrix.

**JSON-LD:** global + `ProfilePage`. Câte un nod `Person` pentru fiecare dintre cei patru: `name`, `jobTitle`, `sameAs` (LinkedIn). Doar nodul lui Marius Galmati primește `worksFor` → `Organization` BitUp Technology SRL, cu `jobTitle: "Fondator"`. Pentru ceilalți trei NU pui `worksFor`, `memberOf` sau `affiliation` până nu completez `[[RELATIE_ECHIPA]]`; relația lor cu firma nu e încă stabilită în text și nu o declarăm în date structurate înaintea textului. Numele companiilor din rândul de experiență NU intră în JSON-LD sub nicio formă.

**Indexare:** pagina primește `noindex, nofollow` și e exclusă din `sitemap.xml` cât timp `[[ACORD_ECHIPA]]` e necompletat. Când îl completez, scoți `noindex` și o reintroduci în sitemap. Linkul din `/despre` și cel din footer funcționează în ambele situații.

---

## Hero (intern, tipografic, o singură coloană, fără imagine)

Eyebrow: `Echipa`
**H1:** Oamenii din spatele BitUp.
Lead: Patru specializări care se completează: securitate informațională și infrastructură, securitate ofensivă, inteligență artificială și automatizări, dezvoltare software. Experiența fiecăruia s-a format în companii internaționale — Bosch, NTT DATA, Marsh, Concentrix.

---

## Intro

Text (Prose, 70ch, imediat sub hero, fără eyebrow și fără H2):

BitUp funcționează cu un nucleu permanent și cu specialiști dedicați pe zonele unde nu improvizăm. Fiecare problemă ajunge la omul care a mai întâlnit-o, nu la primul disponibil. [[RELATIE_ECHIPA]]

---

## Oamenii

Patru rânduri, în ordinea de mai jos. Sub textul fiecăruia stă marca „in” a LinkedIn (`public/icons/linkedin.svg`), fără cuvinte lângă ea; cine n-are încă link vede placeholder-ul.

### Marius Galmati
Rol (mono): `Fondator`
Experiență (mono, `--muted`): `Experiență enterprise: Concentrix (Fortune 500)`
Fotografie: `src/assets/foto-echipa/marius-galmati-960x960.jpg` (primită 19 septembrie 2026)
LinkedIn: https://www.linkedin.com/in/nicolae-marius-galmati

Peste zece ani în IT, de la companii locale până la mediul enterprise, într-o corporație americană din Fortune 500. În toate a regăsit aceeași problemă: organizații cu tehnologie cumpărată corect, dar fără structură în spatele ei. Fără proceduri scrise, fără procese care să se repete identic, fără nimeni responsabil de imaginea de ansamblu, iar securitatea amânată pentru „după”.

A parcurs administrarea de sisteme, infrastructura și suportul pe SLA, apoi a intrat în securitate informațională și acolo a rămas. A făcut parte din echipa care a pregătit auditul ISO 27001: a scris documentația și procedurile, a implementat controale și procese, a acoperit planurile de continuitate și protecția stațiilor și a serverelor. Acolo a văzut că ordinea se poate construi, se poate scrie și se poate dovedi.

A fondat BitUp în 2020, ca să aducă ordinea aceea la scara companiilor românești, fără aparatul unei corporații. Obiectivul lui acum: companiile din România să ajungă la standardele de securitate cerute de partenerii și clienții lor din afară, cu procese, proceduri și digitalizare puse în ordinea care are sens pentru business, nu pentru bifat.

### Petre Radu Cătălin
Rol (mono): `Red Team & Securitate ofensivă`
Experiență (mono, `--muted`): `Experiență enterprise: NTT DATA`
Fotografie: `src/assets/foto-echipa/petre-radu-catalin-400x400.jpg` (primită 19 septembrie 2026; sursa e 400×400, sub minimul de 480×480)
LinkedIn: https://www.linkedin.com/in/petreradu

Petre este penetration tester în cadrul NTT DATA, cu activitate în zona de securitate ofensivă. Experiența lui acoperă testarea de penetrare a aplicațiilor web și a API-urilor, a infrastructurilor de rețea și a mediilor cloud, cu un focus deosebit pe abuzurile de tip IAM și pe căile de escaladare a privilegiilor, exact zonele unde atacatorii reali lovesc primii.

A lucrat într-un mediu enterprise, pentru clienți de dimensiuni foarte mari, și știe ce înseamnă un test de penetrare făcut corect: nu doar findings, ci risc real pentru business. Pe partea de Red Team, abordează fiecare simulare ca pe o campanie reală, de la recon și prima vulnerabilitate exploatată, până la compromiterea domeniului și raportul care explică pe înțelesul tuturor cum s-a întâmplat.

Ce îl recomandă în proiectele cu clienți este că acoperă integral ciclul unui engagement: de la prima discuție și definirea scope-ului, până la execuție, raport final și retestare după remediere, ca să nu rămână nimic deschis. Comunică clar cu toată lumea implicată într-un proiect, de la tehnicieni la management, iar calificarea lui de coach se simte în fiecare prezentare de rezultate: tehnic exact, dar pe înțelesul fiecărui public.

### Samuel Bota
Rol (mono): `AI & Innovation Specialist`
Experiență (mono, `--muted`): `Experiență enterprise: Marsh`
Fotografie: `src/assets/foto-echipa/samuel-bota-960x960.jpg` (primită 19 septembrie 2026)
LinkedIn: https://www.linkedin.com/in/samuel-bota-6b7aa31a9

Samuel este AI & Innovation Specialist, pasionat de felul în care tehnologiile noi pot rezolva probleme reale. Activitatea lui acoperă cercetarea și dezvoltarea în AI, modelele lingvistice mari, sistemele agentice și soluțiile AI aplicate. Îi place să ducă ideile de la experiment la aplicații care funcționează în realitate, explorând continuu tehnologii și abordări noi. Îl interesează în mod special cum poate AI-ul să întărească securitatea cibernetică, automatizarea și modul în care operează o companie. Samuel aduce în echipă curiozitate, expertiză tehnică și pasiune pentru inovație, și contribuie la transformarea ideilor ambițioase în realitate.

### Cristian Boanca
Rol (mono): `Full Stack Developer`
Experiență (mono, `--muted`): `Experiență enterprise: Bosch`
Fotografie: `src/assets/foto-echipa/cristian-boanca-960x960.jpg` (primită 16 octombrie 2026)
LinkedIn: `[[LINKEDIN_CRISTIAN]]`

Dezvoltator full stack, în domeniu de trei ani, cu experiență formată într-un mediu industrial de mari dimensiuni. Next.js și React pe partea din față, NestJS și Python pe server, TypeScript și PostgreSQL în rest. Sunt tehnologiile alese deliberat, ca să putem întreține ce construim, nu doar să livrăm.

La BitUp construiește aplicațiile comandate de clienți și integrările care leagă programele pe care aceștia le au deja. Pornește de la cerințe scrise: ce intră, ce iese, cine ce vede, ce se întâmplă la excepții. Abia apoi scrie cod. E motivul pentru care livrările vin fără surprize și pentru care aplicația rămâne explicabilă și peste un an, când cineva întreabă de ce a fost făcută așa.

---

## Cum se traduce asta pentru tine

Eyebrow: `Ce înseamnă pentru tine`
**H2:** Patru specializări, un singur punct de contact

Text (Prose, 70ch):

Nu ajungi să coordonezi tu patru oameni. Fiecare proiect are un responsabil din partea BitUp, care implică specialistul potrivit atunci când e nevoie și răspunde de rezultatul final. Tu ai un singur număr de telefon, un singur raport lunar și o singură persoană care îți explică ce s-a făcut.

Combinația contează mai mult decât suma: securitatea proiectată de la început, verificată de cineva care sparge sisteme pentru profesie, cu automatizări și aplicații construite de oameni care lucrează pe cerințe scrise. Rareori se găsesc împreună la scara unei companii mijlocii.

---

## Banda finală

CtaBand, varianta implicită, cu titlul: **Vrei să vezi ce poate face echipa asta pentru compania ta?** / 30 de minute, gratuit, fără obligații. Îți spunem exact unde stai și cine ar prelua ce. / Buton: **Programează Radiografia IT**
