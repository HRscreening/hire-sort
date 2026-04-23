import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

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

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const togglePricing = () => setIsYearly(!isYearly);

  const renderPrice = (amount: string) => (
    <AnimatePresence mode="wait">
      <motion.span
        key={amount}
        className="amount"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3, ease }}
        style={{ display: 'inline-block' }}
      >
        {amount}
      </motion.span>
    </AnimatePresence>
  );

  return (
    <>

      <section className="pricing-section" id="pricing">
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={headerVariants}
        >
          <h2>Simple, <span className="accent">transparent</span> pricing</h2>
          <p>Start free. Upgrade as your hiring volume grows. No hidden fees.</p>
        </motion.div>

        <motion.div
          className="pricing-toggle"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
        >
          <span id="monthly-label" className={!isYearly ? 'active' : ''} onClick={() => setIsYearly(false)}>Monthly</span>
          <motion.div
            className={`switch ${isYearly ? 'active' : ''}`}
            id="pricing-switch"
            onClick={togglePricing}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 500, damping: 22 }}
          />
          <span id="yearly-label" className={isYearly ? 'active' : ''} onClick={() => setIsYearly(true)}>Yearly</span>
          <motion.span
            className="discount"
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 320, damping: 14 }}
          >
            Save 20%
          </motion.span>
        </motion.div>

        <motion.div
          className="pricing-grid"
          id={isYearly ? 'yearly-prices' : 'monthly-prices'}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={gridVariants}
        >
          {/* Free */}
          <motion.div
            className="pricing-card"
            variants={cardVariants}
            whileHover={{ y: -10, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
          >
            <div className="pricing-name">Free</div>
            <div className="pricing-price">
              {renderPrice('$0')}
              <span className="period">/month</span>
            </div>
            <p className="pricing-desc">Perfect for individuals and small teams getting started with AI-powered resume screening.&nbsp;

            </p>
            <ul className="pricing-features">
              {[
                'No Credit Card required',
                '50 resume AI analyses per month',
                'Bulk upload of up to 10 resumes at a time',
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
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                  {f}
                </motion.li>
              ))}
            </ul>
            <motion.a href="#" className="btn-secondary" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              Get started
            </motion.a>
          </motion.div>

          {/* Plus */}
          <motion.div
            className="pricing-card featured"
            variants={cardVariants}
            whileHover={{ y: -14, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
            animate={{
              boxShadow: [
                '0 10px 30px rgba(0,0,0,0.08)',
                '0 18px 42px rgba(0,0,0,0.12)',
                '0 10px 30px rgba(0,0,0,0.08)',
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="pricing-name">Plus</div>
            <div className="pricing-price">
              {renderPrice(isYearly ? '$20' : '$25')}
              <span className="period">/month</span>
            </div>
            <p className="pricing-desc">Built for teams that hire regularly and need faster, higher-volume screening. {isYearly && '(billed yearly)'}</p>
            <ul className="pricing-features">
              {[
                'Includes everything in Free',
                '1,000 AI resume analyses per month',
                'Bulk upload of up to 500 resumes at a time',
                'Priority AI processing',
                'Scale as you go — $0.05 per additional resume analysis.'
              ].map((f, i) => (
                <motion.li
                  key={f}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.06, duration: 0.4, ease }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                  {f}
                </motion.li>
              ))}
            </ul>
            <motion.a href="#" className="btn-primary" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              Get started
            </motion.a>
          </motion.div>

          {/* Pro */}
          <motion.div
            className="pricing-card"
            variants={cardVariants}
            whileHover={{ y: -10, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
          >
            <div className="pricing-name">Pro</div>
            <div className="pricing-price">
              {renderPrice(isYearly ? '$120' : '$150')}
              <span className="period">/month</span>
            </div>
            <p className="pricing-desc">Designed for high-volume hiring teams that need scale, flexibility, and greater control over screening workflows. {isYearly && '(billed yearly)'}</p>
            <ul className="pricing-features">
              {[
                'Includes everything in Plus',
                '10,000 AI resume analyses per month',
                'Bulk upload of up to 1,000 resumes at a time',
                'Reconfigure the scoring rubric and rescore candidates',
                'Scale as you go — $0.05 per additional resume analysis.',
              ].map((f, i) => (
                <motion.li
                  key={f}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.06, duration: 0.4, ease }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                  {f}
                </motion.li>
              ))}
            </ul>
            <motion.a href="#" className="btn-secondary" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              Get started
            </motion.a>
          </motion.div>
        </motion.div>
      </section >
      {/* <p className="text-center text-sm text-muted">
       Run out of credits? Keep going for only <strong>$0.05 per resume analysis</strong>.
      </p> */}
    </>
  );
};

export default Pricing;
