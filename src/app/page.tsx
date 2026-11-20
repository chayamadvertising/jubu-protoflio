'use client';

import React from 'react';
import SmoothScroll from '@/components/SmoothScroll';
import AntigravityCanvas from '@/components/AntigravityCanvas';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ToolkitSection from '@/components/ToolkitSection';
import FeaturedWorkSection from '@/components/FeaturedWorkSection';
import MetaAdsSection from '@/components/MetaAdsSection';
import SocialPlatformsSection from '@/components/SocialPlatformsSection';
import ExperienceSection from '@/components/ExperienceSection';
import FooterSection from '@/components/FooterSection';

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#070709] text-white selection:bg-crimson selection:text-white font-sans antialiased overflow-x-hidden">
        {/* Antigravity Floating Particle Background Layer */}
        <AntigravityCanvas />

        {/* 1. STICKY NAVBAR */}
        <Navbar />

        {/* 2. HERO SECTION (SINGLE-LINE NAME ABOVE HEAD + SCROLL PARALLAX) */}
        <HeroSection />

        {/* 3. CORE SERVICES & WORKFLOW (AGENCY PILLARS) */}
        <ServicesSection />

        {/* 4. PRODUCTION STACK (CLICKABLE TOOL WORKFLOWS) */}
        <ToolkitSection />

        {/* 5. FEATURED WORK (REELS, SHORTS, COMMERCIAL DESIGNS & WEB BUILDS) */}
        <FeaturedWorkSection />

        {/* 6. META ADS CAMPAIGN PERFORMANCE (VERIFIED EXCEL / CSV DATA) */}
        <MetaAdsSection />

        {/* 7. VERIFIED PLATFORMS // LINKEDIN, INSTAGRAM, YOUTUBE, WHATSAPP */}
        <SocialPlatformsSection />

        {/* 8. EXPERIENCE, EDUCATION & ATS DOSSIER */}
        <ExperienceSection />

        {/* 9. BOTTOM CRIMSON RED CONTACT FOOTER BAR */}
        <FooterSection />
      </div>
    </SmoothScroll>
  );
}
