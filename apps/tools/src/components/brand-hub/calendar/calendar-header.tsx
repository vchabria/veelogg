"use client";

import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CalendarHeaderProps {
  year: number;
  month: number; // 0-indexed
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onSuggest: () => void;
  suggestingLoading: boolean;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function CalendarHeader({
  year,
  month,
  onPrevMonth,
  onNextMonth,
  onSuggest,
  suggestingLoading,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onPrevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-xl font-display font-semibold min-w-[180px] text-center">
          {MONTH_NAMES[month]} {year}
        </h3>
        <Button variant="ghost" size="icon" onClick={onNextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <Button
        size="sm"
        variant="outline"
        onClick={onSuggest}
        disabled={suggestingLoading}
        className="text-copper border-copper/20 hover:bg-copper/5 rounded-full"
      >
        {suggestingLoading ? (
          <>
            <div className="mr-2 h-3.5 w-3.5 animate-spin rounded-full border-2 border-copper border-t-transparent" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-3.5 w-3.5" />
            Suggest content
          </>
        )}
      </Button>
    </div>
  );
}
