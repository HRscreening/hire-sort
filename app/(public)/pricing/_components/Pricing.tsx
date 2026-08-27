'use client';

import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { trackCTAClick, trackEvent } from '@/lib/google_analytics_tracker';
import Link from 'next/link';
import type { PlanType } from '@/types/types';

const main_app_url = process.env.NEXT_PUBLIC_MAIN_APP_URL || 'http://localhost:3000';

const PLAN_SLUGS: Record<Exclude<PlanType, 'FREE'>, string> = {
  BUSINESS: 'business',
  PLUS: 'plus',
  PRO: 'pro',
  ENTERPRISE: 'enterprise',
};

const checkoutUrl = (plan: 'BUSINESS' | 'PLUS' | 'PRO', yearly: boolean) =>
  `${main_app_url}/checkout/${PLAN_SLUGS[plan]}?cycle=${yearly ? 'yearly' : 'monthly'}&from=pricing`;
const ease = [0.22, 1, 0.36, 1] as const;

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.15 } },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } },
};

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="mt-0.5 h-4 w-4 shrink-0 text-success">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);


const cardBaseClass =
  'flex h-full flex-col rounded-xl border border-line-soft bg-white p-7 transition-all hover:shadow-lg';
const cardFeaturedClass =
  'relative shadow-[0_8px_40px_rgba(0,0,0,0.10)] !border-charcoal';
const featuredBadgeAfter =
  'after:absolute after:left-1/2 after:-top-3 after:-translate-x-1/2 after:rounded-full after:bg-charcoal after:px-4 after:py-1 after:text-[11.5px] after:font-bold after:tracking-[0.5px] after:text-white after:content-["Most_Popular"]';
const planNameClass = 'mb-2 text-[15px] font-semibold text-charcoal-lt';
const planDescClass = 'mb-6 text-[13.5px] leading-[1.5] text-charcoal-lt';
const planFeatureClass = 'flex items-start gap-2 text-[13.5px] leading-[1.5] text-charcoal-md';
const ctaButtonBase =
  'mt-auto inline-flex w-full items-center justify-center gap-2 rounded-md px-6 py-3 text-center text-[14.5px] font-semibold no-underline transition-all';
const ctaPrimary = `${ctaButtonBase} border border-copper bg-copper text-white hover:bg-copper-dark`;
const ctaSecondary = `${ctaButtonBase} border border-line bg-white text-charcoal hover:border-charcoal-xlt hover:bg-ivory-light`;

const PriceAmount = ({ amount }: { amount: string }) => (
  <AnimatePresence mode="wait">
    <motion.span
      key={amount}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease }}
      className="inline-block text-[40px] font-extrabold tracking-[-1.5px] text-charcoal"
    >
      {amount}
    </motion.span>
  </AnimatePresence>
);


type PricingProps = {
  isLoggedIn: boolean;
  plan: PlanType;
};

type PlanCard = {
  name: string;
  mappedPlan: PlanType;
  checkoutPlan?: 'BUSINESS' | 'PLUS' | 'PRO';
  monthly: string;
  yearly?: string;
  suffix?: string;
  description: string;
  features: string[];
  featured?: boolean;
  contact?: boolean;
};

const plans: PlanCard[] = [
  {
    name: 'Free',
    mappedPlan: 'FREE',
    monthly: '$0',
    suffix: '/month',
    description: 'Try HireSort on your first role before you upgrade.',
    features: [
      '1 active role',
      '**250** hiring credits',
      'AI JD generation',
      'Limited job posting',
      'AI resume screening',
      'A few AI phone screens and interviews',
      'No credit card required',
    ],
  },
  {
    name: 'Starter',
    mappedPlan: 'PLUS',
    checkoutPlan: 'PLUS',
    monthly: '$49',
    yearly: '$39',
    suffix: '/month',
    description: 'For small teams hiring occasionally with automated screening and interviews.',
    features: [
      '2 active roles',
      '**1,000** hiring credits/month',
      'Automated candidate screening',
      'AI phone screens',
      'Basic structured shortlists',
      'Extra credits available',
    ],
  },
  {
    name: 'Growth',
    mappedPlan: 'PRO',
    checkoutPlan: 'PRO',
    monthly: '$149',
    yearly: '$119',
    suffix: '/month',
    description: 'For startups and recruitment teams running sourcing, screening, and interviews.',
    features: [
      '5 active roles',
      '**4,000** hiring credits/month',
      'Agentic sourcing workflows',
      'AI resume screening',
      'AI phone screens and first-round interviews',
      'Recruiter-in-the-loop approvals',
      'Structured hiring data',
    ],
    featured: true,
  },
  {
    name: 'Scale',
    mappedPlan: 'BUSINESS',
    monthly: '$399',
    yearly: '$319',
    suffix: '/month',
    description: 'For agencies and high-volume teams that need more roles and throughput.',
    features: [
      '15 active roles',
      '**12,000** hiring credits/month',
      'Team access',
      'Higher sourcing volume',
      'Priority workflows',
      'Hiring funnel analytics',
      'Custom workflow support',
    ],
    contact: true,
  },
  {
    name: 'Enterprise',
    mappedPlan: 'ENTERPRISE',
    monthly: 'Custom',
    description: 'For large teams that need custom credits, integrations, security, and support.',
    features: [
      'Custom active roles',
      'Custom hiring credits',
      'ATS and workflow integrations',
      'SSO and advanced security',
      'Compliance support',
      'Dedicated onboarding',
      'SLA and uptime support',
    ],
    contact: true,
  },
];

const creditRows = [
  ['Resume screening', '1 credit'],
  ['AI phone screen', '20 credits'],
  ['AI first-round interview', '50 credits'],
  ['Extra sourcing or job posting action', '10-25 credits'],
];

const extraCreditRows = [
  ['500 credits', '$25'],
  ['2,000 credits', '$90'],
  ['Agency and bulk volume', 'Custom'],
];

const Pricing = ({ isLoggedIn, plan = "FREE" }: PricingProps) => {
  const [isYearly, setIsYearly] = useState(false);


  const setBilling = (yearly: boolean) => {
    if (yearly !== isYearly) {
      trackEvent('pricing_billing_toggle', { period: yearly ? 'yearly' : 'monthly' });
    }
    setIsYearly(yearly);
  };

  const selectPlan = (plan: string) => () =>
    trackCTAClick('plan_select', 'pricing_' + plan.toLowerCase().replace(/\s+/g, '_') + '_' + (isYearly ? 'yearly' : 'monthly'));

  function handleBtnTitle(plan: PlanType, currentPlan: PlanType) {
    const planLabels: Record<PlanType, string> = {
      FREE: 'Free',
      PLUS: 'Starter',
      PRO: 'Growth',
      BUSINESS: 'Scale',
      ENTERPRISE: 'Enterprise',
    };
    const planOrder: Record<PlanType, number> = {
      FREE: 0,
      PLUS: 1,
      PRO: 2,
      BUSINESS: 3,
      ENTERPRISE: 4,
    };

    if (!isLoggedIn) return 'Get started';
    if (plan === currentPlan) {
      return 'Current Plan';
    }
    if (plan === "FREE") {
      return 'Downgrade to Free';
    }
    if (plan === "ENTERPRISE") {
      return 'Contact Us';
    }
    if (planOrder[plan] < planOrder[currentPlan]) {
      return `Downgrade to ${planLabels[plan]}`;
    }
    return `Upgrade to ${planLabels[plan]}`;
  }

  const renderFeature = (f: string) => (
    <span dangerouslySetInnerHTML={{ __html: f.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-charcoal">$1</strong>') }} />
  );

  return (
    <section id="pricing" className="mx-auto max-w-315 px-6 py-16">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={headerVariants}
        className="mx-auto mb-8 max-w-150 text-center"
      >
        <h2 className="mb-3 text-[clamp(28px,4vw,40px)] font-extrabold leading-[1.15] tracking-[-1px] text-charcoal">
          Pricing built around <span className="text-accent">hiring credits</span>
        </h2>
        <p className="text-base leading-[1.6] text-charcoal-lt">
          Start with one free role. Upgrade when you need more roles, sourcing, AI phone screens, and first-round interviews.
        </p>
      </motion.div>

      {/* Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease }}
        className="mt-8 flex items-center justify-center gap-4"
      >
        <span
          onClick={() => setBilling(false)}
          className={`cursor-pointer text-[14.5px] font-semibold transition-colors ${isYearly ? 'text-charcoal-lt' : 'text-charcoal'}`}
        >
          Monthly
        </span>
        <motion.div
          onClick={() => setBilling(!isYearly)}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 500, damping: 22 }}
          className={`relative h-6 w-12 cursor-pointer rounded-full p-0.5 transition-colors ${isYearly ? 'bg-copper' : 'bg-ivory-dark'}`}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-transform ${isYearly ? 'translate-x-6' : ''}`}
          />
        </motion.div>
        <span
          onClick={() => setBilling(true)}
          className={`cursor-pointer text-[14.5px] font-semibold transition-colors ${isYearly ? 'text-charcoal' : 'text-charcoal-lt'}`}
        >
          Yearly
        </span>
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 320, damping: 14 }}
          className="-ml-2 whitespace-nowrap rounded-full bg-success-bg px-2.5 py-0.5 text-[11px] font-bold text-success"
        >
          Save 20%
        </motion.span>

        {/* <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
          className="ml-4 rounded border border-line-soft bg-white px-2 py-1 text-[13px] font-semibold text-charcoal outline-none transition-all hover:border-charcoal-lt"
        >
          {Object.entries(CURRENCIES).map(([code, { label }]) => (
            <option key={code} value={code}>
              {label}
            </option>
          ))}
        </select> */}
      </motion.div>

      {/* Cards */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={gridVariants}
        className="mx-auto mt-14 grid max-w-105 grid-cols-1 gap-4 md:max-w-none md:grid-cols-2 xl:grid-cols-5"
      >
        {plans.map((p, planIndex) => {
          const amount = isYearly && p.yearly ? p.yearly : p.monthly;
          const isFeatured = p.featured && (!isLoggedIn || plan === 'FREE');
          const href = p.mappedPlan === 'FREE'
            ? `${main_app_url}/login`
            : p.contact || !p.checkoutPlan
              ? '/contact'
              : checkoutUrl(p.checkoutPlan, isYearly);
          const buttonClass = isFeatured || plan === p.mappedPlan ? ctaPrimary : ctaSecondary;
          const buttonLabel = p.contact ? 'Talk to sales' : p.mappedPlan === 'FREE' ? 'Start free' : handleBtnTitle(p.mappedPlan, plan);

          return (
            <motion.div
              key={p.name}
              variants={cardVariants}
              whileHover={{ y: isFeatured ? -14 : -10, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              animate={isFeatured ? {
                boxShadow: [
                  '0 10px 30px rgba(0,0,0,0.08)',
                  '0 18px 42px rgba(0,0,0,0.12)',
                  '0 10px 30px rgba(0,0,0,0.08)',
                ],
              } : undefined}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className={`${cardBaseClass} ${isFeatured ? `${cardFeaturedClass} ${featuredBadgeAfter}` : ''} ${p.contact ? 'bg-ivory-light' : ''}`}
            >
              <div className={planNameClass}>{p.name}</div>
              <div className="mb-1.5 flex items-baseline gap-1">
                <PriceAmount amount={amount} />
                {p.suffix ? <span className="text-sm text-charcoal-xlt">{p.suffix}</span> : null}
              </div>
              <p className={planDescClass}>
                {p.description} {isYearly && p.yearly ? '(billed yearly)' : ''}
              </p>
              <ul className="mb-7 flex flex-1 list-none flex-col gap-2.5">
                {p.features.map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (planIndex * 0.06) + i * 0.04, duration: 0.4, ease }}
                    className={planFeatureClass}
                  >
                    <Check />
                    {renderFeature(f)}
                  </motion.li>
                ))}
              </ul>
              {href.startsWith('/') ? (
                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} className="mt-auto">
                  <Link href={href} onClick={selectPlan(p.name)} className={buttonClass}>
                    {buttonLabel}
                  </Link>
                </motion.div>
              ) : (
                <motion.a href={href} onClick={selectPlan(p.name)} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} className={buttonClass}>
                  {buttonLabel}
                </motion.a>
              )}
            </motion.div>
          );
        })}

      </motion.div>

      <div className="mx-auto mt-12 grid max-w-260 grid-cols-1 gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
          className="rounded-xl border border-charcoal bg-charcoal p-7 text-white"
        >
          <div className="mb-2 text-sm font-semibold text-white/70">Done-for-you hiring</div>
          <h3 className="mb-3 text-2xl font-extrabold tracking-[-0.5px]">Pay success fee when you hire</h3>
          <p className="mb-6 max-w-150 text-sm leading-6 text-white/75">
            HireSort recruiters understand your role, run proprietary agentic workflows, and share finalized shortlists in 3-7 days. No monthly SaaS commitment required.
          </p>
          <div className="mb-6 grid gap-3 sm:grid-cols-3">
            {[
              ['6%-8%', 'of annual CTC on successful hire'],
              ['0', 'upfront setup fee initially'],
              ['3-7 days', 'to get finalized shortlists'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-lg border border-white/15 bg-white/5 p-4">
                <div className="text-2xl font-extrabold">{value}</div>
                <div className="mt-1 text-xs leading-5 text-white/65">{label}</div>
              </div>
            ))}
          </div>
          <Link href="/contact" onClick={selectPlan('done for you')} className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-semibold text-charcoal no-underline transition hover:bg-ivory-light">
            Get candidates
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease, delay: 0.08 }}
          className="rounded-xl border border-line-soft bg-white p-7"
        >
          <div className="mb-2 text-sm font-semibold text-charcoal-lt">How credits work</div>
          <h3 className="mb-3 text-2xl font-extrabold tracking-[-0.5px] text-charcoal">Use credits across hiring tasks</h3>
          <p className="mb-5 text-sm leading-6 text-charcoal-lt">
            Every plan includes hiring credits. Use them for resume screening, AI phone screening, interviews, and sourcing actions.
          </p>
          <div className="space-y-2">
            {creditRows.map(([action, cost]) => (
              <div key={action} className="flex items-center justify-between rounded-md bg-ivory-light px-4 py-3 text-sm">
                <span className="text-charcoal-md">{action}</span>
                <strong className="text-charcoal">{cost}</strong>
              </div>
            ))}
          </div>
          <div className="mt-5 border-t border-line-soft pt-5">
            <div className="mb-2 text-sm font-semibold text-charcoal">Extra credits</div>
            <div className="space-y-2">
              {extraCreditRows.map(([pack, cost]) => (
                <div key={pack} className="flex items-center justify-between text-sm text-charcoal-lt">
                  <span>{pack}</span>
                  <strong className="text-charcoal">{cost}</strong>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
