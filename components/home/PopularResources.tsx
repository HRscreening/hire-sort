import Link from 'next/link';

type ResourceLink = {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
};

const groups: { heading: string; links: ResourceLink[] }[] = [
  {
    heading: 'Product',
    links: [
      {
        href: '/product/applicant-tracking-system',
        eyebrow: 'Product',
        title: 'AI Applicant Tracking System',
        description:
          'A lightweight ATS built around AI resume screening, ranked shortlists, and stage tracking.',
      },
      {
        href: '/product/recruitment-software',
        eyebrow: 'Product',
        title: 'Recruitment Software',
        description:
          'A simpler recruitment workflow for teams that want results without spreadsheets.',
      },
      {
        href: '/product/resume-management',
        eyebrow: 'Product',
        title: 'Resume & CV Management',
        description:
          'Turn every resume into a reusable candidate record you can reach for again.',
      },
    ],
  },
  {
    heading: 'Software guides',
    links: [
      {
        href: '/resources/best/candidate-screening-software',
        eyebrow: 'Guide',
        title: 'Best Candidate Screening Software in 2026',
        description:
          'How to choose candidate screening software for resume shortlisting, HR screening, assessments, and high-volume hiring.',
      },
      {
        href: '/resources/best/ai-resume-screening-software',
        eyebrow: 'Guide',
        title: 'Best AI Resume Screening Software in 2026',
        description:
          'A round-up of AI resume screening tools recruiters are using to rank candidates faster.',
      },
      {
        href: '/resources/best/high-volume-hiring-software',
        eyebrow: 'Guide',
        title: 'Best High-Volume Hiring Software in 2026',
        description:
          'Software for teams that need to screen large candidate pools without slowing down.',
      },
      {
        href: '/blog/how-to-shortlist-candidates-faster',
        eyebrow: 'Guide',
        title: 'How to Shortlist Candidates Faster',
        description:
          'A practical shortlisting workflow for ranking resumes, using evidence, and handing off finalists.',
      },
    ],
  },
  {
    heading: 'Compare',
    links: [
      {
        href: '/resources/compare/workable-alternative',
        eyebrow: 'Compare',
        title: 'HireSort vs Workable',
        description:
          'A screening-first alternative to Workable for teams that do not need a full HR suite.',
      },
      {
        href: '/resources/compare/greenhouse-alternative',
        eyebrow: 'Compare',
        title: 'HireSort vs Greenhouse',
        description:
          'A lighter, faster Greenhouse alternative focused on AI resume ranking.',
      },
      {
        href: '/resources/compare/hiresort-vs-manual-screening',
        eyebrow: 'Compare',
        title: 'HireSort vs Manual Resume Screening',
        description:
          'Compare AI-assisted candidate screening with manual resume review workflows.',
      },
      {
        href: '/resources/compare/ai-resume-screening-vs-ats',
        eyebrow: 'Compare',
        title: 'AI Resume Screening vs ATS',
        description:
          'Understand when teams need ATS tracking, AI screening, or both in the same workflow.',
      },
    ],
  },
  {
    heading: 'Templates & rubrics',
    links: [
      {
        href: '/resources/scorecards',
        eyebrow: 'Template',
        title: 'Interview Scorecard Templates',
        description:
          'Role-ready scorecards for consistent, structured candidate evaluation.',
      },
      {
        href: '/resources/screening-rubrics',
        eyebrow: 'Rubric',
        title: 'Resume Screening Rubrics',
        description:
          'Weighted resume screening criteria, must-haves, and explainable scoring guidance.',
      },
      {
        href: '/resources/job-descriptions',
        eyebrow: 'Templates',
        title: 'Job Description Templates',
        description:
          'Role-ready templates that help teams define requirements before candidate screening begins.',
      },
      {
        href: '/blog/resume-screening-checklist',
        eyebrow: 'Checklist',
        title: 'Resume Screening Checklist',
        description:
          'A step-by-step checklist for consistent resume review and shortlist decisions.',
      },
    ],
  },
];

const PopularResources = () => {
  return (
    <section
      id="resources"
      aria-labelledby="popular-resources-heading"
      className="mx-auto max-w-300 px-6 pb-30 pt-10"
    >
      <div className="mx-auto mb-12 max-w-150 px-6 text-center">
        <h2
          id="popular-resources-heading"
          className="mb-3 text-[clamp(28px,4vw,40px)] font-extrabold leading-[1.15] tracking-[-1px] text-charcoal"
        >
          Popular <span className="text-accent">resources</span>
        </h2>
        <p className="text-base leading-[1.6] text-charcoal-lt">
          Product pages, software guides, comparisons, templates, and rubrics teams use to screen resumes faster.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
        {groups.map((group) => (
          <div key={group.heading}>
            <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-[1.5px] text-charcoal-lt">
              {group.heading}
            </h3>
            <ul className="space-y-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group block rounded-xl border border-line-soft bg-linear-to-b from-ivory-light to-ivory p-5 transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                  >
                    <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[1.2px] text-copper">
                      {link.eyebrow}
                    </div>
                    <div className="mb-1.5 text-[16px] font-bold tracking-[-0.2px] text-charcoal group-hover:text-accent">
                      {link.title}
                    </div>
                    <p className="text-[14px] leading-[1.55] text-charcoal-lt">
                      {link.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularResources;
