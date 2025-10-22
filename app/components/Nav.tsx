'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Code', path: '/code' },
  { name: 'Photos', path: '/photos' },
  { name: 'Media', path: '/media' },
  { name: 'TLDR', path: '/tldr' },
  { name: 'Contact', path: '/contact' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-white text-xl font-semibold">
              Adriel Vijuan
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  pathname === item.path
                    ? 'text-accent'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
