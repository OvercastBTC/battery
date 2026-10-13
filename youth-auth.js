/* youth-auth.js — SHARED youth-visibility AUTHORIZATION registry + resolver.
   Loaded by index.html (host), and (unit 2, Lane A) by fuel.html + arm.html, the
   same `document.write` + ?v= pattern as section-images.js. Same-origin: every file
   reads the SAME window globals + the SAME localStorage ledger. NO postMessage, NO §7
   row — this is data + one pure resolver, like SECTION_IMAGES.

   THE CONTRACT (CLAUDE.md §4.3): a youth-visibility relaxation (show supplements /
   figure tiles / caffeine tiles to a youth profile) is AUTHORIZED here, not hand-
   edited into a lever. A lever with NO authorization is HIDDEN (fail-closed, exactly
   today's YOUTH_SUPP_ALLOW default-hidden philosophy). The host DATA-view "Youth
   Visibility" card (youth-auth host APIs in index.html) is the ONLY writer of the
   device ledger; the owner's tap is the authorization; the build-baked mirror below
   carries it fleet-wide; the gate (youth-auth.test.mjs) checks both.

   This file holds ZERO crypto and ZERO host-only logic — the PIN / owner-secret /
   hash-chain / mint / card / nudge all live in index.html so this file stays trivially
   safe to load inside the iframes. */
(function(){
  'use strict';

  /* ===== 2.1  The youth-visibility CHANGE registry (declared by the building lane) =====
     Every youth-visibility lever in the app references one of these `id`s. `requires`
     is always 'owner' for v1. Adding a future relaxation = add a row here + key the
     lever on youthVisAllowed(id); ship DORMANT (no YOUTH_VIS_AUTH row) → the card does
     the rest. NO lane flips a youth lever by hand again. */
  window.YOUTH_VIS_CHANGES = window.YOUTH_VIS_CHANGES || [
    { id:'tiles-figures-2026-10-13', kind:'section-tiles',
      title:'Show the figure section tiles to youth',
      what:['arm','lifting','recovery'],
      youthSees:'Section images (a flexed arm, a lifter, a seated athlete). Names and images only — never doses or numbers.',
      shippedIn:'26.10.13.242', requires:'owner' },
    { id:'supps-youth-2026-10-06', kind:'supp-allowlist',
      title:'Show allow-listed supplements to youth',
      what:['YOUTH_SUPP_ALLOW'],
      youthSees:'Supplement names and bottle images. The peptide and the adult pouch can never show.',
      shippedIn:'26.10.06.205', requires:'owner' },
    { id:'caffeine-tiles-2026-10-12', kind:'caffeine',
      title:'Show caffeinated items to youth age ten and up, with a daily budget',
      what:['caffeine'],
      youthSees:'Caffeinated item names and a words-only daily budget, from age ten. A heads-up sheet before a full day is reached.',
      shippedIn:'26.10.12.238', requires:'owner' }
  ];

  /* ===== 2.2(b)  BUILD-BAKED authorization mirror =====
     The owner's issued code goes here (E adds the row when Adam sends the code). From
     then on EVERY device running that build treats the change as authorized; the gate
     asserts a row exists for every lever that is live. Other devices TRUST THE BUILD,
     not the code (no backend, no PKI — CLAUDE.md §1.1). The three rows below RETRO-
     record the already-live relaxations (owner-approved 2026-10-13: "retro-record=yes")
     so the ledger is complete from day one and NOTHING visibly changes on ship:
       · tiles  = v242 youth-tile-hold release (Adam direct to E, 2026-10-13)
       · supps  = v205 youth-supp go-live     (Adam direct to E, 2026-10-06)
       · caff   = v238 caffeine guardrail      (Adam double-confirmed to Q + E, 2026-10-12)
     `code:*-RETRO` marks an install-time retro row (no owner device minted it); the host
     card shows these as "recorded on install", never "issued here". */
  window.YOUTH_VIS_AUTH = window.YOUTH_VIS_AUTH || [
    { changeId:'tiles-figures-2026-10-13', action:'authorize', code:'YVA-TILES-RETRO',  at:'2026-10-13T00:00:00Z', by:'owner', retro:true },
    { changeId:'supps-youth-2026-10-06',   action:'authorize', code:'YVA-SUPPS-RETRO',  at:'2026-10-06T00:00:00Z', by:'owner', retro:true },
    { changeId:'caffeine-tiles-2026-10-12',action:'authorize', code:'YVA-CAFF-RETRO',   at:'2026-10-12T00:00:00Z', by:'owner', retro:true }
  ];

  var LEDGER_KEY='battery-youth-auth';

  /* Device ledger — append-only, hash-chained (chain built + verified host-side). This
     file only READS it; a parse failure yields an empty ledger (fail-closed). */
  function ledger(){
    try{ var o=JSON.parse(localStorage.getItem(LEDGER_KEY)||'null');
      if(o&&typeof o==='object'&&Array.isArray(o.records)) return o;
    }catch(e){}
    return { schema:1, ledgerId:'', records:[] };
  }
  function ledgerRecords(){ var r=ledger().records; return Array.isArray(r)?r:[]; }

  /* Tier source = battery-boot-tier (set synchronously at host boot + on every profile
     switch via reloadFrames; read identically by the iframes). FAIL-CLOSED: anything
     that is not the literal string 'adult' is treated as youth. */
  function isYouthTier(){ try{ return localStorage.getItem('battery-boot-tier')!=='adult'; }catch(e){ return true; } }

  function _ms(at){ var t=Date.parse(at); return isNaN(t)?0:t; }

  /* 2.2 / 4  latest-wins over {baked, local-ledger} for one changeId — TIER-AGNOSTIC.
     authorize vs revoke, newest `at` wins; a local record ties ABOVE a baked one at the
     same instant (this device's latest intent). No record at all ⇒ NOT authorized. */
  function youthVisAuthorized(changeId){
    var rows=[];
    var baked=window.YOUTH_VIS_AUTH||[];
    for(var i=0;i<baked.length;i++){ if(baked[i]&&baked[i].changeId===changeId) rows.push({at:_ms(baked[i].at),action:baked[i].action||'authorize',src:0}); }
    var local=ledgerRecords();
    for(var j=0;j<local.length;j++){ if(local[j]&&local[j].changeId===changeId) rows.push({at:_ms(local[j].at),action:local[j].action||'authorize',src:1,n:local[j].n||0}); }
    if(!rows.length) return false;
    rows.sort(function(a,b){ if(a.at!==b.at) return a.at-b.at; if(a.src!==b.src) return a.src-b.src; return (a.n||0)-(b.n||0); });
    var last=rows[rows.length-1];
    return last.action!=='revoke';
  }

  /* The lever-facing resolver: adults are never restricted by a youth lever; youth get
     the real check. This is what fuel.html / arm.html call. */
  function youthVisAllowed(changeId){
    if(!isYouthTier()) return true;
    return youthVisAuthorized(changeId);
  }

  /* registry lookup helper (host card + gate consistency check) */
  function youthVisChange(id){ var a=window.YOUTH_VIS_CHANGES||[]; for(var i=0;i<a.length;i++){ if(a[i]&&a[i].id===id) return a[i]; } return null; }

  window.youthAuthLedger=ledger;
  window.youthAuthLedgerRecords=ledgerRecords;
  window.youthAuthLedgerKey=LEDGER_KEY;
  window._yvaIsYouthTier=isYouthTier;
  window.youthVisAuthorized=youthVisAuthorized;
  window.youthVisAllowed=youthVisAllowed;
  window.youthVisChange=youthVisChange;
})();
