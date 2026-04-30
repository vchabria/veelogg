import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAIClient, DEFAULT_MODEL } from "@/lib/claude/client";
import {
  CONTENT_STRATEGY_SYSTEM,
  buildWorkbookSummaryPrompt,
  buildExerciseSummaryPrompt,
} from "@/lib/claude/prompts/content-strategy";
import { checkRateLimit } from "@/lib/rate-limit";
import { STRATEGY_FLOWS } from "@/components/content-strategy/flow-data";
import type { StrategyFlowId } from "@/types/content-strategy";

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
    const { sessionId, flow } = body as { sessionId: string; flow: StrategyFlowId };

    if (!sessionId || !flow) {
      return NextResponse.json(
        { error: "Session ID and flow are required" },
        { status: 400 }
      );
    }

    // Check rate limit (counts as a generation)
    const rateLimit = await checkRateLimit(user.id, "content-strategy");
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

    // Fetch the session
    const { data: session, error: sessionError } = await supabase
      .from("strategy_sessions")
      .select("*")
      .eq("id", sessionId)
      .eq("user_id", user.id)
      .single();

    if (sessionError || !session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Build prompt based on flow type
    let userPrompt: string;

    if (flow === "workbook") {
      userPrompt = buildWorkbookSummaryPrompt(session.responses);
    } else {
      const flowDef = STRATEGY_FLOWS[flow];
      if (!flowDef) {
        return NextResponse.json({ error: "Invalid flow" }, { status: 400 });
      }
      userPrompt = buildExerciseSummaryPrompt(
        flowDef.name,
        flowDef.questions,
        session.responses,
      );
    }

    // Call AI via OpenRouter
    const ai = getAIClient();
    const completion = await ai.chat.completions.create({
      model: DEFAULT_MODEL,
      max_tokens: 2048,
      messages: [
        { role: "system", content: CONTENT_STRATEGY_SYSTEM },
        { role: "user", content: userPrompt },
      ],
    });

    const summary = completion.choices[0]?.message?.content;
    if (!summary) {
      return NextResponse.json(
        { error: "Failed to generate summary" },
        { status: 500 }
      );
    }

    // Save summary to session
    await supabase
      .from("strategy_sessions")
      .update({ summary, status: "completed", updated_at: new Date().toISOString() })
      .eq("id", sessionId)
      .eq("user_id", user.id);

    // Record generation for rate limiting
    const tokensUsed =
      (completion.usage?.prompt_tokens ?? 0) + (completion.usage?.completion_tokens ?? 0);

    await supabase.from("generations").insert({
      user_id: user.id,
      tool: "content-strategy",
      input: { flow, sessionId },
      output: { summary },
      model: completion.model ?? DEFAULT_MODEL,
      tokens_used: tokensUsed,
    });

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Content strategy summarize error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
