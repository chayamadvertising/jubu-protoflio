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
    // Only run on desktop screens (1024px+)
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 1024) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      if (window.innerWidth < 1024) {
        cancelAnimationFrame(animationFrameId);
        return;
      }
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 45 zero-gravity glowing particles
    const particleCount = 45;
    const colors = [
      'rgba(220, 38, 38, ',   // Crimson
      'rgba(239, 68, 68, ',   // Bright crimson
      'rgba(255, 255, 255, ', // Starlight white
      'rgba(200, 200, 210, '  // Silver
    ];

    const particles: Particle[] = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      color: colors[Math.floor(Math.random() * colors.length)],
      vy: -(Math.random() * 0.5 + 0.2), // Slow upward antigravity drift
      vx: (Math.random() - 0.5) * 0.3,   // Gentle lateral float
      alpha: Math.random() * 0.5 + 0.25,
      baseAlpha: Math.random() * 0.45 + 0.2,
      phase: Math.random() * Math.PI * 2,
    }));

    let time = 0;
    const render = () => {
      if (window.innerWidth < 1024) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

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

        // Subtle alpha pulsation
        const currentAlpha = p.baseAlpha + Math.sin(time * 2 + p.phase) * 0.15;
        const clampedAlpha = Math.max(0.12, Math.min(0.85, currentAlpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${clampedAlpha})`;
        ctx.shadowColor = 'rgba(220, 38, 38, 0.6)';
        ctx.shadowBlur = p.radius > 1.5 ? 10 : 5;
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
      className="hidden lg:block fixed inset-0 pointer-events-none z-[30] opacity-90"
      aria-hidden="true"
    />
  );
}
