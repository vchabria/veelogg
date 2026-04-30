"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type {
  BrandDeliverable,
  BrandDeliverableInput,
  Platform,
  DeliverableStatus,
} from "@/types/brand-hub";

interface DeliverableFormProps {
  dealId: string;
  deliverable?: BrandDeliverable;
  onSubmit: (input: BrandDeliverableInput) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const PLATFORM_OPTIONS: { value: Platform; label: string }[] = [
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
  { value: "instagram", label: "Instagram" },
  { value: "twitter", label: "Twitter/X" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "other", label: "Other" },
];

export function DeliverableForm({
  dealId,
  deliverable,
  onSubmit,
  onCancel,
  loading = false,
}: DeliverableFormProps) {
  const isEdit = !!deliverable;

  const [title, setTitle] = useState(deliverable?.title ?? "");
  const [description, setDescription] = useState(
    deliverable?.description ?? ""
  );
  const [platform, setPlatform] = useState<Platform | "">(
    deliverable?.platform ?? ""
  );
  const [dueDate, setDueDate] = useState(deliverable?.due_date ?? "");
  const [status, setStatus] = useState<DeliverableStatus>(
    deliverable?.status ?? "draft"
  );
  const [postedUrl, setPostedUrl] = useState(deliverable?.posted_url ?? "");
  const [notes, setNotes] = useState(deliverable?.notes ?? "");

  const showPostedUrl = status === "posted" || status === "paid";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const input: BrandDeliverableInput = {
      deal_id: dealId,
      title: title.trim(),
      ...(description.trim() && { description: description.trim() }),
      ...(platform && { platform }),
      ...(dueDate && { due_date: dueDate }),
      ...(isEdit && { status }),
      ...(showPostedUrl && postedUrl.trim() && { posted_url: postedUrl.trim() }),
      ...(notes.trim() && { notes: notes.trim() }),
    };

    await onSubmit(input);
  }

  const canSubmit = title.trim().length > 0;

  const selectClasses =
    "flex h-10 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

  return (
    <Card className="border-copper/15">
      <CardHeader>
        <CardTitle className="text-lg">
          {isEdit ? "Edit Deliverable" : "New Deliverable"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-[13px] font-medium text-foreground">
              Title <span className="text-destructive">*</span>
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Product review video"
              required
              className="border-copper/15 focus-visible:ring-copper/30"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-[13px] font-medium text-foreground">
              Description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the deliverable..."
              rows={3}
              className="text-sm leading-relaxed resize-none border-copper/15 focus-visible:ring-copper/30"
            />
          </div>

          {/* Platform */}
          <div className="space-y-2">
            <label className="text-[13px] font-medium text-foreground">
              Platform
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Platform | "")}
              className={cn(
                selectClasses,
                "border-copper/15 focus-visible:ring-copper/30"
              )}
            >
              <option value="">Select platform...</option>
              {PLATFORM_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Due date */}
          <div className="space-y-2">
            <label className="text-[13px] font-medium text-foreground">
              Due date
            </label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="border-copper/15 focus-visible:ring-copper/30"
            />
          </div>

          {/* Status (edit mode only) */}
          {isEdit && (
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-foreground">
                Status
              </label>
              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as DeliverableStatus)
                }
                className={cn(
                  selectClasses,
                  "border-copper/15 focus-visible:ring-copper/30"
                )}
              >
                <option value="draft">Draft</option>
                <option value="in_review">In Review</option>
                <option value="approved">Approved</option>
                <option value="posted">Posted</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          )}

          {/* Posted URL (only when status is posted or paid) */}
          {showPostedUrl && (
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-foreground">
                Posted URL
              </label>
              <Input
                type="url"
                value={postedUrl}
                onChange={(e) => setPostedUrl(e.target.value)}
                placeholder="https://..."
                className="border-copper/15 focus-visible:ring-copper/30"
              />
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <label className="text-[13px] font-medium text-foreground">
              Notes
            </label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional notes..."
              rows={3}
              className="text-sm leading-relaxed resize-none border-copper/15 focus-visible:ring-copper/30"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              type="submit"
              disabled={!canSubmit || loading}
              className="bg-copper text-white hover:bg-copper/90"
            >
              {loading
                ? "Saving..."
                : isEdit
                  ? "Save Changes"
                  : "Create Deliverable"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
