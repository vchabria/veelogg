"use client";

import { Input } from "@/components/ui/input";
import type { ContentPillar } from "@/types/content-strategy";

interface PillarCardProps {
  index: number;
  pillar: ContentPillar;
  onChange: (pillar: ContentPillar) => void;
  onBlur: () => void;
}

export function PillarCard({ index, pillar, onChange, onBlur }: PillarCardProps) {
  function update(field: keyof ContentPillar, value: string) {
    onChange({ ...pillar, [field]: value });
  }

  return (
    <div className="rounded-xl border bg-card p-4 space-y-3">
      <p className="text-sm font-medium text-copper">Pillar {index + 1}</p>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Name</label>
        <Input
          value={pillar.name}
          onChange={(e) => update("name", e.target.value)}
          onBlur={onBlur}
          placeholder="e.g. Behind the Scenes"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Goal</label>
        <Input
          value={pillar.goal}
          onChange={(e) => update("goal", e.target.value)}
          onBlur={onBlur}
          placeholder="What does this pillar achieve?"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Style</label>
        <Input
          value={pillar.style}
          onChange={(e) => update("style", e.target.value)}
          onBlur={onBlur}
          placeholder="e.g. Casual vlog, talking head"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Hook approach</label>
        <Input
          value={pillar.hook}
          onChange={(e) => update("hook", e.target.value)}
          onBlur={onBlur}
          placeholder="How do you grab attention?"
        />
      </div>
    </div>
  );
}
