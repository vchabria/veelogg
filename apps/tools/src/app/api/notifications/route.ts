import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET: Generate on-demand notifications + return latest 20
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const twoDaysOut = new Date(Date.now() + 2 * 86400000).toISOString().split("T")[0];

  // Check for overdue deliverables (due_date < today, not posted/paid)
  const { data: overdue } = await supabase
    .from("brand_deliverables")
    .select("id, title, due_date")
    .eq("user_id", user.id)
    .not("status", "in", '("posted","paid")')
    .lt("due_date", today);

  // Deliverables due today
  const { data: dueToday } = await supabase
    .from("brand_deliverables")
    .select("id, title")
    .eq("user_id", user.id)
    .not("status", "in", '("posted","paid")')
    .eq("due_date", today);

  // Deliverables due tomorrow
  const { data: dueTomorrow } = await supabase
    .from("brand_deliverables")
    .select("id, title")
    .eq("user_id", user.id)
    .not("status", "in", '("posted","paid")')
    .eq("due_date", tomorrow);

  // Deals starting within 2 days
  const { data: dealsStarting } = await supabase
    .from("brand_deals")
    .select("id, company_name, start_date")
    .eq("user_id", user.id)
    .eq("deal_status", "active")
    .gte("start_date", today)
    .lte("start_date", twoDaysOut);

  // Deals ending within 2 days
  const { data: dealsEnding } = await supabase
    .from("brand_deals")
    .select("id, company_name, end_date")
    .eq("user_id", user.id)
    .eq("deal_status", "active")
    .gte("end_date", today)
    .lte("end_date", twoDaysOut);

  // Build notifications to insert
  type NotifInsert = {
    user_id: string;
    type: string;
    title: string;
    message: string;
    reference_type: string;
    reference_id: string;
  };
  const toInsert: NotifInsert[] = [];

  for (const d of overdue ?? []) {
    toInsert.push({
      user_id: user.id,
      type: "deliverable_overdue",
      title: "Overdue deliverable",
      message: `"${d.title}" was due ${d.due_date}`,
      reference_type: "deliverable",
      reference_id: d.id,
    });
  }
  for (const d of dueToday ?? []) {
    toInsert.push({
      user_id: user.id,
      type: "deliverable_due_today",
      title: "Due today",
      message: `"${d.title}" is due today`,
      reference_type: "deliverable",
      reference_id: d.id,
    });
  }
  for (const d of dueTomorrow ?? []) {
    toInsert.push({
      user_id: user.id,
      type: "deliverable_due_tomorrow",
      title: "Due tomorrow",
      message: `"${d.title}" is due tomorrow`,
      reference_type: "deliverable",
      reference_id: d.id,
    });
  }
  for (const d of dealsStarting ?? []) {
    toInsert.push({
      user_id: user.id,
      type: "deal_starting",
      title: "Deal starting",
      message: `Deal with ${d.company_name} starts ${d.start_date}`,
      reference_type: "deal",
      reference_id: d.id,
    });
  }
  for (const d of dealsEnding ?? []) {
    toInsert.push({
      user_id: user.id,
      type: "deal_ending",
      title: "Deal ending",
      message: `Deal with ${d.company_name} ends ${d.end_date}`,
      reference_type: "deal",
      reference_id: d.id,
    });
  }

  // Check which notifications already exist (type + reference_id + today's date)
  if (toInsert.length > 0) {
    const { data: existing } = await supabase
      .from("notifications")
      .select("type, reference_id")
      .eq("user_id", user.id)
      .gte("created_at", `${today}T00:00:00`);

    const existingKeys = new Set(
      (existing ?? []).map((e) => `${e.type}:${e.reference_id}`)
    );

    const newNotifs = toInsert.filter(
      (n) => !existingKeys.has(`${n.type}:${n.reference_id}`)
    );

    if (newNotifs.length > 0) {
      await supabase.from("notifications").insert(newNotifs);
    }
  }

  // Return latest 20
  const { data: notifications } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  // Unread count
  const { count: unreadCount } = await supabase
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("is_read", false);

  return NextResponse.json({
    notifications: notifications ?? [],
    unreadCount: unreadCount ?? 0,
  });
}

// PATCH: Mark notifications as read
export async function PATCH(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { ids, markAllRead } = body;

  if (markAllRead) {
    await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", user.id)
      .eq("is_read", false);
  } else if (ids && Array.isArray(ids)) {
    await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", user.id)
      .in("id", ids);
  } else {
    return NextResponse.json({ error: "ids or markAllRead required" }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
