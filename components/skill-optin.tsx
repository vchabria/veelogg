"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { CONTACT_EMAIL, INQUIRY_WEBHOOK } from "@/lib/content";

/* Edit-skill lead-magnet opt-in. Captures email + the routing answer to the
   existing intake webhook (formType 'skill-optin'), so the button works today.
   Delivery + the welcome sequence get wired to beehiiv separately.
   Honest states: only confirm on a real save; keep the email + retry on failure. */

const BUILDING = [
  { value: "", label: "what are you building?" },
  { value: "agency", label: "an agency" },
  { value: "saas", label: "a saas or product company" },
  { value: "other", label: "something else" },
];

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "ref"];

export function SkillOptin() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [email, setEmail] = useState("");
  const [building, setBuilding] = useState("");
  const campaign = useRef<Record<string, string>>({});

  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      const found: Record<string, string> = {};
      for (const k of UTM_KEYS) { const v = p.get(k); if (v) found[k] = v; }
      campaign.current = found;
    } catch { /* ignore */ }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending" || status === "success") return;
    setStatus("sending");
    try {
      const res = await fetch(INQUIRY_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "skill-optin", email, building, campaign: campaign.current }),
      });
      if (res.ok) {
        setStatus("success");
        try { (window as unknown as { plausible?: (e: string) => void }).plausible?.("skill_optin"); } catch { /* ignore */ }
      } else {
        setStatus("error");
      }
    } catch { setStatus("error"); }
  }

  if (status === "success") {
    return (
      <div className="skill-optin skill-optin-done" role="status">
        <h3>you’re on the list.</h3>
        <p>I’ll send the skill and the walkthrough over to {email || "your inbox"}. Install it, run one edit, and reply to tell me what it got wrong.</p>
      </div>
    );
  }

  return (
    <form className="skill-optin" onSubmit={handleSubmit}>
      <div className="skill-optin-row">
        <input type="email" required placeholder="your email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="your email" />
        <select required value={building} onChange={(e) => setBuilding(e.target.value)} aria-label="what are you building?">
          {BUILDING.map((o) => <option key={o.value} value={o.value} disabled={o.value === ""}>{o.label}</option>)}
        </select>
        <button className="button button-brown plausible-event-name=skill_optin" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "sending…" : "send me the skill"} <ArrowUpRight size={18} />
        </button>
      </div>
      <p className="skill-optin-note">One email with the skill and the video, then a short series on turning what you know into a system your team can run. Unsubscribe whenever.</p>
      {status === "error" && (
        <p className="inquiry-error" role="alert">That didn’t go through. Please try again, or email me at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
      )}
    </form>
  );
}
