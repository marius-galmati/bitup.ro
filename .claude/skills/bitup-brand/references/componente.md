# Componentele BitUp pentru web

Toate valorile vin din `brand/tokens.css`. Exemplele folosesc variabilele de acolo.

## Antet
- Logo-ul principal (`bitup_principal_pozitiv.svg`; pe închis `bitup_principal_negativ.svg`), înălțime 32–40 px, aliniat stânga.
- Navigație IBM Plex Sans 500, 15–16 px, culoare `--color-text`; activ: subliniere 2 px teal.
- Un singur buton în antet (principal), în dreapta.
- Comutator de limbă RO / EN și de temă, discrete, text sau pictogramă linie, fără steaguri.
- Linie de jos 1 px `--color-border`. Fără umbră.

## Butoane
| Tip | Pe deschis | Pe închis |
|---|---|---|
| Principal | fundal `--bu-navy`, text alb | fundal `--bu-orange`, text `--bu-navy` |
| Secundar | contur 1 px bleumarin, text bleumarin | contur 1 px alb, text alb |
| Terțiar | link subliniat teal | link subliniat teal deschis |

Înălțime 48 px, padding orizontal 22 px, colțuri 0, IBM Plex Sans 500 15 px, săgeata „→” după text la butoanele care duc mai departe. O singură acțiune principală pe ecran.

Hover pe butonul principal: pe fundal deschis, fundalul devine teal (`--bu-teal`, text alb), iar săgeata se deplasează puțin spre dreapta. Pe bleumarin și în tema închisă, butonul rămâne portocaliu și se mișcă doar săgeata. Cu `prefers-reduced-motion`, săgeata nu se mișcă.

## Eticheta (label)
Rombul portocaliu (`brand/graphic/marcaj-romb.svg`, 12 × 6 px) + text 12 px, 600, MAJUSCULE, spațiere 0,08 em, teal (pe închis teal deschis). Stă deasupra titlurilor de secțiune. Exemple: „SERVICII”, „NIS2”, „STUDIU DE CAZ”.

## Secțiuni
- Ritm vertical: 64 px între secțiuni pe desktop, 48 px pe mobil; 16 px între titlu și text; 12 px între paragrafe.
- Lățime de conținut: maximum 1200 px; text lung maximum 68 de caractere pe rând.
- Alternanță: alb → ceață (`--bu-fog`) → alb; o singură secțiune bleumarin pe pagină (de obicei îndemnul final), unde poate apărea elementul „Straturile”.

## Hero (prima secțiune)
- Tipografic: eticheta, titlul Display (60 px desktop), un paragraf de cel mult două rânduri, butonul principal și, opțional, unul secundar.
- În dreapta: ilustrația „Straturi în spațiu” (`placi_straturi_pe_deschis.svg` / `_pe_inchis.svg`) sau diagrama serviciilor. Fără fotografie de persoană în primul ecran.

## Carduri
Fundal `--color-surface` sau contur 1 px `--color-border`, rază 2 px, padding 24–32 px. Titlu H3, text 17 px, link terțiar la final. Fără umbre. Pe hover: conturul devine teal.

## Cifre-cheie (stat)
Linie de sus 2 px bleumarin, cifra în IBM Plex Mono 500 (32–40 px), descriere 14 px slate. Pe închis, cifra poate fi portocalie. Doar cifre reale, aprobate (vezi `copy.md`).

## Tabele
Antet: etichete 12 px MAJUSCULE slate, linie de jos 2 px bleumarin. Rânduri: linie de jos 1 px `--bu-line`, fără linii verticale, fără zebră. Cifrele aliniate la dreapta, în Mono.

## Formulare
Câmpuri înalte de 48 px, contur 1 px `--color-border`, rază 2 px, eticheta deasupra (14 px, 500). Focus: contur 2 px teal. Eroarea: text bleumarin cu bară portocalie în stânga (nu text roșu sau portocaliu pe alb). Butonul principal pe toată lățimea pe mobil.

## Subsol
Fundal bleumarin, logo negativ, coloane cu linkuri teal deschis, date de contact, partenerii (doar text: „Microsoft Partner · Fortinet · Veeam Partner · partener Anthropic”), linkurile legale. Elementul „Straturile” poate porni din marginea de jos, dacă nu mai e folosit în pagină.

## Iconițe
Linie de 1,5–2 px, colțuri drepte sau ușor rotunjite, o singură culoare (bleumarin sau teal; pe închis alb sau teal deschis). Un singur set în tot site-ul (de exemplu Lucide), fără iconițe pline colorate.

## Imagini OG și PDF-uri
- OG 1200 × 630: fundal bleumarin, logo negativ stânga sus, titlul paginii în alb (IBM Plex Sans 600), elementul „Straturile” jos.
- PDF-uri (ghiduri, oferte, rapoarte): A4, margini 20 mm, IBM Plex încorporat, coperta ca în manual (bleumarin, logo negativ, „Straturile”).
