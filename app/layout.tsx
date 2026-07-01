import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";
import { WebVitals } from "./_components/web-vitals";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dancingScript = localFont({
  src: "./fonts/DancingScript-VariableFont_wght.ttf",
  variable: "--font-dancing-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "My Supa Store",
    template: "%s | My Supa Store",
  },
  description: "Une boutique e-commerce Next.js",
  keywords: ["e-commerce", "boutique", "produits"],
  robots: { index: true, follow: true },
  openGraph: {
    siteName: "My Supa Store",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-zinc-50 dark:bg-zinc-900">
        <WebVitals />
        <Navbar />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
