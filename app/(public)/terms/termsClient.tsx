'use client';

import { FileText, Calendar } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { LegalDoc, type LegalSection } from '@/components/layout/LegalDoc';
import { sections } from './_data';

const dateChipClass =
  'inline-flex items-center gap-2 rounded-full border border-line-soft bg-white px-3 py-1.5 text-[12.5px] font-medium text-charcoal-md shadow-soft';

const TermsClient = () => {
  return (
    <>
      <PageHero
        icon={<FileText size={13} strokeWidth={2.5} />}
        eyebrow="Terms of Service"
        title={
          <>
            The rules of the road for using <span className="text-accent">HireSort.</span>
          </>
        }
        lead={
          <>
            These Terms govern your access to and use of our website, software, products, and
            services. By using HireSort, you agree to be bound by them.
          </>
        }
      >
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className={dateChipClass}>
            <Calendar size={13} strokeWidth={2.3} className="text-charcoal-lt" />
            Effective&nbsp;&middot;&nbsp;<strong className="font-semibold text-charcoal">21 April 2026</strong>
          </span>
          <span className={dateChipClass}>
            <Calendar size={13} strokeWidth={2.3} className="text-charcoal-lt" />
            Last updated&nbsp;&middot;&nbsp;<strong className="font-semibold text-charcoal">21 April 2026</strong>
          </span>
        </div>
      </PageHero>

      <LegalDoc
        sections={sections as LegalSection[]}
        intro={
          <>
            Welcome to <strong className="font-semibold text-charcoal">DeskZero Pvt Ltd</strong> (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). These Terms of Service (&ldquo;Terms&rdquo;) govern your access to
            and use of our website, software, products, and services (collectively, the
            &ldquo;Services&rdquo;). By accessing or using the Services, you agree to be bound by these
            Terms. If you do not agree to these Terms, do not use the Services.
          </>
        }
        calloutTitle="Questions about these Terms?"
        calloutSub="Reach out and a real human will reply."
        calloutCta="Email support@hiresort.ai"
      />
    </>
  );
};

export default TermsClient;
