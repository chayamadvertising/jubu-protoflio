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

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;

    // Device-adaptive particle count:
    // Mobile: 12 particles (70% reduction, zero lag, no heavy canvas shadow blurs)
    // Tablet: 24 particles
    // Desktop: 42 particles (full rich 3D depth)
    const particleCount = isMobile ? 12 : isTablet ? 24 : 42;

    const colors = [
      'rgba(225, 29, 72, ',   // Vibrant studio crimson
      'rgba(255, 30, 56, ',   // High-impact bright crimson
      'rgba(255, 255, 255, ', // Starlight white
      'rgba(220, 220, 235, '  // Obsidian silver shimmer
    ];

    const particles: Particle[] = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: isMobile ? Math.random() * 1.5 + 0.8 : Math.random() * 2.2 + 0.8,
      color: colors[Math.floor(Math.random() * colors.length)],
      vy: -(Math.random() * 0.40 + 0.16), // Gentle upward 3D drift
      vx: (Math.random() - 0.5) * 0.25,  // Smooth lateral float
      alpha: Math.random() * 0.5 + 0.25,
      baseAlpha: Math.random() * 0.45 + 0.2,
      phase: Math.random() * Math.PI * 2,
    }));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    let time = 0;
    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.vy;
        p.x += Math.sin(time + p.phase) * 0.35 + p.vx;

        // Wrap around vertically & horizontally
        if (p.y < -15) p.y = height + 15;
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;

        // Alpha breathing
        const currentAlpha = p.baseAlpha + Math.sin(time * 2 + p.phase) * 0.14;
        const clampedAlpha = Math.max(0.12, Math.min(0.85, currentAlpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${clampedAlpha})`;

        // Only compute shadowBlur on desktop with pointer:fine to prevent mobile frame drops
        if (!isMobile && p.radius > 1.4) {
          ctx.shadowColor = 'rgba(225, 29, 72, 0.5)';
          ctx.shadowBlur = 8;
        } else {
          ctx.shadowBlur = 0;
        }

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
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60"
      aria-hidden="true"
    />
  );
}
