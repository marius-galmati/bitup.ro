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

Lista din `spec/PLACEHOLDERS.md` § Rămase, neschimbată ca listă. Unde apar efectiv în pagini după Faza 2b: `[[LOGO_PARTENERI]]` (footer, homepage § 9), `[[CAPTURA_RAPORT_LUNAR]]` (03, 07), `[[CAPTURA_RAPORT_RADIOGRAFIE]]` și `[[CAPACITATE_RADIOGRAFII]]` (06), `[[LOGO_PROQ_LOCAL]]` (05), `[[LOGO_BITUP_SVG]]` (logo PNG placeholder). Nefolosite încă: `[[ACORD_COSMIO]]`, `[[CITAT_COSMIN]]`, `[[LOGO_COSMIO_LOCAL]]` (Faza 3), `[[FOTO_CONTEXT]]` (opțional).
