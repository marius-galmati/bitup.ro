/**
 * Homepage copy, verbatim from spec/continut-en/01-home.md. Never edited here; changes go to the spec.
 * Shortened on 27 September 2026, matching the Romanian cut: the new style wants one idea per screen,
 * and the text had been written for the old, dense one. See NOTES.md.
 */
import type { HomeCopy } from './home.types';

export const homeEn: HomeCopy = {
  title: 'IT support and security for companies in Cluj · BitUp',
  description: 'We design, secure, and run your company’s IT infrastructure: servers, network, cloud, apps, and automation. Free IT Health Check.',

  hero: {
    // Traducerea mea a textului dat de Marius pe 17 septembrie 2026 (CLAUDE.md regula 12); de confirmat.
    h1: 'We design, secure, and run all of your company’s IT.',
    lead: 'From servers and network through to applications, automation, and AI agents. Security goes in on day one, not at the end.',
    primary: 'Free IT Health Check',
    secondary: 'Explore our services',
  },

  situation: {
    eyebrow: 'Where we usually start',
    h2: 'Three sentences we hear in almost every new company',
    cards: [
      { quote: '"We have a guy who knows his stuff. But when he\'s on vacation, nobody knows the passwords."', text: 'All the IT rests on one person.' },
      { quote: '"We have three vendors. When something breaks, each one blames the other."', text: 'Nobody answers for the whole.' },
      { quote: '"We have backup. I think. Nobody\'s tested it."', text: 'A backup nobody has tested is not a backup.' },
    ],
    closing: 'Sound familiar? The IT Health Check takes 30 minutes.',
    closingLink: 'How it works',
  },

  services: {
    eyebrow: 'Services',
    h2: 'Three things, seen through to the end',
    cards: [
      { title: 'IT support and administration', text: 'Computers, servers, network, cloud, and Microsoft 365, on a monthly subscription. A report at the end of every month.', link: 'See what the subscription includes', route: 'itSupport' },
      { title: 'Security and continuity', text: 'Protection, controlled access, and tested backup. NIS2 and ISO 27001, turned into concrete steps.', link: 'See what we protect and how', route: 'security' },
      { title: 'Automation and software', text: 'We move processes out of Excel and emails into a system. We start from the process, not the technology.', link: 'See real examples', route: 'automation' },
    ],
  },

  how: {
    eyebrow: 'How we work',
    h2: 'Four steps. The fourth never ends.',
    steps: [
      { title: 'Health check.', text: 'Thirty minutes, free. Ten checks and one page of findings.' },
      { title: 'Plan.', text: 'What we do in the first month, what can wait, with the price next to it.' },
      { title: 'Onboarding.', text: 'We document everything, change the passwords, get the backup in order, and test it.' },
      { title: 'Month by month.', text: "Monitoring, WhatsApp support, monthly report. You know what's going on without asking." },
    ],
    link: 'The full process, stage by stage',
  },

  why: {
    eyebrow: "What's different",
    h2: 'What you get when one partner answers for everything',
    items: [
      { title: 'One phone number, not three vendors.', text: 'You call and it gets fixed.' },
      { title: 'Security is done, not sold separately.', text: "It doesn't work any other way." },
      { title: 'You see everything, without asking.', text: 'Every request becomes a ticket you can see.' },
      { title: 'A monthly report from facts, not memory.', text: 'You know exactly what you are paying for.' },
      { title: 'Large-scale experience, at your scale.', text: 'Fortune 500, without the needless complexity.' },
    ],
  },

  support: {
    eyebrow: 'Support',
    h2: 'You write on WhatsApp. You get an answer right away. Nothing gets lost.',
    text: "Your team writes on WhatsApp, as they'd write to anyone. Cipri picks up the problem and solves it right away, at any hour. What he can't solve becomes a ticket and a person takes over.",
    text2: 'We built the system ourselves.',
    link: 'How we built it',
    linkPath: '/en/blog/how-we-built-our-own-helpdesk',
    imageAlt: 'The WhatsApp conversation with Cipri: the message "I can\'t connect to the VPN", the clarifying questions, and the reply buttons',
  },

  founder: {
    eyebrow: 'Who answers',
    h2: 'Marius Galmati, BitUp founder',
    text: "I've worked in IT since 2017, the last two and a half years in information security at a Fortune 500 corporation. I started BitUp because I'd seen too many companies with technology but nobody to answer for it.",
    storyLink: 'The story, in short',
    teamLink: 'The team',
    linkedinLabel: 'LinkedIn',
    portraitAlt: 'Marius Galmati, BitUp founder',
  },

  results: {
    eyebrow: 'Results',
    h2: "What we've done, with names",
    readCase: 'Read the case',
    nextCase: "Next case soon, with the client's consent.",
  },

  partners: {
    eyebrow: 'Partners',
    h2: 'What we work with',
    names: ['Microsoft Partner', 'Fortinet Partner', 'Veeam Partner', 'Anthropic Partner'],
  },

  blog: {
    eyebrow: 'From the inside',
    h2: 'How we work, written by us',
  },

  faq: {
    eyebrow: 'Questions',
    h2: 'What an owner asks us before writing',
    items: [
      { q: 'Can we outsource only part of our IT?', a: 'Yes. Alongside your in-house person, partial, or full. We pick at the health check, once we see what you have.' },
      { q: 'Do we have to replace everything we have?', a: "No. We start from what works. We replace only what's risky or costs more than it's worth." },
      { q: 'How much does it cost?', a: "Depends on how many workstations and servers you have and on what we take over. You get the price at the end of the health check. On the site it would be wrong for half the companies." },
      { q: 'Can we start with a one-off problem?', a: 'Yes. A migration, a backup put in order, an audit — that is a good way in. Then we see whether a subscription makes sense.' },
    ],
  },
};
