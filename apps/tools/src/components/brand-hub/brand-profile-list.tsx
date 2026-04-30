"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { BrandProfileCard } from "./brand-profile-card";
import { BrandProfileForm } from "./brand-profile-form";
import type { BrandProfile, BrandProfileInput } from "@/types/brand-hub";

interface BrandProfileListProps {
  profiles: BrandProfile[];
  deals: { brand_profile_id: string }[];
  onSelectProfile: (profileId: string) => void;
  onCreateProfile: (input: BrandProfileInput) => Promise<void>;
  /** When true, "Create new" card triggers the onboarding wizard instead of inline form */
  useWizard?: boolean;
}

export function BrandProfileList({
  profiles,
  deals,
  onSelectProfile,
  onCreateProfile,
  useWizard = false,
}: BrandProfileListProps) {
  const [showForm, setShowForm] = useState(false);
  const [creating, setCreating] = useState(false);

  function dealCountFor(profileId: string): number {
    return deals.filter((d) => d.brand_profile_id === profileId).length;
  }

  async function handleCreate(input: BrandProfileInput) {
    setCreating(true);
    try {
      await onCreateProfile(input);
      setShowForm(false);
    } finally {
      setCreating(false);
    }
  }

  function handleCreateClick() {
    if (useWizard) {
      // Trigger wizard — onCreateProfile is called with empty input as a signal
      onCreateProfile({} as BrandProfileInput);
    } else {
      setShowForm(true);
    }
  }

  return (
    <div className="space-y-6">
      {/* Grid of profile cards + create card */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profiles.map((profile) => (
          <BrandProfileCard
            key={profile.id}
            profile={profile}
            dealCount={dealCountFor(profile.id)}
            onClick={() => onSelectProfile(profile.id)}
          />
        ))}

        {/* Create new profile card */}
        {!showForm && (
          <Card
            role="button"
            tabIndex={0}
            onClick={handleCreateClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleCreateClick();
              }
            }}
            className={cn(
              "cursor-pointer border-2 border-dashed border-copper/20",
              "bg-transparent transition-all duration-200",
              "hover:border-copper/40 hover:bg-copper/5 hover:shadow-warm-lg hover:-translate-y-0.5"
            )}
          >
            <CardContent className="flex h-full min-h-[140px] flex-col items-center justify-center gap-2 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-copper/10">
                <Plus className="h-5 w-5 text-copper" />
              </div>
              <span className="text-sm font-medium text-copper">
                Create new profile
              </span>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Inline create form (non-wizard mode) */}
      {showForm && !useWizard && (
        <BrandProfileForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
          loading={creating}
        />
      )}
    </div>
  );
}
