import React, { useState } from 'react';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const togglePricing = () => setIsYearly(!isYearly);

  return (
    <section className="pricing-section" id="pricing">
      <div className="section-header">
        <h2>Simple, <span className="accent">transparent</span> pricing</h2>
        <p>Start free. Upgrade as your hiring volume grows. No hidden fees.</p>
      </div>

      <div className="pricing-toggle">
        <span id="monthly-label" className={!isYearly ? 'active' : ''} onClick={() => setIsYearly(false)}>Monthly</span>
        <div className={`switch ${isYearly ? 'active' : ''}`} id="pricing-switch" onClick={togglePricing}></div>
        <span id="yearly-label" className={isYearly ? 'active' : ''} onClick={() => setIsYearly(true)}>Yearly</span>
        <span className="discount">Save 20%</span>
      </div>

      <div className="pricing-grid" id={isYearly ? 'yearly-prices' : 'monthly-prices'}>
        {/* Free */}
        <div className="pricing-card">
          <div className="pricing-name">Free</div>
          <div className="pricing-price">
            <span className="amount">$0</span>
            <span className="period">/month</span>
          </div>
          <p className="pricing-desc">Perfect for individuals and small teams getting started with AI-powered resume screening.</p>
          <ul className="pricing-features">
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
              50 resume analyses per month
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
              Bulk upload of up to 10 resumes at a time
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
              End-to-end resume management
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
              Support for all major resume file formats
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
              Export feature
            </li>
          </ul>
          <a href="#" className="btn-secondary">Get started for free</a>
        </div>

        {/* Plus */}
        <div className="pricing-card featured">
          <div className="pricing-name">Plus</div>
          <div className="pricing-price">
            <span className="amount">{isYearly ? '$20' : '$25'}</span>
            <span className="period">/user/month</span>
          </div>
          <p className="pricing-desc">Built for teams that hire regularly and need faster, higher-volume screening. {isYearly && '(billed yearly)'}</p>
          <ul className="pricing-features">
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
              Includes everything in Free
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
              2,000 resume analyses per month
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
              Bulk upload of up to 500 documents at a time
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
              Priority AI processing
            </li>
          </ul>
          <a href="#" className="btn-primary">Get started</a>
        </div>

        {/* Pro */}
        <div className="pricing-card">
          <div className="pricing-name">Pro</div>
          <div className="pricing-price">
            <span className="amount">{isYearly ? '$120' : '$149'}</span>
            <span className="period">/user/month</span>
          </div>
          <p className="pricing-desc">Designed for high-volume hiring teams that need scale, flexibility, and greater control over screening workflows. {isYearly && '(billed yearly)'}</p>
          <ul className="pricing-features">
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
              Includes everything in Plus
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
              10,000 document analyses per month
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
              Bulk upload of up to 1,000 documents at a time
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
              Reconfigure the scoring rubric and rescore candidates
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
              Dedicated support
            </li>
          </ul>
          <a href="#" className="btn-secondary">Get started</a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
