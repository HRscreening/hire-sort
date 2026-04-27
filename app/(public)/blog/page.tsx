import type { Metadata } from 'next';
import { BlogListing } from './_components/BlogListing';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights, guides, and updates on modern hiring, AI resume screening, and recruiter productivity from the HireSort team.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'HireSort Blog',
    description:
      'Hiring insights and AI recruitment best practices from the HireSort team.',
    url: '/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HireSort Blog',
    description:
      'Hiring insights and AI recruitment best practices from the HireSort team.',
  },
  keywords: [
    'HireSort blog',
    'AI hiring tips',
    'resume screening guides',
    'recruitment technology',
    'modern hiring workflows',
  ],
};

export const revalidate = 3600;

export default async function BlogPage() {
  return <BlogListing page={1} />;
}
