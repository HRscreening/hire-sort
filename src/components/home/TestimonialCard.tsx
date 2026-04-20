import React from 'react';

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
  // Helper to render stars
  const renderStars = () => {
    return '★'.repeat(stars).padEnd(5, '☆');
  };

  // If highlightText is provided, we could split the text and wrap the highlight in <mark>
  // However, for simplicity and matching the existing HTML exactly:
  const renderContent = () => {
    if (highlightText && text.includes(highlightText)) {
      const parts = text.split(highlightText);
      return (
        <>
          {parts[0]}
          <mark>{highlightText}</mark>
          {parts[1]}
        </>
      );
    }
    return text;
  };

  return (
    <div className="testimonial-card">
      <div className="testimonial-header">
        <div className="testimonial-avatar">{avatar}</div>
        <div>
          <div className="testimonial-name">{name}</div>
          <div className="testimonial-role">
            {role} • {company}
          </div>
        </div>
      </div>
      <div className="testimonial-stars">{renderStars()}</div>
      <p className="testimonial-text">{renderContent()}</p>
    </div>
  );
};

export default TestimonialCard;
