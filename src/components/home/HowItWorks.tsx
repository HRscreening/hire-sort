import React from 'react';

const HowItWorks = () => {
  return (
    <section className="how-section" id="how">
      <div className="section-header">
        <h2>Three steps to your <span className="accent">perfect hire</span></h2>
        <p>From upload to ranked results in under 90 seconds. No setup, no training required.</p>
      </div>

      <div className="steps-grid">
        {/* Step 1 */}
        <div className="step-card">
          <div className="step-number">1</div>
          <h3>Upload Resumes</h3>
          <p>Drop a single PDF or a ZIP with hundreds. We extract text from any format instantly.</p>
          <div className="step-visual">
            <div className="step-upload-preview">
              <div className="file-row">
                <div className="file-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                </div>
                <span className="file-name">sarah_chen_resume.pdf</span>
                <span className="file-size">248 KB</span>
              </div>
              <div className="file-row">
                <div className="file-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                </div>
                <span className="file-name">david_kumar_cv.pdf</span>
                <span className="file-size">312 KB</span>
              </div>
              <div className="file-row">
                <div className="file-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2" /><path d="M9 12l2 2 4-4" /></svg>
                </div>
                <span className="file-name">all_applicants.zip</span>
                <span className="file-size">4.2 MB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="step-card">
          <div className="step-number">2</div>
          <h3>AI Analyzes</h3>
          <p>Our 5-stage pipeline extracts, parses, understands the JD, scores, and ranks every candidate.</p>
          <div className="step-visual">
            <div className="ai-processing">
              <div className="process-item">
                <span className="process-dot active"></span>
                <span>Text Extraction</span>
                <div className="process-bar"><div className="process-bar-fill" style={{ width: '100%' }}></div></div>
              </div>
              <div className="process-item">
                <span className="process-dot active"></span>
                <span>Resume Parsing</span>
                <div className="process-bar"><div className="process-bar-fill" style={{ width: '100%' }}></div></div>
              </div>
              <div className="process-item">
                <span className="process-dot active"></span>
                <span>JD Analysis</span>
                <div className="process-bar"><div className="process-bar-fill" style={{ width: '100%' }}></div></div>
              </div>
              <div className="process-item">
                <span className="process-dot active"></span>
                <span>AI Scoring</span>
                <div className="process-bar"><div className="process-bar-fill" style={{ width: '85%' }}></div></div>
              </div>
              <div className="process-item">
                <span className="process-dot pending"></span>
                <span>Ranking</span>
                <div className="process-bar"><div className="process-bar-fill" style={{ width: '20%' }}></div></div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="step-card">
          <div className="step-number">3</div>
          <h3>Ranked Results</h3>
          <p>Get a scored, ranked list with AI explanations. Share with your team instantly.</p>
          <div className="step-visual">
            <div className="results-preview">
              <div className="result-row">
                <span className="result-rank">#1</span>
                <div className="result-avatar">SC</div>
                <span className="result-name">Sarah Chen</span>
                <span className="result-score high">92%</span>
                <span className="result-tag">Best Fit</span>
              </div>
              <div className="result-row">
                <span className="result-rank">#2</span>
                <div className="result-avatar">DK</div>
                <span className="result-name">David Kumar</span>
                <span className="result-score high">87%</span>
              </div>
              <div className="result-row">
                <span className="result-rank">#3</span>
                <div className="result-avatar">EM</div>
                <span className="result-name">Elena Martinez</span>
                <span className="result-score mid">74%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
