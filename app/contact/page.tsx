import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { InquiryForm } from "@/components/inquiry-form";
import { CalendlyEmbed } from "@/components/calendly-embed";
import { JsonLd, breadcrumb } from "@/components/seo";
import { CONTACT_EMAIL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Book a Call | Veelogg",
  description: "Book a free 25-minute call with Varnika, or write to her about the work you want to get off your plate.",
  alternates: { canonical: "https://www.veelogg.com/contact" },
  openGraph: { title: "Book a Call | Veelogg", description: "Book a free 25-minute call with Varnika, or send a written note.", url: "https://www.veelogg.com/contact", type: "website" },
};

export default function ContactPage() {
  return <><SiteHeader /><main id="main">
    <section className="page-hero wrap">
      <div className="narrow">
        <h1>let’s find 25 minutes.</h1>
        <p className="page-lede">A short call, no deck: tell me what you’re building and the work that keeps landing back on your desk, and I’ll tell you honestly whether I can help. Prefer to write? There’s a form below.</p>
      </div>
    </section>

    {/* embedded calendar */}
    <section className="page-section wrap" id="book">
      <div className="narrow">
        <h2 className="section-title">book a call</h2>
        <CalendlyEmbed />
      </div>
    </section>

    {/* written path */}
    <section className="page-section band wrap" id="form">
      <div className="narrow">
        <h2 className="section-title">prefer to write?</h2>
        <p className="cs-body">Tell me about the business, what you want to make, and what still needs too much of the founder. I read these myself.</p>
        <InquiryForm />
        <p className="cs-note">Or email me at <a className="inline-link" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
      </div>
    </section>

    <JsonLd data={breadcrumb([["Home", "/"], ["Book a call", "/contact"]])} />
  </main><SiteFooter /></>;
}
