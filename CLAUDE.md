# BATTERY — Claude Code Context

## 1. What BATTERY Is

Single-file installable PWA: `/Users/bacona/battery/index.html` (~9 400 lines, hand-edited, no bundler).
Deployed via GitHub Pages from branch `master`: **https://overcastbtc.github.io/battery/**
Baseball arm-care + nutrition/hydration tracker (profiles: adult / youth).

## 2. Architecture

One host HTML shell containing **two srcdoc iframes** (NOT `src=`), sharing the parent origin + localStorage.

| iframe | id | title | line range (verify by reading — shift as file grows) |
|--------|-----|-------|------------------------------------------------------|
| ARM | `#f-arm` | Arm Care | ~122 – 3361 |
| FUEL | `#f-fuel` | Fuel Stack | ~3362 – 8397 |
| Host `<script>` | — | shell logic | ~8466 – EOF (~9374) |

ARM iframe covers arm-care drills, body, and PlyoCare content.
FUEL iframe covers nutrition/hydration tracker.
Host shell owns nav, profiles, scoreboard, postMessage routing, SW registration.

SW cache name: `battery-v22` (bump on every deploy).
Version stamp: `#ver-stamp` text format `YY.MM.DD.NN` (e.g. `26.06.14.22`).

## 3. THE srcdoc Footgun — READ THIS FIRST

**A literal double-quote (`"`) anywhere inside a `srcdoc="..."` attribute silently truncates the entire iframe.** Every function defined after it becomes `undefined`. There is NO console error, NO page error — the iframe simply stops at the truncation point. `node --check` on the extracted script does NOT catch it (HTML decoding masks it). Only the Playwright gate (which loads the real iframe) catches it.

### Escaping rules inside srcdoc

- **Never write a literal `"` inside srcdoc content.** Use `&quot;` — it decodes to `"` at runtime.
- Single quotes (`'`) are safe; use them freely for JS strings.
- A standalone `&` must be `&amp;`.
- **ARM iframe** writes logical-AND as raw `&&` (the ARM srcdoc uses `&&` directly).
- **FUEL iframe** writes logical-AND as `&amp;&amp;` (the FUEL srcdoc encodes ampersands).
- Keep these consistent with existing usage in each iframe — mixing conventions breaks things.

### How to detect a truncation

After each `srcdoc="`, scan forward: the **first literal `"`** in the file should be the closing `"></iframe>`. Any earlier `"` is the bug. Run the Playwright gate to confirm.

## 4. Youth Safety Gate (§4.3 — child-safety boundary)

A youth-tier profile must **never** see: supplement / stimulant / dosing / quantified macro targets / heavy-weighted-ball content.

**Mechanisms in place:**
- Host injects `window.BATTERY_TIER` (`'youth'` | `'adult'`) into iframes; toggles `body.youth` on the host.
- FUEL iframe: sets `body.fuel-youth`; CSS hides `.qa-adult` elements (Liquid IV, LMNT, Thorne, Core Power quick-adds + Overview/Protein/Hydration/Products tabs). `switchTab()` youth guard blocks nav to those tabs.
- ARM/PlyoCare: `.plyo-heavy` is gated behind `body.youth` (`display:none`); a light-catch/play-only note is shown instead.

**Rule:** every new nutrition or training-load surface must add a youth variant / gate.

## 5. How to Test

Test harness (authoritative): `~/battery-tests/run.sh`
Runs **11 Playwright tests** against the current `index.html`:
`iframe-render`, `arm-history`, `persistence`, `export-scope`, `unified-export`, `import-roundtrip`, `profile-mgmt`, `youth-fuel-gate`, `today-view`, `e7-host`, `fuel-dual-credit`.

`node --check` on the host `<script>` block is a useful quick check, but **it does not catch srcdoc breakage** (HTML encoding masks truncation from the parser). The Playwright gate is authoritative for all iframe edits.

Run order: `node --check` first (fast), then `~/battery-tests/run.sh` (definitive).

## 6. Two-Lane / Release Protocol

### Lane A — Claude Code session (iframe content developer)
- Worktree: `/Users/bacona/battery`, checked out on `laneA/content` (or another `laneA/*` branch).
- Scope: FUEL + ARM/PlyoCare iframe content; iframe side of the postMessage seam.
- Runs `~/battery-tests/run.sh` as a sanity check.
- Posts `READY` in `LANE.md §B` when done.
- **Does NOT** commit to `master`, bump the release stamp, push, or deploy.

### Lane B — VS Code session (host shell + sole release engineer)
- Worktree: `/Users/bacona/battery-laneB` (shares the same `.git`).
- Scope: host shell changes AND the full release pipeline for both lanes.
- Release steps: merge `laneA/*` into `master` → run final DA + full checklist → run full Playwright gate → bump `#ver-stamp` (YY.MM.DD.NN) + SW cache name → commit → `git push origin master` (deploys) → append `HANDOFF.md §10` entry.
- **Single writer of `master`.** Single gate before deploy.

`laneA/*` branches are visible in Lane B's worktree without pushing (shared `.git`).

## 7. postMessage Seam + Data-Model Invariants

### Message shapes (change both sides in lockstep)

| Direction | Shape | Purpose |
|-----------|-------|---------|
| host → ARM | `{type:'bat-group', group:'arm'|'drills'|'body'}` | show group |
| ARM → host | `{type:'bat-counts', arm, drills, body}` | activity counts |
| host → iframe | `{type:'bat-nav', tab}` | iframe calls `switchTab(tab)` |
| host → iframe | `{type:'bat-poll'}` | ARM: `postCounts()`; FUEL: `refreshProgress()` |
| FUEL → host | `{type:'bat-fuel', water, protein, tWater, tProtein, day}` | today totals |

### Data-model invariants
- localStorage key prefixes: `fuel-` (FUEL) and `arm-care-` (ARM). **Do not rename** — renames orphan existing user data.
- Keys are also mirrored as `battery::<profileId>::<key>`.
- Migrations must be one-time idempotent guards.

## 8. Coordination Pointers

| File | Purpose |
|------|---------|
| `LANE.md` | Live board — current lane status, READY signals, blockers |
| `HANDOFF.md` | Durable release log (§10 entries); **gitignored** — internal only |
| `.claude/agents/` | Sub-agent definitions for this project |
| `.claude/commands/` | Custom slash commands |
