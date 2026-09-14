/** /en/cookies copy, verbatim from spec/continut-en/15-cookies.md. */
import type { LegalCopy } from './legal.types';

export const cookiesEn: LegalCopy = {
  title: 'Cookie policy · BitUp',
  description: 'Which cookies bitup.ro sets, what they do, how long they stay, and how to decline or delete them. The full list is short.',
  h1: 'Cookie policy',
  sections: [
    { id: 'in-short', h2: 'In short', blocks: [
      { p: ['Without asking, the site sets only technical cookies: the one that remembers your choice in the cookie banner and, from Cloudflare, one for bot protection. Google Analytics statistics run only if you press "Accept". No advertising cookies.'] },
      { button: 'consent', label: 'Open cookie settings' },
    ] },
    { id: 'what-a-cookie-is', h2: 'What a cookie is', blocks: [
      { p: ["A small file the site saves in your browser to remember something between two pages or two visits: a choice you made, that you've been here before. Some are needed for the site to work properly; others serve statistics. Besides cookies, the browser has \"local storage\" (localStorage), which we use for one thing, described below."] },
    ] },
    { id: 'what-we-use', h2: 'What we use', blocks: [
      { p: [{ b: "Necessary (no consent, because without them the site can't respect your choice):" }] },
      { table: { head: ['Name', 'Set by', "What it's for", 'How long it stays'], rows: [
        [[{ code: 'bitup-consent' }], ['bitup.ro'], ["Remembers whether you accepted or declined statistics, so we don't show the banner on every page."], ['6 months']],
        [[{ code: 'bitup-theme' }, ' (local storage, not a cookie)'], ['bitup.ro'], ['Remembers whether you chose the light or dark theme. Never leaves your browser.'], ['Until you delete it']],
        [[{ code: '__cf_bm' }], ['Cloudflare'], ["Tells real visitors from bots, as part of the site's protection."], ['30 minutes']],
      ] } },
      { p: [{ b: 'Statistics (only with your consent):' }] },
      { table: { head: ['Name', 'Set by', "What it's for", 'How long it stays'], rows: [
        [[{ code: '_ga' }], ['Google Analytics'], ['A random ID that tells visitors apart, so we count how many people read a page, not how many clicks.'], ['2 years']],
        [[{ code: '_ga_XXXXXXXX' }], ['Google Analytics'], ['Remembers the current session (when you came in, how many pages you saw).'], ['2 years']],
      ] } },
      { p: ["With them we learn which pages get read, where visitors come from (search, LinkedIn, direct), on which devices, and from which area (approximate city, not address). We don't learn who you are. Google truncates the IP address before storing it; Google Signals and any link to advertising are off. Detailed data is deleted after 2 months."] },
      { p: ["Google LLC is in the USA; the transfer is covered by Google's EU-US Data Privacy Framework certification. How Google handles the data: policies.google.com/privacy."] },
      { p: [{ b: "What we don't use:" }, ' advertising or remarketing cookies, Meta, LinkedIn, or TikTok pixels, heatmaps, session recordings, third-party chats. The anti-spam check on the forms (Cloudflare Turnstile) sets no cookies. The booking link (Calendly) takes you to their site, where their policy applies.'] },
    ] },
    { id: 'how-you-choose', h2: 'How you choose', blocks: [
      { p: ['On your first visit, a banner appears with two equal buttons, "Accept" and "Decline". If you close it with Esc or choose nothing, statistics stay off. Any time after, you can change your choice from the "Cookie settings" link at the bottom of any page or the button above. If you switch from Accept to Decline, we delete the ', { code: '_ga' }, ' cookies on our domain right away.'] },
      { p: ['You can also delete or block cookies in your browser settings. The site works fine with cookies blocked; the only effect is the banner reappearing on every visit, because we have nowhere left to remember your choice.'] },
    ] },
    { id: 'more', h2: 'More', blocks: [
      { p: ['How we handle the data you send through forms is described in the ', { a: 'Privacy policy', to: 'privacy' }, '. Questions: office@bitup.ro.'] },
    ] },
  ],
};
