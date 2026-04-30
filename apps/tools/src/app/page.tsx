import Link from "next/link";
import { TOOLS } from "@/lib/constants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Zap, FileText, Repeat, Target, BarChart3, Compass, Briefcase, ArrowRight } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  FileText,
  Repeat,
  Target,
  BarChart3,
  Compass,
  Briefcase,
};

export default function ToolsLandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container py-20 text-center">
          <p className="text-sm font-medium text-copper tracking-wide uppercase mb-4 animate-in">
            Your creator toolkit
          </p>
          <h1 className="text-4xl font-display tracking-tight sm:text-5xl animate-in-delayed">
            Tools that work{" "}
            <span className="bg-gradient-to-r from-copper to-butter bg-clip-text text-transparent">
              as hard as you do
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground animate-in-delayed-2">
            Strategy workbooks, hook generators, and more. Everything you need to
            plan, create, and grow — powered by AI that gets your voice.
          </p>
        </section>

        <div className="wave-divider" />

        <section className="container py-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((tool, i) => {
              const Icon = iconMap[tool.icon];
              const isLive = tool.status === "live";

              return (
                <Link key={tool.slug} href={`/${tool.slug}`}>
                  <Card
                    className={`group h-full transition-all duration-200 hover:shadow-warm-lg hover:-translate-y-0.5 ${
                      isLive ? "border-copper/10" : ""
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        {Icon && (
                          <div className={`rounded-2xl p-2.5 transition-colors ${
                            isLive
                              ? "bg-butter/40 group-hover:bg-butter/60"
                              : "bg-muted group-hover:bg-muted/80"
                          }`}>
                            <Icon className={`h-5 w-5 ${isLive ? "text-copper" : "text-muted-foreground"}`} />
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
                      {isLive && (
                        <div className="mt-3 flex items-center gap-1 text-sm font-medium text-copper opacity-0 group-hover:opacity-100 transition-opacity">
                          Open tool <ArrowRight className="h-3.5 w-3.5" />
                        </div>
                      )}
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
