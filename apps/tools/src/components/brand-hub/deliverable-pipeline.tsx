"use client";

import { cn } from "@/lib/utils";
import { DeliverableCard } from "./deliverable-card";
import type { BrandDeliverable, DeliverableStatus } from "@/types/brand-hub";

interface DeliverablePipelineProps {
  deliverables: BrandDeliverable[];
  onAdvance: (id: string, nextStatus: DeliverableStatus) => void;
  onEdit: (deliverable: BrandDeliverable) => void;
  onDelete: (id: string) => void;
}

const STATUS_ORDER: DeliverableStatus[] = [
  "draft",
  "in_review",
  "approved",
  "posted",
  "paid",
];

const NEXT_STATUS: Record<string, DeliverableStatus> = {
  draft: "in_review",
  in_review: "approved",
  approved: "posted",
  posted: "paid",
};

interface ColumnConfig {
  status: DeliverableStatus;
  label: string;
  headerBg: string;
  headerText: string;
}

const COLUMNS: ColumnConfig[] = [
  {
    status: "draft",
    label: "Draft",
    headerBg: "bg-muted",
    headerText: "text-muted-foreground",
  },
  {
    status: "in_review",
    label: "In Review",
    headerBg: "bg-butter/40",
    headerText: "text-amber-800",
  },
  {
    status: "approved",
    label: "Approved",
    headerBg: "bg-nebula/40",
    headerText: "text-teal-800",
  },
  {
    status: "posted",
    label: "Posted",
    headerBg: "bg-copper/10",
    headerText: "text-copper",
  },
  {
    status: "paid",
    label: "Paid",
    headerBg: "bg-green-100",
    headerText: "text-green-800",
  },
];

export function DeliverablePipeline({
  deliverables,
  onAdvance,
  onEdit,
  onDelete,
}: DeliverablePipelineProps) {
  const grouped = STATUS_ORDER.reduce<
    Record<DeliverableStatus, BrandDeliverable[]>
  >(
    (acc, status) => {
      acc[status] = deliverables
        .filter((d) => d.status === status)
        .sort((a, b) => a.sort_order - b.sort_order);
      return acc;
    },
    {
      draft: [],
      in_review: [],
      approved: [],
      posted: [],
      paid: [],
    }
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {COLUMNS.map((col) => {
        const items = grouped[col.status];

        return (
          <div
            key={col.status}
            className="flex flex-col rounded-2xl border-0 shadow-warm bg-card overflow-hidden"
          >
            {/* Column header */}
            <div
              className={cn(
                "px-4 py-3 flex items-center justify-between",
                col.headerBg
              )}
            >
              <span
                className={cn("text-[11px] font-semibold uppercase tracking-[0.15em]", col.headerText)}
              >
                {col.label}
              </span>
              <span
                className={cn(
                  "text-xs font-medium rounded-full px-2 py-0.5",
                  col.headerBg,
                  col.headerText
                )}
              >
                {items.length}
              </span>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-3 p-3 min-h-[120px]">
              {items.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-6">
                  No deliverables
                </p>
              )}

              {items.map((deliverable) => (
                <DeliverableCard
                  key={deliverable.id}
                  deliverable={deliverable}
                  onAdvance={() =>
                    onAdvance(
                      deliverable.id,
                      NEXT_STATUS[deliverable.status]
                    )
                  }
                  onEdit={() => onEdit(deliverable)}
                  onDelete={() => onDelete(deliverable.id)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
