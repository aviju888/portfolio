import Link from 'next/link';
import { profile } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-white relative"
            style={{
              borderTop: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: 'inset 0 1px 0 0 rgba(0, 0, 0, 0.05)'
            }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 text-sm">
            © 2025 {profile.name}. All rights reserved.
          </div>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              GitHub
            </Link>
            <Link
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              LinkedIn
            </Link>
            <Link
              href={profile.socials.x}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              X
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
