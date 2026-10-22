// src/data/index.ts
import { Brand } from './types';
import { NIKE_BRAND } from './nikeData';
import { ADIDAS_BRAND } from './adidasData';
// Aquí podrás agregar fácilmente futuras marcas como PUMA_BRAND cuando quieras:
// import { PUMA_BRAND } from './pumaData';

export const BOOTS_CATALOG: Brand[] = [
  NIKE_BRAND,
  ADIDAS_BRAND,
  // PUMA_BRAND
];