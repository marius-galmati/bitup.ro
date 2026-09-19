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
    # Faza 1: stări de hover/activ (Button, nav)
    ('principal hover: navy #00202E pe #E9891F', '#00202E', '#E9891F', 4.5),
    ('principal activ: navy #00202E pe #D97C17', '#00202E', '#D97C17', 4.5),
    ('teal hover: alb pe navy-2 #003343', '#FFFFFF', '#003343', 4.5),
    ('teal hover, dark: #00202E pe teal-2 #7CC4C7', '#00202E', '#7CC4C7', 4.5),
    ('secundar hover: teal #20686C pe teal-soft #E3EFEF', '#20686C', '#E3EFEF', 4.5),
    ('secundar hover, dark: teal #5FB0B4 pe teal-soft #16323A', '#5FB0B4', '#16323A', 4.5),
    ('nav hover: teal #20686C pe surface #FFFFFF', '#20686C', '#FFFFFF', 4.5),
    ('nav text: #14232A pe surface #FFFFFF', '#14232A', '#FFFFFF', 4.5),
    ('nav text, dark: #E4ECEE pe surface #12232A', '#E4ECEE', '#12232A', 4.5),
    ('muted, dark, pe bg: #9FB3B8 pe #0C181D', '#9FB3B8', '#0C181D', 4.5),
    ('muted pe surface-2: #55686F pe #EAF0F0', '#55686F', '#EAF0F0', 4.5),
    ('muted, dark, pe surface-2: #9FB3B8 pe #182E36', '#9FB3B8', '#182E36', 4.5),
    # /echipa: rândurile de oameni stau pe --surface, iar substituentul de fotografie pe --surface-2
    ('rol de echipă: teal #20686C pe surface #FFFFFF', '#20686C', '#FFFFFF', 4.5),
    ('experiență: muted #55686F pe surface #FFFFFF', '#55686F', '#FFFFFF', 4.5),
    ('experiență, dark: muted #9FB3B8 pe surface #12232A', '#9FB3B8', '#12232A', 4.5),
    ('inițiale substituent: navy #00202E pe surface-2 #EAF0F0', '#00202E', '#EAF0F0', 4.5),
    ('inițiale substituent, dark: #E4ECEE pe surface-2 #182E36', '#E4ECEE', '#182E36', 4.5),
    # marca LinkedIn: „in” alb pe albastrul oficial; pătratul albastru față de fundalul secțiunii e graniță non-text
    ('marca LinkedIn: alb pe #2867B3', '#FFFFFF', '#2867B3', 4.5),
    ('marca LinkedIn pe surface #FFFFFF (non-text)', '#2867B3', '#FFFFFF', 3),
    ('marca LinkedIn, dark, pe surface #12232A (logotip: exceptat de WCAG 1.4.11)', '#2867B3', '#12232A', 3),
    ('Steps: alb pe teal #20686C (cifră)', '#FFFFFF', '#20686C', 4.5),
    ('Steps, dark: #00202E pe teal #5FB0B4', '#00202E', '#5FB0B4', 4.5),
    ('linie --line pe bg (non-text): #D6E0E1 pe #F5F8F8', '#D6E0E1', '#F5F8F8', 1),
    ('focus: teal #20686C pe surface #FFFFFF (non-text)', '#20686C', '#FFFFFF', 3),
    ('focus, dark: teal #5FB0B4 pe surface #12232A (non-text)', '#5FB0B4', '#12232A', 3),
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
