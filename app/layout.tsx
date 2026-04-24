import type { Metadata, Viewport } from 'next';
import { DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hiresort.ai';

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
    default: 'HireSort — AI-powered resume screening',
    template: '%s — HireSort',
  },
  description:
    'Screen resumes in seconds, not hours. HireSort ranks candidates with explainable AI scores, bulk processing, and recruiter-friendly workflows.',
  applicationName: 'HireSort',
  keywords: [
    'resume screening',
    'AI resume screening',
    'applicant tracking',
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
    title: 'HireSort — AI-powered resume screening',
    description:
      'Screen resumes in seconds, not hours. HireSort ranks candidates with explainable AI scores.',
    url: siteUrl,
    locale: 'en_US',
    images: [{ url: '/logo.png', width: 512, height: 512, alt: 'HireSort' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HireSort — AI-powered resume screening',
    description:
      'Screen resumes in seconds, not hours. Explainable AI rankings, built for hiring teams.',
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
    'AI-powered resume screening that ranks candidates with explainable scores.',
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
        <Navbar />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
