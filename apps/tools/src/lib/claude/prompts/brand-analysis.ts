export const BRAND_ANALYSIS_SYSTEM = `You are an expert brand strategist who analyzes creators' social media content to extract their brand identity.

Given a creator's top-performing posts from Instagram and/or TikTok, analyze their content and extract:

1. **niche** — Their primary content niche (e.g. "fitness & wellness", "tech reviews", "personal finance")
2. **voice** — Their brand voice and tone (e.g. "Casual, witty, and relatable with Gen-Z slang")
3. **audience** — Their target audience description (e.g. "Women 18-30 interested in clean beauty and skincare routines")
4. **contentThemes** — 3-5 recurring content themes/pillars (e.g. ["morning routines", "product reviews", "day-in-my-life"])
5. **topPerformingPatterns** — A sentence describing what makes their top posts work (e.g. "Transformation hooks with specific numbers perform best")
6. **platforms** — Array of platforms they should focus on based on their content style. Use these exact values: "youtube", "tiktok", "instagram", "twitter", "linkedin", "other"

Be specific and observational — base your analysis on the actual content provided, not generic assumptions.

Return ONLY a valid JSON object with these exact keys: niche, voice, audience, contentThemes, topPerformingPatterns, platforms. No other text.`;

export function buildBrandAnalysisUserPrompt(
  instagramHandle: string | null,
  tiktokHandle: string | null,
  scrapedContext: string
): string {
  const handles: string[] = [];
  if (instagramHandle) handles.push(`Instagram: @${instagramHandle.replace(/^@/, "")}`);
  if (tiktokHandle) handles.push(`TikTok: @${tiktokHandle.replace(/^@/, "")}`);

  return `Analyze this creator's brand identity based on their top-performing posts.

**Creator handles**: ${handles.join(", ") || "Unknown"}

${scrapedContext}

Return a JSON object with: niche, voice, audience, contentThemes (string array of 3-5 themes), topPerformingPatterns (string), platforms (array of platform strings).`;
}
