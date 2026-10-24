import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MUHAMMED JUBAIR T | AI Video Producer & Meta Ads Specialist',
  description:
    'Director-level AI video production (Google Veo, Higgsfield), high-converting Meta Ads campaigns, and prompt engineering by Muhammed Jubair T.',
  keywords: [
    'Muhammed Jubair T',
    'AI Video Producer',
    'Meta Ads Specialist',
    'Prompt Engineer',
    'Google Veo',
    'Higgsfield AI',
    'Commercial Video Production',
    'Kerala AI Video'
  ],
  authors: [{ name: 'Muhammed Jubair T' }],
  openGraph: {
    title: 'MUHAMMED JUBAIR T | AI Video Producer & Meta Ads Specialist',
    description: '150+ AI Video Projects engineered with 100% character and brand visual consistency.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-obsidian text-white antialiased selection:bg-crimson selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
