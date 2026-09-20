# 01 — Acasă (`/`)

**Title:** Suport IT și securitate pentru firme din Cluj · BitUp
**Description:** Proiectăm, securizăm și administrăm infrastructura IT a firmei tale: servere, rețea, cloud, aplicații și automatizări. Radiografie IT gratuită.

**JSON-LD:** Organization + ProfessionalService (global). Fără altceva.

---

## 1. Hero

Aliniat la stânga, pe `--bg`. Fără fotografie, fără rând de încredere, fără eyebrow.

Notă pentru Claude Code: de la 1200 px, două coloane — textul în stânga, graficul `HeroDiagram` în dreapta (DESIGN.md § Imagini); de la 1360 px, hero-ul trece pe containerul lat, cu marginea stângă păstrată aliniată. Sub 1200 px, o coloană, fără grafic. În grafic: logo-ul oficial deasupra spinei, nodurile de pe spină în orange și săgețile de la capete în V, teal (cerut de Marius pe 18 septembrie 2026).

Notă pentru Claude Code: graficul se desenează o singură dată la încărcarea paginii, în ~1,9 s (cerut de Marius pe 20 septembrie 2026; detaliile în DESIGN.md § Mișcare și § Imagini). Textul paginii nu depinde de mișcare: cu `prefers-reduced-motion` desenul apare direct terminat.

Notă pentru Claude Code: fiecare bandă e link către pagina serviciului ei — `Securitate cibernetică` → `/servicii/securitate`, `Automatizări` → `/servicii/automatizari`, `Agentic AI` → `/servicii/automatizari`, `Software development` → `/servicii/automatizari#software`, `Infrastructură IT` → `/servicii/suport-it`. La hover și la focus, celelalte patru benzi se estompează.

Notă pentru Claude Code: etichetele din grafic sunt text nou, luat din `hero.png` pe 18 septembrie 2026; nu se suprapun peste cele trei grupuri de servicii din `02-servicii-index.md` — de reconciliat.

`Securitate cibernetică` · `Automatizări` · `Agentic AI` · `Software development` · `Infrastructură IT`

Notă pentru Claude Code: cele două etichete de colț stau jos, `De la fragmentare` în stânga și `La progres` în dreapta.

Notă pentru Claude Code: eticheta pentru cititoarele de ecran (`aria-label` pe SVG) e „De la fragmentare la progres: cinci direcții împrăștiate se adună într-un singur traseu.”, iar majusculele de pe etichetele de colț se fac din CSS, nu din text.

Notă pentru Claude Code: hero schimbat de Marius pe 17 septembrie 2026. Eyebrow-ul a fost scos, textul nou n-are unul.

**H1** (max-width 22ch)**:** Proiectăm, securizăm și administrăm întreaga infrastructură IT de care firma ta are nevoie.

Lead (max-width 60ch): Începem cu servere, rețea și cloud, ajungem la aplicații, automatizări și agenți AI. Securitatea se proiectează de la început și se integrează în fiecare etapă.

Butoane: **Radiografie IT gratuită** (principal → `/radiografie-it`) · **Explorează serviciile** (secundar → `/servicii`)

Varianta de după lansare, când există `[[CAPTURA_RAPORT_LUNAR]]`: hero pe două coloane, în dreapta un Figure cu prima pagină a raportului lunar anonimizat, ca document pe hârtie (fundal `--surface`, bordură 1 px `--line`, `--radius`, fără umbră, fără perspectivă, fără ramă de laptop). Legendă și alt: „Raportul lunar pe care îl primește fiecare client. Anonimizat.” Obiectul din hero e livrabilul, nu fondatorul.

---

## 2. Recunoști situația?

Eyebrow: `De unde pornim de obicei`

**H2:** Trei propoziții pe care le auzim în aproape fiecare firmă nouă

Notă pentru Claude Code: aranjamentul paginii a fost schimbat pe 17 septembrie 2026, după `example.png` (doar dispunerea; culorile, fontul, textul și meniul au rămas).

Trei coloane pe un rând, despărțite de rigle verticale de 1 px `--line`, fără carduri și fără chenare. Fiecare coloană are deasupra o liniuță de accent teal (28 × 3 px), apoi citatul ca titlu și o propoziție dedesubt. Sub 768 px coloanele se stivuiesc, liniuța rămâne deasupra fiecărui citat:

**„Avem un băiat care se pricepe. Dar când e în concediu, nu știe nimeni parolele.”**
Tot IT-ul stă într-un singur om. Când lipsește el, se oprește firma.

**„Avem trei furnizori. Când pică ceva, fiecare zice că e la celălalt.”**
Nimeni nu răspunde de tot. Ajungi să-i coordonezi tu, în loc să-ți vezi de treabă.

**„Avem backup. Cred. Nu l-a testat nimeni.”**
Dacă nu l-a restaurat nimeni, nu știi dacă ai backup.

Rând de închidere (text simplu, sub carduri): Dacă te-ai regăsit în cel puțin una, Radiografia IT de 30 de minute e pentru tine. → link „Cum decurge” (`/radiografie-it`)

---

## 3. Ce facem

Eyebrow: `Servicii`

**H2:** Trei lucruri, făcute până la capăt

Modelul „două coloane”: eyebrow și H2 lipite în stânga (240 px, sticky pe desktop), gutieră goală (fără riglă verticală — mockup-ul desparte cele două coloane doar cu spațiu), iar în dreapta cele trei servicii ca rânduri despărțite de linii de păr de 1 px — titlu, paragraf, link terțiar cu săgeată. Fără carduri, fără numere de index (serviciile nu sunt o secvență):

**Suport și administrare IT**
Preluăm tot ce ține de calculatoare, servere, rețea, cloud și Microsoft 365, în abonament lunar. Echipa ta scrie pe WhatsApp, un om răspunde, iar la sfârșitul lunii primești raportul cu ce s-a făcut.
→ Vezi ce include abonamentul (`/servicii/suport-it`)

**Securitate și continuitate**
Protecție împotriva atacurilor, accese controlate, backup care chiar se restaurează, testat periodic. Când firma ta are obligații (NIS2, ISO 27001), le traducem în pași concreți, nu în hârtii.
→ Vezi ce protejăm și cum (`/servicii/securitate`)

**Automatizări și software**
Când un proces trăiește în Excel și în emailuri, îl mutăm într-un sistem: automatizare, integrare sau o aplicație făcută pentru voi. Pornim de la proces, nu de la tehnologie.
→ Vezi exemple reale (`/servicii/automatizari`)

---

## 4. Cum lucrăm

Eyebrow: `Cum lucrăm`

**H2:** Patru pași. Al patrulea nu se termină.

Antetul secțiunii stă sus, pe toată lățimea. Dedesubt, Steps în varianta „rail”: de la 1200 px cei patru pași pe un singur rând, cercul cu cifra deasupra titlului, nodurile legate de o linie de 1 px `--line` cu o săgeată mică teal între ele; după al patrulea cerc linia curge mai departe, fără săgeată. Sub 1200 px rămâne grila de acum (2 × 2, apoi o coloană), fără linie.

Steps:

**1. Radiografie.** 30 de minute, remote, gratuit. Zece verificări. Pleci cu o pagină: ce e bine, ce e urgent, ce ar costa.

**2. Plan.** Ce facem în prima lună, ce poate aștepta, ce nu merită făcut deloc. În cuvinte de business, cu prețul lângă.

**3. Preluare.** În primele 30 de zile documentăm tot, schimbăm parolele care trebuie schimbate, punem backup-ul la punct și îl testăm.

**4. Lună de lună.** Monitorizare, suport pe WhatsApp, actualizări, raport lunar. Tu știi ce se întâmplă fără să întrebi.

Link: Tot procesul, cu ce se întâmplă în fiecare etapă → `/cum-lucram`

---

## 5. De ce un singur partener

Eyebrow: `Ce e diferit`

**H2:** Ce primești când răspunde un singur partener de tot

Listă de 5, fiecare cu titlu scurt și o propoziție (nu carduri; listă cu marcaj teal):

**Un număr de telefon, nu trei furnizori.** Când pică ceva, nu mai cauți vinovatul. Suni și se rezolvă.

**Securitatea e făcută, nu vândută separat.** Fiecare lucru pe care îl instalăm are și partea de securitate făcută. Nu funcționează altfel.

**Vezi tot, fără să întrebi.** Cererile echipei tale intră într-un sistem de tichete construit de noi. Știi cine se ocupă, în ce stadiu e, când s-a rezolvat.

**Raport lunar din fapte, nu din memorie.** La sfârșitul lunii primești ce s-a făcut, cât a durat, ce urmează. Nu ghicești pentru ce plătești.

**Experiență de la scară mare, la scara ta.** Aducem experiență de securitate dintr-o corporație din Fortune 500 într-o firmă de 30 de oameni, fără complexitatea inutilă.

---

## 6. Suportul, pe scurt (WhatsApp + Cipri)

Eyebrow: `Suport`

**H2:** Scrii pe WhatsApp. Primești răspuns pe loc. Nimic nu se pierde.

Text (două coloane: text stânga, captura WhatsApp dreapta, `assets/blog/helpdesk/whatsapp-cipri.jpg`):

Echipa ta nu învață niciun portal nou: scrie pe WhatsApp, ca oricui. Cipri, asistentul nostru virtual, o recunoaște, preia problema și încearcă s-o rezolve pe loc, la orice oră. Ce nu poate rezolva el devine automat un tichet în BitUp Helpdesk și îl preia un om. Tu vezi fiecare tichet, de la deschidere la închidere.

Am construit tot sistemul noi, pentru firmele mici cu care lucrăm. → Cum l-am construit și de ce (`/blog/cum-ne-am-construit-propriul-helpdesk`)

---

## 7. Marius

Eyebrow: `Cine răspunde`

**H2:** Marius Galmati, fondator BitUp

Secțiune compactă, pe `--surface-2`. Text (portret pătrat 200 px în stânga, text în dreapta; rămâne la persoana I, e declarația semnată a fondatorului):

Lucrez în IT din 2017. Am început cu serverele și rețelele din firme mici. Ultimii doi ani și jumătate am lucrat în securitate informațională într-o corporație din Fortune 500: audituri ISO 27001, planuri de continuitate, protecție pe stații și servere. Am făcut BitUp pentru că văzusem prea multe firme cu tehnologie, dar fără cineva care să răspundă de ea.

Linkuri: Povestea, pe scurt → `/despre` · Echipa → `/echipa` · LinkedIn → https://www.linkedin.com/in/nicolae-marius-galmati

---

## 8. Rezultate

Eyebrow: `Rezultate`

**H2:** Ce am făcut, cu nume

Două carduri (din colecția `cases`, doar cele cu `draft: false`; când Cosmio e draft, secțiunea arată doar ProQ și un rând „Următorul caz, în curând, cu acordul clientului.”):

Card: kicker · titlu scurt · două propoziții din `summary` · link „Citește cazul”.

---

## 9. Parteneri și tehnologii

Eyebrow: `Parteneri`

**H2:** Cu ce lucrăm

Rând static, patru celule egale pe toată lățimea containerului, despărțite de rigle verticale scurte de 1 px `--line` (2,8 em, centrate pe verticală): Microsoft Partner · Fortinet Advocate · Veeam Partner · Anthropic Partner (badge-uri din `[[LOGO_PARTENERI]]`, nivelul scris sub fiecare). La 640–1023 px, 2 × 2, cu o linie orizontală între rânduri; sub 640 px, o coloană.
Notă pentru Claude Code: dedesubt, secțiune proprie (decizie a lui Marius, 17 septembrie 2026), pe același fundal, despărțită de o linie de 1 px.

Eyebrow: `Tehnologii`

**H2:** Tehnologii cu care lucrăm zilnic

Microsoft 365, Fortinet, Veeam, CrowdStrike, Palo Alto Networks, WireGuard, Proxmox / VMware, Synology.

Notă pentru Claude Code: dacă `[[LOGO_PARTENERI]]` lipsește la lansare, rândul de badge-uri devine text (numele partenerului + nivelul), fără logo-uri improvizate.

---

## 10. Din blog

Eyebrow: `Din interior`

**H2:** Cum lucrăm, scris de noi

Ultimele 3 articole din colecția `blog` (la lansare, unul). Card: titlu, description, dată, timp de citit.

---

## 11. Întrebări practice

Eyebrow: `Întrebări`

**H2:** Ce ne întreabă un patron înainte să scrie

Faq (4 întrebări, prima deschisă):

**Putem externaliza doar o parte din IT?**
Da. Sunt trei formule: alături de omul vostru intern (el rămâne pe zi cu zi, noi preluăm securitatea, backup-ul și ce nu știe el), parțial (doar serverele și Microsoft 365, de exemplu) sau complet. Alegem la radiografie, după ce vedem ce aveți.

**Trebuie să schimbăm tot ce avem?**
Nu. Pornim de la ce funcționează. Schimbăm doar ce e riscant sau ce te costă mai mult decât face.

**Cât costă?**
Depinde de numărul de stații și servere și de ce preluăm: doar administrare, sau și securitate, backup, licențe. Îți spunem un preț concret la finalul radiografiei, fără obligații. Pe site nu punem cifre pentru că ar fi false pentru jumătate din firme.

**Putem începe cu o problemă punctuală?**
Da. O intervenție sau un proiect delimitat (o migrare, un backup pus la punct, un audit) e o intrare bună. După aceea vedem dacă are sens un abonament.

---

## 12. Banda finală

CtaBand, varianta implicită (din `00-global.md`).
