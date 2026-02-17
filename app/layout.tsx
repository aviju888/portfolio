import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { profile } from '@/lib/data';
import { Providers } from './providers';
import VisitorModePopup from './components/VisitorModePopup';
import ModeSwitcher from './components/ModeSwitcher';

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space-grotesk'
});

export const metadata: Metadata = {
  title: profile.name,
  description: profile.bioShort,
  openGraph: {
    title: profile.name,
    description: profile.bioShort,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} font-sans bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen relative`}>
        <Providers>
          {/* Subtle background gradient */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-white dark:bg-gray-950" />
          </div>

          <div className="relative z-10">
            <Nav />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </div>

          {/* Visitor mode overlays */}
          <VisitorModePopup />
          <ModeSwitcher />
        </Providers>
      </body>
    </html>
  );
}
