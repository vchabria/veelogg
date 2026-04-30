import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { StrategyFlowId } from "@/types/content-strategy";

export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const flow = searchParams.get("flow") as StrategyFlowId | null;

  if (!flow) {
    // Return all sessions for the user
    const { data, error } = await supabase
      .from("strategy_sessions")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ sessions: data });
  }

  // Return the most recent session for a specific flow
  const { data, error } = await supabase
    .from("strategy_sessions")
    .select("*")
    .eq("user_id", user.id)
    .eq("flow", flow)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ session: data });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { flow } = body as { flow: StrategyFlowId };

  if (!flow || !["workbook", "content-therapy", "quarterly-reset"].includes(flow)) {
    return NextResponse.json({ error: "Invalid flow type" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("strategy_sessions")
    .insert({
      user_id: user.id,
      flow,
      status: "in_progress",
      responses: {},
      current_step: 0,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ session: data }, { status: 201 });
}

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, responses, current_step, status } = body as {
    id: string;
    responses?: Record<string, unknown>;
    current_step?: number;
    status?: "in_progress" | "completed";
  };

  if (!id) {
    return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
  }

  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (responses !== undefined) updates.responses = responses;
  if (current_step !== undefined) updates.current_step = current_step;
  if (status !== undefined) updates.status = status;

  const { data, error } = await supabase
    .from("strategy_sessions")
    .update(updates)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ session: data });
}
