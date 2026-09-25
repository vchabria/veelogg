"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { CONTACT_EMAIL, INQUIRY_WEBHOOK } from "@/lib/content";

/* brand collaboration brief (§13). Posts formType 'brand' so it lands in a
   separate pipeline from client inquiries. Same honest states: confirm only
   on 2xx, preserve + retry + email fallback on failure, no duplicate sends. */

const TIMING = [
  { value: "this-month", label: "this month" },
  { value: "1-3-months", label: "next 1–3 months" },
  { value: "exploring", label: "exploring timing" },
];
const USAGE = [
  { value: "", label: "select intended usage" },
  { value: "organic-mine", label: "organic, posted to my audience" },
  { value: "organic-yours", label: "organic, reposted to your channels" },
  { value: "paid-ads", label: "paid advertising use" },
  { value: "both", label: "organic + paid" },
  { value: "unsure", label: "unsure / to discuss" },
];

export function BrandBriefForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({ brand: "", contactName: "", email: "", product: "", goal: "", deliverables: "", timing: "this-month", usage: "", budget: "", briefLink: "" });
  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending" || status === "success") return;
    setStatus("sending");
    try {
      const res = await fetch(INQUIRY_WEBHOOK, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ formType: "brand", ...form }) });
      setStatus(res.ok ? "success" : "error");
    } catch { setStatus("error"); }
  }

  if (status === "success") {
    return <div className="inquiry-success" role="status"><h3>brief received.</h3><p>Thanks, it’s saved. I’ll review the fit and email you about usage, scope and a quote.</p></div>;
  }

  return (
    <form className="inquiry" onSubmit={handleSubmit}>
      <div className="inquiry-row">
        <div className="inquiry-field"><label htmlFor="bb-brand">brand</label><input id="bb-brand" name="brand" required placeholder="brand name" value={form.brand} onChange={set} /></div>
        <div className="inquiry-field"><label htmlFor="bb-contact">your name</label><input id="bb-contact" name="contactName" required placeholder="who I’m talking to" value={form.contactName} onChange={set} /></div>
      </div>
      <div className="inquiry-field"><label htmlFor="bb-email">email</label><input id="bb-email" name="email" type="email" required placeholder="you@brand.com" value={form.email} onChange={set} /></div>
      <div className="inquiry-field"><label htmlFor="bb-product">the product</label><textarea id="bb-product" name="product" rows={3} required placeholder="what it is and who it’s for" value={form.product} onChange={set} /></div>
      <div className="inquiry-field"><label htmlFor="bb-goal">campaign goal</label><textarea id="bb-goal" name="goal" rows={3} required placeholder="what you want this to do" value={form.goal} onChange={set} /></div>
      <div className="inquiry-field"><label htmlFor="bb-deliverables">deliverables and channels</label><textarea id="bb-deliverables" name="deliverables" rows={3} placeholder="e.g. 2 reels for instagram, 1 demo for your site…" value={form.deliverables} onChange={set} /></div>
      <div className="inquiry-row">
        <div className="inquiry-field"><label htmlFor="bb-timing">timing</label><select id="bb-timing" name="timing" value={form.timing} onChange={set}>{TIMING.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
        <div className="inquiry-field"><label htmlFor="bb-usage">intended usage</label><select id="bb-usage" name="usage" value={form.usage} onChange={set}>{USAGE.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
      </div>
      <div className="inquiry-field"><label htmlFor="bb-budget">budget</label><input id="bb-budget" name="budget" placeholder="a range is fine" value={form.budget} onChange={set} /></div>
      <div className="inquiry-field"><label htmlFor="bb-link">brief or deck link</label><input id="bb-link" name="briefLink" type="url" placeholder="https://… (optional)" value={form.briefLink} onChange={set} /></div>
      {status === "error" && <div className="inquiry-error" role="alert">That didn’t send, your brief is still here. Please try again, or email me at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</div>}
      <button className="button button-brown" type="submit" disabled={status === "sending"}>{status === "sending" ? "sending…" : status === "error" ? "try again" : "send a collaboration brief"} <ArrowUpRight size={19} /></button>
    </form>
  );
}
