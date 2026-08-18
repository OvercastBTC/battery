# BATTERY — Design + Information-Architecture Review

**Reviewer:** Design (Omelette session) · **Requested by:** owner · **Date:** 2026-08-17
**Reviewed build:** `master` / live `https://overcastbtc.github.io/battery/` (`index.html`, single file)
**Pairs with:** `DESIGN-REVIEW-PROMPT.md` (prompt in, findings out)
**Status:** owner has **approved §1–§7**. §8 is the work order. §9 is the Devil's-Advocate pass — **two items in it change §1–§7 and must land with item 1.**

Scope respected: no rewrite, no rebrand, no framework. Single self-contained HTML file, offline PWA, dark steel/gold aesthetic retained, phone-first. Every recommendation names the region it lands in and whether it crosses the iframe seam.

---

## 0. The one-line finding

There is no feature problem. **The app asks "what kind of day is this?" in two places and derives nothing from either consistently.** The crowded home, the contradictory chips, the buried favourites and the slow logging are all downstream of that. Fix the day model and HOME reorganises itself, because HOME becomes a rendering of one decision instead of a shelf for six.

**Do these three, in this order:**

1. **One day-type control, on HOME.** FUEL displays it read-only. No cross-iframe code move required.
2. **HOME above-the-fold reset.** Cut the 5-icon section menu, shrink the ring to a badge, put one specific resume button at the top.
3. **Give every long-press a visible twin** — a `⋯` on the ranked quick-adds and every logged row. One menu, learned once, two places.

---

## 1. Information architecture — what goes where

**HOME — the day.** Exactly four things, in order: day-type · next action · stream progress rows (which double as nav) · readiness badge. Nothing else earns the first screen.
Moved down: sleep check-in, fuel rows, game-day link. Deleted: greeting line, 5-icon section menu, Full/Rest preset chips.

**One level down — the doing.** ARM / DRILLS / BODY / LIFT stay where they are, reached from the progress rows. GAME stays its own view — it's a mode, not a stream. FUEL keeps Tracker + Weekly + Events; **Heat folds into Tracker** as a status flag (it already is one).

**Settings (⚙ DATA).** Anything set once and forgotten: wake time, gulp calibration, tracked areas, hot-climate, vessel list, targets, profiles, backup. Several of these currently sit inline in Tracker where they compete with logging.
Merge Overview + Protein + Hydration + Products + Sources into one **Learn** reference behind ⚙ — **FUEL tabs 10 → 4** (Tracker · Weekly · Events · Learn).

**Cut entirely.** The Full/Rest preset chips (a second way to set the same flags) · the greeting (a row that says nothing) · the manual favourites shelf (recency beats pinning — see §5) · the "computed targets" card in Tracker (a settings readout on top of a logging screen).

---

## 2. The plan-vs-day-type conflict — resolution

**The rule: one control. Single-select. On HOME. Owned by the host.** Day-type is the input; the activity checklist and the fuel targets are both derived from it. FUEL stops asking and starts reporting.

- **Single-select, not multi.** Multi-select is precisely what lets the two controls disagree, and it makes readiness arithmetic arbitrary (what is Rest + Heavy?). Five values: `REST · LIGHT · TRAIN · HEAVY · GAME`.
- **Travel is not a day type** — it's a constraint on access to food and water, orthogonal to load. Demote it to a modifier toggle that only affects fuel guidance, never the checklist. **This is cheaper than it sounds: FUEL already models it this way.** `activeDays` is a Set and the code already separates activity types (`DAY_ACTIVITY`) from modifiers — that's exactly why the two Lane E fixes had to preserve TRAVEL across a type change. The host simply needs to emit the distinction the FUEL data model already makes.
- **Rest is never a chip that can contradict a countdown.** If Arm Guardian says RESTING, REST is preselected and picking HEAVY asks for confirmation. `#rest-status` exists because the chips could lie — delete the lie instead of annotating it.
- **The four plan chips survive, one level down.** Each day type ships a stream template (arm/drills/body/lift). "Adjust today" opens the same four toggles, pre-set, marked MODIFIED on deviation. They become a refinement of one decision instead of a competitor to it.

### Why this resolution and not another: the seam is already built

`bat-plan` exists, the host already owns `battery-plan-<date>`, and `syncFuelDayFromPlan()` already emits a day. **This adds no channel — it deletes the negotiation on the far end of one that exists.** Two real defects dissolve with it:

1. **The mapping can't say most of the days.** `syncFuelDayFromPlan()` only ever emits `'rest'` or `'train'` — "otherwise nothing is sent." **LIGHT, HEAVY, GAME and TRAVEL are unreachable from HOME by construction.** Four of six fuel days can only be set in the place that isn't the source of truth. The contradiction is structural, not perceptual.
2. **`handlePlanSync()` is the contradiction written down.** It auto-applies `'rest'` only on an untouched day and otherwise raises a dismissible nudge, because "an athlete's manual day-type choice is never overwritten." That rule is correct *given two controls* — it protects a second source of truth. Remove the second control and the rule, the nudge and the untouched-day special case all become dead code.
3. **You have already paid maintenance on this machinery twice, and both bugs were invisible in production.** The reachability fix (Lane E): `untouched` read `fuel-day-<date>`, which FUEL stamps unconditionally at boot — so the rest auto-apply was **dead code in production** and only ever passed in a test that deleted the key first. The modifier-preservation fix (Lane E residual #2): `applyPlanNudge()` called `setDay()`, so an athlete on `{travel, light}` who tapped "Match it" **silently lost TRAVEL and its extra hydration**. Plus `setActivePlan('full')` once evaluated `'full'['arm']` → all-off → posted `bat-plan:'rest'` and rewrote the athlete's targets. Three separate silent-failure bugs, all in the reconciliation layer. **That layer exists only because there are two controls.** This is the strongest argument in the review: you are not deleting a feature, you are deleting a bug factory.

**Cheapest first step (one evening, Lane A alone, no refactor):** render FUEL's day chips **disabled** with the current day name and a "set on HOME ›" affordance, and drop the nudge branch of `handlePlanSync()` so the incoming day always wins. Then Lane B widens `syncFuelDayFromPlan()` to emit all five + the travel modifier. The contradiction is gone before the HOME redesign lands.

---

## 3. Home-screen priority

Above the fold today: a greeting, five icons, a 172px score, six chips — **zero actions**. The thing you open the app to do is below the fold, and the section menu duplicates the rows beneath it.

- **The resume button is the point, and it already exists.** Flow mode (E8) already walks today's unchecked must-dos over `bat-nav` deep-links. What's missing is the *label and position*: move it to the top, name the next unchecked item (**CONTINUE J-BANDS · 4/9**), and say START only when nothing is done. **A string and a position, not a feature.**
- **The ring is a score, not an action.** 172px for a number you can't act on. At 64px beside the day strip it still gives the glance and still animates when it charges, and returns ~150px — enough to lift the action and the rows above the fold. Keep the 100-point celebration.
- **Delete the section menu.** Two navs to the same five places, stacked 90px apart. The rows win: they carry progress, they're already tappable, and they're filtered by the day. GAME keeps one plain link below. Host-only change. **See §9 — this needs an escape hatch.**
- **Sunlight + one hand.** Day chips are currently ~28px tall, under the 44px floor; the proposal is 44px, full-width-divided, with a 56px primary. Separately: **`#8b949e` on `#0d1117` is the most-used pair in the app and the weakest contrast in it** — promote body copy to `#c9d1d9` and keep `#8b949e` for labels only. Free legibility in the sun.

---

## 4. Discoverability — give every gesture a visible twin

A gesture is an accelerator, never the only door. Long-press and ☆ can stay; they can't be the only way in.

- **A · One `⋯`, one menu, two places.** A 28px `⋯` on the right edge of the ranked quick-adds and every logged row, opening the sheet the long-press already opens: *Pin to quick-add · Edit amount · Move ‹ · Move ›*. **Scope per §9: not on the 60-preset grid.**
- **B · ☆ becomes state, not action.** Today ☆ is an invisible verb on log rows and a decoration elsewhere. Make "Pin to quick-add" the first item in the one sheet, and let ☆ only ever *indicate* pinned.
- **C · A coach line, not a tour.** One dim monospace line under the grid: `HOLD A BUTTON OR TAP ⋯ TO EDIT, PIN OR REORDER`. Show until the sheet has been opened twice, then never again. No modal, no coachmarks.
- **D · Reorder: keep `‹ ›`, skip drag.** Drag needs a long-press to start (colliding with the menu already bound there), then precise movement with sweaty hands, in a *wrapping* grid where the drop slot is ambiguous. `‹ ›` is one tap and needs no hit-testing. If drag is ever wanted, put it in a dedicated "Edit quick-adds" mode — a single-column list with big handles, not the live grid.

**The rule for the next 80 releases: if a capability has no visible affordance, it doesn't exist. Before shipping a gesture, name the pixel that advertises it.**

---

## 5. Fastest food + water logging

- **A · Ranked, not pinned.** Replace the manual favourites shelf with the five most-likely items right now, out of `fuel-entries-<date>`. Pinning stays as an override that locks slot 1. **Ordering must freeze within a session — see §9.**
- **B · One tap = logged, never a dialog.** Quantity is whatever you logged last for that item; the quantity picker only appears from hold / `⋯`. What makes one-tap safe is **undo in the toast — build that first, then delete the confirmations.**
- **C · Bundles, learned from you.** A bundle is a named list of deltas — `{water:28, protein:25, electrolyte:1}` — replayed through the existing add functions. **The dual-credit sport drink already IS a bundle**, hard-coded, and `fuel-dual-credit` is already in the gate: generalise that case rather than building a mechanism. Then, when two logs land within 90 seconds, offer **"save these two as one button?"** — the list builds itself from real habits instead of a form. Whole-bundle undo invariant holds.

**Cheapest useful version (one hour, FUEL only):** auto-populate the existing favourites shelf from most-used, move it to the top of Tracker above the header, hard-code three real bundles. Captures most of the speed; ranking and bundle-learning follow.

**Host-level floating `＋LOG`: not yet.** It would be genuinely better — mid-workout you're in ARM, not FUEL — but it needs a host sheet plus a new host→FUEL write message and duplicates logging UI across the seam. Do it only after the ranked bar proves itself, and then as a thin host sheet posting `bat-log`, with FUEL owning all mutation.

---

## 6. Youth experience direction

Right now youth is the adult app minus rows, and that's how it reads. The fix isn't more features — it's a different **unit**. You measure grams and ounces against targets; he should measure **charge earned** and **things counted**.

- **Count objects, not macros.** Water = bottles as filled pips (6 of 8), not 96/150oz. Food = meals + snack checkmarks. Not a watered-down number — the *right* number for a 12-year-old, and automatically §4.3-safe because no quantified macro is on the screen at all.
  *Corroboration from the source:* youth already replaces `DAY_TARGETS` wholesale with six copies of one child-safe object **whose label is `'Youth'`** — which is why a youth athlete briefly saw "Your plan says YOUTH today." The gate is already straining to describe his day in adult vocabulary. Counted objects are the vocabulary that fits, so this direction removes a class of copy bug rather than adding UI.
- **Give him something you don't get.** A post-throw **"how'd the arm feel?"** three-face check, and streak badges ("14 days of J-Bands"). Both cheap; the arm-feel trend is genuinely useful to you — surface it in your profile, not his.
- **Locks read as future; blanks read as censorship.** Where the gate hides *training* content, show it locked with a one-line why: "Weighted balls — unlocks at 13. Right now catch play builds more arm than weight does." **Never do this for supplements or stimulants** — lock the category silently ("Advanced fuel · later") with zero product content, per §4.3.
- **His accent is green.** Green primary where gold is yours, same near-black steel and monospace. `body.youth` and `body.fuel-youth` are already toggled on both sides of the seam, so this is an accent-variable override inside two existing rule blocks. Cheapest identity win in the review.
- **The real one, given how he actually uses it.** You mostly log for him and he barely opens it alone. So the first youth build isn't for him — it's a **two-athlete moment**: after your session, one card on *your* HOME — "Kole today: J-Bands ✓ · 4 bottles · arm felt good". His screen then becomes where he goes to check his own charge, which is a reason to open it that a checklist never gives him. **Build that card first.**

**Big lift, cheaper version:** a genuinely separate youth home is a second render path in the host *and* the ARM iframe — weeks. The cheap 80%: bottle pips, arm-feel faces, badges, green accent swap, all inside existing renders gated on `body.youth`.

---

## 7. Order of work

| # | Change | Why it's first | Lift | Cheaper version |
|---|---|---|---|---|
| 1 | **One day-type on HOME; FUEL displays it.** Single-select 5 values, travel as modifier, streams become an adjustable day template. | The contradiction you can't explain to yourself; every screen inherits it. | MEDIUM · no seam move | Disable FUEL's chips + drop the nudge branch. One evening. |
| 2 | **HOME above-the-fold reset.** Cut section menu + greeting, ring → 64px, add the resume label/position. | Fixes the worst field moment; felt every day. | SMALL · host only | Ship the deletions alone before resume-awareness. |
| 3 | **`⋯` twin + ranked log bar + undo toast.** | Recovers features already paid for; makes the most frequent action 1 tap. | SMALL–MED · FUEL only | Auto-fill favourites from most-used, pin to top, `⋯` on quick-adds only. |
| 4 | **Bundles + "save these two as one button?"** | Solves food+water in one action; grows from real behaviour. | MEDIUM · FUEL data model | Three hard-coded bundles, no learning. |
| 5 | **Youth: "Kole today" card, pips, arm-feel faces, badges, green accent.** | Turns "redacted" into "his"; gives you his soreness trend. | MEDIUM · ARM + FUEL + host | Accent swap + the adult-HOME card only. |
| 6 | **FUEL tabs 10 → 4**, reference behind ⚙. | Shrinks the youth gate's surface as a side effect. | SMALL · FUEL only | Merge the four reference tabs into Learn. |
| ✕ | **Not now:** host-level floating `＋LOG` (crosses the seam, duplicates logging UI — revisit after 3) · drag-to-reorder in the live grid (worse than `‹ ›` on a phone) · a separate youth app shell (weeks; #5's cheap version gets most of the feeling). | | | |

**For the owner, not a lane:** item 1 shrinks a control you use daily and item 2 deletes a nav you may have muscle memory for. **Ship 1 and 2 together, then use the app for a week before starting 3.** If the resume button is right you'll stop opening FUEL to check anything — that's the signal that tells you whether the host-level `＋LOG` is worth the seam crossing later.

---

## 8. Work order — Lane A is in command, Lane A distributes

Nothing below needs a new message type, a new storage key, or a new iframe. **Every item lands in a region that already exists.** Batch as a `READY:` on a fresh `laneA/*` branch; Lane B gates, stamps and deploys.

### Assignment by region

| # | Region touched | Lane |
|---|---|---|
| 1 | FUEL chips → read-only + drop nudge branch of `handlePlanSync()`; then widen `syncFuelDayFromPlan()` to emit all five days + travel modifier | **A** iframe · **B** host emit · §D in the same commit |
| 2 | Delete `#today-section-menu` + greeting, ring → 64px, relabel/lift the Flow button. Pure `#view-today` | **B** host only (A: nothing) |
| 3 | `⋯` twin + ranked bar + undo toast — entirely FUEL srcdoc. Build undo *first*, then delete confirmations | **A** alone · srcdoc risk |
| 4 | Generalise dual-credit into bundles; 90-second capture prompt; whole-bundle undo | **A** alone |
| 5 | Pips + meal checks + arm-feel faces (FUEL/ARM) · green accent under `body.youth`/`body.fuel-youth` · **"Kole today" card on adult HOME** (host) | **A** iframes · **B** host card · **C** only if the tabbar glyph recolors |
| 6 | Tabs 10 → 4 — **update the `switchTab()` youth guard in the same commit** | **A** alone · gate: youth |

### ⚠ §4 and §5 land inside the FUEL srcdoc

**No literal `"` anywhere.** The `⋯` glyph, bundle labels, coach line and toast copy all need `&quot;`, and logical-AND is `&amp;&amp;` in FUEL (raw `&&` in ARM). The §4C coach line and the §5C "save these two as one button?" prompt are both natural places to type a quote — **write them without quotation marks at all** and the bug class can't occur. `node --check` passes on a broken file; only the Playwright gate catches truncation.

### Gate focus — of the 21, these should move

`today-view` (HOME reset) · `e7-host` (day emit widened) · `flow-mode` (resume label + position) · `fuel-dual-credit` (bundle generalisation + whole-bundle undo) · `iframe-modal` (the `⋯` sheet is a modal in the srcdoc) · `week-report` (item 5's card is adjacent to `#week-card`) · `youth-fuel-gate` **on every item**.
Item 6 is the most likely red: `switchTab()`'s youth guard names the four adult tabs it blocks, so merging them means **Learn itself becomes the gated id**.

### Stale info found in the boards (please correct at source)

1. **The NN lines are badly behind reality.** `LANE.md §C` says next free is `.61` and `CLAUDE.md §5` says "21 tests as of `.63`" — but the working tree's SW cache is **`battery-v82`**, so the real next free is past **`.83`**. Two boards, two different wrong numbers, ~20 releases of drift. **Lane B derives NN from `HANDOFF.md §10` and nothing else**; the `.61` line should be deleted rather than corrected, since it will just go stale again.
2. **The gate is 21+ tests, not 10.** `LANE.md`'s header and §A step 4 still say 10-test / 7 tests.
3. **There are at least five lanes, not two.** `LANE.md`'s lane table predates Lane C (host `#tabbar` glyph QA), Lane D (cloud, `claude/*`), **and Lane E** — which isn't in the `CLAUDE.md §8` roster either, though its findings are cited in `index.html` comments (the two `handlePlanSync` fixes). Whatever Lane E owns, it is reviewing host-side plan logic and is invisible on both boards.
4. **`CLAUDE.md §2`'s line-range table is stale** — it gives the host script as ~8466–EOF (~9374); the file is now 12,695 lines. The table says "verify by reading," which is doing a lot of work; consider dropping the numbers and keeping the anchors.

### Two protocol items that bite this batch

- **Gate from an isolated `/tmp` copy** of the harness. Items 1 and 5 touch both iframes and the host, so more than one lane will be gating — a shared `~/battery-tests` lets two runs clobber each other's staged `app-fixed.html`.
- **Lane D cannot see `~/battery-comms.md`.** If item 6 goes to the cloud, the handoff must be Issue #2 or a PR comment. Lane D also can't run the authoritative gate (no `~/battery-tests` in the container) — it ships `node --check` only and Lane B gates.
- **Process note on this file:** Lane A does not commit to `master` (§6). `DESIGN-REVIEW.md` should ride a `laneA/*` branch like any other change and let Lane B merge it — committing it directly would make a docs file the first exception to the single-writer rule.

---

## 9. Devil's-advocate pass on this review

Two of these are **real defects in §1–§7 that must be fixed before item 1 ships** — not hedges.

**MUST FIX · §1 + §3 — cutting the section menu strands the streams the day-type turned off.** On a REST day the rows render arm/body only, so there is *no path at all* to LIFT. Today's 5-icon menu is unconditional, so deleting it is a genuine loss of reach.
→ **Fix:** "ADJUST TODAY" becomes the escape hatch, not just a refinement — toggling a stream on reveals its row immediately, and the button is present even on REST. Add one always-visible `ALL SECTIONS ›` line below the rows for direct reach without changing the plan.

**MUST FIX · §5A — recency ranking moves the button under your thumb.** Ranked-beats-pinned fights the one-handed-in-sun requirement: a grid that reorders between taps destroys the muscle memory people actually log fast with. Optimal ordering is worse than stable ordering here.
→ **Fix:** rank at day-part boundaries only (morning / training / evening) and **freeze the order within a session**. Slot 1 never changes unless pinned. Less code than live ranking.

**ACCEPTED RISK · §2 — five day-types may relocate the ambiguity.** If you can't tell "plan" from "day-type" today, there's no guarantee you can tell TRAIN from HEAVY at 6am. Defensible because the judgment is now about one thing and correctable in a tap. Mitigate by pre-selecting from the calendar + Arm Guardian so the chip is usually a confirmation. **Fallback if it still feels vague after a week:** collapse to REST / TRAIN / GAME and put load on the Adjust sheet.

**TIGHTEN · §4A — a `⋯` on all ~60 presets would re-crowd the screen just decluttered**, and a small secondary target beside a 44px primary invites the mis-tap in exactly the conditions being optimised for.
→ **Scope:** `⋯` on the ranked bar (5) and log rows only. The preset grid keeps long-press alone — you're browsing there, not repeating.

**TIGHTEN · §6 — bottle pips are more taps and hide the number from you.** Eight taps for eight bottles is slower than one +28oz, and if you're logging for him, pips cost precision on the profile that needs it most.
→ Keep pips on *his* screen (youth-safe unit, reads as a game); **"Kole today" on your HOME shows real oz.** Same data, two units.

**BLAST RADIUS · item 6 — merging four gated tabs concentrates the youth risk.** Four ids are blocked independently today; after the merge one guard protects everything, so one regression exposes supplements, dosing and macros at once.
→ **Fix:** gate at the **content-block level inside Learn** (keep a `.qa-adult`-style class per section) *as well as* on the tab id. `youth-fuel-gate` should assert both. This is why item 6 is last despite being small.

**HELD · §5B — one tap plus a 3-second toast is a silent-bad-data risk** in a pocket, mid-workout, wet phone. Held rather than fixed: the `⋯` on log rows gives a permanent second path to correct or delete, so the toast isn't the only undo. Re-check after a week of real use.

---

## Appendix — visual review artifact

The annotated review (current HOME and FUEL Tracker recreated from `index.html`, side by side with tappable proposed versions of both, plus the youth direction) lives with the design session as `BATTERY IA Review.dc.html`. Sections there map 1:1 to §1–§9 above.
