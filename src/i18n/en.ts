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

  layers: {
    ariaLabel: 'BitUp services, as layers on a security foundation',
    items: ['Cybersecurity', 'Infrastructure', 'Software development', 'Automation', 'AI agents'],
    foundation: 'the foundation',
    managed: 'Managed IT and support',
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
