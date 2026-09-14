/** Structura paginilor legale (13, 14, 15): text în blocuri simple, cu linkuri interne pe chei de rută, fără HTML în copy. */
import type { RouteKey } from '../i18n';

export type Inline = string | { b: string } | { a: string; to: RouteKey } | { code: string };
export type Block =
  | { p: Inline[] }
  | { ul: Inline[][] }
  | { table: { head: string[]; rows: Inline[][][] } }
  | { button: 'consent'; label: string };

export interface LegalCopy {
  title: string;
  description: string;
  h1: string;
  sections: { id: string; h2: string; blocks: Block[] }[];
}
