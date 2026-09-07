# Film-study library — storage architecture

**Status:** assessment by Lane A, 2026-09-07, at owner request. **Not implemented.**
Written before anything is built, because the owner's instruction was *"build in from
the start, not retrofit"* — and retrofitting is exactly what git makes expensive.

---

## The measured position

Not estimates — measured against this repo today:

| | |
|---|---|
| `.git` (real, shared across worktrees) | **195 MB** |
| working tree | 106 MB |
| `clips/` | **104 MB, 82 files** |
| clip blobs in history | **114 MB — 33% of all blob bytes** |
| largest single clip | 7.3 MB (a ~2 min cut at 640×360 crf 32) |
| tracked files | 122 |

**One third of this repository's history is already video**, from 82 short technique
demos at a deliberately low bitrate. That is the baseline the film-study idea would
be added on top of.

## The constraint that decides it, before any of the three options

The owner stated the boundary himself: this is **third-party broadcast/interview
footage, defensible as personal film study, not for publishing or distribution.**

`battery` is a **public** repository, and GitHub Pages serves the deployed app **from
`master`**. So anything committed here is published — to the repo *and* to the site —
by construction, not by choice. That is not a storage-layout detail; it settles the
question ahead of it:

> **No git layout in this repository lets the app serve this footage while keeping it
> unpublished. Those two requirements are in direct conflict, and no repo topology
> resolves it.**

Worth stating plainly because it is easy to treat "private repo vs submodule vs
gitignore" as the question. It isn't. The real question underneath is *what the
footage is for*, and the answer changes the architecture completely:

- **Personal study** (owner watches it, alone) → this is a **media-library** problem.
  Git is the wrong tool regardless of which repo, for reasons below.
- **Shipped in a product** → this is a **licensing** problem. Storage cannot solve it,
  and a private repo would only postpone the moment it matters.

## Why git is the wrong container for the video specifically

Independent of public/private, and this is the part that bites later rather than now:

1. **Git keeps every version forever.** A re-cut clip does not replace the old one; it
   stores both, permanently, in every clone. Film study is *inherently* iterative —
   retrim, retag, re-encode as you learn what you're looking for. That workflow is the
   worst possible fit for content-addressed immutable storage. The 33% figure above is
   from clips that were mostly cut *once*.
2. **Video does not delta-compress.** Two cuts of the same play share no compressible
   structure. Every variant costs full size.
3. **Resolution has to go UP, not down.** The house profile (640×360, crf 32) is tuned
   for technique demos where the point is gross body position. **You cannot see pitch
   tunneling at 640×360** — the thing being studied is a few inches of separation at
   60 ft. Study footage needs materially higher bitrate, so per-clip cost rises well
   above the current 1.3 MB average even before clips get longer.
4. **Length goes up too.** The owner has already asked @LANE-M for *longer* cuts for
   review. Situational study (runners on, score state) needs whole sequences, not 25 s.
5. **Hard ceilings exist.** GitHub rejects any single file over 100 MB outright, and a
   published Pages site is capped around 1 GB. *(Stated from prior knowledge — worth
   re-confirming against current GitHub docs before anyone relies on the exact numbers;
   the direction is not in doubt.)* At a plausible 200 study clips × 5 MB we are at
   1 GB — the app's own deployment budget, spent on footage the app must not serve.

## The three options the owner named

**(a) Gitignored media dir in-repo.** Cheapest, and it does stop the bloat. But it is
**not backed up and not versioned** — the same single-copy exposure already flagged for
`~/battery-tests`. And §6.5's lesson applies directly: *"a file that is only in iCloud
cannot be read, and it will not tell you so."* A gitignored directory has no manifest,
so a missing file is **silently** missing. Usable only with the manifest fix below.

**(b) Private submodule.** Cleanly separates history and enforces the boundary at the
repo level. But it buys little here and costs real ergonomics: submodules produce
detached HEADs and forgotten `--recursive` clones, and **@LANE-M is a Windows clone that
already cannot run the full gate** — adding submodule mechanics to the least-instrumented
lane is the wrong place to spend complexity. Decisively: **GitHub Pages does not check
out submodules for the published site**, so it cannot serve the media anyway — and if it
*could*, that would violate the privacy boundary. *(Pages/submodule behaviour stated
from prior knowledge, not re-verified today.)* It solves a problem we don't have while
adding failure modes to the lane least able to absorb them.

**(c) Separate private repo.** The right home **for the study notes and taxonomy**, and
the only option that enforces privacy by permission rather than by convention. But on
its own it does not fix the version-forever or resolution problems — it relocates them
somewhere they are merely less visible.

## Recommendation

**Split the library along the seam that actually exists — index vs payload.**

> **A film-study library is a metadata problem with video attachments.**

The owner's own requirement says so: *"tagged/retrievable by concept, not a linear drill
sequence."* That is a **query** requirement. The video is the payload; the concepts,
timestamps, counts, handedness and situation are the product. Git is excellent for the
index — small, diffable, reviewable, mergeable — and actively bad for the payload.

1. **The index goes in git.** Concepts, tags, timestamps, annotations, source
   references. Kilobytes. Diffable, so a taxonomy change is reviewable. Put it in a
   **private repo** if the study notes themselves should be private — that is the
   defensible reason to create one, not repo size.

2. **The payload does not go in git at all.** A local media directory, synced by a
   file-sync tool, addressed by stable ID from the index.

3. **Commit a MANIFEST alongside the index** — id, filename, duration, byte size,
   checksum. This is the §6.5 rule generalised: it makes a missing or unmaterialised
   file **detectable** instead of silently absent, which is precisely the failure that
   section exists to prevent. It is also gate-checkable the same way `clip-config`
   already checks the clip tables.

4. **Where the source is publicly available, prefer `CLIP_EMBED` over storing anything.**
   This is the part worth noticing: the embed pattern @LANE-M is already building —
   external video ID + start/end seconds — **is the film-study pattern**. Zero bytes
   stored, arbitrary clip length, no re-hosting, and it sidesteps the distribution
   question entirely because it points at the source rather than copying it. For any
   study clip whose source is publicly hosted, embedding is strictly better than
   storing: cheaper, longer, and cleaner on rights. The timestamp config was scoped as
   a convenience for drill demos; it turns out to be the load-bearing primitive here.

**So: a private repo, yes — for the index. Not as the place to put the video.**

## Taxonomy — open, and deliberately not decided here

The owner asked these early, which is right, but they are product questions and I would
rather put the options in front of him than pick silently:

- **Dimensions.** Pitch type · count · situation (runners/score) · batter handedness ·
  concept (tunneling, combos, swing type). Note these are **not** one hierarchy — a clip
  is many tags, not one folder. That is an argument for flat tags plus query, and
  against a directory tree, which is the shape a "library" instinctively suggests.
- **Annotations.** Does a clip need in-frame marks, or is a timestamped note enough?
  Materially different builds; the second is nearly free, the first is not.
- **Shared pipeline or separate?** The *index* should share `clip-config`'s validation
  approach. The *payload* should not share `clips/`, for every reason above.

## What should happen now

- **Nothing large lands in `battery` in the meantime.** @LANE-M has been told to hold
  long-form cuts locally and report that they exist rather than committing them. That
  is reversible; a 500 MB commit is not.
- The football-film-study analogy the owner used is worth taking literally: those systems
  are **databases with video attached**, not video collections. That is the whole
  recommendation in one sentence.
