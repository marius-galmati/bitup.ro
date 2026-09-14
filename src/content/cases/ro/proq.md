---
title: "ProQ: platforma de planificare a calității pentru furnizorii auto, construită de BitUp și folosită pe trei continente"
client: "ProQ (produs BitUp)"
kicker: "Software la comandă și produs propriu"
summary: "ProQ este software-ul APQP dezvoltat integral de BitUp și vândut ca SaaS unor companii din industria auto din România, Mexic, India și China. Un produs, nu un proiect: 29 de module, găzduit de noi sau instalat la client, actualizat continuu, cu suport de la oamenii care l-au scris."
logo: "/logos/proq.svg"
logoDark: true
facts:
  - { k: "Produs", v: "ProQ · pro-q.ro" }
  - { k: "Rolul BitUp", v: "Dezvoltare 100%, găzduire, operare, actualizări, suport" }
  - { k: "Clienți", v: "Furnizori din industria auto din România, Mexic, India și China" }
  - { k: "Model", v: "SaaS, abonament per utilizator, sau instalat pe serverele clientului" }
  - { k: "Acoperire", v: "29 de module, cele 6 faze APQP, de la kick-off la producție de serie" }
numbers:
  - { v: "29", k: "module, grupate pe cele 6 faze APQP, de la planificare la viața de serie" }
  - { v: "8", k: "standarde din industria auto implementate în platformă" }
  - { v: "4", unit: "țări", k: "România, Mexic, India, China: furnizori auto care rulează ProQ în producție" }
  - { v: "2.293", k: "teste automate care rulează la fiecare actualizare, înainte ca ea să ajungă la clienți" }
  - { v: "0", k: "proiecte de implementare: se importă datele, se rulează primul program" }
service: "automatizari"
order: 2
footnote: "ProQ este un produs BitUp Technology. Clienții ProQ nu sunt numiți în acest studiu de caz; referințele cu nume se oferă la cerere, cu acordul lor."
metaTitle: "ProQ: platformă pentru furnizorii din auto · BitUp"
metaDescription: "Platforma construită pentru furnizorii din industria auto: 29 de module, folosite în România, Mexic, India și China. Găzduită de noi sau pe serverele lor."
draft: false
---

## Situația

### Toți furnizorii auto rulează același proces. Puțini au un sistem pentru el.

Un furnizor din industria auto trebuie să demonstreze clientului, pentru fiecare reper nou, că procesul lui e sub control: planificare APQP, analiză de riscuri (FMEA), plan de control, studii de măsurare (MSA), control statistic (SPC), dosar PPAP. Aceleași faze, aceleași porți, aceleași documente, la fiecare fabrică din lume.

În practică, procesul trăiește în zeci de fișiere Excel care nu vorbesc între ele, sau într-o platformă generică pe care fiecare firmă trebuie s-o configureze luni de zile înainte s-o folosească. Documentele se scriu după ce s-a făcut treaba, nu în timp ce se face, iar la audit se descoperă golurile.

ProQ a ieșit din munca reală într-o fabrică, nu dintr-un studiu de piață: am construit sistemul care implementează procesul așa cum e, în loc să ceară clientului să și-l construiască singur.

## Ce am construit

### Procesul, livrat ca software

Fazele, porțile, livrabilele și scalele de evaluare sunt fixate în cod, nu în setări per companie. Nu e nimic de configurat: importă un plan de control și rulează un program prin porți.

- **Instrumentele de bază.** Programe APQP, diagramă de flux de proces, FMEA (de proces și de proiectare), plan de control, PPAP și PSW, MSA, metrologie, SPC. Fiecare document îl construiește pe următorul: flux → PFMEA → plan de control → inspecție și studii de gage → dosarul PPAP.
- **Asigurarea calității.** Inspecție în proces, run at rate, plan de lansare sigură, studiu de capacitate, audit de predare către producție. Înregistrările se creează făcând treaba, nu documentând-o retroactiv.
- **Monitorizare și conformitate.** Reclamații 8D, pre-audit și pregătire, cerințe specifice ale clientului, controlul schimbărilor, ambalare, certificate de conformitate. Golurile sunt vizibile, nu ascunse.
- **Management și operațiuni.** Dashboard de portofoliu, obiective KPI, tablă SQDCM, ședință zilnică și revizuirea porților, încărcare și sarcini, lean, urmărirea costurilor și COPQ, rapoarte, alerte și calendar.
- **Firul digital.** Pe fiecare caracteristică, de la un capăt la altul: operație → mod de defectare → punct de control → instrument de măsură → capabilitate. Fiecare verigă e verde, galbenă sau roșie, cea mai slabă prima, iar studiul lipsă se creează cu un click.
- **Roluri și AI Assist.** Cinci roluri cu aprobări separate (administrator, manager de program, calitate, membru, cititor); un cititor nu schimbă nimic, nicăieri. Asistență AI pentru redactare și explicații; statisticile vin din cod, nu din modele de limbaj.

## Cifre

### Ce înseamnă un produs, nu un proiect

ProQ e întreținut ca produs: aceeași versiune la toți clienții, actualizări incluse în abonament, inclusiv când se schimbă metodologia.

## Cum e operat

### Găzduit de BitUp sau pe serverele clientului

- **Aceeași imagine, două moduri de livrare.** ProQ rulează ca un container cu o bază de date PostgreSQL alături, fie în infrastructura BitUp, fie pe serverele clientului, pentru cei care nu vor ca datele să le părăsească rețeaua. Imaginea, schema bazei de date și actualizările nu se plătesc separat.
- **Izolarea datelor între companii e în arhitectură, nu într-un filtru.** Fiecare înregistrare aparține unei companii, iar fiecare interogare e limitată la compania utilizatorului printr-o clasă de bază pe care o moștenește fiecare model.
- **Fără dependențe externe la rulare.** Aplicația e randată pe server, fără pas de build, cu toate componentele incluse; nicio cerere către CDN-uri terțe.
- **Backup, retenție și rezidența datelor** sunt scrise în contractul de găzduire, nu pe o pagină de marketing.
- **Suport pe email, de la oamenii care au scris codul.** Fără nivel 1 care citește dintr-un script.

## Ce dovedește

### De ce contează pentru firma ta

Când BitUp propune unei firme un software la comandă sau o automatizare, nu propune o idee. Am construit, lansat și operăm un produs pe care îl folosesc zilnic ingineri de calitate din patru țări, într-o industrie în care fiecare document se auditează. Același mod de lucru îl aducem în proiectele mai mici: procesul în cod, nu în configurări; înregistrări create în timpul lucrului; erori vizibile, nu tăcute; și răspundem de rulare, nu ne oprim la livrare.

Detalii, module și prețuri: [pro-q.ro](https://pro-q.ro).
