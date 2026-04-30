"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, Settings, User } from "lucide-react";
import { useState } from "react";

interface UserMenuProps {
  email: string;
  plan: string;
}

export function UserMenu({ email, plan }: UserMenuProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2"
      >
        <User className="h-4 w-4" />
        <span className="hidden sm:inline text-sm">{email}</span>
        <Badge variant={plan === "pro" ? "default" : "secondary"} className="text-[10px] px-1.5">
          {plan.toUpperCase()}
        </Badge>
      </Button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-xl border bg-card p-1 shadow-warm-lg">
            <Link
              href="/account"
              className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
              onClick={() => setOpen(false)}
            >
              <Settings className="h-4 w-4" />
              Account
            </Link>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent text-left"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
