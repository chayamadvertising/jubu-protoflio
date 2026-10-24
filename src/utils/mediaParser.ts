export interface ParsedVideo {
  isValid: boolean;
  type: 'youtube' | 'instagram' | 'direct' | 'unknown';
  id?: string;
  embedUrl?: string;
  thumbnailUrl?: string;
  isDirectVideo?: boolean;
}

export function parseYouTubeUrl(url: string): ParsedVideo {
  if (!url || url.includes('PASTE_SHORTS_LINK') || url.includes('PASTE_YOUTUBE_LINK')) {
    return { isValid: false, type: 'youtube' };
  }

  // Direct video file link
  if (url.match(/\.(mp4|webm|mov)(\?.*)?$/i)) {
    return {
      isValid: true,
      type: 'direct',
      id: 'direct-video',
      embedUrl: url,
      isDirectVideo: true
    };
  }

  // Regex patterns for YouTube Shorts & Videos
  const patterns = [
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/,
    /^([\w-]{11})$/ // Direct ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      const id = match[1];
      return {
        isValid: true,
        type: 'youtube',
        id,
        embedUrl: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&controls=1&modestbranding=1&rel=0&playsinline=1&loop=1`,
        thumbnailUrl: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
      };
    }
  }

  return { isValid: false, type: 'youtube' };
}

export function parseInstagramUrl(url: string): ParsedVideo {
  if (!url || url.includes('PASTE_REEL_LINK')) {
    return { isValid: false, type: 'instagram' };
  }

  // Direct video file link
  if (url.match(/\.(mp4|webm|mov)(\?.*)?$/i)) {
    return {
      isValid: true,
      type: 'direct',
      id: 'direct-video',
      embedUrl: url,
      isDirectVideo: true
    };
  }

  const match = url.match(/(?:reel|p)\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    const code = match[1];
    return {
      isValid: true,
      type: 'instagram',
      id: code,
      // Embed WITHOUT captioned to remove author profile, like counts, and scrollbars!
      embedUrl: `https://www.instagram.com/reel/${code}/embed/`,
    };
  }

  return { isValid: false, type: 'instagram' };
}
