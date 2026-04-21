import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

type CountStatProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  delay?: number;
};

const CountStat = ({ value, suffix = '', prefix = '', label, delay = 0 }: CountStatProps) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, delay]);

  const formatted =
    value >= 1000 ? `${Math.round(display / 1000)}K` : value % 1 === 0 ? Math.round(display).toString() : display.toFixed(1);

  return (
    <motion.div
      className="stat-item"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { type: 'spring', stiffness: 320, damping: 18 } }}
    >
      <h3 ref={ref}>
        {prefix}
        {formatted}
        {suffix}
      </h3>
      <p>{label}</p>
    </motion.div>
  );
};

const Stats = () => {
  return (
    <section className="stats-section">
      <div className="stats-inner">
        <CountStat value={90} suffix="%" label="Less time screening" />
        <CountStat value={15} suffix="s" label="Avg. processing time" delay={0.15} />
        <CountStat value={50000} suffix="+" label="Resumes processed" delay={0.3} />
      </div>
    </section>
  );
};

export default Stats;
