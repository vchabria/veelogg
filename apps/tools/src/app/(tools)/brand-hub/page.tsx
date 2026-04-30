"use client";

import { useCallback, useState } from "react";
import { ArrowLeft, DollarSign, Clock, Briefcase, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBrandProfiles, useBrandDeals, useBrandDashboard } from "@/hooks/use-brand-hub";
import { BrandProfileList } from "@/components/brand-hub/brand-profile-list";
import { ProfileHubHeader } from "@/components/brand-hub/profile-hub-header";
import { ProfileHubLayout, type HubTab } from "@/components/brand-hub/profile-hub-layout";
import { StatsCard } from "@/components/brand-hub/stats-card";
import { UpcomingDeliverables } from "@/components/brand-hub/upcoming-deliverables";
import { BrandDealCard } from "@/components/brand-hub/brand-deal-card";
import { BrandDealForm } from "@/components/brand-hub/brand-deal-form";
import { BrandProfileDetail } from "@/components/brand-hub/brand-profile-detail";
import { DealDetailView } from "@/components/brand-hub/deal-detail-view";
import { HubToolsGrid } from "@/components/brand-hub/hub-tools-grid";
import { OnboardingWizard } from "@/components/brand-hub/onboarding/onboarding-wizard";
import { ContentCalendarTab } from "@/components/brand-hub/calendar/calendar-month-view";
import type { BrandDealInput, BrandProfile } from "@/types/brand-hub";

type View =
  | { type: "profile-select" }
  | { type: "hub"; profileId: string; tab: HubTab }
  | { type: "deal-detail"; profileId: string; dealId: string }
  | { type: "onboarding-wizard" }
  | { type: "edit-profile"; profileId: string };

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export default function BrandHubPage() {
  const [view, setView] = useState<View>({ type: "profile-select" });

  const { profiles, loading: profilesLoading, createProfile, refetch: refetchProfiles } = useBrandProfiles();

  const handleSelectProfile = useCallback((profileId: string) => {
    setView({ type: "hub", profileId, tab: "overview" });
  }, []);

  const handleWizardComplete = useCallback((profile: BrandProfile) => {
    refetchProfiles();
    setView({ type: "hub", profileId: profile.id, tab: "overview" });
  }, [refetchProfiles]);

  const handleBackToSelect = useCallback(() => {
    setView({ type: "profile-select" });
  }, []);

  // ── Profile Select View ──
  if (view.type === "profile-select") {
    return (
      <div className="space-y-10">
        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-copper/60">
            YOUR PROFILES
          </p>
          <h1 className="text-3xl font-display">Brand Hub</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Pick a brand profile to manage deals, calendar, and tools.
          </p>
        </div>

        {profilesLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-copper border-t-transparent" />
          </div>
        ) : (
          <BrandProfileList
            profiles={profiles}
            deals={[]}
            onSelectProfile={handleSelectProfile}
            onCreateProfile={async () => setView({ type: "onboarding-wizard" })}
            useWizard
          />
        )}
      </div>
    );
  }

  // ── Onboarding Wizard View ──
  if (view.type === "onboarding-wizard") {
    return (
      <div className="space-y-6">
        <Button variant="ghost" size="sm" onClick={handleBackToSelect}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <OnboardingWizard
          onComplete={handleWizardComplete}
          onCancel={handleBackToSelect}
        />
      </div>
    );
  }

  // ── Edit Profile View ──
  if (view.type === "edit-profile") {
    return (
      <BrandProfileDetail
        profileId={view.profileId}
        onBack={() => setView({ type: "hub", profileId: view.profileId, tab: "overview" })}
        onSelectDeal={(dealId) =>
          setView({ type: "deal-detail", profileId: view.profileId, dealId })
        }
      />
    );
  }

  // ── Deal Detail View ──
  if (view.type === "deal-detail") {
    return (
      <DealDetailView
        dealId={view.dealId}
        profileId={view.profileId}
        onBack={() => setView({ type: "hub", profileId: view.profileId, tab: "deals" })}
      />
    );
  }

  // ── Hub View (with tabs) ──
  const profile = profiles.find((p) => p.id === view.profileId);

  if (profilesLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-copper border-t-transparent" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" onClick={handleBackToSelect}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <p className="text-sm text-muted-foreground">Profile not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Back to profiles */}
      <Button variant="ghost" size="sm" onClick={handleBackToSelect}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        All Profiles
      </Button>

      {/* Profile header with switcher */}
      <ProfileHubHeader
        profile={profile}
        profiles={profiles}
        onSwitchProfile={handleSelectProfile}
        onEdit={() => setView({ type: "edit-profile", profileId: profile.id })}
      />

      {/* Tabs */}
      <ProfileHubLayout
        activeTab={view.tab}
        onTabChange={(tab) =>
          setView({ type: "hub", profileId: profile.id, tab })
        }
      >
        {view.tab === "overview" && (
          <HubOverviewTab profileId={profile.id} />
        )}
        {view.tab === "deals" && (
          <HubDealsTab
            profileId={profile.id}
            onSelectDeal={(dealId) =>
              setView({ type: "deal-detail", profileId: profile.id, dealId })
            }
          />
        )}
        {view.tab === "calendar" && (
          <ContentCalendarTab profileId={profile.id} />
        )}
        {view.tab === "tools" && (
          <HubToolsGrid profileId={profile.id} />
        )}
      </ProfileHubLayout>
    </div>
  );
}

// ── Overview Tab ──
function HubOverviewTab({ profileId }: { profileId: string }) {
  const { stats, loading } = useBrandDashboard(profileId);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-copper border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="grid gap-5 sm:grid-cols-3">
        <StatsCard
          icon={<DollarSign className="h-5 w-5 text-copper" />}
          value={formatCurrency(stats?.totalEarnings ?? 0)}
          label="Total Earned"
        />
        <StatsCard
          icon={<Clock className="h-5 w-5 text-copper" />}
          value={formatCurrency(stats?.pendingPayments ?? 0)}
          label="Pending Payments"
        />
        <StatsCard
          icon={<Briefcase className="h-5 w-5 text-copper" />}
          value={String(stats?.activeDeals ?? 0)}
          label="Active Deals"
        />
      </div>

      {stats?.deliverablesDue && (
        <UpcomingDeliverables deliverables={stats.deliverablesDue} />
      )}
    </div>
  );
}

// ── Deals Tab ──
function HubDealsTab({
  profileId,
  onSelectDeal,
}: {
  profileId: string;
  onSelectDeal: (dealId: string) => void;
}) {
  const { deals, loading, createDeal } = useBrandDeals(profileId);
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  async function handleCreateDeal(input: BrandDealInput) {
    setFormLoading(true);
    try {
      await createDeal(input);
      setShowForm(false);
    } finally {
      setFormLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-copper border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-copper/60">
          {deals.length} {deals.length === 1 ? "deal" : "deals"}
        </p>
        {!showForm && (
          <Button size="sm" onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Deal
          </Button>
        )}
      </div>

      {showForm && (
        <BrandDealForm
          profileId={profileId}
          onSubmit={handleCreateDeal}
          onCancel={() => setShowForm(false)}
          loading={formLoading}
        />
      )}

      {deals.length === 0 && !showForm ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No deals yet. Create your first deal to get started.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {deals.map((deal) => (
            <BrandDealCard
              key={deal.id}
              deal={deal}
              onClick={() => onSelectDeal(deal.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
