/**
 * JsonLd Component
 *
 * Renders JSON-LD structured data as a <script type="application/ld+json"> tag.
 * This is the recommended way to add structured data for search engines.
 *
 * Usage:
 * ```tsx
 * <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Article', ... }} />
 * ```
 *
 * Key notes:
 * - Uses dangerouslySetInnerHTML because Next.js/React don't have a native
 *   way to render JSON-LD script tags. This is the standard approach recommended
 *   by Next.js documentation and the Schema.org community.
 * - The `key` prop should be set when multiple JsonLd components are rendered
 *   in the same parent to ensure React properly handles them.
 * - Multiple JsonLd components can be rendered on a single page — Google
 *   supports multiple JSON-LD blocks and will merge them.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
