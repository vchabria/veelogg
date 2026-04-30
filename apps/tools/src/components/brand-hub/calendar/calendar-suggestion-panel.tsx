"use client";

import { Check, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Suggestion {
  title: string;
  description: string;
  platform: string;
  dayOffset: number;
  contentType: string;
}

interface CalendarSuggestionPanelProps {
  suggestions: Suggestion[];
  weekStart: string;
  onAccept: (suggestion: Suggestion) => void;
  onDismiss: (suggestion: Suggestion) => void;
  onClose: () => void;
}

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function CalendarSuggestionPanel({
  suggestions,
  weekStart,
  onAccept,
  onDismiss,
  onClose,
}: CalendarSuggestionPanelProps) {
  if (suggestions.length === 0) return null;

  return (
    <Card className="border-0 bg-butter/5 shadow-warm">
      <CardHeader className="pb-3 p-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-600" />
            <CardTitle className="text-[11px] font-semibold uppercase tracking-[0.2em] text-copper/60">
              AI Content Suggestions
            </CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Accept suggestions to add them to your calendar.
        </p>
      </CardHeader>
      <CardContent className="space-y-3 px-7 pb-7">
        {suggestions.map((s, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-xl border-0 bg-card shadow-warm p-4"
          >
            <div className="flex-1 min-w-0 space-y-1">
              <p className="text-sm font-medium">{s.title}</p>
              <p className="text-xs text-muted-foreground">{s.description}</p>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                  {s.platform}
                </Badge>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                  {s.contentType}
                </Badge>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                  {DAY_NAMES[s.dayOffset] ?? `Day ${s.dayOffset}`}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-green-600 hover:bg-green-50"
                onClick={() => onAccept(s)}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:bg-muted"
                onClick={() => onDismiss(s)}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
