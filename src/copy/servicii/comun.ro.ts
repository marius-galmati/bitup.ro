/**
 * Texte comune paginilor de servicii (RO): îndemnul final (oferta principală, brief § 4), răspunsul la „Cât costă?”
 * și descrierile scurte ale celor 6 servicii (hub, Acasă). Faptele: copy.md § Fapte aprobate.
 */
import type { RouteKey } from '../../i18n';

export const cta = {
  label: 'Recomandare gratuită',
  title: 'Scrie-ne problema de IT care te costă cel mai mult.',
  text: 'În 24 de ore lucrătoare primești o recomandare scrisă: ce am face noi în locul tău, chiar dacă nu lucrăm împreună.',
};

/** „Cât costă?”: fără prețuri (nu sunt în copy.md); trimite la oferta principală. */
export const costFaq = (ce: string) => ({
  q: 'Cât costă?',
  a: `Depinde de ${ce} și de punctul de pornire. Scrie-ne problema și, în 24 de ore lucrătoare, primești o recomandare scrisă, gratuită, cu ce am face noi în locul tău.`,
});

/** Descrierile scurte ale serviciilor (copy.md § Serviciile, ca straturi), în ordinea din brief § 5. */
export const descrieri: Record<RouteKey & ('security' | 'infrastructure' | 'software' | 'automation' | 'aiAgents' | 'managedIt'), string> = {
  security: 'Evaluarea riscului și a maturității, ISO 27001 și NIS2, protecția stațiilor (EDR/XDR), actualizări automate.',
  infrastructure: 'Microsoft 365, Active Directory hibrid, rețele, servere și BitUp Cloud, cloudul nostru privat.',
  software: 'Aplicații și panouri de indicatori care aduc datele din toate sistemele într-un singur loc.',
  automation: 'Programe care comunică între ele, așa că datele se introduc o singură dată.',
  aiAgents: 'AI care preia munca repetitivă și predă omului doar ce cere o decizie.',
  managedIt: 'Preluăm toată infrastructura firmei și suportul pentru utilizatori. Un singur partener, în locul mai multor furnizori.',
};
