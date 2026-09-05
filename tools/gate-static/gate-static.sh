#!/usr/bin/env bash
# STATIC GATE — the part of the gate that runs anywhere, including Lane M.
#
# WHY THIS EXISTS
# CLAUDE.md states a hard boundary: "Do not add a writer that cannot gate." The
# reason is §3's srcdoc footgun — one literal " inside srcdoc="..." silently
# discards the rest of the iframe, with no console error and a clean `node --check`.
# The embed carve-out makes Lane M a writer of index.html, so that boundary applies
# to Lane M. This is what keeps it intact rather than merely waived.
#
# The full gate needs Playwright browsers, python and node v20, none of which Lane M
# has. These two suites need NONE of that: they import only node:fs / node:path /
# node:url, so there is no npm install, no browser download, and no version pin.
# They run on the Beelink's node v24 under Git Bash exactly as they run here.
#
# WHAT IT DOES AND DOES NOT PROVE
# Catches: srcdoc truncation, malformed CLIP_SOURCE / OFFICIAL_DEMOS / CLIP_EMBED,
# prefix shadowing, uncredited or uppercase clip references.
# Does NOT catch: anything behavioural. No rendering, no boot errors, no youth gate,
# no persistence. Passing this is necessary, not sufficient — the Mac still runs the
# full suite before anything ships. Say "static gate passed", never "gate passed".
#
# USAGE (Git Bash on Lane M, or anywhere):
#   bash tools/gate-static/gate-static.sh              # gates ./index.html
#   bash tools/gate-static/gate-static.sh path/to/index.html
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP="${1:-$(cd "${HERE}/../.." && pwd)/index.html}"

if [ ! -f "${APP}" ]; then
  echo "gate-static: no such file: ${APP}" >&2
  echo "  usage: bash tools/gate-static/gate-static.sh [path/to/index.html]" >&2
  exit 2
fi

# Resolve to an absolute path so the suites' own cwd cannot matter.
APP="$(cd "$(dirname "${APP}")" && pwd)/$(basename "${APP}")"

echo "→ static gate on ${APP}"
echo "→ node $(node --version)"
echo

export BATTERY_APP="${APP}"
node "${HERE}/srcdoc-integrity.test.mjs"
echo
node "${HERE}/clip-config.test.mjs"

echo
echo "STATIC GATE PASSED — necessary, NOT sufficient."
echo "Behavioural suites (render, boot, persistence, youth gate) still run on the Mac."
