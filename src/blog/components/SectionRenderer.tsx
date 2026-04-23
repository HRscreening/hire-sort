import React from 'react';
import { BlogSection } from '@/types/blog';

export const BlogHeading: React.FC<{ level: number; content: string }> = ({ level, content }) => {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  return <Tag className={`blog-h${level}`}>{content}</Tag>;
};

export const BlogParagraph: React.FC<{ content: string }> = ({ content }) => (
  <p className="blog-paragraph">{content}</p>
);

export const BlogNumberedSection: React.FC<{ title: string; content: string[] }> = ({ title, content }) => (
  <section className="blog-numbered-section">
    <h3 className="blog-numbered-title">{title}</h3>
    <ol className="blog-ol">
      {content.map((item, i) => (
        <li key={i} className="blog-li">{item}</li>
      ))}
    </ol>
  </section>
);

export const BlogCTA: React.FC<{ title: string; description: string; actionText: string }> = ({ title, description, actionText }) => (
  <div className="blog-cta-box">
    <h3 className="blog-cta-title">{title}</h3>
    <p className="blog-cta-desc">{description}</p>
    <button className="blog-cta-button">{actionText}</button>
  </div>
);

export const SectionRenderer: React.FC<{ section: BlogSection }> = ({ section }) => {
  switch (section.type) {
    case 'heading':
      return <BlogHeading level={section.level} content={section.content} />;
    case 'paragraph':
      return <BlogParagraph content={section.content} />;
    case 'numbered_section':
      return <BlogNumberedSection title={section.title} content={section.content} />;
    case 'cta':
      return <BlogCTA title={section.title} description={section.description} actionText={section.actionText} />;
    default:
      return null;
  }
};
