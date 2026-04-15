import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "RelateEdge — Write proposals that get replies",
  description: "AI-powered proposal tool for Upwork freelancers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${inter.variable} font-sans max-w-screen overflow-x-hidden`}>
      <body style={{ background: '#fafbff', minHeight: '100vh', margin: 0, color: '#0f172a' }}>
        
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '900px',
          pointerEvents: 'none', zIndex: -1,
          backgroundImage: 'linear-gradient(rgba(79,70,229,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 100% 60% at 50% 0%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 100% 60% at 50% 0%, black 30%, transparent 100%)',
        }} />

        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
