import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAIClient, DEFAULT_MODEL } from "@/lib/claude/client";
import {
  HOOK_GENERATOR_SYSTEM,
  buildHookGeneratorUserPrompt,
} from "@/lib/claude/prompts/hook-generator";
import { checkRateLimit } from "@/lib/rate-limit";
import { scrapeInstagram, scrapeTikTok } from "@/lib/apify/client";
import { formatScrapedPostsForPrompt } from "@/lib/apify/format";
import type { Hook, ScrapeResult } from "@/types/hooks";
import type { ScrapedPost } from "@/lib/apify/client";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { niche, product, tone, instagramHandle, tiktokHandle } = body;

    if (!niche || !product) {
      return NextResponse.json(
        { error: "Niche and product are required" },
        { status: 400 }
      );
    }

    // Check rate limit
    const rateLimit = await checkRateLimit(user.id, "hook-generator");
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Daily limit reached. Upgrade to Pro for unlimited generations.",
          remaining: 0,
          plan: rateLimit.plan,
          resetsAt: rateLimit.resetsAt,
        },
        { status: 429 }
      );
    }

    // Scrape social media if handles provided
    const scrapeResults: ScrapeResult[] = [];
    let allScrapedPosts: ScrapedPost[] = [];

    const scrapePromises: Promise<{ posts: ScrapedPost[]; result: ScrapeResult }>[] = [];
    if (instagramHandle?.trim()) {
      scrapePromises.push(scrapeInstagram(instagramHandle.trim()));
    }
    if (tiktokHandle?.trim()) {
      scrapePromises.push(scrapeTikTok(tiktokHandle.trim()));
    }

    if (scrapePromises.length > 0) {
      const settled = await Promise.allSettled(scrapePromises);
      for (const outcome of settled) {
        if (outcome.status === "fulfilled") {
          scrapeResults.push(outcome.value.result);
          allScrapedPosts = allScrapedPosts.concat(outcome.value.posts);
        }
        // Promise.allSettled won't reject, but handle defensively
      }
    }

    const scrapedContext = formatScrapedPostsForPrompt(allScrapedPosts);

    // Call AI via OpenRouter
    const ai = getAIClient();
    const completion = await ai.chat.completions.create({
      model: DEFAULT_MODEL,
      max_tokens: 2048,
      messages: [
        { role: "system", content: HOOK_GENERATOR_SYSTEM },
        {
          role: "user",
          content: buildHookGeneratorUserPrompt(niche, product, tone, scrapedContext || undefined),
        },
      ],
    });

    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) {
      return NextResponse.json(
        { error: "Failed to generate hooks" },
        { status: 500 }
      );
    }

    // Parse hooks from response
    let hooks: Hook[];
    try {
      const raw = responseText.trim();
      // Handle potential markdown code block wrapping
      const jsonStr = raw.startsWith("[") ? raw : raw.replace(/```json?\n?/g, "").replace(/```/g, "").trim();
      hooks = JSON.parse(jsonStr);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse hooks from AI response" },
        { status: 500 }
      );
    }

    // Record generation
    const tokensUsed =
      (completion.usage?.prompt_tokens ?? 0) + (completion.usage?.completion_tokens ?? 0);

    await supabase.from("generations").insert({
      user_id: user.id,
      tool: "hook-generator",
      input: { niche, product, tone, instagramHandle, tiktokHandle },
      output: { hooks },
      model: completion.model ?? DEFAULT_MODEL,
      tokens_used: tokensUsed,
    });

    // Get updated remaining count
    const updatedLimit = await checkRateLimit(user.id, "hook-generator");

    return NextResponse.json({
      hooks,
      remaining: updatedLimit.remaining,
      plan: updatedLimit.plan,
      scrapeResults: scrapeResults.length > 0 ? scrapeResults : undefined,
    });
  } catch (error) {
    console.error("Generate hooks error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
