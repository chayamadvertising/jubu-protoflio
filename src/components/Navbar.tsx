'use client';

import React, { useState, useEffect } from 'react';
import { PORTFOLIO_CONFIG } from '@/config/portfolio.config';
import { handleCvDownload } from '@/utils/downloadCv';
import { ArrowUpRight, Download, Menu, X, MessageSquare } from 'lucide-react';

const NAV_LINKS = [
  { name: 'About', href: '#services' },
  { name: 'Services', href: '#services' },
  { name: 'AI Tools', href: '#tools' },
  { name: 'Work', href: '#work' },
  { name: 'Platforms', href: '#platforms' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3.5 bg-[#08080A]/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/50'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Left side spacer - PROTOFOLIO title removed as requested */}
          <div className="w-8" />

          {/* Center Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 px-5 py-2 rounded-full bg-[#111115]/90 border border-white/10 backdrop-blur-md">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1 text-xs lg:text-sm font-medium text-metallic-light hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* 1. [ Download CV ] Clean outline button */}
            <button
              onClick={handleCvDownload}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-full bg-transparent text-white border border-white/20 hover:border-crimson hover:text-crimson transition-all duration-200"
              title="Download CV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </button>

            {/* 2. [ Let's Talk ] Crimson Red button */}
            <a
              href={PORTFOLIO_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold tracking-wider uppercase rounded-full bg-crimson hover:bg-crimson-bright text-white shadow-crimson-subtle transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
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
        <div className="md:hidden bg-[#08080A]/98 border-b border-white/10 px-6 py-6 space-y-4">
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
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </button>
            <a
              href={PORTFOLIO_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold tracking-wider uppercase rounded-full bg-crimson text-white shadow-crimson-subtle"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
