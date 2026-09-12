# BATTERY — Application Specification

**Version:** 26.09.11.119 (as of this writing)  
**Author:** Q (Opus 4.6)  
**Date:** 2026-09-11  
**Live URL:** https://overcastbtc.github.io/battery/

---

## 1. What BATTERY Is

BATTERY is a **baseball arm-care and nutrition/hydration tracker** built as a
Progressive Web App (PWA). It is designed for baseball players — both adult
athletes and youth athletes (under ~13) — to manage their daily training
readiness, arm-care routines, nutrition tracking, and game-day preparation.

**Target users:** A parent/coach managing their own training alongside a
youth athlete's development. The multi-profile system supports both on one
device.

**Platform:** Mobile-first (iPhone primary), installable via "Add to Home
Screen." Works offline via Service Worker. No app store. No backend server.
All data is stored in the browser's `localStorage`.

---

## 2. Application Architecture

### 2.1 Runtime structure

```
┌─────────────────────────────────────────────┐
│  HOST SHELL (index.html)                    │
│  ┌──────────────┐  ┌──────────────────────┐ │
│  │  Top bar      │  │  Tab bar (bottom)    │ │
│  │  Profile sel. │  │  HOME FUEL ARM ...   │ │
│  └──────────────┘  └──────────────────────┘ │
│                                             │
│  ┌──────── Views (one visible at a time) ──┐│
│  │  TODAY (HOME)  — readiness ring, plan   ││
│  │  GAME DAY      — schedule builder       ││
│  │  DATA/SETTINGS — profiles, backup       ││
│  │                                         ││
│  │  ┌──────────── ARM iframe ────────────┐ ││
│  │  │  Arm Care | Drills | Body Stack    │ ││
│  │  │  (pages: overview, jbands, warmup, │ ││
│  │  │   shouldertube, plyo, longtoss,    │ ││
│  │  │   gameday, fieldwork, washington,  │ ││
│  │  │   recovery, schedule, sources,     │ ││
│  │  │   extras, history, lifting)        │ ││
│  │  └────────────────────────────────────┘ ││
│  │                                         ││
│  │  ┌──────────── FUEL iframe ───────────┐ ││
│  │  │  Nutrition + Hydration tracker     │ ││
│  │  │  (day log, quick-adds, history,    │ ││
│  │  │   events, protein banking, runway, │ ││
│  │  │   recovery boost, heat risk)       │ ││
│  │  └────────────────────────────────────┘ ││
│  └─────────────────────────────────────────┘│
└─────────────────────────────────────────────┘
```

### 2.2 Technology stack

| Layer | Technology |
|---|---|
| Language | Vanilla JavaScript (ES5/6 mix, no transpiler) |
| Styling | Vanilla CSS (CSS custom properties for theming) |
| Bundler | None — hand-edited, no build step |
| Framework | None — vanilla DOM manipulation |
| Storage | `localStorage` (all data client-side) |
| Offline | Service Worker (`sw.js`) with cache-on-fetch strategy |
| Hosting | GitHub Pages (static files from `master` branch) |
| Deploy | `git push` to `master` — instant deploy |

### 2.3 File inventory (current)

```
battery/
  index.html              17,036 lines — the monolith (host + 2 iframes)
  sw.js                   31 lines — service worker
  manifest.webmanifest    13 lines — PWA manifest
  favicon.ico             app icon
  icon-180.png            Apple touch icon
  icon-192.png            Android icon
  icon-512.png            Splash icon
  apple-touch-icon-*.png  iOS icon variants (120, 152, 167)
  clips/                  Embedded training video clips
  tools/                  Static gate scripts (srcdoc-integrity, clip-config)
  pwa-probe/              PWA detection probe page
```

### 2.4 iframe communication (postMessage seam)

The host and iframes communicate via `window.postMessage`. Messages use a
`type` field to route:

| Direction | Message type | Purpose |
|---|---|---|
| Host → ARM | `bat-group` | Switch visible section (arm/drills/body) |
| Host → ARM/FUEL | `bat-nav` | Switch to a specific tab within the iframe |
| Host → ARM/FUEL | `bat-poll` | Request current state (counts, fuel progress) |
| ARM → Host | `bat-counts` | Activity completion counts per group |
| FUEL → Host | `bat-fuel` | Water/protein totals + targets + runway state |
| Host → FUEL | `bat-editday` | Open FUEL's day editor for a specific date |
| Host → FUEL | `bat-plan` | Sync the day-type (rest/train) from host plan |

### 2.5 Data model

All data is in `localStorage`. Key prefixes are contracts:

| Prefix | Owner | Content |
|---|---|---|
| `fuel-` | FUEL iframe | Daily nutrition logs, targets, profile |
| `arm-care-` | ARM iframe | Completion checks, history, arm feel |
| `battery-plan-` | Host | Per-date training plan flags |
| `battery::` | Host | Namespaced per-profile data mirror |
| `battery-profile` | Host | Active profile ID |
| `battery-people` | Host | Profile registry (JSON array) |

**Multi-profile architecture:** Each profile's data is namespaced as
`battery::<profileId>::<key>`. A `snapshotCurrent()` / `restoreProfile()`
cycle copies live (un-prefixed) keys into/out of the namespace on profile
switch. This means one device, many athletes, no data collision.

---

## 3. Features — Host Shell

### 3.1 HOME (Today view)

The default landing screen. Shows the athlete's daily readiness at a glance:

- **Readiness ring** — Circular progress gauge (0–100%) computed from
  completed arm care + drills + body + fuel items for today.
- **Plan chips** — Toggle buttons for today's training plan: ARM, DRILLS,
  BODY, LIFT. Checked items determine what "100%" means (a rest day with
  only FUEL toggled is 100% when water + protein are hit).
- **Flow button** — "START TODAY'S FLOW" or "RESUME: [next item]." Opens
  the ARM iframe in a guided, step-by-step sequence mode.
- **Section quick-links** — Direct access to ARM, DRILLS, BODY, LIFT, GAME.
- **Youth cards** — If the active profile is an adult with a youth profile
  on the device, a summary card for the youth's readiness appears. §4.3
  prevents this card from appearing on the youth's own HOME.
- **Sleep tracking** — Hours-of-sleep buttons (for the previous night),
  with a 7-day trend.

### 3.2 GAME DAY

Builds a fused prep schedule working backward from first pitch:

- Pick a game from saved events, or enter date/time manually.
- Generates a timeline of arm-care (red) and fuel (gold) prep events,
  each with a countdown ("3h 20m before first pitch").
- **Export to calendar** — ICS file generation for the prep schedule.
- **Scoreboard** — Today's arm-care + fuel completion summary.
- **3-Day Outlook** — Upcoming schedule for the next 3 days.
- **Arm Guardian** — Pitch Smart rest-day enforcement. Reads pitch counts
  from the arm-care history and displays mandatory rest periods based on
  the athlete's age bracket (per USA Baseball Pitch Smart guidelines).
- **Season card** — Summary stats across the current season window.

### 3.3 DATA / SETTINGS

- **Whole-App Backup** — Exports every profile into a single `.json` file.
  Supports the iOS share sheet ("Save to Files") as well as direct download.
- **Restore from Backup** — Imports a `.json` backup, replacing all data.
- **Auto-Snapshot** — In-app rolling restore point (every 2 minutes +
  on background/close). Insurance against accidental deletion.
- **Backup staleness guardian** — Amber dot on the Settings gear if no
  file backup exists or the last one is >7 days old.
- **Profile management** — Add, rename, delete athletes. Toggle youth/adult
  tier. Per-profile stored key count displayed.
- **Athlete Details (demographics)** — Height, weight, age, sex, frame,
  goal (preserve/build/cut), hot-climate flag, stimulant flag, GLP-1 med.
  These values directly drive FUEL's macro and hydration calculations.
  Youth profiles show only height/weight/age/sex (§4.3).
- **TRT-Aware Hydration** — Adult-only. Tracks hematocrit %, last bloodwork
  date. Provides hydration and lab-reminder guidance (informational, not
  medical advice — explicit disclaimer).
- **Training Consistency** — 12-week completion heatmap/trend.
- **This Week in Review** — Weekly training summary card.
- **Device & Install** — Shows PWA mode, screen dimensions, device guess.
- **Feedback & Feature Requests** — Bug report + feature request buttons.

### 3.4 Navigation

- **Tab bar** (bottom, fixed) — HOME and FUEL are tabbar buttons.
  ARM, DRILLS, BODY, GAME are accessed via HOME quick-links or the
  section breadcrumb.
- **Section breadcrumb** — Shows when inside ARM/DRILLS/BODY/GAME/DATA
  with a back arrow to HOME.
- **Profile switcher** — In the top bar. Single profile: static name.
  Multiple profiles: native `<select>` dropdown.
- **Gear icon** — Links to DATA/SETTINGS. Shows amber warning dot when
  backup is stale or storage is near capacity.

### 3.5 PWA Infrastructure

- **Service Worker** (`sw.js`) — Cache-first strategy. Caches every
  fetched URL on first load. Cache name `battery-v<NN>` bumped on
  every release to invalidate stale content.
- **Install prompt** — iOS Safari: "Share → Add to Home Screen" banner.
  Shown once, dismissible.
- **Viewport fix** — Workaround for WebKit `env(safe-area-inset-bottom)`
  bug on notched iPhones in standalone mode. Probe-based measurement
  with retry burst for timing-dependent inset availability.
- **Icon update nudge** — When icon art changes between versions, prompts
  existing installed users to re-add the PWA (iOS bakes the icon at
  install time).
- **Storage risk detection** — Monitors `localStorage` usage percentage.
  Warns when approaching quota. Alerts when writes are failing.

---

## 4. Features — ARM Iframe

The ARM iframe covers all physical training content:

### 4.1 Section groups

The ARM iframe's content is organized into three groups, each containing
multiple tabbed pages:

**ARM (arm care):**
- **Overview** — Summary dashboard, daily status.
- **J-Bands** — Resistance band exercises. Ordered by tissue-need
  progression. Optional J-Band Extras (JX) toggle. Configurable exercise
  sets with per-step completion tracking.
- **Warmup** — Pre-throwing arm-care warmup routine.
- **Shoulder Tube** — Shoulder tube exercises.
- **PlyoCare (Plyo)** — Weighted-ball training drills. Heavy plyo balls
  gated behind youth check (§4.3 — `body.youth` hides `.plyo-heavy`).
- **Long Toss** — Long toss distance progression program.
- **Game Day Warm-Up** — Pre-game arm prep routine.

**DRILLS (position + fielding):**
- **Washington Drills** — Fielding fundamentals. Simple vs. Full method
  toggle (owner customization). Track-based progressive system.
- **Field Work** — Position-specific field practice.

**BODY (physical care):**
- **Recovery** — Post-training recovery routine.
- **Extras** — Bauer International content, flexibility, integration,
  supplementary sources.
- **Lifting** — Strength training program. Customizable exercise groups
  with split-day support. Dropdown exercise selector per movement.
  Completion tracking. Youth gate: heavy lifts hidden.
- **History** — Arm-care completion history. Arm Feel tracking (3-point
  scale: great/ok/sore). Feel trend visualization over time.

### 4.2 Flow mode

"Flow" is a guided, step-by-step walk-through of the day's arm care:

- Builds a linear sequence from all active steps across all pages,
  filtered by the day's plan (if LIFT is off, lifting steps are excluded).
- Each step shows the current exercise with check-off, previous/next nav.
- The host's "START FLOW" button on HOME launches this from the ARM iframe.
- Steps can be optional (`data-optional`), configurable via sets, or
  disabled by the J-Band Extras toggle.

### 4.3 Clip playback

Training videos embedded in exercise steps:
- `CLIP_SOURCE` maps clip names to video credit/attribution.
- `OFFICIAL_DEMOS` maps exercise names to video IDs + start/end timestamps.
- Clips load in a modal overlay within the ARM iframe.
- Attribution is unconditional — every clip must resolve to a credit.

### 4.4 ARM data

- Completion stored per step per date in `arm-care-<stepKey>-<date>`.
- Arm Feel stored as `arm-care-feel-<date>` (values: `'3'` great, `'2'` ok,
  `'1'` sore — numeric codes as strings).
- Lifting log stored per group per date.
- Export/import for arm-care data (within iframe).

---

## 5. Features — FUEL Iframe

The FUEL iframe is the nutrition and hydration tracker:

### 5.1 Daily tracking

- **Water** — Quick-add buttons (8oz, 12oz, 16oz, 24oz, 32oz, custom).
  Running total vs. daily target. Target computed from demographics
  (weight, hot-climate flag, stimulant flag, GLP-1 adjustment).
- **Protein** — Quick-add buttons for common foods (chicken, eggs, protein
  shake, etc.) with gram values. Running total vs. daily target. Target
  computed from demographics (weight, goal, training day vs. rest day).
  **Hidden for youth profiles (§4.3).**
- **Day type** — Rest, Train, Game, Travel. Affects macro targets.
  Synced from the host's plan via `bat-plan` message.

### 5.2 Smart features

- **Recovery Boost** (`recoveryBoost()`) — Auto-detects a hard throw or
  heavy lift yesterday. Floors Rest/Light day protein to Train-day level
  to support recovery. Adult only.
- **Protein banking** — Tracks whether the athlete is ahead or behind on
  weekly protein averages. Visual bank balance. Adult only.
- **Pre-training runway** — Countdown to optimal eat/drink window before
  training. State: `none` (no event), `active` (within window), `now`
  (time to act). Communicated to host via `bat-fuel` message.
- **Heat risk assessment** — Factors in temperature, humidity, activity
  level. Adjusts water target. Warning system for dangerous conditions.
- **Pace line** — Shows whether the athlete is on pace for their daily
  water/protein targets at the current time of day.
- **Status flags** — Visual indicators for training status (rest day,
  game day, GLP-1, stimulant, hot climate, TRT).

### 5.3 History & events

- **Day history** — Browse past days, see what was logged, edit entries.
- **Events** — Calendar of games, practices, events. Used by the host's
  Game Day fusion scheduler.
- **Favorites strip** — Quick-access buttons for frequently logged items.
- **Custom items** — User-defined food/drink items with custom gram values.

### 5.4 FUEL data

- Daily logs: `fuel-<date>` — JSON with water oz, protein grams, items.
- Profile: `fuel-profile` — Demographics (height, weight, age, sex, frame,
  goal, hot-climate, stimulant, GLP-1).
- Tracked areas: `fuel-tracked` — Which metrics are active (water, protein).
- Events: `fuel-events` — Calendar events list.
- Last throw: `fuel-lastthrow` — Date of last hard throwing session.
- Day verdicts: rendered per-day based on logged vs. target ratios.

---

## 6. Youth Safety Gate (§4.3)

A non-negotiable child-safety boundary. Youth-tier profiles must never see:

- Supplement or stimulant content
- Dosing information
- Quantified macro targets (protein grams, calorie counts)
- Heavy weighted-ball content (PlyoCare heavy balls)
- TRT-related content
- GLP-1 medication content
- Protein banking

**Implementation:**

1. **Host** injects `window.BATTERY_TIER` (`'youth'` | `'adult'`) into
   iframes. Toggles `body.youth` on the host.
2. **FUEL iframe** sets `body.fuel-youth`. CSS hides `.qa-adult` elements.
   `switchTab()` youth guard blocks navigation to gated tabs.
3. **ARM iframe** hides `.plyo-heavy` behind `body.youth`. Shows a
   light-catch/play-only note instead.
4. **Host** hides adult-only cards and settings for youth profiles.
5. **Boot fail-safe** (line 216) defaults to youth surface before iframes
   parse, so a youth never flashes adult content during boot.
6. **Import sanitizer** strips `lift:true` from plan flags for youth
   profiles on backup restore.

**Rule:** Every new nutrition or training-load surface must add a youth
variant or gate.

---

## 7. Multi-Profile System

- **Profile registry** — `battery-people` in `localStorage`. Array of
  `{id, name, tier}` objects.
- **Active profile** — `battery-profile` stores the current profile ID.
- **Namespace isolation** — All profile data is mirrored to
  `battery::<id>::<key>` on switch. `snapshotCurrent()` saves live keys
  to namespace; `restoreProfile()` loads namespace keys to live.
- **Profile switch** — `setProfile(p)` snapshots current, sets new
  profile, restores its data, reloads both iframes, rebuilds all views.
- **First-run flow** — Modal overlay for creating the first athlete.
  Checkbox for youth tier. Option to restore from backup or load demo data.

---

## 8. Design Language

- **Color scheme:** Dark mode only (ink `#0d1117` background).
- **Palette:** Gold accent (`#d4a017`), blood red (`#da3633`), green
  (`#3fb950`), blue (`#58a6ff`), steel grays.
- **Youth override:** Gold → Green (`--gold:#2fd66b`, `--goldb:#6ef2a0`)
  on `body.youth`, applied to host chrome and both iframes.
- **Typography:** System font stack (`-apple-system, BlinkMacSystemFont,
  "SF Pro Text", system-ui, sans-serif`). Monospace for data: `"SF Mono",
  ui-monospace, monospace`.
- **Cards:** `.gd-card` — steel background, line border, 14px radius.
  Gold border for emphasis. Green border for youth-specific cards.
- **Tab icons:** Radial-progress SVG rings per tab, filling as the
  stream completes. Dual ring on FUEL (water outer blue, protein inner
  amber). Glow animation at 100%. "Fully charged" sweep when all streams
  complete for the day (once per day).

---

## 9. Pitch Smart Integration

BATTERY implements the **USA Baseball Pitch Smart** guidelines:

- Age-bracket lookup table (`PITCH_SMART` array) covering ages 7–22.
- Per-age pitch count limits and mandatory rest-day thresholds.
- **Arm Guardian** on the GAME DAY view reads pitch-count history and
  enforces rest periods. Displays remaining rest time and cleared date.
- **Youth Arm Guardian** — Same Pitch Smart table, surfaced prominently
  for youth profiles with age-appropriate messaging.

---

## 10. Backup & Data Safety

### Data loss vectors and mitigations

| Risk | Mitigation |
|---|---|
| App deleted/reinstalled | File backup (`.json` export) |
| In-app data corrupted | Auto-snapshot (2-min rolling restore point) |
| Fat-finger profile delete | Confirmation modal + auto-snapshot |
| Safari ↔ PWA data split | Warning in DATA view + backup/restore flow |
| Storage quota exceeded | Risk detection + warning dot on gear icon |
| Backup forgotten | Staleness guardian (>7d = amber warning) |

### Backup format

```json
{
  "app": "battery",
  "kind": "full-backup",
  "schema": 1,
  "exportedAt": "ISO-8601",
  "activeProfile": "profileId",
  "profiles": ["id1", "id2"],
  "data": { "key": "value", ... }
}
```

All `battery::*` namespaced keys + meta keys included. Restore is
destructive (replaces all data) with confirmation modal.

---

## 11. What Best Practices Would Have Looked Like

If this app were built from scratch following industry standard practices,
the architecture would use:

### 11.1 File organization (what ADR-001 implements)

```
battery/
  index.html          Host shell (~2,700 lines)
  arm.html            ARM iframe (~7,300 lines)
  fuel.html           FUEL iframe (~7,000 lines)
  sw.js               Service worker
  manifest.webmanifest
  ...icons
```

Further split (Phase 2):
```
battery/
  index.html          Host shell (HTML only, ~200 lines)
  css/host.css        Host styles
  js/host.js          Host logic
  arm/
    index.html        ARM (HTML only)
    arm.css            ARM styles
    arm.js             ARM logic
  fuel/
    index.html        FUEL (HTML only)
    fuel.css           FUEL styles
    fuel.js            FUEL logic
```

### 11.2 What was done right (keep these)

- **No build step.** A bundler adds complexity that a single-dev PWA
  doesn't need. Static files on GitHub Pages is the right call.
- **No framework.** Vanilla JS for a tracker app this size is defensible.
  React/Vue would add bundle size, build tooling, and learning curve
  with no proportional benefit.
- **localStorage for everything.** No backend, no auth, no server costs.
  For a personal training tracker, this is exactly right.
- **PWA with Service Worker.** Offline-first is the correct architecture
  for a training app used at the field.
- **iframe isolation.** ARM and FUEL have genuinely separate concerns.
  Iframes give them separate DOMs and prevent CSS/JS collision.
- **Multi-profile via namespacing.** Simple, effective, no backend needed.
- **Youth safety gate.** Fail-safe default (youth on uncertainty) is the
  right pattern for child-safety gating.

### 11.3 What should change (ADR-001 scope)

- **`srcdoc` → `src`** — Eliminates the #1 class of silent bugs. Normal
  HTML files in normal editors with normal tooling.
- **Separate files** — Diffs become readable. Lane ownership maps to file
  ownership. IDE features (syntax highlighting, linting, Go to Definition)
  work properly.
- **`node --check` becomes trustworthy** — Currently it can't catch srcdoc
  truncation. With separate files, it validates what it claims to validate.

### 11.4 What could change later (not in current scope)

- **CSS custom properties as a design token file** — Extract the `:root`
  vars into a shared `tokens.css` imported by all three files.
- **ES modules** — Replace inline `<script>` blocks with `type="module"`
  imports. Enables tree-shaking and proper dependency graphs.
- **TypeScript** — Type safety for the postMessage seam and localStorage
  data model. Would catch the cross-seam vocabulary bugs (§7 of CLAUDE.md)
  at compile time.
- **IndexedDB** — For larger data (video cache, detailed history). Only
  needed if localStorage quota becomes a problem.
- **Capacitor** — Native wrapper for iOS/Android. Only needed if offline
  video storage exceeds PWA cache limits (~50–100MB per origin).

---

## 12. Version & Release

- **Version stamp:** `#ver-stamp` element, format `YY.MM.DD.NN`.
- **SW cache:** `battery-v<NN>` in `sw.js`, bumped in lockstep with stamp.
- **Release process:** Lane E merges → full Playwright gate (28+ suites,
  350+ checks) → stamp + cache bump → commit → push to `master` → live.
- **Single writer of master:** Lane E {AM06} only.
- **Playwright gate:** Authoritative test suite at `~/battery-tests/run.sh`.
  Covers iframe rendering, persistence, export/import, profile management,
  youth gating, flow mode, clip playback, arm guardian, consistency,
  week reports, recovery boost, and more.
