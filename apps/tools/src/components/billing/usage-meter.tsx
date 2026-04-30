"use client";

import { useUsage } from "@/hooks/use-usage";
import { Badge } from "@/components/ui/badge";
import { UpgradeBanner } from "./upgrade-banner";

export function UsageMeter() {
  const { usage, loading } = useUsage("hook-generator");

  if (loading || !usage) return null;

  if (usage.plan === "pro") {
    return (
      <div className="flex items-center gap-2">
        <Badge>PRO</Badge>
        <span className="text-sm text-muted-foreground">Unlimited generations</span>
      </div>
    );
  }

  const pct = Math.round((usage.used / usage.limit) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {usage.remaining} of {usage.limit} generations left today
        </span>
        <Badge variant="secondary">FREE</Badge>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      {usage.remaining === 0 && <UpgradeBanner />}
    </div>
  );
}
