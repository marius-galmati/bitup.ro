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
| Timp de răspuns | contractual: sub 2 ore în program; media reală din helpdesk: sub 30 de minute | rândul de încredere („Răspuns sub 2 ore”), /suport-it, /cum-lucram, /suport |
| LinkedIn firmă | https://www.linkedin.com/company/bitup-technology | footer, despre, blog, JSON-LD `sameAs` |
| LinkedIn Marius | https://www.linkedin.com/in/nicolae-marius-galmati | footer, despre, casetă de autor |
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
| `[[ACORD_COSMIO]]` | `content/cases/ro/cosmio.md` și `en/cosmio.md` → `consent`, `draft` | Data acordului semnat. Până atunci, `draft: true` în ambele limbi. |
| `[[CITAT_COSMIN]]` | `cosmio.md` (ambele limbi), opțional | Citatul lui Cosmin, doar dacă e bifat în acord. Altfel se șterge blocul. |
| `[[LOGO_COSMIO_LOCAL]]` | `public/logos/cosmio.svg` | Logo-ul Cosmio salvat local (nu link către cosmio.ro) după acord. |
| `[[LOGO_PROQ_LOCAL]]` | `public/logos/proq.svg` | Logo-ul ProQ salvat local, varianta pentru fundal închis. |
| `[[LOGO_BITUP_SVG]]` | header, footer, OG | Logo-ul BitUp ca SVG, în două variante: pentru fundal deschis și pentru fundal închis (text alb/teal deschis). Dacă există doar PNG, la 2×, ambele variante. |
| `[[LOGO_PARTENERI]]` | homepage § Parteneri, footer | Badge-urile oficiale Microsoft Partner, Fortinet Advocate, Veeam Partner, cu nivelul exact așa cum apare în portalul fiecăruia, și confirmarea că ai voie să le afișezi. Până atunci, rândul e text. |
| `[[FOTO_CONTEXT]]` | homepage hero (opțional) | O fotografie reală în context de lucru. Dacă nu există, rămâne portretul. Recomandarea și promptul pentru varianta cu textură generată sunt în `assets/FOTO-CONTEXT.md`. |
| `[[CAPTURA_RAPORT_LUNAR]]` | /cum-lucram, /suport-it (ambele limbi) | O captură anonimizată cu un raport lunar din BitUp Helpdesk. |
| `[[CAPTURA_RAPORT_RADIOGRAFIE]]` | /radiografie-it, /en/it-health-check | Un exemplu de raport de o pagină (semafor pe 10 puncte), anonimizat sau fictiv marcat „exemplu”. |
| `[[CAPACITATE_RADIOGRAFII]]` | /radiografie-it (text), /en/it-health-check | Câte radiografii faci pe săptămână și în ce ferestre (ex. „marți și joi, 10:00–12:00, maximum trei pe săptămână”). Dacă nu vrei să apară, se șterge propoziția. |
| `PUBLIC_TURNSTILE_SITE_KEY` | `.env` | Cheia publică Cloudflare Turnstile (widget „Managed / Invisible”, domeniile `bitup.ro` și `*.pages.dev`). |
| `TURNSTILE_SECRET_KEY` | Cloudflare Pages → Environment variables | Cheia secretă Turnstile. Doar pe server. |
| `RESEND_API_KEY` | Cloudflare Pages → Environment variables | Cheie API Resend cu permisiunea „Sending access”, restrânsă la domeniul `bitup.ro`. Doar pe server. |
| `LEAD_TO_EMAIL` | Cloudflare Pages → Environment variables | `office@bitup.ro`. |
| DNS Resend | Cloudflare DNS | Înregistrările DKIM/SPF/DMARC date de Resend la „Add domain” pentru `bitup.ro`; verificat în dashboard-ul Resend. |
| `PUBLIC_GA4_ID` | `.env` | ID-ul de măsurare GA4 (`G-XXXXXXXXXX`) al proprietății pentru bitup.ro. În GA4: retenție 2 luni, Google Signals oprit. |
| Rate limiting | Cloudflare WAF | O regulă pe `/api/lead`: 5 cereri / 10 minute / IP. |

## Ce trebuie confirmat de Marius (nu sunt placeholder-e, sunt afirmații din text)

- Pagina de confidențialitate spune că emailurile de la `office@bitup.ro` sunt găzduite în Microsoft 365. Dacă nu e așa, se schimbă furnizorul în text.
- Pagina de cookies menționează cookie-ul tehnic `__cf_bm` al Cloudflare, care apare doar dacă Bot Fight Mode e activ. Dacă nu îl activezi, rândul se poate șterge; dacă rămâne, nu strică.
- Textele legale sunt scrise ca să reflecte configurația reală (GA4 cu consimțământ, Resend, Turnstile, Cloudflare, Calendly ca link), dar nu au fost verificate de un avocat. Înainte de lansare, pune un avocat să le citească o dată; sunt scurte.
- Lista de afirmații deduse din `UMANIZARE.md` § Pentru Marius rămâne valabilă.

## Decizii deja luate (nu sunt placeholder-e)

Hero varianta A; oferta „Radiografie IT gratuită” / „Free IT Health Check”; fără prețuri pe site; orașul publicat e Cluj-Napoca, fără adresă de stradă; Concentrix cu numele pe Despre, fără titlul postului; lansare cu 2 studii de caz; parteneri: Microsoft Partner, Fortinet Advocate, Veeam Partner; helpdesk: BitUp Helpdesk, asistentul Cipri; formulare prin Resend; GA4 cu consimțământ; RO + EN; light + dark.
