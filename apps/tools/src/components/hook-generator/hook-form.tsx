"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Zap, ChevronDown, ChevronUp, Instagram } from "lucide-react";
import type { GenerateHooksInput } from "@/types/hooks";

interface HookFormProps {
  onSubmit: (input: GenerateHooksInput) => void;
  loading: boolean;
  disabled: boolean;
  hasSocialHandles?: boolean;
}

export function HookForm({ onSubmit, loading, disabled, hasSocialHandles }: HookFormProps) {
  const [niche, setNiche] = useState("");
  const [product, setProduct] = useState("");
  const [tone, setTone] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [tiktokHandle, setTiktokHandle] = useState("");
  const [showSocials, setShowSocials] = useState(false);

  const willScrape = !!(instagramHandle.trim() || tiktokHandle.trim());

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!niche.trim() || !product.trim()) return;
    onSubmit({
      niche: niche.trim(),
      product: product.trim(),
      tone: tone.trim() || undefined,
      instagramHandle: instagramHandle.trim() || undefined,
      tiktokHandle: tiktokHandle.trim() || undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="niche" className="text-sm font-medium">
          Niche
        </label>
        <Input
          id="niche"
          placeholder="e.g. Fitness, SaaS, Beauty, Finance"
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="product" className="text-sm font-medium">
          Product or Topic
        </label>
        <Textarea
          id="product"
          placeholder="e.g. My online coaching program for busy moms who want to lose weight"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          required
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="tone" className="text-sm font-medium">
          Tone{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <Input
          id="tone"
          placeholder="e.g. Sarcastic, Professional, Gen Z, Motivational"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        />
      </div>

      {/* Collapsible social handles section */}
      <div className="rounded-2xl border border-border">
        <button
          type="button"
          onClick={() => setShowSocials(!showSocials)}
          className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium hover:bg-muted/50 transition-colors"
        >
          <span>
            Personalize with your socials{" "}
            <span className="text-muted-foreground font-normal">(optional)</span>
          </span>
          {showSocials ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
        {showSocials && (
          <div className="space-y-3 border-t border-border px-4 py-3">
            <p className="text-xs text-muted-foreground">
              Add your handles and we&apos;ll analyze your top posts to match your voice.
            </p>
            <div className="space-y-2">
              <label htmlFor="instagram" className="flex items-center gap-1.5 text-sm font-medium">
                <Instagram className="h-3.5 w-3.5" />
                Instagram
              </label>
              <Input
                id="instagram"
                placeholder="@yourhandle"
                value={instagramHandle}
                onChange={(e) => setInstagramHandle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="tiktok" className="flex items-center gap-1.5 text-sm font-medium">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.52a8.27 8.27 0 0 0 4.76 1.5V6.69h-1z" />
                </svg>
                TikTok
              </label>
              <Input
                id="tiktok"
                placeholder="@yourhandle"
                value={tiktokHandle}
                onChange={(e) => setTiktokHandle(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={loading || disabled}>
        {loading ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            {willScrape ? "Analyzing your content & generating..." : "Generating..."}
          </>
        ) : (
          <>
            <Zap className="mr-2 h-4 w-4" />
            Generate 20 Hooks
          </>
        )}
      </Button>
    </form>
  );
}
