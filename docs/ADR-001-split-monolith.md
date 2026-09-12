# ADR-001: Split the index.html monolith

**Status:** PROPOSED  
**Author:** Q (Opus 4.6)  
**Date:** 2026-09-11  
**Reviewers:** Lane A {AM06}, Owner  
**Supersedes:** n/a

---

## Context

`index.html` is 17,036 lines — a single HTML file containing:

| Region | Lines | Content |
|---|---|---|
| Host `<head>` + CSS | 1–215 | ~215 lines of meta + styles |
| Boot script (§4.3) | 216–218 | Youth fail-safe, 3 lines |
| ARM iframe (srcdoc) | 225–7549 | ~7,324 lines: CSS + HTML + 2 JS blocks |
| FUEL iframe (srcdoc) | 7550–14567 | ~7,017 lines: CSS + HTML + JS |
| Host HTML body | 14568–14720 | ~152 lines: views, tabbar, modals |
| Host JS | 14721–17036 | ~2,315 lines: PWA, nav, game day, data |

The ARM and FUEL iframes are embedded as `srcdoc="..."` attributes. This architecture
has a load-bearing defect documented in CLAUDE.md §3: **a literal `"` anywhere inside
a srcdoc attribute silently truncates the entire iframe** with no console error, no
page error, and no `node --check` detection. The Playwright gate is the only thing
that catches it.

The srcdoc footgun is the #1 source of silent bugs in this project. It constrains
every edit, requires `&quot;` escaping discipline, and has different `&amp;` conventions
between ARM (`&&`) and FUEL (`&amp;&amp;`). Every contributor must internalize §3
before touching iframe content.

The owner has requested splitting the monolith into separate files for maintainability
and to enable future offline video capabilities.

## Decision

**Migrate from `srcdoc` to `src` — extract each iframe into its own HTML file.**

### Phase 1 — Extract (smallest diff, proves the architecture)

Split `index.html` into three files:

```
battery/
  index.html       (~2,700 lines — host shell only)
  arm.html         (~7,300 lines — ARM iframe, self-contained)
  fuel.html        (~7,000 lines — FUEL iframe, self-contained)
  sw.js            (unchanged, already separate)
  manifest.webmanifest
  ...icons, clips, etc.
```

**What changes:**

1. `<iframe id="f-arm" srcdoc="...7,300 lines...">` becomes
   `<iframe id="f-arm" src="arm.html">`

2. `<iframe id="f-fuel" srcdoc="...7,000 lines...">` becomes
   `<iframe id="f-fuel" src="fuel.html">`

3. `arm.html` and `fuel.html` are normal HTML files. Literal `"` is just `"`.
   No `&quot;` escaping. No `&amp;&amp;` convention split. **The srcdoc footgun
   is eliminated entirely.**

4. `reloadFrames()` changes from srcdoc string injection to
   `iframe.contentWindow.location.reload()`. (See Tier Injection below.)

5. Each iframe file keeps its CSS and JS inline initially — the split is
   structural (three files instead of one), not yet a CSS/JS extraction.

### Phase 2 — Further split (optional, per-lane, after Phase 1 is stable)

```
battery/
  index.html       (host HTML, <link> to host.css, <script src="host.js">)
  css/host.css
  js/host.js
  arm/
    index.html     (ARM HTML, <link> to arm.css, <script src="arm.js">)
    arm.css
    arm.js
  fuel/
    index.html     (FUEL HTML, <link> to fuel.css, <script src="fuel.js">)
    fuel.css
    fuel.js
```

Phase 2 is not required for the owner's goals. It's available if the team
wants IDE features (CSS/JS syntax highlighting, linting, treeshaking) or
if file sizes warrant it. Phase 1 delivers the key wins.

## Consequences

### What we gain

1. **Srcdoc footgun eliminated.** The single most dangerous class of silent bug
   in this project becomes impossible. §3 of CLAUDE.md becomes historical context
   rather than a live constraint.

2. **Standard dev experience.** Each file is normal HTML — any editor, linter, or
   formatter works without srcdoc-aware escaping. `node --check` on extracted JS
   actually catches what it claims to catch.

3. **Smaller diffs.** An ARM-only change touches only `arm.html`. A FUEL-only
   change touches only `fuel.html`. No more 17K-line file in every PR.

4. **Lane boundaries become file boundaries.** Lane A owns `arm.html` and
   `fuel.html`. Lane E owns `index.html` (host). Lane M's embed carve-out
   touches `arm.html`. File-level ownership replaces line-range ownership.

5. **Enables offline video (future).** Separate files + SW cache is the
   foundation for caching video assets. If videos outgrow SW cache limits,
   Capacitor wraps the same file structure with native filesystem access.

6. **No build step.** GitHub Pages serves static files. No bundler, no
   compilation, no new tooling. Same deploy process: commit + push to master.

### What we must handle

#### 1. Origin sharing (LOW RISK — already works)

`src=` to a same-origin file shares `localStorage` with the parent — identical
to `srcdoc` behavior. All existing `fuel-*` and `arm-care-*` key prefixes work
unchanged. `postMessage` with `'*'` origin works unchanged.

**Verified:** same-origin `src=` iframes have the same `window.origin` as the
parent. No localStorage migration needed.

#### 2. §4.3 Youth tier injection (MEDIUM — requires careful migration)

Currently, `reloadFrames()` injects `window.BATTERY_TIER` by string-replacing
`<head>` in the FUEL srcdoc before the iframe parses:

```js
// Current (line 15115):
FRAMES.fuel.srcdoc = reloadFrames._fuelDoc.replace(
  '<head>',
  "<head><script>window.BATTERY_TIER='" + tier + "';<\/script>"
);
```

With `src=`, we can't inject into the HTML before parse. Two options:

**Option A (recommended): Iframe reads tier from shared localStorage.**
The host already writes `localStorage.setItem('battery-profile', p)` before
reload. Each iframe's boot script reads the profile and derives tier directly:

```js
// In arm.html / fuel.html boot script:
(function(){
  var p = localStorage.getItem('battery-profile');
  var profiles = JSON.parse(localStorage.getItem('battery-people') || '[]');
  var rec = profiles.find(function(x){ return x.id === p; });
  window.BATTERY_TIER = (rec && rec.tier === 'youth') ? 'youth' : 'adult';
})();
```

This is **fail-safe**: if the profile is missing or corrupt, it defaults to
`'adult'` — matching the existing §4.3 pattern where "only an explicit
`tier:'youth'` profile is treated as youth."

Wait — §4.3 says "defaults SAFE (youth) on any uncertainty." The boot script
(line 216) defaults to youth. The iframe injection defaults to adult. These are
opposite defaults for different failure modes:
- Boot script: no profile yet → show youth (safe)
- Iframe: profile present but tier missing → treat as adult

The extracted iframe boot script must match the same logic: read the host's
boot-time decision from a shared key, not re-derive it. Proposed: the host
boot script (line 216) writes `localStorage.setItem('battery-boot-tier', tier)`
and each iframe reads that key. Single source of truth, no re-derivation.

**Option B: postMessage handshake at iframe load.**
Each iframe boots in a "waiting" state, host sends `{type:'bat-tier', tier}`
on iframe `load` event, iframe applies tier and renders. Downside: adds a
visible flash or requires a loading screen in each iframe.

**Decision: Option A.** SharedLocalStorage key is synchronous, zero-flash, and
the host is already the authority on tier.

#### 3. reloadFrames() (MEDIUM — behavior change)

Current: re-assigns `iframe.srcdoc`, which triggers a full re-parse.
New: `iframe.contentWindow.location.reload()` or re-assign `iframe.src`.

The host must update `battery-boot-tier` in localStorage *before* triggering
the reload so the iframe reads the correct tier on re-parse.

```js
function reloadFrames() {
  var tier = profileTier(profile);
  localStorage.setItem('battery-boot-tier', tier);
  // Force full reload (not from cache) for both iframes
  FRAMES.arm.contentWindow.location.reload();
  FRAMES.fuel.contentWindow.location.reload();
  // Re-attach onload for post-reload sync
  FRAMES.arm.onload = FRAMES.fuel.onload = function() {
    batPoll();
    try { syncFuelDayFromPlan(getActivePlan()); } catch(e) {}
  };
}
```

#### 4. Service worker (LOW RISK — already handles multi-file)

`sw.js` uses a cache-on-fetch strategy — any requested URL gets cached on first
load. `arm.html` and `fuel.html` will be cached automatically on first visit.
No change to `sw.js` logic needed. The `CACHE` version bump on deploy still
invalidates all cached files.

#### 5. Playwright gate (MEDIUM — test infrastructure change)

`run.sh` stages the build to `app-fixed.html` in its own directory. With
multi-file, it must stage all three files (or serve from the repo directory).

Options:
- Stage `index.html`, `arm.html`, `fuel.html` into the test directory
- Point Playwright at the repo directory directly via a local HTTP server

The `srcdoc-integrity` static gate becomes simpler — it checks for literal `"`
truncation, which can't happen in a normal HTML file. The gate may reduce to a
syntax check (`node --check` on extracted `<script>` blocks) or be retired.

The `clip-config` gate is unchanged — it reads `CLIP_SOURCE` and
`OFFICIAL_DEMOS` from `arm.html` instead of from `index.html`.

#### 6. Git history (ACCEPTED COST)

`git blame` on the new files starts fresh. History of the monolith is preserved
in `index.html`'s log. This is an accepted one-time cost — the alternative
(git filter-branch) is fragile and not worth the complexity.

## Lane assignments

| Story | Lane | Scope |
|---|---|---|
| Extract ARM srcdoc → `arm.html` | Lane A {AM06} | ARM iframe content owner |
| Extract FUEL srcdoc → `fuel.html` | Lane A {AM06} | FUEL iframe content owner |
| Adapt host shell (`index.html`) | Lane E {AM06} | Host owner + release engineer |
| Adapt `reloadFrames()` + tier injection | Lane E {AM06} | Host JS owner |
| Update Playwright gate + `run.sh` | Lane E {AM06} | Gate owner |
| Update `sw.js` if needed | Lane E {AM06} | SW owner |
| Update `CLAUDE.md` §2, §3 | Lane E {AM06} | Post-ship documentation |
| End-to-end validation | Lane E {AM06} | Sole release engineer |

## Migration sequence

1. **Lane A** extracts `arm.html` — copies ARM srcdoc content, un-escapes all
   `&quot;` → `"` and `&amp;` → `&` (where FUEL used `&amp;&amp;`, ARM used
   raw `&&`), adds the `battery-boot-tier` boot script, verifies it renders
   standalone.

2. **Lane A** extracts `fuel.html` — same process for FUEL srcdoc.

3. **Lane E** adapts `index.html` — replaces srcdoc attributes with src,
   adapts `reloadFrames()`, adds `battery-boot-tier` write to host boot script,
   verifies host + iframe integration.

4. **Lane E** updates the gate — adapts `run.sh` for multi-file staging,
   updates or retires `srcdoc-integrity`, runs full Playwright suite.

5. **Lane E** ships — stamp bump, SW cache bump, commit, gate, push.

Steps 1–2 can run in parallel with step 3 (Lane A and Lane E work concurrently).
Step 4 depends on all three files being ready. Step 5 is the standard release gate.

## Alternatives considered

### A. Keep srcdoc, use a build step to inline from separate source files
- Pros: Dev experience of separate files, ships as single file
- Cons: Adds a build step to a project that has never had one. Adds a tooling
  dependency. The srcdoc footgun still exists in the shipped artifact. Build
  step must handle the `&quot;` escaping correctly — one more thing to get wrong.
- **Rejected:** adds complexity without eliminating the root cause.

### B. Keep srcdoc, extract CSS/JS via `<link>`/`<script src>` inside srcdoc
- Not possible. `srcdoc` has no base URL — relative paths in `<link>` and
  `<script src>` resolve to `about:srcdoc`, which doesn't exist.
- **Rejected:** technically impossible.

### C. Host fetches iframe HTML via `fetch()` and injects via `srcdoc`
- Pros: Separate source files, still uses srcdoc (shares origin)
- Cons: Async boot adds latency + flash. `reloadFrames()` becomes async.
  The srcdoc footgun still exists at injection time.
- **Rejected:** worse DX than `src=`, doesn't eliminate the footgun.

### D. Do nothing
- The monolith works. The Playwright gate catches srcdoc truncation.
- **Rejected by owner.** The request to split is explicit. The srcdoc footgun
  is a tax on every edit, and the 17K-line file makes diffs unreadable.

## Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Tier injection race (iframe loads before host writes tier) | Low | Youth sees adult content briefly | Boot script reads synchronous localStorage, not async postMessage |
| SW doesn't cache new files on first offline visit | Low | Offline broken until second visit | SW already caches on fetch; test offline flow in gate |
| Playwright gate breaks during migration | Medium | Release blocked | Update gate before merging the split; run gate on feature branch |
| `&quot;`/`&amp;` un-escaping introduces bugs | Medium | Broken content in iframes | Automated un-escape script + diff review + full gate run |
| Lane coordination (parallel work on A + E) | Low | Merge conflict | Clear file boundaries; Lane E doesn't touch iframe content |

## Success criteria

- [ ] `arm.html` renders identically to the current ARM srcdoc iframe
- [ ] `fuel.html` renders identically to the current FUEL srcdoc iframe
- [ ] `index.html` is under 3,000 lines
- [ ] Full Playwright gate passes (all 28+ suites)
- [ ] Youth §4.3 gate still blocks adult content for youth profiles
- [ ] Offline PWA works (SW caches all three files)
- [ ] `reloadFrames()` (profile switch) works without flash or data loss
- [ ] No literal `srcdoc=` remains in `index.html`
- [ ] The srcdoc footgun (§3) is documented as historical, not active
