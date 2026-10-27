# Promptul de pornire pentru Claude Code

Lipește textul de mai jos în prima sesiune, cu Claude Code deschis în rădăcina repo-ului. Fazele 1–6 le pornești pe rând, fiecare în sesiunea ei, după ce aprobi faza anterioară.

---

Refacem site-ul bitup.ro pe noua identitate BitUp. Înainte de orice, citește `CLAUDE.md`, skill-ul `bitup-brand` (cu toate fișierele din `references/`), `docs/brief-site-v3.md` și `docs/spec-tehnica.md`. Răsfoiește `brand/manual/BitUp_Manual_de_brand_v1.3.pdf`.

**Faza 0, acum: audit și plan. Nu modifica niciun fișier.**
1. Analizează codul actual: stack, structură, pagini, componente, formulare, i18n, analytics, deploy.
2. Compară cu `docs/spec-tehnica.md` (Astro static, deploy pe BitUp Cloud cu Dokploy și Docker Compose, Turnstile, Resend, GA4 cu consimțământ, RO / EN, temă deschisă și închisă). Site-ul nou îl înlocuiește complet pe cel vechi, fără redirecționări. Spune ce păstrăm, ce rescriem și de ce. Dacă recomanzi altceva, argumentează.
3. Propune planul pe faze, cu ce livrezi și cum verifici la fiecare:
   - Faza 1: sistemul de design (fonturi locale, `tokens.css`, componentele de bază din `references/componente.md`) și o pagină `/styleguide` cu toate componentele, în ambele teme.
   - Faza 2: layout-ul (antet, subsol, comutator de limbă și temă) și pagina Acasă.
   - Faza 3: paginile de servicii, BitUp Cloud, NIS2, IT administrat.
   - Faza 4: Proiecte, Despre, Blog, Contact, formularul `/api/lead`, paginile legale.
   - Faza 5: versiunea în engleză.
   - Faza 6: SEO, metadate, imagini OG, performanță, accesibilitate, `docker-compose.yml` pentru Dokploy, verificarea finală pe mediul de previzualizare.
4. Fă lista cu tot ce lipsește sau se contrazice între surse (texte, cifre, acorduri, chei API), ca întrebări închise pentru mine.

Reguli pentru toate fazele: valorile vin doar din `brand/tokens.css`; tot textul în română trece prin `umanizare-ro`; nu inventezi fapte (marchezi `[DE CONFIRMAT: …]`); la finalul fiecărei faze rulezi build-ul, `brand_check.py`, faci capturi Playwright la 390, 768 și 1440 px în ambele teme, te uiți la ele și îmi trimiți un raport scurt, cu capturile.

---

## Prompturile pentru fazele următoare (exemplu)
> Faza 1 din planul aprobat: sistemul de design și pagina `/styleguide`. Folosește skill-ul `bitup-brand`. La final: build, `brand_check`, capturi în ambele teme, raport.

> Faza 2: layout-ul și pagina Acasă, după `docs/brief-site-v3.md`, secțiunile 3–5. Textele trec prin `umanizare-ro`. La final: verificările obișnuite și raportul.
