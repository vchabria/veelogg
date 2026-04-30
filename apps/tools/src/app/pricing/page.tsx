"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const FREE_FEATURES = [
  "5 generations per day",
  "Hook Generator",
  "All 10 hook frameworks",
  "Copy to clipboard",
];

const PRO_FEATURES = [
  "Unlimited generations",
  "All 5 tools (as they launch)",
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
        <section className="container py-20 text-center">
          <h1 className="text-4xl font-display tracking-tight">Simple pricing</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free. Upgrade when you need more.
          </p>
        </section>

        <div className="wave-divider" />

        <section className="container py-16">
          <div className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-display">Free</CardTitle>
                <CardDescription>For creators just getting started</CardDescription>
                <p className="text-3xl font-display">$0</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {FREE_FEATURES.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-copper" />
                    {f}
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                {!user ? (
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/signup">Get Started</a>
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" disabled>
                    Current Plan
                  </Button>
                )}
              </CardFooter>
            </Card>

            <Card className="border-copper border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-display">Pro</CardTitle>
                  <Badge>Popular</Badge>
                </div>
                <CardDescription>For serious creators</CardDescription>
                <p className="text-3xl font-display">
                  $19<span className="text-base font-sans font-normal text-muted-foreground">/mo</span>
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {PRO_FEATURES.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-copper" />
                    {f}
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                {isPro ? (
                  <Button variant="outline" className="w-full" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button className="w-full" onClick={handleUpgrade} disabled={loading}>
                    {loading ? "Loading..." : "Upgrade to Pro"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
