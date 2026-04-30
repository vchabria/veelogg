"use client";

import { Input } from "@/components/ui/input";

interface MissionBuilderProps {
  creatorName: string;
  platform: string;
  contentAbout: string;
  helpsWho: string;
  helpsWithProblems: string;
  onChange: (field: string, value: string) => void;
}

export function MissionBuilder({
  creatorName,
  platform,
  contentAbout,
  helpsWho,
  helpsWithProblems,
  onChange,
}: MissionBuilderProps) {
  const statement = buildStatement(creatorName, platform, contentAbout, helpsWho, helpsWithProblems);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Fill in the blanks to build your mission statement:
      </p>

      <div className="rounded-xl border bg-butter/10 p-4 space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-sm leading-relaxed">
          <Input
            value={creatorName}
            onChange={(e) => onChange("creatorName", e.target.value)}
            placeholder="Your name"
            className="w-36 inline-flex h-8 text-sm"
          />
          <span>is a creator on</span>
          <Input
            value={platform}
            onChange={(e) => onChange("platform", e.target.value)}
            placeholder="platform"
            className="w-32 inline-flex h-8 text-sm"
          />
          <span>who creates content about</span>
          <Input
            value={contentAbout}
            onChange={(e) => onChange("contentAbout", e.target.value)}
            placeholder="what"
            className="w-40 inline-flex h-8 text-sm"
          />
          <span>that helps</span>
          <Input
            value={helpsWho}
            onChange={(e) => onChange("helpsWho", e.target.value)}
            placeholder="who"
            className="w-36 inline-flex h-8 text-sm"
          />
          <span>with</span>
          <Input
            value={helpsWithProblems}
            onChange={(e) => onChange("helpsWithProblems", e.target.value)}
            placeholder="what problems"
            className="w-44 inline-flex h-8 text-sm"
          />
        </div>
      </div>

      {statement && (
        <div className="rounded-xl border border-copper/20 bg-card p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
            Your Mission Statement
          </p>
          <p className="text-sm font-display text-foreground">{statement}</p>
        </div>
      )}
    </div>
  );
}

function buildStatement(
  name: string,
  platform: string,
  what: string,
  who: string,
  problems: string,
): string {
  if (!name && !platform && !what && !who && !problems) return "";
  return `${name || "[Name]"} is a creator on ${platform || "[platform]"} who creates content about ${what || "[what]"} that helps ${who || "[who]"} with ${problems || "[problems]"}.`;
}
