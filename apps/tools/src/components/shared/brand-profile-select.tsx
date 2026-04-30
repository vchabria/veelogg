"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Briefcase } from "lucide-react";
import type { BrandProfile } from "@/types/brand-hub";

interface BrandProfileSelectProps {
  onSelect: (profile: BrandProfile | null) => void;
  defaultProfileId?: string;
  className?: string;
}

export function BrandProfileSelect({ onSelect, defaultProfileId, className }: BrandProfileSelectProps) {
  const [profiles, setProfiles] = useState<BrandProfile[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/brand-hub/profiles");
        if (res.ok) {
          const data = await res.json();
          const loadedProfiles: BrandProfile[] = data.profiles ?? [];
          setProfiles(loadedProfiles);

          // Auto-select from URL param or defaultProfileId prop
          const urlProfileId = searchParams.get("profileId");
          const autoId = urlProfileId || defaultProfileId;
          if (autoId) {
            const match = loadedProfiles.find((p) => p.id === autoId);
            if (match) {
              setSelectedId(match.id);
              onSelect(match);
            }
          }
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    load();
    // Only run on mount + searchParams change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  if (loading || profiles.length === 0) return null;

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const id = e.target.value;
    setSelectedId(id);
    if (!id) {
      onSelect(null);
    } else {
      const profile = profiles.find((p) => p.id === id) ?? null;
      onSelect(profile);
    }
  }

  return (
    <div className={className}>
      <label className="flex items-center gap-1.5 text-sm font-medium mb-2">
        <Briefcase className="h-3.5 w-3.5" />
        Brand Profile{" "}
        <span className="text-muted-foreground font-normal">(optional)</span>
      </label>
      <select
        value={selectedId}
        onChange={handleChange}
        className="flex h-10 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <option value="">No brand profile</option>
        {profiles.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name} — {p.niche}
          </option>
        ))}
      </select>
    </div>
  );
}
