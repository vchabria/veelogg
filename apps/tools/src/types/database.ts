export type Plan = "free" | "pro";
export type ToolName = "hook-generator" | "script-writer" | "repurpose" | "brand-pitch" | "brand-intel" | "content-strategy" | "brand-hub";
export type SubscriptionStatus = "active" | "canceled" | "past_due" | "trialing" | "incomplete";

export interface Profile {
  id: string;
  email: string;
  plan: Plan;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Generation {
  id: string;
  user_id: string;
  tool: ToolName;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  model: string;
  tokens_used: number;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_subscription_id: string;
  plan: Plan;
  status: SubscriptionStatus;
  current_period_start: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
}
