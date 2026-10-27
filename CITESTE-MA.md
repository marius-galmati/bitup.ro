# Kitul de brand BitUp pentru Claude Code

Tot ce trebuie să știe Claude Code ca să construiască site-ul pe identitatea BitUp, aceeași de pe social media și din PDF-uri.

## Ce conține
| Cale | Ce este | Cine îl folosește |
|---|---|---|
| `CLAUDE.md` | Regulile proiectului; Claude Code le citește automat la fiecare sesiune | Claude Code |
| `.claude/skills/bitup-brand/` | Skill-ul de brand: reguli, componente, vocea și faptele aprobate, lista de verificare, scriptul `brand_check.py` | Claude Code, automat, la orice lucru vizual sau de text |
| `.claude/skills/umanizare-ro/` | Skill-ul tău de umanizare a textelor în română | Claude Code, pentru tot textul în română |
| `brand/brand-tokens.json` | Sursa de adevăr: culori, tipografie, spațieri, butoane, logo | tot |
| `brand/tokens.css`, `brand/fonts.css` | Aceleași valori, ca variabile CSS (temă deschisă și închisă) + IBM Plex local (woff2) | codul site-ului |
| `brand/logo/` | Toate variantele de logo (SVG) + favicon, iconițe de aplicație, logo pentru antet | site |
| `brand/graphic/` | „Straturile” (fundal pentru secțiuni bleumarin), „Straturi în spațiu” (plăcile), diagrama serviciilor, rombul pentru etichete | site, OG, PDF |
| `brand/manual/` | Manualul de brand v1.3 (PDF) | referință |
| `brand/copy/` | Ghidul de copy v1.4 (social media) | referință |
| `docs/brief-site-v3.md` | Poziționarea, publicul, oferta principală, harta site-ului, deciziile deschise | Claude Code + tu |
| `docs/spec-tehnica.md` | Partea tehnică: Astro, deploy pe BitUp Cloud cu Dokploy și Docker Compose, formularul cu Turnstile și Resend, GA4 cu consimțământ, RO / EN, teme, SEO, securitate | Claude Code |
| `docs/PROMPT-START.md` | Promptul de pornire și prompturile pentru faze | tu |

## Cum îl folosești
1. Copiază tot conținutul acestui folder în **rădăcina repo-ului site-ului**, inclusiv folderul ascuns `.claude`, și fă un commit.
2. Deschide Claude Code în rădăcina repo-ului și lipește promptul din `docs/PROMPT-START.md`. Prima fază e doar audit și plan, fără modificări.
3. Lucrează pe faze: o fază pe sesiune, aprobi planul, verifici capturile, apoi treci mai departe.
4. Răspunde la deciziile deschise din `docs/brief-site-v3.md` (secțiunea 7). Fără ele, Claude va lăsa marcaje `[DE CONFIRMAT]`.

## Ca brandul să rămână același peste tot
- **O singură sursă de adevăr:** `brand/brand-tokens.json`. Site-ul, motorul de social media (BitUp Studio) și PDF-urile folosesc aceleași valori.
- **Când se schimbă ceva în brand** (o culoare, un fapt, o regulă de copy), schimbarea se face întâi în proiectul Brand Strategist. Apoi actualizezi `brand/` și `references/copy.md` în repo, ca să nu existe două versiuni.
- **Faptele publice** (cifre, parteneri, echipă) sunt într-un singur loc: `references/copy.md`. Orice afirmație nouă de pe site trebuie să fie acolo.
