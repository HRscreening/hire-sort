import { ArrowRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const CTA = () => {
  return (
    <motion.section
      className="cta-section"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      variants={container}
    >
      <motion.h2 variants={item}>
        Stop reading resumes.<br />Start <span style={{ color: 'var(--accent)' }}>finding talent</span>.
      </motion.h2>
      <motion.p variants={item}>
        Upload your first batch and see ranked results in under 90 seconds. Free to start, no credit card required.
      </motion.p>
      <motion.a
        href="#"
        className="btn-primary hero-cta-btn"
        variants={item}
        whileHover={{ scale: 1.06, y: -3 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 360, damping: 18 }}
      >
        Get started
        <motion.span
          style={{ display: 'inline-flex' }}
          whileHover={{ x: 4 }}
        >
          <ArrowRight size={16} strokeWidth={2.5} />
        </motion.span>
      </motion.a>
    </motion.section>
  );
};

export default CTA;
