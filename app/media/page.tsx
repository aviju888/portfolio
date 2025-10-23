import { media } from '@/lib/data';
import Section from '../components/Section';
import Card from '../components/Card';

export default function MediaPage() {
  return (
    <Section 
      title="Media" 
      description="My creative work across design, music, and writing"
    >
      {/* Design Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Design
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {media.design.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              description={item.desc}
              href={item.link || undefined}
            />
          ))}
        </div>
      </div>

      {/* Music Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Music
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {media.music.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              description={item.desc}
              href={item.link || undefined}
            />
          ))}
        </div>
      </div>

      {/* Writing Section */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Writing
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {media.writing.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              description={item.desc}
              href={item.link || undefined}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
