// ARHITECTURA.md § Colecții. Limba unei intrări se deduce din primul segment al id-ului (ro/…, en/…).
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod'; // Zod 4; `z` din 'astro:content' e deprecat din Astro 7
import { glob } from 'astro/loaders';

const cases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cases' }), // id-ul devine „ro/cosmio”, „en/cosmio”
  schema: () =>
    z.object({
      title: z.string(),            // titlul lung din hero
      client: z.string(),           // „Cosmio Fintech SRL” / „ProQ (produs BitUp)”
      kicker: z.string(),           // „Cloud, backup și disaster recovery”
      summary: z.string(),          // subtitlul din hero
      logo: z.string().optional(),  // cale în public/ sau URL extern aprobat
      logoDark: z.boolean().default(false), // caseta logo pe fundal închis
      facts: z.array(z.object({ k: z.string(), v: z.string() })),
      numbers: z.array(z.object({ v: z.string(), unit: z.string().optional(), k: z.string() })).optional(),
      service: z.enum(['suport-it', 'securitate', 'automatizari']),
      order: z.number(),
      draft: z.boolean().default(false),
      consent: z.string().optional(), // „acord semnat 2026-09-xx” — obligatoriu când draft=false și client ≠ BitUp
      metaTitle: z.string().optional(),       // <title> din head, când regula implicită dă peste 60 de caractere; H1-ul rămâne `title`
      metaDescription: z.string().optional(), // description din head, când `summary`/`description` nu încap în 155
      footnote: z.string().optional(), // nota de subsol din fișierul de conținut („randată de layout, nu din corp”), sub ultima secțiune
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }), // „ro/cum-ne-am-construit-propriul-helpdesk”, „en/how-we-built-our-own-helpdesk”
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: z.string().default('Marius Galmati'),
      tags: z.array(z.string()).default([]),
      heroImage: image().optional(),
      draft: z.boolean().default(false),
      translationOf: z.string().optional(), // slug-ul perechii din cealaltă limbă, pentru comutatorul de limbă și hreflang
      metaTitle: z.string().optional(),       // <title> din head, când regula implicită dă peste 60 de caractere; H1-ul rămâne `title`
      metaDescription: z.string().optional(), // description din head, când `summary`/`description` nu încap în 155
    }),
});

/**
 * Proiectele (brief § 5, /proiecte): studiile de caz pentru clienți și produsele construite de BitUp.
 * Faza 3 folosește doar datele din frontmatter, ca paginile de servicii să-și listeze proiectele legate; paginile
 * /proiecte și /proiecte/cosmio (cu corpul textului) vin în faza 4. Id-ul: „ro/cosmio”, „en/cosmio”.
 * Faptele: doar din copy.md sau din studiul de caz aprobat; ce lipsește, [DE CONFIRMAT].
 */
const SERVICE_KEYS = ['security', 'infrastructure', 'software', 'automation', 'aiAgents', 'managedIt', 'cloud', 'nis2'] as const;
const proiecte = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/proiecte' }),
  schema: () =>
    z.object({
      title: z.string(),
      kind: z.enum(['client', 'produs']),     // „Pentru clienți” / „Construite de noi”
      summary: z.string(),                    // o frază, pentru cardurile de pe paginile de servicii
      services: z.array(z.enum(SERVICE_KEYS)), // cheile din src/i18n/routes.ts unde apare proiectul
      anchor: z.string(),                     // ancora secțiunii de pe /proiecte
      url: z.url().optional(),       // site-ul produsului
      order: z.number(),
      consent: z.string().optional(),         // obligatoriu pentru clienți: acordul scris de publicare
      draft: z.boolean().default(false),
    }),
});

export const collections = { cases, blog, proiecte };
