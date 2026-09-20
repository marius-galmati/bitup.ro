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
  --font-display: "Public Sans Variable", "Segoe UI", system-ui, sans-serif;
  --font-body: "Public Sans Variable", "Segoe UI", system-ui, sans-serif;
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

- **Display (titluri, butoane, eyebrow, meniu):** Public Sans (variabil), greutate 600 la titluri și butoane, `letter-spacing: -0.015em` la h1 și `-0.01em` la h2, `text-wrap: balance` pe toate headingurile. Aceeași familie ca textul curent: o singură voce tipografică, neutră și deschisă (aperturi largi, înălțime-x mare), aleasă pentru lizibilitate; ierarhia vine din mărime și greutate.
- **Body:** Public Sans (variabil), 400 și 600, 17 px / 1.6. Lățime maximă a textului curent: 70 de caractere (`--container-narrow`).
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
- Excepție unică: hero-ul homepage-ului folosește `Container wide` (1360 px, de la 1360 px în sus), ca textul și graficul să încapă amândouă. Ca marginea stângă să rămână aliniată cu restul paginii, grila hero-ului are în față o gutieră de 72 px care, cu gap-ul de 48 px, dă exact cei 120 px de decalaj dintre cele două containere. Verificat la 1200, 1359, 1360, 1440 și 1600 px: titlul pornește de la același x ca eyebrow-ul secțiunii următoare.
- Secțiuni cu `padding-block: var(--section-y)`; o linie de 1 px `--line` între secțiuni pe fundal alb, fără linie când fundalul se schimbă.
- Grid-uri: carduri pe `repeat(auto-fit, minmax(280px, 1fr))`; pași pe `minmax(200px, 1fr)`; benzi de fapte pe `minmax(170px, 1fr)`. Pe telefon totul curge pe o coloană.
- Secțiunile cu text lung folosesc modelul „două coloane”: eyebrow în stânga (240 px, sticky pe desktop), conținut în dreapta, lățime 70ch.
- Rânduri despărțite de linii de păr de 1 px `--line`, fără linie deasupra primului rând și fără linie sub ultimul: tiparul din `example.png` pentru liste de elemente paralele (homepage § 3). Nu se combină cu numere de index decât dacă lista e chiar o secvență.
- Nicio secțiune nu depinde de scroll pentru a fi vizibilă; nimic parcat la `opacity: 0`.

## Componente

**Header.** Fundal `--surface`, 64 px, linie jos. Stânga: logo BitUp (SVG, 132 px lățime; tagline-ul „Build Innovative Technology” e parte din logo; varianta dark pe temă închisă). Centru-dreapta: Servicii ▾ (panou pe toată lățimea, vezi mai jos), Cum lucrăm, Rezultate, Despre, Echipa, Blog. Dreapta, în ordinea asta: telefonul ca link `tel:` (mono, `--muted`), comutatorul de limbă (`RO · EN`, mono 12.5 px, limba curentă în `--text` 600, cealaltă în `--muted`, link către pagina pereche), comutatorul de temă (buton 36×36 cu iconiță), butonul orange „Radiografie IT gratuită”. Sub 1024 px: buton hamburger; meniul mobil e un panou full-height cu aceleași linkuri, butonul de Radiografie sus, telefon, WhatsApp, limbă și temă jos. Header-ul nu e sticky pe mobil (ocupă spațiu); pe desktop e sticky, cu linia de jos de 1 px `--line` în ambele teme, fără umbră. Între 1024 și 1200 px telefonul se ascunde (rămâne în meniul mobil și în footer); dacă tot nu încape, comutatorul de limbă arată doar limba inactivă („EN”); butonul de Radiografie nu se reduce niciodată.
Cu al șaselea link în bară („Echipa”, 19 septembrie 2026), rândul nu mai încăpea în containerul de 1120 px: măsurat, 1169 px de conținut față de 1056 px utili, cu depășire pe orizontală la 1024 și la 1200 px. De la 1024 px, padding-ul orizontal al linkurilor scade de la 12 la 8 px și distanța dintre uneltele din dreapta de la 12 la 8 px; zona de click a unui link rămâne 81 × 33 px, iar conținutul intră în container la toate lățimile. Al șaptelea link nu mai încape: dacă apare unul, fie telefonul iese din header, fie linkul intră în panoul „Servicii”.

**Panoul „Servicii”** (de la 1024 px; sub asta funcționează meniul mobil). Model preluat din `meniu (2).png`, cu tipografia și paleta noastră. Se deschide din butonul „Servicii”, e absolut pe toată lățimea header-ului, fundal `--surface`, linie de 1 px `--line` sus și jos, umbră `--shadow` (excepție justificată, ca la meniul mobil), conținutul aliniat în `Container`. Patru coloane egale, `column-gap: var(--s-6)`:
1. Eyebrow „Servicii”, titlu `--fs-h2`, lead `--muted` la maximum 34ch, link „Toate serviciile”.
2. și 3. Serviciile, cu titlu `--fs-h3` și o propoziție `--fs-small` `--muted` sub fiecare. Cu trei servicii, împărțirea e 2 + 1.
4. Casetă de CTA, despărțită de o linie verticală de 1 px `--line`: eyebrow, întrebarea din § Banda finală de CTA, link către Radiografie.

Sub grilă, peste o linie de 1 px, o bandă cu telefonul, emailul și linkul „Suport pentru clienți”. Esc și clicul în afară închid panoul; focusul revine pe buton; Tab intră în panou (panoul stă în DOM imediat după buton).

**LangSwitch.** Două linkuri, `RO · EN`, cu `hreflang` și `lang` pe fiecare, `aria-label` „Schimbă limba” / „Change language”. Nu e dropdown, nu are steaguri (steagurile reprezintă țări, nu limbi). Duce la pagina pereche din `src/i18n/routes.ts`; dacă nu există pereche (articol netradus), duce la indexul secțiunii în cealaltă limbă.

**ConsentBanner.** `position: fixed`, jos; pe mobil pe toată lățimea, pe desktop o casetă de 420 px în colțul dreapta-jos, la 24 px de margini. Fundal `--surface`, bordură `--line`, `--radius-lg`, umbră (light) / bordură (dark). Conținut: titlu scurt (display 600, 17 px), două rânduri de text (`--fs-small`), link către `/cookies`, apoi două butoane **identice ca mărime și greutate** (secundar, bordură teal, text teal): „Accept” și „Refuz”. Niciunul nu e orange: orange e doar pentru Radiografie. `role="region"`, `aria-label` „Cookie-uri”, focusabil, se închide și cu Esc (= Refuz). Nu acoperă butonul principal din hero pe mobil (se verifică la 375 px).

**Hero (homepage).** Aliniat la stânga, pe `--bg`: h1 (`--fs-hero`, `max-width: 22ch`), lead (`--fs-lead`, `--muted`, `max-width: 60ch`), două butoane (orange principal, secundar cu bordură teal). Fără fotografie, fără rând de încredere, fără fundal închis, fără eyebrow. De la 1200 px, două coloane (1,35fr / 1fr, gap `--s-8`): textul în stânga, în dreapta graficul `HeroDiagram` (vezi § Imagini). Sub 1200 px graficul nu se afișează și hero-ul rămâne pe o coloană — pe o coloană mai îngustă titlul ar trece la șase rânduri. Banda de FactStrip de sub hero a fost scoasă pe 17 septembrie 2026, la cererea lui Marius: primul ecran e doar titlu, lead și cele două butoane. După lansare, când există `[[CAPTURA_RAPORT_LUNAR]]`: hero pe două coloane, în dreapta un Figure cu prima pagină a raportului lunar anonimizat, ca document pe hârtie (fundal `--surface`, bordură 1 px `--line`, `--radius`, fără umbră, fără perspectivă, fără „plutire”, fără ramă de laptop), legenda „Raportul lunar pe care îl primește fiecare client. Anonimizat.” Obiectul din hero e livrabilul, nu fondatorul.

**Hero (pagini interne).** O coloană, pe `--surface-2`: eyebrow, h1, lead. Fără imagine, cu excepția Despre (portret) și studiilor de caz (fundal navy + caseta de logo).

**Card.** Fundal alb, bordură `--line`, bordură superioară 3 px teal, padding 20–24 px, `h3` + text. Fără umbră, fără iconiță obligatorie. Cardurile dintr-un rând au aceeași înălțime (grid), textul nu se trunchiază.

**Steps (pași).** Folosit doar pentru secvențe reale (Cum lucrăm, fluxul din Radiografie). Cerc teal cu numărul, `h3`, text. Pe desktop în rând, pe mobil în coloană.
Varianta `rail` (homepage § 4, aranjamentul din `example.png`): de la 1200 px cei patru pași pe un singur rând, cercul deasupra titlului, nodurile legate de o linie de 1 px `--line` care pleacă din muchia cercului, cu un vârf de săgeată teal la 85% din interval; după ultimul cerc linia curge până la marginea conținutului, fără săgeată. Sub 1200 px: o coloană până la 640 px, apoi 2 × 2, fără linie.

**FactStrip.** Bandă albă cu 4–5 celule separate de linii verticale: eticheta în mono uppercase teal, valoarea în 600.

**NumberTiles.** Plăci navy cu cifra mare (display 700, 32–40 px) și explicația în `#C9D8DB`. Doar pentru cifre reale din contracte sau măsurate. Niciodată contoare animate.

**Quote.** Fundal `--teal-soft`, bordură stânga 4 px teal, italic, sursă în `--muted`. Doar cu nume și funcție reale.

**CtaBand.** Bloc navy, `--radius-lg`, titlu alb, text în `#C9D8DB`, buton orange. Apare o singură dată, la finalul fiecărei pagini (textul e în `00-global.md`, cu variante pe pagină). De la 1024 px, pereche stânga/dreapta pe același ax (aranjamentul din `example.png`): titlul și textul lipite de marginea stângă a casetei, butonul și linia de contact lipite de marginea dreaptă, aliniate pe centru vertical. Sub 1024 px se stivuiește.

**Faq.** `details`/`summary` native, stilizate; o singură întrebare deschisă implicit (prima). Generează JSON-LD `FAQPage`.

**Form.** Etichete deasupra câmpurilor (display 600, 14.5 px), câmpuri cu bordură `--line`, focus teal 2 px, eroare `--crit` cu mesaj sub câmp, buton orange full-width pe mobil. Sub buton: semnătura din `00-global.md` § Semnătura de sub formulare („Îți răspunde un om, în maximum o zi lucrătoare.”), în `--muted`, fără avatar. Fără JavaScript, formularul afișează `<noscript>` cu textul din § Mesaje de formular și linkul Calendly.

**Rând de persoană** (`/echipa`, singura pagină care îl folosește). Patru rânduri suprapuse, nu carduri: textele au lungimi foarte diferite (186, 189, 130 și 120 de cuvinte în română), iar într-o grilă de carduri egale diferența se vede. Fiecare rând: `border-top: 1px solid --line`, `padding-block: var(--s-7)` de la 768 px, fotografia pătrată de 240 px în stânga, aliniată sus, textul în dreapta, la maximum 70ch. Fără alternanță stânga/dreapta: alternanța e un efect de șablon. Sub 768 px, fotografia trece deasupra, la 160 px, aliniată la stânga, nu centrată.
Ordinea din coloana de text: numele (`h3`), rolul (mono, `--fs-small`, `--teal`), rândul de experiență (mono, `--fs-small`, `--muted`), textul, marca de LinkedIn.
Secțiunea nu are titlu vizibil (nu repetăm tiparul eyebrow + `h2` + carduri); are un `h2` citit doar de cititoarele de ecran, ca ierarhia să meargă `h1` → `h2` → `h3`.

**Substituent de fotografie** (`/echipa`). Cine n-are încă poză primește aceeași casetă ca ceilalți: pătrat, `--radius`, bordură 1 px `--line`, fundal `--surface-2`, cu inițialele persoanei centrate în fontul de titlu, 600, `--fs-h1`, culoare `--navy`. Nu avatar generic, nu siluetă, nu cerc. Contrast: 14,62:1 în light, 11,82:1 în dark.

**Marca LinkedIn** (`/echipa`). Marca „in”, din `public/icons/linkedin.svg`, decupată din fișierul oficial trimis de Marius; forma nu se modifică și nu se rotește. Rămâne în albastrul oficial `#2867B3` în toate stările, cum cer regulile de brand LinkedIn; hover-ul se marchează prin `opacity: .75`, nu prin culoare. 20 × 20 px, într-un link de minimum 44 × 44 px, fără cuvinte lângă ea. Linkul are `aria-label` cu numele persoanei, `rel="noopener"`, tab nou; imaginea are `alt=""` și `aria-hidden`. Fișier local, nicio cerere externă.

**Figure.** Imagine cu legendă (`--fs-small`, `--muted`), bordură `--line`, padding 10 px. Capturile de ecran au colțuri `--radius`.

**Prose.** Stiluri pentru text lung (articole, legal): 17 px / 1.65, `h2` cu spațiu 36 px sus, liste cu marcaje simple, linkuri subliniate cu `text-underline-offset: 3px`.

**Butoane.** Principal: orange, text navy, display 700, 14 px 22 px, `--radius`. Secundar: fundal transparent, bordură 1.5 px teal, text teal. Terțiar: link cu săgeată. Principal plin teal: fundal `--teal`, text alb (în dark, text `#00202E` pe `--teal` #5FB0B4), aceleași dimensiuni ca principalul orange; apare doar pe /suport, pentru butonul de WhatsApp, o singură dată pe pagină (pagina nu are niciun buton orange). Toate: focus vizibil (outline 2 px `--teal`, offset 2 px; pe butonul orange, outline navy `#00202E`; în dark, outline în `--teal` din paleta dark), `min-height: 44px` pe mobil. Orange nu se folosește pentru focus: pe fundal deschis nu are contrast.

## Imagini și grafică

- Fotografii reale: Marius (portretul livrat, 500×667, în `assets/foto-marius/`), portretele de echipă (pătrate, în `src/assets/foto-echipa/`), o poză în context de lucru când există `[[FOTO_CONTEXT]]` (o fotografie reală, nu una generată; într-un articol, nu în hero), capturi de ecran anonimizate din helpdesk.
- Portretul lui Marius apare în exact patru locuri: rândul lui de pe `/echipa` (pătrat, 240 px), secțiunile „Cine răspunde” de pe homepage și de pe /radiografie-it (pătrat, 200 px, secțiune compactă pe `--surface-2`) și caseta de autor din articole (96 px, rotund; singurul loc unde o poză e rotundă). Nicăieri altundeva: **nu pe `/despre`**, care din 18 septembrie 2026 e pagina firmei și nu are nicio imagine, nu în hero-ul homepage-ului, nu în header, nu sub formulare, nu în byline.
- Portretele de echipă: pătrate, minimum 480×480 în sursă, aceeași încadrare cap-și-umeri, fundal simplu. Sunt randate la 240 px (480 px la 2×), `object-fit: cover`. Cine n-are poză primește substituentul cu inițiale descris la § Componente. Pozele intră în repo doar după `[[ACORD_ECHIPA]]`.
- Fără fotografii de stoc cu oameni. Dacă lipsește o poză, secțiunea rămâne fără imagine; nu se pune un placeholder de stoc.
- Iconițe: maximum 12 în tot site-ul, din `lucide`, 20–24 px, stroke 1.75, culoare teal, folosite doar în FactStrip, în lista de verificări din Radiografie și pentru comutatorul de temă (`sun`, `moon`). Nu în carduri de servicii.
- Imaginea de context, dacă Marius alege una generată cu AI: se folosește doar ca textură abstractă în culorile brandului, la opacitate mică, într-un singur loc, ca fundal al CtaBand, niciodată în hero-ul homepage-ului, niciodată în spatele portretului și niciodată ca „fotografie” de om, birou sau server. Regulile și promptul sunt în `assets/FOTO-CONTEXT.md`.
- Diagrame: cea din „Cum lucrăm” (fluxul Radiografie → Plan → Preluare → Lună de lună), cea din articolul de helpdesk și `HeroDiagram`, graficul din hero-ul homepage-ului (aranjament cerut de Marius pe 18 septembrie 2026, luat din `hero.png`). Toate, ca SVG inline, culori din tokeni, fără cereri de rețea.
- `HeroDiagram`: în stânga, un câmp de fragmente împrăștiate — liniuțe scurte și colțuri de traseu rupte, jumătate `--navy`, jumătate `--teal`, 1,8 px — grupate în cinci benzi, la 108 unități una de alta, fiecare cu eticheta ei; deasupra spinei, logo-ul oficial (aceleași căi ca `Logo.astro`); la mijloc, o spină verticală `--teal` de 3 px cu cinci noduri pătrate de 22 px **în `--orange`**; în dreapta, paisprezece trasee în mănunchiuri de 3/2/3/3/3 care pleacă din noduri, coboară sau urcă până la un palier comun, merg o bucată împreună și apoi se ridică unul în altul în șase verticale, fiecare terminată cu o **săgeată în V, `--teal`**, cu vârful pe capătul liniei, în trepte. Jos, două etichete de colț, pe câte două rânduri. Citirea e de la fragmentare (stânga) la progres (dreapta).
  Geometria vine din mockup: spina la x=431, verticalele evantaiului la x=718…813 cu capetele la y=134…15. Distanța dintre benzi a fost crescută de la 95 la 108 de unități pe 18 septembrie 2026, la cererea lui Marius („mai mare și aerisit”); nodurile ajung astfel la y=222, 330, 438, 546, 654. Câmpul de fragmente e generat determinist (generator cu sămânță fixă), ca build-ul să fie reproductibil, iar fragmentele ocolesc casetele etichetelor.
  Graficul are `role="img"` și `aria-label` (poartă informație, nu e decor) și se afișează doar de la 1200 px.
  **Mișcare** (20 septembrie 2026, cerută de Marius), toată din CSS, fără JavaScript și fără bibliotecă. La încărcare, o secvență de ~1,9 s, o singură dată: eticheta din colțul stâng, fragmentele bandă cu bandă (120 ms + 90 ms pe bandă), logo-ul, spina care coboară, nodurile de sus în jos, traseele care se trag spre dreapta (820 ms + 110 ms pe bandă) și, la final, săgețile și eticheta din colțul drept. Traseele au `pathLength="1"`, ca toate să se deseneze în același timp indiferent de lungime; starea finală stă în regula de bază, iar animația pornește din `from`, ca desenul să rămână complet dacă animația e scoasă. Verificat: H1-ul rămâne elementul LCP (280 ms la 1440 px), graficul nu devine candidat.
  **Benzile sunt linkuri** (20 septembrie 2026, cerut de Marius): fiecare duce la pagina serviciului ei — `Securitate cibernetică` → `/servicii/securitate`, `Automatizări` și `Agentic AI` → `/servicii/automatizari`, `Software development` → `/servicii/automatizari#software`, `Infrastructură IT` → `/servicii/suport-it`. Cinci etichete pe trei pagini: e aceeași nepotrivire notată în `01-acasa.md`, între etichetele graficului și cele trei grupuri de servicii.
  Zona de atingere e fâșia din stânga spinei, 418 unități lățime și un pas înălțime, pornită de la marginea de sus a etichetei, ca fiecare bandă să-și cuprindă propriul cuvânt și fâșiile să se atingă fără să se suprapună. Restul desenului are `pointer-events: none`: ținta e una singură, nu paisprezece trasee suprapuse în evantai.
  La hover sau la focus de tastatură, celelalte patru benzi trec la 22% opacitate și traseele benzii active se îngroașă de la 2 la 2,6. Fără mărire, fără umbră, fără culoare nouă. Focusul se desenează ca un chenar teal de 2 px în jurul fâșiei, cu `vector-effect: non-scaling-stroke` (grosimea în pixeli de ecran, nu în unități de viewBox); outline-ul implicit ar fi încadrat și evantaiul din dreapta.
  Pentru că are linkuri înăuntru, SVG-ul nu mai poate fi `role="img"` (ar ascunde linkurile): e `role="group"` cu `aria-label` = propoziția de descriere, iar numele fiecărui link vine din `<text>`-ul benzii. Logo-ul dinăuntru e `aria-hidden`. Cele cinci opriri de Tab vin după cele două butoane din hero, fiindcă graficul e după text în DOM; sub 1200 px graficul e `display: none`, deci nu există nici linkuri, nici opriri în plus.
  Etichetele estompate ajung la 1,59:1 în light și 1,89:1 în dark — sub AA, dar sunt text dintr-o figură, iar starea e trecătoare: informația rămâne la un hover sau un Tab distanță, iar numele benzii e numele linkului, citit oricum de cititoarele de ecran.
  `prefers-reduced-motion: reduce` oprește și secvența, și tranzițiile (`animation: none !important` pe tot subarborele): desenul apare direct terminat.
- Logo-uri de parteneri (Microsoft Partner, Fortinet Advocate, Veeam Partner, Anthropic Partner): rând static, monocrom `--muted`, colorat la hover, cu nivelul scris sub logo. Fără carusel.

## Mișcare

Aproape deloc. Tranziții de 150 ms pe hover/focus la butoane și linkuri; deschiderea meniului mobil 200 ms; **nimic la scroll**, pe nicio secțiune. `@media (prefers-reduced-motion: reduce)` dezactivează tot.

Singura excepție, cerută de Marius pe 20 septembrie 2026: `HeroDiagram`, graficul din hero-ul homepage-ului. Are voie la **un singur moment**, la încărcarea paginii: o secvență de circa 1,9 s care desenează figura în ordinea în care se citește, o dată, niciodată în buclă și niciodată declanșată de scroll. Plus o evidențiere la pointer, descrisă în § Imagini. Nimic nu se mișcă după ce desenul s-a așezat; verificat cu `document.getAnimations()`: zero animații în curs la 2,5 s. Regula rămâne valabilă pentru restul site-ului: nicio altă secțiune nu primește mișcare la încărcare sau la scroll.

## Accesibilitate

Contrast AA pe toate combinațiile (orange pe navy trece; teal pe alb trece la 16 px+; `--muted` pe alb trece). Focus vizibil peste tot: outline 2 px `--teal`, offset 2 px; navy pe butonul orange; niciodată orange pe fundal deschis (sub 2:1). Skip-link. Etichete pe toate câmpurile. `alt` real pe imagini, gol pe cele decorative. Zone de atingere ≥ 44 px pe mobil. Textul se poate mări la 200% fără să se suprapună.

## Ce nu facem (lista de verificare pentru Claude Code)

- Fără hero de 100vh, fără video de fundal, fără particule, fără rețea de puncte. (Graficul din hero e o excepție cerută explicit: e un traseu cu sens — de la fragmentare la un singur drum — nu o textură decorativă.)
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
