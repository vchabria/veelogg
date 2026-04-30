"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlatformPicker } from "./platform-picker";
import type { BrandProfile, BrandProfileInput, Platform } from "@/types/brand-hub";

interface BrandProfileFormProps {
  profile?: BrandProfile;
  onSubmit: (input: BrandProfileInput) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export function BrandProfileForm({
  profile,
  onSubmit,
  onCancel,
  loading = false,
}: BrandProfileFormProps) {
  const isEdit = !!profile;

  const [name, setName] = useState(profile?.name ?? "");
  const [niche, setNiche] = useState(profile?.niche ?? "");
  const [platforms, setPlatforms] = useState<Platform[]>(profile?.platforms ?? []);
  const [voice, setVoice] = useState(profile?.voice ?? "");
  const [audience, setAudience] = useState(profile?.audience ?? "");
  const [isDefault, setIsDefault] = useState(profile?.is_default ?? false);

  useEffect(() => {
    setName(profile?.name ?? "");
    setNiche(profile?.niche ?? "");
    setPlatforms(profile?.platforms ?? []);
    setVoice(profile?.voice ?? "");
    setAudience(profile?.audience ?? "");
    setIsDefault(profile?.is_default ?? false);
  }, [profile]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const input: BrandProfileInput = {
      name: name.trim(),
      niche: niche.trim(),
      platforms,
      ...(voice.trim() && { voice: voice.trim() }),
      ...(audience.trim() && { audience: audience.trim() }),
      is_default: isDefault,
    };

    await onSubmit(input);
  }

  const canSubmit = name.trim().length > 0 && niche.trim().length > 0;

  return (
    <Card className="border-0 shadow-warm">
      <CardHeader className="p-7 pb-4">
        <CardTitle className="text-base">
          {isEdit ? "Edit Profile" : "New Brand Profile"}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-7 pb-7">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-[12px] font-medium text-muted-foreground">
              Brand / channel name <span className="text-destructive">*</span>
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. My YouTube Channel"
              required
              className="border-copper/15 focus-visible:ring-copper/30"
            />
          </div>

          {/* Niche */}
          <div className="space-y-2">
            <label className="text-[12px] font-medium text-muted-foreground">
              Niche <span className="text-destructive">*</span>
            </label>
            <Input
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="e.g. Tech reviews, Lifestyle vlogging"
              required
              className="border-copper/15 focus-visible:ring-copper/30"
            />
          </div>

          {/* Platforms */}
          <div className="space-y-2">
            <label className="text-[12px] font-medium text-muted-foreground">
              Platforms
            </label>
            <PlatformPicker selected={platforms} onChange={setPlatforms} />
          </div>

          {/* Voice */}
          <div className="space-y-2">
            <label className="text-[12px] font-medium text-muted-foreground">
              Brand voice
            </label>
            <Textarea
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
              placeholder="How does your brand sound? e.g. Casual & witty, Professional & authoritative"
              rows={3}
              className="text-sm leading-relaxed resize-none border-copper/15 focus-visible:ring-copper/30"
            />
          </div>

          {/* Audience */}
          <div className="space-y-2">
            <label className="text-[12px] font-medium text-muted-foreground">
              Target audience
            </label>
            <Textarea
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="Who are you creating for? e.g. 18-35 year olds interested in personal finance"
              rows={3}
              className="text-sm leading-relaxed resize-none border-copper/15 focus-visible:ring-copper/30"
            />
          </div>

          {/* Default checkbox */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className={cn(
                "h-4 w-4 rounded border-copper/30 text-copper focus:ring-copper/30"
              )}
            />
            <span className="text-sm text-foreground">
              Set as default profile
            </span>
          </label>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              type="submit"
              disabled={!canSubmit || loading}
              className="bg-copper text-white hover:bg-copper/90"
            >
              {loading
                ? "Saving..."
                : isEdit
                  ? "Save Changes"
                  : "Create Profile"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
