import { photos } from '@/lib/data';
import Section from '../components/Section';
import Card from '../components/Card';

export default function PhotosPage() {
  return (
    <Section 
      title="Photos" 
      description="Selected shots from my photography work - graduation portraits, dance performances, and events"
    >
      {/* Featured Photos */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-white mb-6">
          Selected Shots
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {photos.featured.map((photo, index) => (
            <Card
              key={index}
              title={photo.alt}
              subtitle={photo.dateTaken}
              description={photo.description}
              image={photo.src}
            />
          ))}
        </div>
      </div>

      {/* Albums */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6">
          Albums
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {photos.albums.map((album, index) => (
            <Card
              key={index}
              title={album.title}
              subtitle={`${album.count} photos`}
              image={album.thumb}
              href={`/photos/${album.slug}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
