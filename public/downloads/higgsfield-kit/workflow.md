# The Higgsfield × Claude Workflow

## System Overview

```
RESEARCH → ASSETS → PLAN → GENERATE → TRACK → REVIEW → AUTOMATE
    ↑                                                         |
    └─────────────────── SKILL LOOP ──────────────────────────┘
```

---

## The Two Modes

| Mode | Tool | When |
|---|---|---|
| **Spark Mode** | Claude.ai + Higgsfield MCP | Quick one-off generation, ideation, testing |
| **Engine Mode** | Claude Code + Higgsfield CLI | Batch production, automation, routines |

Start in Spark. Graduate to Engine when you have a working creative direction.

---

## Full Workflow - Step by Step

---

### PHASE 0 - ONE-TIME SETUP
*Do this once per project. Never again.*

```
┌─────────────────────────────────────────────────────┐
│  1. Create project folder                           │
│  2. Install Higgsfield CLI (3 commands)             │
│  3. OAuth login → connect account                   │
│  4. Install agent skills                            │
│  5. Generate advertising-masterclass.md             │
│  6. Set up Google Sheet tracker (GWS CLI)           │
│  7. Drop reference images into data/assets/         │
│  8. Paste skill files into .claude/skills/          │
└─────────────────────────────────────────────────────┘
```

**Time:** ~30 minutes, done once.

---

### PHASE 1 - RESEARCH
*Before touching generation - build the knowledge layer.*

```
INPUT:  Your product / niche / brand
           ↓
PROMPT: Deep research on 2026 ad strategies per platform
           ↓
OUTPUT: advertising-masterclass.md (617+ lines of usable intel)
           ↓
TAG:    @advertising-masterclass.md in every future planning chat
```

**Key questions answered by this doc:**
- What stops the scroll on each platform
- What copy structure converts (headline → hook → CTA)
- Platform-specific format specs
- Emotional angles that work (curiosity, contrarian, social proof, stat flash)

---

### PHASE 2 - ASSET PREP
*Lock in the reference before generating anything.*

```
Product image exists?
    YES → save as data/assets/[product]-reference.png
    NO  → generate a product photo first, save it, then proceed

Reference image rules:
  - Same label, same color, same text - always
  - Attach to EVERY single Higgsfield call
  - If the model ignores it, rephrase: "must appear EXACTLY as shown"
```

**Rule:** No reference image = do not generate. Period.

---

### PHASE 3 - PLANNING
*Fill the sheet before running the machine.*

```
INPUTS:
  - @advertising-masterclass.md
  - Google Sheet (existing generations)
  - Product + platform targets

PROCESS:
  Claude reads research doc + existing output history
  Maps gaps (untested angles, formats, platforms)
  Generates 30–100 creative briefs

OUTPUT → Google Sheet, Creative Planning tab:
  ┌──────────┬──────────┬────────┬────────┬──────────────┬────────┐
  │ Priority │ Product  │Platform│ Format │    Angle     │ Status │
  ├──────────┼──────────┼────────┼────────┼──────────────┼────────┤
  │ HIGH     │ Sleep+   │ IG     │ Story  │ Contrarian   │        │
  │ HIGH     │ Sleep+   │ IG     │ Square │ Stat flash   │        │
  │ MED      │ Sleep+   │ TikTok │ 9x16   │ Question     │        │
  └──────────┴──────────┴────────┴────────┴──────────────┴────────┘
```

**Output:** A prioritized matrix. Enough to run for weeks without planning again.

---

### PHASE 4 - GENERATION
*Run the batch. Let it work.*

```
TRIGGER:     "Generate rows 3–7, use reference image [tag], mark complete"
                ↓
SKILL CHECK: Claude reads .claude/skills/ → finds matching skill
                ↓
PRE-GEN:     Confirms reference image, platform, format, angle
                ↓
PROMPT BUILD: Constructs full Higgsfield prompt from skill template
                ↓
API CALL:    Sends to Higgsfield Marketing Studio or direct model
                ↓
ON COMPLETE: result_url + job_id written to sheet, Status = Complete
                ↓
ON BLOCK:    Status = Blocked, reads prompt, identifies flag, retries
```

**What good output looks like:**
- Product matches reference image exactly
- On-screen text matches the angle (stat/question/CTA visible)
- Format fits platform spec
- No random invented products

**What bad output looks like:**
- Generic bottle / no reference image used → re-run with image explicitly tagged
- Wrong aspect ratio → specify in prompt
- Content block → read prompt, remove trigger words, retry

---

### PHASE 5 - TRACKING
*The sheet is the source of truth.*

```
Google Sheet structure:

Tab 1: All Generations
  date | product | style | format | platform | angle | model | prompt | result_url | job_id | status

Tab 2: By Product (pivot)
Tab 3: By Style (pivot)
Tab 4: Creative Planning
  priority | product | platform | format | angle | headline | notes | status | result_url | job_id
```

**Status values:** blank → In Progress → Complete → Blocked → Live → Winning → Killed

When you have ad performance data → add columns: spend, CPM, CTR, ROAS
Claude Code can then read this and weight future planning toward winning formats.

---

### PHASE 6 - REVIEW + SKILL UPDATE
*The loop that makes everything better.*

```
After each batch, run:

"We just generated [N] ads. 
 I love [1, 3] because [specific reason].
 I don't like [2, 4, 5] because [specific reason].
 One got blocked - it was [describe].
 Update the skill file to lock in what worked and prevent what didn't."
```

**Skill update triggers:**
- Found a prompt structure that converts → lock it in
- A word/phrase got flagged → add to flagged-words.md
- Model choice made a difference → note preferred model per format
- Angle worked better than expected → elevate its priority in skill

**Compound effect:** Each batch makes the next batch better. Skills compound.

---

### PHASE 7 - AUTOMATION
*Remove yourself from the loop.*

```
SUNDAY 9PM - Planning Routine
  Reads: performance data + sheet history + masterclass doc
  Outputs: 50 new creative briefs added to planning tab

MONDAY 7AM - Generation Routine
  Reads: Creative Planning tab (Status = blank)
  Runs: batch generation for 30 rows
  Outputs: all rows marked Complete with result URLs

Scale trigger:
  When outputs are consistent + trusted → 
  connect to scheduling tool (Buffer, Later, etc.) or Meta Ads Manager
  → creatives post automatically
  → system runs fully without you
```

---

## The Skill Improvement Loop (Ongoing)

```
Generate batch
      ↓
Review outputs
      ↓
Identify best + worst
      ↓
Update skill file
      ↓
Generate next batch (better)
      ↓
Repeat
```

This is the compounding mechanism. Don't skip it.

---

## Decision Tree - What Prompt to Use When

```
Need a fast one-off ad?
  → Claude.ai web + Higgsfield MCP connector
  → No sheet tracking needed

Need 5+ ads for a campaign?
  → Claude Code + CLI
  → Fill planning tab first, then batch generate

Have a winning ad?
  → Reverse engineer a skill from its prompt
  → Lock in the format, style, model, angle

Getting blocked?
  → Ask Claude to read the flagged prompt
  → Find trigger words → rephrase → retry
  → Log in flagged-words.md

Output looks inconsistent?
  → You're missing a skill or reference image
  → Attach reference + invoke skill explicitly

Ready to scale?
  → Set up Sunday + Monday routines
  → Connect to posting/ads tool
  → Let it run
```

---

## Time Investment vs. Output

| Manual | With this system |
|---|---|
| 1 ad: 2–4 hours | 1 ad: 5 minutes |
| 10 ads: 2–3 days | 50 ads: overnight |
| Consistency: low | Consistency: skill-locked |
| Scaling: bottlenecked by you | Scaling: routine-driven |
