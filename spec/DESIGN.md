# DESIGN.md — sistemul de design

Direcția: **calm, precis, enterprise, uman.** Un site pe care un patron de firmă îl deschide și simte că a intrat într-un birou ordonat, nu într-un pliant. Puțină culoare, multă lumină, tipografie care ține pagina, fotografie reală (Marius, birou, echipamente), diagrame doar unde explică ceva. Nimic din ce se vede pe orice alt site de IT: fără rețele de puncte pe fundal, fără gradienturi violet, fără iconițe-scut generice, fără carusel de logo-uri, fără contoare animate.

Site-ul are două teme: **light** (implicită pentru cine nu are preferință de sistem) și **dark**. Aceeași structură, aceleași componente, aceeași ierarhie; doar tokenii se schimbă. Dark mode nu e „light inversat”: fundalul e navy foarte închis cu tentă teal, nu negru, iar orange rămâne singurul accent cald. Detalii la § Dark mode. Site-ul e bilingv (RO/EN); designul e identic în ambele limbi, iar componentele trebuie să încapă și textul englez, care e de obicei cu 10–15% mai scurt, și pe cel român, care e mai lung.

## Tokeni (`src/styles/tokens.css`)

```css
:root {
  /* brand (din logo) */
  --navy: #00202E;        /* text de titlu, fundaluri închise */
  --navy-2: #003343;      /* iconul din logo, hover pe navy */
  --teal: #20686C;        /* acțiune principală, linkuri, accente */
  --teal-2: #4A9396;      /* accente secundare, eyebrow pe fundal închis */
  --teal-soft: #E3EFEF;   /* fundaluri de evidențiere, citate */
  --orange: #FE982A;      /* UN SINGUR rol: butonul principal de CTA (Radiografie) și, rar, un marcaj de atenție */

  /* neutre, cu tentă rece spre teal (nu gri pur) */
  --bg: #F5F8F8;          /* fundalul paginii */
  --surface: #FFFFFF;     /* carduri, header, footer */
  --surface-2: #EAF0F0;   /* benzi alternative, fundal de cod */
  --line: #D6E0E1;        /* borduri */
  --text: #14232A;        /* text curent */
  --muted: #55686F;       /* text secundar, legende */
  --ok: #2E7D5B; --warn: #C97A12; --crit: #B4432F;  /* doar pentru semafor (Radiografie) și stări de formular */

  /* tipografie */
  --font-display: "IBM Plex Sans Variable", "Segoe UI", system-ui, sans-serif;
  --font-body: "IBM Plex Sans Variable", "Segoe UI", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, Menlo, monospace;

  /* scară de tip (desktop; pe mobil se reduc cu clamp) */
  --fs-hero: clamp(34px, 4.6vw, 52px);
  --fs-h1: clamp(30px, 4vw, 44px);
  --fs-h2: clamp(24px, 2.8vw, 30px);
  --fs-h3: 19px;
  --fs-body: 17px;
  --fs-lead: 20px;
  --fs-small: 14.5px;
  --fs-eyebrow: 12.5px;

  /* spațiere (bază 8) */
  --s-1: 4px; --s-2: 8px; --s-3: 12px; --s-4: 16px; --s-5: 24px; --s-6: 32px; --s-7: 48px; --s-8: 64px; --s-9: 96px;
  --section-y: clamp(48px, 7vw, 96px);

  /* layout */
  --container: 1120px;
  --container-narrow: 760px;   /* text lung: ~70ch la 17px */
  --radius: 4px;               /* mic, deliberat; nu rotunjim totul */
  --radius-lg: 8px;            /* doar caseta de logo, banda de CTA și bannerul de consimțământ */
  --shadow: 0 1px 2px rgba(0,32,46,.06), 0 8px 24px rgba(0,32,46,.06); /* doar pe elementele ridicate: meniul mobil, formularul, bannerul de consimțământ. Nu pe header. */

  /* suprafețe navy (CtaBand, hero de studiu de caz, NumberTiles) — au tokeni proprii ca să poată fi ridicate în dark */
  --navy-surface: var(--navy);
  --navy-surface-2: var(--navy-2);
  --on-navy: #FFFFFF;
  --on-navy-muted: #C9D8DB;

  color-scheme: light dark;
}
```

## Dark mode

Paleta dark, în `:root[data-theme="dark"]` și în `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }` (implementarea e în `ARHITECTURA.md` § Dark mode):

```css
  --bg: #0C181D;          /* navy foarte închis, cu tentă teal; nu negru */
  --surface: #12232A;     /* carduri, header, footer */
  --surface-2: #182E36;   /* benzi alternative */
  --line: #274047;        /* borduri */
  --text: #E4ECEE;        /* text curent (nu alb pur) */
  --muted: #9FB3B8;       /* text secundar */
  --teal: #5FB0B4;        /* linkuri și accente: teal-ul de light (#20686C) nu are contrast pe fundal închis */
  --teal-2: #7CC4C7;
  --teal-soft: #16323A;   /* fundal de citat */
  --navy: #E4ECEE;        /* ATENȚIE: în dark, „navy” ca rol de text de titlu devine text deschis; blocurile navy folosesc --navy-surface */
  --navy-2: #CFDDE0;
  --navy-surface: #0F2A36;   /* CtaBand, hero de caz: ușor mai deschis decât fundalul, cu bordură 1px --line */
  --navy-surface-2: #163845;
  --on-navy: #FFFFFF;
  --on-navy-muted: #B9CCD0;
  --orange: #FE982A;      /* neschimbat; text pe buton rămâne #00202E */
  --ok: #4CAF82; --warn: #E0983A; --crit: #E06A54;
  --shadow: none;         /* în dark, ridicarea se face cu bordură, nu cu umbră */
```

Reguli:
- Titlurile folosesc `--navy` ca rol („culoarea titlurilor”), nu ca valoare; de aceea tokenul se schimbă în dark. Blocurile cu fundal navy (CtaBand, hero-ul din studiile de caz, NumberTiles) folosesc `--navy-surface` / `--on-navy`, ca să rămână închise și în dark, ușor ridicate față de fundal.
- Butonul principal rămâne orange cu text `#00202E` în ambele teme; e singurul element identic.
- Fotografiile nu se modifică (fără filtre, fără `opacity`); capturile de ecran primesc bordură `--line` și, în dark, `filter: brightness(.92)` ca să nu ardă.
- Logo-ul are două variante (`logo-bitup.svg` / `logo-bitup-dark.svg`); badge-urile partenerilor, monocrom `--muted` în ambele teme.
- Contrast: toate combinațiile din dark trec AA (text `#E4ECEE` pe `#0C181D`; `--muted` pe `--surface`; `--teal` `#5FB0B4` pe `#12232A`). Claude Code verifică cu un instrument de contrast, nu din ochi.
- Comutatorul de temă e în header, la dreapta comutatorului de limbă; e un buton cu iconiță (soare/lună), fără text, cu `aria-label` și tooltip nativ (`title`). Pe mobil e în meniul deschis, jos, lângă limbă.
- Fără tranziție animată de culoare la comutare (produce pâlpâit pe pagini lungi); schimbarea e instantanee.

## Tipografie

- **Display (titluri, butoane, eyebrow, meniu):** IBM Plex Sans (variabil), greutate 600 la titluri și butoane, `letter-spacing: -0.015em` la h1 și `-0.01em` la h2, `text-wrap: balance` pe toate headingurile. Aceeași familie ca textul curent: o singură voce tipografică, clară, fără caracter „de pliant”; ierarhia vine din mărime și greutate.
- **Body:** IBM Plex Sans (variabil), 400 și 600, 17 px / 1.6. Lățime maximă a textului curent: 70 de caractere (`--container-narrow`).
- **Mono:** IBM Plex Mono, doar pentru: eyebrow-uri (uppercase, `letter-spacing: .08em`), cifre în benzi de fapte, coduri (headere, URL-uri) în pagini tehnice.
- Ierarhie: un `h1` per pagină; `h2` pentru secțiuni; `h3` în carduri. Fără `h4` în paginile de marketing.
- Titluri în „Sentence case”, niciodată Title Case, niciodată toate majuscule (excepție: eyebrow-urile).
- Cifre: `font-variant-numeric: tabular-nums` oriunde stau în coloană.

## Culoare, în practică

- Pagina e deschisă: `--bg` cu secțiuni alternante `--surface` / `--surface-2`.
- Navy pe: titluri, hero-ul din studiile de caz, banda finală de CTA, footer (text pe `--surface`, nu footer închis).
- Teal pe: linkuri, butoane secundare, eyebrow-uri, bordura superioară a cardurilor (3 px), marcajele din pași.
- Orange doar pe butonul principal „Radiografie IT gratuită” (fundal orange, text navy). Într-o pagină apare de maximum trei ori (header, hero, banda finală). Dacă orange apare în altă parte, e greșit.
- Semafor (`--ok/--warn/--crit`) doar în exemplul de raport de pe pagina Radiografie și în stările formularelor.

## Layout

- Container 1120 px, gutter 20 px pe mobil, 32 px pe desktop.
- Secțiuni cu `padding-block: var(--section-y)`; o linie de 1 px `--line` între secțiuni pe fundal alb, fără linie când fundalul se schimbă.
- Grid-uri: carduri pe `repeat(auto-fit, minmax(280px, 1fr))`; pași pe `minmax(200px, 1fr)`; benzi de fapte pe `minmax(170px, 1fr)`. Pe telefon totul curge pe o coloană.
- Secțiunile cu text lung folosesc modelul „două coloane”: eyebrow în stânga (240 px, sticky pe desktop), conținut în dreapta, lățime 70ch.
- Nicio secțiune nu depinde de scroll pentru a fi vizibilă; nimic parcat la `opacity: 0`.

## Componente

**Header.** Fundal `--surface`, 64 px, linie jos. Stânga: logo BitUp (SVG, 132 px lățime; tagline-ul „Build Innovative Technology” e parte din logo; varianta dark pe temă închisă). Centru-dreapta: Servicii ▾ (dropdown cu cele 3 grupuri + „Toate serviciile”), Cum lucrăm, Rezultate, Despre, Blog. Dreapta, în ordinea asta: telefonul ca link `tel:` (mono, `--muted`), comutatorul de limbă (`RO · EN`, mono 12.5 px, limba curentă în `--text` 600, cealaltă în `--muted`, link către pagina pereche), comutatorul de temă (buton 36×36 cu iconiță), butonul orange „Radiografie IT gratuită”. Sub 1024 px: buton hamburger; meniul mobil e un panou full-height cu aceleași linkuri, butonul de Radiografie sus, telefon, WhatsApp, limbă și temă jos. Header-ul nu e sticky pe mobil (ocupă spațiu); pe desktop e sticky, cu linia de jos de 1 px `--line` în ambele teme, fără umbră. Între 1024 și 1200 px telefonul se ascunde (rămâne în meniul mobil și în footer); dacă tot nu încape, comutatorul de limbă arată doar limba inactivă („EN”); butonul de Radiografie nu se reduce niciodată.

**LangSwitch.** Două linkuri, `RO · EN`, cu `hreflang` și `lang` pe fiecare, `aria-label` „Schimbă limba” / „Change language”. Nu e dropdown, nu are steaguri (steagurile reprezintă țări, nu limbi). Duce la pagina pereche din `src/i18n/routes.ts`; dacă nu există pereche (articol netradus), duce la indexul secțiunii în cealaltă limbă.

**ConsentBanner.** `position: fixed`, jos; pe mobil pe toată lățimea, pe desktop o casetă de 420 px în colțul dreapta-jos, la 24 px de margini. Fundal `--surface`, bordură `--line`, `--radius-lg`, umbră (light) / bordură (dark). Conținut: titlu scurt (display 600, 17 px), două rânduri de text (`--fs-small`), link către `/cookies`, apoi două butoane **identice ca mărime și greutate** (secundar, bordură teal, text teal): „Accept” și „Refuz”. Niciunul nu e orange: orange e doar pentru Radiografie. `role="region"`, `aria-label` „Cookie-uri”, focusabil, se închide și cu Esc (= Refuz). Nu acoperă butonul principal din hero pe mobil (se verifică la 375 px).

**Hero (homepage).** Tipografic, o coloană, aliniat la stânga, pe `--bg`: eyebrow, h1 (`--fs-hero`, `max-width: 22ch`), lead (`--fs-lead`, `--muted`, `max-width: 60ch`), două butoane (orange principal, secundar cu bordură teal). Fără fotografie, fără rând de încredere, fără fundal închis. Imediat sub hero, un FactStrip pe toată lățimea containerului, pe `--surface`, cu patru celule: `Din 2020`, `Cluj-Napoca`, `Răspuns sub 2 ore în program`, badge-urile partenerilor (monocrom; text până există `[[LOGO_PARTENERI]]`). El e ancora vizuală a primului ecran, nu o imagine. După lansare, când există `[[CAPTURA_RAPORT_LUNAR]]`: hero pe două coloane, în dreapta un Figure cu prima pagină a raportului lunar anonimizat, ca document pe hârtie (fundal `--surface`, bordură 1 px `--line`, `--radius`, fără umbră, fără perspectivă, fără „plutire”, fără ramă de laptop), legenda „Raportul lunar pe care îl primește fiecare client. Anonimizat.” Obiectul din hero e livrabilul, nu fondatorul.

**Hero (pagini interne).** O coloană, pe `--surface-2`: eyebrow, h1, lead. Fără imagine, cu excepția Despre (portret) și studiilor de caz (fundal navy + caseta de logo).

**Card.** Fundal alb, bordură `--line`, bordură superioară 3 px teal, padding 20–24 px, `h3` + text. Fără umbră, fără iconiță obligatorie. Cardurile dintr-un rând au aceeași înălțime (grid), textul nu se trunchiază.

**Steps (pași).** Folosit doar pentru secvențe reale (Cum lucrăm, fluxul din Radiografie). Cerc teal cu numărul, `h3`, text. Pe desktop în rând, pe mobil în coloană.

**FactStrip.** Bandă albă cu 4–5 celule separate de linii verticale: eticheta în mono uppercase teal, valoarea în 600.

**NumberTiles.** Plăci navy cu cifra mare (display 700, 32–40 px) și explicația în `#C9D8DB`. Doar pentru cifre reale din contracte sau măsurate. Niciodată contoare animate.

**Quote.** Fundal `--teal-soft`, bordură stânga 4 px teal, italic, sursă în `--muted`. Doar cu nume și funcție reale.

**CtaBand.** Bloc navy, `--radius-lg`, titlu alb, text în `#C9D8DB`, buton orange. Apare o singură dată, la finalul fiecărei pagini (textul e în `00-global.md`, cu variante pe pagină).

**Faq.** `details`/`summary` native, stilizate; o singură întrebare deschisă implicit (prima). Generează JSON-LD `FAQPage`.

**Form.** Etichete deasupra câmpurilor (display 600, 14.5 px), câmpuri cu bordură `--line`, focus teal 2 px, eroare `--crit` cu mesaj sub câmp, buton orange full-width pe mobil. Sub buton: semnătura din `00-global.md` § Semnătura de sub formulare („Îți răspunde un om, în maximum o zi lucrătoare.”), în `--muted`, fără avatar. Fără JavaScript, formularul afișează `<noscript>` cu textul din § Mesaje de formular și linkul Calendly.

**Figure.** Imagine cu legendă (`--fs-small`, `--muted`), bordură `--line`, padding 10 px. Capturile de ecran au colțuri `--radius`.

**Prose.** Stiluri pentru text lung (articole, legal): 17 px / 1.65, `h2` cu spațiu 36 px sus, liste cu marcaje simple, linkuri subliniate cu `text-underline-offset: 3px`.

**Butoane.** Principal: orange, text navy, display 700, 14 px 22 px, `--radius`. Secundar: fundal transparent, bordură 1.5 px teal, text teal. Terțiar: link cu săgeată. Principal plin teal: fundal `--teal`, text alb (în dark, text `#00202E` pe `--teal` #5FB0B4), aceleași dimensiuni ca principalul orange; apare doar pe /suport, pentru butonul de WhatsApp, o singură dată pe pagină (pagina nu are niciun buton orange). Toate: focus vizibil (outline 2 px `--teal`, offset 2 px; pe butonul orange, outline navy `#00202E`; în dark, outline în `--teal` din paleta dark), `min-height: 44px` pe mobil. Orange nu se folosește pentru focus: pe fundal deschis nu are contrast.

## Imagini și grafică

- Fotografii reale: Marius (portretul livrat, 500×667, în `assets/foto-marius/`), o poză în context de lucru când există `[[FOTO_CONTEXT]]` (o fotografie reală, nu una generată; pe Despre sau într-un articol, nu în hero), capturi de ecran anonimizate din helpdesk.
- Portretul lui Marius apare în exact trei locuri: hero-ul de pe Despre (mare, 3:4), secțiunile „Cine răspunde” de pe homepage și de pe /radiografie-it (pătrat, 200 px, secțiune compactă pe `--surface-2`) și caseta de autor din articole (96 px, rotund; singurul loc unde o poză e rotundă). Nicăieri altundeva: nu în hero-ul homepage-ului, nu în header, nu sub formulare, nu în byline.
- Fără fotografii de stoc cu oameni. Dacă lipsește o poză, secțiunea rămâne fără imagine; nu se pune un placeholder de stoc.
- Iconițe: maximum 12 în tot site-ul, din `lucide`, 20–24 px, stroke 1.75, culoare teal, folosite doar în FactStrip, în lista de verificări din Radiografie și pentru comutatorul de temă (`sun`, `moon`). Nu în carduri de servicii.
- Imaginea de context, dacă Marius alege una generată cu AI: se folosește doar ca textură abstractă în culorile brandului, la opacitate mică, într-un singur loc, ca fundal al CtaBand, niciodată în hero-ul homepage-ului, niciodată în spatele portretului și niciodată ca „fotografie” de om, birou sau server. Regulile și promptul sunt în `assets/FOTO-CONTEXT.md`.
- Diagrame: doar cea din „Cum lucrăm” (fluxul Radiografie → Plan → Preluare → Lună de lună) și cea din articolul de helpdesk, ca SVG inline, linii 1.5 px, culori din tokeni.
- Logo-uri de parteneri (Microsoft Partner, Fortinet Advocate, Veeam Partner): rând static, monocrom `--muted`, colorat la hover, cu nivelul scris sub logo. Fără carusel.

## Mișcare

Aproape deloc. Tranziții de 150 ms pe hover/focus la butoane și linkuri; deschiderea meniului mobil 200 ms; nimic la scroll. `@media (prefers-reduced-motion: reduce)` dezactivează tot.

## Accesibilitate

Contrast AA pe toate combinațiile (orange pe navy trece; teal pe alb trece la 16 px+; `--muted` pe alb trece). Focus vizibil peste tot: outline 2 px `--teal`, offset 2 px; navy pe butonul orange; niciodată orange pe fundal deschis (sub 2:1). Skip-link. Etichete pe toate câmpurile. `alt` real pe imagini, gol pe cele decorative. Zone de atingere ≥ 44 px pe mobil. Textul se poate mări la 200% fără să se suprapună.

## Ce nu facem (lista de verificare pentru Claude Code)

- Fără hero de 100vh, fără video de fundal, fără particule, fără rețea de puncte.
- Fără gradient pe text, fără gradienturi violet/albastru, fără „glassmorphism”.
- Fără carusele de orice fel. Fără contoare animate. Fără testimoniale fără nume.
- Fără iconițe-scut, lacăt, nor, rotiță în cardurile de servicii.
- Fără emoji nicăieri.
- Fără `rounded-2xl` pe tot; raza standard e 4 px.
- Fără text în imagini.
- Fără mai mult de un font de display.
- Fără steaguri la comutatorul de limbă; fără redirecționare automată după limbă.
- Fără „dark mode” cu negru pur (#000) sau cu gri neutru; paleta e cea din § Dark mode.
- Fără imagini generate cu AI care imită fotografii (oameni, birouri, servere); vezi `assets/FOTO-CONTEXT.md`.

## Studiu de caz (șablonul din `CaseLayout`)

Hero navy cu gradient discret spre navy-2 (singurul gradient permis, între două culori de brand vecine): eyebrow teal-2, h1 alb (`max-width: 20ch`), lead `#D7E4E6`, caseta de logo (alb sau navy-2 dacă `logoDark`, `--radius-lg`, 260 px). Apoi FactStrip, apoi secțiunile din Markdown în modelul „două coloane”, cardurile pentru „Ce am livrat”, NumberTiles pentru „Angajamente”, Quote dacă există, CtaBand, footer cu mențiunea de acord.

## Articol (șablonul din `PostLayout`)

Antet pe `--bg`: eyebrow (Blog · categorie), h1, lead, byline cu nume, dată, timp de citit (fără avatar). Corp în `Prose`, lățime 70ch. Figurile cu legendă. Casetă de autor la final (portret 96 px, rotund, textul din `00-global.md` § Caseta de autor, link LinkedIn). CtaBand. Pagina de listare: carduri cu titlu, description, dată, timp de citit; fără imagini de copertă dacă nu există.
