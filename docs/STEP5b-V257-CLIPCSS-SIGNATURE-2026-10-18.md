# Step 5b v257 — clip CSS → lib/clip.css (E → A)

**E side DONE:** `lib/clip.css` created (branch `laneE/v257-clipcss` @ `47fc4e0`), the clip rules lifted
VERBATIM from arm.html's `<style>`. Scope-checked (Q's ask): the two clip blocks are cleanly separable;
the ONLY entangled selector is `.clip-btn`, which is a **general ARM button** (54 uses, 10 non-clip +
`#clip-official`) — it **stays in arm.html**, it is not clip CSS. No `@media` wraps the clip rules; no
non-clip rule shares a clip selector; modal rules are `#clip-modal`/`#clip-speed` id-scoped (order-independent).

**Gate:** `clip-css.test.mjs` (computed-style parity of a fresh card + the open modal vs a golden captured
from the pre-v257 build, BOTH tiers — mutation-proven: a 1px radius change reds it) + `clip-preview-paint` +
`clip-player`. R's instrument is the same computed-style tuples both tiers.

## A's `arm.html` edits (two deletions + one link)

### 1. DELETE both clip CSS blocks from the `<style>` (content-anchored — line numbers shift after the first delete):

- **Block A (card + fullscreen):** from the comment `/* REQ-041: animated clip preview cards */` through the
  rule `.clip-card-anim.big .clip-card-footer { display:none; }` inclusive. (~107 lines; was 1040–1146.)
- **Block B (modal):** from the comment `/* Shared in-iframe demo-clip modal (dark overlay, matches host #bmodal) */`
  through the rule `#clip-modal.no-clip .clip-soon { display: block; }` inclusive. (~68 lines; was 1229–1296.)

**KEEP** `.clip-btn { … }` and `.clip-btn:hover { … }` (the `/* PLYO demo-clip button … */` rules, ~1024/1038) —
general button, not clip CSS. Everything these two blocks styled is now in `lib/clip.css`, byte-identical.

### 2. ADD the stylesheet to ARM's lib `document.write` (the head `<script>` ~line 14), after `tokens.css`:

```
...document.write('<link rel="stylesheet" href="lib/tokens.css?v='+v+'"><link rel="stylesheet" href="lib/clip.css?v='+v+'"><link rel="stylesheet" href="lib/ui.css?v='+v+'"><script src="lib/battery.js?v='+v+'">...
```

i.e. insert `<link rel="stylesheet" href="lib/clip.css?v='+v+'">` right after the tokens.css link. It loads
in `<head>` before arm.html's own `<style>` — the clip rules don't collide with any non-clip selector, so
the cascade outcome is unchanged (the parity gate + R confirm).

> FYI not in scope: ARM's write also pulls `lib/ui.css` (host-only `#ui-drawer` styles — dead in ARM). Leaving
> it for now; a separate cleanup can drop it. Don't remove it as part of v257 unless Q says so.

## Gate + hand-back

`clip-css.test.mjs` + `clip-preview-paint` + `clip-player` + `lib-clipcard` green on the combined tree = zero
visual change. Branch your arm.html on `laneE/v257-clipcss @ 47fc4e0`; report branch + SHA; E combines, gates,
serves R, holds for Q's go, ships v257 (→ §5 count 59→60, clip-css is a NEW suite).
