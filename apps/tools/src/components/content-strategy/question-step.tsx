"use client";

import { useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import type { StrategyQuestion } from "@/types/content-strategy";

interface QuestionStepProps {
  question: StrategyQuestion;
  answer: string;
  onChange: (value: string) => void;
}

export function QuestionStep({ question, answer, onChange }: QuestionStepProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus textarea on new question
  useEffect(() => {
    const timeout = setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
    return () => clearTimeout(timeout);
  }, [question.id]);

  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl sm:text-2xl leading-snug text-foreground">
        {question.text}
      </h2>
      <Textarea
        ref={textareaRef}
        value={answer}
        onChange={(e) => onChange(e.target.value)}
        placeholder={question.placeholder}
        rows={6}
        className="text-base leading-relaxed resize-none border-copper/15 focus-visible:ring-copper/30"
      />
    </div>
  );
}
