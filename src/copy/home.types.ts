import type { RouteKey } from '../i18n/routes';

export interface HomeCopy {
  title: string;
  description: string;
  hero: { eyebrow?: string; h1: string; lead: string; primary: string; secondary: string };
  situation: { eyebrow: string; h2: string; cards: { quote: string; text: string }[]; closing: string; closingLink: string };
  services: { eyebrow: string; h2: string; cards: { title: string; text: string; link: string; route: RouteKey }[] };
  how: { eyebrow: string; h2: string; steps: { title: string; text: string }[]; link: string };
  why: { eyebrow: string; h2: string; items: { title: string; text: string }[] };
  support: { eyebrow: string; h2: string; text: string; text2: string; link: string; linkPath: string; imageAlt: string };
  founder: { eyebrow: string; h2: string; text: string; storyLink: string; teamLink: string; linkedinLabel: string; portraitAlt: string };
  results: { eyebrow: string; h2: string; readCase: string; nextCase: string };
  partners: { eyebrow: string; h2: string; names: string[] };
  tech: { eyebrow: string; h2: string; list: string };
  blog: { eyebrow: string; h2: string };
  faq: { eyebrow: string; h2: string; items: { q: string; a: string }[] };
}
