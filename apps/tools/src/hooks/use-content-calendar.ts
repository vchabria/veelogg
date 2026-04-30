"use client";

import { useCallback, useEffect, useState } from "react";
import type { ContentCalendarItem, ContentCalendarItemInput } from "@/types/brand-hub";

interface CalendarSuggestion {
  title: string;
  description: string;
  platform: string;
  dayOffset: number;
  contentType: string;
}

export function useContentCalendar(profileId: string, month: string) {
  const [items, setItems] = useState<ContentCalendarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState<CalendarSuggestion[]>([]);
  const [suggestingLoading, setSuggestingLoading] = useState(false);

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/brand-hub/calendar?profileId=${profileId}&month=${month}`
      );
      if (res.ok) {
        const data = await res.json();
        setItems(data.items);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [profileId, month]);

  useEffect(() => {
    setLoading(true);
    fetchItems();
  }, [fetchItems]);

  const createItem = useCallback(
    async (input: ContentCalendarItemInput) => {
      const res = await fetch("/api/brand-hub/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      await fetchItems();
      return data.item as ContentCalendarItem;
    },
    [fetchItems]
  );

  const updateItem = useCallback(
    async (id: string, updates: Partial<ContentCalendarItemInput>) => {
      const res = await fetch("/api/brand-hub/calendar", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      await fetchItems();
      return data.item as ContentCalendarItem;
    },
    [fetchItems]
  );

  const deleteItem = useCallback(
    async (id: string) => {
      const res = await fetch(`/api/brand-hub/calendar?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }
      await fetchItems();
    },
    [fetchItems]
  );

  const syncDeliverables = useCallback(async () => {
    const res = await fetch("/api/brand-hub/calendar/sync-deliverables", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profileId }),
    });
    if (res.ok) await fetchItems();
  }, [profileId, fetchItems]);

  const generateSuggestions = useCallback(
    async (weekStart: string) => {
      setSuggestingLoading(true);
      setSuggestions([]);
      try {
        const res = await fetch("/api/brand-hub/calendar/suggest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profileId, weekStart }),
        });
        const data = await res.json();
        if (res.ok) {
          setSuggestions(data.suggestions);
        }
      } catch {
        // silently fail
      } finally {
        setSuggestingLoading(false);
      }
    },
    [profileId]
  );

  const acceptSuggestion = useCallback(
    async (suggestion: CalendarSuggestion, weekStart: string) => {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + suggestion.dayOffset);
      const scheduled = date.toISOString().split("T")[0];

      await createItem({
        brand_profile_id: profileId,
        title: suggestion.title,
        description: suggestion.description,
        platform: suggestion.platform,
        scheduled_date: scheduled,
        content_type: suggestion.contentType as ContentCalendarItemInput["content_type"],
        ai_generated: true,
        source: "ai_suggestion",
      });

      // Remove from suggestions list
      setSuggestions((prev) => prev.filter((s) => s !== suggestion));
    },
    [profileId, createItem]
  );

  const dismissSuggestion = useCallback((suggestion: CalendarSuggestion) => {
    setSuggestions((prev) => prev.filter((s) => s !== suggestion));
  }, []);

  return {
    items,
    loading,
    suggestions,
    suggestingLoading,
    createItem,
    updateItem,
    deleteItem,
    syncDeliverables,
    generateSuggestions,
    acceptSuggestion,
    dismissSuggestion,
    refetch: fetchItems,
  };
}
