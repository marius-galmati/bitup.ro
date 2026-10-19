# DESIGN.md — sistemul de design

> Versiune nouă, 26 septembrie 2026. Înlocuiește integral versiunea anterioară (Public Sans peste tot, raza de 4 px, titluri în sentence case). Orice decizie vizuală din `NOTES.md` sau din fazele trecute care contrazice fișierul ăsta nu mai e valabilă. Referința vizuală e `spec/assets/referinte/` (capturile de pe bancatransilvania.ro și filomuro21.ro pe care le-a ales Marius).

Direcția: **clar, simplu, aerisit, cu contrast puternic.** Titluri mari, condensate, cu majuscule, care țin pagina singure. Text navy aproape negru pe alb, sau alb pe navy. O idee pe ecran, mult spațiu în jurul ei, un singur buton. Ierarhia vine din mărime, nu din culoare. Culorile vin din logo: navy, teal și orange; orange e doar pentru acțiunea principală.

Tiparul de bază, de la o secțiune la alta: **eyebrow → titlu mare cu 1–3 cuvinte în teal → paragraf → un buton**, pe o coloană, iar în cealaltă un element vizual. Coloanele își schimbă locul de la o secțiune la alta. Printre ele, din loc în loc, o secțiune centrată de manifest și o secțiune pe navy plin, pentru ritm.

Site-ul are două teme (light implicit, dark) și două limbi (RO, EN). Structura, componentele și ierarhia sunt aceleași; se schimbă doar tokenii. Componentele trebuie să încapă și textul român, mai lung, și pe cel englez. Titlurile cu majuscule condensate cer atenție la cuvintele lungi românești („INFRASTRUCTURĂ”, „CIBERNETICĂ”): se verifică la 375 px că nu depășesc lățimea (vezi § Tipografie).

## Tokeni

Sunt în `src/styles/tokens.css`. Rezumatul:

| Rol | Light | Dark |
|---|---|---|
| Fundal pagină `--bg` | `#FFFFFF` | `#0C181D` |
| Suprafață `--surface-2` (carduri, benzi) | `#EEF3F3` | `#182E36` |
| Linie `--line` | `#D6E0E1` | `#274047` |
| Text și titluri `--text` / `--navy` | `#00202E` | `#E4ECEE` |
| Text secundar `--muted` | `#55686F` | `#9FB3B8` |
| Accent `--teal` | `#20686C` | `#5FB0B4` |
| Buton principal `--orange` | `#FE982A`, text `#00202E` | la fel |
| Secțiune navy `--navy-surface` | `#00202E` | `#0F2A36` |
| Pe navy: text / secundar / accent | `#FFFFFF` / `#C9D8DB` / `#7CC4C7` | `#FFFFFF` / `#B9CCD0` / `#7CC4C7` |

Raze: `--r-pill` 999 px (butoane), `--r-card` 28 px (carduri și blocuri mari), `--r-media` 16 px (imagini, capturi, cardurile din meniu), `--r-field` 12 px (câmpuri). Nicio altă rază.

Spațiere pe baza de 8 (`--s-1` … `--s-10`), `--section-y` între 80 și 144 px. Container 1200 px, gutter 20 px pe mobil și 32 px pe desktop.

## Dark mode

Aceleași reguli ca până acum: fundalul e navy foarte închis cu tentă teal, niciodată negru sau gri neutru; `--navy` e un rol („culoarea titlurilor”) și devine deschis în dark; secțiunile navy folosesc `--navy-surface` și rămân închise, ușor ridicate față de fundal, cu bordură de 1 px `--line`. Butonul orange e identic în ambele teme. În dark, umbrele dispar (`--shadow: none`); ridicarea se face cu bordură. Comutatorul de temă rămâne în header (buton cu iconiță sun/moon, `aria-label`, `title`), fără tranziție animată de culoare. Toate combinațiile trec AA; se verifică cu un instrument, nu din ochi.

## Tipografie

Două familii, amândouă self-hosted (`@fontsource/barlow-condensed`, greutățile 300 și 700, subseturile `latin` și `latin-ext`, și Public Sans Variable, deja instalat). IBM Plex Mono iese din proiect.

- **Display: Barlow Condensed 700**, afișat cu MAJUSCULE, `line-height: .95`, `letter-spacing: -0.01em`, `text-wrap: balance`. Se folosește pentru h1 și h2, pentru cifrele din NumberTiles și pentru titlul din CtaBand.
  - Hero homepage: `--fs-hero` (56–112 px). H1 pe paginile interne: `--fs-h1` (48–96 px). H2: `--fs-h2` (44–72 px).
  - Majusculele vin **doar din CSS** (`text-transform: uppercase`, cu `lang` corect pe `<html>`). Textul din `spec/continut/` și din `src/copy/` rămâne în sentence case, exact cum e; diff-ul textual nu se schimbă.
  - Cuvinte lungi: sub 480 px, h1 și h2 folosesc `hyphens: manual` și `overflow-wrap: anywhere` doar ca plasă de siguranță; dacă un cuvânt tot nu încape la 375 px, se scade `clamp`-ul minim al titlului respectiv, nu se schimbă textul.
- **Eyebrow: Barlow Condensed 300**, majuscule, `--fs-eyebrow` (22–32 px), `--navy`, fără letter-spacing adăugat. Stă direct deasupra titlului, la `--s-3` distanță. Pe navy: `--on-navy`.
- **Cuvântul evidențiat:** 1–3 cuvinte din titlu în `--teal` (pe navy: `--on-navy-accent`). Maximum unul pe titlu, niciodată în titlurile de card. Implementare: câmpul `accent` lângă titlu în `src/copy/*.ts` (un subșir exact din titlu); componenta `Heading` îl învelește în `<span class="accent">` la prima potrivire. Textul titlului nu se modifică. Dacă subșirul nu se găsește, build-ul dă eroare.
- **Text: Public Sans**, 400 și 600. Corp `--fs-body` 18 px, lead `--fs-lead` 20 px, `line-height: 1.55`, paragrafele de marketing la maximum `--measure` (60ch), `text-wrap: pretty`, `hyphens: auto`.
- **Titluri de card (h3): Public Sans 600**, `--fs-h3` (22–26 px), sentence case, `line-height: 1.25`.
- **Etichete** (deasupra titlului de card, rolul din `/echipa`, categoria unui articol): Public Sans 600, `--fs-label` 14 px, majuscule, `letter-spacing: .04em`, `--teal`.
- **Cifre:** `font-variant-numeric: tabular-nums` unde stau în coloană (Public Sans le are).
- Ierarhie: un `h1` per pagină, `h2` pe secțiuni, `h3` în carduri. Fără `h4` pe paginile de marketing.
- **Excepție pentru text lung** (`Prose`: articole, pagini legale): `h2` în Public Sans 600, 30 px, sentence case, fără majuscule. Pe text lung, titlurile cu majuscule obosesc.

## Culoare, în practică

- Pagina e albă. Benzile alternative și cardurile sunt `--surface-2`. Contrastul vine din navy pe alb, nu din multe culori.
- Navy: titluri, text, secțiunile navy (maximum una la trei secțiuni, niciodată două la rând), CtaBand, hero-ul studiilor de caz. Footer-ul rămâne pe alb.
- Teal: cuvântul evidențiat, linkuri, butonul secundar, etichete, cercurile din Steps, iconițele.
- Orange: butonul principal, de maximum trei ori pe pagină (header, hero, CtaBand). Excepția din 16 octombrie 2026 (cerută de Marius, după `ce-facem_01_animat.mp4`): stratul 5 din `HeroStack` și cifra lui sunt orange. Nodurile orange de pe spina fostului `HeroDiagram` au plecat odată cu el.
- Semafor (`--ok/--warn/--crit`): doar în exemplul de raport din Radiografie și în stările formularelor.
- Fără gradienturi nicăieri, nici pe hero-ul studiilor de caz. Excepția din 17 octombrie 2026 (cerută de Marius): nuanțarea fețelor din `HeroStack`, care dă volum plăcilor (§ HeroStack).

## Layout

- Secțiunile au `padding-block: var(--section-y)`. Două secțiuni albe la rând se despart printr-o linie de 1 px `--line`; când se schimbă fundalul, fără linie.
- **TwoCol (secțiunea de bază).** Două coloane egale (`1fr 1fr`, gap `--s-8`), aliniate pe centru vertical. Textul are ordinea eyebrow → h2 cu accent → paragraf → un singur buton (`--s-7` deasupra butonului). Blocul vizual e în cealaltă coloană. Prop `reverse` inversează coloanele; pe o pagină, secțiunile TwoCol alternează. Sub 1024 px: o coloană, textul primul.
  - Blocul vizual poate fi doar ceva real: o captură anonimizată, o diagramă SVG din spec, o fotografie reală, un exemplu de raport. Stă pe `--surface-2` cu `--r-card` și padding `--s-7`, sau direct pe fundal dacă e o diagramă. **Nu se pune un bloc gol și nici o imagine de stoc.** Dacă o secțiune n-are vizual, folosește varianta `TwoCol aside`: textul în stânga, iar în dreapta conținutul secțiunii (listă de rânduri, pași, întrebări).
- **Manifest (centrat).** Folosit o dată sau de două ori pe site (homepage, Despre): eyebrow, h2 mare cu accent, paragraf la 36em, buton outline. E singurul loc unde textul stă centrat.
- **Secțiune navy.** Același tipar ca TwoCol, pe `--navy-surface`: titlu alb, accent `--on-navy-accent`, paragraf `--on-navy-muted`, buton alb cu text navy.
- **Rânduri** (liste de elemente paralele, tiparul din `example.png`): separate de linii de 1 px `--line`, fără linie deasupra primului rând și sub ultimul. Titlul rândului în Public Sans 600, 24 px.
- Grid-uri de carduri: `repeat(auto-fit, minmax(300px, 1fr))`, gap `--s-5`. Pe telefon, o coloană.
- Nicio secțiune nu depinde de scroll ca să apară; nimic ascuns cu `opacity: 0`.

## Componente

**Header.** Fundal `--surface`, `--header-h` 80 px, linie de 1 px `--line` jos, fără umbră, sticky pe desktop, static pe mobil. Stânga: logo (SVG, 140 px lățime). Centru: Servicii ▾, Cum lucrăm, Rezultate, Despre, Echipa, Blog, în Public Sans 400, 17 px, `--text`; pagina curentă și Servicii deschis în `--teal` 600. Dreapta, în ordine: comutatorul de limbă, comutatorul de temă, butonul principal în varianta `sm`. Telefonul nu mai stă în bară (16 octombrie 2026); rămâne în panoul Servicii, în meniul mobil și în footer. Dacă rândul nu încape (se măsoară la 1024, 1200 și 1280 px, ca până acum), pragul de hamburger urcă de la 1024 la 1200 px. Butonul principal nu se micșorează niciodată sub varianta `sm`.
Sub prag: hamburger, iar meniul mobil e un panou full-height cu aceleași linkuri în Public Sans 600 24 px, butonul principal sus, telefonul, WhatsApp-ul, limba și tema jos.

**Panoul „Servicii”** (modelul filomuro21, de la pragul de hamburger în sus). Se deschide sub header, pe toată lățimea, fundal `--surface`, linie de 1 px jos, `--shadow`. În container, o grilă `3fr 1fr`, gap `--s-5`:
- În stânga, câte un card pentru fiecare serviciu (acum trei, pe `repeat(auto-fit, minmax(240px, 1fr))`): fundal `--surface`, bordură 1 px `--line`, `--r-media`, padding `--s-6`, iconița (lucide, 28 px, stroke 1.75, `--teal`) în stânga, titlul serviciului în Public Sans 600 22 px, sub el o propoziție `--fs-small` `--muted`. La hover sau focus, bordura devine `--teal`, fără altă schimbare. Iconițe: `headset` (Suport IT), `scan-eye` (Securitate), `workflow` (Automatizări). Fără scut, lacăt, nor sau rotiță.
- În dreapta, caseta „Ai nevoie de ajutor?”: fundal `--surface-2`, `--r-media`, padding `--s-6`, titlu Public Sans 600 22 px, o propoziție `--muted`, iar jos un link subliniat cu săgeată spre Radiografie (textul din § Banda finală de CTA). Caseta are aceeași înălțime ca grila de carduri.
- Dedesubt, peste o linie de 1 px, banda cu telefonul, emailul și „Suport pentru clienți”.
- Accesibilitatea rămâne neschimbată: Esc și clic în afară închid panoul, focusul revine pe buton, panoul e în DOM imediat după buton.

**Butoane.** Toate sunt pastile (`--r-pill`), Public Sans 600, cu eticheta centrată, `min-height: 44px`, tranziție de 150 ms numai pe culoare.
- Principal: `--orange`, text `#00202E`, 18 px, padding 20 × 40 px. Hover: orange cu 8% navy (`color-mix`). Focus: outline 2 px `#00202E`, offset 3 px.
- Varianta `sm` (header, meniu mobil): 16 px, padding 14 × 28 px.
- Secundar plin: `--teal`, text alb (în dark, text `#00202E`). Rămâne butonul de WhatsApp de pe /suport.
- Outline: transparent, bordură 1 px `--line`, text `--teal`; opțional, o iconiță `circle-arrow-right` de 22 px în stânga (tiparul „Despre BT”). Se folosește în manifest și pentru acțiunile secundare. Hover: bordura devine `--teal`.
- Pe navy: fundal `#FFFFFF`, text `#00202E`. Outline pe navy: bordură `rgba(255,255,255,.35)`, text alb.
- Link terțiar: text `--teal` 600, subliniat cu `text-underline-offset: 4px`, cu săgeată.
- Focus implicit: outline 2 px `--teal`, offset 3 px. Orange nu se folosește niciodată pentru focus.

**Card.** Fundal `--surface-2`, fără bordură, fără umbră, `--r-card`, padding `--s-7` (32 px sub 768 px). Ordinea: eticheta teal cu majuscule → h3 → textul (`--muted`, opțional) → imaginea jos, cu `--r-media`, `aspect-ratio: 16/10`, `object-fit: cover`, la `--s-6` sub text și împinsă la baza cardului (`margin-top: auto`), ca imaginile dintr-un rând să stea pe aceeași linie. Fără imagine, cardul se oprește după text; nu se pune substituent. Dacă tot cardul e link, hover-ul schimbă fundalul spre `--line` (150 ms), fără mărire și fără mișcare. Cardurile dintr-un rând au aceeași înălțime.

**Hero (homepage).** TwoCol pe `--bg`, de la 1200 px, cu HeroStack în dreapta: eyebrow, h1 `--fs-hero` cu accent, lead `--fs-lead` la 34em, un singur buton principal și, lângă el, un link terțiar (nu un al doilea buton-pastilă). Sub 1200 px, o coloană, cu HeroStack sub butoane (cel mult 560 px). Fără FactStrip dedesubt. Înălțimea e dată de conținut, nu de 100vh.

**HeroStack** (16 octombrie 2026, înlocuiește HeroDiagram). Cinci straturi izometrice, după `ce-facem_01_animat.mp4`: romburi 2:1 în SVG inline, geometria din pixelii video-ului. Din 20 octombrie 2026 (cerut de Marius) plăcile sunt pătrate într-o proiecție 3D calculată (`heroStack3d.ts`, aceeași la build și în browser), cu camera fixă la 30° deasupra orizontului, ca romburile să rămână 2:1, și se pot roti în jurul axei verticale (§ Mișcare). Straturile 2…4: față `--surface-2`, contur 1 px `--muted` (estompat la 55 %), laturi `--line`; stratul 5: față `--surface`, muchie 2 px și laturi `--orange`; fundația: tokenii `--stack-base-top` / `-left` / `-right`, aceiași în ambele teme. Volum (17 octombrie 2026, cerut de Marius): plăcile 2…5 au grosimea 18 / 18 / 18 / 20 de unități (în video 10–12); lumina vine din dreapta-sus, ca în video, deci fiecare față e nuanțată din culoarea ei cu `color-mix` spre `--stack-hi` sau `--stack-shade` (fața de sus mai deschisă spre spate-dreapta, cu un luciu legat de ecran; fiecare latură între o nuanță închisă și una deschisă, după cât e de întoarsă spre lumină, care stă pe loc când stiva se rotește), muchiile de sus ale laturilor au o linie de lumină, cu atât mai tare cu cât latura e mai luminată, iar fiecare placă aruncă pe cea de dedesubt o umbră difuză, deplasată spre stânga-față, cu atât mai slabă și mai difuză cu cât golul e mai mare; fundația are o umbră pe „podea”. Cât de tare se nuanțează și cât de întunecate sunt umbrele dau tokenii `--stack-lift`, `--stack-sink`, `--stack-shadow-a`, `--stack-bevel`, diferiți pe teme. Etichetele sunt o listă ordonată de linkuri HTML, Public Sans (numele 600, cifra 500 `--teal`, la stratul 5 `--orange`), cu corpul legat de lățimea graficului (`3,1cqw`, între 14 și 19 px); nota „fundația” e `--muted`, minimum 12 px. Pe telefon (sub 480 px) desenul ia 42 % din lățime, liniuța dinaintea cifrei dispare, iar etichetele 1–3 se distanțează egal, ca linkurile să aibă 24 px între ele. Mișcarea e în § Mișcare. Graficul se aliniază pe verticală cu blocul de text.

**Hero (pagini interne).** O coloană pe `--bg`, aliniată la stânga: eyebrow, h1 `--fs-h1` cu accent, lead la 34em. `padding-block` de `--s-10` sus și `--s-9` jos. Fără fundal colorat. Despre: fără imagine, ca până acum.

**Steps.** Cercul are 56 px, fundal `--teal`, cifra în Barlow Condensed 700, 28 px, albă; urmează h3 și textul. Varianta `rail` își păstrează aranjamentul (linia de 1 px, săgeata teal la 85%).

**FactStrip.** Bandă `--surface-2` cu `--r-card` și 4–5 celule separate de linii verticale de 1 px `--line`. Eticheta ca la card (teal, majuscule, 14 px); valoarea în Public Sans 600, 22 px.

**NumberTiles.** Plăci `--navy-surface` cu `--r-card` și padding `--s-7`. Cifra în Barlow Condensed 700, `--fs-stat`, albă; explicația în `--on-navy-muted`. Numai cifre reale, niciodată contoare animate.

**Quote.** Fundal `--teal-soft`, `--r-card`, padding `--s-8`, fără bordură laterală. Citatul în Public Sans 600, 26 px, `line-height: 1.4`, fără italic; sub el numele și funcția în `--muted`, 16 px. Numai cu nume reale.

**CtaBand.** Bloc `--navy-surface`, `--r-card`, padding `--s-9` × `--s-8`. Titlul e Barlow Condensed 700, `--fs-h2`, alb, cu accent `--on-navy-accent`; textul în `--on-navy-muted`; butonul principal orange. De la 1024 px, stânga/dreapta pe același ax, ca până acum; sub 1024 px, stivuit. Apare o singură dată, la finalul fiecărei pagini.

**Faq.** Folosește `details`/`summary` native, separate de linii de 1 px `--line`. Summary-ul e Public Sans 600, 22 px, cu o iconiță `plus` de 24 px în dreapta, rotită la 45° când e deschis (fără altă animație). Răspunsul e 18 px, `--muted`, la 60ch. Prima întrebare e deschisă. JSON-LD `FAQPage` rămâne.

**Form.** Câmpuri de 64 px înălțime, bordură 1 px `--line`, `--r-field`, fundal `--surface`. Eticheta (un `<label>` real) stă în interiorul casetei, sus, 13 px, `--muted`; valoarea e sub ea, la 18 px. Focus: bordură 2 px `--teal`, fără glow. Eroare: bordură `--crit` și mesaj sub câmp. Textarea are minim 160 px. Butonul principal e full-width pe mobil. Semnătura de sub formular, fallback-ul `<noscript>` și Turnstile rămân. Formularul stă pe `--surface-2`, `--r-card`, padding `--s-7`; umbra nu se mai folosește.

**Rând de persoană** (`/echipa`). Structura rămâne aceeași: rânduri suprapuse separate de linii, fotografia de 240 px în stânga, fără alternanță. Fotografia primește `--r-media`. Numele: Public Sans 600, 26 px. Rolul: eticheta teal. Rândul de experiență: `--fs-small` `--muted`. Substituentul cu inițiale are aceeași rază, iar inițialele sunt în Barlow Condensed 700, 72 px, `--navy`.

**Marca LinkedIn.** Neschimbată (albastrul oficial, 20 px, zonă de 44 px).

**Figure.** Imagine cu `--r-media` și bordură 1 px `--line`, legenda `--fs-small` `--muted` sub ea, fără padding în jurul imaginii. În dark, capturile au `filter: brightness(.92)`.

**Caseta de logo** (studii de caz): `--r-media`, 260 px. Fundal alb, sau `--navy-surface-2` pentru logo-urile pentru fundal închis (`logoDark`), care rămâne navy în ambele teme.

**ConsentBanner.** Poziția și comportamentul rămân. Primește `--r-media`, iar cele două butoane identice devin pastile outline, `sm`.

**LangSwitch, ThemeToggle.** Rămân. LangSwitch (din 16 octombrie 2026, ca să se vadă mai bine): două segmente `RO` | `EN` într-o bordură de 1 px `--line` cu `--r-pill` și `--s-1` înăuntru, Public Sans 14 px 600. Limba curentă e plină, `--navy` cu text `--surface` (inversată automat în dark), fără link; cealaltă e link `--text`, hover `--surface-2` + `--teal`, focus outline 2 px. 40 px înălțime pe desktop, cât butonul `sm` de lângă; segmente de 44 px sub 1024 px. Același component în header, meniul mobil și footer.

**Prose.** 18 px / 1.65, `h2` ca la § Tipografie (excepția pentru text lung), linkuri subliniate cu `text-underline-offset: 3px`, imagini cu `--r-media`.

**Footer.** Pe `--surface`, linie de 1 px sus. Logo, o propoziție, coloanele de linkuri existente (fără a patra coloană de umplutură), datele de contact. Linkurile sunt Public Sans 16 px `--text`, iar hover-ul le face `--teal`.

## Imagini și grafică

- Regulile rămân: numai fotografii reale (portretele, capturile anonimizate), fără stoc și fără imagini generate care imită fotografii. Portretul lui Marius apare în aceleași patru locuri ca până acum.
- Toate imaginile au `--r-media`. Singura excepție e portretul din caseta de autor, rotund, de 96 px.
- Blocul vizual din TwoCol e doar ceva real (§ Layout). Fără mockup-uri de telefon generate, fără rotiri în perspectivă și fără umbre plutitoare.
- Iconițele sunt din `lucide`, maximum 16 în tot site-ul, 20–28 px, stroke 1.75, `--teal`. Apar în panoul Servicii, în FactStrip, în lista de verificări din Radiografie, pe butonul outline, la Faq și la comutatorul de temă.
- Logo-urile partenerilor rămân pe un rând static, monocrom `--muted`, colorat la hover. În dark, hover-ul doar le luminează (`--muted` → `--text`): Fortinet și Anthropic au textul negru în original. Aceeași componentă (`PartnerBadge`) pe homepage (36 px) și în footer (20 px). Fără carusel.

## Mișcare

Neschimbată: tranziții de 150 ms pe hover și focus, meniul mobil și panoul Servicii se deschid în 200 ms, nimic la scroll. Singura excepție e HeroStack: la încărcare, o singură dată, straturile cad pe rând (~2,8 s), apoi stiva face o jumătate de tură (180°, 2,2 s, ease-in-out) și se oprește în aceeași poziție ca la început. Cu mouse-ul pe desen (fără clic), mișcarea pe orizontală rotește stiva, 0,5° pe pixel, cu inerție; pe ecran tactil, tragerea pe orizontală (derularea pe verticală rămâne a paginii). Când mouse-ul pleacă, stiva se întoarce la cea mai apropiată poziție de repaus (pătratul arată la fel la fiecare 90°). Ciclul din video de la hover (demontare și reconstruire, 7 s) a fost înlocuit de rotație pe 20 octombrie 2026. Plăcile aterizează cu o decelerare lungă, fără depășire (curbă `cubic-bezier(.22, 1, .36, 1)`, ease-out-quint) și sunt opace pe aproape tot drumul (apar în 100 ms, dispar doar în ultimele 80 ms ale plecării), ca să nu se vadă prin ele; umbra fiecăreia se strânge și se închide când placa aterizează și se lărgește și se stinge când pleacă. `prefers-reduced-motion` dezactivează tot.

## Accesibilitate

Contrast AA peste tot; se verifică, în ambele teme, textul `--teal` pe `--surface-2` și `--muted` pe `--surface-2` (cardurile noi). Titlurile cu majuscule vin din CSS, deci cititoarele de ecran citesc textul normal. Focusul e vizibil pe toate elementele (§ Butoane). Rămân skip-link-ul, etichetele reale pe câmpuri, zonele de atingere de cel puțin 44 px și textul care se poate mări la 200% fără suprapuneri; la 200%, titlurile de 112 px nu trebuie să provoace scroll orizontal.

## Ce nu facem

- Gradienturi (nici pe hero-ul studiilor de caz), glassmorphism, glow, blob-uri, rețele de puncte, particule. Excepția: fețele plăcilor din `HeroStack`.
- Umbre pe carduri. Umbra apare doar pe panoul Servicii, pe meniul mobil și pe bannerul de consimțământ, și numai în light. Umbrele aruncate dintre plăcile din `HeroStack` țin de desen, nu de interfață, și apar în ambele teme.
- Raze în afara celor patru din tokeni.
- Mai mult de două fonturi. Mono-ul iese din proiect.
- Majuscule scrise în textul sursă. Vin numai din CSS, numai pe display și pe etichete.
- Mai mult de un cuvânt evidențiat pe titlu, sau evidențieri în alte culori decât teal.
- Două butoane-pastilă unul lângă altul. Al doilea e mereu link terțiar.
- Blocuri vizuale goale, mockup-uri generate, imagini de stoc cu oameni.
- Carusele, contoare animate, animații la scroll, hover cu mărire sau cu mișcare. Excepția (20 octombrie 2026, cerută de Marius): rotația lui `HeroStack` sub mouse, care e manipulare directă a desenului, nu efect de hover.
- Emoji, steaguri la comutatorul de limbă, redirecționare automată după limbă.
- Dark mode cu negru pur sau gri neutru.

## Studiu de caz (`CaseLayout`)

Hero pe `--navy-surface`, plin, fără gradient: eyebrow alb, h1 `--fs-h1` alb cu accent `--on-navy-accent`, lead `--on-navy-muted`, caseta de logo în dreapta. Urmează FactStrip, secțiunile din Markdown (TwoCol aside cu eyebrow-ul în stânga), cardurile „Ce am livrat”, NumberTiles, Quote dacă există, CtaBand.

## Articol (`PostLayout`)

Antet pe `--bg`: eticheta (Blog · categorie), h1 `--fs-h1` (fără accent, pentru că titlurile de articol nu se aleg pentru asta), lead și byline. Corpul e în `Prose`, la 70ch. La final, caseta de autor, apoi CtaBand. Listarea folosește Card-uri (eticheta = categoria, titlul, data, imaginea de copertă doar dacă există).
