import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/BackToTop'

export const metadata: Metadata = {
  title: "TechPulse - Future Technology Blog",
  description: "Exploring emerging technologies and their impact on tomorrow",
  keywords: ["technology", "AI", "innovation", "future tech", "engineering"],
  authors: [{ name: "TechPulse Team" }],
  openGraph: {
    title: "TechPulse - Future Technology Blog",
    description: "Exploring emerging technologies and their impact on tomorrow",
    url: "https://techpulse.example.com",
    siteName: "TechPulse",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechPulse - Future Technology Blog",
    description: "Exploring emerging technologies and their impact on tomorrow",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-brutal-black antialiased">
        <div className="relative">
          {/* Grid background */}
          <div className="fixed inset-0 grid-bg opacity-5 pointer-events-none" />
          
          {/* Scanline effect */}
          <div className="fixed inset-0 scanline pointer-events-none" />
          
          {/* Main content */}
          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <BackToTop />
          </div>
        </div>
      </body>
    </html>
  );
}
