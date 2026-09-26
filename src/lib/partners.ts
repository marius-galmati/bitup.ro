/**
 * Badge-urile de partener (homepage § Parteneri). Fișierele oficiale se salvează în
 * `public/logos/parteneri/<slug>.svg`, cu slug-ul derivat din numele badge-ului
 * („Microsoft Partner” → `microsoft-partner.svg`), ca în `spec/assets/logos/README.md`.
 * Până apar fișierele, rândul rămâne text cu placeholder-ul `[[LOGO_PARTENERI]]` vizibil
 * (CLAUDE.md regula 3, `spec/continut/01-acasa.md` § 9: fără logo-uri improvizate).
 */
import { existsSync } from 'node:fs';

export const partnerSlug = (name: string) =>
  name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Calea logo-ului dacă fișierul există în `public/`, altfel `null` (rândul devine text). */
export function partnerLogo(name: string): { src: string } | null {
  const src = `/logos/parteneri/${partnerSlug(name)}.svg`;
  return existsSync(`public${src}`) ? { src } : null;
}
