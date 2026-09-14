/** /en/services/automation copy, verbatim from spec/continut-en/05-automation.md. */
import type { AutomationCopy } from './automation.ro';

export const automationEn: AutomationCopy = {
  title: 'Automation, AI, and custom software for companies · BitUp',
  description: 'Automation between the apps you already have, AI assistants with a clear purpose, applications built for your company. We start from the process.',
  serviceName: 'Automation and software',
  hero: {
    eyebrow: 'Automation and software',
    h1: 'Whatever repeats in your company should be done by a system, not a person',
    lead: "The same data typed into three programs. Approvals chased over email, reports built from separate files, every month. We start from the process eating your time and see what's worth automating, integrating, or building.",
    button: 'Free IT Health Check',
  },
  situation: {
    eyebrow: 'Where we start',
    h2: 'Signs a process has outgrown its Excel',
    items: [
      'Someone copies data between programs, by hand, every day.',
      'A document goes through three approvals over email, and nobody knows where it is.',
      'The Monday morning report is built from four files by one person who knows "how it\'s done."',
      'A program bought years ago no longer fits how the company works, so people built workarounds.',
      'Clients phone with the same question ten times a day; the same person answers.',
    ],
    text: "None of this is a technology problem. It's a process stuck in someone's head. When they're on vacation, the process stops. That's what we fix.",
  },
  how: {
    eyebrow: 'How we work',
    h2: 'The process first, then the technology',
    steps: [
      { title: 'We look at how the team works.', text: 'Not at what program someone wants to buy. What comes in, what goes out, where it gets stuck, who decides.' },
      { title: 'We pick the smallest solution that solves the problem.', text: "Often it's an automation between two applications you have. Sometimes an AI assistant. Rarely a new application. That order is deliberate." },
      { title: "We build and test with the people who'll use it.", text: 'Not the manager. The accountant, the receptionist, the technician.' },
      { title: 'We measure the same thing before and after.', text: "Hours a week, steps by hand, errors. If it hasn't changed, we're not done." },
    ],
  },
  build: {
    eyebrow: 'What we build',
    h2: 'Three kinds of things',
    cards: [
      { title: 'Automations between your applications', text: "Invoices go into accounting on their own. Online store orders reach the warehouse without an email. A client's form opens a task for someone. We use your applications' APIs, and code when needed. Every automation has a person alerted if something fails." },
      { title: 'AI assistants with a clear purpose', text: 'One that answers clients\' common questions on WhatsApp and opens a ticket when stuck. One that reads order emails into a table. One that drafts a reply for a person to check. Not "AI in the company"; one assistant, one job, one person accountable.' },
      { title: 'Custom software', text: "When nothing suitable exists, or what exists costs more than it's worth, we build you an application. Only if we can also maintain it afterward.", anchor: true },
    ],
  },
  proof: {
    eyebrow: 'Proof',
    h2: 'Cipri, our support assistant',
    p1: "Before proposing an AI assistant to anyone, we built ours. Cipri sits on BitUp's support WhatsApp number. He recognizes the company by phone number, asks the right questions, suggests steps, takes screenshots. When he can't solve it, he opens a ticket in BitUp Helpdesk and hands it to a person. Our clients use him daily.",
    p2: "This isn't to sell AI, but so you know we've run what we propose in production first.",
    link: 'How we built it and what we learned',
    linkPath: '/en/blog/how-we-built-our-own-helpdesk',
    imageAlt: 'The WhatsApp conversation with Cipri: the message "I can\'t connect to the VPN", the clarifying questions, and the reply buttons',
  },
  software: {
    eyebrow: 'Custom software',
    h2: "ProQ: a whole product, started from a factory's need",
    p1: 'The biggest thing we built is ProQ, a platform for automotive suppliers who must prove to clients their process is under control: planning, risk analysis, control plan, part approval file. 29 modules, used by suppliers in Romania, Mexico, India, and China, hosted by us or on their servers.',
    p2: 'Even outside automotive, ProQ is proof we can take software from an idea in a factory to a product maintained for years. We work the same way on a 5-user internal application.',
    caseLink: 'Read the ProQ case',
    p3: 'What we usually build: internal applications (records, approvals, scheduling) that replace Excel files emailed around; client or supplier portals; integrations between your systems. Web-based, PostgreSQL database, hosted by us or on your side, backup and updates included in maintenance.',
    p4: "What we don't build: native mobile apps, brochure websites, online stores. There are people better at those; we'll say who.",
  },
  honest: {
    eyebrow: 'Honest',
    h2: 'Three things we say in the first conversation',
    items: [
      { title: 'Not every process needs AI.', text: "Usually a simple automation does more, for less, with no surprises. We'll say when AI is the answer and when it's just fashion." },
      { title: "We don't promise savings we haven't measured.", text: "We measure together, before and after. If it doesn't show, it wasn't worth it." },
      { title: "We don't build what we can't maintain.", text: 'Every application comes with the answer to "and when it breaks, who fixes it?" The answer is written in the contract.' },
    ],
  },
  faq: {
    h2: 'FAQ',
    items: [
      { q: 'What does an automation cost?', a: "From a few hours, for a link between two applications with an API, to weeks, for a complicated flow with many exceptions. You'll know after we see the process, not before. The first conversation is free and needs no specification." },
      { q: 'Do we have to change the programs we have?', a: 'Usually not. The best automations connect what you already have. We change something only when the old program is the real obstacle.' },
      { q: 'Does our data end up with some outside AI?', a: "Depends on what we build; we'll tell you exactly. For AI assistants we use commercial models (like ChatGPT) via API, with minimal data, or models on our side when data is sensitive. We decide together beforehand, in writing." },
      { q: "Who maintains what you've built?", a: 'We do, under a maintenance contract, with the same helpdesk as the rest of your IT. The code is yours, with documentation and access from the start.' },
      { q: 'Can you take over something built by someone else?', a: "Sometimes. We look at the code and tell you straight if it's worth maintaining or rewriting. We don't take over what we can't understand." },
    ],
  },
  cta: {
    title: 'Got a process that lives in Excel and emails?',
    text: "Tell us what repeats and where things get lost. In 30 minutes we'll see if it's worth automating, and how.",
    button: 'Book the IT Health Check',
  },
};
