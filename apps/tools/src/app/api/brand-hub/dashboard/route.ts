import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const profileId = searchParams.get("profileId");

  // Total earnings: sum of deal_value for completed deals with paid payment_status
  let paidQuery = supabase
    .from("brand_deals")
    .select("deal_value")
    .eq("user_id", user.id)
    .eq("payment_status", "paid");
  if (profileId) paidQuery = paidQuery.eq("brand_profile_id", profileId);
  const { data: paidDeals } = await paidQuery;

  const totalEarnings = (paidDeals ?? []).reduce((sum, d) => sum + (d.deal_value ?? 0), 0);

  // Pending payments: sum of deal_value for deals with pending/partial payment
  let pendingQuery = supabase
    .from("brand_deals")
    .select("deal_value")
    .eq("user_id", user.id)
    .in("payment_status", ["pending", "partial"])
    .in("deal_status", ["active", "completed"]);
  if (profileId) pendingQuery = pendingQuery.eq("brand_profile_id", profileId);
  const { data: pendingDeals } = await pendingQuery;

  const pendingPayments = (pendingDeals ?? []).reduce((sum, d) => sum + (d.deal_value ?? 0), 0);

  // Active deals count
  let activeQuery = supabase
    .from("brand_deals")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("deal_status", "active");
  if (profileId) activeQuery = activeQuery.eq("brand_profile_id", profileId);
  const { count: activeDeals } = await activeQuery;

  // Upcoming deliverables (due within 7 days)
  const now = new Date();
  const weekFromNow = new Date(now);
  weekFromNow.setDate(weekFromNow.getDate() + 7);

  let delivQuery = supabase
    .from("brand_deliverables")
    .select("*")
    .eq("user_id", user.id)
    .not("status", "in", '("posted","paid")')
    .gte("due_date", now.toISOString().split("T")[0])
    .lte("due_date", weekFromNow.toISOString().split("T")[0])
    .order("due_date", { ascending: true });
  if (profileId) {
    // Filter deliverables by profile: join through deals
    delivQuery = delivQuery.in(
      "deal_id",
      (await supabase
        .from("brand_deals")
        .select("id")
        .eq("brand_profile_id", profileId)
        .eq("user_id", user.id)
      ).data?.map((d) => d.id) ?? []
    );
  }
  const { data: deliverablesDue } = await delivQuery;

  return NextResponse.json({
    totalEarnings,
    pendingPayments,
    activeDeals: activeDeals ?? 0,
    deliverablesDue: deliverablesDue ?? [],
  });
}
