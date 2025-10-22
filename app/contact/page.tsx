import { profile } from '@/lib/data';
import Section from '../components/Section';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <Section 
      title="Contact" 
      description="Let's connect and work together"
    >
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Get in touch
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            I'm always interested in new opportunities, collaborations, and conversations about technology and creativity.
          </p>
        </div>

        <div className="space-y-6">
          {/* Email */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-2">
              Email
            </h3>
            <Link
              href={`mailto:${profile.email}`}
              className="text-accent hover:text-accent-hover transition-colors duration-200 text-lg"
            >
              {profile.email}
            </Link>
          </div>

          {/* Social Links */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">
              Social
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                GitHub
              </Link>
              <Link
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                LinkedIn
              </Link>
              <Link
                href={profile.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Instagram
              </Link>
            </div>
          </div>

          {/* Quick Response */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-2">
              Response Time
            </h3>
            <p className="text-gray-400">
              I typically respond within 24 hours. For urgent matters, feel free to mention it in your email.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
