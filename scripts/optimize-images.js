const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Configuration
const CONFIG = {
  inputDirs: {
    gallery: 'public/images/gallery',
    projects: 'public/images/projects'
  },
  outputDirs: {
    gallery: 'public/images/gallery-optimized',
    projects: 'public/images/projects-optimized'
  },
  sizes: {
    thumbnails: [400, 800],
    fullSize: [1200, 1920, 2400]
  },
  formats: {
    avif: { quality: 70, effort: 4 },
    webp: { quality: 82, effort: 4 },
    jpeg: { quality: 85, progressive: true }
  },
  // Skip files that shouldn't be optimized
  skipExtensions: ['.pdf', '.svg', '.gif']
};

// Ensure output directories exist
function ensureDirectories() {
  Object.values(CONFIG.outputDirs).forEach(dir => {
    ['avif', 'webp', 'jpeg'].forEach(format => {
      const formatDir = path.join(dir, format);
      if (!fs.existsSync(formatDir)) {
        fs.mkdirSync(formatDir, { recursive: true });
      }
    });
  });
}

// Get all image files from input directories
async function getImageFiles(dir) {
  const pattern = path.join(dir, '**/*.{jpg,jpeg,png,JPG,JPEG,PNG}');
  return await glob(pattern);
}

// Process a single image to create all variants
async function processImage(inputPath, outputDir, category) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const results = {
    original: inputPath,
    filename: filename,
    variants: {}
  };

  console.log(`Processing: ${filename}`);

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Determine which sizes to generate based on original dimensions
    const sizes = [...CONFIG.sizes.thumbnails, ...CONFIG.sizes.fullSize];

    // Process each size
    for (const width of sizes) {
      // Skip if requested size is larger than original
      if (width > metadata.width) {
        console.log(`  Skipping ${width}w (larger than original ${metadata.width}w)`);
        continue;
      }

      const sizeKey = width <= 800 ? `thumb_${width}` : `full_${width}`;
      results.variants[sizeKey] = {};

      // Generate AVIF
      const avifPath = path.join(outputDir, 'avif', `${filename}-${width}w.avif`);
      await sharp(inputPath)
        .resize(width, null, { withoutEnlargement: true })
        .avif(CONFIG.formats.avif)
        .toFile(avifPath);
      results.variants[sizeKey].avif = `/${path.relative('public', avifPath)}`;

      // Generate WebP
      const webpPath = path.join(outputDir, 'webp', `${filename}-${width}w.webp`);
      await sharp(inputPath)
        .resize(width, null, { withoutEnlargement: true })
        .webp(CONFIG.formats.webp)
        .toFile(webpPath);
      results.variants[sizeKey].webp = `/${path.relative('public', webpPath)}`;

      // Generate JPEG
      const jpegPath = path.join(outputDir, 'jpeg', `${filename}-${width}w.jpg`);
      await sharp(inputPath)
        .resize(width, null, { withoutEnlargement: true })
        .jpeg(CONFIG.formats.jpeg)
        .toFile(jpegPath);
      results.variants[sizeKey].jpeg = `/${path.relative('public', jpegPath)}`;

      // Get file sizes for logging
      const avifSize = fs.statSync(avifPath).size;
      const webpSize = fs.statSync(webpPath).size;
      const jpegSize = fs.statSync(jpegPath).size;

      console.log(`  ${width}w: AVIF ${formatBytes(avifSize)}, WebP ${formatBytes(webpSize)}, JPEG ${formatBytes(jpegSize)}`);
    }

  } catch (error) {
    console.error(`Error processing ${filename}:`, error.message);
    return null;
  }

  return results;
}

// Format bytes for logging
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

// Main processing function
async function optimizeImages() {
  console.log('🖼️  Starting image optimization...\n');

  ensureDirectories();

  const stats = {
    processed: 0,
    skipped: 0,
    failed: 0,
    originalSize: 0,
    optimizedSize: 0
  };

  // Process gallery images
  console.log('📸 Processing gallery images...');
  const galleryImages = await getImageFiles(CONFIG.inputDirs.gallery);
  const galleryResults = [];

  for (const imagePath of galleryImages) {
    const ext = path.extname(imagePath).toLowerCase();
    if (CONFIG.skipExtensions.includes(ext)) {
      console.log(`Skipping: ${path.basename(imagePath)} (unsupported format)`);
      stats.skipped++;
      continue;
    }

    const originalSize = fs.statSync(imagePath).size;
    stats.originalSize += originalSize;

    const result = await processImage(imagePath, CONFIG.outputDirs.gallery, 'gallery');
    if (result) {
      galleryResults.push(result);
      stats.processed++;
    } else {
      stats.failed++;
    }
  }

  // Process project images
  console.log('\n💼 Processing project images...');
  const projectImages = await getImageFiles(CONFIG.inputDirs.projects);
  const projectResults = [];

  for (const imagePath of projectImages) {
    const ext = path.extname(imagePath).toLowerCase();
    if (CONFIG.skipExtensions.includes(ext)) {
      console.log(`Skipping: ${path.basename(imagePath)} (unsupported format)`);
      stats.skipped++;
      continue;
    }

    const originalSize = fs.statSync(imagePath).size;
    stats.originalSize += originalSize;

    const result = await processImage(imagePath, CONFIG.outputDirs.projects, 'projects');
    if (result) {
      projectResults.push(result);
      stats.processed++;
    } else {
      stats.failed++;
    }
  }

  // Calculate optimized sizes
  const getDirectorySize = (dir) => {
    let totalSize = 0;
    if (!fs.existsSync(dir)) return 0;

    const walk = (directory) => {
      const files = fs.readdirSync(directory);
      files.forEach(file => {
        const filepath = path.join(directory, file);
        const stat = fs.statSync(filepath);
        if (stat.isDirectory()) {
          walk(filepath);
        } else {
          totalSize += stat.size;
        }
      });
    };

    walk(dir);
    return totalSize;
  };

  stats.optimizedSize = getDirectorySize(CONFIG.outputDirs.gallery) + getDirectorySize(CONFIG.outputDirs.projects);

  // Save manifest
  const manifest = {
    generated: new Date().toISOString(),
    gallery: galleryResults,
    projects: projectResults,
    stats
  };

  fs.writeFileSync(
    'public/images/optimization-manifest.json',
    JSON.stringify(manifest, null, 2)
  );

  // Print summary
  console.log('\n✅ Optimization complete!\n');
  console.log('📊 Summary:');
  console.log(`   Images processed: ${stats.processed}`);
  console.log(`   Images skipped: ${stats.skipped}`);
  console.log(`   Images failed: ${stats.failed}`);
  console.log(`   Original size: ${formatBytes(stats.originalSize)}`);
  console.log(`   Optimized size: ${formatBytes(stats.optimizedSize)}`);
  console.log(`   Size reduction: ${Math.round((1 - stats.optimizedSize / stats.originalSize) * 100)}%`);
  console.log(`\n💾 Manifest saved to: public/images/optimization-manifest.json`);
}

// Run optimization
optimizeImages().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
