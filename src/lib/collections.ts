/**
 * Helpers pentru colecții (PLAN Faza 3): vizibilitate (draft doar pe staging), slug din id, timp de citit,
 * meta pentru intrări (NOTES § Răspunsuri 9: title „{client} · {kicker} · BitUp”, description din summary tăiată la ultima propoziție întreagă ≤ 155),
 * logo-ul local al clientului (până e salvat în public/logos/, rămâne placeholder-ul din PLACEHOLDERS.md).
 */
import { existsSync } from 'node:fs';
import { getCollection, type CollectionEntry } from 'astro:content';
import { isProduction } from './env';
import type { Locale } from '../i18n';

export const slugOf = (id: string) => id.replace(/^(ro|en)\//, '');

/** Intrările vizibile în limba dată: draft-urile apar doar în afara producției (CF_PAGES_BRANCH ≠ main). */
export async function visibleCases(lang: Locale): Promise<CollectionEntry<'cases'>[]> {
  const list = await getCollection('cases', (e) => e.id.startsWith(`${lang}/`) && (!e.data.draft || !isProduction));
  return list.sort((a, b) => a.data.order - b.data.order);
}
export async function visiblePosts(lang: Locale): Promise<CollectionEntry<'blog'>[]> {
  const list = await getCollection('blog', (e) => e.id.startsWith(`${lang}/`) && (!e.data.draft || !isProduction));
  return list.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}
/** Există (în orice stare) un caz draft în limba dată? Pentru rândul „Următorul caz…”. */
export async function hasDraftCase(lang: Locale): Promise<boolean> {
  return (await getCollection('cases', (e) => e.id.startsWith(`${lang}/`) && e.data.draft)).length > 0;
}

/** Timp de citit: cuvintele din corpul articolului în limba lui, la 200 de cuvinte pe minut, minimum 1. */
export const readMinutes = (body: string | undefined) => Math.max(1, Math.round((body ?? '').trim().split(/\s+/).length / 200));

/** Descrierea meta: textul întreg dacă încape în 155; altfel tăiat la ultima propoziție întreagă care încape, fără rescriere. */
export function metaDescription(text: string, max = 155): string {
  const t = text.trim();
  if (t.length <= max) return t;
  const head = t.slice(0, max + 1);
  const cut = Math.max(head.lastIndexOf('. '), head.lastIndexOf('.\n'), head.endsWith('.') ? head.length - 1 : -1);
  return cut > 0 ? t.slice(0, cut + 1) : t; // fără propoziție întreagă care să încapă: textul rămâne întreg și e raportat ca peste limită
}

/** Meta unui studiu de caz. */
export function caseMeta(entry: CollectionEntry<'cases'>) {
  return { title: `${entry.data.client} · ${entry.data.kicker} · BitUp`, description: metaDescription(entry.data.summary) };
}
/** Meta unui articol: titlul articolului cu sufixul de site, descrierea din frontmatter (tăiată la propoziție dacă depășește 155). */
export function postMeta(entry: CollectionEntry<'blog'>) {
  return { title: `${entry.data.title} · BitUp`, description: metaDescription(entry.data.description) };
}

/** Primele două propoziții din summary (cardurile din 08 și homepage § 8). */
export const twoSentences = (s: string) => s.split(/(?<=\.)\s+/).slice(0, 2).join(' ');

/** Logo-ul clientului: calea din frontmatter dacă fișierul există în public/, altfel numele placeholder-ului ([[LOGO_PROQ_LOCAL]], [[LOGO_COSMIO_LOCAL]]). */
export function caseLogo(entry: CollectionEntry<'cases'>): { src: string } | { placeholder: string } {
  const logo = entry.data.logo;
  if (logo && existsSync(`public${logo}`)) return { src: logo };
  return { placeholder: `[[LOGO_${slugOf(entry.id).toUpperCase()}_LOCAL]]` };
}
