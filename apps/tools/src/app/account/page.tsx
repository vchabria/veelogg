"use client";

import { useState } from "react";
import { useUser } from "@/hooks/use-user";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { User, CreditCard, Sparkles } from "lucide-react";

export default function AccountPage() {
  const { user, profile, loading: userLoading } = useUser();
  const [portalLoading, setPortalLoading] = useState(false);

  async function handleManageBilling() {
    setPortalLoading(true);
    const res = await fetch("/api/stripe/portal", { method: "POST" });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
    setPortalLoading(false);
  }

  if (userLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <LoadingSpinner className="flex-1" />
      </div>
    );
  }

  const isPro = profile?.plan === "pro";

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container max-w-2xl flex-1 py-10 space-y-6">
        <div className="animate-in">
          <p className="text-sm font-medium text-copper tracking-wide uppercase mb-2">
            Settings
          </p>
          <h1 className="text-3xl font-display">Your Account</h1>
        </div>

        <Card className="animate-in-delayed">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-butter/30 p-1.5">
                <User className="h-4 w-4 text-copper" />
              </div>
              <CardTitle className="text-lg">Profile</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Email</span>
              <span className="text-sm font-medium">{user?.email}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Plan</span>
              <Badge
                variant={isPro ? "default" : "secondary"}
                className={isPro ? "bg-copper text-white border-0" : ""}
              >
                {isPro ? (
                  <span className="flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    PRO
                  </span>
                ) : (
                  "FREE"
                )}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-in-delayed-2">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-nebula/30 p-1.5">
                <CreditCard className="h-4 w-4 text-copper" />
              </div>
              <CardTitle className="text-lg">Billing</CardTitle>
            </div>
            <CardDescription className="ml-9">
              {isPro
                ? "Manage your subscription and billing details."
                : "Upgrade to Pro for unlimited access to all tools."}
            </CardDescription>
          </CardHeader>
          <CardContent className="ml-9">
            {isPro ? (
              <Button
                variant="outline"
                onClick={handleManageBilling}
                disabled={portalLoading}
              >
                {portalLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-copper border-t-transparent" />
                    Loading...
                  </div>
                ) : (
                  "Manage Billing"
                )}
              </Button>
            ) : (
              <Button asChild>
                <a href="/pricing">Upgrade to Pro</a>
              </Button>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
