import { useMemo, useState } from "react";
import "@/styles/style.css";
import "@/styles/faq.css";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { HelpCircle, Search, ChevronDown, Mail, MessageSquare } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

type FaqItem = {
  id: string;
  category: string;
  question: string;
  answer: string[];
};

const CATEGORIES = [
  { id: "all", label: "All questions" },
  { id: "product", label: "Product & workflow" },
  { id: "platform", label: "Platform capabilities" },
  { id: "data", label: "Data & security" },
  { id: "plans", label: "Plans & getting started" },
] as const;

const FAQS: FaqItem[] = [
  {
    id: "what-does-it-do",
    category: "product",
    question: "What does your platform do?",
    answer: [
      "Our platform helps hiring teams screen resumes faster using AI-powered analysis and structured scoring. Recruiters can upload candidate resumes, apply role-specific evaluation criteria, and receive ranked outputs that make shortlisting quicker and more consistent.",
    ],
  },
  {
    id: "who-is-it-for",
    category: "product",
    question: "Who is this product built for?",
    answer: [
      "It is designed for recruiters, hiring managers, staffing firms, and talent teams that handle high volumes of applications and want to reduce manual screening effort.",
    ],
  },
  {
    id: "how-screening-works",
    category: "product",
    question: "How does the screening work?",
    answer: [
      "Users upload resumes and configure a role-specific rubric or screening criteria. The platform then analyzes each resume against those criteria and returns a structured assessment, score, and shortlist view to support decision-making.",
    ],
  },
  {
    id: "customizable-scoring",
    category: "product",
    question: "Is the scoring customizable?",
    answer: [
      "Yes. Teams can configure scoring rubrics based on role requirements, skills, experience, qualifications, and other relevant hiring criteria. Depending on your plan, rubrics can also be revised and reused across hiring cycles.",
    ],
  },
  {
    id: "speed",
    category: "platform",
    question: "How fast is the platform?",
    answer: [
      "Processing speed depends on file volume and system load, but resumes are typically analyzed within seconds. Bulk screening workflows are designed to support high-volume hiring without long manual turnaround times.",
    ],
  },
  {
    id: "bulk-upload",
    category: "platform",
    question: "Can I upload multiple resumes at once?",
    answer: [
      "Yes. Bulk upload is supported so teams can screen many candidates in one workflow instead of reviewing resumes one by one.",
    ],
  },
  {
    id: "replace-recruiter",
    category: "product",
    question: "Does the platform replace recruiter judgment?",
    answer: [
      "No. The platform is built to support recruiters, not replace them. It helps teams process information faster and more consistently, but final hiring decisions should always remain with human reviewers.",
    ],
  },
  {
    id: "ats-integration",
    category: "platform",
    question: "Can it integrate with our ATS or hiring workflow?",
    answer: [
      "Depending on your plan and implementation scope, integrations may be supported. Please contact us if you want to connect the platform with your ATS, internal workflow, or hiring stack.",
    ],
  },
  {
    id: "file-formats",
    category: "platform",
    question: "What file formats do you support?",
    answer: [
      "Common resume formats such as PDF and DOC/DOCX are typically supported. Exact support may vary by plan or deployment setup.",
    ],
  },
  {
    id: "candidate-data",
    category: "data",
    question: "How do you handle candidate data?",
    answer: [
      "We take data security and confidentiality seriously. Candidate data is processed to provide the service and handled in accordance with our policies and applicable contractual commitments.",
      "For more details, please review our Privacy Policy or contact us directly.",
    ],
  },
  {
    id: "enterprise",
    category: "plans",
    question: "Is the platform suitable for enterprise use?",
    answer: [
      "Yes. We support teams that need structured screening workflows, scalable processing, configurable evaluation logic, and higher-volume hiring operations.",
    ],
  },
  {
    id: "agencies",
    category: "plans",
    question: "Can staffing agencies use this platform?",
    answer: [
      "Yes. Staffing firms and recruitment agencies can use the platform to improve candidate screening throughput and standardize evaluation before sharing shortlisted profiles with clients.",
    ],
  },
  {
    id: "trial",
    category: "plans",
    question: "Is there a free trial or demo?",
    answer: [
      "Explore our product instantly with the live demo on our main page. You can also get started with our Free plan — no credit card required. For custom plans, contact us at support@hiresort.ai",
    ],
  },
  {
    id: "outcomes",
    category: "product",
    question: "Do you guarantee hiring outcomes?",
    answer: [
      "No. The platform is a screening support tool. It helps teams save time and improve consistency, but it does not guarantee interview performance, hiring success, or candidate suitability.",
    ],
  },
  {
    id: "get-started",
    category: "plans",
    question: "How do I get started?",
    answer: [
      "You can create an account, choose a plan, and begin uploading resumes for screening. For larger teams or enterprise deployments, our team can assist with onboarding.",
    ],
  },
];

const FaqPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [query, setQuery] = useState<string>("");
  const [openId, setOpenId] = useState<string | null>(FAQS[0]?.id ?? null);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: FAQS.length };
    for (const f of FAQS) {
      map[f.category] = (map[f.category] ?? 0) + 1;
    }
    return map;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter((f) => {
      const matchCat =
        activeCategory === "all" || f.category === activeCategory;
      if (!matchCat) return false;
      if (!q) return true;
      const haystack = (f.question + " " + f.answer.join(" ")).toLowerCase();
      return haystack.includes(q);
    });
  }, [activeCategory, query]);

  const toggle = (id: string) => {
    setOpenId((curr) => (curr === id ? null : id));
  };

  const expandAll = () => {
    if (filtered.length === 0) return;
    setOpenId(filtered.every((f) => f.id === openId) ? null : "__all__");
  };

  const allExpanded = openId === "__all__";

  return (
    <main className="faq-page">
      {/* ===== Hero ===== */}
      <section className="faq-hero">
        <div className="faq-hero-grid" aria-hidden="true" />
        <motion.div
          className="faq-hero-inner"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          <motion.div className="faq-eyebrow" variants={fadeUp}>
            <HelpCircle size={13} strokeWidth={2.5} />
            <span>Documentation &amp; FAQs</span>
          </motion.div>

          <motion.h1 variants={fadeUp}>
            Questions, answered{" "}
            <span className="accent">clearly.</span>
          </motion.h1>

          <motion.p className="faq-hero-lead" variants={fadeUp}>
            Everything you need to know about how HireSort screens resumes,
            supports recruiters, and fits into your hiring workflow. If you
            can't find what you're looking for, we're one click away.
          </motion.p>

          <motion.div className="faq-search" variants={fadeUp}>
            <Search size={16} strokeWidth={2.2} />
            <input
              type="text"
              placeholder="Search questions — e.g. bulk upload, file formats, pricing"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search FAQs"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== Body ===== */}
      <section className="faq-body">
        <div className="faq-grid">
          <motion.aside
            className="faq-nav"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease }}
          >
            <div className="faq-nav-label">Browse by topic</div>
            <div className="faq-nav-list" role="tablist">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === c.id}
                  className={activeCategory === c.id ? "is-active" : ""}
                  onClick={() => setActiveCategory(c.id)}
                >
                  <span>{c.label}</span>
                  <span className="faq-nav-count">{counts[c.id] ?? 0}</span>
                </button>
              ))}
            </div>
          </motion.aside>

          <div className="faq-list-wrap">
            <div className="faq-list-meta">
              <span>
                Showing <strong>{filtered.length}</strong>{" "}
                {filtered.length === 1 ? "question" : "questions"}
                {query ? <> matching &ldquo;{query}&rdquo;</> : null}
              </span>
              {filtered.length > 0 && (
                <button type="button" onClick={expandAll}>
                  {allExpanded ? "Collapse all" : "Expand all"}
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="faq-empty">
                <strong>No matches found</strong>
                Try a different keyword or pick another topic from the sidebar.
              </div>
            ) : (
              <motion.ul
                className="faq-list"
                initial="hidden"
                animate="show"
                variants={stagger}
              >
                {filtered.map((item, idx) => {
                  const isOpen = allExpanded || openId === item.id;
                  return (
                    <motion.li
                      key={item.id}
                      className={`faq-item ${isOpen ? "is-open" : ""}`}
                      variants={fadeUp}
                      style={{ listStyle: "none" }}
                    >
                      <button
                        type="button"
                        className="faq-item-trigger"
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${item.id}`}
                        onClick={() => toggle(item.id)}
                      >
                        <span className="faq-item-index">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="faq-item-question">
                          {item.question}
                        </span>
                        <span className="faq-item-toggle" aria-hidden="true">
                          <ChevronDown size={16} strokeWidth={2.4} />
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`faq-panel-${item.id}`}
                            className="faq-item-panel"
                            role="region"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease }}
                          >
                            <div className="faq-item-panel-inner">
                              {item.answer.map((p, i) => (
                                <p key={i}>{p}</p>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  );
                })}
              </motion.ul>
            )}

            <motion.div
              className="faq-contact"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease }}
            >
              <div className="faq-contact-left">
                <div className="faq-contact-icon">
                  <MessageSquare size={18} strokeWidth={2.2} />
                </div>
                <div>
                  <div className="faq-contact-title">
                    Still have a question?
                  </div>
                  <div className="faq-contact-sub">
                    We read every message — usually reply within one business
                    day.
                  </div>
                </div>
              </div>
              <Link to="/contact_us" className="btn-primary hero-cta-btn">
                <Mail size={15} strokeWidth={2.5} />
                Contact us
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FaqPage;
