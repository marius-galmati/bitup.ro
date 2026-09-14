/**
 * Interface microcopy, English. Copied verbatim from spec/continut-en/00-global.md.
 * Page copy does NOT live here: it sits in each page's components, copied from spec/continut-en/NN-….md.
 * Marked “(added)”: text that isn't in 00-global, needed for accessibility; listed in NOTES.md, to confirm.
 */

export const en = {
  lang: 'en',
  siteName: 'BitUp',
  titleSeparator: ' · ',

  skipLink: 'Skip to content', // (added) skip link, DESIGN § Accesibilitate

  nav: {
    services: 'Services',
    servicesItems: [
      { label: 'IT support and administration', route: 'itSupport' },
      { label: 'Security and continuity', route: 'security' },
      { label: 'Automation and software', route: 'automation' },
      { label: 'All services', route: 'services' },
    ],
    howWeWork: 'How we work',
    results: 'Results',
    about: 'About',
    blog: 'Blog',
    primary: 'Free IT Health Check',
    menuOpen: 'Menu', // (added) aria-label for the hamburger button
    menuClose: 'Close menu', // (added)
    mobile: {
      call: 'Call: +40 757 150 894',
      clients: 'Clients: message Cipri on WhatsApp',
    },
  },

  langSwitch: { ariaLabel: 'Change language', ro: 'RO', en: 'EN', separator: ' · ' },
  theme: { ariaLabel: 'Switch theme: light / dark' },

  footer: {
    company: {
      name: 'BitUp Technology SRL',
      city: 'Cluj-Napoca, Romania',
      ids: 'VAT no. RO42613248 · Trade Register no. J12/1556/2020',
      linkedinLabel: 'LinkedIn: ',
      linkedinCompany: 'BitUp Technology',
    },
    services: [
      { label: 'IT support and administration', route: 'itSupport' },
      { label: 'Security and continuity', route: 'security' },
      { label: 'Automation and software', route: 'automation' },
      { label: 'Free IT Health Check', route: 'healthCheck' },
    ],
    companyLinks: [
      { label: 'How we work', route: 'howWeWork' },
      { label: 'Results', route: 'results' },
      { label: 'About', route: 'about' },
      { label: 'Blog', route: 'blog' },
      { label: 'Contact', route: 'contact' },
      { label: 'Client support', route: 'support' },
    ],
    partners: ['Microsoft Partner', 'Fortinet Advocate', 'Veeam Partner'],
    bottom: {
      copyright: '© 2026 BitUp Technology SRL',
      terms: 'Terms',
      privacy: 'Privacy',
      cookies: 'Cookies',
      cookieSettings: 'Cookie settings',
    },
  },

  consent: {
    title: 'Statistics cookies, only if you want them',
    text: "We use Google Analytics to see which pages get read and where visitors come from. It doesn't start until you accept, doesn't run ads, and doesn't sell anything to anyone. You can change your mind anytime from \"Cookie settings\" at the bottom of the page.",
    linkLabel: 'How we use cookies',
    accept: 'Accept',
    decline: 'Decline',
    currentAccepted: 'Currently: accepted',
    currentDeclined: 'Currently: declined',
    regionLabel: 'Cookies',
  },

  ctaBand: {
    default: {
      title: 'What would a day be like without worrying about systems, backups, and data security?',
      text: "Start with 30 minutes. We'll tell you exactly where you stand and what it would mean for us to take that worry off your hands.",
      button: 'Book the IT Health Check',
      contactLine: '+40 757 150 894 · office@bitup.ro',
    },
    blog: {
      title: 'Want to see where your company stands with IT?',
      text: "30 minutes, remote, 10 checks, one page with what's fine, what's urgent, and what it would cost. No obligations.",
      button: 'Book the IT Health Check',
    },
  },

  factStrip: {
    since: 'Since 2020',
    city: 'Cluj-Napoca',
    response: 'Response under 2 hours during business hours',
    partners: ['Microsoft Partner', 'Fortinet Advocate', 'Veeam Partner'],
  },

  formSignature: 'A person replies, within one business day.',

  consentCheckbox: {
    before: "I agree that BitUp Technology SRL may use the details above to reply to this request. We don't use them for anything else and don't pass them on. Details in the ",
    linkLabel: 'Privacy policy',
    after: '.',
  },

  form: {
    required: (field: string) => `Fill in ${field} so we can call you back.`,
    emailInvalid: "That email doesn't look right. Please check it.",
    phoneInvalid: 'Write the number with the prefix, for example 0740 123 456.',
    sendError: "It didn't send. Not your fault. Your text is still here; try again in a minute, or call us directly at +40 757 150 894 / write to office@bitup.ro.",
    turnstileFailed: "The anti-spam check didn't pass. Reload the page and try again; if it keeps happening, email us directly at office@bitup.ro.",
    sending: 'Sending…',
    noscript: 'The form needs JavaScript for the anti-spam check. Call +40 757 150 894, write to office@bitup.ro, or pick a time in the calendar.',
  },

  thankYou: {
    title: 'Got it. What happens next',
    description: "Your request has reached us. Here's what happens next.",
    radiografie: {
      h1: "Got it. We'll call you.",
      text: "The request came to us, not to a queue. We'll call within one business day, we'll pick a 30-minute slot for the health check, and we'll tell you what we need from you beforehand (almost nothing: who your IT person is, if any, and what brought you here).",
      calendlyBefore: "If you'd rather skip the call, pick a 30-minute slot directly: ",
      calendlyLabel: 'Pick a time in the calendar',
      meanwhile: 'Meanwhile, two useful things: ',
      links: [
        { label: 'How a health check works', route: 'healthCheck', anchor: 'how-it-works' },
        { label: 'How we work afterward', route: 'howWeWork' },
      ],
    },
    contact: {
      h1: 'Got your message.',
      text: "We'll reply personally, within one business day, from office@bitup.ro. If it's urgent, call +40 757 150 894.",
      calendlyBefore: 'Want to talk directly? ',
      calendlyLabel: 'Pick a 30-minute slot',
    },
  },

  notFound: {
    title: 'Page not found',
    h1: "This page doesn't exist.",
    text: "Maybe it moved when we rebuilt the site, maybe it's a typo. What you're looking for is most likely here:",
    links: [
      { label: 'Services', route: 'services' },
      { label: 'Free IT Health Check', route: 'healthCheck' },
      { label: 'How we work', route: 'howWeWork' },
      { label: 'Contact', route: 'contact' },
    ],
    under: "If you got here from a link on another site, email us at office@bitup.ro and we'll fix it.",
  },

  misc: {
    whatsappButton: 'Message Cipri on WhatsApp',
    readTime: (minutes: number) => `${minutes} min read`,
    draft: 'Draft, unpublished',
    legalUpdated: 'Last updated: September 10, 2026',
    externalRel: 'noopener',
  },
} as const;
