"use client";

import { useCallback, useMemo, useState } from "react";
import { WorkbookSection } from "./workbook-section";
import { WORKBOOK_SECTIONS, emptyWorkbookData } from "./flow-data";
import { useStrategySession } from "@/hooks/use-strategy-session";
import { Button } from "@/components/ui/button";
import { BrandProfileSelect } from "@/components/shared/brand-profile-select";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { WorkbookData } from "@/types/content-strategy";
import type { BrandProfile } from "@/types/brand-hub";

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

  const [brandApplied, setBrandApplied] = useState(false);

  const workbookData = useMemo(() => {
    const defaults = emptyWorkbookData();
    return { ...defaults, ...(responses as Partial<WorkbookData>) } as WorkbookData;
  }, [responses]);

  const ensureSession = useCallback(async () => {
    if (!session) {
      await createSession("workbook");
    }
  }, [session, createSession]);

  const handleBrandSelect = useCallback(
    async (profile: BrandProfile | null) => {
      if (!profile || brandApplied) return;
      setBrandApplied(true);
      await ensureSession();
      const patch: Partial<WorkbookData> = {};
      if (profile.niche && !workbookData.mission.contentAbout) {
        patch.mission = { ...workbookData.mission, contentAbout: profile.niche };
      }
      if (profile.audience && !workbookData.mission.targetAudience) {
        patch.mission = { ...(patch.mission ?? workbookData.mission), targetAudience: profile.audience };
      }
      if (profile.platforms?.length && (!workbookData.strategy.platforms || workbookData.strategy.platforms.length === 0)) {
        const platformLabels: Record<string, string> = {
          youtube: "YouTube",
          tiktok: "TikTok",
          instagram: "Instagram",
          twitter: "Twitter/X",
          linkedin: "LinkedIn",
          other: "Other",
        };
        patch.strategy = {
          ...workbookData.strategy,
          platforms: profile.platforms.map((p) => platformLabels[p] ?? p),
        };
      }
      if (Object.keys(patch).length > 0) {
        updateResponses(patch as Record<string, unknown>);
      }
    },
    [brandApplied, ensureSession, workbookData, updateResponses]
  );

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
    <div className="space-y-8 animate-in">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        {saving && (
          <span className="text-xs text-muted-foreground animate-pulse">Saving...</span>
        )}
      </div>

      <div>
        <p className="text-sm font-medium text-copper tracking-wide uppercase mb-2">
          Interactive Workbook
        </p>
        <h1 className="text-3xl font-display">Your Content Strategy</h1>
        <p className="mt-2 text-muted-foreground">
          Work through each section at your own pace. Click to expand, and your
          answers save automatically as you type.
        </p>
      </div>

      <BrandProfileSelect onSelect={handleBrandSelect} />

      <div className="space-y-3">
        {WORKBOOK_SECTIONS.map((section, i) => (
          <div key={section.id} style={{ animationDelay: `${i * 50}ms` }} className="animate-in">
            <WorkbookSection
              sectionId={section.id}
              title={section.title}
              description={section.description}
              data={workbookData}
              onUpdate={handleUpdate}
              onBlur={handleBlur}
            />
          </div>
        ))}
      </div>

      {session && (
        <div className="flex justify-end pt-4">
          <Button onClick={() => onComplete(session.id)} size="lg" className="gap-1.5">
            Review &amp; Generate Summary
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
