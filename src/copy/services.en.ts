/** /en/services copy, verbatim from spec/continut-en/02-services.md. */
import type { ServicesCopy } from './services.ro';

export const servicesEn: ServicesCopy = {
  title: 'IT services: support, security, automation · BitUp',
  description: 'Three service groups that go together: IT support and administration, security and continuity, automation and software. One partner accountable.',
  hero: {
    eyebrow: 'Services',
    h1: 'Three service groups. One partner accountable.',
    lead: 'You can take them separately. They work best together: security and backup are part of how you run IT, not added afterward.',
  },
  groups: [
    {
      title: 'IT support and administration',
      position: 'Monthly subscription. We take over everything to do with computers, servers, network, cloud, and Microsoft 365, and answer for the result.',
      includesLabel: 'Includes:', includes: 'employee support (WhatsApp, with Cipri and a person), server and workstation administration, Microsoft 365, updates, managed antivirus/EDR, cloud and hosting, choosing and installing equipment, monthly report.',
      forLabel: 'For:', forWho: 'companies of 10–100 employees that want to stop thinking about IT.',
      link: 'See what the subscription includes', route: 'itSupport',
    },
    {
      title: 'Security and continuity',
      position: 'Protection you put in place before, not after. And proof you can recover when something happens.',
      includesLabel: 'Includes:', includes: 'protection against attacks, access and passwords under control, tested backup, continuity plan, security audit, NIS2 and ISO 27001 turned into concrete steps.',
      forLabel: 'For:', forWho: "any company with data it can't run without; mandatory for those with compliance requirements.",
      link: 'See what we protect and how', route: 'security',
    },
    {
      title: 'Automation and software',
      position: "When a process lives in Excel, over email, and in someone's head, we move it into a system.",
      includesLabel: 'Includes:', includes: 'automation between the applications you already have, AI assistants with a clear purpose, applications built for you when nothing suitable exists, integrations.',
      forLabel: 'For:', forWho: 'companies losing hours a week on the same things done by hand.',
      link: 'See real examples', route: 'automation',
    },
  ],
  combine: {
    eyebrow: 'How they combine',
    h2: 'Why we keep them together',
    paragraphs: [
      "Most companies we work with start with the support subscription. It's what they need daily. Security comes with it: there's no running a server without securing it, and we don't see why you'd pay separately. Same for backup.",
      "Automation and software come later, from the relationship. After a few months of seeing how your company works, we figure out where the hours are lost. That's when it makes sense to talk about them, not at the first meeting.",
      "You can also start the other way: with a security audit or a one-off automation. If it goes well, the subscription follows naturally. We don't push anyone toward it.",
    ],
  },
  not: {
    eyebrow: 'To be clear',
    h2: "What we don't do",
    items: [
      "We don't sell equipment without also installing it and answering for it afterward.",
      "We don't take development projects we can't also maintain.",
      'We don\'t promise "total security". We reduce the risk and prepare the recovery. Whoever promises otherwise is lying.',
      'We don\'t work with companies that only want "someone to come when it breaks". There are others for that, cheaper, and that\'s fine.',
    ],
  },
};
