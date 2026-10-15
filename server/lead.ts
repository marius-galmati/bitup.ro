/**
 * POST /api/lead (ARHITECTURA § Formulare), fără biblioteci externe, doar `fetch`. Rulează în serviciul `bitup-api` (server/api.ts),
 * în spatele nginx-ului din `bitup-web`; logica e scrisă pe `Request`/`Response` standard, deci nu depinde de server.
 * Ordinea e exact cea din spec: 1 metodă → 2 origine → 3 corp și validare → 4 honeypot → 5 Turnstile → 6 Resend → 7 răspuns.
 * Secretele vin din `env` (Dokploy → Environment; local din `.dev.vars`). Nimic din ele nu ajunge în client.
 * `buildEmail` e pură (payload → cererea către Resend) ca să poată fi verificată local fără cheie reală; `sendEmail` e singurul loc care vorbește cu Resend.
 */

export interface Env {
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY: string;
  LEAD_TO_EMAIL: string;
  /** Origini în plus față de https://bitup.ro, separate prin virgulă (ex. un domeniu de test înainte de lansare). Opțional. */
  ALLOWED_ORIGINS?: string;
}

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
/** Ce se știe din cerere, nu din payload: IP-ul și țara din headerele Cloudflare (proxy-ul din fața serverului; Traefik și nginx le lasă să treacă). */
export interface RequestMeta { ip: string; country: string; receivedAt: string }

const SITE_ORIGIN = 'https://bitup.ro';
const EMPLOYEES = new Set(['sub 10', '10–30', '30–100', 'peste 100', 'under 10', 'over 100']);
const MAX_MESSAGE = 5000;
const json = (status: number, body: Record<string, unknown>, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers } });

/** Lista din `ALLOWED_ORIGINS` → origini normalizate (`https://temp.bitup.ro`); intrările invalide se ignoră. */
export function parseOrigins(list: string | undefined): string[] {
  return (list ?? '').split(',').map((s) => s.trim()).filter(Boolean).flatMap((s) => {
    try { return [new URL(s).origin]; } catch { return []; }
  });
}

/** 2. Originea: doar site-ul, originile din `ALLOWED_ORIGINS` și, când serviciul rulează chiar pe localhost (docker compose local), localhost. */
export function originAllowed(request: Request, extra: string[] = []): boolean {
  const raw = request.headers.get('Origin') ?? request.headers.get('Referer');
  if (!raw) return false;
  let origin: URL;
  try { origin = new URL(raw); } catch { return false; }
  if (origin.origin === SITE_ORIGIN) return true;
  if (extra.includes(origin.origin)) return true;
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
  // Motivul respingerii ajunge în log (Dokploy → Logs, `bitup-api`); fără el, „turnstile” din browser nu spune care dintre cauze e.
  if (!token) { console.error('[lead] Turnstile: cerere fără token (cheia publică lipsește din build sau widgetul n-a rulat pe domeniul ăsta)'); return false; }
  const body = new URLSearchParams({ secret, response: token });
  if (remoteip) body.set('remoteip', remoteip);
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
    const data = (await res.json()) as { success?: boolean; 'error-codes'?: string[]; hostname?: string };
    if (data.success !== true) console.error(`[lead] Turnstile respins: ${(data['error-codes'] ?? []).join(', ') || '-'} (hostname: ${data.hostname ?? '-'})`);
    return data.success === true;
  } catch (err) {
    console.error(`[lead] Turnstile: siteverify inaccesibil: ${err instanceof Error ? err.message : String(err)}`);
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
    from: 'BitUp site <site@notifications.bitup.ro>',
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

export async function handleLead(request: Request, env: Env): Promise<Response> {
  // 1. Doar POST.
  if (request.method !== 'POST') return json(405, { ok: false, error: 'method' }, { Allow: 'POST' });

  // 2. Origine.
  if (!originAllowed(request, parseOrigins(env.ALLOWED_ORIGINS))) return json(403, { ok: false, error: 'origin' });

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
}
