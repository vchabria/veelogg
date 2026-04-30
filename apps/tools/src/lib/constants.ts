export const FREE_DAILY_LIMIT = 5;
export const APP_NAME = "Veelogg";
export const TOOLS_DOMAIN = "tools.veelogg.com";
export const SITE_DOMAIN = "veelogg.com";

export const TOOLS = [
  {
    slug: "hook-generator",
    name: "Hook Generator",
    description: "Generate 20 scroll-stopping hooks for any niche. 10 proven frameworks, instant copy.",
    status: "live" as const,
    icon: "Zap",
  },
  {
    slug: "script-writer",
    name: "Script Writer",
    description: "Turn your hooks into full video scripts with structure, CTAs, and transitions.",
    status: "coming-soon" as const,
    icon: "FileText",
  },
  {
    slug: "repurpose",
    name: "Repurpose Engine",
    description: "Take one video and generate tweets, captions, emails, and blog posts.",
    status: "coming-soon" as const,
    icon: "Repeat",
  },
  {
    slug: "brand-pitch",
    name: "Brand Pitch Generator",
    description: "Research any brand and generate a personalized outreach pitch in seconds.",
    status: "coming-soon" as const,
    icon: "Target",
  },
  {
    slug: "brand-intel",
    name: "Brand Intelligence Brief",
    description: "Deep analytics on any brand's creator strategy, spend, and audience.",
    status: "coming-soon" as const,
    icon: "BarChart3",
  },
  {
    slug: "content-strategy",
    name: "Content Strategy",
    description: "Interactive workbook to define your brand, content pillars, and 3-month strategy.",
    status: "live" as const,
    icon: "Compass",
  },
] as const;

export const HOOK_TYPES = [
  { value: "curiosity-gap", label: "Curiosity Gap" },
  { value: "number-stat", label: "Number/Stat" },
  { value: "negative-frame", label: "Negative Frame" },
  { value: "personal-story", label: "Personal Story" },
  { value: "question", label: "Question" },
  { value: "contrarian", label: "Contrarian" },
  { value: "authority", label: "Authority" },
  { value: "urgency", label: "Urgency" },
  { value: "transformation", label: "Transformation" },
  { value: "relatable", label: "Relatable" },
] as const;
