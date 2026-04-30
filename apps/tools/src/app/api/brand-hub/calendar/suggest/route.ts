import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAIClient, DEFAULT_MODEL } from "@/lib/claude/client";
import {
  CALENDAR_SUGGESTIONS_SYSTEM,
  buildCalendarSuggestionsUserPrompt,
} from "@/lib/claude/prompts/calendar-suggestions";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { profileId, weekStart } = body;

  if (!profileId || !weekStart) {
    return NextResponse.json({ error: "profileId and weekStart required" }, { status: 400 });
  }

  // Fetch profile
  const { data: profile, error: profileError } = await supabase
    .from("brand_profiles")
    .select("*")
    .eq("id", profileId)
    .eq("user_id", user.id)
    .single();

  if (profileError || !profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const userPrompt = buildCalendarSuggestionsUserPrompt(
    profile.name,
    profile.niche,
    profile.platforms,
    profile.voice,
    profile.audience,
    profile.content_themes ?? [],
    weekStart
  );

  const ai = getAIClient();
  const completion = await ai.chat.completions.create({
    model: DEFAULT_MODEL,
    messages: [
      { role: "system", content: CALENDAR_SUGGESTIONS_SYSTEM },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.7,
  });

  const raw = completion.choices[0]?.message?.content ?? "";

  let suggestions: Array<{
    title: string;
    description: string;
    platform: string;
    dayOffset: number;
    contentType: string;
  }>;

  try {
    const jsonMatch = raw.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error("No JSON array found");
    suggestions = JSON.parse(jsonMatch[0]);
  } catch {
    return NextResponse.json(
      { error: "Failed to parse AI suggestions", raw },
      { status: 500 }
    );
  }

  return NextResponse.json({ suggestions, weekStart });
}
