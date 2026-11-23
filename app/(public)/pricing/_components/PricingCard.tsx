'use client';

import { motion, AnimatePresence, type Variants } from 'framer-motion';
import Link from 'next/link';
import type { PlanSpec, PlanType } from '../PlanSpec.type';

const main_app_url = process.env.NEXT_PUBLIC_MAIN_APP_URL || 'http://localhost:3000';

const PLAN_SLUGS: Record<string, string> = {
  LITE: 'lite',
  BUSINESS: 'business',
  PLUS: 'plus',
  PRO: 'pro',
  ENTERPRISE: 'enterprise',
};

const PLAN_DESCRIPTIONS: Record<string, string> = {
  FREE: 'Try it on one active role.',
  LITE: 'Occasional hiring',
  PLUS: 'Regular hiring',
  PRO: 'High-volume hiring',
  BUSINESS: 'For agencies and high-volume teams that need more roles and throughput.',
  ENTERPRISE: 'Built for large organizations that need advanced security, customization, and dedicated support at scale.',
};

const checkoutUrl = (plan: string, yearly: boolean) =>
  `${main_app_url}/checkout/${PLAN_SLUGS[plan] || plan.toLowerCase()}?cycle=${yearly ? 'yearly' : 'monthly'}&from=pricing`;
const ease = [0.22, 1, 0.36, 1] as const;

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
  'flex h-full min-h-120 flex-col rounded-2xl border border-line-soft bg-white p-6 transition-all hover:shadow-lg sm:p-7';
const cardFeaturedClass =
  'relative shadow-[0_8px_40px_rgba(0,0,0,0.10)] !border-charcoal';
const featuredBadgeAfter =
  'after:absolute after:left-1/2 after:-top-3 after:-translate-x-1/2 after:rounded-full after:bg-charcoal after:px-4 after:py-1 after:text-[11.5px] after:font-bold after:tracking-[0.5px] after:text-white after:content-["Most_Popular"]';
const planNameClass = 'mb-4 text-[15px] font-semibold text-charcoal-lt';
const planDescClass = 'mb-6 text-[13.5px] leading-[1.5] text-charcoal-lt';
const planFeatureClass = 'flex items-start gap-2 text-[13.5px] leading-[1.5] text-charcoal-md';
const ctaButtonBase =
  'mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-center text-[14.5px] font-semibold no-underline transition-all';
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


interface PricingCardProps {
  plan: PlanSpec;
  planIdx: number;
  isYearly: boolean;
  currentPlan: PlanType;
  isLoggedIn: boolean;
  buttonLabel: string;
  isDowngrade: boolean;
  onSelect: () => void;
}

export function PricingCard({ plan, planIdx, isYearly, currentPlan, isLoggedIn, buttonLabel, isDowngrade, onSelect }: PricingCardProps) {
  const renderFeature = (f: string) => (
    <span dangerouslySetInnerHTML={{ __html: f.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-charcoal">$1</strong>') }} />
  );
  const isFeatured = plan.key === 'PLUS';
  const isEnterprise = plan.key === 'ENTERPRISE';
  const isFree = plan.key === 'FREE';
  const isCurrent = isLoggedIn && plan.key === currentPlan;
  const isPaidYearly = isYearly && !isFree && !isEnterprise && plan.yearly_price_monthly_usd && plan.yearly_price_monthly_usd > 0;

  return (
    <motion.div
      key={plan.key}
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
      <div className={planNameClass}>{plan.display_name}</div>
      <div className="mb-4 flex items-baseline gap-1">
        <PriceAmount amount={formatPrice(plan, isYearly)} />
        {!isCustomPriced(plan) && (
          <span className="text-sm text-charcoal-xlt">/month</span>
        )}
      </div>
      <p className={planDescClass}>
        {PLAN_DESCRIPTIONS[plan.key] || 'For teams that need automated sourcing, screening, and hiring.'}{' '}
        {isPaidYearly && formatAnnualTotal(plan)}
      </p>
      {Number.isFinite(plan.credit_limit) && plan.credit_limit >= 0 && (
        <p className="mb-4 rounded-full bg-[#fff1e8] px-3 py-1.5 text-sm font-medium text-[#c85a17]">
          {plan.credit_limit}{' '}
          <a
            href="#rate"
            aria-label={`Credit rates for ${plan.display_name}`}
            className="rounded-sm underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c85a17]"
          >
            credits
          </a>{' '}
          / month
        </p>
      )}
      <ul className="mb-7 flex flex-1 list-none flex-col gap-2.5">
        {plan.display_features.map((f, i) => (
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
        <span className={`${ctaButtonBase} cursor-default border border-[#7a7a7a] bg-[#7a7a7a] text-white`}>
          Current Plan
        </span>
      ) : isEnterprise ? (
        <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} className="mt-auto">
          <Link href="/contact" onClick={onSelect} className={ctaSecondary}>
            {buttonLabel}
          </Link>
        </motion.div>
      ) : isFree ? (
        <motion.a
          href={`${main_app_url}/${isDowngrade ? 'upgrade' : 'login'}`}
          onClick={onSelect}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className={ctaSecondary}
        >
          {!isLoggedIn ? 'Start free' : buttonLabel}
        </motion.a>
      ) : (
        <motion.a
          href={isDowngrade ? `${main_app_url}/upgrade` : checkoutUrl(plan.key, isYearly)}
          onClick={onSelect}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className={isFeatured ? ctaPrimary : ctaSecondary}
        >
          {buttonLabel}
        </motion.a>
      )}
    </motion.div>
  );
}
