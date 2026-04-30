import Link from "next/link";
import { TOOLS } from "@/lib/constants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Zap, FileText, Repeat, Target, BarChart3, Compass } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  FileText,
  Repeat,
  Target,
  BarChart3,
  Compass,
};

export default function ToolsLandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container py-20 text-center">
          <h1 className="text-4xl font-display tracking-tight sm:text-5xl">
            AI tools for creators who{" "}
            <span className="bg-gradient-to-r from-copper to-butter bg-clip-text text-transparent">
              build
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Generate hooks, write scripts, repurpose content, pitch brands, and analyze
            competitors. All powered by Claude.
          </p>
        </section>

        <div className="wave-divider" />

        <section className="container py-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((tool) => {
              const Icon = iconMap[tool.icon];
              const isLive = tool.status === "live";

              return (
                <Link key={tool.slug} href={`/${tool.slug}`}>
                  <Card className="h-full transition-shadow hover:shadow-warm-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        {Icon && (
                          <div className="rounded-2xl bg-butter/40 p-2.5">
                            <Icon className="h-5 w-5 text-copper" />
                          </div>
                        )}
                        <Badge variant={isLive ? "default" : "secondary"}>
                          {isLive ? "Live" : "Coming Soon"}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-display">{tool.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">
                        {tool.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
