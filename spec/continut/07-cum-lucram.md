# 07 — Cum lucrăm (`/cum-lucram`)

**Title:** Cum lucrăm: de la radiografie la raportul lunar · BitUp
**Description:** Ce se întâmplă concret: radiografia, planul, primele 30 de zile, o lună obișnuită, raportul lunar și ce facem la un incident.

**JSON-LD:** global + FAQPage (dacă se păstrează § Întrebări).

---

## Hero (intern)

Eyebrow: `Cum lucrăm`
**H1:** Concret, cum o să fie?
Lead: E întrebarea pe care o pune orice patron înainte să semneze și la care puțini furnizori răspund. Uite răspunsul, pas cu pas, de la prima discuție până la ziua în care ne-am putea despărți.

---

## Cei patru pași

Eyebrow: `Pe scurt`
**H2:** Patru pași. Al patrulea nu se termină.

Diagramă SVG inline (singura de pe site): patru noduri în linie, cu săgeți, al patrulea într-o buclă; sub fiecare, textul de mai jos. Pe mobil, vertical.

**1. Radiografie** · 30 min, gratuit · Zece verificări. O pagină cu verde, galben, roșu.
**2. Plan** · 1 săptămână · Ce facem prima lună, ce așteaptă, ce nu merită. Cu preț.
**3. Preluare** · primele 30 de zile · Documentăm, securizăm, testăm backup-ul.
**4. Lună de lună** · în continuu · Monitorizare, suport, actualizări, raport.

---

## 1. Radiografia

Eyebrow: `Pasul 1`
**H2:** Radiografia: 30 de minute în care aflăm amândoi cu ce avem de-a face

Text (70ch): Nu e o discuție de vânzare. Trecem prin zece puncte: backup, accese, parole, actualizări, antivirus, firewall, email, cine deține ce, ce se întâmplă dacă pleacă omul-cheie, ce obligații ai. Pleci cu o pagină cu semafor și trei recomandări. Dacă vrei să continuăm, ne scrii. → Cum decurge (`/radiografie-it`)

---

## 2. Planul

Eyebrow: `Pasul 2`
**H2:** Planul: ce facem, în ce ordine, cât costă

Text (70ch): Într-o săptămână după radiografie primești planul. E scurt: ce facem în prima lună (de obicei lucrurile roșii), ce poate aștepta, ce nu merită făcut deloc și de ce. Fiecare lucru are prețul lângă: ce intră în abonament, ce e proiect separat. Alegem împreună formula (alături de omul vostru, parțial, complet). Semnăm un contract scurt, pe care îl poți citi fără avocat.

---

## 3. Preluarea

Eyebrow: `Pasul 3`
**H2:** Primele 30 de zile: punem ordine

Listă de 6 (cu marcaj):
- **Documentăm tot ce aveți:** echipamente, conturi, licențe, furnizori, cine are acces la ce. Inventarul devine al vostru.
- **Preluăm accesele:** schimbăm parolele care trebuie schimbate, închidem conturile vechi, punem autentificare în doi pași unde lipsește, mutăm parolele într-un manager.
- **Punem backup-ul la punct și îl testăm.** Nu plecăm din luna 1 fără o restaurare reușită.
- **Rezolvăm roșurile din radiografie**, în ordinea din plan.
- **Pornim suportul:** echipa voastră primește numărul de WhatsApp al lui Cipri și două rânduri despre cum se cere ajutor. Atât cât trebuie să învețe cineva.
- **Primul raport lunar** la 30 de zile, cu ce am găsit, ce am făcut și ce urmează.

---

## 4. Lună de lună

Eyebrow: `Pasul 4`
**H2:** O lună obișnuită, în care nu ne suni

Text (70ch): Verificăm zilnic backup-urile și alertele, instalăm actualizările în ferestre anunțate. Răspundem cererilor echipei tale și rezolvăm ce apare, mic sau mare. Îți spunem proactiv când vedem ceva ce ar trebui să știi (o licență care expiră, un laptop care dă semne, un cont ciudat). La sfârșitul lunii îți trimitem raportul.

---

## Cum ceri ajutor

Eyebrow: `Suport`
**H2:** Scrii pe WhatsApp. Restul se întâmplă singur.

Steps (4), cu captura WhatsApp lângă:

**1.** Un angajat scrie pe WhatsApp, cu cuvintele lui. Fără cont, fără formular.
**2.** Cipri, asistentul nostru, recunoaște firma după număr, pune întrebările potrivite, propune pași. Dacă se rezolvă, se închide acolo.
**3.** Dacă nu, deschide singur tichetul în BitUp Helpdesk, cu tot contextul și atașamentele. Îl preluăm.
**4.** Statusul vine înapoi pe același canal. La sfârșitul lunii, raportul.

Rând: Preferi email? Deschizi tichetul pe helpdesk.bitup.ro și primești statusurile pe email. Același sistem. → Cum l-am construit (`/blog/cum-ne-am-construit-propriul-helpdesk`)

---

## Raportul lunar

Eyebrow: `Raportul`
**H2:** Ce primești la sfârșitul lunii

Text (două coloane, `[[CAPTURA_RAPORT_LUNAR]]` în dreapta):

O pagină sau două, generate din tichete, nu scrise din memorie. Acolo scrie câte cereri au fost și de la cine, ce s-a rezolvat și cât a durat. Scrie și ce am făcut fără să ne cheme cineva (actualizări, verificări, curățenie), ce am observat și ce recomandăm pentru luna următoare. Când s-a făcut testul de restaurare a backup-ului, intră și rezultatul lui.

---

## Când se întâmplă ceva

Eyebrow: `Incidente`
**H2:** Cum tratăm o urgență

Text (70ch): Incidentele care blochează munca (nu merge emailul la nimeni, a picat serverul, cineva a dat click unde nu trebuia) au prioritate peste orice altceva și un timp de răspuns scris în contract. În program răspundem în mai puțin de două ore, prin contract; media reală din helpdesk e sub 30 de minute. În afara programului, ai un număr de urgență pentru situațiile care chiar sunt urgențe. Ce facem în primele 24 de ore după un incident de securitate e pe pagina de securitate. → Primele 24 de ore (`/servicii/securitate#incidente`)

---

## Cum se facturează

Eyebrow: `Bani`
**H2:** O sumă fixă pe lună. Proiectele, cu ofertă înainte.

Text (70ch): Abonamentul e o sumă fixă lunară, stabilită după radiografie, în funcție de stații, servere și ce preluăm. Nu facturăm ore pentru suportul obișnuit, pentru că asta ar însemna că ne convine să ai probleme. Proiectele separate (migrări, hardware nou, software) au ofertă înainte și se fac doar după acordul tău scris. Factura vine la începutul lunii, cu raportul lunii trecute.

---

## Cum se încheie

Eyebrow: `Ieșirea`
**H2:** Dacă vrei să pleci, pleci cu tot

Text (70ch): Contractul are preaviz de o lună, fără penalități. La încheiere primești toată documentația, inventarul, parolele și accesele într-un format pe care îl poate prelua oricine, și ne închidem accesul în ziua convenită. Nu ținem nimic ostatic.

---

## Întrebări

Faq:

**Cât durează până văd o diferență?**
La 30 de zile ai primul raport și backup-ul testat. Cele mai multe „roșuri” din radiografie dispar în prima lună. Liniștea vine cam în luna a doua, când oamenii tăi s-au obișnuit să scrie pe WhatsApp în loc să sune.

**Trebuie să fiu eu, patronul, implicat?**
La radiografie și la plan, da, 30 de minute plus o ședință. După, doar la decizii (ce cumpărăm, ce schimbăm). Restul merge fără tine. Asta e ideea.

**Câți oameni sunt în spatele BitUp?**
Un nucleu mic și colaboratori pe specialități: tehnicieni locali unde e nevoie de cineva la fața locului în afara Clujului, dezvoltatori pentru partea de software. Întrebarea din spatele întrebării e ce se întâmplă când cineva lipsește. Nimic nu stă în memoria unui om: fiecare client are documentația lui, accesele sunt înregistrate, tichetele și rapoartele sunt în platformă. Dacă mâine vrei să pleci la alt furnizor, primești tot în 30 de zile, scris în contract.

---

## Banda finală

CtaBand, varianta implicită.
