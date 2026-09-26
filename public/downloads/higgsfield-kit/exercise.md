# Exercise: Your First AI Creative Sprint

**Time:** 45–60 minutes  
**Goal:** Run the full workflow end-to-end for one real product  
**Output:** 5 finished ad creatives + a live Google Sheet tracker

---

## Before You Start

You need:
- [ ] Higgsfield account (any paid tier)
- [ ] Claude.ai account (Pro recommended)
- [ ] One product - physical or digital, real or invented
- [ ] One clean product image (PNG/JPG, white bg preferred but not required)

---

## The Brief

> You are a solo creative director at a one-person agency.
> A client just dropped a product on your desk and said:
> *"I need 5 ads by end of day. Make them feel like a real brand."*
> You have Claude + Higgsfield. Go.

---

## PART 1 - SPARK MODE (Claude Web)
*Estimated time: 15 minutes*

### Step 1.1 - Connect Higgsfield (skip if already done)
1. Go to `higgsfield.ai` → MCP and CLI → copy the MCP command
2. Claude.ai → Settings → Connectors → Add Custom Connector → paste → connect
3. Test: ask Claude "Can you see my Higgsfield account?" - it should respond yes

### Step 1.2 - First Generation (No Guardrails)

Attach your product image and send this exact prompt:

```
I'm going to show you a product. Create 3 Instagram-ready ads for it.
Ask me one question if you need to, otherwise just go.
Use Higgsfield for all generations.
```

**What to notice:**
- Does Claude ask a good question or a bad one?
- Does the product in the output match your reference image?
- Are the ads actually ad-shaped (headline, CTA, copy)?

**Write down:** What went wrong. What went right. Be specific.

---

### Step 1.3 - Constrained Generation (With Guardrails)

Now send this:

```
[attach product image again]

Generate 2 more Instagram ads for this product.
Rules:
- Product must appear EXACTLY as in the reference image. Same label. Same color. Do not change it.
- One ad: curiosity angle - make them wonder what it does
- One ad: stat flash angle - lead with a bold number
- Both: 9x16 format (story)
- Goal: conversion. Someone should want to buy this.
Use Higgsfield.
```

**Compare:** Do these feel more intentional than the first 3?

---

## PART 2 - ENGINE MODE (Claude Code)
*Estimated time: 30 minutes*

### Step 2.1 - Project Setup

1. Create a folder on your desktop: `my-first-ad-sprint/`
2. Open it in Claude Code
3. Run the setup prompt from the setup template (install CLI, OAuth, skills)
4. Save your product image to `data/assets/[product-name]-reference.png`

### Step 2.2 - Research Doc

```
Do research on 2026 advertising best practices for Instagram and TikTok.
Focus on: what stops the scroll in the first 2 seconds, what angles convert,
what copy structure works for [your product category].
Save as advertising-masterclass.md in this project.
```

Wait for it to complete. Skim the output. Notice what's actionable.

### Step 2.3 - Build Your Tracker

```
Create a Google Sheet called "[Your Product] Ad Sprint" using the GWS CLI.
Tabs: All Generations, Creative Planning.
Columns for Creative Planning: priority, platform, format, angle, headline idea, status.
Leave it empty for now.
```

### Step 2.4 - Plan 10 Creatives

```
@advertising-masterclass.md
[tag your reference image]

Plan 10 ad creatives for [product name].
Mix: 2 platforms (Instagram, TikTok) × 2 formats (story, square) × mix of angles.
For each: write the angle, a headline idea, the platform, the format, the Higgsfield model to use.
Add all 10 to the Creative Planning tab in the Google Sheet.
Priority: mark top 5 as HIGH.
```

### Step 2.5 - Generate the Top 5

```
[tag reference image]

Generate the 5 HIGH priority rows from the Creative Planning tab.
Reference image must be used for every single one.
When each completes: write result_url + job_id to the sheet, mark Status = Complete.
If anything gets blocked, note it and move to the next one.
```

**Let it run. Don't hover.**

---

## PART 3 - REVIEW
*Estimated time: 10 minutes*

When generation is done, open your Google Sheet and your Higgsfield generations side by side.

Answer these questions:

**On the outputs:**
1. Which 1–2 look like actual ads you'd run? What made them work?
2. Which ones look generic or wrong? What specifically is off?
3. Did the product appear correctly in all of them? Yes/No/Partially?
4. Was there a content block? What triggered it?

**On the process:**
5. What was the biggest friction point in the workflow?
6. What would you do differently in the next sprint?

---

## PART 4 - SKILL CREATION
*Estimated time: 5 minutes*

Take your best output from this sprint. Copy its prompt from the Google Sheet.

Run this in Claude Code:

```
[paste the winning prompt]

This prompt produced my best creative from this sprint.
Turn it into a skill file saved at .claude/skills/[format]-ad.md
Make it reusable - it should work for any product I drop in,
not just this one.
When to invoke: any time I ask for a [format] style ad.
```

You now have a custom skill. Next sprint starts better than this one ended.

---

## Deliverables Checklist

By the end of this exercise you should have:

- [ ] 5 generated ad creatives in Higgsfield
- [ ] Google Sheet with All Generations tab populated
- [ ] Google Sheet with Creative Planning tab (10 rows, 5 marked complete)
- [ ] `advertising-masterclass.md` saved in your project
- [ ] At least 1 custom skill file in `.claude/skills/`
- [ ] Notes on what to improve next sprint

---

## Reflection Prompts (Optional but High-Value)

After completing the exercise, sit with these:

- **What would a 10x version of this sprint look like?** (More reference images? Better angles? Different models?)
- **What's the one skill rule you'd add based on what you saw today?**
- **If you ran this every Monday morning automatically, what would you need to trust the outputs enough to do that?**
- **What data would make the planning phase smarter?** (Ad account performance? Competitor analysis? Customer reviews?)

---

## Common Mistakes (And How to Fix Them)

| Mistake | Fix |
|---|---|
| Product looks different in every output | Always tag reference image. Add "must match reference exactly" to every prompt. |
| Ads look generic | Specify angle explicitly. Vague prompts = vague output. |
| Got a content block | Ask Claude to read the flagged prompt. Find the trigger word. Rephrase. Retry. |
| Sheet not updating | Tell Claude explicitly: "when each generation completes, mark it in the sheet." |
| Skills not triggering | Restart Claude Code after adding new skill files. |
| Outputs not consistent across batch | You need a tighter skill file. Review → update → re-run. |

---

## What Comes Next

Once you've run this exercise once:

1. **Add performance data** - drop in your real ad metrics and let Claude plan the next batch based on what's actually converting
2. **Build format-specific skills** - one for hypermotion, one for carousel, one for UGC
3. **Set up routines** - Sunday planning, Monday generation, wake up to a full batch
4. **Increase batch size** - 5 → 20 → 50 → 100 per run
5. **Connect to posting** - route completed creatives directly to scheduling or ads manager

The system is now yours. The exercise was the first loop. Keep looping.
