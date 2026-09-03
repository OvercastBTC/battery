# tools/

Machine-level coordination tooling for the BATTERY multi-session workflow.
These are **not** part of the app — `index.html` never references them.

## `battery-lane`

Durable lane identity. See CLAUDE.md §6 → "Who is what lane right now".

The canonical runnable copy lives at `~/.local/bin/battery-lane` (on `PATH`).
The copy here is the versioned source of truth — if you change one, sync the other:

```bash
cp tools/battery-lane ~/.local/bin/battery-lane && chmod +x ~/.local/bin/battery-lane
```

Install on a new machine:

```bash
mkdir -p ~/.local/bin && cp tools/battery-lane ~/.local/bin/ && chmod +x ~/.local/bin/battery-lane
```

Its registry (`~/battery-lanes.json`) is deliberately machine-local and untracked:
it describes live sessions on one Mac, which no other machine can observe.

## `battery-status`

One cross-lane snapshot: who is live, what is unmerged, what is deployed, and what
is waiting on a human.

```bash
battery-status
```

Deliberately **fast and read-only**. It never runs the Playwright gate and never
writes anything.

It reports the last gate result **recorded in comms**, labelled as a claim rather
than a verification — because a gate result you did not produce is not evidence.
Anything asserting green without having run it would be the same failure class
CLAUDE.md §6.5 warns about: an instrument that cannot return a negative.

Canonical runnable copy lives at `~/.local/bin/battery-status`; keep it in sync with
this one the same way as `battery-lane`.
