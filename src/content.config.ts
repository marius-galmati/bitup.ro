// ARHITECTURA.md § Colecții. Limba unei intrări se deduce din primul segment al id-ului (ro/…, en/…).
import { defineCollection, z } from 'astro:content';
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
    }),
});

export const collections = { cases, blog };
