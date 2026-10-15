/** /en/privacy copy, verbatim from spec/continut-en/14-privacy.md. */
import type { LegalCopy } from './legal.types';

export const privacyEn: LegalCopy = {
  title: 'Privacy policy · BitUp',
  description: 'What data we collect through bitup.ro, why, how long we keep it, who else sees it, and what rights you have. Written to be read, not ticked off.',
  h1: 'Privacy policy',
  sections: [
    { id: 'in-short', h2: 'In short', blocks: [
      { p: ["We collect the data you hand us yourself, through forms, so we can reply. We don't sell it, pass it on for advertising, or use it for anything other than what you asked. Traffic statistics run only if you accept them in the banner. The rest of this page says the same, with the details the law requires."] },
    ] },
    { id: 'controller', h2: 'Who is accountable for your data', blocks: [
      { p: ["The data controller is BitUp Technology SRL, registered office in Câmpia Turzii, Str. Lazăr Gheorghe nr. 60, Cluj County, Romania, VAT no. RO42613248, Trade Register no. J12/1556/2020. For anything about your data, write to office@bitup.ro or call +40 757 150 894. We have no data protection officer; the law doesn't require one at our size, and Marius Galmati answers personally."] },
    ] },
    { id: 'what-data', h2: 'What data we collect and why', blocks: [
      { p: [{ b: 'When you send a form' }, ' (the IT Health Check request or the contact form): your name, company, number of employees (for the IT Health Check), phone, email, and message. We also save the page you sent from, where you came from (UTM parameters, if any), date and time, and the IP address with country, from Cloudflare. We use the data to contact you and reply to what you asked. The legal basis is that you asked us to contact you (steps before a possible contract, Article 6(1)(b) GDPR) and our legitimate interest in keeping a record of requests and keeping spam out (point (f)).'] },
      { p: [{ b: 'When you browse the site' }, ": the site is hosted on our own server in Romania, and pages reach you through Cloudflare's network. Cloudflare processes the IP address and the request's technical details (browser, page, time) to deliver pages and stop attacks. We see these logs only in aggregate. The basis is the legitimate interest in a site that works and is secure."] },
      { p: [{ b: 'When you accept statistics' }, ": Google Analytics 4 sets cookies and records pages visited, duration, device type, country and approximate city, and where you came from. Google truncates the IP address before storing it. Google Signals and ad personalization are off; we don't do remarketing. The basis is your consent, given in the banner, which you can withdraw any time from \"Cookie settings\" at the bottom of the page. Details in the ", { a: 'Cookie policy', to: 'cookies' }, '.'] },
      { p: [{ b: 'When you use the anti-spam check' }, ': the forms are protected by Cloudflare Turnstile, which checks, without asking you anything, whether the submission comes from a person or a script. Turnstile processes technical browser data for this. The basis is the legitimate interest in not getting spam.'] },
      { p: [{ b: 'When you book a conversation through Calendly' }, ': the link takes you to calendly.com, where Calendly collects your name, email, and chosen time, under their privacy policy. We get the booking details so we can meet at the agreed time.'] },
      { p: [{ b: 'When you email or call us' }, ': we keep the correspondence like any company, as long as needed to reply and keep a record of the relationship.'] },
      { p: ["We don't collect data about children, don't ask for sensitive data, and don't make automated decisions about you."] },
    ] },
    { id: 'retention', h2: 'How long we keep the data', blocks: [
      { p: ["Form requests that don't lead to a collaboration: 12 months from submission, then deleted. Requests that become contracts: for the contract's duration and, after, as long as the law requires for accounting and contract documents (generally 5 years, 10 for some financial documents). Cloudflare technical logs: per Cloudflare's policy, a matter of days. Our server's logs don't contain IP addresses and are deleted automatically, by rotation. Google Analytics: 2 months for detailed data (we set the minimum retention); aggregate reports stay in the account. Emails: as long as the relationship lasts and a reasonable time after."] },
    ] },
    { id: 'who-sees', h2: 'Who else sees the data', blocks: [
      { p: ["We don't sell or rent data. Only those who need it to run the site and communication see it:"] },
      { ul: [
        [{ b: 'Cloudflare, Inc.' }, " (USA, with EU data centers): delivery network, attack protection, Turnstile. Transfer to the USA covered by Cloudflare's EU-US Data Privacy Framework certification and standard contractual clauses."],
        [{ b: 'Resend, Inc.' }, ' (USA): the service that gets forms to our email. Form data passes through Resend as email and is kept there briefly, for the sending log. Transfer covered by standard contractual clauses.'],
        [{ b: 'Microsoft' }, ' (Microsoft 365, EU): the office@bitup.ro mailbox, where requests arrive.'],
        [{ b: 'Google LLC' }, " (USA): Google Analytics, only if you accepted statistics. Transfer covered by Google's EU-US Data Privacy Framework certification."],
        [{ b: 'Calendly LLC' }, ' (USA): only if you use the booking link.'],
        [{ b: 'Authorities' }, ', if the law requires it.'],
      ] },
      { p: ['All providers above are processors acting on our instructions, under their data processing agreements. We use no other tracking services, place no ad pixels, and share no data with advertising networks.'] },
    ] },
    { id: 'your-rights', h2: 'Your rights', blocks: [
      { p: ['You can ask us any time: what data we hold about you (access), to correct it, delete it, restrict its use, hand it over in a format you can take elsewhere (portability), or to object to processing based on legitimate interest. You can withdraw consent for statistics any time from "Cookie settings", without affecting what happened before.'] },
      { p: ["Write to office@bitup.ro; we reply within a month at most, usually within days. It's free. If you're not happy with our reply, you can go to the National Supervisory Authority for Personal Data Processing (ANSPDCP), B-dul G-ral. Gheorghe Magheru 28-30, sector 1, București, anspdcp@dataprotection.ro, www.dataprotection.ro."] },
    ] },
    { id: 'protection', h2: 'How we protect the data', blocks: [
      { p: ["The site is served over HTTPS only. Forms reach us through a function on our own server, with access keys kept on the server, not in the page. The mailbox has two-step verification. Request data isn't stored in the site (it's static); it lives in email and, for clients, in our helpdesk system, with separate access per client. We do for ourselves what we tell clients to do."] },
    ] },
    { id: 'changes', h2: 'Changes', blocks: [
      { p: ['When we change how we handle data (a new provider, a new purpose), we update this page and its date. For changes that would affect you significantly, we ask for consent again where consent is the basis.'] },
    ] },
    { id: 'contact', h2: 'Contact', blocks: [
      { p: ['For anything about your data: office@bitup.ro · +40 757 150 894 · BitUp Technology SRL, Câmpia Turzii, Str. Lazăr Gheorghe nr. 60, Cluj County, Romania.'] },
    ] },
  ],
};
