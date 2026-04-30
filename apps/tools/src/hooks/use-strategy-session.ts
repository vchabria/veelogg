"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { StrategyFlowId, StrategySession } from "@/types/content-strategy";

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

export function useStrategySession(flow: StrategyFlowId): UseStrategySessionReturn {
  const [session, setSession] = useState<StrategySession | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [responses, setResponses] = useState<Record<string, unknown>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingSave = useRef(false);

  // Load existing session on mount
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/content-strategy/session?flow=${flow}`);
        if (res.ok) {
          const data = await res.json();
          if (data.session) {
            setSession(data.session);
            setResponses(data.session.responses ?? {});
            setCurrentStep(data.session.current_step ?? 0);
          }
        }
      } catch {
        // silently fail
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
        }
      } catch {
        // silently fail — data is buffered in state
      } finally {
        setSaving(false);
        pendingSave.current = false;
      }
    },
    []
  );

  // Debounced auto-save (500ms)
  const scheduleSave = useCallback(
    (data: Record<string, unknown>, step: number) => {
      if (!session) return;
      pendingSave.current = true;
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        saveToServer(session.id, data, step);
      }, 500);
    },
    [session, saveToServer]
  );

  // Update responses and schedule save
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

  // Update step and schedule save
  const setStepAndSave = useCallback(
    (step: number) => {
      setCurrentStep(step);
      if (session) {
        scheduleSave(responses, step);
      }
    },
    [session, responses, scheduleSave]
  );

  // Force immediate save
  const saveNow = useCallback(async () => {
    if (!session) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    await saveToServer(session.id, responses, currentStep);
  }, [session, responses, currentStep, saveToServer]);

  // Create a new session
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
        setResponses(data.session.responses ?? {});
        setCurrentStep(data.session.current_step ?? 0);
        return data.session as StrategySession;
      }
    } catch {
      // silently fail
    }
    return null;
  }, []);

  // Mark session as completed
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
      }
    } catch {
      // silently fail
    } finally {
      setSaving(false);
    }
  }, [session, responses, currentStep]);

  // Cleanup timer on unmount
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
