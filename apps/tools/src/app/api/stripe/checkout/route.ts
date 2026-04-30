import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe/client";
import { STRIPE_CONFIG } from "@/lib/stripe/config";

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stripe = getStripe();

  // Check if user already has a Stripe customer ID
  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id, email")
    .eq("id", user.id)
    .single();

  let customerId = profile?.stripe_customer_id;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: profile?.email ?? user.email,
      metadata: { supabase_user_id: user.id },
    });
    customerId = customer.id;

    await supabase
      .from("profiles")
      .update({ stripe_customer_id: customerId })
      .eq("id", user.id);
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: STRIPE_CONFIG.proPriceId, quantity: 1 }],
    success_url: STRIPE_CONFIG.checkoutSuccessUrl,
    cancel_url: STRIPE_CONFIG.checkoutCancelUrl,
    subscription_data: {
      metadata: { supabase_user_id: user.id },
    },
  });

  return NextResponse.json({ url: session.url });
}
