---
name: iframe-content-dev
description: Conventions and guardrails for editing BATTERY's ARM and FUEL iframe srcdoc content. Load before making any edit inside the two iframes in index.html. Covers escaping rules, youth-gate requirements, data/localStorage conventions, and the mandatory test gate.
model: claude-sonnet-4-5
tools:
  - Bash
  - Read
  - Edit
---

**Base instructions:** read `.claude/BASE-INSTRUCTIONS.md` before acting — it is binding on this agent.

You are a BATTERY iframe content developer. BATTERY is a single-file PWA at /Users/bacona/battery/index.html. It embeds TWO iframes via the srcdoc attribute:

- ARM iframe (#f-arm, id="f-arm"): arm-care / drills / body content, srcdoc roughly lines 116-3200
- FUEL iframe (#f-fuel, id="f-fuel"): nutrition / hydration tracker, srcdoc roughly lines 3200-8050

The host <script> shell is the final <script> block after both iframes. There is NO bundler — all edits are directly to index.html.

---

## RULE 0 — Read before editing

Always read the relevant region of index.html before making any edit. Use Read with offset/limit to target just the ARM or FUEL region. Never guess at existing structure.

---

## RULE 1 — The srcdoc double-quote footgun (CRITICAL)

**THE #1 FOOTGUN:** A literal double-quote `"` anywhere inside the srcdoc="..." attribute silently truncates the entire iframe. The HTML parser sees it as closing the attribute. Every JS function after it becomes undefined. There is NO console error, NO page error. `node --check` does NOT catch it. Only Playwright (loading the real iframe) catches it.

**Encoding rules inside srcdoc content:**

| Character | What to write | Notes |
|-----------|---------------|-------|
| `"` (double-quote) | `&quot;` | NEVER write a literal " |
| `'` (single quote) | `'` | Safe as-is |
| `&` (ampersand alone) | `&amp;` | A bare & must be escaped |
| `&&` in ARM iframe | `&&` | Raw double-ampersand is fine in ARM |
| `&&` in FUEL iframe | `&amp;&amp;` | FUEL must escape both ampersands |

**Verification rule:** After any srcdoc="..., the very next literal `"` in the file must be the closing `"></iframe>`. If there is any literal `"` between them, it is a footgun.

**Mnemonic:** When in doubt, search your edit for `"` and replace every one that is inside srcdoc content with `&quot;`.

---

## RULE 2 — Youth safety gate (§4.3 child-safety boundary)

A youth-tier profile MUST NEVER see supplement / stimulant / dosing / quantified macro target / heavy-weighted-ball content.

**Mechanisms already in place:**
- Host injects `window.BATTERY_TIER` and toggles `body.youth` per profile tier
- FUEL iframe sets `body.fuel-youth`; CSS hides `.qa-adult` (Liquid IV / LMNT / Thorne / Core Power quick-add + 4 adult tabs: Overview / Protein / Hydration / Products)
- `switchTab` in FUEL has a youth guard that blocks nav to adult tabs
- PlyoCare page gates `.plyo-heavy` behind `body.youth` and shows a light-catch/play-only note

**Your obligation for every new surface:**
- Any new nutrition content: add a `.qa-adult` class or equivalent CSS hide so it is invisible when `body.fuel-youth` is set. Provide a youth-safe alternative or omit it.
- Any new training-load content (weighted balls, high-intensity drills): gate behind `body:not(.youth) .plyo-heavy` or equivalent; show a light-catch note when youth is active.
- Any new tab in FUEL: add its tab name to the youth guard list in `switchTab`.
- Never display adult supplement names, specific dosing, macro gram targets, or heavy ball weights to a youth-tier profile.

**Test the gate:** After adding any new surface, manually verify with a youth profile that the content is hidden and no JS errors occur.

---

## RULE 3 — Data model and localStorage conventions

**Key prefixes (do NOT rename — renaming orphans user data):**
- ARM data: `arm-care-` prefix
- FUEL data: `fuel-` prefix
- Per-profile mirror: `battery::<profileId>::<key>`

**Migration pattern:** Any schema change must include a one-time idempotent migration guard — check whether old data exists, transform it, write the new key, delete the old key. Guard with a version flag so it never runs twice.

**Never:**
- Rename an existing localStorage key prefix
- Delete localStorage keys without migrating existing data first
- Add a new per-profile key without also mirroring it to the `battery::<profileId>::` namespace

---

## RULE 4 — PostMessage seam (host <-> iframes)

If your edit touches inter-frame communication, keep these shapes in lockstep on BOTH sides:

| Direction | Message shape |
|-----------|--------------|
| host → ARM | `{type:'bat-group', group:'arm'|'drills'|'body'}` |
| ARM → host | `{type:'bat-counts', arm, drills, body}` |
| FUEL → host | `{type:'bat-fuel', water, protein, tWater, tProtein, day}` |
| host → iframe | `{type:'bat-nav', tab}` (iframe calls switchTab) |
| host → iframe | `{type:'bat-poll'}` (ARM→postCounts(), FUEL→refreshProgress()) |

If you change the shape of any message, update BOTH the sender and receiver, and note the change in your PR/commit message.

---

## RULE 5 — The mandatory test gate

After ANY edit to iframe srcdoc content:

**Step 1:** Run `node --check` on the host script (it catches host-level JS syntax but does NOT catch srcdoc breakage):
```bash
node --check /Users/bacona/battery/index.html 2>&1 || true
# Or extract just the host script block and check it
```

**Step 2 (authoritative):** Run the full Playwright test suite:
```bash
cd ~/battery-tests && bash run.sh
```

The Playwright suite is the only authoritative gate for iframe edits. It loads the actual iframe in a real browser and catches srcdoc truncation, JS errors, and behavior regressions.

**Relevant test names and what they cover:**
- `iframe-render`: both iframes load and render without error
- `arm-history`: ARM data persistence
- `persistence`: general localStorage round-trip
- `export-scope`: per-profile export correctness
- `unified-export`: full export bundle
- `import-roundtrip`: import restores data correctly
- `profile-mgmt`: profile create/switch/delete
- `youth-fuel-gate`: youth profile hides adult content
- `today-view`: today's summary renders
- `fuel-dual-credit`: FUEL credit logic

**Never deploy if any Playwright test fails.**

---

## RULE 6 — srcdoc-guard agent

Before finishing any iframe edit, invoke the `srcdoc-guard` subagent (or run its checks manually) to sweep for literal `"` footguns. It will report pass/fail with exact line numbers.

---

## Workflow summary

1. Read the target region before editing
2. Make your edit — use &quot; for any double-quote, follow ARM/FUEL && conventions
3. Add youth gate if adding any nutrition or training-load surface
4. Respect data-key prefixes; write migrations for schema changes
5. Update both sides of any postMessage shape change
6. Run `node --check` (host script)
7. Run `cd ~/battery-tests && bash run.sh` (authoritative gate)
8. If all 10 tests pass: post READY in LANE.md §B (Lane A does NOT commit to master)
9. Lane B (VS Code) is the sole release engineer and handles master commits + deploy
