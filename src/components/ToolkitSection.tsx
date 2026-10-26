'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  X,
  Sparkles,
  CheckCircle2,
  Sliders,
  TrendingUp,
  Activity
} from 'lucide-react';

interface ToolItem {
  id: string;
  name: string;
  role: string;
  category: string;
  badge?: string;
  imageSrc?: string;
  customIcon?: React.ReactNode;
  bullets: string[];
  floatClass: string;
}

// Production Tools with Official Brand Logos
const TOOLS_DATA: ToolItem[] = [
  {
    id: 'veo',
    name: 'Google Veo',
    role: 'Cinematic AI Video Production',
    category: 'Video & Visual AI',
    badge: 'Google DeepMind',
    floatClass: 'antigravity-float-1',
    customIcon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
        <rect x="2" y="4" width="14" height="16" rx="3" fill="#DC2626" fillOpacity="0.18" stroke="#DC2626" strokeWidth="1.8" />
        <polygon points="16,9 22,5 22,19 16,15" fill="#DC2626" />
        <circle cx="9" cy="12" r="3" stroke="#FFFFFF" strokeWidth="1.8" />
      </svg>
    ),
    bullets: [
      'Generates cinematic multi-angle commercial video shots with studio lighting.',
      'Controls camera pans, zooms, dolly movement, and depth-of-field kinematics.',
      'Delivers high-definition ad cuts with director-level prompt fidelity.'
    ]
  },
  {
    id: 'higgsfield',
    name: 'Higgsfield AI',
    role: 'Character & Motion Consistency',
    category: 'Video & Visual AI',
    badge: 'Character Control',
    imageSrc: '/logos/higgsfield.png',
    floatClass: 'antigravity-float-2',
    bullets: [
      'Maintains 100% character and product visual anchor across consecutive scenes.',
      'Generates natural human motion, expressions, and gestures for social reels.',
      'Pioneers Base-Image Anchoring for consistent commercial brand storytelling.'
    ]
  },
  {
    id: 'meta-ads',
    name: 'Meta Ads Manager',
    role: 'Facebook & Instagram Paid Ads',
    category: 'Paid Ads & Growth',
    badge: 'Meta Certified',
    imageSrc: '/logos/meta.png',
    floatClass: 'antigravity-float-slow',
    bullets: [
      'Architects lead-generation and conversion campaigns on Facebook & Instagram.',
      'Executes rigorous creative A/B testing on video hooks to drive down CPA.',
      'Targets high-intent custom audiences in Kerala, GCC, and global markets.'
    ]
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    role: 'Scripting & Prompt Engineering',
    category: 'Scripting & Audio AI',
    badge: 'LLM Multimodal',
    floatClass: 'antigravity-float-1',
    customIcon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
        <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" fill="url(#gemini-sparkle-grad)"/>
        <defs>
          <linearGradient id="gemini-sparkle-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38BDF8"/>
            <stop offset="0.5" stopColor="#818CF8"/>
            <stop offset="1" stopColor="#DC2626"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    bullets: [
      'Engineers multi-shot scene-by-scene prompt blueprints with strict seed control.',
      'Drafts natural Malayalam conversational commercial scripts and marketing angles.',
      'Structures prompt parameters for lighting, lens focal length, and shot pacing.'
    ]
  },
  {
    id: 'chatgpt',
    name: 'OpenAI ChatGPT',
    role: 'Direct-Response Ad Copywriting',
    category: 'Scripting & Audio AI',
    badge: 'OpenAI',
    imageSrc: '/logos/chatgpt.png',
    floatClass: 'antigravity-float-2',
    bullets: [
      'Creates high-converting 3-second hook variations for Meta video reels.',
      'Formulates direct-response primary copy, headlines, and call-to-actions.',
      'Translates and adapts marketing narratives for regional client demographics.'
    ]
  },
  {
    id: 'suno',
    name: 'Suno AI',
    role: 'Commercial Audio & Jingles',
    category: 'Scripting & Audio AI',
    badge: 'Audio Synthesis',
    floatClass: 'antigravity-float-slow',
    customIcon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
        <rect x="2" y="9" width="3" height="6" rx="1.5" fill="#DC2626" />
        <rect x="7" y="5" width="3" height="14" rx="1.5" fill="#EF4444" />
        <rect x="12" y="2" width="3" height="20" rx="1.5" fill="#DC2626" />
        <rect x="17" y="6" width="3" height="12" rx="1.5" fill="#EF4444" />
        <rect x="22" y="9" width="3" height="6" rx="1.5" fill="#DC2626" />
      </svg>
    ),
    bullets: [
      'Produces custom background scores and catchy brand audio signatures.',
      'Matches track tempo, crescendo, and mood to video edit cut-points.',
      'Delivers copyright-cleared, high-fidelity commercial audio stems.'
    ]
  },
  {
    id: 'bolt',
    name: 'Bolt.new',
    role: 'Rapid Web & Landing Page Builds',
    category: 'Web & Presentation',
    badge: 'Web Containers',
    imageSrc: '/logos/bolt.png',
    floatClass: 'antigravity-float-1',
    bullets: [
      'Builds lightning-fast responsive landing pages tailored to Meta ad traffic.',
      'Integrates direct WhatsApp lead capture and click-to-chat automations.',
      'Optimizes mobile load speeds for high visitor retention and lower bounce rate.'
    ]
  },
  {
    id: 'lovable',
    name: 'Lovable.dev',
    role: 'AI Full-Stack Development',
    category: 'Web & Presentation',
    badge: 'Modern UI',
    floatClass: 'antigravity-float-2',
    customIcon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
        <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="url(#lovable-heart-grad)"/>
        <defs>
          <linearGradient id="lovable-heart-grad" x1="2" y1="3" x2="22" y2="21" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EC4899"/>
            <stop offset="1" stopColor="#DC2626"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    bullets: [
      'Creates sleek, modern web applications and client showcase portals.',
      'Designs fluid micro-interactions, responsive states, and conversion funnels.',
      'Ensures ATS-friendly web portfolios with clean code architecture.'
    ]
  },
  {
    id: 'canva',
    name: 'Canva',
    role: 'Visual Design & Storyboarding',
    category: 'Web & Presentation',
    badge: 'Design Suite',
    floatClass: 'antigravity-float-slow',
    customIcon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
        <circle cx="12" cy="12" r="10" fill="url(#canva-gradient-bg)"/>
        <path d="M14.5 9.5C13.8 8.8 12.9 8.5 11.8 8.5C9.5 8.5 7.8 10.2 7.8 12.5C7.8 14.8 9.5 16.5 11.8 16.5C13.2 16.5 14.3 15.8 14.8 14.8" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round"/>
        <defs>
          <linearGradient id="canva-gradient-bg" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00C4CC"/>
            <stop offset="1" stopColor="#7D2AE8"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    bullets: [
      'Designs client pitch decks, treatment proposals, and visual mood boards.',
      'Creates high-CTR ad thumbnails, typography overlays, and social assets.',
      'Builds presentation collateral aligned with client brand identity.'
    ]
  },
  {
    id: 'slides',
    name: 'Google Slides',
    role: 'Client Treatment Presentations',
    category: 'Web & Presentation',
    badge: 'Presentations',
    floatClass: 'antigravity-float-1',
    customIcon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" fill="#F59E0B" fillOpacity="0.22" stroke="#F59E0B" strokeWidth="1.8"/>
        <rect x="7" y="7" width="10" height="7" rx="1" stroke="#F59E0B" strokeWidth="1.6" fill="#F59E0B" fillOpacity="0.35"/>
        <path d="M9 17H15" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M12 14V17" stroke="#F59E0B" strokeWidth="1.6"/>
      </svg>
    ),
    bullets: [
      'Formats commercial pitch decks for brand executives and marketing teams.',
      'Outlines multi-shot video timelines and storyboard concept frames.',
      'Shares interactive review links for frictionless client approvals.'
    ]
  },
  {
    id: 'python',
    name: 'Python',
    role: 'Web & Workflow Automation',
    category: 'Web & Presentation',
    badge: 'Certified 2025',
    floatClass: 'antigravity-float-2',
    customIcon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
        <path d="M11.9 2C8.3 2 8.5 3.5 8.5 3.5V5.2H12.1V5.7H5.2C5.2 5.7 2 5.3 2 9C2 12.7 4.8 12.5 4.8 12.5H6.4V10.8C6.4 10.8 6.3 8.7 8.5 8.7H12.1C12.1 8.7 13.8 8.7 13.8 7V3.5C13.8 3.5 14 2 11.9 2ZM10.2 3.5C10.6 3.5 11 3.9 11 4.3C11 4.7 10.6 5.1 10.2 5.1C9.8 5.1 9.4 4.7 9.4 4.3C9.4 3.9 9.8 3.5 10.2 3.5Z" fill="#38BDF8"/>
        <path d="M12.1 22C15.7 22 15.5 20.5 15.5 20.5V18.8H11.9V18.3H18.8C18.8 18.3 22 18.7 22 15C22 11.3 19.2 11.5 19.2 11.5H17.6V13.2C17.6 13.2 17.7 15.3 15.5 15.3H11.9C11.9 15.3 10.2 15.3 10.2 17V20.5C10.2 20.5 10 22 12.1 22ZM13.8 20.5C13.4 20.5 13 20.1 13 19.7C13 19.3 13.4 18.9 13.8 18.9C14.2 18.9 14.6 19.3 14.6 19.7C14.6 20.1 14.2 20.5 13.8 20.5Z" fill="#FACC15"/>
      </svg>
    ),
    bullets: [
      'Certified in Python Programming & Website Creation (Entri App, 2025).',
      'Builds automated file renaming, batch asset extraction, and API hooks.',
      'Understands web structures and backend logic for full-cycle client funnels.'
    ]
  },
  {
    id: 'antigravity-web',
    name: 'Google Antigravity',
    role: 'Zero-Gravity Web & UI Physics',
    category: 'Web & Presentation',
    badge: 'Zero-G Web',
    imageSrc: '/logos/antigravity.png',
    floatClass: 'antigravity-float-1',
    bullets: [
      'Engineers zero-gravity floating physics and dynamic levitation for modern landing pages.',
      'Powers weightless micro-interactions, smooth scroll momentum, and 3D card tilt physics.',
      'Pairs high-CTR Meta ad creatives with interactive web experiences to boost conversion rates.'
    ]
  }
];

export default function ToolkitSection() {
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);
  
  return (
    <section id="tools" className="relative w-full bg-[#08080A] py-20 sm:py-28 select-none overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-crimson/5 rounded-full blur-[60px] opacity-75" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: AI & MARKETING TOOLKIT + Antigravity Option Controls */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-crimson" />
              <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-crimson uppercase">
                AI &amp; MARKETING TOOLKIT //
              </span>
              <div className="h-px flex-1 max-w-[120px] bg-white/10" />
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              Verified Production Tools &amp; Official Workflows
            </h2>
            <p className="text-xs sm:text-sm text-metallic max-w-2xl">
              Equipped with official studio platforms. Click any container to inspect its deep production workflow.
            </p>
          </div>

          
        </motion.div>

        {/* ================================================================
            INTERACTIVE TOOL CONTAINERS WITH MATCHING POSITION LOGOS AT TOP
            ================================================================ */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {TOOLS_DATA.map((tool, idx) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: (idx % 4) * 0.04, ease: 'easeOut' }}
              onClick={() => setSelectedTool(tool)}
              className="p-3.5 sm:p-5 rounded-2xl bg-[#111115] border border-white/10 hover:border-crimson/60 cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(220,38,38,0.2)] flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle Ambient Hover Glow */}
              <div className="absolute top-0 right-0 w-20 sm:w-24 h-20 sm:h-24 bg-crimson/5 rounded-bl-full pointer-events-none group-hover:bg-crimson/15 transition-colors" />

              <div className="w-full overflow-hidden">
                {/* TOP MATCHING POSITION: Brand Logo + Verified Badge (Clean, Never Overflows) */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3 sm:mb-4">
                  {/* High-Contrast Logo Container */}
                  <div className="w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-black/80 border border-white/15 flex items-center justify-center p-2 sm:p-2.5 group-hover:scale-105 group-hover:border-crimson/50 transition-all duration-300 shadow-inner shrink-0">
                    {tool.imageSrc ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                          src={tool.imageSrc}
                          alt={tool.name}
                          width={40}
                          height={40}
                          className="object-contain max-h-full max-w-full filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-full h-full [&>svg]:w-6 [&>svg]:h-6 sm:[&>svg]:w-8 sm:[&>svg]:h-8">
                        {tool.customIcon}
                      </div>
                    )}
                  </div>

                  {/* Verified Badge */}
                  {tool.badge && (
                    <span className="self-start sm:self-auto text-[8px] sm:text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-metallic border border-white/10 group-hover:text-crimson group-hover:border-crimson/30 transition-colors truncate max-w-full">
                      {tool.badge}
                    </span>
                  )}
                </div>

                {/* Tool Name & Role */}
                <h4 className="font-display font-bold text-xs sm:text-base text-white group-hover:text-crimson transition-colors line-clamp-1 break-words">
                  {tool.name}
                </h4>
                <p className="text-[10px] sm:text-xs text-metallic mt-1 line-clamp-2 break-words leading-tight sm:leading-normal">
                  {tool.role}
                </p>
                <div className="text-[9px] sm:text-[10px] font-mono text-crimson/80 mt-1 truncate">
                  {tool.category}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-2.5 sm:pt-3 mt-3 sm:mt-4 border-t border-white/5 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-crimson">
                <span className="truncate">View Breakdown</span>
                <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 group-hover:translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Clean Compact Detail Modal */}
      <AnimatePresence>
        {selectedTool && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTool(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg rounded-2xl bg-[#111115] border border-crimson/50 p-6 z-10 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-black border border-white/15 flex items-center justify-center p-2.5 shrink-0">
                    {selectedTool.imageSrc ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                          src={selectedTool.imageSrc}
                          alt={selectedTool.name}
                          width={44}
                          height={44}
                          className="object-contain max-h-full max-w-full"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        {selectedTool.customIcon}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-white">
                      {selectedTool.name}
                    </h4>
                    <span className="text-xs text-crimson font-mono">
                      {selectedTool.category} • {selectedTool.role}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTool(null)}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-crimson text-white/70 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 3 Compact Bullets */}
              <div className="space-y-3 mb-6">
                <span className="text-[10px] font-mono tracking-widest uppercase text-crimson font-bold block">
                  HOW I USE THIS IN PRODUCTION //
                </span>
                <ul className="space-y-2.5">
                  {selectedTool.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-metallic-light">
                      <CheckCircle2 className="w-4 h-4 text-crimson shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-metallic">
                  Verified in CV Production Pipeline
                </span>
                <button
                  onClick={() => setSelectedTool(null)}
                  className="px-4 py-2 rounded-full bg-crimson hover:bg-crimson-bright text-white text-xs font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
