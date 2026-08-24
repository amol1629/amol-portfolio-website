import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Dancing_Script } from "next/font/google";
import { defaultMetadata, siteConfig } from "@/config";
import { HeaderVariant5, Footer, ScrollProgress, BackToTop } from "@/components/layout";
import { ClientOnlyEffects } from "@/components/ClientOnlyEffects";
import { BackgroundImage } from "@/components/BackgroundImage";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-signature",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable}`}
      suppressHydrationWarning
    >
            <body className="min-h-dvh flex flex-col antialiased">
        <BackgroundImage />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Providers>
          <ClientOnlyEffects />
          <ScrollProgress />
          <HeaderVariant5 />
          <main id="main-content" className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
