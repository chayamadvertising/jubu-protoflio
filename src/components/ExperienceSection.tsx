'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PORTFOLIO_CONFIG } from '@/config/portfolio.config';
import {
  Briefcase,
  GraduationCap,
  Award,
  CheckCircle2,
  Languages,
  Sparkles,
  Layers,
  FileCheck2
} from 'lucide-react';

const SKILLS_LIST = [
  'AI Commercial Video Production',
  'Director-Level Prompt Engineering',
  'Meta Ads (Facebook & Instagram)',
  'Social Media Marketing (SMM)',
  'Ad Scriptwriting & Storyboarding',
  'Brand & Character Consistency',
  'AI Landing Pages & Pitch Decks'
];

const LANGUAGES = [
  { name: 'Malayalam', level: '100%', tag: 'Native / Commercial Scripts' },
  { name: 'English', level: '90%', tag: 'Professional & Business' },
  { name: 'Multilingual AI VO', level: '100%', tag: 'Voiceover Sync & Clones' }
];

const EXPERIENCE_BULLETS = [
  'Engineered 150+ commercial and cinematic AI videos across diverse industries using Google Veo and Higgsfield with precise camera kinematics and lighting.',
  'Pioneered a Base-Image Anchor & Multi-Shot Timeline workflow to keep client products, logos, and characters 100% consistent across multi-angle shots.',
  'Planned, launched, and optimized Meta Ads (Facebook & Instagram) campaigns, pairing high-retention AI video creatives with targeted audience segmentation to drive leads and conversions.',
  'Authored hook-driven commercial scripts featuring natural Malayalam and multilingual dialogues, voiceovers, and synchronized BGM/SFX.',
  'Built conversion-focused landing pages (Bolt.new, Lovable, Google Antigravity) and automated client pitch decks (Canva, Google Slides) to support marketing funnels.'
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative w-full bg-[#08080A] py-20 sm:py-28 select-none overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: EXPERIENCE & EDUCATION */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-14"
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-crimson" />
            <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-crimson uppercase">
              EXPERIENCE &amp; VERIFIED DOSSIER //
            </span>
            <div className="h-px flex-1 max-w-[120px] bg-white/10" />
          </div>


        </motion.div>

        {/* 2-Column Grid: Left Executive Profile & Skills | Right ATS-Friendly Experience & Education */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column (Col 5): Seated Executive Portrait + About Me + Languages + Core Skills */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Seated Executive Photo */}
            <div className="relative w-full h-[380px] sm:h-[440px] rounded-3xl overflow-hidden bg-[#111115] border border-white/10 shadow-lg group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-transparent to-transparent z-10" />
              <Image
                src={PORTFOLIO_CONFIG.photos.workflow}
                alt="Muhammed Jubair T - Workflow"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top filter contrast-[1.02] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 z-20">
                <span className="text-[10px] font-mono tracking-wider px-3 py-1 rounded-full bg-black/80 border border-crimson/40 text-crimson uppercase font-bold backdrop-blur-md">
                  Executive Dossier
                </span>
              </div>
            </div>

            {/* About Me Card (From Verified CV) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#111115] border border-white/10 space-y-3">
              <span className="text-[10px] font-mono tracking-widest uppercase text-crimson font-bold block">
                ABOUT ME //
              </span>
              <p className="text-xs sm:text-sm text-metallic-light leading-relaxed">
                Results-driven AI Video Producer and Digital Marketer with a proven track record of creating 150+ high-converting, multilingual commercial videos. Expert in director-level AI video workflows (Google Veo, Higgsfield) and targeted Meta Ads campaigns that turn engaging visuals into measurable business growth.
              </p>
            </div>

            {/* Languages (From Verified CV) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#111115] border border-white/10 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                <Languages className="w-4 h-4 text-crimson" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Language Proficiencies
                </span>
              </div>

              <div className="space-y-3">
                {LANGUAGES.map((lang, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">{lang.name}</span>
                      <span className="font-mono text-crimson font-bold">{lang.level}</span>
                    </div>
                    <div className="h-1.5 w-full bg-black/60 rounded-full overflow-hidden border border-white/5">
                      <div
                        className="h-full bg-gradient-to-r from-crimson-dark to-crimson rounded-full"
                        style={{ width: lang.level }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-metallic/70">{lang.tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Skills Badges */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#111115] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                <Sparkles className="w-4 h-4 text-crimson" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Core Skills
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {SKILLS_LIST.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono px-3 py-1.5 rounded-lg bg-black/60 text-metallic-light border border-white/10 hover:border-crimson/40 hover:text-white transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </motion.div>

          {/* Right Column (Col 7): Verified Experience Bullets + Education & Certifications */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Experience Block (All 5 Bullets from CV) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="p-6 sm:p-7 rounded-2xl bg-[#111115] border border-white/10 hover:border-crimson/40 transition-colors space-y-5 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-crimson/15 border border-crimson/30 flex items-center justify-center text-crimson shrink-0">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-white">
                      AI Video Producer &amp; Digital Marketing Strategist
                    </h3>
                    <span className="text-xs text-metallic font-mono block mt-0.5">
                      Independent / Remote
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-crimson/15 text-crimson border border-crimson/30 shrink-0 self-start sm:self-auto">
                  2025 – Present
                </span>
              </div>

              {/* Verified 5 Bullets from the user's uploaded CV */}
              <ul className="space-y-3.5 pt-3 border-t border-white/5">
                {EXPERIENCE_BULLETS.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-metallic-light leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-crimson shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Education & Certifications Block */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="p-6 sm:p-7 rounded-2xl bg-[#111115] border border-white/10 hover:border-crimson/40 transition-colors space-y-5 shadow-sm"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-white/5">
                <div className="w-12 h-12 rounded-xl bg-crimson/15 border border-crimson/30 flex items-center justify-center text-crimson shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-white">
                    Education &amp; Professional Certifications
                  </h3>
                  <span className="text-xs text-metallic font-mono">
                    Verified Academic &amp; Technical Credentials
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {/* 1. MA Sociology */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col sm:flex-row sm:items-start justify-between gap-2 text-xs sm:text-sm">
                  <div>
                    <div className="font-semibold text-white">
                      Master of Arts (MA) in Sociology
                    </div>
                    <div className="text-metallic text-xs mt-0.5">
                      IGNOU (Indira Gandhi National Open University)
                    </div>
                  </div>
                  <span className="text-xs font-mono text-crimson shrink-0 self-start sm:self-auto font-medium">
                    2024 – 2026 (Expected)
                  </span>
                </div>

                {/* 2. Python Certification */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col sm:flex-row sm:items-start justify-between gap-2 text-xs sm:text-sm">
                  <div>
                    <div className="font-semibold text-white flex items-center gap-2">
                      <span>Python Programming &amp; Website Creation</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        Certified
                      </span>
                    </div>
                    <div className="text-metallic text-xs mt-0.5">
                      Entri App — Professional Certification
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 shrink-0 self-start sm:self-auto font-medium">
                    2025
                  </span>
                </div>

                {/* 3. BA Sociology */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col sm:flex-row sm:items-start justify-between gap-2 text-xs sm:text-sm">
                  <div>
                    <div className="font-semibold text-white">
                      Bachelor of Arts (BA) in Sociology
                    </div>
                    <div className="text-metallic text-xs mt-0.5">
                      University of Calicut
                    </div>
                  </div>
                  <span className="text-xs font-mono text-metallic shrink-0 self-start sm:self-auto font-medium">
                    2020 – 2023
                  </span>
                </div>
              </div>



            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
