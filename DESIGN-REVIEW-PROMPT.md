# Prompt for Claude Design (paste this)

**Setup in the Claude Design window:** click the ✕/attach button → **GitHub connected** → pick
`OvercastBTC/battery` (the app is the single file `index.html`). If GitHub isn't linked, use
**Link local code…** → `/Users/bacona/battery-laneA`. You can also just give it the live URL
<https://overcastbtc.github.io/battery/> — but the repo gives it the real markup, which is better.

---

## PASTE FROM HERE

I want a **design and information-architecture review** of a personal baseball training PWA — not a
rewrite, not new branding. Please review what exists and tell me how to reorganize it.

**The app:** BATTERY — <https://overcastbtc.github.io/battery/> (source: `index.html`, a single
hand-edited file). It's used by me (an adult recreational player who pitches, plays 1B, hits, and
lifts) and by my ~12-year-old son on his own profile. It's phone-first, installed to the home
screen, and used *at the field* — often one-handed, in bright sun, mid-workout.

**What it does:** tracks arm-care exercise routines (J-Bands, shoulder tube, PlyoCare, long toss,
fielding drills, lifting), plus daily hydration and protein, plus game-day pitch counts and required
rest.

### The problems I actually want solved

1. **Things are scattered, and common things live in different places.** Over ~80 incremental
   releases, features landed wherever was convenient. I want a coherent information architecture:
   what belongs on the home screen, what belongs one level down, what should be settings.

2. **Two different controls both answer "what kind of day is this," and they contradict each other.**
   - On HOME: *"Today's plan"* — multi-select chips (Warmup / Drills / Body / Lift) that decide which
     activity rows show and what counts toward a 0–100 readiness ring.
   - In FUEL: *"Today's day-type"* — chips (Rest / Light / Train / Heavy / Game / Travel) that set
     protein and water targets.
   They partly drive each other, they can disagree, and I can't explain the difference to myself.
   **This is the single most important thing to fix.** Should they be one control? Two clearly
   distinct ones? Something else entirely?

3. **Features I already built are undiscoverable.** Two examples I only just learned still exist:
   - Tapping ☆ on any logged item turns it into a one-tap quick-add button.
   - Long-pressing a quick-add button opens edit / favorite / move-left / move-right.
   Nobody would ever find either. Tell me how to surface capabilities like this without adding
   clutter. (Related: I asked for drag-to-reorder; is that even right on a phone, or is
   move-left/right better? Your call.)

4. **Logging food and water needs to be faster.** Today: a grid of ~60 preset buttons, a favorites
   shelf, a quantity picker with saved values, and a custom-entry form. I want the fastest possible
   "I just drank/ate this" path, including logging food and water together in one action. What's the
   best pattern here?

5. **The home screen is crowded.** It currently stacks: greeting, a 5-icon section menu
   (ARM/DRILLS/BODY/LIFT/GAME), a readiness ring, plan chips, per-stream progress rows, a sleep
   check-in, and a "start today's flow" button. Too much competes for the top of the screen.

6. **The kid's version should feel like his app, not a redacted version of mine.** He's on a "youth"
   tier that hides supplements, stimulants, dosing, and macro numbers for safety. Right now that
   mostly reads as *things removed*. How should a youth version feel different rather than lesser?

### Hard constraints (please respect these)

- **Single self-contained HTML file, no build step, no frameworks, no external requests.** It's an
  offline-capable PWA. Please don't propose React/Tailwind/component libraries.
- The UI lives in **two sandboxed iframes** (arm-care and fuel) inside a host shell. Cross-iframe
  moves are expensive; note when a suggestion crosses that line.
- **Dark, industrial "battery/steel" aesthetic** (near-black background, gold/amber accent, red and
  blue secondaries, monospace labels). Keep it — refine rather than replace.
- **Phone-first, sunlight, one-handed, sweaty hands.** Touch targets and contrast matter more than
  density.
- A **youth safety tier** must never see supplement/stimulant/dosing/quantified-macro content.

### What I want back

1. The **information architecture recommendation** — what goes where, and what to cut or merge.
2. A **specific resolution for the plan-vs-day-type conflict** (problem 2), with reasoning.
3. **Home-screen priority**: what earns space above the fold, what moves down.
4. **Discoverability fixes** for existing hidden features (problem 3).
5. **The fastest food+water logging pattern** you'd recommend (problem 4).
6. A **youth-experience direction** (problem 6).

Prioritize by impact and tell me what to do first. Concrete and specific beats comprehensive — I'd
rather have three changes I'll actually make than twenty I won't. Where you're proposing something
that would be a big lift in a single-file app, say so, and offer a cheaper version.

## PASTE TO HERE
