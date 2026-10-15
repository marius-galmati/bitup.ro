#!/usr/bin/env bash
# Verificarea imaginii de producție (docker-compose.yml): rute, redirecturi, 404, headere, /api/lead.
#   bash qa/deploy-check.sh                      # local, http://localhost:8080 (README § Comenzi); `Host: bitup.ro` simulează domeniul
#   bash qa/deploy-check.sh https://temp.bitup.ro  # pe server: numele e cel din URL, testele cu alt nume (www, domeniu de test) se sar
# Local, testele /api/lead presupun cheile de test Turnstile (secretul 1x000…AA trece orice token) și o cheie Resend falsă (→ 502 mail).
# Pe server, tokenul fals e respins de Turnstile (400): niciun test nu trimite email.
BASE="${1:-http://localhost:8080}"
case "$BASE" in
  http://localhost*|http://127.0.0.1*) LOCAL=1; HOST=bitup.ro ;;
  *) LOCAL=0; HOST=$(printf '%s' "$BASE" | sed -E 's#^https?://([^/:]+).*#\1#') ;;
esac
pass=0; fail=0
ok()  { pass=$((pass+1)); printf '  ok    %s\n' "$1"; }
bad() { fail=$((fail+1)); printf '  GREȘIT %s — %s\n' "$1" "$2"; }

# status și Location: expect <cale> <cod> [location] [host]
expect() {
  local path="$1" code="$2" loc="$3" host="${4:-$HOST}"
  local out; out=$(curl -s -o /dev/null -D - -H "Host: $host" "$BASE$path")
  local got; got=$(printf '%s' "$out" | head -1 | awk '{print $2}')
  local gotloc; gotloc=$(printf '%s' "$out" | grep -i '^location:' | sed 's/^[^:]*: //' | tr -d '\r')
  if [ "$got" != "$code" ]; then bad "$host$path" "cod $got, așteptat $code"; return; fi
  if [ -n "$loc" ] && [ "$gotloc" != "$loc" ]; then bad "$host$path" "Location '$gotloc', așteptat '$loc'"; return; fi
  ok "$host$path → $code${loc:+ $loc}"
}
header() { # header <cale> <antet> <regex | "-" pentru absent> [host]
  local h="${4:-$HOST}"
  local v; v=$(curl -s -o /dev/null -D - -H "Host: $h" "$BASE$1" | grep -i "^$2:" | sed 's/^[^:]*: //' | tr -d '\r')
  if [ "$3" = "-" ]; then [ -z "$v" ] && ok "$1 fără $2 ($h)" || bad "$1 $2" "prezent: $v"; return; fi
  printf '%s' "$v" | grep -Eq "$3" && ok "$1 $2: $v" || bad "$1 $2" "'$v' nu se potrivește cu /$3/"
}
api() { # api <descriere> <cod așteptat> <corp așteptat (regex)> curl-args…
  local desc="$1" code="$2" body="$3"; shift 3
  local res; res=$(curl -s -w '\n%{http_code}' "$@")
  local got="${res##*$'\n'}"; local text="${res%$'\n'*}"
  [ "$got" = "$code" ] && printf '%s' "$text" | grep -Eq "$body" && ok "api: $desc → $got $(printf '%s' "$text" | head -c 120)" || bad "api: $desc" "$got $text"
}

echo "Pagini ($BASE, Host: $HOST)"
for p in / /despre /servicii /servicii/suport-it /servicii/securitate /servicii/automatizari /radiografie-it /cum-lucram /rezultate /blog /contact /suport /multumesc /termeni /confidentialitate /cookies /echipa \
         /en /en/about /en/services /en/services/it-support /en/it-health-check /en/contact /en/thank-you /en/privacy /rss.xml /sitemap-index.xml /favicon.svg /favicon.ico; do
  expect "$p" 200
done

echo "Adrese canonice (fără slash final, fără .html)"
expect /despre/ 301 /despre
expect /en/ 301 /en
expect "/servicii/?utm_source=x" 301 "/servicii?utm_source=x"
expect /despre.html 301 /despre
expect /en/about.html 301 /en/about
expect /index.html 301 /

echo "Redirecturi 301 (ARHITECTURA § Redirecturi)"
expect /de-ce-bitup 301 /cum-lucram
expect /industrii 301 /servicii
expect /servicii/cybersecurity 301 /servicii/securitate
expect /servicii/backup-disaster-recovery 301 "/servicii/securitate#backup"
expect /servicii/mentenanta-suport 301 /servicii/suport-it
expect /servicii/infrastructura-it 301 /servicii/suport-it
expect /servicii/hosting-cloud 301 "/servicii/suport-it#cloud"
expect /servicii/solutii-hardware 301 "/servicii/suport-it#echipamente"
expect /servicii/automatizari-ai 301 /servicii/automatizari
expect /servicii/software-development 301 "/servicii/automatizari#software"
expect /termeni-si-conditii 301 /termeni
expect /politica-de-confidentialitate 301 /confidentialitate
expect "/servicii/hosting-cloud?utm_source=x" 301 "/servicii/suport-it?utm_source=x#cloud"
if [ "$LOCAL" = 1 ]; then
  expect "/despre?a=1" 301 "https://bitup.ro/despre?a=1" www.bitup.ro
  expect / 301 "https://bitup.ro/" www.bitup.ro
fi

echo "404 și ce nu trebuie să existe în producție"
expect /pagina-inexistenta 404
expect /en/nonexistent 404
expect /qa/componente 404
expect /qa/tokens 404
expect /en/qa/components 404
expect /qa/whatsapp-cipri.jpg 404
expect /50x 404
expect /healthz 404
curl -s -H "Host: $HOST" "$BASE/pagina-inexistenta" | grep -q 'lang="ro"' && ok "404 servește pagina 404.html" || bad "404" "nu e pagina site-ului"

echo "Headere (ARHITECTURA § Headere de securitate)"
header / Strict-Transport-Security '^max-age=31536000; includeSubDomains$'
header / Content-Security-Policy "^default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com"
header / X-Content-Type-Options '^nosniff$'
header / X-Frame-Options '^DENY$'
header / Referrer-Policy '^strict-origin-when-cross-origin$'
header / Permissions-Policy '^camera=\(\), microphone=\(\), geolocation=\(\), payment=\(\), usb=\(\)$'
header / Cross-Origin-Opener-Policy '^same-origin$'
header / Cross-Origin-Resource-Policy '^same-origin$'
header / Cache-Control 'max-age=0, must-revalidate'
[ "$LOCAL" = 1 ] && header / Server '^nginx$'   # pe server, Cloudflare își pune propriul `Server`
if [ "$HOST" = bitup.ro ]; then header / X-Robots-Tag -; else header / X-Robots-Tag '^noindex, nofollow$'; fi
[ "$LOCAL" = 1 ] && header / X-Robots-Tag '^noindex, nofollow$' temp.bitup.ro
header /pagina-inexistenta Content-Security-Policy "default-src 'self'"
asset=$(curl -s -H "Host: $HOST" "$BASE/" | grep -o '/_astro/[^"]*\.css' | head -1)
header "$asset" Cache-Control 'max-age=31536000, immutable'
header "$asset" Content-Security-Policy "default-src 'self'"

echo "/api/lead (ARHITECTURA § Formulare)"
U="$BASE/api/lead"; H=(-H "Host: $HOST" -H 'Origin: https://bitup.ro' -H 'Content-Type: application/json')
valid='{"kind":"contact","lang":"ro","name":"Test Deploy","company":"Firma Test","email":"test@example.com","phone":"","message":"Test al imaginii Docker.","consent":true,"source":"/contact","utm":{},"referrer":"","website":"","ts":"2026-10-16T00:00:00Z"'
api "GET" 405 '"method"' -H "Host: $HOST" "$U"
api "fără Origin" 403 '"origin"' -X POST -H "Host: $HOST" -H 'Content-Type: application/json' -d "$valid}" "$U"
api "Origin străin" 403 '"origin"' -X POST -H "Host: $HOST" -H 'Origin: https://evil.example' -H 'Content-Type: application/json' -d "$valid}" "$U"
api "nu e JSON" 400 '"body"' -X POST -H "Host: $HOST" -H 'Origin: https://bitup.ro' -H 'Content-Type: text/plain' -d 'x' "$U"
api "JSON invalid" 400 '"body"' -X POST "${H[@]}" -d '{nu' "$U"
api "validare" 400 '"validation"' -X POST "${H[@]}" -d '{"kind":"contact"}' "$U"
api "fără token Turnstile" 400 '"turnstile"' -X POST "${H[@]}" -d "$valid}" "$U"
api "honeypot completat (fără email)" 200 '"ok":true' -X POST "${H[@]}" -d "${valid/\"website\":\"\"/\"website\":\"spam\"}}" "$U"
if [ "$LOCAL" = 1 ]; then
  api "token valid, cheie Resend falsă" 502 '"mail"' -X POST "${H[@]}" -d "$valid,\"turnstileToken\":\"XXXX.DUMMY.TOKEN\"}" "$U"
else
  api "token fals, respins de Turnstile" 400 '"turnstile"' -X POST "${H[@]}" -d "$valid,\"turnstileToken\":\"XXXX.DUMMY.TOKEN\"}" "$U"
fi
big=$(mktemp); { printf '{"message":"'; head -c 70000 /dev/zero | tr '\0' 'a'; printf '"}'; } > "$big"
api "corp peste 64 KB" 413 '413' -X POST "${H[@]}" --data-binary "@$big" "$U"; rm -f "$big"
header /api/lead Cache-Control '^no-store$'
header /api/lead X-Robots-Tag 'noindex'

echo
echo "Rezultat: $pass ok, $fail greșite"
[ "$fail" -eq 0 ]
