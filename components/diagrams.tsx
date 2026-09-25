/* On-brand explanatory diagrams (SVG/CSS, no external images).
   These are "creatives" that explain the practice: the method, the AI
   workflow, the 90-day arc and the two audiences. Decorative arrows are
   aria-hidden; the meaning lives in the text. */

const METHOD = [
  ["understand", "your reasons, customers and current process"],
  ["decide", "positioning, message, what to keep or stop"],
  ["build", "AI skills, creative workflows and reviews"],
  ["run", "real work through the system, together"],
  ["transfer", "your owner takes the lead"],
];

export function MethodFlow() {
  return (
    <div className="dg-flow" role="img" aria-label="The method: understand, then decide, then build, then run, then transfer.">
      {METHOD.map(([t, c], i) => (
        <div className="dg-flow-cell" key={t}>
          <div className="dg-flow-step">
            <span className="dg-flow-n">{i + 1}</span>
            <span className="dg-flow-t">{t}</span>
            <span className="dg-flow-c">{c}</span>
          </div>
          {i < METHOD.length - 1 && <span className="dg-arrow" aria-hidden="true">→</span>}
        </div>
      ))}
    </div>
  );
}

const PIPE = [
  ["source", "product facts, customer questions, approved material"],
  ["brief", "the context production needs to start"],
  ["draft", "AI helps prepare the asset"],
  ["review", "you check facts, voice and fit"],
  ["approved", "it ships, or goes back a step"],
];

export function AiWorkflow() {
  return (
    <figure className="dg-pipe-wrap">
      <div className="dg-pipe" role="img" aria-label="AI workflow: source, then brief, then draft, then a human review, then approved. If it is off, it goes back a step.">
        {PIPE.map(([t, c], i) => (
          <div className="dg-pipe-cell" key={t}>
            <div className={"dg-node" + (t === "review" ? " dg-node-review" : "")}>
              <span className="dg-node-t">{t}</span>
              {t === "review" && <span className="dg-node-badge">you</span>}
              <span className="dg-node-c">{c}</span>
            </div>
            {i < PIPE.length - 1 && <span className="dg-arrow" aria-hidden="true">→</span>}
          </div>
        ))}
      </div>
      <figcaption className="dg-caption">A person signs off before anything ships. If it&rsquo;s off, it goes back a step, no guesswork moves forward.</figcaption>
    </figure>
  );
}

const MONTHS = [
  ["month one", "understand + build", "strategy brief, approved context, first workflow", "var(--yellow)"],
  ["month two", "create + refine", "real cycles, better instructions, a decision log", "var(--pink)"],
  ["month three", "lead + hand over", "your owner runs it, documented and trained", "var(--brown)"],
];

export function NinetyDay() {
  return (
    <div className="dg-timeline" role="img" aria-label="The 90 days: month one understand and build, month two create and refine, month three lead and hand over.">
      {MONTHS.map(([m, phase, out, color]) => (
        <div className="dg-tl-cell" key={m}>
          <span className="dg-tl-bar" style={{ background: color }} />
          <span className="dg-tl-month">{m}</span>
          <span className="dg-tl-phase">{phase}</span>
          <span className="dg-tl-out">{out}</span>
        </div>
      ))}
    </div>
  );
}

const LANES = [
  { who: "SaaS & product", know: "product knowledge + customer insight", system: "brand context, demos, launch workflows", run: "launches, content and a website your team runs" },
  { who: "agencies", know: "creative standards + per-client knowledge", system: "briefs, AI skills, review steps", run: "consistent client delivery and clean handoffs" },
];

export function AudienceSplit() {
  return (
    <div className="dg-lanes">
      {LANES.map((l) => (
        <div className="dg-lane" key={l.who} role="img" aria-label={`For ${l.who}: ${l.know}, becomes the system, becomes ${l.run}.`}>
          <span className="dg-lane-who">{l.who}</span>
          <div className="dg-lane-row">
            <span className="dg-chip">{l.know}</span>
            <span className="dg-arrow" aria-hidden="true">→</span>
            <span className="dg-chip dg-chip-mid">the system</span>
            <span className="dg-arrow" aria-hidden="true">→</span>
            <span className="dg-chip">{l.run}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
