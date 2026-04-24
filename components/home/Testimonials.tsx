// Currently not in use intentionally
import TestimonialCard from './TestimonialCard';

const testimonials = [
  {
    avatar: 'SP',
    name: 'Sarah Park',
    role: 'Head of Talent',
    company: 'Vercel',
    stars: 5,
    text: 'HireSort saved us 12 hours per week on resume screening. The AI explanations for each score mean we can trust the rankings without second-guessing.',
    highlightText: 'saved us 12 hours per week',
  },
  {
    avatar: 'MK',
    name: 'Mike Kumar',
    role: 'CTO',
    company: 'Notion',
    stars: 5,
    text: 'The explainable scoring is a game-changer. Each candidate gets a breakdown of why they scored high or low. Our hiring managers love it.',
    highlightText: 'explainable scoring',
  },
  {
    avatar: 'JR',
    name: 'Jessica Rivera',
    role: 'Recruiter',
    company: 'Stripe',
    stars: 5,
    text: 'We uploaded 200 resumes and had ranked results in under 90 seconds. The ZIP upload feature is incredibly convenient for bulk hiring.',
    highlightText: 'ranked results in under 90 seconds',
  },
  {
    avatar: 'DL',
    name: 'David Lee',
    role: 'HR Director',
    company: 'Linear',
    stars: 5,
    text: "Finally a tool that understands context. It doesn't just keyword-match — it actually understands role requirements and scores accordingly.",
    highlightText: 'understands role requirements',
  },
  {
    avatar: 'AT',
    name: 'Anna Thompson',
    role: 'VP People',
    company: 'Supabase',
    stars: 5,
    text: 'The share report feature streamlined our team collaboration. Everyone can see the AI analysis and leave comments. Hiring decisions are faster now.',
    highlightText: 'streamlined our team collaboration',
  },
  {
    avatar: 'RW',
    name: 'Rachel Wong',
    role: 'Talent Lead',
    company: 'Figma',
    stars: 5,
    text: 'Tried many AI tools for hiring. HireSort is the only one that explains its reasoning. No black box, just clear, actionable insights on every candidate.',
    highlightText: 'the only one that explains its reasoning',
  },
];

const Testimonials = () => {
  return (
    <section className="overflow-hidden py-25">
      <div className="mx-auto mb-12 max-w-150 px-6 text-center">
        <h2 className="mb-3 text-[clamp(28px,4vw,40px)] font-extrabold leading-[1.15] tracking-[-1px] text-charcoal">
          Loved by <span className="text-accent">recruiters</span> everywhere
        </h2>
        <p className="text-base leading-[1.6] text-charcoal-lt">
          Join hundreds of hiring teams who cut their screening time by 80%.
        </p>
      </div>

      <div className="relative w-full">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-linear-to-r from-ivory to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-linear-to-l from-ivory to-transparent" />
        <div className="flex w-max animate-scroll-left hover:[animation-play-state:paused]">
          {testimonials.map((t, i) => (
            <TestimonialCard key={`t1-${i}`} {...t} />
          ))}
          {testimonials.map((t, i) => (
            <TestimonialCard key={`t2-${i}`} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
