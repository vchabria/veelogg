"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MissionBuilder } from "./mission-builder";
import { PillarCard } from "./pillar-card";
import { CONTENT_GOAL_PRESETS, PLATFORM_OPTIONS } from "./flow-data";
import type { WorkbookData, ContentPillar } from "@/types/content-strategy";

interface WorkbookSectionProps {
  sectionId: string;
  title: string;
  description: string;
  data: WorkbookData;
  onUpdate: (patch: Partial<WorkbookData>) => void;
  onBlur: () => void;
}

export function WorkbookSection({
  sectionId,
  title,
  description,
  data,
  onUpdate,
  onBlur,
}: WorkbookSectionProps) {
  const [open, setOpen] = useState(false);
  const filled = isSectionFilled(sectionId, data);

  return (
    <div className="rounded-2xl border bg-card shadow-warm">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-5 text-left"
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs",
              filled
                ? "border-copper bg-copper text-white"
                : "border-muted-foreground/30 text-muted-foreground"
            )}
          >
            {filled && <Check className="h-3.5 w-3.5" />}
          </div>
          <div>
            <h3 className="font-display text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="border-t px-5 py-6 space-y-6">
          {sectionId === "barriers" && (
            <BarriersInputs data={data} onUpdate={onUpdate} onBlur={onBlur} />
          )}
          {sectionId === "mission" && (
            <MissionInputs data={data} onUpdate={onUpdate} onBlur={onBlur} />
          )}
          {sectionId === "brand" && (
            <BrandInputs data={data} onUpdate={onUpdate} onBlur={onBlur} />
          )}
          {sectionId === "strategy" && (
            <StrategyInputs data={data} onUpdate={onUpdate} onBlur={onBlur} />
          )}
          {sectionId === "audit" && (
            <AuditInputs data={data} onUpdate={onUpdate} onBlur={onBlur} />
          )}
        </div>
      )}
    </div>
  );
}

// ─── Section input components ────────────────────────────────────────────────

function BarriersInputs({
  data,
  onUpdate,
  onBlur,
}: {
  data: WorkbookData;
  onUpdate: (p: Partial<WorkbookData>) => void;
  onBlur: () => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">What&apos;s blocking you right now?</label>
      <Textarea
        value={data.barriers.current}
        onChange={(e) =>
          onUpdate({ barriers: { ...data.barriers, current: e.target.value } })
        }
        onBlur={onBlur}
        placeholder="Be specific — lack of time, fear of judgment, no ideas, burnout..."
        rows={4}
      />
    </div>
  );
}

function MissionInputs({
  data,
  onUpdate,
  onBlur,
}: {
  data: WorkbookData;
  onUpdate: (p: Partial<WorkbookData>) => void;
  onBlur: () => void;
}) {
  function updateField(field: string, value: string) {
    onUpdate({ mission: { ...data.mission, [field]: value } });
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium">Long-term goals</label>
        <Textarea
          value={data.mission.longTermGoals}
          onChange={(e) => updateField("longTermGoals", e.target.value)}
          onBlur={onBlur}
          placeholder="Where do you want to be in 1-2 years with your content?"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Target audience</label>
        <Textarea
          value={data.mission.targetAudience}
          onChange={(e) => updateField("targetAudience", e.target.value)}
          onBlur={onBlur}
          placeholder="Who are you making content for? Be specific."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Problems you solve</label>
        <Textarea
          value={data.mission.problemsYouSolve}
          onChange={(e) => updateField("problemsYouSolve", e.target.value)}
          onBlur={onBlur}
          placeholder="What pain points does your content address?"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Audience interests &amp; traits</label>
        <Input
          value={data.mission.audienceTraits}
          onChange={(e) => updateField("audienceTraits", e.target.value)}
          onBlur={onBlur}
          placeholder="e.g. entrepreneurship, self-improvement, fitness, humor"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Mission statement builder</label>
        <MissionBuilder
          creatorName={data.mission.creatorName}
          platform={data.mission.platform}
          contentAbout={data.mission.contentAbout}
          helpsWho={data.mission.helpsWho}
          helpsWithProblems={data.mission.helpsWithProblems}
          onChange={(field, value) => {
            updateField(field, value);
          }}
        />
      </div>
    </div>
  );
}

function BrandInputs({
  data,
  onUpdate,
  onBlur,
}: {
  data: WorkbookData;
  onUpdate: (p: Partial<WorkbookData>) => void;
  onBlur: () => void;
}) {
  function updateField(field: string, value: string) {
    onUpdate({ brand: { ...data.brand, [field]: value } });
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium">Brand reputation</label>
        <Textarea
          value={data.brand.reputation}
          onChange={(e) => updateField("reputation", e.target.value)}
          onBlur={onBlur}
          placeholder="How do you want people to describe you?"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">How should your audience feel?</label>
        <Textarea
          value={data.brand.audienceFeeling}
          onChange={(e) => updateField("audienceFeeling", e.target.value)}
          onBlur={onBlur}
          placeholder="What emotion do you want people to leave with?"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Unique identifiers</label>
        <Textarea
          value={data.brand.uniqueIdentifiers}
          onChange={(e) => updateField("uniqueIdentifiers", e.target.value)}
          onBlur={onBlur}
          placeholder="What makes you recognizable? Catchphrases, visual style, recurring themes..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">One-liners &amp; taglines</label>
        <Textarea
          value={data.brand.oneLiners}
          onChange={(e) => updateField("oneLiners", e.target.value)}
          onBlur={onBlur}
          placeholder="Short phrases that capture your brand."
          rows={3}
        />
      </div>
    </div>
  );
}

function StrategyInputs({
  data,
  onUpdate,
  onBlur,
}: {
  data: WorkbookData;
  onUpdate: (p: Partial<WorkbookData>) => void;
  onBlur: () => void;
}) {
  function updateField(field: string, value: unknown) {
    onUpdate({ strategy: { ...data.strategy, [field]: value } });
  }

  function toggleGoal(goal: string) {
    const current = data.strategy.contentGoals;
    const next = current.includes(goal)
      ? current.filter((g) => g !== goal)
      : [...current, goal];
    updateField("contentGoals", next);
  }

  function togglePlatform(platform: string) {
    const current = data.strategy.platforms;
    const next = current.includes(platform)
      ? current.filter((p) => p !== platform)
      : [...current, platform];
    updateField("platforms", next);
  }

  function updatePillar(index: number, pillar: ContentPillar) {
    const pillars = [...data.strategy.pillars] as [ContentPillar, ContentPillar, ContentPillar];
    pillars[index] = pillar;
    updateField("pillars", pillars);
  }

  return (
    <div className="space-y-6">
      {/* Content Goals */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Content goals (select all that apply)</label>
        <div className="flex flex-wrap gap-2">
          {CONTENT_GOAL_PRESETS.map((goal) => (
            <button
              key={goal}
              type="button"
              onClick={() => toggleGoal(goal)}
              className={cn(
                "rounded-full border px-3 py-1 text-sm transition-colors",
                data.strategy.contentGoals.includes(goal)
                  ? "border-copper bg-copper/10 text-copper"
                  : "border-input text-muted-foreground hover:text-foreground"
              )}
            >
              {goal}
            </button>
          ))}
        </div>
        <Input
          value={data.strategy.customGoals}
          onChange={(e) => updateField("customGoals", e.target.value)}
          onBlur={onBlur}
          placeholder="Add custom goals..."
        />
      </div>

      {/* Content Pillars */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Content pillars</label>
        <p className="text-xs text-muted-foreground">
          Define 3 core content categories that make up your brand.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {data.strategy.pillars.map((pillar, i) => (
            <PillarCard
              key={i}
              index={i}
              pillar={pillar}
              onChange={(p) => updatePillar(i, p)}
              onBlur={onBlur}
            />
          ))}
        </div>
      </div>

      {/* Platforms */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Platforms</label>
        <div className="flex flex-wrap gap-2">
          {PLATFORM_OPTIONS.map((platform) => (
            <button
              key={platform}
              type="button"
              onClick={() => togglePlatform(platform)}
              className={cn(
                "rounded-full border px-3 py-1 text-sm transition-colors",
                data.strategy.platforms.includes(platform)
                  ? "border-copper bg-copper/10 text-copper"
                  : "border-input text-muted-foreground hover:text-foreground"
              )}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>

      {/* Posting Strategy */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Posting strategy</label>
        <Textarea
          value={data.strategy.postingStrategy}
          onChange={(e) => updateField("postingStrategy", e.target.value)}
          onBlur={onBlur}
          placeholder="How often will you post? What days/times? Batch filming schedule?"
          rows={3}
        />
      </div>

      {/* Other Strategies */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Other strategies</label>
        <Textarea
          value={data.strategy.otherStrategies}
          onChange={(e) => updateField("otherStrategies", e.target.value)}
          onBlur={onBlur}
          placeholder="Collaboration plans, engagement tactics, growth strategies..."
          rows={3}
        />
      </div>
    </div>
  );
}

function AuditInputs({
  data,
  onUpdate,
  onBlur,
}: {
  data: WorkbookData;
  onUpdate: (p: Partial<WorkbookData>) => void;
  onBlur: () => void;
}) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium">Strengths</label>
        <Textarea
          value={data.audit.strengths}
          onChange={(e) =>
            onUpdate({ audit: { ...data.audit, strengths: e.target.value } })
          }
          onBlur={onBlur}
          placeholder="What are you already good at? What content performs best?"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Opportunities</label>
        <Textarea
          value={data.audit.opportunities}
          onChange={(e) =>
            onUpdate({ audit: { ...data.audit, opportunities: e.target.value } })
          }
          onBlur={onBlur}
          placeholder="Where can you improve? What gaps do you see?"
          rows={3}
        />
      </div>
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isSectionFilled(sectionId: string, data: WorkbookData): boolean {
  switch (sectionId) {
    case "barriers":
      return !!data.barriers.current.trim();
    case "mission":
      return !!(
        data.mission.longTermGoals.trim() ||
        data.mission.targetAudience.trim() ||
        data.mission.creatorName.trim()
      );
    case "brand":
      return !!(
        data.brand.reputation.trim() ||
        data.brand.audienceFeeling.trim()
      );
    case "strategy":
      return !!(
        data.strategy.contentGoals.length > 0 ||
        data.strategy.pillars.some((p) => p.name.trim())
      );
    case "audit":
      return !!(
        data.audit.strengths.trim() ||
        data.audit.opportunities.trim()
      );
    default:
      return false;
  }
}
