/** Textul paginii /cookies, copiat exact din spec/continut/15-cookies.md. */
import type { LegalCopy } from './legal.types';

export const cookiesRo: LegalCopy = {
  title: 'Politica de cookie-uri · BitUp',
  description: 'Ce cookie-uri pune bitup.ro, ce fac, cât stau și cum le refuzi sau le ștergi. Lista completă e scurtă.',
  h1: 'Politica de cookie-uri',
  sections: [
    { id: 'pe-scurt', h2: 'Pe scurt', blocks: [
      { p: ['Fără să te întrebe, site-ul pune doar cookie-uri tehnice: cel în care ține minte ce ai ales în bannerul de cookie-uri și, din partea Cloudflare, unul de protecție împotriva boților. Statisticile Google Analytics pornesc doar dacă apeși „Accept”. Nu avem cookie-uri de reclame.'] },
      { button: 'consent', label: 'Deschide setările cookie-urilor' },
    ] },
    { id: 'ce-e-un-cookie', h2: 'Ce e un cookie', blocks: [
      { p: ['Un fișier mic pe care site-ul îl salvează în browserul tău ca să țină minte ceva între două pagini sau două vizite. O alegere pe care ai făcut-o, faptul că ai mai fost aici. Unele sunt necesare ca site-ul să funcționeze cum trebuie; altele servesc la statistici. Pe lângă cookie-uri, browserul mai are o „stocare locală” (localStorage), pe care o folosim pentru un singur lucru, spus mai jos.'] },
    ] },
    { id: 'ce-folosim', h2: 'Ce folosim', blocks: [
      { p: [{ b: 'Necesare (fără consimțământ, pentru că fără ele site-ul nu poate respecta alegerea ta):' }] },
      { table: { head: ['Nume', 'Pus de', 'La ce folosește', 'Cât stă'], rows: [
        [[{ code: 'bitup-consent' }], ['bitup.ro'], ['Ține minte dacă ai acceptat sau refuzat statisticile, ca să nu-ți arătăm bannerul la fiecare pagină.'], ['6 luni']],
        [[{ code: 'bitup-theme' }, ' (stocare locală, nu cookie)'], ['bitup.ro'], ['Ține minte dacă ai ales tema luminoasă sau întunecată. Nu pleacă din browserul tău.'], ['Până o ștergi']],
        [[{ code: '__cf_bm' }], ['Cloudflare'], ['Deosebește vizitatorii reali de boți, ca parte din protecția site-ului.'], ['30 de minute']],
      ] } },
      { p: [{ b: 'Statistici (doar cu consimțământul tău):' }] },
      { table: { head: ['Nume', 'Pus de', 'La ce folosește', 'Cât stă'], rows: [
        [[{ code: '_ga' }], ['Google Analytics'], ['Un identificator aleatoriu care deosebește vizitatorii între ei, ca să putem număra câți oameni citesc o pagină, nu câte clickuri.'], ['2 ani']],
        [[{ code: '_ga_XXXXXXXX' }], ['Google Analytics'], ['Ține minte sesiunea curentă (când ai intrat, câte pagini ai văzut).'], ['2 ani']],
      ] } },
      { p: ['Cu ele aflăm ce pagini se citesc, de unde vin vizitatorii (căutare, LinkedIn, direct), de pe ce dispozitive și din ce zonă (oraș aproximativ, nu adresă). Nu aflăm cine ești. Google trunchiază adresa IP înainte s-o stocheze; am dezactivat Google Signals și orice legătură cu reclamele. Datele detaliate se șterg după 2 luni.'] },
      { p: ['Google LLC e în SUA; transferul e acoperit de certificarea Google în EU-US Data Privacy Framework. Cum tratează Google datele: policies.google.com/privacy.'] },
      { p: [{ b: 'Ce nu folosim:' }, ' cookie-uri de reclame sau remarketing, pixeli Meta, LinkedIn sau TikTok, hărți de căldură, înregistrări de sesiune, chat-uri terțe. Verificarea anti-spam a formularelor (Cloudflare Turnstile) nu pune cookie-uri. Linkul de programare (Calendly) te duce pe site-ul lor, unde se aplică politica lor.'] },
    ] },
    { id: 'cum-alegi', h2: 'Cum alegi', blocks: [
      { p: ['La prima vizită apare un banner cu două butoane egale, „Accept” și „Refuz”. Dacă închizi bannerul cu Esc sau nu alegi nimic, statisticile rămân oprite. Oricând după, poți schimba alegerea din linkul „Setări cookie-uri” din josul oricărei pagini sau din butonul de mai sus. Dacă treci de la Accept la Refuz, ștergem pe loc cookie-urile ', { code: '_ga' }, ' de pe domeniul nostru.'] },
      { p: ['Poți și să ștergi sau să blochezi cookie-urile din setările browserului. Site-ul funcționează fără probleme și cu cookie-urile blocate; singurul efect e că bannerul va reapărea la fiecare vizită, pentru că nu mai avem unde ține minte alegerea ta.'] },
    ] },
    { id: 'mai-mult', h2: 'Mai mult', blocks: [
      { p: ['Cum tratăm datele pe care ni le trimiți prin formulare e descris în ', { a: 'Politica de confidențialitate', to: 'privacy' }, '. Întrebări: office@bitup.ro.'] },
    ] },
  ],
};
