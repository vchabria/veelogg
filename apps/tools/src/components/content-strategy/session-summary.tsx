"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SummaryResult } from "./summary-result";
import { STRATEGY_FLOWS, WORKBOOK_SECTIONS } from "./flow-data";
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

  // Load session data
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
    <div className="space-y-8">
      <div>
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <h1 className="text-3xl font-display">Review &amp; Summary</h1>
        <p className="mt-2 text-muted-foreground">
          Review your answers below, then optionally generate an AI-powered strategy brief.
        </p>
      </div>

      {/* Display answers */}
      {flowId === "workbook" ? (
        <WorkbookReview data={responses as unknown as WorkbookData} />
      ) : (
        <ExerciseReview flowId={flowId} responses={responses} />
      )}

      {/* AI Summary */}
      <div className="border-t pt-8 space-y-4">
        {summary ? (
          <SummaryResult summary={summary} />
        ) : (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center gap-4 py-8">
              <Sparkles className="h-8 w-8 text-copper" />
              <div className="text-center">
                <p className="font-medium">Generate AI Strategy Brief</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Claude will analyze your answers and create a personalized content strategy summary.
                  This counts as one generation.
                </p>
              </div>
              <Button
                onClick={generateSummary}
                disabled={generating}
                className="gap-1.5"
              >
                {generating ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Summary
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
      </div>
    </div>
  );
}

// ─── Review components ───────────────────────────────────────────────────────

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
    <div className="space-y-4">
      {sections.map((section) => (
        <Card key={section.title}>
          <CardHeader>
            <CardTitle className="text-lg font-display">{section.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {section.items
              .filter((item) => item.value)
              .map((item) => (
                <div key={item.label}>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm whitespace-pre-wrap">{item.value}</p>
                </div>
              ))}
            {section.items.every((item) => !item.value) && (
              <p className="text-sm text-muted-foreground italic">Not filled in yet</p>
            )}
          </CardContent>
        </Card>
      ))}

      {/* Pillars */}
      {data?.strategy?.pillars?.some((p) => p.name) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-display">Content Pillars</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              {data.strategy.pillars.map((pillar, i) => (
                pillar.name && (
                  <div key={i} className="rounded-xl border p-3 space-y-1.5">
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
    <div className="space-y-4">
      {flow.parts.map((partLabel, partIndex) => {
        const partQuestions = flow.questions.filter((q) => q.partIndex === partIndex);
        return (
          <Card key={partLabel}>
            <CardHeader>
              <CardTitle className="text-lg font-display">{partLabel}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {partQuestions.map((q) => {
                const answer = responses[q.id] as string;
                return (
                  <div key={q.id}>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {q.text}
                    </p>
                    <p className="mt-1 text-sm whitespace-pre-wrap">
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
