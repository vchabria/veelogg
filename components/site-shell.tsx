"use client";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { SUBSTACK_URL, STUDIO_DESCRIPTOR } from "@/lib/content";

const NAV = [
  ["/work-with-me", "work with me"],
  ["/ai-systems", "ai systems"],
  ["/guides", "free guides"],
  ["/about", "about"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <a className="skip-link" href="#main">skip to content</a>
    <div className="nav-wrap">
      <a className="brand" href="/" aria-label="Veelogg home"><img src="/assets/veelogg-logo.svg" alt="Veelogg" width="347" height="68" /></a>
      <nav className="desktop-nav" aria-label="Main navigation">{NAV.map(([href, label]) => <a key={href} href={href}>{label}</a>)}</nav>
      <a className="button button-small button-brown" href="/contact">start a project <ArrowUpRight size={18} /></a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-nav">{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">{[...NAV, [SUBSTACK_URL, "writing"], ["/partnerships", "brand collaborations"], ["/contact", "start a project"]].map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)} {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>{label}<ArrowUpRight size={20} /></a>)}</nav>}
  </header>;
}

export function SiteFooter() {
  return <footer className="site-footer wrap">
    <a className="footer-logo" href="/" aria-label="Veelogg home"><img src="/assets/veelogg-logo.svg" alt="Veelogg" width="347" height="68" /></a>
    <p className="footer-descriptor">{STUDIO_DESCRIPTOR}</p>
    <div className="footer-links"><a href="/work-with-me">work with me</a><a href="/ai-systems">ai systems</a><a href="/guides">free guides</a><a href="/about">about</a><a href={SUBSTACK_URL} target="_blank" rel="noreferrer">writing <ArrowUpRight size={15} /></a><a href="/partnerships">brand collaborations</a><a href="https://instagram.com/veelogg_" target="_blank" rel="noreferrer">instagram <ArrowUpRight size={15} /></a><a href="/contact">contact</a></div>
    <div className="footer-bottom"><p>good ideas deserve to get made.</p><small>© 2026 Veelogg · Varnika Chabria</small></div>
  </footer>;
}
