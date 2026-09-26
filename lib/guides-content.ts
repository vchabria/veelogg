// Guide article content ported from the v1 site (branch v1 of vchabria/veelogg_website).
// Card/listing metadata still lives in lib/guides.ts; this file carries the
// long-form body, excerpt, tags, and downloads keyed by slug.
// No em dashes anywhere in this copy (site owner constraint).

export interface GuideContent {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  tags?: string[];
  downloads?: { label: string; description: string; href: string; badge?: string }[];
  caption?: string;
  category?: string;
  date?: string;
}

export const GUIDES_CONTENT: GuideContent[] = [
  {
    slug: 'voice-and-perspective-extraction-coach',
    title: 'the voice extraction coach: get ai to actually sound like you',
    excerpt:
      "most ai writing sounds like a press release wearing your name tag. this is a coaching prompt that interviews you like a documentary filmmaker - your positions, your stories, the way you actually build a sentence - and turns it into a voice profile any ai can write from. drop it into claude or chatgpt and answer the questions. free prompt below.",
    category: 'branding',
    date: '2026-08-19',
    tags: ['brand voice', 'claude', 'chatgpt', 'ai writing', 'prompt', 'tone of voice', 'content strategy'],
    body: `## why your ai drafts still sound like everyone else

you did the work. you wrote a voice guide. you pasted "write in a casual, direct tone" into the system prompt. and the draft still comes back sounding like a linkedin thought leader who has never had an original thought in their life.

here is the problem: "casual and direct" is not a voice. it is a category. it describes ten thousand creators at once. a real voice is made of specific positions you hold, specific stories only you can tell, and specific mechanical habits in how you build a sentence - where you break, when you use a fragment, how you open, how you land the point. an ai cannot infer any of that from three adjectives. it needs the raw material. and most people have never actually pulled that material out of their own head.

that is what this tool does. it is not a template you fill in. it is a coaching prompt - an ai interviewer that sits you down and extracts what already exists underneath your vague, polished, self-censored first answers, then hands you a profile detailed enough that another ai can write in your voice without turning you into a caricature.

## what it actually is

it is a single system prompt. you paste it into claude or chatgpt, and the model stops being an assistant and becomes a **voice extraction coach** - part documentary interviewer, part editorial strategist. it interviews you one question at a time, challenges your shallow answers, follows the interesting threads, and refuses to let you get away with a résumé summary when there is a real human story underneath.

it is built to separate five distinct layers most people blur together:

- **your positions** - what you actually believe about your industry, work, money, ambition, creativity, identity
- **your perspective** - the experiences and mental models that make you see those things differently
- **your stories** - the specific moments, failures, and turning points that shaped the beliefs
- **your voice** - your energy, humor, intensity, vocabulary, and relationship with the reader
- **your sentence structure** - the mechanics: length, rhythm, punctuation, fragments, how you open and close

that last split is the important one. **voice and sentence structure are not the same thing** and almost every "brand voice" exercise collapses them. one is attitude. the other is syntax. this prompt analyzes and documents them separately, which is exactly why the output is usable by a machine.

## how the interview works

it runs in seven phases, and it does not rush to the end:

1. **orientation** - what do you want to create, who are you reaching, what feels missing when ai writes for you
2. **surface map** - your main areas of experience, fascination, frustration, and authority
3. **deep extraction** - your strongest positions, your emotional triggers, your contrarian beliefs
4. **story excavation** - turning abstract beliefs into specific scenes you can actually use
5. **voice observation** - reading your live answers and any raw writing samples for patterns
6. **calibration** - it shows you preliminary findings and asks what feels exaggerated, polished-but-untrue, or missing
7. **final synthesis** - the complete profile

the coaching is the point. when you say something like "authenticity matters," it does not write that down. it asks what authenticity means in practice, what immediately feels fake to you, when you learned that, and who is getting it wrong. it treats a memorable phrase or an unfinished story as a thread to pull, not a box to check.

## what you get at the end

twelve deliverables, but these are the ones that change your content:

- a **position map** - a table of your beliefs, why you hold them, the experience behind each one, the strongest opposing view, and your response to it
- a **story bank** - a structured library of your complete stories, fragments, and recurring observations, each tagged with the idea it illustrates and where you could use it
- a **voice profile** and a separate **sentence-structure profile** - attitude and mechanics, documented independently
- **voice boundaries** - language you would use, language you would never use, tones that misrepresent you, and personal details that must not be published without permission
- **writing instructions for another ai** - your findings converted into a clean brief any model can follow to write as you

every pattern it finds is labeled with a confidence level - high (seen repeatedly), medium (developing), low (needs more evidence) - so it never turns one distinctive phrase into your whole personality. the goal it is built around: the result should sound like a fuller version of you, not an ai impersonating your most obvious mannerisms.

## how to use it

1. download the prompt below
2. open a fresh chat in claude or chatgpt and paste the whole thing in as your first message
3. answer the first question honestly - it will be "what do you want to create with your voice, and what feels missing, flattened, or falsely polished when ai currently tries to write for you?"
4. keep going. when it asks for raw material - voice notes, unedited drafts, messages, captions, journal entries - give it the messy stuff, not your polished public posts. raw material is where your real patterns live
5. do the calibration phase properly. tell it what feels exaggerated or untrue. that is what stops the profile from becoming a caricature
6. when it produces the final profile, save it. paste the "writing instructions for another ai" section into the system prompt of whatever you use to draft content - or drop the whole thing into a skill file if you run claude code

## a note on doing this honestly

this only works if you stop performing. the prompt is specifically built to reward specifics and refuse vague language, but it cannot force you to be honest - it can only make room for it. the more real the stories you give it, the more your drafts stop sounding like content and start sounding like you talking.

pair this with the [find your brand voice guide](/guides/find-your-brand-voice) if you want the manual version of the same work. this prompt is the automated, deeper cut.

## grab the prompt

the full coaching prompt is downloadable below. it is a single markdown file - copy it, paste it into claude or chatgpt, and start the interview. free, no signup.`,
    caption: `your ai writing sounds like everyone else because "casual and direct" is not a voice - it is a category.

i built a coaching prompt that interviews you like a documentary filmmaker. your real positions. the stories only you can tell. the exact way you build a sentence. then it turns all of it into a voice profile any ai can write from without turning you into a caricature.

paste it into claude or chatgpt. answer the questions honestly. get drafts that actually sound like you.

free prompt on the site. link in bio.

#brandvoice #aiwriting #contentstrategy #claudeai #chatgpt #creatoreconomy #personalbrand #contentcreator`,
    downloads: [
      {
        label: 'voice extraction coach prompt',
        description: 'the full coaching prompt - paste into claude or chatgpt and start the interview',
        href: '/downloads/voice-extraction-coach/voice-extraction-coach.md',
        badge: 'new prompt!',
      },
    ],
  },
  {
    slug: 'wwdc-2026-business-owners-translation-guide',
    title: 'wwdc 2026: the business owner’s translation guide',
    excerpt:
      'apple just rebuilt how customers find local businesses on iphone. siri ai, apple maps local lists, and visual intelligence change the discovery layer most businesses have ignored for years. ios 27 ships this fall - here is what it means for your revenue and what to do this summer.',
    category: 'strategy',
    date: '2026-06-10',
    tags: ['apple', 'wwdc 2026', 'ios 27', 'siri', 'apple maps', 'local seo', 'visual intelligence'],
    body: `## the short version

apple just rebuilt how customers find local businesses on iphone. three features - siri ai, apple maps local lists, and visual intelligence - change the discovery layer most businesses have ignored for years.

ios 27 ships this fall. you have the summer to get ahead of it.

## 1. siri ai - your business needs an ai answer now

**what apple announced:** siri was rebuilt from scratch using a 1.2 trillion-parameter google gemini model. it's conversational, context-aware, and designed to give full ai-generated recommendations - not just pull up search results. old sirikit is deprecated. app intents are now mandatory.

**what this actually means:** when your customer asks siri "best accountant near me" or "find a brunch spot in [city] that's dog-friendly under $30" - siri gives them a curated ai answer inside apple's ecosystem. not a google link. a recommendation. your business needs to be what siri recommends.

**business translation:** google used to be the front door. now there are two front doors. and most businesses only know about one.

**what to do:**

- complete your apple maps listing - every field, full sentences in the description, current photos
- write your business description in natural language (write like you're answering a question, not filling a form)
- get real customer activity in apple maps - saves, check-ins, direction requests. these are the signals siri reads.

## 2. apple maps local lists - free viral reach based on your customers' activity

**what apple announced:** ios 27 introduces "local lists" - curated collections of local businesses surfaced to nearby users based on apple maps usage data. initial rollout starts with trending restaurants by city. fully algorithm-generated. no curators. privacy-protected.

**what this actually means:** apple built an explore page inside maps. you don't pay for it. you don't pitch anyone. you earn your spot by generating real customer interaction in the maps ecosystem.

**business translation:** this is instagram explore - but for your physical or local business. the algorithm decides who gets discovered. and the signal it reads is how much your current customers engage with your maps listing.

**what to do:**

- ask current customers to save your business in apple maps - this is the primary signal. one story, one email, one receipt sticker.
- add "find us on apple maps" to your email footer, booking confirmation, and link-in-bio
- restaurants: this is most urgent - the first lists are restaurant-focused and rolling out immediately in ios 27 beta

## 3. visual intelligence - your storefront is now a search result

**what apple announced:** visual intelligence is built directly into the iphone camera app. users point their camera at a storefront, product, packaging, or scene - siri ai responds with contextual info, links, and actions.

**what this actually means:** a customer walks past your shop. points their camera at your window. siri tells them who you are, your hours, your reviews, and whether it's worth walking in. no search. no typing. just a camera and your maps data.

**business translation:** your window is now indexed. your packaging is now searchable. if your apple maps listing is incomplete, the answer siri gives about you is incomplete - or wrong.

**what to do:**

- make sure your apple maps listing has your logo, exterior photo, and correct category - this is what visual intelligence pulls
- for product businesses: structured product data on your website (name, description, brand) is what siri surfaces when someone points at your product
- physical marketing tip: add your apple maps listing url to your packaging qr code so when someone scans, you own the destination

## 4. app intents are mandatory - business apps that didn't update are invisible

**what apple announced:** apple deprecated sirikit and made app intents mandatory. every app that wants to be actionable by siri ai must declare its capabilities through app intents.

**what this actually means:** if you have a customer-facing app - booking, loyalty, ordering, scheduling - and your developer hasn't updated it for ios 27, siri ai cannot interact with your app at all. you're invisible to the new assistant layer.

**who this hits hardest:** spas, fitness studios, restaurants, service businesses - anyone with a booking or ordering app.

**what to do:**

- ask your developer or app platform: "does our app support app intents for ios 27?"
- prioritize: "book an appointment," "check order status," "see my rewards" - these should be app intent-enabled
- on third-party platforms (mindbody, toast, square, etc.): check if their ios 27 update is on the roadmap

## 5. rebuilt ios 27 search - your emails and content are now findable

**what apple announced:** apple rebuilt the on-device search index for ios 27 - faster and more accurate across apps, messages, files, and emails. apps launch 30% faster.

**what this actually means:** customers who've emailed or messaged with your business can find your info instantly from iphone spotlight - without opening any app. your email signature, booking confirmations, and receipts are now part of how customers re-find you.

**what to do:**

- clean up your business email signature - full name, service description, location, phone. this is indexed.
- encourage customers to save your contact to their phone - you become a spotlight search result from their lock screen
- make sure your booking confirmation emails have all your business info (not just a confirmation number)

## your action plan: 3 things to do this summer

**1. complete your apple maps listing today.** photos, description in full natural sentences, correct category, current hours. this is the foundation for siri ai, local lists, and visual intelligence. takes 30 minutes. non-negotiable.

**2. create one piece of content asking your audience to save you on apple maps.** one story. one email. one reel. "hey - if you've ever visited us, go save us on apple maps." this directly feeds the local lists algorithm. do this week.

**3. forward this to your marketing person or agency.** most agencies are still 100% google-focused. apple just announced a parallel local discovery ecosystem with 2 billion+ active devices behind it. someone on your team needs to own the apple side before ios 27 drops.

## timeline

- **now (june 2026)** - wwdc developer betas live; developers testing
- **summer 2026** - your window to optimize before the public launch
- **fall 2026** - ios 27 public release; hits all compatible iphones

## sources

[apple newsroom](https://www.apple.com/newsroom/), [appleinsider - apple maps local lists](https://appleinsider.com), [techcrunch - wwdc 2026](https://techcrunch.com), [macobserver - maps ios 27](https://www.macobserver.com)`,
  },
  {
    slug: 'install-the-ig-competitor-research-skill',
    title: 'how to install the ig competitor research skill in claude desktop',
    excerpt:
      "a claude skill that scrapes your competitors' top instagram reels, ranks them, and builds a report you can actually act on. here's how to install it in 5 steps - dependencies, apify, the skill files, and your first run.",
    category: 'automation',
    date: '2026-06-09',
    tags: ['claude', 'claude skills', 'apify', 'instagram', 'competitor research', 'content-os'],
    body: `## what this skill does

this is a claude desktop skill that does your instagram competitor research for you. you give it a handful of handles, it scrapes their top-performing reels through apify, pulls keyframes and audio, ranks everything by performance, and builds you a clean report you can open and act on.

no spreadsheets. no manually scrolling competitor profiles for an hour. you type one command, hand it some handles, and it does the digging.

the whole thing runs locally inside your content-os skill directory. the only external dependency is apify for the actual scrape - everything else runs on your machine with free, open tools. follow the 5 steps below and you'll be running it in about 15 minutes.

## step 1 - install dependencies

the skill leans on a few command-line tools. install these first so everything works on the first run:

- **uv** - bootstraps all the python deps on the fly, so you never have to manually pip install anything
- **ffmpeg + ffprobe** - pulls keyframes and extracts audio from the reels
- **yt-dlp** - fallback reel downloader if the cdn curl fails
- **python3** - runs rank-and-select.py (standard library only, nothing extra to install)
- **curl + bash** - handle the downloads and scripts
- **macos open** - auto-opens the final report when it's done

on a mac, the fastest path is homebrew:

\`\`\`bash
brew install uv ffmpeg yt-dlp
\`\`\`

python3, curl, and bash already ship with macos. once those are in, you're set for the whole pipeline.

## step 2 - connect apify

apify is what actually scrapes instagram. you connect it once inside claude:

1. go to **customize > connectors > browser connectors > apify**
2. sign into apify and grab your api key
3. paste it into the connector field

that's it - claude can now run the scrape.

**a note on cost:** apify is the only external/paid dependency in the whole skill. the scrape is the one billed step, and it runs about $0.11-0.18 per run - comfortably under apify's $5/mo free credit. in practice you'll never pay anything unless you're scraping all day.

## step 3 - drag and drop the skill files

download the skill files from the kit at the bottom of this guide. then drop them into your content-os skill directory so claude can find them.

unzip the folder and drag the whole \`ig-competitor-research\` folder into your skills directory. the skill ships with everything it needs - the SKILL.md instructions, the README, and the scripts folder (rank-and-select.py, build-report.py, reel-breakdown.sh, fetch-images.sh).

## step 4 - restart claude desktop

close the claude app completely and open it again. this forces claude to load the new skill files. if you skip this, claude won't see the skill yet - a full restart is the fix.

## step 5 - run and test the skill

you're ready. there are two ways to kick it off:

- type **/ig-competitor-research** and hand it the handles you want to scrape
- **or** just update your competitor-list file - it scrapes the top 5 in your list by default

let it run. it'll scrape, rank, and build the report, then auto-open it for you. that's the whole loop - from competitor handles to an actionable breakdown in a couple of minutes.

## grab the files

the full skill is downloadable below. unzip it, drop the folder into your content-os skills directory, restart claude, and run it. everything you need - the SKILL.md, the README, and all four scripts - is in the kit.`,
    caption: `stop watching your competitors. let claude do it.

i built a skill that scrapes their top instagram reels, ranks them by performance, and builds you a breakdown of exactly what's working - automatically.

you give it 5 handles. it gives you a report. two minutes, start to finish.

the full skill + a 5-step install guide is free on the site. link in bio.

#contentstrategy #instagramgrowth #aiworkflow #claudeai #contentcreator #competitoranalysis #socialmediatips #creatoreconomy`,
    downloads: [
      {
        label: 'ig competitor research skill',
        description: 'the full skill folder - SKILL.md, README, and all scripts. unzip and drop into your content-os skills directory',
        href: '/downloads/ig-competitor-research-kit/ig-competitor-research.zip',
        badge: 'new skill!',
      },
    ],
  },
  {
    slug: 'repurpose-one-video-into-ten-posts',
    title: 'how we repurposed one video into 10+ pieces of content with higgsfield + claude',
    excerpt:
      "we built a system that turns a single video into static ads, hypermotion clips, tweets, carousels, emails, and blog posts. here is exactly how we did it - with every file, prompt, and workflow included so you can do it too.",
    category: 'content',
    date: '2026-05-15',
    tags: ['higgsfield', 'claude', 'descript', 'whisper', 'google sheets', 'buffer'],
    body: `## what we built (and why we are giving it away)

we kept hitting the same wall every creator hits. one video goes up, it performs, and then you are back to staring at a blank screen figuring out what to post tomorrow. so we built a system that takes one recording and turns it into two weeks of content across every platform - automatically.

the stack is higgsfield for visuals (static ads, hypermotion clips, carousel imagery) and claude for text (tweets, carousels, emails, blog posts). we wired them together into a repeatable workflow, documented the whole thing, and packaged it into downloadable files you can grab below.

this is not theory. this is exactly what we ran. here is a look at how it works.

## the output - what one video actually produced

we recorded a single 12-minute video about content repurposing. from that one recording, we extracted:
- 4 static product ads (generated via higgsfield from key frames)
- 2 hypermotion clips (generated via higgsfield marketing studio)
- 4 tweet threads (written by claude from the transcript)
- 2 carousel scripts (written by claude, step-by-step format)
- 1 newsletter email (written by claude, tightened from the full argument)
- 1 long-form blog post (written by claude, SEO-optimized)
- 3 short-form video clips (cut from the original)

**17 pieces from 1 recording.** that covered 10 days of posting across 4 platforms without creating anything new.

## how we set it up

we built a project folder in claude code with a specific structure - a data/assets/ folder for reference images, a data/transcripts/ folder for video transcripts, and a .claude/skills/ folder for reusable prompt templates. the setup template (download below) has the exact folder structure.

we connected higgsfield via their CLI (3 commands from higgsfield.ai/mcp), ran the oauth login, and installed the agent skills. the full setup took about 30 minutes. after that, everything runs from prompts.

## step 1 - we pulled the transcript

we dropped the video file into claude code and asked it to transcribe. the transcript came back clean, split by topic. we saved it to data/transcripts/. this raw text became the source for every written piece claude generated later.

you can also use descript or whisper for this step. we used claude code because it was already open and it handled the formatting automatically.

## step 2 - we grabbed key frames

we pulled 4 frames from the video where the product/subject was clearly visible. these went into data/assets/ as reference images.

this is the most important step for higgsfield. every generation needs a reference image - the product has to appear exactly as shown. same label, same color, same everything. we learned this the hard way: skip the reference and the model invents something random. the agency playbook (download below) explains this rule in detail.

## step 3 - we generated visuals with higgsfield

this is where it gets interesting. we used the reference frames to generate platform-specific visuals in three formats:

**static ads.** we prompted higgsfield to generate 4 instagram-ready ads from our key frames. for each one we specified the angle (curiosity, stat flash, social proof) and the format (9x16 for stories). the skill file (download below) has the exact prompt template we used - it locks in the rules so the product always matches the reference.

**hypermotion clips.** we used higgsfield marketing studio to generate 6-second product launch clips. fast camera cuts, zoom on product detail, ambient background motion. these became our reels and tiktoks. the prompt structure is in the skill file under "hypermotion video template."

**carousel imagery.** we generated 3 visually consistent product images for instagram carousels. same subject, different environments. square format.

every generation was tracked in a google sheet - job id, result url, prompt used, status. the workflow file (download below) maps this tracking system end to end.

## step 4 - we generated text content with claude

we fed the transcript to claude and asked it to extract specific formats. here is what we ran:

**tweet threads.** we asked for 4 threads, each covering one distinct idea from the video. 3-5 tweets per thread, hook in the first tweet, conversational tone. claude pulled the key arguments from the transcript and restructured them for twitter/x.

**carousel copy.** we asked for 2 carousel scripts. slide 1 = hook, slides 2-8 = steps or points, slide 9 = CTA. one was a step-by-step process, the other was a list of key takeaways.

**newsletter email.** we asked claude to tighten the core argument into an email: hook, problem, solution, proof, CTA. under 400 words. this went straight into our beehiiv draft.

**blog post.** SEO-optimized long-form. we gave claude a target keyword and asked for an H1, intro, 3-5 H2 sections, and a conclusion with CTA. 800-1200 words. we published this on our site the same week.

the key insight: we were not asking claude to write finished posts. we were asking for 80%-done drafts. our voice and judgment closed the last 20%.

## step 5 - we scheduled everything

we staggered the posts across 10 days so the single video fueled almost two full weeks:

- day 1 - original video (native platform)
- day 2 - tweet thread #1
- day 3 - instagram static ad #1
- day 4 - carousel #1
- day 5 - hypermotion clip #1 (reels/tiktok)
- day 6 - tweet thread #2
- day 7 - newsletter email
- day 8 - instagram static ad #2 + tweet thread #3
- day 9 - blog post (SEO)
- day 10 - hypermotion clip #2 + carousel #2

buffer handled the scheduling. we batched everything into the queue in one sitting and moved on.

## what we learned running this

**the skill file is everything.** the first batch of higgsfield outputs was inconsistent. some matched the reference, some did not. we reviewed the results, identified what worked, and updated the skill file with tighter rules. the second batch was significantly better. the third batch was dialed in. the skill file (download below) is the version we landed on after multiple iterations.

**the reference image rule is non-negotiable.** every time we skipped it or forgot to attach it, the output was unusable. the product looked different, the colors were off, the label was wrong. now our skill file has a hard rule: never generate without a reference image.

**claude's drafts got better with examples.** we started pasting our best-performing posts into the system prompt so claude could match our tone. by the third run, the drafts needed almost no editing.

**google sheets as the tracker was the right call.** having every generation logged with its prompt, result url, and status meant we could go back and see exactly what produced what. the workflow file (download below) has the full sheet structure.

## what we would do differently

we would set up the google sheet tracker before generating anything. we started tracking halfway through and had to backfill. the setup template (download below) has the tracker as step 3 for this reason.

we would also run the 45-minute sprint exercise (download below) first to get comfortable with the workflow before going full scale. we jumped straight into a large batch and the learning curve slowed us down.

## the stack we used

- **higgsfield** - image and video generation (static ads, hypermotion, carousel imagery)
- **claude** - text generation (tweets, carousels, emails, blog posts, transcripts)
- **google sheets** - tracker for all generations (planning, status, result URLs)
- **descript** - transcript extraction from video
- **buffer** - scheduling across platforms

## grab the files

everything we used is downloadable below. the agency playbook has the full 8-part system. the workflow maps every phase. the skill file drops into your .claude/skills/ folder. the setup template gets your project folder ready in 30 minutes. and the exercise gives you a 45-minute sprint to run the whole thing end-to-end with your own product.

this is the exact system we run. not a course, not a teaser - the actual files. take them, use them, make them yours.`,
    downloads: [
      {
        label: 'repurpose guide',
        description: 'the full repurpose workflow - video to 10+ pieces, step by step',
        href: '/downloads/higgsfield-kit/repurpose-guide.md',
      },
      {
        label: 'agency playbook',
        description: 'the complete 8-part higgsfield + claude playbook - setup, workflow, skills, routines',
        href: '/downloads/higgsfield-kit/guide.md',
      },
      {
        label: 'system workflow',
        description: 'every phase mapped end-to-end - decision trees, prompt examples, quality checks',
        href: '/downloads/higgsfield-kit/workflow.md',
      },
      {
        label: 'claude skill file',
        description: 'drop into .claude/skills/ - pre-gen checklists, prompt templates, batch protocol',
        href: '/downloads/higgsfield-kit/skill-higgsfield-creative-agency.md',
      },
      {
        label: 'project setup template',
        description: 'exact folder structure, 7 setup steps with copy-paste prompts',
        href: '/downloads/higgsfield-kit/setup-template.md',
      },
      {
        label: '45-minute sprint',
        description: 'hands-on exercise - run the full workflow end-to-end with your own product',
        href: '/downloads/higgsfield-kit/exercise.md',
      },
      {
        label: 'ugc factory skill',
        description: 'for consistent style videos - drop into .claude/skills/ to generate on-brand ugc every time',
        href: '/downloads/higgsfield-kit/ugc-factory.skill',
        badge: 'new skill!',
      },
    ],
  },
  {
    slug: 'find-your-brand-voice',
    title: 'how to find your brand voice (and actually keep it consistent)',
    excerpt:
      "most creators sound like everyone else online. here is how to define a voice that is unmistakably yours - and a free tool that builds it into a skill file you can hand to any ai.",
    category: 'branding',
    date: '2026-05-28',
    tags: ['brand voice', 'claude', 'ai writing', 'content strategy', 'tone of voice'],
    body: `## the real reason your content sounds generic

you have heard the advice a thousand times. "just be yourself." "be authentic." "find your voice." none of that is actionable. it is the content equivalent of telling someone to "just be funny." it sounds right and helps no one.

the problem is not that you lack a voice. you have one - you use it every time you text a friend, rant about something you care about, or explain your work to someone who gets it. the problem is that the moment you sit down to write a caption or a script, that voice disappears. you default to what you have seen other creators do. you smooth out the edges. you write something that could have come from anyone.

this is not a discipline problem. it is a definition problem. you have never written down what your voice actually is - the specific words, rhythms, rules, and opinions that make your content yours. once you define it, everything gets easier. your captions write faster. your ai drafts sound like you instead of like a chatbot. your audience starts recognizing your posts before they see your name.

this guide walks you through how to define your brand voice from scratch, document it so it sticks, and lock it into your workflow so every piece of content sounds like you.

## what brand voice actually is (and is not)

brand voice is not your niche. it is not your content pillars. it is not your color palette. those are what you talk about and how things look. voice is how you sound.

it is the difference between "here are 5 tips for better sleep" and "you are ruining your sleep and here is the annoying part - you already know how to fix it." same topic. completely different energy.

your voice is made up of a few specific things:

- **tone** - the emotional register you default to. are you warm and encouraging? blunt and direct? sarcastic? calm and measured?
- **vocabulary** - the words you naturally reach for and the ones you avoid. do you say "leverage" or "use"? "utilize" or "try"? do you swear? do you use slang?
- **rhythm** - short punchy sentences or long flowing ones? do you use fragments? do you start sentences with "and" or "but"?
- **opinions** - what hills do you die on? what do you believe that most people in your niche disagree with? your strongest content always comes from genuine conviction
- **patterns** - do you open with questions? do you use lists? do you end with a call to action or just stop? do you use lowercase or proper capitalization?

when you can name these things, you can replicate them. and when you can replicate them, you can hand them to an ai and get drafts that sound like you instead of like a press release.

## step 1 - mine your own content

the fastest way to find your voice is to look at what you have already written. not what you planned to write - what you actually posted.

**pull your top 10 posts.** go to your analytics on instagram, tiktok, x, linkedin - wherever you post most. sort by engagement rate (not reach). pull the 10 posts that got the most comments, saves, or shares relative to impressions.

**read them out loud.** seriously. read each one aloud. you will hear patterns immediately. the rhythm. the sentence length. the way you start and end. the phrases that keep showing up.

**highlight what repeats.** look for:
- opening patterns (do you start with a question? a bold claim? a story?)
- recurring phrases or words
- sentence structure (short? long? mixed?)
- how you handle transitions
- how you close (cta? punchline? trailing thought?)

**write down 5 things you notice.** these are the seeds of your voice definition. they are not rules you invented - they are patterns you already use when you are at your best.

## step 2 - define your voice in writing

now take those patterns and turn them into a document. this is your voice guide. it does not need to be long - one page is plenty. but it needs to be specific.

**the format we use:**

**tone (3-5 adjectives):** direct, conversational, slightly irreverent, lowercase, no-fluff

**words we use:** "actually," "here is the thing," "the real reason," "most people," "stop," "this is what we run"

**words we never use:** "unleash," "game-changer," "skyrocket," "hack," "crushing it," "leverage," "synergy"

**sentence style:** short by default. fragments are fine. occasional long sentence for rhythm. never more than two sentences without a line break.

**opening style:** lead with a contrarian take or a problem the reader recognizes. never open with "in today's world" or "have you ever wondered."

**closing style:** end with a direct statement or a single-line cta. no "let me know in the comments" or "agree?"

**opinions we hold:** ai is a tool, not a replacement. most content advice is recycled. systems beat motivation. lowercase is a choice, not laziness.

**example posts:** [paste 3-5 of your best posts here]

save this in notion, google docs, or wherever you keep your brand assets. this is the document you will reference every time you write, and the document you will paste into any ai tool that writes for you.

## step 3 - test it against new content

your voice guide is a hypothesis until you test it. write 5 new posts using only your voice rules as guardrails. do not look at what anyone else is posting. just follow your own document.

**the test:** after writing each post, read it out loud. does it sound like your best-performing content? does it sound like something only you would write? if someone saw it without your name attached, would they guess it was yours?

if yes - your voice guide is dialed in. if it feels off, adjust the rules. maybe your tone needs one more adjective. maybe you are using words from your "never use" list without realizing it. refine and test again.

**the real signal:** show your draft to someone who knows you. not a stranger - someone who has read your content before. ask them: "does this sound like me?" their gut reaction tells you more than any metric.

## step 4 - lock it into your ai workflow

this is where voice definition pays compound returns. if you use claude, chatgpt, or any ai for drafting content, your voice guide becomes your system prompt. paste the entire thing - tone, vocabulary, rhythm rules, example posts - into the system prompt or custom instructions.

**before voice guide:** you prompt "write a twitter thread about content repurposing" and get something that sounds like a linkedin thought leader from 2019.

**after voice guide:** you prompt the same thing with your voice rules loaded and get a draft that is 80% you. you close the last 20% with a few edits. the difference is night and day.

the key is being specific. "write in a casual tone" is useless. "write in short sentences. use lowercase. never use the word 'hack.' open with a contrarian take. end with a single-line cta." - that gives the ai something to actually work with.

## step 5 - build it into a skill file

if you use claude code, you can go one step further. turn your voice guide into a .md skill file that lives in your .claude/skills/ folder. every time you ask claude to write content, it automatically references your voice rules without you pasting anything.

the skill file should include:
- your full voice definition (tone, vocabulary, rhythm, opinions)
- 3-5 example posts with annotations on why they work
- a checklist claude should run before returning any draft ("does this open with a contrarian take? does this avoid banned words? is every sentence under 20 words?")
- platform-specific adjustments (twitter = punchier, linkedin = slightly more structured, instagram = more visual language)

this turns your voice from a document you reference into a system that runs automatically. every draft claude generates is pre-filtered through your voice. the editing time drops from 30 minutes to 5.

## the free tool - voice skill builder

we built a tool that walks you through this entire process interactively. it asks you targeted questions about your tone, vocabulary, opinions, and style - then generates a voice profile you can use as-is or drop into your ai workflow.

it is free, it runs in your browser, and it takes about 10 minutes.

[try the voice skill builder here](https://quiz-master-tool-itismevarnica.replit.app/)`,
  },
  {
    slug: 'automate-your-content-pipeline-with-ai',
    title: 'build an ai content pipeline that runs while you sleep',
    excerpt:
      'the exact no-code automation stack that takes you from trending topic to scheduled post without touching a single button. n8n, apify, claude api, notion, and buffer - wired together step by step.',
    category: 'automation',
    date: '2026-05-10',
    tags: ['n8n', 'apify', 'claude api', 'notion', 'buffer', 'make.com', 'later'],
    body: `## the problem with manual content workflows

you spot a trending topic on monday. you brainstorm on tuesday. you write on wednesday. you design on thursday. you post on friday. by friday the trend is dead and the algorithm has moved on.

this is how most creators operate. and it is why most creators plateau. the bottleneck is never ideas - it is the time between spotting an idea and publishing something about it. shrink that gap to near-zero and you win.

the fix is not "work harder." the fix is a pipeline that detects trends, scores them, drafts content, and queues it for posting - all while you sleep. you wake up, review a notion inbox, approve or tweak, and move on with your day.

here is the exact system we run. every tool is real, every connection is no-code, and the whole thing can be built in a weekend.

## the full stack - what you need

before we get into phases, here is every tool in the pipeline and what it does:

- **n8n** - the orchestration layer. every workflow lives here. self-hosted (free, docker) or n8n cloud ($20/mo). this is the brain that connects everything else
- **apify** - web scraping platform with pre-built "actors" for tiktok, instagram, x/twitter, reddit, and youtube. pulls raw trend data on a schedule
- **claude api** - the ai layer. scores trends, generates hooks, writes drafts, and reformats content per platform. uses anthropic's api directly via n8n's http request node
- **notion** - your content hub. every trend, draft, and approved post lives in a single database with status columns, platform tags, and scheduling dates
- **buffer** - multi-platform scheduler. supports instagram, tiktok, x, linkedin, threads, bluesky, pinterest, youtube, and facebook. has an api that n8n can push to directly
- **make.com** (optional) - alternative to n8n if you prefer a visual builder. same logic, different interface. some creators use make for the scheduling leg and n8n for everything else

**total monthly cost:** $0-50 depending on whether you self-host n8n and which apify plan you use. claude api costs scale with usage but a typical creator pipeline runs under $10/month in tokens.

## phase 1 - trend detection (apify + n8n)

this is the ears of your pipeline. every 6 hours, apify scrapers pull trending content from the platforms you care about.

**step 1: pick your apify actors.** go to apify.com/store and grab the actors for your platforms. the key ones:
- **tiktok scraper** - pulls trending hashtags, sounds, and top-performing videos by niche keyword
- **instagram reel scraper** - extracts public reel data including views, likes, shares, and captions
- **x/twitter trends scraper** - grabs real-time trending topics by country or city
- **reddit scraper** - pulls top posts from subreddits relevant to your niche

**step 2: set up scheduled runs in n8n.** create a workflow in n8n with a schedule trigger node set to fire every 6 hours. connect it to an apify node that kicks off each actor. when the actor finishes, its dataset flows into the next node automatically.

**step 3: filter for relevance.** add an n8n "if" node after each scraper. filter by keywords that match your niche. if you are a fitness creator, filter for terms like "workout," "protein," "recovery," "gym." everything that does not match gets dropped. everything that does moves to phase 2.

**what you end up with:** a raw feed of 20-50 trending topics every 6 hours, pre-filtered to your niche, sitting in your n8n workflow ready for scoring.

## phase 2 - ai scoring (claude api)

raw trends are noise. you need signal. this phase uses claude to score every trend on three dimensions so only the best ones become content.

**step 1: build your scoring prompt.** in n8n, add an http request node pointed at the anthropic api (api.anthropic.com/v1/messages). your system prompt should define three scoring criteria:
- **virality potential (1-10):** is this topic generating high engagement? is it rising or peaking?
- **brand fit (1-10):** does this align with your content pillars and audience? would your followers care?
- **freshness (1-10):** is this new enough that posting about it tomorrow still matters?

**step 2: pass the trend data.** for each filtered trend, send the title, description, engagement metrics, and source platform to claude. ask it to return a json object with scores and a one-sentence summary of why this trend is worth covering.

**step 3: set your threshold.** add another "if" node. only trends scoring 22+ out of 30 move forward. this is your quality gate. in practice, out of 50 raw trends you will get 3-8 that clear the bar. that is exactly the right volume for a solo creator.

**pro tip:** include 2-3 examples of past trends you covered successfully in your system prompt. this teaches claude your taste and makes the scoring more accurate over time.

## phase 3 - content generation (claude api + n8n)

winning trends now get turned into actual content. this phase generates platform-specific drafts automatically.

**step 1: define your output formats.** for each winning trend, claude generates:
- **1 short-form hook** (under 10 words, pattern-interrupt style for reels/tiktok)
- **1 tweet/thread** (3-5 posts, first post is a hook, last post is a cta)
- **1 carousel script** (8-10 slides, slide 1 = hook, slide 2-9 = value, slide 10 = cta)
- **1 long caption** (instagram/linkedin, 150-200 words, storytelling format)
- **1 newsletter angle** (2-3 sentence pitch for your next beehiiv or substack issue)

**step 2: build the generation prompt.** this is separate from the scoring prompt. it receives the winning trend summary plus your brand voice guidelines. include:
- your tone (casual, authoritative, funny, raw - whatever fits)
- words/phrases you always use
- words/phrases you never use
- your typical cta style
- example posts that performed well (paste 2-3 real ones)

**step 3: format the output.** use n8n's "set" node to structure claude's response into clean fields: hook, thread, carousel, caption, newsletter_angle, source_trend, score, generated_date.

**the key insight:** you are not asking claude to write finished posts. you are asking it to write 80%-done drafts. your voice and judgment close the last 20%. this is what separates slop from content that actually sounds like you.

## phase 4 - content hub (notion)

every generated draft lands in a notion database automatically. this is your review inbox.

**step 1: create your notion database.** set up a database with these properties:
- **title** (text) - the hook or headline
- **status** (select) - "draft," "in review," "approved," "scheduled," "published"
- **platform** (multi-select) - instagram, tiktok, x, linkedin, threads, newsletter
- **content type** (select) - hook, thread, carousel, caption, newsletter
- **source trend** (text) - what triggered this piece
- **trend score** (number) - the claude score from phase 2
- **body** (rich text) - the full draft content
- **scheduled date** (date) - when this should go live
- **generated date** (date) - when the pipeline created it

**step 2: connect n8n to notion.** use n8n's native notion node. map each field from your generation output to the corresponding notion property. every time the pipeline runs, new rows appear in your database.

**step 3: build your review workflow.** every morning, open your notion database filtered to status = "draft." read each piece. edit what needs editing. change status to "approved" and set a scheduled date. this should take 15-20 minutes for 3-8 pieces.

**optional: add a kanban view.** create a board view grouped by status. drag cards from "draft" to "approved" to "scheduled." visual and satisfying.

## phase 5 - scheduling (buffer)

approved content gets pushed to buffer automatically. no copy-pasting. no manual scheduling.

**step 1: connect notion to n8n (again).** create a second n8n workflow triggered by notion database changes. when a row's status changes to "approved," this workflow fires.

**step 2: format for each platform.** use n8n's "switch" node to route content by platform. each branch reformats the content for that platform's requirements - character limits, hashtag placement, mention formatting.

**step 3: push to buffer via api.** use n8n's http request node to hit buffer's api. create a post for each platform with the content body and scheduled time. buffer handles the actual publishing at the right time.

**alternative: use make.com for this leg.** if you prefer make.com's visual builder, you can use it just for the notion-to-buffer connection. make has native modules for both notion and buffer, which means less api configuration.

**posting time optimization:** buffer analyzes your audience engagement patterns and suggests optimal posting times per platform. use these suggestions when setting your scheduled dates in notion.

## phase 6 - the feedback loop

this is what separates a pipeline from a system. after content goes live, you feed performance data back into the pipeline to make it smarter.

**step 1: track performance.** once a week, check which posts performed best. note the trend scores, content types, and platforms that drove the most engagement.

**step 2: update your scoring prompt.** add recent winners to your claude scoring prompt as examples. "trends like [this] scored well. trends like [that] underperformed." this tunes the ai to your specific audience over time.

**step 3: refine your filters.** if certain keywords consistently produce low-scoring trends, add them to your n8n filter's exclusion list. if new keywords emerge, add them to your inclusion list.

**after 4 weeks:** your pipeline gets noticeably better. trend detection is tighter, drafts are closer to your voice, and your approval rate goes up. you spend less time editing and more time doing the work that actually requires a human - being on camera, talking to your audience, building relationships.

## the daily workflow (after setup)

here is what your day looks like once the pipeline is running:

- **morning (15-20 min):** open notion. review 3-8 drafts. edit, approve, set dates. done.
- **rest of the day:** create original content, engage with your audience, pitch brands, live your life.
- **the pipeline runs 4x/day in the background.** trends get scraped, scored, and drafted without you touching anything.

**before the pipeline:** 3-4 hours/day finding topics, writing, formatting, scheduling.
**after the pipeline:** 15-20 minutes/day reviewing and approving.

## common mistakes to avoid

- **skipping the human review step.** never auto-publish. always review. the pipeline generates drafts, not finished content. your taste is the product.
- **setting the score threshold too low.** if you approve everything, you flood your feed with mid content. keep the bar high. 3-5 great posts per day beats 15 forgettable ones.
- **ignoring the feedback loop.** the pipeline is only as smart as the examples you feed it. update your prompts monthly at minimum.
- **overcomplicating the setup.** start with one platform and one content type. get that working. then expand. a pipeline that runs beats a pipeline that is "almost ready."

## the complete stack (with costs)

- **n8n** - workflow orchestration ($0 self-hosted / $20/mo cloud)
- **apify** - trend scraping ($0-49/mo depending on volume)
- **claude api** - scoring + generation (~$5-15/mo for a typical creator pipeline)
- **notion** - content hub (free tier works fine)
- **buffer** - scheduling ($0-6/mo per channel)
- **make.com** (optional) - visual automation alternative ($0-9/mo)

**total realistic cost for a solo creator: $15-50/month.** compare that to 80+ hours/month saved.

## who this is for

solo creators and small teams (1-5 people) who post on 2+ platforms and want to stop reinventing the wheel every morning. you need basic comfort with connecting tools via apis - no coding required, but you should know what an api key is and how to paste one into a settings field.

if you can follow a recipe, you can build this pipeline. the initial setup takes one focused weekend. the compound returns last as long as you keep creating.`,
  },
  {
    slug: 'brand-identity-checklist-for-creators',
    title: 'the brand identity checklist every creator needs before pitching',
    excerpt:
      "brands don't just look at follower count. here's the 12-point checklist - with exact tools and steps for each one - that makes you look professional, prepared, and worth the investment before you ever send a pitch.",
    category: 'branding',
    date: '2026-05-01',
    tags: ['canva', 'figma', 'notion', 'carrd', 'instagram', 'linkedin', 'beehiiv'],
    body: `## why brand identity matters more than follower count

a creator with 10k followers and a tight brand identity will out-earn a creator with 100k followers and a messy profile. this is not a theory. it is what brand managers say in every survey, every year.

in 2026, 73% of creators use standardized rate cards. the ones who do not get passed over for the ones who do. brands want partners who feel professional and aligned - not just popular. when a marketing manager opens your pitch, they are looking for signals that say "this person runs a business." your brand identity is that signal.

this checklist covers 12 specific points across three categories. for each one, we tell you exactly what to do, which tool to use, and what "done" looks like. treat it as a build list, not a reading list.

## the 12-point checklist

### visual identity (points 1-4)

## 1. consistent profile photo

**what:** the same high-quality photo across every platform - instagram, tiktok, x, linkedin, youtube, threads, newsletter, and your website.

**how to do it:**
- shoot one photo with clean lighting against a simple background. natural light near a window works. phone camera is fine if it is recent
- edit it in lightroom mobile (free) or vsco. adjust exposure, contrast, and warmth. do not over-filter
- crop to a perfect square, 1000x1000px minimum
- upload to every platform in one sitting. check each one renders correctly at small sizes (your face should be recognizable at 40x40px)

**tool:** lightroom mobile (free) for editing. canva (free) for resizing to platform specs if needed.

**done looks like:** someone could screenshot your profile from any platform and they would all look identical.

## 2. color palette

**what:** 3-5 colors you use consistently in every graphic, thumbnail, story template, and highlight cover.

**how to do it:**
- pick 1 primary color (your brand's main vibe), 1 secondary color (accent), 1 neutral (backgrounds), and optionally 1-2 supporting tones
- save the hex codes in a notion page titled "brand assets." you will reference this constantly
- in canva, go to brand kit (free on canva pro) and enter your colors. they will auto-populate in every new design
- in figma, create a color styles page in your brand file. apply them globally

**tool:** coolors.co (free) to generate palettes. canva brand kit or figma styles to lock them in.

**done looks like:** your instagram grid has a visible color consistency. someone scrolling past your content recognizes it before reading your name.

## 3. typography

**what:** 1-2 fonts that appear in all your content templates - thumbnails, carousels, stories, and your media kit.

**how to do it:**
- pick one display font (for headlines) and one body font (for captions and paragraphs). google fonts has thousands of free options
- load both into canva brand kit so every template defaults to them
- if you use figma, add them to your text styles
- avoid script fonts for body text. they are hard to read on mobile

**tool:** google fonts (free) for selection. canva or figma for implementation.

**done looks like:** your carousel post, your youtube thumbnail, and your media kit all use the same two fonts. no comic sans. no random serif-sans switching between posts.

## 4. bio format

**what:** a clear, specific bio on every platform that tells people what you do, who you help, and why they should follow.

**how to do it:**
- use this framework: [what you do] + [who you help] + [proof/hook]. example: "i teach freelancers how to land $5k clients. helped 200+ creators go full-time."
- keep it under 150 characters for platforms with tight limits (x, tiktok)
- include one link (your carrd, linktree, or website)
- add a clear cta: "dm for collabs" or "free guide below" or "new video every tuesday"
- update on all platforms in one sitting

**tool:** carrd ($19/year for a custom one-page site as your link destination). notion for drafting bio variations.

**done looks like:** a stranger landing on any of your profiles knows in 5 seconds what you do and whether they should follow.

### content identity (points 5-8)

## 5. content pillars

**what:** 3-4 topics you consistently create about. these define your niche and help brands understand your audience.

**how to do it:**
- open notion and create a page called "content pillars." list 3-4 topics that overlap between your expertise, your audience's interest, and brand-friendly territory
- example for a fitness creator: "home workouts," "nutrition for busy people," "mental health + movement," "gear reviews"
- for each pillar, list 5-10 specific post ideas. this becomes your content backlog
- reference your pillars every time you plan content. if a trend does not fit a pillar, skip it

**tool:** notion (free) for documentation. reference this doc in your media kit.

**done looks like:** anyone looking at your last 20 posts can identify 3-4 clear themes without you explaining them.

## 6. posting cadence

**what:** a predictable schedule brands can count on. "posts randomly" is a red flag in brand decks.

**how to do it:**
- decide on a realistic frequency per platform. 3-5x/week on instagram, 1-2x/week on youtube, daily on x/threads is a common split for mid-tier creators
- build a content calendar in notion. use a database with date, platform, content type, pillar, and status columns
- use buffer or later to pre-schedule posts. batch-create on one day, schedule for the week
- document your cadence in your media kit: "instagram: 4x/week (2 reels, 1 carousel, 1 story series)"

**tool:** notion (free) for planning. buffer ($0-6/mo per channel) or later for scheduling.

**done looks like:** you have not missed a posting day in 4+ weeks. your media kit states a clear cadence and your profile backs it up.

## 7. signature format

**what:** a recognizable content style that people associate with you. "oh that's a [your name] style post."

**how to do it:**
- audit your best-performing content from the last 90 days. what format keeps showing up? talking-head reels? screenshot carousels? text-over-b-roll?
- double down on the 1-2 formats that consistently perform. make them your signature
- create canva templates for your signature format so you can produce them fast. lock the layout, colors, and fonts
- name your format if it is unique enough. "the 60-second breakdown." "the screenshot stack." this makes it easy for brands to reference in briefs

**tool:** canva (free/pro) for templates. instagram insights or tiktok analytics for performance data.

**done looks like:** a brand manager looks at your grid and immediately understands what a collab post with you would look and feel like.

## 8. tone of voice

**what:** a defined and consistent way you write and speak across captions, scripts, and replies.

**how to do it:**
- open a notion doc. write down 5 adjectives that describe your tone: "direct, funny, no-fluff, encouraging, lowercase"
- list 5 phrases you always use and 5 phrases you never use
- save 3-5 example captions that perfectly represent your voice. include these in your media kit under "tone of voice"
- if you use claude or any ai for drafts, paste your voice guidelines into the system prompt so generated content matches your style

**tool:** notion (free) for documentation. claude for voice-matched draft generation.

**done looks like:** someone could read a caption without seeing the author and know it is you.

### business identity (points 9-12)

## 9. media kit

**what:** a 2-3 page pdf that gives a brand everything they need to evaluate you as a partner. this is the single most important document in your pitch toolkit.

**how to do it:**
- **page 1 - the overview.** your name/handle, profile photo, one-sentence bio, platforms with follower counts, and your top 3 content pillars. include your audience demographics: age range, gender split, top locations. pull these from instagram insights, youtube studio, or tiktok analytics
- **page 2 - the proof.** 3-5 screenshots of your best-performing content with engagement metrics visible. include engagement rate (not just follower count - brands care about this more). if you have done brand work before, show 2-3 logos of past partners
- **page 3 - the offer.** your deliverable types (reel, carousel, story, youtube integration, newsletter mention) with pricing ranges. link to your full rate card. include your contact email and a cta

**tool:** canva has 250,000+ templates including dozens of media kit layouts. search "media kit" in canva, pick one that matches your brand colors, and customize. for more control, use figma - there are free community templates specifically for creator media kits.

**format:** export as pdf. name it "yourname-media-kit-2026.pdf." host it on your carrd site as a downloadable link.

**done looks like:** a brand manager receives your pitch, opens the pdf, and in 60 seconds knows your audience size, demographics, content style, past results, and pricing. no follow-up questions needed.

## 10. rate card

**what:** clear pricing for every deliverable you offer. no "dm for rates" - that signals you do not know your worth.

**how to do it:**
- list every deliverable type: instagram reel, instagram carousel, instagram story (set of 3), tiktok video, youtube integration (30/60 seconds), newsletter mention, x/twitter thread, linkedin post, bundle packages
- price each one. for nano creators (1k-10k followers), start at $50-500 per deliverable. for micro creators (10k-100k), $500-5,000. adjust based on your engagement rate, niche, and production quality
- offer 2-3 bundle packages. example: "the essentials" (1 reel + 3 stories, $800), "the full push" (1 reel + 1 carousel + 5 stories + 1 newsletter mention, $2,000)
- include usage rights pricing. brands using your content in their ads should pay 50-100% extra for perpetual rights
- add a note about exclusivity premiums (15-30% markup if they want you to avoid competitors)

**tool:** canva for a clean one-page pdf. notion for maintaining a live version you update quarterly.

**done looks like:** when a brand asks "what are your rates?" you send a polished pdf within 2 minutes instead of scrambling to make up numbers on the spot.

## 11. case studies

**what:** 2-3 documented examples of past brand work with real results. this is your proof that you deliver, not just post.

**how to do it:**
- for each case study, document: the brand name (with permission), the brief, what you delivered, and the results
- results should be specific numbers: "instagram reel reached 145k accounts, 8.2% engagement rate, 2,300 link clicks, brand reported 340 sales attributed to the campaign"
- if you do not have brand deals yet, create case studies from your own content. "this organic reel reached 200k views. here is what i did and why it worked." brands care about results, not whether someone paid you to get them
- format each case study as a one-page pdf or a dedicated section in your media kit
- include a screenshot of the content and a screenshot of the analytics

**tool:** canva for formatting. instagram/tiktok/youtube analytics for pulling results. notion for maintaining a running log of every campaign you complete.

**done looks like:** three polished case study pages that prove you understand strategy, execution, and measurement - not just "posting."

## 12. professional email and landing page

**what:** a dedicated business email (not your personal gmail) and a simple one-page website that ties everything together.

**how to do it:**
- **email:** set up yourname@yourdomain.com or use a professional-looking format like hello@yourname.com. google workspace is $6/mo. if you already use beehiiv for your newsletter, your email is handled there. the point is: brand managers see "sarah@sarahcreates.com" not "xoxosarah2003@gmail.com"
- **landing page:** build a one-page site on carrd ($19/year) that includes your bio, links to all platforms, a media kit download button, your newsletter signup (connect to beehiiv), and a contact form. this becomes the link in all your bios
- **newsletter:** if you do not have one, start one on beehiiv (free up to 1,000 subscribers). even a small subscriber list signals to brands that you own your audience and are not entirely dependent on algorithms

**tool:** carrd ($19/year) for the landing page. beehiiv (free tier) for newsletter. google workspace ($6/mo) or zoho mail (free) for professional email.

**done looks like:** your link-in-bio goes to a polished carrd page. your email looks professional. you have a newsletter that brands can see you take seriously.

## how to audit yourself

go through each of the 12 points and rate yourself 1-3:

- **1** = missing or inconsistent
- **2** = exists but needs polish
- **3** = tight and professional

**36 = perfect score.** if you are below 28, stop pitching and spend a week fixing the gaps. brands notice these details. a weak media kit or an inconsistent grid will lose you deals you never even hear about - because the brand just moves on to the next creator without telling you why.

## the one-weekend build plan

you can get from zero to "pitch-ready" in one focused weekend. here is the order:

**saturday morning:**
- lock your color palette and fonts (30 min)
- update your profile photo on all platforms (20 min)
- rewrite your bios using the framework above (30 min)
- document your content pillars and tone of voice in notion (45 min)

**saturday afternoon:**
- build your media kit in canva - 2-3 pages (90 min)
- create your rate card (60 min)

**sunday morning:**
- write 2-3 case studies from your best organic content (90 min)
- set up your carrd landing page (60 min)

**sunday afternoon:**
- set up professional email (30 min)
- set up beehiiv newsletter if you do not have one (45 min)
- connect everything: bio links to carrd, carrd links to media kit, newsletter signup on carrd (30 min)
- final audit: go through the 12-point checklist and score yourself (15 min)

**total time: roughly 8-10 hours.** after that, you have a professional brand identity that competes with creators 10x your size.

## the payoff

when a brand googles you or clicks your profile, every touchpoint should say: "this person runs a business." your grid is consistent. your bio is clear. your media kit answers every question before it is asked. your rate card shows you know your value. your case studies prove you deliver results.

that is what gets you the deal. not follower count. not going viral once. a tight brand identity signals professionalism, and professionalism is what makes brands comfortable writing checks.

## the complete tool stack

- **canva** - media kit, rate card, case study formatting, content templates (free/pro)
- **figma** - advanced media kit design, brand asset system (free tier)
- **notion** - content pillars, tone of voice, content calendar, campaign log (free)
- **carrd** - one-page landing site, link-in-bio destination ($19/year)
- **beehiiv** - newsletter platform, audience ownership (free up to 1k subs)
- **instagram insights / tiktok analytics / youtube studio** - audience demographics and performance data (free)
- **linkedin** - professional profile, b2b brand partnerships (free)
- **buffer** - posting schedule consistency across platforms ($0-6/mo per channel)
- **lightroom mobile** - profile photo editing (free)
- **google workspace** - professional email ($6/mo)`,
  },
  {
    slug: 'website-terms-explained-plain-english',
    title: 'ai built you a pretty website. here’s everything it skipped (15 terms, plain english, how to fix each)',
    excerpt:
      "ai builds you a pretty site in five minutes and skips every single thing that decides whether google finds you, whether your emails land in the inbox, and whether anyone trusts you enough to buy. here’s all 15 of those scary web words in plain english, with the actual fix for each.",
    category: 'strategy',
    date: '2026-09-09',
    tags: ['seo', 'web design', 'small business', 'website tips', 'google', 'ai websites', 'core web vitals'],
    body: `## ai gives you a pretty page. it skips everything that makes it work

ai builds you a website in five minutes and it looks great. then it quietly skips every invisible thing that actually decides whether the site does its job - whether google can find you, whether your emails land in the inbox, whether your link looks good when someone shares it, and whether a stranger trusts you enough to actually buy.

that invisible layer is the part your "web guy" wraps in scary words so it sounds harder than it is. here's all of it in plain english. what each thing actually is, why it matters, and how to fix it.

## part 1: what google reads about you

this whole group decides if you even show up when someone searches.

**meta tags - what google reads about you.** the text behind your page that writes the blue title and grey description you see in search results. leave it blank and google writes your listing for you, usually badly. **fix:** give every page a unique title (under ~60 characters) and description (under ~155) that says what the page is and who it's for. it's the "seo title" field in most site builders.

**schema - how you tell google what you actually do.** hidden labels that spell your business out in a language google understands: "this is a local business," "this is a review," "these are our hours." it's how you get the star ratings and faqs that make your listing pop. **fix:** add localbusiness or organization schema (product, service, faq where it fits). most seo plugins do it for you.

**sitemap - the list of pages you're asking google to look at.** one file that lists every page so google doesn't have to guess. without it, new pages can sit undiscovered for weeks. **fix:** most platforms auto-make one at yoursite.com/sitemap.xml. submit that link once in google search console. done.

**robots.txt - the note that tells google whether it's allowed in.** a tiny file that tells search engines which pages they can look at. one wrong line here can hide your entire site from google, and it happens way more than you'd think. **fix:** check yoursite.com/robots.txt. if you see "disallow: /" sitting on its own line, that's blocking everything - kill it.

**indexing - whether you're in google at all.** indexed means google actually saved your page and can show it. not indexed means you're invisible no matter how good the page is. **fix:** google "site:yoursite.com". if your pages don't show up, open google search console, use url inspection, hit request indexing.

**canonical tag - why google thinks you have three websites.** a label that tells google which version of a page is the real one when the same content lives at a few different links (http vs https, www vs not, slash vs no slash). without it google splits your ranking across the copies and trusts you less. **fix:** set one canonical link per page (your seo plugin handles it) and redirect all the variations to one version.

**301 redirect - the forwarding address for your old pages.** when you delete or rename a page, a 301 permanently forwards the old link, and its google ranking, to the new one. skip it and old links break, visitors hit "page not found," and you throw away ranking you already earned. **fix:** any time a url changes, add a 301 from old to new. most platforms have a redirects tool.

## part 2: what your visitors actually experience

google now scores how your site feels to a real human. so does your buyer.

**core web vitals - google's score for how the site feels to use.** google's report card on three things: how fast the main content loads, how fast the page reacts to a tap, and whether stuff jumps around while it loads. a bad score quietly holds you back in search, and it's exactly the jankiness that makes people bounce. **fix:** run your homepage through google pagespeed insights (free). it hands you a to-do list. it's usually the next three things on this list.

**load time / lcp - how long someone stares at a blank screen.** lcp measures how long until the biggest thing on your page (usually the hero image) actually shows up. most people leave if it takes more than ~3 seconds. that's a sale gone before they read a word. **fix:** compress your images. a 4mb hero should be more like 200kb. use webp. don't autoplay giant background videos on mobile.

**lazy loading - the image that loads after they've already decided to leave.** loading images only as someone scrolls down to them, instead of all at once up front. done right, the top of your page loads instantly. done wrong, your main images pop in late and the page feels broken. **fix:** lazy-load images below the fold, never your logo or hero. those need to show up immediately.

**alt text - describing your photos to google, which can't see them.** a short written description of each image. screen readers read it out loud, and google uses it to understand the picture. it's free seo, it gets you into google images, and it makes your site usable for people who can't see it (also a legal thing in a lot of places). **fix:** write one honest sentence per real image describing what's in it. skip the decorative stuff, don't keyword-stuff.

**open graph - what your link looks like when someone shares it.** the image and title that show up when your link gets pasted into instagram, imessage, linkedin, or whatsapp. no open graph image means your link shares as a sad grey box nobody clicks. **fix:** set an open graph image (1200x630px) and title for your main pages. test it by pasting your link into a private message before you share it anywhere real.

**exif data - the hidden info inside every photo you upload.** every photo secretly stores extra data: the camera, the settings, and often the exact gps location it was taken. upload a photo from your house and you might be publishing your home address without knowing it. **fix:** strip exif before uploading (most compression tools do it automatically). bonus: the files get smaller and load faster.

## part 3: whether your emails even arrive

**spf / dkim / dmarc - whether your emails land in inbox or spam.** three behind-the-scenes settings that prove your emails are really from you and not a scammer pretending to be you. without them, your booking confirmations, invoices and newsletters quietly land in spam and you never find out why your open rate is trash. **fix:** add spf, dkim and dmarc records in your domain's dns settings. your email provider gives you the exact ones to paste. then test it at mail-tester.com.

## part 4: whether your forms actually work

**form endpoint - where the message actually goes.** the behind-the-scenes address your contact form sends its submissions to. if it's not set up, someone fills out your form, hits send, sees "thank you"... and the message goes nowhere. you lose the lead and never even know it existed. **fix:** connect your form to a real destination (your email, formspree, your crm), and then the part everyone skips: test it yourself. fill out your own form and make sure the message actually shows up.

## the point

none of this is magic. it's just the invisible layer ai builders skip because it doesn't make the page prettier, it makes it actually work.

a pretty page google can't find, that loads in six seconds, whose emails go to spam and whose contact form goes nowhere isn't a website. it's a screenshot.

if reading this made you realize your site is missing half of these, that's normal - almost every diy and ai-built site is. want me to look at yours and tell you exactly what's missing? that's literally what i do.`,
    caption: `"i made my website with ai" is not the flex you think it is.

ai gives you a pretty page. it skips every invisible thing that decides whether google finds you, whether your emails land in inbox or spam, and whether your contact form actually goes anywhere.

i broke down all 15 of those scary web words in plain english, with the fix for each. full guide on my site.`,
  },
];

export const guideBody = (slug: string) => GUIDES_CONTENT.find((g) => g.slug === slug);
