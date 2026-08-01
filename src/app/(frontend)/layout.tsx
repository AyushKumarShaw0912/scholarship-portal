import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { getSiteSettings } from "@/lib/cms";
import { Footer } from "@/layout";
import { Navbar } from "@/layout/navbar";

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await getSiteSettings();

  return (
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
  );
}
