import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = 'image/png';

type OGCardProps = {
  /** Top-right uppercase chip (e.g. "Compare", "Product", "Best") */
  eyebrow: string;
  /** Main headline */
  title: string;
  /** Optional smaller line under the title */
  subtitle?: string;
  /** Bottom-left small label (author name, role, etc.). Falls back to "HireSort". */
  byline?: string;
};

/**
 * Render a branded 1200×630 PNG for use in an `opengraph-image.tsx` file.
 * Uses system fonts (no network fetch) so build time stays low.
 */
export const renderOGCard = ({
  eyebrow,
  title,
  subtitle,
  byline,
}: OGCardProps) => {
  const titleFontSize = title.length > 70 ? 52 : title.length > 50 ? 60 : 68;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background:
            'linear-gradient(135deg, #FBF6EE 0%, #F4EBDC 50%, #EADFC9 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: '#C85A17',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 800,
              fontSize: 22,
              letterSpacing: -0.5,
            }}
          >
            H
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: '#1F1A14' }}>
            HireSort
          </div>
          <div
            style={{
              marginLeft: 'auto',
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: '#C85A17',
              background: 'rgba(200, 90, 23, 0.1)',
              padding: '8px 14px',
              borderRadius: 999,
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            marginRight: 60,
          }}
        >
          <div
            style={{
              fontSize: titleFontSize,
              fontWeight: 800,
              color: '#1F1A14',
              lineHeight: 1.1,
              letterSpacing: -1.6,
              display: 'flex',
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: 24,
                color: '#5B4F40',
                lineHeight: 1.4,
                display: 'flex',
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 22,
            color: '#5B4F40',
          }}
        >
          <span style={{ fontWeight: 600 }}>{byline ?? 'HireSort'}</span>
          <span style={{ fontWeight: 600, color: '#C85A17' }}>hiresort.ai</span>
        </div>
      </div>
    ),
    OG_SIZE,
  );
};
