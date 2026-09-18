# ARHITECTURA.md

## Stack

- **Astro**, ultima versiune majoră stabilă la data începerii proiectului, fixată exact în `package.json` (versiunea reală e scrisă în `NOTES.md`); output static (`output: 'static'`), TypeScript strict. HTML complet la build; JavaScript doar pentru: meniul mobil, comutatorul de temă, comutatorul de limbă (link simplu, fără JS), formulare, Turnstile, bannerul de consimțământ și încărcarea condiționată a Google Analytics.
- **Două limbi:** română (implicită, la rădăcină) și engleză (sub `/en/`), prin i18n-ul nativ din Astro. Detalii la § Limbi.
- **Două teme:** light și dark, prin tokeni CSS și `data-theme` pe `<html>`. Detalii în `DESIGN.md` § Dark mode.
- **Stilizare:** CSS pur cu variabile (tokenii din `DESIGN.md`) în `src/styles/`, plus utilitare minime scrise de mână. Fără Tailwind: proiectul are ~20 de pagini pe limbă și un sistem de design mic; utilitarele ar aduce mai mult zgomot decât ajutor. Dacă Claude Code consideră că Tailwind v4 accelerează mult, poate propune în `NOTES.md`, dar nu îl instalează fără acord.
- **Fonturi:** self-hosted prin `@fontsource-variable/public-sans`, `@fontsource/ibm-plex-mono` (400, 500). Subset latin + latin-ext (diacriticele românești sunt în latin-ext). `font-display: swap`.
- **Integrări Astro:** `@astrojs/sitemap` (cu configurarea i18n), `@astrojs/rss`, `astro-og-canvas` (imagini OG la build), `astro-icon` doar dacă e nevoie de iconițe (set: `lucide`, maximum 12 iconițe în tot site-ul, inclusiv soare/lună pentru temă).
- **Imagini:** `astro:assets` (`<Image>` / `<Picture>`), AVIF + WebP, dimensiuni declarate.
- **Formulare:** HTML nativ + `fetch` către o funcție proprie (`/api/lead`, Cloudflare Pages Function) care verifică Turnstile și trimite emailul prin **Resend**. Cheile stau doar pe server. Detalii la § Formulare.
- **Analytics:** **Google Analytics 4**, încărcat doar după consimțământ explicit (banner cu Accept / Refuz egale). Detalii la § Analytics și consimțământ.
- **Programări:** link către Calendly (`https://calendly.com/marius-galmati-bitup/30min`), deschis în tab nou. Fără widget încorporat: widgetul ar încărca scripturi și cookie-uri de la Calendly înainte de consimțământ.
- **Găzduire:** Cloudflare Pages, conectat la repo (branch `main` = producție, `staging` = previzualizare). Funcțiile din `functions/` se publică automat împreună cu site-ul.
- **Node:** LTS curent, fixat în `.nvmrc`.

## Structura proiectului

```
bitup-site/
  spec/                      ← acest pachet, neatins
  functions/
    api/
      lead.ts                ← Pages Function: validare, honeypot, Turnstile, Resend
  public/
    _headers                 ← headere de securitate (Cloudflare Pages)
    _redirects               ← redirecturi 301
    robots.txt
    favicon.svg, favicon.ico, apple-touch-icon.png
    logo-bitup.svg           ← varianta pentru fundal deschis
    logo-bitup-dark.svg      ← varianta pentru fundal închis
  src/
    styles/
      tokens.css             ← variabilele din DESIGN.md (light + dark)
      base.css               ← reset, tipografie, focus, reduced-motion
      components.css         ← stilurile componentelor (sau CSS scoped per componentă)
    i18n/
      ro.ts, en.ts           ← microcopy de interfață (meniu, butoane, mesaje de formular, banner)
      routes.ts              ← harta rutelor RO ↔ EN (pentru comutatorul de limbă și hreflang)
      index.ts               ← helpers: t(), getLocale(), altUrl()
    layouts/
      BaseLayout.astro       ← primește `lang`, setează <html lang>, hreflang, JSON-LD
      CaseLayout.astro       ← studiu de caz
      PostLayout.astro       ← articol de blog
      LegalLayout.astro      ← pagini legale (Prose + data ultimei actualizări)
    components/
      Header.astro, Footer.astro, Button.astro, Section.astro, Container.astro,
      Eyebrow.astro, Card.astro, Steps.astro, FactStrip.astro, NumberTiles.astro,
      Quote.astro, CtaBand.astro, Prose.astro, Figure.astro, Form.astro,
      Faq.astro (details/summary + JSON-LD), Seo.astro (head), JsonLd.astro,
      ThemeToggle.astro, LangSwitch.astro, ConsentBanner.astro, Analytics.astro
    content/
      cases/
        ro/                  ← din spec/continut/studii-de-caz/
        en/                  ← din spec/continut-en/case-studies/
      blog/
        ro/                  ← din spec/continut/blog/
        en/                  ← din spec/continut-en/blog/
    content.config.ts
    pages/
      index.astro                       ← RO
      servicii/index.astro
      servicii/suport-it.astro
      servicii/securitate.astro
      servicii/automatizari.astro
      radiografie-it.astro
      cum-lucram.astro
      rezultate/index.astro
      rezultate/[slug].astro
      despre.astro
      blog/index.astro
      blog/[slug].astro
      rss.xml.ts
      suport.astro
      contact.astro
      multumesc.astro
      termeni.astro, confidentialitate.astro, cookies.astro
      404.astro
      en/                               ← EN, aceleași pagini, slug-uri în engleză (vezi § Rute)
        index.astro
        services/index.astro
        services/it-support.astro
        services/security.astro
        services/automation.astro
        it-health-check.astro
        how-we-work.astro
        results/index.astro
        results/[slug].astro
        about.astro
        blog/index.astro
        blog/[slug].astro
        rss.xml.ts
        support.astro
        contact.astro
        thank-you.astro
        terms.astro, privacy.astro, cookies.astro
    lib/
      site.ts                ← constante: nume, telefon, email, oraș, linkuri (valorile din PLACEHOLDERS.md § Completate)
      schema.ts              ← generatoare JSON-LD
  astro.config.mjs
  wrangler.toml              ← doar pentru `wrangler pages dev` local
  .dev.vars.example          ← RESEND_API_KEY, TURNSTILE_SECRET_KEY, LEAD_TO_EMAIL (server, niciodată PUBLIC_)
  .env.example               ← PUBLIC_TURNSTILE_SITE_KEY, PUBLIC_GA4_ID
```

## Limbi

- `astro.config.mjs`:
  ```js
  i18n: { defaultLocale: 'ro', locales: ['ro', 'en'], routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false } }
  ```
  Româna la rădăcină (`/despre`), engleza sub prefix (`/en/about`). Fără redirecționare automată după limba browserului sau după IP: strică indexarea și enervează. Comutatorul de limbă e vizibil în header și în footer.
- Slug-urile sunt traduse, nu doar prefixate. Harta e în `src/i18n/routes.ts` și e sursa unică pentru comutatorul de limbă, `hreflang` și sitemap.
- Fiecare pagină are `<html lang="ro">` sau `lang="en"`, `<link rel="alternate" hreflang="ro">`, `hreflang="en"` și `hreflang="x-default"` (către varianta română), toate cu URL absolut.
- Sitemap: `@astrojs/sitemap` cu `i18n: { defaultLocale: 'ro', locales: { ro: 'ro-RO', en: 'en' } }`, ca fiecare URL să aibă alternativele.
- Microcopy-ul de interfață (meniu, butoane, etichete de formular, mesaje, banner) e în `src/i18n/ro.ts` și `en.ts`; textul paginilor e în fișierele de conținut (`spec/continut/` pentru RO, `spec/continut-en/` pentru EN) și se copiază în pagini. Nu se traduce nimic la build și nu se folosește un serviciu de traducere; textul EN e final, ca și cel RO.
- Colecțiile au un subfolder pe limbă (`cases/ro`, `cases/en`); intrările pereche au același nume de fișier (`cosmio.md` în ambele). Un articol de blog poate exista doar în română: pagina `/en/blog` afișează doar intrările din `blog/en`, iar comutatorul de limbă de pe un articol fără pereche duce la `/en/blog` (nu la o pagină 404).
- Formatare: datele în română „10 septembrie 2026”, în engleză „September 10, 2026”; numerele cu separatorii limbii. Telefonul și emailul sunt identice în ambele limbi.
- OG image per limbă (titlul paginii în limba ei). JSON-LD: `inLanguage` pe fiecare pagină; `Organization.availableLanguage: ["Romanian", "English"]`.
- 404: o singură pagină (`404.astro`), bilingvă compact: textul român sus, cel englez sub o linie, ambele din `00-global.md` § 404 și `continut-en/00-global.md` § 404. Cloudflare Pages servește `404.html` pentru orice rută inexistentă, inclusiv sub `/en/`.

## Rute

| RO | EN | Sursă RO / EN | Note |
|---|---|---|---|
| `/` | `/en` | `01-acasa.md` / `01-home.md` | |
| `/servicii` | `/en/services` | `02-servicii-index.md` / `02-services.md` | hub |
| `/servicii/suport-it` | `/en/services/it-support` | `03-…` | ancore RO: `#ce-include`, `#cloud`, `#echipamente`, `#intrebari`; EN: `#whats-included`, `#cloud`, `#equipment`, `#faq` |
| `/servicii/securitate` | `/en/services/security` | `04-…` | RO: `#backup`, `#audit`, `#nis2`, `#incidente`, `#intrebari`; EN: `#backup`, `#audit`, `#nis2`, `#incidents`, `#faq` |
| `/servicii/automatizari` | `/en/services/automation` | `05-…` | RO: `#software`, `#intrebari`; EN: `#software`, `#faq` |
| `/radiografie-it` | `/en/it-health-check` | `06-…` | pagina de conversie; RO: `#cum-decurge`, `#formular`; EN: `#how-it-works`, `#form` |
| `/cum-lucram` | `/en/how-we-work` | `07-…` | |
| `/rezultate` | `/en/results` | `08-…` + colecția `cases` | |
| `/rezultate/[slug]` | `/en/results/[slug]` | colecția `cases` | `cosmio`, `proq`; același slug în ambele limbi |
| `/despre` | `/en/about` | `09-…` | |
| `/echipa` | `/en/team` | `16-…` | profilurile individuale; pagina vine imediat după rescrierea lui `/despre` |
| `/blog`, `/blog/[slug]`, `/rss.xml` | `/en/blog`, `/en/blog/[slug]`, `/en/rss.xml` | `12-…` + colecția `blog` | slug-ul articolului e tradus (e în frontmatter-ul EN) |
| `/suport` | `/en/support` | `10-…` | clienți existenți |
| `/contact` | `/en/contact` | `11-…` | |
| `/multumesc` | `/en/thank-you` | `00-global.md` § Mulțumesc | `noindex` |
| `/termeni` | `/en/terms` | `13-termeni.md` / `13-terms.md` | `LegalLayout` |
| `/confidentialitate` | `/en/privacy` | `14-…` | `LegalLayout` |
| `/cookies` | `/en/cookies` | `15-…` | `LegalLayout` |
| `/404` | (aceeași) | `00-global.md` § 404, ambele limbi | status 404 real |

Trailing slash: fără (`trailingSlash: 'never'`), `build.format: 'file'` sau echivalentul care produce `/despre` → `despre.html` cu rescriere corectă pe Cloudflare Pages.

## Colecții (`src/content.config.ts`)

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const cases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cases' }), // id-ul devine „ro/cosmio”, „en/cosmio”
  schema: ({ image }) => z.object({
    title: z.string(),            // titlul lung din hero
    client: z.string(),           // „Cosmio Fintech SRL” / „ProQ (produs BitUp)”
    kicker: z.string(),           // „Cloud, backup și disaster recovery”
    summary: z.string(),          // subtitlul din hero
    logo: z.string().optional(),  // cale în public/ sau URL extern aprobat
    logoDark: z.boolean().default(false), // caseta logo pe fundal închis
    facts: z.array(z.object({ k: z.string(), v: z.string() })),
    numbers: z.array(z.object({ v: z.string(), unit: z.string().optional(), k: z.string() })).optional(),
    service: z.enum(['suport-it', 'securitate', 'automatizari']),
    order: z.number(),
    draft: z.boolean().default(false),
    consent: z.string().optional(), // „acord semnat 2026-09-xx” — obligatoriu când draft=false și client ≠ BitUp
    metaTitle: z.string().optional(),       // <title> din head, când regula implicită dă peste 60 de caractere; H1-ul rămâne `title`
    metaDescription: z.string().optional(), // description din head, când `summary`/`description` nu încap în 155
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }), // „ro/cum-ne-am-construit-propriul-helpdesk”, „en/how-we-built-our-own-helpdesk”
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Marius Galmati'),
    tags: z.array(z.string()).default([]),
    heroImage: image().optional(),
    draft: z.boolean().default(false),
    translationOf: z.string().optional(), // slug-ul perechii din cealaltă limbă, pentru comutatorul de limbă și hreflang
    metaTitle: z.string().optional(),       // <title> din head, când regula implicită dă peste 60 de caractere; H1-ul rămâne `title`
    metaDescription: z.string().optional(), // description din head, când `summary`/`description` nu încap în 155
  }),
});

export const collections = { cases, blog };
```

Limba unei intrări se deduce din primul segment al id-ului (`ro/…`, `en/…`); paginile filtrează după el. `draft` și `consent` se aplică identic în ambele limbi (dacă Cosmio e draft în RO, e draft și în EN).

Studiile de caz au corpul în Markdown cu headinguri `##` pentru secțiuni (Situația, Ce am livrat, Angajamente, Cum lucrăm, Rezultat); `CaseLayout` le randează în ordinea din fișier.

## Formulare

Două formulare, aceeași componentă `Form.astro`, cu `kind: 'radiografie' | 'contact'` și `lang`.

**Câmpuri Radiografie:** nume (obligatoriu), firmă (obligatoriu), număr de angajați (select: sub 10 · 10–30 · 30–100 · peste 100), telefon (obligatoriu), email (obligatoriu), „Ce te îngrijorează cel mai tare la IT-ul vostru?” (textarea, opțional), consimțământ GDPR (checkbox, obligatoriu, text în `00-global.md`).

**Câmpuri Contact:** nume, firmă, email (obligatorii), telefon (opțional), „Cu ce te putem ajuta?” (textarea, obligatoriu), consimțământ.

**Comportament în browser:**
- Etichete vizibile, `for`/`id` legate, `autocomplete` corect, `inputmode` pe telefon.
- Honeypot: câmp `website` ascuns cu CSS (nu `display:none` pe input, ci container `position:absolute; left:-9999px`, `tabindex="-1"`, `autocomplete="off"`).
- Turnstile invizibil (`PUBLIC_TURNSTILE_SITE_KEY`); tokenul intră în payload ca `turnstileToken`.
- `fetch` POST JSON către `/api/lead` (aceeași origine), timeout 10 s.
- Succes doar la răspuns 2xx cu `{ ok: true }`: redirect către `/multumesc?kind=radiografie` (sau `contact`; în EN `/en/thank-you?kind=…`).
- Eroare (rețea, 4xx, 5xx): mesajul din `00-global.md` § Erori, textul rămâne în câmpuri, apar telefonul și emailul.
- Fără JavaScript: formularul nu se trimite (Turnstile are nevoie de JS, iar o cale fără token ar fi un ocol complet al verificării anti-spam). În locul lui, un `<noscript>` în ambele formulare, cu textul din `00-global.md` § Mesaje de formular („Formularul are nevoie de JavaScript pentru verificarea anti-spam…”) și linkul Calendly. Nu există `<form method="post">` către `/api/lead` și nici răspuns 303.

**Payload (doar JSON):**
```json
{
  "kind": "radiografie",
  "lang": "ro",
  "name": "", "company": "", "employees": "10-30", "phone": "", "email": "", "message": "",
  "consent": true,
  "source": "/radiografie-it",
  "utm": { "source": "", "medium": "", "campaign": "", "content": "" },
  "referrer": "",
  "turnstileToken": "",
  "website": "",
  "ts": "2026-09-10T12:00:00Z"
}
```

**Funcția `functions/api/lead.ts` (Cloudflare Pages Function), în ordinea asta:**
1. Acceptă doar `POST`; altceva → 405.
2. Verifică `Origin`/`Referer`: trebuie să fie `https://bitup.ro` (sau `*.pages.dev` pe staging); altfel 403.
3. Parsează corpul (doar JSON; alt `Content-Type` sau JSON invalid → `400 { ok: false, error: 'body' }`). Validare server-side: câmpurile obligatorii după `kind`, email cu format valid, telefon cu cel puțin 9 cifre, `message` ≤ 5.000 caractere, `consent === true`.
4. Honeypot: dacă `website` nu e gol → răspunde `200 { ok: true }` fără să trimită nimic (spamerul nu trebuie să afle).
5. Turnstile: `POST https://challenges.cloudflare.com/turnstile/v0/siteverify` cu `secret = env.TURNSTILE_SECRET_KEY`, `response = turnstileToken`, `remoteip = CF-Connecting-IP`. Dacă `success !== true` sau tokenul lipsește → `400 { ok: false, error: 'turnstile' }`. Nu există nicio cale fără token.
6. Resend: `POST https://api.resend.com/emails` cu `Authorization: Bearer ${env.RESEND_API_KEY}`:
   - `from`: `BitUp site <site@bitup.ro>` (domeniul `bitup.ro` verificat în Resend: înregistrările DKIM, SPF și, recomandat, DMARC puse în DNS-ul Cloudflare, vezi § Deploy).
   - `to`: `env.LEAD_TO_EMAIL` (= `office@bitup.ro`).
   - `reply_to`: emailul din formular, ca Marius să răspundă cu „Reply”.
   - `subject`: `[Radiografie IT] Firma · Nume` sau `[Contact] Firma · Nume`; sufix ` · EN` când `lang === 'en'`.
   - `text` (fără HTML): toate câmpurile, unul pe rând, plus `source`, `utm`, `referrer`, `ts`, IP-ul și țara din headerele Cloudflare. Textul din `message` se pune ca atare, într-un bloc separat, ca să nu poată fi confundat cu antetul.
   - Etichetă (`tags`): `kind`, `lang`.
7. Opțional (recomandat, dar se decide cu Marius): un al doilea email, de confirmare, către persoana care a scris, din `Marius Galmati <office@bitup.ro>`, cu textul de pe `/multumesc`. Dacă se face, `from` trebuie să fie o adresă la care Marius chiar citește răspunsurile.
8. Răspuns: `200 { ok: true }`. La eșec Resend → `502 { ok: false, error: 'mail' }`, și funcția scrie eroarea în log (`console.error`), vizibil în Cloudflare → Pages → Functions → Logs.
9. Limitare de rată: o regulă **Cloudflare WAF Rate Limiting** pe `/api/lead`, 5 cereri / 10 secunde / IP, setată din dashboard, nu în cod (planul Free permite doar ferestre de 10 secunde). Apărarea principală rămâne Turnstile + honeypot + validarea din funcție; regula doar taie rafalele. Dacă apare spam real, pasul următor e o limitare în funcție, pe Workers KV (cheie per IP, TTL 10 minute), nu un upgrade de plan.

Secretele (`RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `LEAD_TO_EMAIL`) se setează în Cloudflare Pages → Settings → Environment variables, separat pentru Production și Preview, și nu apar niciodată în repo sau într-o variabilă `PUBLIC_`. Local: `.dev.vars` (în `.gitignore`) și `npx wrangler pages dev dist`.

**De ce Turnstile rămâne:** formularul e public și funcția e apelabilă de oricine. Fără Turnstile, boții completează formularul (honeypot-ul prinde doar boții simpli), iar fiecare trimitere devine un email real trimis prin Resend din contul BitUp. Turnstile e gratuit, invizibil pentru oameni și se verifică în funcție cu o cerere. Costul e zero, beneficiul e că `office@bitup.ro` nu se umple de spam din propriul site.

## Analytics și consimțământ

**Ce se încarcă și când:**
- Nimic de la Google până la o alegere explicită. La prima vizită apare bannerul (`ConsentBanner.astro`, textul în `00-global.md` § Banner de consimțământ), cu două butoane egale ca mărime și culoare: **Accept** și **Refuz**. Fără „X” care înseamnă accept, fără bife pre-completate, fără a treia opțiune ascunsă.
- Alegerea se salvează într-un cookie first-party `bitup-consent` (`analytics=granted|denied`, `SameSite=Lax`, `Secure`, valabil 6 luni). După 6 luni, bannerul reapare.
- **Accept** → `Analytics.astro` inserează `gtag.js` (`https://www.googletagmanager.com/gtag/js?id=PUBLIC_GA4_ID`) și rulează:
  ```js
  gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' });
  gtag('consent', 'update', { analytics_storage: 'granted' });
  gtag('js', new Date());
  gtag('config', PUBLIC_GA4_ID, { anonymize_ip: true, allow_google_signals: false, allow_ad_personalization_signals: false });
  ```
  Consimțământ doar pentru statistici; publicitatea rămâne refuzată indiferent de alegere (nu facem remarketing).
- **Refuz** → nu se încarcă nimic, nici ping-uri fără cookie-uri. Alegerea se ține minte ca să nu reapară bannerul la fiecare pagină.
- Linkul „Setări cookie-uri” din footer redeschide bannerul și permite schimbarea alegerii; la trecerea de la Accept la Refuz se șterg cookie-urile `_ga` și `_ga_*` de pe domeniu.
- Bannerul nu blochează pagina (nu e modal): stă jos, pe toată lățimea pe mobil, ca o casetă în colț dreapta-jos pe desktop. Conținutul paginii se poate citi și fără să alegi.
- În GA4 (setări, nu cod): retenția datelor la 2 luni, Google Signals oprit, „Data sharing settings” la minim, IP-urile sunt oricum trunchiate în GA4.

**Evenimente** (trimise doar dacă `analytics_storage` e `granted`): `radiografie_submit`, `contact_submit`, `whatsapp_click`, `tel_click`, `calendly_click`, `cta_radiografie_click`, `lang_switch`, `theme_toggle`. Se declară cu atributul `data-event="…"` pe element; un script mic (≤ 1 KB) ascultă `click`-urile și apelează `gtag('event', name, { lang })`. Fără evenimente de scroll, fără heatmap, fără Hotjar și altele asemenea.

**De ce nu Umami:** Umami e un analytics open-source, self-hosted, care nu setează cookie-uri și nu identifică persoane; de aceea nu avea nevoie de banner. Marius a ales GA4 (mai cunoscut, gratuit, se leagă de Search Console și de Google Business Profile); prețul e bannerul și pagina de cookies, care sunt scrise în acest pachet. Nu se implementează ambele.

## Dark mode (implementare)

- Tokenii pentru light în `:root`; cei pentru dark în `:root[data-theme="dark"]` și, când nu există alegere explicită, în `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { … } }`. Paleta e în `DESIGN.md` § Dark mode.
- Un script inline de maximum 10 rânduri în `<head>`, înainte de CSS, citește `localStorage.getItem('bitup-theme')` și pune `data-theme` pe `<html>` ca să nu apară flash-ul de fundal alb. `color-scheme: light dark` pe `:root`.
- `ThemeToggle.astro`: buton în header (iconițe soare/lună din `lucide`), `aria-label` din i18n, `aria-pressed`. Ciclu: sistem → light → dark → sistem, sau mai simplu, doar light/dark, pornind de la preferința sistemului. Alegerea se salvează în `localStorage` (nu e cookie, nu trimite nimic la server, nu cere consimțământ; e menționată totuși pe pagina de cookies, la „stocare locală”).
- Logo-ul: SVG inline (`Logo.astro`, căile din `logo-paths.json`) cu culorile din tokeni (`--logo-ink`, `--logo-accent`), deci urmează și `prefers-color-scheme`, și comutatorul `data-theme`; fișierele `logo-bitup.svg` / `logo-bitup-dark.svg` din `public/` sunt aceleași desene, pentru JSON-LD, OG și uz extern.
- Imaginile OG rămân pe fundal navy, indiferent de temă.

## Headere de securitate (`public/_headers`)

```
/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.googletagmanager.com; frame-src https://challenges.cloudflare.com; connect-src 'self' https://challenges.cloudflare.com https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com; img-src 'self' data: https://www.googletagmanager.com https://*.google-analytics.com https://pro-q.ro https://cosmio.ro; style-src 'self' 'unsafe-inline'; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Resource-Policy: same-origin

/api/*
  Cache-Control: no-store
  X-Robots-Tag: noindex
```

Note:
- HSTS fără `preload` la lansare: preload e greu de scos și ar obliga orice subdomeniu (inclusiv `helpdesk.bitup.ro` și subdomeniile de test) la HTTPS pentru totdeauna. Pe staging (`*.pages.dev`) `max-age=300`. Preload se discută după o lună de producție fără probleme.
- `script-src 'unsafe-inline'` e nevoie pentru scriptul de temă din `<head>` și pentru inițializarea gtag. Preferat: Claude Code mută ambele în fișiere `.js` proprii sau folosește hash-uri (`'sha256-…'`) generate la build și scoate `'unsafe-inline'`. E o îmbunătățire, nu o condiție de lansare.
- `style-src 'unsafe-inline'` e necesar pentru stilurile scoped ale Astro.
- Logo-urile clienților se copiază local în `public/` la publicare, deci `pro-q.ro` și `cosmio.ro` din `img-src` se scot după; sunt acolo doar pentru perioada de draft.
- Domeniile Google apar în CSP chiar dacă scriptul se încarcă doar după consimțământ; CSP-ul e static.
- Calendly e doar link (`<a target="_blank" rel="noopener">`), deci nu apare în CSP.

## Redirecturi (`public/_redirects`)

```
/de-ce-bitup                          /cum-lucram                     301
/industrii                            /servicii                       301
/servicii/cybersecurity               /servicii/securitate            301
/servicii/backup-disaster-recovery    /servicii/securitate#backup     301
/servicii/mentenanta-suport           /servicii/suport-it             301
/servicii/infrastructura-it           /servicii/suport-it             301
/servicii/hosting-cloud               /servicii/suport-it#cloud       301
/servicii/solutii-hardware            /servicii/suport-it#echipamente 301
/servicii/automatizari-ai             /servicii/automatizari          301
/servicii/software-development        /servicii/automatizari#software 301
/termeni-si-conditii                  /termeni                        301
/politica-de-confidentialitate        /confidentialitate              301
/en/                                  /en                             301
https://www.bitup.ro/*                https://bitup.ro/:splat         301
```

## SEO

- Un `<h1>` per pagină; title ≤ 60 caractere, description ≤ 155, din fișierul de conținut al limbii respective.
- Canonical absolut pe fiecare pagină, către propria limbă (nu către RO). `hreflang` `ro`, `en`, `x-default` (= RO) pe toate paginile care au pereche. `/multumesc` și `/en/thank-you` cu `noindex`.
- JSON-LD (din `schema.ts`, cu textele în limba paginii):
  - Pe toate paginile: `Organization` (nume, url, logo, telefon, email, `sameAs` LinkedIn firmă, `availableLanguage`) și `ProfessionalService` (în loc de `LocalBusiness` generic) cu `address: { "@type": "PostalAddress", "addressLocality": "Cluj-Napoca", "addressRegion": "Cluj", "addressCountry": "RO" }` (fără stradă: nu există un birou public), `areaServed: ["Cluj-Napoca", "România"]`, `openingHoursSpecification` luni–vineri 08:00–18:00, `telephone`, `email`, `founder` → `Person`.
  - `/despre`: `AboutPage` cu `mainEntity` → `Organization`, iar `founder` din `Organization` e `Person` (Marius Galmati, jobTitle „Fondator” / „Founder”, sameAs LinkedIn personal). Nodurile `Person` pentru fiecare membru vor sta pe `/echipa`.
  - Pagini de servicii: `Service` (name, provider, areaServed, description).
  - Unde există „Întrebări frecvente”: `FAQPage` generat din componenta `Faq`.
  - Articole: `Article` (headline, author, datePublished, inLanguage, image).
  - Studii de caz: `Article` cu `about: Organization` a clientului (doar când `draft: false`).
- Sitemap automat cu alternativele de limbă, `robots.txt` cu `Sitemap:`; `/multumesc`, `/en/thank-you`, `/404`, `/api/*` excluse.
- Imagini OG: 1200×630, generate la build, fundal navy, titlul paginii cu Public Sans, logo jos-stânga; una per pagină per limbă.

## Domenii permise (singurele cereri de rețea admise de pe site)

`bitup.ro` (self, inclusiv `/api/lead`), `challenges.cloudflare.com` (Turnstile), `www.googletagmanager.com` și `*.google-analytics.com` / `*.analytics.google.com` (doar după Accept). Temporar, pe durata draft-urilor: `pro-q.ro`, `cosmio.ro` pentru logo-uri. Linkuri externe (nu cereri): `calendly.com`, `linkedin.com`, `helpdesk.bitup.ro`, `wa.me`.

## Performanță

- Buget per pagină, fără imaginile de conținut și fără GA4: ≤ 300 KB transferat, ≤ 60 KB JavaScript. GA4 (~100 KB) se încarcă doar după Accept și nu intră în buget.
- Core Web Vitals țintă, mobil: LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1. Bannerul de consimțământ nu trebuie să producă CLS: e `position: fixed`, nu împinge conținutul.
- Fonturile: doar greutățile folosite; `preload` pentru fontul de display.
- Imaginile: `<Picture>` cu AVIF/WebP, `width`/`height` declarate, `loading="lazy"` sub fold, `fetchpriority="high"` pe imaginea din hero.

## Deploy

**Cloudflare Pages:** proiect conectat la repo; build `npm run build`, output `dist`; `functions/` publicat automat. Variabile: `PUBLIC_*` în Build, secretele în Environment variables (Production și Preview separat). `main` → producție, `staging` → previzualizare pe `*.pages.dev`. DNS: `bitup.ro` CNAME flattening către Pages; `www` → redirect 301 la apex. HTTPS forțat, TLS 1.2+, HSTS din `_headers`.

**Resend, în DNS-ul Cloudflare (o singură dată):** înregistrările pe care le dă Resend la „Add domain” pentru `bitup.ro`: DKIM (CNAME/TXT `resend._domainkey`), SPF pe subdomeniul de trimitere (Resend folosește implicit `send.bitup.ro` sau similar, ca să nu se amestece cu SPF-ul căsuței `office@`), și o politică DMARC pe domeniu (`_dmarc` TXT, `p=quarantine` după o săptămână de `p=none`). Fără ele, emailurile din site ajung în spam sau sunt respinse. Verificarea se face din dashboard-ul Resend; Claude Code documentează pașii în `NOTES.md`, Marius le pune în DNS.

**Cloudflare, din dashboard, la lansare:** regula de rate limiting pe `/api/lead`; Bot Fight Mode (dacă se activează, poate seta cookie-ul `__cf_bm`, deja menționat pe pagina de cookies); Cache Rules implicite pentru static.

**Alternativă, serverul propriu:** e posibilă (Caddy/nginx + un mic serviciu Node pentru `/api/lead`), dar pierde funcțiile Pages și rate limiting-ul gratuit. Se alege doar dacă există un motiv.

## Ce nu intră

CMS, cont de utilizator, chat pe site, A/B testing, pixel Meta/LinkedIn (se pot adăuga mai târziu doar prin același banner de consimțământ, ca a doua categorie), widget Calendly încorporat, traducere automată, redirecționare după limbă/IP.
