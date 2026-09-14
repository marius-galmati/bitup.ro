/** /en/support copy, verbatim from spec/continut-en/10-support.md. */
import type { SupportCopy } from './support.ro';

export const supportEn: SupportCopy = {
  title: 'Client support: WhatsApp, helpdesk, emergencies · BitUp',
  description: 'BitUp client with a problem? Message Cipri on WhatsApp, open a ticket on helpdesk.bitup.ro, or call the emergency number.',
  hero: {
    eyebrow: 'Client support',
    h1: 'Got a problem? Message Cipri.',
    lead: "This page is for companies already working with BitUp. If you're not a client yet and want to see the support first, you're still in the right place: this is what it looks like.",
    whatsapp: 'Message Cipri on WhatsApp',
    helpdesk: 'Open a ticket on helpdesk.bitup.ro',
  },
  ways: {
    eyebrow: 'Three ways',
    h2: 'Three ways, the same system',
    cards: [
      { title: 'WhatsApp, with Cipri', text: 'Write in your own words, as you would to anyone: "my VPN isn\'t working", "I can\'t open the file". Cipri recognizes you by number, asks two or three questions, suggests steps. If that doesn\'t fix it, it opens the ticket itself and a person takes over. The status comes back on WhatsApp too.', numberLabel: 'Number:' },
      { title: 'Form on helpdesk.bitup.ro', text: 'For anyone who prefers to write more or attach more files. You open the ticket and get the confirmation and statuses over email.', linkLabel: 'helpdesk.bitup.ro' },
      { title: 'Phone, for emergencies', text: 'When nobody\'s email works, the server is down, or you\'ve received a ransom note. Not for "my printer isn\'t working".', numberLabel: 'Number:', hours: 'Hours: Monday–Friday, 8:00–18:00; outside them, emergencies only' },
    ],
  },
  priorities: {
    eyebrow: 'Priorities',
    h2: 'So we both know what to expect',
    head: ['How serious', 'Examples', 'What we do'],
    rows: [
      { level: 'Critical', examples: 'Nobody can work: the server is down, email is down for everyone, suspected attack, encrypted files', action: 'We respond immediately, including outside business hours, on the emergency number. Priority over everything.' },
      { level: 'Important', examples: "Part of the company can't work: a department without access, a critical app down, the laptop of someone everything depends on", action: 'We respond during business hours, in under two hours by contract (actual average: under 30 minutes), and usually fix it that business day.' },
      { level: 'Normal', examples: 'One person, one problem: forgotten password, printer, a program to install, a question', action: "Cipri answers right away; what it can't fix, we fix in order of arrival, during business hours." },
    ],
    row: 'The exact times are in your contract. What it says there beats what it says here.',
  },
  after: {
    h2: 'What happens after you write',
    steps: [
      'You write on WhatsApp or on the helpdesk.',
      'Cipri answers right away and tries to walk you through a fix.',
      "If that doesn't work, the ticket is opened automatically and we take it over. You get a confirmation.",
      "When it's solved, you get the status on the same channel. At the end of the month, everything that happened is in the report.",
    ],
  },
  tips: {
    eyebrow: 'Help us help you',
    h2: 'Three things that shorten any ticket',
    items: [
      { title: 'A screenshot of the error.', text: 'Worth more than three paragraphs. Cipri picks it up straight from WhatsApp.' },
      { title: 'What you were doing when it happened.', text: '"I clicked the link in the email" or "I turned on the laptop this morning" completely changes the diagnosis.' },
      { title: 'Whether anyone else has the same problem.', text: "One person or everyone? That's the difference between a laptop and a server." },
    ],
  },
  not: {
    eyebrow: 'To be clear',
    h2: "What the assistant doesn't do",
    text: 'Cipri doesn\'t go into your computer, change your passwords, run commands, or decide on its own that a problem is closed when you say it isn\'t. It\'s the first line: it listens, asks, suggests, takes notes. Anything the steps don\'t solve goes to a person, with their name on the ticket. To skip it, write "I want a ticket" and you go straight to the next step.',
  },
  notClient: {
    h2: "For those who aren't clients yet",
    before: "Not a client and have a problem right now? Call +40 757 150 894. We'll answer, and there's nothing to sign first. If you want to see where your company stands with IT, start with the ",
    link: 'free IT Health Check',
    after: '.',
  },
};
