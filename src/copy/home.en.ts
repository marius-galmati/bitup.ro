/** Homepage copy, verbatim from spec/continut-en/01-home.md. Never edited here; changes go to the spec. */
import type { HomeCopy } from './home.types';

export const homeEn: HomeCopy = {
  title: 'IT support and security for companies in Cluj · BitUp',
  description: 'We design, secure, and run your company’s IT infrastructure: servers, network, cloud, apps, and automation. Free IT Health Check.',

  hero: {
    // Traducerea mea a textului dat de Marius pe 17 septembrie 2026 (CLAUDE.md regula 12); de confirmat.
    h1: 'We design, secure, and run the entire IT infrastructure your company needs.',
    lead: 'We start with servers, network, and cloud, and go on to applications, automation, and AI agents. Security is designed in from the start and built into every stage.',
    primary: 'Free IT Health Check',
    secondary: 'Explore our services',
  },

  situation: {
    eyebrow: 'Where we usually start',
    h2: 'Three sentences we hear in almost every new company',
    cards: [
      { quote: '"We have a guy who knows his stuff. But when he\'s on vacation, nobody knows the passwords."', text: 'All the IT rests on one person. When he\'s away, the company stops.' },
      { quote: '"We have three vendors. When something breaks, each one blames the other."', text: 'Nobody answers for everything. You end up coordinating them instead of doing your job.' },
      { quote: '"We have backup. I think. Nobody\'s tested it."', text: "If nobody's restored it, you don't know you have a backup." },
    ],
    closing: 'If you recognized yourself in at least one, the 30-minute IT Health Check is for you.',
    closingLink: 'How it works',
  },

  services: {
    eyebrow: 'Services',
    h2: 'Three things, seen through to the end',
    cards: [
      { title: 'IT support and administration', text: 'We take over everything to do with computers, servers, network, cloud, and Microsoft 365, on a monthly subscription. Your team writes on WhatsApp, a person answers, and at the end of the month you get the report of what was done.', link: 'See what the subscription includes', route: 'itSupport' },
      { title: 'Security and continuity', text: 'Protection against attacks, controlled access, backup that actually restores, tested regularly. When your company has obligations (NIS2, ISO 27001), we turn them into concrete steps, not paperwork.', link: 'See what we protect and how', route: 'security' },
      { title: 'Automation and software', text: 'When a process lives in Excel and emails, we move it into a system: automation, integration, or an application built for you. We start from the process, not the technology.', link: 'See real examples', route: 'automation' },
    ],
  },

  how: {
    eyebrow: 'How we work',
    h2: 'Four steps. The fourth never ends.',
    steps: [
      { title: 'Health check.', text: "30 minutes, remote, free. Ten checks. You leave with one page: what's fine, what's urgent, what it would cost." },
      { title: 'Plan.', text: "What we do in the first month, what can wait, what isn't worth doing at all. In business terms, with the price next to it." },
      { title: 'Onboarding.', text: 'In the first 30 days we document everything, change the passwords that need it, get the backup in order, and test it.' },
      { title: 'Month by month.', text: "Monitoring, WhatsApp support, updates, monthly report. You know what's going on without asking." },
    ],
    link: 'The full process, with what happens at each stage',
  },

  why: {
    eyebrow: "What's different",
    h2: 'What you get when one partner answers for everything',
    items: [
      { title: 'One phone number, not three vendors.', text: 'When something breaks, you stop hunting for the culprit. You call and it gets fixed.' },
      { title: 'Security is done, not sold separately.', text: "Everything we install has its security part done too. It doesn't work any other way." },
      { title: 'You see everything, without asking.', text: "Your team's requests go into a ticket system we built ourselves. You know who's on it, what stage it's at, when it was solved." },
      { title: 'A monthly report from facts, not memory.', text: "At the end of the month you get what was done, how long it took, what's next. You don't guess what you're paying for." },
      { title: 'Large-scale experience, at your scale.', text: 'We bring security experience from a Fortune 500 corporation into a 30-person company, without the needless complexity.' },
    ],
  },

  support: {
    eyebrow: 'Support',
    h2: 'You write on WhatsApp. You get an answer right away. Nothing gets lost.',
    text: "Your team doesn't learn a new portal: they write on WhatsApp, as they'd write to anyone. Cipri, our virtual assistant, recognizes them, picks up the problem, and tries to solve it right away, at any hour. What he can't solve automatically becomes a ticket in BitUp Helpdesk and a person takes over. You see every ticket, from open to close.",
    text2: 'We built the whole system ourselves, for the small companies we work with.',
    link: 'How we built it and why',
    linkPath: '/en/blog/how-we-built-our-own-helpdesk',
    imageAlt: 'The WhatsApp conversation with Cipri: the message "I can\'t connect to the VPN", the clarifying questions, and the reply buttons',
  },

  founder: {
    eyebrow: 'Who answers',
    h2: 'Marius Galmati, BitUp founder',
    text: "I've worked in IT since 2017. I started with servers and networks in small companies. I spent the last two and a half years in information security at a Fortune 500 corporation: ISO 27001 audits, continuity plans, protection on workstations and servers. I started BitUp because I'd seen too many companies with technology but nobody to answer for it.",
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
    names: ['Microsoft Partner', 'Fortinet Advocate', 'Veeam Partner', 'Anthropic Partner'],
  },

  tech: {
    eyebrow: 'Technologies',
    h2: 'Technologies we work with daily',
    list: 'Microsoft 365, Fortinet, Veeam, CrowdStrike, Palo Alto Networks, WireGuard, Proxmox / VMware, Synology.',
  },

  blog: {
    eyebrow: 'From the inside',
    h2: 'How we work, written by us',
  },

  faq: {
    eyebrow: 'Questions',
    h2: 'What an owner asks us before writing',
    items: [
      { q: 'Can we outsource only part of our IT?', a: "Yes. Three setups: alongside your in-house person (they keep the day-to-day, we take over security, backup, and what they don't know), partial (only servers and Microsoft 365, for example), or full. We pick at the health check, once we see what you have." },
      { q: 'Do we have to replace everything we have?', a: "No. We start from what works. We replace only what's risky or costs you more than it's worth." },
      { q: 'How much does it cost?', a: "Depends on the number of workstations and servers and on what we take over: administration only, or security, backup, and licenses too. We'll give you a concrete price at the end of the health check, no obligations. We don't put numbers on the site because they'd be wrong for half the companies." },
      { q: 'Can we start with a one-off problem?', a: 'Yes. One intervention or a bounded project (a migration, a backup put in order, an audit) is a good way in. Then we see whether a subscription makes sense.' },
    ],
  },
};
