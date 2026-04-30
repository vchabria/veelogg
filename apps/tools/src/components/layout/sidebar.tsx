"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { TOOLS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Zap, FileText, Repeat, Target, BarChart3, Compass } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  FileText,
  Repeat,
  Target,
  BarChart3,
  Compass,
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-card p-4 gap-1">
      <p className="mb-3 px-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
        Tools
      </p>
      {TOOLS.map((tool) => {
        const Icon = iconMap[tool.icon];
        const isActive = pathname.startsWith(`/${tool.slug}`);
        const isComingSoon = tool.status === "coming-soon";

        return (
          <Link
            key={tool.slug}
            href={`/${tool.slug}`}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
              isActive
                ? "bg-butter/30 text-copper font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
          >
            {Icon && <Icon className="h-4 w-4 shrink-0" />}
            <span className="truncate">{tool.name}</span>
            {isComingSoon && (
              <Badge variant="secondary" className="ml-auto text-[10px] px-1.5 py-0">
                Soon
              </Badge>
            )}
          </Link>
        );
      })}
    </aside>
  );
}
