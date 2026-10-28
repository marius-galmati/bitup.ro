/** /servicii/dezvoltare-software. ProQ ca dovadă (copy.md + textul aprobat de Marius pe 28 octombrie 2026). */
import type { ServiceCopy } from './types';
import { cta, costFaq } from './comun.ro';

export const dezvoltare: ServiceCopy = {
  key: 'software',
  meta: {
    title: 'Dezvoltare software: aplicații și panouri · BitUp',
    description: 'Aplicații la comandă, platforme și panouri de indicatori care aduc datele din toate sistemele firmei într-un singur loc.',
  },
  hero: {
    label: 'Dezvoltare software',
    h1: 'Aplicații făcute pe felul în care lucrează firma ta',
    lead: 'Construim aplicații la comandă, platforme și panouri de indicatori care aduc datele din toate sistemele într-un singur loc. ProQ, software-ul nostru pentru industria auto, e construit integral de noi.',
  },
  problem: {
    h2: 'Datele sunt peste tot, raportul se face de mână',
    paragraphs: [
      'Vânzările sunt în CRM, facturile în programul de contabilitate, producția într-un Excel. Raportul de luni îl face cineva copiind cifre dintr-un loc în altul.',
      'Programele cumpărate acoperă o parte din ce ai nevoie. Restul se face pe lângă, în tabele.',
    ],
  },
  cost: {
    h2: 'Cât costă raportul făcut de mână',
    paragraphs: [
      'Dacă cineva petrece o zi pe săptămână adunând cifre, sunt aproximativ 4 zile pe lună. Iar cifrele ajung la tine cu întârziere.',
      'Fiecare copiere de mână e și o ocazie de greșeală, care se vede abia când cineva ia o decizie pe ea.',
    ],
  },
  wellRun: {
    h2: 'Cum arată când datele sunt într-un singur loc',
    items: [
      { title: 'Un panou de indicatori', text: 'Cifrele din toate sistemele, la zi, pe un singur ecran.' },
      { title: 'O aplicație pe procesul tău', text: 'Construită pe pașii pe care echipa îi face deja, nu invers.' },
      { title: 'Legată de ce ai', text: 'Aplicația citește și scrie în programele existente, așa că datele se introduc o singură dată.' },
      { title: 'Securitatea, de la început', text: 'Accesul, jurnalele și backup-ul sunt gândite odată cu aplicația, nu adăugate la final.' },
    ],
  },
  steps: {
    h2: 'Ce facem concret',
    items: [
      { title: 'Înțelegem procesul', text: 'Ne uităm la cum lucrează echipa: ce intră, ce iese, unde se blochează.' },
      { title: 'Proiectăm', text: 'Stabilim ce construim, ce legăm de programele existente și ce nu e nevoie să construim.' },
      { title: 'Construim pe etape', text: 'Livrăm în pași mici, pe care îi vezi și îi folosești.' },
      { title: 'Administrăm', text: 'După lansare, aplicația rămâne în grija aceleiași echipe.' },
    ],
  },
  projects: { h2: 'Proiecte legate' },
  faq: {
    h2: 'Întrebări frecvente',
    items: [
      { q: 'Ce fel de aplicații construiți?', a: 'Aplicații la comandă, platforme și panouri de indicatori care aduc datele din toate sistemele într-un singur loc. ProQ, software pentru planificarea calității (APQP) în industria auto, e construit integral de noi și folosit ca SaaS.' },
      { q: 'Puteți lega aplicația de programele pe care le avem?', a: 'Da. Legătura cu programele existente face parte din proiect, ca datele să se introducă o singură dată.' },
      costFaq('ce trebuie să facă aplicația, cu ce programe se leagă'),
    ],
  },
  cta,
};
