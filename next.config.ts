import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseHost = supabaseUrl ? new URL(supabaseUrl).hostname : null;
// Demo tool calls the backend directly from the browser (per-IP rate limiting),
// so its origin must be allowed in connect-src.
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const apiOrigin = apiUrl ? new URL(apiUrl).origin : null;
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
    ...(apiOrigin ? [apiOrigin] : []),
    'https://www.google-analytics.com',
    'https://vitals.vercel-insights.com',
    'https://va.vercel-scripts.com',
  ],
  // Sources we're allowed to embed in an <iframe>. Covers the same-origin
  // sample PDF previews plus the JD/résumé PDFs the demo API serves from
  // Supabase storage (jd_url/resume_url). Without this, iframe src falls back
  // to default-src 'self' and the Supabase PDFs are blocked.
  //
  // Note: these PDFs live in the *demo API's* Supabase project, which is a
  // different host than NEXT_PUBLIC_SUPABASE_URL (the frontend's own project),
  // so we can't pin an exact host from env here — allow the Supabase wildcard.
  'frame-src': ["'self'", 'blob:', 'https://*.supabase.co'],
  // 'self' (not 'none') so same-origin pages can embed our own assets — e.g.
  // the sample PDF previews shown in an <iframe>. Still blocks third-party
  // framing, matching X-Frame-Options: SAMEORIGIN below.
  'frame-ancestors': ["'self'"],
  'form-action': ["'self'"],
  'base-uri': ["'self'"],
  'object-src': ["'none'"],
  // Only upgrade in production — in dev this would rewrite a plaintext local
  // backend call (http://localhost:8000) to https and break it.
  ...(isProd ? { 'upgrade-insecure-requests': [] } : {}),
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
