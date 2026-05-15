import { getBestPageBySlug } from '../_data';
import { OG_CONTENT_TYPE, OG_SIZE, renderOGCard } from '@/lib/og-card';

export const alt = 'HireSort best-of guide';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

type Params = Promise<{ slug: string }>;

export default async function Image({ params }: { params: Params }) {
  const { slug } = await params;
  const data = getBestPageBySlug(slug);

  return renderOGCard({
    eyebrow: 'Best',
    title: data?.category
      ? `Best ${data.category}`
      : 'Best recruitment software',
    subtitle: data?.meta?.description?.slice(0, 140),
  });
}
