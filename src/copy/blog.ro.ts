/** Textul paginii /blog, copiat exact din spec/continut/12-blog-index.md. Lista vine din colecția `blog`. */

export interface BlogCopy {
  title: string; description: string;
  hero: { eyebrow: string; h1: string; lead: string };
  themes: { eyebrow: string; h2: string; cards: { title: string; text: string }[] };
  subscribe: { before: string; linkedin: string; middle: string; rss: string; after: string };
}

export const blogRo: BlogCopy = {
  title: 'Blog: decizii de tehnologie pentru patroni · BitUp',
  description: 'Articole scrise de Marius Galmati: securitate pe înțelesul tău, backup, automatizări, ce merită și ce nu. Din proiecte reale, nu din teorie.',
  hero: {
    eyebrow: 'Blog',
    h1: 'Decizii de tehnologie, pe înțelesul patronului',
    lead: 'Nu te învățăm IT. Îți arătăm cum să iei decizii mai bune despre el: ce întrebi, ce verifici, când spui nu. Tot ce scriem vine din firme reale și din ce construim.',
  },
  themes: {
    eyebrow: 'Despre ce scriem',
    h2: 'Trei teme, mereu din practică',
    cards: [
      { title: 'Decizii de tehnologie pentru patroni', text: 'Ce întrebi furnizorul de IT înainte să semnezi. Cât ar trebui să coste IT-ul unei firme de 30 de oameni. Când ai nevoie de server și când nu.' },
      { title: 'Securitate pe înțelesul firmei mici', text: 'Ce e NIS2 și dacă te privește. Backup versus restore. Cum verifici în cinci minute dacă emailul firmei tale poate fi falsificat.' },
      { title: 'Automatizare și AI, pragmatic', text: 'Ce am automatizat și cât timp a economisit. Ce nu merită automatizat. Cum folosești AI în firmă fără să-ți scurgi datele.' },
    ],
  },
  subscribe: { before: 'Articole noi cam de două ori pe lună. Le găsești și pe ', linkedin: 'LinkedIn', middle: ' sau prin ', rss: 'RSS', after: '. Fără newsletter, fără pop-up.' },
};
