export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://hiresort.ai';

export type BreadcrumbCrumb = {
  /** Display name of the crumb. */
  name: string;
  /** Absolute or root-relative path. If omitted, the crumb is rendered as the current page (no `item`). */
  path?: string;
};

/**
 * Returns a JSON-LD `BreadcrumbList` object ready to be serialized into a
 * `<script type="application/ld+json">` tag. Google uses this to show breadcrumb
 * trails in search results. The home crumb is always prepended automatically.
 */
export const breadcrumbJsonLd = (crumbs: BreadcrumbCrumb[]) => {
  const all: BreadcrumbCrumb[] = [{ name: 'Home', path: '/' }, ...crumbs];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      ...(c.path ? { item: `${SITE_URL}${c.path}` } : {}),
    })),
  };
};

/**
 * Serializes a JSON-LD object into a string suitable for
 * `<script type="application/ld+json" dangerouslySetInnerHTML={...} />`.
 */
export const jsonLdString = (obj: unknown) => JSON.stringify(obj);
