---
name: bitup-brand
description: Aplică identitatea vizuală și vocea BitUp Technology (manualul de brand v1.3) pe orice lucru vizibil public: pagini și componente de site, texte în română sau engleză, imagini OG, PDF-uri, emailuri, materiale sociale. Folosește-l înainte de a crea sau modifica UI, CSS, conținut, metadate sau orice asset grafic.
---

# BitUp · aplicarea brandului

Sursa de adevăr este `brand/` din rădăcina repo-ului. Ordinea de prioritate, când ceva se contrazice:
1. `brand/brand-tokens.json` și `brand/tokens.css` (valori: culori, fonturi, mărimi, spațieri, raze)
2. `brand/manual/BitUp_Manual_de_brand_v1.3.pdf` (reguli vizuale, exemple corecte și incorecte)
3. `references/copy.md` (vocea, faptele aprobate, ce nu se spune) și `brand/copy/ghid-copy-bitup_v1.4.md`
4. `docs/brief-site-v3.md` (poziționarea și structura site-ului)
5. `docs/spec-tehnica.md` (partea tehnică a site-ului).

## Pașii, de fiecare dată
1. **Înainte de cod:** citește `references/componente.md` pentru componenta pe care o atingi și `references/copy.md` dacă scrii text.
2. **Construiești doar din tokens.** Orice culoare, font, mărime sau rază vine din `brand/tokens.css` (variabile CSS). Nu scrii valori hex, px de font sau raze „din burtă”. Dacă îți lipsește o valoare, o derivi din tokens (ca `color-mix`) și o pui în blocul etichetat „Valori derivate” din `src/styles/global.css`, cu motivul. `brand/` nu se modifică în afara actualizărilor de brand.
3. **Textul în română** trece prin skill-ul `umanizare-ro` înainte să-l consideri gata, dar doar ca să scoți pattern-urile de text generat de AI. Vocea site-ului rămâne a companiei („noi” și „tu”); persoana întâi a lui Marius apare doar pe Despre și în blog. Indicațiile skill-ului despre „firme mici” nu se aplică site-ului. Textul în engleză respectă aceleași reguli din `references/copy.md`.
4. **Verifici:**
   - rulezi `python3 .claude/skills/bitup-brand/scripts/brand_check.py <director-build>` (de exemplu `dist/`) și repari tot ce raportează;
   - faci capturi de ecran (Playwright) la 390, 768 și 1440 px, în tema deschisă și în cea închisă, și te uiți la ele;
   - parcurgi `references/checklist.md`.
5. **Raportezi** ce ai schimbat, ce ai verificat și ce rămâne de decis de Marius. Nu inventezi fapte: ce lipsește marchezi `[DE CONFIRMAT: …]`.

## Regulile care nu se negociază (rezumat; detaliile sunt în referințe)
- **Culori:** doar cele 8 din paletă. Portocaliul nu e niciodată text pe alb (contrast 2,16). Teal deschis nu se folosește pe alb, iar teal-ul nu se folosește pe bleumarin.
- **Tipografie:** IBM Plex Sans (400 text, 500 butoane, 600 titluri și etichete), IBM Plex Mono 500 doar pentru cifre în tabele, coduri și ID-uri. Titlurile se scriu ca propoziții (majusculă doar la început). Majusculele sunt doar pentru etichete.
- **Forme:** rază maximă 2 px; butoanele au colțuri drepte (0 px), înălțime 48 px și săgeata „→” după text. Fără umbre decorative, fără gradiente, fără glassmorphism.
- **Logo:** doar fișierele din `brand/logo/` (SVG). Nu se redesenează, nu se recolorează, nu se scrie cu fontul. Pozitiv pe deschis, negativ pe închis, cu zona de protecție 1x (înălțimea literei B) și lățimea minimă de 120 px pentru logo-ul principal.
- **Elementul grafic „Straturile”:** linii teal la 55 %, care pornesc din marginea de jos, doar pe bleumarin, cel mult unul pe compoziție (`brand/graphic/straturi_*`).
- **„Straturi în spațiu”:** stiva de plăci (fundația jos = securitatea, placa portocalie sus) e ilustrația serviciilor (`brand/graphic/placi_*`, `bitup_diagrama_servicii_*`).
- **Imagini:** fără stock cu hackeri în glugă, coduri verzi, lacăte strălucitoare sau oameni care zâmbesc la laptop. Folosim tipografie, diagrame, capturi reale anonimizate, fotografiile echipei (alb-negru, aceeași încadrare).
- **Accesibilitate:** contrast AA minim; focus vizibil (`--focus-ring`); `prefers-reduced-motion` respectat; animații discrete, fără parallax.
