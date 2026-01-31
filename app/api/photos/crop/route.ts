import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'chronos2026';
const PHOTOS_JSON_PATH = path.join(process.cwd(), 'data/photos.json');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

export async function POST(request: NextRequest) {
  try {
    const { password, photoId, crop } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Read photos data
    const photosData = JSON.parse(await fs.readFile(PHOTOS_JSON_PATH, 'utf-8'));
    const photo = photosData.photos.find((p: any) => p.id === photoId);

    if (!photo) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
    }

    // Get the image path
    const imagePath = path.join(PUBLIC_DIR, photo.srcThumb);

    // Crop the image
    const croppedBuffer = await sharp(imagePath)
      .extract({
        left: crop.x,
        top: crop.y,
        width: crop.width,
        height: crop.height
      })
      .jpeg({ quality: 90 })
      .toBuffer();

    // Save the cropped image
    await fs.writeFile(imagePath, croppedBuffer);

    // Update orientation based on new dimensions
    const newOrientation = crop.height > crop.width ? 'portrait' : 'landscape';

    // Generate new blur data URL
    const blurBuffer = await sharp(croppedBuffer)
      .resize(10, 10, { fit: 'inside' })
      .jpeg({ quality: 50 })
      .toBuffer();
    const blurDataURL = `data:image/jpeg;base64,${blurBuffer.toString('base64')}`;

    // Update photo in data
    photo.orientation = newOrientation;
    photo.blurDataURL = blurDataURL;

    // Save updated photos.json
    await fs.writeFile(PHOTOS_JSON_PATH, JSON.stringify(photosData, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error cropping photo:', error);
    return NextResponse.json({ error: 'Failed to crop photo' }, { status: 500 });
  }
}
