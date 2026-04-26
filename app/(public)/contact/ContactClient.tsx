'use client';

import { useState } from 'react';
import {
  Mail,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase_client';
import { PageHero, pageEase, pageFadeUp } from '@/components/layout/PageHero';
import { trackFormSubmit } from '@/lib/google_analytics_tracker';

type FormState = {
  name: string;
  email: string;
  location: string;
  query: string;
};

const initialForm: FormState = { name: '', email: '', location: '', query: '' };

const fieldClass =
  'w-full rounded-md border border-line-soft bg-ivory-light px-3.5 py-2.5 text-[14px] text-charcoal placeholder:text-charcoal-xlt transition-[border-color,background,box-shadow] hover:border-line focus:border-accent focus:bg-white focus:outline-none focus:ring-3 focus:ring-[rgba(200,90,23,0.12)]';
const labelClass = 'text-[12.5px] font-semibold tracking-[0.1px] text-charcoal-md';
const infoCardClass =
  'flex items-start gap-3.5 rounded-lg border border-line-soft bg-white px-5 py-4.5 transition-all hover:border-line hover:shadow-soft';
const infoLabelClass =
  'mb-1 text-[11px] font-bold uppercase tracking-[0.6px] text-charcoal-xlt';
const infoValueClass = 'block text-[14px] font-semibold text-charcoal leading-snug';

const ContactClient = () => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!form.name.trim() || !form.email.trim() || !form.query.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      setError(null);
      setLoading(true);
      const { error: supabaseError } = await supabase.from('contact_us').insert([
        {
          full_name: form.name,
          email: form.email,
          location: form.location,
          query: form.query,
        },
      ]);
      if (supabaseError) throw supabaseError;
      setSubmitted(true);
      trackFormSubmit('contact', true);
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setError('An unexpected error occurred. Please try again later.');
      trackFormSubmit('contact', false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        icon={<Mail size={13} strokeWidth={2.5} />}
        eyebrow="Contact us"
        title={
          <>
            Let&apos;s talk about <span className="text-accent">hiring better.</span>
          </>
        }
        lead={
          <>
            Whether you have a question about pricing, need help with onboarding, or want to
            explore a custom workflow for your team &mdash; we&apos;re here. A real human reads
            every message.
          </>
        }
      />

      <section className="mx-auto w-full max-w-300 flex-1 px-6 pt-8 pb-24">
        <div className="grid items-start gap-8 md:grid-cols-[0.85fr_1.15fr]">
          {/* Info column */}
          <aside className="flex flex-col gap-3">
            <div className={infoCardClass}>
              <div className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-lg bg-[rgba(0,0,0,0.05)] text-copper">
                <Mail size={18} strokeWidth={2.2} />
              </div>
              <div>
                <div className={infoLabelClass}>Email</div>
                <a
                  href="mailto:support@hiresort.ai"
                  className={`${infoValueClass} transition-colors hover:text-accent`}
                >
                  support@hiresort.ai
                </a>
              </div>
            </div>

            <div className={infoCardClass}>
              <div className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-lg bg-[rgba(0,0,0,0.05)] text-copper">
                <Clock size={18} strokeWidth={2.2} />
              </div>
              <div>
                <div className={infoLabelClass}>Response time</div>
                <div className={infoValueClass}>Within 24 hours, Mon&ndash;Fri</div>
              </div>
            </div>

            <div className="mt-1 flex items-start gap-2.5 rounded-md border border-[rgba(200,90,23,0.14)] bg-[rgba(200,90,23,0.06)] px-4 py-3.5 text-[12.5px] leading-[1.55] text-charcoal-md">
              <MessageSquare
                size={14}
                strokeWidth={2.5}
                className="mt-0.5 shrink-0 text-accent"
              />
              <span>
                Looking for product help? Most answers live in our docs &mdash; check there
                first for the fastest path.
              </span>
            </div>
          </aside>

          {/* Form column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: pageEase }}
            className="rounded-xl border border-line-soft bg-white p-9 shadow-card"
          >
            {submitted ? (
              <div className="py-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success-bg text-success">
                  <CheckCircle2 size={36} strokeWidth={2.2} />
                </div>
                <h3 className="mb-2 text-[22px] font-bold tracking-[-0.5px] text-charcoal">
                  Message received
                </h3>
                <p className="mx-auto mb-5 max-w-100 text-[14.5px] leading-[1.6] text-charcoal-lt">
                  Thanks for reaching out, {form.name || 'there'}. We&apos;ll get back to you at{' '}
                  <strong className="font-semibold text-charcoal">{form.email}</strong> within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(initialForm);
                    setSubmitted(false);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-line bg-white px-5 py-2.5 text-[14px] font-semibold text-charcoal transition-colors hover:border-charcoal-xlt hover:bg-ivory-light"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4.5">
                <motion.div variants={pageFadeUp} className="mb-1.5">
                  <h2 className="mb-1.5 text-[22px] font-bold tracking-[-0.5px] text-charcoal">
                    Send us a message
                  </h2>
                  <p className="text-[13.5px] text-charcoal-lt">
                    We&apos;ll reply to the email you provide below.
                  </p>
                </motion.div>

                {error && (
                  <div
                    role="alert"
                    className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-600"
                  >
                    {error}
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="cf-name" className={labelClass}>
                      Full name
                    </label>
                    <input
                      id="cf-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Jane Doe"
                      required
                      value={form.name}
                      onChange={handleChange('name')}
                      className={fieldClass}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="cf-email" className={labelClass}>
                      Work email
                    </label>
                    <input
                      id="cf-email"
                      type="email"
                      autoComplete="email"
                      placeholder="jane@company.com"
                      required
                      value={form.email}
                      onChange={handleChange('email')}
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cf-location" className={labelClass}>
                    Location
                  </label>
                  <input
                    id="cf-location"
                    type="text"
                    autoComplete="address-level2"
                    placeholder="City, country"
                    value={form.location}
                    onChange={handleChange('location')}
                    className={fieldClass}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cf-query" className={labelClass}>
                    How can we help?
                  </label>
                  <textarea
                    id="cf-query"
                    rows={6}
                    placeholder="Tell us a bit about your team, your hiring volume, and what you'd like to know."
                    required
                    value={form.query}
                    onChange={handleChange('query')}
                    className={`${fieldClass} min-h-30 resize-y leading-[1.55]`}
                  />
                </div>

                <div className="mt-1.5 flex flex-wrap items-center gap-3.5">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-copper bg-copper px-6 py-3 text-[14.5px] font-semibold leading-none text-white transition-colors hover:bg-copper-dark disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? 'Sending…' : 'Send message'}
                    {loading ? (
                      <span
                        aria-hidden
                        className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white"
                      />
                    ) : (
                      <Send size={15} strokeWidth={2.5} />
                    )}
                  </button>
                  <span className="min-w-50 flex-1 text-[11.5px] leading-normal text-charcoal-xlt">
                    By submitting, you agree to our privacy policy. We never share your details.
                  </span>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ContactClient;
