'use client';

import { motion, type Variants } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } },
};

const stepNumberSpring = { type: 'spring' as const, stiffness: 280, damping: 14 };

const cardClass =
  'rounded-xl border border-line-soft bg-linear-to-b from-ivory-light to-ivory p-7 transition-shadow';
const cardHover = {
  y: -8,
  transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
};
const stepNumberClass =
  'mb-5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-copper to-copper-light text-[15px] font-bold text-white shadow-[0_4px_12px_rgba(200,90,23,0.2)]';
const cardTitleClass = 'mb-2.5 text-[19px] font-bold tracking-[-0.3px]';
const cardCopyClass = 'text-[14.5px] leading-[1.65] text-charcoal-lt';
const visualWrapClass =
  'mt-6 min-h-30 overflow-hidden rounded-md border border-line-soft bg-white p-4';

const HowItWorks = () => {
  return (
    <section id="how" className="mx-auto max-w-300 px-6 pb-30 pt-10">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={headerVariants}
        className="mx-auto mb-12 max-w-150 px-6 text-center"
      >
        <h2 className="mb-3 text-[clamp(28px,4vw,40px)] font-extrabold leading-[1.15] tracking-[-1px] text-charcoal">
          Three steps to your <span className="text-accent">perfect hire</span>
        </h2>
        <p className="text-base leading-[1.6] text-charcoal-lt">
          From upload to ranked results in under 90 seconds. No setup, no training required.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={gridVariants}
        className="mx-auto mt-14 grid max-w-120 grid-cols-1 gap-8 md:max-w-none md:grid-cols-3"
      >
        {/* Step 1 */}
        <motion.div variants={cardVariants} whileHover={cardHover} className={cardClass}>
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, ...stepNumberSpring }}
            className={stepNumberClass}
          >
            1
          </motion.div>
          <h3 className={cardTitleClass}>Upload Resumes</h3>
          <p className={cardCopyClass}>
            Drop a single PDF or a ZIP with hundreds. We extract text from any format instantly.
          </p>
          <div className={visualWrapClass}>
            <div className="flex flex-col gap-2">
              {[
                { name: 'sarah_chen_resume.pdf', size: '248 KB', type: 'pdf' },
                { name: 'david_kumar_cv.pdf', size: '312 KB', type: 'pdf' },
                { name: 'all_applicants.zip', size: '4.2 MB', type: 'zip' },
              ].map((file, i) => (
                <motion.div
                  key={file.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.12, duration: 0.5, ease }}
                  className="flex items-center gap-2.5 rounded-sm bg-ivory-light px-3 py-2 text-[13px]"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[rgba(0,0,0,0.05)]">
                    {file.type === 'pdf' ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 text-copper">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 text-copper">
                        <rect x="2" y="2" width="20" height="20" rx="2" />
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                    )}
                  </div>
                  <span className="min-w-0 flex-1 truncate font-medium text-charcoal">{file.name}</span>
                  <span className="shrink-0 text-xs text-charcoal-xlt">{file.size}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Step 2 */}
        <motion.div variants={cardVariants} whileHover={cardHover} className={cardClass}>
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, ...stepNumberSpring }}
            className={stepNumberClass}
          >
            2
          </motion.div>
          <h3 className={cardTitleClass}>AI Analyzes</h3>
          <p className={cardCopyClass}>
            Our 5-stage pipeline extracts, parses, understands the JD, scores, and ranks every candidate.
          </p>
          <div className={visualWrapClass}>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Text Extraction', width: '100%', state: 'active' },
                { label: 'Resume Parsing', width: '100%', state: 'active' },
                { label: 'JD Analysis', width: '100%', state: 'active' },
                { label: 'AI Scoring', width: '85%', state: 'active' },
                { label: 'Ranking', width: '20%', state: 'pending' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.45, ease }}
                  className="flex items-center gap-2.5 text-[13px] text-charcoal-md"
                >
                  <span className={`h-2 w-2 shrink-0 rounded-full ${item.state === 'active' ? 'bg-success' : 'bg-charcoal-xlt'}`} />
                  <span>{item.label}</span>
                  <div className="h-1 flex-1 overflow-hidden rounded-sm bg-ivory-medium">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: item.width }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 + i * 0.1, duration: 0.9, ease }}
                      className="h-full rounded-sm bg-charcoal"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Step 3 */}
        <motion.div variants={cardVariants} whileHover={cardHover} className={cardClass}>
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, ...stepNumberSpring }}
            className={stepNumberClass}
          >
            3
          </motion.div>
          <h3 className={cardTitleClass}>Ranked Results</h3>
          <p className={cardCopyClass}>
            Get a scored, ranked list with AI explanations. Share with your team instantly.
          </p>
          <div className={visualWrapClass}>
            <div className="flex flex-col gap-2">
              {[
                { rank: '#1', avatar: 'SC', name: 'Sarah Chen', score: '92%', high: true, tag: 'Best Fit' },
                { rank: '#2', avatar: 'DK', name: 'David Kumar', score: '87%', high: true },
                { rank: '#3', avatar: 'EM', name: 'Elena Martinez', score: '74%', high: false },
              ].map((row, i) => (
                <motion.div
                  key={row.rank}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.13, duration: 0.5, ease }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-2.5 rounded-sm bg-ivory-light px-3 py-2"
                >
                  <span className="w-5 shrink-0 text-center text-xs font-bold text-charcoal-lt">{row.rank}</span>
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ivory-dark text-[10px] font-semibold text-charcoal-md">
                    {row.avatar}
                  </div>
                  <span className="min-w-0 flex-1 truncate text-[13px] font-medium">{row.name}</span>
                  <span className={`shrink-0 font-mono text-[13px] font-bold ${row.high ? 'text-success' : 'text-charcoal-md'}`}>
                    {row.score}
                  </span>
                  {row.tag && (
                    <span className="shrink-0 rounded-full bg-success-bg px-2 py-0.5 text-[10px] font-semibold text-success">
                      {row.tag}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HowItWorks;
