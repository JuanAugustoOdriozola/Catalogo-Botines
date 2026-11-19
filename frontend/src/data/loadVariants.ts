const files = import.meta.glob('../assets/**/*.{jpeg,jpg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

export interface Variant {
  id: string;
  label: string;
  images: string[]; // [principal, ...vistas]
}

interface Entry { name: string; url: string; ext: string }
interface Series { main?: Entry; extras: Entry[] }
interface Bucket { plain?: Entry; named?: Entry; img: Entry[]; seq: Entry[]; seqNamed?: boolean }

const byName = (a: Entry, b: Entry) =>
  a.name.localeCompare(b.name, undefined, { numeric: true });

const urls = (s: Series) =>
  [...(s.main ? [s.main] : []), ...s.extras].map((e) => e.url);

// Si la portada tiene distinta extensión que TODAS las demás fotos,
// casi seguro es otro botín que comparte el número.
function splitOddMain(s: Series): Series[] {
  const m = s.main;
  if (m && s.extras.length > 0 && s.extras.every((e) => e.ext !== m.ext)) {
    return [{ main: m, extras: [] }, { extras: s.extras }];
  }
  return [s];
}

/**
 * @param names  nombres de color por id        { '31': 'Negro / Dorado' }
 * @param merge  une un id dentro de otro       { mios: '31', '6b': '7' }
 */
export function loadVariants(
  folder: string,
  prefix: string,
  names: Record<string, string> = {},
  merge: Record<string, string> = {}
): Variant[] {
  const root = `../assets/${folder}/`;
  const re = new RegExp(`^${prefix}[\\s-]+([a-z0-9]+)(.*)$`);
  const buckets = new Map<string, Bucket>();

  for (const [path, url] of Object.entries(files)) {
    if (!path.startsWith(root)) continue;
    const file = path.slice(root.length);
    if (file.includes('/')) continue;

    let ext = file.slice(file.lastIndexOf('.') + 1).toLowerCase();
    if (ext === 'jpg') ext = 'jpeg';
    const name = file.replace(/\.[^.]+$/, '').toLowerCase();

    const m = name.match(re);
    if (!m) continue;
    const [, num, rest] = m;
    const tokens = rest.split(/[\s-]+/).filter(Boolean);
    const entry: Entry = { name, url, ext };

    const b = buckets.get(num) ?? { img: [], seq: [] };
    const hasImg = tokens.some((t) => /^img\d+$/.test(t));
    const endsInNumber = tokens.length > 0 && /^\d+$/.test(tokens[tokens.length - 1]);

    if (hasImg) b.img.push(entry);
    else if (endsInNumber) {
  b.seq.push(entry);
  if (tokens.length > 1) b.seqNamed = true; // ej: "cordones-3"
}
    else if (tokens.length === 0) b.plain = entry;
    else b.named = entry;
    buckets.set(num, b);
  }

  type Item = { id: string; num: string; order: number; base: string; images: string[] };
  let items: Item[] = [];

  for (const [num, b] of buckets) {
    const A: Series = { main: b.named, extras: [...b.img].sort(byName) };
    const B: Series = { extras: [...b.seq].sort(byName) };

    if (b.plain) {
  if (!A.main && A.extras.length) A.main = b.plain;
  else if (B.extras.length && !b.seqNamed) B.main = b.plain;
  else if (!A.main) A.main = b.plain;
  else A.extras.unshift(b.plain);
}

    const series = [A, B].flatMap(splitOddMain).filter((s) => urls(s).length > 0);
    const base = /^\d+$/.test(num) ? `Modelo ${num}` : num.charAt(0).toUpperCase() + num.slice(1);

    series.forEach((s, i) => {
      const id = i === 0 ? num : num + String.fromCharCode(97 + i); // 47, 47b, 47c
      items.push({ id, num, order: i, base, images: urls(s) });
    });
  }

  // Unir botines que son el mismo (ej: mios → 31, 6b → 7)
  for (const [from, to] of Object.entries(merge)) {
    const src = items.find((x) => x.id === from);
    const dst = items.find((x) => x.id === to);
    if (!src || !dst || src === dst) continue;
    dst.images = [...new Set([...dst.images, ...src.images])];
    items = items.filter((x) => x !== src);
  }

  // "A / B" solo si el número sigue teniendo más de un botín
  const count = new Map<string, number>();
  items.forEach((x) => count.set(x.num, (count.get(x.num) ?? 0) + 1));

  return items
    .sort((a, b) => a.num.localeCompare(b.num, undefined, { numeric: true }) || a.order - b.order)
    .map((x) => ({
      id: x.id,
      label:
        names[x.id] ??
        x.base + ((count.get(x.num) ?? 0) > 1 ? ' ' + String.fromCharCode(65 + x.order) : ''),
      images: x.images,
    }));
}