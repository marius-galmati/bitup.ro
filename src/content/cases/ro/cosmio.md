---
title: "Cosmio: o platformă de contabilitate în cloud, cu backup, replicare și plan de recuperare, de la un singur partener"
client: "Cosmio Fintech SRL"
kicker: "Cloud, backup și disaster recovery"
summary: "Cosmio este o platformă de contabilitate automatizată pentru SRL-uri din servicii. Din martie 2026, BitUp găzduiește, protejează și operează infrastructura ei de producție, în abonament lunar, cu obiective de recuperare scrise în contract și testate trimestrial."
logo: "/logos/cosmio.svg"
logoDark: false
facts:
  - { k: "Client", v: "Cosmio Fintech SRL" }
  - { k: "Domeniu", v: "Fintech · contabilitate automatizată (SaaS)" }
  - { k: "Servicii", v: "Hosting cloud gestionat, backup, disaster recovery, operare și mentenanță" }
  - { k: "Din", v: "Martie 2026, abonament lunar" }
  - { k: "Date", v: "Exclusiv în UE: producție în Cluj-Napoca, DR în Germania" }
numbers:
  - { v: "≤ 4", unit: "ore", k: "RPO: pierderea maximă de date admisă, aliniată replicării la 4 ore" }
  - { v: "≤ 15", unit: "min", k: "RTO tehnic: serverul pornit din replica de DR" }
  - { v: "1–2", unit: "ore", k: "RTO end-to-end: aplicația funcțională și validată de client după failover" }
  - { v: "24/7", k: "Acoperire pentru incidente critice: răspuns sub o oră, rezolvare sub 4 ore" }
  - { v: "4", unit: "/ an", k: "Teste de disaster recovery, izolate, fără oprirea producției, cu raport aprobat de client" }
service: "securitate"
order: 1
footnote: "Studiu de caz publicat cu acordul Cosmio Fintech SRL. Nu conține detalii despre configurația internă a sistemelor clientului, date personale sau valori contractuale. Cosmio poate cere oricând retragerea lui."
metaTitle: "Cosmio: cloud, backup și disaster recovery · BitUp"
metaDescription: "Cum am mutat platforma Cosmio în cloud administrat, cu backup testat și replicare într-un al doilea datacenter. Date exclusiv în UE, firewall administrat."
draft: false
consent: "acord primit 2026-10-02 (de înlocuit cu data din documentul semnat)"
---

## Situația

### O platformă care nu-și permite să piardă date

Cosmio ține contabilitatea la zi pentru firmele clienților săi. Dacă platforma se oprește sau pierde date, se opresc și clienții ei. Echipa Cosmio construiește produsul; nu vrea să construiască și un departament de infrastructură.

Cerințele au fost clare de la început: datele să rămână în Uniunea Europeană, datacenterele să fie certificate ISO/IEC 27001, obiectivele de recuperare (cât timp și câte date pot fi pierdute) să fie scrise, măsurate și testate, iar responsabilitatea pentru toată infrastructura să stea la un singur partener.

## Ce am livrat

### Totul inclus, operat de BitUp

Nu am vândut componente. Am preluat responsabilitatea pentru întreg lanțul: de la serverul pe care rulează aplicația până la testul care dovedește că se poate reveni după un dezastru.

- **Hosting cloud gestionat.** Servere virtuale de producție (Windows și Linux) într-un datacenter din Cluj-Napoca certificat ISO/IEC 27001, pe stocare NVMe în oglindă. BitUp operează platforma de virtualizare și stocarea, cu resurse garantate.
- **Deployment și migrare.** Instalarea și securizarea sistemelor de operare, instalarea și configurarea bazei de date PostgreSQL, deploy-ul aplicației și conectarea ei la baza de date, migrarea unui server existent. Parametrii critici documentați pentru operare și restaurare.
- **Backup local, testat.** Backup la nivel de imagine pentru toate serverele, pe stocare dedicată în oglindă, cu retenție zilnică pe 7 zile și puncte suplimentare la 14, 30 și 90 de zile. Restaurarea a fost testată la punerea în funcțiune, nu presupusă.
- **Disaster recovery off-site.** Replicare cu Veeam la fiecare 4 ore într-un al doilea datacenter, în Germania, certificat ISO/IEC 27001, cu trei puncte de restaurare păstrate. Failover și failback operate de BitUp, cu un punct de acces temporar pus la dispoziție în caz de dezastru.
- **Securitate integrată.** Firewall și acces restricționat strict la porturile necesare, transport criptat între cele două locații (WireGuard, ChaCha20/Poly1305), sisteme de operare securizate și actualizate în ferestre de mentenanță anunțate, cu patching de urgență pentru vulnerabilități critice.
- **Operare și mentenanță.** Monitorizarea zilnică a joburilor de backup și replicare, suport la incidente pe niveluri de severitate, test de disaster recovery în fiecare trimestru cu raport scris, runbook de recuperare, evidențe operaționale și un singur canal de comunicare: BitUp Helpdesk.

## Angajamente

### Cifre scrise în contract, nu în broșură

Fiecare obiectiv de mai jos e definit în contract, măsurat la fiecare test și raportat clientului.

## Cum lucrăm

### Responsabilități clare, decizii documentate

- **BitUp răspunde de infrastructură:** servere, stocare, backup, replicare, failover și failback, securitatea transportului, actualizări, evidențe.
- **Cosmio răspunde de aplicație și date:** validează funcțional după orice restaurare sau failover și aprobă schimbările care ating obiectivele de recuperare.
- **Orice schimbare importantă trece printr-o cerere de schimbare** cu impact, risc, plan de implementare și plan de revenire, aprobată de client înainte.
- **Decizia de failover se ia împreună**, se consemnează în tichet, iar în cazurile critice BitUp e autorizat să acționeze imediat și să documenteze.
- **Un singur canal:** BitUp Helpdesk, cu trasabilitate completă pentru fiecare incident, restaurare și test.

## Rezultat

### Ce s-a schimbat pentru Cosmio

Echipa Cosmio știe, în scris, câte date poate pierde în cel mai rău caz și în cât timp revine platforma. Backup-ul nu mai e o presupunere: e testat la fiecare trimestru, cu raport. Iar când apare o problemă, există un singur număr de sunat și un singur responsabil.

> [[CITAT_COSMIN]]
> — Cosmin Cenan, administrator, Cosmio Fintech SRL
