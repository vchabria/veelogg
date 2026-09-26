"use client";
import { useEffect } from "react";
import { CALENDLY_URL } from "@/lib/funnel";

/* Inline Calendly widget. Loads Calendly's script client-side (works fine on a
   static host) and renders the booking calendar in-page. Brand colors match the
   warm palette. Falls back to a plain link if the script is blocked. */

const DATA_URL =
  CALENDLY_URL +
  "?hide_gdpr_banner=1&background_color=fffdf8&text_color=38251f&primary_color=38251f";

export function CalendlyEmbed() {
  useEffect(() => {
    const w = window as unknown as { Calendly?: { initInlineWidgets?: () => void } };
    if (w.Calendly?.initInlineWidgets) { w.Calendly.initInlineWidgets(); return; }
    if (!document.getElementById("calendly-widget-css")) {
      const l = document.createElement("link");
      l.id = "calendly-widget-css"; l.rel = "stylesheet";
      l.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(l);
    }
    if (document.getElementById("calendly-widget-js")) return;
    const s = document.createElement("script");
    s.id = "calendly-widget-js";
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <div className="calendly-embed">
      <div className="calendly-inline-widget" data-url={DATA_URL} style={{ minWidth: "320px", height: "700px" }} />
      <noscript>
        <a href={CALENDLY_URL} target="_blank" rel="noopener">open the booking calendar</a>
      </noscript>
    </div>
  );
}
