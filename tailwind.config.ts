import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#050505',
        onyx: '#0B0B0E',
        surface: {
          dark: '#0E0E12',
          card: '#121217',
          border: '#1F1F27',
        },
        crimson: {
          DEFAULT: '#DC2626',
          bright: '#E50914',
          dark: '#991B1B',
          glow: 'rgba(220, 38, 38, 0.35)',
          subtle: 'rgba(229, 9, 20, 0.08)',
          border: 'rgba(220, 38, 38, 0.24)',
        },
        metallic: {
          DEFAULT: '#9CA3AF',
          light: '#D1D5DB',
          dark: '#6B7280',
        },
        glass: {
          surface: 'rgba(18, 18, 22, 0.85)',
          card: 'rgba(15, 15, 19, 0.90)',
          overlay: 'rgba(5, 5, 5, 0.85)',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
        signature: ['"Great Vibes"', 'cursive'],
      },
      boxShadow: {
        'crimson-glow': '0 0 35px -5px rgba(220, 38, 38, 0.35)',
        'crimson-subtle': '0 0 20px -3px rgba(229, 9, 20, 0.18)',
        'crimson-intense': '0 0 50px 0px rgba(229, 9, 20, 0.50)',
        'glass-card': '0 20px 40px -15px rgba(0, 0, 0, 0.6)',
        'executive': '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.08)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 6s ease-in-out infinite',
        'float-gentle': 'floatGentle 8s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.03)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
