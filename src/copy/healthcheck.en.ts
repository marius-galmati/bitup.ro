/** /en/it-health-check copy, verbatim from spec/continut-en/06-it-health-check.md. */
import type { HealthCheckCopy } from './healthcheck.ro';

export const healthCheckEn: HealthCheckCopy = {
  title: 'Free IT Health Check: 30 minutes, 10 checks · BitUp',
  description: "30 minutes, remote, 10 checks. You get one page: what's fine, what's urgent, and what it would cost. No obligation.",
  hero: {
    eyebrow: 'Free IT Health Check',
    h1: "In 30 minutes you'll know where your company stands on backup, security, and access",
    lead: "Remote, with you or your IT person. You get one page: what's fine, what's urgent, and what fixing it would cost. No obligation, no sales pitch.",
    jumpToForm: 'Jump to form',
  },
  checks: {
    eyebrow: 'What we check',
    h2: 'Ten questions you should know the answer to',
    items: [
      { title: 'Does the backup exist, and has anyone ever restored from it?', text: 'Not "it\'s running", but "we pulled something out of it this month".' },
      { title: 'Who has admin rights, and why?', text: 'Usually too many people, and at least one who no longer works for you.' },
      { title: 'Passwords and two-step verification.', text: 'On Microsoft 365 or Google, on the bank, on everything that matters.' },
      { title: 'Updates on servers and workstations.', text: "When they were last done and who's watching." },
      { title: 'Antivirus or EDR, and who looks at the alerts.', text: 'An antivirus nobody looks at is just an icon.' },
      { title: 'The firewall and remote access.', text: "What's open to the internet and why." },
      { title: 'Can your email be faked?', text: 'SPF, DKIM, DMARC: if they\'re missing, someone can send emails "from you".' },
      { title: 'Who owns the domain, the hosting, and the licenses?', text: "On which account, with which card, with which email. We've seen companies lose their domain." },
      { title: 'What happens when the person who knows the passwords leaves?', text: 'If the answer is "I don\'t know", that\'s the most urgent item on the list.' },
      { title: 'What obligations the company has (NIS2, GDPR), and how far it is from them.', text: 'Yes, no, or "probably, because of X".' },
    ],
  },
  how: {
    eyebrow: 'How it works',
    h2: 'Three steps, none of them asks you to install anything',
    steps: [
      { title: 'You fill in the form.', text: 'Two minutes. We call you within one business day and set a 30-minute slot.' },
      { title: 'We talk for 30 minutes, on video.', text: "You or your IT person. We go through the 10 points. You show us what you have, we ask, we take notes. We don't connect to anything or install anything." },
      { title: 'You get the page the same day.', text: 'A traffic light on the 10 points, three recommendations in order of urgency, and a cost estimate, if you want to go further. With us or someone else.' },
    ],
    capacity: '[[CAPACITATE_RADIOGRAFII]]',
  },
  get: {
    eyebrow: 'What you get',
    h2: 'One page, not a 40-page report',
    p1: "One page you can read in two minutes and pass on to your IT person or business partner. On it: the 10 points in green, yellow, or red, one sentence each; the three things we'd do first, and why; and, if you ask, what it would cost for us to fix them, in the subscription or as a project.",
    p2: "What you don't get: a sales pitch, a follow-up call three days later, or a weekly email. If you want to continue, you write to us.",
    figureCaption: "Sample report. The colors are the sample company's, not yours.",
  },
  form: {
    title: 'Book the health check',
    intro: "Two minutes. We'll call you.",
    name: 'Your name', company: 'Company', employees: 'How many employees', employeesOptions: ['under 10', '10–30', '30–100', 'over 100'],
    phone: 'Phone', email: 'Email',
    message: 'What worries you most about your IT? (optional)', messagePlaceholder: "For example: I don't know if the backup works",
    button: "Send and we'll call you",
  },
  who: {
    eyebrow: 'Who',
    h2: 'Who runs the health check',
    text: "Marius Galmati, founder of BitUp. I've worked in IT since 2017, the last two and a half years in information security at a Fortune 500 corporation, on ISO 27001 audits and continuity plans. The health check is done by me, not by an automated form: in 30 minutes I see things a form doesn't.",
    link: 'About me',
    portraitAlt: 'Marius Galmati, BitUp founder',
  },
  faq: {
    h2: 'FAQ',
    items: [
      { q: "Is it actually free? What's the catch?", a: 'Yes, free. The catch, if you want to call it that: some companies that do the health check become clients, because they see how we work. The rest leave with a useful page. Both are fine with us.' },
      { q: 'Do I have to install anything or give you passwords?', a: "No. We don't connect to anything or install anything, you give us no passwords. You show us what you have on screen and answer questions." },
      { q: 'What happens with what I tell you?', a: "It stays between us. The notes sit in our system, we don't give them to anyone; if we don't continue, we delete them on request. Details in the", link: { label: 'Privacy policy', href: '/en/privacy', after: '.' } },
      { q: "What if I don't want to continue afterwards?", a: "Nothing happens. We don't call you or send you offers. You have the page, do what you want with it." },
      { q: 'Can our IT person join?', a: "Yes, we'd recommend it. It's not a test for them; often they already know the problems and had no one to listen." },
    ],
  },
};
