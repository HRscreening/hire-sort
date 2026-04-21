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

const HowItWorks = () => {
  return (
    <section className="how-section" id="how">
      <motion.div
        className="section-header"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={headerVariants}
      >
        <h2>Three steps to your <span className="accent">perfect hire</span></h2>
        <p>From upload to ranked results in under 90 seconds. No setup, no training required.</p>
      </motion.div>

      <motion.div
        className="steps-grid"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={gridVariants}
      >
        {/* Step 1 */}
        <motion.div
          className="step-card"
          variants={cardVariants}
          whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
        >
          <motion.div
            className="step-number"
            initial={{ scale: 0, rotate: -90 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 280, damping: 14 }}
          >
            1
          </motion.div>
          <h3>Upload Resumes</h3>
          <p>Drop a single PDF or a ZIP with hundreds. We extract text from any format instantly.</p>
          <div className="step-visual">
            <div className="step-upload-preview">
              {[
                { name: 'sarah_chen_resume.pdf', size: '248 KB', type: 'pdf' },
                { name: 'david_kumar_cv.pdf', size: '312 KB', type: 'pdf' },
                { name: 'all_applicants.zip', size: '4.2 MB', type: 'zip' },
              ].map((file, i) => (
                <motion.div
                  key={file.name}
                  className="file-row"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.12, duration: 0.5, ease }}
                >
                  <div className="file-icon">
                    {file.type === 'pdf' ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2" /><path d="M9 12l2 2 4-4" /></svg>
                    )}
                  </div>
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">{file.size}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Step 2 */}
        <motion.div
          className="step-card"
          variants={cardVariants}
          whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
        >
          <motion.div
            className="step-number"
            initial={{ scale: 0, rotate: -90 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, type: 'spring', stiffness: 280, damping: 14 }}
          >
            2
          </motion.div>
          <h3>AI Analyzes</h3>
          <p>Our 5-stage pipeline extracts, parses, understands the JD, scores, and ranks every candidate.</p>
          <div className="step-visual">
            <div className="ai-processing">
              {[
                { label: 'Text Extraction', width: '100%', state: 'active' },
                { label: 'Resume Parsing', width: '100%', state: 'active' },
                { label: 'JD Analysis', width: '100%', state: 'active' },
                { label: 'AI Scoring', width: '85%', state: 'active' },
                { label: 'Ranking', width: '20%', state: 'pending' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  className="process-item"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.45, ease }}
                >
                  <span className={`process-dot ${item.state}`}></span>
                  <span>{item.label}</span>
                  <div className="process-bar">
                    <motion.div
                      className="process-bar-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: item.width }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 + i * 0.1, duration: 0.9, ease }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Step 3 */}
        <motion.div
          className="step-card"
          variants={cardVariants}
          whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
        >
          <motion.div
            className="step-number"
            initial={{ scale: 0, rotate: -90 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 280, damping: 14 }}
          >
            3
          </motion.div>
          <h3>Ranked Results</h3>
          <p>Get a scored, ranked list with AI explanations. Share with your team instantly.</p>
          <div className="step-visual">
            <div className="results-preview">
              {[
                { rank: '#1', avatar: 'SC', name: 'Sarah Chen', score: '92%', scoreCls: 'high', tag: 'Best Fit' },
                { rank: '#2', avatar: 'DK', name: 'David Kumar', score: '87%', scoreCls: 'high' },
                { rank: '#3', avatar: 'EM', name: 'Elena Martinez', score: '74%', scoreCls: 'mid' },
              ].map((row, i) => (
                <motion.div
                  key={row.rank}
                  className="result-row"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.13, duration: 0.5, ease }}
                  whileHover={{ x: 4 }}
                >
                  <span className="result-rank">{row.rank}</span>
                  <div className="result-avatar">{row.avatar}</div>
                  <span className="result-name">{row.name}</span>
                  <span className={`result-score ${row.scoreCls}`}>{row.score}</span>
                  {row.tag && <span className="result-tag">{row.tag}</span>}
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
