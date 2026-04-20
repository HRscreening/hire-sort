import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-grid-bg"></div>

      {/* Floating left: resume snippet card */}
      <div className="hero-float-left">
        <div className="float-card">
          <div className="float-card-label">Resume Detected</div>
          <div className="float-resume-lines">
            <div className="float-resume-line name"></div>
            <div className="float-resume-line title"></div>
            <div className="float-resume-line w90"></div>
            <div className="float-resume-line w80"></div>
            <div className="float-resume-line w65"></div>
            <div className="float-resume-line w90"></div>
            <div className="float-resume-line w50"></div>
          </div>
          <div className="float-resume-skills">
            <span className="float-skill-pill">Python</span>
            <span className="float-skill-pill">AWS</span>
            <span className="float-skill-pill">React</span>
            <span className="float-skill-pill">SQL</span>
          </div>
        </div>
      </div>

      {/* Floating right: score card */}
      <div className="hero-float-right">
        <div className="float-card">
          <div className="float-card-label">Top Candidate</div>
          <div className="float-score-header">
            <div className="float-score-avatar">SC</div>
            <div>
              <div className="float-score-name">Sarah Chen</div>
              <div className="float-score-role">Sr. Backend Engineer</div>
            </div>
          </div>
          <div className="float-score-ring">
            <svg className="float-ring-svg" viewBox="0 0 48 48">
              <circle className="track" cx="24" cy="24" r="20" />
              <circle className="fill" cx="24" cy="24" r="20" />
            </svg>
            <div>
              <div className="float-score-num">92%</div>
              <div className="float-score-label">Match Score</div>
            </div>
          </div>
          <div className="float-score-tag">Best Fit</div>
        </div>
      </div>

      {/* Floating bottom-left: stat */}
      <div className="hero-float-left-low">
        <div className="float-stat-card">
          <div className="float-stat-num">2.4s</div>
          <div className="float-stat-label">Avg. per resume</div>
        </div>
      </div>

      {/* Floating bottom-right: notification */}
      <div className="hero-float-right-low">
        <div className="float-card-mini">
          <div className="float-mini-icon">
            <Check strokeWidth={2.5} />
          </div>
          <div>
            <div className="float-mini-text">47 resumes ranked</div>
            <div className="float-mini-sub">Completed just now</div>
          </div>
        </div>
      </div>

      <div className="hero-badge">
        <span className="dot"></span>
        AI-powered resume screening
      </div>

      <h1>Screen resumes in <span className="accent">seconds</span>, not hours</h1>
      <p className="subtitle">Upload resumes, describe the role, and let AI rank your candidates with explainable scores. No more manual screening.</p>

      {/* Upload Drop Zone | will be used later*/}
      {/* <div className="upload-zone-wrapper">
        <div className="upload-zone" id="dropZone">
          <div className="upload-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <div className="upload-title">Drop your resume here to get started</div>
          <div className="upload-subtitle">Upload a single resume or a ZIP of multiple resumes</div>
          <div className="upload-actions">
            <button className="upload-btn" onClick={() => (window as any).document.getElementById('fileInput').click()}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
              Browse files
            </button>
            <span className="upload-or">or</span>
            <a href="#" className="upload-link">try with sample data</a>
          </div>
          <div className="upload-formats">
            <span><span className="format-dot"></span> PDF</span>
            <span><span className="format-dot"></span> DOCX</span>
            <span><span className="format-dot"></span> ZIP</span>
            <span><span className="format-dot"></span> Max 50MB</span>
          </div>
          <input type="file" id="fileInput" hidden accept=".pdf,.docx,.zip" multiple />
        </div>
      </div> */}

        <div className="hero-cta">
          <a href="#" className="btn-primary hero-cta-btn">
            Get Started
            <ArrowRight size={16} strokeWidth={2.5} />
          </a>
          <span className="hero-cta-sub">No credit card required &middot; Free forever plan</span>
        </div>

      {/* Removed For now */}
      {/* <div className="trusted-by">
        <div className="trusted-label">Trusted by hiring teams at</div>
        <div className="trusted-logos">
          <span className="logo-placeholder">Acme Corp</span>
          <span className="logo-placeholder">TechVentures</span>
          <span className="logo-placeholder">StartupHQ</span>
          <span className="logo-placeholder">GrowthCo</span>
          <span className="logo-placeholder">HireWell</span>
        </div>
      </div> */}
    </section>
  );
};

export default Hero;
