"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  className?: string;
}

export function StatsCard({ icon, value, label, className }: StatsCardProps) {
  return (
    <Card className={cn("border-0 shadow-warm", className)}>
      <CardContent className="flex items-center gap-4 p-7">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-copper/10">
          {icon}
        </div>
        <div>
          <p className="text-2xl font-semibold tracking-tight">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
