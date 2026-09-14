/** Textul paginii /contact, copiat exact din spec/continut/11-contact.md. */
import type { FormLabels } from '../components/Form.astro';

export interface ContactCopy {
  title: string; description: string;
  hero: { eyebrow: string; h1: string; leadBefore: string; leadLink: string; leadAfter: string };
  ways: {
    phone: { label: string; hours: string };
    email: { label: string; note: string };
    book: { label: string; text: string };
    clients: { label: string; text: string };
    where: { label: string; value: string };
    company: { label: string; value: string };
    linkedin: { label: string; personal: string; company: string };
  };
  form: FormLabels;
  after: { eyebrow: string; h2: string; before: string; link: string; after: string };
  under: { before: string; link1: string; link2: string };
}

export const contactRo: ContactCopy = {
  title: 'Contact · BitUp Technology, Cluj-Napoca',
  description: 'Telefon, email, formular sau un slot de 30 de minute în calendar. Îți răspundem personal, în maximum o zi lucrătoare. Cluj-Napoca.',
  hero: {
    eyebrow: 'Contact',
    h1: 'Scrie-ne. Răspundem, nu un formular.',
    leadBefore: 'Dacă vrei să vezi unde stă firma ta cu IT-ul, cel mai bun început e ',
    leadLink: 'Radiografia IT gratuită',
    leadAfter: '. Pentru orice altceva, ai aici toate căile.',
  },
  ways: {
    phone: { label: 'Telefon', hours: 'luni–vineri, 08:00–18:00' },
    email: { label: 'Email', note: 'răspuns în maximum o zi lucrătoare' },
    book: { label: 'Programează direct', text: 'Alege un slot de 30 de minute în calendar' },
    clients: { label: 'Clienți existenți', text: 'Scrie-i lui Cipri pe WhatsApp sau deschide un tichet' },
    where: { label: 'Unde', value: 'Cluj-Napoca' },
    company: { label: 'Firma', value: 'BitUp Technology SRL · CUI RO42613248 · J12/1556/2020' },
    linkedin: { label: 'LinkedIn', personal: 'Marius Galmati', company: 'BitUp' },
  },
  form: {
    title: 'Trimite un mesaj',
    name: 'Numele tău', company: 'Firma', email: 'Email', phone: 'Telefon (opțional)',
    message: 'Cu ce te putem ajuta?', messagePlaceholder: 'Scrie cu cuvintele tale. Nu ai nevoie de termeni tehnici.',
    button: 'Trimite mesajul',
  },
  after: {
    eyebrow: 'După',
    h2: 'Ce se întâmplă după ce trimiți',
    before: 'Mesajul ajunge la noi, pe telefon, nu într-o căsuță pe care o verifică cineva vinerea. Îți răspunde un om, în maximum o zi lucrătoare, de la office@bitup.ro. Dacă e ceva ce se rezolvă mai bine la telefon, te sunăm. Dacă e o urgență și ești client, folosește numărul de urgență de pe pagina de ',
    link: 'suport',
    after: ', nu formularul.',
  },
  under: { before: 'Preferi să vezi întâi cum lucrăm?', link1: 'Cum lucrăm', link2: 'Rezultate' },
};
