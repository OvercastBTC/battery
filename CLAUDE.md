# BATTERY — Claude Code Context

## 0. Base Agent Instructions — READ FIRST

@.claude/BASE-INSTRUCTIONS.md

Honesty, operator mindset, context right-sizing, agent/model-tier routing, conversion
skills, and request-budget discipline. Applies to every lane and every subagent.
Project rules in §1–§8 below layer on top; where they conflict, the project rule wins.

## 1. What BATTERY Is

Single-file installable PWA: `index.html` (~12 700 lines, hand-edited, no bundler).
Deployed via GitHub Pages from branch `master`: **<https://overcastbtc.github.io/battery/>**
Baseball arm-care + nutrition/hydration tracker (profiles: adult / youth).

## 2. Architecture

One host HTML shell containing **two srcdoc iframes** (NOT `src=`), sharing the parent origin + localStorage.

| iframe | id | title | line range (verify by reading — shift as file grows) |
|--------|-----|-------|------------------------------------------------------|
| ARM | `#f-arm` | Arm Care | first `srcdoc=` → first `"></iframe>` |
| FUEL | `#f-fuel` | Fuel Stack | second `srcdoc=` → second `"></iframe>` |
| Host `<script>` | — | shell logic | after the second `"></iframe>` → EOF |

ARM iframe covers arm-care drills, body, and PlyoCare content.
FUEL iframe covers nutrition/hydration tracker.
Host shell owns nav, profiles, scoreboard, postMessage routing, SW registration.

SW cache name: `battery-v<NN>` (bump on every deploy) — read the live value out of `index.html`, don't trust a number written here.
Version stamp: `#ver-stamp`, format `YY.MM.DD.NN` — read the live value out of `index.html`.

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
Runs the **full Playwright gate (24 suites as of .90)** against the current `index.html` — `run.sh` is the authoritative list, always trust it over this count if they ever disagree. Originals: `iframe-render`, `arm-history`, `persistence`, `export-scope`, `unified-export`, `import-roundtrip`, `profile-mgmt`, `youth-fuel-gate`, `today-view`, `e7-host`, `fuel-dual-credit`; added since: `icon-gauge`, `flow-mode`, `clip-playback`, `iframe-modal`, `demo-data`, `arm-guardian`, `consistency`, `week-report`, `icon-nudge`, `storage-warn`, `toast`, `fuel-bundles`, `recovery-boost`.

`node --check` on the host `<script>` block is a useful quick check, but **it does not catch srcdoc breakage** (HTML encoding masks truncation from the parser). The Playwright gate is authoritative for all iframe edits.

Run order: `node --check` first (fast), then `~/battery-tests/run.sh` (definitive).

### Multi-lane gating — run from an ISOLATED copy

`~/battery-tests/` is SHARED across local lanes (A and E) and `run.sh` stages the build to `app-fixed.html` **in its own dir**, so two lanes gating at once clobber each other's staged file (and browser). Gate from a private copy:

```bash
rm -rf /tmp/bt-laneX && mkdir /tmp/bt-laneX
cp ~/battery-tests/*.mjs ~/battery-tests/run.sh ~/battery-tests/package.json /tmp/bt-laneX/
ln -sfn ~/battery-tests/node_modules /tmp/bt-laneX/node_modules
cd /tmp/bt-laneX && BATTERY_REPO="$HOME/battery-laneX" bash run.sh
```

`run.sh` derives its dir from `$0`, so staging into that private copy can't be clobbered (`app-buggy` still builds via `git -C $BATTERY_REPO show df9b1b7`). Verify the staged stamp before/after to detect a clobber. **Never** `pkill -9 chrome-headless-shell` globally — it kills every lane's browser; scope any cleanup to your own run. And **never push a shared-`~/battery-tests` test edit that references an unshipped feature** — it reds clean `master` for all lanes; keep it in your isolated copy until the impl is on `master` (or land test + impl together), and flag ahead-of-master test edits in comms.

## 6. Lane Roles / Release Protocol

### Lane A — Claude Code session (iframe content developer)

- Worktree: `/Users/bacona/battery-laneA`, on a `laneA/*` branch. (`~/battery` is the main worktree, kept **detached at master** so `run.sh`'s `${BATTERY_REPO:-$HOME/battery}` default can't gate a stale build — do not develop there.)
- Scope: FUEL + ARM/PlyoCare iframe content; iframe side of the postMessage seam.
- Runs `~/battery-tests/run.sh` as a sanity check.
- Posts `READY` in `LANE.md §B` when done.
- **Does NOT** commit to `master`, bump the release stamp, push, or deploy.

### Lane E — Claude Code Desktop session (host shell + sole release engineer)

- Worktree: `/Users/bacona/battery-laneE` (shares the same `.git`). **Identity binds to the worktree, not the app or session label** — see `LANE-E-BRIEF.md` §0.
- Scope: host shell changes AND the full release pipeline for both lanes.
- Release steps: merge `laneA/*` into `master` → run final DA + full checklist → run full Playwright gate → bump `#ver-stamp` (YY.MM.DD.NN) + SW cache name → commit → push to `master` (deploys) → append `HANDOFF.md §10` entry.
- **Deploy remote:** `origin` = SSH (`git@github.com`). If `:22` is flaky (seen 6/26–7/3, intermittent — not a key issue), SSH is routed over GitHub's `ssh.github.com:443` in `~/.ssh/config` (host keys fingerprint-verified). Fallback: the `ghhttps` HTTPS remote (`https://github.com/OvercastBTC/battery.git`; large clip pushes need `git config http.postBuffer 524288000`). Both reach the same `master` — always FF-verify (`git merge-base --is-ancestor <remote>/master HEAD`) before pushing.
- **Single writer of `master`.** Single gate before deploy.

`laneA/*` branches are visible in Lane E's worktree without pushing (shared `.git`).

### Session Dispatch — NOT A LANE

The layer that routes requests between the owner and whichever Claude Code
sessions are active. Owner's name for it: **Session Dispatch** / `DISPATCH`.

**It is deliberately outside the A–E roster, and that is the point.** Every lane
letter answers one question — *who writes here and holds the claim* — and identity
binds to the **worktree**, never to an app or a session label. Dispatch owns no
worktree and no branch namespace, so a letter would make the letter mean two
incompatible things at once: a place in the code, or a role in the process. That
ambiguity is not hypothetical. It is precisely what produced the Lane B / Lane E
tangle, where a letter got attached to an application ("the VS Code lane") rather
than to a worktree, and it cost real effort to unpick. A router with a letter
would reintroduce that failure under a new name.

There is a safety reason too: a lane letter reads as a claim to write. Dispatch
working inside another lane's worktree is only safe **because** it holds no claim.
Two writers on one worktree with no ownership boundary is how work gets silently
clobbered — this project has already lost a gate result to a silent merge failure.

**Rules:**

1. Owns no worktree, claims no branch namespace, is never a merge target.
2. **Never commits and never pushes.** Anything durable goes through the owning lane.
3. When it must write inside a lane's worktree, it signs as the **origin of the
   request** — `[OWNER · …]` or `[DISPATCH · …]` — **never as the lane.**
4. **Anything it receives on a lane's behalf is written into that lane's durable
   channel immediately** — `battery-comms.md`, `LANE.md`, or Issue #2 — and never
   left in a chat transcript.

Rule 4 is the load-bearing one and it is written from a real incident: on
2026-08-31 six FUEL-stack revision items addressed to Lane A's scope existed only
in a transcript Lane A could not see. They were recovered only because the
Dispatch session flagged them unprompted. **A relay that forgets is worse than no
relay, because everyone assumes the message landed.** The relay's defining
obligation is durability, not routing.

## 7. postMessage Seam + Data-Model Invariants

### Message shapes (change both sides in lockstep)

| Direction | Shape | Purpose |
|-----------|-------|---------|
| host → ARM | `{type:'bat-group', group:'arm'|'drills'|'body'}` | show group |
| ARM → host | `{type:'bat-counts', arm, drills, body, lift}` | activity counts. `lift:{done,total,optDone,optTotal}` is additive (plan-v2) — Lifting-tab counts, zeroed for youth on the ARM side (§4.3). Host must tolerate the field being absent (old cached iframe). |
| host → iframe | `{type:'bat-nav', tab}` | iframe calls `switchTab(tab)` |
| host → iframe | `{type:'bat-poll'}` | ARM: `postCounts()`; FUEL: `refreshProgress()` |
| FUEL → host | `{type:'bat-fuel', water, protein, tWater, tProtein, day, runway}` | today totals. `runway:{state:'none'|'active'|'now', time?}` is additive — pre-training eat/drink window status, surfaced read-only on TODAY. |
| host → FUEL | `{type:'bat-plan', day}` | plan-v2: sent whenever TODAY's plan flags change. Mapping (host `syncFuelDayFromPlan()`): all streams off → `'rest'`; `lift` on → `'train'`; arm+drills+body all on → `'train'`; otherwise nothing is sent. FUEL's `handlePlanSync()` auto-applies `'rest'` only on an untouched day; any other value is a dismissible nudge — an athlete's manual day-type choice is never overwritten. |

### Data-model invariants

- localStorage key prefixes: `fuel-` (FUEL), `arm-care-` (ARM), `battery-plan-` (host, plan-v2 — per-date only, no carryover). **Do not rename** — renames orphan existing user data.
- Keys are also mirrored as `battery::<profileId>::<key>`.
- **Any NEW persisted key MUST start with one of those prefixes.** `liveKeys()` snapshots only prefixed keys, so a key named anything else looks perfect in testing and then **silently vanishes on the next profile switch** — data loss with no error and no failing test. Batch 9's `arm-care-feel-<date>` was named for this reason, not by accident.
- **Cross-seam value vocabularies are contracts. Write them down here; never infer them from the other side's UI copy.** Reader and writer live in different frames and ship from different lanes, so a wrong guess fails *silently* — the branch just never matches and the clause never renders. Nothing asserts a vocabulary unless a test does.

  | Key | Written by | Read by | Values |
  |---|---|---|---|
  | `arm-care-feel-<date>` | ARM iframe (`setArmFeel`) | host youth card; ARM History trend | `'3'` great · `'2'` ok · `'1'` sore — **numeric codes as strings**, not words |

  This table exists because Lane E's host card independently guessed a `good`/`okay`/`rough` word vocabulary for these exact three values. Both the type and the words were wrong, so `if(feel==='good')` could never match — no error, no test failure. Caught only by reading the shipped source after merge. **If you add a cross-seam key, add a row and a test asserting the real values.**
- Migrations must be one-time idempotent guards. Plan-v2 example: `battery-plan-<date>` used to store a single preset string (full/throwing/hitting/lift/rest); `getActivePlan()` migrates a legacy string value to the new `{arm,drills,body,lift}` JSON flag object the first time it's read, then rewrites it as JSON so migration only runs once per date key.

## 8. Coordination Pointers

| File | Purpose |
|------|---------|
**Lane roster** (3 active lanes as of 2026-08-16):

- **Lane A** — local MacBook, FUEL + ARM iframe content (`~/battery-laneA`).
- **Lane E** — local MacBook (Claude Code Desktop), host shell + **sole release engineer** (`~/battery-laneE`): merges to `master`, stamp + SW-cache bump, Playwright gate, deploy.
- **Lane B — RETIRED 2026-08-13.** Was the VS Code lane; that subscription is consumed by the owner's day job so its quota is permanently exhausted. Worktree deleted. Do not resurrect.
- **Lane C — RETIRED 2026-08-13** (owner directive). Was glyph/icon art. Worktree returned to detached `master`. If glyph work is unparked it goes to cloud Lane D — no new local art lane.
- **Lane D** — **cloud** Claude Code session (isolated container; works on `claude/*` branches + GitHub PRs; cannot see local files).

**Comms topology** — choose the channel by who must hear it:

| Channel | Reaches | Use |
|---------|---------|-----|
| `~/battery-comms.md` | Local lanes A/B/C only (shared FS; **non-git — never reaches the cloud**) | Fast local coordination, READY signals, watcher |
| **GitHub Issue #2** | **All lanes incl. cloud Lane D** (the repo is the only cross-machine medium) | Cross-machine handoffs. One comment per message; header `**[date] FROM <lane> → TO <lane> — <subj>** · STATUS: OPEN/ACK/DONE` |
| **PR comments** | Cloud Lane D **fast** (it subscribes to its own PR) | Wake Lane D immediately during an active handoff |
| `LANE.md` | All lanes via git (committed board) | Durable lane status / READY |
| `HANDOFF.md` | Local only (gitignored) | Release log (§10) |
| `.claude/agents/` · `.claude/commands/` | All lanes via git | Sub-agent defs · slash commands |

**Cross-machine rule:** Lane D shares ONLY the GitHub repo — `~/battery-comms.md` is invisible to it. Anything the cloud must see goes in **Issue #2** (or a PR comment) and the committed `CLAUDE.md`/`LANE.md`. Local lanes mirror cross-machine-relevant items between `~/battery-comms.md` ⇄ Issue #2.

**External review inputs (design/audit tools) are NOT lanes.** Tools like Claude Design are
advisory *inputs*, structurally like Lane D's user stories or a research pass — they produce
recommendations, not gated deliverables, so they get no worktree, no comms presence, and no
release slot.

**Hard boundary: an external tool may write `DESIGN-REVIEW.md` (or another doc) and MUST NOT
write `index.html` or push to `master`.** The reason is specific, not bureaucratic: these tools
cannot run the Playwright gate, and §3's srcdoc footgun is invisible without it — one literal `"`
silently blanks an entire iframe with no console error and a clean `node --check`. Single-writer-
of-master plus a green 22-suite gate is why that has never shipped. Do not add a writer that
cannot gate.

**Flow:** external findings land in a dated doc → Lane A triages them into `laneA/*` branches and
the `LANE.md` queue → Lane E gates and ships. Discount anything such a tool says about lanes,
process, or versions unless the docs it read were current (see the 2026-08-16 staleness incident
recorded in LANE.md).

**Watcher protocol — ARM WHEN BLOCKED, DISARM WHEN WORKING (owner directive 2026-08-14).**

Lane A is the **quarterback**: it assigns work, and lanes report completion back to it. A comms watcher is a *wake-up mechanism for an idle lane*, not a background habit — every fire costs a full turn, so it must be armed only when it can actually do something useful.

**The rule — a watcher is armed if and only if the lane is BLOCKED AND IDLE.**

| Lane state | Watcher | Why |
|---|---|---|
| **Blocked** — waiting on another lane's branch/PR/ruling, nothing else actionable | **ARM** | The watcher is the only thing that will wake you. Post `⏳ BLOCKED on <what> · watcher ARMED` first. |
| **Working** — you have an assigned task in hand | **DISARM** | You'll read the comms tail when you finish the unit anyway. Polling while busy is pure waste. |
| **Task complete** | **DISARM**, then post your report to Lane A | Completion report replaces the poll. |
| **Nothing assigned and nothing blocking** | **DISARM** and say so | Lane A hands out work; don't idle-poll waiting for it. |

**Arming rules (cost discipline):**
- **Interval ≥ 15 minutes.** Nothing here is an incident channel; lanes post a few times a day.
- **Baseline AFTER your own last write.** A watcher baselined before your own post fires on your own echo — historically ~half of all fires were self-inflicted, each burning a turn for zero information.
- **Auto-expire.** Cap the watch (e.g. ~24 cycles ≈ 6h). On expiry post `💤 watcher expired, going dormant — @LANE-A ping to wake` and stop. A watcher left armed for weeks is the worst case (silent, unbounded, useless).
- **Disarm the instant you pick up work** — not when you finish.

**Lane A's own watcher:** normally **DISARMED**. Lane A is driven by owner turns and reads the comms tail at the start of each one. It arms a watcher only when the owner goes AFK and explicitly asks for unattended work.

**Quarterback loop:** Lane A assigns → lane disarms and works → lane reports completion to Lane A → if the next step depends on someone else, the lane arms and posts `BLOCKED on <what>` → Lane A unblocks it → lane disarms and works. Lane A tells a lane to disarm when it hands it work; a lane arms itself when it becomes blocked.

**Usage-limit protocol (owner directive 2026-07-17):** a usage/quota limit is a pause, not a cancellation. Before stopping: record the reset time + interrupted work in comms (Issue #2 if cross-machine). Re-check after the reset and continue. Workflows resume with cached results — never redo finished work. Time-sensitive work gets reassigned to a lane with budget via Lane A. Capped lanes announce their return.
