'use client';

import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { trackCTAClick, trackEvent } from '@/lib/google_analytics_tracker';
import type { PlanSpec, PlanType } from '../PlanSpec.type';
import { CreditUsageSection, ManagedRecruitmentPricing } from './Utils';
import { PricingCard } from './PricingCard';
import EnterprisePlanCard from './EnterpriseCard';

const PLAN_ORDER: Record<string, number> = {
  FREE: 0,
  LITE: 1,
  PLUS: 2,
  PRO: 3,
  BUSINESS: 4,
  ENTERPRISE: 5,
  UNLIMITED: 6,
};

const ease = [0.22, 1, 0.36, 1] as const;

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.15 } },
};
type PricingProps = {
  isLoggedIn: boolean;
  plan: PlanType;
  plans: PlanSpec[];
};

const Pricing = ({ isLoggedIn, plan: currentPlan = "FREE", plans = [] }: PricingProps) => {
  const [isYearly, setIsYearly] = useState(false);

  const orderedPlans = [...plans]
    .filter((planItem) => planItem.key !== 'ENTERPRISE')
    .sort((a, b) => (PLAN_ORDER[a.key] ?? 99) - (PLAN_ORDER[b.key] ?? 99));
  const enterprisePlan = plans.find((planItem) => planItem.key === 'ENTERPRISE');

  const setBilling = (yearly: boolean) => {
    if (yearly !== isYearly) {
      trackEvent('pricing_billing_toggle', { period: yearly ? 'yearly' : 'monthly' });
    }
    setIsYearly(yearly);
  };

  const selectPlan = (planName: string) => () =>
    trackCTAClick('plan_select', 'pricing_' + planName.toLowerCase().replace(/\s+/g, '_') + '_' + (isYearly ? 'yearly' : 'monthly'));

  function isDowngradePlan(planKey: PlanType): boolean {
    const planOrder: Record<string, number> = {
      FREE: 0,
      LITE: 1,
      PLUS: 2,
      PRO: 3,
      BUSINESS: 4,
      ENTERPRISE: 5,
    };

    return isLoggedIn && planKey !== currentPlan && planKey !== 'ENTERPRISE' && (
      planKey === 'FREE' || (planOrder[planKey] ?? 0) < (planOrder[currentPlan] ?? 0)
    );
  }

  function handleBtnTitle(planKey: PlanType, displayName?: string) {
    const planLabels: Record<string, string> = {
      FREE: 'Free',
      LITE: 'Lite',
      PLUS: 'Plus',
      PRO: 'Pro',
      BUSINESS: 'Scale',
      ENTERPRISE: 'Enterprise',
    };
    const label = displayName || planLabels[planKey] || planKey;

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
    if (isDowngradePlan(planKey)) {
      return `Downgrade to ${label}`;
    }
    return `Upgrade to ${label}`;
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
        {orderedPlans.map((planItem, planIdx) => (
          <PricingCard
            key={planItem.key}
            plan={planItem}
            planIdx={planIdx}
            isYearly={isYearly}
            currentPlan={currentPlan}
            isLoggedIn={isLoggedIn}
            buttonLabel={handleBtnTitle(planItem.key, planItem.display_name)}
            isDowngrade={isDowngradePlan(planItem.key)}
            onSelect={selectPlan(planItem.display_name)}
          />
        ))}
      </motion.div>
        
      {enterprisePlan && (
        <EnterprisePlanCard
          displayName={enterprisePlan.display_name}
          isCurrent={isLoggedIn && currentPlan === 'ENTERPRISE'}
          buttonLabel={handleBtnTitle(enterprisePlan.key, enterprisePlan.display_name)}
          onSelect={selectPlan(enterprisePlan.display_name)}
        />
      )}

      <div className="mx-auto mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ManagedRecruitmentPricing onContactClick={selectPlan('done for you')} />
        <CreditUsageSection />
      </div>
    </section>
  );
};

export default Pricing;
