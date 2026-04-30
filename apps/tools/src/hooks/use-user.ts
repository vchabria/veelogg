"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { Profile } from "@/types/database";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function getUser() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);

        if (user) {
          const { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();
          setProfile(data);
        }
      } catch {
        // Supabase not configured yet — silently fail
      } finally {
        setLoading(false);
      }
    }

    getUser();

    try {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        if (!session?.user) {
          setProfile(null);
        }
      });

      return () => subscription.unsubscribe();
    } catch {
      setLoading(false);
    }
  }, []);

  return { user, profile, loading };
}
