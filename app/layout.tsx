import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from './components/layout/Navbar';

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Adriel Vijuan",
  description: "Personal portfolio of Adriel Vijuan - AI, Software, Creative",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="bg-[#0a0a0a] text-white selection:bg-purple-500 selection:text-white">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="container mx-auto px-6 py-8 text-center">
          Adriel Vijuan 2025
        </footer>
      </body>
    </html>
  );
}
