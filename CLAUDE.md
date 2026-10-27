# bitup.ro — reguli de proiect pentru Claude Code

Site-ul BitUp Technology (Cluj-Napoca): proiectăm, securizăm, automatizăm și administrăm IT-ul companiilor în creștere, ca un singur sistem, cu o singură echipă care răspunde de tot. Site în română (implicit) și engleză (`/en/`), temă deschisă și închisă.

## Surse de adevăr (în ordinea priorității)
1. `brand/brand-tokens.json` + `brand/tokens.css`: valorile de design. Nu există alte culori, fonturi sau raze.
2. `brand/manual/BitUp_Manual_de_brand_v1.3.pdf`: regulile vizuale.
3. `.claude/skills/bitup-brand/references/copy.md`: vocea, faptele aprobate, ce nu se spune.
4. `docs/brief-site-v3.md`: poziționarea, publicul, structura paginilor, oferta principală.
5. `docs/spec-tehnica.md`: stack-ul, formularul, i18n, teme, SEO, securitate, deploy-ul (Dokploy + Docker Compose pe BitUp Cloud).

Când două surse se contrazic, urmezi ordinea de mai sus și semnalezi contradicția.

## Skill-uri
- `bitup-brand`: îl folosești la orice modificare vizibilă (UI, CSS, conținut, metadate, imagini OG, PDF).
- `umanizare-ro`: tot textul în română trece prin el înainte de livrare.

## Reguli scurte (detaliile sunt în skill)
- Componentele folosesc doar variabilele din `brand/tokens.css`. Niciun hex, font sau `border-radius` scris direct.
- Portocaliul (#FE982A) nu e niciodată text pe alb. Butoanele: 48 px, colțuri drepte, săgeata „→”.
- Logo-ul doar din `brand/logo/` (SVG): pozitiv pe deschis, negativ pe închis.
- Fără stock foto cu hackeri, gradiente, umbre decorative, raze peste 2 px.
- Fără fapte inventate: ce lipsește marchezi `[DE CONFIRMAT: …]`.
- Fără „IMM/SMB”, fără „audit NIS2”, fără „arhitect IT”, fără „Radiografie IT”.

## Cum lucrăm
1. Planul întâi (plan mode) pentru orice fază nouă; aștepți aprobarea lui Marius.
2. Lucrezi pe o fază odată (vezi `docs/PROMPT-START.md`), cu commit-uri mici și mesaje clare.
3. După fiecare fază: build, `python3 .claude/skills/bitup-brand/scripts/brand_check.py dist/`, capturi Playwright la 390 / 768 / 1440 px în ambele teme, `references/checklist.md`.
4. La final de fază: raport scurt cu ce s-a făcut, capturile și deciziile rămase deschise.

## Comenzi
<!-- De completat după ce se alege / se confirmă stack-ul (de exemplu Astro): -->
- instalare: `npm install`
- dezvoltare: `npm run dev`
- build: `npm run build` → `dist/`
- verificare brand: `python3 .claude/skills/bitup-brand/scripts/brand_check.py dist/`

## Gata înseamnă
Build fără erori, `brand_check` fără probleme, capturile verificate, Lighthouse pe mobil ≥ 90 / 95 / 95 / 95, textele trecute prin `umanizare-ro`, nicio afirmație care nu e în `copy.md` sau marcată `[DE CONFIRMAT]`.
