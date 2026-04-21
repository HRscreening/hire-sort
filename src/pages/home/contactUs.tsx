import { useState } from 'react';
import "@/styles/style.css";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import {supabase} from '@/lib/supabase_client';

type FormState = {
  name: string;
  email: string;
  location: string;
  query: string;
};

const initialForm: FormState = { name: '', email: '', location: '', query: '' };

const ContactUs = () => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (loading) return;

    try {
      // Basic validation
      if (!form.name.trim() || !form.email.trim() || !form.query.trim()) {
        setError('Please fill in all required fields.');
        return;
      }
      if (!/\S+@\S+\.\S+/.test(form.email)) {
        setError('Please enter a valid email address.');
        return;
      }

      setError(null);
      setLoading(true);

      const { error: supabaseError } = await supabase
        .from('contact_us')
        .insert([
          {
            full_name: form.name,
            email: form.email,
            location: form.location,
            query: form.query,
          },
        ]);

      if (supabaseError) {
        throw supabaseError;
      }

      // Simulate form submission (replace with actual API call)
      console.log('Form submitted:', form);
      setSubmitted(true);
      
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (

      <main>
        <section className="contact-page-hero">
          <div className="contact-page-hero-grid" aria-hidden="true"></div>
          <div className="contact-page-hero-inner">
            <div className="contact-eyebrow">
              <Mail size={13} strokeWidth={2.5} />
              <span>Contact us</span>
            </div>
            <h1>
              Let's talk about <span className="accent">hiring better.</span>
            </h1>
            <p>
              Whether you have a question about pricing, need help with onboarding, or want to
              explore a custom workflow for your team &mdash; we're here. A real human reads every
              message.
            </p>
          </div>
        </section>

        <section className="contact-page-body">
          <div className="contact-page-grid">
            <aside className="contact-info">
              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <Mail size={18} strokeWidth={2.2} />
                </div>
                <div>
                  <div className="contact-info-label">Email</div>
                  <a href="mailto:hello@hiresort.ai" className="contact-info-value">
                    hello@hiresort.ai
                  </a>
                </div>
              </div>

              {/* <div className="contact-info-card">
                <div className="contact-info-icon">
                  <MapPin size={18} strokeWidth={2.2} />
                </div>
                <div>
                  <div className="contact-info-label">Office</div>
                  <div className="contact-info-value">IIT Delhi, Hauz Khas, New Delhi 110016</div>
                </div>
              </div> */}

              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <Clock size={18} strokeWidth={2.2} />
                </div>
                <div>
                  <div className="contact-info-label">Response time</div>
                  <div className="contact-info-value">Within 24 hours, Mon&ndash;Fri</div>
                </div>
              </div>

              <div className="contact-info-note">
                <MessageSquare size={14} strokeWidth={2.5} />
                <span>
                  Looking for product help? Most answers live in our docs &mdash; check there first
                  for the fastest path.
                </span>
              </div>
            </aside>

            <div className="contact-form-card">
              {submitted ? (
                <div className="contact-success">
                  <div className="contact-success-icon">
                    <CheckCircle2 size={36} strokeWidth={2.2} />
                  </div>
                  <h3>Message received</h3>
                  <p>
                    Thanks for reaching out, {form.name || 'there'}. We'll get back to you at{' '}
                    <strong>{form.email}</strong> within one business day.
                  </p>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => {
                      setForm(initialForm);
                      setSubmitted(false);
                    }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="contact-form-header">
                    <h2>Send us a message</h2>
                    <p>We'll reply to the email you provide below.</p>
                  </div>

                  {error && (
                    <div className="contact-form-error" style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.875rem' }}>
                      {error}
                    </div>
                  )}

                  <div className="contact-form-row">
                    <div className="contact-field">
                      <label htmlFor="cf-name">Full name</label>
                      <input
                        id="cf-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Jane Doe"
                        required
                        value={form.name}
                        onChange={handleChange('name')}
                      />
                    </div>
                    <div className="contact-field">
                      <label htmlFor="cf-email">Work email</label>
                      <input
                        id="cf-email"
                        type="email"
                        autoComplete="email"
                        placeholder="jane@company.com"
                        required
                        value={form.email}
                        onChange={handleChange('email')}
                      />
                    </div>
                  </div>

                  <div className="contact-field">
                    <label htmlFor="cf-location">Location</label>
                    <input
                      id="cf-location"
                      type="text"
                      autoComplete="address-level2"
                      placeholder="City, country"
                      value={form.location}
                      onChange={handleChange('location')}
                    />
                  </div>

                  <div className="contact-field">
                    <label htmlFor="cf-query">How can we help?</label>
                    <textarea
                      id="cf-query"
                      rows={6}
                      placeholder="Tell us a bit about your team, your hiring volume, and what you'd like to know."
                      required
                      value={form.query}
                      onChange={handleChange('query')}
                    />
                  </div>

                  <div className="contact-form-footer">
                    <button 
                      type="submit" 
                      className="btn-primary hero-cta-btn"
                      disabled={loading}
                      style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
                    >
                      {loading ? 'Sending...' : 'Send message'}
                      {!loading && <Send size={15} strokeWidth={2.5} />}
                      {loading && (
                        <div className="loader-spinner" style={{ 
                          width: '15px', 
                          height: '15px', 
                          border: '2px solid rgba(255,255,255,0.3)', 
                          borderTop: '2px solid white', 
                          borderRadius: '50%', 
                          animation: 'spin 1s linear infinite',
                          marginLeft: '8px'
                        }} />
                      )}
                    </button>
                    <span className="contact-form-fineprint">
                      By submitting, you agree to our privacy policy. We never share your details.
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
  );
};

export default ContactUs;
