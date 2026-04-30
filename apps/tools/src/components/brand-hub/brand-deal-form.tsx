"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { BrandDeal, BrandDealInput, DealStatus, PaymentStatus } from "@/types/brand-hub";

interface BrandDealFormProps {
  profileId: string;
  deal?: BrandDeal;
  onSubmit: (input: BrandDealInput) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const selectClassName =
  "flex h-10 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const dealStatusOptions: { value: DealStatus; label: string }[] = [
  { value: "negotiating", label: "Negotiating" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const paymentStatusOptions: { value: PaymentStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "partial", label: "Partial" },
  { value: "paid", label: "Paid" },
];

export function BrandDealForm({
  profileId,
  deal,
  onSubmit,
  onCancel,
  loading = false,
}: BrandDealFormProps) {
  const [companyName, setCompanyName] = useState(deal?.company_name ?? "");
  const [dealValueDollars, setDealValueDollars] = useState(
    deal?.deal_value != null ? (deal.deal_value / 100).toString() : ""
  );
  const [dealStatus, setDealStatus] = useState<DealStatus>(deal?.deal_status ?? "negotiating");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(
    deal?.payment_status ?? "pending"
  );
  const [contactName, setContactName] = useState(deal?.contact_name ?? "");
  const [contactEmail, setContactEmail] = useState(deal?.contact_email ?? "");
  const [startDate, setStartDate] = useState(deal?.start_date ?? "");
  const [endDate, setEndDate] = useState(deal?.end_date ?? "");
  const [notes, setNotes] = useState(deal?.notes ?? "");

  const isEdit = !!deal;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!companyName.trim()) return;

    const parsedValue = parseFloat(dealValueDollars);
    const dealValueCents =
      dealValueDollars.trim() !== "" && !isNaN(parsedValue)
        ? Math.round(parsedValue * 100)
        : undefined;

    const input: BrandDealInput = {
      brand_profile_id: profileId,
      company_name: companyName.trim(),
      deal_value: dealValueCents,
      deal_status: dealStatus,
      payment_status: paymentStatus,
      contact_name: contactName.trim() || undefined,
      contact_email: contactEmail.trim() || undefined,
      start_date: startDate || undefined,
      end_date: endDate || undefined,
      notes: notes.trim() || undefined,
    };

    await onSubmit(input);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Company Name */}
      <div className="space-y-2">
        <label htmlFor="company_name" className="text-[12px] font-medium text-muted-foreground">
          Company Name <span className="text-destructive">*</span>
        </label>
        <Input
          id="company_name"
          placeholder="e.g. Nike, Glossier, Shopify"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
      </div>

      {/* Deal Value */}
      <div className="space-y-2">
        <label htmlFor="deal_value" className="text-[12px] font-medium text-muted-foreground">
          Deal Value (USD){" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <Input
          id="deal_value"
          type="number"
          min="0"
          step="0.01"
          placeholder="e.g. 2500.00"
          value={dealValueDollars}
          onChange={(e) => setDealValueDollars(e.target.value)}
        />
      </div>

      {/* Status selects - side by side */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="deal_status" className="text-[12px] font-medium text-muted-foreground">
            Deal Status
          </label>
          <select
            id="deal_status"
            className={cn(selectClassName)}
            value={dealStatus}
            onChange={(e) => setDealStatus(e.target.value as DealStatus)}
          >
            {dealStatusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="payment_status" className="text-[12px] font-medium text-muted-foreground">
            Payment Status
          </label>
          <select
            id="payment_status"
            className={cn(selectClassName)}
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
          >
            {paymentStatusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="contact_name" className="text-[12px] font-medium text-muted-foreground">
            Contact Name{" "}
            <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <Input
            id="contact_name"
            placeholder="e.g. Jane Smith"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="contact_email" className="text-[12px] font-medium text-muted-foreground">
            Contact Email{" "}
            <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <Input
            id="contact_email"
            type="email"
            placeholder="e.g. jane@brand.com"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="start_date" className="text-[12px] font-medium text-muted-foreground">
            Start Date{" "}
            <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <Input
            id="start_date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="end_date" className="text-[12px] font-medium text-muted-foreground">
            End Date{" "}
            <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <Input
            id="end_date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <label htmlFor="notes" className="text-[12px] font-medium text-muted-foreground">
          Notes{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <Textarea
          id="notes"
          placeholder="Any additional details about this deal..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={loading || !companyName.trim()}>
          {loading ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              {isEdit ? "Saving..." : "Creating..."}
            </>
          ) : isEdit ? (
            "Save Changes"
          ) : (
            "Create Deal"
          )}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
