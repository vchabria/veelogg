"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { CONTACT_EMAIL, INQUIRY_WEBHOOK } from "@/lib/content";

/* "Start a project" inquiry (brief §12).
   Honest submission states: the request is SAVED before we confirm (success
   only on webhook 2xx); on failure we keep every field, say so, and offer a
   working email route; never shows success just from a click; duplicate
   submissions are prevented. Company type + help-with carry from each CTA
   via ?company= / ?help=. Campaign/source (utm_*) captured on the record.
   No email or answer is placed in an analytics URL or event. */

const COMPANY = [
  { value: "", label: "select one" },
  { value: "saas", label: "SaaS" },
  { value: "product", label: "product company" },
  { value: "agency", label: "agency" },
  { value: "other", label: "something else" },
];

const HELP = [
  { value: "ai-systems", label: "AI systems & workflows" },
  { value: "creative", label: "creative direction & content" },
  { value: "build", label: "website, app or custom tool" },
  { value: "mentorship", label: "AI mentorship" },
  { value: "ongoing", label: "ongoing support" },
  { value: "unsure", label: "help me work it out" },
];

const TIMING = [
  { value: "soon", label: "soon" },
  { value: "1-3-months", label: "in the next 1–3 months" },
  { value: "exploring", label: "exploring" },
];

const AGENCY_SCOPE = [
  { value: "", label: "select one" },
  { value: "our-marketing", label: "our agency’s own marketing" },
  { value: "client-delivery", label: "client content delivery" },
  { value: "both", label: "both" },
];

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "ref"];
const validHelp = new Set(HELP.map((h) => h.value));
const validCompany = new Set(["saas", "product", "agency", "other"]);

export function InquiryForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const campaign = useRef<Record<string, string>>({});
  const [form, setForm] = useState({
    name: "", email: "", link: "", company: "", help: "ai-systems",
    about: "", timing: "soon", budget: "", owner: "", agencyScope: "",
  });

  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      const help = p.get("help"); const company = p.get("company");
      setForm((f) => ({
        ...f,
        help: help && validHelp.has(help) ? help : f.help,
        company: company && validCompany.has(company) ? company : f.company,
      }));
      const found: Record<string, string> = {};
      for (const k of UTM_KEYS) { const v = p.get(k); if (v) found[k] = v; }
      campaign.current = found;
    } catch { /* ignore */ }
  }, []);

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending" || status === "success") return;
    setStatus("sending");
    try {
      const res = await fetch(INQUIRY_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "inquiry", ...form, campaign: campaign.current }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch { setStatus("error"); }
  }

  if (status === "success") {
    return (
      <div className="inquiry-success" role="status">
        <h3>your project note is in.</h3>
        <p>Thanks, I’ll read through it and email you about the next step.</p>
      </div>
    );
  }

  return (
    <form className="inquiry" onSubmit={handleSubmit}>
      <div className="inquiry-row">
        <div className="inquiry-field"><label htmlFor="iq-name">your name</label><input id="iq-name" name="name" required placeholder="your name" value={form.name} onChange={set} /></div>
        <div className="inquiry-field"><label htmlFor="iq-email">email</label><input id="iq-email" name="email" type="email" required placeholder="you@company.com" value={form.email} onChange={set} /></div>
      </div>

      <div className="inquiry-field"><label htmlFor="iq-link">business or project link (optional)</label><input id="iq-link" name="link" type="url" placeholder="https://…" value={form.link} onChange={set} /></div>

      <div className="inquiry-row">
        <div className="inquiry-field"><label htmlFor="iq-company">what kind of company are you building?</label>
          <select id="iq-company" name="company" required value={form.company} onChange={set}>{COMPANY.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>
        </div>
        <div className="inquiry-field"><label htmlFor="iq-help">what would you like help with?</label>
          <select id="iq-help" name="help" value={form.help} onChange={set}>{HELP.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>
        </div>
      </div>

      {form.help === "ai-systems" && (
        <div className="inquiry-field"><label htmlFor="iq-owner">who would use or own the setup day to day?</label><input id="iq-owner" name="owner" placeholder="you, a marketer, an assistant, a content person…" value={form.owner} onChange={set} /></div>
      )}

      {form.company === "agency" && (
        <div className="inquiry-field"><label htmlFor="iq-agency">are we working on your agency’s marketing, client delivery, or both?</label>
          <select id="iq-agency" name="agencyScope" value={form.agencyScope} onChange={set}>{AGENCY_SCOPE.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>
        </div>
      )}

      <div className="inquiry-field"><label htmlFor="iq-about">what does your company do, and which work still needs too much of the founder?</label><textarea id="iq-about" name="about" rows={4} required placeholder="a few lines is plenty" value={form.about} onChange={set} /></div>

      <div className="inquiry-row">
        <div className="inquiry-field"><label htmlFor="iq-timing">when would you like to start?</label>
          <select id="iq-timing" name="timing" value={form.timing} onChange={set}>{TIMING.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>
        </div>
        <div className="inquiry-field"><label htmlFor="iq-budget">what budget have you set aside?</label><input id="iq-budget" name="budget" placeholder="a rough range is useful. ‘not sure yet’ is fine." value={form.budget} onChange={set} /></div>
      </div>

      {status === "error" && (
        <div className="inquiry-error" role="alert">Your note hasn’t gone through. Your answers are still here. Please try again, or email me at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</div>
      )}

      <button className="button button-brown" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "sending…" : status === "error" ? "try again" : "send my project"} <ArrowUpRight size={19} />
      </button>
    </form>
  );
}
