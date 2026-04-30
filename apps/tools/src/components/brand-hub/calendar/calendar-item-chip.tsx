"use client";

import { cn } from "@/lib/utils";
import type { ContentCalendarItem } from "@/types/brand-hub";

interface CalendarItemChipProps {
  item: ContentCalendarItem;
  onClick: () => void;
}

function chipColor(source: string): string {
  switch (source) {
    case "deliverable":
      return "bg-copper/15 text-copper border-copper/20";
    case "ai_suggestion":
      return "bg-butter/20 text-amber-700 border-butter/30";
    default:
      return "bg-nebula/15 text-purple-700 border-nebula/20";
  }
}

export function CalendarItemChip({ item, onClick }: CalendarItemChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full truncate rounded-md border px-1.5 py-0.5 text-left text-[11px] font-medium leading-tight transition-colors hover:opacity-80",
        chipColor(item.source)
      )}
    >
      {item.title}
    </button>
  );
}
