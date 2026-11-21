import fs from 'node:fs';
import path from 'node:path';

// Uso (dentro de frontend):  node migrar-f50.mjs
//
// Toma las fotos sueltas del formato viejo, las agrupa por botín (con la misma
// lógica que usaba el catálogo) y las COPIA a carpetas numeradas 1, 2, 3...
// Dentro de cada carpeta las fotos quedan como 1.jpeg, 2.jpeg, ... (1 = portada).
// Las carpetas viejas NO se tocan.

const JOBS = [
  {
    src: 'src/assets/adidas/f50/cordones-f11',
    dest: 'src/assets/adidas/f50/f11-cordones',
    prefix: 'f50',
    merge: {},
  },
  {
    src: 'src/assets/adidas/f50/sinCordones-f11',
    dest: 'src/assets/adidas/f50/f11-sinCordones',
    prefix: 'f50',
    merge: { mios: '31', '6b': '7' },
  },
];

const byName = (a, b) => a.name.localeCompare(b.name, undefined, { numeric: true });
const imagesOf = (s) => [...(s.main ? [s.main] : []), ...s.extras];

// Si la portada tiene distinta extensión que TODAS las demás, es otro botín
function splitOddMain(s) {
  const m = s.main;
  if (m && s.extras.length > 0 && s.extras.every((e) => e.ext !== m.ext)) {
    return [{ main: m, extras: [] }, { extras: s.extras }];
  }
  return [s];
}

function agrupar(src, prefix, merge) {
  const re = new RegExp(`^${prefix}[\\s-]+([a-z0-9]+)(.*)$`);
  const buckets = new Map();

  for (const file of fs.readdirSync(src)) {
    const full = path.join(src, file);
    if (!fs.statSync(full).isFile()) continue;
    if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;

    const realExt = path.extname(file).toLowerCase();
    const ext = realExt === '.jpg' ? 'jpeg' : realExt.slice(1);
    const name = file.replace(/\.[^.]+$/, '').toLowerCase();

    const m = name.match(re);
    if (!m) continue;
    const [, num, rest] = m;
    const tokens = rest.split(/[\s-]+/).filter(Boolean);
    const entry = { name, full, ext, realExt };

    const b = buckets.get(num) ?? { img: [], seq: [] };
    const hasImg = tokens.some((t) => /^img\d+$/.test(t));
    const endsInNumber = tokens.length > 0 && /^\d+$/.test(tokens[tokens.length - 1]);

    if (hasImg) b.img.push(entry);
    else if (endsInNumber) {
      b.seq.push(entry);
      if (tokens.length > 1) b.seqNamed = true;
    } else if (tokens.length === 0) b.plain = entry;
    else b.named = entry;
    buckets.set(num, b);
  }

  let items = [];
  for (const [num, b] of buckets) {
    const A = { main: b.named, extras: [...b.img].sort(byName) };
    const B = { extras: [...b.seq].sort(byName) };

    if (b.plain) {
      if (!A.main && A.extras.length) A.main = b.plain;
      else if (B.extras.length && !b.seqNamed) B.main = b.plain;
      else if (!A.main) A.main = b.plain;
      else A.extras.unshift(b.plain);
    }

    const series = [A, B].flatMap(splitOddMain).filter((s) => imagesOf(s).length > 0);
    series.forEach((s, i) => {
      const id = i === 0 ? num : num + String.fromCharCode(97 + i);
      items.push({ id, num, order: i, images: imagesOf(s) });
    });
  }

  // Unir botines que son el mismo (ej: mios → 31)
  for (const [from, to] of Object.entries(merge)) {
    const a = items.find((x) => x.id === from);
    const d = items.find((x) => x.id === to);
    if (!a || !d || a === d) continue;
    const seen = new Set(d.images.map((e) => e.full));
    d.images = [...d.images, ...a.images.filter((e) => !seen.has(e.full))];
    items = items.filter((x) => x !== a);
  }

  return items.sort(
    (a, b) => a.num.localeCompare(b.num, undefined, { numeric: true }) || a.order - b.order
  );
}

for (const { src, dest, prefix, merge } of JOBS) {
  console.log(`\n=== ${src} → ${dest} ===`);

  if (!fs.existsSync(src)) {
    console.log('No existe la carpeta de origen, la salteo.');
    continue;
  }
  if (fs.existsSync(dest) && fs.readdirSync(dest).length > 0) {
    console.log('La carpeta destino ya tiene contenido. Borrala o vaciala y volvé a correr.');
    continue;
  }

  const items = agrupar(src, prefix, merge);
  items.forEach((item, i) => {
    const folder = path.join(dest, String(i + 1));
    fs.mkdirSync(folder, { recursive: true });
    item.images.forEach((img, j) => {
      fs.copyFileSync(img.full, path.join(folder, `${j + 1}${img.realExt}`));
    });
    console.log(`${i + 1}  ←  botín ${item.id}  (${item.images.length} fotos)`);
  });
  console.log(`Total: ${items.length} carpetas`);
}
