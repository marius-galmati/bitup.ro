# Specificația tehnică bitup.ro · v3.1 (27 octombrie 2026, aliniată cu răspunsurile din `docs/raspunsuri-faza0.md`)

Înlocuiește pachetul de specificații din septembrie. Designul și conținutul vin din `brand/`, din skill-ul `bitup-brand` și din `docs/brief-site-v3.md`. Acest document acoperă doar partea tehnică.

## 1. Situația de pornire
Repo-ul conține site-ul Astro construit în septembrie–octombrie 2026 (RO / EN, teme, consimțământ GA4, formular cu Turnstile și Resend, Docker Compose pentru Dokploy). Infrastructura tehnică se păstrează; se rescriu designul, textele și structura paginilor (vezi raportul fazei 0). Fără redirecționări de pe adresele vechi (decizia lui Marius).

## 2. Stack
| Zonă | Alegere | De ce |
|---|---|---|
| Generator | **Astro** (static, fără framework de UI implicit; insule doar unde e nevoie) | HTML static, rapid, ușor de întreținut, bun pentru SEO |
| Conținut | Markdown / MDX în content collections (`blog`, `proiecte`), cu schemă validată | Marius poate adăuga articole și proiecte fără cod |
| Stiluri | CSS simplu cu variabilele din `brand/tokens.css` (opțional `<style>` scoped în Astro); valorile derivate (`color-mix` din tokens) stau într-un bloc etichetat din `src/styles/global.css` | O singură sursă pentru valori; `brand/` se schimbă doar la actualizări de brand |
| Găzduire | **BitUp Cloud**, pe un server cu **Dokploy**, deploy cu **Docker Compose** (secțiunea 9) | Infrastructura proprie BitUp; site-ul e și o demonstrație a ei |
| Servirea paginilor | Container `web`: **nginx** (alpine) care servește `dist/`, cu antetele de securitate și cache-ul în `nginx.conf` | Simplu, rapid, antetele controlate complet |
| Formular | Container `api`: **Node 24**, serverul de formular existent, fără dependențe (azi în `server/`, redenumit `api/` în faza 4), ruta `POST /api/lead`, cu **Cloudflare Turnstile** + **Resend** | Singura parte dinamică, izolată de restul site-ului; codul existent funcționează, nu se rescrie |
| Analytics | **GA4** cu **Consent Mode v2** | Decizia lui Marius; se încarcă doar după consimțământ |
| Iconițe | Un singur set de linie (Lucide, prin `astro-icon`) | Vezi `references/componente.md` |
| Imagini | `astro:assets` (AVIF / WebP, dimensiuni explicite, lazy) | Performanță |

Nu se folosesc: n8n, Umami, fonturi de pe CDN-uri externe, biblioteci de animație grele.

## 3. Structura repo-ului
```
/brand/                     kitul de brand (nu se modifică în afara actualizărilor de brand)
/docs/                      brief, specificația, promptul de pornire
/.claude/                   skill-urile
/src/
  styles/global.css         importă ../../brand/fonts.css și ../../brand/tokens.css, resetul de bază și blocul etichetat de valori derivate
  layouts/                  BaseLayout (head, SEO, temă, limbă), PageLayout
  components/ui/            Logo, Button, Label, Section, Card, Stat, Table, câmpurile de formular, Icon, Straturile, DiagramaServicii, PlaciStraturi, Breadcrumb, Faq, CtaBand, ThemeToggle, LangSwitch, ConsentBanner
  content/blog/ro|en/       articole (MDX)
  content/proiecte/ro|en/   proiecte: studii de caz și produse proprii (MDX)
  i18n/                     dicționare TypeScript (RO / EN) și rutele traduse
  pages/                    paginile RO la rădăcină, EN în /en/
/server/ → /api/           serviciul formularului (Node 24, fără dependențe), Dockerfile, teste; redenumirea se face în faza 4
/public/                    favicon-uri, robots.txt, imagini OG generate
/deploy/                    nginx.conf (antete, cache, pagina 404), Dockerfile pentru web
docker-compose.yml          serviciile web și api, pentru Dokploy
```

## 4. Limbi (i18n)
- Română implicit, la rădăcină (`/servicii/...`); engleză în `/en/` cu slug-uri traduse (`/en/services/...`).
- Fiecare pagină are perechea ei; `hreflang="ro"`, `hreflang="en"` și `x-default` (română).
- Comutatorul de limbă duce la pagina-pereche, nu la pagina principală.
- Textele de interfață stau în dicționarele TypeScript din `src/i18n/` (cheile lipsă le prinde `astro check`); textele lungi în pagini sau în MDX.

## 5. Teme
- Temă deschisă implicit; temă închisă după `prefers-color-scheme` sau după alegerea utilizatorului (`data-theme` pe `<html>`, salvată în `localStorage`).
- Un script mic, inline, în `<head>`, setează tema înainte de randare, ca să nu apară o pâlpâire la încărcare.
- Logo-ul se schimbă între pozitiv și negativ după temă (`<picture>` cu `prefers-color-scheme` sau două SVG-uri cu clase).

## 6. Formularul (`/api/lead`)
- Câmpurile din `docs/brief-site-v3.md`, secțiunea 4. Validare în browser și pe server.
- Fluxul: Turnstile (verificat pe server) → validare → email prin Resend către `office@bitup.ro` (cu toate câmpurile, limba și pagina de origine) → confirmare automată către client (în limba lui), cu ce urmează și termenul.
- Răspunsuri JSON clare; mesajele de eroare în limba paginii, fără text roșu sau portocaliu pe alb.
- Fără date personale în URL-uri sau în GA4. Evenimentul GA4 `lead_submit` doar cu consimțământ, fără câmpurile completate.
- Variabile de mediu, setate în Dokploy (secțiunea Environment a aplicației): pentru `api`: `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL`, `ALLOWED_ORIGIN`; la build-ul `web`: `PUBLIC_TURNSTILE_SITE_KEY`, `PUBLIC_GA4_ID` (= `G-N5DY194K0T`, proprietatea GA4 existentă, fluxul web bitup.ro, Stream ID 13222271612; valoarea e publică, dar se setează tot din mediu). Niciuna în cod sau în repo; în repo doar un `.env.example` fără valori.
- Limitare de rată pe `/api/lead` (de exemplu 5 cereri pe minut pe IP) și verificarea antetului `Origin`.
- Domeniul expeditorului verificat în Resend (SPF și DKIM pentru bitup.ro, compatibile cu configurarea Microsoft 365 existentă).

## 7. Cookie-uri și GA4
- Banner cu „Accept” și „Refuz” egale ca vizibilitate; link spre politica de cookie-uri; alegerea se poate schimba din subsol.
- Consent Mode v2: `default` cu toate semnalele `denied`; `update` la acceptare. GA4 nu trimite nimic înainte de consimțământ.
- Paginile legale (Termeni, Confidențialitate, Cookie-uri), în română și engleză, descriu exact ce se folosește (GA4, Turnstile, Resend, cookie-ul de temă și limbă). Sediul social apare doar aici.

## 8. SEO
- `title` (≤ 60 de caractere) și `description` (≤ 155) pe fiecare pagină, în ambele limbi.
- Imagini OG 1200 × 630 generate la build, după modelul din `references/componente.md`.
- `sitemap.xml` (cu alternativele de limbă), `robots.txt`, URL-uri canonice.
- Schema.org: `Organization` (cu logo, `sameAs`: LinkedIn), `ProfessionalService` cu adresa „Cluj-Napoca” și `areaServed` România (intervenții la sediu în Cluj și Transilvania, de la distanță în toată țara), `Service` pe fiecare pagină de serviciu (același `areaServed`), `FAQPage` din aceleași întrebări ca cele vizibile, `Article` pe blog, `BreadcrumbList`.
- Fără adresă de domiciliu; doar „Cluj-Napoca”.

## 9. Deploy pe BitUp Cloud (Dokploy + Docker Compose)
- `docker-compose.yml` cu două servicii:
  - `web`: build multi-stage (Node 24 construiește Astro → `nginx:alpine` servește `dist/`), port intern 80, `healthcheck` pe `/`;
  - `api`: Node 24 alpine, serverul existent fără dependențe, port intern 3000, `healthcheck` pe `/api/health`, utilizator non-root, sistem de fișiere doar-citire unde se poate.
- Rutarea și TLS le face Traefik-ul din Dokploy: domeniul `bitup.ro` (și `www` → redirecționare spre varianta fără `www`) pe serviciul `web`; calea `/api` pe serviciul `api`, configurată din interfața Dokploy (Domains) sau prin etichete Traefik în compose. Certificate Let's Encrypt prin Dokploy.
- Deploy automat din Git (webhook din Dokploy pe branch-ul `main` = bitup.ro). Lucrul se face pe branch-ul `v3`, fără deploy și fără mediu de previzualizare: Marius verifică local. `main` se atinge doar la lansare.
- Dacă DNS-ul rămâne pe Cloudflare cu proxy activ: SSL „Full (strict)”, iar nginx ia IP-ul real al vizitatorului din `CF-Connecting-IP` (contează pentru limitarea de rată din `api`).
- Logurile containerelor: în Dokploy; fără date personale în loguri (doar ID-ul cererii și statusul).
- Lansarea: verificare completă local (secțiunea 12, inclusiv `docker compose up`), aprobarea lui Marius, apoi merge din `v3` în `main`. Verificarea antetelor pe securityheaders.com și Mozilla Observatory se face pe domeniul live, imediat după lansare. Fără redirecționări de pe adresele vechi (în nginx rămâne doar `www` → fără `www`). `/styleguide` nu intră în build-ul de producție. ID-ul GA4 existent rămâne, ca istoricul să continue.

## 10. Securitate (site-ul unei firme de securitate trebuie să treacă propriile verificări)
În `deploy/nginx.conf` (pentru `web`) și în răspunsurile `api`:
- `Content-Security-Policy` strict: doar sursele proprii, plus Turnstile și GA4.
- `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` restrictiv, `X-Frame-Options: DENY`.
- Fără scripturi inline în afara celui de temă (cu hash în CSP).
- Ținta: nota A pe securityheaders.com și pe Mozilla Observatory.

## 11. Performanță și accesibilitate
- Lighthouse pe mobil: Performanță ≥ 90, Accesibilitate ≥ 95, Bune practici ≥ 95, SEO ≥ 95.
- JavaScript total pe pagină sub 50 KB (fără GA4); fonturile preîncărcate (`preload` pentru 400 și 600).
- WCAG 2.2 AA: contrast, focus vizibil, navigare din tastatură, etichete la câmpuri, `prefers-reduced-motion`.

## 12. Testare și verificare
- Playwright: capturi la 390, 768 și 1440 px, temă deschisă și închisă, pentru fiecare pagină; un test pentru formular (cu Turnstile în mod de test).
- `python3 .claude/skills/bitup-brand/scripts/brand_check.py dist/` după fiecare build.
- Verificarea linkurilor (fără 404).
- Un test pentru `docker compose up` local: site-ul răspunde, `/api/health` răspunde, formularul trimite (Resend în mod de test).

## 13. Ce trebuie de la Marius înainte de lansare
Cheile Resend și Turnstile (ID-ul GA4 e deja dat: `G-N5DY194K0T`), acces la proiectul din Dokploy (sau crearea lui de către Marius), confirmarea adreselor de email (expeditor și destinatar).
