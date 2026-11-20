'use client';

import React, { useState, useEffect } from 'react';
import { PORTFOLIO_CONFIG } from '@/config/portfolio.config';
import { handleCvDownload } from '@/utils/downloadCv';
import { ArrowUpRight, Download, Menu, X, MessageSquare } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Services', href: '#services' },
  { name: 'Stack', href: '#tools' },
  { name: 'Work', href: '#work' },
  { name: 'YouTube', href: '#youtube-highlight' },
  { name: 'Meta Ads', href: '#meta-ads' },
  { name: 'Dossier', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3.5 bg-[#070709]/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/60'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Left Brand Title: Cleanly set to 'Portfolio' */}
          <a
            href="#"
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-xl bg-crimson/15 border border-crimson/35 flex items-center justify-center text-xs font-mono font-bold text-crimson group-hover:bg-crimson group-hover:text-white transition-colors">
              P
            </div>
            <span className="font-display font-extrabold text-sm sm:text-base tracking-tight uppercase text-white group-hover:text-crimson transition-colors">
              Portfolio
            </span>
          </a>

          {/* Center Floating Pill Navbar (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5 px-4 py-2 rounded-full bg-[#111115]/90 border border-white/10 backdrop-blur-md shadow-inner">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1 text-xs lg:text-sm font-medium text-metallic-light hover:text-white transition-colors rounded-full hover:bg-white/5"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Download CV */}
            <button
              onClick={handleCvDownload}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-full bg-transparent text-white border border-white/20 hover:border-crimson hover:text-crimson transition-all duration-200"
              title="Download CV (PDF)"
            >
              <Download className="w-3.5 h-3.5 text-crimson" />
              <span>Download CV</span>
            </button>

            {/* Chat on WhatsApp */}
            <a
              href={PORTFOLIO_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold tracking-wider uppercase rounded-full bg-crimson hover:bg-crimson-bright text-white shadow-crimson-subtle transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>WhatsApp ↗</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-[#111115] border border-white/10 text-white hover:text-crimson transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070709]/98 border-b border-white/10 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-metallic-light hover:text-crimson transition-colors py-1"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleCvDownload(e);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-wider uppercase rounded-full bg-transparent text-white border border-white/20 hover:border-crimson"
            >
              <Download className="w-4 h-4 text-crimson" />
              <span>Download CV (PDF)</span>
            </button>
            <a
              href={PORTFOLIO_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold tracking-wider uppercase rounded-full bg-crimson hover:bg-crimson-bright text-white shadow-crimson-subtle"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
