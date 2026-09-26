# CLAUDE.md — reguli permanente pentru repo-ul bitup-site

Acest fișier stă în rădăcina repo-ului (nu în `spec/`) și e citit automat de Claude Code la fiecare sesiune. Specificația completă e în `spec/` și e sursa de adevăr; fișierul ăsta spune doar cum lucrezi cu ea și ce înseamnă „bine” aici.

## La începutul fiecărei sesiuni

Citești, în ordinea asta: `spec/README.md`, `spec/PLAN.md`, `spec/ARHITECTURA.md`, `spec/DESIGN.md`, `spec/PLACEHOLDERS.md`, apoi `NOTES.md` din rădăcină (ce s-a decis deja în sesiunile anterioare, ca să nu reiei discuții închise). Fișierele de conținut le citești când lucrezi la pagina respectivă: `spec/continut/NN-….md` (română) și `spec/continut-en/NN-….md` (engleză), împreună.

## Reguli de lucru

1. Lucrezi fază cu fază, exact în ordinea din `spec/PLAN.md`. La finalul fiecărei faze te oprești, îmi arăți ce ai făcut cu dovezi (capturi, output de comenzi, diff-uri) și așteptăm să bifăm împreună criteriile de acceptare. Commit la finalul fiecărei faze, cu mesaj care spune faza.
2. Textul din `spec/continut/` și `spec/continut-en/` e sursa de adevăr. Îl copiezi exact, cu diacritice, în componente și în colecții. Din proprie inițiativă nu rescrii, nu scurtezi, nu „îmbunătățești”. Dacă un text nu încape într-o componentă, schimbi componenta, nu textul. **Când îți cer eu o schimbare de text, o faci peste tot** — vezi regula 12.
3. Orice `[[…]]` din conținut e un placeholder pe care îl completez eu. Rămâne vizibil în pagină exact aşa, îl listezi la finalul fazei. Valorile deja completate sunt în `spec/PLACEHOLDERS.md` § Completate și intră în `src/lib/site.ts`, o singură dată.
4. Nu adaugi pagini, secțiuni, funcționalități, texte, imagini sau biblioteci care nu sunt în spec. Dacă ai o propunere, o scrii în `NOTES.md` sub „Propuneri” și continui conform spec-ului.
5. În `spec/` nu umbli din proprie inițiativă. Dacă găsești o greșeală sau o contradicție, o notezi în `NOTES.md` și mă întrebi. **Când schimbarea vine de la mine, actualizezi și `spec/`**, ca specificația să nu rămână în urma site-ului: fișierul de conținut din ambele limbi, `DESIGN.md` dacă s-a schimbat o componentă, `PLACEHOLDERS.md` dacă s-a schimbat un placeholder.
6. Respecți `spec/DESIGN.md` la literă: tokenii pentru ambele teme, cele două fonturi (Barlow Condensed pentru display, Public Sans pentru text), razele, scara de spațiere, componentele, lista „Ce nu facem”. DESIGN.md a fost înlocuit integral pe 26 septembrie 2026; deciziile vizuale mai vechi din NOTES.md care îl contrazic nu mai sunt valabile.
7. Nimic nu se încarcă de pe un CDN extern la runtime. Fonturile sunt self-hosted. Singurele cereri externe permise sunt în `spec/ARHITECTURA.md` § Domenii permise, iar Google Analytics pornește doar după Accept în banner.
8. Două limbi, română la rădăcină (`lang="ro"`) și engleză sub `/en/` (`lang="en"`), cu slug-urile din § Rute și `hreflang` peste tot. Fiecare pagină se face în ambele limbi în aceeași fază.
9. Două teme, light și dark, după `spec/DESIGN.md` § Dark mode. Fiecare pagină se verifică în ambele.
10. Cheile secrete (Resend, Turnstile) nu apar niciodată în repo, în `dist/` sau într-o variabilă `PUBLIC_`. Stau în Cloudflare Pages → Environment variables și, local, în `.dev.vars` (în `.gitignore`).
11. Verifici, nu declari. „E ok” fără dovadă nu e un răspuns. Rulezi build-ul, faci capturile, rulezi testele și îmi arăți rezultatul.
12. **O modificare se face întreagă sau deloc.** Orice schimbare pe care ți-o cer se duce, în aceeași sesiune, în toate locurile unde trăiește lucrul acela. Lista de verificat, de fiecare dată, punct cu punct:
    - **Ambele limbi.** Română și engleză, în aceeași fază. Dacă am dat textul doar în română, îl traduci tu, respectând § Voce, și îmi spui explicit că traducerea e a ta și trebuie confirmată. Nu mai las nimic „în așteptarea variantei EN”.
    - **Meta.** `title` și `description` ale paginii, pe ambele limbi, dacă schimbarea afectează ce promite pagina. Description ≤ 155 de caractere.
    - **`spec/continut/` și `spec/continut-en/`.** Fișierul paginii, adus la zi cu textul nou.
    - **Restul spec-ului.** `DESIGN.md` când s-a schimbat o componentă, `PLACEHOLDERS.md` când s-a schimbat un placeholder, `ARHITECTURA.md` când s-a schimbat o rută sau un flux.
    - **Locurile unde același lucru mai apare.** Meniu, footer, FactStrip, benzi de CTA, colecții, OG, JSON-LD, `sitemap`. Înainte să zici că ai terminat, dai `grep` după textul vechi și după numele lucrului schimbat, în tot repo-ul, și arăți rezultatul: zero potriviri rămase, sau explici de ce una rămâne.
    - **Raportul.** Enumeri fiecare fișier atins și fiecare loc verificat. Dacă ceva n-a putut fi făcut, spui care și de ce — nu treci mai departe tăcut.

## Ce înseamnă „premium” în proiectul ăsta

Premium nu vine din efecte, vine din precizie. Un patron de firmă deschide pagina și simte că a intrat într-un birou ordonat, nu într-un pliant.

- **Ritm.** Toate distanțele vin din scara de spațiere (`--s-1` … `--s-9`, `--section-y`). Nicio valoare inventată (`margin-top: 37px`). Secțiunile respiră egal; elementele dintr-un rând se aliniază la aceeași linie de bază.
- **Tipografie.** Ierarhia vine din mărime: titluri mari în Barlow Condensed 700, cu majuscule, text în Public Sans la 18–20 px. Textul sursă rămâne în sentence case; majusculele de pe h1, h2 și eyebrow vin numai din CSS. Cel mult un cuvânt evidențiat (teal) pe titlu, prin câmpul accent. `text-wrap: balance` pe titluri, `text-wrap: pretty` pe paragrafe, `hyphens: auto` cu `lang` corect, `tabular-nums` unde cifrele stau în coloană, paragrafele de marketing la 60ch, textul lung la 70ch, fără orfani în titluri.
- **Culoare.** Reținută. Navy pe titluri, teal pe acțiuni și accente, orange pe butonul de Radiografie și pe marca din logo. Excepție cerută de Marius pe 18 septembrie 2026: cele cinci noduri de pe spina graficului hero sunt tot orange, deci pe homepage orange-ul apare de mai multe ori pe primul ecran. Săgețile de la capete sunt teal. Pagina e albă; contrastul vine din navy pe alb și din secțiunile navy pline, nu din multe culori. În rest, regula ține: dacă o pagină pare „colorată”, e greșit.
- **Linii și suprafețe, nu umbre.** Separarea se face cu borduri de 1 px `--line` și cu fundalul `--surface-2` al cardurilor. Umbra apare doar pe panoul Servicii, pe meniul mobil și pe bannerul de consimțământ, și numai în light.
- **Stări desenate.** Focus vizibil (outline 2 px), hover discret (150 ms, schimbare de culoare, nu de mărime), active, disabled, eroare, loading, succes. Toate, pe toate elementele interactive, în ambele teme.
- **Fotografie reală.** Portretul lui Marius și capturile anonimizate din helpdesk, cu bordură și legendă. Nimic de stoc, nimic generat.
- **Ritm cu scop.** Tiparul de bază e TwoCol: textul (eyebrow, titlu, paragraf, un buton) într-o coloană, vizualul real în cealaltă, cu părțile alternate de la o secțiune la alta. Printre ele, rar, o secțiune de manifest centrată și o secțiune navy plină, niciodată două navy la rând. Grid-uri de carduri numai unde sunt chiar lucruri paralele.
- **Detalii.** Linkuri subliniate cu `text-underline-offset`, ghilimele românești „…”, spații fixe înainte de unități (`30 de minute`), numerele de telefon formatate, `tel:` și `mailto:` corecte, favicon SVG cu variantă dark, `<title>` cu separatorul „·”.
- **Viteză.** Sub 300 KB per pagină fără imagini, LCP sub 2,5 s pe mobil. Un site lent nu e premium, oricât de frumos ar fi.

## Mirosuri de „site generat” (verifici lista asta înainte să-mi arăți orice pagină)

1. Hero centrat cu o pilulă-badge deasupra H1 („Nou”, „✨”), sau un mockup de telefon generat, rotit în perspectivă, cu umbră plutitoare. (Hero-ul pe două coloane, cu HeroDiagram, e tiparul nostru, nu un miros.)
2. Gradient violet/albastru/roz, text cu gradient, „glassmorphism”, blob-uri, rețea de puncte, glow, aurora.
3. Grid de trei carduri identice iconiță + titlu + două rânduri, repetat pe fiecare pagină.
4. Iconițe generice în carduri: scut, lacăt, rachetă, fulger, nor, rotiță, bifă în cerc.
5. Umbră pe carduri, raze în afara celor patru din tokeni (999 / 28 / 16 / 12 px), `hover:scale-105`, `hover:-translate-y-1`.
6. Fade-in sau slide-up la scroll pe fiecare secțiune, contoare animate, carusele, marquee de logo-uri, cursor custom.
7. Paleta implicită Tailwind (slate, indigo, violet), fontul Inter, `text-gray-500` peste tot, `max-w-7xl mx-auto px-4` ca singur layout.
8. Secțiuni „De ce noi”, „Ce spun clienții” fără nume, „Trusted by”, „Cifre care vorbesc” cu procente inventate.
9. Title Case sau majuscule scrise în textul sursă (majusculele vin doar din CSS), emoji, „Află mai multe →”, „Începe acum”, „Descoperă”.
10. Toate secțiunile cu același ritm: imaginea mereu în aceeași parte, același fundal, aceeași înălțime, sau două butoane-pastilă unul lângă altul.
11. Footer cu patru coloane egale de 20 de linkuri și un formular de newsletter.
12. Titluri mari lângă text de corp sub 18 px, blocuri vizuale goale puse doar ca să umple coloana, sau totul înghesuit; padding-uri diferite de la o secțiune la alta.
13. Dark mode făcut prin inversarea culorilor, cu negru pur sau gri neutru.
14. Imagini de stoc sau generate: oameni zâmbind la laptop, servere albastre, lacăte 3D.
15. `<div>` peste `<div>` fără semantică: fără `<header>`, `<nav>`, `<main>`, `<section>` cu heading, `<footer>`, `<button>` real.
16. Estetică de brand personal pe un site de firmă: portretul fondatorului în hero sau în header, avatar rotund lângă butoane, semnătură de mână, citat mare al fondatorului pe primul ecran. Marius apare pe `/echipa`, în secțiunile „Cine răspunde” (mic) și în caseta de autor — nu pe `/despre`, care e pagina firmei, nu a fondatorului.

Dacă găsești oricare dintre astea în ce ai construit, o repari înainte să-mi arăți. Dacă spec-ul pare să ceară una dintre ele, m-ai citit greșit; recitește `spec/DESIGN.md`.

## Voce

BitUp vorbește la persoana I plural: „noi”, „răspundem”, „clienții noștri”; în engleză „we”, „our”, „us”. Cititorul e „tu” / „you”, niciodată „dumneavoastră”. În spatele BitUp trebuie să se simtă o firmă cu proces, nu un singur om. „Noi” nu inventează oameni: fără „echipa noastră de specialiști”, fără departamente sau roluri care nu există, fără limbaj de broșură („vă stăm la dispoziție”, „soluții personalizate”, „dedicați”). Când pluralul sună forțat, fraza se restructurează impersonal („un server nu se administrează fără să fie securizat”), nu se forțează.

Persoana I singular rămâne doar acolo unde e o declarație semnată, nu vocea firmei: secțiunile „Cine răspunde” de pe homepage și de pe /radiografie-it (au numele și portretul lui Marius); profilurile de pe `/echipa`; articolele de blog (semnate); citatele din studiile de caz. `/despre` e integral la plural: e pagina firmei, nu a fondatorului. Paginile legale sunt la plural. Caseta de autor din articole e la persoana a III-a (e o bio, nu vocea firmei). Textul din `spec/continut/` și `spec/continut-en/` respectă deja regula; nu se „corectează” înapoi spre singular și nu se trece la plural ce e în excepții.

## Cum verifici (la fiecare pagină și la fiecare fază)

- `npm run build` trece fără erori și fără warning-uri, cu o singură excepție cunoscută: cele două avertismente „No files found” pentru colecțiile `cases` și `blog`, goale până la Faza 3; ele trebuie să dispară la finalul Fazei 3.
- Capturi Playwright la 375, 768, 1024 și 1440 px, în light și dark, RO și EN, salvate în `qa/<faza>/`. Le deschizi și te uiți la ele (cu Read), nu doar le generezi; ce vezi greșit, repari.
- Diff textual între fișierul de conținut și textul extras din `dist/`: zero diferențe în afara formatării.
- Lighthouse pe mobil: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO 100. Paginile cu `noindex` (404, `/multumesc`, `/qa/*`) sunt exceptate de la scorul SEO; restul criteriilor rămân.
- Consola browserului e curată pe fiecare pagină: nicio eroare, niciun 404 (favicon inclus).
- Tastatură: fiecare element interactiv se atinge cu Tab și are focus vizibil; meniul mobil se închide cu Esc.
- Lista de mirosuri de mai sus, punct cu punct, în `NOTES.md`, cu „nu” la fiecare.
- Raportul către mine: ce ai făcut, ce ai verificat, ce a ieșit, ce placeholder-e au rămas, ce întrebări ai. Fără adjective.

## Ce nu instalezi

Tailwind, orice UI kit (shadcn, DaisyUI, Flowbite, Radix themes), biblioteci de animație (framer-motion, GSAP, AOS, Lottie), iconițe în afara setului `lucide` prin `astro-icon`, fonturi Google la runtime, jQuery, analytics în afara GA4 din spec, widget-uri terțe (chat, Calendly embed). Dacă crezi că una dintre ele ar ajuta, o propui în `NOTES.md` și aștepți. Excepție aprobată pe 26 septembrie 2026: `@fontsource/barlow-condensed` (300, 700, latin + latin-ext), self-hosted. Pachetul IBM Plex Mono se scoate.

## Fișiere de lucru

- `NOTES.md` (rădăcină): decizii luate, propuneri, placeholder-e rămase, rezultatele verificărilor pe faze. Îl actualizezi la fiecare fază.
- `qa/`: capturile și rapoartele Lighthouse, pe faze. E în repo, ca să vedem evoluția.
- `spec/`: neatins.
