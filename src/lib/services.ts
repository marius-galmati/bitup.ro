/**
 * Cele 6 servicii, în ordinea din brief § 5 (de jos în sus în diagramă, apoi IT administrat), cu ruta și iconița.
 * Meniul, subsolul, pagina Acasă și hub-ul le iau de aici. Numele vin din dicționar (`layers.items`, `layers.managed`).
 * Iconițele sunt cele din stiva din hero, pentru tot site-ul (Marius, 28 octombrie 2026); IT administrat: headset.
 */
import { t, type Locale, type RouteKey } from '../i18n';

export const SERVICES = [
  { key: 'security', icon: 'shield' },
  { key: 'infrastructure', icon: 'cloud' },
  { key: 'software', icon: 'code-xml' },
  { key: 'automation', icon: 'zap' },
  { key: 'aiAgents', icon: 'sparkles' },
  { key: 'managedIt', icon: 'headset' },
] as const satisfies readonly { key: RouteKey; icon: string }[];

export function services(lang: Locale) {
  const l = t(lang).layers;
  return SERVICES.map((s, i) => ({ ...s, name: i < 5 ? l.items[i] : l.managed }));
}
