import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import FloatingContact from "@/components/layout/FloatingContact";

export const metadata: Metadata = {
  title: "Cadde Optik",
  description: "Cadde Optik. Dünyaca ünlü güneş gözlükleri, numaralı gözlükler ve lens çeşitleri en uygun fiyatlarla.",
  keywords: "cadde optik, gözlükçü, güneş gözlükleri, lens, numaralı gözlük",
  openGraph: {
    title: "Cadde Optik",
    description: "Cadde Optik. Dünyaca ünlü güneş gözlükleri, numaralı gözlükler ve lens çeşitleri en uygun fiyatlarla.",
    url: 'https://caddeoptik.com',
    siteName: 'Cadde Optik',
    locale: 'tr_TR',
    type: 'website',
  },
  verification: {
    google: "EXEETrn92EH6SQLYBxCh8MnhU8fZcXYNJ-AW6-puen0",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://caddeoptik.com",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground antialiased selection:bg-black selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}

