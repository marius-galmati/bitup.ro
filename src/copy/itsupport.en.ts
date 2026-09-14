/** /en/services/it-support copy, verbatim from spec/continut-en/03-it-support.md. */
import type { ItSupportCopy } from './itsupport.ro';

export const itSupportEn: ItSupportCopy = {
  title: 'IT support and administration on subscription, Cluj · BitUp',
  description: 'Servers, workstations, network and Microsoft 365 administered on a monthly subscription, security included. WhatsApp support, monthly report.',
  serviceName: 'IT support and administration',
  hero: {
    eyebrow: 'IT support and administration',
    h1: 'IT support and administration, by monthly subscription',
    lead: 'Computers, servers, network, Microsoft 365, and security, run by one partner who answers for the result. For companies with 10–100 employees.',
    button: 'Free IT Health Check',
    note: 'Price depends on workstations, servers, and what we take over. You get it after the health check, no obligation.',
  },
  situation: {
    eyebrow: 'Where we start',
    h2: 'What IT looks like in a company that calls us',
    paragraphs: [
      "Usually the company has outgrown its IT. 20, 40, 60 people. A server somewhere, bought a few years ago. Microsoft 365 half set up: everyone made their account however they could. Passwords in an Excel or someone's head. Backup runs, probably. Nobody's tried to get anything out of it.",
      'Support is "the guy who knows computers," with another job on the side. Or a provider who shows up when things break and bills by the hour. When something important goes down, the owner calls, waits, calls again. Nobody knows how many problems there were last month or what they cost.',
      "It's nobody's fault. That's how IT grows when nobody's running it. That's what we take over.",
    ],
  },
  included: {
    h2Section: 'What the subscription includes',
    eyebrow: "What's included",
    h2: 'What you do, what we do',
    weTitle: 'What we take over, monthly',
    we: [
      "Employee support: they message on WhatsApp, Cipri answers right away, what he can't solve becomes a ticket. Remote, on site when needed.",
      'Server and workstation administration: monitoring, updates, managed antivirus or EDR, periodic cleanup.',
      'Microsoft 365: accounts, licenses, two-step verification for everyone, email rules, permissions.',
      'Network and access: router, firewall, Wi-Fi, VPN for working from home.',
      'Backup set up, monitored, and tested regularly. "It runs" means nothing until you get something out of it.',
      'Documentation: what you have, where it is, who has access. Current inventory.',
      'Providers: internet, telephony, licenses. We deal with them, not you.',
      "Monthly report: what was asked, what was solved, how long it took, what's next.",
    ],
    youTitle: 'What stays with you',
    you: [
      'Decisions: what we buy, what we change, when. We recommend, price attached, you decide.',
      'Your business applications (accounting, ERP, CRM): their vendor manages them. We make sure they have somewhere to run and are backed up.',
      'One in-house contact for approvals. No IT knowledge needed.',
    ],
    row: 'Not in the subscription, quoted as separate projects: big migrations, new hardware, software development, implementations from scratch. No surprises on the invoice.',
  },
  options: {
    eyebrow: 'Three options',
    h2: "You don't have to outsource everything",
    cards: [
      { title: 'Alongside your IT person', text: "You already have someone. They keep the day-to-day. We take over security, backup, Microsoft 365, and what they don't know or have no time for. We're there when they're not." },
      { title: 'Partial', text: "Just servers and Microsoft 365, for example. Or just backup and security. A clear line between what's ours and what's yours." },
      { title: 'Full', text: 'All of IT, on subscription. One phone number, one monthly report, one partner accountable. The option most companies pick after the first month.' },
    ],
  },
  cloud: {
    h2Section: 'Cloud, hosting, and Microsoft 365',
    eyebrow: 'Cloud and Microsoft 365',
    h2: "Office server or cloud? Depends, and we'll tell you why.",
    paragraphs: [
      "We don't push anyone into the cloud, or out of it. Some clients have everything in Microsoft 365 and no office server; some need a local server for an old application that won't run elsewhere. Both are right, if done properly.",
      'We manage all of Microsoft 365: two-step verification, anti-phishing rules, clean permissions. We host applications and virtual servers in an ISO 27001-certified data center in Cluj-Napoca, with backup and replication. We migrate what needs migrating, without stopping the company, and explain the cost difference over a year, not a month.',
    ],
    example: 'Real example: for Cosmio, an accounting platform, we host and run the production servers: local backup, replication to another data center every 4 hours, quarterly recovery test.',
    caseLink: 'Read the case',
  },
  equipment: {
    h2Section: 'Equipment',
    eyebrow: 'Equipment',
    h2: 'We pick, buy, install, and answer for it afterward',
    paragraphs: [
      "We're not a store. When your company needs a laptop, server, switch, or firewall, we tell you what to buy and why. We buy it at vendor price, or you do, if you prefer. It reaches the employee configured and inventoried. When it breaks, we know exactly what it is, how old, and its warranty.",
      'We work with Fortinet for firewalls, Synology for NAS, Microsoft for licenses, and whatever fits your budget for laptops and servers. Partner statuses (Microsoft Partner, Fortinet Advocate, Veeam Partner) mean direct access to their support, not a commission behind your back.',
    ],
  },
  month: {
    eyebrow: 'A typical month',
    h2: 'What happens when nothing happens',
    p1: "The best months are the ones you don't call. That doesn't mean nothing got done. In a normal month we check daily: backups ran, no alerts. Updates go in announced windows: weekends or evenings, never Tuesday at 10. We answer your team's requests on WhatsApp, Cipri first, and fix what comes up. At month's end you get the report.",
    p2: 'The report is generated from tickets, not written from memory: what was asked, by whom, when, how long it took, what we did proactively, what we recommend next month.',
    figureCaption: 'A real monthly report, anonymized.',
    p3: "When something does happen, work-blocking incidents get priority and a response time written into the contract, not the website. Here, just this: by contract, during business hours, we respond in under two hours; in practice, the helpdesk average is under 30 minutes. Outside business hours there's an emergency number.",
  },
  fit: {
    eyebrow: 'Fit',
    h2: 'So neither of us wastes time',
    yesTitle: "It's for you if",
    yes: [
      'you have 10–100 employees and IT has become a worry, not an advantage;',
      'you want one partner accountable, not three vendors;',
      'you accept a monthly subscription instead of hourly invoices when things break;',
      "you want to know what's going on, every month, without asking.",
    ],
    noTitle: "It's not for you if",
    no: [
      'you just want "someone to come when it breaks";',
      'you already have a full in-house IT team and just want extra hands;',
      "you want the lowest price. We're not the cheapest and don't try to be.",
    ],
  },
  faq: {
    h2: 'FAQ',
    items: [
      { q: 'We already have someone. What happens to them?', a: 'They stay, if you want. The "alongside your IT person" option is made for this: they keep the day-to-day, we take over what they don\'t know or have no time for, and we\'re there when they\'re away. We\'ve seen it work for years.' },
      { q: 'How long does onboarding take?', a: 'The first 30 days: we document everything, change the passwords that need it, fix and test the backup, handle emergencies. After 30 days you get the first monthly report and a list of what we recommend next.' },
      { q: 'What happens if we cancel?', a: "You get all documentation, passwords, and access, in a format anyone can take over. We hold nothing hostage. The contract has a month's notice." },
      { q: 'Do you work with companies outside Cluj too?', a: "Yes. Almost everything is remote. For on-site work (network, equipment), around Cluj it's us; elsewhere in the country, a local technician." },
      { q: 'How is it billed?', a: 'Monthly, a fixed amount set after the health check, based on workstations, servers, and what we take over. Separate projects are quoted first. No "surprise" hours.' },
      { q: 'What does "security included" mean?', a: "That security isn't sold separately from administration. Two-step verification, managed antivirus, updates, tested backup, clean access are in the subscription, not paid extras. The full security audit and NIS2 or ISO 27001 preparation are separate projects.", link: { label: 'See security', href: '/en/services/security' } },
    ],
  },
};
