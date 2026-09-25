/* --- selected work / case studies, written as sales stories ---
   Honesty rules from the brief: no invented client names, no fabricated
   testimonials, no made-up verified metrics. Cases 1 and 2 are clearly
   labelled ILLUSTRATIVE examples (realistic scenarios, not a named client).
   Case 3 is a REAL personal product. When a real named engagement exists,
   swap in the specifics, set illustrative:false, add measured outcomes only
   once verified, and add a demo link. */

export type WorkLabel = "SaaS / product" | "agency" | "personal project" | "studio demonstration";

export interface WorkCase {
  slug: string;
  title: string;
  hook: string;          // the stakes, one line, sets the story
  label: WorkLabel;
  illustrative: boolean; // true = an example scenario, not a named client
  category: string;      // "ai systems" | "visuals & editing" | "websites & apps"
  summary: string;       // used on the homepage teaser
  sections: {
    needed: string;
    learned: string;
    decisions: string;
    made: string;
    runs: string;
    next: string;
  };
  close: string;         // benefit-led line before the CTA
  demo: { label: string; href: string | null };
}

export const WORK_CASES: WorkCase[] = [
  {
    slug: "product-marketing-system",
    title: "a seed-stage SaaS founder stops rewriting every launch",
    hook: "Every launch waited on one person. She was the only one who could explain what the product actually did, so nothing shipped without her at the keyboard.",
    label: "SaaS / product",
    illustrative: true,
    category: "ai systems",
    summary: "Turning a founder’s product knowledge into a launch workflow the team can run without her.",
    sections: {
      needed: "Feature announcements, demo scripts, launch emails, all of it ran through the founder. Marketing went quiet between releases, and the team sat waiting for words only she could write.",
      learned: "So we started with why customers actually bought: one job the product did faster than the spreadsheet they had before. We captured the three questions every trial user asked, and the exact phrasing that made it click on her sales calls.",
      decisions: "The marketing would lead with that one job, not the feature list. Every release would answer a real customer question. And the founder’s role would shrink from writing to approving, minutes instead of afternoons.",
      made: "A company knowledge base of approved facts and customer language. A reusable “release to launch kit” AI skill that drafts the brief, demo script, email and three posts. And a short review checklist she signs off fast.",
      runs: "A release note goes in. The skill drafts the whole kit against the approved context. She checks the claims and the voice. The team schedules it, and anything unapproved routes back instead of shipping.",
      next: "This is an illustrative example of the engagement, not a named client. On a real project we set the quality standard up front and measure revision rounds and launch turnaround against it. No numbers appear here until they are verified.",
    },
    close: "If your marketing still runs on the founder’s memory, this is the first thing we take off your plate.",
    demo: { label: "see the launch-kit workflow", href: null },
  },
  {
    slug: "agency-delivery-system",
    title: "a content agency makes one client’s briefs repeatable",
    hook: "The work was good. It just could not happen without the founder in the room, re-briefing every piece and re-doing every final review.",
    label: "agency",
    illustrative: true,
    category: "ai systems",
    summary: "Turning a founder’s creative standards into briefs and reviews the team can run per client.",
    sections: {
      needed: "Drafts kept missing the client’s voice and the approved claims, so the founder became the bottleneck: every brief, every review, every time.",
      learned: "We worked through one representative client, the way you’d actually learn them: their voice in three approved posts, the two mistakes that always got flagged, where the real reference material lived, and who could approve a claim when she was out.",
      decisions: "We separated the client’s approved context from the agency’s own. We turned her repeated notes into explicit review criteria. And we named an owner for every step from brief to delivery.",
      made: "A per-client brand context and brief template. An AI skill that drafts to that client’s voice. A review checklist built from her real notes. And a handoff map so the work moves without her.",
      runs: "A request becomes a filled brief. The skill drafts to the client’s voice. An account lead reviews against the criteria. Delivery proceeds, with a clean stop when a claim isn’t approved yet.",
      next: "An illustrative example of the delivery build, not a named client. On a live engagement we practice the handoff and track brief completeness and revision rounds against an agreed standard before publishing any figures.",
    },
    close: "If your best briefs live in your head, we can turn them into something your team runs.",
    demo: { label: "see the brief-to-delivery flow", href: null },
  },
  {
    slug: "veelogg-edit-skill",
    title: "veelogg edit skill: a product demo that sells itself",
    hook: "A tool only helps if people can see what it does in five seconds, and buy it without booking a call.",
    label: "personal project",
    illustrative: false,
    category: "visuals & editing",
    summary: "My own AI editing skill, packaged as a demo, a landing flow and a one-click checkout.",
    sections: {
      needed: "I built an AI editing skill that plans the cuts, captions and sound for short-form video. It had to be understandable at a glance and buyable on the spot.",
      learned: "What lands is a real edit happening, the before and the decision behind it, not a feature list. People want proof it saves the afternoon, then a frictionless way to get it.",
      decisions: "Lead with an actual reel and the edit. Keep the copy about the time it gives back, not the tooling. Make the purchase a single checkout with instant delivery.",
      made: "The product demo, the landing section, the copy and the checkout-to-delivery flow, built with the same voice-and-visual approach I use for clients.",
      runs: "A visitor watches the demo, reads what it does, and buys through a secure checkout. Delivery is automatic, no manual step from me.",
      next: "A real personal product, used here as an honest example of demo-to-checkout work. Any sales figures stay private unless I choose to share them.",
    },
    close: "The same demo-to-checkout thinking works for the product you’re trying to sell.",
    demo: { label: "see the edit skill", href: null },
  },
];

export const CASE_HEADINGS: { key: keyof WorkCase["sections"]; label: string }[] = [
  { key: "needed", label: "what needed to work" },
  { key: "learned", label: "what I learned about the business" },
  { key: "decisions", label: "the decisions behind it" },
  { key: "made", label: "what I made" },
  { key: "runs", label: "how it runs" },
  { key: "next", label: "what happened next" },
];
