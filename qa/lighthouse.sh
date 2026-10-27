#!/usr/bin/env bash
# Lighthouse mobil pe paginile cerute (PLAN § Faza 2b): bash qa/lighthouse.sh <faza> <cale> [<cale>…]
# Pornește Chrome headless cu port de depanare (Lighthouse nu poate crea profilul temporar pe Windows), rulează Lighthouse
# și păstrează doar rezumatul (scoruri, LCP, CLS, TBT, transfer) în qa/<faza>/lighthouse-<nume>-mobile.summary.json.
phase=$1; shift
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --remote-debugging-port=9222 --user-data-dir="$LOCALAPPDATA/Temp/claude-chrome-profile" about:blank >/dev/null 2>&1 &
sleep 3
# PID-ul Windows al procesului Chrome cu profilul de test (nu al Chrome-ului deschis de utilizator).
chrome_pid=$(powershell -NoProfile -Command "(Get-CimInstance Win32_Process -Filter \"Name='chrome.exe'\" | Where-Object { \$_.CommandLine -like '*claude-chrome-profile*' -and \$_.CommandLine -notlike '*--type=*' } | Select-Object -First 1).ProcessId")
for p in "$@"; do
  name=$(echo "$p" | sed 's#^/##; s#/#_#g'); [ -z "$name" ] && name=index
  out="qa/$phase/lighthouse-$name-mobile"
  npx lighthouse "http://localhost:4321/${p#/}" --port=9222 --output=json --output-path="$out.json" --quiet --form-factor=mobile --screenEmulation.mobile --throttling-method=simulate >/dev/null 2>&1
  node -e "
    const r=require('./$out.json'); const c=r.categories, a=r.audits;
    const s={url:r.finalDisplayedUrl, performance:Math.round(c.performance.score*100), accessibility:Math.round(c.accessibility.score*100), bestPractices:Math.round(c['best-practices'].score*100), seo:Math.round(c.seo.score*100),
      lcp:a['largest-contentful-paint'].displayValue, cls:a['cumulative-layout-shift'].displayValue, tbt:a['total-blocking-time'].displayValue, transferKiB:Math.round(a['total-byte-weight'].numericValue/1024),
      failed:Object.values(a).filter(x=>x.score!==null&&x.score<1&&x.scoreDisplayMode!=='informative').map(x=>x.id+': '+x.title).slice(0,12)};
    require('fs').writeFileSync('$out.summary.json', JSON.stringify(s,null,2)); console.log('$p', s.performance, s.accessibility, s.bestPractices, s.seo, s.lcp, s.cls, s.tbt, s.transferKiB+'KiB');
  "
  rm -f "$out.json"
done
# Doar Chrome-ul pornit mai sus (cu procesele lui copil). Înainte: `taskkill //IM chrome.exe` închidea orice Chrome deschis.
[ -n "$chrome_pid" ] && taskkill //F //T //PID "$chrome_pid" >/dev/null 2>&1
