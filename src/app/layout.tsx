import type { Metadata } from 'next';
import { Sora, DM_Mono } from 'next/font/google';
import './globals.css';

// Sora — clean, modern body font with personality
const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

// DM Mono — terminal-style monospace for data, SQL, numbers
const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  display: 'swap',
  weight: ['300', '400', '500'],
});

// Cabinet Grotesk is not on Google Fonts — we'll load it via @font-face in CSS
// using a CDN fallback. For local: drop CabinetGrotesk-Variable.woff2 in /public/fonts/

export const metadata: Metadata = {
  title: 'Lendable Portfolio Intelligence',
  description:
    'AI-powered natural language interface for interrogating the Lendable loan portfolio database.',
  keywords: ['portfolio analytics', 'credit risk', 'PAR', 'loan intelligence', 'Lendable'],
  authors: [{ name: 'Lendable Data Team' }],
  robots: 'noindex, nofollow', // Internal tool — don't index
  icons: {
    icon: '/icons/favicon.ico',
  },
  openGraph: {
    title: 'Lendable Portfolio Intelligence',
    description: 'AI-powered loan portfolio analytics',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Cabinet Grotesk via Fontshare CDN */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400&display=swap"
          rel="stylesheet"
        />
        {/* Prevent flash of unstyled content */}
        <meta name="color-scheme" content="dark" />
      </head>
      <body
        className={`${sora.variable} ${dmMono.variable} font-body antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}