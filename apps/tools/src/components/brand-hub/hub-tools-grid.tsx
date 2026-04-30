"use client";

import Link from "next/link";
import { Zap, Compass, Target, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ToolLink {
  slug: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  status: "live" | "coming-soon";
}

const TOOLS: ToolLink[] = [
  {
    slug: "hook-generator",
    name: "Hook Generator",
    description: "Generate scroll-stopping hooks tailored to your brand.",
    icon: Zap,
    status: "live",
  },
  {
    slug: "content-strategy",
    name: "Content Strategy",
    description: "Build your content pillars and 3-month strategy.",
    icon: Compass,
    status: "live",
  },
  {
    slug: "brand-pitch",
    name: "Brand Pitch Generator",
    description: "Research brands and generate personalized pitches.",
    icon: Target,
    status: "coming-soon",
  },
  {
    slug: "brand-intel",
    name: "Brand Intelligence",
    description: "Deep analytics on any brand's creator strategy.",
    icon: BarChart3,
    status: "coming-soon",
  },
];

interface HubToolsGridProps {
  profileId: string;
}

export function HubToolsGrid({ profileId }: HubToolsGridProps) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground/70">
        Open any tool with your brand profile pre-loaded.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          const isComingSoon = tool.status === "coming-soon";

          return isComingSoon ? (
            <Card
              key={tool.slug}
              className="opacity-50 cursor-default border-0 shadow-warm/50"
            >
              <CardContent className="flex items-start gap-4 p-7">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted/60">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{tool.name}</p>
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-muted/60">
                      Soon
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{tool.description}</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Link key={tool.slug} href={`/${tool.slug}?profileId=${profileId}`}>
              <Card className="cursor-pointer border-0 shadow-warm transition-all duration-200 hover:shadow-warm-lg hover:-translate-y-0.5">
                <CardContent className="flex items-start gap-4 p-7">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-copper/10">
                    <Icon className="h-5 w-5 text-copper" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <p className="text-sm font-medium">{tool.name}</p>
                    <p className="text-xs text-muted-foreground">{tool.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
