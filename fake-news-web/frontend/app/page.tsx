'use client';

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DetectorSection from "@/components/DetectorSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <DetectorSection />
      <Footer />
    </main>
  );
}
