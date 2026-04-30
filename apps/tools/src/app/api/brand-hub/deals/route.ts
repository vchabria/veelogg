import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const profileId = searchParams.get("profileId");

  let query = supabase
    .from("brand_deals")
    .select("*, brand_deliverables(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (profileId) {
    query = query.eq("brand_profile_id", profileId);
  }

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const deals = (data ?? []).map((d) => ({
    ...d,
    deliverables: d.brand_deliverables ?? [],
    brand_deliverables: undefined,
  }));

  return NextResponse.json({ deals });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { brand_profile_id, company_name, deal_value, payment_status, deal_status, contact_name, contact_email, start_date, end_date, notes } = body;

  if (!brand_profile_id || !company_name?.trim()) {
    return NextResponse.json({ error: "Profile ID and company name are required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("brand_deals")
    .insert({
      brand_profile_id,
      user_id: user.id,
      company_name: company_name.trim(),
      deal_value: deal_value ?? null,
      payment_status: payment_status ?? "pending",
      deal_status: deal_status ?? "negotiating",
      contact_name: contact_name?.trim() || null,
      contact_email: contact_email?.trim() || null,
      start_date: start_date || null,
      end_date: end_date || null,
      notes: notes?.trim() || null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ deal: data }, { status: 201 });
}

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { id, ...updates } = body;
  if (!id) return NextResponse.json({ error: "Deal ID is required" }, { status: 400 });

  const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (updates.company_name !== undefined && updates.company_name) patch.company_name = updates.company_name.trim();
  if (updates.deal_value !== undefined) patch.deal_value = updates.deal_value;
  if (updates.payment_status !== undefined) patch.payment_status = updates.payment_status;
  if (updates.deal_status !== undefined) patch.deal_status = updates.deal_status;
  if (updates.contact_name !== undefined) patch.contact_name = updates.contact_name?.trim() || null;
  if (updates.contact_email !== undefined) patch.contact_email = updates.contact_email?.trim() || null;
  if (updates.start_date !== undefined) patch.start_date = updates.start_date || null;
  if (updates.end_date !== undefined) patch.end_date = updates.end_date || null;
  if (updates.notes !== undefined) patch.notes = updates.notes?.trim() || null;

  const { data, error } = await supabase
    .from("brand_deals")
    .update(patch)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ deal: data });
}

export async function DELETE(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Deal ID is required" }, { status: 400 });

  const { error } = await supabase
    .from("brand_deals")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
