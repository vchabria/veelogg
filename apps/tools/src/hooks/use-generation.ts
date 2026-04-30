"use client";

import { useState } from "react";
import type { Hook, GenerateHooksInput, ScrapeResult } from "@/types/hooks";

interface UseGenerationReturn {
  hooks: Hook[];
  loading: boolean;
  error: string | null;
  remaining: number | null;
  scrapeResults: ScrapeResult[] | null;
  generate: (input: GenerateHooksInput) => Promise<void>;
}

export function useGeneration(): UseGenerationReturn {
  const [hooks, setHooks] = useState<Hook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [scrapeResults, setScrapeResults] = useState<ScrapeResult[] | null>(null);

  async function generate(input: GenerateHooksInput) {
    setLoading(true);
    setError(null);
    setScrapeResults(null);

    try {
      const res = await fetch("/api/generate-hooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
        if (data.remaining !== undefined) setRemaining(data.remaining);
        return;
      }

      setHooks(data.hooks);
      setRemaining(data.remaining);
      if (data.scrapeResults) {
        setScrapeResults(data.scrapeResults);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return { hooks, loading, error, remaining, scrapeResults, generate };
}
