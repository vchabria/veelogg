"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PaymentStatus } from "@/types/brand-hub";

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

const statusConfig: Record<PaymentStatus, { label: string; className: string }> = {
  pending: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  partial: {
    label: "Partial",
    className: "bg-orange-100 text-orange-800 border-orange-200",
  },
  paid: {
    label: "Paid",
    className: "bg-green-100 text-green-800 border-green-200",
  },
};

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
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
