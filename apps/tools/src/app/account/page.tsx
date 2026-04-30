"use client";

import { useState } from "react";
import { useUser } from "@/hooks/use-user";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

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

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container max-w-2xl flex-1 py-8 space-y-6">
        <h1 className="text-3xl font-display">Account</h1>

        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Email</span>
              <span className="text-sm">{user?.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Plan</span>
              <Badge variant={profile?.plan === "pro" ? "default" : "secondary"}>
                {profile?.plan?.toUpperCase() ?? "FREE"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing</CardTitle>
            <CardDescription>
              {profile?.plan === "pro"
                ? "Manage your subscription and billing details."
                : "Upgrade to Pro for unlimited access to all tools."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {profile?.plan === "pro" ? (
              <Button
                variant="outline"
                onClick={handleManageBilling}
                disabled={portalLoading}
              >
                {portalLoading ? "Loading..." : "Manage Billing"}
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
