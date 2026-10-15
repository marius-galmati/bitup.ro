/**
 * Serviciul `bitup-api` (docker-compose.yml): un server HTTP Node, fără dependențe, care primește de la nginx doar `/api/*`
 * și dă cererea lui `handleLead` (server/lead.ts). Node 24 citește TypeScript direct (type stripping), fără build.
 * `/healthz` e doar pentru healthcheck-ul din compose; nginx nu-l expune (trimite mai departe numai `/api/`).
 * Rulare locală, fără Docker: node --env-file=.dev.vars server/api.ts
 */
import { createServer } from 'node:http';
import { handleLead, type Env } from './lead.ts';

const PORT = Number(process.env.PORT ?? 3000);
const MAX_BODY = 64 * 1024; // un formular are sub 6 KB (message ≤ 5.000 de caractere); nginx taie tot la 64 KB

const env: Env = {
  RESEND_API_KEY: process.env.RESEND_API_KEY ?? '',
  TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY ?? '',
  LEAD_TO_EMAIL: process.env.LEAD_TO_EMAIL || 'office@bitup.ro',
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
};
// Fără secrete, fiecare formular ar da eroare abia la trimitere; mai bine nu pornește deloc și deploy-ul pică vizibil.
const missing = (['RESEND_API_KEY', 'TURNSTILE_SECRET_KEY'] as const).filter((k) => !env[k]);
if (missing.length) {
  console.error(`[api] lipsesc variabilele: ${missing.join(', ')}`);
  process.exit(1);
}

const send = (res: import('node:http').ServerResponse, status: number, body: object) => {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(body));
};

const server = createServer(async (req, res) => {
  const path = (req.url ?? '/').split('?')[0];
  if (path === '/healthz') return send(res, 200, { ok: true });
  if (path !== '/api/lead') return send(res, 404, { ok: false, error: 'not-found' });

  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of req as AsyncIterable<Buffer>) {
    size += chunk.length;
    if (size > MAX_BODY) return send(res, 413, { ok: false, error: 'body' });
    chunks.push(chunk);
  }

  const headers = new Headers();
  for (const [name, value] of Object.entries(req.headers)) {
    if (value !== undefined) headers.set(name, Array.isArray(value) ? value.join(', ') : value);
  }
  const method = req.method ?? 'GET';
  const request = new Request(`http://${headers.get('host') ?? 'localhost'}${req.url}`, {
    method,
    headers,
    body: method === 'GET' || method === 'HEAD' ? undefined : Buffer.concat(chunks),
  });

  try {
    const response = await handleLead(request, env);
    res.writeHead(response.status, Object.fromEntries(response.headers));
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch (err) {
    console.error(`[api] eroare neprevăzută: ${err instanceof Error ? err.message : String(err)}`);
    if (!res.headersSent) send(res, 500, { ok: false, error: 'server' });
  }
});

server.listen(PORT, () => console.log(`[api] ascultă pe ${PORT}`));

// Docker oprește containerul cu SIGTERM; fără handler, Node (PID 1) l-ar ignora și oprirea ar dura 10 s.
for (const signal of ['SIGTERM', 'SIGINT'] as const) process.on(signal, () => server.close(() => process.exit(0)));
