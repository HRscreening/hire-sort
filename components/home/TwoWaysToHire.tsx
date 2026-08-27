'use client';

import { CheckCircle2, Users, Workflow } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

const cards = [
  {
    icon: Workflow,
    title: 'Use HireSort with your recruiter',
    body: 'Your recruiter reviews the AI agent work, approves shortlists, and makes the final calls.',
    bullets: [
      'Recruiter-in-the-loop workflows',
      'Consistent screening criteria',
      'Resume and interview notes in one place',
    ],
  },
  {
    icon: Users,
    title: 'Hand the role to HireSort',
    body: 'HireSort’s fleet of human recruiters understands your requirements, then uses proprietary agentic workflows to share the best-fit candidates in a matter of days.',
    bullets: [
      'Role intake handled by experts',
      'Agentic sourcing, screening, and interviews',
      'Final shortlists delivered fast',
    ],
  },
];

const TwoWaysToHire = () => {
  return (
    <section className="mx-auto max-w-300 px-6 pb-24 pt-6">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={container}
      >
        <motion.div variants={item} className="mx-auto mb-10 max-w-150 text-center">
          <span className="mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.8px] text-accent">
            Two ways to hire
          </span>
          <h2 className="mb-3 text-[clamp(28px,4vw,40px)] font-extrabold leading-[1.15] tracking-[-1px] text-charcoal">
            Keep control or hand it over
          </h2>
          <p className="text-base leading-[1.6] text-charcoal-lt">
            Use the platform yourself, or let HireSort run the workflow for you.
          </p>
        </motion.div>

        <motion.div variants={container} className="grid gap-5 md:grid-cols-2">
          {cards.map(({ icon: Icon, title, body, bullets }) => (
            <motion.article
              key={title}
              variants={item}
              className="rounded-xl border border-line-soft bg-white p-7 shadow-soft"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[rgba(200,90,23,0.12)] text-accent">
                <Icon size={20} strokeWidth={2.4} />
              </div>
              <h3 className="mb-3 text-[21px] font-extrabold leading-[1.2] tracking-[-0.4px] text-charcoal">
                {title}
              </h3>
              <p className="mb-5 text-[15px] leading-[1.65] text-charcoal-lt">{body}</p>
              <ul className="flex list-none flex-col gap-2 p-0">
                {bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-[14px] text-charcoal-md">
                    <CheckCircle2 size={15} strokeWidth={2.4} className="mt-0.5 shrink-0 text-accent" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TwoWaysToHire;
