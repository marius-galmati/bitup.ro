/** /en/contact copy, verbatim from spec/continut-en/11-contact.md. */
import type { ContactCopy } from './contact.ro';

export const contactEn: ContactCopy = {
  title: 'Contact · BitUp Technology, Cluj-Napoca',
  description: 'Phone, email, a form, or a 30-minute slot in the calendar. We reply personally, within one business day. Cluj-Napoca.',
  hero: {
    eyebrow: 'Contact',
    h1: 'Write to us. We answer, not a form.',
    leadBefore: 'If you want to see where your company stands with IT, the best start is the ',
    leadLink: 'free IT Health Check',
    leadAfter: '. For anything else, every way to reach us is here.',
  },
  ways: {
    phone: { label: 'Phone', hours: 'Monday–Friday, 8:00–18:00' },
    email: { label: 'Email', note: 'reply within one business day' },
    book: { label: 'Book directly', text: 'Pick a 30-minute slot in the calendar' },
    clients: { label: 'Existing clients', text: 'Message Cipri on WhatsApp or open a ticket' },
    where: { label: 'Where', value: 'Cluj-Napoca' },
    company: { label: 'Company', value: 'BitUp Technology SRL · VAT no. RO42613248 · Trade Register no. J12/1556/2020' },
    linkedin: { label: 'LinkedIn', personal: 'Marius Galmati', company: 'BitUp' },
  },
  form: {
    title: 'Send a message',
    name: 'Your name', company: 'Company', email: 'Email', phone: 'Phone (optional)',
    message: 'How can we help?', messagePlaceholder: 'Write in your own words. No technical terms needed.',
    button: 'Send message',
  },
  after: {
    eyebrow: 'After',
    h2: 'What happens after you send',
    before: "The message lands on a phone, not in an inbox someone checks on Fridays. A person replies, within one business day, from office@bitup.ro. If it's better handled by phone, we call you. If it's an emergency and you're a client, use the emergency number on the ",
    link: 'support',
    after: ' page, not the form.',
  },
  under: { before: 'Prefer to see how we work first?', link1: 'How we work', link2: 'Results' },
};
