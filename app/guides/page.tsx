import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { ArrowUpRight } from "lucide-react";
import { JsonLd, breadcrumb } from "@/components/seo";
import { GuideLibrary } from "@/components/guide-library";
import { MAGNET_URL } from "@/lib/funnel";

export const metadata: Metadata = {
  title: "Free AI & Content Guides | Veelogg",
  description: "Practical prompts, checklists and workflows for brand voice, content and AI systems. Free, no email required.",
  alternates: { canonical: "https://www.veelogg.com/guides" },
  openGraph: {
    title: "Free AI & Content Guides | Veelogg",
    description: "Practical prompts, checklists and workflows for brand voice, content and AI systems. Free, no email required.",
    url: "https://www.veelogg.com/guides",
    type: "website",
  },
};

export default function GuidesPage() {
  return <><SiteHeader /><main id="main">
    <section className="page-hero wrap"><div className="narrow">
      <h1>free guides.</h1>
      <p className="page-lede">Practical prompts, checklists and workflows, no email required.</p>
    </div></section>

    <section className="page-section wrap"><div className="narrow">
      <a className="magnet-card plausible-event-name=guide_click" href={MAGNET_URL}>
        <div>
          <span className="magnet-tag">free skill + walkthrough</span>
          <h2>the edit skill + walkthrough</h2>
          <p>The edit skill I use on client work, updated, plus a short video where I run a real edit through it. Install it in Claude and see how much of the review it takes off your plate.</p>
        </div>
        <span className="button button-brown">get the skill <ArrowUpRight size={19} /></span>
      </a>
    </div></section>

    <section className="page-section wrap">
      <GuideLibrary />
    </section>

    <JsonLd data={breadcrumb([["Home", "/"], ["Free guides", "/guides"]])} />
  </main><SiteFooter /></>;
}
