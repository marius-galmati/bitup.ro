# 05 — Automatizări și software (`/servicii/automatizari`)

**Title:** Automatizări, AI și software la comandă pentru firme · BitUp
**Description:** Mutăm procesele care trăiesc în Excel și pe email într-un sistem: automatizări între aplicațiile pe care le ai, asistenți AI cu scop clar, aplicații făcute pentru firma ta. Pornim de la proces, nu de la tehnologie.

**JSON-LD:** Service (name: „Automatizări și software”) + FAQPage.

Ancore obligatorii: `#software`, `#intrebari`.

---

## Hero (intern)

Eyebrow: `Automatizări și software`
**H1:** Ce se repetă în firma ta ar trebui să facă un sistem, nu un om
Lead: Aceleași date introduse în trei programe. Aprobări urmărite pe email și rapoarte făcute din fișiere separate, luni de luni. Pornim de la procesul care vă mănâncă timp și vedem ce merită automatizat, ce merită integrat și ce merită construit.
Buton: **Radiografie IT gratuită** (`/radiografie-it`)

---

## Situația

Eyebrow: `De unde pornim`
**H2:** Semnele că un proces a crescut mai mult decât Excelul lui

Listă (marcaj teal):
- Cineva copiază date dintr-un program în altul, de mână, în fiecare zi.
- Un document trece prin trei aprobări, pe email, și nimeni nu știe unde e acum.
- Raportul de luni dimineață se face din patru fișiere, de o persoană care știe „cum se face”.
- Un program cumpărat acum câțiva ani nu mai acoperă cum lucrează firma, și oamenii au făcut ocolișuri.
- Clienții întreabă același lucru pe telefon, de zece ori pe zi, și răspunde același om.

Text sub listă (70ch): Niciunul dintre astea nu e o problemă de tehnologie. E un proces care a rămas în capul unui om. Când omul e în concediu, procesul se oprește. Asta rezolvăm.

---

## Cum lucrăm aici

Eyebrow: `Cum lucrăm`
**H2:** Întâi procesul, apoi tehnologia

Steps (4):

**1. Ne uităm la cum lucrează echipa.** Nu la ce program vrea cineva să cumpere. Ce intră, ce iese, unde se blochează, cine ia decizia.

**2. Alegem cea mai mică soluție care rezolvă problema.** De multe ori e o automatizare între două aplicații pe care le ai deja. Uneori e un asistent AI. Rar e o aplicație nouă. Ordinea asta e deliberată.

**3. Construim și testăm cu oamenii care o vor folosi.** Nu cu managerul. Cu contabila, cu omul de la recepție, cu tehnicianul.

**4. Măsurăm același lucru înainte și după.** Ore pe săptămână, pași de mână, erori. Dacă nu s-a schimbat, n-am terminat.

---

## Ce construim

Eyebrow: `Ce construim`
**H2:** Trei feluri de lucruri

Trei carduri:

**Automatizări între aplicațiile pe care le ai**
Facturile intră singure în contabilitate. Comanda din magazinul online ajunge în depozit fără email. Un formular completat de client deschide o sarcină cuiva. Folosim API-urile aplicațiilor voastre și, când trebuie, cod. Fiecare automatizare are un om care primește alertă dacă ceva pică.

**Asistenți AI cu scop clar**
Un asistent care răspunde pe WhatsApp la întrebările frecvente ale clienților și deschide tichet când nu știe. Unul care citește emailurile de comandă și le pune în tabel. Unul care scrie prima versiune a unui răspuns, pe care omul o verifică. Nu „AI în firmă”; un asistent, o treabă, un om responsabil.

**Software la comandă** → `#software`
Când nu există nimic potrivit sau când ce există costă mai mult decât face, construim o aplicație pentru voi. Doar dacă putem asigura și mentenanța ei după.

---

## Am construit pentru noi, înainte

Eyebrow: `Dovada`
**H2:** Cipri, asistentul nostru de suport

Text (două coloane, captura WhatsApp în dreapta, `assets/blog/helpdesk/whatsapp-cipri.jpg`):

Înainte să propun cuiva un asistent AI, am construit unul pentru noi. Cipri stă pe numărul de WhatsApp de suport al BitUp. Recunoaște firma după numărul de telefon, pune întrebările potrivite, propune pași, preia capturi de ecran. Când nu poate rezolva singur, deschide tichetul în BitUp Helpdesk și îl dă unui om. Îl folosesc clienții mei zilnic.

Nu spun asta ca să vând AI. Spun ca să știi că, atunci când îți propun ceva, l-am rulat în producție înainte. → Cum l-am construit și ce am învățat (`/blog/cum-ne-am-construit-propriul-helpdesk`)

---

## Software la comandă {#software}

Eyebrow: `Software la comandă`
**H2:** ProQ: un produs întreg, pornit de la o nevoie dintr-o fabrică

Text (două coloane, logo ProQ pe fundal închis în dreapta):

Cel mai mare lucru pe care l-am construit e ProQ, o platformă pentru furnizorii din industria auto care trebuie să dovedească clienților că procesul lor e sub control: planificare, analiză de riscuri, plan de control, dosar de omologare. 29 de module, folosite de furnizori din România, Mexic, India și China, găzduite de noi sau instalate pe serverele lor.

Chiar dacă nu ești din auto, ProQ e dovada că pot duce un software de la o idee dintr-o fabrică la un produs pe care îl întrețin de ani de zile. Același mod de lucru îl aplic și la o aplicație internă de 5 utilizatori. → Citește cazul ProQ (`/rezultate/proq`)

Ce construim de obicei: aplicații interne (evidențe, aprobări, planificări) care înlocuiesc Excel-uri împărțite pe email; portaluri pentru clienți sau furnizori; integrări între sistemele pe care le ai. Web, cu bază de date PostgreSQL, găzduit de noi sau la tine, cu backup și actualizări incluse în mentenanță.

Ce nu construim: aplicații mobile native, site-uri de prezentare, magazine online. Există oameni mai buni la asta și îți spun cine.

---

## Ce spun clar înainte să începem

Eyebrow: `Onest`
**H2:** Trei lucruri pe care le spun la prima discuție

Listă:
- **Nu orice proces are nevoie de AI.** De cele mai multe ori, o automatizare simplă face mai mult, mai ieftin și fără surprize. Îți spun când AI-ul e răspunsul și când e doar la modă.
- **Nu promit economii pe care nu le-am măsurat.** Măsurăm împreună înainte și după. Dacă nu se vede, n-a meritat.
- **Nu construiesc ce nu pot întreține.** Orice aplicație vine cu răspunsul la „și când se strică, cine o repară?”. Răspunsul e eu, în contract.

---

## Întrebări frecvente {#intrebari}

Faq:

**Cât costă o automatizare?**
De la câteva ore de lucru, pentru o legătură între două aplicații care au API, până la săptămâni, pentru un flux complicat cu excepții multe. Îți spun după ce văd procesul, nu înainte. Prima discuție e gratuită și nu ai nevoie de nicio specificație.

**Trebuie să schimbăm programele pe care le avem?**
De obicei nu. Cele mai bune automatizări leagă ce ai deja. Schimbăm ceva doar când programul vechi e chiar piedica.

**Datele noastre ajung la vreun AI din afară?**
Depinde de ce construim și îți spun exact. Pentru asistenții AI folosim modele comerciale (cum e ChatGPT) prin API, cu date minime, sau modele rulate la noi, când datele sunt sensibile. Decidem împreună înainte, în scris.

**Cine întreține ce ați construit?**
Eu, prin contract de mentenanță, cu același helpdesk ca pentru restul IT-ului. Codul e al vostru; documentația și accesul le primiți de la început.

**Puteți prelua ceva construit de altcineva?**
Uneori. Mă uit la cod și îți spun sincer dacă merită întreținut sau rescris. Nu preiau ce nu pot înțelege.

---

## Banda finală

CtaBand, varianta implicită, cu titlul înlocuit: **Ai un proces care trăiește în Excel și în emailuri?** / Spune-mi ce se repetă și unde se pierd lucrurile. În 30 de minute vedem dacă merită automatizat și cum. / Buton: **Programează Radiografia IT**
