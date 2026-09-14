/**
 * Mediul de build. Cloudflare Pages setează CF_PAGES_BRANCH la build; `main` = producție.
 * Local și pe staging (orice altă ramură) sunt vizibile draft-urile și pagina /qa/componente.
 */
export const branch = process.env.CF_PAGES_BRANCH ?? 'local';
export const isProduction = branch === 'main';
export const isStaging = !isProduction;
