import Image from 'next/image';
import type { Author } from '../../_data/types';

type Props = {
  authors: Author[];
  publishedAt: string;
  updatedAt: string;
  readingTimeMinutes?: number;
};

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

const AuthorByline = ({ authors, publishedAt, updatedAt, readingTimeMinutes }: Props) => {
  if (authors.length === 0) return null;

  return (
    <section className="mx-auto max-w-300 px-6 pt-2 pb-6">
      <div className="mx-auto flex max-w-220 flex-wrap items-center gap-4 rounded-xl border border-line-soft bg-white px-5 py-4 shadow-soft">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          {authors.map((a) => (
            <div key={a.name} className="flex items-center gap-3">
              {a.avatarUrl && (
                <Image
                  src={a.avatarUrl}
                  alt={a.name}
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover"
                />
              )}
              <div className="text-[13.5px] leading-tight">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-charcoal">{a.name}</span>
                  {a.linkedinUrl && (
                    <a
                      href={a.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${a.name} on LinkedIn`}
                      className="text-[11px] font-semibold uppercase tracking-[0.4px] text-charcoal-lt no-underline hover:text-accent hover:underline"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
                <div className="text-[12.5px] text-charcoal-lt">{a.role}</div>
                {a.expertiseTags && a.expertiseTags.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {a.expertiseTags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line-soft bg-ivory-light px-2 py-0.5 text-[11px] font-medium text-charcoal-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="text-right text-[12px] leading-tight text-charcoal-lt">
          <div>
            <span className="font-medium text-charcoal-md">Published</span> {fmtDate(publishedAt)}
          </div>
          <div>
            <span className="font-medium text-charcoal-md">Updated</span> {fmtDate(updatedAt)}
          </div>
          {readingTimeMinutes && <div>~{readingTimeMinutes} min read</div>}
        </div>
      </div>
    </section>
  );
};

export default AuthorByline;
