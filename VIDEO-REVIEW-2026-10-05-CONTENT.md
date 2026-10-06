# BATTERY Clip CONTENT-Validation Sweep — 2026-10-05

**Reviewer:** Lane M (M.26.10.05.1) · **Scope:** owner batch-#3 item 1.0 — does each clip's
ACTUAL content match its drill/exercise label+key? **Criterion: CONTENT ONLY — never flagged for length.**
Supersedes the timing/source-ID pass in `VIDEO-REVIEW-LOG.md` (2026-10-03), which verdicted on
source-ID + duration reasoning and therefore MISSED the `plyo-seq-stomp` off-by-one the owner caught.

## Method (zero-guessing where source is knowable)
1. **Audio cross-correlation** of each clip's narration against its source video (scipy FFT, normalized
   NCC). Peak NCC pins the EXACT source window AND validates attribution (low NCC ⇒ clip is not from the
   credited video). NCC ≥ 0.9 = confident.
2. **Caption-boundary mapping** — YouTube auto-sub (yt-dlp) text spanning that window is compared to the
   clip's labeled drill.
3. **Frame-check** for anomalies, muted/music clips, vlog clips whose audio is incidental, and all
   sources with no downloadable video (jaegersports.com, web-only, rate-limited).

## RESULT — 140/140 clips content-reviewed
- **Content mismatches: 1 — `plyo-seq-stomp` (FIXED, shipped v190).** Old cut = source 4:30–4:41 (tail of
  the STANDING-sequence demo + the spoken words "stomp sequence drill", zero stomp footage). Re-cut to
  5:05–5:16 (actual stomp action + matching narration). Audit of the full plyo set found only stomp wrong.
- **All other 139 clips: content matches label.** No other wrong-movement clip found.

### Attribution / source findings (content is correct; these are CREDIT/catalog accuracy items)
| clip | finding | action |
|---|---|---|
| `bougie-recv-decisions` | 2026-10-03 catalog `source_id` wrong (`fvMOoCC1zUo`); actually `klSzYHMSflI` (NCC 0.98) — which is already its on-screen CLIP_SOURCE credit. Content ✓. | catalog corrected below; no app change |
| `bougie-recv-drills5` | NCC 0.01 vs its credited `klSzYHMSflI` → **not from the video it credits on-screen**. Content ✓ (catcher receiving drills, frame-confirmed). True source unconfirmed (candidate: `L7J-QjQDsTQ` "5 Best Catcher Drills" — rate-limited, not yet correlated). | **owner/A: confirm true source → fix CLIP_SOURCE credit** |
| `bougie-frame-preset-to-kneedown` | Content ✓ (short-hop receiving / knee-down). Bears a `@yagoo.guy / Made with Edits` watermark while credited to Bougie `nGSWKIhTnoE` (re-edited repost). | owner awareness (licensing) |
| `bauer-recov-bullpen` | NCC 0.03 vs catalog's `S03UqySwcXA` → not from that ID. Content ✓ (recovery explainer). On-screen credit is the generic `@trevorbauer` channel, so no specific-video misattribution is shown. | catalog ID note only |

### NEEDS-OWNER (unchanged from 2026-10-03 — content valid, SOURCE needs owner)
- `cat3-lkdblock` — content ✓ (left-knee-down blocking, on-screen caption confirms). Source = catchingmadesimple.com (web URL, no YouTube ID).
- `bauer-recov-eccentric`, `bauer-recov-iso` — content ✓ (recovery explainers). Source video unidentified.

### Ground-truth-limited ⚠ (content frame-checked ✓; no audio-correlatable source)
- `jband-*` (8) + `jbj-*` (13): jaegersports.com has no downloadable video. All show band arm-care work;
  several confirmed by on-screen exercise captions (shoulder-circles / face-pulls / rows; "Diagonal/Side
  Stretch"). Precise sub-exercise ID (e.g. ER vs IR rotation) relies on frame+caption+prior catalog.
  Note: `jbj-fwdfly` / `jbj-fwdthrow` are filmed in a different (indoor gym) setting than the rest.
- `ru-gym-deadlift` / `ru-plyo-humpty` / `ru-warmup-highknees` (3): source `pBT9ZhxTJ5c` 403'd; thoroughly
  filmstripped — all content-valid (gym lifting / indoor-tunnel plyoball Humpty / team dynamic warmup).
- Rate-limited (403/429) so audio-NCC deferred but frame-check content-valid: `bauer-pitch-gloveside/hipfire`,
  `mx-seq-*` (2), `bauer-strat-tunnel-*` (3), `bauer-cmd-*` (2), `zeller-pitch-fosh`, `bauer-recov-marcpro/protocol/no-ice`.
  Optional: re-correlate after a YouTube-rate-limit cooldown to upgrade these from frame-check to NCC-confirmed.

### Audio-NCC-confirmed this sweep (source + content both verified, NCC ≥ 0.96)
plyo (9, via v190 work) · wash (12) · w2b (6) · gi1–gi4 (13) · fw-1b (2) · bougie block ×3 + recv pos135/zones/decisions ·
bougie stance-types · bougie block-brickwall · cat1 ×3 · cat2 ×2 · tube ×4 · bauer-gd ×9 · bauer-warmup ×3 ·
jp1-core-floor · jp2-posturesquat · bauer-mech ×2 · bauer-cp-warmup · bauer-design ×3.

## Catalog correction to carry into VIDEO-REVIEW-LOG.md
- `bougie-recv-decisions` source_id: `fvMOoCC1zUo` → **`klSzYHMSflI`** (NCC 0.98).
- `bougie-recv-drills5` source_id: `klSzYHMSflI` is WRONG (NCC 0.01) → mark UNVERIFIED pending true-source confirmation.
- `bauer-recov-bullpen` source_id: `S03UqySwcXA` unconfirmed (NCC 0.03) → mark UNVERIFIED.
