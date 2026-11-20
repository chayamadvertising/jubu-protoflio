import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'AI Commercial Video Producer & Performance Creative Strategist. 150+ commercial AI ad films, Claude-assisted scripting, and Meta Ads performance creative by Muhammed Jubair T.',
  keywords: [
    'Portfolio',
    'Muhammed Jubair T',
    'AI Video Producer',
    'Meta Ads Specialist',
    'Commercial Video Production',
    'Anthropic Claude',
    'Python Django'
  ],
  authors: [{ name: 'Muhammed Jubair T' }],
  openGraph: {
    title: 'Portfolio',
    description: '150+ Commercial AI Ad Films & Meta Ads Performance Creative by Muhammed Jubair T.',
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
      <body className="bg-[#070709] text-white antialiased selection:bg-crimson selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
