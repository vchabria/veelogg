export const CALENDAR_SUGGESTIONS_SYSTEM = `You are a content planning expert who helps creators plan their weekly content calendar.

Given a brand profile (name, niche, platforms, voice, audience, content themes), suggest 5-7 pieces of content for the upcoming week.

For each suggestion provide:
- "title": A concise, actionable content title (e.g. "Morning routine GRWM", "3 budget skincare myths debunked")
- "description": 1-2 sentence description of the content concept
- "platform": Best platform for this content (one of: "youtube", "tiktok", "instagram", "twitter", "linkedin", "other")
- "dayOffset": Which day of the week to schedule (0 = Monday, 1 = Tuesday, ... 6 = Sunday)
- "contentType": One of: "reel", "story", "post", "short", "video", "tweet", "carousel", "other"

Spread content across different days and platforms. Mix content types. Align with the brand's voice and themes.

Return ONLY a valid JSON array of objects. No other text.`;

export function buildCalendarSuggestionsUserPrompt(
  profileName: string,
  niche: string,
  platforms: string[],
  voice: string | null,
  audience: string | null,
  contentThemes: string[],
  weekStart: string
): string {
  let prompt = `Suggest 5-7 content pieces for the week starting ${weekStart}.

**Creator**: ${profileName}
**Niche**: ${niche}
**Platforms**: ${platforms.join(", ")}`;

  if (voice) prompt += `\n**Voice**: ${voice}`;
  if (audience) prompt += `\n**Audience**: ${audience}`;
  if (contentThemes.length > 0) prompt += `\n**Content Themes**: ${contentThemes.join(", ")}`;

  prompt += `

Return a JSON array with 5-7 objects, each having: title, description, platform, dayOffset (0-6), contentType.`;

  return prompt;
}
