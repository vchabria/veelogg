/* --- Veelogg Content Systems: 90-day engagement ---
   Campaign copy + the ungated "content handoff check" worksheet.
   No price is confirmed for this engagement, it is scoped and quoted in
   writing after the free fit conversation. Do NOT inherit the mentorship
   or content-production price here. Existing services stay separate with
   their own accurate scopes. */

export const CS_META = {
  title: "Content Systems, a 90-day engagement | Veelogg",
  description:
    "Not sure what to post, or who should own it? Over 90 days I learn your business and voice, build the AI skills, tools and workflow around your content, make content with you, and train the person who keeps it running.",
};

export const CS_HERO = {
  title: "content that sounds like your company. a system your team can run.",
  body: "I work with your business for 90 days to understand what you know, capture how you communicate, and build the AI skills, tools and workflow around it. We create content together and train the person who will keep it going.",
  ctaLabel: "Map my content system",
  ctaNote:
    "Free 20-minute fit and workflow conversation. Best for businesses with an established offer and someone ready to own content internally.",
  secondary: "See how the three months work.",
};

export const CS_RECOGNITION = {
  title: "there’s plenty to say. getting it out is the part that keeps slipping.",
  paras: [
    "The useful explanation happens on a client call. The draft loses the detail that made it interesting. Your team asks what to post, and the answer is somewhere in your notes.",
    "We work on the route between what your company knows and what your audience gets to see. That includes the voice, the decisions, the production steps and the person responsible for each one.",
  ],
};

export const CS_DEMO = {
  title: "one company question, from source to finished draft.",
  body: "Watch how I take a customer question, identify the useful point, build the brief, apply the company’s voice and check the result.",
  // Until Video 1 is published, this stays a clearly-labelled illustrative
  // walkthrough, no fabricated testimonial or performance result.
  videoUrl: null as string | null,
  steps: [
    { label: "the question", text: "a real customer question your team gets asked" },
    { label: "source note", text: "where the useful answer already lives" },
    { label: "the brief", text: "the context production needs to start" },
    { label: "draft correction", text: "the edit that puts your voice back in" },
    { label: "final approval", text: "the person who signs it off" },
  ],
};

export const CS_PHASES = [
  {
    label: "month one",
    title: "learn the company. build the first version.",
    body: "We work through your business, customers, offer, existing content and the way your people explain things. I turn that into a company knowledge base, voice examples and an initial workflow for the content you need.",
  },
  {
    label: "month two",
    title: "make the content together.",
    body: "We run real production cycles with your internal owner. Each useful correction becomes an example, a rule or a better step in the workflow. Training happens in the work itself.",
  },
  {
    label: "month three",
    title: "your person takes the lead.",
    body: "Your team plans, creates and moves the content through review. I observe where the process still depends on me, help resolve those gaps and prepare the handoff.",
  },
];

export const CS_KEEP = {
  title: "what you keep",
  items: [
    "A company knowledge base of approved business information and useful source material.",
    "A voice guide built from examples and actual editorial decisions.",
    "Reusable AI skills for the agreed content tasks.",
    "Templates and a working route from idea to approval and publication.",
    "Training recordings, operating instructions and a named internal owner.",
    "A clear view of tool costs, access, maintenance and the decisions people still need to make.",
  ],
  note: "The exact tools, formats and production volume are defined with you before the engagement begins. Client-specific materials stay accessible under the agreed ownership and licensing terms after handoff.",
};

export const CS_FIT = {
  title: "this works best when someone on your side is ready to take it over.",
  body: "You have a clear business offer, useful experience to draw from, and a founder, marketer, assistant or content person who can participate. You can share source material and make the decisions that need your expertise. We set a realistic cadence around that person’s capacity. If you currently need fully outsourced production, we can discuss that as a separate scope.",
};

export const CS_HANDOFF = {
  title: "we practice the handoff before we call it finished.",
  body: "The target is for your internal owner to complete two consecutive agreed content cycles at the quality standard, without me doing the production for them. We also check that they can update company information, review a draft and handle a failed step.",
  note: "We define those criteria together at kickoff. Ninety days describes the planned engagement; the system still needs people, source material and ongoing use.",
};

export const CS_FAQS: [string, string][] = [
  ["We’re not even sure what we should be making. Is that a problem?", "No, that’s usually the starting point. Month one turns what your company already knows into themes, formats and a plan, so “what do we post?” has an answer that isn’t a guess."],
  ["Who actually owns content once you’re gone?", "A named person on your side. Part of the engagement is training that owner and practising the handoff, so the process keeps running without me."],
  ["Will it still sound like us?", "We build the voice from your own examples, explanations and feedback. Your team checks early outputs and helps establish what belongs in the final version."],
  ["Will you make content during the engagement?", "Yes, we produce the agreed content together so the system gets tested in real work. The number of assets and formats is part of your scope."],
  ["Do we need to change all our tools?", "We start with what you already use. A new tool needs a clear job and someone who can operate it."],
  ["How much does it cost?", "The project is scoped around your channels, formats, existing setup and training needs. After the fit conversation, you receive the deliverables, responsibilities, timeline and fee in writing."],
  ["What happens after three months?", "Your internal owner continues using the system. We agree on what you maintain, which subscriptions you need and what optional support would cover. Ongoing support is a separate choice."],
];

export const CS_FINAL = {
  title: "what would you like your team to be able to run?",
  body: "Tell me a little about the business, where content gets stuck and who could take it over. We’ll use a short conversation to see whether this engagement fits.",
};

/* ---- form option sets (shared with the fit form) ---- */
export const CS_BOTTLENECK_OPTIONS = [
  { value: "", label: "select one" },
  { value: "ideas", label: "ideas / source material" },
  { value: "voice", label: "voice / rewrites" },
  { value: "production", label: "production" },
  { value: "approvals", label: "approvals / publishing" },
  { value: "several", label: "several of these" },
];

export const CS_OWNER_OPTIONS = [
  { value: "", label: "select one" },
  { value: "me", label: "me" },
  { value: "team-member", label: "an existing team member" },
  { value: "hiring", label: "we are hiring" },
  { value: "unsure", label: "not sure yet" },
];

export const CS_START_OPTIONS = [
  { value: "this-month", label: "this month" },
  { value: "1-3-months", label: "next 1–3 months" },
  { value: "exploring", label: "exploring timing" },
];

/* ---- the content handoff check (ungated worksheet) ---- */
export const HANDOFF_PROMPT =
  "If you were away next week, could someone else take one idea all the way to a published post?";

export const HANDOFF_INTRO =
  "Choose one representative content format. Complete each line with an actual person, location or rule.";

export const HANDOFF_ROWS = [
  { step: "Source", fill: "Our ideas / evidence come from ___. The approved material lives at ___.", evidence: "The operator can find the source without asking the founder." },
  { step: "Audience", fill: "This piece is for ___, who needs to understand ___.", evidence: "The draft addresses a specific useful question." },
  { step: "Voice", fill: "Three approved examples live at ___. One common mistake is ___.", evidence: "The reviewer can explain why a sentence fits or fails." },
  { step: "Brief", fill: "A ready brief includes ___. ___ checks missing information.", evidence: "Production starts with the required context." },
  { step: "Production", fill: "___ uses ___ to create the agreed format.", evidence: "A second person can follow the instructions." },
  { step: "Review", fill: "___ checks claims and ___ gives final approval.", evidence: "There is one current version and a recorded decision." },
  { step: "Publish", fill: "___ schedules it and checks ___.", evidence: "Someone confirms it was published correctly." },
  { step: "Recovery", fill: "If a tool / input / approval fails, ___ does ___.", evidence: "The operator can handle one realistic exception." },
];

export const HANDOFF_LEGEND =
  "Mark each line works / needs practice / missing. A blank identifies work to design; it is not a score predicting business success.";

export const HANDOFF_CLOSING =
  "Choose the first missing step that blocks the rest. What needs to be written down, taught or changed so the person can complete it? Test that step using one piece of real content.";
