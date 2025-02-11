// @/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./provider";
import Header from "@/components/common/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChunkLink & LRU Cache System | DSA Implementation",
  description:
    "An interactive implementation of secure file chunking system and LRU cache with real-time visualization. Built with Next.js, TypeScript, and modern web technologies for educational purposes.",
  keywords: [
    "Data Structures",
    "Algorithms",
    "ChunkLink",
    "LRU Cache",
    "File System",
    "Next.js",
    "TypeScript",
    "Educational Tool",
  ],
  authors: [{ name: "Kenean Alemayhu" }],
  creator: "Kenean Alemayhu",
  publisher: "Kenean Alemayhu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "ChunkLink & LRU Cache System | DSA Implementation",
    description:
      "Interactive data structures implementation featuring secure file chunking and LRU cache with real-time visualization.",
    siteName: "ChunkLink & LRU Cache System",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChunkLink & LRU Cache System | DSA Implementation",
    description:
      "Interactive data structures implementation featuring secure file chunking and LRU cache with real-time visualization.",
    creator: "@yourtwitterhandle",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-background font-mono antialiased">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}