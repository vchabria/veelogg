"use client";

import { useCallback, useMemo } from "react";
import { WorkbookSection } from "./workbook-section";
import { WORKBOOK_SECTIONS, emptyWorkbookData } from "./flow-data";
import { useStrategySession } from "@/hooks/use-strategy-session";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import type { WorkbookData } from "@/types/content-strategy";

interface WorkbookProps {
  onBack: () => void;
  onComplete: (sessionId: string) => void;
}

export function Workbook({ onBack, onComplete }: WorkbookProps) {
  const {
    session,
    loading,
    saving,
    responses,
    updateResponses,
    saveNow,
    createSession,
  } = useStrategySession("workbook");

  const workbookData = useMemo(() => {
    const defaults = emptyWorkbookData();
    return { ...defaults, ...(responses as Partial<WorkbookData>) } as WorkbookData;
  }, [responses]);

  // Ensure session exists
  const ensureSession = useCallback(async () => {
    if (!session) {
      await createSession("workbook");
    }
  }, [session, createSession]);

  const handleUpdate = useCallback(
    async (patch: Partial<WorkbookData>) => {
      await ensureSession();
      updateResponses(patch as Record<string, unknown>);
    },
    [ensureSession, updateResponses]
  );

  const handleBlur = useCallback(async () => {
    await ensureSession();
    saveNow();
  }, [ensureSession, saveNow]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-copper border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div className="flex items-center gap-3">
          {saving && (
            <span className="text-xs text-muted-foreground animate-pulse">Saving...</span>
          )}
          {session && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => saveNow()}
              className="gap-1.5"
            >
              <Save className="h-3.5 w-3.5" />
              Save
            </Button>
          )}
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-display">Your Content Strategy Workbook</h1>
        <p className="mt-2 text-muted-foreground">
          Work through each section at your own pace. Your progress auto-saves.
        </p>
      </div>

      <div className="space-y-4">
        {WORKBOOK_SECTIONS.map((section) => (
          <WorkbookSection
            key={section.id}
            sectionId={section.id}
            title={section.title}
            description={section.description}
            data={workbookData}
            onUpdate={handleUpdate}
            onBlur={handleBlur}
          />
        ))}
      </div>

      {session && (
        <div className="flex justify-end pt-4">
          <Button onClick={() => onComplete(session.id)} size="lg">
            Review &amp; Generate Summary
          </Button>
        </div>
      )}
    </div>
  );
}
