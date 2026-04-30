"use client";

import { HOOK_TYPES } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { HookType } from "@/types/hooks";

interface HookTypeFilterProps {
  selected: HookType | null;
  onSelect: (type: HookType | null) => void;
}

export function HookTypeFilter({ selected, onSelect }: HookTypeFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge
        variant={selected === null ? "default" : "secondary"}
        className="cursor-pointer"
        onClick={() => onSelect(null)}
      >
        All (20)
      </Badge>
      {HOOK_TYPES.map((type) => (
        <Badge
          key={type.value}
          variant={selected === type.value ? "default" : "secondary"}
          className={cn("cursor-pointer")}
          onClick={() => onSelect(selected === type.value ? null : (type.value as HookType))}
        >
          {type.label}
        </Badge>
      ))}
    </div>
  );
}
