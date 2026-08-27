'use client';

import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';

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
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const bulletItem: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease } },
};

const visualHover = {
  whileHover: { y: -6, transition: { type: 'spring' as const, stiffness: 280, damping: 20 } },
};

const featureRowClass = 'grid items-center gap-12 md:grid-cols-2';
const featureTextHeadingClass = 'mb-3.5 text-[28px] font-extrabold leading-[1.2] tracking-[-0.8px]';
const featureTextCopyClass = 'mb-6 text-[15.5px] leading-[1.7] text-charcoal-lt';

type ImageVisual = {
  type: 'image';
  src: string;
  alt: string;
  width: number;
  height: number;
  contain?: boolean;
};

type CustomVisual = {
  type: 'interview' | 'compliance';
};

type Feature = {
  title: string;
  body: string;
  bullets: string[];
  visual: ImageVisual | CustomVisual;
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
  <div className="overflow-hidden rounded-2xl bg-linear-to-br from-ivory-medium to-ivory-dark p-[0.5px] shadow-lg sm:rounded-[28px]">
    <div className="flex min-h-80 min-w-full items-center justify-center overflow-hidden rounded-[22px] border border-line-soft bg-linear-to-b from-ivory-light to-ivory-medium p-2 sm:p-3">
      {children}
    </div>
  </div>
);

const ScreenshotVisual = ({ visual }: { visual: ImageVisual }) => (
  <Image
    src={visual.src}
    alt={visual.alt}
    width={visual.width}
    height={visual.height}
    className={`h-auto w-full rounded-[18px] border border-line-soft shadow-soft ${visual.contain ? 'object-contain' : 'object-cover'}`}
    sizes="(min-width: 768px) 44vw, 92vw"
  />
);

const InterviewVisual = () => (
  <div className="w-full rounded-[18px] border border-line-soft bg-white p-5 shadow-soft">
    <div className="mb-5 flex items-center justify-between gap-3">
      <div>
        <div className="text-[12px] font-bold uppercase tracking-[1px] text-charcoal-lt">First-round interview</div>
        <div className="mt-1 text-[20px] font-extrabold text-charcoal">Senior Backend Engineer</div>
      </div>
      <span className="rounded-full bg-success-bg px-3 py-1 text-[12px] font-bold text-success">Live</span>
    </div>

    <div className="mb-5 grid gap-3 sm:grid-cols-3">
      {[
        ['84', 'Technical score'],
        ['91%', 'Questions covered'],
        ['18m', 'Interview length'],
      ].map(([value, label]) => (
        <div key={label} className="rounded-xl border border-line-soft bg-ivory-light p-3">
          <div className="text-[24px] font-extrabold text-charcoal">{value}</div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.7px] text-charcoal-lt">{label}</div>
        </div>
      ))}
    </div>

    <div className="space-y-3">
      {[
        ['System design', 'Strong answer on API scaling and queues.', '92'],
        ['Debugging', 'Clear root-cause approach with tradeoffs.', '86'],
        ['Ownership', 'Good examples, needs deeper metrics.', '78'],
      ].map(([label, note, score]) => (
        <div key={label} className="rounded-xl border border-line-soft p-3">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="text-sm font-bold text-charcoal">{label}</span>
            <span className="font-mono text-sm font-extrabold text-accent">{score}/100</span>
          </div>
          <p className="text-[12.5px] leading-[1.5] text-charcoal-lt">{note}</p>
        </div>
      ))}
    </div>
  </div>
);

const ComplianceVisual = () => (
  <div className="w-full rounded-[18px] border border-line-soft bg-white p-5 shadow-soft">
    <div className="mb-4 flex items-center justify-between">
      <div className="text-[12px] font-bold uppercase tracking-[1px] text-charcoal-lt">Compliance controls</div>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-success-bg px-3 py-1 text-[12px] font-bold text-success">
        <span className="h-1.5 w-1.5 rounded-full bg-success" />
        Active
      </span>
    </div>

    <div className="mb-4 grid grid-cols-3 gap-2">
      {['GDPR', 'DPDP', 'CCPA'].map((label) => (
        <div key={label} className="rounded-xl border border-line-soft bg-ivory-light px-3 py-3 text-center text-sm font-extrabold text-charcoal">
          {label}
        </div>
      ))}
    </div>

    <div className="space-y-2.5">
      {[
        ['PII minimization', 'Mask sensitive fields where possible'],
        ['Human review', 'Keep recruiter approval in the loop'],
        ['Consistent criteria', 'Use the same rubric for each candidate'],
        ['Audit-ready notes', 'Store resume and interview evidence'],
      ].map(([title, body]) => (
        <div key={title} className="flex items-start gap-3 rounded-xl border border-line-soft bg-ivory-light p-3">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-bg text-success">
            <Check />
          </span>
          <div>
            <div className="text-sm font-bold text-charcoal">{title}</div>
            <div className="text-[12.5px] leading-[1.45] text-charcoal-lt">{body}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const features: Feature[] = [
  {
    title: 'AI creates the JD',
    body: 'Enter role details, location, budget, and must-haves. HireSort turns them into a clear JD and scoring rubric.',
    bullets: [
      'Build JDs from short role inputs',
      'Refine job descriptions with AI',
      'Create consistent screening rubrics',
    ],
    visual: {
      type: 'image',
      src: '/appScreenshots/agentic-jd-generation.png',
      alt: 'HireSort AI job description generation screen',
      width: 1672,
      height: 1456,
      contain: true,
    },
  },
  {
    title: 'Post jobs in one tap',
    body: 'Publish roles to supported platforms after a quick approval. HireSort helps bring applications into one workflow.',
    bullets: [
      'Post jobs to multiple platforms',
      'Keep human approval before publishing',
      'Collect applicants for screening',
    ],
    visual: {
      type: 'image',
      src: '/appScreenshots/automated-job-posting.png',
      alt: 'HireSort automated job posting confirmation modal',
      width: 2048,
      height: 1025,
    },
  },
  {
    title: 'Screen resumes automatically',
    body: 'HireSort scores candidates against the role and shows ranked shortlists with match signals.',
    bullets: [
      'AI resume screening for every applicant',
      'Ranked candidates by role fit',
      'Search, stage, and match filters',
    ],
    visual: {
      type: 'image',
      src: '/appScreenshots/ai-resume-screening-table.png',
      alt: 'HireSort AI resume screening table with ranked candidates',
      width: 2048,
      height: 1167,
    },
  },
  {
    title: 'Run AI voice screening',
    body: 'Suitable candidates get a preliminary phone screen. Recruiters see the score, transcript, facts, and summary.',
    bullets: [
      'AI phone screening for shortlisted profiles',
      'Structured facts and interview score',
      'Transcript and notes for review',
    ],
    visual: {
      type: 'image',
      src: '/appScreenshots/ai-voice-screening-analysis.png',
      alt: 'HireSort AI voice screening analysis with interview score and screening facts',
      width: 2048,
      height: 1212,
    },
  },
  {
    title: 'Interview deeper automatically',
    body: 'Candidates who perform well can move to a structured first-round interview with notes and scorecards.',
    bullets: [
      'AI first-round interview workflow',
      'Question coverage and score breakdowns',
      'Evidence-backed interview notes',
    ],
    visual: { type: 'interview' },
  },
  {
    title: 'Keep hiring data structured',
    body: 'Candidate profiles, funnel stages, TAT, criteria, resume notes, interview notes, and assessments stay organized.',
    bullets: [
      'Candidate profiles and funnel visibility',
      'Consistent screening criteria',
      'Compliance-aware data controls',
    ],
    visual: { type: 'compliance' },
  },
];

const FeatureVisual = ({ visual }: { visual: Feature['visual'] }) => {
  if (visual.type === 'image') return <ScreenshotVisual visual={visual} />;
  if (visual.type === 'interview') return <InterviewVisual />;
  return <ComplianceVisual />;
};

const Features = () => {
  return (
    <section id="features" className="mx-auto max-w-275 px-4 pt-20 pb-30">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={headerVariants}
        className="mx-auto mb-12 max-w-150 text-center"
      >
        <h2 className="mb-3 text-[clamp(28px,4vw,40px)] font-extrabold leading-[1.15] tracking-[-1px] text-charcoal">
          Agentic workflows for <span className="text-accent">real hiring</span>
        </h2>
        <p className="text-base leading-[1.6] text-charcoal-lt">
          Simple tools that help teams create roles, source candidates, screen resumes, interview, and shortlist faster.
        </p>
      </motion.div>

      <div className="flex flex-col gap-22">
        {features.map((feature, index) => {
          const reverse = index % 2 === 1;
          return (
            <article key={feature.title}>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0, margin: '0px 0px -10% 0px' }}
                variants={rowContainer}
                className={featureRowClass}
              >
                <motion.div variants={reverse ? fromRight : fromLeft} className={reverse ? 'md:order-2' : undefined}>
                  <h3 className={featureTextHeadingClass}>{feature.title}</h3>
                  <p className={featureTextCopyClass}>{feature.body}</p>
                  <Bullets items={feature.bullets} />
                </motion.div>

                <motion.div variants={reverse ? fromLeft : fromRight} {...visualHover} className={reverse ? 'md:order-1' : undefined}>
                  <VisualWrap>
                    <FeatureVisual visual={feature.visual} />
                  </VisualWrap>
                </motion.div>
              </motion.div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
