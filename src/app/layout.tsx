import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { defaultSEO } from "@/config/seo";
import { ANIMATION } from "@/constants/animation";
import { getSiteSettings } from "@/lib/cms";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();

  return {
    ...defaultSEO,
    ...(site.faviconUrl
      ? {
          icons: {
            icon: [{ url: site.faviconUrl }],
            shortcut: [site.faviconUrl],
            apple: [{ url: site.faviconUrl }],
          },
        }
      : {}),
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)", color: "#1e3a5f" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-motion={ANIMATION.ENABLED ? "on" : "off"}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
