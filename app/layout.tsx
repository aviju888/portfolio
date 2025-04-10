'use client';

import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Caveat } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { DomainProvider } from './components/layout/DomainProvider';

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
  preload: true,
  adjustFontFallback: true,
  variable: '--font-jakarta'
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-handwriting'
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHumanPage = pathname.startsWith('/human');

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Adriel Vijuan | UC Berkeley EECS</title>
        <meta name="description" content="Portfolio showcasing creative and software work by Adriel Vijuan" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />

        <link rel="icon" href="/images/av-circle-logo-small.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="prefetch" href="/not-found" as="document" />
        <link rel="prefetch" href="/error" as="document" />
      </head>
      <body className={`${jakarta.className} ${jakarta.variable} ${caveat.variable} bg-black text-white min-h-screen`}>
        <DomainProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </DomainProvider>
      </body>
    </html>
  );
}
