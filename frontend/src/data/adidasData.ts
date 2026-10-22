// src/data/adidasData.ts
import { Brand } from './types';

export const ADIDAS_BRAND: Brand = {
  id: "adidas",
  name: "Adidas",
  logo: "/assets/adidas-logo.svg",
  models: [
    {
      id: "f50",
      name: "Adidas F50 Elite",
      category: "Velocidad",
      designs: [
        {
          id: "f50-elite-laceless",
          title: "F50 ELITE FG (SIN CORDONES)",
          description: "Diseño ultraligero con suela tornasolada y chasis de máxima velocidad.",
          defaultColorId: "f50-4",
          variants: [
            // F50 - 1
            {
              colorId: "f50-1",
              colorName: "F50 - Edition 1",
              hexCode: "#3b82f6",
              mainImage: "/src/assets/adidas/f50/f50 1 tapones sin cordones.jpeg",
              images: []
            },
            // F50 - 4
            {
              colorId: "f50-4",
              colorName: "F50 - Edition 4",
              hexCode: "#06b6d4",
              mainImage: "/src/assets/adidas/f50/f50-4-sincordones.jpeg",
              images: [
                "/src/assets/adidas/f50/f50-4-sincordones-img2.jpeg",
                "/src/assets/adidas/f50/f50-4-sincordones-img3.jpeg",
                "/src/assets/adidas/f50/f50-4-sincordones-img4.jpeg",
                "/src/assets/adidas/f50/f50-4-sincordones-img5.jpeg",
                "/src/assets/adidas/f50/f50-4-sincordones-img6.jpeg",
                "/src/assets/adidas/f50/f50-4-sincordones-img7.jpeg"
              ]
            },
            // F50 - 5
            {
              colorId: "f50-5",
              colorName: "F50 - Edition 5",
              hexCode: "#10b981",
              mainImage: "/src/assets/adidas/f50/f50-5-sin-cordones.jpeg",
              images: [
                "/src/assets/adidas/f50/f50-5-img2.jpeg",
                "/src/assets/adidas/f50/f50-5-img3.jpeg",
                "/src/assets/adidas/f50/f50-5-img4.jpeg",
                "/src/assets/adidas/f50/f50-5-img5.jpeg",
                "/src/assets/adidas/f50/f50-5-img6.jpeg"
              ]
            },
            // F50 - 6
            {
              colorId: "f50-6",
              colorName: "F50 - Edition 6",
              hexCode: "#8b5cf6",
              mainImage: "/src/assets/adidas/f50/f50-6-sin-cordones.png",
              images: []
            },
            // F50 - 7
            {
              colorId: "f50-7",
              colorName: "F50 - Edition 7",
              hexCode: "#f59e0b",
              mainImage: "/src/assets/adidas/f50/f50-7-sin-cordones.jpeg",
              images: []
            },
            // F50 - 8
            {
              colorId: "f50-8",
              colorName: "F50 - Edition 8",
              hexCode: "#ef4444",
              mainImage: "/src/assets/adidas/f50/f50-8-sin-cordones.jpeg",
              images: [
                "/src/assets/adidas/f50/f50-8-sin-cordones-img2.jpeg",
                "/src/assets/adidas/f50/f50-8-sin-cordones-img3.jpeg"
              ]
            },
            // F50 - 9
            {
              colorId: "f50-9",
              colorName: "F50 - Edition 9",
              hexCode: "#ec4899",
              mainImage: "/src/assets/adidas/f50/f50-9-sin-cordones.jpeg",
              images: []
            },
            // F50 - 10
            {
              colorId: "f50-10",
              colorName: "F50 - Edition 10",
              hexCode: "#6366f1",
              mainImage: "/src/assets/adidas/f50/f50-10-sin-cordones.jpeg",
              images: [
                "/src/assets/adidas/f50/f50-10-sin-cordones-img2.jpeg",
                "/src/assets/adidas/f50/f50-10-sin-cordones-img3.jpeg",
                "/src/assets/adidas/f50/f50-10-sin-cordones-img4.jpeg",
                "/src/assets/adidas/f50/f50-10-sin-cordones-img5.jpeg",
                "/src/assets/adidas/f50/f50-10-sin-cordones-img6.jpeg"
              ]
            },
            // F50 - 11
            {
              colorId: "f50-11",
              colorName: "F50 - Edition 11",
              hexCode: "#14b8a6",
              mainImage: "/src/assets/adidas/f50/f50-11-sin-cordones-.jpeg",
              images: [
                "/src/assets/adidas/f50/f50-11-sin-cordones-img2.jpeg",
                "/src/assets/adidas/f50/f50-11-sin-cordones-img3.jpeg",
                "/src/assets/adidas/f50/f50-11-sin-cordones-img4.jpeg",
                "/src/assets/adidas/f50/f50-11-sin-cordones-img5.jpeg",
                "/src/assets/adidas/f50/f50-11-sin-cordones-img6.jpeg"
              ]
            },
            // F50 - 12
            {
              colorId: "f50-12",
              colorName: "F50 - Edition 12",
              hexCode: "#a855f7",
              mainImage: "/src/assets/adidas/f50/f50-12.jpeg",
              images: []
            },
            // F50 - 13
            {
              colorId: "f50-13",
              colorName: "F50 - Edition 13",
              hexCode: "#0284c7",
              mainImage: "/src/assets/adidas/f50/f50-13.jpeg",
              images: [
                "/src/assets/adidas/f50/f50-13-img2.jpeg",
                "/src/assets/adidas/f50/f50-13-img3.jpeg",
                "/src/assets/adidas/f50/f50-13-img4.jpeg",
                "/src/assets/adidas/f50/f50-13-img5.jpeg",
                "/src/assets/adidas/f50/f50-13-img6.jpeg"
              ]
            },
            // F50 - 18
            {
              colorId: "f50-18",
              colorName: "F50 - Edition 18",
              hexCode: "#f43f5e",
              mainImage: "/src/assets/adidas/f50/f50-18.jpeg",
              images: [
                "/src/assets/adidas/f50/f50-18-img2.jpeg",
                "/src/assets/adidas/f50/f50-18-img3.jpeg",
                "/src/assets/adidas/f50/f50-18-img4.jpeg",
                "/src/assets/adidas/f50/f50-18-img5.jpeg",
                "/src/assets/adidas/f50/f50-18-img6.jpeg"
              ]
            },
            // F50 - 19
            {
              colorId: "f50-19",
              colorName: "F50 - Edition 19",
              hexCode: "#84cc16",
              mainImage: "/src/assets/adidas/f50/f50-19.jpeg",
              images: [
                "/src/assets/adidas/f50/f50-19-img2.jpeg",
                "/src/assets/adidas/f50/f50-19-img3.jpeg",
                "/src/assets/adidas/f50/f50-19-img4.jpeg",
                "/src/assets/adidas/f50/f50-19-img5.jpeg",
                "/src/assets/adidas/f50/f50-19-img6.jpeg"
              ]
            },
            // F50 - 21
            {
              colorId: "f50-21",
              colorName: "F50 - Edition 21",
              hexCode: "#eab308",
              mainImage: "/src/assets/adidas/f50/f50-21.jpeg",
              images: [
                "/src/assets/adidas/f50/f50-21-img2.jpeg",
                "/src/assets/adidas/f50/f50-21-img3.jpeg",
                "/src/assets/adidas/f50/f50-21-img4.jpeg",
                "/src/assets/adidas/f50/f50-21-img5.jpeg",
                "/src/assets/adidas/f50/f50-21-img6.jpeg"
              ]
            },
            // F50 - 22
            {
              colorId: "f50-22",
              colorName: "F50 - Edition 22 (Rosa / Violeta)",
              hexCode: "#d946ef",
              mainImage: "/src/assets/adidas/f50/f50-22.jpeg",
              images: [
                "/src/assets/adidas/f50/f50-22-img2.jpeg",
                "/src/assets/adidas/f50/f50-22-img3.jpeg",
                "/src/assets/adidas/f50/f50-22-img4.jpeg",
                "/src/assets/adidas/f50/f50-22-img5.jpeg"
              ]
            },
            // F50 - 23
            {
              colorId: "f50-23",
              colorName: "F50 - Edition 23",
              hexCode: "#06b6d4",
              mainImage: "/src/assets/adidas/f50/f50-23.jpeg",
              images: [
                "/src/assets/adidas/f50/f50-23-img2.jpeg",
                "/src/assets/adidas/f50/f50-23-img3.jpeg",
                "/src/assets/adidas/f50/f50-23-img4.jpeg",
                "/src/assets/adidas/f50/f50-23-img5.jpeg",
                "/src/assets/adidas/f50/f50-23-img6.jpeg"
              ]
            },
            // F50 - 28
            {
              colorId: "f50-28",
              colorName: "F50 - Edition 28",
              hexCode: "#f97316",
              mainImage: "/src/assets/adidas/f50/f50-28.jpeg",
              images: [
                "/src/assets/adidas/f50/f50-28-1.jpeg",
                "/src/assets/adidas/f50/f50-28-2.jpeg",
                "/src/assets/adidas/f50/f50-28-3.jpeg",
                "/src/assets/adidas/f50/f50-28-4.jpeg",
                "/src/assets/adidas/f50/f50-28-5.jpeg",
                "/src/assets/adidas/f50/f50-28-6.jpeg"
              ]
            },
            // F50 - 29
            {
              colorId: "f50-29",
              colorName: "F50 - Edition 29",
              hexCode: "#64748b",
              mainImage: "/src/assets/adidas/f50/f50-29.jpeg",
              images: [
                "/src/assets/adidas/f50/f50-29-1.jpeg",
                "/src/assets/adidas/f50/f50-29-2.jpeg",
                "/src/assets/adidas/f50/f50-29-3.jpeg",
                "/src/assets/adidas/f50/f50-29-4.jpeg",
                "/src/assets/adidas/f50/f50-29-5.jpeg",
                "/src/assets/adidas/f50/f50-29-6.jpeg"
              ]
            },
            // F50 Mios
            {
              colorId: "f50-mios",
              colorName: "F50 - Edition White Custom",
              hexCode: "#ffffff",
              mainImage: "/src/assets/adidas/f50/f50-mios.jpeg",
              images: []
            }
          ]
        }
      ]
    },
    {
      id: "adidas-copa",
      name: "Adidas Copa",
      category: "Toque Clásico",
      designs: [
        {
          id: "copa-pure-2",
          title: "Copa Pure II Elite FG",
          description: "Cuero Fusionskin ultrasuave para un toque de balón legendario.",
          defaultColorId: "copa-white",
          variants: [
            {
              colorId: "copa-white",
              colorName: "Ivory / Core Black / Solar Red",
              hexCode: "#f4f4f5",
              mainImage: "https://via.placeholder.com/600x400/f4f4f5/000000?text=Adidas+Copa"
            }
          ]
        }
      ]
    },
    {
      id: "adidas-predator",
      name: "Adidas Predator",
      category: "Efecto & Potencia",
      designs: [
        {
          id: "predator-24-ft",
          title: "Predator 24 Fold-over Tongue FG",
          description: "Aletas de goma Strikeskin para tiros con efecto y lengüeta plegable clásica.",
          defaultColorId: "predator-black",
          variants: [
            {
              colorId: "predator-black",
              colorName: "Core Black / Cloud White / Solar Red",
              hexCode: "#09090b",
              mainImage: "https://via.placeholder.com/600x400/09090b/ffffff?text=Adidas+Predator"
            }
          ]
        }
      ]
    }
  ]
};