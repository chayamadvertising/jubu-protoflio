'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_CONFIG } from '@/config/portfolio.config';
import { ArrowUpRight, MessageSquare, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'mjt_social_platforms_v1';

export default function SocialPlatformsSection() {
  const [linkedinUrl, setLinkedinUrl] = useState(PORTFOLIO_CONFIG.linkedinProfileUrl || 'https://www.linkedin.com/');
  const [instagramUrl, setInstagramUrl] = useState(PORTFOLIO_CONFIG.instagramProfileUrl);
  const [youtubeUrl, setYoutubeUrl] = useState(PORTFOLIO_CONFIG.youtubeChannelUrl);
  const [whatsappUrl, setWhatsappUrl] = useState(PORTFOLIO_CONFIG.whatsappUrl);

  useEffect(() => {
    const syncPlatforms = () => {
      try {
        const saved = localStorage.getItem('mjt_media_showcase_v1');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.linkedinProfileUrl && parsed.linkedinProfileUrl !== 'https://www.linkedin.com/') {
            setLinkedinUrl(parsed.linkedinProfileUrl);
          } else {
            setLinkedinUrl(PORTFOLIO_CONFIG.linkedinProfileUrl);
          }
          if (parsed.instagramProfileUrl && parsed.instagramProfileUrl !== 'https://www.instagram.com/') {
            setInstagramUrl(parsed.instagramProfileUrl);
          } else {
            setInstagramUrl(PORTFOLIO_CONFIG.instagramProfileUrl);
          }
          if (parsed.youtubeChannelUrl && parsed.youtubeChannelUrl !== 'https://www.youtube.com/') {
            setYoutubeUrl(parsed.youtubeChannelUrl);
          } else {
            setYoutubeUrl(PORTFOLIO_CONFIG.youtubeChannelUrl);
          }
          if (parsed.whatsappUrl) setWhatsappUrl(parsed.whatsappUrl);
        }
      } catch {
        // fallback
      }
    };

    syncPlatforms();
    window.addEventListener('mjt_config_updated', syncPlatforms);
    return () => window.removeEventListener('mjt_config_updated', syncPlatforms);
  }, []);

  const PLATFORMS = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      category: 'Professional Dossier & B2B Inquiries',
      description: 'Connect for corporate AI video productions, digital marketing consultations, and executive hiring.',
      badge: 'Verified Dossier',
      ctaText: 'Connect on LinkedIn',
      url: linkedinUrl,
      accentColor: '#0A66C2',
      bgHover: 'hover:border-[#0A66C2]/60 hover:shadow-[0_12px_35px_rgba(10,102,194,0.22)]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#0A66C2]">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
        </svg>
      )
    },
    {
      id: 'instagram',
      name: 'Instagram',
      category: 'Commercial Video Reels & Ads',
      description: 'Daily director-level AI commercial reels, prompt breakdowns, and viral campaign testing.',
      badge: 'Active Daily',
      ctaText: 'Follow on Instagram',
      url: instagramUrl,
      accentColor: '#E1306C',
      bgHover: 'hover:border-[#E1306C]/60 hover:shadow-[0_12px_35px_rgba(225,48,108,0.22)]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#E1306C]">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      id: 'youtube',
      name: 'YouTube',
      category: '4K AI Video Master Showreels',
      description: 'High-definition cinematic cuts, camera kinematics breakdowns, and multi-shot ad breakdowns.',
      badge: '4K Ultra HD',
      ctaText: 'Watch on YouTube',
      url: youtubeUrl,
      accentColor: '#FF0000',
      bgHover: 'hover:border-[#FF0000]/60 hover:shadow-[0_12px_35px_rgba(255,0,0,0.22)]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#FF0000]">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      category: 'Instant Messaging & Consultations',
      description: 'Direct 1-on-1 chat for instant project estimates, commercial treatments, and marketing bookings.',
      badge: 'Fast Response',
      ctaText: 'Chat on WhatsApp',
      url: whatsappUrl,
      accentColor: '#25D366',
      bgHover: 'hover:border-[#25D366]/60 hover:shadow-[0_12px_35px_rgba(37,211,102,0.22)]',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#25D366]">
          <path d="M12.031 2C6.495 2 2 6.496 2 12.032c0 1.97.57 3.81 1.56 5.372L2.094 22l4.757-1.464A9.97 9.97 0 0 0 12.03 22.06c5.536 0 10.03-4.496 10.03-10.03C22.06 6.496 17.568 2 12.03 2zm0 18.358c-1.63 0-3.15-.46-4.455-1.258l-.32-.194-2.822.868.882-2.75-.208-.333A8.28 8.28 0 0 1 3.73 12.03c0-4.577 3.724-8.302 8.3-8.302 4.576 0 8.3 3.725 8.3 8.302 0 4.577-3.724 8.328-8.299 8.328zm4.567-6.242c-.25-.125-1.478-.73-1.707-.813-.23-.083-.396-.125-.563.125-.166.25-.646.813-.792.98-.146.166-.292.187-.542.062-.25-.125-1.055-.389-2.01-1.242-.743-.664-1.245-1.485-1.391-1.735-.146-.25-.015-.385.11-.51.113-.112.25-.292.375-.438.125-.146.167-.25.25-.417.084-.167.042-.313-.02-.438-.063-.125-.563-1.355-.772-1.855-.203-.489-.41-.423-.563-.431-.146-.008-.313-.01-.479-.01-.167 0-.438.063-.667.313-.23.25-.875.855-.875 2.084s.896 2.418 1.021 2.585c.125.167 1.764 2.693 4.274 3.777.597.258 1.064.413 1.428.529.6.191 1.146.164 1.578.1.48-.072 1.478-.604 1.687-1.188.208-.583.208-1.083.146-1.188-.063-.104-.23-.166-.48-.291z"/>
        </svg>
      )
    }
  ];

  return (
    <section id="platforms" className="relative w-full bg-[#08080A] py-16 sm:py-24 border-t border-white/5 select-none overflow-hidden">
      
      {/* Background Subtle Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-grid-subtle opacity-15" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-crimson/[0.04] rounded-full blur-[80px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: MY PLATFORMS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-crimson" />
              <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-crimson uppercase">
                MY PLATFORMS // VERIFIED NETWORK
              </span>
              <div className="h-px flex-1 max-w-[120px] bg-white/10" />
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight uppercase">
              OFFICIAL CHANNELS &amp; SOCIAL HUBS
            </h2>

            <p className="text-xs sm:text-sm text-metallic max-w-2xl leading-relaxed">
              Connect across verified professional networks, commercial video reels, and instant messaging. Click any platform to open directly.
            </p>
          </div>

          <span className="text-[11px] font-mono text-crimson px-3.5 py-1.5 rounded-full bg-crimson/10 border border-crimson/25 self-start sm:self-auto shrink-0 font-bold">
            4 Verified Hubs //
          </span>
        </motion.div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PLATFORMS.map((platform, idx) => (
            <motion.a
              key={platform.id}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={`relative rounded-3xl bg-[#0E0E12] border border-white/10 ${platform.bgHover} transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between group hover:-translate-y-1.5 cursor-pointer block shadow-lg`}
            >
              <div>
                {/* Top Row: Icon + Badge (Responsive) */}
                <div className="flex items-center justify-between gap-2 mb-4 sm:mb-5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-black/80 border border-white/10 flex items-center justify-center p-2.5 sm:p-3 group-hover:scale-105 transition-transform duration-300 shadow-inner shrink-0">
                    {platform.icon}
                  </div>

                  <span className="text-[9px] sm:text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-white/5 text-white/80 border border-white/10 group-hover:border-white/20 transition-colors truncate max-w-[140px] text-right">
                    {platform.badge}
                  </span>
                </div>

                {/* Name & Category */}
                <h3 className="font-display font-extrabold text-xl text-white group-hover:text-white transition-colors mb-1">
                  {platform.name}
                </h3>

                <div className="text-[11px] font-mono text-crimson font-semibold mb-3">
                  {platform.category}
                </div>

                <p className="text-xs text-metallic leading-relaxed line-clamp-3">
                  {platform.description}
                </p>
              </div>

              {/* Bottom Action CTA */}
              <div className="pt-4 mt-5 border-t border-white/10 flex items-center justify-between text-xs font-mono font-bold">
                <span className="text-white group-hover:underline">
                  {platform.ctaText}
                </span>
                <span className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-crimson group-hover:text-white text-metallic flex items-center justify-center transition-all duration-200 group-hover:scale-110">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

      </div>

    </section>
  );
}
