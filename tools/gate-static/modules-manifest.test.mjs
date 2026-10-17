// MODULES-MANIFEST GATE  (rewrite Step 2 — static; E, 2026-10-14; ARCH-DA-capacitor-structure §3 + §4)
//
// Static hosting cannot enumerate a directory, so "drop a file in" really means: the file + ONE line in modules.json. The honest risk of that design is a file that exists but is
// not listed (the section silently never appears) or a line that points at nothing (a 404 the loader swallows on purpose). This suite turns both into a RED BUILD instead of a
// silently missing section — the same "make a missing file detectable" principle as CLAUDE.md §6.5.
//   MANIFEST   — modules.json is {"schema":1,"modules":[{file,frame,kind}]}; validated by the LIB'S OWN validateManifest (loaded here via node:vm, so the rules live in ONE place).
//   LISTED     — every .js under modules/ is listed (a forgotten line = red); every listed file exists; no file listed twice.
//   CONTRACT   — a module only DECLARES: no network (fetch / XMLHttpRequest / WebSocket / sendBeacon / import()), no code-from-string (eval / new Function), no document.write, and it
//                never reaches across frames (parent. / top. / contentWindow / contentDocument) — DA §4 rule 5. It must call BATTERY.register with its manifest kind.
// Imports ONLY node:fs / node:path / node:url / node:vm, so Lane M can run it under Git Bash (tools/gate-static/gate-static.sh). Run from anywhere: the repo root is two levels up
// from this file (override with BATTERY_REPO). The suite PRINTS how many modules it checked — an empty manifest passes, but it says so rather than going silently green.
import fs from 'node:fs'; import path from 'node:path'; import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = process.env.BATTERY_REPO || path.resolve(HERE, '..', '..');
let pass = true;
const log = (ok, m) => { pass = pass && ok; console.log(`  ${ok ? '✓' : '✗'} ${m}`); };

const LIB = path.join(ROOT, 'lib', 'battery.js'), MANIFEST = path.join(ROOT, 'modules.json');
if (!fs.existsSync(LIB) && !fs.existsSync(MANIFEST)) { console.log('  · no lib/battery.js and no modules.json in this build — skipping.\n  ----------------------------------------------\n  SKIP — pre-Step-2 build (not a failure).'); process.exit(0); }
if (!fs.existsSync(LIB) || !fs.existsSync(MANIFEST)) { console.log(`  ✗ lib bootstrap HALF-present (lib/battery.js=${fs.existsSync(LIB)}, modules.json=${fs.existsSync(MANIFEST)}) — a rename/half-ship; update this suite, do not let it skip`); process.exit(1); }

// load the lib in a bare sandbox (no DOM, no storage, no fetch): enough to reach validateManifest + the kind table
const sandbox = {}; sandbox.window = sandbox; vm.createContext(sandbox); vm.runInContext(fs.readFileSync(LIB, 'utf8'), sandbox, { filename: 'lib/battery.js' });
const B = sandbox.BATTERY;
if (!B || typeof B.validateManifest !== 'function') { console.log('  ✗ lib/battery.js did not expose BATTERY.validateManifest — the manifest rules have no single source'); process.exit(1); }

const BAN = [
  [/\bfetch\s*\(/, 'fetch()'], [/\bXMLHttpRequest\b/, 'XMLHttpRequest'], [/\bWebSocket\b/, 'WebSocket'], [/\bsendBeacon\b/, 'sendBeacon'], [/\bimportScripts\b/, 'importScripts'], [/\bimport\s*\(/, 'dynamic import()'],
  [/\beval\s*\(/, 'eval()'], [/\bnew\s+Function\b/, 'new Function'], [/\bdocument\s*\.\s*write/, 'document.write'],
  [/\bparent\s*\./, 'parent.* (cross-frame)'], [/\bwindow\s*\.\s*parent\b/, 'window.parent (cross-frame)'], [/\btop\s*\./, 'top.* (cross-frame)'], [/\bcontentWindow\b/, 'contentWindow (cross-frame)'], [/\bcontentDocument\b/, 'contentDocument (cross-frame)'],
];
const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:\\])\/\/[^\n]*/g, '$1');

// PURE core: given the parsed manifest, the set of files actually on disk under modules/, and a reader, return the list of problems. (Pure so the negative controls can feed it bad input.)
function check(manifest, onDisk, read, html) {
  const problems = [];
  const v = B.validateManifest(manifest);
  if (v.error) { problems.push('manifest: ' + v.error); return problems; }
  v.rejected.forEach((r) => problems.push(`manifest entry #${r.index} rejected: ${r.why}`));
  // The same module FILE may be listed once PER FRAME (the host and ARM each load arm/sections.js into their own document's registry - DA §4 rule 5); the same file+frame twice is the error.
  const listed = v.ok.map((e) => e.file), seen = new Set(), seenFrame = new Set();
  v.ok.forEach((e) => { const k = e.file + '|' + e.frame; if (seenFrame.has(k)) problems.push(`listed twice: ${e.file} (frame ${e.frame})`); seenFrame.add(k); seen.add(e.file); });
  listed.forEach((f, i) => { if (listed.indexOf(f) === i && !onDisk.includes(f)) problems.push(`listed but MISSING on disk: ${f}`); });
  onDisk.forEach((f) => { if (!seen.has(f)) problems.push(`on disk but NOT LISTED in modules.json: ${f} (the section would silently never appear)`); });
  const checked = new Set();
  v.ok.forEach((e) => {
    if (!onDisk.includes(e.file) || checked.has(e.file + '|' + e.kind)) return; checked.add(e.file + '|' + e.kind);
    const src = strip(read(e.file));
    BAN.forEach(([re, name]) => { if (re.test(src)) problems.push(`${e.file}: forbidden ${name} — a module declares, it does not do`); });
    if (!new RegExp('BATTERY\\.register\\(\\s*[\'"]' + e.kind.replace(/\./g, '\\.') + '[\'"]').test(src)) problems.push(`${e.file}: never calls BATTERY.register('${e.kind}', ...) — its manifest kind`);
  });
  // load:"sync" entries are NEVER injected by the loader (a second copy would re-register and throw on duplicate ids): the owning document MUST load them itself, synchronously, AFTER
  // lib/battery.js. If it does not, the registry is silently EMPTY at parse time and a section list simply never appears - no error. That is a RED BUILD here, not a quiet runtime miss.
  v.ok.filter((e) => e.load === 'sync').forEach((e) => {
    const doc = html && html[e.frame], file = FRAME_FILE[e.frame];
    if (!doc) { problems.push(`${e.file}: load:"sync" in frame "${e.frame}" but ${file} was not provided/found to verify it is loaded`); return; }
    const t = stripHtml(doc), bat = t.indexOf('lib/battery.js');
    // Position of the MODULE'S OWN path inside a document.write(...) statement. (Not the start of the write call: lib/battery.js and the module may be in the SAME write - that is the
    // correct, in-order-executing form - and the call then starts before both. What matters is that battery.js's text precedes the module's.)
    // Two accepted forms: inside a document.write(...) statement (the iframes), or a plain static <script src="..."> tag (the host's lib tags).
    const esc = e.file.replace(/[.\/]/g, '\\$&'), m = new RegExp('document\\.write\\([^;]*' + esc + '|<script[^>]*\\bsrc="' + esc).exec(t), modPos = m ? m.index + m[0].length - e.file.length : -1;
    if (modPos < 0) problems.push(`${e.file}: load:"sync" but ${file} never loads it (no document.write / <script src>) — listed-but-unloaded means an EMPTY registry at parse time (a section list that silently never appears)`);
    else if (bat < 0 || modPos < bat) problems.push(`${e.file}: it is loaded in ${file} BEFORE lib/battery.js (or battery.js is absent) — BATTERY.register would not exist yet`);
  });
  return problems;
}
const FRAME_FILE = { host: 'index.html', arm: 'arm.html', fuel: 'fuel.html' };
const stripHtml = (s) => strip(s).replace(/<!--[\s\S]*?-->/g, '');
const walk = (dir) => (fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)])) : []);

console.log('modules-manifest (rewrite Step 2: the manifest + modules/ contract)');

// ---------- the real repo ----------
let manifest = null, parseErr = null;
try { manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8')); } catch (e) { parseErr = e.message; }
log(!parseErr, `modules.json parses as JSON${parseErr ? ' — ' + parseErr : ''}`);
const onDisk = walk(path.join(ROOT, 'modules')).map((f) => path.relative(ROOT, f).split(path.sep).join('/')).filter((f) => /\.js$/.test(f));
const HTML = {}; Object.keys(FRAME_FILE).forEach((k) => { const f = path.join(ROOT, FRAME_FILE[k]); if (fs.existsSync(f)) HTML[k] = fs.readFileSync(f, 'utf8'); });
const problems = manifest ? check(manifest, onDisk, (f) => fs.readFileSync(path.join(ROOT, f), 'utf8'), HTML) : ['manifest unreadable'];
log(problems.length === 0, `manifest + modules/ agree and every module honours the contract (${problems.length} problem${problems.length === 1 ? '' : 's'})${problems.length ? ':\n      - ' + problems.join('\n      - ') : ''}`);
const n = manifest && Array.isArray(manifest.modules) ? manifest.modules.length : 0;
console.log(`  · checked ${n} listed module${n === 1 ? '' : 's'} and ${onDisk.length} file${onDisk.length === 1 ? '' : 's'} under modules/${n === 0 && onDisk.length === 0 ? ' — the EMPTY manifest is valid (shape verified; nothing to inspect yet)' : ''}`);

// ---------- negative controls: the checker must be able to go red (an instrument that cannot return a negative confirms nothing) ----------
const OKM = { schema: 1, modules: [{ file: 'modules/arm/steps.warmup.js', frame: 'arm', kind: 'arm.steps' }] };
const GOOD = "BATTERY.register('arm.steps', { section: 'warmup', steps: [{ id: 'a', name: 'Leg swings', youth: 'safe' }] });";
const run = (m, files, html) => check(m, Object.keys(files), (f) => files[f], html);
log(run(OKM, { 'modules/arm/steps.warmup.js': GOOD }).length === 0, 'NEG-CONTROL baseline: a well-formed module + manifest passes');
log(run(OKM, {}).some((p) => /MISSING/.test(p)), 'NEG-CONTROL: a manifest line pointing at no file is flagged');
log(run({ schema: 1, modules: [] }, { 'modules/arm/steps.warmup.js': GOOD }).some((p) => /NOT LISTED/.test(p)), 'NEG-CONTROL: a module file with no manifest line is flagged (the forgotten-line failure)');
log(run(OKM, { 'modules/arm/steps.warmup.js': GOOD + " fetch('/x');" }).some((p) => /fetch/.test(p)), 'NEG-CONTROL: a network call inside a module is flagged');
log(run(OKM, { 'modules/arm/steps.warmup.js': GOOD + ' parent.go("arm");' }).some((p) => /cross-frame/.test(p)), 'NEG-CONTROL: a cross-frame reach (parent.*) inside a module is flagged');
log(run(OKM, { 'modules/arm/steps.warmup.js': '/* nothing */' }).some((p) => /never calls BATTERY\.register/.test(p)), 'NEG-CONTROL: a module that never registers its manifest kind is flagged');
log(run({ schema: 1, modules: [{ file: 'modules/x.js', frame: 'arm', kind: 'ui.control' }] }, { 'modules/x.js': GOOD }).some((p) => /rejected/.test(p)), 'NEG-CONTROL: a lib-only kind (ui.control) in the manifest is rejected');
log(run({ schema: 1, modules: [{ file: 'modules/../index.html', frame: 'arm', kind: 'arm.steps' }] }, {}).some((p) => /rejected/.test(p)), 'NEG-CONTROL: a path escaping modules/ is rejected');
log(run(Object.assign({}, OKM, { modules: [OKM.modules[0], OKM.modules[0]] }), { 'modules/arm/steps.warmup.js': GOOD }).some((p) => /twice/.test(p)), 'NEG-CONTROL: the same file listed twice is flagged');
log(run(OKM, { 'modules/arm/steps.warmup.js': "// fetch('/x') is only a comment\n" + GOOD }).length === 0, 'NEG-CONTROL: a forbidden word inside a COMMENT does not false-positive');

// ---------- load:"sync" contract (Step 3): the loader never injects these, so the owning document must - and the BUILD proves it does ----------
const SEC = 'modules/arm/sections.js', SECM = { schema: 1, modules: [{ file: SEC, frame: 'arm', kind: 'arm.section', load: 'sync' }] };
const SECSRC = "BATTERY.register('arm.section', { rows: [{ id: 'overview', label: 'Overview', group: 'arm', order: 1, youth: 'safe' }] });";
const BAT = '<script src="lib/battery.js?v=1"></script>', WR = "<script>document.write('<script src=\"modules/arm/sections.js?v='+v+'\"><\/script>');</script>";
log(run(SECM, { [SEC]: SECSRC }, { arm: BAT + WR }).length === 0, 'NEG-CONTROL (sync) baseline: a sync module that arm.html document.write()s after lib/battery.js passes');
log(run(SECM, { [SEC]: SECSRC }, { arm: BAT }).some((p) => /never loads it/.test(p)), 'NEG-CONTROL (sync): a sync-listed module its document never loads is RED (listed-but-unloaded = a silent empty registry)');
// A's real form: ONE document.write carrying lib/battery.js THEN the module (parallel fetch, in-order execution) must PASS; the reverse order inside one write must be RED.
const ONEW = (a, b) => "<script>document.write('" + a + b + "');</script>", TB = '<script src="lib/battery.js?v=1"><\/script>', TM = '<script src="modules/arm/sections.js?v=1"><\/script>';
log(run(SECM, { [SEC]: SECSRC }, { arm: ONEW(TB, TM) }).length === 0, 'NEG-CONTROL (sync): battery.js and the module in the SAME document.write, battery.js first, PASSES (the form arm.html actually uses)');
log(run(SECM, { [SEC]: SECSRC }, { arm: ONEW(TM, TB) }).some((p) => /BEFORE lib\/battery\.js/.test(p)), 'NEG-CONTROL (sync): the module BEFORE battery.js inside one write is RED');
log(run(SECM, { [SEC]: SECSRC }, { arm: WR + BAT }).some((p) => /BEFORE lib\/battery\.js/.test(p)), 'NEG-CONTROL (sync): a document.write placed BEFORE lib/battery.js is RED (BATTERY.register would not exist yet)');
// the host loads the same module with a plain static tag, and the same FILE may be listed once per frame
const SECH = { schema: 1, modules: [{ file: SEC, frame: 'arm', kind: 'arm.section', load: 'sync' }, { file: SEC, frame: 'host', kind: 'arm.section', load: 'sync' }] };
const STAG = '<script src="modules/arm/sections.js?v=1"></script>';
log(run(SECH, { [SEC]: SECSRC }, { arm: ONEW(TB, TM), host: BAT + STAG }).length === 0, 'NEG-CONTROL (sync): the same module listed for BOTH arm and host passes when each document loads it (arm via document.write, host via a static <script src>)');
log(run(SECH, { [SEC]: SECSRC }, { arm: ONEW(TB, TM), host: BAT }).some((p) => /index\.html never loads it/.test(p)), 'NEG-CONTROL (sync): ... and goes RED when the HOST forgets to load it');
log(run(SECH, { [SEC]: SECSRC }, { arm: ONEW(TB, TM), host: STAG + BAT }).some((p) => /BEFORE lib\/battery\.js/.test(p)), 'NEG-CONTROL (sync): a static <script src> BEFORE lib/battery.js is RED');
log(run(SECM, { [SEC]: SECSRC }, { arm: BAT + '<!-- ' + WR + ' -->' }).some((p) => /never loads it/.test(p)), 'NEG-CONTROL (sync): a loader that exists only inside a comment does not count');
log(run(SECM, { [SEC]: SECSRC }, {}).some((p) => /was not provided/.test(p)), 'NEG-CONTROL (sync): a sync entry whose frame HTML cannot be read is RED, not skipped');
log(run({ schema: 1, modules: [{ file: SEC, frame: 'arm', kind: 'arm.section' }] }, { [SEC]: SECSRC }, { arm: BAT }).length === 0, 'NEG-CONTROL (sync): an ASYNC entry (no load field) needs no document.write — the manifest loader injects it');
log(run({ schema: 1, modules: [{ file: SEC, frame: 'arm', kind: 'arm.section', load: 'later' }] }, { [SEC]: SECSRC }, { arm: BAT }).some((p) => /load must be/.test(p)), 'NEG-CONTROL (sync): an unknown load value is rejected');

console.log('  ----------------------------------------------');
console.log(pass ? '  PASS — modules-manifest: the manifest is valid, every module is listed and honours the declare-only contract.' : '  FAIL — modules-manifest contract broken.');
process.exit(pass ? 0 : 1);
