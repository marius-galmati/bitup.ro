# bitup.ro — specificația pentru reconstrucție

Acest pachet conține tot ce are nevoie Claude Code ca să construiască noul site bitup.ro fără să inventeze nimic: planul de lucru, arhitectura, sistemul de design (light și dark), conținutul complet al fiecărei pagini în română și în engleză, paginile legale și lista lucrurilor pe care trebuie să le completeze Marius.

## Ce e în pachet

| Fișier / folder | Ce conține |
|---|---|
| `CLAUDE.md` | Regulile permanente pentru Claude Code: cum lucrează cu spec-ul, ce înseamnă „premium” aici, lista de „mirosuri de site generat”, cum verifică. Se mută la rădăcina repo-ului, nu stă în `spec/`. |
| `PLAN.md` | Fazele de lucru, în ordine, cu criterii de acceptare pentru fiecare. Claude Code lucrează pe el, fază cu fază. |
| `ARHITECTURA.md` | Stack (Astro static, pe server propriu cu Dokploy, în spatele Cloudflare), limbile, structura proiectului, rutele RO ↔ EN, colecțiile de conținut, formularele (funcție proprie + Turnstile + Resend), consimțământul și GA4, dark mode, headerele de securitate, redirecturile, SEO, deploy. |
| `DESIGN.md` | Sistemul de design: culori (light + dark), tipografie, spațiere, componente, reguli de layout, ce nu facem. |
| `PLACEHOLDERS.md` | Valorile finale (telefon, email, program, linkuri) și ce mai lipsește înainte de lansare. |
| `UMANIZARE.md` | Raportul trecerii textului prin filtrul anti-pattern-uri AI și lista afirmațiilor pe care Marius trebuie să le confirme. |
| `continut/` | Conținutul fiecărei pagini în română, cu meta title/description, secțiuni în ordine, textul exact, CTA-uri, note pentru Claude Code. Include paginile legale (`13`, `14`, `15`). |
| `continut/studii-de-caz/`, `continut/blog/` | Cele două studii de caz (Cosmio, ProQ) și primul articol, ca intrări în colecții. |
| `continut-en/` | Aceleași pagini, în engleză, cu aceeași numerotare (`01-home.md` ↔ `01-acasa.md`), plus `case-studies/` și `blog/`. Textul EN e final, ca și cel RO. |
| `assets/` | Fotografiile lui Marius (pregătite pentru web), capturile pentru articol, referințe de logo, recomandarea pentru imaginea din hero (`FOTO-CONTEXT.md`). |

## Cum îl dai lui Claude Code

Structura finală a repo-ului: specificația în `spec/`, regulile permanente în `CLAUDE.md` la rădăcină, proiectul Astro la rădăcină.

1. În folderul în care ai dezarhivat pachetul: creezi un subfolder `spec/` și muți în el tot ce e acum acolo (README.md, PLAN.md, ARHITECTURA.md, DESIGN.md, PLACEHOLDERS.md, UMANIZARE.md, `continut/`, `continut-en/`, `assets/`), **cu excepția** lui `CLAUDE.md`, care rămâne la rădăcină. Poți lăsa mutarea și pe Claude Code, e primul pas din promptul de pornire.
2. `git init` în rădăcină (Claude Code face commit la finalul fiecărei faze; fără git nu are unde).
3. Ai Node LTS instalat (`node -v` ≥ 20).
4. Deschizi Claude Code în rădăcină și îi dai promptul de pornire de mai jos. Recomandat: primul mesaj în **plan mode** (Shift+Tab), ca să citească și să-ți spună ce a înțeles înainte să scrie cod.
5. Lucrați pe faze: la finalul fiecărei faze din `PLAN.md`, Claude Code se oprește, îți arată dovezile, tu bifezi criteriile de acceptare, apoi mergeți mai departe. Poți da `/clear` între faze fără să pierzi nimic: regulile sunt în `CLAUDE.md`, deciziile în `NOTES.md`.

`CLAUDE.md` conține regulile de lucru, definiția lui „premium” pentru acest proiect, lista de „mirosuri de site generat” pe care Claude Code trebuie s-o verifice la fiecare pagină și cum face verificările. E citit automat la fiecare sesiune, deci promptul de pornire poate fi scurt.

### Promptul de pornire

```
Construim noul site bitup.ro. Pasul 0, dacă nu e deja făcut: tot ce e în rădăcina acestui folder (README.md, PLAN.md, ARHITECTURA.md, DESIGN.md, PLACEHOLDERS.md, UMANIZARE.md, continut/, continut-en/, assets/) se mută în spec/. CLAUDE.md rămâne la rădăcină. Dacă nu există .git, rulezi git init.

Apoi citește integral, în ordinea asta: CLAUDE.md, spec/README.md, spec/PLAN.md, spec/ARHITECTURA.md, spec/DESIGN.md, spec/PLACEHOLDERS.md, spec/continut/00-global.md, spec/continut-en/00-global.md. Nu scrie cod încă.

Când ai terminat de citit, răspunde-mi cu:
1. În maximum 15 rânduri: ce construim, stack-ul, cum merg cele două limbi și cele două teme, cum merg formularele și analytics-ul.
2. Fazele din spec/PLAN.md, o propoziție fiecare.
3. Orice contradicție sau lucru neclar din spec, dacă ai găsit.
4. Cele trei locuri unde crezi că designul riscă cel mai mult să alunece spre „template” și ce faci concret ca să nu se întâmple, cu referire la lista din CLAUDE.md.

Aștepți OK-ul meu, apoi începi Faza 0. Lucrăm fază cu fază; la finalul fiecăreia te oprești, îmi arăți dovezile din CLAUDE.md § Cum verifici și faci commit.
```

### Promptul pentru fazele următoare

```
Continuăm cu Faza N din spec/PLAN.md. Recitește CLAUDE.md, NOTES.md și fișierele de conținut ale paginilor din faza asta (RO și EN). La final: build, capturi în qa/faza-N/ în ambele teme și ambele limbi, lista de mirosuri bifată în NOTES.md, placeholder-ele rămase, commit. Apoi te oprești și îmi arăți.
```

## Ce faci tu, Marius, înainte să pornești

Deschizi `PLACEHOLDERS.md`. Valorile de contact sunt deja completate. Ce mai ai de făcut înainte de lansare, nu înainte de a porni: conturile și cheile (Turnstile, Resend cu DNS-ul verificat, GA4), acordul semnat de la Cosmio și logo-urile locale, badge-urile de la parteneri, cele două capturi de raport, logo-ul BitUp în varianta pentru fundal închis. Claude Code poate construi tot site-ul fără ele; ele blochează doar mutarea domeniului.

## Ce s-a schimbat față de prima versiune (10 septembrie 2026, seara)

Formularele merg prin funcția proprie `/api/lead` + Turnstile + Resend, nu prin n8n. Analytics-ul e GA4 cu banner de consimțământ, nu Umami. Site-ul e în română și engleză (`continut-en/`), cu light și dark mode. Paginile legale sunt scrise (`13`, `14`, `15`, în ambele limbi). Valorile de contact sunt completate în text; sediul social apare doar pe paginile legale; adresa publicată e „Cluj-Napoca”. Calendly e link pe contact și pe pagina de mulțumire. `assets/FOTO-CONTEXT.md` explică ce facem cu imaginea din hero. Dacă ai dat deja pachetul vechi lui Claude Code, îi dai pe ăsta și îi spui să recitească `PLAN.md` și `ARHITECTURA.md` de la zero; nu e nimic de „migrat”, doar fișiere de înlocuit.

## Ce nu e în pachet, deliberat

- Logo-ul BitUp ca fișier. Marius l-a dat pe 16 octombrie 2026 (variantele pozitiv și negativ, PNG la 2×, plus `favicon.ico`); e vectorizat în `public/logos/`, vezi `assets/logos/README.md`.
- O a treia limbă, un portal de clienți, un chat.
