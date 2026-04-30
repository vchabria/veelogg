"use client";

import { useCallback, useState } from "react";
import { FlowPicker } from "@/components/content-strategy/flow-picker";
import { Workbook } from "@/components/content-strategy/workbook";
import { QuestionnaireShell } from "@/components/content-strategy/questionnaire-shell";
import { SessionSummary } from "@/components/content-strategy/session-summary";
import type { StrategyFlowId } from "@/types/content-strategy";

type View =
  | { type: "picker" }
  | { type: "workbook" }
  | { type: "exercise"; flowId: StrategyFlowId }
  | { type: "summary"; flowId: StrategyFlowId; sessionId: string };

export default function ContentStrategyPage() {
  const [view, setView] = useState<View>({ type: "picker" });

  const handleSelectFlow = useCallback((flow: StrategyFlowId) => {
    if (flow === "workbook") {
      setView({ type: "workbook" });
    } else {
      setView({ type: "exercise", flowId: flow });
    }
  }, []);

  const handleSelectSummary = useCallback((flow: StrategyFlowId, sessionId: string) => {
    setView({ type: "summary", flowId: flow, sessionId });
  }, []);

  const handleBack = useCallback(() => {
    setView({ type: "picker" });
  }, []);

  const handleComplete = useCallback((sessionId: string) => {
    // Determine the flow from current view
    const flowId = view.type === "workbook"
      ? "workbook"
      : view.type === "exercise"
        ? view.flowId
        : "workbook";

    setView({ type: "summary", flowId, sessionId });
  }, [view]);

  switch (view.type) {
    case "picker":
      return (
        <FlowPicker
          onSelect={handleSelectFlow}
          onSelectSummary={handleSelectSummary}
        />
      );
    case "workbook":
      return <Workbook onBack={handleBack} onComplete={handleComplete} />;
    case "exercise":
      return (
        <QuestionnaireShell
          flowId={view.flowId}
          onBack={handleBack}
          onComplete={handleComplete}
        />
      );
    case "summary":
      return (
        <SessionSummary
          sessionId={view.sessionId}
          flowId={view.flowId}
          onBack={handleBack}
        />
      );
  }
}
