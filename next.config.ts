import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseHost = supabaseUrl ? new URL(supabaseUrl).hostname : null;
const isProd = process.env.NODE_ENV === 'production';

// Content Security Policy. Permissive baseline that accommodates Next.js'
// inline hydration scripts, Tailwind-generated inline styles, Vercel
// Analytics + Speed Insights, Google Tag Manager / GA4, and Supabase storage
// + REST calls. Tighten to nonce-based script-src in a later pass.
const cspDirectives = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://va.vercel-scripts.com',
    'https://vercel.live',
  ],
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:', 'blob:', 'https:'],
  'font-src': ["'self'", 'data:'],
  'connect-src': [
    "'self'",
    ...(supabaseHost ? [`https://${supabaseHost}`] : ['https://*.supabase.co']),
    'https://www.google-analytics.com',
    'https://vitals.vercel-insights.com',
    'https://va.vercel-scripts.com',
  ],
  'frame-ancestors': ["'none'"],
  'form-action': ["'self'"],
  'base-uri': ["'self'"],
  'object-src': ["'none'"],
  'upgrade-insecure-requests': [],
};

const cspValue = Object.entries(cspDirectives)
  .map(([directive, values]) =>
    values.length > 0 ? `${directive} ${values.join(' ')}` : directive,
  )
  .join('; ');

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Content-Security-Policy', value: cspValue },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
];

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [65, 70, 75],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: supabaseHost
      ? [
          {
            protocol: 'https',
            hostname: supabaseHost,
            pathname: '/storage/v1/object/public/**',
          },
        ]
      : [],
  },
  async redirects() {
    return [
      {
        source: '/blog/best-ai-resume-screening-software',
        destination: '/resources/best/ai-resume-screening-software',
        permanent: true,
      },
    ];
  },
  async headers() {
    const headers = [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];

    if (isProd) {
      headers.push(
        {
          // Hashed Next build assets are immutable.
          source: '/_next/static/:path*',
          headers: [
            { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          ],
        },
        {
          // Optimized images served by next/image.
          source: '/_next/image(.*)',
          headers: [
            { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          ],
        },
      );
    }

    return headers;
  },
};

export default nextConfig;
