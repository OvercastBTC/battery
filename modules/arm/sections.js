/* BATTERY · modules/arm/sections.js — ARM section registry (rewrite Step 3, content-as-data).
   Extracted by Lane D (D.26.10.13.1) on 2026-10-16 from master arm.html @ 966f56d (v250 live) — a FAITHFUL extraction of today's DOM, not a policy change.
   DATA ONLY: no parent./contentWindow./postMessage/document references (R §6.1). Youth is declared per row (R §6.4) — see NOTE.md for what 'safe' means at SECTION level.
   id = the section's current .tab[data-tab] / #page-<id> id, byte-exact, never renamed. order = SOURCE order of the .tab buttons; pageOrder = SOURCE order of the #page-* divs (they differ: fieldwork's page precedes washington's while its tab follows — pre-existing, reproduce it); flowOrder = FLOW_ORDER (arm.html:7323) — the 5 flow sections are REORDERED in place at boot into flowOrder (runtime strip: warmup,tube,jbands,plyo,long) and their h2 gets that number prepended; flowLabel = FLOW_LABEL (7324) = the name used by the runtime NEXT · … button. */
BATTERY.register('arm.section', {
  rows: [
    { id: 'overview',   label: 'Overview',      group: 'arm',    order: 1, pageOrder: 1,  youth: 'safe', default: true,   drawerGroup: 'lead', img: 'overview',   positions: ['pitcher','c','1b','2b','ss','3b','of'] },
    { id: 'warmup',     label: 'Warm Up',       group: 'arm',    order: 2, pageOrder: 2,  youth: 'safe',                  drawerGroup: 'flow', flowOrder: 1, flowLabel: 'Dynamic Warm-Up', img: 'warmup' },
    { id: 'jbands',     label: 'J-Bands',       group: 'arm',    order: 3, pageOrder: 3,  youth: 'safe',                  drawerGroup: 'flow', flowOrder: 3, flowLabel: 'J-Bands', img: 'jbands' },
    { id: 'tube',       label: 'Shoulder Tube', group: 'arm',    order: 4, pageOrder: 4,  youth: 'safe',                  drawerGroup: 'flow', flowOrder: 2, flowLabel: 'Shoulder Tube', img: 'tube',       positions: ['pitcher'] },
    { id: 'plyo',       label: 'PlyoCare',      group: 'arm',    order: 5, pageOrder: 5,  youth: 'safe',                  drawerGroup: 'flow', flowOrder: 4, flowLabel: 'PlyoCare', img: 'plyo',       positions: ['pitcher','c','1b','2b','ss','3b','of'], heavySteps: true },
    { id: 'long',       label: 'Long Toss',     group: 'arm',    order: 6, pageOrder: 6,  youth: 'safe',                  drawerGroup: 'flow', flowOrder: 5, flowLabel: 'Long Toss', img: 'long',       positions: ['pitcher','c','1b','2b','ss','3b','of'] },
    { id: 'gameday',    label: 'Game Day',      group: 'arm',    order: 7, pageOrder: 7,  youth: 'safe', optional: true,  drawerGroup: 'info', img: 'gameday' },
    { id: 'washington', label: 'Wash Drills',   group: 'drills', order: 8, pageOrder: 9,  youth: 'safe',                                       img: 'washington', positions: ['all','1b','2b','ss','3b','pitcher','c','of'] },
    { id: 'fieldwork',  label: 'Field Work',    group: 'drills', order: 9, pageOrder: 8,  youth: 'safe',                                       img: 'fieldwork' },
    { id: 'pitching',   label: 'Pitching',      group: 'drills', order: 10, pageOrder: 10, youth: 'safe', optional: true,                       img: 'pitching' },
    { id: 'recovery',   label: 'Recovery',      group: 'body',   order: 11, pageOrder: 11, youth: 'safe',                                       img: 'recovery' },
    { id: 'schedule',   label: 'Schedule',      group: 'arm',    order: 12, pageOrder: 12, youth: 'safe',                  drawerGroup: 'info', img: 'schedule',   positions: ['pitcher'] },
    { id: 'sources',    label: 'Sources',       group: 'arm',    order: 13, pageOrder: 13, youth: 'safe',                  drawerGroup: 'info', img: 'sources' },
    { id: 'extras',     label: 'Daily Extras',  group: 'body',   order: 14, pageOrder: 14, youth: 'safe', optional: true,                       img: 'extras',     positions: ['pitcher','c','3b'] },
    { id: 'lifting',    label: 'Lifting',       group: 'body',   order: 15, pageOrder: 15, youth: 'safe',                                       img: 'lifting',    countStream: 'lift' },
    { id: 'history',    label: 'History',       group: 'arm',    order: 16, pageOrder: 16, youth: 'safe',                  drawerGroup: 'info', img: 'history' }
  ]
});
