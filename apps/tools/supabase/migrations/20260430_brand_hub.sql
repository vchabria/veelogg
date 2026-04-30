-- Brand Hub: 3 tables for brand profiles, deals, and deliverables

-- 1. Brand Profiles
create table if not exists brand_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  niche text not null,
  platforms text[] not null default '{}',
  voice text,
  audience text,
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_brand_profiles_user on brand_profiles(user_id);

alter table brand_profiles enable row level security;

create policy "Users can view own brand profiles"
  on brand_profiles for select using (auth.uid() = user_id);
create policy "Users can insert own brand profiles"
  on brand_profiles for insert with check (auth.uid() = user_id);
create policy "Users can update own brand profiles"
  on brand_profiles for update using (auth.uid() = user_id);
create policy "Users can delete own brand profiles"
  on brand_profiles for delete using (auth.uid() = user_id);

-- 2. Brand Deals
create table if not exists brand_deals (
  id uuid primary key default gen_random_uuid(),
  brand_profile_id uuid not null references brand_profiles(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  company_name text not null,
  deal_value integer,
  payment_status text not null default 'pending' check (payment_status in ('pending', 'partial', 'paid')),
  deal_status text not null default 'negotiating' check (deal_status in ('negotiating', 'active', 'completed', 'cancelled')),
  contact_name text,
  contact_email text,
  start_date date,
  end_date date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_brand_deals_user on brand_deals(user_id);
create index idx_brand_deals_profile on brand_deals(brand_profile_id);

alter table brand_deals enable row level security;

create policy "Users can view own brand deals"
  on brand_deals for select using (auth.uid() = user_id);
create policy "Users can insert own brand deals"
  on brand_deals for insert with check (auth.uid() = user_id);
create policy "Users can update own brand deals"
  on brand_deals for update using (auth.uid() = user_id);
create policy "Users can delete own brand deals"
  on brand_deals for delete using (auth.uid() = user_id);

-- 3. Brand Deliverables
create table if not exists brand_deliverables (
  id uuid primary key default gen_random_uuid(),
  deal_id uuid not null references brand_deals(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  platform text,
  due_date date,
  status text not null default 'draft' check (status in ('draft', 'in_review', 'approved', 'posted', 'paid')),
  posted_url text,
  notes text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_brand_deliverables_user on brand_deliverables(user_id);
create index idx_brand_deliverables_deal on brand_deliverables(deal_id);
create index idx_brand_deliverables_status on brand_deliverables(status);
create index idx_brand_deliverables_due on brand_deliverables(due_date);

alter table brand_deliverables enable row level security;

create policy "Users can view own brand deliverables"
  on brand_deliverables for select using (auth.uid() = user_id);
create policy "Users can insert own brand deliverables"
  on brand_deliverables for insert with check (auth.uid() = user_id);
create policy "Users can update own brand deliverables"
  on brand_deliverables for update using (auth.uid() = user_id);
create policy "Users can delete own brand deliverables"
  on brand_deliverables for delete using (auth.uid() = user_id);
