"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { StrategyFlowId, StrategySession } from "@/types/content-strategy";

const LS_PREFIX = "veelogg-strategy-";

interface UseStrategySessionReturn {
  session: StrategySession | null;
  loading: boolean;
  saving: boolean;
  responses: Record<string, unknown>;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  updateResponses: (patch: Record<string, unknown>) => void;
  saveNow: () => Promise<void>;
  createSession: (flow: StrategyFlowId) => Promise<StrategySession | null>;
  completeSession: () => Promise<void>;
}

function getLocalData(flow: StrategyFlowId) {
  try {
    const raw = localStorage.getItem(`${LS_PREFIX}${flow}`);
    if (raw) return JSON.parse(raw) as { responses: Record<string, unknown>; step: number };
  } catch { /* ignore */ }
  return null;
}

function setLocalData(flow: StrategyFlowId, responses: Record<string, unknown>, step: number) {
  try {
    localStorage.setItem(`${LS_PREFIX}${flow}`, JSON.stringify({ responses, step }));
  } catch { /* ignore — storage full or unavailable */ }
}

function clearLocalData(flow: StrategyFlowId) {
  try {
    localStorage.removeItem(`${LS_PREFIX}${flow}`);
  } catch { /* ignore */ }
}

export function useStrategySession(flow: StrategyFlowId): UseStrategySessionReturn {
  const [session, setSession] = useState<StrategySession | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [responses, setResponses] = useState<Record<string, unknown>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load existing session on mount, with localStorage fallback
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/content-strategy/session?flow=${flow}`);
        if (res.ok) {
          const data = await res.json();
          if (data.session) {
            setSession(data.session);

            // Merge: prefer localStorage if it has newer data
            const local = getLocalData(flow);
            const serverResponses = data.session.responses ?? {};
            const localResponses = local?.responses ?? {};

            // Use whichever has more keys (proxy for "more recent edits")
            const serverKeys = Object.keys(serverResponses).length;
            const localKeys = Object.keys(localResponses).length;

            if (localKeys > serverKeys) {
              setResponses(localResponses);
              setCurrentStep(local?.step ?? data.session.current_step ?? 0);
            } else {
              setResponses(serverResponses);
              setCurrentStep(data.session.current_step ?? 0);
              // Sync server data to localStorage
              setLocalData(flow, serverResponses, data.session.current_step ?? 0);
            }
            return;
          }
        }
      } catch {
        // Server unreachable — try localStorage
        const local = getLocalData(flow);
        if (local) {
          setResponses(local.responses);
          setCurrentStep(local.step);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [flow]);

  // Save to server
  const saveToServer = useCallback(
    async (sessionId: string, data: Record<string, unknown>, step: number) => {
      setSaving(true);
      try {
        const res = await fetch("/api/content-strategy/session", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: sessionId, responses: data, current_step: step }),
        });
        if (res.ok) {
          const result = await res.json();
          setSession(result.session);
          clearLocalData(flow); // Server is up to date, clear local buffer
        }
      } catch {
        // Server save failed — localStorage is the backup
      } finally {
        setSaving(false);
      }
    },
    [flow]
  );

  // Debounced auto-save (500ms)
  const scheduleSave = useCallback(
    (data: Record<string, unknown>, step: number) => {
      // Always save to localStorage immediately
      setLocalData(flow, data, step);

      if (!session) return;
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        saveToServer(session.id, data, step);
      }, 500);
    },
    [flow, session, saveToServer]
  );

  const updateResponses = useCallback(
    (patch: Record<string, unknown>) => {
      setResponses((prev) => {
        const next = { ...prev, ...patch };
        scheduleSave(next, currentStep);
        return next;
      });
    },
    [scheduleSave, currentStep]
  );

  const setStepAndSave = useCallback(
    (step: number) => {
      setCurrentStep(step);
      if (session) {
        scheduleSave(responses, step);
      }
    },
    [session, responses, scheduleSave]
  );

  const saveNow = useCallback(async () => {
    if (!session) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    setLocalData(flow, responses, currentStep);
    await saveToServer(session.id, responses, currentStep);
  }, [flow, session, responses, currentStep, saveToServer]);

  const createSession = useCallback(async (flowId: StrategyFlowId) => {
    try {
      const res = await fetch("/api/content-strategy/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flow: flowId }),
      });
      if (res.ok) {
        const data = await res.json();
        setSession(data.session);

        // Restore from localStorage if we had buffered data
        const local = getLocalData(flowId);
        if (local && Object.keys(local.responses).length > 0) {
          setResponses(local.responses);
          setCurrentStep(local.step);
        } else {
          setResponses(data.session.responses ?? {});
          setCurrentStep(data.session.current_step ?? 0);
        }
        return data.session as StrategySession;
      }
    } catch {
      // silently fail
    }
    return null;
  }, []);

  const completeSession = useCallback(async () => {
    if (!session) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    setSaving(true);
    try {
      const res = await fetch("/api/content-strategy/session", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: session.id,
          responses,
          current_step: currentStep,
          status: "completed",
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setSession(data.session);
        clearLocalData(flow);
      }
    } catch {
      // silently fail
    } finally {
      setSaving(false);
    }
  }, [flow, session, responses, currentStep]);

  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, []);

  return {
    session,
    loading,
    saving,
    responses,
    currentStep,
    setCurrentStep: setStepAndSave,
    updateResponses,
    saveNow,
    createSession,
    completeSession,
  };
}
