import { Check, ArrowRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const itemUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const floatEnter = (x: number, y: number, delay: number): Variants => ({
  hidden: { opacity: 0, x, y, scale: 0.92 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease, delay },
  },
});

const Hero = () => {
  return (
    <motion.section
      className="hero"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <motion.div
        className="hero-grid-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease }}
      />

      {/* Floating left: resume snippet card */}
      <motion.div className="hero-float-left" variants={floatEnter(-32, 16, 0.25)}>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
          whileHover={{ scale: 1.04, rotate: -1, transition: { type: 'spring', stiffness: 260, damping: 18 } }}
        >
          <div className="float-card">
            <div className="float-card-label">Resume Detected</div>
            <div className="float-resume-lines">
              {['name', 'title', 'w90', 'w80', 'w65', 'w90', 'w50'].map((cls, i) => (
                <motion.div
                  key={i}
                  className={`float-resume-line ${cls}`}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5 + i * 0.05, duration: 0.35, ease }}
                />
              ))}
            </div>
            <div className="float-resume-skills">
              {['Python', 'AWS', 'React', 'SQL'].map((skill, i) => (
                <motion.span
                  key={skill}
                  className="float-skill-pill"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85 + i * 0.05, duration: 0.3, ease }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating right: score card */}
      <motion.div className="hero-float-right" variants={floatEnter(32, 16, 0.3)}>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          whileHover={{ scale: 1.04, rotate: 1, transition: { type: 'spring', stiffness: 260, damping: 18 } }}
        >
          <div className="float-card">
            <div className="float-card-label">Top Candidate</div>
            <div className="float-score-header">
              <div className="float-score-avatar">SC</div>
              <div>
                <div className="float-score-name">Sarah Chen</div>
                <div className="float-score-role">Sr. Backend Engineer</div>
              </div>
            </div>
            <div className="float-score-ring">
              <svg className="float-ring-svg" viewBox="0 0 48 48">
                <circle className="track" cx="24" cy="24" r="20" />
                <motion.circle
                  className="fill"
                  cx="24"
                  cy="24"
                  r="20"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.92 }}
                  transition={{ delay: 0.5, duration: 1.5, ease }}
                />
              </svg>
              <div>
                <span className='float-stat-num'>
                  92%
                </span>
                <div className="float-score-label">Match Score</div>
              </div>
            </div>
            <motion.div
              className="float-score-tag"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.35, ease }}
            >
              Best Fit
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating bottom-left: stat */}
      <motion.div className="hero-float-left-low" variants={floatEnter(-24, 24, 0.4)}>
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
          whileHover={{ scale: 1.06 }}
        >
          <div className="float-stat-card">
            <div className="float-stat-num">2.4s</div>
            <div className="float-stat-label">Avg. per resume</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating bottom-right: notification */}
      <motion.div className="hero-float-right-low" variants={floatEnter(24, 24, 0.45)}>
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="float-card-mini">
            <motion.div
              className="float-mini-icon"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.7, type: 'spring', stiffness: 300, damping: 14 }}
            >
              <Check strokeWidth={2.5} />
            </motion.div>
            <div>
              <div className="float-mini-text">47 resumes ranked</div>
              <div className="float-mini-sub">Completed just now</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="hero-badge" variants={itemUp}>
        <motion.span
          className="dot"
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        AI-powered resume screening
      </motion.div>

      <motion.h1 variants={itemUp}>
        Screen resumes in <span className="accent">seconds</span>, not hours
      </motion.h1>
      <motion.p className="subtitle" variants={itemUp}>
        Upload resumes, describe the role, and let AI rank your candidates with explainable scores. No more manual screening.
      </motion.p>

      <motion.div className="hero-cta" variants={itemUp}>
        <motion.a
          href="#"
          className="btn-primary hero-cta-btn"
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 360, damping: 18 }}
        >
          Get Started
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            style={{ display: 'inline-flex' }}
          >
            <ArrowRight size={16} strokeWidth={2.5} />
          </motion.span>
        </motion.a>
        {/* <span className="hero-cta-sub">No credit card required &middot; Free forever plan</span> */}
      </motion.div>
    </motion.section>
  );
};

export default Hero;
