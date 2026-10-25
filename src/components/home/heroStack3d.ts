/**
 * Geometria 3D din HeroStack (25 octombrie 2026, pe modelul lui Marius): aceeași funcție desenează cadrul static la
 * build (frontmatter) și cadrele din browser, când stiva se rotește.
 *
 * Proiecție ortografică, cu camera fixă deasupra orizontului, aleasă ca rombul din model (semi-axele 135 × 72) să
 * iasă exact la yaw = REST (45°): plăcile sunt pătrate cu diagonala 2 × 135, iar sin(elevație) = 72 / 135. Plăcile se
 * rotesc în jurul axei verticale; pătratul are simetrie de 90°, deci orice REST + k × 90° arată ca în model.
 *
 * Coordonatele sunt cele locale ale plăcii din model: centrul feței de sus în (230, 0), fața de jos la y = grosimea.
 * Lumina e fixă față de cameră, din dreapta-sus (la REST, latura dreaptă e cea deschisă, ca în model), deci laturile
 * își schimbă nuanța când stiva se rotește: `t` = 0 (în umbră) … 1 (spre lumină).
 */
export const CX = 230;
const R = 135;
const SIN_E = 72 / 135;
const A = R / Math.SQRT2;
export const REST = Math.PI / 4;
export const QUARTER = Math.PI / 2;

// Lumina: x spre dreapta, z spre privitor; din dreapta, puțin din spate.
const LN = Math.hypot(1, 1.6, 0.4);
const LX = 1 / LN, LZ = -0.4 / LN;

/** Colțurile pătratului (x, z) și normalele laturilor, în sistemul plăcii. Latura j merge de la colțul j la j + 1. */
const COLT = [[-A, -A], [A, -A], [A, A], [-A, A]];
const NORM = [[0, -1], [1, 0], [0, 1], [-1, 0]];

const f1 = (n: number) => (Math.round(n * 10) / 10).toString();
const pts = (p: number[][]) => p.map(([x, y]) => `${f1(x)},${f1(y)}`).join(' ');

export interface Latura { pts: string; vizibil: boolean; t: number }
export interface Placa { sus: string; laturi: Latura[] }

const rotit = (yaw: number) => {
  const c = Math.cos(yaw), s = Math.sin(yaw);
  return { rot: ([x, z]: number[]) => [x * c - z * s, x * s + z * c] };
};

/** O placă de grosime `g`, rotită cu `yaw`, în coordonatele ei locale. */
export function placa(yaw: number, g: number): Placa {
  const { rot } = rotit(yaw);
  const colt = COLT.map(rot);
  const sus = colt.map(([x, z]) => [CX + x, z * SIN_E]);
  const jos = colt.map(([x, z]) => [CX + x, g + z * SIN_E]);
  const laturi = NORM.map((n, j) => {
    const [nx, nz] = rot(n);
    const k = (j + 1) % 4;
    return {
      pts: pts([sus[j], sus[k], jos[k], jos[j]]),
      vizibil: nz > 1e-6, // laturile cu spatele la privitor nu se desenează; cele două vizibile nu se suprapun
      t: Math.round(Math.min(1, Math.max(0, (nx * LX + nz * LZ + 0.56) / 0.8)) * 100) / 100,
    };
  });
  return { sus: pts(sus), laturi };
}
