const fs = require('fs');
const path = require('path');

const PHOTOS_JSON = path.join(__dirname, '../data/photos.json');

// Convert RGB to LAB for better perceptual color distance
function rgbToLab(r, g, b) {
  // RGB to XYZ
  let rr = r / 255, gg = g / 255, bb = b / 255;
  rr = rr > 0.04045 ? Math.pow((rr + 0.055) / 1.055, 2.4) : rr / 12.92;
  gg = gg > 0.04045 ? Math.pow((gg + 0.055) / 1.055, 2.4) : gg / 12.92;
  bb = bb > 0.04045 ? Math.pow((bb + 0.055) / 1.055, 2.4) : bb / 12.92;

  const x = (rr * 0.4124 + gg * 0.3576 + bb * 0.1805) / 0.95047;
  const y = (rr * 0.2126 + gg * 0.7152 + bb * 0.0722) / 1.00000;
  const z = (rr * 0.0193 + gg * 0.1192 + bb * 0.9505) / 1.08883;

  const fx = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
  const fy = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
  const fz = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;

  return {
    l: (116 * fy) - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz)
  };
}

// Color distance in LAB space
function colorDistance(lab1, lab2) {
  return Math.sqrt(
    Math.pow(lab1.l - lab2.l, 2) +
    Math.pow(lab1.a - lab2.a, 2) +
    Math.pow(lab1.b - lab2.b, 2)
  );
}

// Simple k-means clustering
function kMeans(photos, k = 8) {
  // Initialize centroids randomly
  const shuffled = [...photos].sort(() => Math.random() - 0.5);
  let centroids = shuffled.slice(0, k).map(p => ({
    l: p.lab.l,
    a: p.lab.a,
    b: p.lab.b
  }));

  let assignments = new Array(photos.length).fill(0);
  let changed = true;
  let iterations = 0;

  while (changed && iterations < 50) {
    changed = false;
    iterations++;

    // Assign each photo to nearest centroid
    for (let i = 0; i < photos.length; i++) {
      let minDist = Infinity;
      let nearest = 0;
      for (let j = 0; j < k; j++) {
        const dist = colorDistance(photos[i].lab, centroids[j]);
        if (dist < minDist) {
          minDist = dist;
          nearest = j;
        }
      }
      if (assignments[i] !== nearest) {
        assignments[i] = nearest;
        changed = true;
      }
    }

    // Update centroids
    for (let j = 0; j < k; j++) {
      const members = photos.filter((_, i) => assignments[i] === j);
      if (members.length > 0) {
        centroids[j] = {
          l: members.reduce((s, p) => s + p.lab.l, 0) / members.length,
          a: members.reduce((s, p) => s + p.lab.a, 0) / members.length,
          b: members.reduce((s, p) => s + p.lab.b, 0) / members.length
        };
      }
    }
  }

  return { assignments, centroids };
}

// Sort clusters by average lightness, then arrange photos within each cluster
function sortPhotos(photos) {
  // Add LAB values
  photos.forEach(p => {
    if (p.dominantColor?.rgb) {
      p.lab = rgbToLab(p.dominantColor.rgb.r, p.dominantColor.rgb.g, p.dominantColor.rgb.b);
    } else {
      p.lab = { l: 50, a: 0, b: 0 }; // Default gray
    }
  });

  // Cluster
  const k = Math.min(8, Math.ceil(photos.length / 10));
  const { assignments, centroids } = kMeans(photos, k);

  // Group photos by cluster
  const clusters = [];
  for (let i = 0; i < k; i++) {
    const members = photos.filter((_, idx) => assignments[idx] === i);
    if (members.length > 0) {
      clusters.push({
        centroid: centroids[i],
        photos: members
      });
    }
  }

  // Sort clusters: warm colors first, then cool colors
  // Use 'a' value in LAB (positive = red/warm, negative = green/cool)
  clusters.sort((a, b) => b.centroid.a - a.centroid.a);

  // Within each cluster, sort by lightness (light to dark)
  clusters.forEach(c => {
    c.photos.sort((a, b) => b.lab.l - a.lab.l);
  });

  // Flatten back to array
  const sorted = clusters.flatMap(c => c.photos);

  // Clean up temp lab values
  sorted.forEach(p => delete p.lab);

  return sorted;
}

async function main() {
  const data = JSON.parse(fs.readFileSync(PHOTOS_JSON, 'utf-8'));

  console.log(`Clustering ${data.photos.length} photos by color...\n`);

  data.photos = sortPhotos(data.photos);

  fs.writeFileSync(PHOTOS_JSON, JSON.stringify(data, null, 2));
  console.log('Done! Photos clustered and sorted by color.');
}

main().catch(console.error);
