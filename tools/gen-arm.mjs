// ARM STEP-REGION GENERATOR  (rewrite Stage-2, v259 — E-owned; the data is src/arm/*, the output is the marked regions of arm.html)
//
//   node tools/gen-arm.mjs            regenerate every  <!-- gen:arm-region ID --> … <!-- /gen:arm-region ID -->  region of arm.html in place
//   node tools/gen-arm.mjs --check    verify committed arm.html == generate(data); exit 1 with a first-diff report if not (the gate runs this)
//
// WHAT IS GENERATED: the 25 step-bearing page regions (282 steps + the structural elements and islands between them + the six §4.3 wrappers).
// WHAT IS NOT: everything outside the marker pairs (page chrome, pos-cards, set-toggle, flow-jump, the runtime weavers) stays hand-edited.
// SOURCES (never shipped to a browser — nothing loads src/): src/arm/bodies.js (arm.step-body), src/arm/layout.js (arm.layout);
//   modules/arm/steps.js (arm.steps) stays the SINGLE source of the §4.3 flags (heavy / youthHide / youth) and of the BOOTED order.
// v259: wrappers are EXPLICIT el blocks in the layout and are VALIDATED against the flags (V-WRAP-*). v260 will derive them instead.
// Needs only node builtins (so Lane M's static gate can run it). Every validation refusal is a named code the gate has a RED test for.
import fs from 'node:fs'; import path from 'node:path'; import vm from 'node:vm'; import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url)), ROOT = path.resolve(HERE, '..');
export const START = (id) => `<!-- gen:arm-region ${id} -->`;
export const END = (id) => `<!-- /gen:arm-region ${id} -->`;
export const WRAP_CLASS = { heavy: 'plyo-heavy', youthHide: 'youth-hide' };
const CLASS_WRAP = { 'plyo-heavy': 'heavy', 'youth-hide': 'youthHide' };
const DOSE = /\b\d+(?:[.,]\d+)?\s*(?:mg|mcg|µg|g|kg|iu|kcal|cal|lbs?|oz|pounds?|grams?)\b/i;   // dose/weight tokens (G8)
const DETAIL_KINDS = ['p', 'em', 'btn', 'kid'], BTN_FNS = ['openClip', 'switchTab'], ATTR_KEYS = ['clip', 'track', 'mg', 'sub', 'eq'];

// ---- load a data file (pure BATTERY.register(kind, payload) calls) in a sandbox; returns { kind: [payload…] } ----
export function loadRegistrations(file) {
  const got = {}; const BATTERY = { register(kind, payload) { (got[kind] = got[kind] || []).push(payload); return payload; } };
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), { BATTERY, window: { BATTERY } }, { filename: file });
  return got;
}
export function loadData(root = ROOT) {
  const S = loadRegistrations(path.join(root, 'modules/arm/steps.js'));
  const B = loadRegistrations(path.join(root, 'src/arm/bodies.js'));
  const L = loadRegistrations(path.join(root, 'src/arm/layout.js'));
  const steps = new Map(), bodies = new Map(), regions = [];
  (S['arm.steps'] || []).forEach((p) => p.steps.forEach((s) => steps.set(s.id, { ...s, section: p.section })));
  (B['arm.step-body'] || []).forEach((p) => p.bodies.forEach((b) => { (bodies.has(b.id) ? (bodies.dupes = bodies.dupes || []).push(b.id) : bodies.set(b.id, { ...b, section: p.section })); }));
  (L['arm.layout'] || []).forEach((p) => p.regions.forEach((r) => regions.push({ ...r, section: p.section })));
  return { steps, bodies, regions };
}

// ---- helpers ----
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/ /g, '&nbsp;');   // a literal NBSP is invisible in source: keep it an entity
const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const textOf = (h) => String(h).replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
const flagOf = (row) => (row.heavy ? 'heavy' : row.youthHide ? 'youthHide' : 'safe');
const wrapOf = (blk) => { const c = blk.attrs && blk.attrs.class; return blk.el === 'div' && CLASS_WRAP[c] ? CLASS_WRAP[c] : null; };

// ---- VALIDATION: returns [{code, msg}] ; empty = the data is a well-formed, §4.3-consistent source ----
export function validate(data) {
  const v = []; const bad = (code, msg) => v.push({ code, msg });
  const { steps, bodies, regions } = data;
  if (bodies.dupes) bodies.dupes.forEach((id) => bad('V-DUP-BODY', `body id "${id}" registered twice`));
  steps.forEach((row, id) => {
    const f = flagOf(row);
    if (row.heavy && row.youthHide) bad('V-FLAGS', `${id}: both heavy and youthHide`);
    if (row.youth === 'safe' && f !== 'safe') bad('V-FLAGS', `${id}: youth "safe" but flagged ${f}`);
    if (row.youth === 'adult' && f === 'safe') bad('V-FLAGS', `${id}: youth "adult" with neither heavy nor youthHide (a hidden step must say WHY)`);
    if (!bodies.has(id)) bad('V-BODY-MISSING', `${id}: steps row with no arm.step-body`);
  });
  bodies.forEach((b, id) => {
    const row = steps.get(id);
    if (!row) { bad('V-BODY-ORPHAN', `${id}: body with no arm.steps row`); return; }
    if (row.section !== b.section) bad('V-SECTION', `${id}: body in "${b.section}" but steps row in "${row.section}"`);
    if (b.youth !== row.youth) bad('V-YOUTH-MIRROR', `${id}: body.youth "${b.youth}" != steps.youth "${row.youth}"`);
    const want = b.title + (b.badge ? ' ' + b.badge.text : '');
    if (row.name !== want) bad('V-NAME', `${id}: steps.name "${row.name}" != title+badge "${want}"`);
    (b.detail || []).forEach((d, i) => {
      if (!DETAIL_KINDS.includes(d.t)) bad('V-DETAIL', `${id}.detail[${i}]: unknown kind "${d.t}"`);
      if (d.t === 'btn' && !BTN_FNS.includes(d.fn)) bad('V-DETAIL', `${id}.detail[${i}]: button fn "${d.fn}" not in ${BTN_FNS}`);
    });
    Object.keys(b.attrs || {}).forEach((k) => { if (!ATTR_KEYS.includes(k)) bad('V-ATTRS', `${id}: unknown data attribute "${k}"`); });
    if (b.youth === 'safe') {
      const txt = [b.title, b.badge && b.badge.text, b.target, b.reps, ...(b.detail || []).map((d) => textOf(d.h))].filter(Boolean).join(' | ');
      const m = DOSE.exec(txt); if (m) bad('V-DOSE', `${id}: youth-safe row carries a dose/weight token "${m[0]}"`);
    }
  });
  // placement + wrapper consistency over the layout tree
  const placed = new Map(); const seenRegion = new Set();
  regions.forEach((r) => {
    if (seenRegion.has(r.id)) bad('V-REGION-DUP', `region ${r.id} registered twice`); seenRegion.add(r.id);
    const walk = (blocks, wrapper, inWrapEl) => blocks.forEach((b, i) => {
      const where = `${r.id}[${i}]`;
      if ('step' in b) {
        const row = steps.get(b.step);
        if (!row) { bad('V-PLACE', `${where}: step "${b.step}" is not an arm.steps row`); return; }
        placed.set(b.step, (placed.get(b.step) || 0) + 1);
        if (row.section !== r.section) bad('V-PLACE', `${where}: step "${b.step}" belongs to section "${row.section}" but is placed in "${r.section}"`);
        const f = flagOf(row), w = wrapper || 'safe';
        if (f !== w) bad('V-WRAP-STEP', `${where}: step "${b.step}" is flagged ${f} but sits ${wrapper ? 'inside a ' + WRAP_CLASS[wrapper] + ' wrapper' : 'outside every wrapper'}`);
      } else if ('el' in b) {
        if (typeof b.el !== 'string' || !/^[a-z][a-z0-9]*$/.test(b.el)) bad('V-EL', `${where}: bad tag "${b.el}"`);
        const w = wrapOf(b);
        if (w && wrapper) bad('V-WRAP-NEST', `${where}: a ${WRAP_CLASS[w]} wrapper inside a ${WRAP_CLASS[wrapper]} wrapper`);
        if (b.attrs && b.attrs.class && /\b(plyo-heavy|youth-hide)\b/.test(b.attrs.class) && !w) bad('V-WRAP-EL', `${where}: a youth-hide/plyo-heavy class on something that is not a plain <div> wrapper`);
        walk(b.blocks || [], w || wrapper, !!w);
      } else if ('html' in b) {
        const inside = wrapper;   // 'heavy' | 'youthHide' | null
        if (b.altCard) {
          if (b.mech) bad('V-ALTCARD', `${where}: an altCard must not carry mech`);
          if (inside) bad('V-ALTCARD', `${where}: an altCard (youth-VISIBLE) sits inside a ${WRAP_CLASS[inside]} wrapper — youth would never see it`);
        } else if ((b.mech || null) !== inside) {
          bad('V-WRAP-ISLAND', `${where}: island mech "${b.mech || 'none'}" but it sits ${inside ? 'inside a ' + WRAP_CLASS[inside] + ' wrapper' : 'outside every wrapper'}`);
        }
        if (!b.mech) { const m = DOSE.exec(textOf(b.html)); if (m) bad('V-DOSE', `${where}: youth-visible island carries a dose/weight token "${m[0]}"`); }
      } else bad('V-BLOCK', `${where}: block is none of {step}/{el}/{html}`);
    });
    walk(r.blocks || [], null, false);
  });
  steps.forEach((row, id) => { const n = placed.get(id) || 0; if (n !== 1) bad('V-PLACE', `${id}: placed ${n}x in the layout (must be exactly once)`); });
  return v;
}

// ---- RENDER ----
function renderStep(r, ind) {
  const a = r.attrs || {};
  const d = ATTR_KEYS.filter((k) => a[k] !== undefined).map((k) => ` data-${k}="${attr(a[k])}"`).join('');
  const name = esc(r.title) + (r.badge ? ` <span style="${attr(r.badge.style)}">${esc(r.badge.text)}</span>` : '');
  const det = r.detail.map((b) => {
    const st = b.style ? ` style="${attr(b.style)}"` : '';
    if (b.t === 'btn') return `${ind}    <button class="${attr(b.cls || 'clip-btn')}" onclick="${b.fn}('${attr(b.arg)}')"${st}>${b.h}</button>`;
    if (b.t === 'kid') return `${ind}    <div class="${attr(b.cls)}"${st}>${b.h}</div>`;
    return `${ind}    <${b.t}${st}>${b.h}</${b.t}>`;
  }).join('\n');
  return [
    `${ind}<li class="step${r.optional ? ' opt' : ''}${(r.xcls || []).map((c) => ' ' + c).join('')}" data-ex="${attr(r.id)}"${d}>`,
    `${ind}  <div class="step-row">`,
    `${ind}    <div class="check" onclick="toggleDone(this)"></div>`,
    `${ind}    <div class="step-text" onclick="toggleOpen(this)">`,
    `${ind}      <div class="step-name">${name}</div>`,
    `${ind}      <div class="step-target">${esc(r.target)}</div>`,
    `${ind}    </div>`,
    `${ind}    <div class="step-reps">${esc(r.reps)}</div>`,
    `${ind}  </div>`,
    `${ind}  <div class="step-detail">`,
    det,
    `${ind}  </div>`,
    `${ind}</li>`,
  ].join('\n');
}
function renderBlocks(blocks, bodies, ind) {
  return blocks.map((b) => {
    if ('step' in b) return '\n' + renderStep(bodies.get(b.step), ind);   // authored lists put a blank line before every step
    if ('html' in b) return ind + b.html;
    const at = Object.entries(b.attrs || {}).map(([k, val]) => ` ${k}="${attr(val)}"`).join('');
    return `${ind}<${b.el}${at}>\n${renderBlocks(b.blocks || [], bodies, ind + '  ')}\n${ind}</${b.el}>`;
  }).join('\n');
}
export function renderRegion(region, bodies, ind = '') { return renderBlocks(region.blocks, bodies, ind); }

// ---- SPLICE into arm.html ----
export function markerIds(src) { return [...src.matchAll(/<!-- gen:arm-region ([a-z0-9-]+#\d+) -->/g)].map((m) => m[1]); }
export function generate(src, data) {
  const ids = markerIds(src), want = data.regions.map((r) => r.id);
  const missing = want.filter((i) => !ids.includes(i)), extra = ids.filter((i) => !want.includes(i));
  if (missing.length || extra.length) throw new Error(`regions out of step with arm.html markers — layout-only: [${missing}] markers-only: [${extra}]`);
  let out = src;
  for (const r of data.regions) {
    const s = START(r.id), e = END(r.id), a = out.indexOf(s), b = out.indexOf(e);
    if (a < 0 || b < 0 || b < a || out.indexOf(s, a + 1) > -1) throw new Error(`marker pair for ${r.id} is missing, reversed or duplicated`);
    const ls = out.lastIndexOf('\n', a - 1) + 1, ind = out.slice(ls, a);
    if (!/^[ \t]*$/.test(ind)) throw new Error(`marker for ${r.id} must start its own line`);
    const eLs = out.lastIndexOf('\n', b - 1) + 1;   // the END marker line keeps its own indentation
    out = out.slice(0, a + s.length) + '\n' + renderRegion(r, data.bodies, ind) + '\n' + out.slice(eLs);
  }
  return out;
}

// ---- CLI ----
const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isMain) {
  const check = process.argv.includes('--check'); const armPath = path.join(ROOT, 'arm.html');
  const data = loadData(ROOT), viol = validate(data);
  if (viol.length) { console.error(`gen-arm: ${viol.length} validation refusal(s):\n` + viol.slice(0, 25).map((x) => `  [${x.code}] ${x.msg}`).join('\n')); process.exit(1); }
  const src = fs.readFileSync(armPath, 'utf8'), out = generate(src, data);
  if (check) {
    if (out === src) { console.log(`gen-arm --check: arm.html == generate(src/arm) (${data.regions.length} regions, ${data.steps.size} steps)`); process.exit(0); }
    let i = 0; while (i < out.length && out[i] === src[i]) i++;
    console.error(`gen-arm --check: arm.html DIFFERS from generate(src/arm) at offset ${i}\n  committed: ${JSON.stringify(src.slice(Math.max(0, i - 60), i + 100))}\n  generated: ${JSON.stringify(out.slice(Math.max(0, i - 60), i + 100))}\n  (edit src/arm/*, run node tools/gen-arm.mjs, commit both — never hand-edit inside a gen:arm-region)`);
    process.exit(1);
  }
  fs.writeFileSync(armPath, out); console.log(`gen-arm: wrote ${data.regions.length} regions (${data.steps.size} steps) into arm.html`);
}
