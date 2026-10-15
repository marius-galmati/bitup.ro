/**
 * Verificare locală, fără cheie Resend (PLAN § Faza 4a): cererea către Resend construită de `buildEmail` din server/lead.ts,
 * plus validarea și regula de origine. Rulare: node qa/lead-email.test.mjs (Node ≥ 22.18 citește TypeScript direct, fără build).
 */
import assert from 'node:assert/strict';
import { buildEmail, validate, originAllowed, parseOrigins } from '../server/lead.ts';

const base = {
  kind: 'radiografie', lang: 'ro', name: 'Ana Pop', company: 'Firma Test SRL', employees: '10–30', phone: '0740 123 456', email: 'ana@firma-test.ro',
  message: 'Nu știu dacă backup-ul merge.', consent: true, source: '/radiografie-it', utm: { source: 'linkedin', medium: 'social', campaign: 'toamna', content: '' },
  referrer: 'https://www.linkedin.com/', turnstileToken: 'token', website: '', ts: '2026-09-14T12:00:00.000Z',
};
const meta = { ip: '203.0.113.7', country: 'RO', receivedAt: '2026-09-14T12:00:01.000Z' };

const ro = buildEmail(base, meta, 'office@bitup.ro');
assert.equal(ro.from, 'BitUp site <site@notifications.bitup.ro>');
assert.deepEqual(ro.to, ['office@bitup.ro']);
assert.equal(ro.reply_to, 'ana@firma-test.ro');
assert.equal(ro.subject, '[Radiografie IT] Firma Test SRL · Ana Pop');
for (const needle of ['Nume: Ana Pop', 'Firmă: Firma Test SRL', 'Angajați: 10–30', 'Telefon: 0740 123 456', 'Email: ana@firma-test.ro', 'Pagina (source): /radiografie-it', 'utm_source: linkedin', 'utm_medium: social', 'utm_campaign: toamna', 'utm_content: -', 'Referrer: https://www.linkedin.com/', 'Trimis (ts): 2026-09-14T12:00:00.000Z', 'IP: 203.0.113.7', 'Țară: RO', '--- Mesaj (textul persoanei, ca atare) ---\nNu știu dacă backup-ul merge.\n--- Sfârșit mesaj ---']) {
  assert.ok(ro.text.includes(needle), `lipsește din text: ${needle}`);
}
assert.deepEqual(ro.tags, [{ name: 'kind', value: 'radiografie' }, { name: 'lang', value: 'ro' }]);

const en = buildEmail({ ...base, kind: 'contact', lang: 'en', employees: undefined, message: 'Hello' }, meta, 'office@bitup.ro');
assert.equal(en.subject, '[Contact] Firma Test SRL · Ana Pop · EN');
assert.ok(!en.text.includes('Angajați'), 'contactul nu are rândul Angajați');

// validarea
assert.deepEqual(validate(base), []);
assert.deepEqual(validate({ ...base, consent: false }), ['consent']);
assert.deepEqual(validate({ ...base, message: 'x'.repeat(5001) }), ['message']);
assert.deepEqual(validate({ ...base, email: 'nu-e-email' }), ['email']);
assert.deepEqual(validate({ ...base, phone: '12345' }), ['phone']);
assert.deepEqual(validate({ ...base, kind: 'contact', employees: undefined, message: '' }), ['message']);
assert.deepEqual(validate({ ...base, kind: 'contact', employees: undefined, phone: '' }), []); // telefonul e opțional la contact

// originea
const req = (origin, host = 'bitup.ro') => new Request('https://x/api/lead', { method: 'POST', headers: { Origin: origin, Host: host } });
assert.equal(originAllowed(req('https://bitup.ro')), true);
assert.equal(originAllowed(req('https://abc123.bitup-site.pages.dev')), false); // Cloudflare Pages nu mai e în joc
assert.equal(originAllowed(req('https://temp.bitup.ro'), parseOrigins('https://temp.bitup.ro, nu-e-url')), true); // ALLOWED_ORIGINS
assert.equal(originAllowed(req('https://temp.bitup.ro')), false);
assert.deepEqual(parseOrigins(' https://a.bitup.ro/ ,,x'), ['https://a.bitup.ro']);
assert.equal(originAllowed(req('https://evil.example')), false);
assert.equal(originAllowed(req('http://localhost:8080', 'localhost:8080')), true);
assert.equal(originAllowed(req('http://localhost:8080', 'bitup.ro')), false); // localhost e permis doar când și serviciul rulează local
assert.equal(originAllowed(new Request('https://x/api/lead', { method: 'POST' })), false);

console.log('buildEmail / validate / originAllowed: toate aserțiunile trec.');
console.log('\n--- cererea RO către Resend (JSON) ---');
console.log(JSON.stringify(ro, null, 2));
console.log('\n--- subiect EN ---');
console.log(en.subject);
