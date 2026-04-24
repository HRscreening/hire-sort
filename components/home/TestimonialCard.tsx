// Currently not in use intentionally
interface TestimonialCardProps {
  avatar: string;
  name: string;
  role: string;
  company: string;
  stars: number;
  text: string;
  highlightText?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  avatar,
  name,
  role,
  company,
  stars,
  text,
  highlightText,
}) => {
  const renderStars = () => '★'.repeat(stars).padEnd(5, '☆');

  const renderContent = () => {
    if (highlightText && text.includes(highlightText)) {
      const parts = text.split(highlightText);
      return (
        <>
          {parts[0]}
          <mark className="rounded-sm bg-[rgba(200,90,23,0.15)] px-1 py-px text-charcoal">
            {highlightText}
          </mark>
          {parts[1]}
        </>
      );
    }
    return text;
  };

  return (
    <div className="mx-2.5 w-75 shrink-0 rounded-lg border border-line-soft bg-linear-to-b from-ivory-light to-ivory-medium p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-line-soft bg-linear-to-br from-ivory-dark to-line text-[15px] font-bold text-charcoal-md">
          {avatar}
        </div>
        <div>
          <div className="text-[14.5px] font-semibold text-charcoal">{name}</div>
          <div className="text-[12.5px] text-charcoal-lt">
            {role} • {company}
          </div>
        </div>
      </div>
      <div className="mb-2.5 text-base tracking-[2px] text-accent">{renderStars()}</div>
      <p className="line-clamp-6 text-sm leading-[1.65] text-charcoal-md">
        {renderContent()}
      </p>
    </div>
  );
};

export default TestimonialCard;
