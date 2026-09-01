import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import CursorSpotlight from "@/components/CursorSpotlight";
import ScrollProgress from "@/components/ScrollProgress";

const title = "TruthLens — AI News Credibility Analyzer";
const description =
  "DistilBERT-based transformer model for detecting misinformation. Paste any article for instant credibility analysis.";

export const metadata: Metadata = {
  title,
  description,
  // Next infers this from Vercel's VERCEL_URL env var in production, and
  // falls back to localhost in dev — no need to hardcode a domain here.
  // Override with NEXT_PUBLIC_SITE_URL if you deploy somewhere other than
  // Vercel's default preview/production URL.
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  openGraph: {
    title,
    description,
    siteName: "TruthLens",
    type: "website",
    // og:image comes from app/opengraph-image.tsx — no manual `images` entry needed.
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    // twitter:image falls back to the Open Graph image automatically.
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ThemeProvider>
          {/* Warm amber radial gradient that follows the mouse */}
          <CursorSpotlight />

          {/* Spring-damped scroll progress bar at the top of the viewport */}
          <ScrollProgress />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}