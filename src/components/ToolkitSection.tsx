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
  Activity,
  Film,
  Video,
  FileText,
  Target,
  Code2,
  Globe
} from 'lucide-react';

interface ToolItem {
  id: string;
  name: string;
  role: string;
  category: 'AI Video & Visual Production' | 'Ad Copy, Strategy & Audio AI' | 'Paid Social & Performance' | 'Web Development & Presentation';
  badge?: string;
  imageSrc?: string;
  customIcon?: React.ReactNode;
  bullets: string[];
}

const TOOLS_DATA: ToolItem[] = [
  // ====================================================================
  // 1. AI VIDEO & VISUAL PRODUCTION
  // ====================================================================
  {
    id: 'veo',
    name: 'Google Veo',
    role: 'Cinematic AI Video Generation',
    category: 'AI Video & Visual Production',
    badge: 'Google DeepMind',
    customIcon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
        <rect x="2" y="4" width="14" height="16" rx="3" fill="#E11D48" fillOpacity="0.18" stroke="#E11D48" strokeWidth="1.8" />
        <polygon points="16,9 22,5 22,19 16,15" fill="#E11D48" />
        <circle cx="9" cy="12" r="3" stroke="#FFFFFF" strokeWidth="1.8" />
      </svg>
    ),
    bullets: [
      'Generates cinematic commercial video shots with studio lighting, camera pans, and depth of field.',
      'Executes director-level prompt fidelity with accurate focal length and volumetric atmosphere.',
      'Produces high-definition ad cuts across 9:16 vertical and 16:9 landscape dimensions.'
    ]
  },
  {
    id: 'higgsfield',
    name: 'Higgsfield AI',
    role: 'Character & Motion Consistency',
    category: 'AI Video & Visual Production',
    badge: 'Character Control',
    imageSrc: '/logos/higgsfield.png',
    bullets: [
      'Maintains 100% character and client product visual consistency across consecutive video scenes.',
      'Generates organic human movement, authentic facial expressions, and natural motion dynamics.',
      'Pioneers Base-Image Anchoring workflow for cohesive commercial brand storytelling.'
    ]
  },
  {
    id: 'prompt-engineering',
    name: 'Prompt Architecture',
    role: 'Base-Image Anchor & Multi-Shot Timelines',
    category: 'AI Video & Visual Production',
    badge: 'Director Workflow',
    customIcon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
        <path d="M4 6H20M4 12H14M4 18H18" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" />
        <circle cx="18" cy="12" r="3" fill="#E11D48" fillOpacity="0.25" stroke="#E11D48" strokeWidth="1.8" />
      </svg>
    ),
    bullets: [
      'Engineers scene-by-scene prompt blueprints with strict negative constraints and seed locking.',
      'Calibrates camera angles, cinematic lighting, and aspect ratio parameters for AI models.',
      'Logs character continuity sheets to guarantee brand identity across long-form multi-shot ads.'
    ]
  },

  // ====================================================================
  // 2. AD COPY, STRATEGY & AUDIO AI (CLAUDE ELEVATED TO #1)
  // ====================================================================
  {
    id: 'claude',
    name: 'Anthropic Claude',
    role: 'Ad Copywriting & Creative Strategy',
    category: 'Ad Copy, Strategy & Audio AI',
    badge: 'Anthropic',
    imageSrc: '/logos/claude.png',
    bullets: [
      'Crafts psychological direct-response ad copy, high-converting 3-second video hooks, and angles.',
      'Architects comprehensive commercial creative briefs, multi-shot dialogue scripts, and treatments.',
      'Formulates consumer audience personas based on sociological insights to drive Meta ad ROAS.'
    ]
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    role: 'Multimodal Scripting & Logic',
    category: 'Ad Copy, Strategy & Audio AI',
    badge: 'LLM Multimodal',
    customIcon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
        <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" fill="url(#gemini-sparkle-grad)"/>
        <defs>
          <linearGradient id="gemini-sparkle-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38BDF8"/>
            <stop offset="0.5" stopColor="#818CF8"/>
            <stop offset="1" stopColor="#E11D48"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    bullets: [
      'Drafts natural Malayalam conversational dialogues and culturally contextual video narrations.',
      'Analyzes ad creative competitor transcripts to engineer counter-intuitive video hooks.',
      'Structures prompt parameters for lighting, lens focal length, and shot pacing.'
    ]
  },
  {
    id: 'chatgpt',
    name: 'OpenAI ChatGPT',
    role: 'Direct-Response Ad Copywriting',
    category: 'Ad Copy, Strategy & Audio AI',
    badge: 'OpenAI',
    imageSrc: '/logos/chatgpt.png',
    bullets: [
      'Generates rapid variations of headlines, primary text, and call-to-actions for Meta A/B testing.',
      'Adapts marketing narratives for specific regional demographics and buyer personas.',
      'Assists with audio transcription and voiceover timing alignment.'
    ]
  },
  {
    id: 'suno',
    name: 'Suno AI',
    role: 'Commercial Audio & Voiceover Sync',
    category: 'Ad Copy, Strategy & Audio AI',
    badge: 'Audio & VO Sync',
    customIcon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
        <rect x="2" y="9" width="3" height="6" rx="1.5" fill="#E11D48" />
        <rect x="7" y="5" width="3" height="14" rx="1.5" fill="#FB7185" />
        <rect x="12" y="2" width="3" height="20" rx="1.5" fill="#E11D48" />
        <rect x="17" y="6" width="3" height="12" rx="1.5" fill="#FB7185" />
        <rect x="22" y="9" width="3" height="6" rx="1.5" fill="#E11D48" />
      </svg>
    ),
    bullets: [
      'Composes custom commercial audio signatures, upbeat jingles, and cinematic scores.',
      'Synchronizes beat drops and musical crescendos with visual edit cuts for higher viewer retention.',
      'Delivers copyright-cleared commercial audio stems paired with multilingual voiceover sync.'
    ]
  },

  // ====================================================================
  // 3. PAID SOCIAL & PERFORMANCE
  // ====================================================================
  {
    id: 'meta-ads',
    name: 'Meta Ads Manager',
    role: 'Facebook & Instagram Paid Ads',
    category: 'Paid Social & Performance',
    badge: 'Paid Social & Creative Testing',
    imageSrc: '/logos/meta.png',
    bullets: [
      'Architects lead generation and conversion campaigns on Facebook & Instagram.',
      'Executes rigorous creative A/B testing on 3-second video hooks to systematically drive down CPA.',
      'Targets high-intent custom and lookalike audiences across Kerala, GCC, and global markets.'
    ]
  },
  {
    id: 'audience-targeting',
    name: 'Audience Segmentation',
    role: 'High-Intent Demographic Targeting',
    category: 'Paid Social & Performance',
    badge: 'Performance Growth',
    customIcon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#E11D48" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="5" stroke="#FFFFFF" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="2" fill="#E11D48" />
      </svg>
    ),
    bullets: [
      'Applies sociological demographic segmentation for culturally resonant Malabar and Gulf marketing.',
      'Builds retargeting funnels that convert initial reel viewers into qualified business leads.',
      'Monitors frequency, reach saturation, and budget pacing to prevent ad fatigue.'
    ]
  },

  // ====================================================================
  // 4. WEB DEVELOPMENT & PRESENTATION (COMPACT SECONDARY TIER)
  // ====================================================================
  {
    id: 'web-dev',
    name: 'Website Development',
    role: 'Python, Lovable & Bolt.new',
    category: 'Web Development & Presentation',
    badge: 'Web & Funnels',
    imageSrc: '/logos/bolt.png',
    bullets: [
      'Builds lightning-fast landing pages tailored to convert incoming Meta Ads traffic.',
      'Certified in Python Programming & Website Creation (Entri App, 2025).',
      'Integrates direct WhatsApp lead capture and click-to-chat onboarding funnels.'
    ]
  },
  {
    id: 'canva',
    name: 'Canva',
    role: 'Storyboards & Pitch Collateral',
    category: 'Web Development & Presentation',
    badge: 'Design Suite',
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
      'Designs client pitch decks, visual treatments, and commercial storyboard concept boards.',
      'Creates high-CTR ad thumbnails, typography overlays, and social promotional assets.',
      'Builds cohesive brand collateral tailored for agency client presentations.'
    ]
  },
  {
    id: 'slides',
    name: 'Google Slides',
    role: 'Client Treatment Presentations',
    category: 'Web Development & Presentation',
    badge: 'Presentations',
    customIcon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" fill="#F59E0B" fillOpacity="0.22" stroke="#F59E0B" strokeWidth="1.8"/>
        <rect x="7" y="7" width="10" height="7" rx="1" stroke="#F59E0B" strokeWidth="1.6" fill="#F59E0B" fillOpacity="0.35"/>
        <path d="M9 17H15" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M12 14V17" stroke="#F59E0B" strokeWidth="1.6"/>
      </svg>
    ),
    bullets: [
      'Formats commercial pitch decks for brand executives, founders, and marketing directors.',
      'Outlines multi-shot video timelines and storyboard concept frames for fast review.',
      'Shares interactive review links for frictionless client approvals.'
    ]
  }
];

const CATEGORIES = [
  'All Tools',
  'AI Video & Visual Production',
  'Ad Copy, Strategy & Audio AI',
  'Paid Social & Performance',
  'Web Development & Presentation'
] as const;

export default function ToolkitSection() {
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All Tools');

  const filteredTools = activeCategory === 'All Tools'
    ? TOOLS_DATA
    : TOOLS_DATA.filter((tool) => tool.category === activeCategory);

  return (
    <section id="tools" className="relative w-full bg-[#070709] py-20 sm:py-28 select-none overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-crimson/5 rounded-full blur-[70px] opacity-75" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: AI & MARKETING TOOLKIT */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-crimson" />
              <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-crimson uppercase">
                PRODUCTION STACK //
              </span>
              <div className="h-px flex-1 max-w-[120px] bg-white/10" />
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
              Verified Production Tools &amp; Agency Workflows
            </h2>
            <p className="text-xs sm:text-sm text-metallic max-w-2xl">
              Equipped with professional studio platforms. Prioritized for director-level AI video generation, Claude-assisted copy strategy, and Meta Ads performance.
            </p>
          </div>

          <span className="text-xs font-mono text-metallic self-start md:self-auto">
            Click any container to inspect production workflow
          </span>
        </motion.div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-crimson text-white shadow-crimson-subtle font-semibold'
                  : 'bg-[#111115] text-metallic hover:text-white border border-white/10 hover:border-crimson/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ================================================================
            INTERACTIVE TOOL CONTAINERS WITH GPU-COMPOSITED 3D CARD HOVER
            ================================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5"
        >
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => setSelectedTool(tool)}
              className="p-4 sm:p-5 rounded-2xl bg-[#111115] border border-white/10 hover:border-crimson/60 cursor-pointer transition-all duration-300 ease-out flex flex-col justify-between group relative overflow-hidden studio-sheen-container card-elevation-hover"
            >
              <div className="w-full overflow-hidden">
                {/* Brand Logo Container + Badge */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3.5">
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
                <span className="truncate">View Workflow</span>
                <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 group-hover:translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </motion.div>

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
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
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
                  AGENCY PRODUCTION APPLICATION //
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
                  Verified in Advertising Agency Pipeline
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
