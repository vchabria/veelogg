import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { scrapeInstagram, scrapeTikTok } from "@/lib/apify/client";
import { formatScrapedPostsForPrompt } from "@/lib/apify/format";
import { getAIClient, DEFAULT_MODEL } from "@/lib/claude/client";
import {
  BRAND_ANALYSIS_SYSTEM,
  buildBrandAnalysisUserPrompt,
} from "@/lib/claude/prompts/brand-analysis";
import type { BrandAnalysis } from "@/types/brand-hub";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { instagram_handle, tiktok_handle } = body;

  if (!instagram_handle && !tiktok_handle) {
    return NextResponse.json(
      { error: "At least one social handle is required" },
      { status: 400 }
    );
  }

  // Scrape in parallel
  const [igResult, ttResult] = await Promise.all([
    instagram_handle ? scrapeInstagram(instagram_handle) : null,
    tiktok_handle ? scrapeTikTok(tiktok_handle) : null,
  ]);

  const allPosts = [
    ...(igResult?.posts ?? []),
    ...(ttResult?.posts ?? []),
  ];

  if (allPosts.length === 0) {
    return NextResponse.json(
      {
        error: "Could not scrape any posts. Please check the handles and try again.",
        scrapeResults: [igResult?.result, ttResult?.result].filter(Boolean),
      },
      { status: 422 }
    );
  }

  const scrapedContext = formatScrapedPostsForPrompt(allPosts);
  const userPrompt = buildBrandAnalysisUserPrompt(
    instagram_handle,
    tiktok_handle,
    scrapedContext
  );

  // AI analysis
  const ai = getAIClient();
  const completion = await ai.chat.completions.create({
    model: DEFAULT_MODEL,
    messages: [
      { role: "system", content: BRAND_ANALYSIS_SYSTEM },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.4,
  });

  const raw = completion.choices[0]?.message?.content ?? "";

  let analysis: BrandAnalysis;
  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in response");
    analysis = JSON.parse(jsonMatch[0]);
  } catch {
    return NextResponse.json(
      { error: "Failed to parse AI analysis", raw },
      { status: 500 }
    );
  }

  return NextResponse.json({
    analysis,
    scrapeResults: [igResult?.result, ttResult?.result].filter(Boolean),
    postsAnalyzed: allPosts.length,
  });
}
