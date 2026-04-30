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
        Fill in the blanks to craft your mission statement:
      </p>

      <div className="rounded-xl border border-butter/30 bg-butter/10 p-4 sm:p-5 space-y-4">
        {/* Mobile-friendly stacked layout */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <Input
              value={creatorName}
              onChange={(e) => onChange("creatorName", e.target.value)}
              placeholder="Your name"
              className="sm:w-40 h-9 text-sm border-copper/15"
            />
            <span className="text-sm text-muted-foreground shrink-0">is a creator on</span>
            <Input
              value={platform}
              onChange={(e) => onChange("platform", e.target.value)}
              placeholder="platform"
              className="sm:w-36 h-9 text-sm border-copper/15"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-sm text-muted-foreground shrink-0">who creates content about</span>
            <Input
              value={contentAbout}
              onChange={(e) => onChange("contentAbout", e.target.value)}
              placeholder="what topics"
              className="sm:w-44 h-9 text-sm border-copper/15"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-sm text-muted-foreground shrink-0">that helps</span>
            <Input
              value={helpsWho}
              onChange={(e) => onChange("helpsWho", e.target.value)}
              placeholder="who"
              className="sm:w-40 h-9 text-sm border-copper/15"
            />
            <span className="text-sm text-muted-foreground shrink-0">with</span>
            <Input
              value={helpsWithProblems}
              onChange={(e) => onChange("helpsWithProblems", e.target.value)}
              placeholder="what problems"
              className="sm:flex-1 h-9 text-sm border-copper/15"
            />
          </div>
        </div>
      </div>

      {statement && (
        <div className="rounded-xl border border-copper/15 bg-copper/5 p-4 transition-all">
          <p className="text-[11px] font-medium uppercase tracking-wider text-copper mb-1.5">
            Your Mission
          </p>
          <p className="text-sm font-display leading-relaxed text-foreground">{statement}</p>
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
