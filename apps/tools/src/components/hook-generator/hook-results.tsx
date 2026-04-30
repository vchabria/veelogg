"use client";

import { useState } from "react";
import { HookCard } from "./hook-card";
import { HookTypeFilter } from "./hook-type-filter";
import type { Hook, HookType } from "@/types/hooks";

export function HookResults({ hooks }: { hooks: Hook[] }) {
  const [filter, setFilter] = useState<HookType | null>(null);

  if (hooks.length === 0) return null;

  const filtered = filter ? hooks.filter((h) => h.type === filter) : hooks;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-display">
          Your Hooks ({filtered.length})
        </h2>
      </div>
      <HookTypeFilter selected={filter} onSelect={setFilter} />
      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((hook, i) => (
          <HookCard key={i} hook={hook} />
        ))}
      </div>
    </div>
  );
}
