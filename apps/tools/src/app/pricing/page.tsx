"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";

const FREE_FEATURES = [
  "5 generations per day",
  "Hook Generator",
  "Content Strategy Workbook",
  "All 10 hook frameworks",
  "Copy to clipboard",
];

const PRO_FEATURES = [
  "Unlimited generations",
  "All tools (current + future)",
  "AI strategy briefs",
  "Priority support",
  "Early access to new features",
];

export default function PricingPage() {
  const { user, profile } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleUpgrade() {
    if (!user) {
      router.push("/login?redirect=/pricing");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
    setLoading(false);
  }

  const isPro = profile?.plan === "pro";

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container py-20 text-center animate-in">
          <p className="text-sm font-medium text-copper tracking-wide uppercase mb-3">
            Pricing
          </p>
          <h1 className="text-4xl font-display tracking-tight sm:text-5xl">
            Simple, honest pricing
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-md mx-auto">
            Start free, upgrade when you&apos;re ready. No hidden fees, no surprises.
          </p>
        </section>

        <div className="wave-divider" />

        <section className="container py-16">
          <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2 sm:gap-8">
            {/* Free plan */}
            <Card className="flex flex-col animate-in-delayed">
              <CardHeader className="pb-4">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Free
                </p>
                <p className="text-4xl font-display mt-2">
                  $0
                  <span className="text-base font-sans font-normal text-muted-foreground ml-1">
                    forever
                  </span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  For creators just getting started
                </p>
              </CardHeader>
              <CardContent className="flex-1 space-y-3">
                {FREE_FEATURES.map((f) => (
                  <div key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="h-4 w-4 text-copper shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="pt-4">
                {!user ? (
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/signup">Get Started</a>
                  </Button>
                ) : !isPro ? (
                  <Button variant="outline" className="w-full" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" disabled>
                    Included
                  </Button>
                )}
              </CardFooter>
            </Card>

            {/* Pro plan */}
            <Card className="relative flex flex-col border-copper/30 border-2 bg-gradient-to-br from-card to-butter/5 animate-in-delayed-2">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="gap-1 px-3 py-1 bg-copper text-white border-0 shadow-sm">
                  <Sparkles className="h-3 w-3" />
                  Popular
                </Badge>
              </div>
              <CardHeader className="pb-4 pt-6">
                <p className="text-sm font-medium text-copper uppercase tracking-wide">
                  Pro
                </p>
                <p className="text-4xl font-display mt-2">
                  $19
                  <span className="text-base font-sans font-normal text-muted-foreground ml-1">
                    /month
                  </span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  For creators who are serious about growth
                </p>
              </CardHeader>
              <CardContent className="flex-1 space-y-3">
                {PRO_FEATURES.map((f) => (
                  <div key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="h-4 w-4 text-copper shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="pt-4">
                {isPro ? (
                  <Button variant="outline" className="w-full" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    onClick={handleUpgrade}
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Loading...
                      </div>
                    ) : (
                      "Upgrade to Pro"
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-10 max-w-md mx-auto">
            All plans include full access to the Content Strategy Workbook and guided exercises.
            AI-powered briefs use your generation quota.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
