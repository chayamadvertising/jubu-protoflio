'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PORTFOLIO_CONFIG } from '@/config/portfolio.config';
import { handleCvDownload } from '@/utils/downloadCv';
import {
  Briefcase,
  GraduationCap,
  Award,
  CheckCircle2,
  Languages,
  Sparkles,
  Download,
  Calendar,
  MapPin,
  ArrowUpRight,
  ShieldCheck,
  Film
} from 'lucide-react';

const SKILLS_LIST = [
  'AI Commercial Video Production',
  'Director-Level Prompt Architecture',
  'Base-Image Character Consistency',
  'Meta Ads (Facebook & Instagram)',
  'Creative A/B & Hook Testing',
  'Claude-Powered Ad Scriptwriting',
  'Consumer Psychology & Audience Research',
  'Multilingual Voiceover Sync',
  'Python – Basic Web Development',
  'Conversion Landing Pages & Pitch Decks'
];

const LANGUAGES = [
  { name: 'Malayalam', tag: 'Native Proficiency • Commercial Scripts & Direction' },
  { name: 'English', tag: 'Professional Working Proficiency • B2B & Client Communication' },
];

const EXPERIENCE_BULLETS = [
  'Engineered 150+ commercial and cinematic AI ad films across diverse client industries using Google Veo and Higgsfield with precise camera kinematics and studio lighting.',
  'Pioneered a Base-Image Anchor & Multi-Shot Timeline workflow to keep client products, logos, and characters 100% consistent across multi-angle video cuts.',
  'Planned, launched, and optimized Meta Ads (Facebook & Instagram) campaigns, pairing high-retention video creatives with audience segmentation to drive leads and conversions.',
  'Authored hook-driven commercial scripts and creative briefs using Claude, Gemini, and ChatGPT — featuring natural Malayalam & multilingual dialogues and audio-synced VO.',
  'Built conversion-focused campaign websites and automated client pitch decks (Python – Basic Web Dev, Lovable, Bolt.new, Canva) to support marketing funnels.'
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative w-full bg-[#070709] py-20 sm:py-28 select-none overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: EXPERIENCE & EXECUTIVE DOSSIER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-14"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-crimson" />
              <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-crimson uppercase">
                EXPERIENCE &amp; VERIFIED DOSSIER //
              </span>
              <div className="h-px flex-1 max-w-[120px] bg-white/10" />
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
              Agency Background, Education &amp; Credentials
            </h2>
          </div>

          {/* Download Full CV Button */}
          <button
            onClick={handleCvDownload}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-crimson border border-white/15 hover:border-crimson text-white text-xs font-semibold tracking-wider uppercase transition-all duration-200 self-start sm:self-auto group shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-crimson group-hover:text-white transition-colors" />
            <span>Download Agency CV</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* 2-Column Grid: Left Executive Profile & Skills | Right ATS-Friendly Experience & Education */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column (Col 5): Seated Executive Portrait + Sociology Foundation + Languages + Core Skills */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Seated Executive Photo */}
            <div className="relative w-full h-[380px] sm:h-[440px] rounded-3xl overflow-hidden bg-[#111115] border border-white/10 shadow-lg group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent z-10" />
              <Image
                src={PORTFOLIO_CONFIG.photos.workflow}
                alt="Muhammed Jubair T - Agency Dossier"
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

            {/* Distinct About Me / Sociological Foundation Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#111115] border border-white/10 space-y-3">
              <span className="text-[10px] font-mono tracking-widest uppercase text-crimson font-bold block">
                SOCIOLOGICAL FOUNDATION &amp; AD PSYCHOLOGY //
              </span>
              <p className="text-xs sm:text-sm text-metallic-light leading-relaxed">
                My academic training in Sociology (MA &amp; BA) provides a unique competitive edge in commercial advertising: understanding community dynamics, consumer pain points, and cultural storytelling nuances that make regional Malayalam and multilingual campaigns resonate deeply and drive measurable brand action.
              </p>
            </div>

            {/* Languages (Clean text labels, progress bars removed) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#111115] border border-white/10 space-y-3.5">
              <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                <Languages className="w-4 h-4 text-crimson" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Language Proficiencies
                </span>
              </div>

              <div className="space-y-3">
                {LANGUAGES.map((lang, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">{lang.name}</span>
                      <span className="text-[10px] font-mono text-crimson font-bold uppercase">
                        Verified
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-metallic">
                      {lang.tag}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Skills Badges */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#111115] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                <Sparkles className="w-4 h-4 text-crimson" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Verified Skill Arsenal
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

          {/* Right Column (Col 7): Professional Experience, Education & Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            {/* 1. PRIMARY ROLE: AI Commercial Video Producer & Performance Creative Strategist */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#111115] border border-white/10 hover:border-crimson/50 transition-all duration-300 space-y-6 shadow-xl card-elevation-hover">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-crimson shrink-0" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-crimson font-bold">
                      Current Agency Practice
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-lg sm:text-xl md:text-2xl text-white">
                    AI Commercial Video Producer &amp; Performance Creative Strategist
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-metallic font-mono pt-1">
                    <span className="text-white font-medium">Independent / Remote Production</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-crimson font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      2025 – Present
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      Kerala, India / GCC Markets
                    </span>
                  </div>
                </div>

                <span className="hidden sm:inline-flex text-[10px] font-mono px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold shrink-0">
                  Active
                </span>
              </div>

              {/* 5 Sharp Agency Bullets Matching CV */}
              <div className="space-y-3.5">
                <span className="text-[10px] font-mono tracking-widest uppercase text-crimson font-bold block">
                  KEY PRODUCTION DELIVERABLES //
                </span>
                <ul className="space-y-3">
                  {EXPERIENCE_BULLETS.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-metallic-light leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-crimson shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 2. EDUCATION & ACADEMIC CREDENTIALS */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#111115] border border-white/10 space-y-6">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                <GraduationCap className="w-5 h-5 text-crimson" />
                <h3 className="font-display font-bold text-lg text-white">
                  Formal Higher Education
                </h3>
              </div>

              <div className="space-y-5">
                {/* Degree 1: MA Sociology (2024 – 2026, without (Expected)) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-display font-bold text-base text-white">
                      Master of Arts (MA) in Sociology
                    </h4>
                    <span className="text-xs font-mono font-bold text-crimson">
                      2024 – 2026
                    </span>
                  </div>
                  <p className="text-xs text-metallic">
                    Indira Gandhi National Open University (IGNOU)
                  </p>
                  <p className="text-[11px] text-metallic/80 leading-relaxed pt-1">
                    Specialized study in consumer sociology, media influence, cultural communication, and collective social behavior — directly applied to target audience segmentation and commercial advertising psychology.
                  </p>
                </div>

                {/* Degree 2: BA Sociology (2020 – 2023) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-display font-bold text-base text-white">
                      Bachelor of Arts (BA) in Sociology
                    </h4>
                    <span className="text-xs font-mono font-bold text-crimson">
                      2020 – 2023
                    </span>
                  </div>
                  <p className="text-xs text-metallic">
                    University of Calicut, Kerala
                  </p>
                  <p className="text-[11px] text-metallic/80 leading-relaxed pt-1">
                    Groundwork in sociological research methodologies, demographic analysis, and mass communication dynamics.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. PROFESSIONAL CERTIFICATIONS */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#111115] border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                <Award className="w-5 h-5 text-crimson" />
                <h3 className="font-display font-bold text-lg text-white">
                  Technical Certifications
                </h3>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="font-display font-bold text-base text-white">
                    Python Programming &amp; Website Creation
                  </h4>
                  <span className="text-xs font-mono font-bold text-crimson">
                    Certified 2025
                  </span>
                </div>
                <p className="text-xs text-metallic">
                  Entri App (Professional Technology Training)
                </p>
                <p className="text-[11px] text-metallic/80 leading-relaxed pt-1">
                  Comprehensive training in Python programming logic, web application architecture, automated workflows, and front-end integration to power marketing funnels.
                </p>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
