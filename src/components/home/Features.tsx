import React from 'react';

const Features = () => {
  return (
    <section className="features-section" id="features">
      <div className="section-header">
        <h2>Built for <span className="accent">real hiring</span> workflows</h2>
        <p>Every feature designed to save you time and help you find the right people.</p>
      </div>

      <div className="features-zigzag">
        <div className="feature-row">
          <div className="feature-text">
            <h3>Explainable AI Scoring</h3>
            <p>No black boxes. Every candidate score comes with a detailed breakdown of strengths, gaps, and how they match the job description.</p>
            <ul className="feature-bullets">
              <li>
                <span className="bullet-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                Weighted scoring across skills, experience, education
              </li>
              <li>
                <span className="bullet-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                AI-written insight paragraph per candidate
              </li>
              <li>
                <span className="bullet-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                Red flags and standout strengths highlighted
              </li>
            </ul>
          </div>
          <div className="feature-visual">
            <div className="feature-visual-inner">
              <div className="insight-card">
                <div className="insight-header">
                  <div className="insight-avatar">SC</div>
                  <div>
                    <div className="insight-name">Sarah Chen</div>
                    <div className="insight-title">Sr. Backend Engineer &middot; 6 yrs</div>
                  </div>
                </div>
                <div className="insight-score-bar">
                  <div className="score-track"><div className="score-fill" style={{ width: '92%' }}></div></div>
                  <span className="score-value">92%</span>
                </div>
                <div className="insight-tags">
                  <span className="insight-tag match">Best Fit</span>
                  <span className="insight-tag">Python</span>
                  <span className="insight-tag">System Design</span>
                  <span className="insight-tag">AWS</span>
                </div>
              </div>
              <div className="insight-card" style={{ opacity: 0.7 }}>
                <div className="insight-header">
                  <div className="insight-avatar">DK</div>
                  <div>
                    <div className="insight-name">David Kumar</div>
                    <div className="insight-title">Full Stack Developer &middot; 4 yrs</div>
                  </div>
                </div>
                <div className="insight-score-bar">
                  <div className="score-track"><div className="score-fill" style={{ width: '87%' }}></div></div>
                  <span className="score-value">87%</span>
                </div>
                <div className="insight-tags">
                  <span className="insight-tag">React</span>
                  <span className="insight-tag">Node.js</span>
                  <span className="insight-tag">PostgreSQL</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2: Bulk Processing */}
        <div className="feature-row reverse">
          <div className="feature-text">
            <h3>Bulk Processing at Scale</h3>
            <p>Upload a ZIP with 500 resumes. Get ranked results in minutes, not days. Our async pipeline handles it all in the background.</p>
            <ul className="feature-bullets">
              <li>
                <span className="bullet-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                ZIP upload with auto-extraction
              </li>
              <li>
                <span className="bullet-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                Supports all resume file types, PDF, doc, docx, jpg
              </li>
              <li>
                <span className="bullet-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                Background processing &mdash; come back when it's done
              </li>
            </ul>
          </div>
          <div className="feature-visual">
            <div className="feature-visual-inner">
              <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '16px', color: 'var(--charcoal)' }}>Processing 147 of 200 resumes...</div>
              <div style={{ height: '8px', background: 'var(--ivory-medium)', borderRadius: '4px', overflow: 'hidden', marginBottom: '20px' }}>
                <div style={{ width: '73.5%', height: '100%', background: 'linear-gradient(90deg, var(--copper), var(--copper-light))', borderRadius: '4px', transition: 'width 0.3s' }}></div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div className="file-row" style={{ borderLeft: '3px solid var(--success)' }}>
                  <span className="file-name" style={{ fontSize: '12.5px' }}>batch_engineering_01.zip</span>
                  <span style={{ fontSize: '11px', color: 'var(--success)', fontWeight: 600 }}>Complete</span>
                </div>
                <div className="file-row" style={{ borderLeft: '3px solid var(--charcoal)' }}>
                  <span className="file-name" style={{ fontSize: '12.5px' }}>batch_engineering_02.zip</span>
                  <span style={{ fontSize: '11px', color: 'var(--charcoal-md)', fontWeight: 600 }}>Processing</span>
                </div>
                <div className="file-row" style={{ borderLeft: '3px solid var(--border)' }}>
                  <span className="file-name" style={{ fontSize: '12.5px' }}>batch_engineering_03.zip</span>
                  <span style={{ fontSize: '11px', color: 'var(--charcoal-xlt)', fontWeight: 600 }}>Queued</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 3: Contextual Search */}
        <div className="feature-row">
          <div className="feature-text">
            <h3>Contextual Search, Not Keyword Search</h3>
            <p>Go beyond keyword matching. HireSort evaluates resumes based on contextual relevance, helping HR teams identify genuinely strong candidates faster and more accurately.</p>
            <ul className="feature-bullets">
              <li>
                <span className="bullet-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                Semantic matching across skills and experience
              </li>
              <li>
                <span className="bullet-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                Better fit detection beyond exact phrase overlap
              </li>
              <li>
                <span className="bullet-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                Smarter shortlisting with fewer irrelevant matches
              </li>
            </ul>
          </div>
          <div className="feature-visual">
            <div className="feature-visual-inner">
              <div style={{ background: 'var(--white)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--charcoal-lt)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span style={{ fontSize: '12.5px', color: 'var(--charcoal)', fontWeight: 500 }}>Senior engineer who can scale distributed systems</span>
              </div>

              <div style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--charcoal-xlt)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>Semantic matches</div>

              <div style={{ background: 'var(--white)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '12px', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'linear-gradient(135deg,#C8A27A,#B8926A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10.5px', fontWeight: 700, color: 'white' }}>SC</div>
                    <span style={{ fontSize: '12.5px', fontWeight: 600 }}>Sarah Chen</span>
                  </div>
                  <span style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--success)', background: 'var(--success-bg)', padding: '3px 8px', borderRadius: '100px' }}>94% context</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '6px', background: 'var(--ivory-medium)', color: 'var(--charcoal-md)', fontWeight: 500 }}>Kafka &rarr; distributed systems</span>
                  <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '6px', background: 'var(--ivory-medium)', color: 'var(--charcoal-md)', fontWeight: 500 }}>7 yrs &rarr; senior</span>
                </div>
              </div>

              <div style={{ background: 'var(--white)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '12px', opacity: 0.75 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'linear-gradient(135deg,#7A9EC8,#6A8EB8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10.5px', fontWeight: 700, color: 'white' }}>DK</div>
                    <span style={{ fontSize: '12.5px', fontWeight: 600 }}>David Kumar</span>
                  </div>
                  <span style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--charcoal-md)', background: 'var(--ivory-medium)', padding: '3px 8px', borderRadius: '100px' }}>81% context</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '6px', background: 'var(--ivory-medium)', color: 'var(--charcoal-md)', fontWeight: 500 }}>microservices &rarr; distributed</span>
                  <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '6px', background: 'var(--ivory-medium)', color: 'var(--charcoal-md)', fontWeight: 500 }}>4 yrs &rarr; mid-senior</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 4: End-to-End Resume Management */}
        <div className="feature-row reverse">
          <div className="feature-text">
            <h3>End-to-End Resume Management</h3>
            <p>Manage the entire resume screening workflow in one place &mdash; from intake and parsing to ranking, tracking, and final review. HireSort helps HR teams stay organized, collaborate better, and move faster.</p>
            <ul className="feature-bullets">
              <li>
                <span className="bullet-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                Centralized resume upload, storage, and organization
              </li>
              <li>
                <span className="bullet-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                Track candidate scores, shortlist status, and review stages
              </li>
              <li>
                <span className="bullet-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                Export scores and status in CSV for collaboration, review, and decision-making
              </li>
            </ul>
          </div>
          <div className="feature-visual">
            <div className="feature-visual-inner">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--charcoal)' }}>Candidate Pipeline</div>
                <span style={{ fontSize: '11px', color: 'var(--charcoal-xlt)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>24 total</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ background: 'var(--white)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg,#C8A27A,#B8926A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: 'white', flexShrink: 0 }}>SC</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--charcoal)' }}>Sarah Chen</div>
                    <div style={{ fontSize: '11px', color: 'var(--charcoal-lt)' }}>Score 92 &middot; Shortlisted</div>
                  </div>
                  <span style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--success)', background: 'var(--success-bg)', padding: '3px 8px', borderRadius: '100px' }}>Interview</span>
                </div>
                <div style={{ background: 'var(--white)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg,#7A9EC8,#6A8EB8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: 'white', flexShrink: 0 }}>DK</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--charcoal)' }}>David Kumar</div>
                    <div style={{ fontSize: '11px', color: 'var(--charcoal-lt)' }}>Score 87 &middot; Under review</div>
                  </div>
                  <span style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--charcoal-md)', background: 'var(--ivory-medium)', padding: '3px 8px', borderRadius: '100px' }}>Reviewing</span>
                </div>
                <div style={{ background: 'var(--white)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg,#8AC87A,#7AB86A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: 'white', flexShrink: 0 }}>AM</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--charcoal)' }}>Ana Martinez</div>
                    <div style={{ fontSize: '11px', color: 'var(--charcoal-lt)' }}>Score 78 &middot; New</div>
                  </div>
                  <span style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--charcoal-xlt)', background: 'var(--ivory-medium)', padding: '3px 8px', borderRadius: '100px' }}>Parsed</span>
                </div>
              </div>
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11.5px', color: 'var(--charcoal-lt)' }}>
                <span>Intake &rarr; Parse &rarr; Rank &rarr; Review</span>
                <span style={{ color: 'var(--copper)', fontWeight: 600 }}>Export CSV &darr;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
