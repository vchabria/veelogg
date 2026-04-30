"use client";

import { useEffect, useState } from "react";
import { Compass, Heart, RefreshCw } from "lucide-react";
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
      year: "numeric",
    });
  }

  const workbookSession = getSession("workbook");
  const therapyFlow = STRATEGY_FLOWS["content-therapy"];
  const therapySession = getSession("content-therapy");
  const resetFlow = STRATEGY_FLOWS["quarterly-reset"];
  const resetSession = getSession("quarterly-reset");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display">Content Strategy</h1>
        <p className="mt-2 text-muted-foreground">
          Define your brand, content pillars, and 3-month strategy. Start with the workbook
          or warm up with a guided exercise.
        </p>
      </div>

      {/* Workbook Card — Large prominent card */}
      <Card className="border-copper/20 bg-gradient-to-br from-card to-butter/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-butter/40 p-2.5">
              <Compass className="h-5 w-5 text-copper" />
            </div>
            <div>
              <CardTitle className="text-xl font-display">
                Your Content Strategy Workbook
              </CardTitle>
              <CardDescription>
                5 sections covering barriers, mission, brand, strategy, and content audit.
                Fill in at your own pace — everything auto-saves.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              {workbookSession && (
                <p className="text-xs text-muted-foreground">
                  Last updated {formatDate(workbookSession.updated_at)}
                  {workbookSession.status === "completed" && (
                    <Badge variant="secondary" className="ml-2 text-[10px]">
                      Completed
                    </Badge>
                  )}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              {workbookSession?.status === "completed" && (
                <Button
                  variant="outline"
                  onClick={() => onSelectSummary("workbook", workbookSession.id)}
                >
                  View Summary
                </Button>
              )}
              <Button onClick={() => onSelect("workbook")}>
                {workbookSession ? "Resume Workbook" : "Start Workbook"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guided Exercises — 2 smaller cards side by side */}
      <div>
        <h2 className="text-lg font-display mb-3">Guided Exercises</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Warm-up exercises to help you brainstorm and reflect before filling in the workbook.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Content Therapy */}
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
          />

          {/* Quarterly Reset */}
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
}: {
  icon: React.ReactNode;
  flow: (typeof STRATEGY_FLOWS)[string];
  session?: StrategySession;
  loading: boolean;
  onStart: () => void;
  onViewSummary: () => void;
  formatDate: (d: string) => string;
}) {
  const answeredCount = session
    ? Object.values(session.responses).filter((v) => typeof v === "string" && v.trim()).length
    : 0;
  const totalQuestions = flow.questions.length;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-butter/40 p-2.5">{icon}</div>
          <div className="min-w-0">
            <CardTitle className="text-lg font-display">{flow.name}</CardTitle>
            <CardDescription className="text-xs">{flow.tagline}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-end gap-3">
        <p className="text-sm text-muted-foreground">{flow.description}</p>

        <div className="flex items-center justify-between">
          <div>
            {session && (
              <p className="text-xs text-muted-foreground">
                {answeredCount}/{totalQuestions} answered
                {session.status === "completed" && (
                  <Badge variant="secondary" className="ml-2 text-[10px]">
                    Done
                  </Badge>
                )}
              </p>
            )}
            {!session && !loading && (
              <p className="text-xs text-muted-foreground">
                {totalQuestions} questions
              </p>
            )}
          </div>
          <div className="flex gap-2">
            {session?.status === "completed" && (
              <Button variant="outline" size="sm" onClick={onViewSummary}>
                Summary
              </Button>
            )}
            <Button size="sm" onClick={onStart}>
              {session ? "Resume" : "Start"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
