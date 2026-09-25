import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { JsonLd, breadcrumb } from "@/components/seo";

export const metadata: Metadata = {
  title: "Work with Veelogg | AI for Founders & Teams",
  description: "AI systems, product storytelling, agency content workflows, digital builds and mentorship for founders and the teams working with them.",
  alternates: { canonical: "https://www.veelogg.com/work-with-me" },
  openGraph: { title: "Work with Veelogg | AI for Founders & Teams", description: "AI systems, product storytelling, agency content workflows, digital builds and mentorship.", url: "https://www.veelogg.com/work-with-me", type: "website" },
};

const BLOCKS = [
  { title: "Brand & marketing systems", body: ["We work through who you’re trying to reach, what they need to understand and how the work should run. Then we build the AI setup around the agreed direction. That can include brand context, research, content production, review, publishing preparation, lead follow-up and reporting, with clear responsibilities at each step.", "For a complete marketing workflow and team handoff, explore the 90-day engagement. Focused automations are scoped around one specific problem."], cta: "explore ai systems", href: "/ai-systems", id: "systems" },
  { title: "Creative direction & production", body: ["We shape how your business looks, sounds and shows up. Brand voice, campaign concepts, photography direction, AI imagery, video editing and content production, with a clear purpose for each piece."], cta: "explore creative production", href: "/content-done", id: "creative" },
  { title: "Websites, apps & custom tools", body: ["We work out what people need to do, then build the experience around it. A product website, agency site, customer-facing app or internal tool can be part of the wider system or its own project."], cta: "explore digital builds", href: "/builds", id: "builds" },
  { title: "AI mentorship", body: ["Bring the tasks and ideas you want to work through. Learn how to brief AI, choose tools, judge the output and build a setup you can use yourself."], cta: "explore mentorship", href: "/mentorship", id: "mentorship" },
  { title: "Want me to stay involved?", body: ["Ongoing support can include creative direction, agreed content production, workflow coordination and system maintenance. We decide who owns planning, making, approval and publishing before the work starts."], cta: "talk about ongoing support", href: "/contact?help=ongoing", id: "ongoing" },
];

export default function WorkWithMePage() {
  return <><SiteHeader /><main id="main">
    <section className="page-hero wrap"><div className="narrow">
      <h1>let’s build around the work you actually do.</h1>
      <p className="page-lede">For SaaS and product teams, we can build the system behind your demos, launches and ongoing marketing. For agencies, we can build the system behind your briefs, creative production and client delivery. Start with the workflow that still needs too much of the founder.</p>
    </div></section>

    {BLOCKS.map((b, i) => (
      <section key={b.id} id={b.id} className={"page-section wrap" + (i % 2 === 0 ? " band" : "")}><div className="narrow">
        <h2 className="section-title">{b.title}</h2>
        {b.body.map((p, j) => <p key={j} className="cs-body">{p}</p>)}
        <a className="button button-outline" href={b.href}>{b.cta} <ArrowUpRight size={19} /></a>
      </div></section>
    ))}
    <JsonLd data={breadcrumb([["Home", "/"], ["Work with me", "/work-with-me"]])} />
  </main><SiteFooter /></>;
}
