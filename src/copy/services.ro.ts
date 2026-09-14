/** Textul paginii /servicii, copiat exact din spec/continut/02-servicii-index.md. */
import type { RouteKey } from '../i18n/routes';

export interface ServicesCopy {
  title: string; description: string;
  hero: { eyebrow: string; h1: string; lead: string };
  groups: { title: string; position: string; includesLabel: string; includes: string; forLabel: string; forWho: string; link: string; route: RouteKey }[];
  combine: { eyebrow: string; h2: string; paragraphs: string[] };
  not: { eyebrow: string; h2: string; items: string[] };
}

export const servicesRo: ServicesCopy = {
  title: 'Servicii IT: suport, securitate, automatizări · BitUp',
  description: 'Trei grupuri de servicii care merg împreună: suport și administrare IT, securitate și continuitate, automatizări și software. Un singur responsabil.',
  hero: {
    eyebrow: 'Servicii',
    h1: 'Trei grupuri de servicii. Un singur responsabil.',
    lead: 'Le poți lua separat. Merg cel mai bine împreună: securitatea și backup-ul țin de cum administrezi IT-ul, nu se adaugă după.',
  },
  groups: [
    {
      title: 'Suport și administrare IT',
      position: 'Abonament lunar. Preluăm tot ce ține de calculatoare, servere, rețea, cloud și Microsoft 365, și răspundem de rezultat.',
      includesLabel: 'Include:', includes: 'suport pentru angajați (WhatsApp, cu Cipri și un om), administrare servere și stații, Microsoft 365, actualizări, antivirus/EDR administrat, cloud și hosting, alegerea și instalarea echipamentelor, raport lunar.',
      forLabel: 'Pentru:', forWho: 'firme de 10–100 de angajați care vor să nu se mai gândească la IT.',
      link: 'Vezi ce include abonamentul', route: 'itSupport',
    },
    {
      title: 'Securitate și continuitate',
      position: 'Protecția pe care o faci înainte, nu după. Și dovada că poți reveni când se întâmplă ceva.',
      includesLabel: 'Include:', includes: 'protecție împotriva atacurilor, accese și parole sub control, backup testat, plan de continuitate, audit de securitate, NIS2 și ISO 27001 traduse în pași concreți.',
      forLabel: 'Pentru:', forWho: 'orice firmă care are date fără de care se oprește; obligatoriu pentru cele cu cerințe de conformitate.',
      link: 'Vezi ce protejăm și cum', route: 'security',
    },
    {
      title: 'Automatizări și software',
      position: 'Când un proces trăiește în Excel, pe email și în capul unui om, îl mutăm într-un sistem.',
      includesLabel: 'Include:', includes: 'automatizări între aplicațiile pe care le ai deja, asistenți AI cu scop clar, aplicații făcute pentru voi când nu există nimic potrivit, integrări.',
      forLabel: 'Pentru:', forWho: 'firme care pierd ore pe săptămână cu aceleași lucruri făcute de mână.',
      link: 'Vezi exemple reale', route: 'automation',
    },
  ],
  combine: {
    eyebrow: 'Cum se combină',
    h2: 'De ce le ținem împreună',
    paragraphs: [
      'Cele mai multe firme cu care lucrăm încep cu abonamentul de suport. E lucrul de care au nevoie zilnic. Securitatea vine la pachet: un server nu se administrează fără să fie securizat și nu vedem de ce ai plăti separat. Backup-ul, la fel.',
      'Automatizările și software-ul vin mai târziu, din relație. După câteva luni în care vedem cum lucrează firma ta, ne dăm seama unde se pierd orele. Atunci are sens să vorbim despre ele, nu la prima întâlnire.',
      'Poți începe și invers: cu un audit de securitate sau cu o automatizare punctuală. Dacă merge bine, abonamentul vine natural. Nu împingem pe nimeni spre el.',
    ],
  },
  not: {
    eyebrow: 'Ca să fie clar',
    h2: 'Ce nu facem',
    items: [
      'Nu vindem echipamente fără să le și instalăm și să răspundem de ele după.',
      'Nu luăm proiecte de dezvoltare dacă nu putem asigura și mentenanța.',
      'Nu promitem „securitate totală”. Reducem riscul și pregătim revenirea. Cine promite altceva minte.',
      'Nu lucrăm cu firme care vor doar „să vină cineva când se strică”. Pentru asta există alții, mai ieftini, și e în regulă.',
    ],
  },
};
