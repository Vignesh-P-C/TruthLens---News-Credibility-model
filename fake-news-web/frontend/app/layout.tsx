// BEFORE: ThemeProvider, dark default, noise::after overlay, gradient fonts
// AFTER:  No theme switching (single editorial light theme), clean body

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TruthLens — News Credibility Analysis",
  description:
    "BERT-based transformer model for detecting misinformation. Paste any article for instant credibility analysis.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // BEFORE: suppressHydrationWarning for dark/light theme switching
    // AFTER:  single light theme, no suppression needed
    <html lang="en">
      <head>
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      {/* BEFORE: className="noise" (grain overlay pseudo-element)
          AFTER:  clean body, no filter effects */}
      <body style={{ background: "#f5f4f0" }}>
        {children}
      </body>
    </html>
  );
}
