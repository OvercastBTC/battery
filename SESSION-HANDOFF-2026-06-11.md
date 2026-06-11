# BATTERY — Cloud Session Handoff · 2026-06-11

Transfer document for the local repo instance. Covers everything done, every open
suggestion, and the technical notes a fresh session needs. Written by the Claude Code
cloud session that produced commits `59518c1` → `a31b1c8`.

---

## 1. State of the repo (as of this handoff)

- `master` = `a31b1c8`, deployed via GitHub Pages. **Pull before doing anything locally.**
- Version stamp `26.06.11.19`, service-worker cache `battery-v19`.
- Working branch `claude/epic-einstein-p2nhow` is level with master.
- App is still a single `index.html` (~503 KB): host shell + two `srcdoc` iframes
  (arm/drills/body app, fuel app) + GAME and DATA views in the host.

## 2. Work completed this session (already on master)

| Commit | What |
|---|---|
| `59518c1` | **fix(youth)**: `buildGameDay` / `buildOutlook` / `exportGameICS` keyed youth mode off the hardcoded id `'kole'`. Any other youth athlete got the ADULT game-day plan — including supplement/stimulant steps (L-Theanine, Creatine/Alpha-GPC) the youth safety gate exists to hide, and they exported into the ICS. Now uses `profileTier()`. Also de-hardcoded Adam/Kole from backup-card copy. |
| `d7b1880` | **feat(ui)**: in-app modal engine (`batteryModal`, `modalConfirm`, `modalAlert`) replacing all 12 native `prompt/confirm/alert` in the **host shell**. Gold primary / red destructive styling, Esc + backdrop cancel, Enter confirms, input+checkbox combos (New Athlete is now one modal, not two stacked dialogs). |
| `2cfa199` | **feat(guardian)**: 🛡 Arm Guardian on GAME — USA Baseball / MLB **Pitch Smart** age-banded daily pitch maximums + required rest days. Log outing → red RESTING / green CLEARED with cleared-to-pitch date; 3-day outlook overlays "not cleared to pitch until <date>" for pitchers in a rest window; over-max log triggers a warning modal. Outings live in `arm-care-pitchlog` (live key → free per-profile mirroring + backups); age rides the people registry. Also fixed `renameProfile`/`setProfileTier` rebuilding registry objects and dropping extra fields (would have lost `age`). |
| `a31b1c8` | **feat(structure)**: de-fragmentation (the "disjointed" complaint). Arm iframe group routing extended from 2 to 3 groups via `TAB_GROUPS` map: **ARM** (Overview, J-Bands, Shoulder Tube, PlyoCare, Long Toss, Schedule, Sources, History) / **DRILLS** (Washington) / **BODY** new 🧘 bottom tab (Recovery, Daily Extras = TB12 + Flexibility + Bauer Intl + Integration). No data migration — completion stays in the shared `data-ex` store. Plus 🏁 **TODAY scoreboard** atop GAME: arm/drills/body done-bars + water/protein intake bars + day type, rows tap-through to their tabs; fuel app mirrors totals to host via new `bat-fuel` postMessage. |

All four verified in headless Chromium (Playwright): zero console errors; youth plan
clean of supplements; 85 pitches @ age 12 → RESTING, 4 rest days; BODY group filtering
correct; scoreboard populated.

## 3. Open items explicitly deferred to the LOCAL session

These were requested but are impossible from the cloud container:

1. **Read `HANDOFF.md`** (gitignored, never pushed — cloud can't see it) and reconcile:
   re-introduce/fix any concepts from it that the app failed to apply. *(User item 2.0/3.0 — still open.)*
2. **Convert `~/.copilot` + `~/copilot-subagents` profiles into `.claude/` format** for
   this repo: `.claude/agents/*.md`, `.claude/commands/*.md`, plus a root `CLAUDE.md`.
   - Segregate/exclude the AutoHotkey-specific material (those profiles are AHK-v2-focused;
     battery is an HTML PWA).
   - Note: Claude Code auto-loads `CLAUDE.md` and `.claude/{agents,commands}` — it does
     **not** read `.copilot/` prompt files, so conversion (not just copying) is required.
   - Once committed & pushed, future **web** sessions get them too (this session couldn't:
     `OvercastBTC/copilot-subagents` was outside its repo scope — access denied).
3. Consider committing a sanitized, deployable subset of HANDOFF content as `CLAUDE.md`
   so project context stops being invisible to cloud sessions.

## 4. Product backlog (review findings, priority order)

1. **Iframe dialog conversion** — ~9 native `confirm/alert` remain inside the two iframes
   (fuel: event remove, day reset, profile validation/clear, import; arm: day reset, import).
   Either inject a small modal into each iframe or postMessage up to the host's `batteryModal`.
2. **File decomposition / build step** — the single 503 KB file with two *escaped-srcdoc*
   apps inside is the biggest engineering risk; every sub-app edit means editing
   `&quot;`-escaped markup. Even a trivial build script (3 real HTML files → concatenate →
   `index.html`) de-risks all future work while keeping single-file deployment.
3. **Game-day local notifications** — ICS export exists; Notification API works in iOS
   standalone PWAs ≥ 16.4. "T-45 water only" pings would close the loop.
4. **Weekly report card** — Sunday-night summary card (arm-care streaks, fuel target hit
   rate, outings/pitch counts). Data already exists. Pairs with the backup-staleness guardian.
5. **Arm Guardian v2** — catcher workload (Pitch Smart also restricts catching after
   pitching and vice-versa), bullpen-vs-game weighting, auto-link outings to FUEL events,
   backdated outing entry (current modal logs today only).
6. **Verify the Pitch Smart table** against pitchsmart.org — implemented from model
   knowledge; bands matched published USA Baseball values at authoring time, but spot-check
   before a real season. The 19+ band reuses the 19–22 college guideline (labeled as such in UI).
7. **Minor**: static `#youth-banner` fallback text still says "Kole (6, active)" (runtime
   overwrites it); `deviceInfo()` screen-size→model table will age — consider dropping the
   model guess; fuel iframe's youth gating relies on `BATTERY_TIER` injection at reload —
   worth a regression test.

## 5. Surprise-feature ideas considered but NOT built (candidates for later)

- Unified "Daily Readiness" score (arm-care completion + fuel + sleep input).
- Guided "Flow mode": one-tap walkthrough of today's items across all tabs.
- Arm-care streak heatmap (GitHub-style) in History.

## 6. Technical notes a fresh session will need

- **Architecture**: host shell (last `<script>` block, plain JS, easy to edit) + 2 iframes
  via `srcdoc` attribute (HTML inside is `&quot;`-escaped; arm script uses **raw** `&&`,
  fuel script uses `&amp;&amp;` — match local style when editing; single quotes are safe).
- **postMessage protocol**: host→arm `{type:'bat-group',group:'arm'|'drills'|'body'}`;
  arm→host `{type:'bat-counts',arm,drills,body}` (each `{done,total}`); fuel→host
  `{type:'bat-fuel',water,protein,tWater,tProtein,day}`.
- **Profiles**: registry `battery-people` = `[{id,name,tier,age?}]`; active id in
  `battery-profile`; live keys (prefixes `fuel-`, `arm-care-`) mirror to
  `battery::<id>::<key>` every 4 s + on pagehide (`persistLive`); `battery-live-owner`
  guards the boot-time snapshot. **Always preserve unknown registry fields when mapping**
  (`Object.assign({},x,{...})`).
- **Safety gates**: youth tier hides supplements/stimulants/macro targets — every new
  feature must respect `profileTier(profile)==='youth'` (never hardcode names) and the
  scoreboard/fuel pattern of suppressing protein targets for youth.
- **Release convention**: bump `#ver-stamp` (`YY.MM.DD.NN`) **and** the SW cache name
  `battery-vNN` (template literal in the PWA block) in every user-facing change; commit
  messages follow `type(scope): summary` with the stamp noted.
- **Testing recipe** (cloud used this; works anywhere with Playwright):
  `chromium.launch()` → `file://…/index.html` → create athlete via `#first-run` → drive
  tabs/frames (`frameLocator('#f-arm')`) → assert + collect `pageerror`/console errors.
- **Backups**: full-state export includes `battery::*` + meta keys (`BACKUP_META_KEYS`);
  in-app auto-snapshot every 2 min (`battery-auto-snapshot`); staleness guardian flags
  DATA tab when file backup > 7 days old.

## 7. Suggested order of work for the local session

1. `git pull origin master`
2. Read `HANDOFF.md`; diff its concepts against §2/§4 above; fix gaps (user item 3.0).
3. Build `.claude/` + `CLAUDE.md` from the copilot profiles (§3.2), AHK material segregated.
4. Then take backlog §4 top-down (iframe modals → build-step decomposition first).
