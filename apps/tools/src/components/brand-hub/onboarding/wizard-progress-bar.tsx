"use client";

import { cn } from "@/lib/utils";
import type { WizardStep } from "@/hooks/use-onboarding-wizard";

const STEPS: { key: WizardStep; label: string; number: number }[] = [
  { key: "handles", label: "Social Handles", number: 1 },
  { key: "scraping", label: "Analyzing", number: 2 },
  { key: "review", label: "Review & Create", number: 3 },
];

interface WizardProgressBarProps {
  currentStep: WizardStep;
}

export function WizardProgressBar({ currentStep }: WizardProgressBarProps) {
  const currentIndex = STEPS.findIndex((s) => s.key === currentStep);

  return (
    <div className="flex items-center gap-2">
      {STEPS.map((step, i) => {
        const isComplete = i < currentIndex;
        const isCurrent = i === currentIndex;

        return (
          <div key={step.key} className="flex items-center gap-2">
            {i > 0 && (
              <div
                className={cn(
                  "h-px w-8 transition-colors",
                  isComplete ? "bg-copper" : "bg-border"
                )}
              />
            )}
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-colors",
                  isComplete && "bg-copper text-white",
                  isCurrent && "bg-copper/15 text-copper border border-copper/30",
                  !isComplete && !isCurrent && "bg-muted text-muted-foreground"
                )}
              >
                {step.number}
              </div>
              <span
                className={cn(
                  "hidden text-sm sm:inline",
                  isCurrent ? "font-medium text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
