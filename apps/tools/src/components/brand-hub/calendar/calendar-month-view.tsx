"use client";

import { useCallback, useEffect, useState } from "react";
import { useContentCalendar } from "@/hooks/use-content-calendar";
import { CalendarHeader } from "./calendar-header";
import { CalendarDayCell } from "./calendar-day-cell";
import { CalendarItemForm } from "./calendar-item-form";
import { CalendarSuggestionPanel } from "./calendar-suggestion-panel";
import type { ContentCalendarItem, ContentCalendarItemInput } from "@/types/brand-hub";

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getMonthStr(year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}`;
}

function getWeekStart(year: number, month: number): string {
  // Monday of the current week (relative to first of month)
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(today);
  monday.setDate(diff);
  return monday.toISOString().split("T")[0];
}

interface ContentCalendarTabProps {
  profileId: string;
}

export function ContentCalendarTab({ profileId }: ContentCalendarTabProps) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const monthStr = getMonthStr(year, month);

  const calendar = useContentCalendar(profileId, monthStr);

  // Sync deliverables on mount
  useEffect(() => {
    calendar.syncDeliverables();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId]);

  // Form state
  const [formMode, setFormMode] = useState<
    | { type: "closed" }
    | { type: "create"; date: string }
    | { type: "edit"; item: ContentCalendarItem }
  >({ type: "closed" });

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [weekStart, setWeekStart] = useState(getWeekStart(year, month));

  function prevMonth() {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  }

  function nextMonth() {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  }

  function handleSuggest() {
    const ws = getWeekStart(year, month);
    setWeekStart(ws);
    calendar.generateSuggestions(ws);
    setShowSuggestions(true);
  }

  async function handleCreateItem(input: ContentCalendarItemInput) {
    await calendar.createItem(input);
    setFormMode({ type: "closed" });
  }

  async function handleUpdateItem(data: { id: string } & Partial<ContentCalendarItemInput>) {
    const { id, ...updates } = data;
    await calendar.updateItem(id, updates);
    setFormMode({ type: "closed" });
  }

  async function handleDeleteItem(id: string) {
    if (!window.confirm("Delete this calendar item?")) return;
    await calendar.deleteItem(id);
    setFormMode({ type: "closed" });
  }

  // Build calendar grid
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDow = (firstDay.getDay() + 6) % 7; // Monday=0
  const daysInMonth = lastDay.getDate();

  const todayStr = now.toISOString().split("T")[0];

  const cells: Array<{ day: number | null; dateStr: string | null }> = [];
  // Leading empty cells
  for (let i = 0; i < startDow; i++) cells.push({ day: null, dateStr: null });
  // Day cells
  for (let d = 1; d <= daysInMonth; d++) {
    const ds = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cells.push({ day: d, dateStr: ds });
  }
  // Trailing empty cells
  while (cells.length % 7 !== 0) cells.push({ day: null, dateStr: null });

  // Group items by date
  const itemsByDate = new Map<string, ContentCalendarItem[]>();
  for (const item of calendar.items) {
    const existing = itemsByDate.get(item.scheduled_date) ?? [];
    existing.push(item);
    itemsByDate.set(item.scheduled_date, existing);
  }

  if (calendar.loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-copper border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <CalendarHeader
        year={year}
        month={month}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
        onSuggest={handleSuggest}
        suggestingLoading={calendar.suggestingLoading}
      />

      {/* Suggestions panel */}
      {showSuggestions && calendar.suggestions.length > 0 && (
        <CalendarSuggestionPanel
          suggestions={calendar.suggestions}
          weekStart={weekStart}
          onAccept={(s) => calendar.acceptSuggestion(s, weekStart)}
          onDismiss={(s) => calendar.dismissSuggestion(s)}
          onClose={() => setShowSuggestions(false)}
        />
      )}

      {/* Item form */}
      {formMode.type !== "closed" && (
        <CalendarItemForm
          profileId={profileId}
          date={formMode.type === "create" ? formMode.date : undefined}
          item={formMode.type === "edit" ? formMode.item : undefined}
          onSubmit={async (data) => {
            if ("id" in data && data.id) {
              await handleUpdateItem(data as { id: string } & Partial<ContentCalendarItemInput>);
            } else {
              await handleCreateItem(data as ContentCalendarItemInput);
            }
          }}
          onCancel={() => setFormMode({ type: "closed" })}
          onDelete={
            formMode.type === "edit"
              ? () => handleDeleteItem(formMode.item.id)
              : undefined
          }
        />
      )}

      {/* Desktop: Calendar grid */}
      <div className="hidden sm:block">
        <div className="grid grid-cols-7 gap-1">
          {DAY_LABELS.map((d) => (
            <div key={d} className="text-center text-xs font-medium text-muted-foreground py-2">
              {d}
            </div>
          ))}
          {cells.map((cell, i) => (
            <CalendarDayCell
              key={i}
              day={cell.day}
              dateStr={cell.dateStr}
              isToday={cell.dateStr === todayStr}
              items={cell.dateStr ? itemsByDate.get(cell.dateStr) ?? [] : []}
              onClickDay={(ds) => setFormMode({ type: "create", date: ds })}
              onClickItem={(item) => setFormMode({ type: "edit", item })}
            />
          ))}
        </div>
      </div>

      {/* Mobile: Agenda list view */}
      <div className="sm:hidden space-y-2">
        {calendar.items.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No items this month. Click the + to add content.
          </p>
        ) : (
          calendar.items.map((item) => (
            <button
              key={item.id}
              onClick={() => setFormMode({ type: "edit", item })}
              className="flex w-full items-center gap-3 rounded-xl border p-3 text-left hover:bg-accent/50 transition-colors"
            >
              <span className="text-xs font-medium text-copper shrink-0 w-12">
                {new Date(item.scheduled_date + "T00:00:00").toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span className="text-sm truncate">{item.title}</span>
              {item.platform && (
                <span className="text-[10px] text-muted-foreground ml-auto shrink-0">
                  {item.platform}
                </span>
              )}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
