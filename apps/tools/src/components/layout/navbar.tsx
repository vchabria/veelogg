"use client";

import Link from "next/link";
import { useUser } from "@/hooks/use-user";
import { UserMenu } from "./user-menu";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { user, profile, loading } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-xl bg-gradient-to-r from-copper to-butter bg-clip-text text-transparent">
            Veelogg
          </span>
          <span className="text-xs text-muted-foreground font-normal">tools</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/pricing"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
          {loading ? null : user ? (
            <UserMenu email={user.email ?? ""} plan={profile?.plan ?? "free"} />
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
