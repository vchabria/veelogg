/* JSON-LD helpers for SEO / AEO / GEO.
   JsonLd renders a structured-data script; breadcrumb() builds a
   BreadcrumbList so search + generative engines understand site structure. */

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function breadcrumb(items: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: "https://www.veelogg.com" + path,
    })),
  };
}
