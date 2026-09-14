/** Textul paginii /rezultate, copiat exact din spec/continut/08-rezultate.md. Cardurile vin din colecția `cases`. */

export interface ResultsCopy {
  title: string; description: string;
  hero: { eyebrow: string; h1: string; lead: string };
  readCase: string;
  nextCase: string;
  rules: { eyebrow: string; h2: string; paragraphs: string[] };
}

export const resultsRo: ResultsCopy = {
  title: 'Rezultate: studii de caz cu nume · BitUp',
  description: 'Ce am făcut, pentru cine și ce s-a schimbat. Studii de caz cu numele clientului, publicate cu acordul lui.',
  hero: {
    eyebrow: 'Rezultate',
    h1: 'Ce am făcut, cu nume',
    lead: 'Puține, dar reale. Fiecare caz de aici e publicat cu acordul scris al clientului și fără detalii despre cum îi sunt configurate sistemele. Vrei să vorbești cu unul dintre ei? Cere-ne. Facem legătura.',
  },
  readCase: 'Citește cazul',
  nextCase: 'Următorul caz, cu numele clientului, apare după ce semnează acordul. Nu publicăm nimic pe cuvânt.',
  rules: {
    eyebrow: 'Reguli',
    h2: 'Cum ajunge un caz pe pagina asta',
    paragraphs: [
      'Întâi scriem cazul. Apoi îl trimitem clientului, exact așa cum ar apărea, împreună cu un acord de o pagină care spune ce putem folosi (numele, logo-ul, un citat), unde, și că poate retrage acordul oricând. Se publică doar după semnătură.',
      'Ce nu apare niciodată: cum sunt configurate sistemele clientului, ce vulnerabilități am găsit, ce incidente a avut, cât plătește, ce aplicații interne folosește. Un studiu de caz al unei firme de securitate nu poate fi o hartă pentru cine vrea să intre. Dacă ți se pare că lipsesc detalii, asta e de ce.',
      'Referințe cu nume, la telefon, pentru firmele care vor să întrebe un client direct: la cerere, cu acordul lui.',
    ],
  },
};
