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
- Verificat: build 0 erori, `check` 0/0/0, `pagecheck` 39 pagini 0 probleme; 32 de capturi (index, despre, suport, contact, 4 lățimi × 2 teme), privite pe light și dark: logo-ul corect în ambele teme, în header și footer; consolă curată, zero cereri externe; Lighthouse mobil `/` 100 / 100 / 100 / 1.5 (LCP s 0, 128KiB).

## Spike Astro (14 septembrie 2026, ramura `spike/astro-current`, ~60 de minute): GO

Decizia lui Marius: „Astro 5” din spec era versiunea curentă la scriere, nu o decizie de arhitectură; site-ul pornește pe ultima versiune majoră stabilă. Spec corectat: `ARHITECTURA.md` § Stack și `PLAN.md` Faza 0 nu mai conțin un număr fix.

- `npm create astro@latest` (14 septembrie 2026) dă **Astro 7.3.2**, Node ≥ 22.12, `tsconfig` extins din `astro/tsconfigs/strict`, `astro.config.mjs` gol. Fixat în `package.json`: `astro ^7.3.2` (instalat 7.3.2), `@astrojs/sitemap` 3.7.4, `@astrojs/rss` 4.0.19, `astro-og-canvas` 0.13.1 (peer `^5 || ^6 || ^7`), `astro-icon` 1.2.0.
- Schimbări necesare față de scheletul pe 5: (1) `z` se importă din `astro/zod` (Zod 4), nu din `astro:content` (deprecat, dispare în 8); forma `schema: ({ image }) => z.object(…)` există în continuare în 7.3 (`SchemaContext`), iar `createSchema()` e o opțiune de loader, nu ceva ce folosim; (2) `redirectToDefaultLocale` scos din `i18n.routing` (nu are sens cu `prefixDefaultLocale: false`); (3) `compressHTML: true` setat explicit (implicitul e acum `'jsx'`); (4) niciun flag experimental de scos: nu foloseam. `OGImageRoute` din astro-og-canvas e asincron (`await`), cum spune README-ul.
- Verificări: `npm run build` 0 erori (doar cele două avertismente cunoscute), `npm run check` 0 erori / 0 avertismente / 0 sugestii, capturile pe 7 sunt **identice pixel cu pixel** cu cele din Faza 0 (8/8, comparate cu PIL), cererile de rețea sunt aceleași 8 fișiere woff2 locale. Integrările testate real cu endpoint-uri temporare, șterse apoi: sitemap generat, `rss.xml` valid, imagine OG PNG 1200×630.
- De ținut minte: `@astrojs/rss` pune slash final la linkuri (`/faza-0/`); la Faza 3 se dă `trailingSlash: false` în opțiunile `rss()`. `astro-og-canvas` a descărcat fontul implicit (Noto Sans) de pe api.fontsource.org **la build**, nu la runtime; la Faza 5 primește fontul local (Bricolage TTF) și nu mai cere nimic din rețea. Astro 7 schimbă procesorul Markdown implicit: la Faza 3 randarea articolului și a studiilor de caz se compară vizual cu sursa (adăugat la acceptarea Fazei 3 în PLAN).

## Propuneri (nu se fac fără acord)

- Faza 5: Astro are suport experimental pentru CSP cu hash-uri generate la build (`experimental.csp`), care ar scoate `'unsafe-inline'` din `script-src` și `style-src`. E îmbunătățirea menționată în `ARHITECTURA.md` § Headere ca „nu o condiție de lansare”. De evaluat când ajungem acolo.

## Placeholder-e rămase

Lista din `spec/PLACEHOLDERS.md` § Rămase, neschimbată ca listă. Unde apar efectiv după Faza 3: `[[LOGO_PARTENERI]]` (footer, homepage § 9), `[[CAPTURA_RAPORT_LUNAR]]` (03, 07), `[[CAPTURA_RAPORT_RADIOGRAFIE]]` și `[[CAPACITATE_RADIOGRAFII]]` (06), `[[LOGO_PROQ_LOCAL]]` (05, /rezultate, /rezultate/proq), `[[LOGO_COSMIO_LOCAL]]` și `[[CITAT_COSMIN]]` (cazul Cosmio, doar pe staging), `[[ACORD_COSMIO]]` (frontmatter Cosmio, `consent`), `[[LOGO_BITUP_SVG]]` (logo PNG placeholder). Nefolosit: `[[FOTO_CONTEXT]]` (opțional).
