# Higgsfield × Claude: AI Creative Agency Playbook

---

## WHAT THIS IS

Turn Claude (web or Code) + Higgsfield into a fully automated creative production system.
Output: product photos, Instagram ads, UGC videos, hypermotion launch videos - at scale, while you sleep.

---

## STACK

| Tool | Role |
|---|---|
| **Claude.ai (web)** | Fast ideation, quick asset generation via MCP |
| **Claude Code (desktop)** | Agentic workflows, automation, skills, routines |
| **Higgsfield** | Image + video generation (best-in-class models) |
| **GWS CLI** | Google Sheets / Docs / Drive access for agents |
| **Google Sheets** | Master tracker - generations, prompts, statuses |

---

## PART 1 - CLAUDE WEB SETUP (MCP)

**Use for:** quick generation, ideation, one-off ads

### Steps
1. Go to `higgsfield.ai` → **MCP and CLI** page
2. Copy the MCP command
3. In Claude.ai → **Settings → Connectors → Add Custom Connector**
4. Paste command → Hit Add → Configure → Sign in via Higgsfield OAuth
5. Set permissions (allow all, or scope to specific actions)

**Test:** Ask Claude to "generate a product photo using Higgsfield" - it should call the tool directly.

---

## PART 2 - CLAUDE CODE SETUP (CLI)

**Use for:** automation, agents, skills, routines, Google Sheets ops

### Steps

1. Open Claude Code (desktop app)
2. Create a new local folder: `Higgsfield-Studio/`
3. Open it as the project in Claude Code
4. Go to `higgsfield.ai` → **MCP and CLI** → copy all 3 CLI commands
5. Prompt Claude Code:

```
Set up this project as a Higgsfield creative studio.
Install the Higgsfield CLI, run the OAuth login, and install the agent skills.
Here are the three commands: [paste all 3]
```

6. A browser tab opens → **Connect** → sign in
7. Claude confirms connection + skills installed ✓

### Why CLI over MCP for Code?
- MCP loads all tools = higher token cost
- CLI = faster, leaner, built for agents
- Both have same functional capabilities

---

## PART 3 - RESEARCH DOC (Knowledge Base)

Before generating anything, give your agent expertise.

### Prompt to run once per project:

```
Do deep research on the best advertising strategies for 2026 
for organic content on TikTok, Meta, and X.
What captures attention? What converts? How does it differ per platform?
Save everything as advertising-masterclass.md in this project.
```

This file lives in your project folder. Tag it with `@` in future chats.
Agents will reference it when writing copy and crafting Higgsfield prompts.

---

## PART 4 - CORE WORKFLOW

### Build a Brand From Scratch
```
Build me a headphone brand from scratch.
Do the research, build the branding, build a product catalog.
For each product generate: a product photo, an Instagram ad, and a UGC video.
Use the Higgsfield MCP for all generations.
```

### Generate Ads From an Existing Product Image
```
[attach product image]
Make me 3 Instagram-ready ads for this product.
The product must appear EXACTLY as shown in the reference image - 
same color, same label, do not change anything.
Goal is conversion. Ask if you have questions.
```

### Run Marketing Studio (Hypermotion)
```
Use Higgsfield's Marketing Studio.
Generate a Hypermotion style launch video for [product].
Make it fast-paced, high-energy, with camera cuts and close-ups.
Use the reference image: [tag file]
Product only - no model/UGC needed.
```

---

## PART 5 - GOOGLE SHEET TRACKER

### Setup Prompt
```
Pull all generations from my Higgsfield account.
Create a Google Sheet with tabs for:
- All Generations (job ID, product, style, model, prompt, result URL, status)
- By Product
- By Style
- Creative Planning

Use the GWS CLI to create this.
```

### Planning Prompt (run after tracker exists)
```
@advertising-masterclass.md
Look at all generations in the sheet.
Read the advertising masterclass doc.
Generate 50 new creative variations - mix headlines, angles, avatars, styles.
For each: note value prop, platform, format, model to use.
Add them to the Creative Planning tab with a blank Status column.
```

### Generate From Sheet
```
Generate rows 3–7 from the Creative Planning tab.
Create the prompts, go to Higgsfield and generate each one.
Once complete, mark each row as "Complete" and add the result URL and job ID.
Use this reference image for all: [tag file]
```

---

## PART 6 - SKILLS

Skills = reusable recipes. Consistent output every time.

### How to Build One (Reverse Engineering Method)
1. Generate 5 outputs → pick the best 1–2
2. Copy the winning prompt
3. Run this in a new chat:

```
This prompt above produced my favorite output from Higgsfield Marketing Studio.
It was a hypermotion fast-paced launch video with fast cuts, zooms, and nice detail.
Turn this into a skill saved at .claude/skills/hypermotion-video.md
Any time I ask for a hypermotion video, this skill gets invoked automatically.
```

### Skill File Structure (what Claude generates)
```markdown
# Hypermotion Video

**When to invoke:** user asks for hypermotion, launch video, fast-paced product video

**Pre-generation questions:**
- Product only or include a model/UGC element?
- 9x16 or 16x9?

**Hard rules:**
- Always use Marketing Studio → Hypermotion variant
- Reference image required - do not generate without it
- Avoid flagged words: [list builds over time]
- Fast cuts, zoom in on product, 3–5 sec clips

**Prompt template:**
[your winning prompt structure]
```

### Improving Skills Over Time
After each generation run:
```
You just created 5 ads with the hypermotion skill.
I love outputs 1 and 3. I don't like 2, 4, 5 because [reason].
Update the skill to reflect this for next time.
```

---

## PART 7 - AUTOMATION (ROUTINES)

Set schedules so agents run without you.

### Sunday Night - Planning Routine
```
Every Sunday at 9pm:
- Pull performance data from [Instagram/Meta/TikTok]
- Look at the Google Sheet - what's been tested, what performed
- Read advertising-masterclass.md
- Add 50 new creative variations to the planning tab
```

### Monday Morning - Generation Routine
```
Every Monday at 6am:
- Open the Google Sheet Creative Planning tab
- Pick 30 rows with blank Status
- Create prompts, generate via Higgsfield
- Mark each complete with result URL
```

### Scale-Up Path
| Cadence | Action |
|---|---|
| Sun + Thu | Planning (50–100 new ideas each) |
| Mon + Fri | Generation (batch produce all planned) |
| Scale trigger | Once you trust outputs → connect to Meta Ads Manager or scheduling tool |

---

## PART 8 - PROMPT CRAFT RULES

**Always specify:**
- Reference image must appear EXACTLY as shown (same label, color, text)
- Target platform (Instagram story / square / 16x9)
- Emotional angle (curiosity / contrarian / pattern interrupt / stat flash / question)
- Output goal (conversion / awareness / engagement)

**Common failure modes:**
- Forgetting to attach reference image → model invents the product
- Not specifying exact format → gets wrong aspect ratio
- Sensitive content blocks → read the flagged prompt, identify trigger words, rephrase and retry

---

## QUICK REFERENCE - PROMPT ANGLES

| Angle | Hook Format |
|---|---|
| Curiosity | "Why are you still ____?" |
| Contrarian | "[Common belief] is wrong." |
| Pattern interrupt | Unexpected visual + bold stat |
| Question | Direct question to avatar |
| Stat flash | Big number first, explain after |
| Social proof | "28,000 [people] swear by this" |

---

## OUTPUT QUALITY EXPECTATIONS

- Image ads: high consistency once reference image is locked
- Video text accuracy: imperfect (model limitation) - workaround: use logo/name overlay instead of metadata
- Hypermotion: best results with Marketing Studio, not raw model calls
- Everything improves as you build more skills and tighten prompts

> "This is the worst AI video generation will ever be."
