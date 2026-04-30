"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
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

  const [showTransition, setShowTransition] = useState(false);
  const [transitionPart, setTransitionPart] = useState<{ from: string; to: string } | null>(null);

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
      const nextQuestion = questions[currentStep + 1];
      if (nextQuestion && currentQuestion && nextQuestion.partIndex !== currentQuestion.partIndex) {
        setTransitionPart({
          from: currentQuestion.partLabel,
          to: nextQuestion.partLabel,
        });
        setShowTransition(true);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  }, [saveNow, isLastQuestion, completeSession, session, onComplete, setCurrentStep, currentStep, questions, currentQuestion]);

  const handleContinueFromTransition = useCallback(() => {
    setShowTransition(false);
    setTransitionPart(null);
    setCurrentStep(currentStep + 1);
  }, [setCurrentStep, currentStep]);

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

  // Part transition screen
  if (showTransition && transitionPart) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-in">
        <div className="wave-divider-copper w-full max-w-xs mb-8" />

        <Sparkles className="h-8 w-8 text-butter mb-4 animate-float" />

        <p className="text-sm text-muted-foreground mb-2">
          Nice work on <span className="font-medium text-foreground">{transitionPart.from}</span>
        </p>

        <h2 className="text-2xl font-display mb-2">
          Up next: {transitionPart.to}
        </h2>

        <p className="text-sm text-muted-foreground max-w-sm mb-8">
          Take a breath. The next section builds on what you just explored.
        </p>

        <Button onClick={handleContinueFromTransition} className="gap-1.5">
          Continue <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in">
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

      <div key={currentQuestion.id} className="animate-in">
        <QuestionStep
          question={currentQuestion}
          answer={answer}
          onChange={handleAnswer}
        />
      </div>

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
