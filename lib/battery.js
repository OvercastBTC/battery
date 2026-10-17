/* BATTERY lib — the "js lib" (rewrite Step 2: lib bootstrap).  Spec: docs/ARCH-DA-capacitor-structure-2026-10-13.md §3-§6.
   Loaded by index.html (host), arm.html and fuel.html, each parse-time and versioned (?v=VER), after lib/tokens.css and lib/ui.css.

   WHAT THIS IS: one namespace, window.BATTERY, holding the framework-ish pieces — a content REGISTRY (modules declare, the lib validates), a MANIFEST LOADER
   (modules.json -> versioned <script> injection), the YOUTH policy as one fail-closed API, a prefix-enforcing STORE, the postMessage vocabulary as a BUS, and
   tiny date / esc helpers. It knows nothing about ARM or FUEL content.

   WHAT THIS IS NOT (Step 2 contract — ZERO behaviour change):
     · It moves NO content and NO existing function. Every cross-frame global (parent.go, parent.batPoll, parent.SECTION_IMAGES, contentWindow.refreshAll, ...)
       stays a plain window.* global. Nothing is re-homed under BATTERY.* here.
     · At parse time it touches NO DOM and writes NO localStorage key. The only thing it defines on window is BATTERY. (Step 3: the manifest now lists modules/arm/sections.js as
       load:"sync" - the lib's loader RECORDS it but never injects it; the ARM document loads it itself, in the same document.write as this file.)
     · Step 3 is the first consumer: arm.html builds its nav, page flags and TAB_GROUPS from BATTERY.items('arm.section'), and the host drawer groups from the same rows.

   FAIL-CLOSED: anything uncertain about the youth tier resolves to 'youth'. This now matches EVERY other tier read: the host boot fail-safe, youth-auth.js, and — since the v249
   hotfix — the ARM/FUEL iframes' own window.BATTERY_TIER (only the literal 'adult' is adult; a missing / unknown / unreadable key is youth). Before v249 the iframes defaulted
   to 'adult', so a public arm.html / fuel.html opened directly rendered the adult surface; tier-failclosed.test.mjs now guards that. */
(function (root) {
  'use strict';
  if (root.BATTERY) return;   // double-load guard: the first copy wins, nothing is redefined

  // ---------------------------------------------------------------- environment
  var VERSION = '0', FRAME = 'host';
  try {
    var cs = root.document && root.document.currentScript;
    var m = cs && cs.src ? /[?&]v=([^&#]*)/.exec(cs.src) : null;
    if (m) VERSION = decodeURIComponent(m[1]) || '0';
  } catch (e) {}
  try {
    var p = (root.location && root.location.pathname) || '';
    if (/\/arm\.html$/.test(p)) FRAME = 'arm'; else if (/\/fuel\.html$/.test(p)) FRAME = 'fuel';
  } catch (e) {}

  function deepFreeze(o) {
    if (o && typeof o === 'object' && !Object.isFrozen(o)) { Object.freeze(o); Object.keys(o).forEach(function (k) { deepFreeze(o[k]); }); }
    return o;
  }
  function esc(t) { return String(t == null ? '' : t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  // ---------------------------------------------------------------- date (zero-padded LOCAL keys: the FUEL-shaped key; ARM's completion keys are deliberately UNPADDED)
  var DATE_KEY = /^\d{4}-\d{2}-\d{2}$/;
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function todayKey(d) { d = d || new Date(); return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()); }
  var date = { pad2: pad2, todayKey: todayKey, isKey: function (s) { return typeof s === 'string' && DATE_KEY.test(s); } };

  // ---------------------------------------------------------------- youth (CLAUDE.md §4.3 — one home, fail-closed)
  var YOUTH_VALUES = Object.freeze(['safe', 'adult', 'gated']);
  // MANDATORY exclusions live in the lib as DATA: a content module cannot un-exclude them. (Parity with fuel.html's YOUTH_SUPP_EXCLUDE + arm.html's .plyo-heavy is gate-asserted.)
  var HARD_DENY = deepFreeze({ supps: ['wolverine', 'ultra-focus'], classes: ['plyo-heavy'] });
  function tier() { try { return root.localStorage.getItem('battery-boot-tier') === 'adult' ? 'adult' : 'youth'; } catch (e) { return 'youth'; } }
  function isYouth() { return tier() !== 'adult'; }
  // read the tier at CALL time, never snapshot at parse (the F5 lesson). 'adult' items never reach youth; 'gated' items need a surface-specific gate (e.g. youthVisAllowed /
  // the caffeine age gate) so they are NOT allowed here; a missing/unknown declaration is not allowed.
  function allow(item) {
    if (!isYouth()) return true;
    if (!item || typeof item !== 'object') return false;
    if (HARD_DENY.supps.indexOf(item.id) > -1) return false;
    if (item.heavy === true) return false;
    return item.youth === 'safe';
  }
  var youth = { VALUES: YOUTH_VALUES, HARD_DENY: HARD_DENY, tier: tier, isYouth: isYouth, allow: allow };

  // ---------------------------------------------------------------- store (codifies CLAUDE.md §7: "a new persisted key MUST start with a known prefix")
  var PREFIXES = Object.freeze(['fuel-', 'arm-care-', 'battery-']);
  function keyOk(k) { return typeof k === 'string' && PREFIXES.some(function (p) { return k.indexOf(p) === 0; }); }
  function needKey(k) { if (!keyOk(k)) throw new Error('BATTERY.store: key "' + k + '" must start with one of ' + PREFIXES.join(' | ') + ' (an unprefixed key is lost on the next profile switch)'); }
  var store = {
    PREFIXES: PREFIXES, keyOk: keyOk,
    get: function (k, def) { needKey(k); try { var v = root.localStorage.getItem(k); return v == null ? def : v; } catch (e) { return def; } },
    set: function (k, v) { needKey(k); try { root.localStorage.setItem(k, String(v)); return true; } catch (e) { return false; } },
    remove: function (k) { needKey(k); try { root.localStorage.removeItem(k); return true; } catch (e) { return false; } }
  };

  // ---------------------------------------------------------------- bus (the CLAUDE.md §7 postMessage shapes as code, so the vocabulary lives in a test, not only in a doc)
  function has(m, k) { return m[k] !== undefined; }
  var SHAPES = {
    'bat-group': { req: ['group'], ok: function (m) { return ['arm', 'drills', 'body'].indexOf(m.group) > -1; } },
    'bat-counts': { req: ['arm', 'drills', 'body'] },
    'bat-nav': { req: ['tab'] },
    'bat-poll': { req: [] },
    'bat-active-date': { req: ['date'], ok: function (m) { return m.date === null || date.isKey(m.date); } },
    'bat-fuel': { req: ['water', 'protein', 'tWater', 'tProtein'] },
    'bat-day-progress': { req: ['days'] },
    // the FUEL-shaped (zero-padded) key is REQUIRED: an ARM-shaped unpadded key would open an EMPTY day instead of failing
    'bat-editday': { req: ['date'], ok: function (m) { return date.isKey(m.date); } },
    'bat-plan': { req: ['day'] },
    'bat-notif': { req: ['title', 'body', 'tag'] },
    'request-day-edit': { req: ['date'], ok: function (m) { return date.isKey(m.date); } }
  };
  var TYPES = Object.freeze(Object.keys(SHAPES));
  function make(type, fields) {
    var sh = SHAPES[type]; if (!sh) throw new Error('BATTERY.bus: unknown message type "' + type + '"');
    var msg = { type: type }, k; fields = fields || {};
    for (k in fields) if (Object.prototype.hasOwnProperty.call(fields, k) && k !== 'type') msg[k] = fields[k];
    sh.req.forEach(function (r) { if (!has(msg, r)) throw new Error('BATTERY.bus: "' + type + '" requires field "' + r + '"'); });
    if (sh.ok && !sh.ok(msg)) throw new Error('BATTERY.bus: "' + type + '" has an invalid field value (a date must be a zero-padded YYYY-MM-DD key)');
    return msg;
  }
  var bus = { TYPES: TYPES, make: make, post: function (win, type, fields, origin) { var msg = make(type, fields); win.postMessage(msg, origin || '*'); return msg; } };

  // ---------------------------------------------------------------- registry (DA §4: modules declare; the lib validates; youth is a REGISTRATION-TIME invariant)
  var DOSE_IN_NAME = /\d+(?:\.\d+)?\s*(?:mg|mcg|µg|g|kg|iu|kcal|cal)\b/i;   // grams-in-a-NAME leak class (feedback_youth_gram_label): refuse it for youth-'safe' items
  var KINDS = {
    'arm.section': { list: 'rows', need: ['id', 'label', 'group', 'order'], enums: { group: ['arm', 'drills', 'body'] } },
    'arm.steps': { list: 'steps', need: ['id', 'name'], container: ['section'] },
    'fuel.item': { list: 'items', need: ['id', 'name'] },
    'fuel.supp': { list: 'items', need: ['id', 'name'] },
    'image.set': { images: true },
    'ui.control': { libOnly: true }
  };
  var registry = {};   // kind -> { payloads: [], ids: {} }
  function fail(kind, msg) { throw new Error('BATTERY.register("' + kind + '"): ' + msg); }
  function register(kind, payload, opts) {
    var spec = KINDS[kind]; if (!spec) fail(kind, 'unknown kind (accepted: ' + Object.keys(KINDS).join(', ') + ')');
    if (spec.libOnly && !(opts && opts.lib === true)) fail(kind, 'is lib-level only; a module may not register it');
    if (!payload || typeof payload !== 'object') fail(kind, 'payload must be an object');
    var reg = registry[kind] || (registry[kind] = { payloads: [], ids: {} }), fresh = [];
    if (spec.libOnly) { reg.payloads.push(deepFreeze(payload)); return payload; }
    if (spec.images) {
      var im = payload.images; if (!im || typeof im !== 'object') fail(kind, 'needs an images object {key: dataURI}');
      Object.keys(im).forEach(function (k) { if (typeof im[k] !== 'string' || im[k].indexOf('data:image/') !== 0) fail(kind, 'image "' + k + '" must be a data:image/ URI'); });
      reg.payloads.push(deepFreeze(payload)); return payload;
    }
    (spec.container || []).forEach(function (c) { if (typeof payload[c] !== 'string' || !payload[c]) fail(kind, 'needs a string "' + c + '"'); });
    var list = payload[spec.list]; if (!Array.isArray(list)) fail(kind, 'needs a "' + spec.list + '" array');
    list.forEach(function (it, i) {
      var where = 'item #' + i + (it && it.id ? ' (' + it.id + ')' : '');
      if (!it || typeof it !== 'object') fail(kind, where + ' must be an object');
      spec.need.forEach(function (f) { if (it[f] === undefined || it[f] === '') fail(kind, where + ' is missing "' + f + '"'); });
      Object.keys(spec.enums || {}).forEach(function (f) { if (spec.enums[f].indexOf(it[f]) < 0) fail(kind, where + ' has an invalid "' + f + '" (' + spec.enums[f].join('|') + ')'); });
      // YOUTH IS REQUIRED ON EVERY ITEM. A module that omits it fails to register: a forgotten gate is a red build, not a live leak.
      if (YOUTH_VALUES.indexOf(it.youth) < 0) fail(kind, where + ' is missing a valid youth declaration (' + YOUTH_VALUES.join('|') + ')');
      if (it.youth === 'safe' && DOSE_IN_NAME.test(String(it.name || it.label || ''))) fail(kind, where + ' is youth-safe but its NAME carries a dose/amount — keep amounts in a youth-hideable field, never in a name');
      var key = payload.section ? payload.section + '/' + it.id : it.id;
      if (reg.ids[key] || fresh.indexOf(key) > -1) fail(kind, where + ' duplicates id "' + key + '" (ids are immutable and unique per kind)');
      fresh.push(key);
    });
    fresh.forEach(function (k) { reg.ids[k] = 1; });   // all-or-nothing: nothing is recorded unless every item validated
    reg.payloads.push(deepFreeze(payload)); return payload;
  }
  function modules(kind) { return registry[kind] ? registry[kind].payloads.slice() : []; }
  function items(kind) { var spec = KINDS[kind], out = []; if (!spec || !spec.list) return out; modules(kind).forEach(function (p) { out = out.concat(p[spec.list]); }); return out; }

  // ---------------------------------------------------------------- manifest + versioned loader (static hosting: "drop a file in" = the file + ONE manifest line; the gate catches an unlisted file)
  var FRAMES = ['host', 'arm', 'fuel'];
  function validateManifest(j) {
    var out = { ok: [], rejected: [], error: null };
    if (!j || typeof j !== 'object' || j.schema !== 1 || !Array.isArray(j.modules)) { out.error = 'manifest must be {"schema":1,"modules":[...]}'; return out; }
    j.modules.forEach(function (e, i) {
      var why = null;
      if (!e || typeof e !== 'object') why = 'entry is not an object';
      else if (typeof e.file !== 'string' || !/^modules\/[a-z0-9_\/.-]+\.js$/.test(e.file) || e.file.indexOf('..') > -1) why = 'file must be modules/<path>.js with no ..';
      else if (FRAMES.indexOf(e.frame) < 0) why = 'frame must be one of ' + FRAMES.join('|');
      else if (!KINDS[e.kind] || KINDS[e.kind].libOnly) why = 'kind must be a module-registrable kind';
      else if (e.load !== undefined && e.load !== 'sync' && e.load !== 'async') why = 'load must be "sync" or "async" (default async)';
      (why ? out.rejected : out.ok).push(why ? { index: i, why: why } : e);
    });
    return out;
  }
  var state = { state: 'idle', error: null, loaded: [], rejected: [], sync: [], syncMissing: [] }, loadP = null;
  function inject(src) {
    return new Promise(function (res) {
      var s = root.document.createElement('script'); s.src = src + (src.indexOf('?') < 0 ? '?v=' + encodeURIComponent(VERSION) : ''); s.async = false;
      s.onload = function () { res(true); }; s.onerror = function () { res(false); }; root.document.head.appendChild(s);
    });
  }
  function loadManifest() {
    if (loadP) return loadP;
    if (typeof root.fetch !== 'function' || typeof Promise !== 'function') { state.state = 'skipped'; loadP = typeof Promise === 'function' ? Promise.resolve(state) : { then: function (f) { f(state); } }; return loadP; }
    state.state = 'loading';
    loadP = root.fetch('modules.json?v=' + encodeURIComponent(VERSION))
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
      .then(function (t) {
        var v = validateManifest(JSON.parse(t)); state.rejected = v.rejected;
        if (v.error) throw new Error(v.error);
        var mine = v.ok.filter(function (e) { return e.frame === FRAME; }), chain = Promise.resolve();
        // load:"sync" = the document loads this module ITSELF, synchronously at parse time (document.write after lib/battery.js), because its consumers run at parse time. The loader
        // NEVER injects those (a second copy would re-register and throw on duplicate ids); it only RECORDS them and notes - as a diagnostic, silently - any whose <script> is not in
        // the document. The build gate (tools/gate-static/modules-manifest.test.mjs) is what turns listed-but-never-loaded into a RED BUILD; this is runtime observability, not a fallback.
        mine.forEach(function (e) {
          if (e.load === 'sync') { state.sync.push(e.file); try { if (!root.document.querySelector('script[src*="' + e.file + '"]')) state.syncMissing.push(e.file); } catch (x) {} return; }
          chain = chain.then(function () { return inject(e.file).then(function (ok) { if (ok) state.loaded.push(e.file); else state.rejected.push({ file: e.file, why: 'failed to load' }); }); });
        });
        return chain;
      })
      .then(function () { state.state = 'ready'; return state; })
      // SILENT on purpose: a missing/empty manifest (offline, a 204, a pre-Step-2 cache) must never produce a console error or break boot.
      .catch(function (e) { state.state = 'error'; state.error = String((e && e.message) || e); return state; });
    return loadP;
  }

  // ---------------------------------------------------------------- the namespace
  var api = {
    version: VERSION, frame: FRAME, kinds: Object.freeze(Object.keys(KINDS)),
    esc: esc, date: date, youth: youth, store: store, bus: bus,
    register: register, modules: modules, items: items,
    manifest: function () { return { state: state.state, error: state.error, loaded: state.loaded.slice(), rejected: state.rejected.slice(), sync: state.sync.slice(), syncMissing: state.syncMissing.slice() }; },
    validateManifest: validateManifest, loadManifest: loadManifest
  };
  Object.defineProperty(root, 'BATTERY', { value: Object.freeze(api), writable: false, configurable: false, enumerable: true });
  loadManifest();   // kicks the (empty-today) manifest fetch; no DOM, no storage
})(typeof window !== 'undefined' ? window : this);
