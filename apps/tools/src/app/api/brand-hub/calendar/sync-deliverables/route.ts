import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Sync deliverables with due_date as calendar items (upsert)
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { profileId } = body;

  if (!profileId) {
    return NextResponse.json({ error: "profileId required" }, { status: 400 });
  }

  // Get all deals for this profile
  const { data: deals } = await supabase
    .from("brand_deals")
    .select("id")
    .eq("brand_profile_id", profileId)
    .eq("user_id", user.id);

  if (!deals || deals.length === 0) {
    return NextResponse.json({ synced: 0 });
  }

  const dealIds = deals.map((d) => d.id);

  // Get deliverables with due_date
  const { data: deliverables } = await supabase
    .from("brand_deliverables")
    .select("*")
    .in("deal_id", dealIds)
    .not("due_date", "is", null);

  if (!deliverables || deliverables.length === 0) {
    return NextResponse.json({ synced: 0 });
  }

  // Get existing calendar items sourced from deliverables
  const { data: existing } = await supabase
    .from("content_calendar_items")
    .select("deliverable_id")
    .eq("brand_profile_id", profileId)
    .eq("source", "deliverable")
    .eq("user_id", user.id);

  const existingIds = new Set((existing ?? []).map((e) => e.deliverable_id));

  // Insert missing
  const toInsert = deliverables
    .filter((d) => !existingIds.has(d.id))
    .map((d) => ({
      user_id: user.id,
      brand_profile_id: profileId,
      title: d.title,
      description: d.description || null,
      platform: d.platform || null,
      scheduled_date: d.due_date!,
      status: "planned" as const,
      source: "deliverable" as const,
      deliverable_id: d.id,
    }));

  if (toInsert.length > 0) {
    const { error } = await supabase
      .from("content_calendar_items")
      .insert(toInsert);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ synced: toInsert.length });
}
