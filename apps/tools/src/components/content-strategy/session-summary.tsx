"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, Sparkles, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SummaryResult } from "./summary-result";
import { STRATEGY_FLOWS } from "./flow-data";
import type { StrategyFlowId, StrategySession, WorkbookData } from "@/types/content-strategy";

interface SessionSummaryProps {
  sessionId: string;
  flowId: StrategyFlowId;
  onBack: () => void;
}

export function SessionSummary({ sessionId, flowId, onBack }: SessionSummaryProps) {
  const [session, setSession] = useState<StrategySession | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/content-strategy/session?flow=${flowId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.session) {
            setSession(data.session);
            if (data.session.summary) {
              setSummary(data.session.summary);
            }
          }
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [flowId, sessionId]);

  const generateSummary = useCallback(async () => {
    if (!session) return;
    setGenerating(true);
    setError(null);

    try {
      const res = await fetch("/api/content-strategy/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: session.id, flow: flowId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Failed to generate summary");
        return;
      }

      setSummary(data.summary);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setGenerating(false);
    }
  }, [session, flowId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-copper border-t-transparent" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        Session not found.
      </div>
    );
  }

  const responses = session.responses as Record<string, unknown>;

  return (
    <div className="space-y-8 animate-in">
      <div>
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="flex items-center gap-3 mb-2">
          <PartyPopper className="h-6 w-6 text-butter" />
          <p className="text-sm font-medium text-copper uppercase tracking-wide">
            You did it
          </p>
        </div>
        <h1 className="text-3xl font-display">Review Your Answers</h1>
        <p className="mt-2 text-muted-foreground">
          Everything you wrote, all in one place. Generate an AI brief to turn it into a clear strategy.
        </p>
      </div>

      {/* AI Summary — top position for completed sessions */}
      {summary && (
        <div className="animate-in">
          <SummaryResult summary={summary} />
        </div>
      )}

      {!summary && (
        <Card className="border-dashed border-copper/20 bg-gradient-to-br from-card to-butter/5">
          <CardContent className="flex flex-col items-center gap-4 py-10">
            <div className="rounded-2xl bg-butter/30 p-3">
              <Sparkles className="h-7 w-7 text-copper" />
            </div>
            <div className="text-center max-w-sm">
              <p className="font-display text-lg">Generate your strategy brief</p>
              <p className="text-sm text-muted-foreground mt-1.5">
                AI will read your answers and create a personalized content strategy
                summary with actionable next steps. Uses 1 generation.
              </p>
            </div>
            <Button
              onClick={generateSummary}
              disabled={generating}
              size="lg"
              className="gap-1.5 mt-2"
            >
              {generating ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Writing your brief...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate Brief
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {error && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Answers review */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground px-3">
            Your answers
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {flowId === "workbook" ? (
          <WorkbookReview data={responses as unknown as WorkbookData} />
        ) : (
          <ExerciseReview flowId={flowId} responses={responses} />
        )}
      </div>
    </div>
  );
}

function WorkbookReview({ data }: { data: WorkbookData }) {
  if (!data) return null;

  const sections = [
    {
      title: "Current Barriers",
      items: [{ label: "Barriers", value: data?.barriers?.current }],
    },
    {
      title: "Mission + Vision",
      items: [
        { label: "Long-term goals", value: data?.mission?.longTermGoals },
        { label: "Target audience", value: data?.mission?.targetAudience },
        { label: "Problems you solve", value: data?.mission?.problemsYouSolve },
        { label: "Audience traits", value: data?.mission?.audienceTraits },
      ],
    },
    {
      title: "Brand Overview",
      items: [
        { label: "Reputation", value: data?.brand?.reputation },
        { label: "Audience feeling", value: data?.brand?.audienceFeeling },
        { label: "Unique identifiers", value: data?.brand?.uniqueIdentifiers },
        { label: "One-liners", value: data?.brand?.oneLiners },
      ],
    },
    {
      title: "Content Strategy",
      items: [
        { label: "Goals", value: data?.strategy?.contentGoals?.join(", ") },
        { label: "Platforms", value: data?.strategy?.platforms?.join(", ") },
        { label: "Posting strategy", value: data?.strategy?.postingStrategy },
        { label: "Other strategies", value: data?.strategy?.otherStrategies },
      ],
    },
    {
      title: "Content Audit",
      items: [
        { label: "Strengths", value: data?.audit?.strengths },
        { label: "Opportunities", value: data?.audit?.opportunities },
      ],
    },
  ];

  return (
    <div className="space-y-3">
      {sections.map((section) => (
        <Card key={section.title}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-display">{section.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {section.items
              .filter((item) => item.value)
              .map((item) => (
                <div key={item.label}>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-sm whitespace-pre-wrap leading-relaxed">{item.value}</p>
                </div>
              ))}
            {section.items.every((item) => !item.value) && (
              <p className="text-sm text-muted-foreground italic">Not filled in yet</p>
            )}
          </CardContent>
        </Card>
      ))}

      {data?.strategy?.pillars?.some((p) => p.name) && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-display">Content Pillars</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-3">
              {data.strategy.pillars.map((pillar, i) => (
                pillar.name && (
                  <div key={i} className="rounded-xl border border-copper/10 bg-copper/5 p-3 space-y-1.5">
                    <p className="font-medium text-sm text-copper">Pillar {i + 1}: {pillar.name}</p>
                    {pillar.goal && <p className="text-xs"><span className="text-muted-foreground">Goal:</span> {pillar.goal}</p>}
                    {pillar.style && <p className="text-xs"><span className="text-muted-foreground">Style:</span> {pillar.style}</p>}
                    {pillar.hook && <p className="text-xs"><span className="text-muted-foreground">Hook:</span> {pillar.hook}</p>}
                  </div>
                )
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ExerciseReview({
  flowId,
  responses,
}: {
  flowId: StrategyFlowId;
  responses: Record<string, unknown>;
}) {
  const flow = STRATEGY_FLOWS[flowId];
  if (!flow) return null;

  return (
    <div className="space-y-3">
      {flow.parts.map((partLabel, partIndex) => {
        const partQuestions = flow.questions.filter((q) => q.partIndex === partIndex);
        return (
          <Card key={partLabel}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display">{partLabel}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {partQuestions.map((q) => {
                const answer = responses[q.id] as string;
                return (
                  <div key={q.id}>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      {q.text}
                    </p>
                    <p className="mt-0.5 text-sm whitespace-pre-wrap leading-relaxed">
                      {answer || <span className="text-muted-foreground italic">Skipped</span>}
                    </p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
