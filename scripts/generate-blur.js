const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PHOTOS_JSON_PATH = path.join(__dirname, '../data/photos.json');
const GALLERY_DIR = path.join(__dirname, '../public/images/gallery');

async function generateBlurDataURL(imagePath) {
  try {
    const buffer = await sharp(imagePath)
      .resize(10, 10, { fit: 'inside' })
      .blur()
      .toBuffer();

    const base64 = buffer.toString('base64');
    const mimeType = 'image/jpeg';
    return `data:${mimeType};base64,${base64}`;
  } catch (error) {
    console.error(`Error generating blur for ${imagePath}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('Generating blur placeholders...\n');

  const photosData = JSON.parse(fs.readFileSync(PHOTOS_JSON_PATH, 'utf-8'));
  let updated = 0;

  for (const photo of photosData.photos) {
    const imagePath = path.join(__dirname, '../public', photo.srcThumb);

    if (!fs.existsSync(imagePath)) {
      console.log(`Skipping ${photo.id}: file not found at ${imagePath}`);
      continue;
    }

    const blurDataURL = await generateBlurDataURL(imagePath);
    if (blurDataURL) {
      photo.blurDataURL = blurDataURL;
      updated++;
      console.log(`Generated blur for: ${photo.title}`);
    }
  }

  fs.writeFileSync(PHOTOS_JSON_PATH, JSON.stringify(photosData, null, 2));
  console.log(`\nUpdated ${updated} photos with blur placeholders.`);
}

main().catch(console.error);
