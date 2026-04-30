"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { PlatformPicker } from "@/components/brand-hub/platform-picker";
import type { BrandAnalysis, BrandProfileInput, Platform } from "@/types/brand-hub";

interface WizardStepReviewProps {
  analysis: BrandAnalysis;
  instagramHandle: string;
  tiktokHandle: string;
  postsAnalyzed: number;
  loading: boolean;
  error: string | null;
  onCreateProfile: (input: BrandProfileInput) => void;
  onBack: () => void;
}

export function WizardStepReview({
  analysis,
  instagramHandle,
  tiktokHandle,
  postsAnalyzed,
  loading,
  error,
  onCreateProfile,
  onBack,
}: WizardStepReviewProps) {
  const [name, setName] = useState("");
  const [niche, setNiche] = useState(analysis.niche);
  const [voice, setVoice] = useState(analysis.voice);
  const [audience, setAudience] = useState(analysis.audience);
  const [platforms, setPlatforms] = useState<Platform[]>(analysis.platforms);
  const [contentThemes, setContentThemes] = useState(analysis.contentThemes.join(", "));
  const [topPatterns, setTopPatterns] = useState(analysis.topPerformingPatterns);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !niche.trim()) return;

    const themes = contentThemes
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const input: BrandProfileInput = {
      name: name.trim(),
      niche: niche.trim(),
      platforms,
      voice: voice.trim() || undefined,
      audience: audience.trim() || undefined,
      instagram_handle: instagramHandle || undefined,
      tiktok_handle: tiktokHandle || undefined,
      content_themes: themes,
      top_performing_patterns: topPatterns.trim() || undefined,
      ai_analysis: {
        ...analysis,
        niche: niche.trim(),
        voice: voice.trim(),
        audience: audience.trim(),
        contentThemes: themes,
        topPerformingPatterns: topPatterns.trim(),
        platforms,
      },
    };

    onCreateProfile(input);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-copper" />
          <h2 className="text-2xl font-display font-semibold">Review your brand profile</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          AI analyzed {postsAnalyzed} posts. Edit any field before creating.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* AI-suggested badge */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className="text-xs bg-copper/10 text-copper border-copper/20">
          AI-analyzed
        </Badge>
        {instagramHandle && (
          <Badge variant="secondary" className="text-xs">
            @{instagramHandle.replace(/^@/, "")} (IG)
          </Badge>
        )}
        {tiktokHandle && (
          <Badge variant="secondary" className="text-xs">
            @{tiktokHandle.replace(/^@/, "")} (TT)
          </Badge>
        )}
      </div>

      {/* Name (user must provide) */}
      <div className="space-y-2">
        <label className="text-[13px] font-medium">
          Profile Name <span className="text-destructive">*</span>
        </label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. My Creator Brand"
          required
          className="border-copper/15 focus-visible:ring-copper/30"
        />
      </div>

      {/* Niche (AI pre-filled) */}
      <div className="space-y-2">
        <label className="text-[13px] font-medium">
          Niche <span className="text-destructive">*</span>
        </label>
        <Input
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          required
          className="border-copper/15 focus-visible:ring-copper/30"
        />
      </div>

      {/* Platforms */}
      <div className="space-y-2">
        <label className="text-[13px] font-medium">Platforms</label>
        <PlatformPicker selected={platforms} onChange={setPlatforms} />
      </div>

      {/* Voice */}
      <div className="space-y-2">
        <label className="text-[13px] font-medium">Brand Voice</label>
        <Textarea
          value={voice}
          onChange={(e) => setVoice(e.target.value)}
          rows={2}
          className="text-sm resize-none border-copper/15 focus-visible:ring-copper/30"
        />
      </div>

      {/* Audience */}
      <div className="space-y-2">
        <label className="text-[13px] font-medium">Target Audience</label>
        <Textarea
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          rows={2}
          className="text-sm resize-none border-copper/15 focus-visible:ring-copper/30"
        />
      </div>

      {/* Content Themes */}
      <div className="space-y-2">
        <label className="text-[13px] font-medium">Content Themes</label>
        <Input
          value={contentThemes}
          onChange={(e) => setContentThemes(e.target.value)}
          placeholder="comma-separated themes"
          className="border-copper/15 focus-visible:ring-copper/30"
        />
        <p className="text-xs text-muted-foreground">Separate themes with commas</p>
      </div>

      {/* Top patterns */}
      <div className="space-y-2">
        <label className="text-[13px] font-medium">Top-performing Patterns</label>
        <Textarea
          value={topPatterns}
          onChange={(e) => setTopPatterns(e.target.value)}
          rows={2}
          className="text-sm resize-none border-copper/15 focus-visible:ring-copper/30"
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button
          type="submit"
          disabled={loading || !name.trim() || !niche.trim()}
          className="bg-copper text-white hover:bg-copper/90"
        >
          {loading ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Creating...
            </>
          ) : (
            "Create Profile"
          )}
        </Button>
        <Button type="button" variant="ghost" onClick={onBack} disabled={loading}>
          Back
        </Button>
      </div>
    </form>
  );
}
