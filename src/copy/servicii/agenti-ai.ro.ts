/** /servicii/agenti-ai. Exemplul real: agentul din BitUp Helpdesk, pe WhatsApp (detaliile: [DE CONFIRMAT]). Partener Anthropic. */
import type { ServiceCopy } from './types';
import { cta, costFaq } from './comun.ro';

export const agentiAi: ServiceCopy = {
  key: 'aiAgents',
  meta: {
    title: 'Agenți AI pentru cererile repetitive · BitUp',
    description: 'Agenți AI care preiau cererile repetitive, răspund din datele firmei și predau omului doar ce cere o decizie. BitUp este partener Anthropic.',
  },
  hero: {
    label: 'Agenți AI',
    h1: 'Un agent AI preia cererile care se repetă',
    lead: 'Agentul răspunde la cererile repetitive din datele firmei și predă omului doar ce cere o decizie. Exemplul nostru: agentul din BitUp Helpdesk, pe WhatsApp.',
  },
  problem: {
    h2: 'Aceleași întrebări, în fiecare zi',
    paragraphs: [
      'Unde e comanda mea? Ce documente trebuie? Când vine tehnicianul? Răspunsurile sunt deja în sistemele firmei, dar le caută un om, de fiecare dată.',
      'Timpul lui se duce pe căutat, nu pe cazurile care chiar au nevoie de el.',
    ],
  },
  cost: {
    h2: 'Cât costă răspunsurile date de mână',
    paragraphs: [
      'Dacă un coleg răspunde la 30 de cereri pe zi, câte 4 minute fiecare, sunt două ore pe zi, adică aproximativ 40 de ore pe lună.',
      'Cererile care vin seara sau în weekend așteaptă până în prima zi lucrătoare.',
    ],
  },
  wellRun: {
    h2: 'Cum lucrează un agent AI bine făcut',
    items: [
      { title: 'Răspunde din datele firmei', text: 'Caută în sistemele firmei, nu inventează. Dacă nu găsește răspunsul, spune asta.' },
      { title: 'Predă omului ce cere o decizie', text: 'Cazurile neobișnuite și tot ce cere o decizie ajung la un coleg, cu tot contextul.' },
      { title: 'Lucrează unde sunt oamenii', text: 'Pe canalul pe care îl folosesc deja clienții sau colegii, de exemplu WhatsApp.' },
      { title: 'Are acces doar unde trebuie', text: 'Drepturile agentului se limitează la datele de care are nevoie, ca la orice cont de serviciu.' },
    ],
  },
  steps: {
    h2: 'Ce facem concret',
    items: [
      { title: 'Alegem cererile', text: 'Pornim de la cererile care se repetă cel mai des.' },
      { title: 'Legăm datele', text: 'Conectăm agentul la sistemele din care trebuie să răspundă, cu drepturi minime.' },
      { title: 'Testăm cu echipa ta', text: 'Agentul răspunde întâi sub supraveghere, până când răspunsurile sunt cele corecte.' },
      { title: 'Îl ținem la zi', text: 'Urmărim răspunsurile și îl ajustăm când se schimbă procesele.' },
    ],
  },
  projects: { h2: 'Proiecte legate' },
  faq: {
    h2: 'Întrebări frecvente',
    items: [
      { q: 'Agentul poate greși?', a: 'Da, ca orice sistem. De aceea răspunde doar din datele firmei, iar tot ce cere o decizie ajunge la un om.' },
      { q: 'Care e diferența față de o automatizare?', a: 'O automatizare face mereu același lucru, după reguli fixe. Agentul citește cererea, caută răspunsul în datele firmei și predă omului ce nu poate decide singur.' },
      { q: 'Cu cine lucrați pentru AI?', a: 'BitUp este partener Anthropic.' },
      costFaq('câte cereri preia agentul și din ce sisteme răspunde'),
    ],
  },
  cta,
};
