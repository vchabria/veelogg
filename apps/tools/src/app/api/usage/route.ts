import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/rate-limit";
import type { ToolName } from "@/types/database";

export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const tool = (searchParams.get("tool") ?? "hook-generator") as ToolName;

  const result = await checkRateLimit(user.id, tool);

  return NextResponse.json({
    used: result.used,
    limit: result.limit,
    remaining: result.remaining,
    plan: result.plan,
    resetsAt: result.resetsAt,
  });
}
