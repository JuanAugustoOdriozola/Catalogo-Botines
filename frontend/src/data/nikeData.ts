// src/data/nikeData.ts
import { Brand } from './types';

export const NIKE_BRAND: Brand = {
  id: "nike",
  name: "Nike",
  logo: "/assets/nike-logo.svg",
  models: [
    {
      id: "phantom-luna",
      name: "Nike Phantom Luna",
      category: "Control & Agilidad",
      designs: [
        {
          id: "phantom-luna-2-elite",
          title: "Phantom Luna II Elite FG",
          description: "Diseño revolucionario con patrón Cyclone 360 para agilidad multidireccional.",
          defaultColorId: "luna-cyan",
          variants: [
            {
              colorId: "luna-cyan",
              colorName: "Blue Electric / White",
              hexCode: "#0284c7",
              mainImage: "https://via.placeholder.com/600x400/0284c7/ffffff?text=Nike+Phantom+Luna"
            }
          ]
        }
      ]
    },
    {
      id: "phantom-gx3",
      name: "Nike Phantom GX 3",
      category: "Precisión",
      designs: [
        {
          id: "phantom-gx3-elite",
          title: "Phantom GX 3 Elite Touch",
          description: "Material Gripknit de alta precisión para un control supremo del balón.",
          defaultColorId: "gx3-black",
          variants: [
            {
              colorId: "gx3-black",
              colorName: "Black / Metallic Gold",
              hexCode: "#18181b",
              mainImage: "https://via.placeholder.com/600x400/18181b/ffffff?text=Nike+Phantom+GX3"
            }
          ]
        }
      ]
    },
    {
      id: "phantom-mercurial",
      name: "Nike Phantom Mercurial",
      category: "Velocidad",
      designs: [
        {
          id: "mercurial-vapor-16",
          title: "Mercurial Vapor 16 Elite",
          description: "Unidad Air Zoom de tres cuartos para una aceleración explosiva.",
          defaultColorId: "mercurial-pink",
          variants: [
            {
              colorId: "mercurial-pink",
              colorName: "Pink Blast / Gridiron",
              hexCode: "#ec4899",
              mainImage: "https://via.placeholder.com/600x400/ec4899/ffffff?text=Nike+Mercurial"
            }
          ]
        }
      ]
    }
  ]
};