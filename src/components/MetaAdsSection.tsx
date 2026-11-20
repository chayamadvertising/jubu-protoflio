'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_CONFIG } from '@/config/portfolio.config';
import {
  TrendingUp,
  Download,
  ArrowUpRight,
  Target,
  Users,
  Eye,
  CheckCircle2,
  FileSpreadsheet,
  MousePointerClick,
  Sparkles,
  BarChart2,
  Percent,
  Layers
} from 'lucide-react';

interface CampaignData {
  id: number;
  name: string;
  niche: string;
  category: 'reach' | 'engagement';
  objective: string;
  spend: string;
  reach: string;
  impressions: string;
  results: string;
  costPerResult: string;
  attribution: string;
  badge: string;
}

const CAMPAIGN_ROWS: CampaignData[] = [
  {
    id: 1,
    name: 'chayam first ad oct-05',
    niche: 'Chayam Advertising Agency Launch',
    category: 'reach',
    objective: 'Brand Awareness & Video Reach',
    spend: '₹791.44',
    reach: '174,576',
    impressions: '182,643',
    results: '174,576 Reach',
    costPerResult: '₹4.53 / 1k Reach',
    attribution: '7-day click or 1-day view',
    badge: 'Scale Reach'
  },
  {
    id: 2,
    name: 'second awareness campaign -oct-13',
    niche: 'Auditorium Launch & Cultural Campaign',
    category: 'reach',
    objective: 'High-Retention Video Reach',
    spend: '₹538.97',
    reach: '130,204',
    impressions: '135,085',
    results: '130,204 Reach',
    costPerResult: '₹4.14 / 1k Reach',
    attribution: '7-day click or 1-day view',
    badge: 'Lowest CPR'
  },
  {
    id: 3,
    name: 'orginal campaign -nov -06',
    niche: 'Commercial Brand Video Showcase',
    category: 'engagement',
    objective: 'Post Interactions & Direct Engagement',
    spend: '₹772.90',
    reach: '16,319',
    impressions: '27,262',
    results: '2,679 Interactions',
    costPerResult: '₹0.29 / Interaction',
    attribution: '7-day click or 1-day view',
    badge: 'Top Efficiency'
  },
  {
    id: 4,
    name: 'second engagement campaign-oct -21',
    niche: 'Video Hook Testing & Community Build',
    category: 'engagement',
    objective: 'Engagement & Viral Hook Testing',
    spend: '₹848.00',
    reach: '16,709',
    impressions: '28,684',
    results: '2,595 Interactions',
    costPerResult: '₹0.33 / Interaction',
    attribution: '7-day click or 1-day view',
    badge: 'High Engagement'
  },
  {
    id: 5,
    name: 'chayam first engagement campaign -oct-09',
    niche: 'Brand Warmup & Audience Testing',
    category: 'engagement',
    objective: 'Post Engagement & Comment Interaction',
    spend: '₹533.30',
    reach: '4,837',
    impressions: '8,687',
    results: '69 Engagements',
    costPerResult: '₹7.73 / Engagement',
    attribution: '7-day click or 1-day view',
    badge: 'Audience Warmup'
  },
  {
    id: 6,
    name: 'second awareness campaign -oct-13 (Calibration)',
    niche: 'Pixel & Location Sandbox',
    category: 'reach',
    objective: 'Tracking Calibration & Pixel Test',
    spend: '₹0.15',
    reach: '56',
    impressions: '57',
    results: '56 Reach',
    costPerResult: '₹2.68 / 1k Reach',
    attribution: '7-day click or 1-day view',
    badge: 'Benchmark Test'
  }
];

export default function MetaAdsSection() {
  const [filter, setFilter] = useState<'all' | 'reach' | 'engagement'>('all');

  const filteredCampaigns = filter === 'all'
    ? CAMPAIGN_ROWS
    : CAMPAIGN_ROWS.filter((c) => c.category === filter);

  return (
    <section id="meta-ads" className="relative w-full bg-[#08080A] py-20 sm:py-28 select-none overflow-hidden border-t border-b border-white/5">
      {/* Background Subtle Gradient */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-crimson/5 rounded-full blur-[80px] opacity-75" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: META ADS CAMPAIGN PERFORMANCE // VERIFIED DATA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-crimson" />
              <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-crimson uppercase">
                META ADS PERFORMANCE // VERIFIED DATA
              </span>
              <div className="h-px flex-1 max-w-[120px] bg-white/10" />
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
              Real Paid Campaign Data &amp; High-Retention Results
            </h2>

            <p className="text-xs sm:text-sm text-metallic max-w-2xl leading-relaxed">
              Verifiable performance metrics from live Facebook &amp; Instagram ad runs for Chayam Advertising Agency and regional clients. Built on deep audience segmentation, Malayalam psychological hooks, and creative A/B testing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 self-start md:self-auto">
            {/* View / Download Full Excel Report Button */}
            <a
              href="/meta-ads/Chayam_Meta_Ads_Performance_Report.csv"
              download="Chayam_Mukkam_Meta_Ads_Performance_Report.csv"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-crimson hover:bg-crimson-bright text-white text-xs font-semibold tracking-wider uppercase transition-all duration-200 hover:scale-[1.02] shadow-crimson-subtle group"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Download Full Excel Report</span>
              <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* ================================================================
            TOP ROW: 5 KPI SUMMARY CARDS (POPULATED DIRECTLY FROM REAL DATA)
            ================================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 mb-12"
        >
          {[
            {
              label: 'Total Ad Spend Managed',
              value: '₹3,485+',
              subtext: 'Optimized budget deployment across test & scale campaigns',
              icon: <Target className="w-4 h-4 text-crimson" />
            },
            {
              label: 'Total Impressions',
              value: '382,400+',
              subtext: 'High-frequency brand visibility across Facebook & Instagram',
              icon: <Eye className="w-4 h-4 text-crimson" />
            },
            {
              label: 'Unique Accounts Reached',
              value: '342,700+',
              subtext: 'Targeted audience penetration in Kozhikode & Malabar',
              icon: <Users className="w-4 h-4 text-crimson" />
            },
            {
              label: 'Lowest Cost / Interaction',
              value: '₹0.29',
              subtext: 'Exceptional 3-sec retention hook on commercial video ads',
              icon: <Percent className="w-4 h-4 text-crimson" />
            },
            {
              label: 'Total Post Engagements',
              value: '5,340+',
              subtext: 'High-intent interactions, shares, and qualified enquiries',
              icon: <MousePointerClick className="w-4 h-4 text-crimson" />
            }
          ].map((kpi, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-[#111115] border border-white/10 hover:border-crimson/50 transition-all duration-300 studio-sheen-container card-elevation-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-xl bg-crimson/15 border border-crimson/30 flex items-center justify-center">
                    {kpi.icon}
                  </div>
                  <span className="text-[9px] font-mono text-crimson uppercase tracking-wider font-semibold">
                    Live Verified
                  </span>
                </div>
                <div className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight mb-1">
                  {kpi.value}
                </div>
                <div className="text-xs font-semibold text-white/90 mb-2">
                  {kpi.label}
                </div>
              </div>
              <p className="text-[10px] text-metallic leading-relaxed">
                {kpi.subtext}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ================================================================
            MAIN VIEW: CAMPAIGN PERFORMANCE TABLE (CLEAN & RESPONSIVE)
            ================================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.10 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl bg-[#111115] border border-white/10 p-5 sm:p-6 shadow-xl mb-10 overflow-hidden"
        >
          {/* Table Header Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/10 mb-5">
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-white">
                Chayam Advertising — Campaign Performance Breakdown
              </h3>
              <p className="text-xs text-metallic mt-0.5">
                Official export data: Sep 01, 2026 – Nov 16, 2026 • Attribution: 7-day click or 1-day view
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/60 border border-white/10 text-xs font-mono">
              {[
                { key: 'all', label: 'All Campaigns (6)' },
                { key: 'reach', label: 'Reach & Awareness (3)' },
                { key: 'engagement', label: 'Engagement & Hooks (3)' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as any)}
                  className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
                    filter === tab.key
                      ? 'bg-crimson text-white font-semibold shadow-sm'
                      : 'text-metallic hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Table Data */}
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[11px] font-mono text-metallic uppercase tracking-wider">
                  <th className="pb-3 pr-4 font-semibold">Campaign &amp; Niche</th>
                  <th className="pb-3 px-3 font-semibold">Objective</th>
                  <th className="pb-3 px-3 font-semibold">Amount Spent</th>
                  <th className="pb-3 px-3 font-semibold">Unique Reach</th>
                  <th className="pb-3 px-3 font-semibold">Impressions</th>
                  <th className="pb-3 px-3 font-semibold">Key Results</th>
                  <th className="pb-3 pl-3 font-semibold text-right">Cost Per Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {filteredCampaigns.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-white group-hover:text-crimson transition-colors">
                          {row.name}
                        </span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-crimson/15 text-crimson border border-crimson/30">
                          {row.badge}
                        </span>
                      </div>
                      <div className="text-[11px] text-metallic">
                        {row.niche}
                      </div>
                    </td>
                    <td className="py-4 px-3 text-metallic-light whitespace-nowrap">
                      {row.objective}
                    </td>
                    <td className="py-4 px-3 font-mono font-bold text-white whitespace-nowrap">
                      {row.spend}
                    </td>
                    <td className="py-4 px-3 font-mono text-metallic-light whitespace-nowrap">
                      {row.reach}
                    </td>
                    <td className="py-4 px-3 font-mono text-metallic-light whitespace-nowrap">
                      {row.impressions}
                    </td>
                    <td className="py-4 px-3 font-mono text-white whitespace-nowrap">
                      {row.results}
                    </td>
                    <td className="py-4 pl-3 font-mono font-bold text-right text-emerald-400 whitespace-nowrap">
                      {row.costPerResult}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer Summary Note */}
          <div className="mt-4 pt-3 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-metallic font-mono">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              Direct Meta Ads Manager Export (Kerala Market Audience)
            </span>
            <span>Total Campaign Reach: 342,700+ Unique Accounts</span>
          </div>
        </motion.div>

        {/* ================================================================
            AGENCY STRATEGY TAKEAWAYS // WHY THIS MATTERS FOR FOUNDERS
            ================================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Hook-Driven Retention',
              desc: 'Achieved an ultra-low ₹0.29 per post interaction by engineering 3-second visual hooks that stop the scroll in mobile feeds.',
              tag: 'Creative A/B Testing'
            },
            {
              title: 'Granular Audience Precision',
              desc: 'Targeted demographic segmentation across Malabar regional markets with zero wasted budget and high delivery frequency.',
              tag: 'Sociological Insight'
            },
            {
              title: 'AI Commercial Creative Synergy',
              desc: 'Pairing Claude-crafted direct-response copy with Google Veo/Higgsfield generative video assets to maximize conversion velocity.',
              tag: 'Video + Ads Hybrid'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#111115] border border-white/10 hover:border-crimson/40 transition-colors"
            >
              <span className="text-[9px] font-mono uppercase text-crimson font-bold tracking-wider block mb-2">
                {item.tag} //
              </span>
              <h4 className="font-display font-bold text-sm text-white mb-1.5">
                {item.title}
              </h4>
              <p className="text-xs text-metallic leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
