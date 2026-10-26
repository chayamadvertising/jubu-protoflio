'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PORTFOLIO_CONFIG } from '@/config/portfolio.config';
import { ArrowUpRight, MessageSquare, CheckCircle2, Video, Globe, TrendingUp } from 'lucide-react';

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  // Parallax Scroll: Portrait glides upward over the name text as user scrolls down
  const { scrollY } = useScroll();
  const portraitY = useTransform(scrollY, [0, 450], [0, -90]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] w-full bg-[#08080A] pt-28 pb-16 flex flex-col justify-between items-center select-none overflow-hidden"
    >
      {/* Background Subtle Gradient & Grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid-subtle opacity-20" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-crimson/10 rounded-full blur-[60px] opacity-40" />

      {/* ================================================================
          1. TOP LAYER: SINGLE-LINE NAME & ROLE CLEARLY ABOVE HEAD (Z-Index 10)
          ================================================================ */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center space-y-3 mb-6 sm:mb-8">
        
        {/* Full Name on ONE SINGLE LINE with Staggered Cinematic Keyframe Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center"
        >
          <h1
            className="font-display font-extrabold uppercase tracking-normal leading-none drop-shadow-[0_0_35px_rgba(220,38,38,0.35)] flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-3"
            style={{
              fontSize: 'clamp(1.2rem, 5.2vw, 4.5rem)',
            }}
          >
            <span className="text-crimson">MUHAMMED</span>{" "}
            <span className="text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]">JUBAIR</span>{" "}
            <span className="text-crimson">T</span>
          </h1>
        </motion.div>

        {/* Crisp Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-sm md:text-base font-medium text-white tracking-wide max-w-3xl mx-auto"
        >
          AI Video Producer <span className="text-crimson mx-1.5">•</span> Digital Marketing &amp; Meta Ads Specialist <span className="text-crimson mx-1.5">•</span> Prompt Engineer
        </motion.p>
      </div>

      {/* ================================================================
          2. MAIN CONTENT: LEFT HIGHLIGHTS | CENTER PORTRAIT | RIGHT ACTIONS
          ================================================================ */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-end">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end relative min-h-[500px] sm:min-h-[560px] md:min-h-[600px]">
          
          {/* LEFT STAT PILLS (Col 3) - Trigger once on scroll down */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-3 pb-8 sm:pb-12 space-y-3 order-2 lg:order-1"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase text-crimson font-bold block mb-2">
              KEY HIGHLIGHTS //
            </span>

            {[
              { text: '150+ AI Videos Produced', icon: <Video className="w-4 h-4 text-crimson" /> },
              { text: 'Multilingual Ad Production', icon: <Globe className="w-4 h-4 text-crimson" /> },
              { text: 'Meta Ads & Lead Generation', icon: <TrendingUp className="w-4 h-4 text-crimson" /> },
            ].map((pill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#111115]/90 border border-white/10 hover:border-crimson/40 transition-colors shadow-sm"
              >
                <div className="w-8 h-8 rounded-xl bg-crimson/15 border border-crimson/25 flex items-center justify-center shrink-0">
                  {pill.icon}
                </div>
                <span className="text-xs font-semibold text-white tracking-tight">
                  {pill.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CENTER PORTRAIT WITH SCROLL PARALLAX (Col 6, Z-Index 20) */}
          <motion.div
            style={{ y: portraitY }}
            className="lg:col-span-6 relative flex justify-center items-end h-[460px] sm:h-[520px] md:h-[580px] order-1 lg:order-2 pointer-events-none"
          >
            {/* Ambient Back Glow - Slow Motion Breathing Keyframe */}
            <motion.div
              
              className="absolute bottom-8 w-3/4 h-3/5 bg-crimson/20 rounded-full blur-3xl pointer-events-none"
            />

            <div className="relative w-full max-w-[380px] sm:max-w-[430px] md:max-w-[470px] h-full flex items-end justify-center">
              <Image
                src={PORTFOLIO_CONFIG.photos.hero}
                alt="Muhammed Jubair T - AI Video Producer & Meta Ads Specialist"
                fill
                priority
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 470px"
                className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] filter contrast-[1.02]"
              />
              {/* Waist gradient fade to blend into background */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#08080A] via-[#08080A]/85 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* RIGHT ACTION BLOCK (Col 3) - Trigger once on scroll down */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-3 pb-8 sm:pb-12 space-y-3.5 order-3 lg:order-3"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase text-crimson font-bold block mb-2">
              CONNECT &amp; HIRE //
            </span>

            {/* Primary Action: WhatsApp */}
            <a
              href={PORTFOLIO_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-crimson hover:bg-crimson-bright text-white text-xs sm:text-sm font-bold tracking-wider uppercase shadow-crimson-subtle transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Quick Status */}
            <div className="pt-3 flex items-center justify-between text-[11px] text-metallic px-1 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Available for Projects
              </span>
              <span>{PORTFOLIO_CONFIG.location}</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
