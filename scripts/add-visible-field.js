const fs = require('fs');
const path = require('path');

const PHOTOS_JSON = path.join(__dirname, '../data/photos.json');

const data = JSON.parse(fs.readFileSync(PHOTOS_JSON, 'utf-8'));

// Add visible: true to all photos that don't have it
data.photos = data.photos.map(photo => ({
  ...photo,
  visible: photo.visible !== undefined ? photo.visible : true
}));

fs.writeFileSync(PHOTOS_JSON, JSON.stringify(data, null, 2));
console.log(`Added visible field to ${data.photos.length} photos`);
