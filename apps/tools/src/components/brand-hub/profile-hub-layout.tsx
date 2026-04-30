"use client";

import { cn } from "@/lib/utils";

export type HubTab = "overview" | "deals" | "calendar" | "tools";

const TABS: { key: HubTab; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "deals", label: "Deals" },
  { key: "calendar", label: "Calendar" },
  { key: "tools", label: "Tools" },
];

interface ProfileHubLayoutProps {
  activeTab: HubTab;
  onTabChange: (tab: HubTab) => void;
  children: React.ReactNode;
}

export function ProfileHubLayout({
  activeTab,
  onTabChange,
  children,
}: ProfileHubLayoutProps) {
  return (
    <div className="space-y-8">
      {/* Tab bar */}
      <div className="border-b border-border/40">
        <nav className="flex gap-1 -mb-px overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={cn(
                "whitespace-nowrap px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors border-b-2",
                activeTab === tab.key
                  ? "border-copper text-copper"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      <div className="pb-4">
        {children}
      </div>
    </div>
  );
}
