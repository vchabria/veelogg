import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const dealId = searchParams.get("dealId");

  let query = supabase
    .from("brand_deliverables")
    .select("*")
    .eq("user_id", user.id)
    .order("sort_order", { ascending: true });

  if (dealId) {
    query = query.eq("deal_id", dealId);
  }

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ deliverables: data });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { deal_id, title, description, platform, due_date, status, posted_url, notes, sort_order } = body;

  if (!deal_id || !title?.trim()) {
    return NextResponse.json({ error: "Deal ID and title are required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("brand_deliverables")
    .insert({
      deal_id,
      user_id: user.id,
      title: title.trim(),
      description: description?.trim() || null,
      platform: platform || null,
      due_date: due_date || null,
      status: status ?? "draft",
      posted_url: posted_url?.trim() || null,
      notes: notes?.trim() || null,
      sort_order: sort_order ?? 0,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ deliverable: data }, { status: 201 });
}

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { id, ...updates } = body;
  if (!id) return NextResponse.json({ error: "Deliverable ID is required" }, { status: 400 });

  const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (updates.title !== undefined && updates.title) patch.title = updates.title.trim();
  if (updates.description !== undefined) patch.description = updates.description?.trim() || null;
  if (updates.platform !== undefined) patch.platform = updates.platform || null;
  if (updates.due_date !== undefined) patch.due_date = updates.due_date || null;
  if (updates.status !== undefined) patch.status = updates.status;
  if (updates.posted_url !== undefined) patch.posted_url = updates.posted_url?.trim() || null;
  if (updates.notes !== undefined) patch.notes = updates.notes?.trim() || null;
  if (updates.sort_order !== undefined) patch.sort_order = updates.sort_order;

  const { data, error } = await supabase
    .from("brand_deliverables")
    .update(patch)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ deliverable: data });
}

export async function DELETE(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Deliverable ID is required" }, { status: 400 });

  const { error } = await supabase
    .from("brand_deliverables")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
