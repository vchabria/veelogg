-- Brand Hub v2: social handles, AI analysis, content calendar, notifications

-- 1. Alter brand_profiles — add social handles + AI analysis columns
ALTER TABLE brand_profiles ADD COLUMN IF NOT EXISTS instagram_handle text DEFAULT NULL;
ALTER TABLE brand_profiles ADD COLUMN IF NOT EXISTS tiktok_handle text DEFAULT NULL;
ALTER TABLE brand_profiles ADD COLUMN IF NOT EXISTS content_themes text[] DEFAULT '{}';
ALTER TABLE brand_profiles ADD COLUMN IF NOT EXISTS top_performing_patterns text DEFAULT NULL;
ALTER TABLE brand_profiles ADD COLUMN IF NOT EXISTS ai_analysis jsonb DEFAULT NULL;

-- 2. Content Calendar Items
CREATE TABLE IF NOT EXISTS content_calendar_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  brand_profile_id uuid NOT NULL REFERENCES brand_profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  platform text,
  scheduled_date date NOT NULL,
  scheduled_time time DEFAULT NULL,
  status text NOT NULL DEFAULT 'idea' CHECK (status IN ('idea','planned','drafted','posted')),
  content_type text DEFAULT NULL CHECK (content_type IS NULL OR content_type IN ('reel','story','post','short','video','tweet','carousel','other')),
  ai_generated boolean DEFAULT false,
  source text DEFAULT 'manual' CHECK (source IN ('manual','ai_suggestion','deliverable')),
  deliverable_id uuid DEFAULT NULL REFERENCES brand_deliverables(id) ON DELETE SET NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE content_calendar_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users own calendar items"
  ON content_calendar_items FOR ALL USING (auth.uid() = user_id);

CREATE INDEX idx_calendar_profile_date
  ON content_calendar_items(brand_profile_id, scheduled_date);

-- 3. Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('deliverable_due_today','deliverable_due_tomorrow','deliverable_overdue','deal_starting','deal_ending')),
  title text NOT NULL,
  message text NOT NULL,
  reference_type text DEFAULT NULL CHECK (reference_type IS NULL OR reference_type IN ('deliverable','deal')),
  reference_id uuid DEFAULT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users own notifications"
  ON notifications FOR ALL USING (auth.uid() = user_id);

CREATE INDEX idx_notifications_unread
  ON notifications(user_id, is_read) WHERE is_read = false;
