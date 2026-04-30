"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  BrandProfile,
  BrandProfileInput,
  BrandDealWithDeliverables,
  BrandDealInput,
  BrandDeliverable,
  BrandDeliverableInput,
  BrandDashboardStats,
} from "@/types/brand-hub";

// --- Brand Profiles ---

export function useBrandProfiles() {
  const [profiles, setProfiles] = useState<BrandProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfiles = useCallback(async () => {
    try {
      const res = await fetch("/api/brand-hub/profiles");
      if (res.ok) {
        const data = await res.json();
        setProfiles(data.profiles);
        setError(null);
      }
    } catch {
      setError("Failed to load profiles");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProfiles(); }, [fetchProfiles]);

  const createProfile = useCallback(async (input: BrandProfileInput) => {
    const res = await fetch("/api/brand-hub/profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    await fetchProfiles();
    return data.profile as BrandProfile;
  }, [fetchProfiles]);

  const updateProfile = useCallback(async (id: string, input: Partial<BrandProfileInput>) => {
    const res = await fetch("/api/brand-hub/profiles", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...input }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    await fetchProfiles();
    return data.profile as BrandProfile;
  }, [fetchProfiles]);

  const deleteProfile = useCallback(async (id: string) => {
    const res = await fetch(`/api/brand-hub/profiles?id=${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error);
    }
    await fetchProfiles();
  }, [fetchProfiles]);

  return { profiles, loading, error, createProfile, updateProfile, deleteProfile, refetch: fetchProfiles };
}

// --- Brand Deals ---

export function useBrandDeals(profileId?: string) {
  const [deals, setDeals] = useState<BrandDealWithDeliverables[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDeals = useCallback(async () => {
    try {
      const params = profileId ? `?profileId=${profileId}` : "";
      const res = await fetch(`/api/brand-hub/deals${params}`);
      if (res.ok) {
        const data = await res.json();
        setDeals(data.deals);
        setError(null);
      }
    } catch {
      setError("Failed to load deals");
    } finally {
      setLoading(false);
    }
  }, [profileId]);

  useEffect(() => { fetchDeals(); }, [fetchDeals]);

  const createDeal = useCallback(async (input: BrandDealInput) => {
    const res = await fetch("/api/brand-hub/deals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    await fetchDeals();
    return data.deal;
  }, [fetchDeals]);

  const updateDeal = useCallback(async (id: string, input: Partial<BrandDealInput>) => {
    const res = await fetch("/api/brand-hub/deals", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...input }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    await fetchDeals();
    return data.deal;
  }, [fetchDeals]);

  const deleteDeal = useCallback(async (id: string) => {
    const res = await fetch(`/api/brand-hub/deals?id=${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error);
    }
    await fetchDeals();
  }, [fetchDeals]);

  return { deals, loading, error, createDeal, updateDeal, deleteDeal, refetch: fetchDeals };
}

// --- Brand Deliverables ---

export function useBrandDeliverables(dealId?: string) {
  const [deliverables, setDeliverables] = useState<BrandDeliverable[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDeliverables = useCallback(async () => {
    try {
      const params = dealId ? `?dealId=${dealId}` : "";
      const res = await fetch(`/api/brand-hub/deliverables${params}`);
      if (res.ok) {
        const data = await res.json();
        setDeliverables(data.deliverables);
        setError(null);
      }
    } catch {
      setError("Failed to load deliverables");
    } finally {
      setLoading(false);
    }
  }, [dealId]);

  useEffect(() => { fetchDeliverables(); }, [fetchDeliverables]);

  const createDeliverable = useCallback(async (input: BrandDeliverableInput) => {
    const res = await fetch("/api/brand-hub/deliverables", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    await fetchDeliverables();
    return data.deliverable as BrandDeliverable;
  }, [fetchDeliverables]);

  const updateDeliverable = useCallback(async (id: string, input: Partial<BrandDeliverableInput>) => {
    const res = await fetch("/api/brand-hub/deliverables", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...input }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    await fetchDeliverables();
    return data.deliverable as BrandDeliverable;
  }, [fetchDeliverables]);

  const deleteDeliverable = useCallback(async (id: string) => {
    const res = await fetch(`/api/brand-hub/deliverables?id=${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error);
    }
    await fetchDeliverables();
  }, [fetchDeliverables]);

  return { deliverables, loading, error, createDeliverable, updateDeliverable, deleteDeliverable, refetch: fetchDeliverables };
}

// --- Dashboard ---

export function useBrandDashboard(profileId?: string) {
  const [stats, setStats] = useState<BrandDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = useCallback(async () => {
    try {
      const params = profileId ? `?profileId=${profileId}` : "";
      const res = await fetch(`/api/brand-hub/dashboard${params}`);
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [profileId]);

  useEffect(() => { fetchDashboard(); }, [fetchDashboard]);

  return { stats, loading, refetch: fetchDashboard };
}
