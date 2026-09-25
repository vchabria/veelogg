"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { CONTACT_EMAIL, INQUIRY_WEBHOOK } from "@/lib/content";
import { CS_BOTTLENECK_OPTIONS, CS_OWNER_OPTIONS, CS_START_OPTIONS } from "@/lib/content-system";

/* "Map my content system", the free fit-call qualification form.
   Honest submission behaviour, to spec:
   - the request is SAVED before we confirm anything (success only on webhook 2xx);
   - on failure we keep every field, say so, and offer a tested email route;
   - never shows success merely because the button was clicked;
   - duplicate submissions are prevented while sending / after success.
   Campaign + source (utm_*) params are captured and preserved on the record.
   No email address or answer is ever placed in an analytics URL or event.
   Button says "Request my fit call", there is no calendar connected yet. */

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "ref"];

export function ContentSystemForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const campaign = useRef<Record<string, string>>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    website: "",
    role: "",
    bottleneck: "",
    owner: "",
    start: "this-month",
    context: "",
  });

  // capture campaign/source once, client-side (no window access during SSR)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const found: Record<string, string> = {};
      for (const k of UTM_KEYS) {
        const v = params.get(k);
        if (v) found[k] = v;
      }
      campaign.current = found;
    } catch {
      /* ignore */
    }
  }, []);

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending" || status === "success") return; // prevent duplicate submissions
    setStatus("sending");
    try {
      const res = await fetch(INQUIRY_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "content-system",
          service: "content-system",
          nextAction: "fit call",
          ...form,
          campaign: campaign.current,
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="inquiry-success" role="status">
        <h3>request received.</h3>
        <p>Thanks, I’ve received your request. I’ll review the context and email you about the next step.</p>
      </div>
    );
  }

  return (
    <form className="inquiry" onSubmit={handleSubmit} aria-labelledby="map-heading">
      <div className="inquiry-row">
        <div className="inquiry-field">
          <label htmlFor="cs-name">name</label>
          <input id="cs-name" name="name" required placeholder="your name" value={form.name} onChange={set} />
        </div>
        <div className="inquiry-field">
          <label htmlFor="cs-email">work email</label>
          <input id="cs-email" name="email" type="email" required placeholder="you@company.com" value={form.email} onChange={set} />
        </div>
      </div>

      <div className="inquiry-row">
        <div className="inquiry-field">
          <label htmlFor="cs-website">company website</label>
          <input id="cs-website" name="website" type="url" placeholder="https://…" value={form.website} onChange={set} />
        </div>
        <div className="inquiry-field">
          <label htmlFor="cs-role">your role</label>
          <input id="cs-role" name="role" placeholder="founder, marketer, assistant…" value={form.role} onChange={set} />
        </div>
      </div>

      <div className="inquiry-field">
        <label htmlFor="cs-bottleneck">where does content get stuck?</label>
        <select id="cs-bottleneck" name="bottleneck" required value={form.bottleneck} onChange={set}>
          {CS_BOTTLENECK_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      <div className="inquiry-field">
        <label htmlFor="cs-owner">who would run the system internally?</label>
        <select id="cs-owner" name="owner" required value={form.owner} onChange={set}>
          {CS_OWNER_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      <div className="inquiry-field">
        <label htmlFor="cs-start">when would you like to start?</label>
        <select id="cs-start" name="start" value={form.start} onChange={set}>
          {CS_START_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      <div className="inquiry-field">
        <label htmlFor="cs-context">anything else that would help? (optional)</label>
        <textarea id="cs-context" name="context" rows={2} placeholder="a sentence or two of context" value={form.context} onChange={set} />
      </div>

      {status === "error" && (
        <div className="inquiry-error" role="alert">
          Your request hasn’t gone through. Your answers are still here. Please try again, or email me directly at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </div>
      )}

      <button className="button button-brown" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "sending…" : status === "error" ? "try again" : "Request my fit call"} <ArrowUpRight size={19} />
      </button>
    </form>
  );
}
