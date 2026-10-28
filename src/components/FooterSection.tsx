'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_CONFIG } from '@/config/portfolio.config';
import { handleCvDownload } from '@/utils/downloadCv';
import {
  MessageSquare,
  Download,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Instagram,
  Youtube,
  Linkedin
} from 'lucide-react';

export default function FooterSection() {
  const [instagramUrl, setInstagramUrl] = useState(PORTFOLIO_CONFIG.instagramProfileUrl);
  const [youtubeUrl, setYoutubeUrl] = useState(PORTFOLIO_CONFIG.youtubeChannelUrl);
  const [linkedinUrl, setLinkedinUrl] = useState(PORTFOLIO_CONFIG.linkedinProfileUrl);
  const [googleDriveUrl, setGoogleDriveUrl] = useState(PORTFOLIO_CONFIG.googleDriveUrl);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mjt_media_showcase_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.instagramProfileUrl && parsed.instagramProfileUrl !== 'https://www.instagram.com/') {
          setInstagramUrl(parsed.instagramProfileUrl);
        }
        if (parsed.youtubeChannelUrl && parsed.youtubeChannelUrl !== 'https://www.youtube.com/') {
          setYoutubeUrl(parsed.youtubeChannelUrl);
        }
        if (parsed.linkedinProfileUrl && parsed.linkedinProfileUrl !== 'https://www.linkedin.com/') {
          setLinkedinUrl(parsed.linkedinProfileUrl);
        }
        if (parsed.googleDriveUrl && parsed.googleDriveUrl !== 'https://drive.google.com/') {
          setGoogleDriveUrl(parsed.googleDriveUrl);
        } else {
          setGoogleDriveUrl(PORTFOLIO_CONFIG.googleDriveUrl);
        }
      }
    } catch {
      // fallback
    }
  }, []);

  return (
    <footer id="contact" className="relative w-full bg-crimson text-white select-none py-12 sm:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          
          {/* LEFT: Identity & Direct Contact Details - Slow motion reveal */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-black/30 border border-white/20 text-xs font-mono font-semibold tracking-wider uppercase text-white/90">
              Direct Contact &amp; Booking
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white">
              LET&apos;S ENGINEER HIGH-CONVERTING AI CREATIVES
            </h2>

            <p className="text-white/80 text-sm sm:text-base max-w-xl leading-relaxed">
              Available for full AI video commercial productions, Meta Ads creative consulting, and prompt engineering architecture.
            </p>

            {/* Micro Details Grid */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-white/85 font-mono">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{PORTFOLIO_CONFIG.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                <span>{PORTFOLIO_CONFIG.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <span>{PORTFOLIO_CONFIG.email}</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Action Buttons & Social Channels */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 self-stretch sm:self-auto"
          >
            {/* WhatsApp CTA Button */}
            <a
              href={PORTFOLIO_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-black hover:bg-black/90 text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Let&apos;s Talk on WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {/* Download CV */}
            <button
              onClick={handleCvDownload}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-transparent hover:bg-white text-white hover:text-black border-2 border-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </button>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pl-2">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center transition-transform hover:scale-110"
                aria-label="LinkedIn"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center transition-transform hover:scale-110"
                aria-label="Instagram"
                title="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center transition-transform hover:scale-110"
                aria-label="YouTube"
                title="YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>

              <a
                href={googleDriveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center transition-transform hover:scale-110"
                aria-label="Google Drive"
                title="Google Drive Vault"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M7.71 3.5L1.15 15L4.58 21L11.14 9.5L7.71 3.5ZM14.86 3.5H8.29L14.85 15H21.42L14.86 3.5ZM22.85 15L19.42 21H6.29L9.72 15H22.85Z"/>
                </svg>
              </a>
            </div>
          </motion.div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 pt-6 border-t border-black/15 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/75 font-medium">
          <div>
            © {new Date().getFullYear()} {PORTFOLIO_CONFIG.name}. All rights reserved.
          </div>
          <div className="font-mono text-[11px]">
            {PORTFOLIO_CONFIG.role}
          </div>
        </div>
      </div>
    </footer>
  );
}
