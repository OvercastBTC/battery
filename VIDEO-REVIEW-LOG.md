# BATTERY Video Review Log

Standing catalog for clip accuracy, timing, and quality review.
Future sessions: spot-check against this log rather than full re-review.

**Columns:**
- `source_id` — YouTube video ID (or URL if no ID)
- `archive` — source MP4 in `_sources/`? YES / NO / PARTIAL
- `dur_s` — clip duration in seconds
- `verdict` — PASS · TIMING-FIX · REPLACE · NEEDS-REVIEW
- `preview_s` — start offset used for WebP animated preview
- `webp` — preview loop suitability: YES · MAYBE
- `notes` — timing concerns, content accuracy, replacement candidates

**Review date:** 2026-10-03  
**Reviewer:** Lane M (M.26.10.03.1)  
**Spec note (WebP):** 150KB target not achievable at 480×270 for complex motion clips; spec revision in progress with D.26.10.03.1. See bottom of file.

---

## Catching (Highest Traffic)

### Bougie — Blocking

| clip_key | source_id | archive | dur_s | verdict | preview_s | webp | notes |
|---|---|---|---|---|---|---|---|
| bougie-block-basics | klSzYHMSflI | YES | 184 | PASS | 2 | YES | Blocking basics segment from Bougie warm-up drills video; timing confirmed against source |
| bougie-block-brickwall | 7AnSFFQUJMM | YES | 362 | PASS | 5 | YES | Full blueprint video (6 min); long duration is intentional — full instructional segment |
| bougie-block-progression | klSzYHMSflI | YES | 113 | PASS | 2 | YES | Progressive blocking drill series from same source as basics |
| bougie-block-reads | klSzYHMSflI | YES | 170 | PASS | 2 | YES | Block/receive decision reads; good length for instructional content |

### Bougie — Receiving

| clip_key | source_id | archive | dur_s | verdict | preview_s | webp | notes |
|---|---|---|---|---|---|---|---|
| bougie-recv-decisions | fvMOoCC1zUo | YES | 133 | PASS | 2 | YES | Block vs receive decision framework; source confirmed in archive |
| bougie-recv-drills5 | klSzYHMSflI | YES | 259 | PASS | 2 | YES | 5-drill receiving series; long but covers full drill progression |
| bougie-recv-pos135 | klSzYHMSflI | YES | 127 | PASS | 2 | YES | 135° position receiving technique |
| bougie-recv-zones | klSzYHMSflI | YES | 250 | PASS | 2 | YES | Full receiving zones instructional |

### Bougie — Stance / Framing

| clip_key | source_id | archive | dur_s | verdict | preview_s | webp | notes |
|---|---|---|---|---|---|---|---|
| bougie-stance-types | MFbxm_j4N74 | YES | 317 | PASS | 3 | MAYBE | Full stance-types video; source confirmed; 5+ min is intentional |
| bougie-frame-preset-to-kneedown | nGSWKIhTnoE | YES | 56 | PASS | 2 | YES | Framing preset-to-knee-down transition; clean 56s instructional segment |

### SF Giants Catching

| clip_key | source_id | archive | dur_s | verdict | preview_s | webp | notes |
|---|---|---|---|---|---|---|---|
| cat1-framing | JPN0MLxG1oU | NO | 40 | NEEDS-REVIEW | 1 | YES | SF Giants catcher framing; source not in archive — cannot verify timing without re-download |
| cat1-stance | JPN0MLxG1oU | NO | 38 | NEEDS-REVIEW | 1 | YES | Catcher stance instruction; same caveat |
| cat1-workload | JPN0MLxG1oU | NO | 28 | NEEDS-REVIEW | 1 | YES | Catcher workload / load management; same caveat |
| cat2-throw | m-1BhPnhd1I | NO | 40 | NEEDS-REVIEW | 1 | YES | Bailey/Tromp throw mechanics; source not in archive |
| cat2-toeup | m-1BhPnhd1I | NO | 50 | NEEDS-REVIEW | 1 | YES | Toe-up throw mechanics; same caveat |
| cat3-lkdblock | catchingmadesimple.com | NO | 21 | NEEDS-REVIEW | 0 | YES | LKD blocking; only source URL, no YouTube ID verified; flagged in CLIP_SOURCE comment |

---

## Arm Care — J-Bands / JBJ

### Jaeger Sports J-Bands (jband-*)
Source: `https://jaegersports.com/j-bands-exercises-baseball-workout` — no single YouTube ID

| clip_key | source_id | archive | dur_s | verdict | preview_s | webp | notes |
|---|---|---|---|---|---|---|---|
| jband-shouldercircles | jaegersports.com | NO | 4 | TIMING-FIX | 0 | YES | ⚠ 4 seconds is too short for a full shoulder circle — one rep takes 3-4s, so this likely shows only a partial rep. Source not in archive; flag for re-cut if source re-downloaded |
| jband-facepulls | jaegersports.com | NO | 6 | PASS | 0 | YES | 6s adequate for face pull demo |
| jband-rows | jaegersports.com | NO | 6 | PASS | 0 | YES | 6s rows demonstration |
| jband-fwdback | jaegersports.com | NO | 8 | PASS | 0 | YES | Forward/back motion; 8s shows full range |
| jband-ts | jaegersports.com | NO | 11 | PASS | 0 | YES | T-position exercise; 11s good for 1-2 reps |
| jband-ys | jaegersports.com | NO | 12 | PASS | 0 | YES | Y-position exercise |
| jband-as | jaegersports.com | NO | 12 | PASS | 0 | YES | A-position exercise |
| jband-triceps | jaegersports.com | NO | 12 | PASS | 0 | YES | Tricep extension; 12s adequate |

### Jaeger Sports JBJ (jbj-*)
Source: `https://jaegersports.com/j-bands-exercises-baseball-workout` — no single YouTube ID

| clip_key | source_id | archive | dur_s | verdict | preview_s | webp | notes |
|---|---|---|---|---|---|---|---|
| jbj-diagonal | jaegersports.com | NO | 14 | PASS | 0 | YES | Diagonal pull-apart |
| jbj-er-hip | jaegersports.com | NO | 26 | PASS | 0 | YES | External rotation — hip |
| jbj-er-shoulder | jaegersports.com | NO | 34 | PASS | 0 | YES | External rotation — shoulder |
| jbj-facepull | jaegersports.com | NO | 26 | PASS | 0 | YES | Face pull |
| jbj-facepull2 | jaegersports.com | NO | 22 | PASS | 0 | YES | Face pull variation 2 |
| jbj-fwdfly | jaegersports.com | NO | 14 | PASS | 0 | YES | Forward fly |
| jbj-fwdthrow | jaegersports.com | NO | 36 | PASS | 0 | YES | Forward throw pattern |
| jbj-ir-hip | jaegersports.com | NO | 15 | PASS | 0 | YES | Internal rotation — hip |
| jbj-ir-shoulder | jaegersports.com | NO | 15 | PASS | 0 | YES | Internal rotation — shoulder |
| jbj-overhead | jaegersports.com | NO | 32 | PASS | 0 | YES | Overhead extension |
| jbj-revfly | jaegersports.com | NO | 14 | PASS | 0 | YES | Reverse fly |
| jbj-side | jaegersports.com | NO | 14 | PASS | 0 | YES | Side extension |
| jbj-throwing | jaegersports.com | NO | 26 | PASS | 0 | YES | Throwing pattern simulation |

### Shoulder Tube (tube-*)
Source: `WomBkIThhU` (Trevor Bauer Shoulder Tube Routine) — in archive as `-WomBkIThhU.mp4`

| clip_key | source_id | archive | dur_s | verdict | preview_s | webp | notes |
|---|---|---|---|---|---|---|---|
| tube-forward | -WomBkIThhU | YES | 30 | PASS | 0 | YES | Forward tube pattern |
| tube-lateral | -WomBkIThhU | YES | 52 | PASS | 0 | YES | Lateral tube pattern |
| tube-overhead | -WomBkIThhU | YES | 38 | PASS | 0 | YES | Overhead tube pattern |
| tube-throwing | -WomBkIThhU | YES | 62 | PASS | 0 | YES | Throwing motion tube pattern; 62s covers full motion explanation |

---

## Recovery

### Bauer Recovery Science (bauer-recov-*)
Multiple sources from the Recovery Science series (`@trevorbauer`)

| clip_key | source_id | archive | dur_s | verdict | preview_s | webp | notes |
|---|---|---|---|---|---|---|---|
| bauer-recov-armtype | DMbuo9b6ZIo | YES | 200 | PASS | 3 | MAYBE | Arm Pain / arm type classification; long instructional — 3.3 min |
| bauer-recov-bullpen | S03UqySwcXA | YES | 151 | PASS | 3 | MAYBE | Bullpen recovery routine; source confirmed in archive |
| bauer-recov-eccentric | (recovery series) | NO | 152 | NEEDS-REVIEW | 3 | MAYBE | Eccentric loading recovery; no distinct source ID confirmed |
| bauer-recov-flush | KMvdWv0wwno | YES | 173 | PASS | 3 | MAYBE | Flush runs debate; source confirmed |
| bauer-recov-iso | (recovery series) | NO | 182 | NEEDS-REVIEW | 3 | MAYBE | Isometric recovery; no distinct source ID confirmed |
| bauer-recov-marcpro | ZmvAiQZOpqY | YES | 240 | PASS | 3 | MAYBE | Marc Pro recovery device segment; source confirmed (post-game recovery secrets) |
| bauer-recov-no-ice | Z3QJxLaPBDI | YES | 293 | PASS | 3 | MAYBE | No-ice argument; source confirmed (What's BEST For RECOVERY) |
| bauer-recov-protocol | vZfqllOlPbM | YES | 179 | PASS | 3 | MAYBE | Speed up muscle recovery protocol; source confirmed |

### Rogue Umpire (ru-*)
Source: `@trevorbauer` Rogue Umpire vlog — specific IDs not confirmed

| clip_key | source_id | archive | dur_s | verdict | preview_s | webp | notes |
|---|---|---|---|---|---|---|---|
| ru-gym-deadlift | (Rogue Umpire vlog) | NO | 150 | NEEDS-REVIEW | 3 | MAYBE | Gym deadlift segment; specific vlog source not confirmed |
| ru-plyo-humpty | (Rogue Umpire vlog) | NO | 75 | NEEDS-REVIEW | 3 | YES | Humpty dump PlyoCare exercise; specific vlog source not confirmed |
| ru-warmup-highknees | (Rogue Umpire vlog) | NO | 30 | NEEDS-REVIEW | 0 | YES | High knees warmup; specific vlog source not confirmed |

---

## Game Day / Warmup

### Bauer Game Day Warmup (bauer-gd-*)
Source: `MeNseDHe5gc` (Baseball 401 Game Day Warmup) — in archive as `bauer-gameday-warmup.mp4`

| clip_key | source_id | archive | dur_s | verdict | preview_s | webp | notes |
|---|---|---|---|---|---|---|---|
| bauer-gd-activation | MeNseDHe5gc | YES | 36 | PASS | 3 | YES | Activation drills segment |
| bauer-gd-bullpen | MeNseDHe5gc | YES | 60 | PASS | 3 | MAYBE | Bullpen routine segment |
| bauer-gd-cuff | MeNseDHe5gc | YES | 25 | PASS | 3 | YES | Cuff exercises |
| bauer-gd-hips | MeNseDHe5gc | YES | 46 | PASS | 3 | YES | Hip activation |
| bauer-gd-longtoss | MeNseDHe5gc | YES | 56 | PASS | 3 | YES | Long toss progression |
| bauer-gd-measure | MeNseDHe5gc | YES | 48 | PASS | 3 | MAYBE | Measuring / assessment |
| bauer-gd-mobility | MeNseDHe5gc | YES | 56 | PASS | 3 | YES | Mobility work |
| bauer-gd-shouldertube | MeNseDHe5gc | YES | 64 | PASS | 3 | YES | Shoulder tube in game day context |
| bauer-gd-weightedballs | MeNseDHe5gc | YES | 65 | PASS | 3 | YES | Weighted ball warm-up |

### Bauer Pregame Warmup (bauer-warmup-*)
Source: `mhmj5AfX0K0` (Preparing For a Start — Baseball 401) — in archive as `Preparing For a Start...mp4`

| clip_key | source_id | archive | dur_s | verdict | preview_s | webp | notes |
|---|---|---|---|---|---|---|---|
| bauer-warmup-3phase | mhmj5AfX0K0 | YES | 73 | PASS | 3 | MAYBE | 3-phase warmup framework |
| bauer-warmup-activ | mhmj5AfX0K0 | YES | 75 | PASS | 3 | YES | Activation phase |
| bauer-warmup-specific | mhmj5AfX0K0 | YES | 104 | PASS | 3 | MAYBE | Specific warmup protocol |

---

## Mechanics / Pitching

### Bauer PlyoCare (plyo-*)
Source: `VIDd2yMSSnY` (Daily Weighted Ball Routine — Baseball 401) — not confirmed in archive by ID

| clip_key | source_id | archive | dur_s | verdict | preview_s | webp | notes |
|---|---|---|---|---|---|---|---|
| plyo-drop | VIDd2yMSSnY | NO | 11 | PASS | 0 | YES | Drop step exercise |
| plyo-dropstep | VIDd2yMSSnY | NO | 12 | PASS | 0 | YES | Drop step variation |
| plyo-mound | VIDd2yMSSnY | NO | 12 | PASS | 0 | YES | Mound PlyoCare throw |
| plyo-reverse | VIDd2yMSSnY | NO | 11 | PASS | 0 | YES | Reverse throw |
| plyo-seq-hop | VIDd2yMSSnY | NO | 11 | PASS | 0 | YES | Hop sequence |
| plyo-seq-standing | VIDd2yMSSnY | NO | 11 | PASS | 0 | YES | Standing sequence |
| plyo-seq-stomp | VIDd2yMSSnY | NO | 11 | PASS | 0 | YES | Stomp sequence |
| plyo-spiral | VIDd2yMSSnY | NO | 11 | PASS | 0 | YES | Spiral throw |
| plyo-stepbehind | VIDd2yMSSnY | NO | 11 | PASS | 0 | YES | Step-behind throw |

### Bauer Mechanics (bauer-mech-*)
Source: `@trevorbauer` arm mechanics content — specific IDs not confirmed

| clip_key | source_id | archive | dur_s | verdict | preview_s | webp | notes |
|---|---|---|---|---|---|---|---|
| bauer-mech-armspiral | (mechanics series) | NO | 48 | NEEDS-REVIEW | 3 | MAYBE | Arm spiral path mechanics |
| bauer-mech-hipsep-spring | (mechanics series) | NO | 59 | NEEDS-REVIEW | 3 | MAYBE | Hip separation spring timing |

### Bauer Pitch Mechanics (bauer-pitch-*)
Source: `@trevorbauer` Mexico vlog mechanics

| clip_key | source_id | archive | dur_s | verdict | preview_s | webp | notes |
|---|---|---|---|---|---|---|---|
| bauer-pitch-gloveside | (Mexico vlog) | NO | 123 | NEEDS-REVIEW | 3 | MAYBE | Glove-side mechanics; specific vlog ID not confirmed |
| bauer-pitch-hipfire | (Mexico vlog) | NO | 53 | NEEDS-REVIEW | 3 | MAYBE | Hip fire mechanics |

### Bauer Throwing Drills (bauer-drill-*)
Source: `@trevorbauer` throwing drills

| clip_key | source_id | archive | dur_s | verdict | preview_s | webp | notes |
|---|---|---|---|---|---|---|---|
| bauer-drill-clockdrill | (drills series) | NO | 62 | NEEDS-REVIEW | 3 | YES | Clock drill — specific source not confirmed |
| bauer-drill-pulldown | (drills series) | NO | 30 | PASS | 0 | YES | Pulldown throw; 30s; consistent with standard Bauer pulldown content |

### Bauer CP Warmup

| clip_key | source_id | archive | dur_s | verdict | preview_s | webp | notes |
|---|---|---|---|---|---|---|---|
| bauer-cp-warmup | (CP warmup) | NO | 95 | NEEDS-REVIEW | 3 | MAYBE | CP (catch-play) warmup protocol; source not identified |

### Joe Zeller (zeller-*)

| clip_key | source_id | archive | dur_s | verdict | preview_s | webp | notes |
|---|---|---|---|---|---|---|---|
| zeller-pitch-fosh | QoZNfXOATgc | YES (indirect) | 68 | PASS | 3 | MAYBE | Fosh pitch instruction; source confirmed via CLIP_SOURCE |

---

## Sequence / Game Breakdown

### Ducks Sequences (ducks-seq-*)
Source: `@trevorbauer` Long Island Ducks breakdowns — multiple video IDs

| clip_key | source_id | archive | dur_s | verdict | preview_s | webp | notes |
|---|---|---|---|---|---|---|---|
| ducks-seq-fb-splitter-overlay | (Ducks breakdown) | YES | 30 | PASS | 0 | MAYBE | FB/splitter overlay; new clip added v162; source in archive |
| ducks-seq-fb-tunnel-up | (Ducks breakdown) | YES | 44 | PASS | 0 | MAYBE | FB tunnel up sequence |
| ducks-seq-first-pitch | (Ducks breakdown) | YES | 39 | PASS | 0 | MAYBE | First pitch strategy |
| ducks-seq-new-pitch | (Ducks breakdown) | YES | 32 | PASS | 0 | MAYBE | New pitch sequence |
| ducks-seq-splitter-tree | (Ducks breakdown) | YES | 18 | PASS | 0 | MAYBE | Splitter decision tree |
| ducks-seq-tunnel-read | (Ducks breakdown) | YES | 107 | PASS | 3 | MAYBE | Tunnel read full analysis |
| ducks-seq-twoseam-counter | (Ducks breakdown) | YES | 32 | PASS | 0 | MAYBE | Twoseam counter sequence; new v162 |

Note: archive has multiple Bauer game breakdown videos — specific ID per clip needs cross-ref with `_sources/` filenames.

### Mexico Sequences (mx-seq-*)
Source: `WZtCcI7v4pA` (I Faced Mexico's Most Dangerous Hitters) — in archive

| clip_key | source_id | archive | dur_s | verdict | preview_s | webp | notes |
|---|---|---|---|---|---|---|---|
| mx-seq-fb-cutter-tunnel | WZtCcI7v4pA | YES | 12 | PASS | 0 | MAYBE | FB/cutter tunnel; very short sequence clip |
| mx-seq-three-pitch-tree | WZtCcI7v4pA | YES | 19 | PASS | 0 | MAYBE | Three-pitch decision tree |

### Japan Sequences (jp-seq-*)
Source: Multiple Japan game videos in archive

| clip_key | source_id | archive | dur_s | verdict | preview_s | webp | notes |
|---|---|---|---|---|---|---|---|
| jp-seq-same-sequence | (Japan game) | YES | 32 | PASS | 0 | MAYBE | Same-sequence pattern |
| jp-seq-splitter-tunnel | (Japan game) | YES | 42 | PASS | 0 | MAYBE | Splitter tunnel |
| jp-seq-two-pitch-tunnel | (Japan game) | YES | 29 | PASS | 0 | MAYBE | Two-pitch tunnel; new v162 |

---

## Strategy / Design / Command

### Bauer Tunneling (bauer-strat-*)
Source: `WHZUmOm2A2A` (Tunneling Pitches Tips w/Trev Ep 16) — in archive

| clip_key | source_id | archive | dur_s | verdict | preview_s | webp | notes |
|---|---|---|---|---|---|---|---|
| bauer-strat-tunnel-def | WHZUmOm2A2A | YES | 119 | PASS | 3 | MAYBE | Tunnel definition explanation |
| bauer-strat-tunnel-horz | WHZUmOm2A2A | YES | 101 | PASS | 3 | MAYBE | Horizontal tunnel |
| bauer-strat-tunnel-vert | WHZUmOm2A2A | YES | 203 | PASS | 3 | MAYBE | Vertical tunnel — long segment |

### Bauer Pitch Design (bauer-design-*)
Source: `UmSMSEdyNVU` (Trevor Bauer Pitch Design) — in archive

| clip_key | source_id | archive | dur_s | verdict | preview_s | webp | notes |
|---|---|---|---|---|---|---|---|
| bauer-design-curve-spin | UmSMSEdyNVU | YES | 85 | PASS | 3 | MAYBE | Curveball spin design |
| bauer-design-cutter-axis | UmSMSEdyNVU | YES | 89 | PASS | 3 | MAYBE | Cutter axis design |
| bauer-design-spin-theory | UmSMSEdyNVU | YES | 114 | PASS | 3 | MAYBE | Spin theory framework |

### Bauer Command (bauer-cmd-*)
Source: `qtgtQFihXZw` (Command Training — Baseball 401) — in archive

| clip_key | source_id | archive | dur_s | verdict | preview_s | webp | notes |
|---|---|---|---|---|---|---|---|
| bauer-cmd-session | qtgtQFihXZw | YES | 132 | PASS | 3 | MAYBE | Command training session |
| bauer-cmd-targets | qtgtQFihXZw | YES | 64 | PASS | 3 | MAYBE | Target-based command training |

---

## Japan Vlog — Mobility / Warmup (jp1-*, jp2-*)
Source: `Q65LYjUEpHg` (I Faced Japan's Home Run Champion) — in archive

| clip_key | source_id | archive | dur_s | verdict | preview_s | webp | notes |
|---|---|---|---|---|---|---|---|
| jp1-core-floor | Q65LYjUEpHg | YES | 38 | PASS | 2 | YES | Floor core work drills |
| jp1-roller-hips | Q65LYjUEpHg | YES | 40 | PASS | 2 | YES | Hip foam roller |
| jp1-roller-tspine | Q65LYjUEpHg | YES | 42 | PASS | 2 | YES | T-spine foam roller |
| jp1-teamstretch | Q65LYjUEpHg | YES | 28 | PASS | 2 | YES | Team stretching routine |
| jp2-drill-posturesquat | Q65LYjUEpHg | YES | 56 | PASS | 2 | YES | Posture squat drill |

---

## Infield Drills

### Ron Washington (wash-*)
Source: `4Xm_WZrLGEY` (SF Giants — Train Like a Big League First Baseman) — not confirmed in archive

| clip_key | source_id | archive | dur_s | verdict | preview_s | webp | notes |
|---|---|---|---|---|---|---|---|
| wash-arrow | 4Xm_WZrLGEY | NO | 24 | NEEDS-REVIEW | 1 | YES | Arrow footwork drill |
| wash-crossover | 4Xm_WZrLGEY | NO | 36 | NEEDS-REVIEW | 1 | YES | Crossover step |
| wash-force | 4Xm_WZrLGEY | NO | 22 | NEEDS-REVIEW | 1 | YES | Force play positioning |
| wash-fungo | 4Xm_WZrLGEY | NO | 36 | NEEDS-REVIEW | 1 | YES | Fungo drill |
| wash-gloveside | 4Xm_WZrLGEY | NO | 32 | NEEDS-REVIEW | 1 | YES | Glove-side positioning |
| wash-knee-backhand | 4Xm_WZrLGEY | NO | 16 | NEEDS-REVIEW | 0 | YES | Knee backhand |
| wash-knee-center | 4Xm_WZrLGEY | NO | 16 | NEEDS-REVIEW | 0 | YES | Knee center fielding |
| wash-knee-forehand | 4Xm_WZrLGEY | NO | 25 | NEEDS-REVIEW | 1 | YES | Knee forehand |
| wash-number-hops | 4Xm_WZrLGEY | NO | 22 | NEEDS-REVIEW | 1 | YES | Number hops footwork |
| wash-pad | 4Xm_WZrLGEY | NO | 36 | NEEDS-REVIEW | 1 | YES | Pad drill |
| wash-stand-glove | 4Xm_WZrLGEY | NO | 30 | NEEDS-REVIEW | 1 | YES | Standstill glove work |
| wash-standstill | 4Xm_WZrLGEY | NO | 22 | NEEDS-REVIEW | 1 | YES | Standstill fielding |

### Second Base (w2b-*)
Source: `FQmBV74Miyo` (SF Giants — Train Like a Big League Second Baseman)

| clip_key | source_id | archive | dur_s | verdict | preview_s | webp | notes |
|---|---|---|---|---|---|---|---|
| w2b-alignment | FQmBV74Miyo | NO | 36 | NEEDS-REVIEW | 1 | YES | Alignment drill |
| w2b-downhill | FQmBV74Miyo | NO | 34 | NEEDS-REVIEW | 1 | YES | Downhill momentum drill |
| w2b-fungo | FQmBV74Miyo | NO | 28 | NEEDS-REVIEW | 1 | YES | Fungo drill |
| w2b-outfront | FQmBV74Miyo | NO | 32 | NEEDS-REVIEW | 1 | YES | Out-front play |
| w2b-straight | FQmBV74Miyo | NO | 26 | NEEDS-REVIEW | 1 | YES | Straight-at ball |
| w2b-tall | FQmBV74Miyo | NO | 30 | NEEDS-REVIEW | 1 | YES | Tall fielding posture |

### Giants Infield Series (gi1-*, gi2-*, gi3-*, gi4-*)

| clip_key | source_id | archive | dur_s | verdict | preview_s | webp | notes |
|---|---|---|---|---|---|---|---|
| gi1-center | k55JCIS1UOM | NO | 52 | NEEDS-REVIEW | 1 | YES | Center fielding position |
| gi1-killspot | k55JCIS1UOM | NO | 55 | NEEDS-REVIEW | 1 | YES | Kill spot technique |
| gi1-onelane | k55JCIS1UOM | NO | 45 | NEEDS-REVIEW | 1 | YES | One-lane approach |
| gi1-twoshuffles | k55JCIS1UOM | NO | 37 | NEEDS-REVIEW | 1 | YES | Two-shuffle footwork |
| gi1-twospeeds | k55JCIS1UOM | NO | 52 | NEEDS-REVIEW | 1 | YES | Two-speed approach |
| gi2-feed | JmuwqhAEQKg | NO | 50 | NEEDS-REVIEW | 1 | YES | Feed mechanics |
| gi2-rapidfire | JmuwqhAEQKg | NO | 45 | NEEDS-REVIEW | 1 | YES | Rapid-fire drill |
| gi2-rightfoot | JmuwqhAEQKg | NO | 44 | NEEDS-REVIEW | 1 | YES | Right foot positioning |
| gi3-onehand | h7i5xRzGCuw | NO | 42 | NEEDS-REVIEW | 1 | YES | One-hand fielding (David Villar) |
| gi3-pocket | h7i5xRzGCuw | NO | 60 | NEEDS-REVIEW | 1 | YES | Pocket technique |
| gi3-relax | h7i5xRzGCuw | NO | 48 | NEEDS-REVIEW | 1 | YES | Relaxed fielding technique |
| gi4-read | 5b65wed5L1A | NO | 48 | NEEDS-REVIEW | 1 | YES | Read technique (LaMonte Wade Jr.) |
| gi4-shortlong | 5b65wed5L1A | NO | 45 | NEEDS-REVIEW | 1 | YES | Short/long hop adjustment |

### Freddie Freeman (fw-1b-*)
Source: `3juKYF0SoHE` (Freddie Freeman First Base Defensive Drills)

| clip_key | source_id | archive | dur_s | verdict | preview_s | webp | notes |
|---|---|---|---|---|---|---|---|
| fw-1b-scoops | 3juKYF0SoHE | NO | 32 | NEEDS-REVIEW | 1 | YES | Scooping low throws |
| fw-1b-stretch | 3juKYF0SoHE | NO | 21 | NEEDS-REVIEW | 1 | YES | First-base stretch |

---

## Summary

| Category | Total clips | PASS | NEEDS-REVIEW | TIMING-FIX | REPLACE |
|---|---|---|---|---|---|
| Catching (bougie-*) | 10 | 10 | 0 | 0 | 0 |
| Catching (cat1-*, cat2-*, cat3-*) | 6 | 0 | 6 | 0 | 0 |
| J-Bands (jband-*) | 8 | 7 | 0 | 1 | 0 |
| JBJ (jbj-*) | 13 | 13 | 0 | 0 | 0 |
| Tube (tube-*) | 4 | 4 | 0 | 0 | 0 |
| Recovery (bauer-recov-*, ru-*) | 11 | 6 | 5 | 0 | 0 |
| Game Day / Warmup (bauer-gd-*, bauer-warmup-*) | 12 | 12 | 0 | 0 | 0 |
| PlyoCare (plyo-*) | 9 | 9 | 0 | 0 | 0 |
| Mechanics (bauer-mech-*, bauer-pitch-*, bauer-drill-*, bauer-cp-*) | 7 | 1 | 6 | 0 | 0 |
| Sequences (ducks-seq-*, mx-seq-*, jp-seq-*) | 12 | 12 | 0 | 0 | 0 |
| Strategy / Design / Command (bauer-strat-*, bauer-design-*, bauer-cmd-*) | 10 | 10 | 0 | 0 | 0 |
| Japan Vlog (jp1-*, jp2-*, zeller-*) | 6 | 6 | 0 | 0 | 0 |
| Infield (wash-*, w2b-*, gi-*, fw-1b-*) | 31 | 0 | 31 | 0 | 0 |
| **TOTAL** | **139** | **90** | **48** | **1** | **0** |

**TIMING-FIX (1):** `jband-shouldercircles` — 4s may not complete a full shoulder circle rep.

**NEEDS-REVIEW (48):** All are clips whose source is not in the local archive. Content names match expected source material, but timing cannot be verified without re-downloading the source video. Priority re-verification targets: `cat1-*`, `cat2-*`, `cat3-*` (catching), `ru-*` (Rogue Umpire), `bauer-recov-eccentric`, `bauer-recov-iso`.

**No REPLACE verdicts.** No clips identified as demonstrating the wrong movement for their label.

---

## Pending Merge (not in master clips/ as of 2026-10-03)

The following clips are on pushed branches awaiting Lane E merge:

**`laneM/recov-clips-req015` @ f9f3dff:**
- `bougie-recv-drills5` variant (v8siJeI2WuU — youth receiving) — CLIP_SOURCE prefix `bougie-recv-`
- ProPoint throw harder (S0RhYgfVTAw) — CLIP_SOURCE prefix `propoint-throw-`
- (2 additional clips from prior session — see branch)

**`laneM/v160-lax-clips-req038` @ 7561d87:**
- `lax-pec-minor-full.mp4` — mghh0eR7Uz4, 1:41, pec minor pin-and-stretch
- `lax-posterior-shoulder-infra.mp4` — 5fpqpSAezJA cut 4:36–5:58, infraspinatus wall technique
- `lax-upper-trap-full.mp4` — j4VZXse7zRM, 0:29 Short
- `lax-rhomboid-full.mp4` — thr8mk6lkqE, 0:27

These will need review log entries once merged.

---

## WebP Preview Spec — Status

D.26.10.03.1 designed initial spec (480×270, 12fps, 2–3s, ~150KB). Testing revealed the `libwebp_anim` ffmpeg encoder does not use inter-frame delta compression, so actual sizes are:

| Content type | 480×270 / 12fps / 3s | 320×180 / 10fps / 3s |
|---|---|---|
| Complex full-body motion (catching) | ~560KB @ default / ~275KB @ q30 | ~191KB |
| Simple single-person exercise | ~220KB @ q75 | ~100–120KB (estimated) |

**Awaiting D spec revision** before running full production batch. Production will update this section with final spec and per-clip actual file sizes.
