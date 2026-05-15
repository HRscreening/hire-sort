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

const Pricing = ({ isLoggedIn, plan = "FREE" }: PricingProps) => {
  const [isYearly, setIsYearly] = useState(false);


  const setBilling = (yearly: boolean) => {
    if (yearly !== isYearly) {
      trackEvent('pricing_billing_toggle', { period: yearly ? 'yearly' : 'monthly' });
    }
    setIsYearly(yearly);
  };

  const selectPlan = (plan: 'free' | 'business' | 'pro' | 'Enterprise') => () =>
    trackCTAClick('plan_select', 'pricing_' + plan + '_' + (isYearly ? 'yearly' : 'monthly'));

  function handleBtnTitle(plan: PlanType, currentPlan: PlanType) {
    if (!isLoggedIn) return 'Get started';
    if (plan === currentPlan) {
      return 'Current Plan';
    }
    if (["PRO", "BUSINESS", "ENTERPRISE"].includes(currentPlan) && plan === "FREE") {
      return 'Downgrade to Free';
    }
    if (plan === "BUSINESS" && currentPlan === "PRO") {
      return 'Downgrade to Business';
    }
    if (plan === "BUSINESS" && currentPlan === "ENTERPRISE") {
      return 'Downgrade to Business';
    }
    if (plan === "PLUS" && currentPlan === "PRO") {
      return 'Downgrade to Plus';
    }
    if (plan === "PLUS" && currentPlan === "ENTERPRISE") {
      return 'Downgrade to Plus';
    }

    if (plan === "PRO" && currentPlan === "ENTERPRISE") {
      return 'Downgrade to Pro';
    }

    if (plan === "ENTERPRISE" && ["FREE", "BUSINESS", "PRO"].includes(currentPlan)) {
      return 'Contact Us';
    }


    if (["BUSINESS", "PRO", "ENTERPRISE"].includes(plan) && currentPlan === "FREE") {
      return 'Upgrade Now';
    }

    return plan === "FREE" ? 'Get started' : 'Upgrade Now';
  }

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
          Simple, <span className="text-accent">transparent</span> pricing
        </h2>
        <p className="text-base leading-[1.6] text-charcoal-lt">
          Start free. Upgrade as your hiring volume grows. No hidden fees.
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
        className="mx-auto mt-14 grid max-w-105 grid-cols-1 gap-4 md:max-w-none md:grid-cols-4"
      >
        {/* Free */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -10, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
          className={cardBaseClass}
        >
          <div className={planNameClass}>Free</div>
          <div className="mb-1.5 flex items-baseline gap-1">
            <PriceAmount amount='$0' />
            <span className="text-sm text-charcoal-xlt">/month</span>
          </div>
          <p className={planDescClass}>
            Perfect for individuals and small teams getting started with AI-powered resume screening.
          </p>
          <ul className="mb-7 flex flex-1 list-none flex-col gap-2.5">
            {[
              'No Credit Card required',
              '**50** resume AI analyses per month',
              'Bulk upload of up to **10** resumes at a time',
              'End-to-end resume management',
              'Support for all major resume file formats',
              'Export feature',
            ].map((f, i) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.4, ease }}
                className={planFeatureClass}
              >
                <Check />
                <span dangerouslySetInnerHTML={{ __html: f.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-charcoal">$1</strong>') }} />
              </motion.li>
            ))}
          </ul>
          <motion.a href={`${main_app_url}/login`} onClick={selectPlan('free')} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} className={ctaSecondary}>
            {
              handleBtnTitle("FREE", plan)
            }
          </motion.a>
        </motion.div>

        {/* Business (featured) */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: (!isLoggedIn || plan === 'FREE') ? -14 : -10, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
          animate={(!isLoggedIn || plan === 'FREE') ? {
            boxShadow: [
              '0 10px 30px rgba(0,0,0,0.08)',
              '0 18px 42px rgba(0,0,0,0.12)',
              '0 10px 30px rgba(0,0,0,0.08)',
            ],
          } : undefined}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className={`${cardBaseClass} ${(!isLoggedIn || plan === 'FREE') ? `${cardFeaturedClass} ${featuredBadgeAfter}` : ''}`}
        >
          <div className={planNameClass}>Plus</div>
          <div className="mb-1.5 flex items-baseline gap-1">
            <PriceAmount amount={isYearly ? '$20' : '$25'} />
            <span className="text-sm text-charcoal-xlt">/month</span>
          </div>
          <p className={planDescClass}>
            Built for teams that hire regularly and need faster, higher-volume screening. {isYearly && '(billed yearly)'}
          </p>
          <ul className="mb-7 flex flex-1 list-none flex-col gap-2.5">
            {[
              'Includes everything in Free',
              '**1,000** AI resume analyses per month',
              'Bulk upload of up to **50** resumes at a time',
              'Priority AI processing',
              `Scale as you go — **0.05** per additional resume analysis.`,
            ].map((f, i) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.06, duration: 0.4, ease }}
                className={planFeatureClass}
              >
                <Check />
                <span dangerouslySetInnerHTML={{ __html: f.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-charcoal">$1</strong>') }} />
              </motion.li>
            ))}
          </ul>
          <motion.a href={checkoutUrl('PLUS', isYearly)} onClick={selectPlan('business')} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }} className={(!isLoggedIn || plan === 'FREE') ? ctaPrimary : `${plan === "BUSINESS" ? ctaPrimary : ctaSecondary}`}>
            {
              handleBtnTitle("BUSINESS", plan)
            }
          </motion.a>
        </motion.div>

        {/* Pro */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -10, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
          className={cardBaseClass}
        >
          <div className={planNameClass}>Pro</div>
          <div className="mb-1.5 flex items-baseline gap-1">
            <PriceAmount amount={isYearly ? '$120' : '$150'} />
            <span className="text-sm text-charcoal-xlt">/month</span>
          </div>
          <p className={planDescClass}>
            Designed for high-volume hiring teams that need scale, flexibility, and greater control over screening workflows. {isYearly && '(billed yearly)'}
          </p>
          <ul className="mb-7 flex flex-1 list-none flex-col gap-2.5">
            {[
              'Includes everything in Business',
              '**10,000** AI resume analyses per month',
              'Bulk upload of up to **100** resumes at a time',
              'Reconfigure the scoring rubric and rescore candidates',
              `Scale as you go — **0.035** per additional resume analysis.`,
            ].map((f, i) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.06, duration: 0.4, ease }}
                className={planFeatureClass}
              >
                <Check />
                <span dangerouslySetInnerHTML={{ __html: f.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-charcoal">$1</strong>') }} />
              </motion.li>
            ))}
          </ul>
          <motion.a href={checkoutUrl('PRO', isYearly)} onClick={selectPlan('pro')} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} className={`${plan === "PRO" ? ctaPrimary : ctaSecondary}`}>
            {handleBtnTitle("PRO", plan)}
          </motion.a>
        </motion.div>

        {/* Enterprise */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -10, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
          className={`${cardBaseClass} bg-ivory-light`}
        >
          <div className={planNameClass}>Enterprise</div>
          <div className="mb-1.5 flex items-baseline gap-1">
            <PriceAmount amount="Custom" />
          </div>
          <p className={planDescClass}>
            Built for large organizations that need advanced security, customization, and dedicated support at scale.
          </p>
          <ul className="mb-7 flex flex-1 list-none flex-col gap-2.5">
            {[
              'Everything in Pro',
              'SSO & advanced security',
              'Custom AI scoring & workflows',
              'Bulk upload **500+** resumes at a time',
              'API & ATS integrations',
              'SLA & uptime guarantee',
              'Data residency options & compliance',
            ].map((f, i) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.06, duration: 0.4, ease }}
                className={planFeatureClass}
              >
                <Check />
                <span dangerouslySetInnerHTML={{ __html: f.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-charcoal">$1</strong>') }} />
              </motion.li>
            ))}
          </ul>
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} className="mt-auto">
            <Link href="/contact" onClick={selectPlan('Enterprise')} className={`${plan === "ENTERPRISE" ? ctaPrimary : ctaSecondary}`}>
              {handleBtnTitle("ENTERPRISE", plan)}
            </Link>
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Pricing;
