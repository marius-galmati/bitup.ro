# NOTES.md — decizii, propuneri, verificări

Fișier de lucru. Se actualizează la fiecare fază. Spec-ul din `spec/` e sursa de adevăr; aici stau deciziile luate în discuție, ce a rămas deschis și rezultatele verificărilor.

## Decizii luate (13–14 septembrie 2026, înainte de Faza 0)

### Voce și primul ecran (schimbări aplicate în spec, commit „spec: voce la persoana I plural, fondatorul iese din hero”)

- **Vocea firmei e la persoana I plural.** Regula completă și excepțiile sunt în `CLAUDE.md` § Voce. Textul din `spec/continut/` și `spec/continut-en/` a fost trecut frază cu frază, fără înlocuiri automate; lista frazelor schimbate e mai jos.
- **Hero-ul homepage-ului e tipografic, fără fotografie.** O coloană, aliniat la stânga, pe `--bg`; H1 la 22ch, lead la 60ch, două butoane. Imediat sub el, un FactStrip cu patru celule (Din 2020 · Cluj-Napoca · Răspuns sub 2 ore în program · badge-urile partenerilor). Rândul de încredere din hero a dispărut, ca informația să nu apară de două ori pe același ecran. După lansare, când există `[[CAPTURA_RAPORT_LUNAR]]`, hero-ul devine pe două coloane cu raportul lunar ca document pe hârtie în dreapta. Spec: `DESIGN.md` § Hero (homepage), `continut/01-acasa.md` § 1, `continut-en/01-home.md` § 1, `00-global.md` § FactStrip.
- **Portretul lui Marius apare în exact trei locuri:** hero-ul de pe Despre (3:4), secțiunile „Cine răspunde” de pe homepage și /radiografie-it (pătrat, 200 px, secțiune compactă pe `--surface-2`), caseta de autor din articole (96 px, rotund). Fără avatar sub formulare, fără avatar în byline-ul articolului. Spec: `DESIGN.md` § Imagini și grafică, § Form, § Articol.
- **Footer-ul are doar LinkedIn-ul firmei.** Profilul personal apare pe Despre, pe Contact și în caseta de autor.
- **Caseta de autor** are text nou, la persoana a III-a, în `00-global.md` § Caseta de autor (RO și EN).
- **Mirosul 16** (estetică de brand personal) e în `CLAUDE.md`.

### Răspunsurile lui Marius la întrebările din raportul de lectură

1. **Umbre.** Header sticky pe desktop cu linie de 1 px, fără umbră. Umbra rămâne doar pe meniul mobil, pe formular și pe bannerul de consimțământ; în dark toate trei se ridică prin bordură (`--shadow: none`). Aplicat în `DESIGN.md` § Header și în comentariul tokenului `--shadow`.
2. **Focus.** Outline 2 px teal, offset 2 px, peste tot; pe butonul orange, outline navy; în dark, teal-ul deschis din paletă. Orange nu se folosește pentru focus (sub 2:1 pe fundal deschis). Aplicat în `DESIGN.md` § Butoane și § Accesibilitate.
3. **Meta title/description peste limită.** Se copiază exact; lista cu lungimile e mai jos (§ Meta). Marius trimite variantele scurtate înainte de lansare. Nu blochează nicio fază.
4. **Blogul se publică la lansare.** Articolul primește `draft: false` în ambele limbi la Faza 3. Doar Cosmio rămâne `draft: true` până la acordul semnat.
5. **Fără fallback fără JavaScript la formulare.** Formularul cere JS (Turnstile); fără JS apare un `<noscript>` cu textul din `00-global.md` § Mesaje de formular și linkul Calendly. `ARHITECTURA.md` § Formulare actualizat: payload doar JSON, fără `<form method="post">`, fără 303, tokenul Turnstile obligatoriu.
6. **Rate limiting.** Cloudflare Free: regula e 5 cereri / 10 secunde / IP pe `/api/lead`. Apărarea principală e Turnstile + honeypot + validarea din funcție. Dacă apare spam real, pasul următor e o limitare în funcție, pe Workers KV (cheie per IP, TTL 10 minute), nu upgrade de plan. Aplicat în `ARHITECTURA.md` și `PLACEHOLDERS.md`.
7. **Header la 1024 px.** Telefonul se ascunde între 1024 și 1200 px (rămâne în meniul mobil și în footer). Dacă tot nu încape, comutatorul de limbă arată doar limba inactivă („EN”). Butonul de Radiografie nu se reduce. Aplicat în `DESIGN.md` § Header.
8. **WhatsApp pe /suport.** Buton principal plin teal, text alb (în dark, text navy pe teal deschis), o singură apariție; pagina nu are niciun buton orange. Aplicat în `DESIGN.md` § Butoane.
9. **Studii de caz, meta.** Title „{client} · {kicker} · BitUp”, description din `summary`; dacă depășește 155 de caractere, se taie la ultima propoziție întreagă, fără rescriere. `title` din frontmatter rămâne H1-ul din hero.
10. **Caseta de autor.** Textul dat de Marius, în `00-global.md` (RO și EN).
11. **Logo.** `logo-bitup.png` se descarcă de pe bitup.ro ca placeholder pentru Faza 1. Varianta pentru fundal închis o trimite Marius; până atunci, pe dark se aplică `filter: brightness(0) invert(1)` strict ca placeholder. **De înlocuit înainte de lansare.**

### Corecturi la lista de decizii tehnice

- **HSTS:** la lansare `max-age=31536000; includeSubDomains`, fără `preload`. Pe staging `max-age=300`. Preload se discută după o lună de producție. Aplicat în `ARHITECTURA.md` § Headere.
- **Font TTF pentru imaginile OG:** doar devDependency; se verifică la Faza 5 că nu ajunge în `dist/`.
- **IBM Plex Mono:** unde DESIGN cere o greutate care nu există (600), se folosește 500 cu `letter-spacing`, fără greutăți noi.
- **/multumesc:** ambele variante randate, ascunse cu `hidden`, comutate din JS înainte de paint (fără CLS). Rămâne `noindex`.

### Decizii tehnice implicite (aprobate de Marius „totul aprobat, cu două corecturi”)

- Sitemap: alternativele de limbă se generează din `routes.ts` prin `serialize`, nu prin opțiunea `i18n` a integrării (care presupune același slug în ambele limbi).
- `site: 'https://bitup.ro'` în `astro.config.mjs` (lipsea din spec; necesar pentru canonical, hreflang, sitemap, RSS).
- `build.format: 'file'`: `en/index.astro` devine `en.html`, ca `/en` să fie servit fără slash pe Cloudflare Pages; regula `/en/ → /en` din `_redirects` rămâne.
- `www.bitup.ro/*` nu poate sta în `_redirects` (sursa trebuie să fie o cale relativă); rămâne regulă de redirect din dashboard (Faza 6).
- `_headers` nu se aplică răspunsurilor din Pages Functions; `lead.ts` pune singur `Cache-Control: no-store`.
- Logo-ul pe teme: două `<img>` comutate din CSS după `data-theme` (un `<picture>` cu media query ar urma sistemul, nu alegerea utilizatorului).
- `color-scheme` se setează pe `[data-theme="light"]` și `[data-theme="dark"]`, nu doar `light dark` pe `:root`.
- Comutatorul de temă are două stări (light / dark), pornind de la preferința sistemului.
- Draft-urile: vizibile pe staging cu eticheta „Draft, nepublicat”, ascunse în producție; producția se recunoaște după `CF_PAGES_BRANCH === 'main'` la build.
- Articolul RO primește `translationOf` în frontmatter (nu e text), ca perechea să funcționeze în ambele sensuri.
- Imaginile articolului stau în `src/assets/blog/helpdesk/`, cu căile rescrise în frontmatter și în Markdown (format, nu text).
- Bugetul de 12 iconițe e consumat de lista din Radiografie plus soare și lună; hamburgerul și „închide” se desenează din CSS.
- Meniul mobil trimite la `/suport`, nu direct la wa.me (00-global e textul final).
- Blocul `/api/*` din `_headers` rămâne pentru cazul în care ruta răspunde static (404), dar headerele reale le pune funcția.

### Test de ritm (din C)

La finalul fiecărei pagini: captură la 1440 px, privită la 50% zoom, unde se văd doar formele. Dacă pagina arată ca un teanc de dreptunghiuri de aceeași înălțime, ritmul e greșit. Ce s-a văzut și ce s-a schimbat după test se notează aici, pe pagină.

## Răspunsurile la întrebările deschise (14 septembrie 2026, aplicate în commit-ul „spec: răspunsuri la întrebările deschise”)

1. **FOTO-CONTEXT.md** aliniat cu DESIGN § Hero (homepage): hero fără nicio imagine la lansare; portretul în trei locuri; `[[CAPTURA_RAPORT_LUNAR]]` devine obiectul din hero; textura, dacă apare vreodată, doar ca fundal al CtaBand (nu în spatele portretului; corectat și în DESIGN § Imagini și în PLACEHOLDERS); `[[FOTO_CONTEXT]]` pe Despre sau în articol. Promptul și lista „ce nu se generează” neatinse.
2. **FAQ Cum lucrăm:** „Lucrezi singur?” a devenit „Câți oameni sunt în spatele BitUp?” / „How many people are behind BitUp?”, cu răspunsul dat de Marius (nucleu mic + colaboratori; nimic nu stă în memoria unui om; tot în 30 de zile, scris în contract). Adăugat în UMANIZARE § Pentru Marius ca afirmație de confirmat.
3. **Radiografie, H2 „Cine o face”:** „Eu, nu o echipă de consultanți” → „Cine face radiografia” / „Who runs the health check”. Paragraful semnat rămâne la persoana I.
4. **EN „One person accountable”** → „One partner accountable” în H1-ul de pe Services („Three service groups. One partner accountable.”) și în cazul Cosmio. Aceeași formulare apărea și de trei ori în 03-it-support (description, cardul „Full”, lista „Fit”), unde RO spune „un singur responsabil”; am aplicat aceeași înlocuire și acolo. Neatins: 05-automation „one assistant, one job, one person accountable”, unde RO spune deliberat „un om responsabil” (un om care răspunde de asistent, în contrast cu AI-ul).
5. **Securitate § NIS2:** „De unde știm: experiența de securitate cu care a venit fondatorul, doi ani și jumătate de audituri ISO 27001…” (RO și EN, textul lui Marius). Adăugat în UMANIZARE § Pentru Marius.
6. **Traducerile EN** înlocuite exact: FactStrip „Response under 2 hours during business hours”; noscript „…or pick a time in the calendar.”; legenda „The monthly report every client gets. Anonymized.”
7. **/multumesc:** „a ajuns la noi” rămâne.
8. **Meta Contact** (RO și EN) înlocuită cu textul lui Marius („Telefon, email, formular sau un slot de 30 de minute în calendar. Îți răspundem personal, în maximum o zi lucrătoare. Cluj-Napoca.”). Restul meta rămâne cum e, listat mai jos (§ Meta).
9. **Verificarea secțiunilor mixte** (plural de firmă și persoana I singular în aceeași secțiune): rezultatul e mai jos, § Verificarea 9.
10. **UMANIZARE § Pentru Marius:** două afirmații noi adăugate (punctele 2 și 5); două citate vechi din listă („răspund în mai puțin de două ore”, „Răspund”) aduse la forma actuală („răspundem”).

Regulă nouă pentru fazele următoare (de la Marius): maximum trei editori în paralel, cu raport după fiecare fișier, nu la final.

## Verificarea 9: secțiuni cu plural de firmă și persoana I singular împreună

Metodă: fiecare fișier din `spec/continut/` și `spec/continut-en/` (fără blog) împărțit pe secțiuni `## …`; în fiecare secțiune s-au căutat forme de persoana I singular (verbe frecvente la persoana I, pronume, clitice; în EN I / my / me / mine / myself) și forme de plural de firmă (noi / nostru / ne / verbe la persoana I plural; în EN we / our / us). S-au listat secțiunile cu ambele. Apoi fiecare potrivire a fost citită.

**Rezultat: nicio secțiune nu amestecă vocea firmei la singular cu cea la plural.** Cele patru excepții (01 § 7 „Cine răspunde”, 06 § „Cine o face”, 09 hero + § Povestea + § Traseul, blogul) sunt secțiuni *pure* la persoana I singular, fără nicio formă de plural de firmă în ele, deci nu apar deloc în lista de secțiuni mixte. Secțiunile care au apărut ca „mixte” sunt toate false pozitive ale scanerului, verificate una câte una:

- Verbe la persoana a III-a plural identice ca formă cu persoana I singular: „vin vizitatorii” (00 banner, 15 § Ce folosim), „vin mai târziu” (02), „scriu pe WhatsApp” = angajații (03 § Ce include), „o aleg cele mai multe firme” (03 § Trei formule), „firmele care fac radiografia … văd cum lucrăm” (06 § Întrebări), „puțini furnizori răspund” (07 hero), „se fac doar după acordul tău” (07 § Cum se facturează), „patronii își pot evalua” (09), „statisticile pornesc” (14, 15), „îl folosesc clienții noștri” (05), „îl folosesc zilnic ingineri” (proq).
- Vocea cititorului sau a clientului: textul checkbox-ului de consimțământ („să-mi răspundă” / „I agree”), citatul „Avem backup. Cred.” / „I think”, „nu știu” din verificarea 9 și din placeholder-ul formularului (06), întrebările din FAQ formulate de patron („Trebuie să instalez ceva…”, „Dacă nu vreau să continui…”, „Cât durează până văd…”, „Trebuie să fiu eu, patronul…”, „Do I have to…”, „What happens with what I tell you?”, „How long until I see…”), replicile-exemplu de pe /suport („I clicked the link…”).

Niciun rest dintr-un fișier neterminat: 03 și 05 (editorii relansați) și 10–12 (editorul căzut după ce modificase) nu conțin nicio formă de persoana I singular în vocea firmei.

## Întrebări închise (istoric)

Lista de mai jos e cea trimisă lui Marius pe 14 septembrie; răspunsurile sunt mai sus.

1. **`spec/assets/FOTO-CONTEXT.md`** încă spune că „portretul real rămâne imaginea din hero” (§ Recomandarea, punctele 1 și 4, § Cum se folosește textura (a), § Pentru Claude Code). Contrazice A2. Nu e în lista fișierelor pe care le pot modifica; propun să-l actualizezi tu sau să-mi dai OK pentru: hero fără fotografie; textura doar în spatele portretului de pe Despre sau ca fundal al CtaBand; `[[FOTO_CONTEXT]]` pe Despre sau în articol.
2. **07-cum-lucram, FAQ „Lucrezi singur?”** Răspunsul începe cu „Da, și e deliberat: răspunde un om cu nume, nu un departament.” (afirmație, neatinsă conform regulii 5), apoi continuă la plural („lucrăm cu tehnicieni locali coordonați de noi”). Trei variante: (a) rămâne așa; (b) întrebarea devine „Cine răspunde, concret?” cu răspunsul actual; (c) se scoate din FAQ (schimbă și JSON-LD FAQPage). Recomand (b).
3. **06-radiografie-it, H2 din „Cine o face”: „Eu, nu o echipă de consultanți” / „Me, not a team of consultants”.** E în excepție (secțiune semnată), dar stă lângă un formular și un § Cum decurge la plural („te sunăm”, „notăm”). Rămâne?
4. **EN: „One person accountable”.** Apare în 02-services H1 („Three groups of services. One person accountable.”) și în case-studies/cosmio.md § Result („one number to call and one person accountable”). RO spune „un singur responsabil”, neutru. Nu e persoana I, deci nu l-am atins, dar contrazice intenția. Propun „One point of accountability.” / „one party accountable”.
5. **04-securitate § NIS2: „De unde știm: doi ani și jumătate de audituri ISO 27001 … într-o corporație din Fortune 500.”** Biografia lui Marius atribuită firmei, în aceeași logică cu reformularea ta din 01-acasa § 5 („Aducem experiență de securitate dintr-o corporație din Fortune 500”). Confirmă că e OK sau spune dacă revine la „De unde știu”.
6. **Traduceri făcute de mine, fără text dat de tine (de confirmat):** celula FactStrip EN „Response under 2 hours in business hours”; `<noscript>` EN „The form needs JavaScript for the anti-spam check. Call +40 757 150 894, write to office@bitup.ro, or pick a time in the calendar directly.”; legenda Figure din hero EN „The monthly report every client receives. Anonymized.”
7. **/multumesc, description:** „Cererea ta a ajuns la Marius.” → „Cererea ta a ajuns la noi.” (EN la fel). Nu era în lista ta de reformulări; am schimbat-o pentru coerență cu textul de sub H1 („Cererea a ajuns la noi”). Spune dacă revine.
8. **Studii de caz:** `title`-urile din frontmatter au 105–117 caractere; devin H1 (OK). Meta title-ul „{client} · {kicker} · BitUp” pentru ProQ ar fi „ProQ (produs BitUp) · Software la comandă și produs propriu · BitUp” (67 de caractere). Îl las așa sau scoți paranteza din `client`?
9. **11-contact, description:** „Scrie-i lui Marius Galmati direct: … Răspuns personal în maximum o zi lucrătoare.” (RO și EN) e la persoana a III-a, deci neatinsă, dar stă lângă H1-ul „Scrie-ne. Răspundem, nu un formular.” Când o scurtezi pentru limita de 155, vezi dacă rămâne „lui Marius Galmati” sau devine „Scrie-ne direct”.

## Fraze schimbate la A1 (voce la plural), fișier cu fișier

Format: „înainte” → „după”. Notele de layout, JSON-LD, ancorele, linkurile și placeholder-ele nu s-au atins. Perfectul compus („am făcut”, „am construit”) e identic la singular și plural și s-a lăsat cum era acolo unde contextul e deja plural.

### 00-global.md (RO)
- [Footer] „LinkedIn: BitUp Technology · Marius Galmati” → „LinkedIn: BitUp Technology” (A2: profilul personal iese din footer)
- [Banner] „Folosesc Google Analytics ca să văd ce pagini se citesc” → „Folosim Google Analytics ca să vedem ce pagini se citesc”
- [CtaBand] „Îți spun exact unde stai și ce ar însemna să preiau eu grija asta.” → „Îți spunem exact unde stai și ce ar însemna să preluăm noi grija asta.”
- [Rândul de încredere] secțiunea a devenit „FactStrip de sub hero (homepage)”, cu cele patru celule (A2)
- [Semnătura] „Avatar 32 px + „Răspund personal în maximum o zi lucrătoare. Marius Galmati, fondator BitUp.”” → „„Îți răspunde un om, în maximum o zi lucrătoare.” (rând de text în --muted, fără avatar)”
- [Caseta de autor] secțiune nouă, textul dat de Marius (B10)
- [Mesaje] „ca să te pot suna înapoi” → „ca să te putem suna înapoi”
- [Mesaje] „sună-mă direct la … / scrie-mi la office@bitup.ro” → „sună-ne direct la … / scrie-ne la office@bitup.ro”
- [Mesaje] „scrie-mi direct la office@bitup.ro” → „scrie-ne direct la office@bitup.ro”
- [Mesaje] rând nou: textul `<noscript>` (B5)
- [/multumesc] „Cererea ta a ajuns la Marius.” → „Cererea ta a ajuns la noi.” (vezi întrebarea 7)
- [/multumesc] „Am primit. Te sun eu.” → „Am primit. Te sunăm.”
- [/multumesc] „Cererea a ajuns la mine, nu într-o coadă. Te sun în maximum o zi lucrătoare, stabilim un slot … și îți spun ce am nevoie de la tine înainte” → „Cererea a ajuns la noi, nu într-o coadă. Te sunăm în maximum o zi lucrătoare, stabilim un slot … și îți spunem ce avem nevoie de la tine înainte”
- [/multumesc, contact] „Îți răspund personal, în maximum o zi lucrătoare, de la office@bitup.ro.” → „Îți răspundem personal, în maximum o zi lucrătoare, de la office@bitup.ro.”
- [404] „scrie-mi la office@bitup.ro și îl repar.” → „scrie-ne la office@bitup.ro și îl reparăm.”

### 00-global.md (EN)
- [Footer] „LinkedIn: BitUp Technology · Marius Galmati” → „LinkedIn: BitUp Technology”
- [Banner] „I use Google Analytics to see” → „We use Google Analytics to see”
- [CtaBand] „I'll tell you exactly where you stand and what it would mean for me to take that worry off your hands.” → „We'll tell you exactly where you stand and what it would mean for us to take that worry off your hands.”
- [Trust row] → „FactStrip under the hero (homepage)”
- [Signature] „32 px avatar + "I reply personally within one business day. Marius Galmati, BitUp founder."” → „"A person replies, within one business day." (text row in --muted, no avatar)”
- [Author box] new section (B10)
- [Messages] „so I can call you back” → „so we can call you back”
- [Messages] „call me directly at … / write to office@bitup.ro” → „call us directly at … / write to office@bitup.ro”
- [Messages] „email me directly at office@bitup.ro” → „email us directly at office@bitup.ro”
- [Messages] new row: `<noscript>` text (B5)
- [Thank-you] „Your request has reached Marius.” → „Your request has reached us.”
- [Thank-you] „Got it. I'll call you.” → „Got it. We'll call you.”
- [Thank-you] „The request came to me, not to a queue. I'll call within one business day, we'll pick a 30-minute slot …, and I'll tell you what I need from you beforehand” → „The request came to us, not to a queue. We'll call within one business day, we'll pick a 30-minute slot …, and we'll tell you what we need from you beforehand”
- [Thank-you, contact] „I'll reply personally, within one business day, from office@bitup.ro.” → „We'll reply personally, within one business day, from office@bitup.ro.”
- [404] „email me at office@bitup.ro and I'll fix it.” → „email us at office@bitup.ro and we'll fix it.”

### 01-acasa.md (RO)
- [§ 1 Hero] rândul de încredere și imaginea au fost scoase; adăugate: hero tipografic, FactStrip sub hero, varianta de după lansare cu raportul (A2)
- [§ 2 eyebrow] „De unde pornesc de obicei” → „De unde pornim de obicei”
- [§ 2 H2] „Trei propoziții pe care le aud în aproape fiecare firmă nouă” → „Trei propoziții pe care le auzim în aproape fiecare firmă nouă”
- [§ 5 H2] „Ce primești când răspunde un singur om de tot” → „Ce primești când răspunde un singur partener de tot”
- [§ 5, ultimul punct] „Am lucrat în securitate într-o corporație din Fortune 500. Aduc de acolo ce contează pentru o firmă de 30 de oameni, fără complexitatea inutilă.” → „Aducem experiență de securitate dintr-o corporație din Fortune 500 într-o firmă de 30 de oameni, fără complexitatea inutilă.”
- [§ 7] nota de layout: portret pătrat 430 px → 200 px, secțiune compactă pe --surface-2; textul rămâne la persoana I (excepție)
- [§ 11 H2] „Ce mă întreabă un patron înainte să scrie” → „Ce ne întreabă un patron înainte să scrie”
- [§ 11 FAQ 1] „eu preiau securitatea, backup-ul și ce nu știe el” → „noi preluăm securitatea, backup-ul și ce nu știe el”; „după ce văd ce aveți” → „după ce vedem ce aveți”
- [§ 11 FAQ 3] „de ce preiau” → „de ce preluăm”; „Îți spun un preț concret” → „Îți spunem un preț concret”; „Pe site nu pun cifre” → „Pe site nu punem cifre”

### 01-home.md (EN)
- [§ 1 Hero] same as RO (A2)
- [§ 2 eyebrow] „Where I usually start” → „Where we usually start”
- [§ 2 H2] „Three sentences I hear in almost every new company” → „Three sentences we hear in almost every new company”
- [§ 5 H2] „What you get when one person answers for everything” → „What you get when one partner answers for everything”
- [§ 5, last item] „I worked in security at a Fortune 500 corporation. I bring from there what matters for a 30-person company, without the needless complexity.” → „We bring security experience from a Fortune 500 corporation into a 30-person company, without the needless complexity.”
- [§ 7] layout note: 430 px → 200 px square portrait, compact section; text stays first person (exception)
- [§ 11 H2] „What an owner asks me before writing” → „What an owner asks us before writing”
- [§ 11 FAQ 1] „I take over security, backup, and what they don't know” → „we take over security…”; „once I see what you have” → „once we see what you have”
- [§ 11 FAQ 3] „on what I take over” → „on what we take over”; „I'll give you a concrete price” → „We'll give you a concrete price”; „I don't put numbers on the site” → „We don't put numbers on the site”

### 02-servicii-index.md (RO)
- [Cum se combină, H2] „De ce le țin împreună” → „De ce le ținem împreună”
- „Cele mai multe firme cu care lucrez încep cu abonamentul de suport.” → „Cele mai multe firme cu care lucrăm încep cu abonamentul de suport.”
- „Securitatea vine la pachet, pentru că nu știu să administrez un server fără să-l securizez și nu văd de ce ai plăti separat pentru asta.” → „Securitatea vine la pachet: un server nu se administrează fără să fie securizat și nu vedem de ce ai plăti separat.”
- „După câteva luni în care văd cum lucrează firma ta, îmi dau seama unde se pierd orele.” → „După câteva luni în care vedem cum lucrează firma ta, ne dăm seama unde se pierd orele.”
- „Nu împing pe nimeni spre el.” → „Nu împingem pe nimeni spre el.”
- [titlu + H2] „Ce nu fac” → „Ce nu facem”
- „Nu vând echipamente fără să le și instalez și să răspund de ele după.” → „Nu vindem echipamente fără să le și instalăm și să răspundem de ele după.”
- „Nu iau proiecte de dezvoltare pentru care nu pot asigura și mentenanța.” → „Nu luăm proiecte de dezvoltare dacă nu putem asigura și mentenanța.”
- „Nu promit „securitate totală”. Reduc riscul și pregătesc revenirea.” → „Nu promitem „securitate totală”. Reducem riscul și pregătim revenirea.”
- „Nu lucrez cu firme care vor doar „să vină cineva când se strică”.” → „Nu lucrăm cu firme care vor doar „să vină cineva când se strică”.”

### 02-services.md (EN)
- „Why I keep them together” → „Why we keep them together”
- „Most companies I work with start with the support subscription.” → „Most companies we work with start with the support subscription.”
- „Security comes with it, because I don't know how to run a server without securing it and don't see why you'd pay separately for that.” → „Security comes with it: there's no running a server without securing it, and we don't see why you'd pay separately.”
- „…I figure out where the hours are lost.” → „…we figure out where the hours are lost.”
- „I don't push anyone toward it.” → „We don't push anyone toward it.”
- [title + H2] „What I don't do” → „What we don't do”
- „I don't sell equipment without also installing it and answering for it afterward.” → „We don't sell equipment…”
- „I don't take development projects I can't also maintain.” → „We don't take development projects we can't also maintain.”
- „I don't promise "total security". I reduce the risk and prepare the recovery.” → „We don't promise "total security". We reduce the risk and prepare the recovery.”
- „I don't work with companies that only want "someone to come when it breaks".” → „We don't work with companies…”

### 03-suport-it.md (RO)
- [Hero, sub buton] „servere și de ce preiau.” → „servere și de ce preluăm.”
- [H2] „Cum arată IT-ul într-o firmă care mă caută” → „…care ne caută”
- „Asta preiau eu.” → „Asta preluăm.”
- [H2] „Ce faci tu, ce fac eu” → „Ce faci tu, ce facem noi”; [titlul listei] „Ce preiau eu, lună de lună” → „Ce preluăm, lună de lună”
- „ce nu rezolvă el ajunge la mine ca tichet” → „ce nu rezolvă el devine tichet”
- „Vorbesc eu cu ei, nu tu.” → „Vorbim noi cu ei, nu tu.”
- „Eu recomand cu prețul lângă, tu decizi.” → „Recomandăm cu prețul lângă, tu decizi.”
- „Eu mă asigur că au pe ce să ruleze” → „Ne asigurăm că au pe ce să ruleze”
- [Trei formule] „Eu preiau securitatea, backup-ul” → „Preluăm securitatea, backup-ul”; „Și sunt acolo când el nu e.” → „Suntem acolo când el nu e.”; „ce e al meu și ce e al vostru” → „ce e al nostru și ce e al vostru”
- [Cloud, H2] „Depinde, și îți spun de ce.” → „Depinde, și îți spunem de ce.”
- [Cloud] „Nu împing pe nimeni în cloud” → „Nu împingem pe nimeni în cloud”; „Am clienți cu tot în Microsoft 365 și niciun server în birou, și clienți care au nevoie de un server local” → „Unii clienți au tot în Microsoft 365 și niciun server în birou, alții au nevoie de un server local”
- [Cloud] „Administrez … Găzduiesc … Migrez … Și îți explic diferența de cost” → „Administrăm … Găzduim … Migrăm … Îți explicăm diferența de cost”
- [Echipamente, H2] „Aleg, cumpăr, instalez și răspund de ele după” → „Alegem, cumpărăm, instalăm și răspundem de ele după”
- [Echipamente] „Nu sunt magazin.” → „Nu suntem magazin.”; „îți spun ce ar trebui să cumperi” → „îți spunem…”; „Îl cumpăr la prețul furnizorului” → „Îl cumpărăm…”; „Îl configurez înainte să ajungă la angajat și îl trec în inventar.” → „Ajunge la angajat configurat și trecut în inventar.”; „știu exact ce e” → „știm exact ce e”; „Lucrez cu Fortinet” → „Lucrăm cu Fortinet”
- [Cum decurge o lună] „cele în care nu mă suni” → „cele în care nu ne suni”; „verific zilnic … Instalez … Răspund la cererile … rezolv ce apare. La sfârșitul lunii îți trimit raportul.” → „verificăm zilnic … Instalăm … Răspundem la cererile … rezolvăm ce apare. La sfârșitul lunii primești raportul.”
- „ce recomand pentru luna următoare” → „ce recomandăm pentru luna următoare”
- „Aici îți spun atât: prin contract, în program, răspund în mai puțin de două ore” → „Aici spunem atât: prin contract, în program, răspundem în mai puțin de două ore”
- [Potrivire] „Nu sunt cel mai ieftin și nu încerc să fiu.” → „Nu suntem cei mai ieftini și nu încercăm să fim.”
- [FAQ] „eu preiau ce nu știe sau nu are timp să facă, și sunt acolo când lipsește” → „preluăm ce nu știe …, și suntem acolo când lipsește”
- [FAQ preluare] „documentez tot, schimb parolele …, pun backup-ul la punct și îl testez, rezolv urgențele” → „documentăm tot, schimbăm parolele …, punem la punct și testăm backup-ul, rezolvăm urgențele”; „ce recomand mai departe” → „ce recomandăm mai departe”
- [FAQ] „Nu țin nimic ostatic.” → „Nu ținem nimic ostatic.”
- [FAQ] „vin eu în zona Cluj sau lucrez cu un tehnician local” → „venim în zona Cluj sau lucrăm cu un tehnician local”
- [FAQ] „servere și ce preiau.” → „servere și ce preluăm.”; „Că nu vând securitatea separat” → „Că nu vindem securitatea separat”

### 03-it-support.md (EN)
- „what I take over” → „what we take over” (hero, billing FAQ)
- „a company that calls me” → „a company that calls us”; „That's what I take over.” → „That's what we take over.”
- „What you do, what I do” → „What you do, what we do”; „What I take over, monthly” → „What we take over, monthly”
- „what he can't solve reaches me as a ticket” → „what he can't solve becomes a ticket”
- „I deal with them, not you.” → „We deal with them, not you.”; „I recommend, price attached, you decide.” → „We recommend…”; „I make sure they have somewhere to run” → „We make sure…”
- „I take over security, backup … And I'm there when they're not.” → „We take over security, backup … We're there when they're not.”; „what's mine and what's yours” → „what's ours and what's yours”
- „Depends, and I'll tell you why.” → „Depends, and we'll tell you why.”
- „I don't push anyone into the cloud” → „We don't push…”; „I manage all of Microsoft 365 … I host … I migrate” → „We manage … We host … We migrate”
- „I pick, buy, install, and answer for it afterward” → „We pick, buy, install, and answer for it afterward”
- „I'm not a store. … I tell you what to buy … I buy it at vendor price … I set it up before it reaches the employee and inventory it. … I know exactly what it is” → „We're not a store. … we tell you … We buy it … It reaches the employee configured and inventoried. … we know exactly what it is”
- „I work with Fortinet for firewalls” → „We work with Fortinet for firewalls”
- „In a normal month I check daily … I install updates in announced windows … I answer your team's requests” → „In a normal month we check daily … Updates go in announced windows … We answer your team's requests”
- „what I did proactively, what I recommend next month” → „what we did proactively, what we recommend next month”
- „by contract, during business hours, I respond in under two hours” → „…we respond in under two hours”
- „I'm not the cheapest and don't try to be.” → „We're not the cheapest and don't try to be.”
- „I take over what they don't know …, and I'm there when they're away. I've seen this work for years.” → „we take over …, and we're there when they're away. We've seen it work for years.”
- „I document everything, …, fix the backup and test it, …” → „we document everything, …, fix and test the backup, …”; „a list of what I recommend next” → „a list of what we recommend next”
- „I hold nothing hostage.” → „We hold nothing hostage.”
- „around Cluj I come myself;” → „around Cluj it's us;”
- „That I don't sell security separately from administration.” → „That security isn't sold separately from administration.”

### 04-securitate.md (RO)
- [Lead] „Eu am grijă să nu fii tu locul simplu” → „Avem grijă să nu fii tu locul simplu”
- [Situația] „Aud asta la fiecare a doua firmă. Și înțeleg de unde vine:” → „Auzim asta la fiecare a doua firmă. Și înțelegem de unde vine:”
- [Situația] „Ce văd cel mai des când intru într-o firmă nouă:” → „Ce vedem cel mai des într-o firmă nouă:”
- [Oameni] „Fac o oră pe an cu echipa ta, cu exemple reale.” → „O oră pe an cu echipa ta, cu exemple reale.”
- [Backup] „Ce fac: două copii, în două locuri” → „Ce facem: două copii, în două locuri”
- [Audit] „Verific tot: … Vorbesc scurt cu oamenii-cheie. Scriu un raport pe înțelesul patronului,” → „Verificăm tot: … Vorbim scurt cu oamenii-cheie. Un raport pe înțelesul patronului,”
- [Audit] „Dacă ai nevoie de ele, îți spun când și de la cine.” → „…îți spunem când și de la cine.”
- [NIS2] „Două cuvinte pe care le aud tot mai des de la patroni” → „…le auzim tot mai des de la patroni”
- [NIS2] „Îți spun în cuvinte simple … Transform cerințele … Fac partea tehnică și scriu documentele … te pregătesc pentru un audit extern.” → „Îți spunem … Transformăm … Facem partea tehnică și scriem documentele … te pregătim pentru un audit extern.”
- [NIS2] „De unde știu: … Aduc la scara ta doar ce contează.” → „De unde știm: … Aducem la scara ta doar ce contează.” (vezi întrebarea 5)
- [Incidente] „Răspund, și pentru asta nu trebuie să semnezi nimic înainte.” → „Răspundem, și pentru asta nu trebuie să semnezi nimic înainte.” (fraza avea deja continuarea cerută)
- [FAQ NIS2] „Îți răspund în cinci minute … Nu te trimit să citești legea.” → „Îți răspundem … Nu te trimitem să citești legea.”
- [FAQ date] „Le administrez, nu le colecționez. Accesul meu e documentat, … accesul meu se închide.” → „Le administrăm, nu le colecționăm. Accesul e documentat, … accesul se închide.”
- [FAQ garanție] „Ce garantez:” → „Ce garantăm:”

### 04-security.md (EN)
- „I make sure you're not the easy spot” → „We make sure you're not the easy spot”
- „I hear this at every second company, and I get why:” → „We hear this at every second company and get why:”
- „What I see most in a new company:” → „What we see most in a new company:”
- „What I do: two copies, in two places” → „What we do: two copies, in two places”
- „I check everything: … what I found,” → „We check everything: … what we found,”
- „If you need those, I'll tell you when and from whom.” → „If you need them, we tell you when and from whom.”
- „Two words I hear more and more from owners” → „Two words we hear more and more from owners”
- „I tell you in plain words … I turn requirements … I do the technical part … I prepare you for an external audit.” → „We tell you … We turn … We do … we prepare you…”
- „How I know: … I've seen what auditors ask for … I bring only what matters to your scale.” → „How we know: … We've seen … We bring only…”
- „I'll answer, and nothing to sign first.” → „We answer, and nothing to sign first.”
- „I'll answer in five minutes … I won't send you to read the law.” → „We answer in five minutes … We won't send you to read the law.”
- „I manage it, I don't collect it. My access is documented, … and when we part ways, you get everything and my access closes.” → „We manage it, we don't collect it. Access is documented, … and when we part ways you get everything and access closes.”
- „What I guarantee:” → „What we guarantee:”

### 05-automatizari.md (RO)
- [Dovada] „Înainte să propun cuiva un asistent AI, am construit unul pentru noi.” → „Înainte să propunem cuiva…”; „Îl folosesc clienții mei zilnic.” → „Îl folosesc clienții noștri zilnic.”
- [Dovada] „Nu spun asta ca să vând AI. Spun ca să știi că, atunci când îți propun ceva, l-am rulat în producție înainte.” → „Nu spunem asta ca să vindem AI, ci ca să știi că, când îți propunem ceva, l-am rulat în producție înainte.”
- [Software la comandă] „ProQ e dovada că pot duce un software de la o idee dintr-o fabrică la un produs pe care îl întrețin de ani de zile. Același mod de lucru îl aplic și la o aplicație internă de 5 utilizatori.” → „ProQ e dovada că putem duce un software … la un produs întreținut de ani de zile. La fel lucrăm și la o aplicație internă de 5 utilizatori.”
- „Există oameni mai buni la asta și îți spun cine.” → „…îți spunem cine.”
- [titlu] „## Ce spun clar înainte să începem” → „## Ce spunem clar înainte să începem”; [H2] „Trei lucruri pe care le spun la prima discuție” → „…le spunem la prima discuție”
- „Îți spun când AI-ul e răspunsul și când e doar la modă.” → „Îți spunem când…”
- „Nu promit economii pe care nu le-am măsurat.” → „Nu promitem economii…”
- [reformularea fixă] „Nu construiesc ce nu pot întreține. Orice aplicație vine cu răspunsul la „și când se strică, cine o repară?”. Răspunsul e eu, în contract.” → „Nu construim ce nu putem întreține. Orice aplicație vine cu răspunsul la «și când se strică, cine o repară?». Răspunsul e scris în contract.”
- [FAQ cost] „Îți spun după ce văd procesul, nu înainte.” → „Îți spunem după ce vedem procesul, nu înainte.”
- [FAQ date] „Depinde de ce construim și îți spun exact.” → „…îți spunem exact.”
- [FAQ întreținere] „Eu, prin contract de mentenanță,” → „Noi, prin contract de mentenanță,”
- [FAQ preluare] „Uneori. Mă uit la cod și îți spun sincer dacă merită întreținut sau rescris. Nu preiau ce nu pot înțelege.” → „Uneori. Ne uităm la cod și îți spunem sincer … Nu preluăm ce nu înțelegem.”
- [Banda finală] „Spune-mi ce se repetă și unde se pierd lucrurile.” → „Spune-ne ce se repetă…”

### 05-automation.md (EN)
- „Before proposing an AI assistant to anyone, I built ours.” → „…we built ours.”; „My clients use him daily.” → „Our clients use him daily.”
- „I'm not saying this to sell AI, but so you know what I propose, I've run in production first.” → „This isn't to sell AI, but so you know we've run what we propose in production first.”
- „The biggest thing I've built is ProQ” → „The biggest thing we built is ProQ”
- „ProQ is proof I can take software from an idea in a factory to a product I've maintained for years. I work the same way on a 5-user internal application.” → „ProQ is proof we can take software … to a product maintained for years. We work the same way…”
- „There are people better at those; I'll tell you who.” → „…; we'll say who.”
- „## What I say before we start” → „## What we say before we start”; „Three things I say in the first conversation” → „Three things we say…”
- „I'll tell you when AI is the answer and when it's just fashion.” → „We'll say when AI is the answer…”
- „I don't promise savings I haven't measured.” → „We don't promise savings we haven't measured.”
- [fixed] „I don't build what I can't maintain. Every application comes with the answer to "and when it breaks, who fixes it?" The answer: me, in the contract.” → „We don't build what we can't maintain. … The answer is written in the contract.”
- „I'll tell you after I see the process, not before.” → „You'll know after we see the process, not before.”
- „Depends on what we build; I'll tell you exactly.” → „…; we'll tell you exactly.”
- „Me, under a maintenance contract,” → „We do, under a maintenance contract,”
- „Sometimes. I look at the code and tell you straight … I don't take over what I can't understand.” → „Sometimes. We look at the code … We don't take over what we can't understand.”
- „Tell me what repeats and where things get lost.” → „Tell us what repeats…”

### 06-radiografie-it.md (RO)
- [eyebrow] „Ce verific” → „Ce verificăm”
- [Cum decurge 1] „Te sun în maximum o zi lucrătoare și stabilim un slot de 30 de minute.” → „Te sunăm în maximum o zi lucrătoare și stabilim un slot de 30 de minute.”
- [Cum decurge 2] „Îmi arăți ce ai, eu întreb, notez. Nu mă conectez la nimic, nu instalez nimic.” → „Ne arăți ce ai, întrebăm, notăm. Nu ne conectăm la nimic, nu instalăm nimic.”
- [Cum decurge 3] „Cu mine sau cu altcineva.” → „Cu noi sau cu altcineva.”
- [Ce primești] „cele trei lucruri pe care le-aș face primele, cu motivul; și, dacă ceri, ce ar costa să le rezolv eu,” → „cele trei lucruri pe care le-am face primele, cu motivul; și, dacă ceri, ce ar costa să le rezolvăm,”
- [Ce primești] „Dacă vrei să continuăm, îmi scrii tu.” → „Dacă vrei să continuăm, ne scrii tu.”
- [Formular] „Două minute. Te sun eu.” → „Două minute. Te sunăm.”
- [Formular, buton] „Trimite și te sun eu” → „Trimite și te sunăm”
- [Cine o face, reformularea fixă] „Fac eu fiecare radiografie, pentru că în 30 de minute văd lucruri pe care un formular automat nu le vede.” → „Radiografia o fac eu, nu un formular automat: în 30 de minute văd lucruri pe care un formular nu le vede.” (restul secțiunii rămâne la persoana I)
- [FAQ 1] „pentru că văd cum lucrez. … Amândouă variantele sunt în regulă pentru mine.” → „pentru că văd cum lucrăm. … Amândouă variantele sunt în regulă pentru noi.”
- [FAQ 2] „Nu. Nu mă conectez la nimic, nu instalez nimic, nu-mi dai nicio parolă. Îmi arăți pe ecran ce ai” → „Nu. Nu ne conectăm la nimic, nu instalăm nimic, nu ne dai nicio parolă. Ne arăți pe ecran ce ai”
- [FAQ 3] „Ce se întâmplă cu ce îmi spui?” → „Ce se întâmplă cu ce ne spui?”; „Notițele stau în sistemul meu, nu le dau nimănui, și dacă nu continuăm, le șterg la cerere.” → „Notițele stau în sistemul nostru, nu le dăm nimănui; dacă nu continuăm, le ștergem la cerere.”
- [FAQ 4] „Nu te sun, nu-ți trimit oferte.” → „Nu te sunăm, nu trimitem oferte.”
- [FAQ 5] „Da, chiar recomand.” → „Da, chiar recomandăm.”

### 06-it-health-check.md (EN)
- „What I check” → „What we check”
- „I've seen companies lose their domain.” → „We've seen companies lose their domain.”
- „I call you within one business day and we set a 30-minute slot.” → „We call you within one business day and set a 30-minute slot.”
- „You show me what you have, I ask, I take notes. I don't connect to anything, I don't install anything.” → „You show us what you have, we ask, we take notes. We don't connect to anything or install anything.”
- „With me or someone else.” → „With us or someone else.”
- „the three things I'd do first … what it would cost for me to fix them,” → „the three things we'd do first … what it would cost for us to fix them,”
- „If you want to continue, you write to me.” → „…you write to us.”
- „Two minutes. I'll call you.” → „Two minutes. We'll call you.”
- „Send and I'll call you” → „Send and we'll call you”
- [Who does it, fixed] „I do every health check myself, because in 30 minutes I see things an automated form doesn't.” → „The health check is done by me, not by an automated form: in 30 minutes I see things a form doesn't.”
- „because they see how I work. … Both are fine with me.” → „because they see how we work. … Both are fine with us.”
- „No. I don't connect to anything, I don't install anything, you give me no passwords. You show me what you have” → „No. We don't connect to anything or install anything, you give us no passwords. You show us what you have”
- „The notes sit in my system, I don't give them to anyone, and if we don't continue, I delete them on request.” → „The notes sit in our system, we don't give them to anyone; if we don't continue, we delete them on request.”
- „Nothing happens. I don't call you, I don't send you offers.” → „Nothing happens. We don't call you or send you offers.”
- „Yes, I'd recommend it.” → „Yes, we'd recommend it.”

### 07-cum-lucram.md (RO)
- [Radiografia] „Dacă vrei să continuăm, îmi scrii.” → „…ne scrii.”
- [Lună de lună, H2] „O lună obișnuită, în care nu mă suni” → „O lună obișnuită, în care nu ne suni”
- „Verific zilnic backup-urile și alertele, instalez actualizările în ferestre anunțate.” → „Verificăm zilnic backup-urile și alertele, instalăm actualizările în ferestre anunțate.”
- „Răspund la cererile echipei tale și rezolv ce apare, mic sau mare.” → „Răspundem cererilor echipei tale și rezolvăm ce apare, mic sau mare.”
- „Îți spun proactiv când văd ceva ce ar trebui să știi” → „Îți spunem proactiv când vedem ceva ce ar trebui să știi”
- „Și la sfârșitul lunii îți trimit raportul.” → „La sfârșitul lunii îți trimitem raportul.”
- [Cum ceri ajutor, 3] „Îl preiau eu.” → „Îl preluăm.”
- [Raportul lunar] „ce am făcut fără să mă cheme cineva … ce recomand pentru luna următoare.” → „ce am făcut fără să ne cheme cineva … ce recomandăm pentru luna următoare.”
- [Incidente, H2] „Cum tratez o urgență” → „Cum tratăm o urgență”
- „În program răspund în mai puțin de două ore, prin contract;” → „În program răspundem în mai puțin de două ore, prin contract;”
- „Ce fac în primele 24 de ore de la un incident de securitate e descris pe pagina de securitate.” → „Ce facem în primele 24 de ore după un incident de securitate e pe pagina de securitate.”
- [Bani] „ce preiau. Nu facturez ore … că îmi convine să ai probleme.” → „ce preluăm. Nu facturăm ore … că ne convine să ai probleme.”
- [Ieșirea] „și îmi închid accesul în ziua convenită. Nu țin nimic ostatic.” → „și ne închidem accesul în ziua convenită. Nu ținem nimic ostatic.”
- [FAQ „Lucrezi singur?”] „lucrez cu tehnicieni locali pe care îi coordonez eu. … aduc colaboratori, dar responsabilitatea și raportul rămân la mine.” → „lucrăm cu tehnicieni locali coordonați de noi. … aducem colaboratori, dar responsabilitatea și raportul rămân la noi.” (vezi întrebarea 2)

### 07-how-we-work.md (EN)
- „If you want to continue, you write to me.” → „…you write to us.”
- „A normal month, in which you don't call me” → „…you don't call us”
- „I check backups and alerts daily … I answer your team's requests … I tell you proactively when I see … And at the end of the month, I send you the report.” → „We check … We answer … We tell you proactively when we see … At the end of the month, we send you the report.”
- „I take it from there.” → „We take it from there.”
- „Also what I did without anyone asking …, what I noticed, and what I recommend for next month.” → „Also what we did …, what we noticed, and what we recommend for next month.”
- „How I handle an emergency” → „How we handle an emergency”
- „During business hours I respond in under two hours, by contract;” → „During business hours we respond…”
- „What I do in the first 24 hours of a security incident is on the security page.” → „What we do…”
- „and what I take over. I don't bill hours …, because that would mean it suits me when you have problems.” → „and what we take over. We don't bill hours …, it suits us…”
- „and I close my own access on the agreed day. I don't hold anything hostage.” → „and we close our access on the agreed day. We hold nothing hostage.”
- „For on-site work outside Cluj I use local technicians I coordinate myself. For big projects I bring in collaborators, but the accountability and the report stay with me.” → „…we use local technicians we coordinate. … we bring in collaborators, … stay with us.”

### 08-rezultate.md (RO)
- [Lead] „Dacă vrei să vorbești cu unul dintre ei, cere-mi și fac legătura.” → „Vrei să vorbești cu unul dintre ei? Cere-ne. Facem legătura.”
- [Cum publicăm un caz] „Întâi scriu cazul. Apoi îl trimit clientului, … care spune ce pot folosi” → „Întâi scriem cazul. Apoi îl trimitem clientului, … care spune ce putem folosi”

### 08-results.md (EN)
- [Description] „What I did, for whom, and what changed.” → „What we did, for whom, and what changed.”
- [H1] „What I've done, with names” → „What we've done, with names”
- [Lead] „If you want to talk to one of them, ask and I'll put you in touch.” → „Want to talk to one of them? Ask and we'll put you in touch.”
- „First I write the case. Then I send it to the client, … saying what I can use” → „First we write the case. Then we send it …, saying what we can use”
- „what vulnerabilities I found” → „what vulnerabilities we found”

### 09-despre.md (RO)
Hero, § Povestea și § Traseul rămân la persoana I (excepție).
- [titlu] „## Cum lucrez” → „## Cum lucrăm”
- [H2] „Trei lucruri în care cred, cu ce înseamnă ele pentru tine” → „Trei lucruri în care credem, cu ce înseamnă ele pentru tine”
- „Nu instalez nimic fără partea de securitate făcută. Nu vând securitatea separat pentru că nu funcționează separat. Uneori asta înseamnă că îți spun „nu” la ceva ce ai vrea.” → „Nu instalăm nimic fără partea de securitate făcută. Nu vindem securitatea separat pentru că nu funcționează separat. Uneori asta înseamnă un „nu” la ceva ce ai vrea.”
- „Îți spun ce fac, de ce, și cât costă, înainte să fac. … Dacă nu înțelegi ceva din ce îți spun, e problema mea, nu a ta.” → „Spunem ce facem, de ce și cât costă, înainte să facem. … Dacă nu înțelegi ceva din ce spunem, e problema noastră, nu a ta.”
- „Aleg lucruri care merg și peste cinci ani, nu care arată bine luna asta. Nu îți vând ce nu ai nevoie și îți spun când poți aștepta.” → „Alegem ce merge și peste cinci ani, nu ce arată bine luna asta. Nu-ți vindem ce nu ai nevoie și îți spunem când poți aștepta.”
- [titlu] „## Altceva ce construiesc” → „## Altceva ce construim”; [H2] „Ce mai fac” → „Ce mai facem”; „Construiesc CyberXscore” → „Construim CyberXscore”
- [CtaBand] „Vrei să vezi cum lucrez, înainte să semnezi ceva? … Îți spun exact unde stai.” → „Vrei să vezi cum lucrăm, înainte să semnezi ceva? … Îți spunem exact unde stai.”

### 09-about.md (EN)
- „## How I work” → „## How we work”; „Three things I believe in, and what they mean for you” → „Three things we believe in and what they mean for you”
- „I don't install anything … I don't sell security separately … Sometimes that means I say "no" to something you'd like.” → „We don't install anything … We don't sell security separately … Sometimes that means a "no" to something you'd like.”
- „I tell you what I do, why, and what it costs, before I do it. … If you don't understand something I tell you, that's my problem, not yours.” → „We tell you what we do, why, and what it costs, beforehand. … If you don't understand something we tell you, that's our problem, not yours.”
- „I pick things that still work in five years, not ones that look good this month. I don't sell you what you don't need, and I tell you when you can wait.” → „We pick what still works in five years, not what looks good this month. We don't sell you what you don't need, and we tell you when you can wait.”
- „## Something else I'm building” → „## Something else we're building”; „What else I do” → „What else we do”; „I'm building CyberXscore” → „We're building CyberXscore”
- „Want to see how I work, before you sign anything? … I tell you exactly where you stand.” → „Want to see how we work, …? … We tell you exactly where you stand.”

### 10-suport-clienti.md (RO)
- [Tabel] „Ce fac” → „Ce facem”; „Răspund imediat” → „Răspundem imediat”; „Răspund în program, … și rezolv în aceeași zi lucrătoare” → „Răspundem în program, … și rezolvăm în aceeași zi lucrătoare”; „ce nu rezolvă el, rezolv eu în ordinea sosirii” → „ce nu rezolvă el, rezolvăm în ordinea sosirii”
- [Pași, 3] „tichetul e deschis automat și îl preiau eu.” → „tichetul e deschis automat și îl preluăm.”
- [Eyebrow] „Ajută-mă să te ajut” → „Ajută-ne să te ajutăm”
- [Rând final] „Răspund, și nu trebuie să semnezi nimic înainte.” → „Răspundem, fără să semnezi nimic înainte.”

### 10-support.md (EN)
- [Table] „What I do” → „What we do”; „I respond immediately” → „We respond immediately”; „I respond during business hours … and usually fix it” → „We respond …”; „what it can't fix, I fix in order of arrival” → „…we fix in order of arrival”
- [Steps, 3] „and I take it over.” → „and we take it over.”
- [Eyebrow] „Help me help you” → „Help us help you”
- [Closing line] „I'll answer, and you don't need to sign anything first.” → „We'll answer, and there's nothing to sign first.”

### 11-contact.md (RO)
- [H1] „Scrie-mi. Răspund eu, nu un formular.” → „Scrie-ne. Răspundem, nu un formular.”
- [Email] „răspund în maximum o zi lucrătoare” → „răspuns în maximum o zi lucrătoare”
- [După] „Mesajul ajunge la mine, pe telefon, … Îți răspund personal în maximum o zi lucrătoare, de la office@bitup.ro. Dacă e ceva ce se rezolvă mai bine la telefon, te sun.” → „Mesajul ajunge la noi, pe telefon, … Îți răspunde un om, în maximum o zi lucrătoare, de la office@bitup.ro. … te sunăm.”
- [Sub formular] „Preferi să vezi întâi cum lucrez?” → „Preferi să vezi întâi cum lucrăm?”

### 11-contact.md (EN)
- [H1] „Write to me. I answer, not a form.” → „Write to us. We answer, not a form.”
- [Lead] „every way to reach me is here” → „every way to reach us is here”
- [Email] „I reply within one business day” → „reply within one business day”
- [Field label] „How can I help? *” → „How can we help? *”
- [After] „The message lands on my phone, … I reply personally within one business day, from office@bitup.ro. If it's better handled by phone, I call you.” → „The message lands on a phone, … A person replies, within one business day, from office@bitup.ro. … we call you.”
- [Under the form] „Prefer to see how I work first?” → „Prefer to see how we work first?”

### 12-blog-index.md (RO)
- [Lead] „Nu te învăț IT. Îți arăt cum să iei decizii mai bune despre el: … Tot ce scriu aici vine din firme reale și din ce construim noi.” → „Nu te învățăm IT. Îți arătăm cum să iei decizii mai bune despre el: … Tot ce scriem vine din firme reale și din ce construim.”
- [Eyebrow] „Despre ce scriu” → „Despre ce scriem”

### 12-blog.md (EN)
- [Lead] „I'm not teaching you IT. I show you how to make better decisions about it: … Everything here comes from real companies and what we build ourselves.” → „We're not teaching you IT. We show you … and what we build.”
- [Eyebrow] „What I write about” → „What we write about”
- „What I've automated and how much time it saved.” → „What we've automated and how much time it saved.”

### 13, 14, 15 (RO și EN)
Verificate frază cu frază: erau deja la plural. Nicio modificare. „răspunde Marius Galmati personal” (confidențialitate) e identificare nominală la persoana a III-a, rămâne.

### Studii de caz (cosmio, proq, RO și EN)
Verificate: deja la plural („am livrat”, „operăm”, „BitUp răspunde”). Nicio modificare. `[[CITAT_COSMIN]]` neatins.

### Blog
Neatins (articol semnat).

## Verificarea A1 (rezultatul grep-ului, 14 septembrie 2026)

Comenzi rulate din rădăcină, fără `blog/`:

```
grep -rn -E "Răspund |Lucrez |Fac |Construiesc|Administrez|Preiau|Promit|Vând|\bîmi\b|\bmie\b|\bmeu\b|\bmea\b|\bmei\b|\bmele\b|m-am| eu " spec/continut --include=*.md --exclude-dir=blog
grep -rn -w -E "I|my|me|mine" spec/continut-en --include=*.md --exclude-dir=blog
```

**RO, 4 potriviri, toate în excepții:**
- `01-acasa.md:133` „Lucrez în IT din 2017…” — § 7 „Cine răspunde”, declarație semnată (excepție).
- `06-radiografie-it.md:97` „Lucrez în IT din 2017… Radiografia o fac eu, nu un formular automat” — § „Cine o face” (excepție; conține reformularea fixă).
- `09-despre.md:14` „Sunt Marius Galmati. Am făcut BitUp ca să fiu eu acela” — hero Despre (excepție).
- `09-despre.md:25` „Lucrez în IT din 2017…” — § Povestea (excepție).

**EN, 27 de potriviri, niciuna în vocea firmei:**
- `00-global.md:91` „I agree that BitUp Technology SRL may use…” — textul checkbox-ului de consimțământ, vocea celui care bifează.
- `00-global.md:135`, `10-support.md:16`, `10-support.md:29` — „wa.me” (fals pozitiv pe „me”).
- `01-home.md:42` „We have backup. I think.” — citat client.
- `01-home.md:133` „I've worked in IT since 2017…” — § 7 „Who answers” (excepție).
- `06-it-health-check.md:37`, `:81` — „I don't know” în vocea clientului (verificarea 9, placeholder de formular).
- `06-it-health-check.md:97` — § „Who does it” (excepție, cu reformularea fixă).
- `06-it-health-check.md:108`, `:111`, `:114`, `07-how-we-work.md:132`, `:135` — întrebări din FAQ, vocea cititorului („Do I have to…”, „What happens with what I tell you?”, „How long until I see a difference?”).
- `09-about.md:13–44` — hero, § The story, § Timeline (excepții).
- `10-support.md:28`, `:36`, `:76`, `:86` — replici-exemplu ale clientului („my VPN isn't working”, „my printer isn't working”, „I clicked the link…”, „I want a ticket”).

Blog: neatins, deliberat (articol semnat).

## Lungimi de fișiere (caractere, înainte → după)

Regula 6 din A1: niciun fișier nu iese mai lung. Excepțiile sunt cele cerute explicit: 00-global (secțiuni noi: FactStrip, caseta de autor, textul `<noscript>`) și 01 (A2: hero nou și varianta de după lansare cu raportul).

| Fișier | Înainte | După | Delta |
|---|---:|---:|---:|
| `spec/continut/00-global.md` | 6920 | 7929 | +1009 (secțiuni noi cerute) |
| `spec/continut/01-acasa.md` | 8231 | 8617 | +386 (A2) |
| `spec/continut/02-servicii-index.md` | 3326 | 3317 | −9 |
| `spec/continut/03-suport-it.md` | 8917 | 8914 | −3 |
| `spec/continut/04-securitate.md` | 7827 | 7824 | −3 |
| `spec/continut/05-automatizari.md` | 7293 | 7293 | 0 |
| `spec/continut/06-radiografie-it.md` | 5601 | 5600 | −1 |
| `spec/continut/07-cum-lucram.md` | 6851 | 6850 | −1 |
| `spec/continut/08-rezultate.md` | 1868 | 1868 | 0 |
| `spec/continut/09-despre.md` | 4535 | 4527 | −8 |
| `spec/continut/10-suport-clienti.md` | 4456 | 4456 | 0 |
| `spec/continut/11-contact.md` | 2400 | 2399 | −1 |
| `spec/continut/12-blog-index.md` | 1860 | 1857 | −3 |
| `spec/continut/13-termeni.md` | 4730 | 4730 | 0 |
| `spec/continut/14-confidentialitate.md` | 7162 | 7162 | 0 |
| `spec/continut/15-cookies.md` | 4083 | 4083 | 0 |
| `spec/continut/studii-de-caz/cosmio.md` | 5671 | 5671 | 0 |
| `spec/continut/studii-de-caz/proq.md` | 6067 | 6067 | 0 |
| `spec/continut/blog/cum-ne-am-construit-propriul-helpdesk.md` | 6226 | 6226 | 0 (neatins) |
| `spec/continut-en/00-global.md` | 6952 | 7943 | +991 (secțiuni noi cerute) |
| `spec/continut-en/01-home.md` | 8333 | 8732 | +399 (A2) |
| `spec/continut-en/02-services.md` | 3391 | 3385 | −6 |
| `spec/continut-en/03-it-support.md` | 8675 | 8673 | −2 |
| `spec/continut-en/04-security.md` | 7296 | 7296 | 0 |
| `spec/continut-en/05-automation.md` | 6903 | 6902 | −1 |
| `spec/continut-en/06-it-health-check.md` | 5582 | 5580 | −2 |
| `spec/continut-en/07-how-we-work.md` | 7096 | 7094 | −2 |
| `spec/continut-en/08-results.md` | 1857 | 1857 | 0 |
| `spec/continut-en/09-about.md` | 4507 | 4506 | −1 |
| `spec/continut-en/10-support.md` | 4630 | 4628 | −2 |
| `spec/continut-en/11-contact.md` | 2361 | 2361 | 0 |
| `spec/continut-en/12-blog.md` | 1883 | 1878 | −5 |
| `spec/continut-en/13-terms.md` | 4365 | 4365 | 0 |
| `spec/continut-en/14-privacy.md` | 6790 | 6790 | 0 |
| `spec/continut-en/15-cookies.md` | 3858 | 3858 | 0 |
| `spec/continut-en/case-studies/cosmio.md` | 5577 | 5577 | 0 |
| `spec/continut-en/case-studies/proq.md` | 5797 | 5797 | 0 |
| `spec/continut-en/blog/how-we-built-our-own-helpdesk.md` | 6193 | 6193 | 0 (neatins) |

## Meta title și description, cu lungimile (B3)

Limitele din `ARHITECTURA.md` § SEO: title ≤ 60, description ≤ 155. Se copiază exact; Marius trimite variantele scurtate înainte de lansare. Ordonate descrescător.

### RO, title (limita 60)
- 71 · 06-radiografie-it · Radiografie IT gratuită: afli în 30 de minute unde stă firma ta · BitUp **peste**
- 66 · 02-servicii-index · Servicii IT pentru firme: suport, securitate, automatizări · BitUp **peste**
- 65 · 10-suport-clienti · Suport pentru clienții BitUp: WhatsApp, helpdesk, urgențe · BitUp **peste**
- 60 · 05-automatizari · Automatizări, AI și software la comandă pentru firme · BitUp
- 58 · 04-securitate · Securitate IT, backup și continuitate pentru firme · BitUp
- 55 · 07-cum-lucram · Cum lucrăm: de la radiografie la raportul lunar · BitUp
- 53 · 01-acasa · Suport IT și securitate pentru firme din Cluj · BitUp
- 52 · 03-suport-it · Suport și administrare IT în abonament, Cluj · BitUp
- 50 · 12-blog-index · Blog: decizii de tehnologie pentru patroni · BitUp
- 40 · 08-rezultate · Rezultate: studii de caz cu nume · BitUp
- 39 · 11-contact · Contact · BitUp Technology, Cluj-Napoca
- 38 · 09-despre · Despre Marius Galmati și BitUp · BitUp
- 37 · 14-confidentialitate · Politica de confidențialitate · BitUp
- 30 · 15-cookies · Politica de cookie-uri · BitUp
- 28 · 13-termeni · Termeni de utilizare · BitUp

### RO, description (limita 155)
- 214 · 05-automatizari · Mutăm procesele care trăiesc în Excel și pe email într-un sistem: automatizări între aplicațiile pe care le ai, asistenți AI cu scop clar, aplicații făcute pentru firma ta. Pornim de la proces, nu de la tehnologie. **peste**
- 199 · 07-cum-lucram · Ce se întâmplă concret când lucrezi cu BitUp: radiografia, planul, primele 30 de zile, o lună obișnuită, raportul lunar, cum ceri ajutor, ce facem la un incident, cum se facturează și cum se încheie. **peste**
- 194 · 04-securitate · Protecție împotriva atacurilor, accese sub control, backup testat, plan de continuitate. Audit de securitate și pregătire NIS2 / ISO 27001 pentru firme mici și mijlocii, pe înțelesul patronului. **peste**
- 192 · 09-despre · Cine răspunde de IT-ul tău când lucrezi cu BitUp: Marius Galmati, în IT din 2017, cu experiență de securitate într-o corporație din Fortune 500, și de ce a construit BitUp pentru firmele mici. **peste**
- 183 · 03-suport-it · Suport IT pentru firme de 10–100 de angajați: administrare servere, Microsoft 365, cloud, echipamente, cu securitatea inclusă. Suport pe WhatsApp, raport lunar, un singur responsabil. **peste**
- 182 · 12-blog-index · Articole scrise de Marius Galmati despre cum iei decizii mai bune despre IT-ul firmei tale: securitate pe înțelesul tău, backup, automatizări, ce merită și ce nu. Din proiecte reale. **peste**
- 177 · 06-radiografie-it · 30 de minute, remote, 10 verificări: backup, parole, accese, email, actualizări, securitate. La final primești o pagină cu ce e bine, ce e urgent și ce ar costa. Fără obligații. **peste**
- 174 · 02-servicii-index · Trei grupuri de servicii care merg împreună: suport și administrare IT în abonament, securitate și continuitate, automatizări și software. Un singur partener răspunde de tot. **peste**
- 169 · 10-suport-clienti · Ești client BitUp și ai o problemă? Scrie-i lui Cipri pe WhatsApp, deschide un tichet pe helpdesk.bitup.ro sau sună la numărul de urgență. Aici e tot ce trebuie să știi. **peste**
- 165 · 01-acasa · Suport și administrare IT pentru firme de 10–100 de angajați, cu securitatea inclusă. Un singur partener care răspunde de tot. Radiografie IT gratuită, 30 de minute. **peste**
- 160 · 08-rezultate · Ce am făcut, pentru cine și ce s-a schimbat. Studii de caz cu numele clientului, publicate cu acordul lui, fără detalii care ar putea fi folosite împotriva lui. **peste**
- 158 · 11-contact · Scrie-i lui Marius Galmati direct: telefon, email, formular sau un slot de 30 de minute în calendar. Răspuns personal în maximum o zi lucrătoare. Cluj-Napoca. **peste**
- 131 · 14-confidentialitate · Ce date colectăm prin bitup.ro, de ce, cât le ținem, cine le mai vede și ce drepturi ai. Scris ca să fie citit, nu ca să fie bifat.
- 112 · 13-termeni · Cine operează bitup.ro, ce poți face cu conținutul de pe site și ce nu, ce garantăm și ce nu. Scurt, pe înțeles.
- 102 · 15-cookies · Ce cookie-uri pune bitup.ro, ce fac, cât stau și cum le refuzi sau le ștergi. Lista completă e scurtă.

### EN, title (limit 60)
- 70 · 06-it-health-check · Free IT Health Check: where your company stands, in 30 minutes · BitUp **over**
- 66 · 10-support · Support for BitUp clients: WhatsApp, helpdesk, emergencies · BitUp **over**
- 64 · 02-services · IT services for companies: support, security, automation · BitUp **over**
- 64 · 07-how-we-work · How we work: from the health check to the monthly report · BitUp **over**
- 59 · 03-it-support · IT support and administration on subscription, Cluj · BitUp
- 57 · 04-security · IT security, backup, and continuity for companies · BitUp
- 57 · 05-automation · Automation, AI, and custom software for companies · BitUp
- 54 · 12-blog · Blog: technology decisions for business owners · BitUp
- 53 · 01-home · IT support and security for companies in Cluj · BitUp
- 40 · 08-results · Results: case studies with names · BitUp
- 39 · 11-contact · Contact · BitUp Technology, Cluj-Napoca
- 38 · 09-about · About Marius Galmati and BitUp · BitUp
- 22 · 14-privacy · Privacy policy · BitUp
- 21 · 15-cookies · Cookie policy · BitUp
- 20 · 13-terms · Terms of use · BitUp

### EN, description (limit 155)
- 219 · 07-how-we-work · What happens, concretely, when you work with BitUp: the health check, the plan, the first 30 days, a normal month, the monthly report, how you ask for help, what we do in an incident, how billing works, and how it ends. **over**
- 217 · 05-automation · We move processes living in Excel and email into a system: automations between your applications, AI assistants with a clear purpose, applications built for your company. We start from the process, not the technology. **over**
- 192 · 04-security · Protection against attacks, access under control, tested backup, continuity plan. Security audit and NIS2 / ISO 27001 preparation for small and mid-sized companies, in words owners understand. **over**
- 182 · 09-about · Who answers for your IT when you work with BitUp: Marius Galmati, in IT since 2017, with security experience at a Fortune 500 corporation, and why he built BitUp for small companies. **over**
- 181 · 02-services · Three service groups that go together: IT support and administration on a monthly subscription, security and continuity, automation and software. One partner answers for everything. **over**
- 180 · 03-it-support · IT support for companies with 10–100 employees: server administration, Microsoft 365, cloud, equipment, security included. WhatsApp support, monthly report, one person accountable. **over**
- 178 · 12-blog · Articles by Marius Galmati on making better decisions about your company's IT: security in plain language, backup, automation, what's worth it and what isn't. From real projects. **over**
- 168 · 06-it-health-check · 30 minutes, remote, 10 checks: backup, passwords, access, email, updates, security. You get one page: what's fine, what's urgent, and what it would cost. No obligation. **over**
- 158 · 10-support · BitUp client with a problem? Message Cipri on WhatsApp, open a ticket on helpdesk.bitup.ro, or call the emergency number. Everything you need to know is here. **over**
- 157 · 01-home · IT support and administration for companies of 10–100 employees, security included. One partner who answers for everything. Free IT Health Check, 30 minutes. **over**
- 156 · 08-results · What we did, for whom, and what changed. Case studies with the client's name, published with their consent, without details that could be used against them. **over**
- 144 · 14-privacy · What data we collect through bitup.ro, why, how long we keep it, who else sees it, and what rights you have. Written to be read, not ticked off.
- 143 · 11-contact · Write to Marius Galmati directly: phone, email, form, or a 30-minute slot in the calendar. Personal reply within one business day. Cluj-Napoca.
- 125 · 13-terms · Who runs bitup.ro, what you can and can't do with its content, what we guarantee and what we don't. Short, in plain language.
- 121 · 15-cookies · Which cookies bitup.ro sets, what they do, how long they stay, and how to decline or delete them. The full list is short.

Actualizare 14 septembrie, seara: descrierea de la Contact a fost înlocuită cu textul lui Marius (RO 134, EN 121 de caractere), deci nu mai e peste limită. Lista curentă a depășirilor: RO 3 title-uri (06, 02, 10) și 11 description-uri (05, 07, 04, 09, 03, 12, 06, 02, 10, 01, 08); EN 4 title-uri (06, 10, 02, 07) și 11 description-uri (07, 05, 04, 09, 02, 03, 12, 06, 10, 01, 08). Lungimile exacte sunt cele din listele de mai sus, cu excepția 03-it-support EN, acum 181 („one partner accountable”).

## Faza 0 — Schelet și unelte (14 septembrie 2026)

### Ce s-a făcut
- Proiect Astro **7.3.2** (inițial 5.18.2, urcat în aceeași zi după spike-ul de mai jos), `output: 'static'`, TypeScript strict (`astro/tsconfigs/strict`), schelet scris de mână, echivalent cu template-ul minimal. Integrări: `@astrojs/sitemap` 3.7.4, `@astrojs/rss` 4.0.19, `astro-og-canvas` 0.13.1, `astro-icon` 1.2.0 + `@iconify-json/lucide` (doar `sun`, `moon` incluse deocamdată).
- Fonturi self-hosted din fontsource: Bricolage Grotesque (variabil, axa wght), Source Sans 3 (variabil, axa wght), IBM Plex Mono 400 și 500. Importate ca subseturi latin + latin-ext, `font-display: swap` (implicit în fontsource). Pentru fonturile variabile, CSS-ul fontsource declară și alte subseturi (vietnamese, cyrillic, greek) cu `unicode-range`; fișierele lor ajung în `dist/_astro/`, dar browserul nu le cere: pe pagina de test s-au descărcat exact 8 fișiere, latin și latin-ext pentru fiecare font (verificat cu Playwright, lista cererilor).
- `src/styles/tokens.css` cu tokenii din DESIGN § Tokeni și § Dark mode (light în `:root`, dark în `:root[data-theme="dark"]` și în `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }`), `color-scheme` per temă. `src/styles/base.css`: reset minim, tipografie de bază, focus (outline 2 px teal, offset 2 px), reduced-motion, `.container`, `.eyebrow`, `.mono`.
- Scriptul de temă (7 rânduri, inline în `<head>`, înainte de CSS): citește `localStorage['bitup-theme']` și pune `data-theme` pe `<html>`; fără valoare salvată, decide sistemul.
- i18n: `astro.config.mjs` cu `defaultLocale: 'ro'`, `locales: ['ro','en']`, `prefixDefaultLocale: false`, `redirectToDefaultLocale: false`; `site: 'https://bitup.ro'`; `trailingSlash: 'never'`; `build.format: 'file'`. `src/i18n/ro.ts` și `en.ts` (microcopy copiat din 00-global), `routes.ts` (harta rutelor, ancorele, `noindexRoutes`), `index.ts` (`t`, `getLocale`, `localePath`, `dynamicPath`, `altUrl`, `absoluteUrl`, `alternates`, `formatDate`).
- Structura de foldere din ARHITECTURA § Structura proiectului, cu `.gitkeep` unde e goală, inclusiv `functions/api/`.
- `src/content.config.ts` cu schemele din ARHITECTURA § Colecții și subfolderele `ro/`, `en/` (goale până la Faza 3).
- `src/lib/site.ts` cu valorile din PLACEHOLDERS § Completate (o singură dată). Sediul social e acolo, marcat „doar pe paginile legale”.
- `.gitignore` (cu `.dev.vars`, `.env`, `dist/`, `.astro/`), `README.md`, `.nvmrc` (24), `.env.example`, `.dev.vars.example`. Cheile publice sunt declarate prin `astro:env` (`envField`, opționale), ca să nu apară nicăieri altundeva.
- Unelte QA: `qa/capture.mjs` (Playwright: capturi la 375/768/1024/1440 în light și dark, plus lista gazdelor externe cerute), `qa/contrast.py` (raporturi WCAG pe perechile de tokeni). Playwright e devDependency; Chromium descărcat local.
- Pagina temporară `src/pages/faza-0.astro` (`noindex`): cele trei fonturi cu diacritice, cele patru culori de brand, neutrele, un bloc navy cu butonul orange. Se șterge în Faza 1.

### Ce s-a verificat
- `npm run dev`: pornește, `/faza-0` răspunde 200, fără erori în log.
- `npm run build`: 0 erori. **2 avertismente**, ambele „No files found matching **/*.md” pentru `src/content/cases` și `src/content/blog`: colecțiile sunt definite în Faza 0 (PLAN, sarcina 6) și se umplu abia în Faza 3. Un placeholder `_….md` nu e ignorat de loader-ul din Astro 5 (dă eroare de schemă), așa că avertismentele rămân până la Faza 3. Nu există alt avertisment.
- `npm run check` (astro check, TypeScript strict): 0 erori, 0 avertismente, 0 sugestii.
- Capturi în `qa/faza-0/`: 8 fișiere (4 lățimi × 2 teme), privite. Cele trei fonturi se văd corect (Bricolage la titluri, Source Sans 3 la text, Plex Mono la eyebrow și cifre), diacriticele ăâîșț și ghilimelele „…” «…» sunt corecte. În dark, fundalul e navy cu tentă teal (nu negru), titlurile devin text deschis, teal-ul devine #5FB0B4, blocul navy e ușor ridicat cu bordură, orange și butonul sunt identice cu light.
- Cereri de rețea pe pagina de test: doar `localhost` (HTML, un CSS, 8 fișiere woff2). Zero cereri către fonts.googleapis.com sau orice CDN.
- Contrast (`python qa/contrast.py`): toate perechile din DESIGN trec AA (text 4.5:1, focus 3:1); orange pe fundal deschis dă 2.02:1, motivul pentru care nu e culoare de focus.

### Microcopy adăugat (confirmat de Marius, acum și în 00-global § Microcopy, RO și EN)
- skip-link: „Sari la conținut” / „Skip to content”; buton meniu: „Meniu” / „Închide meniul”, „Menu” / „Close menu”; `aria-label` navigație header: „Navigare principală” / „Main navigation”; footer: „Navigare secundară” / „Secondary navigation”. Regulă: orice text de interfață nou intră întâi în 00-global, apoi în cod.

### Lista de mirosuri (CLAUDE.md, 1–16)
Nu se aplică încă unei pagini reale; pagina de test e temporară și nu intră în site. Se bifează de la Faza 1.

### Placeholder-e rămase
Neschimbate față de `spec/PLACEHOLDERS.md` § Rămase: nicio pagină reală încă.

## Faza 1 — Layout, componente de bază, header bilingv, temă, 404 (14 septembrie 2026)

### Ce s-a făcut
- `BaseLayout.astro`: `<html lang>`, title/description din props, canonical absolut, `hreflang` ro/en/x-default (din `routes.ts`; `noAlternates` pentru 404 și QA), Open Graph de bază (imaginea vine în Faza 5), `theme-color` pe temă, scriptul de temă inline (7 rânduri, înainte de CSS), preload pentru Bricolage (latin + latin-ext), JSON-LD Organization + ProfessionalService din `src/lib/schema.ts` (plus ce dă pagina), skip-link, `Header`, `<main id="continut">`, `Footer`, `ConsentBanner` (ascuns; doar vizual, logica în Faza 5).
- `Header.astro`: logo 132 px (placeholder: `logo-bitup.png` luat din bundle-ul site-ului actual, `/assets/logo-bitup-Db_m5i5h.png`, 790×213; pe dark, `filter: brightness(0) invert(1)` strict ca placeholder până la `[[LOGO_BITUP_SVG]]`), „Servicii ▾” ca buton real (`aria-expanded`, `aria-controls`; click deschide/închide, Esc închide și readuce focusul, click în afară închide, focusul care iese închide), Cum lucrăm, Rezultate, Despre, Blog, telefonul (mono, `--muted`, vizibil doar de la 1200 px), `RO · EN`, comutatorul de temă, butonul orange (mic). Sticky pe desktop cu linia de 1 px, fără umbră; nu e sticky pe mobil. Sub 1024 px: hamburger desenat din CSS (fără iconiță), panou full-height cu Radiografie sus, Servicii ca listă desfășurată, linkurile principale, apoi telefon, „Clienți: scrie-i lui Cipri pe WhatsApp” (→ /suport), limbă și temă jos; `aria-expanded`, Esc, focus trap, scroll blocat pe body.
- `ThemeToggle.astro`: două stări, pornind de la sistem; `aria-pressed`, `aria-label` + `title` din i18n; iconițe `lucide:sun` / `lucide:moon` (2 din bugetul de 12); salvează în `localStorage['bitup-theme']`, fără tranziție de culoare.
- `LangSwitch.astro`: mereu în ordinea `RO · EN`; limba curentă e text (`aria-current`), cealaltă e link cu `hreflang` și `lang`, `data-event="lang_switch"`. Pe 404 duce la `/` și `/en`.
- `Footer.astro`: patru coloane inegale (2fr bloc de adresă, 1.2fr servicii + firma, 1fr parteneri la ≥ 1024; la 768 listele se așază una sub alta; pe mobil o coloană), fără newsletter; badge-urile partenerilor ca text cu `[[LOGO_PARTENERI]]` sub fiecare; rândul de jos cu © , Termeni, Confidențialitate, Cookies, „Setări cookie-uri” (buton, funcțional în Faza 5) și `RO · EN`. Doar LinkedIn-ul firmei (A2).
- Componente: `Button` (primary orange, secondary, tertiary cu săgeată, teal plin pentru WhatsApp; `size="small"` pentru header; disabled), `Section` (tone bg/surface/surface-2, linie opțională), `Container` (1120 / 760), `Eyebrow`, `Card` (bordură sus 3 px teal, fără umbră, link jos), `Steps`, `FactStrip` (cu sau fără etichete), `NumberTiles`, `Quote`, `CtaBand` (text din i18n, variante default/blog, titlu/text înlocuibile), `Prose`, `Figure` (photo/screenshot/document; screenshot cu brightness .92 în dark), `LegalLayout` (hero pe surface-2 + data actualizării + Prose în coloana îngustă).
- `404.astro`: o singură pagină, RO sus, EN sub o linie cu `lang="en"`, `noindex`, fără hreflang; textul din ambele 00-global.
- `/qa/componente` (RO, toate componentele în toate stările, paleta, scara tipografică) și `/en/qa/components` (header, footer, butoane, FactStrip, banner, CtaBand cu microcopy EN): rute dinamice al căror `getStaticPaths` returnează `[]` când `CF_PAGES_BRANCH === 'main'` (`src/lib/env.ts`), `noindex`, excluse din sitemap prin `filter`. Textele de pe ele sunt din spec (01-acasa, proq, 09-despre), nu inventate.
- `public/favicon.ico`: placeholder din favicon-ul site-ului actual, redus la 16/32/48 px; favicon-ul SVG cu variantă dark vine odată cu `[[LOGO_BITUP_SVG]]`.
- Unelte QA noi: `qa/keyboard.mjs` (Tab prin toate elementele cu verificarea outline-ului, dropdown-ul cu Enter/Esc/click în afară, meniul mobil cu Enter/Esc/focus trap), `qa/contrast.py` extins cu stările de hover/activ/focus, `qa/capture.mjs` acceptă căi fără slash.

### Ce s-a verificat
- `npm run build`: 0 erori; avertismentele cunoscute pentru colecții, plus `[@astrojs/sitemap] No pages found!` (404 și QA sunt excluse; dispare în Faza 2, când apar paginile). `npm run check`: 0 erori, 0 avertismente, 0 sugestii.
- Capturi în `qa/faza-1/`: 24 (404, /qa/componente, /en/qa/components × 375/768/1024/1440 × light/dark), privite. Corectate după prima rundă: „Cum lucrăm”, telefonul și butonul din header se rupeau pe două rânduri (nowrap), separatorul din `RO · EN` pierdea spațiul, ordinea RO · EN era inversată pe EN, footer-ul la 768 înghesuia listele (acum stivuite), imaginea din Figure nu se încărca în captură (lazy). La 1024 px telefonul e ascuns și totul încape pe un rând; la 1200+ apare telefonul.
- Cereri de rețea: doar localhost pe toate paginile (fonturi latin + latin-ext, CSS, logo, favicon).
- Status 404 real (`astro preview`): `/pagina-inexistenta` → 404, `/en/pagina-inexistenta` → 404. Pe Cloudflare Pages, `404.html` e servit cu 404 pentru orice rută inexistentă.
- Tastatură (`node qa/keyboard.mjs pagina-inexistenta`): 37 de elemente atinse cu Tab pe desktop, toate cu focus vizibil, primul e skip-link-ul; Servicii: Enter deschide, Tab intră în submeniu, Esc închide și readuce focusul, click în afară închide; mobil (375): Enter deschide meniul, focusul intră în panou, `aria-label` devine „Închide meniul”, Tab rămâne în meniu, Esc închide și readuce focusul pe buton. Toate trec.
- Contrast (`python qa/contrast.py`): 35/36 perechi trec (a 36-a e orange pe fundal deschis, listată intenționat ca „de ce nu e focus”). Includ hover-ul principal (#E9891F, #D97C17 cu text navy), teal plin și hover-ul lui (alb pe teal / navy-2; în dark navy pe teal deschis), secundar hover (teal pe teal-soft, ambele teme), nav, muted pe surface-2, cifra din Steps, focus în ambele teme.
- Lighthouse mobil pe `404.html` (Lighthouse refuză paginile care răspund 404, așa că e rulat pe fișierul servit cu 200; două rulări): Performance 100 / 96, Accessibility 100, Best Practices 96 → 100 după favicon (singura eroare de consolă era favicon.ico lipsă), SEO 66 din cauza `noindex`, care e intenționat pe 404. LCP 1,7–2,4 s, CLS 0, TBT 0 ms; transfer 229 KiB (înainte de favicon; favicon-ul original de 152 KB a fost redus la 16/32/48 px). Rezumatul e în `qa/faza-1/lighthouse-404-mobile.summary.json`.
- Testul de forme (capturi la 1440 privite la 50%, în `qa/faza-1/forme-50/`): pe 404, header-ul e o linie subțire, corpul e text în coloană îngustă, footer-ul e un bloc greu, asimetric (adresa lată, două liste, parteneri); nu sunt trei dungi egale. Pe /qa/componente, benzile alternează bg/surface cu înălțimi diferite, banda de CTA e un dreptunghi închis distinct. Nu am schimbat nimic după test; ce am schimbat înainte de el sunt cele cinci corecturi de mai sus.

### Microcopy în plus față de 00-global (de confirmat)
- `aria-label` pe bannerul de consimțământ în EN: „Cookies” (DESIGN dă doar RO, „Cookie-uri”).
- `alt="BitUp"` pe logo și `aria-label="BitUp"` pe linkul logo-ului (numele firmei, nu text nou).
- Nimic altceva: textele de pe paginile QA nu fac parte din site.

### Lista de mirosuri (CLAUDE.md 1–16), pe header, footer, 404 și componente
1. Hero cu badge, două butoane și mockup: **nu** (404 nu are hero; hero-ul homepage vine în Faza 2, tipografic).
2. Gradient violet, glassmorphism, blob, glow: **nu**.
3. Grid de trei carduri identice repetat: **nu** (Card există ca componentă; pe QA, grid asimetric 1.15/1.15/1).
4. Iconițe generice în carduri: **nu** (Card nu are iconiță; singurele iconițe sunt soare/lună).
5. Umbră pe carduri, rounded-2xl, hover:scale: **nu** (umbră doar pe meniul mobil, submeniu și banner; raza 4 px, 8 px doar pe CtaBand și banner; hover doar pe culoare, 150 ms).
6. Fade-in la scroll, contoare, carusele: **nu** (singura animație e deschiderea meniului mobil, 200 ms, oprită la reduced-motion).
7. Paleta Tailwind, Inter, max-w-7xl: **nu** (tokenii DESIGN, Bricolage/Source Sans/Plex Mono).
8. „De ce noi”, testimoniale fără nume, „Trusted by”: **nu** (Quote cere nume și funcție).
9. Title Case, emoji, „Află mai multe →”: **nu** (sentence case, fără emoji; linkurile spun ce urmează).
10. Toate secțiunile cu același ritm: **nu** pe 404; se verifică pe fiecare pagină din Faza 2.
11. Footer cu patru coloane egale și newsletter: **nu** (2fr / 1.2fr / 1fr, fără newsletter).
12. Spațiu alb imens sau înghesuit, padding-uri diferite: **nu** (`--section-y` unic).
13. Dark prin inversare, negru pur: **nu** (paleta DESIGN; navy cu tentă teal).
14. Imagini de stoc sau generate: **nu**.
15. Div-uri fără semantică: **nu** (`header`, `nav` cu `aria-label`, `main`, `section` cu heading, `footer`, `address`, `button` real, `dl` pentru FactStrip, `ol` pentru pași, `figure/figcaption`).
16. Estetică de brand personal: **nu** (fără portret în hero sau header, fără avatar sub formulare, byline fără avatar).

### Placeholder-e vizibile în pagini
- `[[LOGO_PARTENERI]]` în footer (sub fiecare partener), pe toate paginile. `[[LOGO_BITUP_SVG]]`: logo-ul PNG și favicon-ul sunt placeholder (varianta dark e filtru CSS). `[[CITAT_COSMIN]]` doar pe pagina QA.

## Faza 2a — Homepage, RO și EN (14 septembrie 2026)

### Note aplicate înainte
- `aria-label` „Cookies” pe bannerul EN: în 00-global EN § Microcopy. CLAUDE.md § Cum verifici: paginile cu `noindex` exceptate de la scorul SEO; consola curată pe fiecare pagină.
- Favicon: `favicon.svg` (marca din logo-ul placeholder, cu variantă pentru temă închisă prin `prefers-color-scheme` în SVG: navy → #E4ECEE, orange neschimbat), `favicon.ico` 16/32/48 (4,4 KB) și `apple-touch-icon.png` 180×180, toate derivate din marca logo-ului PNG. Sunt placeholder până la `[[LOGO_BITUP_SVG]]`. `qa/capture.mjs` raportează acum erorile de consolă și răspunsurile 4xx/5xx; homepage-ul are consola curată în toate cele 16 capturi.

### Ce s-a făcut
- `/` și `/en`: un singur șablon (`src/components/home/HomePage.astro`) cu textul în `src/copy/home.ro.ts` și `home.en.ts`, copiat exact din 01-acasa.md / 01-home.md. Componente noi: `Faq` (details/summary, prima deschisă, FAQPage JSON-LD opțional, dezactivat pe homepage), `SectionHead` (eyebrow + h2, aliniate stânga), `TwoCol` (modelul „două coloane”, eyebrow sticky în stânga).
- Imagini prin `astro:assets` `<Picture>`: captura WhatsApp (AVIF + WebP, 360/720 px, lazy) și portretul pătrat 200 px (1×/2×, lazy). Fotografiile stau în `src/assets/`.
- § 8 și § 10 citesc colecțiile `cases` și `blog` (filtrate pe limbă; draft-urile vizibile doar pe staging). Colecțiile sunt goale până la Faza 3, deci § 8 arată doar rândul „Următorul caz, în curând, cu acordul clientului.”, iar § 10 doar titlul. Decizie: cardul de caz folosește `client` ca „titlu scurt” (schema nu are alt câmp) și primele două propoziții din `summary`.
- JSON-LD: Organization + ProfessionalService, fără altceva (cum cere 01-acasa). `inLanguage` scos de pe ProfessionalService: validator.schema.org îl marca UNKNOWN_FIELD (e proprietate de CreativeWork; rămâne pe Article și Service în Faza 2b/3). `availableLanguage` stă pe `contactPoint`, unde e valid.

### Ritmul paginii, secțiune cu secțiune (testul de forme la 50%, `qa/faza-2a/forme-50/`)
1. **Hero**: bloc de text aliniat stânga pe ~60% din lățime, pe `--bg`, fără imagine; sub el o bandă subțire albă (FactStrip, patru celule) care închide primul ecran. Forma: text greu stânga + linie orizontală jos.
2. **Recunoști situația?** (`--surface-2`): trei dreptunghiuri egale, joase, cu linie teal sus; sub ele un rând de text. Prima bandă închisă la culoare.
3. **Ce facem** (`--bg`): trei dreptunghiuri mai înalte, **inegale** (1.15 / 1.15 / 1): simetria e spartă aici, deliberat, ca § 2 și § 3 să nu arate ca același grid repetat.
4. **Cum lucrăm** (`--surface`): coloană îngustă în stânga (eyebrow + titlu pe două rânduri) și un bloc 2×2 de pași în dreapta: forma se schimbă din „rând de carduri” în „aside + grilă”.
5. **De ce un singur partener** (`--bg`): aside stânga + o coloană de text cu cinci liniuțe teal, fără casete. E cea mai „ușoară” secțiune din pagină, între două cu casete.
6. **Suportul, pe scurt** (`--surface`): titlu lat, apoi text în stânga și un dreptunghi vertical (captura) în dreapta: singura formă înaltă din pagină.
7. **Marius** (`--surface-2`, compact): bandă joasă, pătrat de 200 px în stânga, text în dreapta. Mai scundă decât orice altă secțiune.
8. **Rezultate** (`--bg`): acum doar titlu + un rând; devine două carduri late în Faza 3.
9. **Parteneri** (`--surface`): rând scurt de text, cea mai joasă bandă.
10. **Din blog** (`--bg`): acum doar titlu; devine trei carduri în Faza 3.
11. **Întrebări** (`--surface`): aside stânga + acordeon cu linii, fără casete.
12. **CtaBand**: singurul dreptunghi navy, rotunjit la 8 px; apoi footer-ul, bloc greu.
Concluzie: la 50% nu există două secțiuni consecutive cu aceeași formă. Alternanța e: text · bandă · 3 egale · 3 inegale · aside+grilă · aside+listă · text+imagine înaltă · bandă joasă cu foto · (2 carduri) · rând · (3 carduri) · aside+acordeon · bloc navy. Punctul slab, temporar: § 8, § 9 și § 10 sunt trei secțiuni joase la rând cât colecțiile sunt goale; se rezolvă la Faza 3, când § 8 și § 10 primesc carduri. Nu am schimbat nimic după test.

### Ce s-a verificat
- Build 0 erori. Avertismente: cele două pentru colecțiile goale, plus „[content] The collection … does not exist or is empty” la fiecare `getCollection` din homepage și „[@astrojs/sitemap] No pages found!” a dispărut (sitemap-ul are acum `/` și `/en`). Toate cele rămase au aceeași cauză, colecțiile goale, și dispar la Faza 3. `astro check`: 0 / 0 / 0.
- Diff textual (`node qa/textdiff.mjs spec/continut/01-acasa.md dist/index.html`): 66 de fragmente, 66 găsite identic; EN la fel. Zero diferențe de text.
- Ierarhia titlurilor (`node qa/headings.mjs`): un h1, 22 de titluri, fără sărituri, în ambele limbi.
- 16 capturi (RO și EN × 4 lățimi × 2 teme), pagina întreagă, privite. Consolă curată în toate. Cereri externe: niciuna. Scriptul de capturi derulează acum pagina înainte de poză, ca imaginile lazy să apară (portretul din § 7 lipsea din prima captură din cauza asta, nu din pagină).
- Tastatură pe `/`: 44 de elemente cu Tab, toate cu focus vizibil; dropdown-ul și meniul mobil trec.
- JSON-LD validat cu validator.schema.org (API-ul public, graful din fiecare pagină): RO și EN, 0 erori, 0 avertismente. Răspunsurile sunt în `qa/faza-2a/schema-validator-*.json`. (Extensia Chrome nu era conectată, iar `sdtt` nu citește `@graph`; validatorul oficial e sursa.)
- Lighthouse mobil complet (`qa/faza-2a/lighthouse-*-mobile.summary.json`): `/` Performance 97, Accessibility 100, Best Practices 100, SEO 100; LCP 2,3 s, CLS 0,016, TBT 0 ms, 235 KiB. `/en` 99 / 100 / 100 / 100; LCP 2,0 s, 176 KiB. Sub bugetul de 300 KB.

### Lista de mirosuri (1–16) pe homepage
1. **Nu.** Hero tipografic, fără badge, fără mockup; două butoane sunt cerute de conținut, dar eyebrow-ul e etichetă mono, nu pilulă.
2. **Nu.**
3. **Nu.** Trei grupuri de carduri există (§ 2, § 3, § 8 viitor, § 10 viitor), dar: § 2 are citatele ca titlu și stă pe `--surface-2`; § 3 are grid inegal 1.15/1.15/1 pe `--bg`; § 8 va avea două carduri late, § 10 trei carduri cu dată și timp de citit. Niciun card nu are iconiță; toate au bordura de 3 px teal, fără umbră.
4. **Nu.** Zero iconițe în carduri; singurele iconițe din pagină sunt soare/lună din header.
5. **Nu.** Fără umbre pe carduri, raza 4 px, hover doar pe culoare.
6. **Nu.** Nimic la scroll, fără contoare, fără carusel.
7. **Nu.**
8. **Nu.** „De ce un singur partener” e o listă cu afirmații concrete, nu „De ce noi” cu iconițe; fără testimoniale fără nume.
9. **Nu.** Sentence case; linkurile spun ce urmează („Vezi ce include abonamentul”, „Cum decurge”).
10. **Nu.** Vezi § Ritmul: secțiunile alternează forma (bandă / carduri egale / carduri inegale / aside+grilă / aside+listă / text+imagine / bandă compactă / acordeon), fundalul (bg / surface / surface-2) și înălțimea; titlurile sunt toate aliniate stânga, niciodată centrate.
11. **Nu.**
12. **Nu.** Un singur `--section-y` pentru toate secțiunile; § 7 e deliberat mai compactă (`--s-7`). Lățimea textului curent 70ch în § 4, 5, 6, 11.
13. **Nu.** Dark din tokeni; verificat în cele 8 capturi dark.
14. **Nu.** Portretul real (430 px, 1× și 2×) și captura reală din WhatsApp cu legendă.
15. **Nu.** `section` cu `aria-labelledby` pe fiecare secțiune, `h2` cu id, `ol` pentru pași, `ul` pentru listă, `figure`, `details/summary`.
16. **Nu.** Portretul apare doar în § 7, pătrat, 200 px, în secțiune compactă; nu în hero, nu în header.

### Placeholder-e vizibile pe homepage
- `[[LOGO_PARTENERI]]` în § 9 (sub fiecare partener) și în footer. `[[LOGO_BITUP_SVG]]`: logo PNG și favicon placeholder. Nimic altceva pe `/` și `/en`.

## Faza 2b — Restul paginilor statice, RO și EN (14 septembrie 2026)

### Note aplicate înainte
- `inLanguage` scos de pe ProfessionalService: corect, rămâne așa. Numele clientului ca titlu de card în § 8: corect. § 8–10 temporare pe homepage acceptate; testul de forme se reface după Faza 3 (notat în `PLAN.md` § Faza 3).
- Meta scurtate: toate liniile `**Title:**` / `**Description:**` din `spec/continut/*.md` și `spec/continut-en/*.md` (01–15) înlocuite cu versiunile date de Marius (singura editare permisă în spec). Verificat cu script: 30 de fișiere, toate titlurile ≤ 60 (maximul e 60, RO 05) și toate descrierile ≤ 155 (maximul e 148, RO 02 și 05). Descrierea homepage-ului actualizată și în `src/copy/home.ro.ts` / `home.en.ts`; paginile noi iau meta direct din copy.

### Ce s-a făcut
- Zece pagini, RO și EN, în ordinea din PLAN, fiecare cu un șablon în `src/components/pages/` și textul în `src/copy/<pagină>.ro.ts` / `.en.ts` (copiat exact din spec; RO și EN au aceeași interfață TypeScript, ca nicio cheie să nu lipsească într-o limbă):
  - 02 `/servicii` (`ServicesPage`): hero intern, trei **benzi late numerotate** (nu grid de carduri) cu „Include / Pentru cine / link”, două secțiuni „două coloane” (Cum se combină, Ce nu facem), CtaBand.
  - 03 `/servicii/suport-it` (`ItSupportPage`): citat ca titlu, două liste (tu / noi), trei carduri de formule, secțiuni două coloane cu ancorele `#ce-include`, `#cloud`, `#echipamente`, placeholder `[[CAPTURA_RAPORT_LUNAR]]` ca Figure, FAQ cu `#intrebari`. Linkul „Citește cazul” către Cosmio se afișează **doar** când există intrarea `cases/<limbă>/cosmio` și (nu e draft sau suntem pe staging): până la Faza 3 lipsește, iar textdiff îl raportează ca singura diferență (așteptată) pe 03 și 04.
  - 04 `/servicii/securitate` (`SecurityPage`): grid de **șase** carduri (Șase lucruri), două coloane cu `#backup`, `#audit`, `#nis2`, rând de patru pași (`#incidente`), FAQ. JSON-LD: Service.
  - 05 `/servicii/automatizari` (`AutomationPage`): listă de semne, rând de pași cu iconițe lucide (singurul loc unde spec-ul le permite), trei carduri de „feluri de lucrări”, secțiunea Cipri cu captura WhatsApp, `#software` cu caseta ProQ (`[[LOGO_PROQ_LOCAL]]`), FAQ, CtaBand cu titlul, textul și butonul din 05.
  - 06 `/radiografie-it` (`HealthCheckPage`): hero cu formularul (`Form kind="radiografie"`, vizual, fără trimitere până la Faza 4) în dreapta pe desktop; sub 1024 formularul e mutat de un script de 4 rânduri sub „Ce primești” (o singură instanță în DOM, `#formular` rămâne). Lista de zece verificări cu **numere mono**, nu iconițe (decizie: iconițele ar fi fost decorative, iar spec-ul le permite doar în pași). Pași, „O pagină”, „Cine face radiografia” cu portretul 200 px, FAQ. Fără CtaBand (formularul e acțiunea).
  - 07 `/cum-lucram` (`HowWeWorkPage`): `ProcessDiagram` (SVG inline orizontal ≥ 1024, listă verticală sub; ultimul nod cu bordură întreruptă, „nu se termină”), patru secțiuni două coloane pentru pași, Suport cu captura WhatsApp, Raport cu placeholder, Incidente / Bani / Ieșire, FAQ, CtaBand.
  - 09 `/despre` (`AboutPage`): singurul hero intern cu portret (500×667, 3:4, dreapta, `eager`), Povestea (două coloane, persoana I, cum cere § Voce), Traseul (listă cronologică cu anii mono teal, linii, fără iconițe), trei carduri de principii, „Ce mai facem” cu link ProQ, Datele firmei ca FactStrip + cele două linkuri LinkedIn, CtaBand cu titlul cerut („Vrei să vezi cum lucrăm, înainte să semnezi ceva?”). JSON-LD: global + Person (portretul ca `image`).
  - 10 `/suport` (`SupportPage`): hero cu butonul **plin teal** WhatsApp (`data-event="whatsapp_click"`, `wa.me/40750263653`) și buton secundar helpdesk; trei carduri (număr / link / program în card); **tabelul de priorități** (`<table>` real, `th scope`) care sub 768 px devine rânduri stivuite cu etichetele coloanelor din `data-label`, fără derulare orizontală; patru pași cu cerc teal; sfaturi ca listă cu liniuță; „Ce nu face asistentul”; rândul „Pentru cine nu e încă client” cu h2 ascuns vizual. Fără CtaBand, **zero orange în pagină** (doar butonul din header).
  - 11 `/contact` (`ContactPage`): hero cu lead cu link; două coloane: `<dl>` cu etichete mono (Telefon, Email, Programează direct, Clienți existenți, Unde, Firma, LinkedIn) și `Form kind="contact"` cu etichetele din 11 (Numele tău, Firma, Email, Telefon (opțional), Cu ce te putem ajuta?, placeholder, „Trimite mesajul”); sub formular rândul „Preferi să vezi întâi cum lucrăm?”; „Ce se întâmplă după” două coloane. Fără CtaBand.
  - 13/14/15 `/termeni`, `/confidentialitate`, `/cookies` (`LegalPage` + `LegalLayout` extins): H1, sub el rândul `--muted` mono „Ultima actualizare: 10 septembrie 2026”, Prose 70ch, **cuprins scurt în dreapta** (sticky, doar ≥ 1024, `nav aria-label="Cuprins"`), h2 cu id-uri pentru ancore, tabele reale pentru cookie-uri (numele în `code`), butonul secundar „Deschide setările cookie-urilor” cu `data-consent-open` (aceeași acțiune ca linkul din footer, funcțional în Faza 5). Fără CtaBand. Textul legal e în `src/copy/terms|privacy|cookies.<limbă>.ts` ca blocuri (paragraf / listă / tabel / buton) cu linkuri interne pe chei de rută, fără HTML în copy.
- Componente noi: `HeroInternal`, `Form` (honeypot, div Turnstile, consimțământ, semnătură, `noscript`), `Placeholder`, `ProcessDiagram`, `LegalPage`; `Faq` acceptă `link.after` (punctuația de după link, ca fraza să rămână cum e în spec), iar linkurile din răspunsuri sunt linkuri în frază (subliniate, fără săgeată). `schema.ts`: `service()` și `person()`.
- Ancore: id-urile secțiunilor (`#backup`, `#cloud`, `#echipamente`, `#software`, `#incidente` etc.) stau pe `<section>`, iar titlurile au id-uri separate `…-title` pentru `aria-labelledby` (înainte erau duplicate: `section#backup` și `h2#backup`; reparat).
- Microcopy nou, de confirmat: `misc.legalToc` = „Cuprins” / „Contents” (doar `aria-label` pe nav-ul cuprinsului; nu apare ca text vizibil).
- Scripturi noi în `qa/`: `pagecheck.mjs` (h1, salturi, FAQPage, orange, placeholder-e, dimensiuni imagini, ancore, pe tot `dist/`), `compare50.mjs` (captura comparativă la 50 %), `lighthouse.sh` (Chrome cu port de depanare + rezumate).

### Culoarea orange, apariții vizibile pe pagină (`qa/pagecheck.mjs`; butonul din header e o dată în nav și o dată în meniul mobil, vizibil unul singur)
| Pagină | RO | EN | Unde |
|---|---|---|---|
| Homepage | 3 | 3 | header, hero, CtaBand |
| 02 Servicii | 2 | 2 | header, CtaBand |
| 03 / 04 / 05 | 3 | 3 | header, butonul din hero, CtaBand |
| 06 Radiografie | 2 | 2 | header, butonul formularului |
| 07 Cum lucrăm | 2 | 2 | header, CtaBand |
| 09 Despre | 2 | 2 | header, CtaBand |
| 10 Suport | 1 | 1 | header |
| 11 Contact | 2 | 2 | header, butonul formularului |
| 13 / 14 / 15 | 1 | 1 | header |
| 404 | 1 | – | header |

Maximul e 3, nicăieri peste.

### Paginile de serviciu 02–05 nu arată la fel (`qa/faza-2b/comparativ-50/side-by-side.png`, 1440 px, 50 %)
Privite una lângă alta: 02 = trei benzi late numerotate + două secțiuni de text; 03 = citat, două liste, trei carduri, patru secțiuni de text, o figură, acordeon; 04 = citat, grid de șase casete mici, trei secțiuni de text, rând de patru pași cu numere, acordeon; 05 = listă, rând de patru pași cu iconițe, trei carduri, text + captură, casetă navy ProQ, acordeon. Succesiunile de forme diferă de la prima secțiune după hero (bandă / citat / citat / listă) și nu există două pagini cu aceeași ordine. Nu a fost nevoie de modificări.

### Ce s-a verificat
- `npm run build`: 0 erori, 29 de pagini (27 fără QA). Avertismente: doar cele cunoscute pentru colecțiile goale (excepția din CLAUDE.md, dispar la Faza 3). `npm run check`: 0 erori, 0 avertismente, 0 sugestii.
- Diff textual pe toate cele 26 de pagini (13 fișiere × 2 limbi, `node qa/textdiff.mjs`): zero diferențe, cu o singură excepție așteptată: pe 03 și 04 (RO și EN) linkul „Citește cazul” către Cosmio lipsește cât timp colecția e goală; paragraful e prezent. Parserul a fost completat pentru notațiile din spec (linkuri în frază, `→ #ancoră`, rânduri compuse „Titlu · meta · text”, rânduri de tabel, etichete de câmp cu placeholder, note de layout). Toleranța e doar de formatare: un rând compus e acceptat numai dacă fiecare parte a lui apare identic în pagină.
- `node qa/pagecheck.mjs` pe toate cele 27 de pagini: exact un h1, zero salturi de nivel, toate imaginile cu `width`/`height`, orange ≤ 3, FAQPage prezent doar pe paginile cu întrebări (03, 04, 05, 06, 07; homepage nu, cum cere 01) și cu `inLanguage` = limba paginii; ancorele cerute există ca id (03: `ce-include`, `cloud`, `echipamente`, `intrebari`; 04: `backup`, `audit`, `nis2`, `incidente`, `intrebari`; 05: `software`, `intrebari`; 06: `formular`, `cum-decurge`, `intrebari`; EN: echivalentele din `routes.ts`). Ancorele din redirectările vechi (`#backup`, `#cloud`, `#echipamente`, `#software`, `#incidente`) sunt toate pe paginile-țintă. Linkurile către ancore din pagini (`href="#…"`, `…/securitate#incidente`) au toate o țintă.
- 192 + 32 de capturi (26 de pagini × 4 lățimi × 2 teme, pagina întreagă, `qa/faza-2b/`), privite pe fiecare pagină nouă la 1440 și 375 și pe temă închisă pe un eșantion. Consolă curată pe toate (0 erori, 0 avertismente, 0 răspunsuri 4xx/5xx). Cereri externe: niciuna (scriptul de capturi înregistrează orice origine diferită de localhost și a raportat zero). Reparat după privit: linkurile LinkedIn de pe /contact se rupeau pe trei rânduri (grid pe `dd`), tabelul de priorități de pe /suport ieșea din ecran la 375.
- Tastatură (`node qa/keyboard.mjs`) pe /cum-lucram, /despre, /suport, /contact, /cookies, /en/how-we-work, /en/contact: toate elementele cu focus vizibil, dropdown-ul și meniul mobil trec.
- Contrast: perechile noi (alb pe teal și navy pe teal deschis în dark, pentru butonul WhatsApp și cercurile pașilor; teal pe surface pentru etichetele mono) erau deja în `qa/contrast.py`; 35/36 trec, orange pe fundal e excepția cunoscută.
- Lighthouse mobil complet (`qa/faza-2b/lighthouse-*-mobile.summary.json`, `bash qa/lighthouse.sh`): `/` 98 / 100 / 100 / 100 (LCP 2,1 s, CLS 0,016, 234 KiB); `/servicii/suport-it` 98 / 100 / 100 / 100 (2,1 s, 234 KiB); `/radiografie-it` 98 / 100 / 100 / 100 (2,1 s, CLS 0); `/despre` 98 / 100 / 100 / 100 (2,3 s, 246 KiB); `/termeni` 98 / 100 / 100 / 100; `/en` 100 / 100 / 100 / 100 (1,7 s, 175 KiB); `/en/services/it-support` 100 / 100 / 100 / 100; `/en/it-health-check` 97 / 100 / 100 / 100 (TBT 180 ms din simulare); `/en/about` 99 / 100 / 100 / 100; `/en/terms` 98 / 100 / 100 / 100. Toate paginile sub 250 KiB, sub bugetul de 300 KB. Celelalte pagini: consolă curată, imagini cu dimensiuni declarate, JS neschimbat (niciun fișier JS în `dist/_astro`; 3 scripturi inline, 2,1 KB per pagină, 2,4 KB pe /radiografie-it cu mutarea formularului).
- JSON-LD validat cu validator.schema.org (`qa/faza-2b/schema-validator-*.json`): /despre (ProfessionalService + Person) 0 erori / 0 avertismente, /radiografie-it și /en/it-health-check (+ FAQPage) 0 / 0, /suport 0 / 0, /servicii/securitate și /en/services/automation (+ Service + FAQPage) 0 / 0 după ce `inLanguage` a fost scos și de pe Service (același UNKNOWN_FIELD ca pe ProfessionalService în 2a).

### Lista de mirosuri (1–16) pe cele zece pagini
1. **Nu.** Hero-uri interne tipografice, aliniate stânga, fără badge; singurele lucruri în dreapta hero-ului sunt portretul de pe /despre (cerut de DESIGN) și formularul de pe /radiografie-it (cerut de 06).
2. **Nu.**
3. **Nu.** Grid-uri de trei carduri există doar unde sunt chiar trei lucruri paralele (formule pe 03, feluri de lucrări pe 05, principii pe 09, căi pe 10) și niciodată două pe aceeași pagină; 04 are șase, 02 are benzi, nu carduri.
4. **Nu.** Iconițe doar în rândul de pași de pe 05, unde spec-ul le permite explicit; în rest numere mono, liniuțe, cercuri cu cifre.
5. **Nu.** Umbră doar pe formular (cum cere DESIGN), raze 4 / 8 px, hover pe culoare.
6. **Nu.** Nimic animat; `ProcessDiagram` e SVG static.
7. **Nu.**
8. **Nu.** Cifrele din pagini sunt din contract (sub 2 ore, sub 30 de minute) și din spec; fără testimoniale fără nume.
9. **Nu.** Sentence case peste tot; linkurile spun ce urmează.
10. **Nu.** Vezi comparația 02–05 de mai sus; 06 / 07 / 09 / 10 / 11 au fiecare altă succesiune (hero + formular → listă numerotată → pași → text + figură → foto compactă → acordeon; diagramă → patru texte → text + captură → text + figură → trei texte → acordeon; foto → text lung → cronologie → carduri → text → FactStrip; butoane → carduri → tabel → pași → listă → text → rând; listă + formular → text).
11. **Nu.**
12. **Nu.** `--section-y` peste tot; textul curent 70ch în două coloane și în Prose.
13. **Nu.** Dark din tokeni, verificat pe capturi (tabelele, `code`, diagrama și butonul teal au culori de dark din tokeni).
14. **Nu.** Aceleași două fotografii reale și captura WhatsApp; placeholder-ele sunt casete goale cu numele `[[…]]`.
15. **Nu.** `section` + `aria-labelledby` peste tot, `dl` pe contact, `table` cu `th scope`, `ol` pentru pași și cronologie, `details/summary`, `nav` pentru cuprins, `button` real pentru setările cookie-urilor.
16. **Nu.** Portretul apare doar în cele trei locuri permise: /despre (hero), /radiografie-it („Cine face radiografia”), homepage § 7.

### Placeholder-e vizibile în paginile din 2b
- `[[CAPTURA_RAPORT_LUNAR]]`: /servicii/suport-it, /cum-lucram (+ EN), ca Figure goală cu legendă.
- `[[CAPTURA_RAPORT_RADIOGRAFIE]]` și `[[CAPACITATE_RADIOGRAFII]]` (în text, în pasul 1): /radiografie-it (+ EN).
- `[[LOGO_PROQ_LOCAL]]`: /servicii/automatizari (+ EN), caseta navy ProQ.
- `[[LOGO_PARTENERI]]`: footer, pe toate paginile.
- `[[LOGO_BITUP_SVG]]`: logo PNG în header / footer (nu apare ca text).
- Rămân pentru Faza 3: `[[ACORD_COSMIO]]`, `[[CITAT_COSMIN]]`, `[[LOGO_COSMIO_LOCAL]]` (cazul Cosmio), `[[FOTO_CONTEXT]]` (opțional, nefolosit).

## Între 2b și 3: cele trei puncte (14 septembrie 2026)

- `aria-label` „Cuprins” / „Contents” confirmat; adăugat în 00-global RO și EN § Microcopy.
- Capturile ies din git: `.gitignore` are `qa/**/*.png` și `qa/**/*.jpg`; în repo rămân doar `qa/<faza>/rezumat/*.webp` (calitate 80) și rapoartele JSON. Rezumatele create pentru fazele 0, 1, 2a, 2b (0,2 / 1,2 / 1,0 / 3,2 MB). Istoricul a fost rescris o singură dată cu `git filter-repo --invert-paths --path-glob 'qa/**/*.png'` (instalat prin `pip install git-filter-repo`, nu exista): pack-ul a scăzut la 6,2 MB, niciun PNG din `qa/` în niciun commit, arborele neschimbat în afara imaginilor, build-ul trece, NOTES.md întreg (15 secțiuni). Două lucruri de știut: (1) `filter-repo` rescrie și tag-urile, deci `backup-pre-cleanup` arată acum tot spre istoricul curățat, nu spre cel vechi (obiectele vechi au fost șterse la gc; un backup independent ar fi trebuit făcut prin `git clone --mirror` înainte); (2) la checkout-ul istoricului nou, PNG-urile din `qa/faza-0…2b` au dispărut și de pe disc (erau urmărite); se regenerează cu `qa/capture.mjs` când e nevoie. Capturile din Faza 3 sunt locale.
- Regula cazului draft: când un studiu de caz e draft sau lipsește, propoziția care îl linkuiește nu se randează deloc, pe nicio pagină (03 § Cloud, 04 § Backup, RO și EN); fără link de rezervă către /rezultate. `qa/textdiff.mjs` o tratează ca abatere așteptată **cu condiție**: fragmentele care menționează Cosmio sunt acceptate ca lipsă doar dacă pagina chiar nu are link către `/rezultate/cosmio`; când cazul se publică, condiția cade și diff-ul cere propoziția înapoi.

## Faza 3 — Colecții: studii de caz și blog, RO și EN (14 septembrie 2026)

### Ce s-a făcut
- Colecțiile populate din spec: `src/content/cases/{ro,en}/{cosmio,proq}.md` și `src/content/blog/{ro,en}/…`. Copiate exact, cu trei ajustări de formă, nu de text: (1) nota „(Se randează din `numbers`.)” și blocul „Notă de subsol (randată de layout)” nu sunt text de corp; nota de subsol a intrat în frontmatter ca `footnote` (câmp opțional adăugat în schema `cases`, ARHITECTURA nu-l avea) și o randează `CaseLayout` sub ultima secțiune; (2) nota editorială de după `[[CITAT_COSMIN]]` („opțional; se publică doar dacă e bifat…”) nu e text de pagină; placeholder-ul rămâne vizibil în citat; (3) calea imaginilor din articol e `../../../assets/blog/helpdesk/…` (colecția stă un nivel mai jos decât presupunea spec-ul: `src/content/blog/ro/`). Articolul: `draft: false` în ambele limbi (decizia lui Marius; spec-ul avea `true`), `translationOf` pus în ambele direcții. Cosmio: `draft: true` în ambele limbi, `consent: "[[ACORD_COSMIO]]"`.
- Pagini: `/rezultate`, `/rezultate/[slug]`, `/blog`, `/blog/[slug]`, `/rss.xml` și perechile EN. Șabloane: `CaseLayout` (hero navy cu gradient discret spre navy-2, eyebrow teal-2, h1, lead, caseta de logo 260 px; FactStrip din `facts`; secțiunile din Markdown împărțite pe `##` în modelul două coloane, `###` ca titlu; a doua secțiune ca grid de carduri din lista cu titluri îngroșate; NumberTiles din `numbers` după a treia; citatul ca Quote cu nume și funcție din rândul „— …”; rândul de subsol; CtaBand) și `PostLayout` (antet pe `--bg` cu eyebrow „Blog · categorie”, h1, lead, byline mono nume · dată · timp de citit, fără avatar; Prose 70ch; imaginile din Markdown devin figuri cu legenda din `alt`, bordură, `loading="lazy"`, `width`/`height` și AVIF/WebP prin pipeline-ul Astro; caseta de autor cu portretul rotund de 96 px și textul din 00-global; CtaBand varianta blog). Markdown-ul vine prin `Astro.slots.render` și e transformat ca text (fără plugin-uri noi).
- `/rezultate`: carduri cu caseta de logo (120 px, alb sau navy după `logoDark`), kicker, titlu, două propoziții din `summary`, `facts[0]` și `facts[1]` mono, „Citește cazul”; sub grid rândul din 08 cât timp există un caz draft. `/blog`: un singur articol → card pe lățimea întreagă cu `heroImage` în dreapta; Trei teme; rândul de abonare cu LinkedIn și RSS; CtaBand blog; `<link rel="alternate" type="application/rss+xml">` în `<head>` (prop nou `rss` pe BaseLayout).
- Meta pentru colecții, după regula stabilită: title „{client} · {kicker} · BitUp”, description din `summary` tăiată la ultima propoziție întreagă când depășește 155 (`src/lib/collections.ts`). Articole: „{title} · BitUp”, description din frontmatter. Lungimile reale sunt mai jos; **sunt peste limită** și trebuie decizie.
- JSON-LD: `Article` pe articole (headline, description, author → Person, publisher, datePublished, inLanguage, image) și pe studii de caz (cu `about: Organization` a clientului doar când nu e draft; ProQ cu `url` pro-q.ro). Draft-urile au `noindex`.
- Comutatorul de limbă: pe un caz duce la același slug; pe un articol la `translationOf` sau la indexul blogului din cealaltă limbă (ARHITECTURA § Limbi). Linkurile externe din Markdown primesc `target="_blank" rel="noopener"` (00-global).
- RSS: `@astrojs/rss` cu `trailingSlash: false` (linkurile fără slash final, cum s-a notat la spike), `<language>`, `atom:link rel="self"`, categoriile din `tags`, doar articolele publicate.
- Timpul de citit: cuvintele din corpul articolului în limba lui, la 200 de cuvinte pe minut (același calcul ca pe homepage): 5 minute RO, 5 min EN.
- Componente noi: `AuthorBox`, `CaseLogo` (caseta de logo; până e salvat fișierul în `public/logos/`, arată placeholder-ul), `ResultsPage`, `BlogPage`; `src/lib/collections.ts` (vizibilitate, meta, timp de citit, logo), `src/lib/rss.ts`; `qa/mddiff.mjs` (diff textual pentru intrări de colecție: frontmatter + corp Markdown).

### Markdown pe Astro 7, element cu element (PLAN § Faza 3, punctul 1)
Comparat sursa cu HTML-ul randat: titlurile `##`/`###` → `h2`/`h3` cu id-uri; paragrafele → `p`; `**text**` → `strong`; listele → `ul`/`li` (cu `strong` la început unde sursa are titlu îngroșat); citatul → `blockquote` cu `br` între rânduri; imaginile → `img` cu `src` optimizat din `_astro/`, `width`/`height`, `loading="lazy"`, `decoding="async"`; linkurile → `a`. Spațierea vine din Prose (`> * + *`), identică cu paginile legale. **O singură diferență de text, reparată din configurare, nu din CSS:** procesorul implicit din Astro 7 are `smartypants` pornit și transforma ghilimelele drepte și apostrofurile din textul EN (`"Accept"`, `don't`) în „”/’; RO nu era afectat (are deja „…”). Oprit cu `markdown: { smartypants: false }` în `astro.config.mjs`; diff-ul textual e acum zero pe toate cele șase intrări. Nu a fost nevoie de pipeline-ul vechi.

### Testul de forme la 50 % pe homepage, după umplerea colecțiilor (`qa/faza-3/rezumat/forme-50_index-1440-light-50.webp`)
- § 8 Rezultate: pe staging două carduri late, egale (Cosmio cu eticheta „Draft, nepublicat” și ProQ) și rândul „Următorul caz…”; **în producție un singur card** (ProQ, pe lățimea grid-ului) plus rândul (`qa/faza-3/rezumat/productie_index-1440-light.webp`, build cu `CF_PAGES_BRANCH=main`).
- § 9 Parteneri: neschimbat, bandă joasă.
- § 10 Din blog: un card lat cu titlu, description și rândul mono dată · timp de citit (fără imagine, cum cere 12).
- Ritmul s-a schimbat față de 2a: în loc de trei benzi joase la rând (§ 8, 9, 10), acum e carduri (late) · bandă joasă · card lat, între § 7 (bandă compactă cu foto) și § 11 (acordeon). Nu mai sunt două secțiuni consecutive cu aceeași formă. Nu a fost nevoie de modificări.

### Ce s-a verificat
- `npm run build`: 0 erori, **0 avertismente** (cele două pentru colecțiile goale au dispărut, cum cere PLAN § Faza 3), 39 de pagini pe staging / 35 în producție. `npm run check`: 0 erori, 0 avertismente, 0 sugestii.
- Diff textual pe intrările de colecție (`node qa/mddiff.mjs`, 6 intrări): 49/49, 55/55, 49/49, 55/55, 32/32, 32/32, zero diferențe (tag-urile 2–4 nu sunt text de pagină; doar primul e eyebrow, cum cere 12). Diff-ul pe 08 și 12 (`textdiff.mjs`): zero.
- Draft în producție (`CF_PAGES_BRANCH=main`, build separat, apoi servit și verificat): `/rezultate/cosmio` și `/en/results/cosmio` nu există (HTTP 404 la URL direct), Cosmio nu apare în `/rezultate`, `/en/results`, pe homepage, în `sitemap-0.xml` și în niciun fișier din `dist` (grep pe tot); propoziția din 03/04 nu se randează; `/qa/*` lipsește. Pe staging: pagina există, cu `noindex`, eticheta „Draft, nepublicat” în hero și pe card, și apare în sitemap (staging).
- RSS: ambele fluxuri valide la validator.w3.org (0 erori; singurul avertisment, „Self reference doesn't match document location”, vine din faptul că validarea s-a făcut prin `rawdata`, nu de la URL-ul public; rapoartele în `qa/faza-3/rss-validator-*.soap`). Linkurile din fluxuri răspund 200 și nu au slash final.
- `node qa/pagecheck.mjs` pe 37 de pagini: un h1, zero salturi, imagini cu dimensiuni (5 pe articol), orange ≤ 2 pe paginile noi, FAQPage doar unde sunt întrebări.
- 96 + 48 + 24 de capturi (12 pagini × 4 lățimi × 2 teme, plus recapturarea paginilor EN după `smartypants` și trei pagini din build-ul de producție), privite pe cazul ProQ, cazul Cosmio (dark), lista de rezultate, indexul blogului, articolul (1440 și 375) și homepage-ul de producție. Consolă curată pe toate, zero cereri externe.
- Tastatură pe `/rezultate/proq`, `/blog/…`, `/en/blog`: toate trec.
- Lighthouse mobil (`qa/faza-3/lighthouse-*-mobile.summary.json`): `/rezultate` 98/100/100/100 (231 KiB), `/rezultate/proq` 98/100/100/100, `/blog` 98/100/100/100 (263 KiB), `/blog/cum-ne-am-construit-propriul-helpdesk` 97/100/100/100 (313 KiB **cu** cele două imagini de conținut și portretul din caseta de autor; fără imagini ~235, în buget), `/en/results/proq` 100/100/100/100, `/en/blog/how-we-built-our-own-helpdesk` 99/100/100/100.
- JSON-LD validat (validator.schema.org): `/rezultate/proq` (Article + about), `/blog/…` RO și EN (Article), `/rezultate`: 0 erori, 0 avertismente.

### Lungimile meta pentru intrările de colecție (de decis)
| Pagină | Title | Description |
|---|---|---|
| /rezultate/proq | 67 („ProQ (produs BitUp) · Software la comandă și produs propriu · BitUp”) | 141 |
| /rezultate/cosmio | 63 | 82 |
| /en/results/proq | 68 | 132 |
| /en/results/cosmio | 65 | 65 |
| /blog/cum-ne-am-construit-propriul-helpdesk | 80 | 187 (description-ul e o singură propoziție, nu se poate tăia la propoziție întreagă; rămâne întreg) |
| /en/blog/how-we-built-our-own-helpdesk | 78 | 167 (la fel) |

Regula „{client} · {kicker} · BitUp” dă 63–68 de caractere pe toate cele patru pagini de caz (întrebarea din § Verificarea 9, punctul 8, a rămas fără răspuns), iar titlurile articolelor au 78–80 cu sufix. Descrierile cazurilor sunt în limită. Opțiuni, fără să inventez text: (a) title-ul cazurilor fără paranteza din `client` și, dacă tot depășește, fără sufixul „· BitUp”; (b) un câmp `metaTitle` / `metaDescription` în frontmatter, cu textul scris de tine; (c) accepți depășirea pe intrările de colecție. Până la decizie, paginile folosesc regula așa cum e.

### Lista de mirosuri (1–16) pe paginile din Faza 3
1. **Nu.** Hero-ul de caz e navy cu text și caseta de logo (cum cere DESIGN), fără badge, fără mockup; articolul are antet tipografic.
2. **Nu.** Singurul gradient e cel permis explicit, navy → navy-2, în hero-ul de caz.
3. **Nu.** Cardurile din caz sunt șase, cu titluri din conținut; rezultatele sunt două carduri late; blogul un card lat.
4. **Nu.** Zero iconițe.
5. **Nu.** Fără umbre; raze 4/8 px.
6. **Nu.** NumberTiles statice.
7. **Nu.**
8. **Nu.** Cifrele din NumberTiles vin din frontmatter (contract/măsurători), cu explicație; citatul are nume și funcție reale (placeholder până la acord).
9. **Nu.** Sentence case; „Citește cazul”, „Cum l-am construit și de ce”.
10. **Nu.** Cazul alternează două coloane · carduri · plăci navy · listă · text+citat; articolul e text lung cu figuri; lista de rezultate e carduri + text.
11. **Nu.**
12. **Nu.** `--section-y`, Prose 70ch.
13. **Nu.** Dark din tokeni (plăcile navy folosesc `--navy-surface`, caseta de logo alb rămâne albă intenționat, ca logo-ul să fie lizibil).
14. **Nu.** Aceleași capturi reale din helpdesk și portretul; logo-urile sunt placeholder-e până se salvează local.
15. **Nu.** `article`, `section` + `aria-labelledby`, `figure`/`figcaption`, `blockquote`, `time` cu `datetime`, `dl` pentru fapte, `aside` pentru caseta de autor.
16. **Nu.** Portretul rotund apare doar în caseta de autor (singurul loc permis pentru rotund), nu în byline, nu în hero.

### Placeholder-e vizibile în paginile din Faza 3
- `[[LOGO_PROQ_LOCAL]]` (caseta de logo pe /rezultate și /rezultate/proq, RO și EN), `[[LOGO_COSMIO_LOCAL]]` și `[[CITAT_COSMIN]]` (doar pe staging, cazul e draft), `[[ACORD_COSMIO]]` în frontmatter (nu se randează), `[[LOGO_PARTENERI]]` în footer.

## Între 3 și 4: cele trei puncte (14 septembrie 2026)

- Meta pentru colecții: câmpuri opționale `metaTitle` și `metaDescription` în ambele scheme (`src/content.config.ts` și ARHITECTURA § Colecții, modificare permisă de Marius); regula veche („{client} · {kicker} · BitUp”, description din `summary` tăiată la propoziție) rămâne rezervă când lipsesc. Valorile scrise de Marius sunt în frontmatter-ul celor șase intrări. Lungimi verificate din `dist`: title 50 / 51 / 50 / 49 / 45 / 37, description 154 / 149 / 154 / 139 / 134 / 144; toate ≤ 60 și ≤ 155. H1-urile și `title` din frontmatter neschimbate.
- `smartypants` oprit: rămâne.
- Repo pe GitHub: **neefectuat**. `gh` (2.96) e instalat, dar nu e autentificat („You are not logged into any GitHub hosts”), iar autentificarea e interactivă. Pașii rămân: `gh auth login`, apoi `gh repo create bitup-site --private --source . --remote origin --push`. `.gitignore` are `qa/**/*.png` și `qa/**/*.jpg` (verificat cu `git check-ignore`); `git ls-files | grep png` dă doar `public/apple-touch-icon.png` și `public/logo-bitup.png`.

## Faza 4a — Formulare: funcția `/api/lead`, Turnstile, Resend, cu chei de test (14 septembrie 2026)

### Ce s-a făcut
- `functions/api/lead.ts` (Cloudflare Pages Function, fără biblioteci, doar `fetch`), exact în ordinea din ARHITECTURA § Formulare: 1 metodă (altceva decât POST → 405 cu `Allow`), 2 origine (`Origin`/`Referer` trebuie să fie `https://bitup.ro`, `https://*.pages.dev` sau, doar când funcția însăși rulează pe localhost, localhost → altfel 403), 3 corp (doar `application/json` valid → altfel `400 { error: 'body' }`) și validare server-side (câmpurile obligatorii după `kind`, email cu format, telefon cu ≥ 9 cifre unde e obligatoriu sau completat, `employees` din lista de opțiuni, `message` ≤ 5.000, `consent === true` → `400 { error: 'validation', fields }`), 4 honeypot (`website` completat → `200 { ok: true }` fără nicio trimitere), 5 Turnstile (`siteverify` cu secretul din env, `remoteip` din `CF-Connecting-IP`; token lipsă sau `success !== true` → `400 { error: 'turnstile' }`; nu există cale fără token), 6 Resend (`POST api.resend.com/emails`; eșec → `502 { error: 'mail' }` + `console.error` în log), 7 `200 { ok: true }`. `Cache-Control: no-store` pe toate răspunsurile.
- Resend e izolat în două funcții: `buildEmail(payload, meta, to)` e pură și construiește cererea (from `BitUp site <site@bitup.ro>`, to `LEAD_TO_EMAIL`, `reply_to` = emailul din formular, subiect `[Radiografie IT] Firma · Nume` / `[Contact] Firma · Nume` cu sufixul ` · EN`, corp text cu toate câmpurile plus `source`, `utm_*`, `referrer`, `ts`, momentul primirii, IP și țară din headerele Cloudflare, mesajul într-un bloc separat marcat, `tags` kind/lang); `sendEmail` e singurul loc care vorbește cu Resend. Nu există mod „mock” în cod: verificarea locală e `qa/lead-email.test.mjs` (Node rulează TypeScript direct), care importă `buildEmail`, `validate`, `originAllowed` și aserționează cererea; ieșirea e salvată în `qa/faza-4a/resend-request.txt`.
- `Form.astro`: etichete vizibile cu `for`/`id`, câmpuri obligatorii marcate, `autocomplete` și `inputmode`, honeypot `website` scos din ecran (nu `display:none`), Turnstile randat explicit din cheia publică `PUBLIC_TURNSTILE_SITE_KEY` (astro:env, `appearance: interaction-only`, `execution: execute`); scriptul Turnstile (~120 KB cu iframe) se încarcă **la primul focus în formular**, nu la încărcarea paginii: cu el încărcat din start, /radiografie-it și /contact ajungeau la 354 KiB (peste bugetul de 300 KB); acum pagina nu face nicio cerere externă până nu atinge cineva formularul, iar la trimitere scriptul așteaptă widgetul (timeout 10 s → mesajul de anti-spam); validare în browser cu mesajele din 00-global („Completează [numele câmpului], ca să te putem suna înapoi.” cu eticheta câmpului; email; telefon) sub câmp, cu `aria-invalid` și `aria-describedby`; trimitere prin `fetch` JSON către `/api/lead` cu timeout 10 s și payload-ul exact din spec (inclusiv `lang`, `source`, `utm` din URL, `referrer`, `ts`); stări: „Se trimite…” (buton dezactivat), eroare (mesajul din spec, `role="status"`, textul rămâne în câmpuri, Turnstile resetat; la `error: 'turnstile'` mesajul de anti-spam), succes doar la 2xx cu `{ ok: true }` → `/multumesc?kind=…`. Fără JavaScript: butonul rămâne dezactivat (nu există `<form method="post">` către `/api/lead`) și `<noscript>` arată textul din spec cu telefonul, emailul și linkul Calendly (`data-event="calendly_click"`).
- `/multumesc` și `/en/thank-you` (`ThankYouPage`): ambele variante randate, cea de contact cu `hidden`; un script inline imediat după marcaj comută după `?kind=` înainte de paint; implicit radiografie; `noindex` (și în afara sitemap-ului); linkul Calendly în tab nou cu `data-event="calendly_click"`; linkurile „Cum decurge o radiografie” (cu ancoră) și „Cum lucrăm după”. Fără CtaBand (pagina e finalul fluxului).
- `.dev.vars.example` (era din Faza 0) documentează secretele; local `.dev.vars` (ignorat de git) cu secretul de test Turnstile și o cheie Resend invalidă; `.env` (ignorat) cu cheia publică de test `1x00000000000000000000AA`. `wrangler` instalat ca dependență de dezvoltare (ARHITECTURA cere `npx wrangler pages dev dist`).
- Unelte QA noi: `qa/lead-email.test.mjs`, `qa/formstates.mjs` (capturile stărilor cu `/api/lead` interceptat de Playwright), `qa/faza-4a/curl/` (payload-urile și rezultatele).

### Ce s-a verificat
- Build 0 erori, 0 avertismente, 41 de pagini; `npm run check` 0 / 0 / 0. `node qa/pagecheck.mjs` pe 39 de pagini: 0 probleme (varianta ascunsă de pe /multumesc nu intră în numărul de h1). Diff textual pe 06 și 11, RO și EN: zero.
- Turnstile cu cheile oficiale de test, ambele drumuri, prin `npx wrangler pages dev dist` (`qa/faza-4a/curl/rezultate-*.txt`):
  - secretul „trece mereu” (`1x…AA`): GET → 405; Origin străin → 403; fără Origin → 403; Content-Type text → 400 body; JSON invalid → 400 body; consimțământ lipsă → 400 validation `["consent"]`; mesaj 5.001 → 400 validation `["message"]`; email invalid + telefon scurt → 400 validation `["email","phone"]`; honeypot completat → **200 fără trimitere** (nimic în log); fără token → 400 turnstile; payload valid RO și contact EN fără telefon → Turnstile trece, cererea ajunge la Resend, care răspunde 401 „API key is invalid” (cheie locală invalidă) → 502 mail, cu eroarea în log.
  - secretul „eșuează mereu” (`2x…AA`): payload valid → 400 turnstile; honeypot → 200 (nu ajunge la Turnstile).
- Secrete: `grep` în `dist/` după `re_`, `RESEND_API_KEY`, `TURNSTILE_SECRET` și secretul de test: zero rezultate. Singurele variabile `PUBLIC_` din config și cod sunt `PUBLIC_TURNSTILE_SITE_KEY` (cheia publică a widgetului, prin definiție publică) și `PUBLIC_GA4_ID`.
- Stările formularelor (`node qa/formstates.mjs faza-4a`): 112 capturi în `qa/faza-4a/formular/` (RO și EN × radiografie și contact × 375 și 1024 × light și dark × 7 stări: validare pe gol, email greșit, completat, se trimite, eroare, Turnstile eșuat, /multumesc cu varianta corectă). Verificat automat: ≥ 4 erori la formularul gol, textul rămâne în câmp după eroare, pe /multumesc exact o variantă ascunsă și H1-ul corect după `kind`. Consolă curată în afara răspunsurilor 502/400 simulate (stările de eroare) și a unui avertisment `postMessage` al widgetului Turnstile care apare doar pe `127.0.0.1` cu cheia de test (origine neînregistrată); pe domeniul real, cu cheia reală, nu apare (se verifică în 4b).
- 48 de capturi de pagină (multumesc, en/thank-you, radiografie-it, contact + EN, 4 lățimi × 2 teme): consolă curată; singura cerere externă e `challenges.cloudflare.com` (Turnstile, domeniu permis în ARHITECTURA § Domenii permise).
- Tastatură pe /contact (47 de elemente) și /multumesc: trec.
- Lighthouse mobil: `/radiografie-it` 98 / 100 / 100 / 100 (LCP 2.1 s, 236KiB); `/contact` 98 / 100 / 100 / 100 (LCP 2.2 s, 233KiB); `/multumesc` 98 / 100 / 100 / 66 (LCP 2.1 s, 229KiB); `/en/contact` 100 / 100 / 100 / 100 (LCP 1.7 s, 174KiB). /multumesc are SEO 66 din cauza `noindex`, excepția din CLAUDE.md. Toate sub 250 KiB după încărcarea lentă a Turnstile (înainte: 354 KiB pe paginile cu formular).

### Corecția de după acceptare: cursa Turnstile (decizia lui Marius)
- La submit, dacă tokenul lipsește, butonul intră în „Se trimite…” și scriptul așteaptă tokenul cel mult 5 s; dacă nu vine, trimite oricum (`turnstileToken: ""`) și lasă funcția să decidă (400 turnstile → mesajul de anti-spam, butonul se reactivează, textul rămâne). Tokenul sosit după termen se păstrează pentru a doua încercare. Butonul nu rămâne niciodată blocat.
- `<link rel="preconnect" href="https://challenges.cloudflare.com">` pe /radiografie-it și /contact (RO și EN), prin slotul `head` al BaseLayout; e doar conexiunea, nu o cerere de resursă, bugetul rămâne același.
- Testul (`node qa/turnstile-race.mjs`, ieșirea în `qa/faza-4a/turnstile-race.txt`), RO și EN, ambele formulare, rețea încetinită prin CDP la presetul Chrome DevTools „Slow 4G” (400 kbps / 400 kbps / 2.000 ms) și, pentru comparație, „Fast 4G” (1,6 Mbps / 750 kbps / 562 ms): completare și trimitere în 180–280 ms de la primul focus; butonul intră imediat în „Se trimite…” / „Sending…”; pe Slow 4G scriptul Turnstile nu apucă să dea tokenul în 5 s, cererea pleacă la ~5.000 ms fără token (funcția decide); pe Fast 4G tokenul vine în timp și cererea pleacă cu token. Scenariul cu scriptul Turnstile blocat complet: cererea pleacă după ~5.060 ms fără token, răspunsul 400 turnstile arată mesajul de anti-spam, butonul se reactivează, textul rămâne. Capturile stărilor (`formstates.mjs`) refăcute după schimbare: 112, toate trec.

### Rămâne pentru 4b (cu chei reale)
Cheia Resend și perechea Turnstile (site key + secret, pentru `bitup.ro` și `*.pages.dev`). Apoi: trimiteri reale din staging, ambele formulare, ambele limbi; verificarea emailului (inbox, `reply_to`, subiect, corp, SPF/DKIM/DMARC în antete); testul cu cheie Resend greșită pe Preview; lista pentru dashboard de mai jos, completată.

### De făcut din dashboard (lista pentru Marius, se completează în 4b)
- Cloudflare Pages → Settings → Environment variables, separat pentru Production și Preview: `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `LEAD_TO_EMAIL=office@bitup.ro`; în Build: `PUBLIC_TURNSTILE_SITE_KEY` (și, în Faza 5, `PUBLIC_GA4_ID`).
- Cloudflare Turnstile: un widget pentru `bitup.ro` (+ `*.pages.dev` pentru staging), mod „managed”/invisible; cheia publică și secretul în variabilele de mai sus.
- Cloudflare WAF → Rate limiting rule pe `/api/lead`: 5 cereri / 10 secunde / IP (planul Free permite doar ferestre de 10 s).
- Resend → Domains → `bitup.ro`: înregistrările DNS date de Resend (DKIM `resend._domainkey`, SPF pe subdomeniul de trimitere, `_dmarc` TXT cu `p=none` o săptămână, apoi `p=quarantine`), puse în DNS-ul Cloudflare; expeditorul `site@bitup.ro`.

## Font și logo (14 septembrie 2026, deciziile lui Marius)

### Fontul: Public Sans pe tot site-ul
Marius a cerut întâi un font „profesional, clar, curat, enterprise” în locul lui Bricolage Grotesque + Source Sans 3 (pusesem IBM Plex Sans), apoi „ceva și mai clar și ușor de citit”. Am comparat trei familii pe aceleași pagini (homepage, despre, suport-it, la 1440 și 375; `qa/fonturi/rezumat/compara-fonturi-*.webp`): IBM Plex Sans, Public Sans, Source Sans 3. Alegerea: **Public Sans** (variabil, 100–900): aperturi largi, înălțime-x mare, forme neutre, făcut pentru text de citit pe ecran (e fontul sistemului de design al guvernului SUA); Plex Sans e mai „tehnic”, Source Sans 3 mai îngust și mai cald. Diacriticele românești corecte în latin-ext. Plex Mono rămâne pentru mono. Titlurile la 600, tracking `-0.015em` la h1 și `-0.01em` la h2, butoanele la 600.
- Cod: `@fontsource-variable/public-sans` (Plex Sans și Source Sans 3 scoase); `BaseLayout` importă `wght.css` și preîncarcă latin + latin-ext; tokenii `--font-display` / `--font-body`; `base.css`; `Button.astro`; pagina QA. Spec: DESIGN § Tokeni și § Tipografie, ARHITECTURA § Stack și § SEO, PLAN § Faza 0.

### Logo-ul: vectorizat din BITUP-Final-logo.png, cu varianta dark generată
- Sursa: `BITUP-Final-logo.png` (1700 × 520, fundal alb) dat de Marius; fără tagline. Vectorizat cu potrace (pachetul Python `potracer`), separat pe cele trei culori (navy #00202E, teal #20686C, orange #FE982A), în `public/logos/bitup.svg` (10 KB) și marca singură `public/logos/bitup-marca.svg`. Comparat cu PNG-ul la aceeași lățime (`qa/fonturi/rezumat/logo-vector-control.webp`): identic vizual.
- Varianta dark, generată din același desen: „BIT” în #E4ECEE (textul temei dark), „UP” în #5FB0B4 (teal-ul temei dark), marca orange neschimbată: `public/logos/bitup-dark.svg`. Copii cu numele din ARHITECTURA (`public/logo-bitup.svg`, `logo-bitup-dark.svg`) și un PNG de 800 px randat din vector (`public/logo-bitup.png`, pentru JSON-LD `Organization.logo`; îl înlocuiește pe cel placeholder).
- În pagină: `Logo.astro`, SVG inline cu culorile din tokeni (`--logo-ink`, `--logo-accent`), deci urmează și `prefers-color-scheme`, și comutatorul `data-theme` (un `<picture>` cu `media` n-ar fi urmat comutatorul; ARHITECTURA § Dark mode actualizat). Header (decorativ, linkul are `aria-label`) și footer (`role="img"`). Filtrul CSS placeholder de pe PNG a dispărut.
- Favicon regenerat din marcă: `favicon.svg` (cu varianta dark prin `prefers-color-scheme`), `favicon.ico` 16/32/48, `apple-touch-icon.png` 180 pe fundal deschis. Placeholder-ul `[[LOGO_BITUP_SVG]]` e închis (logo-ul e cel real); PLACEHOLDERS.md rămâne de actualizat de Marius.
- Verificat: build 0 erori, `check` 0/0/0, `pagecheck` 39 pagini 0 probleme; 32 de capturi (index, despre, suport, contact, 4 lățimi × 2 teme), privite pe light și dark: logo-ul corect în ambele teme, în header și footer; consolă curată, zero cereri externe; Lighthouse mobil `/` 100 / 100 / 100 / 100 (LCP 1,5 s, CLS 0, 128 KiB).

## Spike Astro (14 septembrie 2026, ramura `spike/astro-current`, ~60 de minute): GO

Decizia lui Marius: „Astro 5” din spec era versiunea curentă la scriere, nu o decizie de arhitectură; site-ul pornește pe ultima versiune majoră stabilă. Spec corectat: `ARHITECTURA.md` § Stack și `PLAN.md` Faza 0 nu mai conțin un număr fix.

- `npm create astro@latest` (14 septembrie 2026) dă **Astro 7.3.2**, Node ≥ 22.12, `tsconfig` extins din `astro/tsconfigs/strict`, `astro.config.mjs` gol. Fixat în `package.json`: `astro ^7.3.2` (instalat 7.3.2), `@astrojs/sitemap` 3.7.4, `@astrojs/rss` 4.0.19, `astro-og-canvas` 0.13.1 (peer `^5 || ^6 || ^7`), `astro-icon` 1.2.0.
- Schimbări necesare față de scheletul pe 5: (1) `z` se importă din `astro/zod` (Zod 4), nu din `astro:content` (deprecat, dispare în 8); forma `schema: ({ image }) => z.object(…)` există în continuare în 7.3 (`SchemaContext`), iar `createSchema()` e o opțiune de loader, nu ceva ce folosim; (2) `redirectToDefaultLocale` scos din `i18n.routing` (nu are sens cu `prefixDefaultLocale: false`); (3) `compressHTML: true` setat explicit (implicitul e acum `'jsx'`); (4) niciun flag experimental de scos: nu foloseam. `OGImageRoute` din astro-og-canvas e asincron (`await`), cum spune README-ul.
- Verificări: `npm run build` 0 erori (doar cele două avertismente cunoscute), `npm run check` 0 erori / 0 avertismente / 0 sugestii, capturile pe 7 sunt **identice pixel cu pixel** cu cele din Faza 0 (8/8, comparate cu PIL), cererile de rețea sunt aceleași 8 fișiere woff2 locale. Integrările testate real cu endpoint-uri temporare, șterse apoi: sitemap generat, `rss.xml` valid, imagine OG PNG 1200×630.
- De ținut minte: `@astrojs/rss` pune slash final la linkuri (`/faza-0/`); la Faza 3 se dă `trailingSlash: false` în opțiunile `rss()`. `astro-og-canvas` a descărcat fontul implicit (Noto Sans) de pe api.fontsource.org **la build**, nu la runtime; la Faza 5 primește fontul local (Bricolage TTF) și nu mai cere nimic din rețea. Astro 7 schimbă procesorul Markdown implicit: la Faza 3 randarea articolului și a studiilor de caz se compară vizual cu sursa (adăugat la acceptarea Fazei 3 în PLAN).

## Parteneri: secțiune proprie cu logo-uri, plus Anthropic (17 septembrie 2026, cerut de Marius)

Cerința: pe homepage, partea de parteneriate devine o secțiune separată cu logo-urile partenerilor, iar Anthropic intră în ea. Deciziile luate împreună: fișierele de logo nu există încă (se pregătește doar structura), textul pentru Anthropic e „Anthropic Partner”, iar tehnologiile se mută într-o secțiune distinctă.

Ce s-a făcut:
- `src/lib/partners.ts`: `partnerLogo(name)` caută `public/logos/parteneri/<slug>.svg`, cu slug-ul derivat din numele badge-ului („Microsoft Partner” → `microsoft-partner.svg`), ca în `spec/assets/logos/README.md`. Dacă fișierul există, apare logo-ul; dacă nu, rămâne `[[LOGO_PARTENERI]]` vizibil, ca până acum. Nu e nevoie de nicio modificare de cod când apar fișierele: se copiază în `public/logos/parteneri/` ca `microsoft-partner.svg`, `fortinet-advocate.svg`, `veeam-partner.svg`, `anthropic-partner.svg`.
- Homepage § 9 se împarte în două secțiuni: „Parteneri / Cu ce lucrăm” (doar rândul de badge-uri) și „Tehnologii / Tehnologii cu care lucrăm zilnic” (`s9b`), pe același fundal `--surface`, despărțite de o linie de 1 px (`Section line`), ca să nu apară două fundaluri identice lipite fără separare.
- Badge-ul respectă `DESIGN.md` § Imagini: monocrom `--muted` (mască peste SVG) și colorat la hover, 150 ms, dezactivat la `prefers-reduced-motion`. Nivelul e scris sub logo, cum cere `01-acasa.md` § 9.

Verificat: `npm run build` fără erori și fără avertismente, `npx astro check` 0/0/0. Capturi pe secțiunile s9 și s9b, RO și EN, light și dark, 1440 și 375, în două stări: cu patru SVG-uri de probă (șterse imediat după) și fără fișiere, adică starea reală de acum. Hover verificat pe primul badge (monocrom → color). Consolă curată, zero răspunsuri 4xx.

Divergențe față de spec, de aprobat și de trecut în `spec/` (eu nu modific `spec/`):
1. `spec/continut/01-acasa.md` și `continut-en/01-home.md` § 9 descriu **o** secțiune „Parteneri și tehnologii”; acum sunt două.
2. Numele „Anthropic Partner” nu e în spec (nici în § 9, nici în FactStrip, nici în footer). Apare deocamdată **doar** în secțiunea de pe homepage. FactStrip-ul de sub hero (`src/i18n/ro.ts`, `en.ts`) și coloana de parteneri din footer au rămas cu cei trei parteneri din spec — de decis dacă intră și acolo.
3. Propoziția „Tehnologii cu care lucrăm zilnic: Microsoft 365, …” a fost tăiată în două: partea dinaintea două puncte a devenit H2-ul secțiunii noi, lista a rămas paragraf. Cuvintele sunt cele din spec, doar împărțite altfel. Eyebrow-urile „Tehnologii” / „Technologies” sunt text nou.
4. `spec/PLACEHOLDERS.md` descrie `[[LOGO_PARTENERI]]` ca fiind cele trei badge-uri Microsoft / Fortinet / Veeam; acum acoperă și al patrulea.

De verificat înainte de publicare: dreptul de a afișa logo-ul Anthropic și formularea exactă a relației (badge-urile de partener au de obicei reguli de brand proprii, iar `PLACEHOLDERS.md` cere explicit „confirmarea că ai voie să le afișezi”).

## Probe de stil pornind de la fastforward.dev și cyberclar.ro — respinse (17 septembrie 2026)

Marius a dat două site-uri ca referință de stil: `https://www.fastforward.dev/` („nu pare generat cu AI, e aerisit”) și `https://cyberclar.ro`. Am măsurat ambele în browser și am construit trei probe pe primele cinci secțiuni de homepage, sub `/qa/stil/{a,b,c}` și perechile EN.

- **A / B** — doar ritm și tipografie, pe paleta noastră: scară mai mare (hero 76 px), `line-height` 1,04, tracking −0,03 em, `--section-y` până la 152 px, rază 2 px, zero umbre, o singură cerneală la 65%, cardurile de servicii transformate în rânduri cu linie de păr. A cu Public Sans, B cu Onest.
- **C** — în plus registru cald: hârtie `#F2EEE6` în light, `#060B12` cu cerneală caldă în dark, titluri la 88 px, index de secțiune rotit în marginea din stânga (tiparul de la cyberclar). Brandul (navy, teal, orange) neatins.

**Verdictul lui Marius: „nu îmi place deloc niciuna din variante.”** Toate trei au fost șterse: `src/pages/qa/stil/`, `src/pages/en/qa/stil/`, `src/components/qa/`, iar `@fontsource-variable/onest` a fost dezinstalat. `tokens.css`, `DESIGN.md` și paginile reale n-au fost atinse în niciun moment — tokenii probelor erau redefiniți local.

Ce rămâne de ținut minte din exercițiu, ca să nu se repete:
1. Ce au în comun cele două referințe e **temperatura culorii** (cerneală alb-caldă pe aproape-negru, hârtie caldă în secțiunile deschise, accent albastru), nu spațierea. Prima probă a schimbat doar scara și ritmul și Marius a spus, corect, că nu vede nicio diferență: ochiul prinde întâi culoarea.
2. Nici registrul cald nu a fost răspunsul. Deci ce îi place la site-urile alea încă nu e identificat, iar întrebările mele (trei opțiuni de direcție) n-au ajuns la el. Următoarea încercare pornește de la ce respinge, uitându-ne împreună la ecran, nu de la variante construite pe ghicite.
3. Măsurătorile brute, dacă mai sunt vreodată utile: fastforward.dev — Golos Text 500 / Inter 400, h1 98 px lh 1,04 ls −0,03 em, secțiuni 98–177 px, rază 0–2 px, zero umbre, linie 0,8 px la 9%, cerneală `#F7F5F0` la 100/92/58/38%, accent `#3D6BFF`, container 1280. cyberclar.ro — Inter Tight 600 / Inter, h1 100 px lh 0,98 ls −0,035 em, fundal `#02060F`, cerneală `#F4F0E7`, hârtie `#F3EEE5`, accent `#4D6DFF`, index de secțiune rotit în margine.

## Meniul „Servicii”, după modelul din `meniu (2).png` (17 septembrie 2026, cerut de Marius)

Cerința: „implementează modelul, nu schimba logo-ul și fontul textului”. Prima încercare a depășit cererea — înlocuisem logo-ul SVG cu un wordmark serif, adusesem Playfair Display și albastrul `#0047CD` din imagine, și scosesem headerul din container. Marius a corectat, totul a fost dat înapoi (`git checkout` pe `Header.astro`, `LangSwitch.astro`, `BaseLayout.astro`; `@fontsource-variable/playfair-display` dezinstalat). **Logo-ul, fontul, paleta, separatorul `RO · EN` și lățimea containerului au rămas exact cum erau.**

Ce s-a păstrat din imagine e doar modelul de meniu: dropdown-ul mic de 280 px a devenit un panou pe toată lățimea, cu patru coloane — intro (eyebrow, titlu, lead, link către toate serviciile), două coloane de servicii cu titlu și descriere, o casetă de CTA despărțită de o linie verticală de 1 px — și o bandă de jos peste o linie de 1 px, cu telefonul, emailul și linkul de suport. Avem trei servicii, nu șase, deci coloanele de mijloc sunt 2 + 1.

Textul e integral din spec, doar reașezat (`megaMenu` în `src/i18n/ro.ts` și `en.ts`): titlul și lead-ul din `02-servicii-index § Hero`, descrierile din § Cele trei grupuri, caseta din dreapta din `00-global § Banda finală de CTA`, banda de jos din datele de contact și „Suport pentru clienți”. Niciun cuvânt nou. Tipografia, culorile și spațierea vin din tokeni: `--fs-h2` pe titlul de coloană, `--fs-h3` pe titlurile de serviciu, `--fs-small` pe descrieri, teal pe linkuri, `--line` pe separatoare, scara `--s-*` pe distanțe.

Verificat: `npm run build` 0 erori / 0 avertismente, `astro check` 0/0/0, `qa/keyboard.mjs` toate verificările trecute, `qa/pagecheck.mjs` 39 de pagini 0 cu probleme, capturi RO și EN × light și dark la 1440 și mobil la 375, consolă curată.

Reparate după ce m-am uitat la capturi: `hyphens: auto` rupea titlurile de coloană; săgeata linkului rămânea orfană pe rândul următor (acum are spațiu insecabil înainte — atenție, escape-ul CSS `\00a0` se randează greșit, trebuie caracterul propriu-zis); `.nav__item` avea `position: relative`, ceea ce ancora panoul de `<li>` în loc de `<header>`.

`qa/keyboard.mjs` a fost modificat: verificarea „click în afară închide” dădea clic la 720,600, punct care acum cade în interiorul panoului (mult mai mare decât vechiul dropdown). Acum calculează marginea panoului și dă clic sub el.

Rămâne deschis: coloana a treia are un singur serviciu, iar în imagine coloanele de servicii au eyebrow de grup („INFRASTRUCTURĂ & CLOUD”). Nu am inventat astfel de etichete.

## Hero-ul de pe homepage, text nou (17 septembrie 2026, dat de Marius)

Înlocuit în `src/copy/home.ro.ts`:
- **H1:** „Proiectăm, securizăm și administrăm întreaga infrastructură IT de care firma ta are nevoie.”
- **Lead:** „Începem cu servere, rețea și cloud, ajungem la aplicații, automatizări și agenți AI. Securitatea se proiectează de la început și se integrează în fiecare etapă.”
- **Eyebrow:** scos. Marius a trecut vechiul eyebrow în ce se înlocuiește și n-a dat altul în loc. `hero.eyebrow` a devenit opțional în `home.types.ts`, iar `HomePage.astro` îl randează doar dacă există. De confirmat că asta a vrut.

Butoanele și FactStrip-ul n-au fost atinse.

De adus la zi, de către Marius (eu nu modific `spec/`):
1. `spec/continut/01-acasa.md` § 1 Hero — textul de acolo e acum altul decât cel din pagină, inclusiv nota despre eyebrow.
2. **Engleza a rămas neschimbată.** `/en` are în continuare „Your company's IT, run by someone who answers for it…”. Nu traduc (CLAUDE.md regula 2); aștept varianta EN.
3. `Description` din meta („Suport și administrare IT pentru firme de 10–100 de angajați…”) și FactStrip-ul încă spun povestea veche, de suport și administrare. Hero-ul nou vorbește de proiectare, aplicații și agenți AI. De decis dacă se aliniază și restul.

Verificat: build 0/0, `astro check` 0/0/0, textul extras din `dist/index.html` e identic caracter cu caracter cu ce a trimis Marius (comparat programatic), capturi la 1440 light și dark și la 375.

## Regula 12 și recuperarea a ce rămăsese pe jumătate (17 septembrie 2026)

Marius: „orice modificare îți cer, trebuie să o faci pe toate limbile, + meta description, spec/continut, absolut tot”. Regula a intrat în `CLAUDE.md` ca **regula 12**, iar regulile 2 și 5 au fost rescrise ca să nu se mai contrazică: textul din spec rămâne sursa de adevăr și nu-l ating din proprie inițiativă, dar când schimbarea vine de la el o duc peste tot, inclusiv în `spec/`.

Aplicat retroactiv la tot ce rămăsese neterminat în sesiunea asta:

**Hero-ul de pe homepage.** EN tradus de mine (marcat în cod și în spec ca traducere de confirmat): „We design, secure, and run the entire IT infrastructure your company needs.” / „We start with servers, network, and cloud, and go on to applications, automation, and AI agents. Security is designed in from the start and built into every stage.” Meta description rescris pe ambele limbi (143 și 129 de caractere). Spec adus la zi în `01-acasa.md` și `01-home.md`, inclusiv scoaterea eyebrow-ului.

**Anthropic Partner.** Adăugat peste tot unde exista lista: FactStrip și footer (`src/i18n/ro.ts`, `en.ts`), `src/lib/site.ts`, tabelul de pe Despre (`about.ro.ts`, `about.en.ts`), și în spec: `00-global.md` × 2 (footer, FactStrip), `01-acasa.md` / `01-home.md` § 9, `09-despre.md` / `09-about.md`, `DESIGN.md` § Imagini, `PLACEHOLDERS.md` (rândul `[[LOGO_PARTENERI]]` și linia de decizii).

**Panoul de meniu.** Descris în `DESIGN.md` (secțiune nouă, § Panoul „Servicii”: grilă, coloane, bandă de jos, comportament la tastatură) și în `00-global.md` § Meniu pe ambele limbi, cu precizarea că textele din panou sunt reluate din alte pagini, nu rescrise.

**Lăsat intenționat neschimbat, cu motiv:** propoziția despre furnizori din `03-suport-it.md` / `03-it-support.md` și copiile ei din `itsupport.ro.ts` / `itsupport.en.ts` („Statusurile de partener (Microsoft Partner, Fortinet Advocate, Veeam Partner) înseamnă acces la suportul lor direct”). Acolo lista înseamnă furnizori de firewall, NAS și licențe, de la care cumpărăm hardware; Anthropic n-are ce căuta în fraza aia. E singura potrivire rămasă la `grep "Veeam Partner" | grep -v Anthropic`, în ambele limbi și în spec, deci simetric.

Verificat: `npm run build` 0/0, `astro check` 0/0/0, `qa/pagecheck.mjs` 39 de pagini 0 probleme, `qa/keyboard.mjs` tot trece, `qa/textdiff.mjs` pe `01-acasa.md`↔`index.html` și `01-home.md`↔`en.html` — **zero diferențe de text**, la fel pe Despre în ambele limbi. `grep` după textul vechi de hero în `src/`, `spec/` și `dist/`: zero potriviri.

Reparat pe parcurs: notele mele din spec („Hero schimbat de Marius…”) fuseseră scrise ca blockquote și `qa/textdiff.mjs` le număra ca text de pagină lipsă; rescrise ca „Notă pentru Claude Code:” / „Note for Claude Code:”, forma pe care unealta o sare. Și celula de parteneri din FactStrip, cu al patrulea nume, rupea rândul înaintea punctului median; punctele au acum spațiu insecabil înainte.

## FactStrip-ul scos de sub hero-ul homepage-ului (17 septembrie 2026, cerut de Marius)

Banda cu `Din 2020` · `Cluj-Napoca` · `Răspuns sub 2 ore în program` · badge-urile partenerilor nu mai apare pe homepage. Primul ecran e acum doar titlu, lead și cele două butoane.

(Marius a văzut fiecare celulă de două ori când a copiat textul: `FactStrip` pune valoarea și într-un `<dt class="sr-only">`, pentru cititoarele de ecran, pe lângă `<dd>`-ul vizibil. Nu era o dublare în pagină.)

Aplicat, după regula 12:
- `src/components/home/HomePage.astro`: scoase `<FactStrip>`, `heroFacts`, importul și regula CSS `.hero__facts`; comentariul de ritm din capul fișierului adus la zi. Schimbarea e într-o componentă comună, deci acoperă automat ambele limbi.
- `spec/continut/01-acasa.md` și `spec/continut-en/01-home.md` § 1 Hero: rândul despre bandă șters.
- `spec/continut/00-global.md` și `continut-en/00-global.md`: secțiunea „FactStrip de sub hero” retitrată și marcată ca scoasă; valorile rămân documentate acolo, pentru că le folosește pagina de QA a componentelor.
- `spec/DESIGN.md` § Hero (homepage): propoziția despre bandă și despre „ancora vizuală a primului ecran” înlocuită.
- `spec/assets/FOTO-CONTEXT.md`: referința la „cu FactStrip-ul sub el” adusă la zi.

**Componenta `FactStrip` rămâne** — e folosită în continuare pe Despre, pe studiile de caz și pe Contact, iar textele din `src/i18n/*.ts` rămân pentru că le folosește `/qa/componente`.

Verificat: build 0/0, `astro check` 0/0/0, `qa/pagecheck.mjs` 39 de pagini 0 probleme, `qa/textdiff.mjs` zero diferențe pe ambele limbi. În `dist/index.html` și `dist/en.html`: zero apariții de `class="facts` și zero „Din 2020” / „Since 2020”; pe `despre.html` și `en/about.html` banda e intactă (13 potriviri fiecare). Capturi la 1440 light, 1440 dark EN și 375.

## Aranjamentul homepage-ului, după `example.png` (17 septembrie 2026, cerut de Marius)

Cerința, cuvânt cu cuvânt: „doar aranjarea în pagină, păstrează culorile actuale, fontul, conținutul text și meniul așa cum sunt acum”, fără niciun text și fără nicio culoare preluate din mockup.

Mockup-ul a fost măsurat, nu privit: benzile au fost decupate și mărite 2×, iar coloanele și riglele au fost găsite prin profil de pixeli. Proporțiile față de lățimea conținutului (786 px din 871): banda „ce facem” 41% / 7% / 52%; banda de proces 46% / 13% / 41%; banda „de ce” 29% + trei coloane de ~17% cu rigle între ele; banda de CTA titlu 49% și acțiune 28%, cu 22% gol la mijloc; banda de sub hero patru celule egale cu liniuță scurtă și rigle verticale.

Ce s-a schimbat în pagină:
- **§1 Hero** — ritm vertical gradat, ca în mockup (titlu → lead `--s-4`, lead → butoane `--s-6`), în loc de un `gap` uniform.
- **§2 Recunoști situația?** — cele trei `Card` au dispărut. Trei coloane despărțite de rigle verticale de 1 px `--line`, fiecare cu o liniuță teal de 28 × 3 px deasupra citatului. Sub 768 px se stivuiesc, cu liniuța păstrată.
- **§3 Ce facem** — din grilă de carduri în model „două coloane” cu riglă: ancora (eyebrow + H2) lipită în stânga, riglă verticală de 1 px pe toată înălțimea, iar în dreapta cele trei servicii ca rânduri despărțite de linii de păr. Fără numere de index: serviciile nu sunt o secvență, iar § 4 care urmează are numerotare reală.
- **§4 Cum lucrăm** — a ieșit din „două coloane”; antetul urcă sus pe toată lățimea, iar `Steps` a primit varianta `rail`: de la 1200 px cei patru pași pe un rând, cercul deasupra titlului, noduri legate de o linie de 1 px cu vârf de săgeată teal între ele, iar după al patrulea cerc linia curge mai departe — potrivit cu „Al patrulea nu se termină.”
- **§9 Parteneri** — patru celule egale pe toată lățimea, despărțite de rigle verticale scurte (2,8 em, centrate). 2 × 2 la 640–1023 px cu linie orizontală între rânduri, o coloană sub 640. Geometria vine din banda de sub hero a mockup-ului, dar **nu** se reintroduce banda de sub hero: aceea a fost scoasă tot azi, la cererea lui Marius.
- **CtaBand** — de la 1024 px titlul și textul lipite de marginea stângă a casetei, butonul și linia de contact lipite de marginea dreaptă, aliniate pe centru vertical. Componenta e pe toate paginile, deci schimbarea e globală.
- **Footer** — rândul de jos distribuit clar stânga/dreapta de la 768 px.

Componente atinse: `TwoCol` a primit prop-ul `rule`, `Steps` a primit `variant="rail"`. Nicio componentă nouă, nicio valoare în afara tokenilor, niciun font și niciun cod de culoare nou.

Ce **nu** s-a preluat, cu motiv: diagrama din dreapta hero-ului și graficul decorativ de pe banda de securitate (DESIGN.md § Imagini permite exact două diagrame în tot site-ul, iar mirosul #1 interzice ilustrația flotantă din hero); toate fundalurile pline ale mockup-ului (bandă închisă, bandă colorată) — acelea sunt culoare, nu aranjament, și cererea a fost explicită; antetul mockup-ului (meniul rămâne cum e); numerele mari 01–04 de pe banda „ce facem”; săgeata izolată din marginea rândului (linkurile noastre au deja săgeată la final); rândurile cu pictogramă din subsol (bugetul de 12 iconițe e consumat).

Reparat după ce m-am uitat la capturi și am măsurat în browser:
- Pașii din varianta `rail` își coborau titlul cu 10 px la trei din patru: rândurile `auto` se întindeau pe înălțimea celui mai înalt pas (`align-content` implicit se poartă ca `stretch`). Cu `align-content: start`, toate cele patru titluri și toate cele patru texte pornesc de la același `top` — verificat, 2235 și 2265 px pentru toate.
- Linia dintre rândurile de parteneri nu apărea la 640–1023 px: Astro adaugă atributul de scope la fiecare clasă, deci `.a + .a` ajunge la specificitate (0,4,0) și bătea `.a:nth-child(n+3)` cu (0,3,0). Selectorul a primit și el combinatorul. Verificat la 375 / 768 / 1440.
- `qa/textdiff.mjs` număra notele noi de layout din spec ca text de pagină lipsă; lista de prefixe sărite a primit noile formulări.

Verificat: `npm run build` 0 erori / 0 avertismente, `astro check` 0/0/0, `qa/pagecheck.mjs` 39 de pagini 0 probleme, `qa/keyboard.mjs` tot trece, `qa/headings.mjs` pe cinci pagini (un singur h1, fără sărituri de nivel), `qa/contrast.py` 35/36 (a 36-a e verificarea intenționat negativă, orange pe fundal deschis), `qa/textdiff.mjs` zero diferențe de text pe ambele limbi. Capturi la 1440 light și dark, EN 1440, 768 și 375, plus decupaje pe §2, §3, §4, §9 și CtaBand, și CtaBand de pe /servicii ca să văd efectul pe altă pagină. Consolă curată.

### Revizia aranjamentului: 31 de constatări confirmate, 24 respinse (18 septembrie 2026)

Layout-ul nou a fost trecut printr-o revizie pe cinci dimensiuni (fidelitate față de mockup, spec și mirosuri, comportament la lățimi mici și accesibilitate, calitatea modificării, respectarea literală a constrângerii), iar fiecare constatare a fost dată unui sceptic independent care a încercat s-o infirme. Au trecut 31.

**Cea mai importantă, și e vina mea:** textul curent din § 2 și § 3 trecuse din `--text` în `--muted`. Când am desfăcut cardurile am pierdut `.card__body { color: var(--text) }` și am scris `color: var(--muted)` în locul lui. Asta e schimbare de culoare, exact ce mi s-a interzis. Reparat: ambele reguli au dispărut, textul moștenește `--text` ca înainte (verificat: `rgb(20, 35, 42)` peste tot, identic cu `body`).

**A doua:** rigla verticală pe care o pusesem între ancoră și conținut la § 3 **nu există în mockup**. Verificat pe pixeli: între x=367 și x=421, pe toată înălțimea benzii „ce facem”, nu e niciun pixel diferit de fundal — cele două coloane sunt despărțite doar de alb. Rigla a fost scoasă, iar prop-ul `rule` de pe `TwoCol` a fost șters cu totul, fiindcă nu-l mai folosea nimeni.

**A treia:** cele trei citate din § 2 coborâseră din `<h3>` în `<p>` odată cu cardurile, deci homepage-ul pierduse trei titluri. Întoarse la `<h3>`; `qa/headings.mjs` numără acum 26 de titluri pe homepage, față de 23.

Restul, pe scurt:
- Celula 3 de parteneri se lipea de riglă la ≥1024 px: regula `nth-child(odd) { padding-left: 0 }` de la pragul 640 (unde „impar” înseamnă coloana stângă din 2×2) rămâne activă și mai sus și e mai specifică decât shorthand-ul. Resetată explicit. Verificat: 0 / 24 / 24 / 24 px la 1024 și 1440, 0 / 24 / 0 / 24 la 768, unde e corect.
- Rândul de jos din footer nu se distribuia: `margin-left: auto` era scris înaintea lui `.footer__legal { margin: 0 }`, iar shorthand-ul îl anula. Mutat după și `.lang` a rămas fără `margin-left: auto`, altfel absorbea singur tot spațiul.
- Linkurile din § 3 rămăseseră la greutatea 400: `.rows__link a` n-a fost adăugat în lista de selectori care dau stilul de link terțiar. Adăugat.
- Pașii: linia pleacă acum din muchia cercului (era la 12 px), iar vârful de săgeată stă la 85% din interval (era lipit de nodul următor, deși comentariul și spec-ul spuneau 85%).
- Pașii se rupeau 3 + 1 între 700 și 1022 px, pentru că `auto-fit` nu respectă 2 × 2. Varianta `rail` are acum coloane explicite: 1, apoi 2 de la 640, apoi 4 de la 1200. Verificat la patru lățimi.
- `.step__title { align-self: center }` plus rânduri `auto` care se întind coborau titlurile în varianta implicită (deci și pe /cum-lucram): `align-content: start` pe `.step`.
- Cele trei coloane din § 2 își porneau propozițiile de la cote diferite. Aliniate cu `subgrid`. Verificat: toate trei la același `top` la 768, 1024 și 1440.
- CSS mort șters (`.grid-3--wide`, `:global(.steps-2x2)`), `role="list"` pe `<ol class="steps">`, cross-fade-ul badge-urilor făcut simetric, patru comentarii aduse la zi.
- Spec-ul sincronizat: § 3 fără riglă, § 9 descrie acum și secțiunea de tehnologii cu eyebrow-ul și H2-ul ei (erau în pagină din decizia de ieri, dar spec-ul rămăsese la „rând discret, text”). `qa/textdiff.mjs` numără acum 68 de fragmente, toate găsite identic, pe ambele limbi.

**Nereparate, pentru că sunt dinainte și în afara cererii** (le las aici ca să nu se piardă): gutiera meniului mobil e 20 px fixă, deși containerul trece la 32 px de la 768; zona de atingere a comutatorului de limbă e 16 px lățime, sub minimul de 44 px din DESIGN § Accesibilitate, și e singurul comutator de limbă sub 1024 px; CtaBand are două salturi de padding simultan exact la 768 px, deci lățimea utilă scade cu 87 px față de 767; linia de contact din CtaBand e text simplu, nu `tel:` și `mailto:`, deși e ultimul lucru dinaintea footer-ului pe telefon.

## Cele patru reparații amânate + graficul de linii din hero (18 septembrie 2026, cerut de Marius)

**Cele patru, reparate:**
- Gutiera meniului mobil urmează acum containerul: 20 px sub 768, 32 px de la 768 în sus (panoul e vizibil până la 1023 px). Verificat la 375, 767, 768 și 900.
- Comutatorul de limbă: zonă de atingere de 44 × 44 px sub 1024 px, unde meniul mobil e singurul comutator. Peste 1024 rămâne compact, cu 44 px doar pe înălțime, ca să nu se lățească bara. `DESIGN.md § Accesibilitate` cere 44 px „pe mobil”, deci pragul e fidel formulării.
- CtaBand: padding continuu, `clamp(var(--s-6), 5vw, var(--s-8))`, în locul saltului 32 → 64 px de la 768 px. Lățimea utilă mai scade la 768 doar cu cei 23 px care vin din gutiera containerului (20 → 32 px), decizie de sistem din DESIGN § Layout; înainte pierdea 87 px dintr-odată.
- Linia de contact din CtaBand: telefonul e `tel:`, emailul e `mailto:`. Textul randat e identic caracter cu caracter cu `contactLine` din i18n — verificat programatic pe ambele limbi, `'+40 757 150 894 · office@bitup.ro'`.

**Graficul din hero** (`src/components/home/HeroLines.astro`). Tiparul din `example.png`: linii orizontale fragmentate, cu margine stângă inegală și câteva noduri pătrate, care se strâng spre dreapta într-un mănunchi de patru curbe ce urcă; cea mai de sus se termină cu vârf de săgeată, celelalte trei cu pătrate, în trepte; peste tot, fire verticale de reper. Citirea e de jos-stânga spre sus-dreapta.

Geometria e măsurată din mockup, nu desenată din ochi: regiunea 470–860 × 70–380 din `example.png` a devenit `viewBox="0 0 390 310"`, iar fiecare linie, nod și curbă stă la coordonatele găsite prin profil de pixeli. Cele patru curbe pornesc din liniile 2, 4, 6 și 8 (măsurate la y = 137, 164, 191, 220), se îndoaie exact unde se termină rulajul orizontal în mockup (x = 312, 285, 252, 233) și urcă pe verticalele x = 356, 343, 331, 320, la înălțimile 20, 56, 71, 87 — aceleași cu centrele pătratelor detectate în imagine.

Ce **nu** s-a preluat: cele trei etichete din colțuri (sunt text, iar textul din mockup e interzis) și culorile (mănunchiul e `--teal`, fragmentele `--line`, nodurile `--muted` — toate din tokeni). SVG inline, `aria-hidden`, fără cereri de rețea.

Hero-ul devine două coloane (1,35fr / 1fr) **de la 1200 px**. Sub atât, graficul nu se afișează: la 1024 px coloana de text îngusta titlul la șase rânduri, față de patru acum. Verificat la 375, 768, 1024, 1199, 1200 și 1440.

Reparat pe parcurs: prima dată graficul a căzut sub text, pentru că pusesem grila pe `.hero :global(.container)`, iar `.hero` e clasă dată lui `Section`, deci poartă scope-ul lui `Section`, nu al lui `HomePage` — aceeași capcană ca la `.hero__facts` și la `.services-two`. Grila stă acum pe un `div.hero__grid` randat chiar de `HomePage`.

Spec adus la zi: `DESIGN.md` § Hero (homepage), § Imagini (a treia diagramă permisă, cu descrierea tiparului) și § Ce nu facem (excepția explicită la „fără rețea de puncte”: graficul e un traseu cu sens, nu o textură), plus § 1 Hero în `01-acasa.md` și `01-home.md`.

Verificat: build 0/0, `astro check` 0/0/0, `pagecheck` 39 de pagini 0 probleme, `keyboard` tot trece, `headings` un singur h1 și 26 de titluri pe ambele limbi, `textdiff` zero diferențe pe ambele limbi (68 de fragmente), consolă curată la șase capturi (1440 light și dark, EN 1440, 1024, 768, 375).

## Graficul din hero, după `hero.png` (18 septembrie 2026, cerut de Marius)

Cerința: „implementezi pe site în secțiunea hero grafica din partea dreaptă, folosind culorile brandului BITUP”. Graficul de ieri, făcut după `example.png`, a fost înlocuit — `HeroLines.astro` s-a șters, a apărut `HeroDiagram.astro`.

**Tiparul**, citit de la stânga la dreapta: un câmp de fragmente împrăștiate (liniuțe scurte și arce rupte, ca trasee de circuit tăiate) în cinci benzi, fiecare cu eticheta ei; la mijloc o spină verticală cu cinci noduri pătrate, unde fragmentele se adună; în dreapta șase trasee care pleacă din noduri, urcă în evantai și se termină cu pătrate, în trepte. Jos, două etichete de colț. De la fragmentare la progres.

**Geometria e măsurată, nu desenată din ochi.** Regiunea 904–1724 × 68–783 din `hero.png` a devenit `viewBox="0 -14 838 742"`. Spina e la x=1335 → 431; cele cinci noduri de 22 px la y = 290, 380, 478, 575, 670 → 222, 312, 410, 507, 602; cele șase verticale ale evantaiului la x = 1622, 1646, 1671, 1685, 1696, 1717 → 718, 742, 767, 781, 792, 813, cu capetele la y = 194, 155, 116, 193, 75, 156 → 126, 87, 48, 125, 12, 88. Toate găsite prin profil de pixeli, nu aproximate.

**Culorile sunt ale noastre**, cum a cerut: `--navy` pe etichete și pe jumătate din fragmente, `--teal` pe cealaltă jumătate, pe spină, pe noduri, pe trasee și pe capete. Niciun cod de culoare scris direct, niciun albastru din mockup. Orange rămâne doar pe butonul de Radiografie.

**Câmpul de fragmente e generat determinist** (generator liniar cu sămânța 20260918), ca două build-uri succesive să dea același SVG. Fragmentele ocolesc casetele etichetelor: dacă unul ar cădea peste text, se mută în stânga sau în dreapta lui. Verificat că etichetele rămân libere de spină în ambele limbi: distanța minimă e 26 px la „Software development”, 82 px la „Cybersecurity”.

**Textul.** Cele cinci etichete de bandă și cele două de colț sunt text nou, luat din mockup, pus în `heroDiagram` în `src/i18n/ro.ts` și `en.ts` și trecut în `spec/continut/01-acasa.md` și `continut-en/01-home.md` § 1. Engleza e traducerea mea, marcată ca atare. **Cele cinci nume nu se suprapun peste cele trei grupuri de servicii din `02-servicii-index.md`** — e o taxonomie nouă, de reconciliat cu Marius. Majusculele de pe etichetele de colț se fac din CSS, nu din conținut, ca să nu fie citite literă cu literă.

Graficul are `role="img"` și `aria-label` (poartă informație, nu e decor) și se afișează de la 1200 px. Sub atât, coloana de text ar fi prea îngustă: la 1024 px titlul trecea la șase rânduri.

Echilibrul celor două coloane: 1,3fr text / 1fr grafic, cu `gap: var(--s-7)`. La 1440 px titlul rămâne la patru rânduri, iar graficul are 438 px, ceea ce face etichetele de 26 px din `viewBox` să se randeze la ~14 px. În mockup pânza are 1774 px lățime și încap amândouă lat; la noi containerul are 1120 px, deci una din două trebuie să cedeze. Dacă vrei proporțiile din mockup, hero-ul trebuie să iasă din container pe toată lățimea — e o schimbare separată, nu am făcut-o.

Verificat: build 0 erori / 0 avertismente, `astro check` 0/0/0, `pagecheck` 39 de pagini 0 probleme, `keyboard` tot trece, `headings` un h1 și 26 de titluri pe ambele limbi, `textdiff` zero diferențe (69 de fragmente, cu etichetele noi găsite în pagină), consolă curată la șase capturi.

### Revizia graficului din hero: 13 constatări confirmate, 17 respinse (18 septembrie 2026)

Prima versiune a graficului a fost trecută printr-o revizie pe patru dimensiuni (fidelitate geometrică, culori și reguli de brand, accesibilitate și lățimi mici, calitatea codului), cu câte un sceptic independent pe fiecare constatare. Trei erau blocante și toate trei atingeau caracterul desenului:

1. **Numărul de trasee.** Mockup-ul are paisprezece, în mănunchiuri de 3/2/3/3/3 pe cele cinci noduri; eu desenasem șase, câte unul pe nod. Măsurat pe coloana imediat la dreapta nodurilor: mockup 14 linii la pas de 11–13 unități, eu 5. De acolo venea cea mai mare parte a diferenței — mockup-ul citea ca panglici de circuit, al meu ca fire răzlețe.
2. **Forma cotului.** Orizontalele mele mergeau cu 82–163 de unități mai departe decât în mockup înainte să înceapă să urce, iar cotul era o cubică leneșă în loc de arc. Porțiunea strict verticală de sub pătrate ieșea de 2–4,5 ori mai scurtă: 17–99 de unități față de 76–282 în mockup.
3. **Sensul mănunchiului.** În mockup traseele nodului de sus **coboară** vreo 47 de unități până la nivelul comun, merg un palier împreună cu celelalte, și abia apoi urcă toate laolaltă — evantaiul e convergent. La mine fiecare traseu urca monoton de la nodul lui direct la verticala lui, deci desenul se deschidea în loc să se adune: exact pe dos față de „de la fragmentare la progres”.

Reparat: `trasee` se generează acum ca mănunchiuri de 3/2/3/3/3, cu traseele unui mănunchi paralele la 12 unități; fiecare traseu are patru bucăți — orizontală de la nod, cot spre palierul comun, palier, cot final spre verticala proprie — cu raza cotului ≈ 90 (K = 0,552 × r). Cele paisprezece trasee converg în cele șase verticale măsurate (x = 718, 742, 767, 781, 792, 813) cu capetele la y = 134, 95, 56, 132, 15, 95. Pătratele sunt opt, ca în mockup: șase capete plus două prinse pe verticala x=781, la y=210 și 321.

Celelalte, reparate la fel:
- Etichetele stăteau cu 21–35 de unități mai sus decât în mockup. Au coborât pe valorile măsurate: y = 169, 282, 383, 486, 586.
- Garda anti-suprapunere testa doar punctul de plecare al fragmentului, dar formele curbe urcă sau coboară până la 19 unități, așa că șapte fragmente intrau peste text și cinci tăiau literele, în ambele limbi. Acum forma se alege **înainte** de test, iar testul se face pe toată anvelopa fragmentului.
- Fragmentele erau prea groase (2,4 → 1,8), prea lungi și prea uniforme; formele erau S-uri în loc de colțuri de traseu. Sunt acum colțuri de sfert de cerc cu rază 8–9, iar distribuția pe lățime e uniformă, nu ciorchine.
- Etichetele de colț stau pe două rânduri, ca în mockup.
- `role="img"` face tot subarborele prezentațional, deci cele cinci etichete nu ajungeau la cititoarele de ecran. `aria-label` le enumeră acum.

Ce **nu** am făcut, deși revizia a cerut: micșorarea etichetelor de bandă la corp 20 pentru fidelitate. Ar fi coborât textul efectiv la ~10 px, sub `--fs-small`. Accesibilitatea bate fidelitatea: corpul e 28 de unități (≈14,6 px redați), iar etichetele ies cu ~35% mai late decât în mockup. E o abatere conștientă, nu o scăpare.

Verificat după reparații: build 0/0, `astro check` 0/0/0, `pagecheck` 39 de pagini 0 probleme, `keyboard` tot trece, `headings` 26 de titluri și un singur h1 pe ambele limbi, `textdiff` zero diferențe (69 de fragmente), consolă curată. Determinismul generatorului confirmat: două build-uri succesive dau același SVG (hash `9fa1aa20f71f4d8a`, 15,4 KB în pagină).

### Graficul din hero, ajustările lui Marius (18 septembrie 2026, seara)

Cinci cereri, toate făcute:
1. **Săgeți în loc de pătrate** la capetele traseelor de la „progres”, în orange din brand. Șase săgeți, triunghiuri pline.
2. **Logo-ul oficial BITUP** deasupra spinei, cu aceleași căi ca `Logo.astro` și aceiași tokeni de culoare, deci varianta pentru temă închisă vine automat.
3. **Cele două pătrate fără linie** (le adăugasem după revizia de dimineață, care le văzuse în mockup pe verticala x=781) au fost scoase: pe traseul nostru chiar nu aveau linie sub ele.
4. **Nodurile de pe spină** au trecut din teal în orange.
5. **Mai mare și mai aerisit**: distanța dintre benzi a crescut de la 95 la 108 unități, fragmentele de la 20 la 15 pe bandă, iar graficul redat a crescut de la 438 la 490 px.

Ca „mai mare” să nu mănânce din titlu, hero-ul a primit un **container lat**: `--container-wide: 1360px`, prop nou `wide` pe `Container`, activ de la 1360 px în sus. Am ales pragul 1360 pentru că exact acolo decalajul față de containerul normal devine o constantă — (1360 − 1120) / 2 = 120 px — deci alinierea se poate face dintr-o valoare fixă, fără calcule cu `vw` care s-ar clătina din cauza barei de derulare.

Prima încercare a ieșit strâmbă: hero-ul începea cu 120 px mai la stânga decât toate celelalte secțiuni. Grila hero-ului are acum în față o gutieră de 72 px care, împreună cu gap-ul de 48 px, dă exact cei 120 px. Verificat programatic la 1200, 1359, 1360, 1440 și 1600 px: marginea stângă a titlului și marginea stângă a eyebrow-ului din secțiunea următoare cad la același x (72, 152, 152, 192, 272). Titlul rămâne la patru rânduri la toate lățimile.

**Orange-ul, de spus pe față.** Regula de până acum — „orange doar pe butonul de Radiografie, maximum trei apariții pe pagină” — nu mai ține: pe primul ecran sunt cinci noduri, marca din logo și butonul. (Săgețile au fost și ele orange la prima încercare; Marius le-a vrut altfel — vezi mai jos.) Am actualizat regula în `CLAUDE.md` § premium și comentariul tokenului din `tokens.css`, altfel sesiunea următoare ar fi dat schimbarea înapoi „ca reparație”. Dacă Marius nu vrea regula modificată, se schimbă înapoi, dar atunci trebuie schimbată și culoarea din grafic.

**Contrastul.** Orange pe fundalul deschis dă 2,02:1, cea mai slabă pereche din paletă — de asta `DESIGN.md` interzice orange pentru inelul de focus. Pe fundal închis dă 8,37:1. Nodurile și săgețile sunt elemente decorative într-un grafic care are etichetă proprie, deci nu cad sub cerința de 3:1 pentru componente de interfață, dar în temă deschisă se văd palid față de cum arată în dark. De spus lui Marius, nu de ascuns.

Verificat: build 0/0, `astro check` 0/0/0, `pagecheck` 39 de pagini 0 probleme, `keyboard` tot trece, `headings` 26 de titluri și un h1 pe ambele limbi, `textdiff` zero diferențe (69 de fragmente), `contrast.py` 35/36 (a 36-a e verificarea intenționat negativă), consolă curată la șapte capturi: 1440 light și dark, EN 1440, 1280, 1200, 1024, 375.

### Săgețile din grafic: V teal în loc de triunghi orange (18 septembrie 2026)

Marius, după ce a văzut capturile: „nu îmi place portocaliul din capătul liniilor, adică săgețile, aș vrea să vie doar ca un V, nu ca un triunghi plin, și cred că până la urmă mai bine arată pe culoarea aceea verde”.

Făcut: cele șase capete sunt acum V-uri deschise, trasate cu `--teal` la 2,6 px, cu vârful exact pe capătul liniei verticale (`M x−10 y+14 L x y L x+10 y+14`), nu triunghiuri pline. Nodurile de pe spină rămân orange — cererea a fost explicit despre săgeți, nu despre noduri.

Aduse la zi odată cu schimbarea: comentariul tokenului `--orange` din `tokens.css`, regula de culoare din `CLAUDE.md` § premium (acum spune „cele cinci noduri”, nu „nodurile și săgețile”), descrierea din `DESIGN.md` § Imagini și notele din `01-acasa.md` și `01-home.md`.

Verificat: build 0/0, `astro check` 0/0/0, `pagecheck` 39 de pagini 0 probleme, `keyboard` tot trece, `headings` 26 de titluri și un h1 pe ambele limbi, `textdiff` zero diferențe (69 de fragmente), consolă curată la cinci capturi. În HTML-ul livrat: 5 noduri orange, 6 săgeți teal.

### Triunghiul portocaliu care „încă apărea”: serverul de dev, a treia oară (18 septembrie 2026)

Marius, după schimbarea săgeților: „încă apare și triunghiul portocaliu în vârf”. Nu era în cod. Măsurat pe ambele servere, în același moment:

| | `fill` | `stroke` |
|---|---|---|
| dev, portul 4321 | `rgb(254, 152, 42)` | `none` |
| preview pe build, portul 4323 | `none` | `rgb(32, 104, 108)` |

Markup-ul era deja cel nou (traseul în V, fără `Z`), dar serverul de dev livra regula CSS veche, `fill: var(--orange)`. Un `path` deschis în formă de V, umplut, arată exact ca un triunghi plin — deci pe ecranul lui era portocaliu, iar pe build-ul meu era V teal. Reparat cu `astro dev stop` + `npm run dev`; după repornire, dev-ul dă `fill: none`, `stroke: rgb(32, 104, 108)`, grosime 2,6 px.

A treia oară într-o zi. Regula a intrat în `.claude/skills/design-loop/SKILL.md`: după orice schimbare de CSS, serverul de dev se repornește **înainte** de a-i spune lui Marius să dea reload.

Verificat după aceea, cu numărătoare de pixeli pe captura din dev: singurul portocaliu rămas în grafic e la cele cinci noduri de pe spină (100–166 px fiecare) și în marca din logo-ul oficial (41 px). Zero portocaliu la capetele traseelor.

### Butonul secundar din hero: „Explorează serviciile” (18 septembrie 2026)

Cerut de Marius: în hero, în locul lui „Vezi cum lucrăm”, textul „Explorează serviciile” (l-a scris fără diacritice și cu o literă lipsă, `Exporeaza`; am folosit forma corectă, cea din `hero.png`).

Odată cu eticheta s-a schimbat și **destinația**: butonul duce acum la `/servicii`, nu la `/cum-lucram`. Un buton care scrie „Explorează serviciile” și deschide „Cum lucrăm” ar fi fost o capcană; schimbarea e a mea, nu cerută, dar fără ea eticheta ar fi mințit.

Aplicat peste tot, după regula 12: `home.ro.ts`, `home.en.ts` (engleza „Explore our services” e traducerea mea, de confirmat), destinația din `HomePage.astro`, `spec/continut/01-acasa.md` și `continut-en/01-home.md` § 1 (și eticheta, și ruta), plus exemplul de buton secundar din pagina de QA a componentelor, ca `grep` după textul vechi să iasă gol. Verificat: `grep "Vezi cum lucrăm\|See how we work"` în `src/` și `spec/` nu mai întoarce nimic.

În HTML-ul livrat: `/servicii` → „Explorează serviciile” și `/en/services` → „Explore our services”.

Verificat: build 0/0, `astro check` 0/0/0, `pagecheck` 39 de pagini 0 probleme, `keyboard` tot trece, `textdiff` zero diferențe pe ambele limbi. Capturile sunt luate de pe serverul de dev repornit, nu de pe build — conform regulii intrate azi în `design-loop`.

## `/despre` rescrisă ca pagina firmei (18 septembrie 2026)

Cerut de Marius: `/despre` nu mai e pagina fondatorului, ci a companiei. Fără portret, fără povestea lui Marius, fără § Traseul. Textul nou (RO) l-a scris el; engleza e traducerea mea, de confirmat.

### Ce s-a schimbat

- `spec/continut/09-despre.md` și `spec/continut-en/09-about.md`: rescrise integral. Opt secțiuni — Hero, Originea, Echipa, Cui ne adresăm, Ce rezolvăm, Tehnologia, Valorile, Firma — plus banda finală.
- `src/copy/about.ro.ts` / `about.en.ts`: interfața `AboutCopy` e alta (hero / origin / team / audience / problems / tech / values / company / cta). Câmpurile vechi (`story`, `timeline`, `principles`, `else`, `portraitAlt`, `personal`) au dispărut.
- `src/components/pages/AboutPage.astro`: reconstruită. Zero `<img>` și zero `<picture>` în HTML-ul livrat, pe ambele limbi (verificat).
- `src/lib/schema.ts`: `aboutPage()` nou; `/despre` emite `AboutPage` cu `mainEntity` → `Organization`, fără nod `Person` separat.
- `src/i18n/routes.ts`: cheia `team` (`/echipa` ↔ `/en/team`).
- `CLAUDE.md`: § Voce nu mai trimite la „hero-ul, § Povestea și § Traseul de pe Despre” (secțiunile nu mai există); mirosul 16 spune acum unde apare Marius.

### Ritmul paginii — de ce nu arată toate secțiunile la fel

Marius a cerut explicit: „pagina are o listă, un 2×2 și trei carduri de valori — dacă toate trei arată la fel, ai greșit ritmul”. Măsurat la 1440 px, silueta fiecărei secțiuni (toate pornesc din aceeași margine, `x=192`):

| Secțiune | Formă | Lățime utilă | Fundal |
|---|---|---|---|
| Hero | o coloană, tipografic | 609 px (H1) | `--surface-2` |
| Originea | două coloane, eyebrow sticky în stânga | 728 px (text) | `--bg` |
| Echipa | titlu lat, apoi două coloane de text, link sub linie | 2 × 496 px | `--surface` |
| Cui ne adresăm | o singură coloană, buline simple | 728 px | `--bg` |
| Ce rezolvăm | patru carduri, 2×2 | 4 × 516 px | `--surface-2` |
| Tehnologia | o coloană, primul paragraf la `--fs-lead` | 728 px | `--bg` |
| Valorile | trei carduri | 3 × 336 px | `--bg`, cu linie deasupra |
| Firma | FactStrip pe toată lățimea | 1056 px | `--surface` |

Lista, 2×2-ul și cele trei carduri sunt trei forme diferite: buline fără chenar, carduri de 516 px pe fundal `--surface-2`, carduri de 336 px pe `--bg`. Între 2×2 și cele trei valori stă o secțiune de text, ca să nu se citească drept „încă un grid”.

### Abateri și lucruri de confirmat

1. **Propoziția din `CLAUDE.md` punctul 16 nu exista.** Marius a cerut ca „Marius apare pe Despre, în secțiunile «Cine răspunde» (mic) și în caseta de autor.” să devină „Marius apare pe /echipa, …”. Punctul 16 nu conținea fraza asta; el spune doar ce e mirosul. Am adăugat fraza cerută (în forma pentru `/echipa`) la finalul punctului 16 și am corectat § Voce, care trimitea la secțiuni care nu mai există. Echivalentele reale ale frazei sunt în cinci locuri:

   | Fișier | Linie | Ce spune | Autorizat? |
   |---|---|---|---|
   | `CLAUDE.md` | 61 (§ Mirosuri, 16) | acum spune corect | da, corectat |
   | `CLAUDE.md` | 69 (§ Voce) | trimitea la „hero-ul, § Povestea și § Traseul de pe Despre” | da, corectat |
   | `spec/DESIGN.md` | 170 | „Portretul lui Marius apare în exact trei locuri: hero-ul de pe Despre (mare, 3:4), …” | **nu** |
   | `spec/assets/FOTO-CONTEXT.md` | 7 | aceeași afirmație | **nu** |
   | `spec/PLACEHOLDERS.md` | 21 | aceeași afirmație | **nu** |

   Ultimele trei sunt în afara listei de fișiere pe care am voie să le modific. Conform regulii lui Marius („orice altă modificare în spec/ o notezi în NOTES.md și mă întrebi”), le las neatinse. **Întrebare:** le corectez acum (portretul rămâne în două locuri, nu trei: „Cine răspunde” și caseta de autor — al treilea va fi `/echipa`), sau așteptăm pagina `/echipa`?

2. **`spec/continut/00-global.md` linia 33** spune „profilul personal de LinkedIn al lui Marius … apare pe Despre, pe Contact și în caseta de autor”. Pe `/despre` nu mai apare: textul nou are un singur link, LinkedIn-ul firmei. Fișierul nu e pe lista autorizată. **Aceeași întrebare.**

3. **„· Anthropic Partner” în FactStrip-ul de pe `/despre`.** Textul trimis de Marius listează trei parteneriate; l-am completat cu al patrulea, ca să fie același șir ca în footer, pe homepage și pe restul site-ului (`grep` după „Veeam Partner” dă peste tot patru). Dacă nu vrea, se scoate din patru locuri, nu din unul.

4. **Registrul „compania ta”.** Pe `/despre` se spune „compania ta”, nu „firma ta”, cum a cerut Marius. Verificat pe HTML-ul livrat: „firma ta” / „firmei tale” — zero apariții; „compania ta” — o apariție (titlul benzii finale), plus „companiei tale” în H1. Restul site-ului rămâne pe „firma ta”: e o excepție de pagină, nu o schimbare de voce.

5. **Linkul „Vezi echipa” duce către o pagină care nu există încă.** `/echipa` și `/en/team` sunt în `ARHITECTURA.md` § Rute și în `routes.ts`, dar pagina vine separat. Până atunci, linkul dă 404. `pagecheck` nu verifică țintele linkurilor interne, deci nu se prinde automat — rămâne punct deschis, asumat de Marius.

6. **`person()` din `src/lib/schema.ts` nu mai e folosit de nicio pagină.** L-am păstrat pentru `/echipa`. Ca să nu rămână `@id` în aer, `Organization.founder` a primit `@id: https://bitup.ro/#founder` — acolo trimite `Article.author` de pe fiecare articol și studiu de caz. Verificat pe `/rezultate/proq`: referința se rezolvă în același graf.

7. **`qa/textdiff.mjs`** a primit patru etichete de layout în lista de sărit: „Patru carduri” / „Four cards” și „Propoziție de închidere” / „Closing sentence”. Același tip de completare ca „Șase carduri” la /securitate. Tot pentru `textdiff`, linia de link din § Echipa s-a rescris în convenția fișierului (`Notă pentru Claude Code:` + `Link: Vezi echipa → /echipa`), ca eticheta să poată fi verificată; textul de pagină e neschimbat.

8. **Portretul rămâne pe disc**, în `src/assets/foto-marius/marius-portret-500x667.jpg`, nereferit de nicio pagină. Nu l-am șters: e materialul pentru `/echipa`. Astro nu-l mai procesează (din 21 de imagini generate, variantele de portret au dispărut).

### Verificări

- `npm run build`: 0 erori, 0 avertismente, 41 de pagini.
- `npx astro check`: 0 erori / 0 avertismente / 0 sugestii.
- `qa/textdiff.mjs`: 52 din 52 de fragmente găsite identic, RO și EN. Zero diferențe de text.
- `qa/pagecheck.mjs`: 39 de pagini, 0 cu probleme. `/despre` și `/en/about`: 1 `h1`, 0 salturi de nivel, 2 apariții de orange (sub maximul de 3), 0 imagini.
- `qa/headings.mjs`: 1 `h1` și 16 titluri pe fiecare limbă, fără salturi.
- `qa/keyboard.mjs`: trece pe `/despre` și pe `/en/about` (35 de elemente atinse cu Tab, focus vizibil pe toate, meniul se închide cu Esc).
- `qa/contrast.py`: 35 din 36 de perechi trec; singura „NU” e intrarea documentată care explică de ce orange nu se folosește la focus. Niciun token de culoare nou.
- 16 capturi în `qa/despre/` (375, 768, 1024, 1440 × light, dark × RO, EN), deschise și verificate una câte una. Consolă curată, zero cereri externe.

### Lista de mirosuri (`CLAUDE.md`), pentru `/despre` și `/en/about`

1. Hero centrat cu pilulă-badge, două butoane, ilustrație flotantă — **nu**. Hero tipografic, o coloană, aliniat la stânga, fără buton și fără imagine.
2. Gradient, glassmorphism, blob-uri, glow — **nu**. Doar culori plate din `tokens.css`.
3. Grid de trei carduri identice repetat pe fiecare pagină — **nu**. Pagina are un singur grid de trei (Valorile) și unul de patru (2×2), cu lățimi, fundaluri și numere de coloane diferite; între ele stau o listă, două secțiuni de text și un FactStrip. Tabelul de mai sus arată cele opt siluete.
4. Iconițe generice în carduri — **nu**. Niciun card nu are iconiță.
5. Umbre pe carduri, colțuri foarte rotunjite, `hover:scale` — **nu**. `--radius` 4 px, fără umbre, hover doar pe culoare.
6. Animații la scroll, contoare, carusele — **nu**. Zero JavaScript propriu pe pagină.
7. Paletă Tailwind, Inter, `max-w-7xl` — **nu**. Tokenii proiectului, Public Sans, containerul de 1120 px.
8. „De ce noi”, „Ce spun clienții” fără nume, cifre inventate — **nu**. Singurele cifre sunt datele de registru și „patru țări” din textul lui Marius.
9. Title Case, emoji, „Află mai multe →” — **nu**. Sentence case peste tot; etichetele de link sunt „Vezi echipa”, „Citește cazul ProQ”, „LinkedIn BitUp”.
10. Toate secțiunile cu același ritm — **nu**. Punctul cel mai atent verificat: opt secțiuni, opt forme, măsurate în tabel.
11. Footer cu patru coloane egale și newsletter — **nu**. Footer-ul global, neatins.
12. Padding-uri diferite de la o secțiune la alta — **nu**. Toate secțiunile pe `--section-y`, toate distanțele din scara `--s-*`.
13. Dark mode prin inversare — **nu**. Paleta dark din `tokens.css`; verificat în capturi la toate cele patru lățimi.
14. Imagini de stoc sau generate — **nu**. Pagina nu are nicio imagine.
15. `<div>` peste `<div>` fără semantică — **nu**. `<section aria-labelledby>` la fiecare secțiune, `<ul>` real la listă, `<dl>` la FactStrip, `<article>` la carduri.
16. Estetică de brand personal pe un site de firmă — **nu**. Zero portrete, zero avatare, zero semnătură, zero citat al fondatorului. Marius apare o singură dată pe pagină, în JSON-LD, ca `Organization.founder`.

## Pagina `/echipa` și `/en/team` (19 septembrie 2026)

Prima pagină din site cu date personale ale altor oameni. Se construiește integral, dar rămâne `noindex, nofollow` și în afara sitemap-ului cât timp `[[ACORD_ECHIPA]]` e necompletat.

### Layout

Cerut explicit de Marius: **nu** un grid de patru carduri egale. Textele au 186, 189, 130 și 120 de cuvinte în română; într-o grilă egală diferența s-ar vedea și ar cădea direct în mirosul 3. Patru rânduri suprapuse, despărțite de o linie de 1 px `--line`, cu fotografia pătrată în stânga, aliniată sus, și textul în dreapta. Fără alternanță stânga/dreapta.

Măsurat pe pagina construită, toate cele patru rânduri identic:

| Lățime | Fotografie | Text | Aliniere |
|---|---|---|---|
| 375 px | `x=20`, 160 px, deasupra | `x=20`, 335 px, la 16 px sub fotografie | fotografia la stânga, nu centrată |
| 768 px | `x=32`, 240 px | `x=304`, 432 px | pe același ax de sus cu textul |
| 1024 px | `x=32`, 240 px | `x=320`, 672 px | la fel |
| 1440 px | `x=192`, 240 px | `x=480`, 728 px (70ch) | la fel |

Ordinea din coloana de text: nume (`h3`) → rol → rând de experiență → text → link de LinkedIn.

### Trei decizii de detaliu, de confirmat

1. **Culoarea rolului.** Regula de layout 3 spune „rolul (mono, pe `--muted`), rândul de experiență (mono, pe `--muted`)”, dar fișierul de conținut le scrie diferit: „Rol (mono):” fără culoare, „Experiență (mono, `--muted`)”. Dacă amândouă sunt `--muted`, se citesc ca un singur bloc. Am pus rolul pe `--teal` (culoarea etichetelor mono din tot site-ul: Eyebrow, cheile din FactStrip) și experiența pe `--muted`. Ierarhia iese în trei trepte: nume navy, rol teal, experiență muted. Dacă vrei amândouă muted, e o linie de CSS.
2. **Inițialele din substituent.** Două litere pentru toți patru, din primele două cuvinte ale numelui: MG, PR, SB, CB. Pentru „Petre Radu Cătălin” asta dă „PR”; dacă numele de familie e Cătălin, se schimbă în „PC”.
3. **Titlul invizibil al secțiunii.** § Oamenii nu are titlu vizibil (ai cerut să nu apară tiparul eyebrow + H2). Ca ierarhia să nu sară de la `h1` direct la `h3`, secțiunea are un `h2` „Oamenii” / „The people” citit doar de cititoarele de ecran (`sr-only`). Nu se vede pe ecran.

### Iconița de LinkedIn: nu există ca SVG oficial

Regula era: descarci marca oficială din resursele de brand LinkedIn, o salvezi în `public/icons/linkedin.svg`, nu o desenezi. Am verificat `brand.linkedin.com`: singurele fișiere oferite la descărcare sunt două arhive, iar amândouă conțin **doar PNG**:

```
in-logo.zip        → in-logo/LI-In-Bug.png, InBug-White.png, InBug-Black.png, LI-China-In-Bug.png
linkedin-logo.zip  → linkedin-logo/LI-Logo.png, LI-China-Logo.png
```

Nu există niciun SVG pe brand.linkedin.com (`grep` după `.svg`, `.eps`, `.ai` pe pagina de descărcări și pe cea de politici: zero). Singurul SVG cu marca „in” pe care l-am găsit e foaia de iconițe de interfață a site-ului lor, livrată de pe un CDN Adobe AEM — nu e resursă de brand și nu o folosesc.

În plus, chiar dacă aș fi avut SVG-ul, culorile cerute (`--muted` în repaus, `--teal` la hover) ar fi însemnat recolorarea mărcii, adică exact ce interzic regulile lor de utilizare, pe care mi-ai spus să le respect.

Am aplicat regula ta de rezervă: **link textual „LinkedIn”, subliniat**, în teal, cu zona de atingere de 44 px înălțime, `aria-label` pe fiecare, `rel="noopener"`, tab nou. `public/icons/` nu există în repo. Dacă vrei totuși marca, varianta curată e PNG-ul oficial `LI-In-Bug.png`, în culoarea lui originală, fără recolorare — spune-mi și îl pun.

### JSON-LD

`ProfilePage` + patru noduri `Person`. Verificat pe HTML-ul construit, ambele limbi:

- `worksFor` apare **doar** la Marius Galmati (`{'@id': 'https://bitup.ro/#organization'}`).
- Zero `memberOf` și zero `affiliation`, la toți patru.
- Cristian Boanca nu are `sameAs` (linkul e încă placeholder); niciun `[[…]]` nu ajunge în graf.
- **Zero nume de companii** din rândurile de experiență în tot graful. Ca să iasă așa, nodul `ProfilePage` nu are `description`: descrierea paginii, scrisă de tine, numește Bosch, NTT DATA, Marsh și Concentrix, iar regula spunea „sub nicio formă”. Descrierea rămâne intactă în `<meta name="description">`, care nu e JSON-LD.

### Indexare

`noindex, nofollow` în `<head>` pe ambele pagini. `sitemap-0.xml` are 36 de URL-uri, niciunul `/echipa` sau `/en/team` (control: `/despre` e acolo). `hreflang` se emite normal: `ro` → `/echipa`, `en` → `/en/team`, `x-default` → `/echipa`, pe amândouă. Când completezi `[[ACORD_ECHIPA]]`, se scot `noindex` din `TeamPage.astro` și `echipa|en\/team` din filtrul de sitemap din `astro.config.mjs`.

### Legături

- Footer, coloana 3: `Echipa` / `Team`, între `Despre` și `Blog` (`spec/continut/00-global.md`, `src/i18n/ro.ts`, `src/i18n/en.ts`).
- Homepage § 7: rândul de linkuri e acum `Povestea, pe scurt · Echipa · LinkedIn` (`Links: The story, in short · The team · LinkedIn`).
- `/despre` § Echipa: linkul „Vezi echipa” nu mai dă 404.
- În meniul principal nu s-a adăugat nimic.
- URL-urile de LinkedIn: zero cu slash final, în tot repo-ul (`grep`: 10 × company, 12 × Marius, 4 × Petre, 4 × Samuel, niciunul cu `/` la sfârșit).

### Verificări

- `npm run build`: 0 erori, 0 avertismente, 43 de pagini (41 + 2).
- `npx astro check`: 0 erori / 0 avertismente / 0 sugestii.
- `qa/textdiff.mjs`: 27 din 27 de fragmente găsite identic, pe ambele limbi. Verificat separat, cuvânt cu cuvânt: cele trei paragrafe ale lui Petre (58/63/68 de cuvinte în RO, 46/63/67 în EN) și textul lui Samuel (93 de cuvinte în RO, 82 în EN, originalul lui în engleză, netradus și netăiat) apar identic în `dist/`. Homepage-ul rămâne la 70/70 după adăugarea linkului.
- `qa/pagecheck.mjs`: 41 de pagini, 0 cu probleme. `/echipa` și `/en/team`: 1 `h1`, 0 salturi de nivel, 2 apariții de orange, 0 imagini, placeholder-e `RELATIE_ECHIPA` și `LINKEDIN_CRISTIAN`.
- `qa/headings.mjs`: 1 `h1` și 8 titluri pe fiecare limbă (h1 → h2 invizibil → 4 × h3 → h2 închidere → h2 din banda de CTA).
- `qa/keyboard.mjs`: trece, 36 de elemente atinse cu Tab, focus vizibil pe toate. Verificat separat pe cele trei linkuri de LinkedIn: se ating cu Tab în ordinea Marius → Petre → Samuel, au `aria-label` corect pe ambele limbi, `rel="noopener"`, `target="_blank"`, înălțime 44 px și outline de 2 px teal la focus.
- `qa/contrast.py`: 40 din 41 de perechi trec (singura „NU” e intrarea documentată despre orange). Cinci perechi noi adăugate pentru pagina asta: rol teal pe `--surface` 6,45:1; experiență `--muted` pe `--surface` 5,84:1 (light) și 7,40:1 (dark); inițialele pe `--surface-2` 14,62:1 (light) și 11,82:1 (dark).
- 16 capturi în `qa/echipa/` (375, 768, 1024, 1440 × light, dark × RO, EN), deschise și verificate una câte una. Consolă curată, **zero cereri externe** (niciun `src`/`href` către alt domeniu; singurele adrese externe din pagină sunt cele trei linkuri de profil, care nu sunt resurse încărcate).

### Lista de mirosuri (`CLAUDE.md`), pentru `/echipa` și `/en/team`

1. Hero centrat cu pilulă-badge, două butoane, ilustrație flotantă — **nu**. Hero tipografic, o coloană, stânga, fără buton și fără imagine.
2. Gradient, glassmorphism, blob-uri, glow — **nu**. Doar culori plate din `tokens.css`.
3. Grid de trei carduri identice, repetat — **nu**. Pagina nu are niciun card. Patru rânduri de înălțimi diferite (986, 678, 678 și 483 px la 1440 px), despărțite de linii de păr.
4. Iconițe generice: scut, lacăt, rachetă, avatar generic — **nu**. Substituentul de fotografie e un pătrat cu inițialele persoanei, nu o siluetă de avatar. Zero iconițe pe pagină.
5. Umbre pe carduri, colțuri foarte rotunjite, `hover:scale` — **nu**. Fotografiile sunt pătrate cu colț de 4 px (`--radius`) și bordură de 1 px, ca restul imaginilor din site; fără umbre; singura tranziție e pe culoarea linkului, 150 ms, oprită la `prefers-reduced-motion`.
6. Animații la scroll, contoare, carusele — **nu**. Zero JavaScript propriu pe pagină.
7. Paletă Tailwind, Inter, `max-w-7xl` — **nu**. Tokenii proiectului, Public Sans, containerul de 1120 px.
8. „De ce noi”, testimoniale fără nume, cifre inventate — **nu**. Toate afirmațiile sunt ale oamenilor cu numele pe ele.
9. Title Case, emoji, „Află mai multe →” — **nu**. Sentence case; eticheta de link e „LinkedIn”, fără săgeată.
10. Toate secțiunile cu același ritm — **nu**. Hero tipografic, un paragraf de intro fără titlu, patru rânduri cu fotografie, o secțiune de text cu cap de secțiune, banda de CTA. Cinci forme, cinci înălțimi.
11. Footer cu patru coloane egale și newsletter — **nu**. Footer-ul global, cu un link în plus în coloana 3.
12. Padding-uri diferite de la o secțiune la alta — **nu**. Toate pe `--section-y`, toate distanțele din scara `--s-*`.
13. Dark mode prin inversare — **nu**. Paleta dark din `tokens.css`; verificat în capturi la toate cele patru lățimi.
14. Imagini de stoc sau generate — **nu**. Pagina nu are nicio imagine; substituenții sunt text.
15. `<div>` peste `<div>` fără semantică — **nu**. `<section aria-labelledby>` la ambele secțiuni, `<article>` pentru fiecare persoană, `<h3>` pe nume, `<a>` real pe linkuri.
16. Estetică de brand personal — **nu**. Pagina e despre patru oameni, nu despre fondator; Marius e primul rând, tratat identic cu ceilalți trei.

### Două fișiere din `spec/` rămase în urmă, în afara listei autorizate

Lista autorizată pentru operațiunea asta era: `continut/16-echipa.md`, `continut-en/16-team.md`, cele două `00-global.md`, `01-acasa.md` / `01-home.md` și `PLACEHOLDERS.md` § Rămase. Două locuri din `spec/` sunt acum în urma site-ului și **nu** le-am atins:

1. **`spec/ARHITECTURA.md` § Rute, rândul `/echipa`** spune „profilurile individuale; pagina vine imediat după rescrierea lui `/despre`”. Pagina există de azi; nota descrie un viitor care s-a întâmplat. Tot acolo, § SEO/JSON-LD nu pomenește `ProfilePage`, iar lista paginilor cu `noindex` conține doar `/multumesc`, nu și `/echipa` și `/en/team`.
2. **`spec/DESIGN.md`** nu are rândul de persoană (fotografie pătrată 240 px în stânga, text în dreapta, linie de păr între rânduri, substituent cu inițiale). E un tipar nou de componentă, folosit deocamdată pe o singură pagină.

Le corectez când îmi spui. Până atunci, sursa pentru amândouă e `continut/16-echipa.md` § Indexare și fișierul `src/components/pages/TeamPage.astro`.

### Placeholder-e rămase pe pagina asta

`[[ACORD_ECHIPA]]` (blochează indexarea), `[[RELATIE_ECHIPA]]` (vizibil în intro), `[[LINKEDIN_CRISTIAN]]` (vizibil în rândul lui Cristian), `[[FOTO_MARIUS]]`, `[[FOTO_PETRE]]`, `[[FOTO_SAMUEL]]`, `[[FOTO_CRISTIAN]]`. Cele patru de fotografie **nu** se randează ca text `[[…]]`, ci ca substituenți cu inițiale — excepție cerută de Marius de la regula 3 din `CLAUDE.md`, ca să nu arate ca patru casete rupte. Sunt listate în `spec/PLACEHOLDERS.md` § Rămase.

## `/echipa`: fotografii, marca LinkedIn, meniu, spec adus la zi (19 septembrie 2026, după-amiaza)

Marius a trimis `LinkedIn_Logo.svg` și trei fotografii, și a cerut corectarea celor două fișiere din `spec/` rămase în urmă plus `/echipa` în meniul principal. Trei întrebări puse înainte de a atinge componenta, cu răspunsurile lui:

| Întrebare | Răspuns |
|---|---|
| Trei poze din patru; regula 5 spune „toate sau niciuna” | **Cele trei intră acum**; Cristian rămâne pe inițiale până trimite poza |
| Marca LinkedIn: monocrom (cum ceruse) sau albastrul oficial | **Albastrul oficial, neschimbat**; hover prin opacitate |
| Unde intră „Echipa” în meniu | **După „Despre”** |

### Fotografii

Sursele au rămas în rădăcină, unde le-a pus el. În repo au intrat decupajele pătrate, în `src/assets/foto-echipa/`:

| Sursă | Decupaj | Observație |
|---|---|---|
| `Marius 2.png` 1122×1402 | `marius-galmati-960x960.jpg`, 131 KB | decupat din partea de sus, centrat pe orizontală |
| `SAm_Bota.jpeg` 2991×3807 | `samuel-bota-960x960.jpg`, 94 KB | la fel |
| `Petre_Radu.jpeg` 400×400 | `petre-radu-catalin-400x400.jpg`, 27 KB | **sub minimul de 480×480** din `PLACEHOLDERS.md`; la 2× pe ecran retina se face un upscale de la 400 la 480 |

Toate trei, verificate vizual după decupaj: cap și umeri, fără tăieturi. Randate la 240 px (480 px la 2×), `object-fit: cover`, aceeași casetă pătrată cu bordură ca substituentul. Cristian vede în continuare pătratul cu „CB”, identic ca formă, mărime și poziție.

**De cerut:** o variantă mai mare a pozei lui Petre (minimum 480×480) și poza lui Cristian.

### Marca LinkedIn

Marca „in” e decupată din `LinkedIn_Logo.svg` trimis de Marius și salvată în `public/icons/linkedin.svg`. Fișierul original conține logo-ul complet (cuvântul „Linked” plus marca); am păstrat doar grupul mărcii, cu **traseele copiate octet cu octet** — singura operație e `viewBox="63 0 21 21"`, adică fereastra restrânsă la caseta mărcii, fără să translatez sau să rescalez datele. Verificat programatic: ambele trasee din fișierul nou se regăsesc identic în original.

Structura mărcii: un pătrat alb dedesubt și același pătrat în `#2867B3` deasupra, cu „in” decupat prin `fill-rule: evenodd`. Rezultatul e un pătrat albastru cu „in” alb, care se citește pe orice fundal, inclusiv în dark.

Randare: 20 × 20 px, într-un link de 44 × 44 px (măsurat), fără cuvinte lângă ea, cu `margin-left: -12px` ca marginea stângă a mărcii să cadă exact pe marginea coloanei de text. Hover: `opacity: .75`. Focus: outline 2 px teal, ca peste tot. Linkul are `aria-label` cu numele persoanei pe ambele limbi, `rel="noopener"` și tab nou; `<img>` are `alt=""` și `aria-hidden="true"`.

Contrast: „in” alb pe albastrul oficial, 5,70:1. Pătratul albastru față de `--surface` în light, 5,70:1; în dark, 2,83:1, sub pragul de 3:1 pentru elemente non-text — dar e un **logotip**, exceptat explicit de WCAG 1.4.11, iar glifa dinăuntru are contrast propriu. Intrarea e marcată ca atare în `qa/contrast.py`, ca să nu pară o scăpare. Dacă la un moment dat vrei contrast deplin și în dark, varianta curată e plăcuța albă în jurul mărcii (cum recomandă chiar LinkedIn pentru fundaluri închise), nu recolorarea.

### Meniul principal: al șaselea link nu încăpea

Adăugarea lui „Echipa” a rupt header-ul. Măsurat înainte de reparație:

| Lățime | `scrollWidth` | `clientWidth` | Conținut header | Container |
|---|---|---|---|---|
| 1024 | 1035 | 1024 | — | depășire |
| 1200 | 1209 | 1200 | 1169 | 1120 |
| 1440 | 1440 | 1440 | 1169 | 1120 |

Deci bară orizontală de derulare la 1024 și la 1200 px, iar de la 1200 px în sus conținutul header-ului ieșea din containerul de 1120 px și nu se mai alinia cu restul paginii.

Reparat de la 1024 px: padding-ul orizontal al linkurilor scade de la 12 la 8 px (`--s-3` → `--s-2`) și distanța dintre uneltele din dreapta de la 12 la 8 px. Economie măsurată: 60 px. După reparație, `scrollWidth == clientWidth` și `innerScroll == inner` la 1024, 1100, 1199, 1200, 1280 și 1440 px. Zona de click a unui link rămâne 81 × 33 px.

Verificat că n-am rupt altceva: **zero depășiri orizontale** pe 11 pagini × 5 lățimi (375, 768, 1024, 1200, 1440).

Al șaptelea link nu mai încape. Dacă apare unul, fie telefonul iese din header, fie linkul intră în panoul „Servicii”. Notat și în `DESIGN.md` § Componente.

### `spec/` adus la zi

- **`ARHITECTURA.md`** § Rute: rândul `/echipa` nu mai spune „pagina vine imediat după rescrierea lui /despre”, ci menționează `noindex` și excluderea din sitemap. § SEO: lista paginilor cu `noindex` include acum `/echipa` și `/en/team`, `hreflang` se emite și pe paginile cu `noindex`, iar `ProfilePage` are punctul lui, cu regula despre `worksFor` și despre `description`. Rândul despre sitemap menționează filtrul din `astro.config.mjs`.
- **`DESIGN.md`** § Componente: trei intrări noi — **Rând de persoană**, **Substituent de fotografie**, **Marca LinkedIn** — plus nota despre al șaselea link din header. § Imagini: portretul lui Marius apare acum în **patru** locuri, iar `/despre` e scos explicit din listă (pagina n-are nicio imagine din 18 septembrie); adăugată regula portretelor de echipă.
- **`00-global.md`** (ambele limbi) § Meniu: „Echipa” / „Team” după „Despre”.
- **`16-echipa.md`** / **`16-team.md`**: rândurile `Fotografie:` trimit acum la fișierele reale; nota despre marca „in” sub § Oamenii.
- **`PLACEHOLDERS.md`** § Rămase: cele trei placeholder-e de fotografie sosite au ieșit; a rămas `[[FOTO_CRISTIAN]]`.

### Verificări

- `npm run build`: 0 erori, 0 avertismente, 43 de pagini. `npx astro check`: 0/0/0.
- `qa/pagecheck.mjs`: 41 de pagini, 0 cu probleme. `/echipa` și `/en/team`: 1 `h1`, 0 salturi, 2 apariții de orange, **6 imagini, toate cu `width` și `height`**, placeholder-e `RELATIE_ECHIPA` și `LINKEDIN_CRISTIAN`.
- `qa/headings.mjs`: 1 `h1`, 8 titluri, pe ambele limbi.
- `qa/textdiff.mjs`: 27/27 pe `/echipa` și pe `/en/team`; homepage-ul rămâne 70/70 pe ambele limbi după adăugarea linkului.
- `qa/keyboard.mjs`: trece pe ambele pagini, 37 de elemente atinse cu Tab (36 + linkul nou din meniu), focus vizibil pe toate.
- Cele trei mărci de LinkedIn: link de 44 × 44 px, imagine de 20 × 20 px, `alt=""`, `aria-hidden="true"`, `rel="noopener"`, `target="_blank"`, `aria-label` corect pe ambele limbi, outline 2 px teal la focus.
- `qa/contrast.py`: 42 din 44 de perechi trec; cele două „NU” sunt intrări documentate (orange-ul care nu se folosește la focus, și logotipul LinkedIn în dark, exceptat de WCAG).
- 16 capturi noi în `qa/echipa/` și 16 în `qa/meniu/` (homepage și /despre, pentru header), deschise și verificate. Consolă curată, **zero cereri externe**; `/icons/linkedin.svg` se servește local, 200, `image/svg+xml`, 1293 de octeți.

### Mirosuri: ce s-a schimbat față de dimineață

Punctele 4 și 14 se reverifică, fiindcă pagina are acum imagini:

4. Iconițe generice, avatar generic — **nu**. Singura iconiță e marca oficială LinkedIn, în culoarea ei; substituentul lui Cristian e un pătrat cu inițiale, nu o siluetă.
14. Imagini de stoc sau generate — **nu**. Trei portrete reale, trimise de oamenii din poze, cu aceeași încadrare cap-și-umeri. Zero stoc, zero generat.
5. Colțuri rotunjite, umbre — **nu**. Fotografiile sunt pătrate, colț de 4 px, bordură de 1 px, fără umbră. Nu sunt rotunde nicăieri.
Restul listei, neschimbat față de secțiunea de dimineață.

### Rămâne deschis

- `[[ACORD_ECHIPA]]`: pagina stă pe `noindex` și în afara sitemap-ului până îl completezi. Pozele au intrat deja în repo, înaintea acordului scris — decizia ta, prin faptul că mi le-ai trimis; `PLACEHOLDERS.md` spunea „se pun în repo doar după `[[ACORD_ECHIPA]]`”.
- `[[RELATIE_ECHIPA]]` și `[[LINKEDIN_CRISTIAN]]`, vizibile în pagină.
- `[[FOTO_CRISTIAN]]`, plus o variantă mai mare a pozei lui Petre.
- Fișierele originale (`LinkedIn_Logo.svg`, `Marius 2.png`, `Petre_Radu.jpeg`, `SAm_Bota.jpeg`) au rămas în rădăcina proiectului, unde le-ai pus. Nu le-am mutat și nu le-am comis. Spune dacă vrei să intre în `spec/assets/` ca surse, sau să le ștergem.

## Graficul din hero devine interactiv (20 septembrie 2026)

Cerut de Marius: „poți să îl faci interactiv, un fel de animație, dar cu toate astea, cel mai important să rămână la un nivel enterprise, profesional”.

### Ce am făcut și ce am refuzat

Am ales două lucruri și am lăsat afară restul:

| Făcut | Nu am făcut, și de ce |
|---|---|
| **O singură secvență la încărcare**, ~1,9 s, care desenează figura în ordinea în care se citește | Fade-in la scroll pe secțiuni — e mirosul 6 din `CLAUDE.md`, litera lui |
| **Evidențiere la pointer**: cursorul pe o bandă, celelalte patru se retrag | Mișcare perpetuă pe trasee (linii punctate care curg) — e marchiză; într-un hero de firmă de IT, ceva ce se mișcă la nesfârșit citește ca banner, nu ca document |
| | Paralax, urmărirea cursorului, particule — `DESIGN.md` § Ce nu facem |
| | Contoare animate, numere care cresc — mirosul 8 |

Argumentul pentru care astea două sunt „enterprise”: secvența are **un început și un sfârșit**. După 1,9 s desenul e o figură statică, ca într-un raport tipărit, și rămâne așa. Verificat cu `document.getAnimations()`: zero animații în curs la 2,5 s. Hover-ul nu adaugă decor, ci scoate zgomot — cele paisprezece trasee se suprapun, iar estomparea celorlalte benzi e singurul mod de a urmări unul singur de la fragment până la vârful săgeții.

### Cum e făcută

Totul din CSS, în componentă. **Zero JavaScript**, zero bibliotecă (`framer-motion`, `GSAP`, `AOS` rămân neinstalate), zero cereri de rețea. Graficul apare oricum doar de la 1200 px, deci pe telefon nu se execută nimic.

Markup-ul e regrupat: fiecare bandă e acum un `<g class="herodiag__banda" style="--i: N">` care ține fragmentele ei, eticheta, nodul de pe spină, traseele care pleacă din nod și săgețile de la capete. Indicele `--i` dă întârzierile, iar gruparea face posibilă evidențierea benzii ca un tot.

Secvența, cu timpii exacți:

| Element | Pornire | Durată |
|---|---|---|
| Eticheta din colțul stâng | 0 | 400 ms |
| Fragmentele, bandă cu bandă | 120 ms + 90 ms × bandă | 420 ms |
| Etichetele benzilor | 260 ms + 90 ms × bandă | 380 ms |
| Logo-ul | 380 ms | 420 ms |
| Spina, care coboară | 420 ms | 560 ms |
| Nodurile, de sus în jos | 620 ms + 80 ms × bandă | 260 ms |
| Traseele, spre dreapta | 820 ms + 110 ms × bandă | 620 ms |
| Săgețile | 1180 ms + 110 ms × bandă | 320 ms |
| Eticheta din colțul drept | 1500 ms | 420 ms |

Traseele, săgețile și spina au `pathLength="1"`, ca toate să se deseneze în același interval indiferent de lungimea reală; fără asta, traseul scurt al primei benzi s-ar termina cu mult înaintea celui lung din banda de jos.

Starea finală stă în regula de bază (`opacity` implicit 1, `stroke-dashoffset: 0`), iar animația pornește din `from`. Consecința e că, dacă animația e scoasă, rămâne exact desenul terminat — nu o pagină goală.

### Trei capcane, toate din familia specificității

1. **`:has()` ia specificitatea argumentului.** `.herodiag:has(.herodiag__banda:hover) .herodiag__banda` cântărește (0,4,0), iar `.herodiag .herodiag__banda:hover` doar (0,3,0) — deci banda de sub cursor se estompa și ea. Măsurat: toate cinci benzile la 0,22. Reparat ridicând regula de evidențiere la (0,5,0). E aceeași capcană ca la `.partners__item + .partners__item` de pe homepage.
2. **`prefers-reduced-motion` nu se aplica.** Blocul scria `.herodiag__frag { animation: none }`, (0,1,0), dar regula de secvență e `.herodiag__banda .herodiag__frag`, (0,2,0). Măsurat cu `reducedMotion: 'reduce'` la 120 ms: 115 animații în curs, fragmentele la opacitate 0. Reparat cu `animation: none !important; transition: none !important` pe `.herodiag, .herodiag *` — e comutator de oprire, nu regulă de stil. După reparație, la 120 ms: **0 animații**, tot desenul la starea finală.
3. **`fill: none` nu primește pointerul.** Zonele de hover sunt `fill: transparent`.

### Capturile se luau la mijlocul secvenței

`qa/capture.mjs` făcea captura după `networkidle` plus derularea pentru imaginile lazy — undeva pe la 1–2,5 s, adică fix în timpul secvenței. Două rulări succesive dădeau imagini diferite. Am adăugat `animations: 'disabled'` la `page.screenshot()`: Playwright derulează animațiile finite până la capăt înainte de captură. Acum capturile sunt din nou deterministe, pe toate paginile.

### Desenul e neschimbat

Regruparea markup-ului nu trebuia să miște niciun pixel. Verificat în două feluri:

- **Geometria**: am recalculat cele 85 de fragmente cu același generator determinist, într-un script separat, și le-am comparat cu cele din `dist/index.html`. **85 din 85 identice**, inclusiv culoarea fiecăruia. Cutia desenului e aceeași: `(30, 37, 505, 488)` înainte, `(29, 37, 505, 488)` după (o coloană de antialiasing).
- **Vizual**: capturile de dinainte și de după, decupate pe aceeași zonă, arată identic. Rămâne o diferență de rasterizare de ~5% din pixeli, toată pe marginile antialiasate — SVG-ul e promovat pe un strat propriu de compoziție fiindcă are descendenți cu animație. Decalaj: zero (testat pe ±2 px în ambele axe). Nu e o schimbare de desen.

### Accesibilitate

- `prefers-reduced-motion: reduce` oprește și secvența, și tranzițiile. Desenul apare terminat.
- Evidențierea la pointer **nu arată nicio informație nouă**: `aria-label` enumeră deja cele cinci direcții, iar SVG-ul e `role="img"`, deci tot subarborele e prezentațional. Prin urmare e o stare vizuală, nu un control: nu are echivalent la tastatură și nu adaugă opriri de Tab în hero, înaintea celor două butoane.
- Etichetele estompate ajung la **1,59:1 în light** și **1,89:1 în dark**. Sub AA, dar e text dintr-o imagine, exceptat de WCAG 1.4.3, iar starea e trecătoare și doar la pointer. Nu există un nivel de estompare care să treacă AA și să mai și funcționeze: nici la 40% nu se ajunge la 4,5:1 (2,47:1 în light). Dacă preferi, alternativa e să nu se estompeze nimic și să se îngroașe doar banda atinsă — dar într-un evantai de paisprezece trasee suprapuse nu se mai distinge nimic.
- LCP: elementul LCP rămâne `h1.hero__h1`, la 280 ms pe 1440 px și 204 ms pe 375 px. Graficul nu devine candidat, deci animația lui de opacitate nu întârzie nimic.

### Verificări

- `npm run build`: 0 erori, 0 avertismente, 43 de pagini. `npx astro check`: 0/0/0.
- `qa/pagecheck.mjs`: 41 de pagini, 0 cu probleme. `qa/headings.mjs`: 1 `h1` și 26 de titluri pe ambele limbi.
- `qa/textdiff.mjs`: zero diferențe pe `01-acasa.md` și `01-home.md`.
- `qa/keyboard.mjs`: trece; numărul de opriri de Tab e neschimbat.
- `qa/contrast.py`: 42/44, aceleași două intrări documentate ca înainte. Niciun token de culoare nou.
- 16 capturi în `qa/hero/` (RO și EN × 375, 768, 1024, 1440 × light, dark), plus cadrele secvenței și stările de hover în `qa/hero-anim/`, inclusiv `secventa-hero.gif`. Consolă curată, zero cereri externe.
- Verificat că nu s-a adăugat JavaScript: pagina are aceleași trei `<script>` ca înainte (tema inline, bannerul de consimțământ, meniul) plus JSON-LD.

### Mirosuri, punctele atinse de schimbarea asta

6. Fade-in la scroll, contoare animate, carusele, marquee — **nu**. Un singur moment, la încărcare, nedeclanșat de scroll, fără buclă; după 1,9 s nu se mai mișcă nimic pe pagină.
5. `hover:scale`, `hover:-translate-y` — **nu**. La hover se schimbă opacitatea celorlalte benzi și grosimea a trei trasee. Nimic nu se mărește și nimic nu se mută.
2. Glow, particule, aurora — **nu**. Aceleași culori din `tokens.css`, aceleași forme.
Restul listei, neatins de schimbarea asta.

### Întrebare

Etichetele benzilor („Securitate cibernetică”, „Automatizări”, …) ar putea deveni linkuri către paginile de servicii. Atunci evidențierea ar avea și rost funcțional, ar fi accesibilă la tastatură, și s-ar rezolva și nota din `01-acasa.md` despre reconcilierea etichetelor cu cele trei grupuri de servicii. Costul: cinci opriri de Tab în hero, înaintea butoanelor. Nu am făcut-o; spune dacă o vrei.

## Benzile din grafic devin linkuri (20 septembrie 2026, după-amiaza)

Cerut de Marius: „fiecare zonă din aceasta care se activează la hover să fie clickable și să ducă spre pagina în care e prezentat serviciul respectiv”. E fix propunerea din nota de dimineață, deci am făcut-o.

### Destinații

| Bandă | RO | EN |
|---|---|---|
| Securitate cibernetică | `/servicii/securitate` | `/en/services/security` |
| Automatizări | `/servicii/automatizari` | `/en/services/automation` |
| Agentic AI | `/servicii/automatizari` | `/en/services/automation` |
| Software development | `/servicii/automatizari#software` | `/en/services/automation#software` |
| Infrastructură IT | `/servicii/suport-it` | `/en/services/it-support` |

Toate cele trei pagini răspund cu 200, iar ancora `#software` există în ambele limbi (verificat pe `dist/`).

**Cinci etichete, trei pagini.** „Automatizări” și „Agentic AI” ajung amândouă pe aceeași pagină: asistenții AI sunt unul dintre cele trei carduri din § Ce construim de pe `/servicii/automatizari`, dar cardul n-are ancoră proprie. E exact nepotrivirea notată demult în `01-acasa.md` („etichetele din grafic nu se suprapun peste cele trei grupuri de servicii — de reconciliat”), care acum se vede. **Întrebare:** vrei o ancoră pe cardul „Asistenți AI cu scop clar”? Ar însemna un id pe cardul respectiv (componenta `Card` nu primește azi `id`), o intrare în `anchors` și un rând în `ARHITECTURA.md`. Sau schimbăm etichetele graficului.

Rutele stau în `HeroDiagram.astro`, nu în dicționarul de microcopy: sunt structură, nu text, iar `textdiff` verifică mai departe doar etichetele.

### Ce s-a schimbat la accesibilitate

De când benzile sunt linkuri, SVG-ul nu mai poate fi `role="img"` — ar face tot subarborele prezentațional și ar ascunde linkurile. E acum `role="group"`, cu `aria-label` = propoziția de descriere, iar numele fiecărui link vine din `<text>`-ul benzii. Arborele de accesibilitate, citit cu `ariaSnapshot()`:

```
- group "De la fragmentare la progres: cinci direcții împrăștiate se adună într-un singur traseu."
  - text: De la fragmentare
  - link "Securitate cibernetică"  → /servicii/securitate
  - link "Automatizări"            → /servicii/automatizari
  - link "Agentic AI"              → /servicii/automatizari
  - link "Software development"    → /servicii/automatizari#software
  - link "Infrastructură IT"       → /servicii/suport-it
  - text: La progres
```

Eticheta grupului nu mai repetă cele cinci nume (le spun linkurile), deci a rămas exact propoziția scrisă în `01-acasa.md` § 1. Logo-ul dinăuntru a primit `aria-hidden`, altfel apărea ca imagine fără nume.

Cele cinci opriri de Tab vin **după** cele două butoane din hero, fiindcă graficul e după text în DOM. Verificat pe ambele limbi. Sub 1200 px graficul e `display: none`, deci pe telefon nu există nici linkuri, nici opriri în plus.

Focusul de tastatură primește aceeași evidențiere ca hover-ul, plus un chenar teal de 2 px în jurul fâșiei.

### Trei lucruri care nu au mers din prima

1. **`:has()` nu se reinvalidează la `:focus-visible`, în Chromium.** Scrisesem `.herodiag:has(.herodiag__banda:is(:hover, :focus-visible))`. Măsurat cu focus pe o bandă: `element.matches()` pe exact acel selector întoarce `true`, dar opacitățile rămân toate 1 — stilul nu se recalculează. Cu `:hover` mergea. Reparat trecând partea de tastatură pe `:focus-within`, care e pseudo-clasă de sine stătătoare și se invalidează corect. Regulile de hover rămân pe `:has()` și stau după cele de focus, ca mouse-ul să decidă când sunt amândouă active.

2. **Astro compilează `> *` în `> [data-astro-cid-…]`.** Scrisesem `.herodiag__banda > * { pointer-events: none }` și `.herodiag__zona { pointer-events: auto }`, crezând că a doua câștigă la egalitate. În CSS-ul construit ies `.herodiag__banda[cid]>[cid]`, adică (0,3,0), față de `.herodiag__zona[cid]`, (0,2,0). Zona rămânea fără pointer: hover-ul nu mai prindea nimic și clicul nu făcea nimic. Reparat enumerând pe nume părțile de desen. **E a treia formă a aceleiași capcane într-o zi** (după `:has()` și blocul `prefers-reduced-motion`), toate rezolvate prin a scrie specificitatea explicit. A intrat în skill-ul `design-loop`.

3. **Fâșia de atingere cuprindea eticheta benzii de dedesubt.** Zona era `y = ny - PAS/2`, adică `ny - 54`, dar eticheta stă la `ny - 56` cu glifele urcând încă 28 de unități: fiecare fâșie conținea cuvintele benzii următoare. S-a văzut abia pe captura cu chenarul de focus — pe ecran, „Automatizări” cădea în afara chenarului ei, iar „Agentic AI” înăuntru. Reparat: fâșia începe la `ETICHETA_Y[i] - CORP_ETICHETA` (`ny - 84`) și are un pas înălțime, deci se termină exact unde începe următoarea. Verificat: toate cele cinci etichete cad în fâșia lor, iar spațiile dintre fâșii sunt 0 px.

### `qa/keyboard.mjs` verifică acum focusul mai bine

Scriptul se uita doar la `outline` pe elementul cu focus, deci raporta cele cinci benzi ca „fără focus vizibil” — chenarul lor e desenat pe fâșie, nu ca outline, pentru că outline-ul implicit ar fi încadrat și evantaiul din dreapta (cutia unei benzi ajunge aproape cât toată figura).

Acum, pentru fiecare element fără outline propriu, scriptul compară amprenta stilurilor din subarbore cu focus și fără (`outline*`, `stroke*`, `background`, `border*`, `box-shadow`, `color`, `opacity`, `text-decoration`, `filter`). Dacă nimic nu se schimbă, chiar nu există indicator. E o verificare mai bună decât cea veche, nu o excepție pentru pagina asta. Output-ul spune explicit care elemente au focus desenat altfel decât prin outline.

### Verificări

- `npm run build`: 0 erori, 0 avertismente, 43 de pagini. `npx astro check`: 0/0/0.
- `qa/pagecheck.mjs`: 41 de pagini, 0 cu probleme; homepage-ul rămâne la 3 apariții de orange și 2 imagini.
- `qa/headings.mjs`: 1 `h1`, 26 de titluri, ambele limbi.
- `qa/textdiff.mjs`: zero diferențe pe `01-acasa.md` și `01-home.md`.
- `qa/keyboard.mjs`: trece pe homepage (57 de opriri, cu cele cinci noi), pe `/en`, `/despre`, `/echipa` și `/contact`.
- `qa/contrast.py`: 42/44, neschimbat.
- Hover pe fiecare din cele cinci fâșii: banda atinsă rămâne la 1, celelalte trec la 0,22, traseele ei la 2,6 px. Cursorul în evantai: desenul rămâne întreg (1 1 1 1 1). Click pe prima bandă: ajunge pe `/servicii/securitate`.
- Focus de tastatură: `0.22 1 0.22 0.22 0.22`, chenar teal 2 px, în ambele teme; după `blur`, tot desenul revine la 1.
- `prefers-reduced-motion: reduce`: 0 animații la 120 ms, desenul complet.
- 16 capturi în `qa/hero/`, plus stările de hover și de focus în `qa/hero-anim/`. Consolă curată, zero cereri externe, zero JavaScript adăugat.

### Mirosuri

Neschimbate față de dimineață. Punctul 9 („Află mai multe →”) merită spus explicit: benzile n-au primit nici săgeți, nici cuvinte de tip „vezi mai mult” — eticheta serviciului e tot textul linkului.

## Roboții, blocați pe serverul local (24 septembrie 2026)

Cerut de Marius: vrea să expună public serverul local, printr-un tunel, ca să arate site-ul cuiva, fără ca adresa aceea să ajungă în vreun index. Doar local; producția rămâne neatinsă.

### Ce am făcut

O singură linie în `astro.config.mjs`:

```js
server: { headers: { 'X-Robots-Tag': ROBOTI_BLOCATI } },
```

unde `ROBOTI_BLOCATI` e `noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate`.

`server` din configul Astro descrie **exclusiv** serverul local de dezvoltare și de previzualizare. Nu scrie nimic în `dist/`. Verificat că antetul ajunge și pe `astro dev`, și pe `astro preview` — al doilea îl ia din `settings.config.server.headers`, în `static-preview-server.js`.

### De ce un antet și nu `Disallow: /` în `robots.txt`

Prima variantă pe care am scris-o avea și un `robots.txt` cu `Disallow: /`, servit din memorie de un plugin Vite. Am scos-o, pentru că e greșită pentru scopul ăsta:

- `Disallow` oprește **citirea** paginii. `noindex` oprește **indexarea** ei.
- Un robot care n-are voie să citească pagina nu apucă să vadă `noindex`. Dacă adresa e legată de undeva, poate ajunge totuși în rezultate, ca link gol. E chiar avertismentul din documentația Google: pentru ca `noindex` să funcționeze, pagina **nu** trebuie blocată din `robots.txt`.
- Deci cele două lucrează una împotriva celeilalte. Aici, lipsa lui `robots.txt` (404 = „citește ce vrei”) e exact ce trebuie ca `noindex` să fie văzut și respectat.

Asta a rezolvat și o problemă tehnică: serverul de previzualizare al lui Astro **aruncă plugin-urile Vite ale utilizatorului** (se vede în sursă: `const { plugins: _plugins, ...user`), deci `robots.txt` apărea pe `dev` și lipsea pe `preview`. Cu antetul, comportamentul e identic pe amândouă.

Am lovit iar capcana pe care mi-am notat-o singur în `design-loop`: heredoc-ul din unealta Bash mănâncă backslash-urile, așa că `'\n'` a ajuns newline real în mijlocul unui string JS și a rupt configul. De două ori într-o sesiune. Pentru fișiere cu backslash-uri folosesc Write, nu heredoc.

### Dovezi

**Antetul, pe fiecare pagină construită:** 43 din 43, verificat cu un script care parcurge `dist/`, cere fiecare cale de la serverul de previzualizare și citește antetul. Zero pagini fără.

**Se aplică și la ce nu e HTML** (acolo unde un `<meta>` n-ar avea efect):

| Cale | X-Robots-Tag |
|---|---|
| `/` | noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate |
| `/en` | idem |
| `/echipa` | idem |
| `/servicii/securitate` | idem |
| `/favicon.svg` | idem |
| `/sitemap-0.xml` | idem |
| `/sitemap-index.xml` | idem |

**Ce vede un robot,** cerut cu user-agent de Googlebot:

```
HTTP/1.1 200 OK
Content-Type: text/html
X-Robots-Tag: noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate
```

**Producția e neatinsă, bit cu bit.** Am construit de două ori, o dată cu `astro.config.mjs` pus deoparte (`git stash`) și o dată cu schimbarea, și am comparat `sha1sum` pentru toate fișierele din `dist/`: **112 fișiere, zero diferențe**. În plus, în `dist/` nu există `robots.txt`, nu apare `X-Robots-Tag` nicăieri, iar paginile cu `<meta name="robots">` sunt exact aceleași nouă ca înainte (404, /echipa, /en/team, /multumesc, /en/thank-you, cele două de QA și cele două cazuri draft).

**Restul QA:** build 0/0 (43 de pagini), `astro check` 0/0/0, `pagecheck` 41 de pagini 0 probleme, `headings` 26 de titluri, `textdiff` zero diferențe pe ambele limbi, `keyboard` trece, capturi cu consolă curată și zero cereri externe.

### De știut

1. **Oprește indexarea, nu accesul.** Cine are adresa tunelului vede site-ul. Dacă vrea și acces restrâns, tunelul trebuie pus în spatele unei parole: Cloudflare Access, `cloudflared` cu Access în față, sau ngrok cu `--basic-auth`. Îi spun, nu presupun.
2. **Capcană de QA:** de acum, serverul local răspunde cu `noindex` pe **toate** paginile. Dacă cineva verifică vreodată „are producția `noindex` unde trebuie?” cerând pagini de la `localhost`, primește un rezultat fals. Verificarea aceea se face pe fișierele din `dist/` (cum face `pagecheck.mjs`) sau pe site-ul publicat, niciodată pe antetul serverului local.
3. **Nu e nevoie de niciun pas în plus** când expune tunelul: antetul e pornit din configurație, nu dintr-o variabilă de mediu pe care ar putea s-o uite.
4. `ARHITECTURA.md` § Headere rămâne neschimbat: acolo sunt headerele de producție, servite de Cloudflare Pages, iar `/echipa` e oricum deja `noindex` acolo prin `<meta>`.

## Propuneri (nu se fac fără acord)

- Faza 5: Astro are suport experimental pentru CSP cu hash-uri generate la build (`experimental.csp`), care ar scoate `'unsafe-inline'` din `script-src` și `style-src`. E îmbunătățirea menționată în `ARHITECTURA.md` § Headere ca „nu o condiție de lansare”. De evaluat când ajungem acolo.

## Placeholder-e rămase

Lista din `spec/PLACEHOLDERS.md` § Rămase, neschimbată ca listă. Unde apar efectiv după Faza 3: `[[LOGO_PARTENERI]]` (footer, homepage § 9), `[[CAPTURA_RAPORT_LUNAR]]` (03, 07), `[[CAPTURA_RAPORT_RADIOGRAFIE]]` și `[[CAPACITATE_RADIOGRAFII]]` (06), `[[LOGO_PROQ_LOCAL]]` (05, /rezultate, /rezultate/proq), `[[LOGO_COSMIO_LOCAL]]` și `[[CITAT_COSMIN]]` (cazul Cosmio, doar pe staging), `[[ACORD_COSMIO]]` (frontmatter Cosmio, `consent`), `[[LOGO_BITUP_SVG]]` (logo PNG placeholder). Nefolosit: `[[FOTO_CONTEXT]]` (opțional).
