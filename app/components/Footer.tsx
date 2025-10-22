import Link from 'next/link';
import { profile } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2025 {profile.name}. All rights reserved.
          </div>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-accent transition-colors duration-200"
            >
              GitHub
            </Link>
            <Link
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-accent transition-colors duration-200"
            >
              LinkedIn
            </Link>
            <Link
              href={profile.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-accent transition-colors duration-200"
            >
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
