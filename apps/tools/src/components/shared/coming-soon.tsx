import { Badge } from "@/components/ui/badge";

export function ComingSoon({ toolName }: { toolName: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <Badge variant="secondary" className="text-sm">
        Coming Soon
      </Badge>
      <h1 className="text-3xl font-display">{toolName}</h1>
      <p className="max-w-md text-muted-foreground">
        This tool is under development. Subscribe to get notified when it launches.
      </p>
    </div>
  );
}
