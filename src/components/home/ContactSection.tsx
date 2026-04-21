import { Link } from '@tanstack/react-router';
import { Mail, ArrowRight, MessageCircle, Clock } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease } },
};

const leftStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

const ContactSection = () => {
  return (
    <section className="contact-section" id="contact">
      <motion.div
        className="contact-card"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={cardVariants}
      >
        <motion.div
          className="contact-glow"
          aria-hidden="true"
          animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div className="contact-left" variants={leftStagger}>
          <motion.div className="contact-eyebrow" variants={item}>
            <Mail size={13} strokeWidth={2.5} />
            <span>Get in touch</span>
          </motion.div>
          <motion.h2 variants={item}>
            Have a question? <span className="accent">Let's talk.</span>
          </motion.h2>
          <motion.p variants={item}>
            Need custom workflows, enterprise pricing, or guidance on rolling out HireSort
            across your team? Our team responds within one business day &mdash; no forms, no
            runaround, just straightforward answers from the people who build the product.
          </motion.p>
          <motion.div className="contact-cta-row" variants={item}>
            <Link to="/contact_us" className="btn-primary hero-cta-btn">
              <motion.span
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                whileHover={{ x: 2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              >
                Contact us
                <ArrowRight size={16} strokeWidth={2.5} />
              </motion.span>
            </Link>
            <span className="contact-sub">
              <Clock size={13} strokeWidth={2.5} /> Typical response in under 24 hours
            </span>
          </motion.div>
        </motion.div>

        <div className="contact-visual" aria-hidden="true">
          {[
            { cls: 'contact-float-1', icon: <MessageCircle size={14} strokeWidth={2.5} />, title: 'Custom workflows', sub: 'Tailored to your ATS', accent: false, delay: 0.3, yLoop: [0, -8, 0], dur: 5.5 },
            { cls: 'contact-float-2', icon: <Mail size={14} strokeWidth={2.5} />, title: 'Enterprise pricing', sub: 'Built for scale', accent: true, delay: 0.45, yLoop: [0, 8, 0], dur: 6.5 },
            { cls: 'contact-float-3', icon: <Clock size={14} strokeWidth={2.5} />, title: 'Onboarding support', sub: 'Humans, not bots', accent: false, delay: 0.6, yLoop: [0, -6, 0], dur: 5 },
          ].map((c) => (
            <motion.div
              key={c.cls}
              className={`contact-float-card ${c.cls}`}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                y: c.yLoop,
                transition: {
                  opacity: { delay: c.delay, duration: 0.6, ease },
                  scale: { delay: c.delay, duration: 0.6, ease },
                  y: { delay: c.delay + 0.6, duration: c.dur, repeat: Infinity, ease: 'easeInOut' },
                },
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.06, transition: { type: 'spring', stiffness: 280, damping: 16 } }}
            >
              <div className={`contact-float-icon${c.accent ? ' accent' : ''}`}>{c.icon}</div>
              <div>
                <div className="contact-float-title">{c.title}</div>
                <div className="contact-float-sub">{c.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
