'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Copy,
  FileText,
  HelpCircle,
  MessageSquare,
  Printer,
  Sparkles,
} from 'lucide-react';
import { PageHero, pageFadeUp, pageStagger } from '@/components/layout/PageHero';
import { trackCTAClick, trackEvent } from '@/lib/google_analytics_tracker';
import { hiresortAppUrl, type Cta, type HiringGuidePage } from '../_data';

const sectionLabel =
  'mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.8px] text-accent';

const sectionTitle =
  'text-[clamp(24px,3.2vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px] text-charcoal';

const sectionShell = 'mx-auto max-w-310 px-6 py-16 xl:px-14';

const guideNavItems = [
  ['Summary', '#quick-summary'],
  ['Checklist', '#screening-checklist'],
  ['Questions', '#interview-questions'],
  ['Scorecard', '#scorecard'],
  ['Process', '#hiring-process'],
  ['JD intake', '#job-description-intake'],
  ['Red flags', '#red-flags'],
  ['Tools', '#free-tools'],
  ['Resources', '#related-resources'],
  ['FAQs', '#faqs'],
] as const;

type Props = {
  data: HiringGuidePage;
};

type CopyAsset = 'checklist' | 'questions' | 'scorecard';

const trackGuideEvent = (event: string, data: HiringGuidePage, extra: Record<string, string> = {}) => {
  trackEvent(event, {
    role: data.role,
    slug: data.slug,
    department: data.department,
    source_page: `/resources/hiring-guides/${data.slug}`,
    ...extra,
  });
};

const HiringGuideClient = ({ data }: Props) => {
  const [openFaq, setOpenFaq] = useState<string | null>(data.faqs[0]?.id ?? null);
  const [activeSection, setActiveSection] = useState<string>('quick-summary');
  const [copiedAsset, setCopiedAsset] = useState<CopyAsset | null>(null);

  useEffect(() => {
    document.body.classList.add('hiring-guide-detail-page');
    return () => {
      document.body.classList.remove('hiring-guide-detail-page');
    };
  }, []);

  useEffect(() => {
    const sectionIds = guideNavItems.map(([, href]) => href.slice(1));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: '-22% 0px -58% 0px',
        threshold: [0.12, 0.24, 0.4, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handlePrint = () => {
    trackGuideEvent('hiring_guide_print', data);
    const printFrame = document.createElement('iframe');

    printFrame.setAttribute('aria-hidden', 'true');
    printFrame.style.position = 'fixed';
    printFrame.style.right = '0';
    printFrame.style.bottom = '0';
    printFrame.style.width = '0';
    printFrame.style.height = '0';
    printFrame.style.border = '0';
    document.body.appendChild(printFrame);

    const frameWindow = printFrame.contentWindow;
    const frameDocument = frameWindow?.document;

    if (!frameWindow || !frameDocument) {
      printFrame.remove();
      window.print();
      return;
    }

    frameDocument.open();
    frameDocument.write(buildPrintGuideHtml(data));
    frameDocument.close();

    window.setTimeout(() => {
      frameWindow.focus();
      frameWindow.print();
      window.setTimeout(() => printFrame.remove(), 1000);
    }, 250);
  };

  const handleSectionJump = (href: string) => {
    const sectionId = href.slice(1);
    const target = document.getElementById(sectionId);
    if (!target) return;

    setActiveSection(sectionId);
    window.history.replaceState(null, '', href);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCopy = async (asset: CopyAsset, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAsset(asset);
      trackGuideEvent('hiring_guide_copy_action', data, { asset });
      window.setTimeout(() => setCopiedAsset(null), 1800);
    } catch {
      trackGuideEvent('hiring_guide_copy_failed', data, { asset });
    }
  };

  const toggleFaq = (id: string) => {
    setOpenFaq((current) => {
      const next = current === id ? null : id;
      if (next) {
        const item = data.faqs.find((faq) => faq.id === id);
        trackGuideEvent('faq_open', data, { faq_id: id, question: item?.question ?? '' });
      }
      return next;
    });
  };

  return (
    <>
      <GuideSideRail data={data} activeSection={activeSection} onNavigate={handleSectionJump} />
      <div className="xl:pl-[240px]">
      <PageHero
        icon={<ClipboardCheck size={13} strokeWidth={2.5} />}
        eyebrow="Role hiring guide"
        title={
          <>
            {data.role} hiring guide:{' '}
            <span className="text-accent">screen, interview, score</span>
          </>
        }
        lead={data.summary.whatTheyDo}
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#screening-checklist"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-copper bg-copper px-7 py-3.5 text-[14.5px] font-semibold leading-none text-white no-underline transition-colors hover:bg-copper-dark"
          >
            Start with checklist
            <ArrowRight size={15} strokeWidth={2.5} />
          </a>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-line bg-white px-7 py-3.5 text-[14.5px] font-semibold leading-none text-charcoal transition-colors hover:border-charcoal-xlt hover:bg-ivory-light"
          >
            <Printer size={15} strokeWidth={2.5} />
            Print guide
          </button>
        </div>
      </PageHero>

      <GuideMobileNav data={data} activeSection={activeSection} onNavigate={handleSectionJump} />

      <section id="quick-summary" className={`scroll-mt-28 bg-ivory-light ${sectionShell}`}>
        <CopyActionBar data={data} copiedAsset={copiedAsset} onCopy={handleCopy} />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={pageStagger}
          className="grid gap-8"
        >
          <motion.div variants={pageFadeUp} className="max-w-250">
            <span className={sectionLabel}>Quick hiring summary</span>
            <h2 className={sectionTitle}>What to look for before you start interviewing</h2>
            <p className="mt-4 text-[15.5px] leading-[1.75] text-charcoal-lt">{data.summary.whenToHire}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {data.summary.bestFor.map((item) => (
                <div key={item} className="rounded-xl border border-line-soft bg-ivory-light p-4 text-[13.5px] font-semibold text-charcoal-md">
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div variants={pageFadeUp} className="grid items-stretch gap-6 lg:grid-cols-2">
            <div className="h-full rounded-2xl border border-line-soft bg-white p-6 shadow-card">
              <h3 className="mb-4 text-[20px] font-extrabold tracking-[-0.4px] text-charcoal">Strong candidates usually show</h3>
              <ul className="flex list-none flex-col gap-3 p-0">
                {data.summary.strongCandidatesShow.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14px] leading-[1.65] text-charcoal-md">
                    <CheckCircle2 size={16} strokeWidth={2.4} className="mt-1 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <ScorecardPreview data={data} />
          </motion.div>
        </motion.div>
      </section>

      <section
        id="screening-checklist"
        className={`scroll-mt-28 bg-linear-to-b from-ivory to-ivory-medium ${sectionShell}`}
      >
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={pageStagger}
          className="mx-auto max-w-300"
        >
          <motion.div variants={pageFadeUp} className="mx-auto mb-8 max-w-180 text-center">
            <span className={sectionLabel}>Screening checklist</span>
            <h2 className={sectionTitle}>Use this before spending interview time</h2>
            <p className="mt-3 text-[15px] leading-[1.7] text-charcoal-md">
              A crisp resume screen should separate must-have evidence from nice-to-have signals and red flags.
            </p>
          </motion.div>
          <div className="grid gap-6 lg:grid-cols-3">
            <ChecklistCard title="Must-have signals" items={data.screening.mustHave} tone="good" />
            <ChecklistCard title="Nice-to-have signals" items={data.screening.niceToHave} tone="neutral" />
            <ChecklistCard title="Resume red flags" items={data.screening.redFlags} tone="risk" />
          </div>
          <SectionCopyButton
            asset="checklist"
            label="Copy checklist"
            copiedAsset={copiedAsset}
            onCopy={handleCopy}
            text={formatChecklist(data)}
          />
          <ToolStrip
            data={data}
            tools={data.toolLinks.filter((tool) =>
              ['Free AI Resume Screening', 'Free AI Rubric Generator'].includes(tool.label),
            )}
            location="screening_checklist"
          />
        </motion.div>
      </section>

      <section id="interview-questions" className={`scroll-mt-28 bg-white ${sectionShell}`}>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={pageStagger}
        >
          <motion.div variants={pageFadeUp} className="mb-8 max-w-190">
            <span className={sectionLabel}>Interview questions</span>
            <h2 className={sectionTitle}>Best questions to validate the resume signal</h2>
            <p className="mt-3 text-[15px] leading-[1.7] text-charcoal-md">
              Ask the same core questions to every candidate so the debrief has comparable evidence.
            </p>
          </motion.div>
          <motion.ol variants={pageFadeUp} className="mx-auto flex max-w-240 list-none flex-col gap-4 p-0">
            {data.interviewQuestions.map((item, index) => (
              <li key={item.question} className="rounded-2xl border border-line-soft bg-ivory-light p-5 shadow-soft">
                <div className="mb-2 flex items-center gap-3">
                  <span className="font-mono text-[12px] font-bold text-accent">{String(index + 1).padStart(2, '0')}</span>
                  <MessageSquare size={16} strokeWidth={2.3} className="text-charcoal-xlt" />
                </div>
                <h3 className="mb-2 text-[16px] font-bold leading-snug tracking-[-0.2px] text-charcoal">{item.question}</h3>
                <p className="text-[13.5px] leading-[1.65] text-charcoal-md">
                  <span className="font-bold text-charcoal">Strong answer signal:</span> {item.strongSignal}
                </p>
                <p className="mt-2 text-[13.5px] leading-[1.65] text-charcoal-md">
                  <span className="font-bold text-charcoal">Watch out for:</span> {item.watchOutFor}
                </p>
              </li>
            ))}
          </motion.ol>
          <SectionCopyButton
            asset="questions"
            label="Copy questions"
            copiedAsset={copiedAsset}
            onCopy={handleCopy}
            text={formatQuestions(data)}
          />
          <ToolStrip
            data={data}
            tools={data.toolLinks.filter((tool) => tool.label === 'Interview questions by role')}
            location="interview_questions"
          />
        </motion.div>
      </section>

      <section id="scorecard" className={`scroll-mt-28 bg-ivory ${sectionShell}`}>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={pageStagger}
          className="mx-auto max-w-300"
        >
          <motion.div variants={pageFadeUp} className="mx-auto mb-8 max-w-190 text-center">
            <span className={sectionLabel}>Scorecard</span>
            <h2 className={sectionTitle}>Score candidates on the criteria that actually matter</h2>
            <p className="mt-3 text-[15px] leading-[1.7] text-charcoal-md">{data.scorecard.intro}</p>
          </motion.div>
          <motion.div variants={pageFadeUp} className="overflow-x-auto rounded-xl border border-line-soft bg-white shadow-card">
            <table className="w-full min-w-190 border-collapse text-left text-[14px]">
              <thead>
                <tr className="border-b border-line-soft bg-ivory-light">
                  <th className="px-5 py-3 font-bold text-charcoal">Criterion</th>
                  <th className="px-5 py-3 font-bold text-charcoal">Weight</th>
                  <th className="px-5 py-3 font-bold text-charcoal">What to assess</th>
                </tr>
              </thead>
              <tbody>
                {data.scorecard.criteria.map((row, index) => (
                  <tr key={row.criterion} className={index % 2 === 0 ? 'border-b border-line-soft' : 'border-b border-line-soft bg-ivory-light/40'}>
                    <td className="px-5 py-3 font-semibold text-charcoal">{row.criterion}</td>
                    <td className="px-5 py-3 font-mono text-accent">{row.weight}%</td>
                    <td className="px-5 py-3 text-charcoal-md">{row.whatToAssess}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
          <motion.div variants={pageFadeUp} className="mt-6 grid gap-3 md:grid-cols-5">
            {data.scorecard.scoringAnchors.map((anchor) => (
              <div key={anchor} className="rounded-xl border border-line-soft bg-white p-4 text-[12.5px] leading-[1.55] text-charcoal-md shadow-soft">
                {anchor}
              </div>
            ))}
          </motion.div>
          <SectionCopyButton
            asset="scorecard"
            label="Copy scorecard"
            copiedAsset={copiedAsset}
            onCopy={handleCopy}
            text={formatScorecard(data)}
          />
          <ToolStrip
            data={data}
            tools={data.toolLinks.filter((tool) =>
              ['Free AI Rubric Generator', 'Free Hiring Analytics Spreadsheet'].includes(tool.label),
            )}
            location="scorecard"
          />
        </motion.div>
      </section>

      <section id="hiring-process" className={`scroll-mt-28 bg-white ${sectionShell}`}>
        <div className="mb-8 max-w-190">
          <span className={sectionLabel}>Hiring process</span>
          <h2 className={sectionTitle}>Run a short, evidence-based interview loop</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <InfoPanel label="Hiring process" title="Recommended interview loop" items={data.hiringProcess} />
          <InfoPanel label="Work sample" title={data.workSample.task} items={[`Time limit: ${data.workSample.timeLimit}`, ...data.workSample.howToScore]} />
        </div>
      </section>

      <section
        id="job-description-intake"
        className={`scroll-mt-28 bg-linear-to-b from-ivory-medium to-ivory ${sectionShell}`}
      >
        <div className="mb-8 max-w-190">
          <span className={sectionLabel}>JD intake</span>
          <h2 className={sectionTitle}>Clarify the role before you source</h2>
        </div>
        <div className="mx-auto grid max-w-300 gap-6 lg:grid-cols-3">
          <InfoPanel label="Job description" title="Align the role before posting" items={[...data.intake.mustHaveRequirements, ...data.intake.prompts]} />
          <InfoPanel label="Role variants" title="Adjust by role shape" items={data.variants} />
          <InfoPanel label="Seniority" title="Adjust the bar by level" items={data.seniorityAdjustments} />
        </div>
        <div className="mx-auto max-w-300">
          <ToolStrip
            data={data}
            tools={data.toolLinks.filter((tool) => tool.label === 'Free AI JD Generator')}
            location="job_description_intake"
          />
        </div>
      </section>

      <section id="red-flags" className={`scroll-mt-28 bg-white ${sectionShell}`}>
        <div className="mb-8 max-w-190">
          <span className={sectionLabel}>Red flags</span>
          <h2 className={sectionTitle}>Avoid signals that create false confidence</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <InfoPanel label="Avoid false positives" title="Signals that look better than they are" items={data.falsePositives} icon="risk" />
          <div className="rounded-2xl border border-line-soft bg-white p-6 shadow-card">
            <span className={sectionLabel}>30 / 60 / 90 day outcomes</span>
            <h2 className="mb-6 text-[24px] font-extrabold tracking-[-0.5px] text-charcoal">What success should look like after hiring</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ['30 days', data.outcomes.thirty],
                ['60 days', data.outcomes.sixty],
                ['90 days', data.outcomes.ninety],
              ].map(([label, items]) => (
                <div key={label as string} className="rounded-xl bg-ivory-light p-4">
                  <h3 className="mb-3 text-[15px] font-bold text-charcoal">{label as string}</h3>
                  <ul className="flex list-none flex-col gap-2 p-0">
                    {(items as string[]).map((item) => (
                      <li key={item} className="text-[13px] leading-[1.55] text-charcoal-md">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="free-tools"
        className={`scroll-mt-28 bg-charcoal text-white ${sectionShell}`}
      >
        <div className="mx-auto max-w-300">
          <span className="mb-3 inline-block rounded-full bg-copper px-3 py-1 text-[12px] font-bold uppercase tracking-[0.8px] text-white">
            Free tools
          </span>
          <h2 className="mb-3 text-[clamp(24px,3.2vw,34px)] font-extrabold leading-[1.2] tracking-[-0.8px]">
            Use the guide, then generate the assets faster
          </h2>
          <p className="mb-8 max-w-190 text-[15px] leading-[1.7] text-white/72">
            These links are placed here as a compact toolkit, but the same tools are also embedded in the relevant sections above.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {data.toolLinks.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={() => trackGuideEvent('hiring_guide_free_tool_click', data, { destination: tool.href, cta_location: 'free_tools_block' })}
                className="rounded-2xl border border-white/10 bg-white/7 p-5 text-white no-underline transition-colors hover:bg-white/12"
              >
                <Sparkles size={18} strokeWidth={2.3} className="mb-4 text-white" />
                <h3 className="mb-2 text-[15px] font-bold">{tool.label}</h3>
                <p className="text-[12.5px] leading-[1.55] text-white/70">{tool.context}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="related-resources" className={`scroll-mt-28 bg-ivory-light ${sectionShell}`}>
        <div className="mb-8">
          <span className={sectionLabel}>Full HireSort resources</span>
          <h2 className={sectionTitle}>Go deeper when you need the full template</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {data.relatedResources.map((resource) => (
            <Link
              key={resource.href}
              href={resource.href}
              onClick={() => trackGuideEvent('hiring_guide_related_resource_click', data, { destination: resource.href })}
              className="group rounded-2xl border border-line-soft bg-white p-5 no-underline shadow-soft transition-all hover:-translate-y-0.5 hover:border-[rgba(200,90,23,0.35)] hover:shadow-card"
            >
              <h3 className="mb-2 text-[17px] font-bold tracking-[-0.3px] text-charcoal">{resource.label}</h3>
              <p className="mb-4 text-[13.5px] leading-[1.6] text-charcoal-md">{resource.description}</p>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-accent group-hover:translate-x-1">
                Open resource
                <ArrowRight size={14} strokeWidth={2.4} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section id="faqs" className={`scroll-mt-28 bg-white ${sectionShell}`}>
        <div className="mx-auto max-w-300">
          <span className={sectionLabel}>FAQs</span>
          <h2 className={sectionTitle}>Common questions about hiring a {data.role.toLowerCase()}</h2>
          <div className="mt-8 divide-y divide-line-soft rounded-2xl border border-line-soft bg-white shadow-soft">
            {data.faqs.map((faq) => (
              <button
                key={faq.id}
                type="button"
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-6 py-5 text-left"
              >
                <span className="flex items-start justify-between gap-4">
                  <span className="flex items-start gap-3 text-[15px] font-bold text-charcoal">
                    <HelpCircle size={17} strokeWidth={2.3} className="mt-0.5 shrink-0 text-accent" />
                    {faq.question}
                  </span>
                  <span className="text-accent">{openFaq === faq.id ? '−' : '+'}</span>
                </span>
                {openFaq === faq.id ? (
                  <span className="mt-3 block text-[14px] leading-[1.7] text-charcoal-md">
                    {faq.answer.join(' ')}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={`bg-ivory ${sectionShell}`}>
        <div className="mx-auto max-w-260 rounded-3xl bg-charcoal p-8 text-center text-white shadow-card md:p-12">
          <span className="mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.8px] text-copper-light">
            Screen faster
          </span>
          <h2 className="mx-auto mb-4 max-w-180 text-[clamp(26px,3.6vw,38px)] font-extrabold leading-[1.15] tracking-[-0.9px]">
            Turn this guide into a ranked {data.role.toLowerCase()} shortlist
          </h2>
          <p className="mx-auto mb-7 max-w-170 text-[15px] leading-[1.7] text-white/72">
            Upload resumes, screen against a role-specific rubric, and review evidence-backed candidate rankings in HireSort.
          </p>
          <a
            href={hiresortAppUrl}
            onClick={() => {
              trackCTAClick('hiring_guide_signup_click', `hiring_guide_${data.slug}_bottom`);
              trackGuideEvent('hiring_guide_signup_click', data, { destination: hiresortAppUrl, cta_location: 'bottom_cta' });
            }}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-copper bg-copper px-7 py-3.5 text-[14.5px] font-semibold leading-none text-white no-underline transition-colors hover:bg-copper-dark"
          >
            Start screening resumes
            <ArrowRight size={15} strokeWidth={2.5} />
          </a>
        </div>
      </section>
      </div>
    </>
  );
};

const formatChecklist = (data: HiringGuidePage) =>
  [
    `${data.role} screening checklist`,
    '',
    'Must-have signals:',
    ...data.screening.mustHave.map((item) => `- ${item}`),
    '',
    'Nice-to-have signals:',
    ...data.screening.niceToHave.map((item) => `- ${item}`),
    '',
    'Resume red flags:',
    ...data.screening.redFlags.map((item) => `- ${item}`),
  ].join('\n');

const formatQuestions = (data: HiringGuidePage) =>
  [
    `${data.role} interview questions`,
    '',
    ...data.interviewQuestions.flatMap((item, index) => [
      `${index + 1}. ${item.question}`,
      `Strong answer signal: ${item.strongSignal}`,
      `Watch out for: ${item.watchOutFor}`,
      '',
    ]),
  ].join('\n').trim();

const formatScorecard = (data: HiringGuidePage) =>
  [
    `${data.role} scorecard`,
    '',
    ...data.scorecard.criteria.map((item) => `${item.criterion} (${item.weight}%): ${item.whatToAssess}`),
    '',
    'Scoring anchors:',
    ...data.scorecard.scoringAnchors.map((item) => `- ${item}`),
  ].join('\n');

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const listHtml = (items: string[]) =>
  `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;

const buildPrintGuideHtml = (data: HiringGuidePage) => {
  const scorecardRows = data.scorecard.criteria
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(item.criterion)}</td>
          <td class="weight">${item.weight}%</td>
          <td>${escapeHtml(item.whatToAssess)}</td>
        </tr>
      `,
    )
    .join('');

  const questionBlocks = data.interviewQuestions
    .map(
      (item, index) => `
        <div class="question">
          <h3>${index + 1}. ${escapeHtml(item.question)}</h3>
          <p><strong>Strong answer signal:</strong> ${escapeHtml(item.strongSignal)}</p>
          <p><strong>Watch out for:</strong> ${escapeHtml(item.watchOutFor)}</p>
        </div>
      `,
    )
    .join('');

  return `<!doctype html>
    <html>
      <head>
        <title>${escapeHtml(data.role)} Hiring Guide</title>
        <meta charset="utf-8" />
        <style>
          @page { margin: 18mm; }
          body {
            color: #272727;
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            font-size: 13px;
            line-height: 1.55;
            margin: 0;
          }
          h1 { font-size: 30px; line-height: 1.15; margin: 0 0 8px; }
          h2 { border-top: 1px solid #ddd7ce; font-size: 18px; margin: 28px 0 10px; padding-top: 18px; }
          h3 { font-size: 14px; margin: 14px 0 4px; }
          p { margin: 0 0 8px; }
          ul { margin: 6px 0 14px 20px; padding: 0; }
          li { margin: 3px 0; }
          table { border-collapse: collapse; margin: 8px 0 14px; width: 100%; }
          th, td { border: 1px solid #ddd7ce; padding: 8px; text-align: left; vertical-align: top; }
          th { background: #f6f2eb; }
          .eyebrow { color: #b8642b; font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; }
          .muted { color: #666; }
          .weight { color: #b8642b; font-weight: 800; white-space: nowrap; }
          .question { break-inside: avoid; margin-bottom: 12px; }
          .footer { border-top: 1px solid #ddd7ce; color: #666; font-size: 11px; margin-top: 30px; padding-top: 12px; }
        </style>
      </head>
      <body>
        <div class="eyebrow">HireSort role hiring guide</div>
        <h1>${escapeHtml(data.role)} Hiring Guide</h1>
        <p class="muted">${escapeHtml(data.meta.description)}</p>

        <h2>Quick hiring summary</h2>
        <p>${escapeHtml(data.summary.whatTheyDo)}</p>
        <p>${escapeHtml(data.summary.whenToHire)}</p>
        <h3>Best for</h3>
        ${listHtml(data.summary.bestFor)}
        <h3>Strong candidates usually show</h3>
        ${listHtml(data.summary.strongCandidatesShow)}

        <h2>Screening checklist</h2>
        <h3>Must-have signals</h3>
        ${listHtml(data.screening.mustHave)}
        <h3>Nice-to-have signals</h3>
        ${listHtml(data.screening.niceToHave)}
        <h3>Resume red flags</h3>
        ${listHtml(data.screening.redFlags)}

        <h2>Interview questions</h2>
        ${questionBlocks}

        <h2>Scorecard</h2>
        <table>
          <thead>
            <tr>
              <th>Criterion</th>
              <th>Weight</th>
              <th>What to assess</th>
            </tr>
          </thead>
          <tbody>${scorecardRows}</tbody>
        </table>
        <h3>Scoring anchors</h3>
        ${listHtml(data.scorecard.scoringAnchors)}

        <h2>Hiring process</h2>
        ${listHtml(data.hiringProcess)}

        <h2>Work sample</h2>
        <p>${escapeHtml(data.workSample.task)}</p>
        <p><strong>Time limit:</strong> ${escapeHtml(data.workSample.timeLimit)}</p>
        ${listHtml(data.workSample.howToScore)}

        <h2>JD intake and role adjustments</h2>
        <h3>Must-have requirements</h3>
        ${listHtml(data.intake.mustHaveRequirements)}
        <h3>Role variants</h3>
        ${listHtml(data.variants)}
        <h3>Seniority adjustments</h3>
        ${listHtml(data.seniorityAdjustments)}

        <h2>False positives and success outcomes</h2>
        <h3>False positives</h3>
        ${listHtml(data.falsePositives)}
        <h3>30 days</h3>
        ${listHtml(data.outcomes.thirty)}
        <h3>60 days</h3>
        ${listHtml(data.outcomes.sixty)}
        <h3>90 days</h3>
        ${listHtml(data.outcomes.ninety)}

        <div class="footer">
          Last reviewed: ${escapeHtml(data.updatedAt)} · Generated from HireSort hiring guides · hiresort.ai
        </div>
      </body>
    </html>`;
};

const CopyActionBar = ({
  data,
  copiedAsset,
  onCopy,
}: {
  data: HiringGuidePage;
  copiedAsset: CopyAsset | null;
  onCopy: (asset: CopyAsset, text: string) => void;
}) => (
  <div className="mx-auto mb-10 grid max-w-300 gap-3 rounded-2xl border border-line-soft bg-white p-4 shadow-soft md:grid-cols-[1fr_auto] md:items-center">
    <div>
      <span className={sectionLabel}>Build your hiring kit</span>
      <h2 className="text-[22px] font-extrabold tracking-[-0.4px] text-charcoal">
        Copy the pieces you need and keep moving
      </h2>
      <p className="mt-2 text-[14px] leading-[1.6] text-charcoal-md">
        Grab the checklist, questions, or scorecard for your ATS, doc, or interview panel.
      </p>
    </div>
    <div className="flex flex-wrap gap-2 md:justify-end">
      <CopyButton
        asset="checklist"
        label="Copy checklist"
        copiedAsset={copiedAsset}
        onCopy={onCopy}
        text={formatChecklist(data)}
      />
      <CopyButton
        asset="questions"
        label="Copy questions"
        copiedAsset={copiedAsset}
        onCopy={onCopy}
        text={formatQuestions(data)}
      />
      <CopyButton
        asset="scorecard"
        label="Copy scorecard"
        copiedAsset={copiedAsset}
        onCopy={onCopy}
        text={formatScorecard(data)}
      />
    </div>
  </div>
);

const ScorecardPreview = ({ data }: { data: HiringGuidePage }) => (
  <div className="h-full rounded-2xl border border-line-soft bg-white p-5 shadow-soft">
    <div className="mb-3 flex items-center justify-between gap-3">
      <h3 className="text-[17px] font-extrabold tracking-[-0.3px] text-charcoal">Scorecard preview</h3>
      <a href="#scorecard" className="text-[12.5px] font-bold text-accent no-underline hover:text-copper-dark">
        Full scorecard
      </a>
    </div>
    <div className="grid gap-2">
      {data.scorecard.criteria.map((item) => (
        <div key={item.criterion} className="flex items-center justify-between gap-3 rounded-xl bg-ivory-light px-3 py-2">
          <span className="text-[13px] font-semibold text-charcoal-md">{item.criterion}</span>
          <span className="font-mono text-[12.5px] font-bold text-accent">{item.weight}%</span>
        </div>
      ))}
    </div>
  </div>
);

const SectionCopyButton = ({
  asset,
  label,
  copiedAsset,
  onCopy,
  text,
}: {
  asset: CopyAsset;
  label: string;
  copiedAsset: CopyAsset | null;
  onCopy: (asset: CopyAsset, text: string) => void;
  text: string;
}) => (
  <div className="mt-6 flex justify-center lg:justify-end">
    <CopyButton
      asset={asset}
      label={label}
      copiedAsset={copiedAsset}
      onCopy={onCopy}
      text={text}
    />
  </div>
);

const CopyButton = ({
  asset,
  label,
  copiedAsset,
  onCopy,
  text,
}: {
  asset: CopyAsset;
  label: string;
  copiedAsset: CopyAsset | null;
  onCopy: (asset: CopyAsset, text: string) => void;
  text: string;
}) => {
  const copied = copiedAsset === asset;

  return (
    <button
      type="button"
      onClick={() => onCopy(asset, text)}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-bold transition-colors ${
        copied
          ? 'border-green-700 bg-green-700 text-white'
          : 'border-charcoal/15 bg-ivory text-charcoal hover:border-charcoal/30 hover:bg-ivory-medium'
      }`}
    >
      {copied ? <Check size={14} strokeWidth={2.4} /> : <Copy size={14} strokeWidth={2.4} />}
      {copied ? 'Copied' : label}
    </button>
  );
};

const ChecklistCard = ({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: 'good' | 'neutral' | 'risk';
}) => {
  const Icon = tone === 'risk' ? AlertTriangle : CheckCircle2;
  return (
    <motion.div variants={pageFadeUp} className="rounded-2xl border border-line-soft bg-white p-6 shadow-soft">
      <h3 className="mb-4 flex items-center gap-2 text-[19px] font-extrabold tracking-[-0.3px] text-charcoal">
        <Icon size={17} strokeWidth={2.4} className={tone === 'risk' ? 'text-red-600' : 'text-accent'} />
        {title}
      </h3>
      <ul className="flex list-none flex-col gap-3 p-0">
        {items.map((item) => (
          <li key={item} className="text-[14px] leading-[1.65] text-charcoal-md">
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const GuideSideRail = ({
  data,
  activeSection,
  onNavigate,
}: {
  data: HiringGuidePage;
  activeSection: string;
  onNavigate: (href: string) => void;
}) => (
  <aside className="fixed bottom-0 left-0 top-[72px] z-20 hidden w-[240px] border-r border-line-soft bg-white/95 shadow-soft backdrop-blur xl:block">
    <nav
      aria-label={`${data.role} hiring guide sections`}
      className="h-full overflow-y-auto px-4 py-6"
    >
      <div className="mb-3 border-b border-line-soft px-2 pb-4">
        <div className="text-[10.5px] font-bold uppercase tracking-[0.9px] text-accent">
          Hiring guide
        </div>
        <div className="mt-1 text-[16px] font-extrabold leading-tight text-charcoal">
          {data.role}
        </div>
      </div>

      <ul className="flex list-none flex-col gap-1.5 overflow-y-auto p-0 pr-1">
        {guideNavItems.map(([label, href]) => (
          <li key={href}>
            <a
              href={href}
              onClick={(event) => {
                event.preventDefault();
                onNavigate(href);
              }}
              className={`flex items-center rounded-xl px-3 py-2.5 text-[13.5px] font-bold no-underline transition-colors ${
                activeSection === href.slice(1)
                  ? 'border border-copper/20 bg-ivory-medium text-accent shadow-soft'
                  : 'text-charcoal-md hover:bg-ivory-light hover:text-accent'
              }`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

const GuideMobileNav = ({
  data,
  activeSection,
  onNavigate,
}: {
  data: HiringGuidePage;
  activeSection: string;
  onNavigate: (href: string) => void;
}) => {
  const activeLabel = guideNavItems.find(([, href]) => href.slice(1) === activeSection)?.[0] ?? 'Summary';

  return (
    <div className="sticky top-[68px] z-90 border-y border-line-soft bg-white px-4 py-3 shadow-soft xl:hidden">
      <nav
        aria-label={`${data.role} hiring guide sections`}
        className="mx-auto flex max-w-300 flex-col gap-3"
      >
        <label className="flex flex-col gap-1 text-[11px] font-bold uppercase tracking-[0.8px] text-accent">
          Jump to section
          <select
            value={`#${activeSection}`}
            onChange={(event) => {
              onNavigate(event.target.value);
            }}
            className="rounded-xl border border-line bg-white px-4 py-3 text-[14px] font-bold normal-case tracking-normal text-charcoal shadow-soft"
          >
            {guideNavItems.map(([label, href]) => (
              <option key={href} value={href}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-linear-to-l from-white to-transparent" />
          <ul className="flex min-w-max list-none items-center gap-2 overflow-x-auto p-0 pr-8">
            {guideNavItems.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  aria-current={activeLabel === label ? 'true' : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate(href);
                  }}
                  className={`block rounded-full border px-4 py-2 text-[12.5px] font-bold no-underline transition-colors ${
                    activeSection === href.slice(1)
                      ? 'border-copper/25 bg-ivory-medium text-accent'
                      : 'border-line-soft bg-ivory-light text-charcoal-md hover:border-copper/25 hover:bg-ivory-medium hover:text-accent'
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

const ToolStrip = ({
  data,
  tools,
  location,
}: {
  data: HiringGuidePage;
  tools: Cta[];
  location: string;
}) => {
  if (tools.length === 0) return null;

  return (
    <motion.div variants={pageFadeUp} className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-end">
      {tools.map((tool) => (
        <Link
          key={`${location}-${tool.href}`}
          href={tool.href}
          onClick={() =>
            trackGuideEvent('hiring_guide_free_tool_click', data, {
              destination: tool.href,
              cta_location: location,
            })
          }
          className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-ivory px-5 py-2.5 text-[13px] font-bold text-charcoal no-underline shadow-soft transition-colors hover:border-charcoal/30 hover:bg-ivory-medium"
        >
          <Sparkles size={14} strokeWidth={2.4} />
          {tool.label}
        </Link>
      ))}
    </motion.div>
  );
};

const InfoPanel = ({
  label,
  title,
  items,
  icon = 'check',
}: {
  label: string;
  title: string;
  items: string[];
  icon?: 'check' | 'risk';
}) => {
  const Icon = icon === 'risk' ? AlertTriangle : FileText;
  return (
    <div className="rounded-2xl border border-line-soft bg-white p-6 shadow-soft">
      <span className={sectionLabel}>{label}</span>
      <h2 className="mb-5 text-[22px] font-extrabold leading-[1.25] tracking-[-0.5px] text-charcoal">{title}</h2>
      <ul className="flex list-none flex-col gap-3 p-0">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[14px] leading-[1.65] text-charcoal-md">
            <Icon size={15} strokeWidth={2.3} className={`mt-1 shrink-0 ${icon === 'risk' ? 'text-red-600' : 'text-accent'}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HiringGuideClient;
