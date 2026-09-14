/**
 * POST /api/lead — Cloudflare Pages Function (ARHITECTURA § Formulare), fără biblioteci externe, doar `fetch`.
 * Ordinea e exact cea din spec: 1 metodă → 2 origine → 3 corp și validare → 4 honeypot → 5 Turnstile → 6 Resend → 7 răspuns.
 * Secretele vin din `env` (Cloudflare Pages → Environment variables; local din `.dev.vars`). Nimic din ele nu ajunge în client.
 * `buildEmail` e pură (payload → cererea către Resend) ca să poată fi verificată local fără cheie reală; `sendEmail` e singurul loc care vorbește cu Resend.
 */

export interface Env {
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY: string;
  LEAD_TO_EMAIL: string;
}
// Tipurile minime ale unei Pages Function (fără @cloudflare/workers-types în proiect).
interface PagesContext { request: Request; env: Env }

export type Kind = 'radiografie' | 'contact';
export type Lang = 'ro' | 'en';
export interface LeadPayload {
  kind: Kind;
  lang: Lang;
  name: string;
  company: string;
  employees?: string;
  phone?: string;
  email: string;
  message?: string;
  consent: boolean;
  source: string;
  utm: { source?: string; medium?: string; campaign?: string; content?: string };
  referrer?: string;
  turnstileToken?: string;
  website?: string;
  ts?: string;
}
/** Ce se știe din cerere, nu din payload: IP-ul și țara din headerele Cloudflare. */
export interface RequestMeta { ip: string; country: string; receivedAt: string }

const SITE_ORIGIN = 'https://bitup.ro';
const EMPLOYEES = new Set(['sub 10', '10–30', '30–100', 'peste 100', 'under 10', 'over 100']);
const MAX_MESSAGE = 5000;
const json = (status: number, body: Record<string, unknown>, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers } });

/** 2. Originea: doar site-ul, previzualizările *.pages.dev și, când funcția rulează chiar pe localhost (wrangler pages dev), localhost. */
export function originAllowed(request: Request): boolean {
  const raw = request.headers.get('Origin') ?? request.headers.get('Referer');
  if (!raw) return false;
  let origin: URL;
  try { origin = new URL(raw); } catch { return false; }
  if (origin.origin === SITE_ORIGIN) return true;
  if (origin.protocol === 'https:' && origin.hostname.endsWith('.pages.dev')) return true;
  const local = (h: string) => h === 'localhost' || h === '127.0.0.1';
  const host = (request.headers.get('Host') ?? '').split(':')[0];
  return local(origin.hostname) && local(host);
}

/** 3. Validarea server-side; întoarce lista câmpurilor greșite (goală = valid). */
export function validate(p: Partial<LeadPayload>): string[] {
  const bad: string[] = [];
  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
  if (p.kind !== 'radiografie' && p.kind !== 'contact') bad.push('kind');
  if (p.lang !== 'ro' && p.lang !== 'en') bad.push('lang');
  if (!str(p.name)) bad.push('name');
  if (!str(p.company)) bad.push('company');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(str(p.email))) bad.push('email');
  const digits = str(p.phone).replace(/\D/g, '');
  if (p.kind === 'radiografie') {
    if (digits.length < 9) bad.push('phone');
    if (!EMPLOYEES.has(str(p.employees))) bad.push('employees');
  } else if (str(p.phone) && digits.length < 9) bad.push('phone');
  const message = str(p.message);
  if (p.kind === 'contact' && !message) bad.push('message');
  if (message.length > MAX_MESSAGE) bad.push('message');
  if (p.consent !== true) bad.push('consent');
  return bad;
}

/** 5. Turnstile: siteverify cu secretul din env; fără token sau fără `success: true` → respins. Nu există cale fără token. */
export async function verifyTurnstile(secret: string, token: string | undefined, remoteip: string): Promise<boolean> {
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (remoteip) body.set('remoteip', remoteip);
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

/** 6a. Cererea către Resend, construită pur din payload și meta (verificabilă local, fără cheie). */
export function buildEmail(p: LeadPayload, meta: RequestMeta, to: string) {
  const prefix = p.kind === 'radiografie' ? '[Radiografie IT]' : '[Contact]';
  const subject = `${prefix} ${p.company.trim()} · ${p.name.trim()}${p.lang === 'en' ? ' · EN' : ''}`;
  const line = (k: string, v: unknown) => `${k}: ${typeof v === 'string' && v.trim() ? v.trim() : '-'}`;
  const utm = p.utm ?? {};
  const text = [
    line('Tip', p.kind),
    line('Limbă', p.lang),
    line('Nume', p.name),
    line('Firmă', p.company),
    ...(p.kind === 'radiografie' ? [line('Angajați', p.employees)] : []),
    line('Telefon', p.phone),
    line('Email', p.email),
    line('Consimțământ', p.consent ? 'da' : 'nu'),
    '',
    line('Pagina (source)', p.source),
    line('utm_source', utm.source),
    line('utm_medium', utm.medium),
    line('utm_campaign', utm.campaign),
    line('utm_content', utm.content),
    line('Referrer', p.referrer),
    line('Trimis (ts)', p.ts),
    line('Primit', meta.receivedAt),
    line('IP', meta.ip),
    line('Țară', meta.country),
    '',
    '--- Mesaj (textul persoanei, ca atare) ---',
    (p.message ?? '').trim() || '-',
    '--- Sfârșit mesaj ---',
  ].join('\n');
  return {
    from: 'BitUp site <site@bitup.ro>',
    to: [to],
    reply_to: p.email.trim(),
    subject,
    text,
    tags: [{ name: 'kind', value: p.kind }, { name: 'lang', value: p.lang }],
  };
}

/** 6b. Singurul apel către Resend. */
export async function sendEmail(apiKey: string, email: ReturnType<typeof buildEmail>): Promise<{ ok: boolean; status: number; body: string }> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(email),
  });
  return { ok: res.ok, status: res.status, body: await res.text() };
}

export const onRequest = async ({ request, env }: PagesContext): Promise<Response> => {
  // 1. Doar POST.
  if (request.method !== 'POST') return json(405, { ok: false, error: 'method' }, { Allow: 'POST' });

  // 2. Origine.
  if (!originAllowed(request)) return json(403, { ok: false, error: 'origin' });

  // 3. Corp: doar JSON valid, apoi validare.
  if (!(request.headers.get('Content-Type') ?? '').toLowerCase().includes('application/json')) return json(400, { ok: false, error: 'body' });
  let payload: Partial<LeadPayload>;
  try { payload = (await request.json()) as Partial<LeadPayload>; } catch { return json(400, { ok: false, error: 'body' }); }
  if (!payload || typeof payload !== 'object') return json(400, { ok: false, error: 'body' });
  const fields = validate(payload);
  if (fields.length) return json(400, { ok: false, error: 'validation', fields });
  const p = payload as LeadPayload;

  // 4. Honeypot: câmpul `website` completat → răspuns de succes, fără să trimitem nimic.
  if (typeof p.website === 'string' && p.website.trim() !== '') return json(200, { ok: true });

  // 5. Turnstile.
  const ip = request.headers.get('CF-Connecting-IP') ?? '';
  if (!(await verifyTurnstile(env.TURNSTILE_SECRET_KEY, p.turnstileToken, ip))) return json(400, { ok: false, error: 'turnstile' });

  // 6. Resend.
  const meta: RequestMeta = { ip: ip || '-', country: request.headers.get('CF-IPCountry') ?? '-', receivedAt: new Date().toISOString() };
  const email = buildEmail(p, meta, env.LEAD_TO_EMAIL || 'office@bitup.ro');
  try {
    const sent = await sendEmail(env.RESEND_API_KEY, email);
    if (!sent.ok) {
      console.error(`[lead] Resend a răspuns ${sent.status}: ${sent.body.slice(0, 300)}`);
      return json(502, { ok: false, error: 'mail' });
    }
  } catch (err) {
    console.error(`[lead] Resend indisponibil: ${err instanceof Error ? err.message : String(err)}`);
    return json(502, { ok: false, error: 'mail' });
  }

  // 7. Gata.
  return json(200, { ok: true });
};
