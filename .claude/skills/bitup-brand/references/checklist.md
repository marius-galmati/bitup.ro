# Verificarea înainte de „gata”

## Automat
- [ ] `python3 .claude/skills/bitup-brand/scripts/brand_check.py dist/` trece fără erori (culori din afara paletei, fonturi străine, raze peste 2 px, cuvinte interzise, diacritice cu sedilă, liniuțe lungi, „BITUP”).
- [ ] Build fără avertismente; Lighthouse pe mobil: Performanță ≥ 90, Accesibilitate ≥ 95, Bune practici ≥ 95, SEO ≥ 95.
- [ ] Linkuri interne fără erori 404.

## Vizual (capturi Playwright la 390, 768 și 1440 px, în ambele teme)
- [ ] Logo-ul corect pe fiecare fundal (pozitiv pe deschis, negativ pe închis), cu zona de protecție.
- [ ] Portocaliul apare doar ca formă sau pe bleumarin, niciodată ca text pe alb.
- [ ] O singură acțiune principală pe ecran; butoanele au colțuri drepte și săgeata.
- [ ] Elementul „Straturile”: cel mult unul pe pagină, doar pe bleumarin, pornit din marginea de jos.
- [ ] Textul nu depășește 68 de caractere pe rând; nimic nu iese din container pe 390 px.
- [ ] Tema închisă: niciun text slate sau teal pe bleumarin.

## Conținut
- [ ] Textul în română a trecut prin `umanizare-ro`; cel în engleză respectă aceleași reguli.
- [ ] Toate faptele sunt în `copy.md` sau marcate `[DE CONFIRMAT]`.
- [ ] Nicio formulare de audit NIS2, niciun semnal de firmă mică, nicio garanție de IT administrat în afara paginii ei.
- [ ] Metadate pe fiecare pagină: title (≤ 60 de caractere), description (≤ 155), OG 1200 × 630, hreflang ro / en.
