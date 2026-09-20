# BATTERY Feature Backlog

Lifecycle: **REQUEST** → **STORY** → **PLANNED** → **IMPLEMENTED** → **SHIPPED**

| Stage | Meaning |
|-------|---------|
| REQUEST | Raw idea, observation, or user feedback — not yet shaped |
| STORY | Assessed as a user story with acceptance criteria |
| PLANNED | Approved for implementation, assigned to a lane/sprint |
| IMPLEMENTED | Code complete on a branch, needs merge + gate |
| SHIPPED | Merged to master, gate green, in production build |

---

## REQUEST

### REQ-001: Recovery boost should explain itself in FUEL UI
**Source:** Owner observation 2026-09-09 — "Rest, Light, Train are all the same [protein]"
**Context:** When recovery boost fires (hard throw/lift detected), Rest and Light protein floors at Train level. The computed targets grid shows identical protein for all three with no explanation. User thinks the system is broken.
**Observation:** Water values DO differ correctly (180/200/230oz) — only protein is floored.

### REQ-002: Day-type selection needs guidance / auto-detection
**Source:** Owner 2026-09-09 — "how does one achieve each? I've never seen Light"
**Context:** Day-type (Rest/Light/Train/Heavy/Game/Travel) is manually selected on HOME. No guidance on which to pick. Light has no clear trigger. Train is "a mixed bag." Could auto-suggest based on today's plan chips or past activity.

### REQ-003: BODY row shows 0/0 on HOME → FIXED (q/split-monolith)
**Source:** Design review P0 (2026-09-09)
**Context:** BODY progress row displays "0 / 0" when no exercises assigned. Should show meaningful empty state or hide row.
**Status:** FIXED — added `bd.total>0` guard in both `renderScoreboard()` and `renderToday()`, matching the LIFT row pattern.

### REQ-004: RESET DAY needs confirmation dialog → SHIPPED
**Source:** Design review P1 (2026-09-09)
**Context:** One tap destroys a full day of logged progress. No confirmation step. Appears in multiple sections.
**Status:** SHIPPED — `uiConfirm()` guard in both `arm.html:7565` and `fuel.html:4482`.

### REQ-005: Profile Delete needs safety guard → SHIPPED
**Source:** Design review P1 (2026-09-09)
**Context:** Red Delete button beside Rename/Make Youth with equal visual weight, no confirmation. Accidental deletion wipes all user data.
**Status:** SHIPPED — `removePerson()` with confirmation in `index.html:725`.

### REQ-006: Device detection broken on Capacitor Android
**Source:** Design review P1 (2026-09-09)
**Context:** Settings shows "Safari browser" / "iPhone" on Android Capacitor build. Detection logic needs Capacitor/Android path.

### REQ-007: ARM CARE sub-tabs should be sticky → SHIPPED
**Source:** Design review P1 (2026-09-09)
**Context:** OVERVIEW/WARM UP/SHOULDER TUBE/J-BANDS/PLYOCARE tab bar scrolls away. Deep in exercise list, can't switch tabs without scrolling all the way back.
**Status:** SHIPPED — `.tabs` already has `position: sticky; top: 0; z-index: 10;` in arm.html.

### REQ-008: EXPORT/IMPORT should live in SETTINGS only
**Source:** Design review P1 (2026-09-09)
**Context:** Data management buttons scattered across ARM CARE overview and FUEL WEEKLY. Users looking for backup/restore shouldn't need to search training sections.

### REQ-009: FUEL quick-add needs visible entry point on TRACKER → SHIPPED (v130, 7f8dbfb)
**Source:** Design review P1 (2026-09-09)
**Context:** Most-used daily action (logging food/water) has no obvious entry point on TRACKER view. Says "Tap a button above" but no buttons visible.
**Status:** SHIPPED — `.qa-jump` buttons (+ Water / + Protein) added after `#status-row` in fuel.html. Scroll-to shortcuts with opt-out gate support (noprot/nowater CSS). Deployed v130 (7f8dbfb, 2026-09-19).

### REQ-010: FUEL day-type chips vs "Set on HOME" contradiction → SHIPPED (v133, 9dea8bd)
**Source:** Design review P1 (2026-09-09)
**Context:** FUEL renders interactive-looking day-type chips AND a "Set on HOME >" link. Contradictory — are chips interactive or read-only?
**Status:** SHIPPED — CSS-only read-only treatment: `.day-chip.locked` opacity 0.6 + pointer-events:none, active locked chip stays opacity 1. Stale hover rules removed. Deployed v133 (9dea8bd, 2026-09-19).

### REQ-011: LIFT and BODY are separate HOME rows → same section
**Source:** Design review P1 (2026-09-09)
**Context:** Tapping LIFT from HOME lands in BODY STACK's LIFTING tab. Misrepresents navigation. Either separate them or merge HOME rows.

### REQ-012: Config block duplicated across ARM/DRILLS/BODY
**Source:** Design review P1 (2026-09-09)
**Context:** Position selector, training-day picker, stats, RESET DAY copy-pasted into 3 sections. Wastes space, confuses whether changes propagate.

### REQ-013: Exercise picker cascading filters (muscle group → equipment → exercise)
**Source:** Owner request — "Biceps > DB > Hammer Curl" model
**Context:** Step 1 (optgroup by muscle group) shipped. Step 2 adds equipment filtering via existing `data-eq` attributes on all 55 exercises. Could be dependent `<select>` or hybrid filter.
**Touches:** ARM iframe — `renderLiftLog()`, `.step[data-ex]` elements (have `data-eq`, `data-sub`)
**Status:** IDEA — awaiting owner direction on UX model.

### REQ-014: Exercise history edit (reps/weight)
**Source:** Lane A session assessment
**Context:** Lift log stores sets with reps/weight but no edit affordance after entry. Day editor handles FUEL entries but not lift log entries.
**Status:** ASSESSED — not blocking, lower priority.

### REQ-015: Clip timestamp extraction from VTTs
**Source:** Lane M — implicit from VTT scanning workflow
**Context:** Given a VTT + keyword/concept, extract 30-60s windows where that concept is discussed. Output: `[00:04:30 - 00:05:15] — shoulder/hip separation explanation`. Feeds clip editor directly.
**Why:** Currently VTTs are read holistically. For clip editing, need to know WHERE in the video key moments are.
**Connections:** Feeds Lane A clip timestamping, future clip automation.

### REQ-016: Clip spec standard for BATTERY embeds
**Source:** Lane M — observed during elbow-pain-band assessment
**Context:** Define standard clip specs: portrait vs landscape, max duration per slot, resolution target, subtitle burn-in. Without a spec, clip quality will be inconsistent (elbow band clip is portrait; most YouTube content is landscape).
**Status:** REQUEST — no formal spec exists.

### REQ-017: Source attribution / licensing notes
**Source:** Lane M — implicit from pulling professional coach content
**Context:** Document which videos are used for what purpose. Fair use analysis for coaching content embedded in a paid app vs free app vs streaming within sessions.
**Status:** REQUEST — needs owner decision before shipping clips publicly.

### REQ-018: Catching section for BATTERY — PARTIALLY SHIPPED
**Source:** Owner direction — "future pitching and catching ones"
**Context:** A CATCHING section parallel to ARM CARE. Would include: stance selection (MFbxm_j4N74), blocking blueprint (7AnSFFQUJMM), pop time development (vC-ivPGeyOE, 3EODf3R4jXA), receiving/framing (_9UqmW4TS6o), warmup routine (klSzYHMSflI), arm health (X419_BP_Ykc, bRRz82O9V2I).
**Connections:** Requires Lane A tab structure; Lane M has all source content (9 videos, 12 VTTs, content summaries).
**Status:** PARTIALLY SHIPPED — Catching tab with B-1→B-37 on master across v128–v132. B-1→B-10 (v128), sub-prefixes (v130, 7f8dbfb), B-11→B-32 glove/throw/brace/decision/steal/pop-time + Bailey pregame (v131, 805163e), B-33→B-37 rotation/throwing (v132, 283569e). Youth gate (REQ-020) still open.

### REQ-019: Pro pregame routine reference content
**Source:** Lane M — Catching Made Simple channel survey
**Context:** Two high-value pro routine videos: tzSPFE8UCAA (Inside the Marlins Pregame Routine, 11:28) and XpCZPoJN4iU (Patrick Bailey's Pregame Routine, 17:13). "Train like a pro" angle — actual pro footage is benchmark content.
**Status:** IDs confirmed, not yet downloaded.

### REQ-020: Youth gate for catching content
**Source:** Lane M — observed from Catching Made Simple targeting (10U, youth, HS)
**Context:** Some catching content is explicitly age-appropriate (10U drills), some is HS+/adult (pop time coaching, arm injury content, equipment recs). When Lane A structures catching section, must flag which clips are youth-appropriate vs HS+.
**Connections:** §4.3 youth safety gate. Same pattern as ARM CARE `.plyo-heavy` gating.

### REQ-021: Lifting dropdown doesn't mark exercises complete → SHIPPED (876f0f9)
**Source:** Owner finding 2026-09-09 (via Dispatch Mac history)
**Context:** Logged exercise doesn't call `toggleDone()`; ring never sees it. Design tension: if arbitrary logs close ring, ring loses meaning. Logged steps should signal completion through `syncLiftLogDone()`.
**Status:** SHIPPED — `syncLiftLogDone()` in arm.html:7333 syncs lift log → checkboxes → bat-counts. Shipped with liftlog-sync-done branch (876f0f9).

### REQ-022: Week-card rows not clickable → SHIPPED (91c968c)
**Source:** Dispatch Mac history (was HALF DONE)
**Context:** `renderWeekCard()` rows were display-only. Lane E AM06 shipped weekcard click handlers at 91c968c, gate green, pushed to origin at 9b43ffb.
**Status:** SHIPPED — moved to SHIP section.

### REQ-023: Heavy/Train signal incomplete (liftedHeavyToday) → SHIPPED (91c968c)
**Source:** Dispatch Mac history (was HALF DONE)
**Context:** `liftIntensityFor()` shipped the rule; Lane E AM06 shipped `liftedHeavyToday` host clause at 91c968c, gate green.
**Status:** SHIPPED — moved to SHIP section.

### REQ-025: Custom FUEL item normalization
**Source:** Owner directive 2026-09-06 (via Dispatch)
**Context:** Detect similar entries across catalog, flag for replacement/swap, owner approves each. Never auto-rewrite, never silent. Scan existing/past entries too. `fuel-goalsnap-<date>` only protects targets, not entry text.
**Status:** REQUEST.

### REQ-026: Youth items 5+6 (Kole card + FUEL tabs reduction)
**Source:** LANE.md queued items
**Context:** Item 5: "Kole today" card with pips, arm-feel faces, green accent. Item 6: FUEL tabs reduction (was 9 tabs pre-audit, now 7 after v135 removed Overview+Schedule; youth target TBD). Both queued behind current work.
**Status:** REQUEST.

### REQ-027: Game-day local notifications
**Source:** Mac history sweep — zero hits for Notification API in codebase
**Context:** E9 readiness ring has no notification capability. Game-day reminders, pre-game routine nudges.
**Status:** REQUEST — genuinely missing feature.

### REQ-028: base64-inlining vs hosting for food-item images
**Source:** Owner question (via Dispatch)
**Context:** Technical decision on whether food catalog item images should be base64-inlined (keeps single-file architecture) or externally hosted (reduces index.html size). Owner asked for technical read; still open.
**Status:** REQUEST — needs technical assessment.

### REQ-029: Latent selectedDate bug in _stampGoalSnapshot
**Source:** Mac history sweep — LANE.md analysis
**Context:** `addEntry()` at line 11290 calls `_stampGoalSnapshot(todayKey())` with hardcoded `todayKey()`. Will stamp wrong day the moment selectedDate is threaded through. Must change to `_stampGoalSnapshot(activeKey())`.
**Status:** SHIPPED — all four call sites already use `activeKey()` (shipped with pip-strip, 88ba2d8).

### REQ-030: Pip-strip tap should open day editor → SHIPPED (4dbe82e)
**Source:** Owner testing 2026-09-12 — "when I touch a pip, I would expect [the editor] to happen"
**Context:** Tapping a pip only called `_selectDate(dk)` (changed the tracker view). User expected it to also open `batteryEditDay(dk)`. Selected-banner already shows "Viewing: 9/6 ↩ Today" when a non-today date is selected.
**Status:** SHIPPED — pip click handler calls both `_selectDate(dk)` and `batteryEditDay(dk)` in fuel.html:5434. Deployed 26.09.12.120.

### REQ-024: Firefox icon final art
**Source:** Owner — "iOS metal, modern, badass"
**Context:** Current Firefox iOS home-screen icon is self-hosted (92de94f). Owner wants better source art. Unblocked when owner delivers new art assets.
**Status:** BLOCKED on owner — art delivery is the unblock signal.

---

## STORY

*(None yet — items move here after assessment with acceptance criteria)*

---

## PLANNED

### PLAN-001: selectedDate pip-strip → SHIPPED (88ba2d8, deployed 26.09.12.120)
**Source:** Owner directive via Dispatch (LANE.md §256-324), restated 3x with 5-step acceptance test
**Lane:** A
**What:** 7 mini-strip pips to switch FUEL tracker between days. All write operations use `activeKey()`. `bat-fuel` host message always reports today's real totals.
**Architecture:** `activeKey()` returns `_selectedDate || todayKey()`. Changing `loadEntries`/`saveEntries` default threads selection through all 26+ call sites automatically.
**Connections:** Foundation for full history phase (design call 2.1 — extend weekly tab vs dropdown+calendar).

### PLAN-002: Pitching tab first slice → SHIPPED (ad37ebe + 4dbe82e, deployed 26.09.12.120)
**Source:** Owner directive (LANE.md §326-338), approved 2026-09-06
**Lane:** A
**What:** First cut of Pitching section. Two Bauer clips only, not a curriculum. Bucket: `drills` (TAB_GROUPS gains `pitching:'drills'`). `data-optional="1"` flagged for owner decision.
**Connections:** Resolves nav question that kept cleared Bauer clips dark for 3 weeks. Pitching is not universal — optional flag matters.

### PLAN-003: selectedDate full history phase (design call 2.1) → SHIPPED
**Source:** LANE.md §320-324, owner direction 2026-09-12
**Lane:** A
**What:** Extend beyond 7-day strip. Calendar control at the top + scrollable running month with pips matching the 7-day strip style.
**UX spec:** (a) Calendar picker control at top of tracker, (b) scrollable month view using the same pip/fill/tier visual language as the existing 7-day strip, (c) tapping any pip opens `batteryEditDay(key)` for that date.
**Status:** SHIPPED — Full month calendar implemented in fuel.html: CSS (lines ~698–769), HTML (lines ~1953–1962), `renderCalendar()` (line ~5393), month nav (lines ~5449–5457).

---

## IMPLEMENTED

### IMP-001: HOME rows urgency hierarchy
**Branch:** design/ux-improvements (bf71b84)
**What:** Untouched items brighter/bolder, completed items dimmed, left-border accent + battery icon.
**Touches:** `renderToday()` bar() function (~line 16549), LIFT row (~line 16572)
**Connections:** Uses `batIcon()` helper. Progress bar colors tied to section color tokens.

### IMP-002: Flow modal slide-up bottom sheet
**Branch:** design/ux-improvements (bf71b84)
**What:** Modal anchored to viewport bottom, blur scrim, rounded top corners, spring animation.
**Touches:** `#bmodal` CSS (line ~195), `@keyframes bm-up`
**Connections:** `#bmodal.on` display toggle. Safe-area-inset-bottom padding for notch devices.

### IMP-003: Navigation breadcrumb bar
**Branch:** design/ux-improvements (bf71b84)
**What:** Fixed bar below header with ← back arrow + section name in sub-sections.
**Touches:** `#section-back` CSS+HTML (line ~155, ~14635), `go()` function (line ~15060), `#stage.has-breadcrumb` padding
**Connections:** secNames map in go() determines which views show breadcrumb. z-index 61 (above hostbar at 60).

### IMP-004: FUEL collapsible quick-add sub-groups
**Branch:** design/ux-improvements (bf71b84)
**What:** Chevron toggle on `.qa-subgroup-label` headers, click hides/shows grid beneath.
**Touches:** FUEL iframe CSS (`.qa-subgroup-label::before`), JS event delegation after `toggleMixinInfo()`
**Connections:** Uses `&amp;&amp;` encoding per FUEL srcdoc convention. Walks siblings until next label/title/form.

### IMP-005: Exercise muscle group tag pills
**Branch:** design/ux-improvements (bf71b84)
**What:** Gold pill with tinted background on `.step-target` elements.
**Touches:** ARM iframe CSS (~line 878)
**Connections:** Color is literal `#f0b832` (not var) because ARM iframe doesn't inherit host CSS vars.

### IMP-006: selectedDate pip-strip
**Branch:** laneA/selectedDate-pip-strip (88ba2d8)
**What:** 7 mini-strip pips switch FUEL tracker to any day in the week. All write ops (addEntry, addWater, addMixIn, addShake, addShakeWithElec, removeEntry) use `activeKey()`. Host `bat-fuel` message always reports today's real totals.
**Touches:** FUEL iframe: CSS (.pip.selected, .selected-banner), markup (selected-banner div, progress-day-label span), JS (_selectedDate, activeKey(), entryTime(), _selectDate(), _renderSelectedBanner(), loadEntries/saveEntries default change, refreshMiniStrip click handler)
**Architecture:** `activeKey()` returns `_selectedDate || todayKey()`. Changing defaults threads selection through 26+ call sites automatically.
**Connections:** Foundation for full history phase. `batteryEditDay` already respects `activeKey()` via consolidated loadEntries/saveEntries.

---

## SHIPPED

### SHIP-001–005: All IMP items above
**Merged:** 2026-09-09, master at bf71b84, pushed to origin.
**Gate:** Tested on Pixel 7 API 35 via Capacitor. Visual verification via CDP + screenshots.

### SHIP-laneE-am06: Lane E AM06 host features (91c968c, 9b43ffb)
- liftedHeavyToday host clause in syncFuelDayFromPlan() — REQ-023 closed
- renderWeekCard() click handlers — REQ-022 closed
- 32-suite gate green, pushed to origin

### SHIP-mac: Mac-side features (Dispatch history report 2026-09-09)
**FUEL stack:** Per-date ledger (be2ef7f), Asymmetric protein banking (6626fe9), Recovery-context chips (d4672d1+ac125fd), Goal snap at log time (line 11097), Food catalog 8 groups/46 items (Batch 11), Pizza/fries entries (2ab3734)
**ARM stack:** Continuous ARM page (d35bd58), ARM date-key fix (a53cf89), Lifting log (4435006), Past-day ARM editing (8ebdfd9), Lift intensity signal (1b05455), Ab ladder loggable (3c0b1aa), Washington phase labels (f9bdb07), Knee-hop corrected (d744ad1), Slow-motion per clip (1bcf07c), Recovery real steps (9b4b2b1), TB12 removed (ec3d04d), Jaeger demo removed (3641acf), bat-fed drill phase fix (ac125fd), Game Day ring fix (de2edd4), Youth weight-input guard (4218a9b), Firefox iOS icon (92de94f), SW real URL fix (1c7667a)
**Host shell:** Daily Readiness ring (.21), 7-day dot grid week card (b06bb76), bat-editday seam (5fbcb95), Protein icon + banking bug (PR#20/6423b25), SW caching/PWA (1c7667a)
**Tooling:** battery-lane CLI (4cdd441+f01bd3c), SessionStart hook (f01bd3c), battery-lane msg/mail (26740ae), Comms inbox (ddbd19a), battery-status snapshot (cc04bea), Remote-lane attribution (ac89051), Session identity via UUID (ac89051)

### SHIP-split: Monolith → split build (eabdf1b + 4dbe82e, 26.09.12.120)
- **Architecture:** Extracted ARM and FUEL srcdoc iframes into `arm.html` and `fuel.html`, loaded via `src=` instead of `srcdoc=`
- **Eliminates:** §3 double-quote footgun entirely — no more escaping rules
- **Boot:** `localStorage.setItem('battery-boot-tier')` replaces `window.BATTERY_TIER` injection
- **Includes:** Pip-strip tap-to-edit (REQ-030), Pitching tab (PLAN-002), BODY 0/0 fix (REQ-003), RESET DAY confirm (REQ-004), Profile Delete guard (REQ-005)
- **Static gates:** Dual-mode support for both monolith and split builds
- **Gate:** 33 suites, all green on AM06 (Playwright 1.63.0)
- **Docs:** ADR-001-split-monolith.md, APP-SPEC.md added

### SHIP-prior: Lane A branches (5)
- selectedDate-pip-strip (88ba2d8) — 7-day pip strip for FUEL date switching
- liftlog-sync-done (876f0f9) — lift log entries sync to step checkboxes
- fuel-tab-flex-shrink (e80cfcb) — FUEL tab truncation fix
- lift-picker-optgroup (a822304) — exercise picker grouped by muscle group
- docs-am06-naming (93c008b) — CLAUDE.md naming fix

### SHIP-media: Lane M content pipeline
- **Bauer library**: 11 videos downloaded (1080p), 25 VTTs scanned, 9 with BATTERY-relevant content, 3 short clip candidates ready
- **Catching Made Simple library**: 9 videos downloaded, 12 VTTs scanned, 6 content summaries written, all channel IDs resolved
- **Elbow pain band exercises**: Assessed HIGH VALUE, portrait 60s, ready for embed
- **Memory docs**: project_bauer_transcripts.md + project_catching_sources.md (full handoff docs for Lane A)

---

## Lessons Learned

1. **srcdoc iframe CSS scope**: Variables defined in the host (`var(--goldb)`) do NOT cascade into srcdoc iframes. Use literal values or redefine variables inside the iframe's own `<style>`.
2. **WebView caching**: After `adb install -r`, the Capacitor WebView may serve a stale copy. `pm clear <pkg>` is required to force a fresh load.
3. **CDP variable collisions**: Multiple `Runtime.evaluate` calls share the same global scope. Wrap expressions in IIFEs: `(function(){ ... })()`.
4. **Fixed-position stacking**: When adding fixed elements, check ALL other fixed elements' z-index. The breadcrumb at z-index 59 was invisible behind the hostbar at 60.
5. **Recovery boost opacity**: When the system silently floors a value, the UI MUST explain why — otherwise users report it as a bug.
6. **yt-dlp format cap**: Always cap at 1080p (`bestvideo[height<=1080]`). Bauer's channel offers 4K (2.82 GiB per video). 1080p is sufficient for clip editing.
7. **yt-dlp subtitle lang**: Use `--sub-lang en-orig`, NOT `--sub-lang en`. The `en` variant hits YouTube's translation endpoint → 429 rate limit errors.
8. **PowerShell for downloads, not Bash**: Bash background jobs from `C:\` trigger MSYS path mangling (`/c/Users/...` → `C:\c\Users\...`). PowerShell uses native Windows paths.
9. **VTT scanning uses Bash**: PowerShell `Get-Content` fails on filenames with emoji/em-dash/fullwidth punctuation (common in YouTube titles). Bash `sed`+`grep` handles Unicode paths fine.
10. **activeKey() threading pattern**: A module-level variable with an accessor that defaults to today. Changing ledger accessors' default from `todayKey()` to `activeKey()` threads selection through all call sites without touching them individually.
11. **syncLiftLogDone() pattern**: Read-one-system, write-another. One-directional: lift log → checkboxes, never reverse. Manual checkboxes and lift log are complementary, not competing.
12. **Film-study = metadata + video attachments**: Index into git, payload OUT of git. CLIP_EMBED pattern (external ID + start/end seconds) is the primitive — no re-hosting.
13. **Protein banking is asymmetric**: Miss carries full deficit forward; surplus gives back only ¼. Owner overrode ACSM/ISSN citation — Lane A's symmetric design was the bug.
14. **ARM/FUEL date-key format trap**: ARM used non-padded keys, FUEL used padded — diverged seasonally on single-digit days. `selectedDate` must be a DATE VALUE not string.
15. **data-optional="1" is load-bearing**: Pitching tab bucket=drills requires this flag. Cross-lane contract — the gate from de2edd4 breaks without it.
16. **--bg sessions park after one turn**: state=blocked after one mail read. Not sustained autonomous mode. Known battery-lane limitation.
