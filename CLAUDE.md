# BATTERY — Claude Code Context

## 1. What BATTERY Is

Single-file installable PWA: `/Users/bacona/battery/index.html` (~9 400 lines, hand-edited, no bundler).
Deployed via GitHub Pages from branch `master`: **<https://overcastbtc.github.io/battery/>**
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
Runs the **full Playwright gate (21 tests as of .63)** against the current `index.html` — `run.sh` is the authoritative list. Originals: `iframe-render`, `arm-history`, `persistence`, `export-scope`, `unified-export`, `import-roundtrip`, `profile-mgmt`, `youth-fuel-gate`, `today-view`, `e7-host`, `fuel-dual-credit`; added since: `icon-gauge`, `flow-mode`, `clip-playback`, `iframe-modal`, `demo-data`, `arm-guardian`, `consistency`, `week-report`, `icon-nudge`, `storage-warn`.

`node --check` on the host `<script>` block is a useful quick check, but **it does not catch srcdoc breakage** (HTML encoding masks truncation from the parser). The Playwright gate is authoritative for all iframe edits.

Run order: `node --check` first (fast), then `~/battery-tests/run.sh` (definitive).

### Multi-lane gating — run from an ISOLATED copy

`~/battery-tests/` is SHARED across local lanes (A/B/C) and `run.sh` stages the build to `app-fixed.html` **in its own dir**, so two lanes gating at once clobber each other's staged file (and browser). Gate from a private copy:

```bash
rm -rf /tmp/bt-laneX && mkdir /tmp/bt-laneX
cp ~/battery-tests/*.mjs ~/battery-tests/run.sh ~/battery-tests/package.json /tmp/bt-laneX/
ln -sfn ~/battery-tests/node_modules /tmp/bt-laneX/node_modules
cd /tmp/bt-laneX && BATTERY_REPO="$HOME/battery-laneX" bash run.sh
```

`run.sh` derives its dir from `$0`, so staging into that private copy can't be clobbered (`app-buggy` still builds via `git -C $BATTERY_REPO show df9b1b7`). Verify the staged stamp before/after to detect a clobber. **Never** `pkill -9 chrome-headless-shell` globally — it kills every lane's browser; scope any cleanup to your own run. And **never push a shared-`~/battery-tests` test edit that references an unshipped feature** — it reds clean `master` for all lanes; keep it in your isolated copy until the impl is on `master` (or land test + impl together), and flag ahead-of-master test edits in comms.

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
- Release steps: merge `laneA/*` into `master` → run final DA + full checklist → run full Playwright gate → bump `#ver-stamp` (YY.MM.DD.NN) + SW cache name → commit → push to `master` (deploys) → append `HANDOFF.md §10` entry.
- **Deploy remote:** `origin` = SSH (`git@github.com`). If `:22` is flaky (seen 6/26–7/3, intermittent — not a key issue), SSH is routed over GitHub's `ssh.github.com:443` in `~/.ssh/config` (host keys fingerprint-verified). Fallback: the `ghhttps` HTTPS remote (`https://github.com/OvercastBTC/battery.git`; large clip pushes need `git config http.postBuffer 524288000`). Both reach the same `master` — always FF-verify (`git merge-base --is-ancestor <remote>/master HEAD`) before pushing.
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
**Lane roster** (4 lanes as of 2026-06-22):

- **Lane A** — local MacBook, FUEL + ARM iframe content (`~/battery-laneA`).
- **Lane B** — local MacBook, host shell + **sole release engineer** (`~/battery-laneB`): merges to `master`, stamp + SW-cache bump, Playwright gate, deploy.
- **Lane C** — local MacBook, host `#tabbar` glyph / icon QA (`~/battery`).
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

**Usage-limit protocol (owner directive 2026-07-17):** a usage/quota limit is a pause, not a cancellation. Before stopping: record the reset time + interrupted work in comms (Issue #2 if cross-machine). Re-check after the reset and continue. Workflows resume with cached results — never redo finished work. Time-sensitive work gets reassigned to a lane with budget via Lane A. Capped lanes announce their return.
