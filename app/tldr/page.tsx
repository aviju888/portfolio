import { tldr, getProjectBySlug } from '@/lib/data';
import Section from '../components/Section';
import Link from 'next/link';

export default function TldrPage() {
  return (
    <Section 
      title="TLDR" 
      description="A quick summary for recruiters and collaborators"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Now Section */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">
            What I'm doing now
          </h3>
          <ul className="space-y-2">
            {tldr.now.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-accent mr-3">•</span>
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Top Projects */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Top Projects
          </h3>
          <ul className="space-y-2">
            {tldr.topProjects.map((slug, index) => {
              const project = getProjectBySlug(slug);
              return project ? (
                <li key={index} className="flex items-start">
                  <span className="text-accent mr-3">•</span>
                  <Link 
                    href={`/code/${project.slug}`}
                    className="text-accent hover:text-accent-hover transition-colors duration-200"
                  >
                    {project.title}
                  </Link>
                  <span className="text-gray-400 ml-2">- {project.summary}</span>
                </li>
              ) : null;
            })}
          </ul>
        </div>

        {/* Selected Photos */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Selected Photos
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tldr.selectedPhotos.map((photo, index) => (
              <div key={index} className="relative">
                <img
                  src={photo}
                  alt={`Selected photo ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Media */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Recent Media
          </h3>
          <ul className="space-y-2">
            {tldr.recentMedia.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-accent mr-3">•</span>
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Contact
          </h3>
          <div className="space-y-2">
            <p className="text-gray-300">
              <span className="font-medium text-white">Email:</span> {tldr.contact.email}
            </p>
            <div className="flex space-x-4">
              {tldr.contact.links.map((link, index) => (
                <Link
                  key={index}
                  href={`/${link}`}
                  className="text-accent hover:text-accent-hover transition-colors duration-200 capitalize"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
