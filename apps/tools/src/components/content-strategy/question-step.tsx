"use client";

import { Textarea } from "@/components/ui/textarea";
import type { StrategyQuestion } from "@/types/content-strategy";

interface QuestionStepProps {
  question: StrategyQuestion;
  answer: string;
  onChange: (value: string) => void;
}

export function QuestionStep({ question, answer, onChange }: QuestionStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl sm:text-2xl leading-snug">
        {question.text}
      </h2>
      <Textarea
        value={answer}
        onChange={(e) => onChange(e.target.value)}
        placeholder={question.placeholder}
        rows={6}
        className="text-base leading-relaxed resize-none"
      />
    </div>
  );
}
