/**
 * Copy for /en/about, taken verbatim from spec/continut-en/09-about.md.
 * The whole page is first-person plural (CLAUDE.md § Voce): it is the company's voice, not the founder's.
 * Individual profiles — and the singular voice that goes with them — move to /en/team.
 */
import type { AboutCopy } from './about.ro';

export const aboutEn: AboutCopy = {
  title: 'About BitUp Technology · BitUp',
  description: 'BitUp Technology: a team of IT specialists trained in international companies, bringing structure, technology, and security designed in from the start.',
  hero: {
    eyebrow: 'About',
    h1: 'Enterprise standards, brought to the scale of your company.',
    lead: 'BitUp Technology is a team of IT specialists trained in international companies. This page says who we are and how we can add value to your business.',
  },
  origin: {
    eyebrow: 'Why we exist',
    h2: 'Why we founded BitUp',
    paragraphs: [
      'We were trained in large organizations, where IT runs on written procedures, international standards, and clear responsibilities. In companies in Romania we found the same technology, used without any of them: systems bought correctly, administered haphazardly, with security treated as an option.',
      'BitUp Technology was founded in 2020, starting from a simple observation: the difference between a company that controls its technology and one controlled by it does not come from budget. It comes from structure: who answers for what, what gets documented, what gets checked, and how often.',
      'We bring to companies of any size the way large organizations operate: governance, processes, documentation, and security designed in from the start, calibrated to the reality and the budget of each one.',
    ],
  },
  team: {
    eyebrow: 'The team',
    h2: 'Specialists in different areas of IT, not one person good at everything',
    paragraphs: [
      'Behind BitUp there is a team with experience built at companies such as Bosch, NTT DATA, Marsh, and Concentrix: infrastructure and information security, software development, artificial intelligence and automation, project delivery in international teams. Each area has its own person, and your problems reach someone who has met them before at large scale.',
      'The standards we operate by come from the places where we were trained: ISO 27001 audits, risk management, change control, documentation that stays with the client.',
    ],
    link: 'Meet the team',
  },
  audience: {
    eyebrow: 'Who we work with',
    h2: 'Who we are a fit for',
    items: [
      'Companies that depend on their systems and have no one answering for the whole.',
      'Companies with several vendors, where no one has the full picture and the final responsibility.',
      'Companies that already have an in-house IT team and need expertise in specific areas: security, cloud, automation, software development.',
      'Companies with compliance requirements (NIS2, ISO 27001, requirements coming from clients or from audits) that have to be turned into concrete measures.',
      'Companies that want to digitize processes and use automation and AI without raising their risk.',
    ],
    closing: 'We are not a fit for anyone looking for the lowest price. Our priority is the result over time, not the lowest line in the quote.',
  },
  problems: {
    eyebrow: 'What we solve',
    h2: 'Four problems that keep coming back',
    cards: [
      { title: 'Diffuse responsibility', text: 'The technology is there, but no one answers for it as a whole. We take that role, with a single point of contact and a monthly report written from tickets.' },
      { title: 'Security added at the end', text: 'Systems get built first and protected afterward, if there is budget left. We design security into every stage, we do not sell it separately.' },
      { title: "Processes that live in Excel and in one person's memory", text: 'Information does not circulate, it gets lost with every departure. We move them into systems, with automation and integrations between the applications you already have.' },
      { title: 'Technology bought, not integrated', text: 'Licenses and equipment that do not talk to each other. We take inventory, remove the overlaps, and build a coherent architecture.' },
    ],
  },
  tech: {
    eyebrow: 'Technology',
    h2: 'Modern technology, applied pragmatically',
    paragraphs: [
      'Digitization, cloud, automation between applications, AI agents with a defined purpose: all of them come into discussion only where they solve a measurable problem. Every new technology goes through the same questions before it reaches production: what problem it solves, who administers it, what risks it brings, and how we stop it if it does not deliver the expected result.',
      'We also build our own products: CyberXscore, through which a company can assess its own cyber risk in business terms, and ProQ, a platform for automotive suppliers, used all over the world.',
    ],
    link: 'Read the ProQ case',
  },
  values: {
    eyebrow: 'Values',
    h2: 'Three values, and what each one means in practice',
    cards: [
      { title: 'Integrity', text: 'We say what we did, what we did not manage, and where we got it wrong. The monthly report is written from tickets, not from memory. We also recommend the option that brings us no revenue, when it is the right one for you.' },
      { title: 'Innovation', text: 'New technologies go in where they produce a measurable result, not where they sound good. They get tested before, documented after, and what does not work is withdrawn.' },
      { title: 'Professionalism', text: 'Written procedures, change control, deadlines we commit to, and documentation that stays with the client. The same standards as in a large organization, without its bureaucracy.' },
    ],
  },
  company: {
    eyebrow: 'Company details',
    h2: 'BitUp Technology SRL',
    facts: [
      { k: 'Since', v: 'June 2020' },
      { k: 'Where', v: 'Cluj-Napoca' },
      { k: 'VAT no.', v: 'RO42613248 · Trade Register no. J12/1556/2020' },
      { k: 'Partnerships', v: 'Microsoft Partner · Fortinet Advocate · Veeam Partner · Anthropic Partner' },
    ],
    companyLink: 'BitUp LinkedIn',
  },
  cta: {
    title: 'Want to see where your company stands, before any decision?',
    text: "30 minutes, free, no obligation. We'll tell you exactly where you stand and what it would mean for us to take that worry off your hands.",
    button: 'Book the IT Health Check',
  },
};
