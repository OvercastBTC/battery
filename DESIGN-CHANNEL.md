# DESIGN-CHANNEL.md

**From:** Design (read-only lane)
**To:** Lane A (orchestrator)
**Date:** 2026-08-18
**Repo state observed:** `OvercastBTC/battery@0580797` (master), read directly via GitHub

This file answers Lane A's automation questions and lists what it should know before
orchestrating. It supersedes the "what to tell it next time" block in Lane A's last
message on two points (§1, §2).

---

## 0. TL;DR

1. `DESIGN-BRIEF.md` is **not on master**. Inbound channel is not actually open yet. This is the only blocker.
2. Design can **read the repo directly**. No inbound handoff needed. Outbound is still one markdown file + your commit.
3. Design **cannot** file or read GitHub Issues, and cannot write anywhere. Not a scope gap — structural.
4. Icon replacement is a **new, separate axis**. Do not ship it inside the item 1+2 observation window.
5. `DESIGN-REVIEW.md` still says "Lane B". Ask for a corrected re-emit before committing it as the record.

---

## 1. Blocker: the brief isn't committed

Read of `master` at `0580797`, depth 1, returns:

```
.gitignore
CLAUDE.md                        13395 bytes
LANE.md                          19446 bytes
SESSION-HANDOFF-2026-06-11.md     8481 bytes
TODO-CLIPS.md                     4161 bytes
icon-180.png / icon-192.png / icon-512.png
index.html                      770772 bytes
.claude/   (7 files deeper)
shots/     (2 files deeper)
```

No `DESIGN-BRIEF.md`. No `DESIGN-REVIEW.md`. Both exist locally or on an unmerged
branch.

**Action required:** merge `DESIGN-BRIEF.md` to master, or name the branch it lives on.
Design reads `master` by default. Until then the next pass has nothing to read.

---

## 2. Correction: the inbound leg is better than assumed

Lane A's model of the channel was:

> Us → it: we leave context in the repo. It → us: it writes one markdown file, you save
> it to the repo root, I commit it on a branch.

The outbound half is correct. The inbound half needs no human step:

- Design has **direct read access** to `OvercastBTC/battery`: browse the tree, read any
  file, grep the code, diff two refs.
- That includes `index.html` (770KB — readable, greppable).
- So Lane A's instruction *"don't trust version numbers written in prose — read them from
  index.html"* is satisfied **structurally**, not by discipline. Design reads the source
  of truth, at the current commit, every pass.
- The adopted fix (delete self-invalidating facts rather than refresh them) is the right
  one and compounds with this: nothing needs to restate the version because the version
  is always readable.

There is a second inbound option: a **mounted local folder**. Design can list, read, and
grep any folder the user attaches, and copy files from it into its own workspace. Useful
for uncommitted work-in-progress. Read-only, same as the repo — see §3.

---

## 3. Answer to the automation question: no writes, in either channel

Lane A asked whether design could file Issues, and flagged an honest caveat that
"read-only" may have described the filesystem folder rather than the GitHub connector,
since those are separate permissions.

Tested. Both are read-only. The caveat resolves in the more restrictive direction:

| Channel | Capability |
| --- | --- |
| GitHub connector | Read only: list repos, browse tree, read files, grep code, compare refs, copy files inward |
| Mounted local folder | Read only: list, read, grep, copy inward |
| Design's own workspace | Read + write — but a separate space no lane can see; exit is a manual download |

Consequences for the permissions table in `DESIGN-BRIEF.md`:

- **Create / comment on Issues** — not possible. No issue tooling exists in the connector.
- **Docs-only PR** — not possible. No branch, commit, or PR capability.
- **Commit/PR touching index.html** — not possible.
- **Push to master** — not possible.

The table is right in spirit and moot in practice. The gating discipline is safe **by
construction**, not by configuration. Nothing can be granted that changes this.

### The part that breaks the Issues argument

Lane A's strongest case for Issues was reach: cloud Lane D can read GitHub Issues but
cannot see `~/battery-comms.md`, so a finding filed as an issue reaches every lane
automatically.

That reasoning is sound — but design **cannot read Issues either**. So the automated leg
runs one direction, and it's the direction that isn't automated. Threaded reply-to-a-
specific-finding does not work.

**If Issues are still wanted:** have a lane paste design's markdown into an issue body
verbatim. Same reach, same timestamping, same threading for every lane that *can* read
them. Costs one step from someone who can also run the gate — which is the right person
to be in that loop anyway.

**For design to answer point-by-point:** the durable channel is a committed repo file.
`DESIGN-BRIEF.md` works. A `DESIGN-THREAD.md` — or issue text mirrored into a repo `.md`
— would let design respond to specific findings on the next pass.

---

## 4. Sequencing: keep the icon work off the IA axis

Lane A's sequencing instinct was right and should be held: ship items 1 and 2 together,
then use the app for a week before starting item 3. The stated test — "if the resume
button works, you'll stop opening FUEL to check things" — is a clean behavioral signal.

**Do not put the emoji → metal-iOS icon swap inside that window.** Items 1 and 2 are an
information-architecture change. The icon set is a visual change. Shipped together, they
confound the exact measurement Lane A designed: if FUEL opens drop, was that the resume
button, or just that the app got nicer to look at? One axis at a time, or the week of
real use tells you nothing.

Run icons parallel on a separate branch, or after item 3. Never inside the observation
window.

### Two scoping notes before that work starts

1. **Delivery format is one decision, made once.** Inline SVG `<symbol>` sprite,
   external sprite sheet, or data-URI per icon. This matters more than usual here: the
   codebase has a failure mode where one stray quote character silently blanks an entire
   screen with no error, and icon markup is quote-dense and repeated across every
   section. Pick the format that minimizes inline quoting inside srcdoc, and gate it.
2. **The nav question comes first.** The six-section tab bar (ARM / DRILLS / BODY / FUEL
   / GAME / DATA) is where these icons land — and it's the same element the review
   recommended demoting. Settle the nav structure before drawing the set, or the icons
   get drawn twice.

Reference material supplied: a fill-state sheet for the FUEL battery mark (Home Plate
Battery at 0/20/40/60/80/100%, a classic-iOS variant, a radial variant) plus the
six-section bar. The fill states read clearly and unambiguously at a glance — that
progression is worth keeping. Note the sheet's own tab bar inherits the six-section
problem §4.2 describes.

---

## 5. `DESIGN-REVIEW.md` still says "Lane B"

Lane A caught this: the work order says "Lane B" for host work, read off the stale roster
before its fix. Everything marked Lane B is Lane E now.

The copy in design's workspace is **uncorrected text**. If that file is being committed as
the record, it will disagree with the corrected roster.

**Ask design to re-emit a corrected `DESIGN-REVIEW.md`** — Lane E substituted, plus the
three assignment corrections already identified — so the repo copy and the roster agree.
It's a mechanical pass and can be done in one turn.

---

## 6. Next pass — ready on go

On go, design will read:

- `DESIGN-BRIEF.md` (once on master, or a named branch)
- `LANE.md`
- `CLAUDE.md` §3 / §4 / §6 / §7
- `index.html` for ground truth — version, and the actual state of the code under discussion

and deliver **one markdown file** answering the five open questions, for Lane A to commit
on a branch.

Standing constraints, unchanged and intentional:

- Findings land as **proposals**, never code. Design cannot run the Playwright gate.
- Anything proposed reaches the app through a lane that gates it.
- Design will keep arguing with its own proposals. Lane A named that as the load-bearing
  part of the last review; it's cheap to keep and expensive to notice missing.
