-- 003_create_subscriptions.sql
-- Creates the subscriptions table, updated_at trigger, and RLS policies.

-- Subscriptions table
CREATE TABLE subscriptions (
  id                      uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                 uuid        NOT NULL REFERENCES profiles ON DELETE CASCADE UNIQUE,
  stripe_subscription_id  text        NOT NULL UNIQUE,
  plan                    text        NOT NULL DEFAULT 'pro' CHECK (plan IN ('free', 'pro')),
  status                  text        NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'trialing', 'incomplete')),
  current_period_start    timestamptz,
  current_period_end      timestamptz,
  created_at              timestamptz DEFAULT now(),
  updated_at              timestamptz DEFAULT now()
);

-- Apply the shared updated_at trigger (function created in 001)
CREATE TRIGGER subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- Enable Row Level Security
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy: users can read their own subscription
CREATE POLICY "Users can select own subscription"
  ON subscriptions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: service role has full access
CREATE POLICY "Service role full access"
  ON subscriptions
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
