'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_CONFIG, ADMIN_CREDENTIALS, ReelItem, CommercialDesignItem } from '@/config/portfolio.config';
import { parseYouTubeUrl, parseInstagramUrl } from '@/utils/mediaParser';
import {
  Play,
  Instagram,
  Youtube,
  ArrowUpRight,
  Lock,
  Unlock,
  X,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Volume2,
  Upload,
  Video,
  FileCheck,
  Loader2,
  Share2,
  KeyRound,
  ShieldCheck,
  Eye,
  EyeOff,
  AlertTriangle,
  User,
  LogOut,
  Trash2,
  Plus,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const STORAGE_KEY = 'mjt_media_showcase_v1';

/**
 * Compresses an image file on the client side before upload.
 * Reduces 5-15MB high-res phone/camera photos down to ~150-250KB,
 * fitting comfortably under Vercel's 4.5MB serverless payload limit.
 */
async function compressImage(
  file: File,
  maxDimension = 1600,
  quality = 0.82
): Promise<{ blob: Blob; dataUrl: string; name: string }> {
  if (typeof window === 'undefined' || !file.type.startsWith('image/')) {
    return {
      blob: file,
      dataUrl: URL.createObjectURL(file),
      name: file.name,
    };
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new (window as any).Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve({ blob: file, dataUrl: (e.target?.result as string) || '', name: file.name });
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const safeName = file.name.replace(/\.[^/.]+$/, '') + '.jpg';
              resolve({ blob, dataUrl, name: safeName });
            } else {
              resolve({ blob: file, dataUrl: (e.target?.result as string) || '', name: file.name });
            }
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = () => {
        resolve({ blob: file, dataUrl: (e.target?.result as string) || '', name: file.name });
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      resolve({ blob: file, dataUrl: URL.createObjectURL(file), name: file.name });
    };
    reader.readAsDataURL(file);
  });
}

export default function FeaturedWorkSection() {
  // Active Tab: 'reels' | 'shorts' | 'designs'
  const [activeTab, setActiveTab] = useState<'reels' | 'shorts' | 'designs'>('reels');

  // Currently Playing Video ID for clean in-card playback
  const [playingReelId, setPlayingReelId] = useState<number | null>(null);
  const [playingShortId, setPlayingShortId] = useState<number | null>(null);

  // Media Config State initialized from PORTFOLIO_CONFIG
  const [instagramProfileUrl, setInstagramProfileUrl] = useState(PORTFOLIO_CONFIG.instagramProfileUrl);
  const [instagramReels, setInstagramReels] = useState<ReelItem[]>(PORTFOLIO_CONFIG.instagramReels);

  const [youtubeChannelUrl, setYoutubeChannelUrl] = useState(PORTFOLIO_CONFIG.youtubeChannelUrl);
  const [youtubeShorts, setYoutubeShorts] = useState<ReelItem[]>(PORTFOLIO_CONFIG.youtubeShorts);

  const [googleDriveUrl, setGoogleDriveUrl] = useState(PORTFOLIO_CONFIG.googleDriveUrl);
  const [commercialDesigns, setCommercialDesigns] = useState<CommercialDesignItem[]>(PORTFOLIO_CONFIG.commercialDesigns);

  const [linkedinProfileUrl, setLinkedinProfileUrl] = useState(PORTFOLIO_CONFIG.linkedinProfileUrl || 'https://www.linkedin.com/');
  const [whatsappUrl, setWhatsappUrl] = useState(PORTFOLIO_CONFIG.whatsappUrl);

  // Admin Authentication & Panel State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authUsername, setAuthUsername] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [showAuthPassword, setShowAuthPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  const [isLocked, setIsLocked] = useState(true);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminTab, setAdminTab] = useState<'reels' | 'shorts' | 'designs' | 'platforms'>('reels');
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [visibleDesignCount, setVisibleDesignCount] = useState(4);
  const [selectedDesignPreview, setSelectedDesignPreview] = useState<CommercialDesignItem | null>(null);
  const [bulkUploading, setBulkUploading] = useState(false);
  const [bulkUploadMsg, setBulkUploadMsg] = useState('');

  // Temporary Edit Form State (synced when opening modal)
  const [editInstagramProfile, setEditInstagramProfile] = useState('');
  const [editReels, setEditReels] = useState<ReelItem[]>([]);
  const [editYoutubeChannel, setEditYoutubeChannel] = useState('');
  const [editShorts, setEditShorts] = useState<ReelItem[]>([]);
  const [editGoogleDrive, setEditGoogleDrive] = useState('');
  const [editDesigns, setEditDesigns] = useState<CommercialDesignItem[]>([]);
  const [editLinkedin, setEditLinkedin] = useState('');
  const [editWhatsapp, setEditWhatsapp] = useState('');

  // Hidden File Inputs Refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check admin session auth
  useEffect(() => {
    try {
      if (sessionStorage.getItem('mjt_admin_auth') === 'true') {
        setIsAuthenticated(true);
      }
    } catch {}
  }, []);

  // Load persisted config from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.instagramProfileUrl && parsed.instagramProfileUrl !== 'https://www.instagram.com/') {
          setInstagramProfileUrl(parsed.instagramProfileUrl);
        } else {
          setInstagramProfileUrl(PORTFOLIO_CONFIG.instagramProfileUrl);
        }
        if (Array.isArray(parsed.instagramReels) && parsed.instagramReels.length === 4) {
          const sanitizedReels = parsed.instagramReels.map((item: any, idx: number) => {
            let cleanUrl = item.url || '';
            if (cleanUrl.endsWith('.mov')) {
              cleanUrl = cleanUrl.replace(/\.mov$/i, '.mp4');
            }
            if (!cleanUrl || cleanUrl.includes('PASTE_REEL_LINK')) {
              cleanUrl = PORTFOLIO_CONFIG.instagramReels[idx].url;
            }
            return {
              ...item,
              url: cleanUrl,
              thumbnail: `/reels/reel${idx + 1}.jpg`
            };
          });
          setInstagramReels(sanitizedReels);
        } else {
          setInstagramReels(PORTFOLIO_CONFIG.instagramReels);
        }
        if (parsed.youtubeChannelUrl && parsed.youtubeChannelUrl !== 'https://www.youtube.com/') {
          setYoutubeChannelUrl(parsed.youtubeChannelUrl);
        } else {
          setYoutubeChannelUrl(PORTFOLIO_CONFIG.youtubeChannelUrl);
        }
        if (Array.isArray(parsed.youtubeShorts) && parsed.youtubeShorts.length === 4) {
          const sanitizedShorts = parsed.youtubeShorts.map((item: any, idx: number) => {
            let cleanUrl = item.url || '';
            if (cleanUrl.endsWith('.mov')) {
              cleanUrl = cleanUrl.replace(/\.mov$/i, '.mp4');
            }
            // If previously erroneously saved as MP4 or placeholder, restore proper YouTube link
            if (!cleanUrl || cleanUrl.includes('PASTE_SHORTS_LINK') || cleanUrl.startsWith('/videos/')) {
              cleanUrl = PORTFOLIO_CONFIG.youtubeShorts[idx]?.url;
            }
            const p = parseYouTubeUrl(cleanUrl);
            return {
              ...item,
              title: item.title && !item.title.startsWith('AI Commercial Short') ? item.title : PORTFOLIO_CONFIG.youtubeShorts[idx].title,
              url: cleanUrl,
              thumbnail: p.isValid && p.thumbnailUrl ? p.thumbnailUrl : (PORTFOLIO_CONFIG.youtubeShorts[idx]?.thumbnail || `/shorts/short${idx + 1}.jpg`)
            };
          });
          setYoutubeShorts(sanitizedShorts);
        } else {
          setYoutubeShorts(PORTFOLIO_CONFIG.youtubeShorts);
        }
        if (parsed.googleDriveUrl && parsed.googleDriveUrl !== 'https://drive.google.com/') {
          setGoogleDriveUrl(parsed.googleDriveUrl);
        } else {
          setGoogleDriveUrl(PORTFOLIO_CONFIG.googleDriveUrl);
        }
        if (Array.isArray(parsed.commercialDesigns) && parsed.commercialDesigns.length > 0) setCommercialDesigns(parsed.commercialDesigns);
        if (parsed.linkedinProfileUrl && parsed.linkedinProfileUrl !== 'https://www.linkedin.com/') {
          setLinkedinProfileUrl(parsed.linkedinProfileUrl);
        } else {
          setLinkedinProfileUrl(PORTFOLIO_CONFIG.linkedinProfileUrl);
        }
        if (parsed.whatsappUrl) setWhatsappUrl(parsed.whatsappUrl);
      }
    } catch {
      // fallback to defaults silently
    }
  }, []);

  // Open Admin Edit Modal (Protected by jubu41:5445)
  const handleOpenAdmin = () => {
    if (!isAuthenticated) {
      setAuthUsername('');
      setAuthPassword('');
      setAuthError('');
      setShowAuthModal(true);
      return;
    }
    setEditInstagramProfile(instagramProfileUrl);
    setEditReels(JSON.parse(JSON.stringify(instagramReels)));
    setEditYoutubeChannel(youtubeChannelUrl);
    setEditShorts(JSON.parse(JSON.stringify(youtubeShorts)));
    setEditGoogleDrive(googleDriveUrl);
    setEditDesigns(JSON.parse(JSON.stringify(commercialDesigns)));
    setEditLinkedin(linkedinProfileUrl);
    setEditWhatsapp(whatsappUrl);
    setIsLocked(false);
    setShowAdminModal(true);
  };

  // Submit Admin Login Form
  const handleAuthSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (authUsername.trim() === ADMIN_CREDENTIALS.username && authPassword === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      setAuthError('');
      try {
        sessionStorage.setItem('mjt_admin_auth', 'true');
      } catch {}
      setShowAuthModal(false);

      setEditInstagramProfile(instagramProfileUrl);
      setEditReels(JSON.parse(JSON.stringify(instagramReels)));
      setEditYoutubeChannel(youtubeChannelUrl);
      setEditShorts(JSON.parse(JSON.stringify(youtubeShorts)));
      setEditGoogleDrive(googleDriveUrl);
      setEditDesigns(JSON.parse(JSON.stringify(commercialDesigns)));
      setEditLinkedin(linkedinProfileUrl);
      setEditWhatsapp(whatsappUrl);
      setIsLocked(false);
      setShowAdminModal(true);
    } else {
      setAuthError('Invalid username or password. Please verify your credentials and try again.');
    }
  };

  // Logout / Relock Admin
  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsLocked(true);
    setShowAdminModal(false);
    setShowAuthModal(false);
    try {
      sessionStorage.removeItem('mjt_admin_auth');
    } catch {}
  };

  // Save All Changes & Lock
  const handleSaveAndLock = () => {
    setInstagramProfileUrl(editInstagramProfile);
    setInstagramReels(editReels);
    setYoutubeChannelUrl(editYoutubeChannel);
    setYoutubeShorts(editShorts);
    setGoogleDriveUrl(editGoogleDrive);
    setCommercialDesigns(editDesigns);
    setLinkedinProfileUrl(editLinkedin);
    setWhatsappUrl(editWhatsapp);

    const payload = {
      instagramProfileUrl: editInstagramProfile,
      instagramReels: editReels,
      youtubeChannelUrl: editYoutubeChannel,
      youtubeShorts: editShorts,
      googleDriveUrl: editGoogleDrive,
      commercialDesigns: editDesigns,
      linkedinProfileUrl: editLinkedin,
      whatsappUrl: editWhatsapp
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      window.dispatchEvent(new Event('mjt_config_updated'));
    } catch {
      // LocalStorage not available
    }

    setIsLocked(true);
    setShowAdminModal(false);
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 4000);
  };

  // Bulk Upload Multiple Commercial Designs (up to 10 files) with client compression & resilient fallback
  const handleBulkDesignUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files).slice(0, 10);
    setBulkUploading(true);
    setBulkUploadMsg(`Processing ${fileList.length} image(s)...`);

    try {
      let currentMaxId = editDesigns.length > 0 ? Math.max(...editDesigns.map((d) => d.id)) : 0;
      const newlyAddedDesigns: CommercialDesignItem[] = [];

      // Process and upload each file individually to ensure instant transfer and stay far below Vercel's payload limit
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        setBulkUploadMsg(`Optimizing & uploading (${i + 1}/${fileList.length}): ${file.name.substring(0, 20)}...`);

        // Client-side instant compression (down to ~150KB)
        const compressed = await compressImage(file, 1600, 0.82);
        let finalUrl = compressed.dataUrl; // Fallback so images are never lost

        try {
          const formData = new FormData();
          formData.append('type', 'image');
          formData.append('file', compressed.blob, compressed.name);

          const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          if (res.ok) {
            try {
              const data = await res.json();
              if (data && data.success && data.url) {
                finalUrl = data.url;
              }
            } catch {
              // Non-JSON response, safely keep compressed dataUrl
            }
          }
        } catch (netErr) {
          console.warn('Network upload notice, using persistent preview:', netErr);
        }

        currentMaxId += 1;
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
        newlyAddedDesigns.push({
          id: currentMaxId,
          title: cleanName || `Commercial Poster 0${currentMaxId}`,
          category: 'Commercial Production',
          description: 'High-impact advertising & commercial visual asset',
          image: finalUrl,
          badge: 'Design Asset',
          aspect: '3:4',
        });
      }

      setEditDesigns((prev) => [...prev, ...newlyAddedDesigns]);
      setBulkUploadMsg(`✓ Successfully added ${newlyAddedDesigns.length} design(s)! Click "Save & Lock Changes" below to apply.`);
    } catch (err: any) {
      console.error('Bulk upload error:', err);
      setBulkUploadMsg('');
    } finally {
      setBulkUploading(false);
      e.target.value = '';
    }
  };

  const handleDeleteDesign = (id: number) => {
    if (editDesigns.length <= 1) {
      alert('At least 1 design must remain in the showcase.');
      return;
    }
    setEditDesigns((prev) => prev.filter((d) => d.id !== id));
  };

  const handleAddNewDesign = () => {
    const nextId = editDesigns.length > 0 ? Math.max(...editDesigns.map((d) => d.id)) + 1 : 1;
    setEditDesigns((prev) => [
      ...prev,
      {
        id: nextId,
        title: `Commercial Design 0${nextId}`,
        category: 'Commercial Production',
        description: 'High-impact advertising & commercial visual asset',
        image: '/designs/design1.jpg',
        badge: 'Design Asset',
        aspect: '3:4',
      },
    ]);
  };

  // Direct Video & File Upload Handler
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'reel' | 'short' | 'design',
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const key = `${target}-${index}`;
    setUploadingKey(key);

    try {
      let fileToSend: Blob = file;
      let fileName: string = file.name;
      let finalUrl = '';

      if (target === 'design') {
        const compressed = await compressImage(file, 1600, 0.82);
        fileToSend = compressed.blob;
        fileName = compressed.name;
        finalUrl = compressed.dataUrl;
      }

      const formData = new FormData();
      formData.append('file', fileToSend, fileName);
      formData.append('type', target === 'design' ? 'image' : 'video');

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (res.ok) {
          try {
            const data = await res.json();
            if (data && data.success && data.url) {
              finalUrl = data.url;
            }
          } catch {
            // Keep fallback
          }
        }
      } catch (err) {
        console.warn('Upload endpoint notice:', err);
      }

      if (finalUrl) {
        if (target === 'reel') {
          const copy = [...editReels];
          copy[index].url = finalUrl;
          setEditReels(copy);
        } else if (target === 'short') {
          const copy = [...editShorts];
          copy[index].url = finalUrl;
          setEditShorts(copy);
        } else if (target === 'design') {
          const copy = [...editDesigns];
          copy[index].image = finalUrl;
          setEditDesigns(copy);
        }
      }
    } catch (err: any) {
      alert('Upload notice: ' + (err?.message || 'Processing file'));
    } finally {
      setUploadingKey(null);
      e.target.value = '';
    }
  };

  // Reset to Default Config
  const handleResetToDefaults = () => {
    if (confirm('Reset all links, videos, and platforms back to default configuration?')) {
      localStorage.removeItem(STORAGE_KEY);
      setInstagramProfileUrl(PORTFOLIO_CONFIG.instagramProfileUrl);
      setInstagramReels(PORTFOLIO_CONFIG.instagramReels);
      setYoutubeChannelUrl(PORTFOLIO_CONFIG.youtubeChannelUrl);
      setYoutubeShorts(PORTFOLIO_CONFIG.youtubeShorts);
      setGoogleDriveUrl(PORTFOLIO_CONFIG.googleDriveUrl);
      setCommercialDesigns(PORTFOLIO_CONFIG.commercialDesigns);
      setLinkedinProfileUrl(PORTFOLIO_CONFIG.linkedinProfileUrl || 'https://www.linkedin.com/');
      setWhatsappUrl(PORTFOLIO_CONFIG.whatsappUrl);
      setShowAdminModal(false);
      setIsLocked(true);
      setSaveSuccessNotice(true);
      setTimeout(() => setSaveSuccessNotice(false), 3000);
    }
  };

  return (
    <section id="work" className="relative w-full bg-[#08080A] py-16 sm:py-24 border-t border-b border-white/5 select-none overflow-hidden">
      
      {/* Background Subtle Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-grid-subtle opacity-15" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-crimson/[0.04] rounded-full blur-[80px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================================================================
            HEADER & ADMIN LOCK CONTROL
            ================================================================ */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-crimson" />
              <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-crimson uppercase">
                FEATURED WORK // MULTIMEDIA ARCHIVE
              </span>
              <div className="h-px flex-1 max-w-[120px] bg-white/10" />
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white uppercase">
              COMMERCIAL SHOWCASE &amp; DESIGNS
            </h2>

            <p className="text-xs sm:text-sm text-metallic max-w-2xl leading-relaxed">
              Curated director-level AI video reels, YouTube shorts, and commercial design assets. Responsive across all devices.
            </p>
          </motion.div>

          {/* Admin Lock / Edit Control Button (Protected) */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            {saveSuccessNotice && (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Saved &amp; Locked</span>
              </span>
            )}

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleOpenAdmin}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-semibold tracking-wide transition-all duration-200 shadow-sm"
                  title="Admin Logged In - Click to Edit Showcase"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Admin: Logged In (jubu41)</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 text-xs font-mono transition-all"
                  title="Lock & Logout Admin"
                >
                  <Lock className="w-3.5 h-3.5 text-crimson" />
                  <span>Lock</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleOpenAdmin}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111115] hover:bg-black text-white/90 hover:text-white border border-white/10 hover:border-crimson/50 text-xs font-mono font-medium tracking-wide transition-all duration-200 group shadow-sm"
                title="Admin Authentication Required (jubu41)"
              >
                <Lock className="w-3.5 h-3.5 text-crimson group-hover:scale-110 transition-transform" />
                <span>Admin: Locked [Edit &amp; Upload]</span>
              </button>
            )}
          </div>
        </div>

        {/* ================================================================
            UNIFIED MEDIA CONTAINER
            ================================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-[#0E0E12] border border-white/10 p-4 sm:p-6 lg:p-8 shadow-2xl relative"
        >
          
          {/* Top Category Tabs Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 sm:pb-8 mb-6 sm:mb-8 border-b border-white/10">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
              
              {/* Tab 1: Instagram Reels (9:16) */}
              <button
                onClick={() => {
                  setActiveTab('reels');
                  setPlayingShortId(null);
                }}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 ${
                  activeTab === 'reels'
                    ? 'bg-crimson text-white shadow-crimson-subtle scale-[1.02]'
                    : 'bg-[#16161C] text-metallic hover:text-white hover:bg-white/5 border border-white/5'
                }`}
              >
                <Instagram className="w-4 h-4 shrink-0" />
                <span>Instagram Reels (9:16)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/30">
                  4
                </span>
              </button>

              {/* Tab 2: YouTube Shorts (9:16) */}
              <button
                onClick={() => {
                  setActiveTab('shorts');
                  setPlayingReelId(null);
                }}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 ${
                  activeTab === 'shorts'
                    ? 'bg-crimson text-white shadow-crimson-subtle scale-[1.02]'
                    : 'bg-[#16161C] text-metallic hover:text-white hover:bg-white/5 border border-white/5'
                }`}
              >
                <Youtube className="w-4 h-4 shrink-0" />
                <span>YouTube Shorts (9:16)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/30">
                  4
                </span>
              </button>

              {/* Tab 3: Commercial Designs (3:4) */}
              <button
                onClick={() => {
                  setActiveTab('designs');
                  setPlayingReelId(null);
                  setPlayingShortId(null);
                }}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 ${
                  activeTab === 'designs'
                    ? 'bg-crimson text-white shadow-crimson-subtle scale-[1.02]'
                    : 'bg-[#16161C] text-metallic hover:text-white hover:bg-white/5 border border-white/5'
                }`}
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Commercial Designs (3:4)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/30">
                  4
                </span>
              </button>

            </div>

            {/* Quick Status / Format Badge */}
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-metallic">
              <span>FORMAT:</span>
              <span className="text-crimson font-bold uppercase">
                {activeTab === 'reels' && '9:16 Vertical Reel'}
                {activeTab === 'shorts' && '9:16 Portrait Short'}
                {activeTab === 'designs' && '3:4 Commercial Poster'}
              </span>
            </div>
          </div>

          {/* ================================================================
              VIEW 1: INSTAGRAM REELS (DIRECT VIDEO + REEL PLAYER - NO BOTTOM BUTTONS)
              ================================================================ */}
          {activeTab === 'reels' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-crimson/15 border border-crimson/30 flex items-center justify-center text-crimson shrink-0">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-white">
                      Instagram AI Video Reels (Vertical 9:16)
                    </h3>
                    <p className="text-xs text-metallic">
                      Direct video playback with zero comment clutter, profile prompts, or like icons.
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-crimson px-3 py-1 rounded-full bg-crimson/10 border border-crimson/25 self-start sm:self-auto">
                  Aspect 9:16 //
                </span>
              </div>

              {/* 4 Vertical Reels Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {instagramReels.map((reel) => {
                  const parsed = parseInstagramUrl(reel.url);
                  const isDirect = parsed.isDirectVideo || reel.url.startsWith('/videos/') || reel.url.endsWith('.mp4');
                  const isPlaying = playingReelId === reel.id;
                  const posterImg = reel.thumbnail || `/reels/reel${reel.id}.jpg`;

                  return (
                    <div
                      key={reel.id}
                      className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-[#121217] border border-white/10 hover:border-crimson/60 hover:shadow-[0_12px_35px_rgba(220,38,38,0.22)] transition-all duration-300 group flex flex-col justify-between"
                    >
                      {/* Active Playing Mode */}
                      {isPlaying ? (
                        <div className="relative w-full h-full bg-black rounded-2xl overflow-hidden">
                          {/* Close Player Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setPlayingReelId(null);
                            }}
                            className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/85 hover:bg-black text-white hover:text-crimson border border-white/20 transition-all shadow-lg"
                            title="Close Player"
                          >
                            <X className="w-4 h-4" />
                          </button>

                          {/* 1. Direct Uploaded Video */}
                          {isDirect ? (
                            <video
                              src={reel.url}
                              controls
                              autoPlay
                              playsInline
                              loop
                              className="w-full h-full object-cover rounded-2xl"
                            />
                          ) : parsed.isValid && parsed.embedUrl ? (
                            /* 2. Embedded Instagram Reel - Cropping off bottom 'View profile' & comments */
                            <div className="relative w-full h-full overflow-hidden rounded-2xl bg-black">
                              <iframe
                                src={parsed.embedUrl}
                                className="w-full h-[126%] -translate-y-[10%] border-0"
                                scrolling="no"
                                style={{ overflow: 'hidden' }}
                                allow="autoplay; encrypted-media; picture-in-picture"
                                allowFullScreen
                                title={reel.title}
                              />
                            </div>
                          ) : (
                            <video
                              src={`/videos/reel${reel.id}.mp4`}
                              controls
                              autoPlay
                              playsInline
                              loop
                              className="w-full h-full object-cover rounded-2xl"
                            />
                          )}
                        </div>
                      ) : (
                        /* Front Face: Pure Video Starting Frame Visual with Sleek Play Button (NO TEXT CLUTTER) */
                        <div
                          onClick={() => {
                            setPlayingReelId(reel.id);
                          }}
                          className="h-full w-full relative flex flex-col justify-between p-4 cursor-pointer overflow-hidden rounded-2xl group/card"
                        >
                          {/* Background: Exact Video Starting Frame */}
                          <div className="absolute inset-0 z-0">
                            <Image
                              src={posterImg}
                              alt={reel.title}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                              className="object-cover group-hover/card:scale-105 transition-transform duration-500 opacity-100"
                              priority={reel.id <= 2}
                            />
                            {/* Subtle dark vignette on hover only */}
                            <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
                          </div>

                          {/* Top: Minimal Clean Reel Badge */}
                          <div className="relative z-10 flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-black/75 text-white border border-white/20 backdrop-blur-md shadow-md">
                              <Instagram className="w-3 h-3 text-crimson" />
                              <span>Reel 0{reel.id}</span>
                            </span>
                            {isDirect && (
                              <span className="text-[9px] font-mono text-emerald-400 px-2 py-0.5 rounded-full bg-black/75 border border-emerald-500/30 backdrop-blur-md font-semibold">
                                9:16 HD
                              </span>
                            )}
                          </div>

                          {/* Center: Frosted Glass Play Button (clean, no text covering video) */}
                          <div className="relative z-10 self-center my-auto">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/60 hover:bg-crimson border border-white/30 hover:border-crimson text-white flex items-center justify-center group-hover/card:scale-115 group-hover/card:bg-crimson group-hover/card:border-crimson group-hover/card:shadow-[0_0_30px_rgba(220,38,38,0.7)] backdrop-blur-md transition-all duration-300 shadow-xl">
                              <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-0.5" />
                            </div>
                          </div>

                          {/* Bottom: Subtle gradient strip without blocking text */}
                          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-white/80">
                            <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] border border-white/10 font-semibold tracking-wider">
                              TAP TO PLAY
                            </span>
                            <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] border border-white/10 text-crimson font-bold">
                              AI VIDEO
                            </span>
                          </div>

                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* WATCH MORE REELS ON INSTAGRAM BUTTON */}
              <div className="pt-4 sm:pt-6 flex flex-col items-center justify-center gap-2.5">
                <a
                  href={instagramProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-crimson hover:bg-crimson-bright text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] shadow-crimson-subtle group text-center"
                >
                  <Instagram className="w-4 h-4 shrink-0" />
                  <span>Watch More Reels on Instagram</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <span className="text-[11px] font-mono text-metallic text-center">
                  Opens official Instagram profile with complete reel campaigns
                </span>
              </div>
            </div>
          )}

          {/* ================================================================
              VIEW 2: YOUTUBE SHORTS (DIRECT VIDEO + SHORTS PLAYER - NO BOTTOM BUTTONS)
              ================================================================ */}
          {activeTab === 'shorts' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-crimson/15 border border-crimson/30 flex items-center justify-center text-crimson shrink-0">
                    <Youtube className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-white">
                      YouTube Shorts (Vertical 9:16)
                    </h3>
                    <p className="text-xs text-metallic">
                      Portrait cinematic AI shorts, prompt breakdowns, and multi-shot campaign tests.
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-crimson px-3 py-1 rounded-full bg-crimson/10 border border-crimson/25 self-start sm:self-auto">
                  Shorts 9:16 //
                </span>
              </div>

              {/* 4 Vertical YouTube Shorts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {youtubeShorts.map((short) => {
                  const parsed = parseYouTubeUrl(short.url);
                  const isDirect = parsed.isDirectVideo || short.url.startsWith('/videos/') || short.url.endsWith('.mp4');
                  const isPlaying = playingShortId === short.id;
                  const posterImg = (parsed.isValid && parsed.thumbnailUrl)
                    ? parsed.thumbnailUrl
                    : (short.thumbnail || `/shorts/short${short.id}.jpg`);

                  return (
                    <div
                      key={short.id}
                      className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-[#121217] border border-white/10 hover:border-crimson/60 hover:shadow-[0_12px_35px_rgba(220,38,38,0.22)] transition-all duration-300 group flex flex-col justify-between"
                    >
                      {isPlaying ? (
                        <div className="relative w-full h-full bg-black rounded-2xl overflow-hidden">
                          {/* Close Player Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setPlayingShortId(null);
                            }}
                            className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/85 hover:bg-black text-white hover:text-crimson border border-white/20 transition-all shadow-lg"
                            title="Close Video Player"
                          >
                            <X className="w-4 h-4" />
                          </button>

                          {/* YouTube Shorts Embed Player (Always plays YouTube Link) */}
                          {parsed.isValid && parsed.embedUrl ? (
                            <iframe
                              src={parsed.embedUrl}
                              className="w-full h-full border-0 rounded-2xl"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title={short.title}
                            />
                          ) : (
                            <iframe
                              src={`https://www.youtube-nocookie.com/embed/${parseYouTubeUrl(PORTFOLIO_CONFIG.youtubeShorts[short.id - 1]?.url).id || 'jVeBJNeT8_E'}?autoplay=1&controls=1&modestbranding=1&rel=0&playsinline=1&loop=1`}
                              className="w-full h-full border-0 rounded-2xl"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title={short.title}
                            />
                          )}
                        </div>
                      ) : (
                        /* Front Face: Exact Short Video Preview with Dedicated Template Visual */
                        <div
                          onClick={() => {
                            setPlayingShortId(short.id);
                          }}
                          className="h-full w-full relative flex flex-col justify-between p-4 cursor-pointer overflow-hidden rounded-2xl"
                        >
                          {/* Video Thumbnail Visual */}
                          <div className="absolute inset-0 z-0">
                            <Image
                              src={posterImg}
                              alt={short.title}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/60 pointer-events-none" />
                          </div>

                          {/* Top: YouTube Short Badge */}
                          <div className="relative z-10 flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-black/80 text-white border border-white/15 backdrop-blur-md">
                              <Youtube className="w-3 h-3 text-crimson" />
                              <span>Short 0{short.id}</span>
                            </span>
                            <span className="text-[9px] font-mono text-crimson px-2 py-0.5 rounded-full bg-crimson/15 border border-crimson/25 backdrop-blur-md font-semibold">
                              YouTube Short
                            </span>
                          </div>

                          {/* Center: Glowing Pulse Play Button */}
                          <div className="relative z-10 self-center flex flex-col items-center gap-2 my-auto">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-crimson/90 border-2 border-white/30 flex items-center justify-center text-white group-hover:bg-crimson group-hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                              <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-0.5" />
                            </div>
                            <span className="text-[11px] font-mono text-white/90 bg-black/60 px-3 py-1 rounded-full backdrop-blur-md font-medium tracking-wide">
                              Tap to Play Short
                            </span>
                          </div>

                          {/* Bottom: Video Title (Clean, NO comments or bottom profile chrome) */}
                          <div className="relative z-10 pt-2 border-t border-white/10 space-y-1">
                            <span className="text-[10px] font-mono text-crimson block font-bold">
                              YOUTUBE SHORT //
                            </span>
                            <h4 className="font-display font-bold text-sm text-white group-hover:text-crimson-bright transition-colors line-clamp-2">
                              {short.title}
                            </h4>
                          </div>

                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* WATCH MORE SHORTS ON YOUTUBE BUTTON */}
              <div className="pt-4 sm:pt-6 flex flex-col items-center justify-center gap-2.5">
                <a
                  href={youtubeChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-crimson hover:bg-crimson-bright text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] shadow-crimson-subtle group text-center"
                >
                  <Youtube className="w-4 h-4 shrink-0" />
                  <span>Watch More Shorts on YouTube</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <span className="text-[11px] font-mono text-metallic text-center">
                  Opens official YouTube channel with all shorts &amp; long-form cinematic breakdowns
                </span>
              </div>
            </div>
          )}

          {/* ================================================================
              VIEW 3: COMMERCIAL DESIGNS (CLEAN 3:4 ARTWORK - CLICK TO PREVIEW)
              ================================================================ */}
          {activeTab === 'designs' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-crimson/15 border border-crimson/30 flex items-center justify-center text-crimson shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-white">
                      Commercial Advertising Designs (3:4 Poster Ratio)
                    </h3>
                    <p className="text-xs text-metallic">
                      Master ad treatments, brand visual suites, and client posters. Click any design to inspect in full resolution.
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-crimson px-3.5 py-1 rounded-full bg-crimson/10 border border-crimson/25 self-start sm:self-auto font-bold">
                  Pure 3:4 Gallery // {commercialDesigns.length} Works
                </span>
              </div>

              {/* Poster Designs in 3:4 Aspect Ratio Grid (4 per row) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {commercialDesigns.slice(0, visibleDesignCount).map((design) => (
                  <div
                    key={design.id}
                    onClick={() => setSelectedDesignPreview(design)}
                    className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#121217] border border-white/10 hover:border-crimson hover:shadow-[0_12px_35px_rgba(220,38,38,0.3)] transition-all duration-300 group hover:-translate-y-1.5 cursor-pointer block"
                    title={`${design.title || `Commercial Design 0${design.id}`} • Click to view full preview`}
                  >
                    {/* Pure High-Resolution 3:4 Image */}
                    <Image
                      src={design.image}
                      alt={design.title || `Commercial Design 0${design.id}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-500 rounded-2xl"
                      priority={design.id <= 4}
                    />

                    {/* Subtle hover crimson tint and view prompt */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end rounded-2xl pointer-events-none">
                      <span className="text-white text-xs font-bold line-clamp-2 drop-shadow">
                        {design.title}
                      </span>
                      <span className="text-crimson-bright text-[10px] font-mono font-bold mt-1.5 flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Fullscreen</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* WATCH MORE DESIGNS BUTTON (EXPANDS 4 BY 4 DOWNWARDS) */}
              {commercialDesigns.length > 4 && (
                <div className="pt-4 sm:pt-6 flex flex-col items-center justify-center gap-3">
                  {visibleDesignCount < commercialDesigns.length ? (
                    <button
                      onClick={() => setVisibleDesignCount((prev) => Math.min(prev + 4, commercialDesigns.length))}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-crimson hover:bg-crimson-bright text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.03] shadow-[0_0_35px_rgba(220,38,38,0.35)] group"
                    >
                      <span>Watch More Designs ({commercialDesigns.length - visibleDesignCount} More)</span>
                      <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setVisibleDesignCount(4)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3 rounded-full bg-[#16161D] hover:bg-white/10 text-metallic-light hover:text-white border border-white/10 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300"
                    >
                      <span>Show Less</span>
                      <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  )}
                  <span className="text-[11px] font-mono text-metallic text-center">
                    Showing {Math.min(visibleDesignCount, commercialDesigns.length)} of {commercialDesigns.length} commercial designs
                  </span>
                </div>
              )}
            </div>
          )}

        </motion.div>

      </div>

            {/* ================================================================
          ADMIN AUTHENTICATION MODAL (LOGIN REQUIRED)
          ================================================================ */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-md bg-[#111116] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-crimson via-crimson-bright to-orange-500" />

              {/* Close Button */}
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-crimson/20 border border-crimson/40 flex items-center justify-center text-crimson shrink-0 shadow-lg shadow-crimson/10">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      Admin Authentication
                    </h3>
                    <p className="text-xs text-metallic">
                      Enter credentials to unlock showcase editor &amp; video upload.
                    </p>
                  </div>
                </div>

                {/* Error Message */}
                {authError && (
                  <div className="p-3.5 rounded-xl bg-crimson/15 border border-crimson/30 flex items-start gap-2.5 text-xs text-red-200">
                    <AlertTriangle className="w-4 h-4 text-crimson shrink-0 mt-0.5" />
                    <span>{authError}</span>
                  </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  <div>
                    <label className="text-[11px] font-mono font-bold text-white/90 uppercase tracking-wider block mb-1.5">
                      User Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-metallic">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={authUsername}
                        onChange={(e) => {
                          setAuthUsername(e.target.value);
                          if (authError) setAuthError('');
                        }}
                        placeholder="Enter username (e.g. jubu41)"
                        autoFocus
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#16161D] border border-white/10 focus:border-crimson focus:outline-none text-white text-xs font-mono placeholder:text-metallic/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono font-bold text-white/90 uppercase tracking-wider block mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-metallic">
                        <KeyRound className="w-4 h-4" />
                      </div>
                      <input
                        type={showAuthPassword ? 'text' : 'password'}
                        value={authPassword}
                        onChange={(e) => {
                          setAuthPassword(e.target.value);
                          if (authError) setAuthError('');
                        }}
                        placeholder="Enter password (e.g. 5445)"
                        required
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#16161D] border border-white/10 focus:border-crimson focus:outline-none text-white text-xs font-mono placeholder:text-metallic/50 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowAuthPassword(!showAuthPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-metallic hover:text-white transition-colors"
                      >
                        {showAuthPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-crimson hover:bg-crimson-bright text-white text-xs font-bold uppercase tracking-wider shadow-crimson-subtle transition-all duration-200"
                    >
                      <Unlock className="w-4 h-4" />
                      <span>Verify &amp; Unlock Admin</span>
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================================================================
          ADMIN EDIT & VIDEO UPLOAD MODAL (UNLOCKABLE)
          ================================================================ */}
      <AnimatePresence>
        {showAdminModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl bg-[#111116] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 overflow-hidden"
            >
              
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-base sm:text-lg text-white">
                        Showcase Links &amp; Video Uploads
                      </h3>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 font-bold">
                        jubu41 : Verified
                      </span>
                    </div>
                    <p className="text-xs text-metallic">
                      Upload video files (.mp4), paste custom links, and manage verified social channels.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-crimson/20 border border-white/10 hover:border-crimson/40 text-white/70 hover:text-white text-xs font-mono transition-colors"
                    title="Lock & Exit Admin"
                  >
                    <LogOut className="w-3.5 h-3.5 text-crimson" />
                    <span>Lock &amp; Exit</span>
                  </button>
                  <button
                    onClick={() => setShowAdminModal(false)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                    aria-label="Close Editor"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Admin Tabs */}
              <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-white/10 pb-4">
                <button
                  onClick={() => setAdminTab('reels')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                    adminTab === 'reels'
                      ? 'bg-crimson text-white shadow-crimson-subtle'
                      : 'bg-white/5 text-metallic hover:text-white'
                  }`}
                >
                  1. Instagram Reels &amp; Upload
                </button>
                <button
                  onClick={() => setAdminTab('shorts')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                    adminTab === 'shorts'
                      ? 'bg-crimson text-white shadow-crimson-subtle'
                      : 'bg-white/5 text-metallic hover:text-white'
                  }`}
                >
                  2. YouTube Shorts &amp; Upload
                </button>
                <button
                  onClick={() => setAdminTab('designs')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                    adminTab === 'designs'
                      ? 'bg-crimson text-white shadow-crimson-subtle'
                      : 'bg-white/5 text-metallic hover:text-white'
                  }`}
                >
                  3. Commercial Designs (3:4)
                </button>
                <button
                  onClick={() => setAdminTab('platforms')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                    adminTab === 'platforms'
                      ? 'bg-crimson text-white shadow-crimson-subtle'
                      : 'bg-white/5 text-metallic hover:text-white'
                  }`}
                >
                  4. Social Platforms (LinkedIn, WhatsApp...)
                </button>
              </div>

              {/* TAB 1 EDIT: INSTAGRAM REELS & DIRECT VIDEO UPLOAD */}
              {adminTab === 'reels' && (
                <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
                  
                  {/* Master Profile Link */}
                  <div className="p-4 rounded-2xl bg-black/40 border border-crimson/30 space-y-2">
                    <label className="text-xs font-mono font-bold text-crimson uppercase block">
                      Instagram Profile URL (Watch More Reels Button)
                    </label>
                    <input
                      type="url"
                      value={editInstagramProfile}
                      onChange={(e) => setEditInstagramProfile(e.target.value)}
                      placeholder="https://www.instagram.com/your_handle/"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#16161D] border border-white/10 focus:border-crimson focus:outline-none text-white text-xs font-mono"
                    />
                    <p className="text-[11px] text-metallic">
                      This link opens when users click the &quot;Watch More Reels on Instagram&quot; button.
                    </p>
                  </div>

                  {/* 4 Reel Items with Direct Video Upload */}
                  <div className="space-y-4">
                    <span className="text-xs font-mono text-white/80 font-bold block">
                      4 Reel Items (Upload MP4 or Paste Reel URL):
                    </span>

                    {editReels.map((reel, idx) => {
                      const isUploading = uploadingKey === `reel-${idx}`;

                      return (
                        <div key={reel.id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-bold text-crimson">
                              Reel #{reel.id}
                            </span>
                            <span className="text-[10px] font-mono text-metallic">
                              Format: 9:16 Vertical Video
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="text-[11px] font-mono text-metallic block mb-1">
                                Reel Title
                              </label>
                              <input
                                type="text"
                                value={reel.title}
                                onChange={(e) => {
                                  const copy = [...editReels];
                                  copy[idx].title = e.target.value;
                                  setEditReels(copy);
                                }}
                                className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 focus:border-crimson focus:outline-none text-white text-xs font-medium"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-mono text-metallic block mb-1">
                                Video URL or File Path
                              </label>
                              <input
                                type="text"
                                value={reel.url}
                                onChange={(e) => {
                                  const copy = [...editReels];
                                  copy[idx].url = e.target.value;
                                  setEditReels(copy);
                                }}
                                placeholder="/videos/... or https://instagram.com/reel/..."
                                className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 focus:border-crimson focus:outline-none text-white text-xs font-mono"
                              />
                            </div>
                          </div>

                          {/* Direct Video File Upload Button */}
                          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/5">
                            <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-crimson/20 hover:bg-crimson text-crimson hover:text-white border border-crimson/40 text-[11px] font-mono font-bold tracking-wider uppercase transition-all duration-200">
                              {isUploading ? (
                                <>
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  <span>Uploading MP4...</span>
                                </>
                              ) : (
                                <>
                                  <Upload className="w-3.5 h-3.5" />
                                  <span>Upload Video (MP4)</span>
                                </>
                              )}
                              <input
                                type="file"
                                accept="video/mp4,video/webm,video/quicktime,video/*"
                                onChange={(e) => handleFileUpload(e, 'reel', idx)}
                                disabled={isUploading}
                                className="hidden"
                              />
                            </label>

                            {reel.url.startsWith('/videos/') && (
                              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                                <FileCheck className="w-3 h-3" />
                                <span>Uploaded file active</span>
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              )}

              {/* TAB 2 EDIT: YOUTUBE SHORTS & DIRECT VIDEO UPLOAD */}
              {adminTab === 'shorts' && (
                <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
                  
                  {/* Master Channel Link */}
                  <div className="p-4 rounded-2xl bg-black/40 border border-crimson/30 space-y-2">
                    <label className="text-xs font-mono font-bold text-crimson uppercase block">
                      YouTube Channel URL (Watch More Shorts Button)
                    </label>
                    <input
                      type="url"
                      value={editYoutubeChannel}
                      onChange={(e) => setEditYoutubeChannel(e.target.value)}
                      placeholder="https://www.youtube.com/@your_channel"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#16161D] border border-white/10 focus:border-crimson focus:outline-none text-white text-xs font-mono"
                    />
                    <p className="text-[11px] text-metallic">
                      This link opens when users click the &quot;Watch More Shorts on YouTube&quot; button.
                    </p>
                  </div>

                  {/* 4 Shorts Items with Direct Video Upload */}
                  <div className="space-y-4">
                    <span className="text-xs font-mono text-white/80 font-bold block">
                      4 YouTube Shorts Items (Upload MP4 or Paste Shorts URL):
                    </span>

                    {editShorts.map((short, idx) => {
                      const isUploading = uploadingKey === `short-${idx}`;

                      return (
                        <div key={short.id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-bold text-crimson">
                              Short #{short.id}
                            </span>
                            <span className="text-[10px] font-mono text-metallic">
                              Format: 9:16 Portrait Short
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="text-[11px] font-mono text-metallic block mb-1">
                                Short Title
                              </label>
                              <input
                                type="text"
                                value={short.title}
                                onChange={(e) => {
                                  const copy = [...editShorts];
                                  copy[idx].title = e.target.value;
                                  setEditShorts(copy);
                                }}
                                className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 focus:border-crimson focus:outline-none text-white text-xs font-medium"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-mono text-metallic block mb-1">
                                Video URL or File Path
                              </label>
                              <input
                                type="text"
                                value={short.url}
                                onChange={(e) => {
                                  const copy = [...editShorts];
                                  copy[idx].url = e.target.value;
                                  setEditShorts(copy);
                                }}
                                placeholder="/videos/... or https://youtube.com/shorts/..."
                                className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 focus:border-crimson focus:outline-none text-white text-xs font-mono"
                              />
                            </div>
                          </div>

                          {/* Direct Video File Upload Button */}
                          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/5">
                            <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-crimson/20 hover:bg-crimson text-crimson hover:text-white border border-crimson/40 text-[11px] font-mono font-bold tracking-wider uppercase transition-all duration-200">
                              {isUploading ? (
                                <>
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  <span>Uploading MP4...</span>
                                </>
                              ) : (
                                <>
                                  <Upload className="w-3.5 h-3.5" />
                                  <span>Upload Video (MP4)</span>
                                </>
                              )}
                              <input
                                type="file"
                                accept="video/mp4,video/webm,video/quicktime,video/*"
                                onChange={(e) => handleFileUpload(e, 'short', idx)}
                                disabled={isUploading}
                                className="hidden"
                              />
                            </label>

                            {short.url.startsWith('/videos/') && (
                              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                                <FileCheck className="w-3 h-3" />
                                <span>Uploaded file active</span>
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              )}

              {/* TAB 3 EDIT: COMMERCIAL DESIGNS (3:4) & BATCH UPLOAD */}
              {adminTab === 'designs' && (
                <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
                  
                  {/* BATCH UPLOAD UP TO 10 IMAGES */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-crimson/10 border border-crimson/30 space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-mono font-bold text-white uppercase flex items-center gap-2">
                        <Upload className="w-4 h-4 text-crimson" />
                        Bulk Upload Poster Designs
                      </span>
                      <span className="text-[10px] font-mono font-bold text-crimson bg-crimson/20 px-2.5 py-0.5 rounded-full border border-crimson/30">
                        Up to 10 at once
                      </span>
                    </div>

                    <p className="text-xs text-metallic-light leading-relaxed">
                      Select multiple poster designs (3:4 ratio) from your computer or phone. They will automatically be uploaded and added to your commercial showcase.
                    </p>

                    <label className="w-full cursor-pointer flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-crimson hover:bg-crimson-bright text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:scale-[1.01]">
                      {bulkUploading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Uploading Images...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          <span>Choose Multiple Images (Select up to 10 files)</span>
                        </>
                      )}
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        disabled={bulkUploading}
                        onChange={handleBulkDesignUpload}
                        className="hidden"
                      />
                    </label>

                    {bulkUploadMsg && (
                      <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                        <span>{bulkUploadMsg}</span>
                      </div>
                    )}
                  </div>

                  {/* Designs List */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-white/90 font-bold block">
                        Commercial Poster Designs ({editDesigns.length} Total):
                      </span>
                      <button
                        type="button"
                        onClick={handleAddNewDesign}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-mono border border-white/10"
                      >
                        <Plus className="w-3.5 h-3.5 text-crimson" />
                        <span>Add Empty Design</span>
                      </button>
                    </div>

                    {editDesigns.map((design, idx) => {
                      const isUploading = uploadingKey === `design-${idx}`;

                      return (
                        <div key={design.id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-bold text-crimson">
                              Design #{idx + 1}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono text-metallic">
                                3:4 Poster
                              </span>
                              <button
                                type="button"
                                onClick={() => handleDeleteDesign(design.id)}
                                className="p-1 rounded-lg text-metallic hover:text-crimson hover:bg-crimson/10 transition-colors"
                                title="Delete this design"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                            {/* Small thumbnail preview */}
                            <div className="relative w-14 h-18 sm:w-16 sm:h-20 rounded-lg overflow-hidden bg-black/60 border border-white/10 shrink-0">
                              <Image
                                src={design.image}
                                alt={design.title}
                                fill
                                sizes="80px"
                                className="object-cover"
                              />
                            </div>

                            <div className="flex-1 w-full space-y-2">
                              <div>
                                <label className="text-[10px] font-mono text-metallic block mb-0.5">
                                  Poster Title
                                </label>
                                <input
                                  type="text"
                                  value={design.title}
                                  onChange={(e) => {
                                    const copy = [...editDesigns];
                                    copy[idx].title = e.target.value;
                                    setEditDesigns(copy);
                                  }}
                                  className="w-full px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 focus:border-crimson focus:outline-none text-white text-xs font-medium"
                                />
                              </div>

                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[10px] font-mono text-metallic/70 truncate">
                                  {design.image}
                                </span>
                                <label className="cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white text-[10px] font-mono border border-white/10 shrink-0">
                                  {isUploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                                  <span>Replace</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(e, 'design', idx)}
                                    disabled={isUploading}
                                    className="hidden"
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              )}

              {/* TAB 4 EDIT: SOCIAL PLATFORMS */}
              {adminTab === 'platforms' && (
                <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-2">
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                    <span className="text-xs font-mono font-bold text-crimson uppercase block">
                      My Platforms // Profile URLs:
                    </span>

                    {/* LinkedIn */}
                    <div>
                      <label className="text-[11px] font-mono text-white/90 font-bold block mb-1">
                        LinkedIn Profile URL
                      </label>
                      <input
                        type="url"
                        value={editLinkedin}
                        onChange={(e) => setEditLinkedin(e.target.value)}
                        placeholder="https://www.linkedin.com/in/your_profile"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#16161D] border border-white/10 focus:border-crimson focus:outline-none text-white text-xs font-mono"
                      />
                    </div>

                    {/* Instagram */}
                    <div>
                      <label className="text-[11px] font-mono text-white/90 font-bold block mb-1">
                        Instagram Profile URL
                      </label>
                      <input
                        type="url"
                        value={editInstagramProfile}
                        onChange={(e) => setEditInstagramProfile(e.target.value)}
                        placeholder="https://www.instagram.com/your_handle/"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#16161D] border border-white/10 focus:border-crimson focus:outline-none text-white text-xs font-mono"
                      />
                    </div>

                    {/* YouTube */}
                    <div>
                      <label className="text-[11px] font-mono text-white/90 font-bold block mb-1">
                        YouTube Channel URL
                      </label>
                      <input
                        type="url"
                        value={editYoutubeChannel}
                        onChange={(e) => setEditYoutubeChannel(e.target.value)}
                        placeholder="https://www.youtube.com/@your_channel"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#16161D] border border-white/10 focus:border-crimson focus:outline-none text-white text-xs font-mono"
                      />
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <label className="text-[11px] font-mono text-white/90 font-bold block mb-1">
                        WhatsApp Direct Chat URL
                      </label>
                      <input
                        type="url"
                        value={editWhatsapp}
                        onChange={(e) => setEditWhatsapp(e.target.value)}
                        placeholder="https://wa.me/918129418544?text=..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#16161D] border border-white/10 focus:border-crimson focus:outline-none text-white text-xs font-mono"
                      />
                    </div>

                    {/* Google Drive Folder URL */}
                    <div>
                      <label className="text-[11px] font-mono text-crimson font-bold block mb-1">
                        Google Drive Folder URL (Design Vault &amp; Assets)
                      </label>
                      <input
                        type="url"
                        value={editGoogleDrive}
                        onChange={(e) => setEditGoogleDrive(e.target.value)}
                        placeholder="https://drive.google.com/drive/folders/..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#16161D] border border-crimson/40 focus:border-crimson focus:outline-none text-white text-xs font-mono"
                      />
                      <p className="text-[10px] text-metallic mt-1">
                        Paste your shared Google Drive link here. It links directly to the &quot;Watch More Designs&quot; button and footer vault icon.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Action Footer */}
              <div className="pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={handleResetToDefaults}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-metallic hover:text-white text-xs font-mono transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset to Defaults</span>
                </button>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setShowAdminModal(false)}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full bg-transparent border border-white/15 hover:bg-white/5 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSaveAndLock}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-crimson hover:bg-crimson-bright text-white text-xs font-bold uppercase tracking-wider shadow-crimson-subtle transition-all duration-200"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Save &amp; Lock Changes</span>
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Fullscreen Design Lightbox Preview Modal */}
      <AnimatePresence>
        {selectedDesignPreview && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-md overflow-hidden"
            onClick={() => setSelectedDesignPreview(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[92vh] w-full bg-[#111116] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Lightbox Header Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-black/60 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-mono font-bold text-crimson px-2.5 py-0.5 rounded-full bg-crimson/15 border border-crimson/30">
                    {selectedDesignPreview.badge || 'Commercial Design'}
                  </span>
                  <h3 className="text-white text-xs sm:text-sm font-bold truncate max-w-[260px] sm:max-w-md">
                    {selectedDesignPreview.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedDesignPreview(null)}
                  className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors"
                  aria-label="Close Preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Lightbox Image Container */}
              <div className="relative flex-1 min-h-[350px] sm:min-h-[500px] max-h-[75vh] w-full bg-black/80 flex items-center justify-center p-2 sm:p-4">
                <div className="relative w-full h-full max-h-[72vh] aspect-[3/4]">
                  <Image
                    src={selectedDesignPreview.image}
                    alt={selectedDesignPreview.title}
                    fill
                    sizes="(max-width: 1024px) 95vw, 850px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Lightbox Footer Bar */}
              <div className="px-5 py-3 bg-[#111116] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shrink-0">
                <span className="text-xs text-metallic">
                  {selectedDesignPreview.description || 'Commercial advertising treatment & poster'}
                </span>
                <span className="text-[10px] font-mono text-metallic/70">
                  Aspect Ratio: 3:4 High-Resolution Master
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
