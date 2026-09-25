import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { BrandBriefForm } from "@/components/brand-brief-form";
import { JsonLd, breadcrumb } from "@/components/seo";

export const metadata: Metadata = {
  title: "Brand Collaborations | Veelogg",
  description: "Paid product demonstrations, creative campaigns, tutorials and relevant brand partnerships, made with AI and creative tools.",
  alternates: { canonical: "https://www.veelogg.com/partnerships" },
  openGraph: { title: "Brand Collaborations | Veelogg", description: "Paid product demonstrations, creative campaigns and brand partnerships.", url: "https://www.veelogg.com/partnerships", type: "website" },
};

/* Samples are labelled placeholders. Replace with real, accurately-labelled
   samples and current dated audience metrics before launch. A sample is not
   proof of a paid partnership. */
const SAMPLES = [
  "[ placeholder, product demo sample, add your role + dated metrics ]",
  "[ placeholder, creative campaign sample, add your role + dated metrics ]",
  "[ placeholder, tutorial or partnership sample, add your role + dated metrics ]",
];

export default function PartnershipsPage() {
  return <><SiteHeader /><main id="main">
    <section className="page-hero wrap"><div className="narrow">
      <h1>show people what your product makes possible.</h1>
      <p className="page-lede">I work with AI and creative tools, then make content about what they help me do: the result, the process and the decisions along the way.</p>
      <p className="cs-body">I’m available for paid product demonstrations, creative campaigns, tutorials and relevant brand partnerships.</p>
      <a className="button button-brown" href="#brief">send a collaboration brief <ArrowUpRight size={20} /></a>
    </div></section>

    <section className="page-section band wrap"><div className="narrow">
      <h2 className="section-title">a few samples</h2>
      <p className="cs-note">Accurately-labelled samples, not claims of a paid partnership. Scope, usage and exclusivity are agreed separately.</p>
      <ul className="def-list">{SAMPLES.map((s, i) => <li key={i}>{s}</li>)}</ul>
    </div></section>

    <section className="page-section wrap"><div className="narrow">
      <h2 className="section-title">what we agree separately</h2>
      <p className="cs-body">Production, publication to my audience, paid-ad usage, duration, exclusivity and additional versions.</p>
    </div></section>

    <section id="brief" className="page-section band wrap"><div className="narrow">
      <h2 className="section-title">send a collaboration brief</h2>
      <p className="cs-body">Tell me about the product and what you want it to do. I’ll review the fit and reply about usage, scope and a quote.</p>
      <BrandBriefForm />
    </div></section>
    <JsonLd data={breadcrumb([["Home", "/"], ["Brand collaborations", "/partnerships"]])} />
  </main><SiteFooter /></>;
}
