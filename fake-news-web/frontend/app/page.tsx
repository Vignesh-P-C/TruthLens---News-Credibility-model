// BEFORE: stacked full-screen sections, centered layout
// AFTER:  sidebar shell + offset content areas

'use client';

import Sidebar from "@/components/Sidebar";
import HeroSection from "@/components/HeroSection";
import DetectorSection from "@/components/DetectorSection";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      {/* BEFORE: Navbar (top, horizontal, glassmorphism)
          AFTER:  Sidebar (left, fixed, pure black 260px) */}
      <Sidebar />

      {/* Main content — offset by sidebar width */}
      <main className="main-content">
        <HeroSection />
        <DetectorSection />
        <AboutSection />
      </main>
    </div>
  );
}
