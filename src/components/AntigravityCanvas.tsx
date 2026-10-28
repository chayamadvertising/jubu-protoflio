'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  vy: number;
  vx: number;
  alpha: number;
  baseAlpha: number;
  phase: number;
}

export default function AntigravityCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive particle count: lightweight on mobile (26), full richness on desktop (45)
    const particleCount = width < 768 ? 26 : width < 1024 ? 34 : 45;
    const colors = [
      'rgba(220, 38, 38, ',   // Crimson firefly glow
      'rgba(239, 68, 68, ',   // Bright crimson
      'rgba(255, 255, 255, ', // Starlight white
      'rgba(220, 220, 230, '  // Silver shimmer
    ];

    const particles: Particle[] = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      color: colors[Math.floor(Math.random() * colors.length)],
      vy: -(Math.random() * 0.45 + 0.18), // Slow upward antigravity drift
      vx: (Math.random() - 0.5) * 0.3,   // Gentle lateral float
      alpha: Math.random() * 0.5 + 0.25,
      baseAlpha: Math.random() * 0.45 + 0.2,
      phase: Math.random() * Math.PI * 2,
    }));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let time = 0;
    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.vy;
        p.x += Math.sin(time + p.phase) * 0.4 + p.vx;

        // Wrap around vertically & horizontally
        if (p.y < -15) p.y = height + 15;
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;

        // Subtle alpha pulsation (like firefly twinkle)
        const currentAlpha = p.baseAlpha + Math.sin(time * 2 + p.phase) * 0.15;
        const clampedAlpha = Math.max(0.12, Math.min(0.85, currentAlpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${clampedAlpha})`;
        ctx.shadowColor = 'rgba(220, 38, 38, 0.6)';
        ctx.shadowBlur = p.radius > 1.4 ? 10 : 5;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[30] opacity-90 block"
      aria-hidden="true"
    />
  );
}
