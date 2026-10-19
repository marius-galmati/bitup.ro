/**
 * Geometria 3D din HeroStack (20 octombrie 2026, cerut de Marius: stiva se rotește 180° după ce se construiește, iar
 * cu mouse-ul o rotești tu). Aceeași funcție desenează cadrul static la build (frontmatter) și cadrele din browser.
 *
 * Proiecție ortografică, cu camera fixă la 30° deasupra orizontului (sin = 0,5, de aici romburile 2:1 din video).
 * Plăcile sunt pătrate cu diagonala 2 × R; se rotesc în jurul axei verticale (yaw). La yaw = REST (45°) desenul e
 * exact cel din video: vârfurile rombului stânga / dreapta / sus / jos. Pătratul are simetrie de 90°, deci orice
 * REST + k × 90° arată la fel; acolo se întoarce stiva după ce o lași.
 *
 * Planurile se dau direct în y de ecran (centrul feței de sus, ca în video); grosimea e tot în unități de ecran.
 * Lumina e fixă față de cameră (din dreapta-sus-spate), deci, când stiva se rotește, fețele își schimbă nuanța și
 * umbrele dintre plăci alunecă pe fețe.
 */
export const CX = 318;
export const R = 230;
const SIN_E = 0.5;
const COS_E = Math.sqrt(3) / 2;
const A = R / Math.SQRT2;
export const REST = Math.PI / 4;
export const QUARTER = Math.PI / 2;

/** De jos în sus: y-ul centrului feței de sus și grosimea, în pixelii cadrului din video. */
export const PLACI = [
  { y: 1031, g: 22 },
  { y: 975, g: 18 },
  { y: 888, g: 18 },
  { y: 801, g: 18 },
  { y: 680, g: 20 },
];

// Direcția luminii: x spre dreapta, y în sus, z spre privitor. Din dreapta-sus, puțin din spate.
const LN = Math.hypot(1, 1.6, 0.4);
const LX = 1 / LN, LY = 1.6 / LN, LZ = -0.4 / LN;

/** Colțurile pătratului (x, z) și normalele laturilor, în sistemul plăcii. Latura j merge de la colțul j la j + 1. */
const COLT = [[-A, -A], [A, -A], [A, A], [-A, A]];
const NORM = [[0, -1], [1, 0], [0, 1], [-1, 0]];

const f1 = (n: number) => (Math.round(n * 10) / 10).toString();
const pts = (p: number[][]) => p.map(([x, y]) => `${f1(x)},${f1(y)}`).join(' ');

export interface Latura { pts: string; muchie: string; vizibil: boolean; t: number }
export interface Placa { sus: string; laturi: Latura[] }
export interface Umbra { pts: string; clip: string }
export interface Scena { placi: Placa[]; umbre: Umbra[]; sol: string }

/** Cât e de luminată o latură, 0 (în umbră) … 1 (spre lumină). */
const nuanta = (nx: number, nz: number) => Math.min(1, Math.max(0, (nx * LX + nz * LZ + 0.56) / 0.8));

export function scena(yaw: number): Scena {
  const c = Math.cos(yaw), s = Math.sin(yaw);
  const rot = ([x, z]: number[]) => [x * c - z * s, x * s + z * c];
  const colt = COLT.map(rot);
  // Un punct (x', z') din planul cu centrul la y-ul de ecran `y`.
  const pe = (y: number, [x, z]: number[], dx = 0, dz = 0, k = 1) => [CX + (x * k + dx), y + (z * k + dz) * SIN_E];
  const fata = (y: number, dx = 0, dz = 0, k = 1) => colt.map((p) => pe(y, p, dx, dz, k));

  const placi = PLACI.map(({ y, g }) => {
    const sus = fata(y), jos = fata(y + g);
    const laturi = NORM.map((n, j) => {
      const [nx, nz] = rot(n);
      const k = (j + 1) % 4;
      return {
        pts: pts([sus[j], sus[k], jos[k], jos[j]]),
        muchie: pts([sus[j], sus[k]]),
        vizibil: nz > 1e-6,
        t: Math.round(nuanta(nx, nz) * 100) / 100,
      };
    });
    return { sus: pts(sus), laturi };
  });

  // Umbra plăcii i pe fața de sus a plăcii i − 1: amprenta ei, mutată pe direcția luminii cu cât e golul.
  const umbre = PLACI.slice(1).map((p, i) => {
    const jos = PLACI[i];
    const gol = (jos.y - (p.y + p.g)) / COS_E;
    return { pts: pts(fata(jos.y, (-LX / LY) * gol, (-LZ / LY) * gol)), clip: pts(fata(jos.y)) };
  });

  // Umbra fundației pe „podea”: puțin mai mare decât amprenta, ușor deplasată dinspre lumină.
  const baza = PLACI[0];
  const sol = pts(fata(baza.y + baza.g + 6, -12, 4, 1.03));

  return { placi, umbre, sol };
}

/** Golul (în unități de ecran) de sub placa i, pentru cât de difuză și cât de tare e umbra ei. */
export const golSub = (i: number) => PLACI[i - 1].y - (PLACI[i].y + PLACI[i].g);
