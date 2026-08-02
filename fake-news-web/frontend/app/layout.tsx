import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import CursorSpotlight from "@/components/CursorSpotlight";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "TruthLens",
  description:
    "DistilBERT-based transformer model for detecting misinformation. Paste any article for instant credibility analysis.",
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