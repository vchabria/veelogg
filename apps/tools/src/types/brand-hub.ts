export type Platform = "youtube" | "tiktok" | "instagram" | "twitter" | "linkedin" | "other";

export const PLATFORM_LABELS: Record<Platform, string> = {
  youtube: "YouTube",
  tiktok: "TikTok",
  instagram: "Instagram",
  twitter: "Twitter/X",
  linkedin: "LinkedIn",
  other: "Other",
};

export type PaymentStatus = "pending" | "partial" | "paid";
export type DealStatus = "negotiating" | "active" | "completed" | "cancelled";
export type DeliverableStatus = "draft" | "in_review" | "approved" | "posted" | "paid";

// --- Brand Profiles ---

export interface BrandProfile {
  id: string;
  user_id: string;
  name: string;
  niche: string;
  platforms: Platform[];
  voice: string | null;
  audience: string | null;
  instagram_handle: string | null;
  tiktok_handle: string | null;
  content_themes: string[];
  top_performing_patterns: string | null;
  ai_analysis: BrandAnalysis | null;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface BrandProfileInput {
  name: string;
  niche: string;
  platforms: Platform[];
  voice?: string;
  audience?: string;
  instagram_handle?: string;
  tiktok_handle?: string;
  content_themes?: string[];
  top_performing_patterns?: string;
  ai_analysis?: BrandAnalysis;
  is_default?: boolean;
}

// --- AI Brand Analysis (onboarding wizard output) ---

export interface BrandAnalysis {
  niche: string;
  voice: string;
  audience: string;
  contentThemes: string[];
  topPerformingPatterns: string;
  platforms: Platform[];
}

// --- Brand Deals ---

export interface BrandDeal {
  id: string;
  brand_profile_id: string;
  user_id: string;
  company_name: string;
  deal_value: number | null;
  payment_status: PaymentStatus;
  deal_status: DealStatus;
  contact_name: string | null;
  contact_email: string | null;
  start_date: string | null;
  end_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface BrandDealInput {
  brand_profile_id: string;
  company_name: string;
  deal_value?: number | null;
  payment_status?: PaymentStatus;
  deal_status?: DealStatus;
  contact_name?: string;
  contact_email?: string;
  start_date?: string;
  end_date?: string;
  notes?: string;
}

// --- Brand Deliverables ---

export interface BrandDeliverable {
  id: string;
  deal_id: string;
  user_id: string;
  title: string;
  description: string | null;
  platform: Platform | null;
  due_date: string | null;
  status: DeliverableStatus;
  posted_url: string | null;
  notes: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface BrandDeliverableInput {
  deal_id: string;
  title: string;
  description?: string;
  platform?: Platform;
  due_date?: string;
  status?: DeliverableStatus;
  posted_url?: string;
  notes?: string;
  sort_order?: number;
}

// --- Expanded types ---

export interface BrandDealWithDeliverables extends BrandDeal {
  deliverables: BrandDeliverable[];
}

export interface BrandProfileWithDeals extends BrandProfile {
  deals: BrandDealWithDeliverables[];
}

// --- Dashboard ---

export interface BrandDashboardStats {
  totalEarnings: number;
  pendingPayments: number;
  activeDeals: number;
  deliverablesDue: BrandDeliverable[];
}

// --- Content Calendar ---

export type CalendarItemStatus = "idea" | "planned" | "drafted" | "posted";
export type ContentType = "reel" | "story" | "post" | "short" | "video" | "tweet" | "carousel" | "other";
export type CalendarItemSource = "manual" | "ai_suggestion" | "deliverable";

export interface ContentCalendarItem {
  id: string;
  user_id: string;
  brand_profile_id: string;
  title: string;
  description: string | null;
  platform: string | null;
  scheduled_date: string;
  scheduled_time: string | null;
  status: CalendarItemStatus;
  content_type: ContentType | null;
  ai_generated: boolean;
  source: CalendarItemSource;
  deliverable_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContentCalendarItemInput {
  brand_profile_id: string;
  title: string;
  description?: string;
  platform?: string;
  scheduled_date: string;
  scheduled_time?: string;
  status?: CalendarItemStatus;
  content_type?: ContentType;
  ai_generated?: boolean;
  source?: CalendarItemSource;
  deliverable_id?: string;
  notes?: string;
}

// --- Notifications ---

export type NotificationType =
  | "deliverable_due_today"
  | "deliverable_due_tomorrow"
  | "deliverable_overdue"
  | "deal_starting"
  | "deal_ending";

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  reference_type: "deliverable" | "deal" | null;
  reference_id: string | null;
  is_read: boolean;
  created_at: string;
}
