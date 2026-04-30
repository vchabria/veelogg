"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function UpgradeBanner() {
  return (
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
      <p className="text-sm font-medium">You&apos;ve hit your daily limit</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Upgrade to Pro for unlimited generations across all tools.
      </p>
      <Button size="sm" className="mt-3" asChild>
        <Link href="/pricing">Upgrade to Pro &mdash; $19/mo</Link>
      </Button>
    </div>
  );
}
