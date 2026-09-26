---
name: higgsfield-creative-agency
description: >
  Invoke this skill whenever the user asks to generate product ads, Instagram creatives,
  UGC videos, hypermotion launch videos, or any Higgsfield-based creative production.
  Also triggers for: "make me an ad", "generate a video for [product]", "create creatives",
  "run the ad pipeline", "batch generate", "use Higgsfield".
---

# Higgsfield Creative Agency Skill

## Purpose
Produce conversion-ready advertising creatives (images, ads, videos) via Higgsfield.
Always reference brand assets. Always track output in Google Sheets. Always mark status on completion.

---

## Pre-Generation Checklist

Before calling any Higgsfield tool, confirm:

1. **Reference image** - is one tagged or available in `data/assets/`? If not, ask before proceeding.
2. **Platform** - Instagram story (9x16), square (1:1), or landscape (16x9)?
3. **Format** - static image, carousel, or video?
4. **Style** - hypermotion / UGC / product-only / cinematic?
5. **Angle** - curiosity / contrarian / pattern interrupt / question / stat flash / social proof?
6. **Model or no model** - does the ad include a human, or product-only?

If any of the above are unclear, ask ONE consolidated question before generating.

---

## Generation Rules

### Always
- Attach the reference image to every generation call - never invent the product
- Product must appear EXACTLY as in the reference: same label, color, text, shape
- Set a status column entry in the tracker sheet on completion
- Log: job_id, result_url, model used, prompt used, platform, angle

### Never
- Generate without a reference image
- Use flagged/sensitive language (build this list over time in `data/flagged-words.md`)
- Skip the Google Sheet update step

---

## Hypermotion Video Template

**Invoke when:** user says "hypermotion", "launch video", "fast-paced product video", "high-energy ad"

**Higgsfield settings:**
- Tool: Marketing Studio → Hypermotion variant
- Aspect: 9x16 default (ask if 16x9 needed)
- Duration: 6–10s

**Prompt structure:**
```
A high-energy hypermotion product launch video for [product name].
The product must appear exactly as shown in the reference image.
Fast camera cuts every 1–2 seconds.
Include: tight close-up on product, zoom-in detail shot, ambient background motion.
Mood: [premium / energetic / clean / bold].
No text overlays - product and motion speak for themselves.
End frame: clean hold on product.
Platform: [9x16 for Instagram Reels/TikTok / 16x9 for YouTube/Meta].
```

**If blocked for sensitive content:**
1. Ask Claude to read the flagged prompt
2. Identify trigger words
3. Rephrase and retry - log the fix in `data/flagged-words.md`

---

## Instagram Ad (Static) Template

**Invoke when:** user says "Instagram ad", "static ad", "product photo ad", "conversion image"

**Prompt structure:**
```
An Instagram [story/square] ad for [product name].
Product appears exactly as in the reference image - same label, color, text. Do not alter it.
Headline: [insert or ask user]
Angle: [curiosity/contrarian/stat/question/social proof]
CTA: [insert or ask user]
Style: [clean white / dark cinematic / lifestyle / bold color]
Include on-screen text formatted for Instagram: large headline, small subtext, CTA at bottom.
```

---

## Batch Generation Protocol

When generating multiple creatives from the Google Sheet:

```
1. Read Creative Planning tab - filter rows where Status = blank
2. For each row: build the Higgsfield prompt using the angle, format, and platform specified
3. Attach reference image from data/assets/
4. Generate via Higgsfield
5. On completion: write result_url + job_id to sheet, set Status = "Complete"
6. If generation fails or is blocked: set Status = "Blocked" + note reason
7. Report summary when all rows processed
```

---

## Knowledge Files to Reference

| File | When to use |
|---|---|
| `advertising-masterclass.md` | Writing copy, choosing angles, platform-specific formatting |
| `data/flagged-words.md` | Before every generation - avoid these terms |
| `data/assets/[product]-reference.png` | Attach to every generation |
| Google Sheet → Creative Planning tab | Source of truth for what to generate |
| Google Sheet → All Generations tab | Historical log, reference for what worked |

---

## Post-Generation Review Prompt (run after each batch)

```
We just completed [N] generations with this skill.
I liked: [outputs] because [reason].
I didn't like: [outputs] because [reason].
Update this skill file to reflect these learnings for next time.
```

---

## Hard Rules (never override)

- Reference image = required, always
- Sheet tracking = required, always  
- Flagged words check = required, always
- One consolidated pre-gen question max - don't interrogate the user
- If uncertain about any parameter, make a reasonable default and state your assumption
