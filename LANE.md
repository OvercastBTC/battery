# BATTERY — LANE BOARD (live tandem-work coordination)

> **This is the doc to hand the VS Code Opus 4.8 agent to start.** It is the live lane board for two agents editing the single `index.html` at the same time. The durable backlog + rationale is `HANDOFF.md §12.2`; read `HANDOFF.md §1–§11` first for the architecture, the srcdoc footgun (§7.1), the youth-safety gate (§4.3), and the data-model invariants (§3.4). **Committed to the repo** so both agents (and future cloud sessions) read the same board.

**Current good base:** stamp `26.06.13.20`, SW cache `battery-v20`, commit `f9322c1`, live, 7-gate green, working tree clean.
**Last updated:** 2026-06-14 by **Lane A** (Claude Code · Opus 4.8 · Ultracode).

---

## The two lanes (who owns what — by file REGION, which is what makes parallel work safe)

| Lane | Agent | Owns (editable region of `index.html`) | This cycle |
|---|---|---|---|
| **A — CONTENT** | **Claude Code · Opus 4.8 · Ultracode** (this session; the "Fable 5/partner" role) | **ARM iframe srcdoc 116–3135** + **FUEL iframe srcdoc 3136–7984** + new `clips/` assets | E1–E5 (FUEL pains + PLYO rebuild + Bauer clips) + the iframe-side `bat-nav`/`bat-poll` listeners for E7 |
| **B — HOST** | **VS Code · Opus 4.8** (the "repo agent" role per `HANDOFF §11.2/§12.1`) | **HOST `<script>` shell 7985–8872** (router, tabbar, GAME, DATA, scoreboard, Arm Guardian, SW/stamp) | **E6 → E7 → E8 → host-side E9**; also **final reviewer / release engineer** |

The two regions are **disjoint line ranges** → git auto-merges concurrent edits. The ONLY shared lines are the version stamp + SW-cache name (see §C) and the cross-iframe message contract (see §D).

---

## §A — The tandem git protocol (BOTH agents, every push)

`index.html` is hand-edited now (not the old generated artifact), so disjoint-region edits DO merge. Discipline that keeps it safe:

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

> **STATUS 2026-06-14 (Lane B):** **E6 DONE** on branch `laneB/e6` (`053b779`, stamp `.21`/cache `v21`) — pushed, **READY TO MERGE to master** (host region only, disjoint from Lane A's FUEL work; clean auto-merge expected except the 2-line stamp/cache → I took `.21`). Gate: 8 stable tests + new `today-view.test.mjs` all green; host `node --check` OK. Built in an **isolated git worktree** `~/battery-laneB` because we share ONE working copy of `~/battery` — editing `index.html` in place would entangle Lane A's uncommitted FUEL WIP into my commit (see §A note below). Next: E7. — Lane B

- **E6 — START HERE. TODAY/Home landing + Daily Readiness score.** No cross-tab home exists; the scoreboard is buried in GAME. Promote a `#view-today` host `<section>` (make it the boot default) that fuses what the host already computes — `_batCounts` (arm/drills/body done), `_batFuel` (water/protein vs target), `pitchRestInfo()` (Pitch-Smart rest), day-type from `buildOutlook()` — into a single **0–100 Daily Readiness ring** + the existing tappable scoreboard rows. **Gate the protein/supplement contribution behind `profileTier(profile)==='youth'`** (the youth ring must exclude macros). Add a `today-view.test.mjs`. Anchors from the analysis: GAME section ~7985, `renderScoreboard` ~8811, tabbar ~8025, `restoreLastView` ~8863, default tab ~8169.
- **E7 — deep-link to nested tabs + tab dots + nav bugfixes.** Add a host→iframe `bat-nav` postMessage (host side; Lane A wires the FUEL & ARM listeners — see §D). Light a `todo` dot on FUEL when behind on water (and adult-only protein), and a `warn` dot on GAME when Arm Guardian is RESTING. Fix **NAV-4** (GAME scoreboard renders stale on first visit — broadcast a `bat-poll` on entry; Lane A adds the iframe responders) and **NAV-5** (`updateYouthBanner` has a no-op `.replace(/^./,c=>c)` ~8232; and the static `#youth-banner` default text "Kole (6, active)" ~7986 is stale — neutralize it).
- **E8 — one-tap "Flow mode"** guided walkthrough of today's unchecked must-dos using E7 deep-links; youth variant = food/water/light-arm only.
- **E9 host-side:** arm-iframe native-dialog→modal conversion, weekly report card, Arm Guardian v2, **verify the Pitch Smart table against pitchsmart.org**, game-day local notifications, consistency heatmap.

Full goals, acceptance checks, models, and risks are in `HANDOFF.md §12.2`.

---

## §C — Version stamp + SW cache handshake (the one shared 2-line collision)

Both lanes bump these every release. To avoid fighting:

- **Next NN to claim:** **`.22`** → stamp `26.06.14.22`, cache `battery-v22`.  (`.21` taken by Lane B / E6.)
- **Rule:** when you take an NN, immediately set this line to the next free NN and push (the §10 log entry is the source of truth). If both grab `.21`, the second pusher's `git pull` conflicts on these two lines → take the higher and bump to `.22`.
- Both live in the HOST region (Lane B's region): `#ver-stamp` text + the `battery-vNN` template literal in the PWA/SW block. **Lane A:** when you ship an iframe-only change, you still must bump them — edit just those two lines in the host region (that is the one allowed cross-region touch) and note it; or hand the stamp bump to Lane B if you're shipping back-to-back. Coordinate here.

**Claimed NNs:** `.21` → **Lane B (E6 TODAY/readiness ring)** — committed on branch `laneB/e6` (`053b779`), pushed, ready to merge to master. Next free = `.22`.

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
