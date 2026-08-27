import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { cookies } from "next/headers";
import type { PlanType } from '@/types/types';
const Pricing = dynamic(() => import('@/app/(public)/pricing/_components/Pricing'));

export const revalidate = 3600;

const EXCHANGE_RATE_API = 'https://open.er-api.com/v6/latest/USD';



export const metadata: Metadata = {
    title: 'Pricing — HireSort',
    description: 'Explore HireSort pricing for agentic hiring workflows. Start free, upgrade for more hiring credits, or use done-for-you hiring with success-fee pricing.',
    alternates: { canonical: '/pricing' },
    openGraph: {
        title: 'Pricing — HireSort',
        description: 'Start free, upgrade for more hiring credits, or use done-for-you hiring with success-fee pricing.',
        url: '/pricing',
        type: 'website',
        siteName: 'HireSort',
        images: [{ url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://hiresort.ai'}/logo.png`, width: 1200, height: 630, alt: 'HireSort' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Pricing — HireSort',
        description: 'Start free, upgrade for more hiring credits, or use done-for-you hiring with success-fee pricing.',
        images: [`${process.env.NEXT_PUBLIC_SITE_URL || 'https://hiresort.ai'}/logo.png`],
    },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hiresort.ai';

const pricingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'HireSort',
    description:
        'Agentic hiring workflow software for sourcing, AI resume screening, AI phone screening, first-round interviews, and structured shortlists.',
    brand: { '@type': 'Brand', name: 'HireSort' },
    url: `${siteUrl}/pricing`,
    offers: [
        {
            '@type': 'Offer',
            name: 'Free',
            price: '0',
            priceCurrency: 'USD',
            description: 'One active role and 250 hiring credits.',
        },
        {
            '@type': 'Offer',
            name: 'Starter',
            price: '49',
            priceCurrency: 'USD',
            description: 'Two active roles and 1,000 hiring credits per month.',
        },
        {
            '@type': 'Offer',
            name: 'Growth',
            price: '149',
            priceCurrency: 'USD',
            description: 'Five active roles and 4,000 hiring credits per month.',
        },
        {
            '@type': 'Offer',
            name: 'Scale',
            price: '399',
            priceCurrency: 'USD',
            description: 'Fifteen active roles and 12,000 hiring credits per month.',
        },
    ],
};


export default async function PricingPage() {
    const jar = await cookies()
    const isLoggedIn = jar.get("hs_auth")?.value === "1"
    const plan = (jar.get("hs_plan")?.value as PlanType | undefined) ?? 'FREE'
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
            />
            <Pricing isLoggedIn={isLoggedIn} plan={plan} />
        </>
    );
}
