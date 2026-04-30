"use client";

import { Input } from "@/components/ui/input";
import type { ContentPillar } from "@/types/content-strategy";

interface PillarCardProps {
  index: number;
  pillar: ContentPillar;
  onChange: (pillar: ContentPillar) => void;
  onBlur: () => void;
}

const PILLAR_LABELS = ["One", "Two", "Three"];

export function PillarCard({ index, pillar, onChange, onBlur }: PillarCardProps) {
  function update(field: keyof ContentPillar, value: string) {
    onChange({ ...pillar, [field]: value });
  }

  const hasFill = !!(pillar.name || pillar.goal || pillar.style || pillar.hook);

  return (
    <div
      className={`rounded-xl border p-4 space-y-3 transition-all duration-200 ${
        hasFill
          ? "border-copper/20 bg-gradient-to-br from-card to-butter/5 shadow-sm"
          : "bg-card hover:border-copper/15"
      }`}
    >
      <div className="flex items-center gap-2">
        <div
          className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-medium ${
            hasFill ? "bg-copper text-white" : "bg-secondary text-muted-foreground"
          }`}
        >
          {index + 1}
        </div>
        <p className="text-sm font-medium font-display">
          Pillar {PILLAR_LABELS[index]}
        </p>
      </div>

      <div className="space-y-2.5">
        <div className="space-y-1">
          <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Name
          </label>
          <Input
            value={pillar.name}
            onChange={(e) => update("name", e.target.value)}
            onBlur={onBlur}
            placeholder="e.g. Behind the Scenes"
            className="h-8 text-sm border-copper/15 focus-visible:ring-copper/30"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Goal
          </label>
          <Input
            value={pillar.goal}
            onChange={(e) => update("goal", e.target.value)}
            onBlur={onBlur}
            placeholder="What does this pillar achieve?"
            className="h-8 text-sm border-copper/15 focus-visible:ring-copper/30"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Style
          </label>
          <Input
            value={pillar.style}
            onChange={(e) => update("style", e.target.value)}
            onBlur={onBlur}
            placeholder="e.g. Casual vlog, talking head"
            className="h-8 text-sm border-copper/15 focus-visible:ring-copper/30"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Hook approach
          </label>
          <Input
            value={pillar.hook}
            onChange={(e) => update("hook", e.target.value)}
            onBlur={onBlur}
            placeholder="How do you grab attention?"
            className="h-8 text-sm border-copper/15 focus-visible:ring-copper/30"
          />
        </div>
      </div>
    </div>
  );
}
