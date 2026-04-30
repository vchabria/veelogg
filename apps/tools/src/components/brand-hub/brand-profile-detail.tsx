"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ArrowLeft, Pencil, Trash2, Plus } from "lucide-react";
import { useBrandProfiles, useBrandDeals } from "@/hooks/use-brand-hub";
import { BrandDealCard } from "@/components/brand-hub/brand-deal-card";
import { BrandDealForm } from "@/components/brand-hub/brand-deal-form";
import type { BrandProfileInput, BrandDealInput, Platform } from "@/types/brand-hub";

interface BrandProfileDetailProps {
  profileId: string;
  onBack: () => void;
  onSelectDeal: (dealId: string) => void;
}

const allPlatforms: Platform[] = ["youtube", "tiktok", "instagram", "twitter", "linkedin", "other"];

const platformLabels: Record<Platform, string> = {
  youtube: "YouTube",
  tiktok: "TikTok",
  instagram: "Instagram",
  twitter: "Twitter",
  linkedin: "LinkedIn",
  other: "Other",
};

const selectClassName =
  "flex h-10 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function BrandProfileDetail({
  profileId,
  onBack,
  onSelectDeal,
}: BrandProfileDetailProps) {
  const {
    profiles,
    loading: profilesLoading,
    updateProfile,
    deleteProfile,
  } = useBrandProfiles();

  const {
    deals,
    loading: dealsLoading,
    createDeal,
  } = useBrandDeals(profileId);

  const [isEditing, setIsEditing] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [showNewDealForm, setShowNewDealForm] = useState(false);
  const [newDealLoading, setNewDealLoading] = useState(false);

  // Edit form state
  const profile = profiles.find((p) => p.id === profileId);

  const [editName, setEditName] = useState("");
  const [editNiche, setEditNiche] = useState("");
  const [editPlatforms, setEditPlatforms] = useState<Platform[]>([]);
  const [editVoice, setEditVoice] = useState("");
  const [editAudience, setEditAudience] = useState("");

  function startEditing() {
    if (!profile) return;
    setEditName(profile.name);
    setEditNiche(profile.niche);
    setEditPlatforms([...profile.platforms]);
    setEditVoice(profile.voice ?? "");
    setEditAudience(profile.audience ?? "");
    setIsEditing(true);
  }

  function togglePlatform(platform: Platform) {
    setEditPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  }

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!editName.trim() || !editNiche.trim() || editPlatforms.length === 0) return;

    setEditLoading(true);
    try {
      const input: Partial<BrandProfileInput> = {
        name: editName.trim(),
        niche: editNiche.trim(),
        platforms: editPlatforms,
        voice: editVoice.trim() || undefined,
        audience: editAudience.trim() || undefined,
      };
      await updateProfile(profileId, input);
      setIsEditing(false);
    } catch {
      // error is handled by the hook
    } finally {
      setEditLoading(false);
    }
  }

  async function handleDeleteProfile() {
    if (!window.confirm("Are you sure you want to delete this profile? This will also delete all associated deals and deliverables.")) {
      return;
    }
    try {
      await deleteProfile(profileId);
      onBack();
    } catch {
      // error is handled by the hook
    }
  }

  async function handleCreateDeal(input: BrandDealInput) {
    setNewDealLoading(true);
    try {
      await createDeal(input);
      setShowNewDealForm(false);
    } catch {
      // error is handled by the hook
    } finally {
      setNewDealLoading(false);
    }
  }

  if (profilesLoading) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          Loading profile...
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          Profile not found.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Button variant="ghost" size="sm" onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      {/* Profile header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h1 className="font-display text-3xl font-bold tracking-tight">
                {profile.name}
              </h1>
              <p className="text-muted-foreground">{profile.niche}</p>
            </div>
            {!isEditing && (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={startEditing}>
                  <Pencil className="mr-2 h-3.5 w-3.5" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={handleDeleteProfile}>
                  <Trash2 className="mr-2 h-3.5 w-3.5" />
                  Delete
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent>
          {isEditing ? (
            /* Inline edit form */
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="edit_name" className="text-sm font-medium">
                  Profile Name <span className="text-destructive">*</span>
                </label>
                <Input
                  id="edit_name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="edit_niche" className="text-sm font-medium">
                  Niche <span className="text-destructive">*</span>
                </label>
                <Input
                  id="edit_niche"
                  value={editNiche}
                  onChange={(e) => setEditNiche(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Platforms <span className="text-destructive">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {allPlatforms.map((platform) => (
                    <button
                      key={platform}
                      type="button"
                      onClick={() => togglePlatform(platform)}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                        editPlatforms.includes(platform)
                          ? "border-copper bg-copper text-white"
                          : "border-input bg-background hover:bg-muted"
                      )}
                    >
                      {platformLabels[platform]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="edit_voice" className="text-sm font-medium">
                  Voice{" "}
                  <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <Input
                  id="edit_voice"
                  placeholder="e.g. Casual, witty, educational"
                  value={editVoice}
                  onChange={(e) => setEditVoice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="edit_audience" className="text-sm font-medium">
                  Audience{" "}
                  <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <Textarea
                  id="edit_audience"
                  placeholder="e.g. Women 18-34 interested in fitness and wellness"
                  value={editAudience}
                  onChange={(e) => setEditAudience(e.target.value)}
                  rows={2}
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={
                    editLoading ||
                    !editName.trim() ||
                    !editNiche.trim() ||
                    editPlatforms.length === 0
                  }
                >
                  {editLoading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsEditing(false)}
                  disabled={editLoading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            /* Display mode */
            <div className="space-y-4">
              {/* Platform badges */}
              <div className="flex flex-wrap gap-2">
                {profile.platforms.map((platform) => (
                  <Badge key={platform} variant="secondary">
                    {platformLabels[platform]}
                  </Badge>
                ))}
              </div>

              {profile.voice && (
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Voice: </span>
                  <span className="text-sm">{profile.voice}</span>
                </div>
              )}

              {profile.audience && (
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Audience: </span>
                  <span className="text-sm">{profile.audience}</span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Deals section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Deals</h2>
          {!showNewDealForm && (
            <Button size="sm" onClick={() => setShowNewDealForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Deal
            </Button>
          )}
        </div>

        {/* Inline new deal form */}
        {showNewDealForm && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">New Deal</CardTitle>
            </CardHeader>
            <CardContent>
              <BrandDealForm
                profileId={profileId}
                onSubmit={handleCreateDeal}
                onCancel={() => setShowNewDealForm(false)}
                loading={newDealLoading}
              />
            </CardContent>
          </Card>
        )}

        {/* Deals grid */}
        {dealsLoading ? (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            Loading deals...
          </div>
        ) : deals.length === 0 ? (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            No deals yet. Create your first deal to get started.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
    </div>
  );
}
