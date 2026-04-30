import type { StrategyFlow, StrategyQuestion } from "@/types/content-strategy";

// ─── Content Therapy: 20 questions across 4 parts ───────────────────────────

const contentTherapyQuestions: StrategyQuestion[] = [
  // Part 0: Unblocking (5 questions)
  { id: "ct-1", partIndex: 0, partLabel: "Unblocking", text: "What\u2019s the biggest thing stopping you from creating content right now?", placeholder: "Write freely \u2014 no wrong answers here..." },
  { id: "ct-2", partIndex: 0, partLabel: "Unblocking", text: "When was the last time you felt genuinely excited about a piece of content you made? What was it?", placeholder: "Describe that moment..." },
  { id: "ct-3", partIndex: 0, partLabel: "Unblocking", text: "If nobody could judge you, what kind of content would you make?", placeholder: "Dream big here..." },
  { id: "ct-4", partIndex: 0, partLabel: "Unblocking", text: "What\u2019s a fear you have about putting yourself out there? Be honest.", placeholder: "Name the fear..." },
  { id: "ct-5", partIndex: 0, partLabel: "Unblocking", text: "What would you tell a friend who felt the exact same way about their content?", placeholder: "What advice would you give them?" },

  // Part 1: Self-Discovery (5 questions)
  { id: "ct-6", partIndex: 1, partLabel: "Self-Discovery", text: "What are 3 topics you could talk about for hours without getting bored?", placeholder: "List your passions..." },
  { id: "ct-7", partIndex: 1, partLabel: "Self-Discovery", text: "What do people come to you for advice on?", placeholder: "Think about DMs, texts, conversations..." },
  { id: "ct-8", partIndex: 1, partLabel: "Self-Discovery", text: "What\u2019s a personal experience that shaped who you are as a creator?", placeholder: "Share your story..." },
  { id: "ct-9", partIndex: 1, partLabel: "Self-Discovery", text: "If your content had a personality, how would you describe it in 3 words?", placeholder: "e.g. bold, honest, playful..." },
  { id: "ct-10", partIndex: 1, partLabel: "Self-Discovery", text: "What creator do you admire, and what specifically do you admire about them?", placeholder: "Name them and why..." },

  // Part 2: Audience Clarity (5 questions)
  { id: "ct-11", partIndex: 2, partLabel: "Audience Clarity", text: "Describe your ideal viewer. Who are they, what\u2019s their day like?", placeholder: "Paint a picture of this person..." },
  { id: "ct-12", partIndex: 2, partLabel: "Audience Clarity", text: "What\u2019s the #1 problem your audience faces that you can help with?", placeholder: "Get specific..." },
  { id: "ct-13", partIndex: 2, partLabel: "Audience Clarity", text: "What does your audience feel before watching your content? What should they feel after?", placeholder: "Describe the transformation..." },
  { id: "ct-14", partIndex: 2, partLabel: "Audience Clarity", text: "What would your audience search for on YouTube or TikTok to find someone like you?", placeholder: "List search terms..." },
  { id: "ct-15", partIndex: 2, partLabel: "Audience Clarity", text: "Why should someone follow you instead of the hundreds of other creators in your niche?", placeholder: "What makes you different?" },

  // Part 3: Planning Content (5 questions)
  { id: "ct-16", partIndex: 3, partLabel: "Planning Content", text: "If you could only make 3 types of videos for the next 3 months, what would they be?", placeholder: "Name your 3 content types..." },
  { id: "ct-17", partIndex: 3, partLabel: "Planning Content", text: "What\u2019s one content idea you\u2019ve been sitting on but haven\u2019t made yet? Why?", placeholder: "Share the idea and what\u2019s holding you back..." },
  { id: "ct-18", partIndex: 3, partLabel: "Planning Content", text: "How often can you realistically post without burning out?", placeholder: "Be honest with yourself..." },
  { id: "ct-19", partIndex: 3, partLabel: "Planning Content", text: "What does \u201Csuccess\u201D look like for your content 3 months from now?", placeholder: "Describe your vision..." },
  { id: "ct-20", partIndex: 3, partLabel: "Planning Content", text: "What\u2019s one small action you can take today to move your content forward?", placeholder: "Just one step..." },
];

// ─── Quarterly Reset: 10 questions across 2 parts ───────────────────────────

const quarterlyResetQuestions: StrategyQuestion[] = [
  // Part 0: Reflect (5 questions)
  { id: "qr-1", partIndex: 0, partLabel: "Reflect", text: "What worked best for your content last quarter? What got the most engagement or felt the best to make?", placeholder: "Celebrate the wins..." },
  { id: "qr-2", partIndex: 0, partLabel: "Reflect", text: "What didn\u2019t work? What felt forced, flopped, or drained your energy?", placeholder: "Be honest about the lows..." },
  { id: "qr-3", partIndex: 0, partLabel: "Reflect", text: "Did you hit your content goals from last quarter? Why or why not?", placeholder: "Review your goals..." },
  { id: "qr-4", partIndex: 0, partLabel: "Reflect", text: "What\u2019s one thing you learned about your audience in the last 3 months?", placeholder: "Share an insight..." },
  { id: "qr-5", partIndex: 0, partLabel: "Reflect", text: "If you could change one thing about how you created content last quarter, what would it be?", placeholder: "What would you do differently?" },

  // Part 1: Reset (5 questions)
  { id: "qr-6", partIndex: 1, partLabel: "Reset", text: "What\u2019s your #1 content goal for this new quarter?", placeholder: "Make it specific and measurable..." },
  { id: "qr-7", partIndex: 1, partLabel: "Reset", text: "What content format or style do you want to experiment with?", placeholder: "Try something new..." },
  { id: "qr-8", partIndex: 1, partLabel: "Reset", text: "What\u2019s one habit you want to build into your content workflow?", placeholder: "e.g. batch filming, scripting hooks first..." },
  { id: "qr-9", partIndex: 1, partLabel: "Reset", text: "What would make you proud of your content at the end of this quarter?", placeholder: "Visualize the outcome..." },
  { id: "qr-10", partIndex: 1, partLabel: "Reset", text: "Write yourself a short pep talk. What do you need to hear right now?", placeholder: "Be your own hype person..." },
];

// ─── Flow definitions ────────────────────────────────────────────────────────

export const STRATEGY_FLOWS: Record<string, StrategyFlow> = {
  "content-therapy": {
    id: "content-therapy",
    name: "Content Therapy",
    tagline: "Warm up with guided reflection",
    description: "20 reflective questions to unblock your creativity, discover your voice, and get clear on your audience. A journaling-style warm-up before diving into your strategy.",
    parts: ["Unblocking", "Self-Discovery", "Audience Clarity", "Planning Content"],
    questions: contentTherapyQuestions,
  },
  "quarterly-reset": {
    id: "quarterly-reset",
    name: "Quarterly Reset",
    tagline: "Quick reset for the new quarter",
    description: "10 focused questions to reflect on what worked, what didn\u2019t, and set fresh goals. Perfect at the start of each quarter.",
    parts: ["Reflect", "Reset"],
    questions: quarterlyResetQuestions,
  },
};

// ─── Workbook section definitions ────────────────────────────────────────────

export interface WorkbookSectionDef {
  id: string;
  title: string;
  description: string;
}

export const WORKBOOK_SECTIONS: WorkbookSectionDef[] = [
  {
    id: "barriers",
    title: "Current Barriers",
    description: "What\u2019s standing in the way of your content right now?",
  },
  {
    id: "mission",
    title: "Mission + Vision",
    description: "Define your long-term goals, audience, and mission statement.",
  },
  {
    id: "brand",
    title: "Brand Overview",
    description: "How do you want to be known? What makes you unique?",
  },
  {
    id: "strategy",
    title: "Content Strategy (Next 3 Months)",
    description: "Set goals, define your content pillars, and plan your posting strategy.",
  },
  {
    id: "audit",
    title: "Content Audit",
    description: "Assess your strengths and spot opportunities for growth.",
  },
];

export const CONTENT_GOAL_PRESETS = [
  "Grow followers",
  "Increase engagement",
  "Build email list",
  "Launch a product",
  "Get brand deals",
  "Establish authority",
  "Drive traffic to website",
  "Build community",
  "Monetize content",
  "Improve content quality",
];

export const PLATFORM_OPTIONS = [
  "YouTube",
  "TikTok",
  "Instagram",
  "Twitter/X",
  "LinkedIn",
  "Pinterest",
];

export function emptyPillar() {
  return { name: "", goal: "", style: "", hook: "" };
}

export function emptyWorkbookData() {
  return {
    barriers: { current: "" },
    mission: {
      longTermGoals: "",
      targetAudience: "",
      problemsYouSolve: "",
      audienceTraits: "",
      missionStatement: "",
      creatorName: "",
      platform: "",
      contentAbout: "",
      helpsWho: "",
      helpsWithProblems: "",
    },
    brand: {
      reputation: "",
      audienceFeeling: "",
      uniqueIdentifiers: "",
      oneLiners: "",
    },
    strategy: {
      contentGoals: [] as string[],
      customGoals: "",
      pillars: [emptyPillar(), emptyPillar(), emptyPillar()] as [
        ReturnType<typeof emptyPillar>,
        ReturnType<typeof emptyPillar>,
        ReturnType<typeof emptyPillar>,
      ],
      platforms: [] as string[],
      postingStrategy: "",
      otherStrategies: "",
    },
    audit: {
      strengths: "",
      opportunities: "",
    },
  };
}
