/** /en/blog copy, verbatim from spec/continut-en/12-blog.md. */
import type { BlogCopy } from './blog.ro';

export const blogEn: BlogCopy = {
  title: 'Blog: technology decisions for business owners · BitUp',
  description: "Articles by Marius Galmati: security in plain language, backup, automation, what's worth it and what isn't. From real projects, not theory.",
  hero: {
    eyebrow: 'Blog',
    h1: 'Technology decisions, in plain language for owners',
    lead: "We're not teaching you IT. We show you how to make better decisions about it: what to ask, what to check, when to say no. Everything here comes from real companies and what we build.",
  },
  themes: {
    eyebrow: 'What we write about',
    h2: 'Three themes, always from practice',
    cards: [
      { title: 'Technology decisions for business owners', text: "What to ask your IT provider before signing. How much IT should cost a 30-person company. When you need a server and when you don't." },
      { title: 'Security, explained for small companies', text: "What NIS2 is and whether it applies to you. Backup versus restore. How to check in five minutes whether your company's email can be spoofed." },
      { title: 'Automation and AI, the pragmatic way', text: "What we've automated and how much time it saved. What isn't worth automating. How to use AI in your company without leaking your data." },
    ],
  },
  subscribe: { before: 'New articles about twice a month. Also on ', linkedin: 'LinkedIn', middle: ' or via ', rss: 'RSS', after: '. No newsletter, no pop-up.' },
};
