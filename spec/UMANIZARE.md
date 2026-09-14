# UMANIZARE.md — raportul trecerii prin filtrul „umanizare-ro”

Tot conținutul din `continut/` a trecut, pe 10 septembrie 2026, prin skill-ul `umanizare-ro` (listele A–E din SKILL.md), în două etape, apoi printr-o a treia, după completarea placeholder-elor și adăugarea paginilor legale:

1. **Scanare mecanică de vocabular** (listele A și E, artefacte C): 150 de termeni și construcții căutate în toate fișierele. Rezultat: 4 corecții (un „nu doar… ci”, un „face diferența”, un „nu doar pentru livrare”, un „Nu vei avea surprize”).
2. **Audit independent de structură și voce** (listele B, C, D), făcut de un al doilea agent care nu scrisese textul, cu rulebook-ul în față. Rezultat: 37 de constatări, 34 aplicate. Tipurile cele mai frecvente: propoziții de peste 40 de cuvinte cu enumerări pe punct și virgulă (10), deschideri de tip „Ce fac eu:” / „Ce include:” (6), aforisme de tip „nu e X, e Y” (4), concluzii moralizatoare la final de secțiune (4), amestec „tu / voi” (2), dubluri de idei între secțiuni (3), o cifră fără sursă („zeci de mii de firme pe zi”, scoasă), o afirmație de verificat („contract de o pagină și jumătate”, generalizată în „contract scurt”).
3. **A treia trecere, pe textul nou** (paginile legale 13–15, bannerul de consimțământ, textele cu valorile completate, `assets/FOTO-CONTEXT.md`): scanare mecanică plus propoziții de peste 28 de cuvinte. Rezultat: 6 corecții (un „În plus,”, un „de asemenea”, patru propoziții lungi împărțite). Paginile legale rămân, deliberat, mai „scrise” decât restul site-ului: sunt texte pe care le citește cineva care caută o informație anume, nu un patron care decide dacă sună; păstrează însă „tu”, verbele active și zero limbaj de broșură.

Neaplicate, deliberat (3): tripleta „aveau tehnologie, dar nu aveau structură; aveau furnizori, dar nu aveau un partener; aveau inițiative de digitalizare, dar nimeni nu-și asuma imaginea de ansamblu” de pe Despre e formularea lui Marius din chestionar, se păstrează; „firme mici din Cluj” la plural e corect (două firme în traseu); „RTO end-to-end” e termenul din contract.

Ce a rămas și e intenționat: fragmente scurte în hero-uri și titluri; ghilimelele «…» pentru replicile tipice ale clienților; forme orale cu măsură („nu-i”, „ăsta”), mai puține decât în video; câteva antiteze „X, nu Y” pe homepage și pe pagina de securitate, rărite, nu eliminate, pentru că sunt felul în care vorbește Marius.

Scor final estimat: sub 3 pattern-uri pe pagină, în ținta din skill.

## Versiunea în engleză (`continut-en/`)

Nu e o traducere cuvânt cu cuvânt, ci aceeași pagină scrisă în engleză, de patru agenți în paralel, cu un brief comun: glosar fix (Radiografie IT → IT Health Check, abonament → subscription, „răspunde de” → „answers for”, Cipri și BitUp Helpdesk neschimbate), harta rutelor și ancorelor, ortografie americană, aceeași persoană („I” pentru ce face Marius, „we” pentru BitUp, „you” la singular), și o listă de pattern-uri AI din engleză interzise (delve, leverage, seamless, robust, ensure, streamline, „it's not X, it's Y” adăugat, „moreover/furthermore”, întrebări retorice cu răspuns, tripletă adăugată, em dash). Verificare mecanică după scriere: zero cuvinte din lista interzisă, zero rute românești rămase, zero semne de exclamare, structura secțiunilor identică cu originalul. Lungimea a ieșit la paritate sau cu 1–5% mai scurtă în caractere; în cuvinte e uneori mai lungă, pentru că româna lipește articolele de cuvânt („raportul” = „the report”).

Decizii de traducere care merită știute: „Am primit. Te sun eu.” → „Got it. I'll call you.”; „Recunoști situația?” → „Sound familiar?”; „Trei lucruri, făcute până la capăt” → „Three things, seen through to the end”; „Trei formule” (FAQ) → „Three options”; „dosar de omologare” (ProQ) → „part approval file”; „administrator” (titlul lui Cosmin) → „managing director”; „vreau ticket” (fraza pe care o recunoaște Cipri) → „I want a ticket”; „Calculatoare, UTCN” → „Computer Science, Technical University of Cluj-Napoca”; „5 minute de citit” → „5 min read”.

## Pentru Claude Code

Textul e final, în ambele limbi. Nu se rescrie, nu se „îmbunătățește”, nu se scurtează ca să încapă și nu se traduce nimic la build. Dacă un text nu încape într-o componentă, se schimbă componenta.

## Pentru Marius

Textul e scris în vocea din chestionar și din discuțiile noastre, dar e al meu, nu al tău. Ca la scripturi: citește-l cu voce tare, taie ce n-ai spune, și trimite-mi versiunea ta. Ce schimbi intră în profilul de stil și următoarele texte vin mai aproape. Pentru engleză, aceeași regulă: dacă vorbești altfel cu clienții străini, spune-mi cum și ajustăm.

Lucruri pe care le-am scris din deducție și trebuie confirmate de tine înainte de publicare (în afara placeholder-elor `[[…]]`):
- Homepage § 2: cele trei replici („Avem un băiat care se pricepe…”, „Avem trei furnizori…”, „Avem backup. Cred.”) sunt compuse din obiecțiile din chestionar, nu citate reale.
- Suport IT § Cloud: „Am clienți cu tot în Microsoft 365 și niciun server în birou, și clienți care au nevoie de un server local” — confirmă că e adevărat.
- Suport IT § Echipamente: „Lucrez cu Fortinet pentru firewall-uri, Synology pentru NAS-uri, Microsoft pentru licențe” — din SOW și din LinkedIn, confirmă.
- Suport IT § FAQ: „preaviz de o lună”, „primești toată documentația… în 30 de zile” — trebuie să fie ce scrie în contractul tău.
- Suport IT, Cum lucrăm, Suport: „prin contract răspundem în mai puțin de două ore; media reală din helpdesk e sub 30 de minute” — din răspunsul tău; media reală se schimbă în timp, verific-o la câteva luni.
- Cum lucrăm § Planul: „într-o săptămână după radiografie primești planul” — angajament de ținut.
- Cum lucrăm § Preluarea: „nu plecăm din luna 1 fără o restaurare reușită” — angajament.
- Securitate § Incidente: „Dacă ai un incident acum și nu ești client, sună. Răspundem” — angajament public.
- Automatizări § Ce construim: „API-urile aplicațiilor voastre și, când trebuie, cod”, „modele rulate la noi când datele sunt sensibile” — confirmă că oferi asta.
- Automatizări § Ce nu construim: „aplicații mobile native, site-uri de prezentare, magazine online” — confirmă lista.
- Despre § Traseul: anii și descrierile sunt din LinkedIn; „2026 · BitUp, full-time” e dedus din faptul că rolul Concentrix s-a încheiat în iunie 2026.
- Confidențialitate: „office@bitup.ro e în Microsoft 365”, „căsuța de email are autentificare în doi pași”, „12 luni păstrare pentru cererile fără contract” — confirmă sau spune-mi valorile reale.
- Cookies: rândul cu `__cf_bm` (Cloudflare) rămâne doar dacă activezi Bot Fight Mode.
- Suport (EN): Cipri trebuie să recunoască și „I want a ticket”, nu doar „vreau ticket”; dacă nu, spune-mi și punem fraza românească și pe pagina engleză.

Adăugate la 14 septembrie 2026, odată cu trecerea vocii la persoana I plural (afirmații despre firmă, pe care trebuie să le poți susține la telefon):
- Cum lucrăm § FAQ „Câți oameni sunt în spatele BitUp?”: „un nucleu mic și colaboratori pe specialități: tehnicieni locali unde e nevoie de cineva la fața locului în afara Clujului, dezvoltatori pentru partea de software”; „fiecare client are documentația lui, accesele sunt înregistrate, tichetele și rapoartele sunt în platformă”; „primești tot în 30 de zile, scris în contract” — confirmă că descrie firma reală și contractul real (și în EN).
- Securitate § NIS2 / ISO 27001: „De unde știm: experiența de securitate cu care a venit fondatorul, doi ani și jumătate de audituri ISO 27001, interne și externe, într-o corporație din Fortune 500” — experiența e atribuită explicit fondatorului, nu unei echipe; confirmă formularea (și în EN).
