"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { DealStatus } from "@/types/brand-hub";

interface DealStatusBadgeProps {
  status: DealStatus;
}

const statusConfig: Record<DealStatus, { label: string; className: string }> = {
  negotiating: {
    label: "Negotiating",
    className: "bg-butter text-copper border-butter/60",
  },
  active: {
    label: "Active",
    className: "bg-nebula text-emerald-900 border-nebula/60",
  },
  completed: {
    label: "Completed",
    className: "bg-green-100 text-green-800 border-green-200",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-muted text-muted-foreground border-muted",
  },
};

export function DealStatusBadge({ status }: DealStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge
      variant="outline"
      className={cn("font-medium", config.className)}
    >
      {config.label}
    </Badge>
  );
}
