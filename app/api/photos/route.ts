import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'chronos2026';
const PHOTOS_JSON_PATH = path.join(process.cwd(), 'data/photos.json');

export async function GET() {
  try {
    const data = await fs.readFile(PHOTOS_JSON_PATH, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read photos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { password, photos } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Read current data to preserve albums
    const currentData = JSON.parse(await fs.readFile(PHOTOS_JSON_PATH, 'utf-8'));

    // Update photos while preserving albums
    const updatedData = {
      photos,
      albums: currentData.albums
    };

    await fs.writeFile(PHOTOS_JSON_PATH, JSON.stringify(updatedData, null, 2));

    // Revalidate the photos pages
    revalidatePath('/photos');
    revalidatePath('/');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating photos:', error);
    return NextResponse.json({ error: 'Failed to update photos' }, { status: 500 });
  }
}
