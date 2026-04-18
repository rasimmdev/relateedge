import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WaitlistProvider } from "@/components/waitlist/WaitlistContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "RelateEdge — Win More Upwork Jobs with Better Proposals",
  description:
    "Generate high-converting Upwork proposals in seconds. Get more replies, improve your profile, and close more deals with AI-powered insights.",

  keywords: [
    "Upwork proposals",
    "freelance proposals",
    "AI proposal generator",
    "Upwork tool",
    "freelancer SaaS",
  ],

  openGraph: {
    title: "RelateEdge — Turn Job Posts Into Winning Proposals",
    description:
      "Stop guessing what to write. Generate personalized, high-scoring proposals that get replies.",
    url: "https://relateedge.com",
    siteName: "RelateEdge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RelateEdge AI Proposal Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Win More Clients on Upwork",
    description:
      "AI-generated proposals that actually get replies.",
    images: ["/og-image.png"],
  },

  metadataBase: new URL("https://relateedge.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans w-screen overflow-x-hidden`}>
      <body className="relative min-h-screen bg-[#fafbff] text-slate-900">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[900px] -z-10 bg-grid" />

        <WaitlistProvider>
          <Header />
          {children}
          <Footer />
        </WaitlistProvider>

      </body>
    </html>
  );
}