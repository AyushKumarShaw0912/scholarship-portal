import type { Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { defaultSEO } from "@/config/seo";
import { ANIMATION } from "@/constants/animation";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { getSiteSettings } from "@/lib/cms";
import "./globals.css";
import { Navbar } from "@/layout/navbar";
import { Footer } from "@/layout";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = defaultSEO;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)", color: "#1e3a5f" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await getSiteSettings();

  return (
    <html
      lang="en"
      data-motion={ANIMATION.ENABLED ? "on" : "off"}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen font-sans text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar site={site} navigation={site.navigation} />

            <main className="flex-1">{children}</main>

            <Footer site={site} navigation={site.navigation} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
