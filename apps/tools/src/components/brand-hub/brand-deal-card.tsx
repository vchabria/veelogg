"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DealStatusBadge } from "@/components/brand-hub/deal-status-badge";
import { PaymentStatusBadge } from "@/components/brand-hub/payment-status-badge";
import { CalendarDays, Package } from "lucide-react";
import type { BrandDealWithDeliverables } from "@/types/brand-hub";

interface BrandDealCardProps {
  deal: BrandDealWithDeliverables;
  onClick: () => void;
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

function formatDateRange(start: string | null, end: string | null): string | null {
  if (!start && !end) return null;
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  if (start && end) return `${fmt(start)} - ${fmt(end)}`;
  if (start) return `From ${fmt(start)}`;
  return `Until ${fmt(end!)}`;
}

export function BrandDealCard({ deal, onClick }: BrandDealCardProps) {
  const dealValueDisplay =
    deal.deal_value != null ? currencyFormatter.format(deal.deal_value / 100) : null;
  const dateRange = formatDateRange(deal.start_date, deal.end_date);
  const deliverableCount = deal.deliverables.length;

  return (
    <Card
      className={cn(
        "cursor-pointer border-0 shadow-warm transition-all duration-200 hover:shadow-warm-lg hover:-translate-y-0.5"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3 p-7">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{deal.company_name}</CardTitle>
          {dealValueDisplay && (
            <span className="shrink-0 text-lg font-semibold text-copper">
              {dealValueDisplay}
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3 px-7 pb-7">
        <div className="flex flex-wrap items-center gap-2">
          <DealStatusBadge status={deal.deal_status} />
          <PaymentStatusBadge status={deal.payment_status} />
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Package className="h-3.5 w-3.5" />
            {deliverableCount} {deliverableCount === 1 ? "deliverable" : "deliverables"}
          </span>

          {dateRange && (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              {dateRange}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
