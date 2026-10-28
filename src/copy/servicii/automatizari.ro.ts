/** /servicii/automatizari. Fără proiect publicabil deocamdată: [DE CONFIRMAT]. */
import type { ServiceCopy } from './types';
import { cta, costFaq } from './comun.ro';

export const automatizari: ServiceCopy = {
  key: 'automation',
  meta: {
    title: 'Automatizări: programe care comunică între ele · BitUp',
    description: 'Integrări între ERP, CRM, contabilitate, email și Excel. Datele se introduc o singură dată, iar programele și le trimit singure.',
  },
  hero: {
    label: 'Automatizări',
    h1: 'Datele se introduc o singură dată',
    lead: 'Legăm programele pe care le folosești deja: ERP, CRM, contabilitate, email, Excel. Ce se scrie într-un loc ajunge singur în celelalte.',
  },
  problem: {
    h2: 'Aceeași comandă, scrisă de trei ori',
    paragraphs: [
      'Comanda vine pe email. Cineva o scrie în CRM, apoi în ERP, apoi în Excelul de producție. Factura se face din nou, de mână, în programul de contabilitate.',
      'Fiecare program e bun în parte. Între ele, legătura e un om care copiază.',
    ],
  },
  cost: {
    h2: 'Cât costă copierea',
    paragraphs: [
      'Ia o operație care se repetă, de exemplu introducerea unei comenzi. Dacă durează 10 minute și ai 6 comenzi pe zi, e o oră pe zi, adică aproximativ 20 de ore pe lună.',
      'La fiecare copiere poate apărea o greșeală: un cod de produs, o cantitate, o adresă. Se vede abia la livrare sau la factură.',
    ],
  },
  wellRun: {
    h2: 'Cum arată când programele comunică',
    items: [
      { title: 'O singură introducere', text: 'Comanda se scrie o dată. CRM-ul, ERP-ul și contabilitatea o primesc singure.' },
      { title: 'Excelul rămâne unde ajută', text: 'Tabelele utile rămân. Cele care doar mută date dintr-un program în altul dispar.' },
      { title: 'Erorile se văd pe loc', text: 'Când o integrare nu trece, cineva e anunțat atunci, nu la sfârșitul lunii.' },
      { title: 'Construite pe securitate', text: 'Integrările folosesc conturi cu drepturi minime și intră în backup, ca restul sistemului.' },
    ],
  },
  steps: {
    h2: 'Ce facem concret',
    items: [
      { title: 'Urmărim datele', text: 'Vedem unde intră informația, prin ce programe trece și unde se copiază de mână.' },
      { title: 'Alegem ce legăm', text: 'Începem cu operația care consumă cele mai multe ore.' },
      { title: 'Construim integrarea', text: 'Legăm programele prin conexiunile pe care le au deja sau, unde lipsesc, construim una.' },
      { title: 'O ținem în funcțiune', text: 'Ajustăm integrările când se schimbă un program sau un proces.' },
    ],
  },
  projects: {
    h2: 'Proiecte legate',
    empty: '[DE CONFIRMAT: un proiect de automatizare care poate fi publicat, cu acordul clientului sau anonimizat]',
  },
  faq: {
    h2: 'Întrebări frecvente',
    items: [
      { q: 'Trebuie să schimbăm programele pe care le avem?', a: 'De obicei nu. Pornim de la programele existente și le legăm între ele.' },
      { q: 'Ce se întâmplă când se schimbă un program?', a: 'Ajustăm integrarea. Automatizările rămân în grija aceleiași echipe care le-a construit.' },
      { q: 'Care e diferența față de un agent AI?', a: 'O automatizare face mereu același lucru, după reguli fixe. Un agent AI citește cererea, caută în datele firmei și răspunde, iar ce cere o decizie ajunge la un om.' },
      costFaq('câte programe legăm și câte operații automatizăm'),
    ],
  },
  cta,
};
