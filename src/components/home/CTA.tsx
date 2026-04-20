import React from 'react';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="cta-section">
      <h2>Stop reading resumes.<br />Start <span style={{ color: 'var(--accent)' }}>finding talent</span>.</h2>
      <p>Upload your first batch and see ranked results in under 90 seconds. Free to start, no credit card required.</p>
      <a href="#" className="btn-primary hero-cta-btn">
        Get started
        <ArrowRight size={16} strokeWidth={2.5} />
      </a>
    </section>
  );
};

export default CTA;
