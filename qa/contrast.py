# Verificare numerică de contrast WCAG pentru perechile de tokeni (DESIGN.md § Dark mode: „cu un instrument, nu din ochi”).
# Rulare: python qa/contrast.py
def lum(h):
    h = h.lstrip('#'); r, g, b = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    f = lambda c: c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)

def ratio(a, b):
    la, lb = lum(a), lum(b); hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)

PAIRS = [
    ('dark text #E4ECEE pe bg #0C181D', '#E4ECEE', '#0C181D', 4.5),
    ('dark muted #9FB3B8 pe surface #12232A', '#9FB3B8', '#12232A', 4.5),
    ('dark teal #5FB0B4 pe surface #12232A', '#5FB0B4', '#12232A', 4.5),
    ('dark teal #5FB0B4 pe bg #0C181D', '#5FB0B4', '#0C181D', 4.5),
    ('dark on-navy-muted #B9CCD0 pe navy-surface #0F2A36', '#B9CCD0', '#0F2A36', 4.5),
    ('dark teal-2 #7CC4C7 pe navy-surface #0F2A36 (eyebrow)', '#7CC4C7', '#0F2A36', 4.5),
    ('light text #14232A pe bg #F5F8F8', '#14232A', '#F5F8F8', 4.5),
    ('light muted #55686F pe surface #FFFFFF', '#55686F', '#FFFFFF', 4.5),
    ('light teal #20686C pe surface #FFFFFF', '#20686C', '#FFFFFF', 4.5),
    ('light teal #20686C pe bg #F5F8F8', '#20686C', '#F5F8F8', 4.5),
    ('buton: navy #00202E pe orange #FE982A', '#00202E', '#FE982A', 4.5),
    ('light on-navy-muted #C9D8DB pe navy #00202E', '#C9D8DB', '#00202E', 4.5),
    ('light teal-2 #4A9396 pe navy #00202E (eyebrow pe navy)', '#4A9396', '#00202E', 4.5),
    ('buton plin teal: alb pe #20686C', '#FFFFFF', '#20686C', 4.5),
    ('buton plin teal, dark: #00202E pe #5FB0B4', '#00202E', '#5FB0B4', 4.5),
    ('focus: teal #20686C pe bg #F5F8F8 (non-text)', '#20686C', '#F5F8F8', 3),
    ('focus: teal #5FB0B4 pe bg #0C181D (non-text)', '#5FB0B4', '#0C181D', 3),
    ('focus: navy #00202E pe orange #FE982A (non-text)', '#00202E', '#FE982A', 3),
    ('orange #FE982A pe bg #F5F8F8 (de ce NU e focus)', '#FE982A', '#F5F8F8', 3),
]

if __name__ == '__main__':
    bad = 0
    for name, a, b, need in PAIRS:
        r = ratio(a, b); ok = r >= need; bad += not ok
        print(f"{'OK ' if ok else 'NU '} {r:5.2f}:1  (min {need})  {name}")
    print(f"\n{len(PAIRS) - bad}/{len(PAIRS)} perechi trec.")
