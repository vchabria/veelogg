"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PLATFORM_LABELS } from "@/types/brand-hub";
import type { BrandDeliverable, DeliverableStatus } from "@/types/brand-hub";

interface DeliverableCardProps {
  deliverable: BrandDeliverable;
  onAdvance: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const NEXT_STATUS_LABELS: Record<string, string> = {
  draft: "Move to In Review",
  in_review: "Move to Approved",
  approved: "Move to Posted",
  posted: "Mark as Paid",
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function isOverdue(dueDate: string, status: DeliverableStatus): boolean {
  if (status === "posted" || status === "paid") return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate + "T00:00:00");
  return due < today;
}

export function DeliverableCard({
  deliverable,
  onAdvance,
  onEdit,
  onDelete,
}: DeliverableCardProps) {
  const isFinal = deliverable.status === "paid";
  const overdue =
    deliverable.due_date != null &&
    isOverdue(deliverable.due_date, deliverable.status);

  return (
    <Card className="border-0 shadow-warm hover:shadow-warm-lg transition-all duration-200">
      <CardContent className="p-5 space-y-3">
        {/* Title */}
        <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
          {deliverable.title}
        </p>

        {/* Platform badge + due date */}
        <div className="flex items-center justify-between gap-2">
          {deliverable.platform ? (
            <Badge
              variant="secondary"
              className="text-[11px] bg-copper/10 text-copper border-copper/20"
            >
              {PLATFORM_LABELS[deliverable.platform] ?? deliverable.platform}
            </Badge>
          ) : (
            <span />
          )}

          {deliverable.due_date && (
            <span
              className={cn(
                "text-[11px] font-medium",
                overdue
                  ? "text-destructive"
                  : "text-muted-foreground"
              )}
            >
              {overdue ? "Overdue: " : "Due "}
              {formatDate(deliverable.due_date)}
            </span>
          )}
        </div>

        {/* Description preview */}
        {deliverable.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {deliverable.description}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          {!isFinal && (
            <Button
              size="sm"
              onClick={onAdvance}
              className="bg-copper text-white hover:bg-copper/90 text-xs h-7 px-3"
            >
              {NEXT_STATUS_LABELS[deliverable.status]}
            </Button>
          )}

          <Button
            size="sm"
            variant="ghost"
            onClick={onEdit}
            className="text-xs h-7 px-2 text-muted-foreground hover:text-foreground"
          >
            Edit
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={onDelete}
            className="text-xs h-7 px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
