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
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
};

const fromRight: Variants = {
  hidden: { opacity: 0, x: 50 },
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

const Features = () => {
  return (
    <section className="features-section" id="features">
      <motion.div
        className="section-header"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={headerVariants}
      >
        <h2>Built for <span className="accent">real hiring</span> workflows</h2>
        <p>Every feature designed to save you time and help you find the right people.</p>
      </motion.div>

      <div className="features-zigzag">
        {/* Feature 1 */}
        <motion.div
          className="feature-row"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={rowContainer}
        >
          <motion.div className="feature-text" variants={fromLeft}>
            <h3>Explainable AI Scoring</h3>
            <p>No black boxes. Every candidate score comes with a detailed breakdown of strengths, gaps, and how they match the job description.</p>
            <motion.ul className="feature-bullets" variants={bulletVariants}>
              {[
                'Weighted scoring across skills, experience, education',
                'AI-written insight paragraph per candidate',
                'Red flags and standout strengths highlighted',
              ].map((b) => (
                <motion.li key={b} variants={bulletItem}>
                  <span className="bullet-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                  {b}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div className="feature-visual" variants={fromRight} {...visualHover}>
            <div className="feature-visual-inner">
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--charcoal-lt)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Criteria Breakdown</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { score: '10', title: 'Foundational Business Analysis', status: 'high', sub: 'The candidate demonstrates advanced business and fina...', progress: '100%' },
                  { score: '9', title: 'Executive & Cross-Functional Coordinati...', status: 'high', sub: 'Direct experience working with a CEO, leading cross-func...', progress: '90%' },
                  { score: '8', title: 'Structured Documentation & Informat...', status: 'medium', sub: 'The candidate\'s work on policy design, review, and MIS im...', progress: '80%', statusColor: 'var(--accent)', statusBg: '#FFF9F0' },
                  { score: '10', title: 'High-Priority Task Execution', status: 'high', sub: 'Co-founding a startup, leading multiple complex consulti...', progress: '100%' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    style={{
                      background: 'var(--white)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      boxShadow: 'var(--shadow-sm)',
                      width: '100%',
                      overflow: 'hidden'
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '40px', flexShrink: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1px' }}>
                            <span style={{ fontSize: '13px', fontWeight: 800 }}>{item.score}</span>
                            <span style={{ fontSize: '9px', opacity: 0.4 }}>/10</span>
                          </div>
                          <div style={{ height: '4px', background: 'var(--ivory-medium)', borderRadius: '10px', overflow: 'hidden' }}>
                            <div style={{ width: item.progress, height: '100%', background: 'var(--success)', borderRadius: '10px' }} />
                          </div>
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, minWidth: 0 }}>{item.title}</span>
                            <span style={{
                              fontSize: '8px',
                              fontWeight: 800,
                              color: item.statusColor || 'var(--success)',
                              background: item.statusBg || 'var(--success-bg)',
                              padding: '1px 4px',
                              borderRadius: '4px',
                              textTransform: 'lowercase',
                              flexShrink: 0
                            }}>{item.status}</span>
                          </div>
                          <div style={{ fontSize: '10.5px', color: 'var(--charcoal-lt)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.sub}</div>
                        </div>

                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.2, flexShrink: 0 }}><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Feature 2: Bulk Processing */}
        <motion.div
          className="feature-row reverse"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={rowContainer}
        >
          <motion.div className="feature-text" variants={fromRight}>
            <h3>Bulk Processing at Scale</h3>
            <p>Upload a ZIP with 500 resumes. Get ranked results in minutes, not days. Our async pipeline handles it all in the background.</p>
            <motion.ul className="feature-bullets" variants={bulletVariants}>
              {[
                'ZIP upload with auto-extraction',
                // 'Supports all resume file types, PDF, doc, docx, jpg',
                "Supports all major resume formats (PDF, DOC, DOCX, JPG)",
                "Background processing — come back when it's done",
              ].map((b) => (
                <motion.li key={b} variants={bulletItem}>
                  <span className="bullet-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                  {b}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          <motion.div className="feature-visual" variants={fromLeft} {...visualHover}>
            <div className="feature-visual-inner">
              <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '16px', color: 'var(--charcoal)' }}>Processing 147 of 200 resumes...</div>
              <div style={{ height: '8px', background: 'var(--ivory-medium)', borderRadius: '4px', overflow: 'hidden', marginBottom: '20px' }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '73.5%' }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 1.2, ease }}
                  style={{ height: '100%', background: 'linear-gradient(90deg, var(--copper), var(--copper-light))', borderRadius: '4px' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { label: 'batch_engineering_01.zip', status: 'Complete', borderColor: 'var(--success)', textColor: 'var(--success)' },
                  { label: 'batch_engineering_02.zip', status: 'Processing', borderColor: 'var(--charcoal)', textColor: 'var(--charcoal-md)' },
                  { label: 'batch_engineering_03.zip', status: 'Queued', borderColor: 'var(--border)', textColor: 'var(--charcoal-xlt)' },
                ].map((row, i) => (
                  <motion.div
                    key={row.label}
                    className="file-row"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.12, duration: 0.45, ease }}
                    style={{ borderLeft: `3px solid ${row.borderColor}` }}
                  >
                    <span className="file-name" style={{ fontSize: '12.5px' }}>{row.label}</span>
                    <span style={{ fontSize: '11px', color: row.textColor, fontWeight: 600 }}>{row.status}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Feature 3: Contextual Search */}
        <motion.div
          className="feature-row"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={rowContainer}
        >
          <motion.div className="feature-text" variants={fromLeft}>
            <h3>Contextual Search, Not Keyword Search</h3>
            <p>Go beyond keyword matching. HireSort evaluates resumes based on contextual relevance, helping HR teams identify genuinely strong candidates faster and more accurately.</p>
            <motion.ul className="feature-bullets" variants={bulletVariants}>
              {[
                'Semantic matching across skills and experience',
                'Better fit detection beyond exact phrase overlap',
                'Smarter shortlisting with fewer irrelevant matches',
              ].map((b) => (
                <motion.li key={b} variants={bulletItem}>
                  <span className="bullet-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                  {b}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          <motion.div className="feature-visual" variants={fromRight} {...visualHover}>
            <div className="feature-visual-inner">
              {/* <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--charcoal-lt)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Criteria Breakdown</div> */}

              <div style={{ background: 'var(--white)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '16px', marginBottom: '10px', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', flexShrink: 0 }}>
                      <span style={{ fontSize: '13px', fontWeight: 800 }}>9</span>
                      <span style={{ fontSize: '11px', opacity: 0.5 }}>/10</span>
                    </div>
                    <div style={{ width: '35px', height: '5px', background: 'var(--ivory-medium)', borderRadius: '30px', flexShrink: 0 }}>
                      <motion.div
                        style={{ height: '100%', background: 'var(--success)', borderRadius: '30px' }}
                        initial={{ width: 0 }}
                        whileInView={{ width: '90%' }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                      />
                    </div>
                    <span style={{ fontSize: '12.5px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, minWidth: 0 }}>Advanced Spreadsheet Skills</span>
                    <span style={{ fontSize: '9px', fontWeight: 800, color: 'var(--success)', background: 'var(--success-bg)', padding: '2px 5px', borderRadius: '4px', flexShrink: 0 }}>high</span>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3, flexShrink: 0 }}><polyline points="18 15 12 9 6 15"></polyline></svg>
                </div>

                <p style={{ fontSize: '12px', color: 'var(--charcoal-lt)', marginBottom: '14px', lineHeight: '1.5' }}>
                  The candidate demonstrates strong financial modeling, PnL projections, and pricing strategy development...
                </p>

                <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--charcoal-xlt)', textTransform: 'uppercase', marginBottom: '10px' }}>Evidence</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    "Developed a 5-year financial model simulating the merger of banks...",
                    "Created PnL projections for the next year using revenue estimates...",
                  ].map((text, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px' }}>
                      <div style={{ width: '2px', background: 'var(--accent)', opacity: 0.6, flexShrink: 0 }} />
                      <p style={{ fontSize: '11px', fontStyle: 'italic', color: 'var(--charcoal-md)' }}>"{text}"</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: 'var(--white)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', opacity: 0.8, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', flexShrink: 0 }}>
                    <span style={{ fontSize: '12.5px', fontWeight: 800 }}>10</span>
                    <span style={{ fontSize: '10px', opacity: 0.5 }}>/10</span>
                  </div>
                  <div style={{ width: '30px', height: '4px', background: 'var(--ivory-medium)', borderRadius: '30px', flexShrink: 0 }}>
                    <div style={{ width: '100%', height: '100%', background: 'var(--success)', borderRadius: '30px' }} />
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, minWidth: 0 }}>Professional Presentation Creation</span>
                  <span style={{ fontSize: '9px', fontWeight: 800, color: 'var(--success)', background: 'var(--success-bg)', padding: '1px 5px', borderRadius: '3px', flexShrink: 0 }}>high</span>
                </div>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3, flexShrink: 0 }}><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>

              <div style={{ background: 'var(--white)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: 0.6, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', flexShrink: 0 }}>
                    <span style={{ fontSize: '12.5px', fontWeight: 800 }}>8</span>
                    <span style={{ fontSize: '10px', opacity: 0.5 }}>/10</span>
                  </div>
                  <div style={{ width: '30px', height: '4px', background: 'var(--ivory-medium)', borderRadius: '30px', flexShrink: 0 }}>
                    <div style={{ width: '80%', height: '100%', background: 'var(--success)', borderRadius: '30px' }} />
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, minWidth: 0 }}>MIS Dashboard & Report Generation</span>
                  <span style={{ fontSize: '9px', fontWeight: 800, color: 'var(--success)', background: 'var(--success-bg)', padding: '1px 5px', borderRadius: '3px', flexShrink: 0 }}>high</span>
                </div>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3, flexShrink: 0 }}><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Feature 4: End-to-End Resume Management */}
        <motion.div
          className="feature-row reverse"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={rowContainer}
        >
          <motion.div className="feature-text" variants={fromRight}>
            <h3>End-to-End Resume Management</h3>
            <p>Manage the entire resume screening workflow in one place &mdash; from intake and parsing to ranking, tracking, and final review. HireSort helps HR teams stay organized, collaborate better, and move faster.</p>
            <motion.ul className="feature-bullets" variants={bulletVariants}>
              {[
                'Centralized resume upload, storage, and organization',
                'Track candidate scores, shortlist status, and review stages',
                'Export scores and status in CSV for collaboration, review, and decision-making',
              ].map((b) => (
                <motion.li key={b} variants={bulletItem}>
                  <span className="bullet-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                  {b}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          <motion.div className="feature-visual" variants={fromLeft} {...visualHover}>
            <div className="feature-visual-inner">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--charcoal)' }}>Candidate Pipeline</div>
                <span style={{ fontSize: '11px', color: 'var(--charcoal-xlt)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>24 total</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { initials: 'SC', name: 'Sarah Chen', sub: 'Score 92 · Shortlisted', tag: 'Interview', avatar: 'linear-gradient(135deg,#C8A27A,#B8926A)', tagColor: 'var(--success)', tagBg: 'var(--success-bg)' },
                  { initials: 'DK', name: 'David Kumar', sub: 'Score 87 · Under review', tag: 'Reviewing', avatar: 'linear-gradient(135deg,#7A9EC8,#6A8EB8)', tagColor: 'var(--charcoal-md)', tagBg: 'var(--ivory-medium)' },
                  { initials: 'AM', name: 'Ana Martinez', sub: 'Score 78 · New', tag: 'Parsed', avatar: 'linear-gradient(135deg,#8AC87A,#7AB86A)', tagColor: 'var(--charcoal-xlt)', tagBg: 'var(--ivory-medium)' },
                ].map((row, i) => (
                  <motion.div
                    key={row.initials}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.12, duration: 0.5, ease }}
                    whileHover={{ x: 4 }}
                    style={{ background: 'var(--white)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '10px' }}
                  >
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: row.avatar, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: 'white', flexShrink: 0 }}>{row.initials}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--charcoal)' }}>{row.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--charcoal-lt)' }}>{row.sub}</div>
                    </div>
                    <span style={{ fontSize: '10.5px', fontWeight: 700, color: row.tagColor, background: row.tagBg, padding: '3px 8px', borderRadius: '100px' }}>{row.tag}</span>
                  </motion.div>
                ))}
              </div>
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11.5px', color: 'var(--charcoal-lt)' }}>
                <span>Intake &rarr; Parse &rarr; Rank &rarr; Review</span>
                <motion.span
                  style={{ color: 'var(--copper)', fontWeight: 600, cursor: 'pointer' }}
                  whileHover={{ y: 2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 14 }}
                >
                  Export CSV &darr;
                </motion.span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Feature 5: Privacy & Compliance */}
        <motion.div
          className="feature-row"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={rowContainer}
        >
          <motion.div className="feature-text" variants={fromLeft}>
            <h3>Privacy and Compliance, Built In</h3>
            <p>HireSort is designed with controls that support GDPR, India's DPDP framework, and applicable US privacy requirements, including the CCPA.</p>
            <motion.ul className="feature-bullets" variants={bulletVariants}>
              {[
                'Minimizes unnecessary exposure of personally identifiable information',
                'Supports access controls, retention limits, and breach-response workflows',
                'Enables privacy-aware exports and human-reviewed AI screening',
              ].map((b) => (
                <motion.li key={b} variants={bulletItem}>
                  <span className="bullet-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                  {b}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div className="feature-visual" variants={fromRight} {...visualHover}>
            <div className="feature-visual-inner">
              {/* Compliance framework chips */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--charcoal-lt)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Compliance Frameworks</div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '10.5px', fontWeight: 700, color: 'var(--success)', background: 'var(--success-bg)', padding: '3px 8px', borderRadius: '100px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--success)', animation: 'pulse-dot 2s ease-in-out infinite' }} />
                  Active
                </span>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
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
                    style={{
                      flex: 1,
                      minWidth: 0,
                      background: 'var(--white)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '10px',
                      padding: '10px 12px',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      background: 'rgba(200, 90, 23, 0.1)',
                      color: 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <polyline points="9 12 11 14 15 10" />
                      </svg>
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--charcoal)', lineHeight: 1.2 }}>{chip.label}</div>
                      <div style={{ fontSize: '10px', color: 'var(--charcoal-lt)', lineHeight: 1.2 }}>{chip.sub}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* PII minimization preview */}
              <div style={{
                background: 'var(--white)',
                border: '1px solid var(--border-light)',
                borderRadius: '12px',
                padding: '12px 14px',
                marginBottom: '10px',
                boxShadow: 'var(--shadow-sm)',
                overflow: 'hidden',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}>
                      <rect x="3" y="11" width="18" height="10" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--charcoal)' }}>PII Minimization</span>
                  </div>
                  <span style={{ fontSize: '9.5px', fontWeight: 700, color: 'var(--success)', background: 'var(--success-bg)', padding: '2px 6px', borderRadius: '4px' }}>enabled</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
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
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}
                    >
                      <span style={{ fontSize: '10.5px', color: 'var(--charcoal-lt)', fontWeight: 500 }}>{row.label}</span>
                      <span style={{ fontSize: '11px', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', color: 'var(--charcoal)', fontWeight: 600, letterSpacing: '0.3px' }}>{row.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Controls row */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
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
                    style={{
                      background: 'var(--white)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '10px',
                      padding: '9px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <div style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: 'var(--success-bg)',
                      color: 'var(--success)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.2 }}>{row.label}</div>
                      <div style={{ fontSize: '10.5px', color: 'var(--charcoal-lt)', lineHeight: 1.3, marginTop: '2px' }}>{row.sub}</div>
                    </div>
                    <span style={{ fontSize: '9.5px', fontWeight: 800, color: 'var(--success)', background: 'var(--success-bg)', padding: '2px 6px', borderRadius: '4px', flexShrink: 0, textTransform: 'uppercase', letterSpacing: '0.4px' }}>On</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
