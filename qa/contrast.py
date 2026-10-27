# Verificare numerică de contrast WCAG pentru perechile de roluri din brand/tokens.css (faza 1, v3).
# Culorile se citesc din brand/brand-tokens.json; valorile derivate (color-mix în srgb) se calculează la fel ca în CSS.
# Rulare: python -X utf8 qa/contrast.py   → cod de ieșire 1 dacă o pereche cade sub prag.
# Praguri: 4,5 pentru text, 3 pentru elemente de interfață (focus, contururi de buton).
import json, pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
C = {k: v['hex'] for k, v in json.loads((ROOT / 'brand' / 'brand-tokens.json').read_text(encoding='utf-8'))['colors'].items()}
navy, teal, orange, teal_l, white, fog, slate, line = (C[k] for k in ('primary', 'secondary', 'accent', 'secondary_on_dark', 'neutral_white', 'neutral_light', 'neutral_dark', 'line'))

def rgb(h): h = h.lstrip('#'); return [int(h[i:i + 2], 16) for i in (0, 2, 4)]
def mix(a, b, pa):
    """color-mix(in srgb, a pa%, b): medie ponderată pe canalele sRGB."""
    ra, rb = rgb(a), rgb(b); return '#' + ''.join(f'{round(x * pa + y * (1 - pa)):02X}' for x, y in zip(ra, rb))
def lum(h):
    f = lambda c: c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = [f(c / 255) for c in rgb(h)]; return 0.2126 * r + 0.7152 * g + 0.0722 * b
def ratio(a, b):
    la, lb = lum(a), lum(b); return (max(la, lb) + 0.05) / (min(la, lb) + 0.05)

# Valorile derivate din brand/tokens.css (tema închisă) și src/styles/global.css (.on-navy)
surface_dark = mix(navy, white, 0.94)
muted_dark = mix(fog, navy, 0.78)
TEXT, UI = 4.5, 3.0

contexts = {
    'deschis, pe alb': dict(bg=white, text=navy, muted=slate, heading=navy, link=teal, focus=teal),
    'deschis, pe ceață': dict(bg=fog, text=navy, muted=slate, heading=navy, link=teal, focus=teal),
    'închis, pe bleumarin': dict(bg=navy, text=fog, muted=muted_dark, heading=white, link=teal_l, focus=teal_l),
    'închis, pe suprafață': dict(bg=surface_dark, text=fog, muted=muted_dark, heading=white, link=teal_l, focus=teal_l),
}
pairs = []
for name, c in contexts.items():
    pairs += [
        (f'{name}: text', c['text'], c['bg'], TEXT),
        (f'{name}: text secundar', c['muted'], c['bg'], TEXT),
        (f'{name}: titlu, eroare, cifră', c['heading'], c['bg'], TEXT),
        (f'{name}: link, etichetă', c['link'], c['bg'], TEXT),
        (f'{name}: inelul de focus', c['focus'], c['bg'], UI),
    ]
pairs += [
    ('buton principal, deschis: alb pe bleumarin', white, navy, TEXT),
    ('buton principal, închis: bleumarin pe portocaliu', navy, orange, TEXT),
    ('buton secundar hover, deschis: alb pe bleumarin', white, navy, TEXT),
    ('buton secundar hover, închis: bleumarin pe alb', navy, white, TEXT),
    ('buton secundar hover, închis pe suprafață: suprafață pe alb', surface_dark, white, TEXT),
    ('cifră-cheie portocalie pe bleumarin', orange, navy, TEXT),
    ('cifră-cheie portocalie pe suprafața închisă', orange, surface_dark, TEXT),
    ('conturul butonului secundar, deschis: bleumarin pe alb', navy, white, UI),
    ('conturul butonului secundar, închis: alb pe bleumarin', white, navy, UI),
    # Câmpurile de formular: contur slate (Marius, 28 octombrie 2026; WCAG 1.4.11).
    ('conturul câmpului, deschis: slate pe alb', slate, white, UI),
    ('conturul câmpului, închis: text secundar pe bleumarin', muted_dark, navy, UI),
]
# Stiva din hero (blocul HeroStack din global.css): eticheta plăcii active și iconițele.
hs_glyph_base = mix(teal_l, white, 0.76)
pairs += [
    ('stiva, deschis: eticheta (bleumarin pe alb)', navy, white, TEXT),
    ('stiva, deschis: „· fundația” pe alb', mix(navy, white, 0.67), white, TEXT),
    ('stiva, deschis: iconița teal pe alb', teal, white, UI),
    ('stiva, deschis: iconița fundației pe discul ei', hs_glyph_base, mix(teal, navy, 0.44), UI),
    ('stiva, închis: eticheta pe suprafață', mix(teal, fog, 0.05), surface_dark, TEXT),
    ('stiva, închis: „· fundația” pe suprafață', mix(mix(navy, line, 0.24), teal_l, 0.88), surface_dark, TEXT),
    ('stiva, închis: iconița teal pe suprafață', mix(teal_l, white, 0.94), surface_dark, UI),
    ('stiva, închis: iconița fundației pe discul ei', hs_glyph_base, mix(teal, navy, 0.89), UI),
]
# De urmărit, nu blocante: componente.md cere aceste valori; informația e purtată de text, nu de ele.
notes = [
    ('bara portocalie a erorii pe alb', orange, white),
    # Iconița stratului 5 din stivă: portocaliu pe disc alb, exact ca pe bitup.ro (decorativă, aria-hidden; numele e în etichetă).
    ('stiva, deschis: iconița portocalie a stratului 5 pe alb', orange, white),
]

fail = 0
for label, fg, bg, need in pairs:
    r = ratio(fg, bg); ok = r >= need; fail += not ok
    print(f"{'OK ' if ok else 'NU '} {r:5.2f} (prag {need})  {label}  [{fg} pe {bg}]")
print('\nDe urmărit (WCAG 1.4.11, elemente de interfață):')
for label, fg, bg in notes:
    print(f"     {ratio(fg, bg):5.2f}  {label}  [{fg} pe {bg}]")
print(f"\n{len(pairs) - fail}/{len(pairs)} perechi trec." + ('' if not fail else f' {fail} NU trec.'))
sys.exit(1 if fail else 0)
