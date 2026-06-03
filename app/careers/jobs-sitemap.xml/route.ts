import { SITE_URL } from "@/lib/seo";
import { TEST_JOB } from "@/lib/test-job";

// Standalone jobs sitemap for the careers harness. Not wired into the main
// sitemap/robots — reference it manually when ready.
export async function GET() {
  const loc = `${SITE_URL}/careers/${TEST_JOB.id}`;
  const lastmod = new Date().toISOString().split("T")[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
