# LANE.md — durable lane board

> ⚠️ **This file is committed and is what OUTSIDE readers (new lanes, cloud sessions, design/review
> tools) see first.** Day-to-day status lives in the non-git `~/battery-comms.md`; anything that
> should outlive a session belongs HERE. Refresh it at release time — a stale board actively
> misinforms. (It once advertised `.61` and a "10-test gate" while master was at `.82`/22 suites,
> and an external design review repeated both.)

## Current state (2026-08-18, refreshed — was stale since `.83`; caught mid-batch, see §8 note)

- **Live / deployed:** `master` = stamp **`26.08.18.88`**, SW cache **`battery-v88`**, full gate
  **21 suites green, 256+ checks**. See `HANDOFF.md §10` for the full release log.
- **Next NN:** derived by Lane E from `HANDOFF.md §10` at release time. **Deliberately not written
  here** — a hardcoded NN silently rots (this file advertised `.61` for ~20 releases).
- **Active lanes:** **A** (`~/battery-laneA`, FUEL+ARM iframe content, spec/coordination, browser
  verification) · **E** (`~/battery-laneE`, host shell + **sole release engineer**) · **D** (cloud,
  `claude/*` branches + PRs). **Lane identity binds to the WORKTREE, not the app/session label.**
- **Retired:** **B** (was VS Code; quota consumed by day job — worktree deleted) and **C** (glyph
  art, owner directive). Do not resurrect either; glyph work, if unparked, goes to cloud Lane D.
- **Design review item 1 — COMPLETE, both halves.** HOME (`syncFuelDayFromPlan()`) is the single
  source of truth for the activity-level day type (all 5 types + a host boot/reload-time emit so a
  derived day never shows stale on first paint); FUEL's chips are locked read-only with a "set on
  HOME ›" affordance, TRAVEL still settable as the one modifier HOME can't originate. The whole
  two-controls reconciliation layer (nudge, untouched-day special case, mute key) is deleted.
- **Item 2 (HOME above-the-fold reset) — shipped.** Greeting + always-visible section menu gone,
  ring 172px→64px, Flow button relabeled/moved to the top, `ALL SECTIONS ›` escape hatch per §9.
- **Item 3 (⋯ twin + ranked bar + undo toast) — shipped.** Visible ⋯ opens the pin/edit/move sheet;
  one-tap ranked-bar logging gets an undo toast (diffs ledger before/after, handles multi-row
  shake+elec taps); auto-ranking freezes per day-part (§9 MUST-FIX — a live-reordering bar fights
  the muscle memory it's meant to speed up).
- **Item 4 (bundles) — shipped.** `addItem()` was already the generic multi-delta logger, so a
  bundle is just `{name,water,protein,elec}` replayed through it — nothing new mutates the ledger,
  so undo/dual-credit/display all keep working unmodified. Two defaults + "+ bundle last 2" (builds
  a bundle from what was actually logged, refuses below 2 rows rather than inventing one).
  Deliberately did NOT build an automatic capture prompt — §9 held one-tap-plus-toast as a risk
  pending real use; explicit-tap capture gives the same capability without guessing intent.
- **Owner finding 2.0 — shipped.** "Last hard throw" was a manual relative string (`today`/
  `yesterday`/`2plus`) that never aged and existed twice across the seam (FUEL segmented control +
  host DATA `<select>`). Now derived from the dated `arm-care-pitchlog` (`lastThrowState()`),
  read-only in FUEL with a "Log an outing ›" link back to the host; the dead host `<select>` (the
  last remaining writer, confirmed unread) was deleted the same release.
- **Pitching-mechanics clips — merged.** `clips/bauer-pitch-hipfire.mp4` + `bauer-pitch-gloveside.mp4`.
  Owner reviewed and approved the copyright question directly (re-host as committed, no re-source
  requirement). **Nav placement is still open** — no pitching surface exists yet in the app; not a
  merge blocker, just undecided when the clips actually get wired up.
- **Queued next:** items 5 (youth: "Kole today" card, pips, arm-feel faces, green accent) and 6
  (FUEL tabs 10→4, deliberately last — §9 flags it as the highest youth-gate blast radius despite
  being the smallest change). Owner said not to wait out the full observation week. C.1
  (recovery-day-after-LIFT) is Lane D's, a clean sibling of US-2.7 in code D already owns. Icon
  swap (emoji→metal) stays parked off a parallel branch or after item 5 — must not ship inside an
  active IA-change observation window per the review's own measurement-confound warning.
- **Docs:** `DESIGN-REVIEW.md` (external review, read-only input, no-write boundary — see §8) +
  `DESIGN-BRIEF.md` (read-first brief for the next design pass) + `DESIGN-CHANNEL.md`.

---

## Historical log (below this line may be stale — treat the block above as authoritative)

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

---

## FUEL-stack revision backlog — owner, 2026-08-31 (QUEUED, no approach approved yet)

Reached Lane A via the Dispatch session (`bacona-d5`) rather than through comms, so
it existed only in a chat transcript. **Written down here on arrival** — a backlog
that lives in a transcript is a backlog that dies. Every anchor below was
re-verified against current `master` by Lane A, not taken on relay.

**⚠ NOTHING HERE IS APPROVED.** The owner has not signed off an implementation
approach on any of these. Do not start building from this list; it is a record,
not a work order.

| # | Item | Verified state |
|---|---|---|
| 1 | **Tap a day / dropdown to load that date into the live FUEL tracker for editing** | `loadEntries()` (10403) and `saveEntries()` (10407) are hardcoded to `todayKey()` with no date parameter. **28 call sites** (18 load / 10 save). `getTotalsForDate()` already reads any date, so per-date *storage* exists — what is missing is a selected-date concept in the live tracker. |
| 2 | **Demote "This Week in Review"** from a passive dot-grid into that same editable-history / day-picker surface | depends entirely on #1 |
| 3 | **Protein-banking SURPLUS direction lacks grounding** | `bankAdj()` negative clamp at **10136**. Shortfall-carries-forward has cumulative-intake support; a literal *surplus* giveback does not, and may fight `recoveryBoost()`'s floor. **This is my own Batch 8 design and the concern is fair** — I built the symmetric case because it was tidy, not because evidence asked for it. |
| 4 | **Rest vs. recovery day** | `recoveryBoost()` (**9913**) already floors protein after hard training, but it is **invisible** under the plain "Rest" label; `fuel-recovery-<date>` is a separate inert tag that never touches targets. Two mechanisms, one of them silent. |
| 5 | **Free-form / custom lifting-log entry + editable per-date lift history** | Lifting has **no** equivalent to FUEL's `fuel-items-custom` (grep: 2 refs for fuel, **0** for lifting). Should share ONE selected-date mechanism with #1 rather than being built twice. |
| 6 | **Heavy vs Train** | `syncFuelDayFromPlan()` (**15403**): Heavy is driven *entirely* by yesterday's throwing load. **Lifting today maps to `train`** — identical to a full arm+drills+body day with no lifting at all. Owner says that does not match his mental model; wants a design call. |

**⚠ TRANSCRIPTION TO CONFIRM WITH THE OWNER BEFORE ANY SCOPING:** one phrase came
through as *"heavy… and the lake"* and is believed to be *"and the like"*. **Only
the owner can confirm what he said** — nobody should infer scope from a guess at
a misheard word.

**Sequencing note from Lane A:** items 1, 2 and 5 are one feature, not three. All
three need a single `selectedDate` concept threaded through the FUEL tracker;
building them separately means doing that plumbing three times and getting three
subtly different answers. Items 3, 4 and 6 are independent design questions and
can be decided in any order.

### FUEL/ARM history + day-selection — sharpened 2026-08-31

Relayed by **DISPATCH** (owner-driven), originally posted to `battery-comms.md`
because tracked-file writes are outside the DISPATCH scope and Lane A was
unreachable. Folded in here with attribution, per that boundary working as
designed. **Sharpening of items 1/2/5 above, not a new ask. Still QUEUED / NOT
APPROVED.**

**Every claim below re-verified by Lane A against `master`, not taken on relay.**

**FINDING 1 — the scope widens to ARM, and ARM is AHEAD of FUEL.** ✅ verified.
`saveDone()` (**5916**) does `document.querySelectorAll('.step.done')` across the
*whole* ARM iframe with **no per-tab scoping**, writing one key. So Warm Up,
J-Bands, Tube, PlyoCare, Long Toss, Washington, **Lifting**, Body and Recovery are
already per-date under one format. `collectArmHistory()` (**6117**) scans **every**
`arm-care-done-*` key in localStorage — unbounded, not a trailing week — so ARM's
read-only history is already *more* complete than FUEL's 7-day card. The
"everything else" half of the ask is therefore a **promotion of an existing
surface** (read-only → tap-to-load-and-edit), not a new build.

**FINDING 2 — the acceptance bar, in the owner's own terms.** ✅ recorded as such.
The value is **reusing the existing quick-add / favourite / bundle / checkbox
affordances against a selected past date**. A date-picker that only *views* a day
and makes him retype has missed the requirement. Concretely: `addWater()`,
`addEntry()`, bundle-tap and custom-item-tap on the FUEL side, and `toggleDone()`
on the ARM side, must all resolve against `selectedDate` — not merely the display
and target math around them.

**Do the three open design calls block this?** No. ✅ verified — `fuel-goalsnap-<date>`
(**11097**) freezes a day's computed target at log time, so later changes to the
banking formula or the heavy/train mapping cannot retroactively move what a past
day reads as hit/miss. Storage-and-routing plumbing underneath; independent of
those three.

**⚠ LANE A ADDITION — A TRAP NEITHER ENTRY FLAGGED. The two iframes use
INCOMPATIBLE date-key formats.**

| | Builder | Produces |
|---|---|---|
| ARM | `getTodayKey()` **5876** — `${m+1}-${d}`, **no padding** | `arm-care-done-2026-8-31` |
| FUEL | `todayKey()` — `padStart(2,'0')` | `2026-08-31` |

A single shared `selectedDate` string **cannot** be handed to both sides. Worse,
the failure is seasonal: it only diverges for single-digit months or days, so an
implementation tested in, say, mid-October passes and then silently reads the
wrong key every day from November 1st to the 9th. This is **already known and
worked around once** — the sticker cross-store reader carries an explicit
"NON-padded to match the host's key builder" comment — which proves it is a live
hazard rather than a theoretical one.

**Implication for whoever builds this:** `selectedDate` must be a DATE VALUE with
a per-side key builder, never a pre-formatted string passed across the seam. Pick
that shape first; it is the difference between one plumbing job and a bug that
surfaces months later.
