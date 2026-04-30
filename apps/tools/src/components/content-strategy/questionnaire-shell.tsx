"use client";

import { useCallback, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "./progress-bar";
import { QuestionStep } from "./question-step";
import { STRATEGY_FLOWS } from "./flow-data";
import { useStrategySession } from "@/hooks/use-strategy-session";
import type { StrategyFlowId } from "@/types/content-strategy";

interface QuestionnaireShellProps {
  flowId: StrategyFlowId;
  onBack: () => void;
  onComplete: (sessionId: string) => void;
}

export function QuestionnaireShell({ flowId, onBack, onComplete }: QuestionnaireShellProps) {
  const flow = STRATEGY_FLOWS[flowId];
  const {
    session,
    loading,
    saving,
    responses,
    currentStep,
    setCurrentStep,
    updateResponses,
    saveNow,
    createSession,
    completeSession,
  } = useStrategySession(flowId);

  // Create session if one doesn't exist
  useEffect(() => {
    if (!loading && !session) {
      createSession(flowId);
    }
  }, [loading, session, flowId, createSession]);

  const questions = flow.questions;
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentStep] ?? questions[0];
  const answer = (responses[currentQuestion?.id] as string) ?? "";

  const isFirstQuestion = currentStep === 0;
  const isLastQuestion = currentStep === totalQuestions - 1;

  // Check if we're transitioning between parts
  const prevQuestion = currentStep > 0 ? questions[currentStep - 1] : null;
  const isPartTransition = prevQuestion && prevQuestion.partIndex !== currentQuestion?.partIndex;

  const handleAnswer = useCallback(
    (value: string) => {
      if (!currentQuestion) return;
      updateResponses({ [currentQuestion.id]: value });
    },
    [currentQuestion, updateResponses]
  );

  const handleNext = useCallback(async () => {
    await saveNow();
    if (isLastQuestion) {
      await completeSession();
      if (session) onComplete(session.id);
    } else {
      setCurrentStep(currentStep + 1);
    }
  }, [saveNow, isLastQuestion, completeSession, session, onComplete, setCurrentStep, currentStep]);

  const handleBack = useCallback(async () => {
    await saveNow();
    if (isFirstQuestion) {
      onBack();
    } else {
      setCurrentStep(currentStep - 1);
    }
  }, [saveNow, isFirstQuestion, onBack, setCurrentStep, currentStep]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-copper border-t-transparent" />
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to menu
        </button>
        {saving && (
          <span className="text-xs text-muted-foreground animate-pulse">Saving...</span>
        )}
      </div>

      <div>
        <h1 className="text-2xl font-display">{flow.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{flow.tagline}</p>
      </div>

      <ProgressBar
        partLabel={currentQuestion.partLabel}
        partIndex={currentQuestion.partIndex}
        totalParts={flow.parts.length}
        questionIndex={currentStep}
        totalQuestions={totalQuestions}
      />

      {/* Part transition screen */}
      {isPartTransition && (
        <div className="wave-divider" />
      )}

      <QuestionStep
        question={currentQuestion}
        answer={answer}
        onChange={handleAnswer}
      />

      <div className="flex items-center justify-between pt-4">
        <Button
          variant="outline"
          onClick={handleBack}
          className="gap-1.5"
        >
          <ArrowLeft className="h-4 w-4" />
          {isFirstQuestion ? "Exit" : "Back"}
        </Button>
        <Button onClick={handleNext} className="gap-1.5">
          {isLastQuestion ? "Finish" : "Next"}
          {!isLastQuestion && <ArrowRight className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
