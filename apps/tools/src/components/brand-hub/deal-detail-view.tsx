"use client";

import { useState } from "react";
import { ArrowLeft, Pencil, Trash2, Plus } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBrandDeals, useBrandDeliverables } from "@/hooks/use-brand-hub";
import { DealStatusBadge } from "./deal-status-badge";
import { PaymentStatusBadge } from "./payment-status-badge";
import { BrandDealForm } from "./brand-deal-form";
import { DeliverableForm } from "./deliverable-form";
import { DeliverablePipeline } from "./deliverable-pipeline";
import type {
  BrandDealInput,
  BrandDeliverableInput,
  BrandDeliverable,
  DeliverableStatus,
} from "@/types/brand-hub";

interface DealDetailViewProps {
  dealId: string;
  profileId: string;
  onBack: () => void;
}

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function DealDetailView({
  dealId,
  profileId,
  onBack,
}: DealDetailViewProps) {
  const { deals, updateDeal, deleteDeal } = useBrandDeals(profileId);
  const {
    deliverables,
    loading: deliverablesLoading,
    createDeliverable,
    updateDeliverable,
    deleteDeliverable,
  } = useBrandDeliverables(dealId);

  const [isEditing, setIsEditing] = useState(false);
  const [editingSaving, setEditingSaving] = useState(false);
  const [showDeliverableForm, setShowDeliverableForm] = useState(false);
  const [editingDeliverable, setEditingDeliverable] =
    useState<BrandDeliverable | null>(null);

  const deal = deals.find((d) => d.id === dealId);

  if (!deal) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <p className="text-sm text-muted-foreground">Deal not found.</p>
      </div>
    );
  }

  async function handleUpdateDeal(input: BrandDealInput) {
    setEditingSaving(true);
    try {
      await updateDeal(dealId, input);
      setIsEditing(false);
    } finally {
      setEditingSaving(false);
    }
  }

  async function handleDeleteDeal() {
    if (!window.confirm("Are you sure you want to delete this deal?")) return;
    await deleteDeal(dealId);
    onBack();
  }

  async function handleCreateDeliverable(input: BrandDeliverableInput) {
    await createDeliverable(input);
    setShowDeliverableForm(false);
  }

  async function handleUpdateDeliverable(input: BrandDeliverableInput) {
    if (!editingDeliverable) return;
    await updateDeliverable(editingDeliverable.id, input);
    setEditingDeliverable(null);
  }

  async function handleAdvanceDeliverable(id: string, nextStatus: DeliverableStatus) {
    await updateDeliverable(id, { status: nextStatus });
  }

  async function handleDeleteDeliverable(deliverableId: string) {
    if (!window.confirm("Are you sure you want to delete this deliverable?")) return;
    await deleteDeliverable(deliverableId);
  }

  return (
    <div className="space-y-8">
      {/* Back button */}
      <Button variant="ghost" size="sm" onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      {/* Deal header or edit form */}
      {isEditing ? (
        <BrandDealForm
          deal={deal}
          profileId={profileId}
          onSubmit={handleUpdateDeal}
          onCancel={() => setIsEditing(false)}
          loading={editingSaving}
        />
      ) : (
        <Card className="border-0 shadow-warm">
          <CardHeader className="p-7">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-display">{deal.company_name}</h1>
                {deal.deal_value !== null && (
                  <p className="text-lg font-semibold text-copper">
                    {formatCurrency(deal.deal_value)}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDeleteDeal}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 px-7 pb-7">
            {/* Status badges */}
            <div className="flex flex-wrap items-center gap-2">
              <DealStatusBadge status={deal.deal_status} />
              <PaymentStatusBadge status={deal.payment_status} />
            </div>

            {/* Contact info */}
            {(deal.contact_name || deal.contact_email) && (
              <div className="text-sm text-muted-foreground">
                {deal.contact_name && <p>{deal.contact_name}</p>}
                {deal.contact_email && (
                  <p>
                    <a
                      href={`mailto:${deal.contact_email}`}
                      className="text-copper hover:underline"
                    >
                      {deal.contact_email}
                    </a>
                  </p>
                )}
              </div>
            )}

            {/* Date range */}
            {(deal.start_date || deal.end_date) && (
              <p className="text-sm text-muted-foreground">
                {deal.start_date && formatDate(deal.start_date)}
                {deal.start_date && deal.end_date && " - "}
                {deal.end_date && formatDate(deal.end_date)}
              </p>
            )}

            {/* Notes */}
            {deal.notes && (
              <p className="text-sm text-foreground/80 whitespace-pre-wrap">
                {deal.notes}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Deliverables section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-copper/60">Deliverables</h2>
          {!showDeliverableForm && !editingDeliverable && (
            <Button
              size="sm"
              className="bg-copper text-white hover:bg-copper/90"
              onClick={() => setShowDeliverableForm(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Deliverable
            </Button>
          )}
        </div>

        {/* Add deliverable form */}
        {showDeliverableForm && (
          <DeliverableForm
            dealId={dealId}
            onSubmit={handleCreateDeliverable}
            onCancel={() => setShowDeliverableForm(false)}
          />
        )}

        {/* Edit deliverable form */}
        {editingDeliverable && (
          <DeliverableForm
            dealId={dealId}
            deliverable={editingDeliverable}
            onSubmit={handleUpdateDeliverable}
            onCancel={() => setEditingDeliverable(null)}
          />
        )}

        {/* Deliverable pipeline */}
        <DeliverablePipeline
          deliverables={deliverables}
          onAdvance={handleAdvanceDeliverable}
          onEdit={(deliverable) => setEditingDeliverable(deliverable)}
          onDelete={(deliverableId) => handleDeleteDeliverable(deliverableId)}
        />
      </div>
    </div>
  );
}
