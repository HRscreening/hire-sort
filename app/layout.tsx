import type { Metadata, Viewport } from 'next';
import { DM_Sans, DM_Mono } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BfcacheRemount from '@/components/layout/BfcacheRemount';
import ScrollToTop from '@/components/layout/ScrollToTop';


const gtagKey = process.env.NEXT_PUBLIC_GA_ID || ''

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://hiresort.ai';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseHost = supabaseUrl
  ? (() => {
      try {
        return new URL(supabaseUrl).hostname;
      } catch {
        return null;
      }
    })()
  : null;

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f3ee' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
  colorScheme: 'light',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'HireSort - AI Resume Screening Software for Faster Shortlisting',
    template: '%s - HireSort',
  },
  description:
    'HireSort is AI resume screening software for recruiters and hiring teams. Rank candidates, review explainable scores, process resumes in bulk, and shortlist faster.',
  applicationName: 'HireSort',
  keywords: [
    'resume screening',
    'AI resume screening',
    'AI resume screening software',
    'resume screening software',
    'applicant tracking',
    'applicant tracking system',
    'recruiting software',
    'candidate ranking',
    'bulk resume processing',
    'HireSort',
  ],
  authors: [{ name: 'DeskZero Pvt Ltd' }],
  creator: 'DeskZero Pvt Ltd',
  publisher: 'DeskZero Pvt Ltd',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'HireSort',
    title: 'HireSort - AI Resume Screening Software',
    description:
      'Rank resumes in seconds with explainable AI scores, bulk processing, and recruiter-friendly shortlists.',
    url: siteUrl,
    locale: 'en_US',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'HireSort' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HireSort - AI Resume Screening Software',
    description:
      'Rank resumes in seconds with explainable AI scores, built for hiring teams.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: '/logo.png',
  },
  formatDetection: { email: false, address: false, telephone: false },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'HireSort',
  legalName: 'DeskZero Pvt Ltd',
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  email: 'support@hiresort.ai',
  description:
    'AI resume screening software that ranks candidates with explainable scores.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'support@hiresort.ai',
    availableLanguage: ['English'],
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'HireSort',
  url: siteUrl,
  inLanguage: 'en-US',
  publisher: { '@type': 'Organization', name: 'HireSort' },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {supabaseHost && (
          <>
            <link rel="preconnect" href={`https://${supabaseHost}`} crossOrigin="" />
            <link rel="dns-prefetch" href={`https://${supabaseHost}`} />
          </>
        )}
        <BfcacheRemount>
          <Navbar />
          <main id="main" className="flex-1">{children}</main>
          <Footer />
          <ScrollToTop />
        </BfcacheRemount>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <SpeedInsights />
        <Analytics />
      </body>
      {gtagKey && <GoogleAnalytics gaId={gtagKey} />}
    </html>
  );
}
