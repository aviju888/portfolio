const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PHOTOS_JSON = path.join(__dirname, '../data/photos.json');
const PUBLIC_DIR = path.join(__dirname, '../public');

// Convert RGB to HSL
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

async function extractDominantColor(imagePath) {
  try {
    // Resize to 1x1 to get average color
    const { data } = await sharp(imagePath)
      .resize(1, 1)
      .raw()
      .toBuffer({ resolveWithObject: true });

    const r = data[0], g = data[1], b = data[2];
    const hsl = rgbToHsl(r, g, b);

    return {
      rgb: { r, g, b },
      hsl,
      hex: `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
    };
  } catch (e) {
    return null;
  }
}

async function main() {
  const data = JSON.parse(fs.readFileSync(PHOTOS_JSON, 'utf-8'));

  console.log(`Extracting colors from ${data.photos.length} photos...\n`);

  for (let i = 0; i < data.photos.length; i++) {
    const photo = data.photos[i];
    const imagePath = path.join(PUBLIC_DIR, photo.srcThumb);

    if (fs.existsSync(imagePath)) {
      const color = await extractDominantColor(imagePath);
      if (color) {
        photo.dominantColor = color;
        console.log(`[${i + 1}/${data.photos.length}] ${photo.id}: ${color.hex} (H:${color.hsl.h})`);
      }
    }
  }

  // Sort by hue for rainbow effect
  data.photos.sort((a, b) => {
    const hueA = a.dominantColor?.hsl?.h ?? 0;
    const hueB = b.dominantColor?.hsl?.h ?? 0;
    return hueA - hueB;
  });

  fs.writeFileSync(PHOTOS_JSON, JSON.stringify(data, null, 2));
  console.log('\nDone! Photos sorted by color.');
}

main().catch(console.error);
