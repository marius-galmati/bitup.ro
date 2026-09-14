# PLAN.md — fazele de lucru

Fiecare fază se termină cu criteriile de acceptare bifate și cu un `git commit`. Claude Code nu trece la faza următoare fără confirmarea lui Marius.

Convenții: comenzile se rulează din rădăcina repo-ului; `npm run build` trebuie să treacă fără warning-uri la finalul fiecărei faze; orice text din `spec/continut/` (RO) și `spec/continut-en/` (EN) se copiază identic.

Ordinea limbilor: fiecare pagină se face întâi în română, apoi în engleză, în aceeași fază, înainte de commit. Nu se lasă engleza „pentru la sfârșit”: componentele trebuie verificate cu ambele lungimi de text.

---

## Faza 0 — Schelet și unelte

**Scop:** un proiect Astro care rulează, cu fonturile, tokenii (light + dark), i18n-ul configurat și structura de foldere din `ARHITECTURA.md`, fără pagini încă.

Sarcini:
1. `npm create astro@latest` (template minimal, TypeScript strict; ultima versiune majoră stabilă la data începerii proiectului, fixată exact în `package.json`, versiunea reală notată în `NOTES.md`), apoi integrările din `ARHITECTURA.md` § Stack: `@astrojs/sitemap`, `@astrojs/rss`, `astro-og-canvas`, `astro-icon` (doar `lucide`).
2. Fonturile self-hosted prin `@fontsource-variable/bricolage-grotesque`, `@fontsource-variable/source-sans-3`, `@fontsource/ibm-plex-mono` (doar 400 și 500).
3. Tokenii din `DESIGN.md` § Tokeni și § Dark mode, în `src/styles/tokens.css`, importate global; scriptul de temă din `<head>` (`ARHITECTURA.md` § Dark mode).
4. i18n: configurarea din `ARHITECTURA.md` § Limbi în `astro.config.mjs`; `src/i18n/ro.ts`, `en.ts` (microcopy din `00-global.md` și `continut-en/00-global.md`), `routes.ts` (harta din § Rute), `index.ts` (helpers).
5. Structura de foldere din `ARHITECTURA.md` § Structura proiectului, creată (goală unde e cazul), inclusiv `functions/api/`.
6. Colecțiile de conținut definite în `src/content.config.ts` cu schemele din `ARHITECTURA.md` § Colecții, cu subfolderele `ro/` și `en/`.
7. `src/lib/site.ts` cu valorile din `PLACEHOLDERS.md` § Completate.
8. `.gitignore` (inclusiv `.dev.vars`), `README.md` scurt cu comenzile, `.nvmrc`, `.env.example`, `.dev.vars.example`.

Acceptare:
- `npm run dev` pornește; `npm run build` produce `dist/` fără erori.
- O pagină de test temporară afișează cele trei fonturi corect (se verifică vizual) și cele patru culori de brand, în light și în dark (comutare cu `data-theme` din DevTools).
- Nicio cerere de rețea către fonts.googleapis.com sau alt CDN (verificat în tab-ul Network).

---

## Faza 1 — Layout, componente de bază, header bilingv, temă, 404

**Scop:** scheletul vizual comun tuturor paginilor, în ambele limbi și ambele teme.

Sarcini:
1. `BaseLayout.astro`: primește `lang` și cheia rutei; setează `<html lang>`, meta de bază, `<head>` cu title/description din props, canonical, `hreflang` (ro, en, x-default), Open Graph, JSON-LD Organization + ProfessionalService (din `ARHITECTURA.md` § SEO), scriptul de temă, skip-link, header, `<main>`, footer, `ConsentBanner` (doar vizual în faza asta).
2. `Header.astro` conform `DESIGN.md` § Header: logo (două variante), meniul, telefonul, `LangSwitch`, `ThemeToggle`, butonul „Radiografie IT gratuită” / „Free IT Health Check”. Meniu mobil accesibil (buton cu `aria-expanded`, închidere cu Esc, focus trap simplu).
3. `ThemeToggle.astro` funcțional (localStorage `bitup-theme`, fără flash la încărcare). `LangSwitch.astro` funcțional pe baza `routes.ts`.
4. `Footer.astro` cu conținutul din `continut/00-global.md` § Footer și `continut-en/00-global.md` § Footer, inclusiv linkul „Setări cookie-uri” / „Cookie settings” (funcțional în Faza 5).
5. Componente de bază: `Button`, `Section`, `Container`, `Eyebrow`, `Card`, `Steps`, `FactStrip`, `NumberTiles`, `Quote`, `CtaBand`, `Prose`, `Figure`, `LegalLayout`.
6. Pagina `404.astro`, bilingvă, cu textele din § 404 ale ambelor fișiere globale.
7. `prefers-reduced-motion` respectat global; focus vizibil pe orice element interactiv, în ambele teme.

Acceptare:
- Header și footer identice cu `DESIGN.md`, la 375, 768, 1024, 1440 px, în light și dark, RO și EN (capturi în `NOTES.md`; 16 combinații, pot fi într-un singur collage).
- Comutatorul de temă ține minte alegerea la reîncărcare și nu produce flash de fundal alb pe dark.
- Comutatorul de limbă de pe 404 duce la `/` respectiv `/en`.
- Meniul mobil funcționează cu tastatura; Lighthouse Accessibility ≥ 95 pe 404.
- 404 răspunde cu status 404 real (verificat cu `curl -I`), inclusiv pentru `/en/pagina-inexistenta`.

---

## Faza 2 — Paginile principale, RO și EN

**Scop:** toate paginile statice, cu textul exact din `continut/` și `continut-en/`.

Ordinea (o pagină în ambele limbi = un commit):
1. `/` + `/en` — `01-acasa.md` / `01-home.md`
2. `/servicii` + `/en/services` — `02-…`
3. `/servicii/suport-it` + `/en/services/it-support` — `03-…`
4. `/servicii/securitate` + `/en/services/security` — `04-…`
5. `/servicii/automatizari` + `/en/services/automation` — `05-…`
6. `/radiografie-it` + `/en/it-health-check` — `06-…` (formularul doar vizual în faza asta; funcțional în Faza 4)
7. `/cum-lucram` + `/en/how-we-work` — `07-…`
8. `/despre` + `/en/about` — `09-…`
9. `/suport` + `/en/support` — `10-…`
10. `/contact` + `/en/contact` — `11-…` (formularul doar vizual)
11. `/termeni`, `/confidentialitate`, `/cookies` + `/en/terms`, `/en/privacy`, `/en/cookies` — `13-…`, `14-…`, `15-…`, în `LegalLayout`, cu data ultimei actualizări din fișier.

Fiecare pagină: title și description din fișierul de conținut, un singur `<h1>`, ierarhie corectă de headinguri, ancorele `id` cerute în conținut (diferite pe limbă), JSON-LD specific paginii (Service, FAQPage) în limba paginii, `hreflang` către pereche.

Acceptare:
- Diff textual între fișierul de conținut și pagina randată, pentru fiecare limbă: zero diferențe de text (script care extrage textul din `dist/` și îl compară cu secțiunile din markdown; abaterile permise: doar formatarea).
- Toate placeholder-ele `[[…]]` rămase sunt vizibile în pagină și listate în `NOTES.md`.
- Verificare vizuală în dark pe fiecare pagină: nicio zonă cu text închis pe fundal închis, nicio imagine „arsă”.
- Lighthouse (mobil) pe fiecare pagină, ambele limbi: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100.

---

## Faza 3 — Colecții: studii de caz și blog, RO și EN

**Scop:** pagina Rezultate cu cele două cazuri, pagina Blog cu primul articol, șabloanele pentru intrări viitoare, în ambele limbi.

Sarcini:
1. Colecția `cases` populată din `continut/studii-de-caz/*.md` (în `cases/ro/`) și `continut-en/case-studies/*.md` (în `cases/en/`); paginile `/rezultate`, `/rezultate/[slug]`, `/en/results`, `/en/results/[slug]`.
2. Colecția `blog` populată din `continut/blog/*.md` și `continut-en/blog/*.md`; paginile `/blog`, `/blog/[slug]`, `/en/blog`, `/en/blog/[slug]`; RSS la `/rss.xml` și `/en/rss.xml`.
3. Șablonul de studiu de caz reproduce structura din `DESIGN.md` § Studiu de caz (hero cu logo, banda de fapte, secțiuni, cifre, CTA), în ambele teme.
4. Șablonul de articol: casetă de autor, timp de citit (calculat pe limba articolului), imagini cu legendă, CTA final.
5. Cazul Cosmio are `draft: true` în ambele limbi până la acordul semnat; build-ul nu îl publică în producție când e draft.
6. Comutatorul de limbă pe un articol fără pereche (`translationOf` lipsă) duce la indexul blogului din cealaltă limbă.

Acceptare:
- `/rezultate` și `/en/results` afișează ProQ; Cosmio apare doar când `draft: false`.
- `/blog` și `/en/blog` afișează articolul; ambele RSS-uri validează.
- Imaginile din articol sunt servite optimizat (AVIF/WebP, dimensiuni declarate, `loading="lazy"` sub fold).
- `npm run build` nu mai afișează avertismentele „No files found” pentru colecțiile `cases` și `blog` (excepția cunoscută din Fazele 0–2 dispare aici).
- Randarea Markdown a articolului și a studiilor de caz e comparată vizual cu textul sursă (procesorul Markdown implicit s-a schimbat în Astro 7): liste, titluri, citate, imagini cu legendă, linkuri.

---

## Faza 4 — Formulare: funcția `/api/lead`, Turnstile, Resend

**Scop:** formularele de Radiografie și Contact ajung pe email la Marius prin Resend, cu protecție anti-spam și confirmare reală, în ambele limbi.

Sarcini:
1. `functions/api/lead.ts` exact după `ARHITECTURA.md` § Formulare (ordinea: metodă, origine, validare, honeypot, Turnstile, Resend, răspuns). Fără biblioteci externe: `fetch` nativ către Turnstile și Resend.
2. Componenta `Form` cu etichete vizibile, câmpuri obligatorii marcate, honeypot, Turnstile invizibil, trimitere prin `fetch` către `/api/lead`, stare de succes doar după `{ ok: true }`, stare de eroare care păstrează textul introdus și arată telefonul și emailul. Mesajele din i18n.
3. Paginile `/multumesc` și `/en/thank-you` cu textul din § Mulțumesc al fișierelor globale, inclusiv linkul Calendly.
4. Payload-ul exact din `ARHITECTURA.md` § Formulare, inclusiv `lang`, `source` și parametrii UTM din URL.
5. Linkurile `tel:`, `mailto:`, butonul de WhatsApp (`wa.me/…`) pe `/suport` și `/en/support`, linkul Calendly pe contact și mulțumesc, toate cu `data-event`.
6. `.dev.vars.example`, instrucțiunile pentru `wrangler pages dev` și pentru variabilele din Cloudflare Pages în `NOTES.md`; pașii DNS pentru Resend (DKIM, SPF, DMARC) în `NOTES.md`.

Acceptare:
- Trimitere de test reușită pe staging pentru ambele formulare, în ambele limbi: Marius confirmă că a primit emailul la `office@bitup.ro`, cu `reply_to` corect, și că emailul nu a ajuns în spam.
- Test de eroare (cheie Resend greșită pe Preview): mesajul de eroare apare, textul rămâne în câmpuri.
- `curl` fără token Turnstile, cu JSON → 400; cu honeypot completat → 200 fără email; cu `Origin` străin → 403.
- Nicio cheie secretă în `dist/`, în repo sau în vreo variabilă `PUBLIC_` (grep în `dist/` după `re_` și după secretul Turnstile).

---

## Faza 5 — Consimțământ, GA4, SEO, securitate, redirecturi

**Scop:** tot ce nu se vede, dar se verifică.

Sarcini:
1. `ConsentBanner.astro` funcțional după `ARHITECTURA.md` § Analytics și consimțământ: cookie `bitup-consent` 6 luni, Accept/Refuz egale, Esc = Refuz, „Setări cookie-uri” din footer redeschide bannerul, la trecerea pe Refuz se șterg `_ga*`.
2. `Analytics.astro`: încarcă `gtag.js` doar după Accept, cu consent mode v2 (publicitate refuzată permanent), `anonymize_ip`, fără Google Signals. Evenimentele din `data-event`.
3. `public/_headers` cu setul din `ARHITECTURA.md` § Headere (inclusiv blocul pentru `/api/*`).
4. `public/_redirects` cu toate redirecturile 301 din `ARHITECTURA.md` § Redirecturi.
5. Sitemap cu alternativele de limbă, `robots.txt`, canonical pe fiecare pagină către propria limbă, `hreflang` complet (ro, en, x-default).
6. Imagini Open Graph generate la build pentru fiecare pagină și fiecare limbă (`astro-og-canvas`), 1200×630, titlul pe fundal navy și logo.
7. JSON-LD verificat cu validatorul Schema.org pe fiecare tip de pagină, în ambele limbi.

Acceptare:
- Înainte de orice alegere în banner: zero cereri către domenii Google (tab-ul Network, la prima vizită în fereastră incognito). După Accept: `gtag.js` se încarcă și un `page_view` apare în GA4 DebugView. După Refuz: zero cereri, iar bannerul nu mai apare la navigare.
- securityheaders.com: nota A sau A+ pe domeniul de staging.
- Toate URL-urile vechi din lista de redirecturi răspund 301 către destinația corectă (script de verificare în `NOTES.md`).
- `/pagina-inexistenta` și `/en/nonexistent` → 404 real.
- Nicio cerere de rețea către domenii terțe în afara celor din `ARHITECTURA.md` § Domenii permise.
- Validatorul de hreflang (de exemplu `technicalseo.com/tools/hreflang`) nu raportează erori pe 5 pagini alese.

---

## Faza 6 — QA și lansare

**Scop:** verificare completă înainte de a schimba DNS-ul.

Sarcini:
1. Verificare de linkuri interne și externe (`linkinator` sau echivalent), ambele limbi: zero linkuri rupte.
2. Lighthouse pe toate paginile, mobil și desktop, RO și EN; rezultatele în `NOTES.md`.
3. Test de accesibilitate cu tastatura pe fiecare pagină; `axe` fără erori critice, în light și dark.
4. Verificare vizuală la 375, 768, 1024, 1440 px pe fiecare pagină, în ambele teme; capturi în `NOTES.md`.
5. Lista finală a placeholder-elor rămase; lansarea e blocată dacă mai există vreunul.
6. Din dashboard-ul Cloudflare (Marius, cu pașii din `NOTES.md`): DNS-ul Resend verificat, regula de rate limiting pe `/api/lead`, variabilele de Production setate.
7. Deploy pe Cloudflare Pages, domeniul `bitup.ro` mutat, HTTPS forțat, `www` redirecționat la apex.
8. După lansare: Search Console cu sitemap-ul nou (ambele limbi), Google Business Profile legat de site, verificarea indexării în 7 zile, verificarea redirecturilor pe domeniul live, un formular de test din producție.

Acceptare:
- Marius a parcurs fiecare pagină pe telefon și pe desktop, în ambele limbi și teme, și a confirmat.
- Zero placeholder-e, zero linkuri rupte, headere A+, formulare testate pe domeniul live, email de test primit din producție.

---

## În afara acestui plan (nu se face acum)

Portal pentru clienți; chat pe site; pagini pe industrii; a treia limbă; blog cu mai mult de un articol (următoarele se adaugă ca fișiere Markdown, nu ca lucru de dezvoltare); email automat de confirmare către lead (opțional, se decide după lansare).
