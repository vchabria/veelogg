import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { JsonLd, breadcrumb } from "@/components/seo";
import { GuideLibrary } from "@/components/guide-library";

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

    <section className="page-section wrap">
      <GuideLibrary />
    </section>

    <JsonLd data={breadcrumb([["Home", "/"], ["Free guides", "/guides"]])} />
  </main><SiteFooter /></>;
}
