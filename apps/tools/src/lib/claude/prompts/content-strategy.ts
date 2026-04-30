export const CONTENT_STRATEGY_SYSTEM = `You are a content strategy expert who helps creators build clear, actionable strategies for their content. You specialize in helping solo creators and small teams find their voice, define their brand, and plan content that grows their audience.

Your tone is supportive but direct — like a mentor who genuinely wants the creator to succeed. Avoid generic advice. Base everything on the specific answers the creator has provided.

When generating a strategy brief:
1. Synthesize the creator's answers into a cohesive narrative
2. Identify patterns and connections they might have missed
3. Provide 3-5 actionable next steps they can take immediately
4. Keep the brief concise but thorough (aim for 400-600 words)
5. Use the creator's own language and references where possible
6. If they mentioned specific platforms, tailor advice to those platforms
7. Highlight their unique strengths and differentiators`;

export function buildWorkbookSummaryPrompt(responses: Record<string, unknown>): string {
  const data = responses as Record<string, Record<string, unknown>>;

  let prompt = `A creator has filled out a Content Strategy Workbook. Based on their answers below, generate a personalized strategy brief.

---

`;

  // Barriers
  if (data.barriers?.current) {
    prompt += `## Current Barriers
${data.barriers.current}

`;
  }

  // Mission + Vision
  if (data.mission) {
    const m = data.mission as Record<string, string>;
    prompt += `## Mission + Vision\n`;
    if (m.longTermGoals) prompt += `Long-term goals: ${m.longTermGoals}\n`;
    if (m.targetAudience) prompt += `Target audience: ${m.targetAudience}\n`;
    if (m.problemsYouSolve) prompt += `Problems solved: ${m.problemsYouSolve}\n`;
    if (m.audienceTraits) prompt += `Audience traits: ${m.audienceTraits}\n`;
    if (m.creatorName || m.platform || m.contentAbout) {
      prompt += `Mission: ${m.creatorName || "[Name]"} creates content on ${m.platform || "[platform]"} about ${m.contentAbout || "[topic]"} that helps ${m.helpsWho || "[audience]"} with ${m.helpsWithProblems || "[problems]"}\n`;
    }
    prompt += `\n`;
  }

  // Brand
  if (data.brand) {
    const b = data.brand as Record<string, string>;
    prompt += `## Brand Overview\n`;
    if (b.reputation) prompt += `Brand reputation: ${b.reputation}\n`;
    if (b.audienceFeeling) prompt += `Audience feeling: ${b.audienceFeeling}\n`;
    if (b.uniqueIdentifiers) prompt += `Unique identifiers: ${b.uniqueIdentifiers}\n`;
    if (b.oneLiners) prompt += `One-liners: ${b.oneLiners}\n`;
    prompt += `\n`;
  }

  // Strategy
  if (data.strategy) {
    const s = data.strategy as Record<string, unknown>;
    prompt += `## Content Strategy\n`;
    if (Array.isArray(s.contentGoals) && s.contentGoals.length > 0) {
      prompt += `Goals: ${(s.contentGoals as string[]).join(", ")}\n`;
    }
    if (s.customGoals) prompt += `Custom goals: ${s.customGoals}\n`;
    if (Array.isArray(s.platforms) && s.platforms.length > 0) {
      prompt += `Platforms: ${(s.platforms as string[]).join(", ")}\n`;
    }
    if (s.postingStrategy) prompt += `Posting strategy: ${s.postingStrategy}\n`;
    if (s.otherStrategies) prompt += `Other strategies: ${s.otherStrategies}\n`;

    // Pillars
    if (Array.isArray(s.pillars)) {
      const pillars = s.pillars as Array<Record<string, string>>;
      pillars.forEach((p, i) => {
        if (p.name) {
          prompt += `\nPillar ${i + 1}: ${p.name}`;
          if (p.goal) prompt += ` — Goal: ${p.goal}`;
          if (p.style) prompt += ` — Style: ${p.style}`;
          if (p.hook) prompt += ` — Hook: ${p.hook}`;
          prompt += `\n`;
        }
      });
    }
    prompt += `\n`;
  }

  // Audit
  if (data.audit) {
    const a = data.audit as Record<string, string>;
    prompt += `## Content Audit\n`;
    if (a.strengths) prompt += `Strengths: ${a.strengths}\n`;
    if (a.opportunities) prompt += `Opportunities: ${a.opportunities}\n`;
    prompt += `\n`;
  }

  prompt += `---

Generate a personalized Content Strategy Brief for this creator. Include:
1. A brief summary of their brand positioning (2-3 sentences)
2. Their core content strategy (based on pillars, platforms, goals)
3. Key strengths to lean into
4. Specific areas for improvement
5. 3-5 actionable next steps they can take this week

Write in second person ("you"). Keep it concise, practical, and specific to their answers.`;

  return prompt;
}

export function buildExerciseSummaryPrompt(
  flowName: string,
  questions: Array<{ text: string; id: string }>,
  responses: Record<string, unknown>,
): string {
  let prompt = `A creator completed the "${flowName}" guided exercise. Here are their reflective answers:\n\n---\n\n`;

  for (const q of questions) {
    const answer = responses[q.id] as string;
    if (answer?.trim()) {
      prompt += `**${q.text}**\n${answer}\n\n`;
    }
  }

  prompt += `---

Based on these reflections, write a brief summary (300-400 words) that:
1. Highlights the key themes and patterns in their answers
2. Points out insights they may have revealed about themselves
3. Connects their reflections to actionable content strategy advice
4. Ends with 3 specific, encouraging next steps

Write in second person ("you"). Be warm but practical.`;

  return prompt;
}
