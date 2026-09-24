import type { Metadata } from 'next';
import { cookies } from "next/headers";
import type { PlanType } from '@/types/types';
import type { PlanSpec, PlansResponse } from './PlanSpec.type';
import Pricing from './_components/Pricing';

const API_BASE = process.env.APP_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'https://api.hiresort.ai';

async function fetchPlans(): Promise<PlanSpec[]> {
    try {
        const res = await fetch(`${API_BASE}/api/billing/plans`, {
            next: { revalidate: 3600, tags: ['billing-plans'] },
        });
        if (!res.ok) return [];
        const data: PlansResponse = await res.json();
        return data.plans || [];
    } catch (err) {
        console.error('Error fetching billing plans server-side:', err);
        return [];
    }
}

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
            description: 'One active role and 50 resume analysis per month.',
        },
        {
            '@type': 'Offer',
            name: 'Plus',
            price: '49',
            priceCurrency: 'USD',
            description: 'Three active roles and 1,000 resume analysis per month.',
        },
        {
            '@type': 'Offer',
            name: 'Pro',
            price: '199',
            priceCurrency: 'USD',
            description: 'Five active roles and 4,000 resume analysis per month.',
        },
        {
            '@type': 'Offer',
            name: 'Custom',
            price: 'Contact us',
            priceCurrency: 'USD',
            description: 'Custom plans for enterprise hiring needs.',
        },
    ],
};


export default async function PricingPage() {
    const jar = await cookies()
    const isLoggedIn = jar.get("hs_auth")?.value === "1"
    const plan = (jar.get("hs_plan")?.value as PlanType | undefined) ?? 'FREE'
    const plans = await fetchPlans();
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
            />
            <Pricing isLoggedIn={isLoggedIn} plan={plan} plans={plans} />
        </>
    );
}
