export interface Design {
  id: string;
  title: string;
  badge: string;                       // Fútbol 11, Futsal, etc.
  price: number;
  folder: string;                      // relativa a src/assets
  sizes: number[];
  layout?: 'folders';                  // 'folders' = una carpeta por botín. Sin esto: formato viejo
  prefix?: string;                     // solo formato viejo
  colorNames?: Record<string, string>; // solo formato viejo
  merge?: Record<string, string>;      // solo formato viejo
}
export interface Model { id: string; name: string; tagline: string; designs: Design[] }
export interface Brand { id: string; name: string; models: Model[] }

const SIZES = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

// Crea los 3 diseños estándar de un modelo de Nike
const nikeDesigns = (model: string, name: string): Design[] => [
  {
    id: `${model}-con-cordones-f11`,
    title: `${name} · Con cordones`,
    badge: 'Fútbol 11',
    price: 149999,
    folder: `nike/${model}/f11-cordones`,
    layout: 'folders',
    sizes: SIZES,
  },
  {
    id: `${model}-sin-cordones-f11`,
    title: `${name} · Sin cordones`,
    badge: 'Fútbol 11',
    price: 149999,
    folder: `nike/${model}/f11-sinCordones`,
    layout: 'folders',
    sizes: SIZES,
  },
  {
    id: `${model}-f5`,
    title: name,
    badge: 'Fútbol 5',
    price: 149999,
    folder: `nike/${model}/f5`,
    layout: 'folders',
    sizes: SIZES,
  },
];

export const CATALOG: Brand[] = [
  {
    id: 'adidas',
    name: 'Adidas',
    models: [
      {
        id: 'f50',
        name: 'F50',
        tagline: 'Velocidad',
        designs: [
          {
            id: 'f50-sin-cordones-f11',
            title: 'F50 · Sin cordones',
            badge: 'Fútbol 11',
            price: 149999,
            folder: 'adidas/f50/f11-sinCordones',
            layout: 'folders',
            sizes: SIZES,
          },
          {
            id: 'f50-con-cordones-f11',
            title: 'F50 · Con cordones',
            badge: 'Fútbol 11',
            price: 149999,
            folder: 'adidas/f50/f11-cordones',
            layout: 'folders',
            sizes: SIZES,
          },
          {
            id: 'f50-f5',
            title: 'F50 · F5',
            badge: 'Fútbol 5',
            price: 149999,
            folder: 'adidas/f50/f5',
            layout: 'folders',
            sizes: SIZES,
          },
          {
            id: 'f50-f11-messi',
            title: 'F50 · Messi',
            badge: 'Fútbol 11',
            price: 149999,
            folder: 'adidas/messi-sinCordones',
            prefix: 'f50',
            sizes: SIZES,
          },
        ],
      },
      {
        id: 'predator',
        name: 'Predator',
        tagline: 'Efecto y potencia',
        designs: [
          {
            id: 'predator-sin-cordones-f11',
            title: 'Predator · Sin cordones',
            badge: 'Fútbol 11',
            price: 149999,
            folder: 'adidas/predator/f11',
            layout: 'folders',
            sizes: SIZES,
          },
          {
            id: 'predator-con-cordones-f11',
            title: 'Predator · Con cordones',
            badge: 'Fútbol 11',
            price: 149999,
            folder: 'adidas/predator/f11-cordones',
            layout: 'folders',
            sizes: SIZES,
          },
          {
            id: 'predator-con-lengua-f11',
            title: 'Predator · Con lengua',
            badge: 'Fútbol 11',
            price: 149999,
            folder: 'adidas/predator/f11-lengua',
            layout: 'folders',
            sizes: SIZES,
          },
          {
            id: 'predator-f5',
            title: 'Predator · Fútbol 5',
            badge: 'Fútbol 5',
            price: 149999,
            folder: 'adidas/predator/f5',
            layout: 'folders',
            sizes: SIZES,
          },
        ],
      },
      {
        id: 'copa',
        name: 'Copa',
        tagline: 'Toque clásico',
        designs: [
          {
            id: 'copa-sin-cordones-f11',
            title: 'Copa · Sin cordones',
            badge: 'Fútbol 11',
            price: 149999,
            folder: 'adidas/copa/f11',
            layout: 'folders',
            sizes: SIZES,
          },
          {
            id: 'copa-con-cordones-f11',
            title: 'Copa · Con cordones',
            badge: 'Fútbol 11',
            price: 149999,
            folder: 'adidas/copa/f11-cordones',
            layout: 'folders',
            sizes: SIZES,
          },
          {
            id: 'copa-f5',
            title: 'Copa',
            badge: 'Fútbol 5',
            price: 149999,
            folder: 'adidas/copa/f5',
            layout: 'folders',
            sizes: SIZES,
          },
        ],
      },
    ],
  },
  {
    id: 'nike',
    name: 'Nike',
    models: [
      { id: 'gx3', name: 'Phantom GX3', tagline: 'Control y precisión', designs: nikeDesigns('gx3', 'Phantom GX3') },
      {
        id: 'gx2',
        name: 'Phantom GX2',
        tagline: 'Control y precisión',
        designs: nikeDesigns('gx2', 'Phantom GX2').filter((d) => !d.id.includes('sin-cordones')),
      },
      {
        id: 'mercurial',
        name: 'Mercurial 1',
        tagline: 'Velocidad',
        designs: nikeDesigns('mercurial', 'Mercurial 1').filter((d) => !d.id.includes('sin-cordones')),
      },
      {
        id: 'mercurial-2',
        name: 'Mercurial 2',
        tagline: 'Velocidad',
        designs: nikeDesigns('mercurial-2', 'Mercurial 2').filter((d) => !d.id.includes('sin-cordones')),
      },
    ],
  },
  { id: 'puma', name: 'Puma', models: [] },
];

// ===== PRECIOS =====
// Fútbol 11 → 150.000 · todo lo demás (Fútbol 5, Futsal...) → 140.000
// Esta regla pisa los "price" de arriba. Para cambiar precios, tocá solo estas dos líneas.
const PRECIO_F11 = 150000;
const PRECIO_RESTO = 140000;

for (const brand of CATALOG) {
  for (const model of brand.models) {
    for (const design of model.designs) {
      design.price = /\b11\b/.test(design.badge) ? PRECIO_F11 : PRECIO_RESTO;
    }
  }
}