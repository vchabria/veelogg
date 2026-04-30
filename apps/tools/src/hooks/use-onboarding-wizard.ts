"use client";

import { useCallback, useState } from "react";
import type { BrandAnalysis, BrandProfileInput, BrandProfile, Platform } from "@/types/brand-hub";

export type WizardStep = "handles" | "scraping" | "review";

interface ScrapeResult {
  platform: string;
  handle: string;
  postsAnalyzed: number;
  status: string;
  error?: string;
}

interface WizardState {
  step: WizardStep;
  instagramHandle: string;
  tiktokHandle: string;
  analysis: BrandAnalysis | null;
  scrapeResults: ScrapeResult[];
  postsAnalyzed: number;
  error: string | null;
  loading: boolean;
}

export function useOnboardingWizard(
  onComplete: (profile: BrandProfile) => void
) {
  const [state, setState] = useState<WizardState>({
    step: "handles",
    instagramHandle: "",
    tiktokHandle: "",
    analysis: null,
    scrapeResults: [],
    postsAnalyzed: 0,
    error: null,
    loading: false,
  });

  const setHandles = useCallback((ig: string, tt: string) => {
    setState((s) => ({ ...s, instagramHandle: ig, tiktokHandle: tt }));
  }, []);

  const analyze = useCallback(async () => {
    const { instagramHandle, tiktokHandle } = state;
    if (!instagramHandle && !tiktokHandle) {
      setState((s) => ({ ...s, error: "Enter at least one handle" }));
      return;
    }

    setState((s) => ({ ...s, step: "scraping", error: null, loading: true }));

    try {
      const res = await fetch("/api/brand-hub/profiles/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instagram_handle: instagramHandle || undefined,
          tiktok_handle: tiktokHandle || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setState((s) => ({
          ...s,
          step: "handles",
          error: data.error ?? "Analysis failed",
          loading: false,
          scrapeResults: data.scrapeResults ?? [],
        }));
        return;
      }

      setState((s) => ({
        ...s,
        step: "review",
        analysis: data.analysis,
        scrapeResults: data.scrapeResults ?? [],
        postsAnalyzed: data.postsAnalyzed ?? 0,
        loading: false,
      }));
    } catch {
      setState((s) => ({
        ...s,
        step: "handles",
        error: "Network error — please try again",
        loading: false,
      }));
    }
  }, [state.instagramHandle, state.tiktokHandle]);

  const createProfile = useCallback(
    async (input: BrandProfileInput) => {
      setState((s) => ({ ...s, loading: true, error: null }));
      try {
        const res = await fetch("/api/brand-hub/profiles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setState((s) => ({ ...s, loading: false }));
        onComplete(data.profile);
      } catch (err) {
        setState((s) => ({
          ...s,
          loading: false,
          error: err instanceof Error ? err.message : "Failed to create profile",
        }));
      }
    },
    [onComplete]
  );

  const reset = useCallback(() => {
    setState({
      step: "handles",
      instagramHandle: "",
      tiktokHandle: "",
      analysis: null,
      scrapeResults: [],
      postsAnalyzed: 0,
      error: null,
      loading: false,
    });
  }, []);

  const goBack = useCallback(() => {
    setState((s) => {
      if (s.step === "review") return { ...s, step: "handles" };
      return s;
    });
  }, []);

  return {
    ...state,
    setHandles,
    analyze,
    createProfile,
    reset,
    goBack,
  };
}
