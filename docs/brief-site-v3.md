# Brief site bitup.ro · v3.2 (27 octombrie 2026, cu răspunsurile lui Marius la întrebările din faza 0)

Înlocuiește poziționarea, designul și oferta stabilite în septembrie 2026. Partea tehnică este în `docs/spec-tehnica.md`.

## 1. Ce s-a schimbat față de septembrie
| Subiect | Septembrie | Acum |
|---|---|---|
| Poziționare | IT administrat, cu accent pe securitate | Specialist în securitate, automatizări și AI; IT-ul administrat e fundația, nu titlul |
| Public | IMM-uri | Companii în creștere, de la aproximativ 10 angajați, unde securitatea, automatizarea și AI-ul sunt priorități |
| Design | sistemul de design anterior | Manualul de brand v1.3 + `brand/tokens.css` (logo nou cu fundația, IBM Plex, „Straturile”, „Straturi în spațiu”) |
| Hero | „IT-ul firmei tale, administrat de cineva care răspunde de el…” | vezi secțiunea 3 |
| Oferta de intrare | „Radiografie IT” (discuție de 30 de minute) | suspendată; oferta principală: recomandare scrisă în 24 de ore (secțiunea 4) |
| Servicii | listă de servicii | 6 servicii: cele 5 straturi din diagramă + IT administrat și suport; BitUp Cloud ca produs al stratului Infrastructură |
| Parteneri | Fortinet Advocate | Microsoft Partner · Fortinet · Veeam Partner · partener Anthropic |

## 2. Principiile site-ului
- **Ajutăm, nu vindem.** Fiecare pagină de serviciu pornește de la o problemă pe care clientul o simte, arată ce îl costă și cum arată varianta bine organizată, apoi ce face BitUp.
- **Compania în față.** Primul ecran e tipografic, fără fotografia lui Marius. Marius apare pe Despre (portret, povestea, Concentrix fără titlul jobului) și mic, ca autor, pe articole.
- **Un singur sistem.** Serviciile se prezintă ca straturi peste fundația de securitate (diagrama din `brand/graphic/bitup_diagrama_servicii_*`).
- **Dovezi reale.** Cifre doar din `copy.md`; studii de caz doar cu acordul clientului sau anonimizate.

## 3. Hero (propunere, de trecut prin `umanizare-ro` și de aprobat)
- Etichetă: `BITUP TECHNOLOGY`
- Titlu: „Proiectăm, securizăm, automatizăm și administrăm IT-ul companiilor în creștere.”
- Text: „Un singur sistem, cu o singură echipă care răspunde de tot, de la servere și securitate la automatizări și agenți AI.”
- Buton principal: „Spune-ne problema de IT care te costă cel mai mult →” (duce la formular)
- Secundar: link „Vezi serviciile”
- Dreapta: ilustrația „Straturi în spațiu” sau diagrama serviciilor.

## 4. Oferta principală și formularul
Aceeași ofertă ca în campania Meta 2, ca omul să găsească pe site exact ce a văzut în reclamă:
**„Scrie-ne problema de IT care te costă cel mai mult. În 24 de ore primești o recomandare scrisă: ce am face noi în locul tău, chiar dacă nu lucrăm împreună.”**

Termenul, pe site și în formular: **„în 24 de ore lucrătoare”**.

Câmpuri: problema (obligatoriu, text) · numărul de angajați (1–9 / 10–49 / 50–249 / peste 250) · nume · email de serviciu · telefon (opțional) · firma · acordul pentru prelucrarea datelor (link spre Confidențialitate). Turnstile, trimitere prin Resend, eveniment GA4 `lead_submit` (doar cu consimțământ).
Secundar, în paginile relevante: „Programează o discuție” (Calendly) și instrumentele gratuite (Radiografia de securitate pe cyberxscore.ro, încadrarea NIS2 pe nis2.cyberxscore.ro). Calendly apare pe Contact ca buton „Programează o discuție”, cu link spre calendly.com (fără încorporare).

## 5. Harta site-ului

**Meniul principal:** Servicii (cu cele 6) · Proiecte · NIS2 · Despre · Blog · Contact, plus butonul principal.

### Serviciile: 6, fiecare cu pagina lui completă
Diagrama arată cele 5 straturi; al șaselea serviciu, IT administrat și suport, e cel care le ține pe toate în funcțiune. În meniu, pe hub și în subsol apar toate 6, în ordinea de mai jos.

| # | Pagina | Ce cuprinde |
|---|---|---|
| 1 | `/servicii/securitate-cibernetica` | Fundația: evaluarea riscului și a maturității, ISO 27001 și NIS2 (consultanță și implementare, nu audit), EDR/XDR, actualizări automate, backup testat, plan de răspuns la incidente. Referința la experiența enterprise, o singură dată. |
| 2 | `/servicii/infrastructura` | Microsoft 365, Active Directory hibrid, rețele, servere și **BitUp Cloud** (secțiune proprie pe pagină + pagina dedicată de mai jos) |
| 3 | `/servicii/dezvoltare-software` | Aplicații la comandă, platforme, panouri de indicatori care aduc datele din toate sistemele într-un loc |
| 4 | `/servicii/automatizari` | Integrări între programe (ERP, CRM, contabilitate, email, Excel): datele se introduc o singură dată |
| 5 | `/servicii/agenti-ai` | Agenți AI care preiau cererile repetitive, din datele firmei, și predau omului doar ce cere o decizie (exemplu real: agentul din helpdesk-ul BitUp, pe WhatsApp) |
| 6 | `/servicii/it-administrat` | **IT administrat și suport:** preluăm întreaga infrastructură a firmei (externalizare completă) plus suportul pentru utilizatori, cu un singur responsabil. Singura pagină cu garanțiile (sub 2 ore prin contract, raport lunar, 08:00–18:00, medie helpdesk sub 30 de minute). |

Fiecare pagină de serviciu are aceeași structură: problema clientului → ce îl costă → cum arată varianta bine organizată → ce facem concret (pașii) → proiecte legate (din `/proiecte`) → întrebări frecvente → îndemnul spre formular.

### Celelalte pagini
| Pagina | Rol | Note |
|---|---|---|
| `/` Acasă | Hero; problema (mai mulți furnizori, niciun responsabil); serviciile ca straturi (diagrama) + IT administrat; cum lucrăm (proiectăm → securizăm → automatizăm → administrăm); proiecte alese; echipa; îndemnul final pe bleumarin | Un singur element „Straturile”, în îndemnul final |
| `/servicii` | Hub scurt: diagrama celor 5 straturi + IT administrat, cele 6 carduri cu link spre paginile lor | Breadcrumb-urile și „Vezi serviciile” duc aici |
| `/bitup-cloud` | Produsul stratului Infrastructură: cloud privat, cloud computing, VPS, VPS administrat, backup și DR, 99,98 % disponibilitate în aproximativ 6 ani. Menționează că platforma publică de găzduire Hostero (hostero.ro) rulează pe BitUp Cloud. | Legat din Infrastructură și din Proiecte |
| `/nis2` | Ce cere NIS2, încadrarea gratuită (nis2.cyberxscore.ro), NIS2 Ready (nis2-ready.cyberxscore.ro), consultanță și implementare, nu audit | |
| `/proiecte` | Dovezile, în două secțiuni (vezi mai jos) | Înlocuiește `/rezultate`; colecția de conținut `proiecte` |
| `/despre` | Povestea, Marius (portretul existent), echipa (4, alb-negru, aceeași încadrare), partenerii, motto-ul | Fotografia lui Petre: [DE CONFIRMAT: fotografie nouă]; până atunci, carduri ale echipei fără fotografii sau cu un placeholder identic pentru toți |
| `/blog` | Articole; primul: „Cum ne-am construit propriul helpdesk”; RSS păstrat | |
| `/contact` | Formularul, butonul Calendly, telefon, email, „Cluj-Napoca”; pentru clienții existenți: helpdesk.bitup.ro și WhatsApp suport | Fără pagina /suport |
| Legale | Termeni, Confidențialitate, Cookie-uri (RO + EN), cu datele de identificare ale firmei | Vezi secțiunea 6 bis |
| `/en/…` | Aceeași structură, slug-uri traduse, **completă la lansare** | |

### `/proiecte`: două secțiuni
**Pentru clienți (studii de caz)**
- **Cosmio:** acord scris obținut; studiu de caz complet, cu nume și logo.

**Construite de noi (produse proprii)** — dovada că BitUp construiește, nu doar recomandă:
- **ProQ:** platformă SaaS proprie (pro-q.ro).
- **CyberXscore:** platformă de autoevaluare a securității (cyberxscore.ro), cu **Încadrare NIS2** (nis2.cyberxscore.ro, gratuit, aproximativ 3 minute) și **NIS2 Ready** (nis2-ready.cyberxscore.ro, platforma de lucru client–consultant pentru pregătirea NIS2).
- **Hostero / BitUp Cloud:** platforma de găzduire hostero.ro, pe cloudul privat BitUp, operat de aproximativ 6 ani cu 99,98 % disponibilitate.
- **BitUp Helpdesk cu agent AI pe WhatsApp:** platforma proprie de suport (helpdesk.bitup.ro), cu un agent AI integrat în WhatsApp [DE CONFIRMAT: ce face agentul concret, de când e în producție, ce cifre se pot publica]. Fără timpul mediu de răspuns aici: garanțiile și media helpdesk-ului stau doar pe `/servicii/it-administrat`, cu link spre ea.

Fiecare proiect: problema, ce am construit, tehnologiile principale (fără detalii confidențiale), rezultatul măsurabil (doar cifre aprobate), link. Serviciul legat (de exemplu CyberXscore → Securitate, Helpdesk → Agenți AI și IT administrat, Hostero → Infrastructură).

## 6. Arhitectura (detaliată în `docs/spec-tehnica.md`)
Astro static · deploy pe BitUp Cloud cu Dokploy și Docker Compose (nginx pentru site, un serviciu Node pentru `/api/lead`) · Cloudflare Turnstile · Resend · GA4 cu consent mode și banner cu „Accept” și „Refuz” egale · i18n RO / EN · temă deschisă și închisă · fonturi găzduite local (`brand/fonts/`).

## 6 bis. Adresa, SEO local și paginile legale
- Peste tot unde contează pentru SEO și GEO (subsol, Contact, datele structurate `Organization` / `ProfessionalService`, Google Business Profile), locația este **doar „Cluj-Napoca”**, identic.
- Datele de identificare a firmei (denumirea, sediul social din Câmpia Turzii, J12/1556/2020, CUI RO42613248) apar **numai în paginile legale** (Termeni, Confidențialitate), ca text. Legea 365/2002 (comerțul electronic) cere ca site-ul să afișeze aceste date. Nu intră în datele structurate și nici în subsol, deci nu concurează cu „Cluj-Napoca” pentru SEO local.

## 7. Decizii (stare la 27 octombrie 2026)
Închise: hero-ul și oferta (secțiunile 3–4), 24 de ore lucrătoare, 6 servicii, pagina Proiecte, BitUp Cloud = cloudul pe care rulează Hostero, NIS2 Ready (nis2-ready.cyberxscore.ro), acordul Cosmio, engleza completă la lansare, Calendly ca link, păstrarea proprietății GA4 (ID de măsurare G-N5DY194K0T).
Deschise:
1. Agentul AI din helpdesk: ce face concret și ce cifre se pot publica.
2. Fotografia lui Petre (cea existentă nu e bună).
