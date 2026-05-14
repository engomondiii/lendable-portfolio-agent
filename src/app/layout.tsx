import type { Metadata } from 'next';
import { Sora, DM_Mono, Inter } from 'next/font/google';
import './globals.css';

// Inter — world-standard professional UI font (fallback for Cabinet Grotesk)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// Sora — clean modern body font
const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

// DM Mono — terminal-style for data, SQL, numbers
const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  display: 'swap',
  weight: ['300', '400', '500'],
});

export const metadata: Metadata = {
  title: 'Lendable Portfolio Intelligence',
  description:
    'AI-powered natural language interface for interrogating the Lendable loan portfolio database.',
  keywords: ['portfolio analytics', 'credit risk', 'PAR', 'loan intelligence', 'Lendable'],
  authors: [{ name: 'Lendable Data Team' }],
  robots: 'noindex, nofollow',
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
        <meta name="color-scheme" content="dark" />
        {/* Ensure viewport doesn't scale down text on mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body
        className={`${sora.variable} ${dmMono.variable} ${inter.variable} font-body antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}