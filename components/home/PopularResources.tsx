import Link from 'next/link';

type ResourceLink = {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
};

type ResourceGroup = {
  heading: string;
  moreHref: string;
  moreLabel: string;
  links: ResourceLink[];
};

const groups: ResourceGroup[] = [
  {
    heading: 'Product',
    moreHref: '/product',
    moreLabel: 'More product pages',
    links: [
      {
        href: '/product/agentic-hiring-platform',
        eyebrow: 'Product',
        title: 'Agentic Hiring Platform',
        description:
          'Create JDs, post jobs, source candidates, screen resumes, interview, and shortlist.',
      },
      {
        href: '/product/applicant-tracking-system',
        eyebrow: 'Product',
        title: 'AI Applicant Tracking System',
        description:
          'A lightweight ATS built around AI resume screening, ranked shortlists, and stage tracking.',
      },
      {
        href: '/product/automated-screening-and-interviews',
        eyebrow: 'Product',
        title: 'Automated Screening & Interviews',
        description:
          'AI resume screening, phone screens, and first-round interviews in one workflow.',
      },
    ],
  },
  {
    heading: 'Software guides',
    moreHref: '/resources/best',
    moreLabel: 'More software guides',
    links: [
      {
        href: '/resources/best/ai-recruiting-agents',
        eyebrow: 'Guide',
        title: 'Best AI Recruiting Agents in 2026',
        description:
          'A practical guide to agentic recruiting tools for sourcing, screening, interviews, and shortlists.',
      },
      {
        href: '/resources/hiring-guides/what-is-agentic-hiring',
        eyebrow: 'Guide',
        title: 'What Is Agentic Hiring?',
        description:
          'A simple answer for teams comparing AI recruiting agents, automation, and ATS tools.',
      },
      {
        href: '/resources/best/candidate-screening-software',
        eyebrow: 'Guide',
        title: 'Best Candidate Screening Software in 2026',
        description:
          'How to choose candidate screening software for resume shortlisting, HR screening, assessments, and high-volume hiring.',
      },
    ],
  },
  {
    heading: 'Compare',
    moreHref: '/resources/compare',
    moreLabel: 'More comparisons',
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
        href: '/resources/compare/hiresort-vs-hireez',
        eyebrow: 'Compare',
        title: 'HireSort vs hireEZ',
        description:
          'Compare agentic hiring workflows with outbound sourcing software.',
      },
      {
        href: '/resources/compare/hiresort-vs-hirevue',
        eyebrow: 'Compare',
        title: 'HireSort vs HireVue',
        description:
          'Compare automated screening, interviews, and shortlist workflows.',
      },
    ],
  },
  {
    heading: 'Templates & rubrics',
    moreHref: '/resources',
    moreLabel: 'More resources',
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
          Product pages, software guides, comparisons, templates, and rubrics teams use to hire faster.
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
            <Link
              href={group.moreHref}
              className="mt-4 inline-flex text-[14px] font-bold text-accent transition-colors hover:text-copper"
            >
              {group.moreLabel} -&gt;
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularResources;
