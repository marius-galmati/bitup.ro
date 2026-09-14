/** /en/about copy, verbatim from spec/continut-en/09-about.md. Hero, § The story and § Timeline stay in first person (signed statement). */
import type { AboutCopy } from './about.ro';

export const aboutEn: AboutCopy = {
  title: 'About Marius Galmati and BitUp · BitUp',
  description: 'Who answers for your IT: Marius Galmati, in IT since 2017, with security experience at a Fortune 500 corporation. Why BitUp exists.',
  hero: {
    eyebrow: 'About',
    h1: "I've seen too many companies with technology, but no one who answers for it.",
    lead: "I'm Marius Galmati. I built BitUp to be that person, for small companies in Cluj and across Romania.",
    portraitAlt: 'Marius Galmati, BitUp founder',
  },
  story: {
    eyebrow: 'Who I am',
    h2: 'Since 2017, in small-company IT. Then at large scale. Then back, with what I learned.',
    paragraphs: [
      "I've worked in IT since 2017. I started as a system administrator in small companies in Cluj, doing everything: servers, network, backup, firewall, users, the phone that rings when the printer won't print. That's where I understood that in a small company IT isn't a department, it's a person. And when that person isn't there, no one is.",
      "Then a growing software company, where I designed the new office's infrastructure and ran support to an SLA, with tickets, response times, and reports. And from 2024 to 2026 I worked at Concentrix, a Fortune 500 corporation, in information security: internal and external ISO 27001 audits, policies and governance, continuity and recovery plans, protection on workstations and servers, Microsoft 365 and Active Directory. At that scale, a mistake shows immediately.",
      'I started BitUp in 2020, out of what I saw at small companies: they had technology but no structure; vendors but no partner; digitalization initiatives but nobody owning the big picture. And security was always "extra", something you add later if there\'s money left. I built BitUp to be the reverse: one partner who answers for all of IT, with security built in from the start, not sold separately.',
      "I bring what I learned at large scale down to your company's size, without needless complexity or vendor hype.",
    ],
  },
  timeline: {
    eyebrow: 'Timeline',
    h2: 'In short',
    items: [
      { years: '2010–2014', text: 'Computer Science, Technical University of Cluj-Napoca' },
      { years: '2017–2021', text: 'System administrator at a company in Cluj: virtualization, Active Directory, Fortinet firewall, backup and recovery with Veeam' },
      { years: '2020', text: 'I start BitUp Technology' },
      { years: '2021–2024', text: 'Senior system administrator at a growing software company: new office infrastructure, SLA-based support' },
      { years: '2024–2026', text: 'Concentrix (Fortune 500), information security: ISO 27001 audits, continuity, EDR/XDR, patch management, Microsoft 365 and AD' },
      { years: '2026', text: 'BitUp, full-time' },
    ],
  },
  principles: {
    eyebrow: 'Principles',
    h2: 'Three things we believe in and what they mean for you',
    cards: [
      { title: 'Security before features', text: 'We don\'t install anything without the security part done. We don\'t sell security separately because it doesn\'t work separately. Sometimes that means a "no" to something you\'d like.' },
      { title: 'Clarity before speed', text: "We tell you what we do, why, and what it costs, beforehand. The monthly report is written from tickets, not from memory. If you don't understand something we tell you, that's our problem, not yours." },
      { title: 'Thinking long term', text: "We pick what still works in five years, not what looks good this month. We don't sell you what you don't need, and we tell you when you can wait." },
    ],
  },
  else: {
    eyebrow: 'On the side',
    h2: 'What else we do',
    text: "We're building CyberXscore, a platform where owners can assess their own cyber risk, in business terms, not IT terms. And ProQ, a platform for automotive suppliers, used in four countries.",
    link: 'Read the ProQ case',
  },
  company: {
    eyebrow: 'Company details',
    h2: 'BitUp Technology SRL',
    facts: [
      { k: 'Since', v: 'June 2020' },
      { k: 'Where', v: 'Cluj-Napoca' },
      { k: 'VAT no.', v: 'RO42613248 · Trade Register no. J12/1556/2020' },
      { k: 'Partnerships', v: 'Microsoft Partner · Fortinet Advocate · Veeam Partner' },
    ],
    personal: 'personal LinkedIn',
    companyLink: 'BitUp LinkedIn',
  },
  cta: {
    title: 'Want to see how we work, before you sign anything?',
    text: '30 minutes, free, no obligation. We tell you exactly where you stand.',
    button: 'Book the IT Health Check',
  },
};
