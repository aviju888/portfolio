import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Caveat } from 'next/font/google';
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

export const metadata: Metadata = {
  title: 'Adriel Vijuan | UC Berkeley EECS',
  description: 'Portfolio showcasing creative and software work by Adriel Vijuan',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
