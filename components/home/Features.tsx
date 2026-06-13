'use client';

import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';

const ease = [0.22, 1, 0.36, 1] as const;

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const rowContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const fromLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
};
const fromRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
};
const bulletVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const bulletItem: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease } },
};
const visualHover = {
  whileHover: { y: -6, transition: { type: 'spring' as const, stiffness: 280, damping: 20 } },
};

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="h-3 w-3 text-white">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Bullets = ({ items }: { items: string[] }) => (
  <motion.ul variants={bulletVariants} className="flex list-none flex-col gap-3">
    {items.map((b) => (
      <motion.li key={b} variants={bulletItem} className="flex items-start gap-2.5 text-[14.5px] leading-[1.5] text-charcoal-md">
        <span className="mt-0.5 flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-md bg-linear-to-br from-copper to-copper-light">
          <Check />
        </span>
        {b}
      </motion.li>
    ))}
  </motion.ul>
);

const VisualWrap = ({ children }: { children: React.ReactNode }) => (
  <div className="overflow-hidden rounded-2xl bg-linear-to-br from-ivory-medium to-ivory-dark p-[0.5px] shadow-lg sm:rounded-[32px]">
    <div className="min-h-80 min-w-full overflow-hidden rounded-[26px] border border-line-soft bg-linear-to-b from-ivory-light to-ivory-medium p-2 sm:p-2 content-center">
      {children}
    </div>
  </div>
);

const featureRowClass = 'grid items-center gap-14 md:grid-cols-2';
const featureTextHeadingClass = 'mb-3.5 text-[28px] font-extrabold leading-[1.2] tracking-[-0.8px]';
const featureTextCopyClass = 'mb-6 text-[15.5px] leading-[1.7] text-charcoal-lt';

const Features = () => {
  return (
    <section id="features" className="mx-auto max-w-275 overflow-x-clip px-4 pt-20 pb-30">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={headerVariants}
        className="mx-auto mb-12 max-w-150 text-center"
      >
        <h2 className="mb-3 text-[clamp(28px,4vw,40px)] font-extrabold leading-[1.15] tracking-[-1px] text-charcoal">
          Resume screening features for <span className="text-accent">real hiring</span> workflows
        </h2>
        <p className="text-base leading-[1.6] text-charcoal-lt">
          Every feature is designed to help recruiters screen resumes faster, rank candidates consistently, and find the right people.
        </p>
      </motion.div>

      <div className="flex flex-col gap-25">
        {/* Feature 1: Explainable AI */}
        <article><motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0, margin: '0px 0px -10% 0px' }} variants={rowContainer} className={featureRowClass}>
          <motion.div variants={fromLeft}>
            <h3 className={featureTextHeadingClass}>Explainable AI Resume Scoring</h3>
            <p className={featureTextCopyClass}>
              No black boxes. Every candidate score comes with a detailed breakdown of strengths, gaps, and how they match the job description.
            </p>
            <Bullets
              items={[
                'Weighted scoring across skills, experience, education',
                'AI-written insight paragraph per candidate',
                'Red flags and standout strengths highlighted',
              ]}
            />
          </motion.div>

          <motion.div variants={fromRight} {...visualHover}>
            <VisualWrap>
            <Image
                src="/appScreenshots/17_candidate assessment expanded.png"
                alt="Candidate assessment card with detailed scoring breakdown and AI-written insights"
                width={800}
                height={1200}
                className='object-contain'
              />

            </VisualWrap>
          </motion.div>
        </motion.div></article>

        {/* Feature 2: Bulk Processing (reverse) */}
        <article><motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0, margin: '0px 0px -10% 0px' }} variants={rowContainer} className={featureRowClass}>
          <motion.div variants={fromRight} className="md:order-2">
            <h3 className={featureTextHeadingClass}>Bulk Processing at Scale</h3>
            <p className={featureTextCopyClass}>
              Upload a ZIP with 500 resumes. Get ranked results in minutes, not days. Our async pipeline handles it all in the background.
            </p>
            <Bullets
              items={[
                'ZIP upload with auto-extraction',
                'Supports all major resume formats (PDF, DOC, DOCX, JPG)',
                "Background processing — come back when it's done",
              ]}
            />
          </motion.div>

          <motion.div variants={fromLeft} {...visualHover} className="md:order-1">
            <VisualWrap>
    
              <Image
                src="/appScreenshots/11_Resume processing.png"
                alt="Bulk resume upload interface showing ZIP file upload and processing status"
                width={1400}
                height={900}
                className="w-full h-auto object-contain"
                />
      
            </VisualWrap>
          </motion.div>
        </motion.div></article>

        {/* Feature 3: Contextual Search */}
        <article><motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0, margin: '0px 0px -10% 0px' }} variants={rowContainer} className={featureRowClass}>
          <motion.div variants={fromLeft}>
            <h3 className={featureTextHeadingClass}>Contextual Search, Not Keyword Search</h3>
            <p className={featureTextCopyClass}>
              Go beyond keyword matching. HireSort evaluates resumes based on contextual relevance, helping HR teams identify genuinely strong candidates faster and more accurately.
            </p>
            <Bullets
              items={[
                'Semantic matching across skills and experience',
                'Better fit detection beyond exact phrase overlap',
                'Smarter shortlisting with fewer irrelevant matches',
              ]}
            />
          </motion.div>

          <motion.div variants={fromRight} {...visualHover}>
            <VisualWrap>
              {/* Active criteria card */}
              <div className="mb-2.5 overflow-hidden rounded-md border border-line-soft bg-white p-4 shadow-soft">
                <div className="mb-3 flex w-full items-center justify-between">
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    <div className="flex shrink-0 items-baseline gap-0.5">
                      <span className="text-[13px] font-extrabold">9</span>
                      <span className="text-[11px] opacity-50">/10</span>
                    </div>
                    <div className="h-[5px] w-[35px] shrink-0 rounded-full bg-ivory-medium">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '90%' }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="h-full rounded-full bg-success"
                      />
                    </div>
                    <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-[12.5px] font-semibold">
                      Advanced Spreadsheet Skills
                    </span>
                    <span className="shrink-0 rounded-sm bg-success-bg px-1.5 py-0.5 text-[9px] font-extrabold text-success">high</span>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-30">
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </div>
                <p className="mb-3.5 text-xs leading-[1.5] text-charcoal-lt">
                  The candidate demonstrates strong financial modeling, PnL projections, and pricing strategy development...
                </p>
                <div className="mb-2.5 text-[10px] font-bold uppercase text-charcoal-xlt">Evidence</div>
                <div className="flex flex-col gap-2">
                  {[
                    'Developed a 5-year financial model simulating the merger of banks...',
                    'Created PnL projections for the next year using revenue estimates...',
                  ].map((text, i) => (
                    <div key={i} className="flex gap-2.5">
                      <div className="w-0.5 shrink-0 bg-accent opacity-60" />
                      <p className="text-[11px] italic text-charcoal-md">&ldquo;{text}&rdquo;</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Collapsed criterion (10/10) */}
              <div className="mb-2 flex items-center justify-between overflow-hidden rounded-[10px] border border-line-soft bg-white px-4 py-2.5 opacity-80">
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <div className="flex shrink-0 items-baseline gap-0.5">
                    <span className="text-[12.5px] font-extrabold">10</span>
                    <span className="text-[10px] opacity-50">/10</span>
                  </div>
                  <div className="h-1 w-7.5 shrink-0 rounded-full bg-ivory-medium">
                    <div className="h-full w-full rounded-full bg-success" />
                  </div>
                  <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-xs font-semibold">
                    Professional Presentation Creation
                  </span>
                  <span className="shrink-0 rounded-[3px] bg-success-bg px-1.5 py-px text-[9px] font-extrabold text-success">high</span>
                </div>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-30">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              {/* Collapsed criterion (8/10) */}
              <div className="flex items-center justify-between overflow-hidden rounded-[10px] border border-line-soft bg-white px-4 py-2.5 opacity-60">
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <div className="flex shrink-0 items-baseline gap-0.5">
                    <span className="text-[12.5px] font-extrabold">8</span>
                    <span className="text-[10px] opacity-50">/10</span>
                  </div>
                  <div className="h-1 w-7.5 shrink-0 rounded-full bg-ivory-medium">
                    <div className="h-full w-[80%] rounded-full bg-success" />
                  </div>
                  <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-xs font-semibold">
                    MIS Dashboard &amp; Report Generation
                  </span>
                  <span className="shrink-0 rounded-[3px] bg-success-bg px-1.5 py-px text-[9px] font-extrabold text-success">high</span>
                </div>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-30">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </VisualWrap>
          </motion.div>
        </motion.div></article>

        {/* Feature 4: End-to-End Resume Management (reverse) */}
        <article><motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0, margin: '0px 0px -10% 0px' }} variants={rowContainer} className={featureRowClass}>
          <motion.div variants={fromRight} className="md:order-2">
            <h3 className={featureTextHeadingClass}>End-to-End Resume Management</h3>
            <p className={featureTextCopyClass}>
              Manage the entire resume screening workflow in one place &mdash; from intake and parsing to ranking, tracking, and final review. HireSort helps HR teams stay organized, collaborate better, and move faster.
            </p>
            <Bullets
              items={[
                'Centralized resume upload, storage, and organization',
                'Track candidate scores, shortlist status, and review stages',
                'Export scores and status in CSV for collaboration, review, and decision-making',
              ]}
            />
          </motion.div>

          <motion.div variants={fromLeft} {...visualHover} className="md:order-1">
            <VisualWrap>
              <Image
                src="/appScreenshots/14_Hiring funnel.png"
                alt="Bulk resume upload interface showing ZIP file upload and processing status"
                width={800}
                height={500}
              />
            </VisualWrap>
          </motion.div>
        </motion.div></article>

        {/* Feature 5: Privacy & Compliance */}
        <article><motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0, margin: '0px 0px -10% 0px' }} variants={rowContainer} className={featureRowClass}>
          <motion.div variants={fromLeft}>
            <h3 className={featureTextHeadingClass}>Privacy and Compliance, Built In</h3>
            <p className={featureTextCopyClass}>
              HireSort is designed with controls that support GDPR, India&apos;s DPDP framework, and applicable US privacy requirements, including the CCPA.
            </p>
            <Bullets
              items={[
                'Minimizes unnecessary exposure of personally identifiable information',
                'Supports access controls, retention limits, and breach-response workflows',
                'Enables privacy-aware exports and human-reviewed AI screening',
              ]}
            />
          </motion.div>

          <motion.div variants={fromRight} {...visualHover}>
            <VisualWrap>
              <div className="mb-3.5 flex items-center justify-between">
                <div className="text-[11px] font-bold uppercase tracking-[0.5px] text-charcoal-lt">Compliance Frameworks</div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-success-bg px-2 py-0.5 text-[10.5px] font-bold text-success">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-success" />
                  Active
                </span>
              </div>

              <div className="mb-3.5 flex flex-wrap gap-2">
                {[
                  { label: 'GDPR', sub: 'EU' },
                  { label: 'DPDP', sub: 'India' },
                  { label: 'CCPA', sub: 'California' },
                ].map((chip, i) => (
                  <motion.div
                    key={chip.label}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 + i * 0.08, duration: 0.4, ease }}
                    className="flex min-w-0 flex-1 items-center gap-2 rounded-[10px] border border-line-soft bg-white px-3 py-2.5 shadow-soft"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[rgba(200,90,23,0.1)] text-accent">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <polyline points="9 12 11 14 15 10" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold leading-tight text-charcoal">{chip.label}</div>
                      <div className="text-[10px] leading-tight text-charcoal-lt">{chip.sub}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* PII minimization preview */}
              <div className="mb-2.5 overflow-hidden rounded-md border border-line-soft bg-white px-3.5 py-3 shadow-soft">
                <div className="mb-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                      <rect x="3" y="11" width="18" height="10" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span className="text-[11.5px] font-bold text-charcoal">PII Minimization</span>
                  </div>
                  <span className="rounded-sm bg-success-bg px-1.5 py-0.5 text-[9.5px] font-bold text-success">enabled</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {[
                    { label: 'Candidate name', value: 'Candidate #A4E2' },
                    { label: 'Email', value: 'j••••@•••••.com' },
                    { label: 'Phone', value: '+91 ••••• •••12' },
                  ].map((row, i) => (
                    <motion.div
                      key={row.label}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.08, duration: 0.35, ease }}
                      className="flex items-center justify-between gap-2.5"
                    >
                      <span className="text-[10.5px] font-medium text-charcoal-lt">{row.label}</span>
                      <span className="font-mono text-[11px] font-semibold tracking-[0.3px] text-charcoal">{row.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                {[
                  { label: 'Access controls', sub: 'Role-based permissions' },
                  { label: 'Retention limits', sub: 'Auto-purge after 90 days' },
                  { label: 'Human-reviewed AI', sub: 'No fully automated decisions' },
                ].map((row, i) => (
                  <motion.div
                    key={row.label}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.75 + i * 0.08, duration: 0.4, ease }}
                    className="flex items-center gap-2.5 rounded-[10px] border border-line-soft bg-white px-3 py-2.5"
                  >
                    <div className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-success-bg text-success">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold leading-tight text-charcoal">{row.label}</div>
                      <div className="mt-0.5 text-[10.5px] leading-snug text-charcoal-lt">{row.sub}</div>
                    </div>
                    <span className="shrink-0 rounded-sm bg-success-bg px-1.5 py-0.5 text-[9.5px] font-extrabold uppercase tracking-[0.4px] text-success">
                      On
                    </span>
                  </motion.div>
                ))}
              </div>
            </VisualWrap>
          </motion.div>
        </motion.div></article>
      </div>
    </section>
  );
};

export default Features;
