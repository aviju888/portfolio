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

function parseDateFromFilename(filename) {
  // Format: 2026-01-22_05-57-52_UTC_1.jpg
  const match = filename.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    const [, year, month] = match;
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[parseInt(month) - 1]} ${year}`;
  }
  return 'Unknown';
}

async function main() {
  // Read existing photos.json
  const photosData = JSON.parse(fs.readFileSync(PHOTOS_JSON, 'utf-8'));

  // Get all Instagram photos
  const files = fs.readdirSync(INSTAGRAM_DIR)
    .filter(f => f.endsWith('.jpg'))
    .sort();

  console.log(`Found ${files.length} Instagram photos`);

  // Get current max rank
  let maxRank = Math.max(...photosData.photos.map(p => p.rank || 0));

  const newPhotos = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(INSTAGRAM_DIR, file);
    const orientation = await getImageOrientation(filePath);
    const blurDataURL = await generateBlurDataURL(filePath);
    const dateTaken = parseDateFromFilename(file);

    const photoNum = String(i + 1).padStart(3, '0');
    const id = `ig-${photoNum}`;
    const title = `IG-${photoNum}`;

    const photo = {
      id,
      album: 'instagram',
      srcThumb: `/images/gallery/instagram/${file}`,
      srcFull: `/images/gallery/instagram/${file}`,
      title,
      alt: title,
      description: 'Photography',
      orientation,
      featured: false,
      dateTaken,
      rank: maxRank + i + 1,
      blurDataURL
    };

    newPhotos.push(photo);
    console.log(`[${i + 1}/${files.length}] Processed ${file} - ${orientation} - ${dateTaken}`);
  }

  // Add new photos to existing
  photosData.photos = [...photosData.photos, ...newPhotos];

  // Add Instagram album if not exists
  if (!photosData.albums.find(a => a.slug === 'instagram')) {
    photosData.albums.push({
      slug: 'instagram',
      title: 'Instagram',
      category: 'Photography',
      cover: `/images/gallery/instagram/${files[0]}`,
      count: newPhotos.length,
      description: 'Photos from Instagram'
    });
  }

  // Write updated photos.json
  fs.writeFileSync(PHOTOS_JSON, JSON.stringify(photosData, null, 2));
  console.log(`\nAdded ${newPhotos.length} photos to photos.json`);
  console.log(`Total photos: ${photosData.photos.length}`);
}

main().catch(console.error);
