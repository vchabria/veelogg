"use client";

import { ChevronDown, Pencil } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PLATFORM_LABELS } from "@/types/brand-hub";
import type { BrandProfile } from "@/types/brand-hub";

interface ProfileHubHeaderProps {
  profile: BrandProfile;
  profiles: BrandProfile[];
  onSwitchProfile: (profileId: string) => void;
  onEdit: () => void;
}

export function ProfileHubHeader({
  profile,
  profiles,
  onSwitchProfile,
  onEdit,
}: ProfileHubHeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-2">
        {/* Profile name with switcher */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 group"
          >
            <h1 className="text-2xl font-display font-bold tracking-tight">
              {profile.name}
            </h1>
            <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>

          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
              <div className="absolute left-0 top-full z-50 mt-1 w-64 rounded-xl border bg-card p-1 shadow-warm-lg">
                {profiles.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSwitchProfile(p.id);
                      setDropdownOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-left transition-colors",
                      p.id === profile.id
                        ? "bg-copper/10 text-copper font-medium"
                        : "hover:bg-accent"
                    )}
                  >
                    <span className="truncate">{p.name}</span>
                    <span className="text-xs text-muted-foreground truncate">{p.niche}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Niche + platforms */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">{profile.niche}</span>
          {profile.platforms.map((p) => (
            <Badge key={p} variant="secondary" className="text-[11px] px-2 py-0.5">
              {PLATFORM_LABELS[p]}
            </Badge>
          ))}
        </div>
      </div>

      <Button variant="outline" size="sm" onClick={onEdit}>
        <Pencil className="mr-2 h-3.5 w-3.5" />
        Edit
      </Button>
    </div>
  );
}
