# 00 — Elemente globale

Text final. Se copiază identic. `[[…]]` = placeholder din `PLACEHOLDERS.md`.

## Meniu

- Servicii ▾
  - Suport și administrare IT → `/servicii/suport-it`
  - Securitate și continuitate → `/servicii/securitate`
  - Automatizări și software → `/servicii/automatizari`
  - Toate serviciile → `/servicii`
- Cum lucrăm → `/cum-lucram`
- Rezultate → `/rezultate`
- Despre → `/despre`
- Blog → `/blog`
- Telefon (link `tel:+40757150894`): `+40 757 150 894`
- Comutator de limbă: `RO · EN` (`aria-label`: „Schimbă limba”)
- Comutator de temă (buton cu iconiță; `aria-label`: „Comută tema: luminos / întunecat”; `title` la fel)
- Buton principal: **Radiografie IT gratuită** → `/radiografie-it`

Meniu mobil, jos: `Sună: +40 757 150 894` · `Clienți: scrie-i lui Cipri pe WhatsApp` → `/suport` · `RO · EN` · temă

## Footer

**Coloana 1 — firma**
BitUp Technology SRL
Cluj-Napoca, România
CUI RO42613248 · J12/1556/2020
office@bitup.ro · +40 757 150 894
LinkedIn: [BitUp Technology](https://www.linkedin.com/company/bitup-technology)

Notă pentru Claude Code: profilul personal de LinkedIn al lui Marius nu apare în footer; apare pe Despre, pe Contact și în caseta de autor. Sediul social (Câmpia Turzii) nu apare în footer. Apare doar în blocul de identificare de pe `/termeni` și `/confidentialitate`, unde legea cere datele complete ale operatorului.

**Coloana 2 — servicii**
Suport și administrare IT · Securitate și continuitate · Automatizări și software · Radiografie IT gratuită

**Coloana 3 — firma**
Cum lucrăm · Rezultate · Despre · Blog · Contact · Suport pentru clienți

**Coloana 4 — parteneri**
Microsoft Partner · Fortinet Advocate · Veeam Partner (badge-urile din [[LOGO_PARTENERI]], cu nivelul sub fiecare)

**Rândul de jos**
© 2026 BitUp Technology SRL · Termeni → `/termeni` · Confidențialitate → `/confidentialitate` · Cookies → `/cookies` · Setări cookie-uri (buton, redeschide bannerul) · `RO · EN`

## Banner de consimțământ (cookie-uri)

Apare la prima vizită, jos, fără să blocheze pagina. Textul:

**Titlu:** Cookie-uri de statistici, doar dacă vrei
**Text:** Folosim Google Analytics ca să vedem ce pagini se citesc și de unde vin vizitatorii. Nu pornește până nu accepți, nu face reclame și nu vinde nimic nimănui. Te poți răzgândi oricând din „Setări cookie-uri”, jos în pagină. [Cum folosim cookie-urile](/cookies)
**Butoane (egale):** **Accept** · **Refuz**

Când bannerul e redeschis din footer, același text, cu alegerea curentă marcată sub butoane: „Acum: acceptat” / „Acum: refuzat”.

## Banda finală de CTA (CtaBand)

Varianta implicită (homepage, servicii, cum lucrăm, rezultate, despre):

**Cum ar fi o zi fără grija sistemelor, a backup-urilor și a securității datelor?**
Începe cu 30 de minute. Îți spunem exact unde stai și ce ar însemna să preluăm noi grija asta.
Buton: **Programează Radiografia IT** → `/radiografie-it`
Sub buton, mono: `+40 757 150 894 · office@bitup.ro`

Varianta pentru blog și studii de caz:

**Vrei să vezi unde stă firma ta cu IT-ul?**
30 de minute, remote, 10 verificări, o pagină cu ce e bine, ce e urgent și ce ar costa. Fără obligații.
Buton: **Programează Radiografia IT**

Varianta pentru pagina Radiografie (nu are bandă; formularul e CTA-ul).

## FactStrip de sub hero (homepage)

Imediat sub hero, pe toată lățimea containerului, pe `--surface`, patru celule: `Din 2020` · `Cluj-Napoca` · `Răspuns sub 2 ore în program` · Microsoft Partner · Fortinet Advocate · Veeam Partner (badge-urile din [[LOGO_PARTENERI]], monocrom; text până există). Hero-ul nu are rând de încredere: informațiile nu apar de două ori pe același ecran.

(„Răspuns sub 2 ore” e timpul contractual în program; media reală din helpdesk, sub 30 de minute, apare în text pe /suport-it, /cum-lucram și /suport, nu în FactStrip.)

## Semnătura de sub formulare

„Îți răspunde un om, în maximum o zi lucrătoare.” (rând de text în `--muted`, fără avatar)

## Caseta de autor (articole)

Portret 96 px + „Marius Galmati, fondator BitUp. În IT din 2017, cu ultimii doi ani și jumătate în securitate informațională într-o corporație din Fortune 500. Scrie despre ce iese la iveală când administrezi IT-ul unor firme mici: ce se strică, ce se repetă, ce merită automatizat.” Link: LinkedIn → https://www.linkedin.com/in/nicolae-marius-galmati

(E la persoana a treia, deliberat: e o casetă de bio, nu vocea firmei.)

## Consimțământ (checkbox, ambele formulare)

„Sunt de acord ca BitUp Technology SRL să folosească datele de mai sus ca să-mi răspundă la această cerere. Nu le folosim pentru altceva și nu le dăm mai departe. Detalii în [Politica de confidențialitate](/confidentialitate).”

## Mesaje de formular

- Câmp obligatoriu gol: „Completează [numele câmpului], ca să te putem suna înapoi.”
- Email invalid: „Emailul nu arată bine. Verifică-l, te rog.”
- Telefon invalid: „Scrie numărul cu prefix, de exemplu 0740 123 456.”
- Eroare la trimitere: „Nu s-a trimis. Nu e vina ta. Textul tău e încă aici; încearcă din nou peste un minut sau sună-ne direct la +40 757 150 894 / scrie-ne la office@bitup.ro.”
- Verificare anti-spam eșuată (Turnstile): „Verificarea anti-spam n-a trecut. Reîncarcă pagina și încearcă din nou; dacă se repetă, scrie-ne direct la office@bitup.ro.”
- Buton în timpul trimiterii: „Se trimite…”
- Fără JavaScript (`<noscript>`, ambele formulare): „Formularul are nevoie de JavaScript pentru verificarea anti-spam. Sună la +40 757 150 894, scrie la office@bitup.ro sau alege direct o oră în calendar.” + linkul Calendly (https://calendly.com/marius-galmati-bitup/30min).

## Pagina /multumesc

Title: Am primit. Ce urmează · BitUp
Description: Cererea ta a ajuns la noi. Uite ce se întâmplă în continuare.
`noindex`

**H1 (kind=radiografie):** Am primit. Te sunăm.
Text: „Cererea a ajuns la noi, nu într-o coadă. Te sunăm în maximum o zi lucrătoare, stabilim un slot de 30 de minute pentru radiografie și îți spunem ce avem nevoie de la tine înainte (aproape nimic: cine e omul vostru de IT, dacă există, și ce te-a adus aici).”
Rând sub text: „Dacă vrei să sari peste telefon, alege direct un slot de 30 de minute: [Alege ora în calendar](https://calendly.com/marius-galmati-bitup/30min)” (link extern, tab nou, `data-event="calendly_click"`).
Între timp, două lucruri utile: [Cum decurge o radiografie](/radiografie-it#cum-decurge) · [Cum lucrăm după](/cum-lucram)

**H1 (kind=contact):** Am primit mesajul.
Text: „Îți răspundem personal, în maximum o zi lucrătoare, de la office@bitup.ro. Dacă e urgent, sună la +40 757 150 894.”
Rând sub text: „Vrei să vorbim direct? [Alege un slot de 30 de minute](https://calendly.com/marius-galmati-bitup/30min)”

## Pagina 404

Title: Pagina nu există · BitUp
**H1:** Pagina asta nu există.
Text: „Poate s-a mutat când am refăcut site-ul, poate e o greșeală de scriere. Ce cauți, cel mai probabil, e aici:”
Linkuri: Serviciile → `/servicii` · Radiografie IT gratuită → `/radiografie-it` · Cum lucrăm → `/cum-lucram` · Contact → `/contact`
Sub: „Dacă ai ajuns aici dintr-un link de pe alt site, scrie-ne la office@bitup.ro și îl reparăm.”
Sub o linie, varianta engleză (din `continut-en/00-global.md` § 404), pentru că pagina 404 e una singură.

## Microcopy diverse

- Link „Află mai multe” nu se folosește nicăieri. Linkurile spun ce urmează: „Vezi ce include abonamentul”, „Cum decurge o radiografie”, „Citește cazul Cosmio”.
- Butonul de WhatsApp pe /suport: „Scrie-i lui Cipri pe WhatsApp”.
- Eticheta timpului de citit pe blog: „5 minute de citit”.
- Eticheta pentru draft (doar în staging): „Draft, nepublicat”.
- Comutatorul de temă: `aria-label` „Comută tema: luminos / întunecat”.
- Comutatorul de limbă: `aria-label` „Schimbă limba”; linkul EN are `hreflang="en"` și `lang="en"`.
- Linkuri externe (Calendly, LinkedIn, helpdesk.bitup.ro, wa.me): se deschid în tab nou, cu `rel="noopener"`; fără iconiță de „link extern”.
- Data de pe paginile legale: „Ultima actualizare: 10 septembrie 2026”.
- Skip-link (primul element focusabil din pagină): „Sari la conținut”.
- Butonul de meniu (hamburger), `aria-label`: „Meniu” când e închis, „Închide meniul” când e deschis.
- `aria-label` pe navigația din header: „Navigare principală”.
- `aria-label` pe navigația din footer: „Navigare secundară”.
- `aria-label` pe cuprinsul din dreapta al paginilor legale: „Cuprins”.
