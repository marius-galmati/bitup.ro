# syntax=docker/dockerfile:1
# Două imagini din același fișier (ARHITECTURA § Deploy), alese cu `target` în docker-compose.yml:
#   web — nginx cu dist/ (site-ul static construit aici) și headerele/redirecturile din deploy/nginx/
#   api — Node, doar server/ (funcția /api/lead), fără node_modules: n-are dependențe

FROM node:24-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
# Fără devDependencies: build-ul are nevoie doar de Astro și integrări; Playwright, Lighthouse și restul sunt unelte de QA locale.
RUN npm ci --omit=dev --no-audit --no-fund
COPY . .
# Cheile PUBLICE intră în HTML la build (astro:env, context client). Secretele nu trec niciodată pe aici.
ARG PUBLIC_TURNSTILE_SITE_KEY
ARG PUBLIC_GA4_ID
ENV SITE_ENV=production \
    ASTRO_TELEMETRY_DISABLED=1 \
    PUBLIC_TURNSTILE_SITE_KEY=$PUBLIC_TURNSTILE_SITE_KEY \
    PUBLIC_GA4_ID=$PUBLIC_GA4_ID
# dist/qa/ are doar fișierele din public/qa/ (captura WhatsApp a paginii de QA); paginile /qa/* nu se generează în producție.
RUN npm run build && rm -rf dist/qa

FROM nginx:1.28-alpine AS web
# Fără paginile implicite ale imaginii (index.html, 50x.html): în folder rămâne doar dist/.
RUN rm -rf /usr/share/nginx/html/*
COPY deploy/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY deploy/nginx/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html

FROM node:24-alpine AS api
WORKDIR /app
ENV NODE_ENV=production
# package.json doar pentru "type": "module" (server/*.ts se încarcă drept ESM).
COPY package.json ./
COPY server/ ./server/
USER node
EXPOSE 3000
CMD ["node", "server/api.ts"]
