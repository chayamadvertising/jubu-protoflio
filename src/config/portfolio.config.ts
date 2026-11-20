// ====================================================================
// QUICK-EDIT LINKS & ASSETS CONFIG (ADVERTISING AGENCY PORTFOLIO)
// ====================================================================

export interface ReelItem {
  id: number;
  title: string;
  url: string;
  thumbnail?: string;
}

export interface VideoItem {
  id: number;
  title: string;
  url: string;
}

export interface DriveProjectItem {
  id: number;
  title: string;
  category: string;
  description: string;
  format: string;
  badge: string;
}

export interface CommercialDesignItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  badge: string;
  aspect: string;
}

export interface WebProjectItem {
  id: number;
  title: string;
  client: string;
  goal: string;
  description: string;
  techStack: string[];
  url: string;
  previewImage: string;
  badge: string;
  results: string;
}

export interface PortfolioConfigType {
  name: string;
  role: string;
  whatsappUrl: string;
  phone: string;
  email: string;
  location: string;
  cvDownloadUrl: string;
  googleDriveUrl: string;
  metaAdsReportUrl: string;
  photos: {
    hero: string;
    services: string;
    workflow: string;
  };
  instagramProfileUrl: string;
  youtubeChannelUrl: string;
  linkedinProfileUrl: string;
  instagramReels: ReelItem[];
  youtubeShorts: ReelItem[];
  youtubeVideos: VideoItem[];
  commercialDesigns: CommercialDesignItem[];
  webProjects: WebProjectItem[];
  googleDriveProjects: DriveProjectItem[];
}

export const ADMIN_CREDENTIALS = {
  username: "jubu41",
  password: "5445",
};

export const PORTFOLIO_CONFIG: PortfolioConfigType = {
  name: "MUHAMMED JUBAIR T",
  role: "AI Commercial Video Producer | Performance Creative & Meta Ads Strategist",
  whatsappUrl: "https://wa.me/918129418544?text=Hi%20Muhammed%20Jubair%2C%20I%20saw%20your%20Advertising%20Agency%20portfolio%20and%20want%20to%20discuss%20a%20project.",
  phone: "+91 8129418544",
  email: "jubujubair257@gmail.com",
  location: "Kerala, India",
  cvDownloadUrl: "/Muhammed_Jubair_T_Ad_Agency_CV_150Plus.pdf",
  googleDriveUrl: "https://drive.google.com/drive/home",
  metaAdsReportUrl: "/meta-ads/Chayam_Meta_Ads_Performance_Report.csv",
  photos: {
    hero: "/pose1-hero-arms-crossed.png",
    services: "/pose2-side-angle.png",
    workflow: "/pose3-seated-executive.png"
  },
  instagramProfileUrl: "https://www.instagram.com/jb_ai_creations?utm_source=qr&stkn=MTloenk3OHdpczEyMg==",
  youtubeChannelUrl: "https://www.youtube.com/@JBAiCreations",
  linkedinProfileUrl: "https://www.linkedin.com/in/jbcreations6",
  instagramReels: [
    {
      id: 1,
      title: "AI Commercial Video 01",
      url: "/videos/reel1.mp4",
      thumbnail: "/reels/reel1.jpg"
    },
    {
      id: 2,
      title: "AI Commercial Video 02",
      url: "/videos/reel2.mp4",
      thumbnail: "/reels/reel2.jpg"
    },
    {
      id: 3,
      title: "AI Commercial Video 03",
      url: "/videos/reel3.mp4",
      thumbnail: "/reels/reel3.jpg"
    },
    {
      id: 4,
      title: "AI Commercial Video 04",
      url: "/videos/reel4.mp4",
      thumbnail: "/reels/reel4.jpg"
    }
  ],
  youtubeShorts: [
    {
      id: 1,
      title: "Save The Date // AI Commercial Short",
      url: "https://www.youtube.com/shorts/jVeBJNeT8_E",
      thumbnail: "https://img.youtube.com/vi/jVeBJNeT8_E/hqdefault.jpg"
    },
    {
      id: 2,
      title: "One // Cinematic AI Concept Short",
      url: "https://www.youtube.com/shorts/ApRwKrXGppc",
      thumbnail: "https://img.youtube.com/vi/ApRwKrXGppc/hqdefault.jpg"
    },
    {
      id: 3,
      title: "AI Commercial Ad Reel // Multi-Shot",
      url: "https://www.youtube.com/shorts/Ym0ORXsEi1c",
      thumbnail: "https://img.youtube.com/vi/Ym0ORXsEi1c/hqdefault.jpg"
    },
    {
      id: 4,
      title: "Chayam // Commercial Production Short",
      url: "https://www.youtube.com/shorts/A3sLMPTHW_E",
      thumbnail: "https://img.youtube.com/vi/A3sLMPTHW_E/hqdefault.jpg"
    }
  ],
  youtubeVideos: [
    { id: 1, title: "Save The Date // AI Commercial Short", url: "https://www.youtube.com/shorts/jVeBJNeT8_E" },
    { id: 2, title: "One // Cinematic AI Concept Short", url: "https://www.youtube.com/shorts/ApRwKrXGppc" },
    { id: 3, title: "AI Commercial Ad Reel // Multi-Shot", url: "https://www.youtube.com/shorts/Ym0ORXsEi1c" },
    { id: 4, title: "Chayam // Commercial Production Short", url: "https://www.youtube.com/shorts/A3sLMPTHW_E" }
  ],
  commercialDesigns: [
    {
      id: 1,
      title: "Chayam Advertising & Events — Flex, 3D LED & Printing",
      category: "Print & Commercial Production",
      description: "High-impact flex printing, vinyl wraps, 3D LED signage, and brand installations.",
      image: "/designs/design1.jpg",
      badge: "Print Production",
      aspect: "3:4"
    },
    {
      id: 2,
      title: "Auditorium Grand Opening Launch — Mukkam Calicut",
      category: "Event & Commercial Signage",
      description: "Velvet unveil campaign, 3D architectural lighting, and opening announcement poster.",
      image: "/designs/design2.jpg",
      badge: "Brand Launch",
      aspect: "3:4"
    },
    {
      id: 3,
      title: "Para Parakkum Chayam — 3D Rocket Commercial Sign",
      category: "3D Signage & Visual Identity",
      description: "Dynamic 3D illuminated rocket exhaust signage with stadium floodlights.",
      image: "/designs/design3.jpg",
      badge: "3D Signage",
      aspect: "3:4"
    },
    {
      id: 4,
      title: "Vijayadashami Greetings — Chayam Festival Campaign",
      category: "Cultural & Festival Campaign",
      description: "Traditional Malayalam calligraphy, floral arrangements, brass lamp, and veena.",
      image: "/designs/design4.jpg",
      badge: "Festival Campaign",
      aspect: "3:4"
    }
  ],
  webProjects: [
    {
      id: 1,
      title: "Chayam Advertising Agency Portal",
      client: "Chayam Advertising & Media Agency",
      goal: "Brand authority showcase and high-conversion client enquiry funnel.",
      description: "Designed and engineered the full-stack web presence for Chayam Advertising, integrating interactive project galleries, brand credentials, and direct lead capture funnels.",
      techStack: ["Next.js", "Tailwind CSS", "TypeScript", "Lovable"],
      url: "https://chayamadvertising.com",
      previewImage: "/designs/design1.jpg",
      badge: "Agency Web Portal",
      results: "Sub-second load speeds & direct WhatsApp client qualification"
    },
    {
      id: 2,
      title: "AI Commercial Director 3D Studio",
      client: "Director Portfolio & Real-time Video CMS",
      goal: "Zero-gravity interactive 3D studio portfolio with custom video management.",
      description: "Built high-performance 3D portfolio featuring real-time video database CRUD, client-side canvas compression, and 60fps GPU-composited keyframe animations.",
      techStack: ["Next.js 14", "Framer Motion", "TypeScript", "Tailwind"],
      url: "https://jubu-protoflio.vercel.app",
      previewImage: "/designs/design2.jpg",
      badge: "3D Studio & CMS",
      results: "150+ video commercial showcase with on-the-spot admin uploads"
    },
    {
      id: 3,
      title: "Mukkam Regional Campaign Lead Funnel",
      client: "Kerala Regional Brand Campaign",
      goal: "High-CTR mobile landing page designed to convert targeted Meta Ads traffic.",
      description: "Developed conversion-focused landing page paired with Facebook/Instagram video ads, featuring localized Malayalam messaging and frictionless one-tap WhatsApp chat onboarding.",
      techStack: ["Python", "Bolt.new", "Tailwind CSS", "WhatsApp API"],
      url: "https://chayamadvertising.com",
      previewImage: "/designs/design3.jpg",
      badge: "Meta Ads Funnel",
      results: "342K+ Reach campaign funnel with lowest cost per lead"
    }
  ],
  googleDriveProjects: [
    {
      id: 1,
      title: "Commercial Ad Renders & Master Cuts",
      category: "Google Veo & Higgsfield AI",
      description: "High-resolution 4K ad cuts, multi-shot commercial sequences, and raw cinematic exports.",
      format: "4K Master .MP4 / ProRes",
      badge: "Commercial Ads"
    },
    {
      id: 2,
      title: "High-Converting Meta Ads Creative Bundles",
      category: "Meta Ads & Paid Funnels",
      description: "A/B test video creatives, Malayalam ad variations, hook testing packs, and lead generation assets.",
      format: "9:16 & 1:1 Ad Sets",
      badge: "Meta Ads"
    },
    {
      id: 3,
      title: "Client Pitch Decks & Visual Treatments",
      category: "Canva & Google Slides",
      description: "Full commercial treatment presentations, visual storyboards, and client strategy decks.",
      format: "Pitch Decks (.PDF / Slides)",
      badge: "Pitch Kits"
    },
    {
      id: 4,
      title: "Multi-Shot Script Bibles & Prompt Blueprints",
      category: "Prompt Engineering & VO Sync",
      description: "Base-image anchor blueprints, character seed consistency logs, and audio-synced Malayalam scripts.",
      format: "Prompt Guides & Docs",
      badge: "Prompts & Scripts"
    }
  ]
};
