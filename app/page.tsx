import { ArrowUpRight, ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import {
  HERO, AUDIENCES, BUSINESS_UNDERSTANDING, RANGE, WAYS,
  PROCESS, FOUNDER, WRITING, FINAL, SERVICES, SUBSTACK_URL,
} from "@/lib/content";
import { MethodFlow, AudienceSplit } from "@/components/diagrams";

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": "https://www.veelogg.com/#org", name: "Veelogg", url: "https://www.veelogg.com", logo: "https://www.veelogg.com/veelogg-logo.svg", email: "varnica@justvideosstudios.com", founder: { "@type": "Person", name: "Varnika Chabria", jobTitle: "Brand & Marketing Engineer and Strategist" }, sameAs: ["https://www.instagram.com/veelogg_/", "https://www.linkedin.com/company/veelogg", "https://itismevarnica.substack.com"], hasOfferCatalog: { "@type": "OfferCatalog", name: "Veelogg services", itemListElement: SERVICES.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name, description: s.description, url: s.url } })) } },
      { "@type": "WebSite", "@id": "https://www.veelogg.com/#site", name: "Veelogg", url: "https://www.veelogg.com", publisher: { "@id": "https://www.veelogg.com/#org" } },
    ],
  };

  return <><SiteHeader /><main id="main">
    {/* ── HERO ── */}
    <section className="home-hero wrap">
      <div className="home-hero-copy">
        <p className="home-eyebrow">{HERO.eyebrow}</p>
        <h1>{HERO.headline}</h1>
        <p className="home-lede">{HERO.body}</p>
        <div className="home-hero-actions">
          <a className="button button-brown" href={FINAL.href}>start a project <ArrowUpRight size={20} /></a>
          <a className="button button-outline" href="/work-with-me">ways to work together <ArrowRight size={18} /></a>
        </div>
        <p className="home-capability">{HERO.capability}</p>
      </div>
      <div className="home-hero-media">
        <figure className="photo-card home-photo-a"><img src="/assets/varnika-portrait.jpg" alt="Varnika at her desk" width="360" height="420" /><figcaption>hi, i’m varnika.</figcaption></figure>
        <figure className="photo-card home-photo-b"><img src="/assets/varnika-at-work.jpg" alt="Varnika planning and reviewing work" width="360" height="440" /><figcaption>strategy, then the system.</figcaption></figure>
      </div>
    </section>

    {/* ── WHO I WORK WITH ── */}
    <section className="page-section band wrap" id="who">
      <h2 className="section-title">{AUDIENCES.title}</h2>
      <div className="two-col">
        {AUDIENCES.items.map((a) => (
          <div className="audience-card" key={a.title}>
            <h3>{a.title}</h3>
            <p>{a.body}</p>
            <a className="text-link" href={a.linkHref}>{a.linkText} <ArrowRight size={17} /></a>
          </div>
        ))}
      </div>
      <AudienceSplit />
    </section>

    {/* ── BUSINESS UNDERSTANDING ── */}
    <section className="page-section band wrap" id="understanding">
      <div className="narrow">
        <h2 className="section-title">{BUSINESS_UNDERSTANDING.title}</h2>
        {BUSINESS_UNDERSTANDING.paras.map((p, i) => <p key={i} className="lede-body">{p}</p>)}
      </div>
    </section>

    {/* ── THE RANGE ── */}
    <section className="page-section wrap" id="range">
      <h2 className="section-title">{RANGE.title}</h2>
      <ul className="range-list">
        {RANGE.items.map((r) => (
          <li key={r.title}><h3>{r.title}</h3><p>{r.body}</p></li>
        ))}
      </ul>
    </section>

    {/* ── WAYS TO WORK TOGETHER ── */}
    <section className="page-section band wrap" id="ways">
      <h2 className="section-title">{WAYS.title}</h2>
      <div className="ways-list">
        {WAYS.items.map((w) => (
          <div className="way" key={w.n}>
            <span className="way-n">{w.n}</span>
            <div className="way-body">
              <h3>{w.title}</h3>
              <p>{w.body}</p>
              {w.signature && <p className="way-signature">{w.signature}</p>}
              <a className="text-link" href={w.linkHref}>{w.linkText} <ArrowRight size={17} /></a>
            </div>
          </div>
        ))}
      </div>
      <div className="ongoing-note">
        <div><h3>{WAYS.ongoing.title}</h3><p>{WAYS.ongoing.body}</p></div>
        <a className="text-link" href={WAYS.ongoing.linkHref}>{WAYS.ongoing.linkText} <ArrowRight size={17} /></a>
      </div>
    </section>

    {/* ── PROCESS ── */}
    <section className="page-section wrap" id="process">
      <h2 className="section-title">{PROCESS.title}</h2>
      <MethodFlow />
      <ol className="process-list">
        {PROCESS.steps.map((s, i) => (
          <li key={s.title}><span>{i + 1}</span><div><h3>{s.title}</h3><p>{s.body}</p></div></li>
        ))}
      </ol>
      <p className="cs-note">{PROCESS.note}</p>
      <a className="text-link" href={PROCESS.linkHref}>{PROCESS.linkText} <ArrowRight size={17} /></a>
    </section>

    {/* ── FOUNDER ── */}
    <section className="page-section band wrap founder-section" id="founder">
      <figure className="photo-card founder-photo"><img src="/assets/varnika-at-work.jpg" alt="Varnika at work" width="420" height="520" /><figcaption>the person behind the practice.</figcaption></figure>
      <div className="founder-copy">
        <h2 className="section-title">{FOUNDER.title}</h2>
        <p className="founder-role">{FOUNDER.subtitle}</p>
        {FOUNDER.paras.map((p, i) => <p key={i} className="lede-body">{p}</p>)}
        <a className="text-link" href={FOUNDER.linkHref}>{FOUNDER.linkText} <ArrowRight size={17} /></a>
      </div>
    </section>

    {/* ── WRITING ── */}
    <section className="page-section band wrap" id="writing">
      <div className="narrow">
        <h2 className="section-title">{WRITING.title}</h2>
        <p className="lede-body">{WRITING.body}</p>
        <a className="button button-outline" href={SUBSTACK_URL} target="_blank" rel="noreferrer">{WRITING.linkText} <ArrowUpRight size={19} /></a>
      </div>
    </section>

    {/* ── FINAL INVITATION ── */}
    <section className="page-section final-section wrap" id="start">
      <div className="narrow">
        <h2 className="final-title">{FINAL.title}</h2>
        <p className="lede-body">{FINAL.body}</p>
        <a className="button button-brown" href={FINAL.href}>{FINAL.button} <ArrowUpRight size={21} /></a>
      </div>
    </section>

    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
  </main><SiteFooter /></>;
}
