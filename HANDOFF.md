# BATTERY — Development Handoff

> **Purpose:** Source-of-truth context so a second agent (or human) can safely take over development of the BATTERY app.
>
> **Status of this document:** This is a STUB. Sections marked **[VERIFIED]** were derived directly from `index.html` by static inspection and are trustworthy. Sections marked **[NEEDS AUTHOR INPUT]** must be completed by the original authoring tool (Claude Desktop / Opus), which holds the design rationale, content provenance, and roadmap. Do not treat empty sections as "nothing to know."

---

## 1. What this is — [VERIFIED]

- A single-file, installable PWA: **`index.html`** (~450 KB) served via **GitHub Pages** at <https://overcastbtc.github.io/battery/>.
- Repo: `OvercastBTC/battery`, default branch **`master`**, deploy = branch `master`, folder `/` (root).
- No build system, no bundler, no dependencies, no tests. Vanilla HTML/CSS/JS + `localStorage`.
- Baseball **arm-care + nutrition/hydration ("fuel")** training tool, with a **Game Day** fusion view.

## 2. Architecture map — [VERIFIED structure / NEEDS AUTHOR INPUT for intent]

Three apps composed in one file:

| Component | Location in file | Role |
| --- | --- | --- |
| **Host shell** | top-level HTML + 3 `<script>` blocks (around lines 2608, 5713, 7814) | Tab bar (ARM / FUEL / GAME), profile switcher, Game Day fusion, PWA/service-worker registration |
| **`f-arm` iframe** | `id="f-arm"`, `srcdoc=` (~line 64) | Arm-care protocol app (J-bands, shoulder tube, plyo, long toss, Washington drills, recovery, schedule, sources) |
| **`f-fuel` iframe** | `id="f-fuel"`, `srcdoc=` (~line 2952) | Nutrition/hydration tracker (protein, water, shakes, events, weekly, sources) |
| **`view-game`** | `<section id="view-game">` (~line 7798) | Game Day fusion: back-builds prep timeline from first pitch; ICS calendar export |

- **iframe embedding:** both sub-apps are embedded via the `srcdoc` attribute. **All inner HTML is HTML-entity-escaped** (e.g. `&quot;` for `"`). Editing inside an iframe requires preserving/redoing this escaping or the app breaks silently. **This is the #1 footgun.** [VERIFIED]
- Host ↔ iframe communication mechanism: **[NEEDS AUTHOR INPUT]** (confirm whether postMessage, shared localStorage, or `reloadFrames()` srcdoc re-injection is the only channel — inspection suggests srcdoc re-injection via `reloadFrames()`).

## 3. Data model & migrations — [VERIFIED keys / NEEDS AUTHOR INPUT for rules]

**Per-profile namespacing:** active working keys are mirrored into `battery::<profileId>::<key>` on profile switch. Profiles seen: **`adam`** (adult) and **`kole`** (youth, age 6). [VERIFIED]

Core/registry keys [VERIFIED]:

- `battery-profile` — active profile id
- `battery-people` — JSON array of `{id,name}` profiles
- `battery-seeded-v11` — one-time seed guard
- `battery-fix-v16` — migration/fix guard
- `battery-install-dismiss`, `battery-hist-open`, and other UI-state keys (`battery-hist`, `battery-fav-strip`, `battery-dayedit`, `battery-train-modal`, `battery-verdict`, `battery-runway`)

Arm-care keys [VERIFIED]: `arm-care-done-*`, `arm-care-pos`, `arm-care-bonus`, `arm-care-traindays`, `arm-care-streak`, `arm-care-total`, `arm-care-last-tab`, `arm-care-last-date`, `arm-care-collapsed`

Fuel keys [VERIFIED]: `fuel-entries-*`, `fuel-day-*`, `fuel-profile`, `fuel-events`, `fuel-favorites`, `fuel-last-tab`, `fuel-train-*`, `fuel-goalsnap-*`, `fuel-collapsed`, `fuel-prompt-dismissed`

**Key prefixes that get profile-snapshotted:** `fuel-`, `arm-care-` (see `PREFIXES` / `liveKeys()` / `snapshotCurrent()` / `restoreProfile()`). [VERIFIED]

**CRITICAL INVARIANT (must never break):** changing namespacing, prefixes, or seed/fix guard names can silently wipe users' logged data. Rules for safely adding a key or shipping a migration: **[NEEDS AUTHOR INPUT]** — document the exact procedure and bump convention (e.g. `battery-fix-v17`).

## 4. Profiles system — [NEEDS AUTHOR INPUT]

- `getPeople()/setPeople()/newPerson()/removePerson()/setProfile()/restoreProfile()/snapshotCurrent()` exist. [VERIFIED]
- Adult (`adam`) vs youth (`kole`) tiers: youth mode hides supplements/stimulants and shows food-based fuel. Document the full tier ruleset and what `body.youth` / `reloadFrames()` tier logic changes. **[NEEDS AUTHOR INPUT]**

## 5. Domain / content provenance — [NEEDS AUTHOR INPUT — SAFETY SENSITIVE]

Arm-care protocols and fuel dosing/volumes (including the youth profile) are health-adjacent. Provide:

- Sources/citations behind each protocol, dose, and volume.
- Which values are **safety-critical** and must not change without re-verification.

Do not fabricate; mark anything uncertain **UNVERIFIED**.

## 6. Conventions — [VERIFIED partial]

- ~144 top-level functions in the host shell. Helpers include `esc()`, `wrap()`, `storeGet()/storeSet()`, time helpers (`fmt`, `fmtTime`, `parseHM`, `hm`, `pad`), ICS export (`exportGameICS`). [VERIFIED]
- Naming/style guide, escaping helper usage inside `srcdoc`, ICS format details: **[NEEDS AUTHOR INPUT]**

## 7. PWA / caching — [VERIFIED]

- Service worker cache name: **`battery-v1`** (inline SW via Blob URL). Cache-first with network fallback.
- **Implication for testing:** an installed PWA may serve stale cache. Document how to force-refresh / bump cache version when shipping changes. **[NEEDS AUTHOR INPUT]**

## 8. Known issues / TODO / roadmap — [NEEDS AUTHOR INPUT]

- "DAILY EXTRAS" page appears to be a placeholder. Confirm and list intended next features.

## 9. Safe-edit checklist — [VERIFIED workflow]

1. Author change → place new `index.html` in `~/Downloads` (or edit `~/battery/index.html` directly).
2. `cd ~/battery && diff -q ~/Downloads/index.html index.html` to confirm a real change.
3. Sanity-check: title is `BATTERY`, file starts with `<!DOCTYPE html>`, ends with `</html>`.
4. `git add index.html && git commit -m "..." && git push origin master`.
5. Verify live: poll `https://overcastbtc.github.io/battery/` until served byte-size matches the new file.
6. If editing **inside** an iframe `srcdoc`, re-verify HTML-entity escaping (`&quot;` etc.).
7. If data-model touched, follow the migration rules in §3 (bump a `battery-fix-vN` guard) **[NEEDS AUTHOR INPUT]**.

---

### Operating facts (current)

- Local clone: `~/battery`, SSH remote `git@github.com:OvercastBTC/battery.git`.
- Commit identity: `OvercastBTC` / `107888697+OvercastBTC@users.noreply.github.com`.
- Git history is currently 7 full-file replacements ("Update BATTERY app to latest version") authored externally — **no per-feature rationale exists in history.** This handoff is meant to replace that missing context.
