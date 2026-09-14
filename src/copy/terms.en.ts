/** /en/terms copy, verbatim from spec/continut-en/13-terms.md. */
import type { LegalCopy } from './legal.types';

export const termsEn: LegalCopy = {
  title: 'Terms of use · BitUp',
  description: "Who runs bitup.ro, what you can and can't do with its content, what we guarantee and what we don't. Short, in plain language.",
  h1: 'Terms of use',
  sections: [
    { id: 'who-we-are', h2: 'Who we are', blocks: [
      { p: ['bitup.ro is run by BitUp Technology SRL, a company registered in Romania, registered office in Câmpia Turzii, Str. Lazăr Gheorghe nr. 60, Cluj County, Romania, VAT no. RO42613248, Trade Register no. J12/1556/2020. We work out of Cluj-Napoca. Reach us at office@bitup.ro and +40 757 150 894.'] },
      { p: ['In the text below, "we" means BitUp Technology SRL, and "you" means the person using the site.'] },
    ] },
    { id: 'what-this-site-is', h2: 'What this site is', blocks: [
      { p: ['bitup.ro is a company website, informational only. It tells you what we offer, how we work, and how to contact us. Nothing is sold or bought through the site: no orders, payments, or user accounts. Any collaboration starts with a conversation and is signed separately, in a contract.'] },
      { p: ['The forms on the site (the IT Health Check request and the contact form) are requests to be contacted, not orders. Sending one creates no obligations for either side. The IT Health Check is free and commits you to nothing afterwards.'] },
    ] },
    { id: 'content', h2: 'What you can do with the content', blocks: [
      { p: ['The texts, photos, screenshots, diagrams, and BitUp logo on the site are ours, except client and partner logos, which are theirs and appear with their permission.'] },
      { p: ["You can read, save, and print the pages for your own use. You can quote short excerpts from articles, with a link to the source. You can't copy whole pages, articles, or case studies to other sites, use Marius's photos or the site's logos for other purposes, or present the content as your own. To republish an article in full, write to us; we usually say yes, with a link."] },
    ] },
    { id: 'guarantees', h2: "What we guarantee and what we don't", blocks: [
      { p: ["We do our best to keep the site accurate and up to date, but it's a general presentation, not an offer and not advice for your situation. What it says about services (what's included, response times, how we work) describes how we usually work; what applies to you is what's in the contract signed with you. If the site and the contract differ, the contract wins."] },
      { p: ["The blog articles are our experience and our opinion. We write them to be useful, but applying them in your company is your responsibility. On data security, an article doesn't replace a conversation about your actual situation."] },
      { p: ["We are not liable for damages from using the site or being unable to use it (for example, if it's temporarily unavailable), to the extent permitted by law."] },
    ] },
    { id: 'links', h2: 'Links to other sites', blocks: [
      { p: ["The site links to sites we don't control: LinkedIn, Calendly, our support portal helpdesk.bitup.ro (which has its own rules, communicated to clients), the sites of clients in the case studies, partner sites. What happens there is governed by their terms and policies."] },
    ] },
    { id: 'case-studies', h2: 'Case studies', blocks: [
      { p: ["Case studies that name the client are published only with that client's written consent and describe real projects. Their figures come from contracts or measurements, not estimates. A client can withdraw consent at any time, and the case study comes off the site."] },
    ] },
    { id: 'data-and-cookies', h2: 'Personal data and cookies', blocks: [
      { p: ['How we handle the data you send through forms and which cookies the site uses is described separately, in the ', { a: 'Privacy policy', to: 'privacy' }, ' and the ', { a: 'Cookie policy', to: 'cookies' }, '. In short: we use form data to reply to you, and traffic statistics (Google Analytics) run only if you accept them.'] },
    ] },
    { id: 'changes', h2: 'Changes', blocks: [
      { p: ["We may change these terms when the site or the law changes. The version in force is the one on this page, with the date above. We don't send notifications; if you use the site after a change, the new version applies."] },
    ] },
    { id: 'law', h2: 'Law and disputes', blocks: [
      { p: ['These terms are governed by Romanian law. If a disagreement comes up, we sort it out by talking first; if that fails, the competent courts are those in Romania, at our registered office.'] },
    ] },
    { id: 'contact', h2: 'Contact', blocks: [
      { p: ['For any question about these terms: office@bitup.ro.'] },
    ] },
  ],
};
