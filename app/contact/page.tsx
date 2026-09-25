import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { InquiryForm } from "@/components/inquiry-form";
import { JsonLd, breadcrumb } from "@/components/seo";
import { CONTACT_EMAIL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Start a Project | Veelogg",
  description: "Tell Varnika about your business, what you want to make and the work you would like to get off your plate.",
  alternates: { canonical: "https://www.veelogg.com/contact" },
  openGraph: { title: "Start a Project | Veelogg", description: "Tell Varnika about your business and the work you'd like to get off your plate.", url: "https://www.veelogg.com/contact", type: "website" },
};

export default function ContactPage() {
  return <><SiteHeader /><main id="main">
    <section className="page-hero wrap">
      <div className="narrow">
        <h1>what are you still carrying?</h1>
        <p className="page-lede">Tell me about your business, what you want to make and what keeps landing back on your desk. I’ll read it and get back to you about the next step.</p>
      </div>
    </section>
    <section className="page-section wrap" id="form">
      <div className="narrow">
        <InquiryForm />
        <p className="cs-note">Prefer email? Reach me at <a className="inline-link" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
      </div>
    </section>
    <JsonLd data={breadcrumb([["Home", "/"], ["Start a project", "/contact"]])} />
  </main><SiteFooter /></>;
}
