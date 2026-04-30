"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CopyButton } from "@/components/shared/copy-button";
import { FileText } from "lucide-react";

interface SummaryResultProps {
  summary: string;
}

export function SummaryResult({ summary }: SummaryResultProps) {
  return (
    <Card className="border-copper/15 bg-gradient-to-br from-card via-card to-butter/5 shadow-warm-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-copper/10 p-2">
              <FileText className="h-5 w-5 text-copper" />
            </div>
            <div>
              <h3 className="text-xl font-display">Your Strategy Brief</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                AI-generated from your answers
              </p>
            </div>
          </div>
          <CopyButton text={summary} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-xl border border-copper/10 bg-background/50 p-5 sm:p-6">
          <div className="prose prose-sm max-w-none whitespace-pre-wrap text-sm leading-relaxed text-foreground">
            {summary}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
