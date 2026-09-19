#!/usr/bin/env bash
# REQ-015: VTT timestamp extraction
# Usage: vtt-extract.sh <vtt-file> <keyword> [--window=60] [--context]
# Output: [HH:MM:SS - HH:MM:SS] — surrounding text snippet
# Requires: node v20+ (AM06 has v24)

set -euo pipefail

WINDOW=60
SHOW_CONTEXT=0
VTT=""
KEYWORD=""

for arg in "$@"; do
    case "$arg" in
        --window=*) WINDOW="${arg#--window=}" ;;
        --context)  SHOW_CONTEXT=1 ;;
        *.vtt)      VTT="$arg" ;;
        *)          KEYWORD="$arg" ;;
    esac
done

if [[ -z "$VTT" || -z "$KEYWORD" ]]; then
    echo "Usage: $0 <file.vtt> <keyword> [--window=60] [--context]" >&2
    exit 1
fi

if [[ ! -f "$VTT" ]]; then
    echo "Error: file not found: $VTT" >&2
    exit 1
fi

VTT_PATH="$VTT" KEYWORD="$KEYWORD" WINDOW="$WINDOW" SHOW_CTX="$SHOW_CONTEXT" \
node --input-type=module << 'JSEOF'
import { readFileSync } from 'node:fs';

const vttPath = process.env.VTT_PATH;
const keyword = process.env.KEYWORD;
const windowSec = parseFloat(process.env.WINDOW);
const showCtx = process.env.SHOW_CTX === '1';

const raw = readFileSync(vttPath, 'utf8');
const kwLower = keyword.toLowerCase();

function ts2s(ts) {
  const [h, m, s] = ts.replace(',', '.').split(':');
  return (+h) * 3600 + (+m) * 60 + parseFloat(s);
}

function s2hms(sec) {
  sec = Math.floor(sec);
  return [Math.floor(sec/3600), Math.floor((sec%3600)/60), sec%60]
    .map(n => String(n).padStart(2,'0')).join(':');
}

function stripTags(t) { return t.replace(/<[^>]+>/g, '').trim(); }

// Parse VTT cues
const cues = [];
for (const m of raw.matchAll(/(\d{2}:\d{2}:\d{2}[.,]\d+)\s+-->\s+(\d{2}:\d{2}:\d{2}[.,]\d+)[^\n]*\n([\s\S]*?)(?=\n\n|\n*$)/g)) {
  const text = stripTags(m[3]).replace(/\n/g,' ').trim();
  if (text) cues.push({ start: ts2s(m[1]), end: ts2s(m[2]), text });
}

// Deduplicate rolling YouTube VTT lines
const deduped = [];
let prev = '';
for (const c of cues) {
  if (c.text === prev || c.text.startsWith(prev + ' ') || prev.startsWith(c.text)) {
    prev = c.text; continue;
  }
  deduped.push(c); prev = c.text;
}
const working = deduped.length ? deduped : cues;

// Find keyword hits
const hits = working.filter(c => c.text.toLowerCase().includes(kwLower)).map(c => c.start);

if (!hits.length) {
  console.log(`No matches for "${keyword}" in ${vttPath}`);
  process.exit(0);
}

// Cluster nearby hits into windows
const clusters = [];
let cs = hits[0], cl = hits[0];
for (let i = 1; i < hits.length; i++) {
  if (hits[i] - cl <= windowSec) { cl = hits[i]; }
  else { clusters.push([cs, cl]); cs = hits[i]; cl = hits[i]; }
}
clusters.push([cs, cl]);

// Output each cluster
for (const [first, last] of clusters) {
  const ws = Math.max(0, first - windowSec / 2);
  const we = last + windowSec / 2;
  const inWindow = working.filter(c => c.start >= ws && c.end <= we + 5);
  const seen = new Set();
  const unique = inWindow.filter(c => seen.has(c.text) ? false : seen.add(c.text));
  let summary = unique.map(c => c.text).join(' ').replace(/\s+/g, ' ');
  if (summary.length > 220) summary = summary.slice(0, summary.lastIndexOf(' ', 220)) + '…';
  console.log(`[${s2hms(ws)} - ${s2hms(we)}] — ${summary}`);
  if (showCtx) {
    unique.forEach(c => console.log(`  ${s2hms(c.start)}: ${c.text}`));
    console.log('');
  }
}
JSEOF
