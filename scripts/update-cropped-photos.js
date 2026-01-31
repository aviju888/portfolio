const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const INSTAGRAM_DIR = path.join(__dirname, '../public/images/gallery/instagram');
const PHOTOS_JSON = path.join(__dirname, '../data/photos.json');

async function getImageOrientation(filePath) {
  try {
    const metadata = await sharp(filePath).metadata();
    return metadata.height > metadata.width ? 'portrait' : 'landscape';
  } catch (e) {
    return 'landscape';
  }
}

async function generateBlurDataURL(filePath) {
  try {
    const buffer = await sharp(filePath)
      .resize(10, 10, { fit: 'inside' })
      .jpeg({ quality: 50 })
      .toBuffer();
    return `data:image/jpeg;base64,${buffer.toString('base64')}`;
  } catch (e) {
    return null;
  }
}

async function main() {
  const photosData = JSON.parse(fs.readFileSync(PHOTOS_JSON, 'utf-8'));

  // Update Instagram photos
  let updated = 0;
  for (const photo of photosData.photos) {
    if (photo.album === 'instagram') {
      const filename = path.basename(photo.srcThumb);
      const filePath = path.join(INSTAGRAM_DIR, filename);

      if (fs.existsSync(filePath)) {
        const newOrientation = await getImageOrientation(filePath);
        const newBlur = await generateBlurDataURL(filePath);

        if (newOrientation !== photo.orientation || newBlur !== photo.blurDataURL) {
          photo.orientation = newOrientation;
          photo.blurDataURL = newBlur;
          updated++;
        }
      }
    }
  }

  fs.writeFileSync(PHOTOS_JSON, JSON.stringify(photosData, null, 2));
  console.log(`Updated ${updated} photos with new orientation/blur data`);
}

main().catch(console.error);
