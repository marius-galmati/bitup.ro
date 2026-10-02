---
name: design-loop
description: Bucla obligatorie de lucru pentru orice schimbare vizuală din bitup-site — pagină nouă, secțiune nouă, componentă, tokeni, tipografie, spațiere, culoare, probă de stil. Spune ce citești înainte să desenezi, cum verifici cu ochii tăi, și ce tipare sunt interzise. Invoc-o înainte să scrii primul rând de CSS.
---

# Bucla de design pentru bitup-site

## 0. Înainte de primul rând de CSS

Două lucruri, în ordinea asta, de fiecare dată:

1. **Invocă skill-ul `frontend-design`.** E instalat (`frontend-design@claude-plugins-official`). Conține lista Anthropic cu tiparele după care se recunoaște un design generat de model — listă care nu e în `CLAUDE.md` și pe care ai lovit-o deja o dată (17 septembrie 2026: trei probe de stil respinse, patru tipare din cinci; vezi `NOTES.md`). Nu presupune că ții minte ce scrie în el. Îl invoci și îl citești.
2. **Citește `referinte/README.md`, dacă există.** Acolo stau capturile de secțiuni care îi plac lui Marius, cu o propoziție lângă fiecare. Alea sunt briefingul vizual real. Dacă folderul nu există, **nu inventa direcția** — întrebi.

## 1. Spec-ul e briefingul, și bate orice altceva

`spec/DESIGN.md`, `spec/continut/`, `spec/continut-en/` și `CLAUDE.md` sunt sursa de adevăr. Unde spec-ul fixează o valoare, o respecți la literă, chiar dacă `frontend-design` ar sugera altceva — skill-ul însuși spune că briefingul câștigă.

Corolarul, care e ușor de uitat: `DESIGN.md` conține deja câteva lucruri care sunt pe lista de tipare generice a skill-ului (eyebrow cu majuscule deasupra fiecărui titlu, șiruri legate cu punct median, `→` pe linkuri). **Alea rămân** — sunt decizii luate, nu accidente. Nu le „repari” și nu le extinzi: nu adaugi eyebrow-uri, puncte mediane sau mono unde spec-ul nu le cere deja.

Nu modifici nimic în `spec/`. Dacă o schimbare de design cere schimbarea spec-ului, o scrii în `NOTES.md` și întrebi.

## 2. Bucla de verificare — nu se sare peste ea

```
build → capturi → te uiți la ele cu Read → repari → build
```

1. `npm run build`. Zero erori, zero avertismente.
2. Capturi cu `node qa/capture.mjs <faza> <cale>…` — 375, 768, 1024 și 1440 px, light și dark, RO și EN. Serverul trebuie să ruleze.
3. **Deschizi fiecare captură cu Read și te uiți la ea.** Generarea capturilor nu e verificare. Un titlu rupt în șase rânduri, o coloană de 200 px, un chenar lipsă — astea se văd doar dacă te uiți.
4. Repari ce ai văzut. Reiei de la 1.
5. `npx astro check`: 0 erori / 0 avertismente / 0 sugestii.
6. Consola browserului: zero erori, zero răspunsuri 4xx, zero cereri către alt domeniu decât `localhost` (scriptul de capturi le raportează).
7. Contrast, numeric, nu din ochi: `python qa/contrast.py`, sau aceeași formulă pentru perechi noi. Tot ce e text trece AA (4,5:1). Dacă introduci un token nou de culoare, îi calculezi raportul **înainte** să-l scrii în CSS.
8. Tastatură: fiecare element interactiv se atinge cu Tab, are focus vizibil, meniul mobil se închide cu Esc.

## 3. Reguli de desen care s-au dovedit necesare aici

- **Nimic inventat.** Toate distanțele din scara `--s-1` … `--s-9` și `--section-y`; toate culorile din `tokens.css`. Nicio valoare scrisă direct în componentă.
- **Numerotare (01/02/03) doar pentru secvențe reale.** Cei patru pași din „Cum lucrăm” sunt o secvență. Cele trei servicii nu sunt. Regula e din `frontend-design` și e ușor de încălcat fără să observi.
- **Îndrăzneala se cheltuie într-un singur loc pe pagină.** Un element memorabil, restul disciplinat. Dacă două secțiuni se ceartă pentru atenție, una dintre ele e greșită.
- **Nu toate secțiunile la fel.** Dacă patru secțiuni la rând au același tipar (cap de secțiune, apoi rânduri cu linie de păr), ai căzut în mirosul #10 din `CLAUDE.md`, chiar dacă fiecare secțiune în parte arată bine.
- **Majusculele vin numai din CSS.** Textul sursă (spec și `src/copy/`) rămâne în sentence case; h1, h2 și eyebrow se afișează
  cu majuscule din `text-transform`. Nu scrii niciodată majuscule în text — e mirosul 9. (Regula veche, „sentence case peste tot,
  inclusiv în titluri”, a picat odată cu `DESIGN.md` din 26 septembrie 2026.)
- **Textul nu se atinge.** Dacă un text nu încape, schimbi componenta.

## 4. Capcane tehnice, verificate în repo-ul ăsta

- **`astro dev` și `astro preview` pornesc detașat** (Astro 7): comanda iese imediat, serverul rămâne. Opriri: `astro dev stop`, `astro preview stop`. Portul scris în log nu e neapărat cel cerut — pe mașina asta 4322 era ocupat de alt proiect și preview-ul a sărit pe 4323. **Verifică `<title>`-ul înainte să faci capturi**, altfel fotografiezi alt site.
- **Serverul de dev servește CSS vechi** după o editare de stil. S-a întâmplat de trei ori într-o singură zi, iar a treia oară Marius a văzut pe ecranul lui exact ce credeam că am reparat: markup-ul era nou, regula CSS era veche, deci un `path` în formă de V a ieșit umplut portocaliu, ca un triunghi.
  **Regula: după orice schimbare de CSS, oprești și repornești serverul de dev (`astro dev stop`, apoi `npm run dev`) înainte să-i spui lui Marius să dea reload.** Și verifici pe `dist/` (build + preview), nu doar pe dev.
- **Serverul pe care îl lași pornit pentru Marius trebuie să fie vizibil în rețea.** El se uită de pe altă mașină, prin `temp.bitup.ro`. Pe 24 septembrie 2026 n-a putut intra pentru că serverul asculta pe `[::1]`; pe 2 octombrie s-a repetat, fiindcă pentru capturi pornisem `npm run preview` fără `--host` și l-am lăsat așa. De atunci `preview` are `--host` în `package.json`, deci se leagă oricum de `0.0.0.0`. Înainte să-i spui „gata, uită-te”, verifică: `netstat -ano | grep 4321` trebuie să arate `0.0.0.0`, nu `[::1]`.
- **Dev-ul ascultă pe `[::1]`, nu pe `127.0.0.1`.** `curl http://localhost:4321` întoarce 000; folosește `http://[::1]:4321`.
- **`max-width` în `ch` se calculează din fontul elementului pe care îl pui.** Pe un container cu text de 19 px, `24ch` înseamnă ~216 px, nu lățimea titlului de 50 px. Pune-l pe `h2`, nu pe wrapper.
- **Astro pune stilurile mai multor variante ale aceleiași rute în același fișier CSS.** Un `<style is:global>` dintr-o componentă folosită de o singură variantă ajunge și pe celelalte. Dacă ai nevoie de tokeni doar pentru o variantă, leagă-i de un selector care există doar acolo (`:root:has(.clasa-variantei)`), și verifică în `dist/`.
- **Playwright se rulează din rădăcina proiectului** (altfel nu-și găsește pachetul), iar Git Bash rescrie argumentele care încep cu `/`: dă căile fără slash inițial, ca în `qa/capture.mjs`.
- **Specificitatea e capcana numărul unu din repo-ul ăsta.** Trei forme, toate întâlnite pe 20 septembrie 2026, într-o singură componentă: (1) `:has()` ia specificitatea argumentului, deci `X:has(.a:hover) .a` cântărește mai mult decât `X .a:hover` și estompează și elementul de sub cursor; (2) un bloc `@media (prefers-reduced-motion: reduce)` cu selectori mai scurți decât regulile pe care vrea să le anuleze nu anulează nimic — acolo `!important` e corect, e comutator de oprire; (3) **Astro compilează `> *` în `> [data-astro-cid-…]`**, care are specificitate de atribut, deci `.parinte > *` bate `.copil`. Scrie selectorii pe nume și verifică în CSS-ul din `dist/`, nu în sursă.
- **`:has()` nu se reinvalidează la `:focus-visible` în Chromium.** `element.matches(':has(.x:focus-visible)')` întoarce `true`, dar stilul rămâne cel vechi. Pentru tastatură folosește `:focus-within` pe strămoș.
- **Heredoc-ul din unealta Bash colapsează backslash-urile**, chiar și cu delimitator ghilimelat (`<<'EOF'`). Un `\\00` scris într-un script Python ajunge `\00`, adică octalul pentru NUL: pe 18 septembrie 2026 un astfel de octet a ajuns în `NOTES.md` și `grep` a început să raporteze fișierul ca binar. Când ai nevoie de un backslash într-un script trimis prin heredoc, construiește-l din cod (`bytes([92])`), sau scrie fișierul cu unealta Write și rulează-l separat.
- **Scripturile de unică folosință** se scriu în directorul de scratchpad al sesiunii, nu în repo. Dacă trebuie totuși rulate din rădăcină, le ștergi imediat după.

## 5. Ce raportezi la final

Fără adjective. Ce ai făcut, ce ai verificat, cu ce cifre, ce placeholder-e au rămas, ce întrebări ai. Capturile pe care te-ai uitat, nu doar cele pe care le-ai generat. Dacă ceva n-a mers, spui ce anume și arăți output-ul.
