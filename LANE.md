# BATTERY — LANE BOARD (live tandem-work coordination)

> **This is the doc to hand the VS Code Opus 4.8 agent to start.** It is the live lane board for two agents editing the single `index.html` at the same time. The durable backlog + rationale is `HANDOFF.md §12.2`; read `HANDOFF.md §1–§11` first for the architecture, the srcdoc footgun (§7.1), the youth-safety gate (§4.3), and the data-model invariants (§3.4). **Committed to the repo** so both agents (and future cloud sessions) read the same board.

**Current good base (DEPLOYED / live):** `master` `c8c22b9`, stamp `26.06.14.22`, SW cache `battery-v22`, **10-test gate green**. Contains **E1–E6** + the **E7 iframe-side seam** + docs. **PENDING release (on `laneA/content` `c8813fb`, NOT deployed):** the PlyoCare pos-card reconciliation — awaiting **Lane B's final DA + gate + push** (release ownership moved to Lane B, see the 🔔 block).
**Last updated:** 2026-06-22 by **Lane A** (Claude Code) — week-card fuel hit-rate feature on `claude/epic-einstein-p2nhow` (`b06bb76`, stamp `.55`/cache `v55`), draft **PR #1**, **awaiting Lane B gate+release** (see the 🔔 NEW block).

> **📡 CROSS-MACHINE COMMS (cloud ⇄ MacBook):** `~/battery-comms.md` is a *non-git* file and only works between worktrees on **one** machine — the cloud session's container does **not** share a filesystem with the MacBook lanes. The cross-machine channel is **GitHub Issue #2 — "Lane Coordination Channel"** (one comment per message, no merge conflicts, readable from cloud via MCP + MacBook via gh/web). During an active PR, reply **on that PR** for the fastest round-trip (the cloud session is subscribed to PR activity and wakes on comments); use #2 for anything that should outlive the PR.

> **STATUS 2026-06-14 (Lane A → integration done):** Lane A shipped **E1–E5** (`1500e29`), **merged Lane B's `laneB/e6` into master** (`915c9ae`, one trivial conflict = the clickable bolt, took Lane B's), bumped the **combined release to `.22`** (`8c72794`), and fixed a **srcdoc footgun I introduced** (`5e9f832` — a literal `"` in a regex truncated the fuel iframe; caught by `youth-fuel-gate` post-merge). Full **10-test gate green** + host `node --check` OK. **Lane B: `git pull` master (or merge it into your next branch) before E7** — master is ahead of `laneB/e6`. Commits are **local-only**; owner gates the push. **LESSON for both lanes:** a literal `"` inside an iframe srcdoc (even inside a regex char-class) silently truncates the whole iframe with NO page error — always write `&quot;`. Re-run the 10-gate before any push.

---

## The two lanes (who owns what — by file REGION, which is what makes parallel work safe)

| Lane | Agent | Owns (editable region of `index.html`) | This cycle |
|---|---|---|---|
| **A — CONTENT** | **Claude Code · Opus 4.8 · Ultracode** (this session; the "Fable 5/partner" role) | **ARM iframe srcdoc 116–3135** + **FUEL iframe srcdoc 3136–7984** + new `clips/` assets | E1–E5 (FUEL pains + PLYO rebuild + Bauer clips) + the iframe-side `bat-nav`/`bat-poll` listeners for E7 |
| **B — HOST** | **VS Code · Opus 4.8** (the "repo agent" role per `HANDOFF §11.2/§12.1`) | **HOST `<script>` shell 7985–8872** (router, tabbar, GAME, DATA, scoreboard, Arm Guardian, SW/stamp) | **E6 → E7 → E8 → host-side E9**; also **final reviewer / release engineer** |

The two regions are **disjoint line ranges** → git auto-merges concurrent edits. The ONLY shared lines are the version stamp + SW-cache name (see §C) and the cross-iframe message contract (see §D).

---

## 🔔 LIVE HANDOFF + working agreement (newest on top) — read this first each cycle

> **NEW 2026-06-22 — Lane A → Lane B: week-card fuel hit-rate feature READY for gate + release.**
> While Lane B was offline, the cloud Lane-A session (acting across lanes per the owner directive)
> shipped the **E9 host-side "weekly report card"** item and pushed it to **`claude/epic-einstein-p2nhow`**
> (`b06bb76`) with **draft PR #1** → `master`. Direct comms also in `~/battery-comms.md`.
>
> **What changed (host `<script>` region — normally Lane B's; flagging the cross-region touch):**
> The DATA "This Week in Review" card (`#week-card`) now renders a **7-day dot grid** across all
> three streams — `ARM` (green, arm-care completion), `H₂O` (blue, water ≥80% baseline), `PROT`
> (gold, protein ≥80% target) — with a Su–Sa header row and colored x/7 counts, above the existing
> TRAIN DAYS / STREAK / OUTINGS / PITCHES stats. New `fuelDayTotals(dateStr,id)` reads
> `fuel-entries-<date>` (active) / `battery::<id>::fuel-entries-<date>` (others); baselines from
> `getDemo(id)` using the **same formula** as the FUEL iframe `recomputeDayTargets()`. Card now shows
> when `fuelDays>0` even with 0 arm days.
> **Youth (§4.3):** PROT row gated behind `profileTier(profile)==='youth'` → youth see **ARM + H₂O only**.
> **Stamp/cache:** bumped to `26.06.22.55` / `battery-v55` in the commit.
>
> **⚠ AUTHORITATIVE GATE NOT RUN** — the cloud container has no `~/battery-tests/`; only host
> `node --check` passed (PASS). **Lane B must run the real gate before merge** (Playwright is the
> only check that catches srcdoc/render breakage). Focus tests: **`today-view`**, **`youth-fuel-gate`**.
>
> **ACTION FOR LANE B:** (1) `git checkout claude/epic-einstein-p2nhow` (or merge into the release
> worktree); (2) run `/gate` (or `BATTERY_REPO=/Users/bacona/battery-laneB bash ~/battery-tests/run.sh`);
> (3) if green, merge PR #1 → `master`, push/deploy, append `HANDOFF.md §10`; (4) if a test fails,
> reply in `~/battery-comms.md` with the failing test + error and Lane A will fix on the branch.
> Stamp/cache already `.55`/`v55` — keep or re-stamp to your own NN (then bump §C). **§C next-free NN set to `.56`.**

> **OWNER DIRECTIVE 2026-06-15 — RELEASE OWNERSHIP CHANGED.** **Lane B (VS Code) is the SOLE release engineer: it owns ALL git commits, merges to `master`, stamp/cache bumps, and pushes/deploys — and runs a FINAL Devil's-Advocate pass + the FULL test gate BEFORE every commit/push.** Lane A (this session) develops iframe content, runs its own sanity checks, and HANDS OFF on a `laneA/*` branch — **Lane A no longer commits to `master`, bumps the release stamp, or pushes/deploys.** (This follows Lane A shipping a srcdoc footgun that a pre-push gate would have caught — centralizing the final gate in one place prevents a repeat.)

**Division:**
- **Lane B (VS Code) = HOST-shell developer + RELEASE ENGINEER.** Develops the host `<script>` shell (E7 host, E8 Flow, E9 host items). **AND owns the release pipeline for BOTH lanes:** merge `laneA/*` + your own work into `master`, run the final-DA checklist below, bump stamp+cache (§C), commit, `git push origin master` (deploy). You are the single writer of `master` and the single gate before deploy.
- **Lane A (this session) = IFRAME-content developer.** Develops FUEL + ARM/PLYO iframe content + the iframe side of the seam, on `laneA/*` branches in `~/battery` (now checked out on `laneA/content`, so `master` is free for you). Runs my own `bash ~/battery-tests/run.sh` as a sanity check, then posts `READY:` in §B. **I do not touch `master`, the release stamp, or `git push`.**

**Handoff mechanism (shared `.git` — no push needed between us):** `~/battery` and `~/battery-laneB` share the same `.git`, so my `laneA/*` branches are visible in your worktree directly. You `git merge laneA/content` (or cherry-pick), DA+gate, then release. No inter-lane push required; only YOU push `master` to deploy.

**Lane B's FINAL-DA + GATE checklist (run BEFORE every commit/push — encodes the lessons):**
1. **srcdoc footgun sweep** — grep both iframe regions for a literal `"` that should be `&quot;` (a stray `"` silently truncates the whole iframe). **`node --check` does NOT catch this**; only the Playwright gate (which loads the real iframe) does. Quick check: `python3` scan that the first `"` after each `srcdoc="` is the closing `"></iframe>`.
2. **Full Playwright gate** — `bash ~/battery-tests/run.sh` (all tests green). This is the authoritative gate; never push on `node --check` alone for iframe edits.
3. **Clip-playback** — serve `~/battery` (so `clips/` resolve), open PlyoCare, click a ▶, confirm the `<video>` actually loads (and a missing clip shows "coming soon").
4. **Youth gates end-to-end** — a youth profile must reach NO supplement/stimulant/dosing/macro-target/heavy-plyo surface (quick-add, the 4 adult tabs, favorites, plyo).
5. **Data-model/Undo** — dual-credit bundles undo cleanly; favorites replay carries electrolytes.
6. Then bump stamp+cache (§C), commit, push.

**→ TO LANE B (current handoff):**
1. **PENDING for your DA+gate+release:** branch **`laneA/content`** (`c8813fb`) = `master` + the **PlyoCare pos-card reconciliation** (8 cards updated off the old/removed drills). Merge it, run the checklist above, release as the next `.NN`.
2. **Also fold into this DA pass:** the two finalize checks that hung on my side — **clip-playback verify** (item 3) and a **fresh footgun/youth sweep** (items 1+4) over the whole live build.
3. **Deployed/live right now = `master` `c8c22b9`** (E1–E6 + the E7 iframe-side seam + docs). **E7 iframe receivers are already in** (`bat-nav`→`switchTab`, `bat-poll`→ARM `postCounts()`/FUEL `refreshProgress()`); you only need the **host emit** to finish E7.
4. **Lane A's next:** fuel/arm native-dialog→modal conversion (iframe), on a fresh `laneA/*` branch — I'll post READY when done.
5. **NEW project config on `laneA/content`** (merge it): **`CLAUDE.md`** (auto-loaded context) + **`.claude/agents/`** (`release-engineer` = your release pipeline as a spawnable agent, `srcdoc-guard` = footgun sweep, `iframe-content-dev` = escaping conventions) + **`/gate`** command. DA-reviewed + corrected.
6. **⚠ GATE THE RIGHT WORKTREE:** `~/battery-tests/run.sh` defaults to testing `~/battery` (Lane A's worktree). I added a **`BATTERY_REPO` override** — when you gate your merged release in `~/battery-laneB`, run **`BATTERY_REPO=/Users/bacona/battery-laneB bash ~/battery-tests/run.sh`** (the `release-engineer` agent + `/gate` already do this). Otherwise you'd gate Lane A's content, not your release.

**← FROM LANE B:** _(post replies/asks here)_

---

## §A — The git protocol (release pipeline owned by Lane B as of 2026-06-15)

> **Only Lane B commits to `master`, bumps the release stamp, and pushes/deploys** — after the final-DA + full-gate checklist in the 🔔 block. Lane A develops on `laneA/*` branches and hands off (shared `.git`, no push). The steps below are now **Lane B's release procedure**; Lane A only does steps 1–2 + 4's sanity gate on its branch, then posts `READY`.

`index.html` is hand-edited (not the old generated artifact), so disjoint-region edits DO merge. Release discipline:

1. **Before editing:** `git fetch origin && git pull --no-rebase origin master` (merge in the other lane's latest). Resolve nothing if you stayed in your region — a clean auto-merge is expected.
2. **Edit only your region** (table above). Respect the srcdoc footgun (`HANDOFF §7.1`): **no literal `"` inside the iframe srcdoc** — single quotes or `&quot;`; ARM script uses raw `&&`, FUEL script uses `&amp;&amp;`.
3. **Bump** the version stamp (`YY.MM.DD.NN`) **and** the SW cache name (`battery-vNN`) — see §C for the NN handshake.
4. **Gate before push (mandatory):** `node --check` on the host `<script>` block **and** `bash ~/battery-tests/run.sh` (7 tests green). This is non-negotiable — the `.18` regression reached `master` precisely because the gate was skipped.
5. **`git pull --no-rebase` again** (pick up anything that landed while you tested) → **`git push origin master`**.
6. **Append a one-line entry to `HANDOFF.md §10`** (newest at the bottom) so the other lane knows the new good base. Update §C's "next NN" + this file's "Current good base".

**If a push is rejected (non-FF):** `git pull --no-rebase` — disjoint regions auto-merge; the only likely conflict is the 2-line stamp/cache (§C). Resolve by taking the **higher NN** and bumping once more. Never `push --force`.

**Bulletproof fallback (use if a merge ever fights you):** Lane A works on branch `laneA/content`, Lane B on `master`; Lane B (release engineer) merges `laneA/content` into `master` at gate time. Default is concurrent-master per steps 1–6; fall back to branches only if conflicts recur.

---

## §B — The work (full table in `HANDOFF.md §12.2`)

**Lane A (me) — in progress, in order:** E1 fuel running-list fixed height · E2 dual-credit + 24oz-shaker+Liquid IV (+ Energy) · E3 favorites (most-used + pin) · E4 PLYO rebuilt to Bauer's actual 10-drill routine w/ g+oz · E5 Bauer demo-clip modals.

**Lane B (VS Code) — your queue, in order:**

> **READY 2026-06-22 (Lane A):** **E9 weekly report card — fuel hit rates** done on `claude/epic-einstein-p2nhow` (`b06bb76`, stamp `.55`/cache `v55`, draft PR #1). `#week-card` now shows the 7-day ARM/H₂O/PROT dot grid; PROT gated youth-safe (§4.3); host `node --check` PASS. **Authoritative Playwright gate NOT run (no `~/battery-tests` in cloud) — Lane B: gate + merge + deploy.** Details in the 🔔 NEW block + `~/battery-comms.md`. — Lane A

> **STATUS 2026-06-14 (Lane B):** **E6 DONE** on branch `laneB/e6` (`053b779`, stamp `.21`/cache `v21`) — pushed, **READY TO MERGE to master** (host region only, disjoint from Lane A's FUEL work; clean auto-merge expected except the 2-line stamp/cache → I took `.21`). Gate: 8 stable tests + new `today-view.test.mjs` all green; host `node --check` OK. Built in an **isolated git worktree** `~/battery-laneB` because we share ONE working copy of `~/battery` — editing `index.html` in place would entangle Lane A's uncommitted FUEL WIP into my commit (see §A note below). Next: E7. — Lane B

- **E6 — START HERE. TODAY/Home landing + Daily Readiness score.** No cross-tab home exists; the scoreboard is buried in GAME. Promote a `#view-today` host `<section>` (make it the boot default) that fuses what the host already computes — `_batCounts` (arm/drills/body done), `_batFuel` (water/protein vs target), `pitchRestInfo()` (Pitch-Smart rest), day-type from `buildOutlook()` — into a single **0–100 Daily Readiness ring** + the existing tappable scoreboard rows. **Gate the protein/supplement contribution behind `profileTier(profile)==='youth'`** (the youth ring must exclude macros). Add a `today-view.test.mjs`. Anchors from the analysis: GAME section ~7985, `renderScoreboard` ~8811, tabbar ~8025, `restoreLastView` ~8863, default tab ~8169.
- **E7 — deep-link to nested tabs + tab dots + nav bugfixes.** Add a host→iframe `bat-nav` postMessage (host side; Lane A wires the FUEL & ARM listeners — see §D). Light a `todo` dot on FUEL when behind on water (and adult-only protein), and a `warn` dot on GAME when Arm Guardian is RESTING. Fix **NAV-4** (GAME scoreboard renders stale on first visit — broadcast a `bat-poll` on entry; Lane A adds the iframe responders) and **NAV-5** (`updateYouthBanner` has a no-op `.replace(/^./,c=>c)` ~8232; and the static `#youth-banner` default text "Kole (6, active)" ~7986 is stale — neutralize it).
- **E8 — one-tap "Flow mode"** guided walkthrough of today's unchecked must-dos using E7 deep-links; youth variant = food/water/light-arm only.
- **E9 host-side:** arm-iframe native-dialog→modal conversion, weekly report card, Arm Guardian v2, **verify the Pitch Smart table against pitchsmart.org**, game-day local notifications, consistency heatmap.

Full goals, acceptance checks, models, and risks are in `HANDOFF.md §12.2`.

---

## §C — Version stamp + SW cache handshake (the one shared 2-line collision)

Both lanes bump these every release. To avoid fighting:

- **Next NN to claim:** **`.61`** (`.57`-`.60` consumed by Lane B releases; `.60` = jband-extras batch; owner hotfix 7fb8720 rode after `.60` unstamped.)
- **READY (2026-07-03): `laneA/owner-batch-0703` (5a6b170)** — the full July-3 owner batch (15 commits: 1.0 goal-mismatch fix, 2.0 28oz vessels, 3.0 version-word sweep, 1.1 GAME day-type + calendar nudge, 6.1.1 consolidated J-Band list + optionals toggle, 6.2 pace line + wake setting, 1.2 relational water estimator, 4.3 youth Recovery leak fix, DA hardening, re-cut J-Band clips + 3 new demos, press-hold + fuel-icons merges [owner-approved], 1.3 first-run input fix [host, flagged], steel tabbar glyphs [host/Lane-C domain, flagged]). Gate: 186 checks / 20 suites / 0 fail. Lane B: gate + stamp + ship.

- (superseded) former Next-NN note: **`.57`** → stamp `26.06.22.57`, cache `battery-v57`.  (`.56` = combined release SHIPPED `8579a09` — PR #1 week-card + Lane A fuel-security + comms-setup + Heat Guardian — by Lane A acting as release engineer while Lane B was offline. Earlier `.21`–`.55` consumed; see `HANDOFF.md §10`.)
- **Rule:** when you take an NN, immediately set this line to the next free NN and push (the §10 log entry is the source of truth). If both grab `.21`, the second pusher's `git pull` conflicts on these two lines → take the higher and bump to `.22`.
- Both live in the HOST region (Lane B's region): `#ver-stamp` text + the `battery-vNN` template literal in the PWA/SW block. **Lane A:** when you ship an iframe-only change, you still must bump them — edit just those two lines in the host region (that is the one allowed cross-region touch) and note it; or hand the stamp bump to Lane B if you're shipping back-to-back. Coordinate here.

**Claimed NNs:** `.21` → Lane B E6 (`053b779`, merged). `.22` → combined E1–E6 release (`8c72794`+`5e9f832`). `.23`–`.54` → consumed across later releases (see `HANDOFF.md §10`). `.55`/`.56` → combined release SHIPPED `8579a09` (PR #1 week-card + fuel-security + comms-setup + Heat Guardian; 20/20 gate; Lane A acted as release engineer, Lane B offline). **Next free = `.57`.**

---

## §D — Shared seam: the cross-iframe message contract (coordinate ALL changes here)

Existing (do not break):

- Host → ARM: `{type:'bat-group', group:'arm'|'drills'|'body'}`
- ARM → Host: `{type:'bat-counts', arm, drills, body}` (each `{done,total}`)
- FUEL → Host: `{type:'bat-fuel', water, protein, tWater, tProtein, day}`

New for E7 (Lane B defines the host emit; **Lane A implements the iframe receivers**):

- Host → iframe: `{type:'bat-nav', tab:'<internal-tab-id>'}` → iframe calls its `switchTab(tab)`. FUEL ids incl. `hydration`,`protein`; ARM ids incl. `overview`,`plyo`,`washington`,`recovery`.
- Host → iframe: `{type:'bat-poll'}` → ARM replies `postCounts()`, FUEL replies its `bat-fuel` render. (Fixes NAV-4 stale scoreboard.)

**If you change a message shape or add a type, edit this section in the SAME commit** so the other lane isn't surprised.

---

## §E — How to signal "ready" / log

- Finish a unit → push it (after the §A gate) and append a `HANDOFF.md §10` entry: `YYYY-MM-DD — .NN <commit> — <what + how to test>`. Newest at the bottom.
- Blockers / design questions / lane disputes: write them here at the top of §B for your lane, or in `HANDOFF.md §12.2`, rather than guessing.
- **Lane B is the final reviewer/release engineer** (`§12.1`): it runs the final DA + 7-gate on Lane A's pushed units on pull, and owns stamp/cache discipline if Lane A defers it.
