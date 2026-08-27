const cardClass =
  'rounded-xl border border-line-soft bg-linear-to-b from-ivory-light to-ivory p-7 transition-transform hover:-translate-y-2';
const stepNumberClass =
  'mb-5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-copper to-copper-light text-[15px] font-bold text-white shadow-[0_4px_12px_rgba(200,90,23,0.2)]';
const cardTitleClass = 'mb-2.5 text-[19px] font-bold tracking-[-0.3px]';
const cardCopyClass = 'text-[14.5px] leading-[1.65] text-charcoal-lt';
const visualWrapClass =
  'mt-6 min-h-30 overflow-hidden rounded-md border border-line-soft bg-white p-4';

const HowItWorks = () => {
  return (
    <section id="how" className="mx-auto max-w-300 px-6 pb-30 pt-10">
      <div className="mx-auto mb-12 max-w-150 px-6 text-center">
        <h2 className="mb-3 text-[clamp(28px,4vw,40px)] font-extrabold leading-[1.15] tracking-[-1px] text-charcoal">
          From role brief to <span className="text-accent">shortlist</span>
        </h2>
        <p className="text-base leading-[1.6] text-charcoal-lt">
          Enter the role, budget, and location. HireSort turns it into a structured hiring workflow.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-120 grid-cols-1 gap-8 md:max-w-none md:grid-cols-3">
        {/* Step 1 */}
        <div className={cardClass}>
          <div className={stepNumberClass}>1</div>
          <h3 className={cardTitleClass}>Create the role</h3>
          <p className={cardCopyClass}>
            Add the role, location, budget, and must-have skills. AI drafts the JD and screening criteria.
          </p>
          <div className={visualWrapClass}>
            <div className="flex flex-col gap-2">
              {[
                { name: 'Role: Sales Executive', size: 'Open', type: 'pdf' },
                { name: 'Location: Bengaluru', size: 'Hybrid', type: 'pdf' },
                { name: 'Budget: 8-12 LPA', size: 'Set', type: 'zip' },
              ].map((file) => (
                <div
                  key={file.name}
                  className="flex items-center gap-2.5 rounded-sm bg-ivory-light px-3 py-2 text-[13px]"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[rgba(0,0,0,0.05)]">
                    {file.type === 'pdf' ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 text-copper">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 text-copper">
                        <rect x="2" y="2" width="20" height="20" rx="2" />
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                    )}
                  </div>
                  <span className="min-w-0 flex-1 truncate font-medium text-charcoal">{file.name}</span>
                  <span className="shrink-0 text-xs text-charcoal-xlt">{file.size}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className={cardClass}>
          <div className={stepNumberClass}>2</div>
          <h3 className={cardTitleClass}>Agents do the work</h3>
          <p className={cardCopyClass}>
            HireSort posts jobs, sources candidates, screens resumes, and calls qualified candidates.
          </p>
          <div className={visualWrapClass}>
            <div className="flex flex-col gap-3">
              {[
                { label: 'JD created', width: '100%', state: 'active' },
                { label: 'Jobs posted', width: '100%', state: 'active' },
                { label: 'Resumes screened', width: '100%', state: 'active' },
                { label: 'Phone screens', width: '85%', state: 'active' },
                { label: 'First interviews', width: '35%', state: 'pending' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2.5 text-[13px] text-charcoal-md"
                >
                  <span className={`h-2 w-2 shrink-0 rounded-full ${item.state === 'active' ? 'bg-success' : 'bg-charcoal-xlt'}`} />
                  <span>{item.label}</span>
                  <div className="h-1 flex-1 overflow-hidden rounded-sm bg-ivory-medium">
                    <div
                      className="h-full rounded-sm bg-charcoal"
                      style={{ width: item.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className={cardClass}>
          <div className={stepNumberClass}>3</div>
          <h3 className={cardTitleClass}>Review the shortlist</h3>
          <p className={cardCopyClass}>
            Get ranked candidates with resume notes, phone-screen summaries, interview notes, and scores.
          </p>
          <div className={visualWrapClass}>
            <div className="flex flex-col gap-2">
              {[
                { rank: '#1', avatar: 'SC', name: 'Sarah Chen', score: '92%', high: true, tag: 'Best Fit' },
                { rank: '#2', avatar: 'DK', name: 'David Kumar', score: '87%', high: true },
                { rank: '#3', avatar: 'EM', name: 'Elena Martinez', score: '74%', high: false },
              ].map((row) => (
                <div
                  key={row.rank}
                  className="flex items-center gap-2.5 rounded-sm bg-ivory-light px-3 py-2 transition-transform hover:translate-x-1"
                >
                  <span className="w-5 shrink-0 text-center text-xs font-bold text-charcoal-lt">{row.rank}</span>
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ivory-dark text-[10px] font-semibold text-charcoal-md">
                    {row.avatar}
                  </div>
                  <span className="min-w-0 flex-1 truncate text-[13px] font-medium">{row.name}</span>
                  <span className={`shrink-0 font-mono text-[13px] font-bold ${row.high ? 'text-success' : 'text-charcoal-md'}`}>
                    {row.score}
                  </span>
                  {row.tag && (
                    <span className="shrink-0 rounded-full bg-success-bg px-2 py-0.5 text-[10px] font-semibold text-success">
                      {row.tag}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
