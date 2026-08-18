# DESIGN-BRIEF — read this first, before reviewing

You are an **external review input**, not a lane. You have **read access** to this repo and
**no write access** — that's deliberate, and it's a safety boundary, not a snub. See
`CLAUDE.md` §8 ("External review inputs are NOT lanes") for the reasoning: you can't run the
Playwright gate, and §3's srcdoc footgun is invisible without it — one literal `"` inside an
iframe blanks that entire iframe with no console error and a clean `node --check`. Exactly one
lane writes `master`, and everything passes 22 suites first. That's why the app has never
shipped a blank tab in 80+ releases.

## How we exchange work

- **You → us:** write your findings as a single markdown file. The owner saves it into this
  repo root as `DESIGN-REVIEW.md` (or `DESIGN-REVIEW-<topic>.md`). Lane A commits it on a
  `laneA/*` branch and Lane E merges it — same path as any other change.
- **Us → you:** we leave context for you *in the repo*, since you can read it. Start here:
  1. **`DESIGN-BRIEF.md`** (this file) — current state + what we want next.
  2. **`DESIGN-REVIEW-PROMPT.md`** — the standing brief: product, users, constraints.
  3. **`LANE.md`** — authoritative current state (live stamp, lanes, queue).
  4. **`CLAUDE.md`** — §3 srcdoc footgun · §4 youth safety gate · §6 lane roles · §7 the
     postMessage seam. Read §3 and §4 before proposing anything that touches markup.

## Ground truth (don't trust numbers written in prose — read them from source)

- Live stamp + SW cache: read from `index.html` (`#ver-stamp`, the SW cache name).
- Iframe boundaries: ARM is the first `srcdoc=` → first `"></iframe>`; FUEL is the second pair;
  the host script follows. **Do not cite line numbers** — the file moves constantly.
- Lanes: **A** (iframe content, spec, browser verification) · **E** (host shell + sole release
  engineer) · **D** (cloud, PRs). **B and C are RETIRED** — if you see them referenced as active
  anywhere, that text is stale; tell us rather than following it.

## What makes a recommendation land here

- Name the **region** it touches (ARM srcdoc / FUEL srcdoc / host script) and whether it
  crosses the iframe seam. Seam crossings are expensive; say so.
- Give a **cheaper version** of anything MEDIUM or larger. We ship in small gated units.
- Flag anything that touches the **youth tier** (`body.youth` / `body.fuel-youth` /
  `BATTERY_TIER`). Youth must never see supplements, stimulants, dosing, or macro numbers.
- Run a **devil's-advocate pass on your own recommendations** and mark which findings are real
  defects in your proposal vs. hedges. The last review did this and it was the most valuable
  section — two MUST-FIX items came out of it.
- **Prefer three changes we'll make over twenty we won't.** Order by impact.

## Standing constraints (unchanged)

Single self-contained HTML file · no build step · no frameworks · offline PWA · dark steel/gold
aesthetic · phone-first, used one-handed in sunlight at a field · adult + youth profiles.

## Open questions for the next pass

1. **Did item 1 work?** Once one day-type control ships, does the app become explainable?
   Specifically: is TRAIN-vs-HEAVY a judgment the owner can make at 6am, or does it need the
   REST/TRAIN/GAME fallback you proposed?
2. **Warmup is becoming two tracked parts** — J-Bands + Stretching (new). Stretching applies
   when the day includes lifting, batting, running, sprints, pop-flys, jumping, lateral
   footwork, or pitching. Does that belong as a fifth stream flag, or nested inside `arm`?
3. **Lift-day split selection** — the owner trains chest+bis / back+tris / shoulders+legs
   (deliberately pairing *opposing* groups). How should a split picker reorganize the Lifting
   tab without becoming a second day-type control? (Same trap as plan-vs-day-type.)
4. **Protein banking.** Protein is hard to hit on lift days and easy the day after. Is a 48h
   rolling view the right model, or does that break the daily-goal mental model entirely?
5. **Equipment reality:** The Clubhouse + Marriott hotel gyms — dumbbells, cables/bands,
   sometimes a Smith machine, rarely a real rack. Exercise content should assume that.
