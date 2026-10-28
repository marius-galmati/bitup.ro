/**
 * Textele paginilor de servicii (faza 3). Structura fixă din brief § 5: problema clientului → ce îl costă → cum arată
 * varianta bine organizată → ce facem concret (pașii) → proiecte legate → întrebări frecvente → îndemnul spre formular.
 * Un fișier pe pagină și pe limbă (`<cheie>.ro.ts`; EN în faza 5, același tip, deci `astro check` prinde ce lipsește).
 * Faptele vin doar din .claude/skills/bitup-brand/references/copy.md și din brief; ce lipsește e [DE CONFIRMAT: …].
 */
import type { RouteKey } from '../../i18n';

export interface Item { title: string; text: string }
export interface Link { label: string; href: string }

/** O secțiune în plus, specifică paginii (BitUp Cloud pe Infrastructură, garanțiile pe IT administrat). */
export interface ExtraSection {
  id: string;
  label: string;
  h2: string;
  paragraphs: string[];
  /** Cifre-cheie, doar din copy.md. */
  stats?: { value: string; caption: string }[];
  /** Listă de puncte (de exemplu garanțiile). */
  items?: Item[];
  link?: Link;
}

export interface ServiceCopy {
  /** Cheia rutei (src/i18n/routes.ts) și a proiectelor legate (colecția `proiecte`). */
  key: RouteKey;
  meta: { title: string; description: string };
  hero: { label: string; h1: string; lead: string };
  problem: { h2: string; paragraphs: string[] };
  cost: { h2: string; paragraphs: string[] };
  wellRun: { h2: string; intro?: string; items: Item[] };
  /** Secțiunea în plus stă după „varianta bine organizată” și înaintea pașilor. */
  extra?: ExtraSection;
  steps: { h2: string; intro?: string; items: Item[] };
  projects: { h2: string; intro?: string; empty?: string };
  faq: { h2: string; items: { q: string; a: string }[] };
  cta: { label: string; title: string; text: string };
}
