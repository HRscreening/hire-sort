#!/usr/bin/env node
/**
 * IndexNow ping script.
 *
 * Notifies Bing, Yandex, Naver, Seznam, and Yep that one or more URLs were
 * created or updated. Free, no API key registration with the search engines —
 * just host a key file at `https://<host>/<key>.txt` containing the key, which
 * we already do at `public/1296c215069702826079c3cc23ef3a47.txt`.
 *
 * Usage:
 *   # Ping every URL in the sitemap (default — safe and idempotent):
 *   node scripts/indexnow-ping.mjs
 *
 *   # Ping a specific list of URLs:
 *   node scripts/indexnow-ping.mjs https://hiresort.ai/blog/foo https://hiresort.ai/pricing
 *
 *   # Override host (e.g., for a preview deploy):
 *   SITE_URL=https://hire-sort-git-seo-audit-fixes-hrscreening.vercel.app \
 *     node scripts/indexnow-ping.mjs
 *
 * Wire into deploys by running this after a successful production build, or
 * call manually after publishing new content.
 *
 * IndexNow spec: https://www.indexnow.org/documentation
 */

const KEY = '1296c215069702826079c3cc23ef3a47';
const SITE_URL = (process.env.SITE_URL || 'https://hiresort.ai').replace(/\/$/, '');
const HOST = new URL(SITE_URL).host;
const ENDPOINT = 'https://api.indexnow.org/IndexNow';

/** Pull every <loc> URL from the live sitemap. */
async function urlsFromSitemap() {
  const res = await fetch(`${SITE_URL}/sitemap.xml`, {
    headers: { 'User-Agent': 'hiresort-indexnow-ping/1.0' },
  });
  if (!res.ok) throw new Error(`sitemap fetch failed: HTTP ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function ping(urls) {
  // Spec: keep each request under 10,000 URLs.
  const batches = [];
  for (let i = 0; i < urls.length; i += 9000) batches.push(urls.slice(i, i + 9000));

  for (const [i, batch] of batches.entries()) {
    const body = {
      host: HOST,
      key: KEY,
      keyLocation: `${SITE_URL}/${KEY}.txt`,
      urlList: batch,
    };
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });
    const tag = batches.length > 1 ? ` (batch ${i + 1}/${batches.length})` : '';
    console.log(`IndexNow${tag}: HTTP ${res.status} — ${batch.length} URLs submitted`);
    if (res.status === 202 || res.status === 200) continue;
    const text = await res.text().catch(() => '');
    console.error('response body:', text.slice(0, 500));
  }
}

async function main() {
  const argUrls = process.argv.slice(2).filter((a) => a.startsWith('http'));
  const urls = argUrls.length > 0 ? argUrls : await urlsFromSitemap();
  if (urls.length === 0) {
    console.log('IndexNow: no URLs to submit, nothing to do');
    return;
  }
  console.log(`IndexNow: host=${HOST} key=${KEY.slice(0, 8)}… urls=${urls.length}`);
  await ping(urls);
}

main().catch((err) => {
  console.error('IndexNow ping failed:', err.message);
  process.exit(1);
});
