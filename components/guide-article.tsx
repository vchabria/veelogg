// Server-rendered markdown renderer for guide articles. Ported from the v1
// [slug] page (groupSections / RenderBlock / renderInline) and restyled to the
// warm/light Veelogg palette. No "use client" and no copy button so the whole
// article prerenders statically. Supports ## / ### headings, - and 1. lists,
// **bold**, inline `code`, [links](url), and fenced ``` code blocks.

import type { ReactNode } from "react";

const STEP_RE = /^##\s+step\s+(\d+)\s*[-–]\s*(.+)$/i;

interface Section {
  heading: string | null;
  step: { n: string; title: string } | null;
  blocks: string[];
}

function groupSections(body: string): Section[] {
  const blocks = body.split("\n\n").map((b) => b.trim()).filter(Boolean);
  const sections: Section[] = [];
  let current: Section | null = null;

  for (const block of blocks) {
    if (block.startsWith("## ")) {
      const m = block.match(STEP_RE);
      current = { heading: block, step: m ? { n: m[1], title: m[2] } : null, blocks: [] };
      sections.push(current);
    } else {
      if (!current) {
        current = { heading: null, step: null, blocks: [] };
        sections.push(current);
      }
      current.blocks.push(block);
    }
  }
  return sections;
}

export function GuideArticle({ body }: { body: string }) {
  const sections = groupSections(body);

  return (
    <div className="guide-article">
      {sections.map((section, i) => {
        if (section.step) {
          return (
            <div key={i} className="guide-step">
              <span className="guide-step-num" aria-hidden>{section.step.n}</span>
              <div className="guide-step-body">
                <h2 className="section-title guide-step-title">{section.step.title}</h2>
                {section.blocks.map((b, j) => <RenderBlock key={j} block={b} />)}
              </div>
            </div>
          );
        }
        return (
          <div key={i} className="guide-block">
            {section.heading && <RenderBlock block={section.heading} />}
            {section.blocks.map((b, j) => <RenderBlock key={j} block={b} />)}
          </div>
        );
      })}
    </div>
  );
}

function RenderBlock({ block }: { block: string }) {
  const trimmed = block.trim();
  if (!trimmed) return null;

  // fenced code block, rendered as a simple styled <pre> (static, no copy button)
  if (trimmed.startsWith("```")) {
    const lines = trimmed.split("\n");
    const end = lines[lines.length - 1].trim() === "```" ? -1 : undefined;
    const code = lines.slice(1, end).join("\n");
    return <pre className="guide-code"><code>{code}</code></pre>;
  }

  if (trimmed.startsWith("## ")) {
    return <h2 className="section-title guide-h2">{renderInline(trimmed.replace("## ", ""))}</h2>;
  }

  if (trimmed.startsWith("### ")) {
    return <h3 className="guide-h3">{renderInline(trimmed.replace("### ", ""))}</h3>;
  }

  // bullet list
  if (trimmed.split("\n").every((l) => l.startsWith("- "))) {
    return (
      <ul className="def-list guide-list">
        {trimmed.split("\n").map((li, j) => <li key={j}>{renderInline(li.replace(/^- /, ""))}</li>)}
      </ul>
    );
  }

  // numbered list
  if (trimmed.split("\n").every((l) => /^\d+\.\s/.test(l))) {
    return (
      <ol className="guide-ol">
        {trimmed.split("\n").map((li, j) => <li key={j}>{renderInline(li.replace(/^\d+\.\s/, ""))}</li>)}
      </ol>
    );
  }

  return <p className="cs-body">{renderInline(trimmed)}</p>;
}

// Inline markdown: `code`, **bold**, and [text](url) links.
function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={i} className="guide-inline-code">{part.slice(1, -1)}</code>;
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const isInternal = linkMatch[2].startsWith("/") || linkMatch[2].startsWith("#");
      return (
        <a
          key={i}
          className="guide-link"
          href={linkMatch[2]}
          {...(isInternal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        >
          {linkMatch[1]}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
