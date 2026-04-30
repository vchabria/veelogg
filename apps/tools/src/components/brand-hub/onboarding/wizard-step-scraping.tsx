"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "Connecting to social platforms...",
  "Scraping your top posts...",
  "Analyzing engagement patterns...",
  "Identifying your brand voice...",
  "Detecting content themes...",
  "Building your brand profile...",
];

export function WizardStepScraping() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      <div className="relative">
        <div className="h-12 w-12 animate-spin rounded-full border-3 border-copper/20 border-t-copper" />
      </div>
      <div className="space-y-2 text-center">
        <h2 className="text-lg font-display font-semibold">Analyzing your brand</h2>
        <p className="text-sm text-muted-foreground animate-pulse">
          {MESSAGES[messageIndex]}
        </p>
      </div>
      <p className="text-xs text-muted-foreground/60">
        This usually takes 15-30 seconds
      </p>
    </div>
  );
}
