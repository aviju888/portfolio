import { NextResponse } from 'next/server';
import photosData from '@/data/photos.json';

// Simple GET endpoint - just returns the photos data
// Updates are done by downloading the JSON and committing manually
export async function GET() {
  return NextResponse.json(photosData);
}
