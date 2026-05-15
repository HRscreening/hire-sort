import { getComparisonBySlug } from '../_data';
import { OG_CONTENT_TYPE, OG_SIZE, renderOGCard } from '@/lib/og-card';

export const alt = 'HireSort comparison';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

type Params = Promise<{ slug: string }>;

export default async function Image({ params }: { params: Params }) {
  const { slug } = await params;
  const data = getComparisonBySlug(slug);

  return renderOGCard({
    eyebrow: 'Compare',
    title: data ? `HireSort vs ${data.competitor}` : 'HireSort comparisons',
    subtitle: data?.hero?.supporting?.slice(0, 140),
  });
}
