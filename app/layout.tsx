import './globals.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Header } from './components/layout/Header';
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

export const metadata: Metadata = {
  title: 'Adriel Vijuan - Creative Developer & Designer',
  description: 'Portfolio showcasing creative, software, and design work by Adriel Vijuan',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jakarta.className} ${jakarta.variable} bg-black text-white min-h-screen`}>
        <DomainProvider>
          <Header />
          <main>{children}</main>
          <footer className="container mx-auto px-6 py-8 text-center text-white/60">
            © {new Date().getFullYear()} Adriel Vijuan. All rights reserved.
          </footer>
        </DomainProvider>
      </body>
    </html>
  );
}
