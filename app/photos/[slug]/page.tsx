import { getPhotosByAlbum, getAlbumBySlug, photos } from '@/lib/data';
import Section from '../../components/Section';
import Link from 'next/link';
import AlbumClient from './AlbumClient';

export async function generateStaticParams() {
  return photos.albums.map((album) => ({
    slug: album.slug,
  }));
}

interface AlbumPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { slug } = await params;
  
  const album = getAlbumBySlug(slug);
  const photos = getPhotosByAlbum(slug);
  
  if (!album) {
    return (
      <Section title="Album Not Found" description="The requested album could not be found.">
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">This album doesn't exist.</p>
          <Link href="/photos" className="text-gray-900 hover:text-gray-600 underline">
            ← Back to Photos
          </Link>
        </div>
      </Section>
    );
  }

  return (
    <Section 
      title={album.title}
      description={album.description}
    >
      {/* Breadcrumb */}
      <div className="mb-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <Link href="/photos" className="hover:text-gray-900">
            Photos
          </Link>
          <span>→</span>
          <span className="text-gray-900">{album.title}</span>
        </nav>
      </div>

      <AlbumClient photos={photos} />
    </Section>
  );
}
