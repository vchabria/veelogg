"use client";

import { useState } from "react";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface WizardStepHandlesProps {
  instagramHandle: string;
  tiktokHandle: string;
  onChangeHandles: (ig: string, tt: string) => void;
  onAnalyze: () => void;
  onCancel: () => void;
  error: string | null;
}

export function WizardStepHandles({
  instagramHandle,
  tiktokHandle,
  onChangeHandles,
  onAnalyze,
  onCancel,
  error,
}: WizardStepHandlesProps) {
  const [ig, setIg] = useState(instagramHandle);
  const [tt, setTt] = useState(tiktokHandle);

  const hasHandle = ig.trim().length > 0 || tt.trim().length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onChangeHandles(ig.trim(), tt.trim());
    // Small delay to let state propagate
    setTimeout(onAnalyze, 0);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-display font-semibold">Connect your socials</h2>
        <p className="text-sm text-muted-foreground">
          Enter at least one handle. We&apos;ll scrape your top posts and use AI to analyze your brand identity.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[13px] font-medium">
            <Instagram className="h-4 w-4" />
            Instagram handle
          </label>
          <Input
            value={ig}
            onChange={(e) => setIg(e.target.value)}
            placeholder="@yourhandle"
            className="border-copper/15 focus-visible:ring-copper/30"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[13px] font-medium">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z" />
            </svg>
            TikTok handle
          </label>
          <Input
            value={tt}
            onChange={(e) => setTt(e.target.value)}
            placeholder="@yourhandle"
            className="border-copper/15 focus-visible:ring-copper/30"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button
          type="submit"
          disabled={!hasHandle}
          className="bg-copper text-white hover:bg-copper/90"
        >
          Analyze My Brand
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
