/**
 * /nis2. Faptele legale: copy.md § NIS2 în România (confirmate de Marius, 28 octombrie 2026). Ton factual, fără alarmism.
 * BitUp face consultanță și implementarea tehnică a controalelor, NU audit; auditul îl face un auditor acreditat de DNSC.
 * Alte termene, ordine DNSC sau amenzi în lei: [DE CONFIRMAT], deci nu apar.
 */
import { cta, costFaq } from './comun.ro';

export const nis2 = {
  meta: {
    title: 'NIS2 în România: încadrare, pregătire, implementare · BitUp',
    description: 'Ce cere NIS2 în România, încadrarea gratuită, NIS2 Ready și consultanța BitUp pentru pregătire și implementare. Auditul îl face un auditor acreditat.',
  },
  hero: {
    label: 'NIS2',
    h1: 'NIS2: află dacă te privește și pregătește-te',
    lead: 'OUG nr. 155/2024 transpune Directiva NIS2 în România. Te ajutăm să afli dacă firma intră sub lege, să te pregătești și să implementezi controalele. Auditul îl face un auditor acreditat de DNSC.',
    primary: { label: 'Fă încadrarea gratuită', href: 'https://nis2.cyberxscore.ro' },
    secondaryNote: 'Durează aproximativ 3 minute. Rezultatul e o estimare; încadrarea finală o face DNSC.',
  },
  law: {
    h2: 'Ce spune legea',
    basics: {
      caption: 'Cadrul legal în România',
      columns: [{ label: 'Subiect' }, { label: 'Ce prevede' }],
      rows: [
        ['Legea', 'OUG nr. 155/2024, care transpune Directiva NIS2, aprobată cu modificări prin Legea nr. 124/2025'],
        ['Autoritatea', 'DNSC'],
        ['Înregistrarea', 'Pe platforma NIS2@RO'],
      ],
    },
    incidents: {
      caption: 'Raportarea incidentelor la DNSC',
      columns: [{ label: 'Etapa' }, { label: 'Termen' }],
      rows: [
        ['Avertizare timpurie', '24 de ore'],
        ['Notificare', '72 de ore'],
        ['Raport final', 'o lună'],
      ],
    },
    fines: {
      caption: 'Amenzile maxime din directivă',
      columns: [{ label: 'Entități' }, { label: 'Plafon' }],
      rows: [
        ['Esențiale', 'Până la 10 mil. € sau 2 % din cifra de afaceri globală'],
        ['Importante', 'Până la 7 mil. € sau 1,4 % din cifra de afaceri globală'],
      ],
    },
  },
  steps: {
    h2: 'Pașii, în ordine',
    items: [
      { title: 'Încadrarea', text: 'Pe nis2.cyberxscore.ro afli în aproximativ 3 minute dacă firma pare să intre sub NIS2. E o estimare; încadrarea finală o face DNSC.' },
      { title: 'Înregistrarea', text: 'Dacă firma intră sub lege, se înregistrează pe platforma NIS2@RO.' },
      { title: 'Pregătirea', text: 'În NIS2 Ready lucrăm împreună pe guvernanță, diagnostic, documentație cu ghid pe fiecare control, aprobarea documentelor și autoevaluare.' },
      { title: 'Implementarea', text: 'Implementăm tehnic controalele și pregătim firma pentru audit.' },
    ],
  },
  roles: {
    h2: 'Ce facem noi și ce nu facem',
    we: {
      title: 'Facem',
      items: [
        'Consultanță pentru pregătirea NIS2',
        'Implementarea tehnică a controalelor',
        'Platforma de lucru NIS2 Ready, pe nis2-ready.cyberxscore.ro',
        'Pregătirea firmei pentru audit',
      ],
    },
    notWe: {
      title: 'Nu facem',
      items: [
        'Auditul: îl face un auditor acreditat de DNSC, independent de consultant',
        'Încadrarea finală: o face DNSC',
      ],
    },
  },
  projects: { h2: 'Instrumentele noastre' },
  faq: {
    h2: 'Întrebări frecvente',
    items: [
      { q: 'Faceți și auditul?', a: 'Nu. Auditul îl face un auditor acreditat de DNSC, independent de consultant. Noi facem consultanța și implementarea tehnică a controalelor și pregătim firma pentru audit.' },
      { q: 'Încadrarea de pe nis2.cyberxscore.ro e definitivă?', a: 'Nu. Durează aproximativ 3 minute și dă o estimare. Încadrarea finală o face DNSC.' },
      { q: 'În cât timp se raportează un incident?', a: 'La DNSC: avertizarea timpurie în 24 de ore, notificarea în 72 de ore, raportul final într-o lună.' },
      { q: 'Ce este NIS2 Ready?', a: 'Platforma de lucru dintre client și consultant, pentru clienții care aleg consultanța BitUp pentru NIS2: guvernanță, diagnostic, documentație cu ghid pe fiecare control, aprobarea documentelor și autoevaluare. Pregătește firma pentru audit, nu îl face.' },
      costFaq('dimensiunea firmei și de cât de departe e de cerințe'),
    ],
  },
  cta,
};
