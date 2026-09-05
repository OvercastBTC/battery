// CLIP CONFIG GATE  (static — no browser, runs in milliseconds)
//
// WHY THIS EXISTS, AND WHO IT IS FOR
// Lane M (the networked PC) owns clip data: it cuts the files, and it edits the
// two prefix tables that credit them. That carve-out is deliberate — Lane M has
// the source video in hand and Lane A does not, so routing "which video, which
// seconds" through Lane A would put the less-informed party in the path. The
// condition attached to that carve-out, in CLAUDE.md, was that the config be
// GATE-VALIDATED FOR STRUCTURE, so a malformed entry fails here rather than
// shipping. This is that gate.
//
// CORRECTION TO AN EARLIER CLAIM IN THIS FILE: it said "Lane M cannot run it (no
// python, no Playwright browsers, node v24 vs v20)". That is true of the FULL gate
// and FALSE of this suite. This one and srcdoc-integrity.test.mjs import only
// node:fs / node:path / node:url — no browser, no python, nothing v20-specific.
// Lane M has node v24 and Git Bash, so it CAN run both, and must: CLAUDE.md's hard
// boundary is "do not add a writer that cannot gate", and the embed carve-out makes
// Lane M a writer of index.html. Being runnable there is what keeps that boundary
// intact rather than merely waived. That is also why HERE uses fileURLToPath and
// not `new URL(...).pathname` — the latter yields "/C:/Users/..." on Windows, which
// is not a valid path, and never decodes %20 on any platform.
//
// THE NON-OBVIOUS INVARIANT: both sourceFor() and officialFor() do FIRST-MATCH-WINS
// prefix matching over an array (`name.indexOf(P) === 0`, returning on first hit).
// That makes ARRAY ORDER LOAD-BEARING and nothing says so. If a shorter prefix is
// ever placed before a longer one that EXTENDS IT AS A STRING, the longer row
// becomes unreachable dead config and its clips silently take the wrong credit.
// This table already contains the pair that makes it concrete: 'fw-1b-' (Freddie
// Freeman first-base drills). The day anyone adds a general 'fw-' row above it,
// every fw-1b- clip is credited to the wrong video. No error, no console warning
// — just wrong attribution on screen. Since crediting the source is what the owner
// agreed to in exchange for using this footage, a silent mis-credit is the failure
// mode that actually matters here.
//
// Note the trap in stating that invariant: 'gi-' does NOT shadow 'gi1-'. It reads
// like it should, but 'gi1-' begins 'g','i','1' — the dash never lines up. Only a
// true string-prefix shadows. The first draft of the negative control asserted the
// 'gi-' case, stayed green, and correctly reported this check as inert.
//
// It is clean as of writing (79 clip references, 0 uncredited, 0 shadowed). A test
// that only ever passes proves nothing, so every assertion below is negative-
// controlled by mutation in clip-config.negctl.mjs — each one has been shown to
// go RED on a build that violates it.
import fs from 'node:fs'; import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const APP  = process.env.BATTERY_APP || process.env.CLIP_CONFIG_APP || path.join(HERE, 'app-fixed.html');

let pass = true;
const log = (ok, m) => { pass = pass && ok; console.log(`  ${ok?'✓':'✗'} ${m}`); };
const note = (m) => console.log(`  · ${m}`);

console.log('CLIP CONFIG');
const src = fs.readFileSync(APP, 'utf8');

// ---------------------------------------------------------------------------
// Locate the tables. A rename must FAIL here, not skip quietly — a skip-guard
// that disarms itself when the thing it guards is renamed is how a suite goes
// green while the feature is gone.
// ---------------------------------------------------------------------------
function table(name, arity) {
  const anchor = `var ${name}=[`;
  const at = src.indexOf(anchor);
  log(at !== -1, `${name}: table located`);
  if (at === -1) return null;

  // Walk brackets rather than regexing to the first ']', because entries contain
  // no nested arrays today but a future one might, and a greedy/lazy regex would
  // silently truncate or overrun instead of failing.
  const open = at + anchor.length - 1;
  let depth = 0, end = -1;
  for (let i = open; i < src.length; i++) {
    const c = src[i];
    if (c === '[') depth++;
    else if (c === ']') { depth--; if (depth === 0) { end = i; break; } }
    else if (c === "'" || c === '"') {           // skip string bodies
      const q = c;
      for (i++; i < src.length; i++) {
        if (src[i] === '\\') { i++; continue; }
        if (src[i] === q) break;
      }
    }
  }
  log(end !== -1, `${name}: literal is balanced`);
  if (end === -1) return null;

  let rows;
  try { rows = new Function('return ' + src.slice(open, end + 1))(); }
  catch (e) { log(false, `${name}: parses as JS (${e.message})`); return null; }

  log(Array.isArray(rows) && rows.length > 0, `${name}: non-empty (${rows.length} entries)`);
  if (!Array.isArray(rows) || !rows.length) return null;

  const badShape = rows.filter(r => !Array.isArray(r) || r.length !== arity);
  log(badShape.length === 0,
      `${name}: every entry is a ${arity}-tuple` +
      (badShape.length ? ` — ${badShape.length} malformed: ${JSON.stringify(badShape[0])}` : ''));

  return rows;
}

const CLIP_SOURCE    = table('CLIP_SOURCE', 3);      // [prefix, title, url]
const OFFICIAL_DEMOS = table('OFFICIAL_DEMOS', 2);   // [prefix, url]

// ---------------------------------------------------------------------------
// Structural validity of each row.
// ---------------------------------------------------------------------------
function structure(name, rows, urlIdx) {
  if (!rows) return;

  const badPrefix = rows.filter(r => typeof r[0] !== 'string' || !r[0].length);
  log(badPrefix.length === 0,
      `${name}: every prefix is a non-empty string` +
      (badPrefix.length ? ` — ${JSON.stringify(badPrefix[0])}` : ''));

  // Prefixes are matched against filenames like 'jbj-overhead.mp4'. A prefix that
  // does not end in '-' still "works" but matches far more loosely than intended,
  // which is the same shadowing hazard by another route.
  const noDash = rows.filter(r => typeof r[0] === 'string' && !r[0].endsWith('-'));
  log(noDash.length === 0,
      `${name}: every prefix ends in '-'` +
      (noDash.length ? ` — ${noDash.map(r => r[0]).join(', ')}` : ''));

  const badUrl = rows.filter(r => typeof r[urlIdx] !== 'string' || !/^https:\/\/\S+$/.test(r[urlIdx]));
  log(badUrl.length === 0,
      `${name}: every URL is a well-formed https URL` +
      (badUrl.length ? ` — ${JSON.stringify(badUrl[0])}` : ''));

  const dupes = rows.map(r => r[0]).filter((p, i, a) => a.indexOf(p) !== i);
  log(dupes.length === 0,
      `${name}: no duplicate prefixes` +
      (dupes.length ? ` — ${[...new Set(dupes)].join(', ')}` : ''));

  // THE ORDER INVARIANT. If prefix at i is a proper prefix of one at j > i, the
  // later row can never be reached: first-match-wins returns i every time.
  const shadowed = [];
  for (let i = 0; i < rows.length; i++)
    for (let j = i + 1; j < rows.length; j++)
      if (typeof rows[i][0] === 'string' && typeof rows[j][0] === 'string'
          && rows[j][0] !== rows[i][0] && rows[j][0].indexOf(rows[i][0]) === 0)
        shadowed.push(`'${rows[i][0]}' (#${i}) shadows '${rows[j][0]}' (#${j})`);
  log(shadowed.length === 0,
      `${name}: no earlier prefix shadows a later one` +
      (shadowed.length ? ` — ${shadowed.join('; ')}` : ''));
}

structure('CLIP_SOURCE', CLIP_SOURCE, 2);
structure('OFFICIAL_DEMOS', OFFICIAL_DEMOS, 1);

// ---------------------------------------------------------------------------
// Coverage. The CLIP_SOURCE comment states the credit shows "ABOVE the player and
// always -- not only when a file is missing". A clip whose name matches no prefix
// renders no credit at all, silently violating that. So every clip the markup can
// actually open must resolve.
//
// RELATIONSHIP TO derived-ui.test.mjs, which asserts something that SOUNDS identical
// ("every shipped clip resolves to a CLIP_SOURCE credit"). It is not. That one walks
// the rendered DOM for `.step[data-clip]` elements -- 60 of them -- so it cannot see
// a clip reachable only through an inline `openClip('...')` button. There are 19 of
// those, the entire jbj-* J-Bands set. This suite reads the source text and covers
// both routes (79 references). Neither subsumes the other: derived-ui proves the
// button actually rendered, this proves the reference resolves even in markup that
// never renders under the current track/split. Keep both.
// ---------------------------------------------------------------------------
// The /i is load-bearing, not defensive. These patterns first hardcoded a lowercase
// '.mp4', which meant an uppercase reference did not merely fail the casing check
// below — it was never COLLECTED, so it escaped every assertion in this file,
// including "resolves to a credit". The negative control caught it by mutating in
// a 'jbj-Overhead.MP4' and watching the suite stay green. An extractor that silently
// drops the very inputs a check exists to catch is the worst shape a test can take.
const referenced = new Set();
for (const m of src.matchAll(/openClip\(\s*['"]([^'"]+\.mp4)['"]\s*\)/gi)) referenced.add(m[1]);
for (const m of src.matchAll(/data-clip=(?:&quot;|")clips\/([^&"']+\.mp4)/gi)) referenced.add(m[1]);

// THE THIRD REFERENCE CHANNEL, and the reason this file previously undercounted.
// injectClipButtons() also builds buttons from the WANTED wish-list map
// (`w2:'wash-knee-forehand'` -> openClip('wash-knee-forehand.mp4')), so a clip can
// be fully reachable without ever appearing in an openClip() call or a data-clip
// attribute. Missing this channel is what made two shipped, playable clips get
// reported as "referenced nowhere" orphans.
//
// These are held SEPARATE from `referenced` on purpose. WANTED is a wish-list: most
// of its entries name files that do not exist yet, so demanding a CLIP_SOURCE credit
// for them would fail on every unrecorded clip and say nothing true. Casing, though,
// applies the moment the file lands — and the whole point of the casing rule is that
// nothing catches a bad name until production.
const wished = new Set();
const wantedBlock = src.match(/var WANTED\s*=\s*\{[\s\S]*?\}/);
log(wantedBlock !== null, 'WANTED wish-list map located');
if (wantedBlock) {
  for (const m of wantedBlock[0].matchAll(/:\s*'([^']+)'/g)) wished.add(m[1] + '.mp4');
  log(wished.size > 0, `WANTED names ${wished.size} wish-list clips`);
}

log(referenced.size > 0, `found ${referenced.size} clip references in markup`);

// CASE SENSITIVITY. Nothing between the producer and the deploy catches this:
// Lane M's NTFS and the Mac's APFS are both case-INsensitive, so 'Wash-Foo.MP4'
// resolves locally on either machine and in every existing test that uses
// fs.existsSync. GitHub Pages serves from a case-SENSITIVE host, so it 404s only
// in production. All 82 files in clips/ are lowercase today by convention; this
// makes the convention enforceable, which matters now that a second machine with
// different filename habits produces them.
const badCase = [...referenced, ...wished].filter(n => !/^[a-z0-9._-]+\.mp4$/.test(n)).sort();
log(badCase.length === 0,
    `every clip name is lowercase, incl. wish-list (case-sensitive deploy host)` +
    (badCase.length ? ` — ${badCase.join(', ')}` : ''));

if (CLIP_SOURCE && referenced.size) {
  const uncredited = [...referenced]
    .filter(n => !CLIP_SOURCE.some(r => typeof r[0] === 'string' && n.indexOf(r[0]) === 0))
    .sort();
  log(uncredited.length === 0,
      `every referenced clip resolves to a CLIP_SOURCE credit` +
      (uncredited.length ? ` — ${uncredited.length} uncredited: ${uncredited.slice(0, 5).join(', ')}` : ''));
}

// Dead config is not a user-visible bug, but it is how a table drifts out of sync
// with reality, so report it without failing the gate.
if (CLIP_SOURCE && referenced.size) {
  const unused = CLIP_SOURCE
    .map(r => r[0])
    .filter(p => typeof p === 'string' && ![...referenced].some(n => n.indexOf(p) === 0));
  if (unused.length) note(`CLIP_SOURCE prefixes matching no current clip (not a failure): ${unused.join(', ')}`);
}

// ---------------------------------------------------------------------------
// THE EMBED-TIMESTAMP CONFIG — the forward-looking half of the carve-out.
//
// This structure does NOT exist yet. Lane M is expected to add it: an external
// video ID plus start/end seconds, so a drill can point at a moment in a source
// video without shipping another cut file. When it lands, `start < end` and a
// well-formed ID are exactly the errors a remote lane cannot catch by watching.
//
// Until then this reports honestly that it verified nothing, rather than printing
// a checkmark. A silent skip here would be the worst version of this test: green,
// and green for a reason unrelated to the thing it claims to check.
// ---------------------------------------------------------------------------
const EMBED_ANCHOR = 'var CLIP_EMBED=[';   // the agreed name; see CLAUDE.md, Lane M
const embedAt = src.indexOf(EMBED_ANCHOR);

if (embedAt === -1) {
  note('CLIP_EMBED: not present in this build — timestamp validation NOT exercised.');
  note('            (expected: Lane M has not shipped the embed-timestamp config yet)');
} else {
  const open = embedAt + EMBED_ANCHOR.length - 1;
  let depth = 0, end = -1;
  for (let i = open; i < src.length; i++) {
    const c = src[i];
    if (c === '[') depth++;
    else if (c === ']') { depth--; if (depth === 0) { end = i; break; } }
    else if (c === "'" || c === '"') {
      const q = c;
      for (i++; i < src.length; i++) { if (src[i] === '\\') { i++; continue; } if (src[i] === q) break; }
    }
  }
  log(end !== -1, 'CLIP_EMBED: literal is balanced');

  let rows = null;
  if (end !== -1) {
    try { rows = new Function('return ' + src.slice(open, end + 1))(); }
    catch (e) { log(false, `CLIP_EMBED: parses as JS (${e.message})`); }
  }

  if (Array.isArray(rows)) {
    log(rows.length > 0, `CLIP_EMBED: non-empty (${rows.length} entries)`);

    // Accept either an object row {id,start,end} or a tuple [key,id,start,end];
    // normalise before validating so the shape choice is Lane M's, not enforced
    // here by accident.
    const norm = rows.map(r => Array.isArray(r)
      ? { key: r[0], id: r[1], start: r[2], end: r[3] }
      : (r && typeof r === 'object' ? r : null));

    const badRow = norm.filter(r => !r);
    log(badRow.length === 0, `CLIP_EMBED: every entry is a tuple or object (${badRow.length} bad)`);

    // A YouTube video ID is 11 chars of [A-Za-z0-9_-]. Reject a full URL pasted
    // into the ID slot, which is the single most likely hand-entry mistake.
    const badId = norm.filter(r => r && !(typeof r.id === 'string' && /^[A-Za-z0-9_-]{11}$/.test(r.id)));
    log(badId.length === 0,
        `CLIP_EMBED: every id is a well-formed 11-char video ID` +
        (badId.length ? ` — ${JSON.stringify(badId[0])}` : ''));

    const badNum = norm.filter(r => r &&
      !(Number.isFinite(r.start) && Number.isFinite(r.end) && r.start >= 0));
    log(badNum.length === 0,
        `CLIP_EMBED: start/end are finite numbers, start >= 0` +
        (badNum.length ? ` — ${JSON.stringify(badNum[0])}` : ''));

    // THE PROMISED ASSERTION.
    const badRange = norm.filter(r => r && Number.isFinite(r.start) && Number.isFinite(r.end) && !(r.start < r.end));
    log(badRange.length === 0,
        `CLIP_EMBED: start < end for every entry` +
        (badRange.length ? ` — ${badRange.map(r => `${r.key||r.id}: ${r.start}→${r.end}`).join('; ')}` : ''));

    const dupKeys = norm.filter(Boolean).map(r => r.key).filter((k, i, a) => k != null && a.indexOf(k) !== i);
    log(dupKeys.length === 0,
        `CLIP_EMBED: no duplicate keys` + (dupKeys.length ? ` — ${[...new Set(dupKeys)].join(', ')}` : ''));
  }
}

console.log(pass ? '\nCLIP CONFIG: PASS' : '\nCLIP CONFIG: FAIL');
process.exit(pass ? 0 : 1);
