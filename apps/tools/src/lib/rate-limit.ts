import { createClient } from "@/lib/supabase/server";
import { FREE_DAILY_LIMIT } from "@/lib/constants";
import type { ToolName } from "@/types/database";

export interface RateLimitResult {
  allowed: boolean;
  used: number;
  limit: number;
  remaining: number;
  plan: "free" | "pro";
  resetsAt: string;
}

export async function checkRateLimit(
  userId: string,
  tool: ToolName
): Promise<RateLimitResult> {
  const supabase = await createClient();

  // Get user plan
  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", userId)
    .single();

  const plan = (profile?.plan ?? "free") as "free" | "pro";

  // Pro users have unlimited generations
  if (plan === "pro") {
    return {
      allowed: true,
      used: 0,
      limit: Infinity,
      remaining: Infinity,
      plan: "pro",
      resetsAt: "",
    };
  }

  // Count today's generations for free users
  const todayStart = new Date();
  todayStart.setUTCHours(0, 0, 0, 0);

  const { count } = await supabase
    .from("generations")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("tool", tool)
    .gte("created_at", todayStart.toISOString());

  const used = count ?? 0;
  const remaining = Math.max(0, FREE_DAILY_LIMIT - used);

  // Reset time is midnight UTC tomorrow
  const resetsAt = new Date(todayStart);
  resetsAt.setUTCDate(resetsAt.getUTCDate() + 1);

  return {
    allowed: used < FREE_DAILY_LIMIT,
    used,
    limit: FREE_DAILY_LIMIT,
    remaining,
    plan: "free",
    resetsAt: resetsAt.toISOString(),
  };
}
