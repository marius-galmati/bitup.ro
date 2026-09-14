# 06 — Radiografie IT gratuită (`/radiografie-it`)

**Title:** Radiografie IT gratuită: afli în 30 de minute unde stă firma ta · BitUp
**Description:** 30 de minute, remote, 10 verificări: backup, parole, accese, email, actualizări, securitate. La final primești o pagină cu ce e bine, ce e urgent și ce ar costa. Fără obligații.

**JSON-LD:** global + FAQPage din § Întrebări. Fără CtaBand; formularul e CTA-ul.

Ancore obligatorii: `#cum-decurge`, `#formular`.

---

## Hero (intern, cu formularul vizibil în dreapta pe desktop)

Eyebrow: `Radiografie IT gratuită`
**H1:** În 30 de minute afli unde stă firma ta cu backup-ul, securitatea și accesele
Lead: Remote, cu tine sau cu omul tău de IT. La final primești o pagină cu ce e în regulă, ce e urgent și ce ar costa să rezolvi. Fără obligații și fără prezentare de vânzare.

Pe desktop, în dreapta hero-ului: formularul (§ Formular). Pe mobil, formularul vine după § Ce primești, cu un buton „Sari la formular” în hero care duce la `#formular`.

---

## Cele 10 verificări

Eyebrow: `Ce verificăm`
**H2:** Zece întrebări la care ar trebui să știi răspunsul

Listă numerotată în două coloane (iconițe permise aici, 20 px, teal):

1. **Backup-ul există și l-a restaurat cineva vreodată?** Nu „rulează”, ci „am scos ceva din el luna asta”.
2. **Cine are drepturi de administrator și de ce?** De obicei prea mulți, și cel puțin unul care nu mai lucrează la voi.
3. **Parolele și autentificarea în doi pași.** Pe Microsoft 365 sau Google, pe bancă, pe tot ce contează.
4. **Actualizările pe servere și stații.** Când s-au făcut ultima dată și cine se uită.
5. **Antivirus sau EDR, și cine se uită la alerte.** Un antivirus la care nu se uită nimeni e o iconiță.
6. **Firewall-ul și accesul de la distanță.** Ce e deschis spre internet și de ce.
7. **Emailul poate fi falsificat?** SPF, DKIM, DMARC: dacă lipsesc, cineva poate trimite emailuri „de la tine”.
8. **Cine deține domeniul, hostingul și licențele?** Pe ce cont, cu ce card, cu ce email. Am văzut firme care și-au pierdut domeniul.
9. **Ce se întâmplă când pleacă omul care știe parolele?** Dacă răspunsul e „nu știu”, e cel mai urgent punct din listă.
10. **Ce obligații are firma (NIS2, GDPR) și cât de departe e de ele.** Da, nu, sau „probabil, din motivul X”.

---

## Cum decurge {#cum-decurge}

Eyebrow: `Cum decurge`
**H2:** Trei pași, niciunul nu cere să instalezi ceva

Steps (3):

**1. Completezi formularul.** Două minute. Te sunăm în maximum o zi lucrătoare și stabilim un slot de 30 de minute. `[[CAPACITATE_RADIOGRAFII]]`

**2. Vorbim 30 de minute, pe video.** Tu sau omul vostru de IT. Trecem prin cele 10 puncte. Ne arăți ce ai, întrebăm, notăm. Nu ne conectăm la nimic, nu instalăm nimic.

**3. Primești pagina în aceeași zi.** Semafor pe cele 10 puncte, trei recomandări în ordinea urgenței și o estimare de cost, dacă vrei să mergi mai departe. Cu noi sau cu altcineva.

---

## Ce primești

Eyebrow: `Ce primești`
**H2:** O pagină, nu un raport de 40

Text (două coloane, exemplul de raport în dreapta: `[[CAPTURA_RAPORT_RADIOGRAFIE]]`, Figure cu legenda „Exemplu de raport. Culorile sunt ale firmei din exemplu, nu ale tale.”):

O singură pagină, pe care o poți citi în două minute și o poți da mai departe omului tău de IT sau asociatului. Pe ea: cele 10 puncte cu verde, galben sau roșu și o propoziție la fiecare; cele trei lucruri pe care le-am face primele, cu motivul; și, dacă ceri, ce ar costa să le rezolvăm, în abonament sau ca proiect.

Ce nu primești: o prezentare de vânzare, un telefon de urmărire la trei zile, sau un email săptămânal. Dacă vrei să continuăm, ne scrii tu.

---

## Formular {#formular}

Titlu deasupra formularului: **Programează radiografia**
Text scurt: Două minute. Te sunăm.

Câmpuri (din `ARHITECTURA.md` § Formulare, kind=radiografie):
- Numele tău *
- Firma *
- Câți angajați sunteți * (select: sub 10 · 10–30 · 30–100 · peste 100)
- Telefon *
- Email *
- Ce te îngrijorează cel mai tare la IT-ul vostru? (opțional) — placeholder: „De exemplu: nu știu dacă backup-ul merge” 
- Consimțământ * (textul din `00-global.md`)
- Buton: **Trimite și te sunăm**
- Sub buton: semnătura din `00-global.md`.

Succes → `/multumesc?kind=radiografie`.

---

## Cine o face

Eyebrow: `Cine`
**H2:** Cine face radiografia

Text (portret pătrat în stânga):

Marius Galmati, fondator BitUp. Lucrez în IT din 2017, ultimii doi ani și jumătate în securitate informațională, într-o corporație din Fortune 500, la audituri ISO 27001 și planuri de continuitate. Radiografia o fac eu, nu un formular automat: în 30 de minute văd lucruri pe care un formular nu le vede. → Despre mine (`/despre`)

---

## Întrebări {#intrebari}

Faq:

**Chiar e gratuit? Care e prinderea?**
Da, gratuit. Prinderea, dacă vrei s-o numești așa: o parte din firmele care fac radiografia devin clienți, pentru că văd cum lucrăm. Restul pleacă cu o pagină utilă. Amândouă variantele sunt în regulă pentru noi.

**Trebuie să instalez ceva sau să-ți dau parole?**
Nu. Nu ne conectăm la nimic, nu instalăm nimic, nu ne dai nicio parolă. Ne arăți pe ecran ce ai și răspunzi la întrebări.

**Ce se întâmplă cu ce ne spui?**
Rămâne între noi. Notițele stau în sistemul nostru, nu le dăm nimănui; dacă nu continuăm, le ștergem la cerere. Detalii în [Politica de confidențialitate](/confidentialitate).

**Dacă nu vreau să continui după?**
Nu se întâmplă nimic. Nu te sunăm, nu trimitem oferte. Ai pagina, faci ce vrei cu ea.

**Poate participa omul nostru de IT?**
Da, chiar recomandăm. Nu e un test pentru el; de multe ori el știe deja problemele și n-a avut cine să-l asculte.
