// ====================================================================
// 1. QUICK-EDIT LINKS & ASSETS CONFIG (TOP OF CODE)
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

export interface PortfolioConfigType {
  name: string;
  role: string;
  whatsappUrl: string;
  phone: string;
  email: string;
  location: string;
  cvDownloadUrl: string;
  googleDriveUrl: string; // Direct link to open Google Drive Folder
  photos: {
    hero: string;
    services: string;
    workflow: string;
  };
  instagramProfileUrl: string;
  youtubeChannelUrl: string;
  linkedinProfileUrl: string;
  instagramReels: ReelItem[];
  youtubeShorts: ReelItem[]; // 4 Vertical 9:16 Shorts
  youtubeVideos: VideoItem[]; // Backwards compatibility
  commercialDesigns: CommercialDesignItem[]; // 4 3:4 Poster Designs
  googleDriveProjects: DriveProjectItem[];
}

export const ADMIN_CREDENTIALS = {
  username: "jubu41",
  password: "5445",
};

export const PORTFOLIO_CONFIG: PortfolioConfigType = {
  name: "MUHAMMED JUBAIR T",
  role: "AI Video Producer | Digital Marketing & Meta Ads Specialist | Prompt Engineer",
  whatsappUrl: "https://wa.me/918129418544?text=Hi%20Muhammed%20Jubair%2C%20I%20saw%20your%20portfolio%20and%20want%20to%20discuss%20a%20project.",
  phone: "+91 8129418544",
  email: "jubujubair257@gmail.com",
  location: "Kerala, India",
  cvDownloadUrl: "/Muhammed_Jubair_T_CV.pdf",
  googleDriveUrl: "https://drive.google.com/drive/home",
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
      title: "Cinematic AI Short",
      url: "PASTE_SHORTS_LINK_1",
      thumbnail: "/shorts/short1.jpg"
    },
    {
      id: 2,
      title: "Director Prompt Breakdown",
      url: "PASTE_SHORTS_LINK_2",
      thumbnail: "/shorts/short2.jpg"
    },
    {
      id: 3,
      title: "Meta Ads Hook Testing",
      url: "PASTE_SHORTS_LINK_3",
      thumbnail: "/shorts/short3.jpg"
    },
    {
      id: 4,
      title: "Multilingual VO Sync",
      url: "PASTE_SHORTS_LINK_4",
      thumbnail: "/shorts/short4.jpg"
    }
  ],
  youtubeVideos: [
    { id: 1, title: "AI Video Showreel", url: "PASTE_YOUTUBE_LINK_1" },
    { id: 2, title: "Multi-Shot Ad Breakdown", url: "PASTE_YOUTUBE_LINK_2" },
    { id: 3, title: "Meta Ads Video Funnel", url: "PASTE_YOUTUBE_LINK_3" },
    { id: 4, title: "Multilingual Commercial", url: "PASTE_YOUTUBE_LINK_4" }
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
