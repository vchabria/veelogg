"use client";

import { useGeneration } from "@/hooks/use-generation";
import { useUsage } from "@/hooks/use-usage";
import { HookForm } from "@/components/hook-generator/hook-form";
import { HookResults } from "@/components/hook-generator/hook-results";
import { UsageMeter } from "@/components/billing/usage-meter";
import type { ScrapeResult } from "@/types/hooks";

function ScrapeStatusBanner({ results }: { results: ScrapeResult[] }) {
  if (results.length === 0) return null;

  return (
    <div className="space-y-1.5">
      {results.map((r) => (
        <div
          key={r.platform}
          className={`rounded-xl border px-4 py-2.5 text-sm ${
            r.status === "success"
              ? "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200"
              : "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200"
          }`}
        >
          {r.status === "success" ? (
            <>
              Analyzed {r.postsAnalyzed} top {r.platform === "instagram" ? "Instagram" : "TikTok"} posts from @{r.handle}
            </>
          ) : (
            <>
              Could not scrape {r.platform === "instagram" ? "Instagram" : "TikTok"} @{r.handle}
              {r.error ? ` — ${r.error}` : ""}. Generated hooks without voice matching.
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default function HookGeneratorPage() {
  const { hooks, loading, error, scrapeResults, generate } = useGeneration();
  const { usage } = useUsage("hook-generator");

  const isAtLimit = usage?.plan === "free" && usage.remaining === 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display">Hook Generator</h1>
        <p className="mt-2 text-muted-foreground">
          Generate 20 scroll-stopping hooks using 10 proven frameworks. Enter your niche
          and topic to get started.
        </p>
      </div>

      <UsageMeter />

      <HookForm onSubmit={generate} loading={loading} disabled={isAtLimit} />

      {error && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {scrapeResults && <ScrapeStatusBanner results={scrapeResults} />}

      <HookResults hooks={hooks} />
    </div>
  );
}
