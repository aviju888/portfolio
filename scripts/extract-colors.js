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

// Score a color by how "interesting" it is for sorting (prefer saturated, non-gray colors)
function colorScore(hsl) {
  // Prefer saturated colors, penalize very dark or very light
  const satBonus = hsl.s;
  const lightPenalty = Math.abs(hsl.l - 50); // Penalize extreme light/dark
  return satBonus - lightPenalty * 0.5;
}

async function extractDominantColor(imagePath) {
  try {
    // Sample a 5x5 grid to find the most characteristic color
    const { data, info } = await sharp(imagePath)
      .resize(5, 5, { fit: 'cover' })
      .raw()
      .toBuffer({ resolveWithObject: true });

    const colors = [];
    for (let i = 0; i < 25; i++) {
      const r = data[i * 3];
      const g = data[i * 3 + 1];
      const b = data[i * 3 + 2];
      const hsl = rgbToHsl(r, g, b);
      colors.push({ r, g, b, hsl, score: colorScore(hsl) });
    }

    // Sort by score and pick the most interesting color
    colors.sort((a, b) => b.score - a.score);
    const best = colors[0];

    // Also compute average for fallback
    const avgR = Math.round(colors.reduce((s, c) => s + c.r, 0) / 25);
    const avgG = Math.round(colors.reduce((s, c) => s + c.g, 0) / 25);
    const avgB = Math.round(colors.reduce((s, c) => s + c.b, 0) / 25);
    const avgHsl = rgbToHsl(avgR, avgG, avgB);

    // Use the most saturated color if it's significantly more interesting, otherwise use average
    const useColor = best.score > 20 ? best : { r: avgR, g: avgG, b: avgB, hsl: avgHsl };

    return {
      rgb: { r: useColor.r, g: useColor.g, b: useColor.b },
      hsl: useColor.hsl,
      hex: `#${useColor.r.toString(16).padStart(2, '0')}${useColor.g.toString(16).padStart(2, '0')}${useColor.b.toString(16).padStart(2, '0')}`
    };
  } catch (e) {
    return null;
  }
}

// Calculate a "warmth" score: positive = warm (red/orange/yellow), negative = cool (blue/green/purple)
function getWarmth(hsl) {
  const h = hsl.h;
  // Warm hues: 0-60 (red to yellow) and 300-360 (magenta to red)
  // Cool hues: 120-270 (green to blue to purple)
  if (h <= 60) return 60 - h; // Red (0) = 60, Yellow (60) = 0
  if (h >= 300) return h - 300 + 60; // Magenta (300) = 60, Red (360) = 120
  if (h <= 180) return -(h - 60); // Green area, increasingly cool
  return -(300 - h); // Blue/purple area
}

// Get lightness category (0=dark, 1=mid, 2=light)
function getLightnessCategory(l) {
  if (l < 30) return 0; // Dark
  if (l > 70) return 2; // Light
  return 1; // Mid
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
        console.log(`[${i + 1}/${data.photos.length}] ${photo.id}: ${color.hex} (H:${color.hsl.h} S:${color.hsl.s} L:${color.hsl.l})`);
      }
    }
  }

  // Sort by: 1) Saturation groups (colorful first, then grayscale)
  //          2) Within colorful: warmth (warm to cool)
  //          3) Within warmth: lightness (light to dark for warm, dark to light for cool)
  data.photos.sort((a, b) => {
    const hslA = a.dominantColor?.hsl ?? { h: 0, s: 0, l: 50 };
    const hslB = b.dominantColor?.hsl ?? { h: 0, s: 0, l: 50 };

    // First: separate grayscale (low saturation) from colorful
    const isGrayA = hslA.s < 15;
    const isGrayB = hslB.s < 15;
    if (isGrayA && !isGrayB) return 1; // Grays at the end
    if (!isGrayA && isGrayB) return -1;

    if (isGrayA && isGrayB) {
      // Both gray: sort by lightness (light to dark)
      return hslB.l - hslA.l;
    }

    // Both colorful: sort by warmth
    const warmthA = getWarmth(hslA);
    const warmthB = getWarmth(hslB);

    // Group by warmth bands (every 30 units)
    const warmthBandA = Math.floor(warmthA / 30);
    const warmthBandB = Math.floor(warmthB / 30);

    if (warmthBandA !== warmthBandB) {
      return warmthBandB - warmthBandA; // Warm first
    }

    // Within same warmth band, sort by lightness
    return hslB.l - hslA.l;
  });

  fs.writeFileSync(PHOTOS_JSON, JSON.stringify(data, null, 2));
  console.log('\nDone! Photos sorted by color (warm to cool, then by lightness).');
}

main().catch(console.error);
