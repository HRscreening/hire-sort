import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hiresort.ai';

/**
 * Robots policy. Explicit per-agent rules signal intent to crawlers and AI
 * platforms beyond the default `*` catch-all. HireSort is a SaaS marketing
 * site that benefits from AI search visibility — so AI-search bots (Perplexity,
 * ChatGPT Search, Claude, Google AI) are explicitly allowed. Training-only
 * crawlers (CCBot, anthropic-ai) are also allowed because being represented in
 * model training rounds is part of the GEO strategy for an AI product.
 * Only operational endpoints under /api/ are disallowed across the board.
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = ['/api/'];

  const aiSearchBots = [
    'GPTBot',           // OpenAI training crawler
    'OAI-SearchBot',    // ChatGPT Search live crawler (citations)
    'ChatGPT-User',     // ChatGPT user-initiated browse
    'ClaudeBot',        // Anthropic crawler
    'Claude-User',      // Anthropic user-initiated browse
    'Claude-SearchBot', // Anthropic search crawler
    'anthropic-ai',     // legacy Anthropic agent name
    'PerplexityBot',    // Perplexity AI search
    'Perplexity-User',  // Perplexity user-initiated fetch
    'Google-Extended',  // controls Google AI training (Bard/Gemini); does not affect Google Search ranking
    'Applebot-Extended',// Apple Intelligence training
    'CCBot',            // Common Crawl (used by many open-weights models)
    'Bytespider',       // ByteDance / Doubao
    'Amazonbot',        // Amazon AI / Alexa
  ];

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      ...aiSearchBots.map((userAgent) => ({ userAgent, allow: '/', disallow })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
