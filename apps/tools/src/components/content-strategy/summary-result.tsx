"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/shared/copy-button";

interface SummaryResultProps {
  summary: string;
}

export function SummaryResult({ summary }: SummaryResultProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-display">Your Strategy Brief</CardTitle>
          <CopyButton text={summary} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none whitespace-pre-wrap text-sm leading-relaxed text-foreground">
          {summary}
        </div>
      </CardContent>
    </Card>
  );
}
