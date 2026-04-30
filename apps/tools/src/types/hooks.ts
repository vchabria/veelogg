export type HookType =
  | "curiosity-gap"
  | "number-stat"
  | "negative-frame"
  | "personal-story"
  | "question"
  | "contrarian"
  | "authority"
  | "urgency"
  | "transformation"
  | "relatable";

export interface Hook {
  text: string;
  type: HookType;
  label: string;
}

export interface GenerateHooksInput {
  niche: string;
  product: string;
  tone?: string;
  instagramHandle?: string;
  tiktokHandle?: string;
}

export interface ScrapeResult {
  platform: "instagram" | "tiktok";
  handle: string;
  postsAnalyzed: number;
  status: "success" | "error";
  error?: string;
}

export interface GenerateHooksResponse {
  hooks: Hook[];
  remaining: number;
  plan: string;
  scrapeResults?: ScrapeResult[];
}
