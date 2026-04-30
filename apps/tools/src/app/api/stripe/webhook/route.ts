import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getStripe } from "@/lib/stripe/client";
import { createAdminClient } from "@/lib/supabase/admin";
import type Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const stripe = getStripe();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createAdminClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.subscription
        ? (
            await stripe.subscriptions.retrieve(session.subscription as string)
          ).metadata.supabase_user_id
        : null;

      if (userId && session.subscription) {
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );

        await supabase.from("subscriptions").upsert(
          {
            user_id: userId,
            stripe_subscription_id: subscription.id,
            plan: "pro",
            status: subscription.status as string,
            current_period_start: new Date(
              subscription.current_period_start * 1000
            ).toISOString(),
            current_period_end: new Date(
              subscription.current_period_end * 1000
            ).toISOString(),
          },
          { onConflict: "user_id" }
        );

        await supabase
          .from("profiles")
          .update({ plan: "pro" })
          .eq("id", userId);
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata.supabase_user_id;

      if (userId) {
        const isActive =
          subscription.status === "active" ||
          subscription.status === "trialing";

        await supabase
          .from("subscriptions")
          .update({
            status: subscription.status,
            current_period_start: new Date(
              subscription.current_period_start * 1000
            ).toISOString(),
            current_period_end: new Date(
              subscription.current_period_end * 1000
            ).toISOString(),
          })
          .eq("stripe_subscription_id", subscription.id);

        await supabase
          .from("profiles")
          .update({ plan: isActive ? "pro" : "free" })
          .eq("id", userId);
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata.supabase_user_id;

      if (userId) {
        await supabase
          .from("subscriptions")
          .update({ status: "canceled" })
          .eq("stripe_subscription_id", subscription.id);

        await supabase
          .from("profiles")
          .update({ plan: "free" })
          .eq("id", userId);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
