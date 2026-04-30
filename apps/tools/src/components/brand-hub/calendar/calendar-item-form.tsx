"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ContentCalendarItem, ContentCalendarItemInput, CalendarItemStatus, ContentType } from "@/types/brand-hub";

interface CalendarItemFormProps {
  profileId: string;
  date?: string;
  item?: ContentCalendarItem;
  onSubmit: (input: ContentCalendarItemInput | { id: string } & Partial<ContentCalendarItemInput>) => Promise<void>;
  onCancel: () => void;
  onDelete?: () => void;
}

const STATUS_OPTIONS: { value: CalendarItemStatus; label: string }[] = [
  { value: "idea", label: "Idea" },
  { value: "planned", label: "Planned" },
  { value: "drafted", label: "Drafted" },
  { value: "posted", label: "Posted" },
];

const CONTENT_TYPES: { value: ContentType; label: string }[] = [
  { value: "reel", label: "Reel" },
  { value: "story", label: "Story" },
  { value: "post", label: "Post" },
  { value: "short", label: "Short" },
  { value: "video", label: "Video" },
  { value: "tweet", label: "Tweet" },
  { value: "carousel", label: "Carousel" },
  { value: "other", label: "Other" },
];

const PLATFORMS = [
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube" },
  { value: "twitter", label: "Twitter/X" },
  { value: "linkedin", label: "LinkedIn" },
];

const selectClassName =
  "flex h-10 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function CalendarItemForm({
  profileId,
  date,
  item,
  onSubmit,
  onCancel,
  onDelete,
}: CalendarItemFormProps) {
  const isEdit = !!item;
  const [title, setTitle] = useState(item?.title ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [platform, setPlatform] = useState(item?.platform ?? "");
  const [scheduledDate, setScheduledDate] = useState(item?.scheduled_date ?? date ?? "");
  const [status, setStatus] = useState<CalendarItemStatus>(item?.status ?? "idea");
  const [contentType, setContentType] = useState<ContentType | "">(item?.content_type ?? "");
  const [notes, setNotes] = useState(item?.notes ?? "");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !scheduledDate) return;
    setSaving(true);
    try {
      if (isEdit && item) {
        await onSubmit({
          id: item.id,
          title: title.trim(),
          description: description.trim() || undefined,
          platform: platform || undefined,
          scheduled_date: scheduledDate,
          status,
          content_type: (contentType as ContentType) || undefined,
          notes: notes.trim() || undefined,
        });
      } else {
        await onSubmit({
          brand_profile_id: profileId,
          title: title.trim(),
          description: description.trim() || undefined,
          platform: platform || undefined,
          scheduled_date: scheduledDate,
          status,
          content_type: (contentType as ContentType) || undefined,
          notes: notes.trim() || undefined,
        });
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card className="border-copper/15">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">
            {isEdit ? "Edit Item" : "New Calendar Item"}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[13px] font-medium">
              Title <span className="text-destructive">*</span>
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Content title"
              required
              className="border-copper/15 focus-visible:ring-copper/30"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-[13px] font-medium">Date</label>
              <Input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                required
                className="border-copper/15 focus-visible:ring-copper/30"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-medium">Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className={selectClassName}
              >
                <option value="">Select</option>
                {PLATFORMS.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-[13px] font-medium">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as CalendarItemStatus)}
                className={selectClassName}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-medium">Content Type</label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value as ContentType | "")}
                className={selectClassName}
              >
                <option value="">Select</option>
                {CONTENT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-medium">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief content concept..."
              rows={2}
              className="text-sm resize-none border-copper/15 focus-visible:ring-copper/30"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-medium">Notes</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any notes..."
              rows={2}
              className="text-sm resize-none border-copper/15 focus-visible:ring-copper/30"
            />
          </div>

          <div className="flex items-center gap-3 pt-1">
            <Button
              type="submit"
              disabled={saving || !title.trim() || !scheduledDate}
              className="bg-copper text-white hover:bg-copper/90"
            >
              {saving ? "Saving..." : isEdit ? "Update" : "Add to Calendar"}
            </Button>
            {isEdit && onDelete && (
              <Button type="button" variant="ghost" onClick={onDelete} className="text-destructive">
                Delete
              </Button>
            )}
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
