import sharp from 'sharp';

// Uso: node favicon.mjs "src/assets/adidas/predator/f11/1/1.jpeg"
const [, , input] = process.argv;

await sharp(input)
  .resize(256, 256, { fit: 'contain', background: '#ffffff' })
  .png()
  .toFile('public/favicon.png');

console.log('Listo: public/favicon.png');