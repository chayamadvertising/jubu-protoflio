'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PORTFOLIO_CONFIG } from '@/config/portfolio.config';
import { Film, TrendingUp, Sparkles, Code2 } from 'lucide-react';

const SERVICES_DATA = [
  {
    num: '01',
    title: 'AI Commercial Video Production',
    desc: 'Commercial & cinematic AI ad films (Google Veo, Higgsfield) with Base-Image Anchor & Multi-Shot consistency.',
    icon: <Film className="w-5 h-5 text-crimson" />,
    badge: 'Core Production'
  },
  {
    num: '02',
    title: 'Meta Ads & Performance Creative',
    desc: 'Facebook & Instagram ad campaigns paired with scroll-stopping hooks and A/B creative testing.',
    icon: <TrendingUp className="w-5 h-5 text-crimson" />,
    badge: 'Paid Social'
  },
  {
    num: '03',
    title: 'Ad Copy & Multilingual Scripting',
    desc: 'Hook-driven Malayalam & multilingual ad scripts, voiceover sync, and BGM/SFX using Claude, Gemini, ChatGPT, and Suno AI.',
    icon: <Sparkles className="w-5 h-5 text-crimson" />,
    badge: 'Copy & AI Logic'
  },
  {
    num: '04',
    title: 'Web Development (Python & Django)',
    desc: 'Conversion-focused websites and campaign landing pages built with Python, Django, Lovable, and Bolt.new.',
    icon: <Code2 className="w-5 h-5 text-crimson" />,
    badge: 'Web & Funnels'
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative w-full bg-[#0B0B0F] py-20 sm:py-28 border-t border-b border-white/5 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-crimson" />
              <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-crimson uppercase">
                SERVICES // AGENCY CAPABILITIES
              </span>
              <div className="h-px flex-1 max-w-[120px] bg-white/10" />
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
              Commercial Video, Paid Social &amp; Web Execution
            </h2>
          </div>

          <span className="text-xs font-mono text-metallic self-start sm:self-auto">
            4 Agency Capabilities • Direct &amp; Scannable
          </span>
        </motion.div>

        {/* 2-Column Clean Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT SIDE: Portrait + Concise Agency Summary (No Bloat, No Theory) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-5"
          >
            <div className="relative w-full h-[360px] sm:h-[420px] rounded-3xl overflow-hidden bg-[#111115] border border-white/10 group shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-transparent to-transparent z-10" />
              <Image
                src={PORTFOLIO_CONFIG.photos.services}
                alt="Muhammed Jubair T - Agency Capabilities"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105 filter contrast-[1.02]"
              />
              <div className="absolute top-4 left-4 z-20">
                <span className="text-[10px] font-mono tracking-wider px-3 py-1 rounded-full bg-black/80 border border-crimson/40 text-crimson uppercase font-bold backdrop-blur-md">
                  Production Studio
                </span>
              </div>
            </div>

            {/* Direct 2-Line Summary */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#111115] border border-white/10 space-y-1.5">
              <span className="text-[10px] font-mono tracking-widest uppercase text-crimson font-bold block">
                PRODUCTION FOCUS //
              </span>
              <p className="text-xs sm:text-sm text-metallic-light leading-relaxed font-sans">
                Full-cycle ad campaign execution: from generative AI video direction and Claude-assisted multilingual scripting to Meta Ads creative A/B testing and high-speed web landing pages.
              </p>
            </div>
          </motion.div>

          {/* RIGHT SIDE: 4 Crisp 1-Line Service Cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-3.5"
          >
            {SERVICES_DATA.map((service) => (
              <div
                key={service.num}
                className="p-4 sm:p-5 rounded-2xl bg-[#111115] border border-white/10 hover:border-crimson/50 transition-all duration-300 group hover:-translate-y-1 studio-sheen-container card-elevation-hover"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-crimson/15 border border-crimson/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-crimson">
                          {service.num}
                        </span>
                        <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-crimson transition-colors">
                          {service.title}
                        </h3>
                      </div>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-metallic border border-white/10">
                        {service.badge}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-metallic leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
