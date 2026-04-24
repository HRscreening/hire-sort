'use client';

import { Shield, Calendar } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { LegalDoc, type LegalSection } from '@/components/layout/LegalDoc';
import { sections } from './_data';

const PrivacyClient = () => {
  return (
    <>
      <PageHero
        icon={<Shield size={13} strokeWidth={2.5} />}
        eyebrow="Privacy Policy"
        title={
          <>
            Your data, handled with{' '}
            <span className="text-accent">care and clarity.</span>
          </>
        }
        lead={
          <>
            This policy explains how HireSort collects, uses, stores, shares, and protects personal
            data across our website, platform, and AI-powered resume screening Services.
          </>
        }
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-line-soft bg-white px-3 py-1.5 text-[12.5px] font-medium text-charcoal-md shadow-soft">
          <Calendar size={13} strokeWidth={2.3} className="text-charcoal-lt" />
          Last updated&nbsp;&middot;&nbsp;21 April 2026
        </span>
      </PageHero>

      <LegalDoc
        sections={sections as LegalSection[]}
        intro={
          <>
            This Privacy Policy explains how <strong className="font-semibold text-charcoal">DeskZero Pvt Ltd</strong>, doing business as{' '}
            <strong className="font-semibold text-charcoal">HireSort</strong> (&ldquo;HireSort,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), collects, uses, stores, shares, and protects personal
            data when you use our website, platform, and related services, including our
            AI-powered resume screening, ranking, contextual search, and resume management tools
            (collectively, the &ldquo;Services&rdquo;). By using our Services, you agree to the
            collection and use of information in accordance with this Privacy Policy.
          </>
        }
        calloutTitle="Questions about your privacy?"
        calloutSub="A real human reads every message."
        calloutCta="Email support@hiresort.ai"
      />
    </>
  );
};

export default PrivacyClient;
