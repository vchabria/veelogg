"use client";

import { useCallback, useEffect, useState } from "react";
import type { UsageInfo } from "@/types/billing";

export function useUsage(tool: string = "hook-generator") {
  const [usage, setUsage] = useState<UsageInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUsage = useCallback(async () => {
    try {
      const res = await fetch(`/api/usage?tool=${tool}`);
      if (res.ok) {
        const data = await res.json();
        setUsage(data);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [tool]);

  useEffect(() => {
    fetchUsage();
  }, [fetchUsage]);

  return { usage, loading, refetch: fetchUsage };
}
