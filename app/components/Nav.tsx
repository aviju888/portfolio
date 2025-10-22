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
    <nav className="sticky top-0 z-50 bg-gray-900/70 supports-[backdrop-filter]:bg-gray-900/60 backdrop-blur border-b border-white/[0.1]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-white text-h3 font-semibold">
              Adriel Vijuan
            </Link>
          </div>
          
          <div className="flex items-center space-x-6 md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`relative text-small font-medium transition-colors duration-200 ${
                  pathname === item.path
                    ? 'text-white'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.name}
                {pathname === item.path && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] w-6 bg-sky-400 rounded-full" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
