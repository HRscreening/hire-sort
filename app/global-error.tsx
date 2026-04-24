'use client';

import { useEffect } from 'react';

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
          background: '#f5f3ee',
          color: '#2c2c2c',
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 24px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 520 }}>
          <div
            style={{
              display: 'inline-block',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              color: '#c85a17',
            }}
          >
            Something went wrong
          </div>
          <h1
            style={{
              margin: '12px 0 16px',
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 800,
              letterSpacing: '-1.2px',
              lineHeight: 1.15,
            }}
          >
            The app hit an unexpected error.
          </h1>
          <p style={{ marginBottom: 24, color: '#7a7a7a', lineHeight: 1.65 }}>
            Try refreshing the page. If the problem persists, please let us know.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px 24px',
              borderRadius: 8,
              border: '1px solid #1a1a1a',
              background: '#1a1a1a',
              color: '#fff',
              fontSize: 14.5,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
