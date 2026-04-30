"use client";

interface ProgressBarProps {
  partLabel: string;
  partIndex: number;
  totalParts: number;
  questionIndex: number;
  totalQuestions: number;
}

export function ProgressBar({
  partLabel,
  partIndex,
  totalParts,
  questionIndex,
  totalQuestions,
}: ProgressBarProps) {
  const progress = ((questionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Part {partIndex + 1} of {totalParts} — {partLabel}
        </span>
        <span>
          {questionIndex + 1} / {totalQuestions}
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-copper transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
