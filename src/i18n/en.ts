/**
 * Interface microcopy, English. Same shape as ro.ts (checked by `astro check` through `t()`).
 */
import type { ro } from './ro';

export const en: typeof ro = {
  lang: 'en',
  siteName: 'BitUp Technology',
  titleSeparator: ' · ',

  skipLink: 'Skip to content',
  logoAlt: 'BitUp Technology, home page',

  langSwitch: { ariaLabel: 'Site language', ro: 'RO', en: 'EN' },
  theme: { ariaLabel: 'Dark theme' },

  breadcrumb: { ariaLabel: 'You are here', home: 'Home' },

  nav: {
    ariaLabel: 'Main navigation',
    services: 'Services',
    projects: 'Projects',
    nis2: 'NIS2',
    about: 'About',
    blog: 'Blog',
    contact: 'Contact',
    allServices: 'All services',
    cloud: 'BitUp Cloud',
    cta: 'Tell us the problem',
    menuOpen: 'Open the menu',
    menuClose: 'Close the menu',
    menu: 'Menu',
  },

  footer: {
    services: 'Services',
    company: 'Company',
    contact: 'Contact',
    clients: 'For existing clients',
    helpdesk: 'Helpdesk',
    whatsapp: 'WhatsApp support',
    partners: 'Partners',
    legalAria: 'Legal information',
    terms: 'Terms',
    privacy: 'Privacy',
    cookies: 'Cookies',
    cookieSettings: 'Cookie settings',
  },

  notFound: {
    title: 'This page does not exist',
    text: 'The address does not lead to any page on the site. It may have moved, or it may contain a typo.',
    home: 'Go to the home page',
    services: 'See the services',
    contact: 'Write to us',
  },

  layers: {
    ariaLabel: 'BitUp services, as layers on a security foundation',
    items: ['Cybersecurity', 'Infrastructure', 'Software development', 'Automation', 'AI agents'],
    foundation: 'the foundation',
    managed: 'Managed IT and support',
  },

  heroStack: {
    straturi: ['Cybersecurity', 'Infrastructure', 'Software development', 'Automation', 'AI agents'],
    fundatia: 'the foundation',
    ariaLabel: 'Security sits at the base of every service',
  },

  consent: {
    title: 'Statistics cookies, only with your consent',
    text: 'We use Google Analytics to see which pages get read and where visitors come from. It does not start until you accept. You can change your choice anytime from "Cookie settings" at the bottom of the page.',
    linkLabel: 'How we use cookies',
    accept: 'Accept',
    decline: 'Decline',
    regionLabel: 'Cookies',
  },

  form: {
    required: 'required',
    optional: 'optional',
  },
};
