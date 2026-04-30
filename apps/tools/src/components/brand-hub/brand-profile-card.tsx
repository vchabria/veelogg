"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PLATFORM_LABELS } from "@/types/brand-hub";
import type { BrandProfile } from "@/types/brand-hub";

interface BrandProfileCardProps {
  profile: BrandProfile;
  dealCount?: number;
  onClick: () => void;
}

export function BrandProfileCard({
  profile,
  dealCount,
  onClick,
}: BrandProfileCardProps) {
  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
        "cursor-pointer border-0 shadow-warm transition-all duration-200 hover:shadow-warm-lg hover:-translate-y-0.5",
        profile.is_default && "ring-1 ring-copper/15"
      )}
    >
      <CardHeader className="pb-3 p-7">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base leading-snug">
            {profile.name}
          </CardTitle>
          {profile.is_default && (
            <Star className="h-4 w-4 shrink-0 fill-butter text-copper" />
          )}
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-copper/60 mt-1">{profile.niche}</p>
      </CardHeader>

      <CardContent className="space-y-3 px-7 pb-7">
        {/* Platform badges */}
        {profile.platforms.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {profile.platforms.map((platform) => (
              <Badge
                key={platform}
                variant="secondary"
                className="text-[11px] px-2.5 py-0.5 bg-copper/5 text-copper/70 border-copper/10"
              >
                {PLATFORM_LABELS[platform]}
              </Badge>
            ))}
          </div>
        )}

        {/* Deal count */}
        {dealCount !== undefined && dealCount > 0 && (
          <p className="text-xs text-muted-foreground">
            {dealCount} {dealCount === 1 ? "deal" : "deals"}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
