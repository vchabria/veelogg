"use client";

import { DollarSign, Clock, Briefcase } from "lucide-react";
import { useBrandProfiles, useBrandDeals, useBrandDashboard } from "@/hooks/use-brand-hub";
import { StatsCard } from "./stats-card";
import { BrandProfileList } from "./brand-profile-list";
import { UpcomingDeliverables } from "./upcoming-deliverables";
import type { BrandProfileInput } from "@/types/brand-hub";

interface BrandDashboardProps {
  onSelectProfile: (profileId: string) => void;
}

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function BrandDashboard({ onSelectProfile }: BrandDashboardProps) {
  const { profiles, loading: profilesLoading, createProfile } = useBrandProfiles();
  const { deals, loading: dealsLoading } = useBrandDeals();
  const { stats, loading: statsLoading } = useBrandDashboard();

  const loading = profilesLoading || dealsLoading || statsLoading;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-copper border-t-transparent" />
      </div>
    );
  }

  async function handleCreateProfile(input: BrandProfileInput) {
    await createProfile(input);
  }

  return (
    <div className="space-y-10">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-display">Brand Hub</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track your brand deals, deliverables, and earnings in one place.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-3">
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

      {/* Brand profiles */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Your Profiles</h2>
        <BrandProfileList
          profiles={profiles}
          deals={deals}
          onSelectProfile={onSelectProfile}
          onCreateProfile={handleCreateProfile}
        />
      </div>

      {/* Upcoming deliverables */}
      {stats?.deliverablesDue && (
        <UpcomingDeliverables deliverables={stats.deliverablesDue} />
      )}
    </div>
  );
}
