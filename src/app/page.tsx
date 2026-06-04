import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { WhyMath } from '@/components/sections/WhyMath';
import { RealLife } from '@/components/sections/RealLife';
import { StickyCardScroll } from '@/components/sections/StickyCardScroll';
import { Portraits } from '@/components/sections/Portraits';
import { Opportunities } from '@/components/sections/Opportunities';
import { Agenda } from '@/components/sections/Agenda';
import { Mission } from '@/components/sections/Mission';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Premium Sticky Navigation */}
      <Header />

      {/* Main Single Page Sections */}
      <main className="flex-1">
        {/* 1. Hero Section: Mesh backdrop and floating math visualizer */}
        <Hero />

        {/* 2. Why Math Section: 6 interactive key application domain cards */}
        <WhyMath />

        {/* 3. Real Life Section: Counting animated statistics on Ivorian impact */}
        <RealLife />

        {/* 4. Pinned Learning Timeline: Sticky card scroll pathways */}
        <StickyCardScroll />

        {/* 5. Portraits Showcase: Inspiring models from research, energy, finance and health */}
        <Portraits />

        {/* 6. Opportunities Guide: Careers, pathways, and national exams mapping */}
        <Opportunities />

        {/* 7. Upcoming Calendar: 2025 competitive exams, masterclasses and salons */}
        <Agenda />

        {/* 8. Mission Statement: Dark high-contrast pre-footer panel */}
        <Mission />
      </main>

      {/* Detailed Corporate Footer */}
      <Footer />
    </div>
  );
}
