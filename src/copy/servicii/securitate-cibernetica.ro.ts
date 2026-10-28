/** /servicii/securitate-cibernetica. Fundația. Referința enterprise: o singură dată (pașii). NIS2: consultanță, nu audit. */
import type { ServiceCopy } from './types';
import { cta, costFaq } from './comun.ro';

export const securitate: ServiceCopy = {
  key: 'security',
  meta: {
    title: 'Securitate cibernetică pentru companii · BitUp',
    description: 'Evaluarea riscului, ISO 27001 și NIS2, protecția stațiilor, backup testat și plan de răspuns la incidente: fundația pe care stă restul IT-ului.',
  },
  hero: {
    label: 'Securitate cibernetică',
    h1: 'Securitatea e fundația pe care stă restul IT-ului',
    lead: 'Evaluăm riscul, protejăm stațiile și serverele, testăm backup-ul și pregătim planul pentru ziua în care ceva nu merge. Pentru ISO 27001 și NIS2 facem consultanță și implementare.',
  },
  problem: {
    h2: 'Securitatea nu e a nimănui',
    paragraphs: [
      'Antivirusul l-a instalat cineva acum câțiva ani. Backup-ul rulează, dar nimeni n-a încercat o restaurare. Parola de administrator o știu prea mulți oameni.',
      'Fiecare furnizor răspunde de partea lui. Nimeni nu are imaginea întreagă: ce date are firma, unde stau și ce se întâmplă dacă un laptop e furat sau un server nu mai pornește.',
    ],
  },
  cost: {
    h2: 'Cât costă o zi în care firma nu lucrează',
    paragraphs: [
      'Calculul îl faci cel mai bine tu. Dacă 20 de oameni nu pot lucra o zi, sunt 20 de zile de muncă pierdute, plus comenzile care nu pleacă.',
      'Dacă backup-ul nu se poate restaura, se pierde și munca de după ultima copie bună. Pentru firmele care intră sub NIS2, incidentul se raportează la DNSC: avertizare timpurie în 24 de ore, notificare în 72 de ore.',
    ],
  },
  wellRun: {
    h2: 'Cum arată securitatea pusă în ordine',
    items: [
      { title: 'Știi de unde pornești', text: 'Riscul și nivelul de maturitate sunt evaluate și scrise, cu ce e de făcut și în ce ordine.' },
      { title: 'Stațiile sunt protejate', text: 'EDR/XDR pe stații și servere, cu actualizări automate pentru sistem și aplicații.' },
      { title: 'Backup-ul e testat', text: 'Restaurarea a fost încercată, nu presupusă. Știi cât durează și ce date poți pierde.' },
      { title: 'Există un plan de răspuns', text: 'La un incident, se știe cine pe cine sună, ce se oprește și ce se raportează.' },
      { title: 'Cerințele sunt acoperite', text: 'Controalele cerute de ISO 27001 sau de NIS2 sunt implementate și documentate, gata pentru auditul făcut de un auditor independent.' },
    ],
  },
  extra: {
    id: 'instrumente-gratuite',
    label: 'Gratuit',
    h2: 'Începe cu o autoevaluare',
    paragraphs: [
      'Radiografia de securitate, pe cyberxscore.ro, e o autoevaluare: răspunzi la întrebări și primești raportul PDF pe email. Nu e un audit.',
      'Dacă nu știi dacă firma intră sub NIS2, încadrarea de pe nis2.cyberxscore.ro durează aproximativ 3 minute. Rezultatul e o estimare; încadrarea finală o face DNSC.',
    ],
    link: { label: 'Ce cere NIS2', href: '/nis2' },
  },
  steps: {
    h2: 'Ce facem concret',
    intro: 'Marius Galmati, fondatorul BitUp, a făcut parte din echipa de securitate a unei companii din topul celor mai mari 500 de companii din SUA.',
    items: [
      { title: 'Evaluăm', text: 'Ne uităm la riscuri și la nivelul de maturitate. Primești lista scrisă, în ordinea în care contează.' },
      { title: 'Protejăm', text: 'Punem EDR/XDR pe stații și servere, pornim actualizările automate și configurăm backup-ul, cu o restaurare de probă.' },
      { title: 'Pregătim răspunsul', text: 'Scriem planul de răspuns la incidente, cu oamenii care îl vor folosi.' },
      { title: 'Documentăm', text: 'Unde e nevoie de ISO 27001 sau de NIS2, implementăm controalele și pregătim documentația pentru audit.' },
    ],
  },
  projects: { h2: 'Proiecte legate' },
  faq: {
    h2: 'Întrebări frecvente',
    items: [
      { q: 'Cine face auditul, dacă lucrăm cu voi pentru NIS2?', a: 'Un auditor acreditat de DNSC, independent de consultant. Noi facem consultanța și implementarea tehnică a controalelor și pregătim firma pentru audit.' },
      { q: 'Ne ajutați cu ISO 27001?', a: 'Da. Facem pregătirea și implementarea: evaluarea, controalele și documentația. Certificarea o dă un organism de certificare, nu noi.' },
      { q: 'Avem deja antivirus. Nu e suficient?', a: 'Antivirusul e un singur strat. EDR/XDR urmărește ce se întâmplă pe stații și servere, iar actualizările automate închid breșele cunoscute. Fără backup testat și fără plan de răspuns, un incident tot poate opri firma.' },
      costFaq('câte stații, servere și locații are firma'),
    ],
  },
  cta,
};
