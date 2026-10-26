'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PORTFOLIO_CONFIG } from '@/config/portfolio.config';
import { Film, TrendingUp, FileText, Layout } from 'lucide-react';

const SERVICES_DATA = [
  {
    num: '01',
    title: 'AI Video Production',
    desc: 'Commercial ads and reels built with Google Veo and Higgsfield.',
    icon: <Film className="w-5 h-5 text-crimson" />,
  },
  {
    num: '02',
    title: 'Meta Ads & Digital Marketing',
    desc: 'Facebook & Instagram ad setup, audience targeting, and lead generation.',
    icon: <TrendingUp className="w-5 h-5 text-crimson" />,
  },
  {
    num: '03',
    title: 'Scriptwriting & Prompt Engineering',
    desc: 'Natural Malayalam & multilingual ad scripts with strict character/product consistency.',
    icon: <FileText className="w-5 h-5 text-crimson" />,
  },
  {
    num: '04',
    title: 'AI Websites & Landing Pages',
    desc: 'Interactive landing pages built with Bolt.new, Lovable, and Google Antigravity, plus executive pitch decks.',
    icon: <Layout className="w-5 h-5 text-crimson" />,
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative w-full bg-[#0B0B0E] py-20 sm:py-28 border-t border-b border-white/5 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: WHAT I DO - Trigger once on scroll down */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-12 sm:mb-16"
        >
          <div className="h-px w-10 bg-crimson" />
          <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-crimson uppercase">
            WHAT I DO
          </span>
          <div className="h-px flex-1 max-w-[120px] bg-white/10" />
        </motion.div>

        {/* 2-Column Clean Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT SIDE: Portrait + 2-Sentence About Summary - Trigger once on scroll down */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="relative w-full h-[380px] sm:h-[440px] rounded-3xl overflow-hidden bg-[#111115] border border-white/10 group shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0E] via-transparent to-transparent z-10" />
              <Image
                src={PORTFOLIO_CONFIG.photos.services}
                alt="Muhammed Jubair T - Services"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105 filter contrast-[1.02]"
              />
            </div>

            {/* 2-Sentence Clear About Summary */}
            <p className="text-sm sm:text-base text-metallic-light leading-relaxed font-sans">
              I create high-converting AI commercial videos and run targeted Meta Ads campaigns for brands. With 150+ multilingual video projects completed, I handle everything from scriptwriting and AI video generation to social media ad execution.
            </p>
          </motion.div>

          {/* RIGHT SIDE: 4 Clean Service Cards (Trigger once on scroll down) */}
          <div className="lg:col-span-7 space-y-4">
            {SERVICES_DATA.map((service, idx) => (
              <motion.div
                key={service.num}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="p-5 sm:p-6 rounded-2xl bg-[#111115] border border-white/10 hover:border-crimson/50 hover:shadow-[0_8px_30px_rgba(220,38,38,0.12)] transition-all duration-300 group hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-crimson/15 border border-crimson/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="font-mono text-xs font-bold text-crimson">
                        {service.num}
                      </span>
                      <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-crimson transition-colors">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-metallic leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
