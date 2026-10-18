# Step 5b — `ClipCard` DI signature + arm.html wiring (E → A)

**E side DONE:** `lib/ui.js` now exports `window.ClipCard` (branch `laneE/step5b` @ `a8d7d69`).
Pure control, gated by `lib-clipcard.test.mjs` (30 assertions, 3 mutations proven RED). This doc is
the contract for A's `arm.html` wiring. **Zero behaviour change** is the whole point — the clip-player
(29) + clip-preview-paint gates must stay green, and the clip CSS stays in `arm.html` (the lib only
builds the markup those rules style).

## The signature

```
window.ClipCard.create(opts) -> HTMLElement (the card)
```

| opt | type | required | default | what it replaces in the old buildClipCard |
|-----|------|----------|---------|---------------------------------------------|
| `file` | string | yes | — | the `file` arg (`'tube-forward.mp4'`) |
| `label` | string | no | `file` minus `.mp4`, dashes→spaces | the `label` arg (`'' ` still → de-dashed key, same as before) |
| `sourceFor` | `fn(file) -> [prefix,title,url] \| null` | no | `() => null` (→ "Full video" span) | ARM's `sourceFor` (CLIP_SOURCE) |
| `officialFor` | `fn(file) -> url \| null` | no | `() => null` (→ link-out href `#`) | ARM's `officialFor` (OFFICIAL_DEMOS) |
| `rate` | `{ get:()->number, set:(number) }` | no | in-memory, 1× | `storeGet/storeSet('arm-care-clipspeed')` |
| `baseUrl` | string (absolute prefix for `clips/` + `clips/previews/`) | no | `''` (relative) | `parent.location.href.replace(/[^/]*$/,'')` |
| `doc` | document | no | `window.document` | the ARM document (stop-others + big-chrome scope) |

The control OWNS (lifted out of arm.html, no ARM knowledge): the preview img, play overlay, inline
`<video>`, the inline `1× / ½× / ¼×` speed buttons, the single-video **stop-others** contract, and the
⤢ **fullscreen / `.big` fallback** chrome + the per-document Escape handler. It clamps the rate to
`{0.5,0.25}` else `1`. It defines no app global and touches no `localStorage` (persistence only via
`rate.set`).

## A's `arm.html` edits (exactly two)

### 1. REPLACE the body of `buildClipCard` (currently ~8928–9029) with this thin adapter:

```js
function buildClipCard(file, label){
  return ClipCard.create({
    file: file,
    label: label,
    sourceFor: sourceFor,
    officialFor: officialFor,
    rate: {
      get: function(){ return parseFloat(storeGet('arm-care-clipspeed','1')); },
      set: function(r){ try{ storeSet('arm-care-clipspeed', String(r)); }catch(e){} }
    },
    baseUrl: (function(){ try{ return parent.location.href.replace(/[^/]*$/,''); }catch(e){ return ''; } })()
  });
}
```

- Keep `buildClipCard` a **global** `function` (the clip-player gate drives `window.buildClipCard`), 2-arg,
  both call sites (`det.appendChild(buildClipCard(file,''))` ~9057, `replaceChild(buildClipCard(file,lbl)…)`
  ~9097) unchanged.
- `storeGet`/`storeSet`/`sourceFor`/`officialFor` are already in scope where `buildClipCard` is defined.

### 2. DELETE the 5 helpers + the module-scope Escape listener now living in the lib (currently ~8894–8926):

`clipStopOthers`, `clipEnsureBigChrome`, `clipExitAllBig`, `clipBigFallback`, `clipGoBig`, and the
`document.addEventListener('keydown', … clipExitAllBig …)` line. They have **no caller left** once the
`buildClipCard` body above is in place (I grepped: every caller was inside `buildClipCard`).

### LEAVE ALONE — the modal is a SEPARATE surface, do NOT touch it:

`openClip`, `clipRate`, `applyClipRate`, `window.setClipRate`, `clipFailed`, `_curClip`, `CLIP_SOURCE`,
`OFFICIAL_DEMOS`, `sourceFor`, `officialFor`. The modal still reads/writes `arm-care-clipspeed` directly,
so it stays in sync with the card through the shared key. (The modal is a Stage-2 candidate; not this unit.)

## Gate before you hand back

`lib-clipcard.test.mjs` (my unit, isolated gate) + `clip-player.test.mjs` (29, drives your
`window.buildClipCard`) + `clip-preview-paint.test.mjs` must all stay green on the combined tree.
Branch your `arm.html` on top of `laneE/step5b` (so `window.ClipCard` is present) or tell me your
branch and I'll combine. Report branch + SHA to E; I gate the combined tree, serve R, hold for Q's go,
ship v255.
