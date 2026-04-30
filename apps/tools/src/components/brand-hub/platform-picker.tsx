"use client";

import { cn } from "@/lib/utils";
import type { Platform } from "@/types/brand-hub";

interface PlatformPickerProps {
  selected: Platform[];
  onChange: (platforms: Platform[]) => void;
}

const PLATFORM_OPTIONS: { value: Platform; label: string }[] = [
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
  { value: "instagram", label: "Instagram" },
  { value: "twitter", label: "Twitter/X" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "other", label: "Other" },
];

export function PlatformPicker({ selected, onChange }: PlatformPickerProps) {
  function toggle(platform: Platform) {
    const next = selected.includes(platform)
      ? selected.filter((p) => p !== platform)
      : [...selected, platform];
    onChange(next);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {PLATFORM_OPTIONS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => toggle(value)}
          className={cn(
            "rounded-full border px-3 py-1.5 text-sm transition-all duration-150",
            selected.includes(value)
              ? "border-copper bg-copper/10 text-copper font-medium shadow-sm"
              : "border-input text-muted-foreground hover:text-foreground hover:border-copper/30 hover:bg-copper/5"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
