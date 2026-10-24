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
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create 32 weightless zero-gravity particles
    const particleCount = Math.min(36, Math.floor(width / 35));
    const colors = [
      'rgba(220, 38, 38, ',   // Crimson
      'rgba(239, 68, 68, ',   // Bright crimson
      'rgba(255, 255, 255, ', // Starlight white
      'rgba(161, 161, 170, '  // Silver
    ];

    const particles: Particle[] = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.6,
      color: colors[Math.floor(Math.random() * colors.length)],
      vy: -(Math.random() * 0.45 + 0.15), // Slow upward antigravity drift
      vx: (Math.random() - 0.5) * 0.25,   // Gentle lateral float
      alpha: Math.random() * 0.4 + 0.1,
      baseAlpha: Math.random() * 0.35 + 0.15,
      phase: Math.random() * Math.PI * 2,
    }));

    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.vy;
        p.x += Math.sin(time + p.phase) * 0.35 + p.vx;

        // Wrap around vertically & horizontally
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Subtle alpha pulsation
        const currentAlpha = p.baseAlpha + Math.sin(time * 2 + p.phase) * 0.1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0.05, Math.min(0.65, currentAlpha))})`;
        ctx.shadowColor = 'rgba(220, 38, 38, 0.5)';
        ctx.shadowBlur = p.radius > 1.4 ? 8 : 4;
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
      className="fixed inset-0 pointer-events-none z-[1] opacity-70"
      aria-hidden="true"
    />
  );
}
