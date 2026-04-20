import React from 'react';
import { Link } from '@tanstack/react-router';
import { Mail, ArrowRight, MessageCircle, Clock } from 'lucide-react';

const ContactSection = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-card">
        <div className="contact-glow" aria-hidden="true"></div>

        <div className="contact-left">
          <div className="contact-eyebrow">
            <Mail size={13} strokeWidth={2.5} />
            <span>Get in touch</span>
          </div>
          <h2>
            Have a question? <span className="accent">Let's talk.</span>
          </h2>
          <p>
            Need custom workflows, enterprise pricing, or guidance on rolling out HireSort
            across your team? Our team responds within one business day &mdash; no forms, no
            runaround, just straightforward answers from the people who build the product.
          </p>
          <div className="contact-cta-row">
            <Link to="/contact_us" className="btn-primary hero-cta-btn">
              Contact us
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <span className="contact-sub">
              <Clock size={13} strokeWidth={2.5} /> Typical response in under 24 hours
            </span>
          </div>
        </div>

        <div className="contact-visual" aria-hidden="true">
          <div className="contact-float-card contact-float-1">
            <div className="contact-float-icon">
              <MessageCircle size={14} strokeWidth={2.5} />
            </div>
            <div>
              <div className="contact-float-title">Custom workflows</div>
              <div className="contact-float-sub">Tailored to your ATS</div>
            </div>
          </div>

          <div className="contact-float-card contact-float-2">
            <div className="contact-float-icon accent">
              <Mail size={14} strokeWidth={2.5} />
            </div>
            <div>
              <div className="contact-float-title">Enterprise pricing</div>
              <div className="contact-float-sub">Built for scale</div>
            </div>
          </div>

          <div className="contact-float-card contact-float-3">
            <div className="contact-float-icon">
              <Clock size={14} strokeWidth={2.5} />
            </div>
            <div>
              <div className="contact-float-title">Onboarding support</div>
              <div className="contact-float-sub">Humans, not bots</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
