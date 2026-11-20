'use client';

import confetti from 'canvas-confetti';
import { PORTFOLIO_CONFIG } from '@/config/portfolio.config';

export function handleCvDownload(e?: React.MouseEvent) {
  if (e) e.preventDefault();

  try {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#E11D48', '#FFFFFF', '#FF1E38', '#1F1F24'],
    });
  } catch {
    // Ignore confetti errors if canvas unavailable
  }

  // Trigger download with CV name matching updated advertising agency resume
  const link = document.createElement('a');
  link.href = PORTFOLIO_CONFIG.cvDownloadUrl || '/Muhammed_Jubair_T_CV_Updated.pdf';
  link.download = 'Muhammed_Jubair_T_CV_Updated.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
