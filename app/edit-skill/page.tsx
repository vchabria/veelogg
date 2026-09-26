import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { SkillOptin } from "@/components/skill-optin";
import { JsonLd, breadcrumb } from "@/components/seo";

export const metadata: Metadata = {
  title: "The Edit Skill, Free | Veelogg",
  description: "The edit skill Varnika uses on client work, updated and free, with a short walkthrough video. Install it in Claude and run your next edit through it.",
  alternates: { canonical: "https://www.veelogg.com/edit-skill" },
  openGraph: { title: "The Edit Skill, Free | Veelogg", description: "The edit skill I use on client work, updated and yours, with a walkthrough.", url: "https://www.veelogg.com/edit-skill", type: "website" },
};

export default function EditSkillPage() {
  return <><SiteHeader /><main id="main">
    <section className="page-hero wrap">
      <div className="narrow">
        <p className="home-eyebrow">free skill + walkthrough · for founders who send the edit back with the same note every time</p>
        <h1>the edit skill, free</h1>
        <p className="page-lede">The edit skill I use on client work. Updated, and now yours.</p>
        <p className="cs-body">It takes the notes you always give (the opening, the pace, the caption that loses the point) and applies them before you ever see the cut. Install it in Claude, run your next edit through it, and see how much of the review it takes off your plate.</p>
        <p className="cs-body">Comes with a five-minute video where I run a real edit through it and show what changed in this version.</p>
        <SkillOptin />
      </div>
    </section>

    <section className="page-section band wrap">
      <div className="narrow">
        <h2 className="section-title">the walkthrough</h2>
        <div className="skill-video-placeholder">walkthrough video, add the YouTube/unlisted link</div>
      </div>
    </section>

    <JsonLd data={breadcrumb([["Home", "/"], ["The edit skill", "/edit-skill"]])} />
  </main><SiteFooter /></>;
}
