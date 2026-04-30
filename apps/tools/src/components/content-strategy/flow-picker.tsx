"use client";

import { useEffect, useState } from "react";
import { Compass, Heart, RefreshCw, ArrowRight, BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { STRATEGY_FLOWS } from "./flow-data";
import type { StrategyFlowId, StrategySession } from "@/types/content-strategy";

interface FlowPickerProps {
  onSelect: (flow: StrategyFlowId) => void;
  onSelectSummary: (flow: StrategyFlowId, sessionId: string) => void;
}

export function FlowPicker({ onSelect, onSelectSummary }: FlowPickerProps) {
  const [sessions, setSessions] = useState<StrategySession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/content-strategy/session");
        if (res.ok) {
          const data = await res.json();
          setSessions(data.sessions ?? []);
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function getSession(flow: StrategyFlowId): StrategySession | undefined {
    return sessions.find((s) => s.flow === flow);
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  const workbookSession = getSession("workbook");
  const therapyFlow = STRATEGY_FLOWS["content-therapy"];
  const therapySession = getSession("content-therapy");
  const resetFlow = STRATEGY_FLOWS["quarterly-reset"];
  const resetSession = getSession("quarterly-reset");

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="animate-in">
        <p className="text-sm font-medium text-copper tracking-wide uppercase mb-2">
          Content Strategy
        </p>
        <h1 className="text-3xl font-display sm:text-4xl">
          Your strategy starts here.
        </h1>
        <p className="mt-3 text-muted-foreground max-w-lg">
          Define your brand, find your voice, and plan content that actually grows your audience.
          Start with the workbook or warm up with a guided exercise.
        </p>
      </div>

      {/* Workbook — Hero card */}
      <div className="animate-in-delayed">
        <Card className="overflow-hidden border-copper/15 bg-gradient-to-br from-card via-card to-butter/8">
          <div className="flex flex-col sm:flex-row">
            <div className="flex-1 p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="rounded-xl bg-butter/50 p-2">
                  <BookOpen className="h-5 w-5 text-copper" />
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-copper">
                  Interactive Workbook
                </span>
              </div>

              <h2 className="text-2xl font-display sm:text-3xl">
                Your Content Strategy Workbook
              </h2>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                5 guided sections: uncover your barriers, define your mission, shape your brand,
                set a 3-month content strategy with pillars, and audit what&apos;s working.
                Everything auto-saves.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button
                  onClick={() => onSelect("workbook")}
                  className="gap-1.5"
                >
                  {workbookSession ? "Resume Workbook" : "Start Workbook"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                {workbookSession?.status === "completed" && (
                  <Button
                    variant="outline"
                    onClick={() => onSelectSummary("workbook", workbookSession.id)}
                  >
                    View Summary
                  </Button>
                )}
              </div>

              {workbookSession && (
                <p className="mt-3 text-xs text-muted-foreground">
                  Last edited {formatDate(workbookSession.updated_at)}
                  {workbookSession.status === "completed" && (
                    <Badge variant="secondary" className="ml-2 text-[10px]">
                      Completed
                    </Badge>
                  )}
                </p>
              )}
            </div>

            {/* Decorative sidebar */}
            <div className="hidden sm:flex w-48 flex-col items-center justify-center bg-butter/10 border-l border-butter/20 p-6">
              <div className="space-y-2 text-center">
                {["Barriers", "Mission", "Brand", "Strategy", "Audit"].map((s, i) => (
                  <div
                    key={s}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <div className={`h-1.5 w-1.5 rounded-full ${
                      i < 2 ? "bg-copper" : "bg-border"
                    }`} />
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Guided Exercises */}
      <div className="animate-in-delayed-2">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground px-3">
            Warm-up exercises
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <ExerciseCard
            icon={<Heart className="h-5 w-5 text-copper" />}
            flow={therapyFlow}
            session={therapySession}
            loading={loading}
            onStart={() => onSelect("content-therapy")}
            onViewSummary={() =>
              therapySession && onSelectSummary("content-therapy", therapySession.id)
            }
            formatDate={formatDate}
            accent="bg-nebula/20"
          />

          <ExerciseCard
            icon={<RefreshCw className="h-5 w-5 text-copper" />}
            flow={resetFlow}
            session={resetSession}
            loading={loading}
            onStart={() => onSelect("quarterly-reset")}
            onViewSummary={() =>
              resetSession && onSelectSummary("quarterly-reset", resetSession.id)
            }
            formatDate={formatDate}
            accent="bg-butter/20"
          />
        </div>
      </div>
    </div>
  );
}

function ExerciseCard({
  icon,
  flow,
  session,
  loading,
  onStart,
  onViewSummary,
  formatDate,
  accent,
}: {
  icon: React.ReactNode;
  flow: (typeof STRATEGY_FLOWS)[string];
  session?: StrategySession;
  loading: boolean;
  onStart: () => void;
  onViewSummary: () => void;
  formatDate: (d: string) => string;
  accent: string;
}) {
  const answeredCount = session
    ? Object.values(session.responses).filter((v) => typeof v === "string" && v.trim()).length
    : 0;
  const totalQuestions = flow.questions.length;
  const progress = session ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  return (
    <Card className="group flex flex-col transition-all duration-200 hover:shadow-warm-lg hover:-translate-y-0.5">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className={`rounded-xl p-2 transition-colors ${accent}`}>{icon}</div>
          <div className="min-w-0">
            <CardTitle className="text-lg font-display">{flow.name}</CardTitle>
            <CardDescription className="text-xs">{flow.tagline}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-end gap-4">
        <p className="text-sm text-muted-foreground leading-relaxed">{flow.description}</p>

        {/* Progress bar */}
        {session && progress > 0 && (
          <div className="space-y-1">
            <div className="h-1 w-full rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-copper transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[11px] text-muted-foreground">
              {answeredCount} of {totalQuestions} answered
            </p>
          </div>
        )}

        <div className="flex items-center justify-between pt-1">
          <div>
            {!session && !loading && (
              <p className="text-xs text-muted-foreground">
                {totalQuestions} questions
              </p>
            )}
            {session?.status === "completed" && (
              <Badge variant="secondary" className="text-[10px]">Done</Badge>
            )}
          </div>
          <div className="flex gap-2">
            {session?.status === "completed" && (
              <Button variant="ghost" size="sm" onClick={onViewSummary} className="text-xs">
                Summary
              </Button>
            )}
            <Button size="sm" onClick={onStart} className="gap-1">
              {session ? "Resume" : "Start"}
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
