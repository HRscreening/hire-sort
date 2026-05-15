import { getAtsPageBySlug } from '../_lib/registry';
import { OG_CONTENT_TYPE, OG_SIZE, renderOGCard } from '@/lib/og-card';

export const alt = 'HireSort applicant tracking system';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

type Params = Promise<{ slug: string }>;

export default async function Image({ params }: { params: Params }) {
  const { slug } = await params;
  const data = getAtsPageBySlug(slug);

  const title = data
    ? `${data.hero.titlePrefix}${data.hero.titleAccent}${data.hero.titleSuffix ?? ''}`.trim()
    : 'Applicant Tracking System';

  return renderOGCard({
    eyebrow: 'ATS',
    title,
    subtitle: data?.meta?.description?.slice(0, 140),
  });
}
