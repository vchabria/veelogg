# Veelogg Manual Setup

## 1. Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy these values into `apps/tools/.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` — from Settings > API > Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from Settings > API > `anon` `public` key
   - `SUPABASE_SERVICE_ROLE_KEY` — from Settings > API > `service_role` key
3. Run the 4 SQL migration files in order via the Supabase SQL Editor:
   - `supabase/migrations/001_create_profiles.sql`
   - `supabase/migrations/002_create_generations.sql`
   - `supabase/migrations/003_create_subscriptions.sql`
   - `supabase/migrations/004_rate_limiting_view.sql`
4. Enable auth providers in Authentication > Providers:
   - Email (magic link) — enabled by default
   - Google OAuth — add your Google OAuth client ID/secret

## 2. Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Create a product called "Veelogg Pro" with a $19/month recurring price
3. Copy these values into `apps/tools/.env.local`:
   - `STRIPE_SECRET_KEY` — from Developers > API keys
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — from Developers > API keys
   - `STRIPE_PRO_PRICE_ID` — the price ID from the product you created (starts with `price_`)
4. Set up the webhook:
   - Go to Developers > Webhooks > Add endpoint
   - URL: `https://tools.veelogg.com/api/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET`

## 3. Anthropic

1. Get an API key from [console.anthropic.com](https://console.anthropic.com)
2. Add to `apps/tools/.env.local` as `ANTHROPIC_API_KEY`

## 4. Domains

1. Purchase `veelogg.com` and `tools.veelogg.com` (or configure subdomains)
2. In Vercel, add both domains to the project
3. Set DNS records as Vercel instructs (CNAME or A records)

## 5. Vercel

1. Push the repo to GitHub
2. Import the project in Vercel
3. Set the root directory to `apps/tools`
4. Add all environment variables from `.env.example`
5. Deploy

## 6. Beehiiv (for email list — Week 3-4)

1. Sign up at [beehiiv.com](https://beehiiv.com)
2. Create a publication for Veelogg
3. Save the API key for later ManyChat/n8n integration

## 7. Apify (for trend scraping — Week 2+)

1. Sign up at [apify.com](https://apify.com)
2. Find and save actors for Instagram and TikTok scraping
3. Set up scheduled runs (2x/day)
4. Configure webhook to POST to your n8n `/trends-ingest` endpoint

## 8. ManyChat (Week 3-4)

1. Sign up at [manychat.com](https://manychat.com) and connect your IG account
2. Create a keyword trigger for "BUILD"
3. Set up the flow: auto-reply with toolkit link → capture email → webhook to n8n → Beehiiv + Supabase
