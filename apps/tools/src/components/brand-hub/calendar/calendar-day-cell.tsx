"use client";

import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { CalendarItemChip } from "./calendar-item-chip";
import type { ContentCalendarItem } from "@/types/brand-hub";

interface CalendarDayCellProps {
  day: number | null;
  dateStr: string | null;
  isToday: boolean;
  items: ContentCalendarItem[];
  onClickDay: (dateStr: string) => void;
  onClickItem: (item: ContentCalendarItem) => void;
}

const MAX_VISIBLE = 3;

export function CalendarDayCell({
  day,
  dateStr,
  isToday,
  items,
  onClickDay,
  onClickItem,
}: CalendarDayCellProps) {
  if (day === null) {
    return <div className="min-h-[100px] bg-muted/20 rounded-lg" />;
  }

  const visible = items.slice(0, MAX_VISIBLE);
  const overflow = items.length - MAX_VISIBLE;

  return (
    <div
      className={cn(
        "min-h-[100px] rounded-lg border p-2 transition-colors group",
        isToday ? "border-copper/20 bg-copper/5 shadow-warm" : "border-border/30 hover:border-border/50"
      )}
    >
      <div className="flex items-center justify-between mb-1">
        <span
          className={cn(
            "text-xs font-medium",
            isToday
              ? "flex h-5 w-5 items-center justify-center rounded-full bg-copper text-white"
              : "text-muted-foreground"
          )}
        >
          {day}
        </span>
        {dateStr && (
          <button
            onClick={() => onClickDay(dateStr)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Plus className="h-3.5 w-3.5 text-muted-foreground hover:text-copper" />
          </button>
        )}
      </div>

      <div className="space-y-0.5">
        {visible.map((item) => (
          <CalendarItemChip
            key={item.id}
            item={item}
            onClick={() => onClickItem(item)}
          />
        ))}
        {overflow > 0 && (
          <button
            onClick={() => dateStr && onClickDay(dateStr)}
            className="text-[10px] text-muted-foreground hover:text-foreground pl-1"
          >
            +{overflow} more
          </button>
        )}
      </div>
    </div>
  );
}
