/**
 * Pune un SVG din brand/ direct în pagină, fără să-i schimbe desenul.
 * Ce face, mecanic: scoate declarația XML, scoate width/height (rămâne viewBox, deci SVG-ul se scalează după CSS),
 * prefixează id-urile (două SVG-uri în aceeași pagină nu au voie să aibă aceleași id-uri), adaugă clasă și atributele de accesibilitate.
 * Culorile, formele și proporțiile rămân exact cele din fișier.
 */
interface InlineOptions {
  /** Prefix unic pe pagină pentru id-uri (de exemplu „logo-poz”). */
  prefix: string;
  class?: string;
  /** Text alternativ. Fără el, SVG-ul e decorativ (aria-hidden). */
  label?: string;
  /** Păstrează width/height (raportul de aspect pentru `height: X; width: auto`, ca la logo). */
  keepSize?: boolean;
  /**
   * Scoate dreptunghiul de fundal care acoperă toată pânza (exporturile diagramei au unul alb, respectiv bleumarin).
   * Fundalul vine din secțiune; altfel desenul ar apărea într-o casetă pe ceață sau pe suprafața închisă. Desenul nu se schimbă.
   */
  dropBackground?: boolean;
}

export function inlineSvg(raw: string, { prefix, class: className, label, keepSize = false, dropBackground = false }: InlineOptions): string {
  let svg = raw.replace(/<\?xml[^>]*\?>\s*/i, '').trim();
  if (dropBackground) {
    const vb = svg.match(/viewBox="([-\d.]+)\s+([-\d.]+)\s+([\d.]+)\s+([\d.]+)"/);
    if (vb) {
      const [vx, vy, vw, vh] = vb.slice(1).map(Number);
      svg = svg.replace(/<rect\b[^>]*\/>/g, (r) => {
        const n = (a: string) => Number(r.match(new RegExp(`\\s${a}="([-\\d.]+)"`))?.[1] ?? NaN);
        const covers = n('x') <= vx && n('y') <= vy && n('x') + n('width') >= vx + vw && n('y') + n('height') >= vy + vh;
        return covers ? '' : r;
      });
    }
  }
  // id-uri și referințele lor: id="x", href="#x", xlink:href="#x", url(#x)
  svg = svg
    .replace(/\bid="([^"]+)"/g, (_, id) => `id="${prefix}-${id}"`)
    .replace(/((?:xlink:)?href)="#([^"]+)"/g, (_, attr, id) => `${attr}="#${prefix}-${id}"`)
    .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${prefix}-${id})`);
  // <title> din fișier: îl scoatem; textul alternativ vine din `label`, în limba paginii.
  svg = svg.replace(/<title>[\s\S]*?<\/title>/i, '');
  const attrs = [
    className ? `class="${className}"` : '',
    label ? `role="img" aria-label="${label.replace(/"/g, '&quot;')}"` : 'aria-hidden="true" focusable="false"',
  ].filter(Boolean).join(' ');
  return svg.replace(/<svg\b([^>]*)>/i, (_, a: string) => {
    const kept = keepSize ? a : a.replace(/\s(width|height)="[^"]*"/g, '');
    return `<svg${kept} ${attrs}>`;
  });
}
