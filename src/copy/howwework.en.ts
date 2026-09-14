/** /en/how-we-work copy, verbatim from spec/continut-en/07-how-we-work.md. */
import type { HowWeWorkCopy } from './howwework.ro';

export const howWeWorkEn: HowWeWorkCopy = {
  title: 'How we work: health check to monthly report · BitUp',
  description: 'What happens, concretely: the health check, the plan, the first 30 days, a normal month, the monthly report, and what we do in an incident.',
  hero: {
    eyebrow: 'How we work',
    h1: 'So what does it actually look like?',
    lead: "It's the question every owner asks before signing, and few providers answer. Here it is, step by step, from the first conversation to the day we might part ways.",
  },
  overview: {
    eyebrow: 'In short',
    h2: "Four steps. The fourth doesn't end.",
    nodes: [
      { title: 'Health check', meta: '30 min, free', text: 'Ten checks. One page in green, yellow, red.' },
      { title: 'Plan', meta: '1 week', text: "What we do the first month, what waits, what's not worth it. With a price." },
      { title: 'Onboarding', meta: 'first 30 days', text: 'We document, secure, test the backup.' },
      { title: 'Month by month', meta: 'ongoing', text: 'Monitoring, support, updates, report.' },
    ],
  },
  step1: {
    eyebrow: 'Step 1',
    h2: "The health check: 30 minutes for both of us to see what we're dealing with",
    text: "It's not a sales conversation. We go through ten points: backup, access, passwords, updates, antivirus, firewall, email, who owns what, what happens if the person everything depends on leaves, what obligations you have. You leave with a traffic-light page and three recommendations. If you want to continue, you write to us.",
    link: 'How it works',
  },
  step2: {
    eyebrow: 'Step 2',
    h2: 'The plan: what we do, in what order, what it costs',
    text: "A week after the health check you get the plan. It's short: what we do in the first month (usually the reds), what can wait, what isn't worth doing at all, and why. Each item has its price next to it: what's in the subscription, what's a separate project. We choose the formula together (alongside your IT person, partial, or full). We sign a short contract you can read without a lawyer.",
  },
  step3: {
    eyebrow: 'Step 3',
    h2: 'The first 30 days: we put things in order',
    items: [
      { title: 'We document everything you have:', text: 'equipment, accounts, licenses, vendors, who has access to what. The inventory becomes yours.' },
      { title: 'We take over access:', text: "change the passwords that need changing, close old accounts, add two-step verification where it's missing, move passwords into a manager." },
      { title: 'We get the backup right and test it.', text: "We don't leave month 1 without a successful restore." },
      { title: 'We fix the reds from the health check', text: ', in the order set in the plan.' },
      { title: 'We start support:', text: "your team gets Cipri's WhatsApp number and two lines on how to ask for help. That's all anyone needs to learn." },
      { title: 'The first monthly report', text: "at 30 days, with what we found, what we did, and what's next." },
    ],
  },
  step4: {
    eyebrow: 'Step 4',
    h2: "A normal month, in which you don't call us",
    text: 'We check backups and alerts daily and install updates in announced windows. We answer your team\'s requests and fix what comes up, small or big. We tell you proactively when we see something you should know (a license about to expire, a laptop showing signs, an odd account). At the end of the month, we send you the report.',
  },
  help: {
    eyebrow: 'Support',
    h2: 'You write on WhatsApp. The rest happens by itself.',
    steps: [
      'An employee writes on WhatsApp, in their own words. No account, no form.',
      'Cipri, our assistant, recognizes the company by the number, asks the right questions, suggests steps. If that fixes it, it closes there.',
      'If not, it opens the ticket in BitUp Helpdesk on its own, with all the context and attachments. We take it from there.',
      'The status comes back on the same channel. At the end of the month, the report.',
    ],
    row: 'Prefer email? You open the ticket on helpdesk.bitup.ro and get the statuses over email. Same system.',
    link: 'How we built it',
    linkPath: '/en/blog/how-we-built-our-own-helpdesk',
    imageAlt: 'The WhatsApp conversation with Cipri: the message "I can\'t connect to the VPN", the clarifying questions, and the reply buttons',
  },
  report: {
    eyebrow: 'The report',
    h2: 'What you get at the end of the month',
    text: 'A page or two, generated from the tickets, not written from memory. It lists how many requests there were and from whom, what got solved and how long it took. Also what we did without anyone asking (updates, checks, cleanup), what we noticed, and what we recommend for next month. When the backup restore test was done, its result goes in too.',
  },
  incidents: {
    eyebrow: 'Incidents',
    h2: 'How we handle an emergency',
    text: "Incidents that block work (email down for everyone, the server down, someone clicked where they shouldn't have) come before everything else and have a response time written in the contract. During business hours we respond in under two hours, by contract; the actual helpdesk average is under 30 minutes. Outside business hours there's an emergency number, for actual emergencies. What we do in the first 24 hours of a security incident is on the security page.",
    link: 'The first 24 hours',
  },
  billing: {
    eyebrow: 'Money',
    h2: 'A fixed amount per month. Projects, quoted first.',
    text: "The subscription is a fixed monthly amount, set after the health check, based on workstations, servers, and what we take over. We don't bill hours for regular support, because that would mean it suits us when you have problems. Separate projects (migrations, new hardware, software) get a quote first and only go ahead with your written approval. The invoice comes at the start of the month, with last month's report.",
  },
  exit: {
    eyebrow: 'Leaving',
    h2: 'If you want to leave, you leave with everything',
    text: "The contract has one month's notice, no penalties. When it ends you get all the documentation, the inventory, the passwords, and the access in a format anyone can take over, and we close our access on the agreed day. We hold nothing hostage.",
  },
  faq: {
    h2: 'FAQ',
    items: [
      { q: 'How long until I see a difference?', a: 'At 30 days you have the first report and a tested backup. Most of the "reds" from the health check go away in the first month. The quiet comes around month two, once your people are used to writing on WhatsApp instead of calling.' },
      { q: 'Do I, the owner, have to be involved?', a: "For the health check and the plan, yes, 30 minutes plus one meeting. After that, only for decisions (what we buy, what we change). The rest runs without you. That's the point." },
      { q: 'How many people are behind BitUp?', a: "A small core and specialist collaborators: local technicians where someone has to be on site outside Cluj, developers for the software work. The question behind the question is what happens when someone is away. Nothing lives in one person's memory: every client has their own documentation, access is recorded, tickets and reports are in the platform. If you decide to move to another provider tomorrow, you get everything within 30 days, written in the contract." },
    ],
  },
};
