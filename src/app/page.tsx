'use client';

import React from 'react';
import SmoothScroll from '@/components/SmoothScroll';
import AntigravityCanvas from '@/components/AntigravityCanvas';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ToolkitSection from '@/components/ToolkitSection';
import FeaturedWorkSection from '@/components/FeaturedWorkSection';
import SocialPlatformsSection from '@/components/SocialPlatformsSection';
import ExperienceSection from '@/components/ExperienceSection';
import FooterSection from '@/components/FooterSection';

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#08080A] text-white selection:bg-crimson selection:text-white font-sans antialiased overflow-x-hidden">
        {/* Antigravity Floating Particle Background Layer */}
        <AntigravityCanvas />

        {/* 1. STICKY NAVBAR */}
        <Navbar />

        {/* 2. HERO SECTION (SINGLE-LINE NAME ABOVE HEAD + SCROLL PARALLAX) */}
        <HeroSection />

        {/* 3. CORE SERVICES & WORKFLOW (WHAT I DO) */}
        <ServicesSection />

        {/* 4. CLICKABLE AI & MARKETING TOOL CONTAINERS (TOOLS & WORKFLOW) */}
        <ToolkitSection />

        {/* 5. FEATURED WORK (INSTAGRAM REELS, YOUTUBE SHORTS & COMMERCIAL DESIGNS) */}
        <FeaturedWorkSection />

        {/* 6. MY PLATFORMS // LINKEDIN, INSTAGRAM, YOUTUBE, WHATSAPP */}
        <SocialPlatformsSection />

        {/* 7. EXPERIENCE, EDUCATION & ATS DOSSIER */}
        <ExperienceSection />

        {/* 8. BOTTOM CRIMSON RED CONTACT FOOTER BAR */}
        <FooterSection />
      </div>
    </SmoothScroll>
  );
}
