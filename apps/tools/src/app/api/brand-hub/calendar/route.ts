import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET: List calendar items for a profile + month
export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const profileId = searchParams.get("profileId");
  const month = searchParams.get("month"); // YYYY-MM

  if (!profileId) {
    return NextResponse.json({ error: "profileId is required" }, { status: 400 });
  }

  let query = supabase
    .from("content_calendar_items")
    .select("*")
    .eq("user_id", user.id)
    .eq("brand_profile_id", profileId)
    .order("scheduled_date", { ascending: true });

  if (month) {
    // Filter to the month: YYYY-MM-01 to YYYY-MM-31
    const start = `${month}-01`;
    const [y, m] = month.split("-").map(Number);
    const lastDay = new Date(y, m, 0).getDate();
    const end = `${month}-${String(lastDay).padStart(2, "0")}`;
    query = query.gte("scheduled_date", start).lte("scheduled_date", end);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ items: data });
}

// POST: Create a calendar item
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const {
    brand_profile_id, title, description, platform, scheduled_date,
    scheduled_time, status, content_type, ai_generated, source, deliverable_id, notes,
  } = body;

  if (!brand_profile_id || !title?.trim() || !scheduled_date) {
    return NextResponse.json({ error: "profile, title, and date required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("content_calendar_items")
    .insert({
      user_id: user.id,
      brand_profile_id,
      title: title.trim(),
      description: description?.trim() || null,
      platform: platform || null,
      scheduled_date,
      scheduled_time: scheduled_time || null,
      status: status || "idea",
      content_type: content_type || null,
      ai_generated: ai_generated ?? false,
      source: source || "manual",
      deliverable_id: deliverable_id || null,
      notes: notes?.trim() || null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ item: data }, { status: 201 });
}

// PATCH: Update a calendar item
export async function PATCH(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { id, ...updates } = body;

  if (!id) return NextResponse.json({ error: "Item ID is required" }, { status: 400 });

  const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (updates.title !== undefined) patch.title = updates.title.trim();
  if (updates.description !== undefined) patch.description = updates.description?.trim() || null;
  if (updates.platform !== undefined) patch.platform = updates.platform || null;
  if (updates.scheduled_date !== undefined) patch.scheduled_date = updates.scheduled_date;
  if (updates.scheduled_time !== undefined) patch.scheduled_time = updates.scheduled_time || null;
  if (updates.status !== undefined) patch.status = updates.status;
  if (updates.content_type !== undefined) patch.content_type = updates.content_type || null;
  if (updates.notes !== undefined) patch.notes = updates.notes?.trim() || null;

  const { data, error } = await supabase
    .from("content_calendar_items")
    .update(patch)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ item: data });
}

// DELETE: Remove a calendar item
export async function DELETE(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Item ID is required" }, { status: 400 });

  const { error } = await supabase
    .from("content_calendar_items")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
