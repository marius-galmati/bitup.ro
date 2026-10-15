# bitup.ro — site nou

Astro (versiunea fixată în `package.json`, acum 7.3.2), static, două limbi (RO la rădăcină, EN sub `/en`), două teme. Producția rulează pe un server propriu cu Dokploy (docker-compose.yml), în spatele Cloudflare; pașii sunt în `NOTES.md` § Deploy pe Dokploy.

- Specificația: `spec/` (sursa de adevăr, neatinsă în afara deciziilor din `NOTES.md`).
- Regulile de lucru: `CLAUDE.md`.
- Deciziile, verificările pe faze, placeholder-ele rămase: `NOTES.md`.
- Capturi și rapoarte de calitate, pe faze: `qa/`.

## Comenzi

```
npm install          # Node 24 (vezi .nvmrc); Astro 7 cere ≥ 22.12
npm run dev          # http://localhost:4321
npm run build        # dist/
npm run preview      # servește dist/ local
npm run check        # astro check (TypeScript strict)
node qa/capture.mjs <faza> <cale> [<cale>…]   # capturi Playwright la 375/768/1024/1440, light și dark
node qa/lead-email.test.mjs                   # funcția /api/lead, fără cheie Resend

# imaginea de producție, local, pe http://localhost:8080 (nginx + /api/lead)
docker compose -f docker-compose.yml -f compose.local.yml --env-file .env --env-file .dev.vars up --build
```

## Variabile

- `.env` (local, neversionat): cheile publice `PUBLIC_TURNSTILE_SITE_KEY`, `PUBLIC_GA4_ID`. Exemplu în `.env.example`.
- `.dev.vars` (local, neversionat): secretele serviciului `/api/lead` (`server/`), pentru testul local cu Docker sau cu `node --env-file=.dev.vars server/api.ts`. Exemplu în `.dev.vars.example`. În producție stau în Dokploy → Environment.
