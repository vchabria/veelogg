import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { JsonLd, breadcrumb } from "@/components/seo";

export const metadata: Metadata = {
  title: "Product Content & Creative Direction | Veelogg",
  description: "Product demos, launch assets, founder content and agency campaigns, with brand voice, visual direction, AI imagery and video editing.",
  alternates: { canonical: "https://www.veelogg.com/content-done" },
  openGraph: { title: "Product Content & Creative Direction | Veelogg", description: "Brand voice, visual direction, AI imagery and editing for product and agency marketing.", url: "https://www.veelogg.com/content-done", type: "website" },
};

const STEPS = [
  ["Find the voice", "We listen to how you explain the business, what your customers ask and which details make your point of view yours. Then we turn that into messages, examples and a direction people can write from."],
  ["Shape the visual world", "References, lighting, framing, styling, color and composition. We make the choices that give your photography, AI visuals and campaign assets a shared identity."],
  ["Make the work", "Scripts, edits, AI imagery, graphics and content formats, with the opening, story, sound and captions considered together. We choose the assets and formats around the agreed brief."],
  ["Put it to work", "Each piece gets a job: explain the offer, answer a question, demonstrate the product or help someone take the next step. We decide the channel and review the available response."],
];

const WAYS = [
  ["Creative direction", "voice, campaign concepts, visual references and production guidance."],
  ["Content production", "an agreed batch of assets using the available material and approved direction."],
  ["Ongoing creative support", "recurring planning, production and review, with responsibilities defined together."],
];

export default function ContentDonePage() {
  return <><SiteHeader /><main id="main">
    <section className="page-hero wrap">
      <p className="home-eyebrow">creative direction · ai imagery · editing · marketing content</p>
      <h1>give your brand a world people recognize.</h1>
      <p className="page-lede">The voice, the images, the pacing, the recurring ideas. For product companies, that can mean demos, founder content and launch campaigns. For agencies, it can mean creative direction and production for a defined client brief.</p>
      <a className="button button-brown" href="/contact?help=creative">tell me what you’re making <ArrowUpRight size={20} /></a>
    </section>

    <section className="page-section band wrap"><div className="narrow">
      {STEPS.map(([t, b]) => <div className="mini-block" key={t}><h3>{t}</h3><p>{b}</p></div>)}
    </div></section>

    <section className="page-section wrap"><div className="narrow">
      <h2 className="section-title">ways to work together</h2>
      <ul className="def-list">{WAYS.map(([t, b]) => <li key={t}><strong>{t}:</strong> {b}</li>)}</ul>
      <a className="button button-brown" href="/contact?help=creative">talk about your content <ArrowUpRight size={19} /></a>
    </div></section>
    <JsonLd data={breadcrumb([["Home", "/"], ["Work with me", "/work-with-me"], ["Creative production", "/content-done"]])} />
  </main><SiteFooter /></>;
}
