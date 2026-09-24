'use client';

import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { trackCTAClick, trackEvent } from '@/lib/google_analytics_tracker';
import Link from 'next/link';
import type { PlanSpec, PlanType } from '../PlanSpec.type';

const main_app_url = process.env.NEXT_PUBLIC_MAIN_APP_URL || 'http://localhost:3000';

const PLAN_SLUGS: Record<string, string> = {
  BUSINESS: 'business',
  PLUS: 'plus',
  PRO: 'pro',
  ENTERPRISE: 'enterprise',
};

const PLAN_ORDER: Record<string, number> = {
  FREE: 0,
  PLUS: 1,
  PRO: 2,
  BUSINESS: 3,
  ENTERPRISE: 4,
  UNLIMITED: 5,
};

const PLAN_DESCRIPTIONS: Record<string, string> = {
  FREE: 'Perfect for individuals and small teams getting started with AI-powered resume screening.',
  PLUS: 'Built for teams that hire regularly and need faster, higher-volume screening.',
  PRO: 'Designed for high-volume hiring teams that need scale, flexibility, and greater control over screening workflows.',
  BUSINESS: 'For agencies and high-volume teams that need more roles and throughput.',
  ENTERPRISE: 'Built for large organizations that need advanced security, customization, and dedicated support at scale.',
};

const checkoutUrl = (plan: string, yearly: boolean) =>
  `${main_app_url}/checkout/${PLAN_SLUGS[plan] || plan.toLowerCase()}?cycle=${yearly ? 'yearly' : 'monthly'}&from=pricing`;
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
  plans: PlanSpec[];
};

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

function formatPrice(plan: PlanSpec, isYearly: boolean): string {
  if (plan.key === 'ENTERPRISE' || plan.price_label === 'Custom') return 'Custom';
  if (isYearly) {
    if (plan.yearly_price_monthly_usd !== undefined) {
      return plan.yearly_price_monthly_usd === 0
        ? '$0'
        : `$${plan.yearly_price_monthly_usd % 1 === 0 ? plan.yearly_price_monthly_usd : plan.yearly_price_monthly_usd.toFixed(2)}`;
    }
    return plan.yearly_price_label.replace(/\/mo.*$/, '') || '$0';
  }
  if (plan.price_monthly_usd !== undefined) return `$${plan.price_monthly_usd}`;
  return plan.price_label.replace(/\/mo.*$/, '') || '$0';
}

function formatAnnualTotal(plan: PlanSpec): string | null {
  if (plan.key === 'ENTERPRISE' || plan.key === 'FREE') return null;
  if (plan.yearly_price_monthly_usd !== undefined && plan.yearly_price_monthly_usd > 0) {
    const total = plan.yearly_price_monthly_usd * 12;
    const formatted = total % 1 === 0 ? `$${total}` : `$${total.toFixed(2)}`;
    return `(billed at ${formatted}/year)`;
  }
  return '(billed yearly)';
}

function isCustomPriced(plan: PlanSpec): boolean {
  return plan.key === 'ENTERPRISE' || plan.price_label === 'Custom' || (plan.price_monthly_usd === undefined && plan.key !== 'FREE');
}

const Pricing = ({ isLoggedIn, plan: currentPlan = "FREE", plans = [] }: PricingProps) => {
  const [isYearly, setIsYearly] = useState(false);

  const orderedPlans = [...plans].sort((a, b) => (PLAN_ORDER[a.key] ?? 99) - (PLAN_ORDER[b.key] ?? 99));

  const setBilling = (yearly: boolean) => {
    if (yearly !== isYearly) {
      trackEvent('pricing_billing_toggle', { period: yearly ? 'yearly' : 'monthly' });
    }
    setIsYearly(yearly);
  };

  const selectPlan = (planName: string) => () =>
    trackCTAClick('plan_select', 'pricing_' + planName.toLowerCase().replace(/\s+/g, '_') + '_' + (isYearly ? 'yearly' : 'monthly'));

  function handleBtnTitle(planKey: PlanType, displayName?: string) {
    const planLabels: Record<string, string> = {
      FREE: 'Free',
      PLUS: 'Plus',
      PRO: 'Pro',
      BUSINESS: 'Scale',
      ENTERPRISE: 'Enterprise',
    };
    const label = displayName || planLabels[planKey] || planKey;
    const planOrder: Record<string, number> = {
      FREE: 0,
      PLUS: 1,
      PRO: 2,
      BUSINESS: 3,
      ENTERPRISE: 4,
    };

    if (!isLoggedIn) return 'Get started';
    if (planKey === currentPlan) {
      return 'Current Plan';
    }
    if (planKey === "FREE") {
      return 'Downgrade to Free';
    }
    if (planKey === "ENTERPRISE") {
      return 'Contact Us';
    }
    if ((planOrder[planKey] ?? 0) < (planOrder[currentPlan] ?? 0)) {
      return `Downgrade to ${label}`;
    }
    return `Upgrade to ${label}`;
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
      </motion.div>

      {/* Cards */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={gridVariants}
        className="mx-auto mt-10 sm:mt-14 grid max-w-105 grid-cols-1 gap-6 md:max-w-none md:grid-cols-2 xl:grid-cols-4 md:gap-4"
      >
        {orderedPlans.map((planItem, planIdx) => {
          const isFeatured = planItem.key === 'PRO' && (!isLoggedIn || currentPlan === 'FREE');
          const isEnterprise = planItem.key === 'ENTERPRISE';
          const isFree = planItem.key === 'FREE';
          const isCurrent = isLoggedIn && planItem.key === currentPlan;
          const isPaidYearly = isYearly && !isFree && !isEnterprise && planItem.yearly_price_monthly_usd && planItem.yearly_price_monthly_usd > 0;

          return (
            <motion.div
              key={planItem.key}
              variants={cardVariants}
              whileHover={{ y: isFeatured ? -14 : -10, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              animate={isFeatured ? {
                boxShadow: [
                  '0 10px 30px rgba(0,0,0,0.08)',
                  '0 18px 42px rgba(0,0,0,0.12)',
                  '0 10px 30px rgba(0,0,0,0.08)',
                ],
              } : undefined}
              transition={isFeatured ? { duration: 4, repeat: Infinity, ease: 'easeInOut' } : undefined}
              className={[
                cardBaseClass,
                isEnterprise ? 'bg-ivory-light' : '',
                isFeatured ? `${cardFeaturedClass} ${featuredBadgeAfter}` : '',
                isCurrent ? '!border-charcoal' : '',
              ].filter(Boolean).join(' ')}
            >
              <div className={planNameClass}>{planItem.display_name}</div>
              <div className="mb-1.5 flex items-baseline gap-1">
                <PriceAmount amount={formatPrice(planItem, isYearly)} />
                {!isCustomPriced(planItem) && (
                  <span className="text-sm text-charcoal-xlt">/month</span>
                )}
              </div>
              <p className={planDescClass}>
                {PLAN_DESCRIPTIONS[planItem.key] || 'For teams that need automated sourcing, screening, and hiring.'}{' '}
                {isPaidYearly && formatAnnualTotal(planItem)}
              </p>
              <ul className="mb-7 flex flex-1 list-none flex-col gap-2.5">
                {planItem.display_features.map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + planIdx * 0.1 + i * 0.04, duration: 0.4, ease }}
                    className={planFeatureClass}
                  >
                    <Check />
                    {renderFeature(f)}
                  </motion.li>
                ))}
              </ul>

              {isCurrent ? (
                <span className={`${ctaPrimary} cursor-default opacity-70`}>
                  Current Plan
                </span>
              ) : isEnterprise ? (
                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} className="mt-auto">
                  <Link href="/contact" onClick={selectPlan(planItem.display_name)} className={ctaSecondary}>
                    {handleBtnTitle(planItem.key, planItem.display_name)}
                  </Link>
                </motion.div>
              ) : isFree ? (
                <motion.a
                  href={`${main_app_url}/login`}
                  onClick={selectPlan(planItem.display_name)}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className={ctaSecondary}
                >
                  {!isLoggedIn ? 'Start free' : handleBtnTitle(planItem.key, planItem.display_name)}
                </motion.a>
              ) : (
                <motion.a
                  href={checkoutUrl(planItem.key, isYearly)}
                  onClick={selectPlan(planItem.display_name)}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className={isFeatured ? ctaPrimary : ctaSecondary}
                >
                  {handleBtnTitle(planItem.key, planItem.display_name)}
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
              ['10%-15%', 'of annual CTC on successful hire'],
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
