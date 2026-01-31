const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const INSTAGRAM_DIR = path.join(__dirname, '../public/images/gallery/instagram');

// Photos before July 28, 2024 that might have black bars
function isBeforeCutoff(filename) {
  const match = filename.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return false;
  const [, year, month, day] = match;
  const date = new Date(year, parseInt(month) - 1, parseInt(day));
  const cutoff = new Date(2024, 6, 28); // July 28, 2024
  return date < cutoff;
}

async function cropBlackBars(filePath) {
  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Use sharp's trim to remove uniform color borders
    // trim() removes pixels that are similar to the top-left pixel
    const trimmed = await image
      .trim({
        threshold: 10, // tolerance for "similar" colors
        background: '#000000'
      })
      .toBuffer();

    const trimmedMeta = await sharp(trimmed).metadata();

    // Only save if we actually cropped something significant (more than 5px on any side)
    const widthDiff = metadata.width - trimmedMeta.width;
    const heightDiff = metadata.height - trimmedMeta.height;

    if (widthDiff > 10 || heightDiff > 10) {
      await sharp(trimmed).jpeg({ quality: 90 }).toFile(filePath + '.tmp');
      fs.renameSync(filePath + '.tmp', filePath);
      return { cropped: true, widthDiff, heightDiff };
    }

    return { cropped: false };
  } catch (e) {
    return { cropped: false, error: e.message };
  }
}

async function main() {
  const files = fs.readdirSync(INSTAGRAM_DIR)
    .filter(f => f.endsWith('.jpg') && isBeforeCutoff(f));

  console.log(`Found ${files.length} photos before July 28, 2024 to check for black bars\n`);

  let croppedCount = 0;

  for (const file of files) {
    const filePath = path.join(INSTAGRAM_DIR, file);
    const result = await cropBlackBars(filePath);

    if (result.cropped) {
      console.log(`Cropped: ${file} (-${result.widthDiff}w, -${result.heightDiff}h)`);
      croppedCount++;
    }
  }

  console.log(`\nDone. Cropped black bars from ${croppedCount} photos.`);
}

main().catch(console.error);
