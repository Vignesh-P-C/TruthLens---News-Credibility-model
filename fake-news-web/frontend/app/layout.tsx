'use client';

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>TruthLens — AI News Credibility Detection</title>
        <meta name="description" content="AI-powered fake news detection using transformer-based NLP models. Paste any article and get instant credibility analysis." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="noise">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
