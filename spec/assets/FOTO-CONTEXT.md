# FOTO-CONTEXT.md — imaginea din hero: ce recomand și promptul

Întrebarea lui Marius: „Vreau un prompt bun pentru AI să-mi genereze o poză de context, pe care s-o pun cu transparență 50%. Sau ce altceva recomanzi? O animație profi, tot generată cu AI?”

## Recomandarea, pe scurt

1. **Portretul real rămâne imaginea din hero.** E singurul lucru de pe site pe care niciun concurent nu-l poate copia: un om cu nume, care răspunde. O imagine generată de AI în hero ar spune exact opusul mesajului „cineva care răspunde de el”.
2. **Nu folosi AI ca să generezi „fotografii”**: un birou, un server, un om la laptop, o hală de datacenter. Se recunosc din ce în ce mai ușor (mâini, texte pe ecrane, cabluri care nu duc nicăieri) și, când sunt recunoscute, scad încrederea în tot ce e pe pagină, inclusiv în cifrele reale din studiile de caz. Un client de securitate IT observă astfel de lucruri.
3. **Nu folosi animație generată cu AI** (video de fundal, „loop” cu servere, particule). Trei motive: încarcă pagina cu 2–10 MB și strică LCP-ul pe mobil (ținta din spec e 2,5 s); `DESIGN.md` interzice explicit hero cu video de fundal; și nu adaugă informație, doar mișcare. Singura mișcare care merită pe site e cea din capturile reale (Cipri răspunzând pe WhatsApp), ca imagine statică cu legendă.
4. **Dacă vrei o imagine de context, cea mai bună e o fotografie reală, făcută de tine**, cu telefonul, în lumină naturală. Mâna ta pe un firewall Fortinet montat în rack. Un NAS Synology pe birou. Laptopul cu BitUp Helpdesk deschis, cu ecranul anonimizat. Tu la un client, cu acordul lui. O poză imperfectă și reală bate orice randare. O pui la `[[FOTO_CONTEXT]]` și înlocuiește portretul doar dacă e mai bună decât el; altfel merge pe Despre sau în articol.
5. **Dacă totuși vrei ceva generat, singura formă care nu strică e o textură abstractă**, în culorile brandului, folosită la opacitate mică (10–15%, nu 50%) în spatele portretului sau ca fundal al benzii finale de CTA. La 50% textura concurează cu textul și cu portretul; la 10–15% dă profunzime fără să se vadă „că e ceva acolo”. Promptul e mai jos.

## Cum se folosește textura, dacă o generezi

- Format: PNG sau WebP, 2400×1600 px, fără text, fără obiecte recognoscibile.
- Unde: numai în două locuri, la alegere, nu în ambele: (a) în spatele portretului din hero, ca fundal al coloanei din dreapta, la `opacity: .12` pe light și `.18` pe dark; (b) ca fundal al CtaBand, peste navy, la `opacity: .10`, `mix-blend-mode: soft-light`.
- Nu se pune pe toată lățimea paginii, nu se animează, nu se folosește ca fundal de secțiune cu text peste.
- Se testează în ambele teme și la 375 px; dacă face textul mai greu de citit cu o virgulă, se scoate.
- `alt=""` (decorativă), `loading="lazy"` dacă nu e în hero, `fetchpriority="low"` dacă e.

## Promptul pentru textură (Midjourney, Ideogram, DALL·E, Flux)

```
Abstract minimal background texture for a corporate IT services website. Fine, precise network of thin straight lines and small nodes, like a circuit diagram drawn with a technical pen, very sparse, lots of empty space. Colors: deep navy background (#00202E) with lines in muted teal (#20686C) and a few nodes in lighter teal (#4A9396); no orange, no other colors. Flat, no gradients, no glow, no bokeh, no lens flare, no 3D, no perspective, no depth of field. No text, no letters, no numbers, no logos, no icons, no recognizable objects, no people, no servers, no shields, no locks. Calm, precise, engineered, quiet. Composition: even distribution, slightly denser toward the lower right, fading to empty toward the upper left. High resolution, crisp edges, matte. --ar 3:2
```

Variante:
- Pentru light mode (dacă textura se pune direct pe `--bg`, nu peste navy): înlocuiește „deep navy background (#00202E)” cu „very light cool background (#F5F8F8)” și „lines in muted teal (#20686C)” cu „lines in soft teal (#D6E0E1), a few nodes in teal (#4A9396)”.
- Dacă rezultatul are prea multe linii: adaugă „extremely sparse, 90% empty space, only a few lines”.
- Dacă apar obiecte sau simboluri: adaugă la negative „--no text, icons, shields, locks, servers, people, glow, gradient” (Midjourney) sau repetă interdicțiile în prompt (DALL·E, Ideogram).
- Nu folosi „cyber”, „hacker”, „matrix”, „hologram”, „futuristic”, „AI” în prompt: exact cuvintele astea produc estetica pe care `DESIGN.md` o interzice.

## Ce NU se generează, chiar dacă e tentant

- Un portret „îmbunătățit” al lui Marius (fundal schimbat, haine schimbate, „retușat” cu AI). Portretul real e bun. Dacă vrei unul mai bun, o ședință foto de o oră cu un fotograf din Cluj costă puțin și se vede pe fiecare pagină.
- Poze cu „echipa” (BitUp e un om plus colaboratori; o poză cu cinci oameni generați ar fi o minciună vizuală).
- Capturi de ecran „curate” generate în loc de cele reale anonimizate. Cele reale, cu pixelarea vizibilă, sunt mai credibile.
- Logo-uri ale partenerilor redesenate; se folosesc doar badge-urile oficiale din portaluri.

## Pentru Claude Code

Dacă `[[FOTO_CONTEXT]]` nu există, hero-ul folosește portretul din `assets/foto-marius/`. Dacă Marius livrează o textură (`assets/textura-hero.png`), se aplică regulile din § Cum se folosește, în locul ales de el, și nimic altceva nu se schimbă în layout.
