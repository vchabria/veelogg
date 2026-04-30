import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/shared/copy-button";
import type { Hook } from "@/types/hooks";

export function HookCard({ hook }: { hook: Hook }) {
  return (
    <Card className="group relative">
      <CardContent className="flex items-start gap-3 p-4">
        <div className="flex-1 space-y-2">
          <p className="text-sm leading-relaxed">{hook.text}</p>
          <Badge variant="secondary" className="text-[10px]">
            {hook.label}
          </Badge>
        </div>
        <CopyButton text={hook.text} />
      </CardContent>
    </Card>
  );
}
