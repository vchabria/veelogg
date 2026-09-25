import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { JsonLd, breadcrumb } from "@/components/seo";

export const metadata: Metadata = {
  title: "Product Websites, Apps & AI Tools | Veelogg",
  description: "Product and agency websites, apps and internal tools built around your customer journey, marketing or client-delivery workflow.",
  alternates: { canonical: "https://www.veelogg.com/builds" },
  openGraph: { title: "Product Websites, Apps & AI Tools | Veelogg", description: "Websites, apps and internal tools built around your marketing or delivery workflow.", url: "https://www.veelogg.com/builds", type: "website" },
};

const BLOCKS = [
  ["Product & agency websites", "Structure, copy, visual direction and the steps people take from arriving to understanding the offer, requesting a demo or inquiring. We build around the actual product or service journey. Shopify builds remain available when a storefront is part of the project."],
  ["Apps & digital products", "We define the first useful version, map the main user flow and build the features it needs. The scope includes how it will be tested, handed over and supported."],
  ["Custom AI & internal tools", "Assistants, dashboards and automations built around a specific process. We work through the information, integrations and decisions each tool needs to handle."],
];

export default function BuildsPage() {
  return <><SiteHeader /><main id="main">
    <section className="page-hero wrap"><div className="narrow">
      <h1>build something people can actually use.</h1>
      <p className="page-lede">A product website that explains what people can do. An agency site that makes the offer clear. An app that gives an idea a working form. An internal tool that moves briefs, assets or approvals forward.</p>
      <p className="cs-body">I connect the experience, the visuals and the AI or automation behind it.</p>
      <a className="button button-brown" href="/contact?help=build">tell me what needs building <ArrowUpRight size={20} /></a>
    </div></section>

    <section className="page-section band wrap"><div className="narrow">
      {BLOCKS.map(([t, b]) => <div className="mini-block" key={t}><h3>{t}</h3><p>{b}</p></div>)}
    </div></section>

    <section className="page-section wrap"><div className="narrow">
      <h2 className="section-title">the first conversation</h2>
      <p className="cs-body">What should someone be able to do? How does that happen today? What would make the first version useful?</p>
      <p className="cs-body">Bring a rough idea or an existing setup. We’ll work out the next thing worth building.</p>
      <a className="button button-brown" href="/contact?help=build">start a build <ArrowUpRight size={19} /></a>
    </div></section>
    <JsonLd data={breadcrumb([["Home", "/"], ["Work with me", "/work-with-me"], ["Websites, apps & tools", "/builds"]])} />
  </main><SiteFooter /></>;
}
