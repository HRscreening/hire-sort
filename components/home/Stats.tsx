'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

type CountStatProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  delay?: number;
};

const ease = [0.22, 1, 0.36, 1] as const;

const CountStat = ({ value, suffix = '', prefix = '', label, delay = 0 }: CountStatProps) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      delay,
      ease,
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, delay]);

  const formatted =
    value >= 1000
      ? `${Math.round(display / 1000)}K`
      : value % 1 === 0
        ? Math.round(display).toString()
        : display.toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay, ease }}
      whileHover={{ y: -6, transition: { type: 'spring', stiffness: 320, damping: 18 } }}
    >
      <h3
        ref={ref}
        className="mb-1.5 font-mono text-[42px] font-extrabold tracking-[-1.5px] text-charcoal"
      >
        {prefix}
        {formatted}
        {suffix}
      </h3>
      <p className="text-sm font-medium text-charcoal-lt">{label}</p>
    </motion.div>
  );
};

const Stats = () => {
  return (
    <section className="bg-linear-to-b from-ivory to-ivory-medium px-6 py-20">
      <div className="mx-auto grid max-w-250 grid-cols-2 gap-10 text-center md:grid-cols-4">
        <CountStat value={90} suffix="%" label="Less time screening" />
        <CountStat value={15} suffix="s" label="Avg. processing time" delay={0.15} />
        <CountStat value={50000} suffix="+" label="Resumes processed" delay={0.3} />
        <CountStat value={500} suffix="" label="uploads at once" delay={0.3} />
      </div>
    </section>
  );
};

export default Stats;
