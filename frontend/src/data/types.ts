// src/data/types.ts
export interface Variant {
  colorId: string;
  colorName: string;
  hexCode: string;
  mainImage: string;
  images?: string[];
}

export interface Design {
  id: string;
  title: string;
  description: string;
  defaultColorId: string;
  variants: Variant[];
}

export interface Model {
  id: string;
  name: string;
  category: string;
  designs: Design[];
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  models: Model[];
}