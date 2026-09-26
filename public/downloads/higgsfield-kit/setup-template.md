# Higgsfield Studio - Project Setup Template

## Folder Structure

```
Higgsfield-Studio/
├── .claude/
│   └── skills/
│       ├── higgsfield-creative-agency.md   ← master skill (paste skill file here)
│       ├── hypermotion-video.md            ← hypermotion-specific sub-skill
│       └── instagram-ad.md                 ← static ad sub-skill
├── data/
│   ├── assets/
│   │   ├── [product-name]-reference.png    ← drop all reference images here
│   │   └── ...
│   └── flagged-words.md                    ← grows over time as blocks occur
├── advertising-masterclass.md              ← research doc (generate once, tag always)
└── SETUP.md                                ← this file
```

---

## Step 1 - Install Higgsfield CLI

Paste this prompt into Claude Code (new project, blank chat):

```
Set up this project as a Higgsfield creative marketing studio.

Install the Higgsfield CLI, run the OAuth login flow, and install the agent skills.

Here are the three commands from higgsfield.ai/mcp:
[paste command 1]
[paste command 2]
[paste command 3]

Once complete, confirm: CLI installed, authenticated, and skills loaded.
```

---

## Step 2 - Generate Research Doc

Run once per project/niche. Tag it in every future chat.

```
Do deep research on the best advertising strategies for 2026.
Focus on organic content performance on TikTok, Meta (Reels/Stories/Feed), and X.
Cover: what captures attention in the first 3 seconds, what drives conversion,
how copy structure differs per platform, and current best-practice formats.

Save the full output as advertising-masterclass.md in the root of this project.
Make it dense, practical, and structured with clear headers.
```

---

## Step 3 - Set Up Google Sheet Tracker

```
Pull all my existing generations from Higgsfield.
Create a Google Sheet called "Higgsfield Creative Studio" using the GWS CLI.

Tabs:
1. All Generations - columns: date, product, style, format, platform, angle, model, prompt, result_url, job_id, status
2. By Product - pivot view
3. By Style - pivot view
4. Creative Planning - columns: priority, product, platform, format, angle, headline, notes, status, result_url, job_id

Populate All Generations with everything you can pull from Higgsfield.
Leave Creative Planning blank for now.
```

---

## Step 4 - Add Reference Images

Drop all product images into `data/assets/` with clean names:
- `sleep-bottle-reference.png`
- `headphone-halo-reference.png`
- etc.

Tell Claude Code: "Our brand asset folder is at data/assets/ - always use reference images from here."

---

## Step 5 - Add Skills

Copy the skill files into `.claude/skills/`:
- `higgsfield-creative-agency.md` (master skill)
- `hypermotion-video.md`
- `instagram-ad.md`

Restart Claude Code after adding skills so they register.

Test with: `Use the hypermotion skill to generate a video for [product].`
Watch that Claude confirms it found and is using the skill.

---

## Step 6 - Run First Creative Batch

```
@advertising-masterclass.md
[tag product reference image]

Look at all generations in the Google Sheet.
Read the advertising masterclass doc.
Plan 30 new creative variations for [product name].
Mix: 3 platforms × 3 formats × 3 angles = varied matrix.
Add them to the Creative Planning tab with blank Status.
Then generate the top 5 priority rows.
Attach the reference image, mark each complete when done.
```

---

## Step 7 - Set Up Routines

### Sunday Planning Routine
```
Create a Claude Code routine: every Sunday at 9pm
- Read advertising-masterclass.md
- Check Google Sheet - what's been generated, what's marked Complete
- Add 50 new creative variations to Creative Planning tab
- Prioritize based on untested angles and formats
```

### Monday Generation Routine
```
Create a Claude Code routine: every Monday at 7am
- Open Google Sheet → Creative Planning tab
- Pick 30 rows with Status = blank
- Generate each via Higgsfield using the appropriate skill
- Mark complete with result_url and job_id when done
- Send summary of what was generated
```

---

## Ongoing Skill Improvement Loop

After every batch, run:

```
We just ran [N] generations.
Best outputs: [list which ones and why]
Worst outputs: [list which ones and why]
Any blocks or errors: [describe]

Update the relevant skill file to lock in what worked and prevent what didn't.
```

---

## Key Prompting Reminders

```
✓ Always tag @advertising-masterclass.md when planning
✓ Always tag reference image from data/assets/
✓ Specify platform + format + angle before generating
✓ If blocked: read the prompt, find trigger words, rephrase, retry
✓ Never generate without a reference image
✓ Always update the sheet on completion
```

---

## flagged-words.md Starter Template

```markdown
# Flagged Words & Phrases

Words/phrases that have triggered Higgsfield content restrictions.
Update this file whenever a generation is blocked.

## Confirmed Flags
- [add as you discover them]

## Suspected Flags
- [add as you discover them]

## Safe Replacements
| Flagged | Use instead |
|---|---|
| [word] | [replacement] |
```
