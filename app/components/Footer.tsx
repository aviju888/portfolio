import Link from 'next/link';
import { profile } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 relative border-t border-black/[0.08] dark:border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; 2026 {profile.name}. All rights reserved.
          </div>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              GitHub
            </Link>
            <Link
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              LinkedIn
            </Link>
            <Link
              href={profile.socials.x}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              X
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
