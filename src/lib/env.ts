/**
 * Mediul de build. Imaginea Docker de producție (Dockerfile, etapa `build`) setează SITE_ENV=production.
 * Local (fără variabilă) sunt vizibile draft-urile și paginile /qa/*; în producție, nu.
 */
export const siteEnv = process.env.SITE_ENV ?? 'local';
export const isProduction = siteEnv === 'production';
export const isStaging = !isProduction;
