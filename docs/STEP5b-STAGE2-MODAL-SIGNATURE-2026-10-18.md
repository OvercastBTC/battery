# Step 5b Stage-2 — `ClipModal` DI + arm.html wiring (E → A), v256

**E side DONE:** `lib/clip.js` now also exports `window.ClipModal` (branch `laneE/step5b-modal` @ `7fd8d62`,
on master `e6fa29a`). Pure mount-based control, gated by the ClipModal section of `lib-clipcard.test.mjs`
(10 assertions, 2 mutations proven RED) + the existing `clip-playback.test.mjs` (the modal's behaviour guard,
drives the real `openClip`/`closeClip`/`setClipRate` globals). **Zero behaviour change**, and the `#clip-modal`
markup stays exactly as-is — only the 6 JS function bodies move to the lib.

## The signature

```
window.ClipModal.mount(opts) -> { open(name), close(), setRate(r), failed(), current() }
```

| opt | type | default | replaces |
|-----|------|---------|----------|
| `doc` | document | `window.document` | — |
| `ids` | `{modal,video,official,credit,speed}` element ids | `'clip-'+key` | the hard-coded `getElementById('clip-…')` |
| `sourceFor` | `fn(file)->[prefix,title,url]\|null` | `()=>null` | ARM `sourceFor` |
| `officialFor` | `fn(file)->url\|null` | `()=>null` | ARM `officialFor` |
| `rate` | `{get:()->number, set:(number)}` | in-memory, 1× | `storeGet/storeSet('arm-care-clipspeed')` |
| `baseUrl` | string | `''` | `parent.location.href.replace(/[^/]*$/,'')` |

The control owns the `openClip/applyClipRate/clipRate/setClipRate/clipFailed/closeClip` logic verbatim
(credit line "Cut from: " + anchor, rate clamp `{0.5,0.25}` else 1, `no-clip`/`on` class toggles, the
official link-out, Esc-to-close). `current()` exposes `_curClip`. No app global, no `localStorage`.

## A's `arm.html` edits

### 1. MOUNT once + replace the 6 function bodies with thin GLOBAL shims (markup unchanged):

Where the modal functions are today (~8813–8883), put:

```js
var _clipModal = (window.ClipModal && ClipModal.mount) ? ClipModal.mount({
  doc: document,
  ids: { modal:'clip-modal', video:'clip-video', official:'clip-official', credit:'clip-credit', speed:'clip-speed' },
  sourceFor: sourceFor,
  officialFor: officialFor,
  rate: { get: function(){ return parseFloat(storeGet('arm-care-clipspeed','1')); },
          set: function(r){ try{ storeSet('arm-care-clipspeed', String(r)); }catch(e){} } },
  baseUrl: (function(){ try{ return parent.location.href.replace(/[^/]*$/,''); }catch(e){ return ''; } })()
}) : null;
function openClip(name){ if(_clipModal) _clipModal.open(name); }       // ~40 inline clip-btn onclick + the card upgrade all still call this
function closeClip(){ if(_clipModal) _clipModal.close(); }             // #clip-modal onclick + .clip-close onclick
window.setClipRate = function(r){ if(_clipModal) _clipModal.setRate(r); }; // the 3 .cs-btn onclick
function clipFailed(){ if(_clipModal) _clipModal.failed(); }            // #clip-video onerror
```

- Keep all four as the SAME global names/arities the markup's inline handlers call — the `#clip-modal`
  markup (onclick/onerror), the ~40 `clip-btn onclick="openClip(...)"`, and the REQ-041 card-upgrade
  (`onclick*="openClip"` match at ~8981) are all **unchanged**.
- `sourceFor`/`officialFor`/`storeGet`/`storeSet` are in scope where these functions live.
- The mount call must run after the `#clip-modal` markup is parsed (it is — the modal `<script>` is below
  the markup) and after `lib/clip.js` is loaded (it is — battery→clip→sections→steps).

### 2. DELETE (now owned by ClipModal): the bodies of `openClip`, `clipRate`, `applyClipRate`, `setClipRate`,
`clipFailed`, `closeClip`, the `_curClip` var, and the modal's `document.addEventListener('keydown', … closeClip …)`
line (~8883). The lib registers its own Esc handler on mount.

### LEAVE ALONE: `buildClipCard` (already the ClipCard adapter), `CLIP_SOURCE/OFFICIAL_DEMOS/sourceFor/officialFor`
(still ARM data the adapters inject), the modal markup, and all call sites.

## Gate before you hand back

`lib-clipcard.test.mjs` (ClipCard + ClipModal units) + `clip-playback.test.mjs` (modal behaviour, drives the
globals) + `clip-player.test.mjs` + `clip-preview-paint.test.mjs` all green on the combined tree = zero behaviour
change. Branch your arm.html on `laneE/step5b-modal @ 7fd8d62`; report branch + SHA; E combines, gates, serves R,
holds for Q's go, ships v256.

(Stage order: v256 = this modal lift. **v257 = move the clip CSS (~56 rules) out of arm.html into `lib/clip.css`**,
co-located with clip.js once both the card and the modal are lib controls — mechanical, separate release.)
