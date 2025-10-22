import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { profile } from '@/lib/data';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-white min-h-screen`}>
        <Nav />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
