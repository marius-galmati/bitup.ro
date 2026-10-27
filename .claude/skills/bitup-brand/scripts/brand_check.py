#!/usr/bin/env python3
"""Verificare automată de brand BitUp pentru un director de build (HTML, CSS, JS, SVG, MD).
Utilizare: python3 brand_check.py dist/   → cod de ieșire 1 dacă există erori.
Verifică: culori din afara paletei, familii de fonturi străine, border-radius > 2 px (în afară de 50 % pentru cercuri),
cuvinte și formulări interzise, diacritice cu sedilă, liniuțe lungi în text, „BITUP” scris cu majuscule."""
import re, sys, pathlib
try: sys.stdout.reconfigure(encoding='utf-8', errors='replace')   # consola Windows fără UTF-8
except Exception: pass

PALETTE = {'00202e', '20686c', 'fe982a', '5fa8ab', 'ffffff', 'eef2f3', '4e5d66', 'dce3e5', 'fff'}
ALLOWED_FONTS = ('ibm plex sans', 'ibm plex mono', 'arial', 'sans-serif', 'monospace', 'consolas', 'courier new', 'inherit', 'system-ui')
BANNED = [
    (r'\bIMM(-uri|urile)?\b', 'semnal de firmă mică'), (r'\bSMBs?\b', 'semnal de firmă mică'), (r'firma ta mică|firme mici', 'semnal de firmă mică'),
    (r'audit(ul|uri|ăm|ează)?\s+NIS\s?2|NIS\s?2\s+audit', 'BitUp nu face audit NIS2'), (r'\bcertificăm\b|garantăm conformitatea', 'promisiune de certificare / conformitate'),
    (r'arhitect IT', '„arhitect IT” nu se folosește public'), (r'Radiografie IT|Radiografia IT', 'oferta „Radiografie IT” e suspendată'),
    (r'Fortinet Advocate', 'partenerul se scrie doar „Fortinet”'), (r'companie mare|companiile mari', 'comparație care presupune o firmă mică'),
    (r'\binovato(r|are)\b|\bholistic|\bseamless\b|\bsinergi|ecosistem|transformare digitală|la nivelul următor|în era digitală', 'limbaj de broșură'),
    (r'\bîn plus,|\bde asemenea\b|nu doar .{1,40} ci și', 'umplutură'), (r'face diferența|a adresa|best practices', 'calc din engleză'),
]
TEXT_EXT = {'.html', '.htm', '.md', '.mdx', '.astro', '.txt', '.json'}
STYLE_EXT = {'.css', '.scss', '.html', '.htm', '.astro', '.svg', '.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte'}

def strip_tags(s): return re.sub(r'<script.*?</script>|<style.*?</style>|<[^>]+>', ' ', s, flags=re.S | re.I)

def main(root):
    root = pathlib.Path(root); errs = []
    for p in root.rglob('*'):
        if not p.is_file() or 'node_modules' in p.parts or p.suffix.lower() not in TEXT_EXT | STYLE_EXT: continue
        if p.name in ('brand-tokens.json',) or 'brand_check' in p.name: continue
        if {'brand', '.claude'} & set(p.relative_to(root).parts[:-1]): continue   # sursele de brand și regulile nu sunt conținut de site
        if 'mono-negru' in p.name: continue   # varianta mono-negru a logo-ului folosește negru, intenționat
        s = p.read_text(encoding='utf-8', errors='ignore'); rel = p.relative_to(root)
        if p.suffix.lower() in STYLE_EXT:
            css = s if p.suffix.lower() in ('.css', '.scss', '.svg') else ' '.join(re.findall(r'<style.*?</style>|style="[^"]*"|(?:color|fill|stroke|background)[\w-]*\s*[:=]\s*["\']?#[0-9a-fA-F]{3,6}', s, re.S | re.I))
            for m in re.finditer(r'(?<!url\()#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b', css):
                if m.group(1).lower() not in PALETTE:
                    errs.append(f'{rel}: culoare în afara paletei #{m.group(1)}')
            for m in re.finditer(r'font-family\s*:\s*([^;}"]+)', s, re.I):
                fams = [f.strip().strip('"\'').lower() for f in m.group(1).split(',')]
                bad = [f for f in fams if f and not f.startswith('var(') and f not in ALLOWED_FONTS]
                if bad: errs.append(f'{rel}: font nepermis {bad}')
            for m in re.finditer(r'(?:border-radius|--[\w-]*radius[\w-]*)\s*:\s*([^;}]+)', s, re.I):
                for v in re.findall(r'([\d.]+)(px|rem|em)', m.group(1)):
                    px = float(v[0]) * (16 if v[1] != 'px' else 1)
                    if px > 2: errs.append(f'{rel}: border-radius {m.group(1).strip()} (> 2 px)')
        if p.suffix.lower() in TEXT_EXT:
            txt = strip_tags(s) if p.suffix.lower() in ('.html', '.htm', '.astro') else s
            for pat, why in BANNED:
                for m in re.finditer(pat, txt, re.I):
                    errs.append(f'{rel}: „{m.group(0)}” — {why}')
            if re.search('[şţŞŢ]', txt): errs.append(f'{rel}: diacritice cu sedilă (ş/ţ); folosește ș/ț cu virgulă')
            if '—' in txt: errs.append(f'{rel}: liniuță lungă (—) în text')
            if re.search(r'\bBITUP\b', txt): errs.append(f'{rel}: „BITUP” în text; scrie „BitUp”')
    for e in sorted(set(errs)): print('[X]', e)
    print(f'\n{len(set(errs))} probleme' if errs else '[OK] brand_check: nicio problemă')
    return 1 if errs else 0

if __name__ == '__main__':
    sys.exit(main(sys.argv[1] if len(sys.argv) > 1 else 'dist'))
