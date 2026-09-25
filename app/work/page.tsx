import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { JsonLd, breadcrumb } from "@/components/seo";
import { WORK_CASES, CASE_HEADINGS } from "@/lib/work";

const collectionLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Selected Work",
  url: "https://www.veelogg.com/work",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: WORK_CASES.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.title, url: "https://www.veelogg.com/work#" + c.slug })),
  },
};

export const metadata: Metadata = {
  title: "Selected Work | Veelogg",
  description: "Explore Veelogg's creative work, AI systems, websites and apps, with the decisions and processes behind each project.",
  alternates: { canonical: "https://www.veelogg.com/work" },
  openGraph: { title: "Selected Work | Veelogg", description: "Creative work, AI systems, websites and apps, with the decisions behind each project.", url: "https://www.veelogg.com/work", type: "website" },
};

export default function WorkPage() {
  return <><SiteHeader /><main id="main">
    <section className="page-hero wrap"><div className="narrow">
      <h1>here’s what that looks like.</h1>
      <p className="page-lede">Product storytelling, client content workflows, creative work and useful AI tools. Open a project to see what needed doing, the decisions I made and what came out of it.</p>
    </div></section>

    {WORK_CASES.map((c, i) => (
      <section key={c.slug} id={c.slug} className={"page-section wrap" + (i % 2 === 0 ? " band" : "")}>
        <div className="narrow scroll-mt">
          <div className="work-tags">
            <span className="work-label">{c.label}</span>
            <span className="work-cat">{c.category}</span>
            {c.illustrative && <span className="work-placeholder">illustrative example</span>}
          </div>
          <h2 className="section-title">{c.title}</h2>
          <p className="case-hook">{c.hook}</p>

          <div className="case-parts">
            {CASE_HEADINGS.map((h) => (
              <div className="case-part" key={h.key}>
                <p className="case-part-label">{h.label}</p>
                <p className="case-part-body">{c.sections[h.key]}</p>
              </div>
            ))}
            <div className="case-part">
              <p className="case-part-label">a visible demonstration</p>
              {c.demo.href
                ? <a className="inline-link" href={c.demo.href} target="_blank" rel="noreferrer">{c.demo.label} &rarr;</a>
                : <p className="case-part-body muted">{c.demo.label}, link to be added</p>}
            </div>
          </div>

          <p className="case-close">{c.close}</p>
          <div className="case-cta"><p>have something similar in mind?</p><a className="button button-brown" href="/contact">start a project <ArrowUpRight size={19} /></a></div>
        </div>
      </section>
    ))}
    <JsonLd data={collectionLd} />
    <JsonLd data={breadcrumb([["Home", "/"], ["Work", "/work"]])} />
  </main><SiteFooter /></>;
}
