// Currently not in use intentionally
import TestimonialCard from './TestimonialCard';

const testimonials = [
  {
  avatar: 'MS',
  name: 'Mohak Sinha',
  role: `Founder's Office Associate`,
  company: 'IQ-Line',
  stars: 5,
  text: 'HireSort helped us shortlist quality candidates much faster. The AI scoring and resume insights made it easier for our team to identify the right profiles without manually reviewing every application. We are now considering it for wider adoption across our hiring process.',
  highlightText: 'shortlist quality candidates much faster',
},
 {
  avatar: 'PS',
  name: 'Puneet Sethiya',
  role: 'Co-Founder',
  company: 'Z42 Labs',
  stars: 5,
  text: 'HireSort helped our team reduce the time spent on manual resume screening while improving the consistency of candidate evaluations. The AI-driven scoring and explanations made it easier to identify strong talent quickly and streamline our hiring workflow.',
  highlightText: 'streamline our hiring workflow',
},
 
];


// This is animated part
// Use when sufficinet testimonials are available
// const Testimonials = () => {
//   return (
//     <section className="overflow-hidden py-25">
//       <div className="mx-auto mb-12 max-w-150 px-6 text-center">
//         <h2 className="mb-3 text-[clamp(28px,4vw,40px)] font-extrabold leading-[1.15] tracking-[-1px] text-charcoal">
//           Loved by <span className="text-accent">recruiters</span> everywhere
//         </h2>
//         <p className="text-base leading-[1.6] text-charcoal-lt">
//           Join hundreds of hiring teams who cut their screening time by 80%.
//         </p>
//       </div>

//       <div className="relative w-full">
//         <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-linear-to-r from-ivory to-transparent" />
//         <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-linear-to-l from-ivory to-transparent" />
//         <div className="flex w-max animate-scroll-left hover:[animation-play-state:paused]">
//           {testimonials.map((t, i) => (
//             <TestimonialCard key={`t1-${i}`} {...t} />
//           ))}
//           {testimonials.map((t, i) => (
//             <TestimonialCard key={`t2-${i}`} {...t} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

const Testimonials = () => {
  return (
    <section className="overflow-hidden py-25 px-18">
      <div className="mx-auto mb-12 max-w-150 px-6 text-center">
        <h2 className="mb-3 text-[clamp(28px,4vw,40px)] font-extrabold leading-[1.15] tracking-[-1px] text-charcoal">
          Loved by <span className="text-accent">recruiters</span> everywhere
        </h2>
        <p className="text-base leading-[1.6] text-charcoal-lt">
          Join hundreds of hiring teams who cut their screening time by 80%.
        </p>
      </div>

      <div className="relative w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        {testimonials.map((t, i) => (
            <TestimonialCard key={`t1-${i}`} {...t} />
          ))}
        
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
