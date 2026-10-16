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
function check(manifest, onDisk, read) {
  const problems = [];
  const v = B.validateManifest(manifest);
  if (v.error) { problems.push('manifest: ' + v.error); return problems; }
  v.rejected.forEach((r) => problems.push(`manifest entry #${r.index} rejected: ${r.why}`));
  const listed = v.ok.map((e) => e.file), seen = new Set();
  listed.forEach((f) => { if (seen.has(f)) problems.push(`listed twice: ${f}`); seen.add(f); });
  listed.forEach((f) => { if (!onDisk.includes(f)) problems.push(`listed but MISSING on disk: ${f}`); });
  onDisk.forEach((f) => { if (!seen.has(f)) problems.push(`on disk but NOT LISTED in modules.json: ${f} (the section would silently never appear)`); });
  v.ok.forEach((e) => {
    if (!onDisk.includes(e.file)) return;
    const src = strip(read(e.file));
    BAN.forEach(([re, name]) => { if (re.test(src)) problems.push(`${e.file}: forbidden ${name} — a module declares, it does not do`); });
    if (!new RegExp('BATTERY\\.register\\(\\s*[\'"]' + e.kind.replace(/\./g, '\\.') + '[\'"]').test(src)) problems.push(`${e.file}: never calls BATTERY.register('${e.kind}', ...) — its manifest kind`);
  });
  return problems;
}
const walk = (dir) => (fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)])) : []);

console.log('modules-manifest (rewrite Step 2: the manifest + modules/ contract)');

// ---------- the real repo ----------
let manifest = null, parseErr = null;
try { manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8')); } catch (e) { parseErr = e.message; }
log(!parseErr, `modules.json parses as JSON${parseErr ? ' — ' + parseErr : ''}`);
const onDisk = walk(path.join(ROOT, 'modules')).map((f) => path.relative(ROOT, f).split(path.sep).join('/')).filter((f) => /\.js$/.test(f));
const problems = manifest ? check(manifest, onDisk, (f) => fs.readFileSync(path.join(ROOT, f), 'utf8')) : ['manifest unreadable'];
log(problems.length === 0, `manifest + modules/ agree and every module honours the contract (${problems.length} problem${problems.length === 1 ? '' : 's'})${problems.length ? ':\n      - ' + problems.join('\n      - ') : ''}`);
const n = manifest && Array.isArray(manifest.modules) ? manifest.modules.length : 0;
console.log(`  · checked ${n} listed module${n === 1 ? '' : 's'} and ${onDisk.length} file${onDisk.length === 1 ? '' : 's'} under modules/${n === 0 && onDisk.length === 0 ? ' — the EMPTY manifest is valid (shape verified; nothing to inspect yet)' : ''}`);

// ---------- negative controls: the checker must be able to go red (an instrument that cannot return a negative confirms nothing) ----------
const OKM = { schema: 1, modules: [{ file: 'modules/arm/steps.warmup.js', frame: 'arm', kind: 'arm.steps' }] };
const GOOD = "BATTERY.register('arm.steps', { section: 'warmup', steps: [{ id: 'a', name: 'Leg swings', youth: 'safe' }] });";
const run = (m, files) => check(m, Object.keys(files), (f) => files[f]);
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

console.log('  ----------------------------------------------');
console.log(pass ? '  PASS — modules-manifest: the manifest is valid, every module is listed and honours the declare-only contract.' : '  FAIL — modules-manifest contract broken.');
process.exit(pass ? 0 : 1);
