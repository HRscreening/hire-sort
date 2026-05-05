import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

const Pricing = dynamic(() => import('@/app/(public)/pricing/_components/Pricing'));

export const revalidate = 3600;

const EXCHANGE_RATE_API = 'https://open.er-api.com/v6/latest/USD';



export const metadata: Metadata = {
    title: 'Pricing — HireSort',
    description: 'Explore HireSort’s pricing plans designed for hiring teams of all sizes. Get AI-powered resume screening, customizable scoring, and bulk processing to streamline your hiring process.',
    alternates: { canonical: '/pricing' },
    openGraph: {
        title: 'Pricing — HireSort',
        description: 'Explore HireSort’s pricing plans designed for hiring teams of all sizes. Get AI-powered resume screening, customizable scoring, and bulk processing to streamline your hiring process.',
        url: '/pricing',
        type: 'website',
        siteName: 'HireSort',
        images: [{ url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://hiresort.ai'}/logo.png`, width: 1200, height: 630, alt: 'HireSort' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Pricing — HireSort',
        description: 'Explore HireSort’s pricing plans designed for hiring teams of all sizes. Get AI-powered resume screening, customizable scoring, and bulk processing to streamline your hiring process.',
        images: [`${process.env.NEXT_PUBLIC_SITE_URL || 'https://hiresort.ai'}/logo.png`],
    },
};


export default async function PricingPage() {
    return <Pricing />;
}