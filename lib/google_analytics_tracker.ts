import { sendGAEvent } from '@next/third-parties/google';

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

type EventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(action: string, params: EventParams = {}) {
  if (!GA_ID) return;
  sendGAEvent('event', action, params);
}

export const trackClick = (label: string, params: EventParams = {}) =>
  trackEvent('click', { label, ...params });

export const trackCTAClick = (cta: string, location?: string) =>
  trackEvent('cta_click', { cta, location });

export const trackSignup = (method: string) =>
  trackEvent('sign_up', { method });

export const trackLogin = (method: string) =>
  trackEvent('login', { method });

export const trackResumeUpload = (count: number, source?: string) =>
  trackEvent('resume_upload', { count, source });

export const trackJobCreated = (jobId: string) =>
  trackEvent('job_created', { job_id: jobId });

export const trackScreeningRun = (jobId: string, candidateCount: number) =>
  trackEvent('screening_run', { job_id: jobId, candidate_count: candidateCount });

export const trackFormSubmit = (formName: string, success = true) =>
  trackEvent('form_submit', { form_name: formName, success });

export const trackSearch = (query: string, resultsCount?: number) =>
  trackEvent('search', { search_term: query, results_count: resultsCount });
