import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { JsonLd, breadcrumb } from "@/components/seo";

export const metadata: Metadata = {
  title: "Practical AI Mentorship with Varnika | Veelogg",
  description: "Learn AI through your own creative and business work, from better briefs and visuals to repeatable workflows and useful tools.",
  alternates: { canonical: "https://www.veelogg.com/mentorship" },
  openGraph: { title: "Practical AI Mentorship with Varnika | Veelogg", description: "Learn AI through your own creative and business work.", url: "https://www.veelogg.com/mentorship", type: "website" },
};

const WORK_ON = [
  "Choosing a useful first problem and the tools that fit it.",
  "Giving AI the context and references it needs.",
  "Directing and reviewing creative output.",
  "Building repeatable workflows around your own work.",
  "Understanding how to change the setup when your needs change.",
];

export default function MentorshipPage() {
  return <><SiteHeader /><main id="main">
    <section className="page-hero wrap"><div className="narrow">
      <h1>bring the work. we’ll figure out the ai.</h1>
      <p className="page-lede">For founders and the people running marketing or client delivery. Learn through a real product demo, launch brief, client campaign or recurring workflow, using the context and tools your work needs.</p>
      <p className="cs-body">We work through the choices together so you understand the setup and can keep using it yourself.</p>
      <a className="button button-brown" href="/contact?help=mentorship">tell me what you want to learn <ArrowUpRight size={20} /></a>
    </div></section>

    <section className="page-section band wrap"><div className="narrow">
      <h2 className="section-title">what we work on</h2>
      <ul className="def-list">{WORK_ON.map((w) => <li key={w}>{w}</li>)}</ul>
    </div></section>

    <section className="page-section wrap"><div className="narrow">
      <h2 className="section-title">how it works</h2>
      <p className="cs-body">We agree on the learning goals, session schedule and support before starting. Bring your questions, source material and current process. You’ll use the setup between sessions and bring back what needs attention.</p>
      <a className="button button-brown" href="/contact?help=mentorship">explore mentorship with me <ArrowUpRight size={19} /></a>
    </div></section>
    <JsonLd data={breadcrumb([["Home", "/"], ["Work with me", "/work-with-me"], ["AI mentorship", "/mentorship"]])} />
  </main><SiteFooter /></>;
}
