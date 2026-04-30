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
    <div className="space-y-3">
      {/* Part indicators */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: totalParts }).map((_, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className={`h-1 w-full rounded-full transition-all duration-300 ${
                i < partIndex
                  ? "bg-copper"
                  : i === partIndex
                    ? "bg-copper/60"
                    : "bg-secondary"
              }`}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-medium text-foreground">
          {partLabel}
        </span>
        <span>
          {questionIndex + 1} of {totalQuestions}
        </span>
      </div>
    </div>
  );
}
