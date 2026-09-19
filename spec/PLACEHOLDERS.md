# PLACEHOLDERS.md — ce e completat și ce mai lipsește

Două liste. Prima e cu valorile finale, pe care Claude Code le pune în `src/lib/site.ts` și în conținut (în conținut sunt deja scrise ca text). A doua e cu ce mai apare ca `[[NUME]]` în conținut sau în config și blochează lansarea. Claude Code păstrează placeholder-ele rămase vizibile în cod și le listează la finalul fiecărei faze.

## Completate (valori finale, 10 septembrie 2026)

| Ce | Valoare | Unde se folosește |
|---|---|---|
| Nume firmă | BitUp Technology SRL | footer, JSON-LD, legal |
| Oraș publicat | Cluj-Napoca, atât (fără stradă, fără alte explicații); identic în Google Business Profile | footer, contact, despre, JSON-LD `addressLocality`, GBP |
| Sediul social | Câmpia Turzii, Str. Lazăr Gheorghe nr. 60, jud. Cluj | **doar** pe `/termeni` și `/confidentialitate`, în blocul de identificare a operatorului. Nu apare în footer, contact, despre sau JSON-LD. |
| CUI · Reg. Com. | RO42613248 · J12/1556/2020 | footer, contact, despre, legal |
| Telefon | +40 757 150 894 (`tel:+40757150894`) | header, footer, contact, suport, urgențe |
| WhatsApp suport (Cipri) | 40750263653 (`https://wa.me/40750263653`), afișat „+40 750 263 653” — Marius a confirmat rândul; Claude Code îl afișează pe /suport și Marius verifică o dată în staging că e numărul lui Cipri | /suport, meniu mobil |
| Email de contact | office@bitup.ro | footer, contact, formulare (`LEAD_TO_EMAIL`), legal |
| Email helpdesk | nu există; tichetele intră doar prin WhatsApp și helpdesk.bitup.ro | /suport (nu se afișează niciun email acolo) |
| Program | luni–vineri, 08:00–18:00; în afara lui, doar urgențele, la telefon | /suport, contact, JSON-LD `openingHoursSpecification` |
| Timp de răspuns | contractual: sub 2 ore în program; media reală din helpdesk: sub 30 de minute | FactStrip-ul de sub hero („Răspuns sub 2 ore în program”), /suport-it, /cum-lucram, /suport |
| LinkedIn firmă | https://www.linkedin.com/company/bitup-technology | footer, despre, blog, JSON-LD `sameAs` |
| LinkedIn Marius | https://www.linkedin.com/in/nicolae-marius-galmati | despre, contact, casetă de autor (nu în footer) |
| Vocea firmei | persoana I plural („noi”, „răspundem”); cititorul e „tu”. Excepții la persoana I singular: hero, § Povestea și § Traseul de pe Despre; secțiunile „Cine răspunde” de pe homepage și /radiografie-it; articolele de blog; citatele; caseta de autor e la persoana a III-a | tot conținutul (decizie din 14 septembrie 2026; regula e în `CLAUDE.md` § Voce) |
| Calendly | https://calendly.com/marius-galmati-bitup/30min | /multumesc, /contact, /en/thank-you, /en/contact |
| Portal helpdesk | https://helpdesk.bitup.ro | /suport |
| Formulare | Resend, prin funcția `/api/lead` | `ARHITECTURA.md` § Formulare |
| Analytics | Google Analytics 4, cu banner de consimțământ | `ARHITECTURA.md` § Analytics |
| Limbi | română (implicită) + engleză (`/en/`) | tot site-ul |
| Teme | light + dark | tot site-ul |
| Test de restaurare backup | „periodic, în funcție de contract” — textul rămâne „periodic” | /suport-it, /cum-lucram |
| Canal video | nu e public încă; nu se afișează niciun link | (scos din despre și footer) |

## Rămase (blochează lansarea)

| Placeholder | Unde apare | Ce trebuie |
|---|---|---|
| `[[ACORD_ECHIPA]]` | `continut/16-echipa.md`, `continut-en/16-team.md` | Data la care am acordul scris al fiecăruia dintre Petre, Samuel și Cristian pentru nume, fotografie, link de LinkedIn, numele fostului sau actualului angajator și textul exact publicat. Până atunci pagina e `noindex` și în afara sitemap-ului. |
| `[[RELATIE_ECHIPA]]` | § Intro, ambele limbi | O propoziție scrisă de Marius despre relația celor trei cu BitUp (colaboratori pe proiecte, asociați sau angajați). Fără ea, un client calculează greșit capacitatea firmei. |
| `[[LINKEDIN_CRISTIAN]]` | rândul lui Cristian Boanca, ambele limbi | URL-ul profilului de LinkedIn. Până atunci nu se randează iconița la el. |
| `[[FOTO_CRISTIAN]]` | § Oamenii | Fotografie pătrată, minimum 480×480, tratată identic cu celelalte trei: fundal simplu, aceeași încadrare cap-și-umeri. Până atunci, Cristian vede substituentul cu inițialele „CB”. |
| `[[ACORD_COSMIO]]` | `content/cases/ro/cosmio.md` și `en/cosmio.md` → `consent`, `draft` | Data acordului semnat. Până atunci, `draft: true` în ambele limbi. |
| `[[CITAT_COSMIN]]` | `cosmio.md` (ambele limbi), opțional | Citatul lui Cosmin, doar dacă e bifat în acord. Altfel se șterge blocul. |
| `[[LOGO_COSMIO_LOCAL]]` | `public/logos/cosmio.svg` | Logo-ul Cosmio salvat local (nu link către cosmio.ro) după acord. |
| `[[LOGO_PROQ_LOCAL]]` | `public/logos/proq.svg` | Logo-ul ProQ salvat local, varianta pentru fundal închis. |
| `[[LOGO_BITUP_SVG]]` | header, footer, OG | Logo-ul BitUp ca SVG, în două variante: pentru fundal deschis și pentru fundal închis (text alb/teal deschis). Dacă există doar PNG, la 2×, ambele variante. |
| `[[LOGO_PARTENERI]]` | homepage § Parteneri, FactStrip, footer, Despre | Badge-urile oficiale Microsoft Partner, Fortinet Advocate, Veeam Partner și Anthropic Partner, cu nivelul exact așa cum apare în portalul fiecăruia, și confirmarea că ai voie să le afișezi. Fișierele se pun în `public/logos/parteneri/` ca `microsoft-partner.svg`, `fortinet-advocate.svg`, `veeam-partner.svg`, `anthropic-partner.svg`; apar automat, fără modificări de cod. Până atunci, rândul e text. |
| `[[FOTO_CONTEXT]]` | Despre sau un articol (opțional; nu în hero-ul homepage-ului) | O fotografie reală în context de lucru. Dacă nu există, nu se pune nimic în locul ei. Recomandarea și promptul pentru varianta cu textură generată sunt în `assets/FOTO-CONTEXT.md`; textura, dacă apare vreodată, se folosește într-un singur loc, ca fundal al CtaBand. |
| `[[CAPTURA_RAPORT_LUNAR]]` | /cum-lucram, /suport-it (ambele limbi) și hero-ul homepage-ului (Figure, „document pe hârtie”, ambele limbi) | O captură anonimizată cu prima pagină a unui raport lunar din BitUp Helpdesk. Până există, hero-ul homepage-ului e tipografic, fără imagine. |
| `[[CAPTURA_RAPORT_RADIOGRAFIE]]` | /radiografie-it, /en/it-health-check | Un exemplu de raport de o pagină (semafor pe 10 puncte), anonimizat sau fictiv marcat „exemplu”. |
| `[[CAPACITATE_RADIOGRAFII]]` | /radiografie-it (text), /en/it-health-check | Câte radiografii faci pe săptămână și în ce ferestre (ex. „marți și joi, 10:00–12:00, maximum trei pe săptămână”). Dacă nu vrei să apară, se șterge propoziția. |
| `PUBLIC_TURNSTILE_SITE_KEY` | `.env` | Cheia publică Cloudflare Turnstile (widget „Managed / Invisible”, domeniile `bitup.ro` și `*.pages.dev`). |
| `TURNSTILE_SECRET_KEY` | Cloudflare Pages → Environment variables | Cheia secretă Turnstile. Doar pe server. |
| `RESEND_API_KEY` | Cloudflare Pages → Environment variables | Cheie API Resend cu permisiunea „Sending access”, restrânsă la domeniul `bitup.ro`. Doar pe server. |
| `LEAD_TO_EMAIL` | Cloudflare Pages → Environment variables | `office@bitup.ro`. |
| DNS Resend | Cloudflare DNS | Înregistrările DKIM/SPF/DMARC date de Resend la „Add domain” pentru `bitup.ro`; verificat în dashboard-ul Resend. |
| `PUBLIC_GA4_ID` | `.env` | ID-ul de măsurare GA4 (`G-XXXXXXXXXX`) al proprietății pentru bitup.ro. În GA4: retenție 2 luni, Google Signals oprit. |
| Rate limiting | Cloudflare WAF | O regulă pe `/api/lead`: 5 cereri / 10 secunde / IP (planul Free permite doar ferestre de 10 secunde). Apărarea principală rămâne Turnstile + honeypot + validarea din funcție. |

## Ce trebuie confirmat de Marius (nu sunt placeholder-e, sunt afirmații din text)

- Pagina de confidențialitate spune că emailurile de la `office@bitup.ro` sunt găzduite în Microsoft 365. Dacă nu e așa, se schimbă furnizorul în text.
- Pagina de cookies menționează cookie-ul tehnic `__cf_bm` al Cloudflare, care apare doar dacă Bot Fight Mode e activ. Dacă nu îl activezi, rândul se poate șterge; dacă rămâne, nu strică.
- Textele legale sunt scrise ca să reflecte configurația reală (GA4 cu consimțământ, Resend, Turnstile, Cloudflare, Calendly ca link), dar nu au fost verificate de un avocat. Înainte de lansare, pune un avocat să le citească o dată; sunt scurte.
- Lista de afirmații deduse din `UMANIZARE.md` § Pentru Marius rămâne valabilă.

## Decizii deja luate (nu sunt placeholder-e)

Hero varianta A, tipografic, fără fotografie (portretul fondatorului nu apare pe primul ecran; decizie din 14 septembrie 2026); vocea firmei la persoana I plural; oferta „Radiografie IT gratuită” / „Free IT Health Check”; fără prețuri pe site; orașul publicat e Cluj-Napoca, fără adresă de stradă; Concentrix cu numele pe Despre, fără titlul postului; lansare cu 2 studii de caz; parteneri: Microsoft Partner, Fortinet Advocate, Veeam Partner, Anthropic Partner; helpdesk: BitUp Helpdesk, asistentul Cipri; formulare prin Resend; GA4 cu consimțământ; RO + EN; light + dark.
