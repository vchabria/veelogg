# How to Repurpose One Video Into 10+ Pieces of Content

## With Higgsfield + Claude

---

## The Problem

You shot one video. You posted it. Now you need content for 4 more platforms and 6 more days. Starting from scratch every time is how creators burn out.

**The fix:** extract everything from that one video - stills, clips, text, angles - and feed them through the Higgsfield + Claude pipeline to generate a full week of ad-quality content from a single recording.

---

## What You Get From One Video

```
1 VIDEO (5–15 min)
    │
    ├── 3–5 static product images (Higgsfield, from key frames)
    ├── 2–3 hypermotion clips (Higgsfield Marketing Studio)
    ├── 3–5 tweet threads (Claude, from transcript)
    ├── 2 carousel scripts (Claude, step-by-step format)
    ├── 1 newsletter / email (Claude, full argument tightened)
    ├── 1 blog post (Claude, SEO-optimized long-form)
    └── 2–3 short-form video clips (manual cuts or Higgsfield re-gen)
```

**Total: 15–20+ pieces from 1 recording.**

---

## Phase 1 - Extract the Transcript

Record your video. Then pull a clean transcript.

**Tools:**
- Descript - transcript + clip extraction
- Whisper (local) - free, accurate
- Claude Code - paste audio file, ask for transcript

**Prompt for Claude Code:**
```
Transcribe this video. Clean up filler words.
Split into sections by topic change.
Save as data/transcripts/[video-name]-transcript.md
```

---

## Phase 2 - Pull Key Frames for Higgsfield

Identify 3–5 moments in the video where the product is clearly visible.

**If you have the video file:**
```
Extract 5 key frames from this video where the product is most visible.
Save them to data/assets/ as [product]-frame-01.png through frame-05.png.
These will be reference images for Higgsfield generation.
```

**If you have product photos already:**
- Drop them into `data/assets/` as usual
- Skip this step

---

## Phase 3 - Generate Visual Variants with Higgsfield

Use the key frames as reference images to generate platform-specific ads.

### Static Ads (from key frames)
```
[tag reference frame]
@advertising-masterclass.md

Generate 3 Instagram-ready static ads from this frame.
Rules:
- Product must appear EXACTLY as in the reference image
- One ad: curiosity angle
- One ad: stat flash angle
- One ad: social proof angle
- All: 9x16 format (story)
Use Higgsfield.
```

### Hypermotion Clips (from reference)
```
[tag reference frame]

Use Higgsfield Marketing Studio - Hypermotion.
Generate a 6-second product launch clip.
Fast cuts, zoom on product detail, ambient motion.
The product must match the reference image exactly.
9x16 format for Instagram Reels.
```

### Carousel Imagery
```
[tag reference frames 1–3]

Generate 3 visually consistent product images for an Instagram carousel.
Same product, 3 different angles/environments.
Each must match the reference - same label, same color.
Square format (1:1).
Use Higgsfield.
```

---

## Phase 4 - Generate Text Content with Claude

Feed the transcript to Claude for written formats.

### Tweet Threads (3–5)
```
@data/transcripts/[video]-transcript.md

Extract 5 standalone tweet threads from this transcript.
Each thread: 3–5 tweets.
Each thread covers one distinct idea from the video.
Write in first person, conversational, with a hook in tweet 1.
```

### Carousel Copy (2)
```
@data/transcripts/[video]-transcript.md

Extract 2 carousel scripts from this transcript.
Format: slide 1 = hook, slides 2–8 = steps or points, slide 9 = CTA.
One carousel: step-by-step process.
One carousel: list of key takeaways.
```

### Email / Newsletter (1)
```
@data/transcripts/[video]-transcript.md

Turn the core argument of this video into a newsletter email.
Structure: hook → problem → solution → proof → CTA.
Keep it under 400 words. Conversational tone.
Subject line options: give me 3.
```

### Blog Post (1)
```
@data/transcripts/[video]-transcript.md

Turn this transcript into an SEO-optimized blog post.
Target keyword: [your keyword].
Structure: H1 title, intro, 3–5 H2 sections, conclusion with CTA.
Length: 800–1200 words.
Include a meta description (under 160 chars).
```

---

## Phase 5 - Plan & Track in Google Sheet

Add all generated pieces to your Creative Planning tab.

```
@data/transcripts/[video]-transcript.md

I just repurposed one video into multiple content pieces.
Add all of the following to the Creative Planning tab in the Google Sheet:

Visual content (Higgsfield):
- 3 static ads (story format)
- 2 hypermotion clips
- 3 carousel images

Text content (Claude):
- 5 tweet threads
- 2 carousel scripts
- 1 newsletter email
- 1 blog post

For each: note the platform, format, angle, and status.
Mark Higgsfield outputs as Complete with result URLs.
Mark text outputs as Draft.
```

---

## Phase 6 - Schedule Across Platforms

Stagger posts across 7–10 days so one video fuels almost two weeks of content.

**Sample schedule:**
```
Day 1  - Original video (native platform)
Day 2  - Tweet thread #1
Day 3  - Instagram static ad #1
Day 4  - Carousel #1
Day 5  - Hypermotion clip #1 (Reels/TikTok)
Day 6  - Tweet thread #2
Day 7  - Newsletter email
Day 8  - Instagram static ad #2 + tweet thread #3
Day 9  - Blog post (SEO)
Day 10 - Hypermotion clip #2 + carousel #2
```

---

## The Compound Effect

Each time you run this workflow:
- Your Higgsfield skill file gets better (review → update)
- Your Claude prompts get tighter (save winning templates)
- Your planning sheet grows (more data = smarter future batches)
- Your flagged-words list prevents blocks

After 4 weeks, one video → 20+ pieces is automatic. You spend 20 minutes reviewing and approving instead of 3+ hours creating.

---

## Quick Reference

| Source | Tool | Output |
|---|---|---|
| Key frames | Higgsfield | Static ads, carousel images |
| Reference image | Higgsfield Marketing Studio | Hypermotion clips |
| Transcript | Claude | Tweets, carousels, emails, blog posts |
| All of the above | Google Sheet | Tracked, scheduled, measured |

---

## Deliverables Checklist

- [ ] 1 video transcript saved to `data/transcripts/`
- [ ] 3–5 key frames in `data/assets/`
- [ ] 3+ static ads generated via Higgsfield
- [ ] 2+ hypermotion clips generated via Higgsfield
- [ ] 5 tweet threads written
- [ ] 2 carousel scripts written
- [ ] 1 newsletter email written
- [ ] 1 blog post written
- [ ] All pieces tracked in Google Sheet
- [ ] 7–10 day schedule mapped
