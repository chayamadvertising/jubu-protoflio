'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  glowIntensity?: 'subtle' | 'vibrant';
}

export default function TiltCard({
  children,
  className = '',
  onClick,
  glowIntensity = 'subtle',
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle, gentle, weighted 3D tilt (max 4.5 degrees)
    const rotX = -((y - centerY) / centerY) * 4.5;
    const rotY = ((x - centerX) / centerX) * 4.5;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: glowIntensity === 'vibrant' ? 0.25 : 0.14,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: 'spring',
        stiffness: 140,
        damping: 28,
        mass: 0.8,
      }}
      className={`relative perspective-1000 transition-shadow duration-500 ${className}`}
    >
      {/* Subtle crimson specular highlight following mouse */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-500 z-10"
        style={{
          background: `radial-gradient(350px circle at ${glarePos.x}% ${glarePos.y}%, rgba(220, 38, 38, ${glarePos.opacity}), transparent 75%)`,
        }}
      />
      {children}
    </motion.div>
  );
}
