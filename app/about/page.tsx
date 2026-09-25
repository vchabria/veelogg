import type { Metadata } from "next";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { JsonLd, breadcrumb } from "@/components/seo";
import { SUBSTACK_URL } from "@/lib/content";

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Varnika Chabria",
  jobTitle: "Brand & Marketing Engineer and Strategist",
  url: "https://www.veelogg.com/about",
  worksFor: { "@type": "Organization", name: "Veelogg", url: "https://www.veelogg.com" },
  knowsAbout: ["brand strategy", "marketing strategy", "AI systems", "creative direction", "photography", "video editing", "product marketing", "content operations"],
  sameAs: ["https://www.instagram.com/veelogg_/", "https://www.linkedin.com/company/veelogg", "https://itismevarnica.substack.com"],
};

export const metadata: Metadata = {
  title: "Varnika Chabria, Brand & Marketing Engineer | Veelogg",
  description: "Meet Varnika, Brand & Marketing Engineer and Strategist, connecting brand decisions, creative direction and practical AI systems.",
  alternates: { canonical: "https://www.veelogg.com/about" },
  openGraph: { title: "Varnika Chabria, Brand & Marketing Engineer | Veelogg", description: "Brand decisions, creative direction and practical AI systems.", url: "https://www.veelogg.com/about", type: "website" },
};

export default function AboutPage() {
  return <><SiteHeader /><main id="main">
    <section className="page-hero wrap about-hero">
      <div className="about-hero-copy">
        <h1>i like knowing why.</h1>
        <p className="page-lede">Why a photograph holds your attention. Why a cut feels right. Why someone chooses one business over another. Why a team keeps doing a task the long way.</p>
      </div>
      <figure className="photo-card about-portrait"><img src="/assets/varnika-portrait.jpg" alt="Varnika Chabria" width="420" height="500" /><figcaption>varnika chabria</figcaption></figure>
    </section>

    <section className="page-section band wrap"><div className="narrow">
      <p className="cs-body">I’m Varnika, the Brand &amp; Marketing Engineer and Strategist behind Veelogg. I connect strategic decisions with AI, editing, visual storytelling and the systems that carry marketing work forward. My interests in people, business, art, psychology and design shape how I approach all of it.</p>
      <p className="cs-body">I want to understand the decisions behind a business. What its founder notices. What its customers care about. What its people have learned through doing the work. That knowledge gives us something specific to build from.</p>
      <p className="cs-body">I focus on SaaS and product companies, and agencies where the founder still carries a lot of the product knowledge, creative direction or client context. We work on making that knowledge useful to the people doing the next piece of work.</p>
      <p className="cs-body">Sometimes the result is an AI assistant with the right context. Sometimes it’s a campaign, a sharper edit, a website or an app. Often, it’s a connected setup that helps a team make and run the work with more confidence.</p>
      <p className="cs-body">I care about what happens after the project is delivered: whether people understand it, use it and know what to do next.</p>
    </div></section>

    <section className="page-section wrap"><div className="narrow">
      <h2 className="section-title">here’s how i see it</h2>
      <p className="cs-body">I share the decisions behind the work: the reference, the correction, the tool choice, the part that needed another look.</p>
      <div className="link-row">
        <a className="text-link" href="/work">see the work <ArrowRight size={17} /></a>
        <a className="text-link" href="https://instagram.com/veelogg_" target="_blank" rel="noreferrer">find me on Instagram <ArrowUpRight size={16} /></a>
      </div>
    </div></section>

    <section className="page-section band wrap"><div className="narrow">
      <h2 className="section-title">and away from the project brief</h2>
      <p className="cs-body">I write about people, taste, ambition and the lives we’re trying to make. You can read that on Substack.</p>
      <a className="button button-outline" href={SUBSTACK_URL} target="_blank" rel="noreferrer">read my writing <ArrowUpRight size={19} /></a>
    </div></section>

    <section className="page-section final-section wrap"><div className="narrow">
      <h2 className="final-title">have a business I should get to know?</h2>
      <a className="button button-brown" href="/contact">tell me about it <ArrowUpRight size={21} /></a>
    </div></section>
    <JsonLd data={personLd} />
    <JsonLd data={breadcrumb([["Home", "/"], ["About", "/about"]])} />
  </main><SiteFooter /></>;
}
