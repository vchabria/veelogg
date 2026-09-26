import type { Metadata } from "next";
import { ArrowUpRight, Download } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { JsonLd, breadcrumb } from "@/components/seo";
import { GuideArticle } from "@/components/guide-article";
import { guides } from "@/lib/guides";
import { guideBody } from "@/lib/guides-content";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return {};
  const url = "https://www.veelogg.com/guides/" + slug;
  return {
    title: `${guide.fullTitle} | Veelogg`,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: { title: `${guide.fullTitle} | Veelogg`, description: guide.description, url, type: "article" },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  const content = guideBody(slug);
  if (!guide || !content) {
    return <><SiteHeader /><main id="main">
      <section className="page-hero wrap"><div className="narrow">
        <h1>guide not found.</h1>
        <p className="page-lede">That guide is not here. Browse the whole collection instead.</p>
        <a className="button button-brown" href="/guides">all free guides <ArrowUpRight size={19} /></a>
      </div></section>
    </main><SiteFooter /></>;
  }

  const url = "https://www.veelogg.com/guides/" + slug;
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.fullTitle,
    description: guide.description,
    datePublished: guide.date,
    author: { "@type": "Person", name: "Varnika Chabria" },
    publisher: {
      "@type": "Organization",
      name: "Veelogg",
      logo: { "@type": "ImageObject", url: "https://www.veelogg.com/assets/veelogg-logo.svg" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return <><SiteHeader /><main id="main">
    <section className="page-hero wrap"><div className="narrow">
      <p className="guide-tags"><span className="guide-tag">{guide.category}</span><span className="guide-tag">free guide</span></p>
      <h1>{guide.fullTitle}</h1>
      <p className="page-lede">{content.excerpt || guide.description}</p>
    </div></section>

    <section className="page-section wrap"><div className="narrow">
      <GuideArticle body={content.body} />

      {content.downloads && content.downloads.length > 0 && (
        <div className="guide-downloads">
          <h2 className="section-title">grab the files</h2>
          <p className="guide-downloads-intro">Free to download, no email needed.</p>
          <div className="guide-downloads-grid">
            {content.downloads.map((dl) => (
              <a key={dl.href} className="guide-dl" href={dl.href} download>
                <div className="guide-dl-top">
                  <span className="guide-dl-label">{dl.label}{dl.badge && <span className="guide-dl-badge">{dl.badge}</span>}</span>
                  <Download size={19} />
                </div>
                <span className="guide-dl-desc">{dl.description}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      <p className="guide-freenote">Every guide here is free. Take it, use it, make it yours.</p>

      <div className="guide-cta">
        <h2>want a system built for you?</h2>
        <p>I design and build brand and marketing systems, custom, done for you, yours to keep.</p>
        <a className="button button-brown" href="/work-with-me">see how i work <ArrowUpRight size={19} /></a>
      </div>
    </div></section>

    <JsonLd data={articleLd} />
    <JsonLd data={breadcrumb([["Home", "/"], ["Free guides", "/guides"], [guide.fullTitle, "/guides/" + slug]])} />
  </main><SiteFooter /></>;
}
