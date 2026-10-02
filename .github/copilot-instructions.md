# BATTERY — Copilot Project Instructions

## What BATTERY Is

Split-build installable PWA: three hand-edited HTML files, no bundler.
Baseball arm-care + nutrition/hydration tracker (profiles: adult / youth).
Deployed via GitHub Pages from `master`: https://overcastbtc.github.io/battery/

## Architecture

Three standalone HTML files loaded via `src=` iframes (NOT `srcdoc=`):

| File | Role | Size |
|------|------|------|
| `index.html` | Host shell: nav, profiles, scoreboard, postMessage routing, SW | ~2,950 lines |
| `arm.html` | ARM iframe (`#f-arm`): arm care, drills, body, PlyoCare, recovery, warmup | ~8,400 lines |
| `fuel.html` | FUEL iframe (`#f-fuel`): nutrition, hydration, supplements, day scoring | ~7,000 lines |

All three share the same origin and localStorage. There is NO bundler. Edits go directly to standalone HTML files. Double-quotes are just double-quotes — no escaping needed.

## Youth Safety Gate (CRITICAL)

A youth-tier profile MUST NEVER see: supplement / stimulant / dosing / quantified macro target / heavy-weighted-ball content.

- Host writes `localStorage.setItem('battery-boot-tier', tier)` before iframes load
- FUEL: `body.fuel-youth` class hides `.qa-adult` elements; `switchTab()` blocks adult tabs
- ARM: `.plyo-heavy` gated behind `body.youth`

**Every new nutrition or training-load surface must add a youth gate.**

## Data Model Invariants

**Key prefixes — NEVER rename (orphans user data):**
- ARM data: `arm-care-` prefix
- FUEL data: `fuel-` prefix
- Per-profile: `battery::<profileId>::<key>`

New localStorage keys MUST start with one of these prefixes. `liveKeys()` snapshots only prefixed keys — unprefixed keys silently vanish on profile switch.

## PostMessage Seam

Keep these shapes in lockstep on BOTH sides:

| Direction | Shape |
|-----------|-------|
| host → ARM | `{type:'bat-group', group:'arm'\|'drills'\|'body'}` |
| ARM → host | `{type:'bat-counts', arm, drills, body, lift}` |
| FUEL → host | `{type:'bat-fuel', water, protein, tWater, tProtein, day, runway}` |
| FUEL → host | `{type:'bat-notif', title, body, tag}` |
| host → iframe | `{type:'bat-nav', tab}` |
| host → iframe | `{type:'bat-poll'}` |
| host → FUEL | `{type:'bat-editday', date}` |
| host → FUEL | `{type:'bat-plan', day}` |

If you change any message shape, update BOTH sender and receiver.

## Testing

Full Playwright gate (36 suites): `~/battery-tests/run.sh`
All 36 must pass before any release. Lane A runs for validation; Lane E runs as part of the release pipeline.

## Lane Roles

| Lane | Scope |
|------|-------|
| Lane A | ARM + FUEL iframe content. Does NOT commit to master. |
| Lane E | Host shell + sole release engineer (merge, gate, stamp, push). Single writer of master. |
| Lane M | Media/clips only. Does NOT touch iframe JS or UI. |
| Q | Sysadmin, triage, routing. Owns no worktree. |

## Key Rules

1. Never rename existing localStorage or postMessage keys
2. Every new nutrition/supplement surface needs `class="qa-adult"` or equivalent youth gate
3. Schema changes require one-time idempotent migration guards
4. Only Lane E commits to master and pushes to origin
5. 36/36 Playwright gate required before any release
