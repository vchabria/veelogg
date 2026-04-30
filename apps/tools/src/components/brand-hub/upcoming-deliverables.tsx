"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PLATFORM_LABELS } from "@/types/brand-hub";
import type { BrandDeliverable } from "@/types/brand-hub";

interface UpcomingDeliverablesProps {
  deliverables: BrandDeliverable[];
}

function formatDueDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function UpcomingDeliverables({
  deliverables,
}: UpcomingDeliverablesProps) {
  // Filter to deliverables due within the next 7 days
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sevenDaysFromNow = new Date(today);
  sevenDaysFromNow.setDate(today.getDate() + 7);

  const upcoming = deliverables
    .filter((d) => {
      if (!d.due_date) return false;
      const due = new Date(d.due_date + "T00:00:00");
      return due >= today && due <= sevenDaysFromNow;
    })
    .sort((a, b) => {
      const dateA = new Date(a.due_date! + "T00:00:00");
      const dateB = new Date(b.due_date! + "T00:00:00");
      return dateA.getTime() - dateB.getTime();
    });

  return (
    <Card className="border-copper/10">
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Deliverables</CardTitle>
      </CardHeader>
      <CardContent>
        {upcoming.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No upcoming deliverables
          </p>
        ) : (
          <ul className="space-y-3">
            {upcoming.map((deliverable) => (
              <li
                key={deliverable.id}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="shrink-0 text-xs font-medium text-copper">
                    {formatDueDate(deliverable.due_date!)}
                  </span>
                  <span className="truncate text-sm text-foreground">
                    {deliverable.title}
                  </span>
                </div>
                {deliverable.platform && (
                  <Badge
                    variant="secondary"
                    className="shrink-0 text-[11px] px-2 py-0.5"
                  >
                    {PLATFORM_LABELS[deliverable.platform]}
                  </Badge>
                )}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
