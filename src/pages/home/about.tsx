import "@/styles/style.css";
import "@/styles/about.css";
import { motion, type Variants } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
    Sparkles,
    Compass,
    Telescope,
    Target,
    ShieldCheck,
    Users,
    ArrowRight,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};

const callouts = [
    { num: "01", label: "AI-powered analysis", sub: "Structured scoring, not keyword matching." },
    { num: "02", label: "Bulk screening", sub: "From 50 candidates to 50,000, in one flow." },
    { num: "03", label: "Recruiter-friendly", sub: "Built around how hiring teams actually work." },
];

const values = [
    {
        icon: <Target size={18} strokeWidth={2.2} />,
        title: "Precision over keywords",
        desc: "We look at skills, evidence, and context — not whether a resume happens to contain the right buzzword.",
    },
    {
        icon: <ShieldCheck size={18} strokeWidth={2.2} />,
        title: "Consistency, by design",
        desc: "Structured rubrics ensure every candidate is evaluated against the same criteria, in the same way.",
    },
    {
        icon: <Users size={18} strokeWidth={2.2} />,
        title: "Human judgment, amplified",
        desc: "Our platform supports recruiters — it doesn’t replace them. Final decisions always belong to humans.",
    },
];

const About = () => {
    return (
        <main className="about-page">
            {/* ===== Hero ===== */}
            <section className="about-hero">
                <div className="about-hero-grid" aria-hidden="true" />
                <motion.div
                    className="about-hero-inner"
                    initial="hidden"
                    animate="show"
                    variants={stagger}
                >
                    <motion.div className="about-eyebrow" variants={fadeUp}>
                        <Sparkles size={13} strokeWidth={2.5} />
                        <span>About HireSort</span>
                    </motion.div>

                    <motion.h1 variants={fadeUp}>
                        Built for hiring teams that want{" "}
                        <span className="accent">speed, structure, and clarity.</span>
                    </motion.h1>

                    <motion.p className="about-hero-lead" variants={fadeUp}>
                        Hiring teams today deal with too many resumes, too little time, and
                        highly inconsistent first-pass screening. We built our platform to
                        fix that — so every screening cycle is faster, fairer, and easier to
                        operate.
                    </motion.p>
                </motion.div>
            </section>

            {/* ===== Narrative ===== */}
            <section className="about-story">
                <motion.div
                    className="about-story-grid"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={stagger}
                >
                    <motion.div className="about-story-heading" variants={fadeUp}>
                        <span className="about-story-label">Who we are</span>
                        <h2>
                            Helping companies evaluate candidates faster — without sacrificing
                            quality.
                        </h2>
                    </motion.div>

                    <motion.div className="about-story-body" variants={fadeUp}>
                        <p>
                            Our goal is simple: help companies evaluate candidates faster
                            without sacrificing quality. With AI-powered resume analysis,
                            customizable scoring rubrics, bulk screening, and
                            recruiter-friendly workflows, we enable teams to process
                            applications at scale while staying aligned to the role they are
                            hiring for.
                        </p>
                        <p>
                            We are focused on making hiring workflows more efficient, more
                            standardized, and easier to operate for growing teams. Whether you
                            are screening <strong>50 candidates or 50,000</strong>, our
                            platform helps you reduce manual effort, improve consistency, and
                            reach better shortlists faster.
                        </p>
                        <p>
                            We are building for modern hiring teams that want speed,
                            structure, and better decision support in every screening cycle.
                        </p>

                        <div className="about-callout-row">
                            {callouts.map((c) => (
                                <div className="about-callout" key={c.num}>
                                    <div className="about-callout-num">{c.num}</div>
                                    <div className="about-callout-label">{c.label}</div>
                                    <div className="about-callout-sub">{c.sub}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* ===== Mission / Vision ===== */}
            <section className="about-mv">
                <motion.div
                    className="about-mv-grid"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={stagger}
                >
                    <motion.div className="about-mv-card" variants={fadeUp}>
                        <div className="about-mv-icon">
                            <Compass size={20} strokeWidth={2.2} />
                        </div>
                        <h3>Our Mission</h3>
                        <h2>
                            Screen candidates faster, more consistently, and with greater
                            confidence.
                        </h2>
                        <p>
                            To help hiring teams move through first-pass review without
                            burning hours per role — while keeping evaluation aligned,
                            auditable, and grounded in the criteria that actually matter for
                            the job.
                        </p>
                    </motion.div>

                    <motion.div className="about-mv-card" variants={fadeUp}>
                        <div className="about-mv-icon">
                            <Telescope size={20} strokeWidth={2.2} />
                        </div>
                        <h3>Our Vision</h3>
                        <h2>
                            First-round hiring that is structured, explainable, and scalable.
                        </h2>
                        <p>
                            A future where first-round hiring decisions are not dependent on
                            recruiter bandwidth alone — where every team, regardless of size,
                            can run a rigorous, fair, and repeatable screening process.
                        </p>
                    </motion.div>
                </motion.div>
            </section>

            {/* ===== Values ===== */}
            <section className="about-values">
                <div className="about-values-inner">
                    <motion.div
                        className="about-values-head"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={stagger}
                    >
                        <motion.span className="about-story-label" variants={fadeUp}>
                            What we believe
                        </motion.span>
                        <motion.h2 variants={fadeUp}>
                            The principles that shape every screening on HireSort.
                        </motion.h2>
                        <motion.p variants={fadeUp}>
                            These aren’t marketing lines — they’re the design constraints we
                            apply to every feature we ship.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="about-values-grid"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={stagger}
                    >
                        {values.map((v) => (
                            <motion.div
                                key={v.title}
                                className="about-value-card"
                                variants={fadeUp}
                            >
                                <div className="about-value-icon">{v.icon}</div>
                                <h3>{v.title}</h3>
                                <p>{v.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="about-cta">
                <motion.div
                    className="about-cta-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease }}
                >
                    <span className="about-cta-eyebrow">
                        <Sparkles size={13} strokeWidth={2.5} />
                        Ready when you are
                    </span>
                    <h2>Bring structure to your next screening cycle.</h2>
                    <p>
                        See how HireSort can help your team process applications at scale
                        while staying aligned to the role you are hiring for.
                    </p>
                    <div className="about-cta-actions">
                        <a href="/#pricing">
                            <span className="btn-primary hero-cta-btn">
                                Get Started
                                <ArrowRight size={15} strokeWidth={2.5} />
                            </span>
                        </a>
                        <Link to="/faq" className="btn-secondary hero-cta-btn">
                            Browse FAQs
                        </Link>
                    </div>
                </motion.div>
            </section>
        </main>
    );
};

export default About;
