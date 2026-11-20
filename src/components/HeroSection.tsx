'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PORTFOLIO_CONFIG } from '@/config/portfolio.config';
import { handleCvDownload } from '@/utils/downloadCv';
import {
  ArrowUpRight,
  MessageSquare,
  Video,
  Globe,
  TrendingUp,
  Sparkles,
  Download,
  BarChart3,
  Film
} from 'lucide-react';

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  // Parallax Scroll: Portrait glides upward over the name text as user scrolls down
  const { scrollY } = useScroll();
  const portraitY = useTransform(scrollY, [0, 450], [0, -75]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[94vh] w-full bg-[#070709] pt-28 sm:pt-32 pb-16 flex flex-col justify-between items-center select-none overflow-hidden"
    >
      {/* Background Subtle Gradient & Grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid-subtle opacity-20" />
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-crimson/10 rounded-full blur-[70px] opacity-45" />

      {/* ================================================================
          1. TOP LAYER: SINGLE-LINE NAME & AGENCY TITLE CLEARLY ABOVE HEAD
          ================================================================ */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center space-y-3 mb-6 sm:mb-8">
        
        {/* Full Name on ONE SINGLE LINE with GPU-composited Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center"
        >
          <h1
            className="font-display font-extrabold uppercase tracking-normal leading-none drop-shadow-[0_0_35px_rgba(225,29,72,0.35)] flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-3"
            style={{
              fontSize: 'clamp(1.4rem, 5.2vw, 4.5rem)',
            }}
          >
            <span className="text-crimson">MUHAMMED</span>{" "}
            <span className="text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]">JUBAIR</span>{" "}
            <span className="text-crimson">T</span>
          </h1>
        </motion.div>

        {/* Agency Executive Title */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-sm md:text-base font-semibold text-white tracking-wide max-w-3xl mx-auto uppercase font-mono"
        >
          AI Commercial Video Producer <span className="text-crimson mx-2">|</span> Performance Creative &amp; Meta Ads Strategist
        </motion.p>

        {/* Positioning Tagline (Aligned 100% with Advertising Agency CV) */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-sm text-metallic max-w-3xl mx-auto leading-relaxed pt-1"
        >
          Producing <span className="text-white font-semibold">150+ high-retention commercial and cinematic AI ad films</span>, combining director-level generative video workflows, Claude-assisted ad copy and campaign strategy, and Meta Ads creative testing — backed by a Sociology (MA/BA) foundation in consumer psychology and culturally resonant Malayalam &amp; multilingual storytelling.
        </motion.p>
      </div>

      {/* ================================================================
          2. MAIN CONTENT: LEFT HIGHLIGHTS | CENTER PORTRAIT | RIGHT ACTIONS
          ================================================================ */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-end">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end relative min-h-[500px] sm:min-h-[560px] md:min-h-[600px]">
          
          {/* LEFT HIGHLIGHT PILLS (Col 3) - Studio Styled */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 pb-6 sm:pb-10 space-y-3 order-2 lg:order-1"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase text-crimson font-bold block mb-2">
              AGENCY PILLARS //
            </span>

            {[
              { text: '150+ Commercial AI Ad Films', icon: <Film className="w-4 h-4 text-crimson" /> },
              { text: 'Meta Ads & Creative A/B Testing', icon: <TrendingUp className="w-4 h-4 text-crimson" /> },
              { text: 'Claude-Powered Copy & Strategy', icon: <Sparkles className="w-4 h-4 text-crimson" /> },
              { text: 'Multilingual Ad Production', icon: <Globe className="w-4 h-4 text-crimson" /> },
            ].map((pill, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 rounded-2xl bg-[#111115]/90 border border-white/10 hover:border-crimson/50 transition-all duration-300 shadow-sm studio-sheen-container group"
              >
                <div className="w-8 h-8 rounded-xl bg-crimson/15 border border-crimson/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  {pill.icon}
                </div>
                <span className="text-xs font-semibold text-white tracking-tight">
                  {pill.text}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CENTER PORTRAIT WITH RED RIM-LIT STUDIO GLOW & SCROLL PARALLAX (Col 6) */}
          <motion.div
            style={{ y: portraitY }}
            className="lg:col-span-6 relative flex justify-center items-end h-[460px] sm:h-[520px] md:h-[590px] order-1 lg:order-2 pointer-events-none"
          >
            {/* Subtle Breathing Radial Glow Behind Hero Portrait */}
            <div
              className="absolute bottom-10 w-3/4 h-3/5 bg-crimson/25 rounded-full blur-[80px] pointer-events-none portrait-glow-pulse"
            />

            <div className="relative w-full max-w-[380px] sm:max-w-[430px] md:max-w-[480px] h-full flex items-end justify-center">
              <Image
                src={PORTFOLIO_CONFIG.photos.hero}
                alt="Muhammed Jubair T - AI Commercial Video Producer & Performance Creative Strategist"
                fill
                priority
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 480px"
                className="object-contain object-bottom drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)] filter contrast-[1.02]"
              />
              {/* Waist gradient fade seamlessly blending into dark obsidian canvas */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#070709] via-[#070709]/85 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* RIGHT ACTION BLOCK: PRIMARY AGENCY CTAs (Col 3) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 pb-6 sm:pb-10 space-y-2.5 order-3 lg:order-3"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase text-crimson font-bold block mb-2">
              DISCOVER &amp; ENGAGE //
            </span>

            {/* CTA 1: View Commercial Work */}
            <a
              href="#work"
              className="w-full inline-flex items-center justify-between px-5 py-3 rounded-full bg-[#16161C] border border-white/15 hover:border-crimson text-white text-xs font-semibold tracking-wider uppercase transition-all duration-200 hover:scale-[1.01] group"
            >
              <div className="flex items-center gap-2">
                <Film className="w-3.5 h-3.5 text-crimson" />
                <span>Commercial Work</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-metallic group-hover:text-crimson group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* CTA 2: Meta Ads Results */}
            <a
              href="#meta-ads"
              className="w-full inline-flex items-center justify-between px-5 py-3 rounded-full bg-[#16161C] border border-white/15 hover:border-crimson text-white text-xs font-semibold tracking-wider uppercase transition-all duration-200 hover:scale-[1.01] group"
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="w-3.5 h-3.5 text-crimson" />
                <span>Meta Ads Results</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-metallic group-hover:text-crimson group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* CTA 3: Download Agency CV */}
            <button
              onClick={handleCvDownload}
              className="w-full inline-flex items-center justify-between px-5 py-3 rounded-full bg-[#16161C] border border-white/15 hover:border-crimson text-white text-xs font-semibold tracking-wider uppercase transition-all duration-200 hover:scale-[1.01] group"
            >
              <div className="flex items-center gap-2">
                <Download className="w-3.5 h-3.5 text-crimson" />
                <span>Download CV (PDF)</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-metallic group-hover:text-crimson group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* CTA 4: Chat on WhatsApp (Vibrant Crimson Red) */}
            <a
              href={PORTFOLIO_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-crimson hover:bg-crimson-bright text-white text-xs sm:text-sm font-bold tracking-wider uppercase shadow-crimson-subtle transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group mt-1"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Quick Status */}
            <div className="pt-2 flex items-center justify-between text-[11px] text-metallic px-1 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Available for Agency Projects
              </span>
              <span>{PORTFOLIO_CONFIG.location}</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
