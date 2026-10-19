/* BATTERY · src/arm/layout.js — ARM Stage-2 SOURCE DATA (Lane D, D.26.10.16.1). GENERATOR INPUT ONLY: never loaded by a browser, never listed in modules.json.
   Extracted 2026-10-18 from the AUTHORED arm.html @ c297d19 (pre-boot DOM, JS off, immutable committed snapshot). Do not hand-reformat: regenerate with stage2/build-src-arm.mjs, re-verify with verify-src-arm.mjs.
   kind 'arm.layout' · one payload per section · region = ONE direct child of #page-<section> that contains steps; id = '<section>#<index among the page's element children>'. Step order = AUTHORED order.
   Blocks (keys exactly): {step:id} · {el, attrs:{…authored attribute order…}, blocks} · {html:<whitespace-collapsed outerHTML>, [mech:'heavy'|'youthHide'], [altCard:true]} · any block may carry note:'<text>'.
   v260 = NO wrapper nodes. The 6 authored §4.3 wrappers ({el:'div', attrs:{class:'plyo-heavy'|'youth-hide'}}) are REMOVED and their children promoted IN PLACE into the parent list (a region whose root was a wrapper now lists its children directly); the generator DERIVES them: each maximal run of sibling blocks with the same non-safe mech (steps: arm.steps heavy/youthHide; islands: mech) is wrapped in the matching div, exactly where the v259 data had them.
   Island mech stays (it is the island's own §4.3 flag). A wrapper's trailing comment already rode the wrapper's LAST LEAF, so every note survives.
   note = an authored HTML comment, verbatim whitespace-collapsed, attached to the block it immediately followed (a wrapper's trailing comment rides the wrapper's LAST LEAF so it stays valid after v260). notes-audit.txt lists all of them.
   Pure data calls: no logic, no cross-frame or DOM tokens. */
BATTERY.register('arm.layout', { section: "warmup", regions: [
  { id: "warmup#5", blocks: [
    { el: "ul", attrs: {"class":"steplist"}, blocks: [
      { step: "fd1" },
      { step: "fd2" },
      { step: "fd3" },
      { step: "fd4" },
      { step: "fd5" },
      { step: "fd6" },
      { step: "fd7" },
      { step: "fd8" }
    ] }
  ] },
  { id: "warmup#8", blocks: [
    { el: "ul", attrs: {"class":"steplist"}, blocks: [
      { step: "fs1" },
      { step: "fs2" },
      { step: "fs3" },
      { step: "fs4" },
      { step: "fs5" },
      { step: "fs6" },
      { step: "fs7" }
    ] }
  ] },
  { id: "warmup#12", blocks: [
    { el: "ul", attrs: {"class":"steplist"}, blocks: [
      { step: "fb1a" },
      { step: "fb1b" },
      { step: "fb2a" },
      { step: "fb2b" },
      { step: "fb3a" },
      { step: "fb3b" },
      { step: "fb4a" },
      { step: "fb4b" },
      { step: "fb5a" },
      { step: "fb5b" }
    ] }
  ] }
] });
BATTERY.register('arm.layout', { section: "jbands", regions: [
  { id: "jbands#5", blocks: [
    { el: "ul", attrs: {"class":"steplist"}, blocks: [
      { step: "j1" },
      { step: "j2" },
      { step: "j3" },
      { step: "j4" },
      { step: "j5" },
      { step: "j6" },
      { step: "j7" },
      { step: "j8" },
      { step: "j9" },
      { step: "j10" },
      { step: "j11" },
      { step: "j12" },
      { html: "<li class=\"step-divider\" id=\"jx-divider\"> <span>Optional extras · woven in below · counted only when ON</span> <button id=\"jx-toggle\" onclick=\"toggleJxExtras()\">ON</button> </li>" },
      { step: "jx-rows" },
      { step: "jx-facepull" },
      { step: "jx-circles" },
      { step: "jx-fwdback" },
      { step: "jx-triceps" },
      { step: "jx-a" },
      { step: "jx-t" },
      { step: "jx-y" },
      { step: "jx-pullapart" }
    ] }
  ] }
] });
BATTERY.register('arm.layout', { section: "tube", regions: [
  { id: "tube#3", blocks: [
    { el: "ul", attrs: {"class":"steplist"}, blocks: [
      { step: "t1" },
      { step: "t2" },
      { step: "t3" },
      { step: "t4" }
    ] }
  ] }
] });
BATTERY.register('arm.layout', { section: "plyo", regions: [
  { id: "plyo#3", blocks: [
    { html: "<div class=\"card gold\"> <div class=\"card-head\"> <div class=\"card-title\">The 6-Ball Set</div> <span class=\"badge gold\">From the video</span> </div> <ul> <li><b>2000 g · 71 oz</b> — Bauer's \"4 lb\" — kneeling reverse + spiral warm-up</li> <li><b>1000 g · 35 oz</b> — Bauer's \"2 lb\" — sequence drills (standing / stomp / hop-step)</li> <li><b>450 g · 16 oz</b> — Bauer's \"1 lb\" — drop-step pickoffs</li> <li><b>225 g · 8 oz</b> — drop drill</li> <li><b>150 g · 5 oz</b> — step-behind w/ arm swing</li> <li><b>100 g · 3.5 oz</b> — mound / stretch throws</li> </ul> <div class=\"cue\">Weights ramp the routine from <b>heavy &amp; slow</b> (rotational warm-up) down to <b>light &amp; fast</b> (full-delivery throws) — heavier first to groove the pattern, lighter last to add speed.</div> </div>", mech: "heavy" },
    { html: "<h3>The Routine (in order)</h3>", mech: "heavy" },
    { el: "ul", attrs: {"class":"steplist"}, blocks: [
      { step: "plyo-reverse" },
      { step: "plyo-spiral" },
      { step: "plyo-ramp-light" },
      { step: "plyo-seq-standing" },
      { step: "plyo-seq-stomp" },
      { step: "plyo-seq-hop" },
      { step: "plyo-dropstep" },
      { step: "plyo-drop" },
      { step: "plyo-stepbehind" },
      { step: "plyo-mound" },
      { step: "plyo-humpty" }
    ] }
  ] }
] });
BATTERY.register('arm.layout', { section: "gameday", regions: [
  { id: "gameday#2", blocks: [
    { html: "<div id=\"gd-tabs\" style=\"display:flex;gap:8px;margin:0 0 16px\"> <button class=\"gd-tab-btn active\" data-gdtab=\"pitcher\" onclick=\"switchGdTab('pitcher')\" style=\"flex:1;padding:10px 0;border-radius:8px;border:1px solid var(--line);background:var(--gold);color:var(--bg);font-weight:700;font-size:13px;cursor:pointer\">⚾ Pitcher</button> <button class=\"gd-tab-btn\" data-gdtab=\"catcher\" onclick=\"switchGdTab('catcher')\" style=\"flex:1;padding:10px 0;border-radius:8px;border:1px solid var(--line);background:transparent;color:var(--dim);font-weight:700;font-size:13px;cursor:pointer\">🧤 Catcher</button> </div>", mech: "heavy" },
    { el: "div", attrs: {"id":"gd-pitcher"}, blocks: [
      { html: "<p class=\"lede\">Trevor Bauer's full pre-game routine, walked through in his <b>Baseball 401 · Game Day Warmup Routine</b> video — his most in-depth warm-up. He runs different warm-ups for a lift, a bullpen or a recovery day; <b>this is the one before a start.</b> The order is the point: it slowly builds the body from measurement and mobility up to a full-effort bullpen.</p>", mech: "heavy" },
      { html: "<div class=\"card gold\"> <div class=\"card-head\"> <div class=\"card-title\">The sequence, in order</div> <span class=\"badge gold\">From the video</span> </div> <ul> <li><b>1 · Daily measurements</b> — sleep, HRV, shoulder &amp; grip strength, force plates</li> <li><b>2 · Hot tub + dress</b> — raise core temp (optional / personal)</li> <li><b>3 · Foam roll + T-spine</b> mobility</li> <li><b>4 · Hip</b> mobility</li> <li><b>5 · Core activation</b> — the \"scorpion\"</li> <li><b>6 · Cuff weights</b> — 10 lb, 4 drills</li> <li><b>7 · Weighted balls</b> — a <em>core</em> warm-up, not a shoulder one</li> <li><b>8 · Shoulder tube</b> routine</li> <li><b>9 · Long toss</b> — out to max, pull down (~50 throws)</li> <li><b>10 · Pregame bullpen</b> — sequencing &amp; command (~42 throws)</li> </ul> <div class=\"cue\">Bauer adjusts the routine off his morning numbers — poor sleep or low HRV and he changes what he does to \"trick the body\" into the right place for the game.</div> </div>", mech: "heavy" },
      { html: "<h3>The Routine (in order)</h3>", mech: "heavy" },
      { el: "ul", attrs: {"class":"steplist"}, blocks: [
        { step: "gd-measure" },
        { step: "gd-hottub" },
        { step: "gd-mobility" },
        { step: "gd-hips" },
        { step: "gd-activation" },
        { step: "gd-cuff" },
        { step: "gd-balls" },
        { step: "gd-tube" },
        { step: "gd-longtoss" },
        { step: "gd-bullpen" }
      ] },
      { html: "<div class=\"info\" style=\"margin-top:18px\"> <strong>Source:</strong> Trevor Bauer — \"Game Day Warmup Routine\" (Baseball 401), youtube.com/@trevorbauer. Demo clips are short references trimmed from that video; the full walkthrough is worth watching once. </div>", mech: "heavy" }
    ], note: "/gd-pitcher" },
    { html: "<div id=\"gd-catcher\" style=\"display:none\"> <p class=\"lede\">Patrick Bailey's complete catcher pregame — the routine a starting MLB catcher runs before every game. <b>Four sections, in order.</b> Structure, sequence, and pacing from a pro who does this 162 times a year.</p> <div class=\"card blue\"> <div class=\"card-head\"> <div class=\"card-title\">The sequence, in order</div> <span class=\"badge blue\">Bailey Pregame</span> </div> <ul> <li><b>1 · Pregame Routine</b> — full warmup framework overview</li> <li><b>2 · Receiving Warmup</b> — soft hands, mitt presentation, progressive intensity</li> <li><b>3 · Throwing Warmup</b> — pop-ups, snap throws, down &amp; tag</li> <li><b>4 · Rep Work</b> — rapid-fire blocking &amp; receiving volume</li> </ul> <div class=\"cue\">Work through each section in order. The sequence matters as much as the individual drills.</div> </div> <div style=\"display:flex;flex-direction:column;gap:8px;margin-top:12px\"> <button class=\"clip-btn\" onclick=\"scrollToStep('bougie-bailey-routine')\" style=\"text-align:left\">→ B-29 · Bailey Pregame Routine</button> <button class=\"clip-btn\" onclick=\"scrollToStep('bougie-bailey-recv')\" style=\"text-align:left\">→ B-30 · Bailey: Receiving Warmup</button> <button class=\"clip-btn\" onclick=\"scrollToStep('bougie-bailey-throw')\" style=\"text-align:left\">→ B-31 · Bailey: Throwing Warmup</button> <button class=\"clip-btn\" onclick=\"scrollToStep('bougie-bailey-reps')\" style=\"text-align:left\">→ B-32 · Bailey: Rep Work</button> </div> <div class=\"info\" style=\"margin-top:18px\"> <strong>Source:</strong> Catching Made Simple (Coach Bougie) — Patrick Bailey pregame breakdown. The drills live in the Catching section; these buttons take you straight to each one. </div> </div>", mech: "heavy", note: "/gd-catcher" }
  ] }
] });
BATTERY.register('arm.layout', { section: "fieldwork", regions: [
  { id: "fieldwork#4", blocks: [
    { el: "ul", attrs: {"class":"steplist"}, blocks: [
      { step: "fw-sprint-90" },
      { step: "fw-first-step" },
      { step: "fw-tempo-jog" }
    ] }
  ] },
  { id: "fieldwork#6", blocks: [
    { el: "ul", attrs: {"class":"steplist"}, blocks: [
      { step: "fw-popfly-if" },
      { step: "fw-popfly-of" }
    ] }
  ] },
  { id: "fieldwork#8", blocks: [
    { el: "ul", attrs: {"class":"steplist"}, blocks: [
      { step: "fw-lateral-shuffle" },
      { step: "fw-dig-lr" },
      { step: "fw-backhand-dirt" }
    ] }
  ] },
  { id: "fieldwork#10", blocks: [
    { el: "ul", attrs: {"class":"steplist"}, blocks: [
      { step: "fw-1b-stretch" },
      { step: "fw-1b-scoop" },
      { step: "fw-1b-angles" }
    ] }
  ] },
  { id: "fieldwork#12", blocks: [
    { el: "ul", attrs: {"class":"steplist"}, blocks: [
      { step: "fw-box-jump" },
      { step: "fw-broad-jump" }
    ] }
  ] },
  { id: "fieldwork#14", blocks: [
    { el: "ul", attrs: {"class":"steplist"}, blocks: [
      { step: "fw-posture-squat" },
      { step: "fw-highknees" }
    ] }
  ] }
] });
BATTERY.register('arm.layout', { section: "washington", regions: [
  { id: "washington#16", blocks: [
    { el: "ul", attrs: {"class":"steplist"}, blocks: [
      { step: "w0", note: "OWNER UX ITEM 2 (agreed fix). These were three near-duplicate step cards claiming to isolate center / forehand / backhand. The FOOTAGE does not: this doc's own dissection notes record that all three clips were cut from one continuous kneeling block and \"the tape never verbally separates them the way our slot names do\", so cutting three distinct clips meant picking reps by eye. The owner saw exactly that -- each single-side clip showed all three directions. So the PRESENTATION collapses to one card with one honest video, while the three checkboxes stay. That split is deliberate and was agreed explicitly: a single combined checkbox was considered and REJECTED because it loses partial completion, and the three angles remain separate .step elements so data-ex w1/w2/w3 keep their history and the Daily Readiness count is unchanged. Only the duplicated card chrome goes away." },
      { html: "<li class=\"wash-block\" data-clip=\"clips/wash-knee-center.mp4\"> <div class=\"wb-head\"> <div class=\"wb-name\">01–03 · Knee Short Hops</div> <div class=\"wb-target\">Hands only · on the knees · 8–10 ft apart</div> </div> <p class=\"wb-lede\">Both partners on knees. Partner throws firm short hops; glove fingers down, push through the line of the hop. No footwork — just hands. Work all three angles from the same position, ticking each as you go.</p> <p class=\"wb-note\">One video for all three: the source is a single continuous kneeling block and does not cleanly separate the sides, so labelling three clips would claim a precision the tape does not have.</p> </li>" },
      { step: "w1" },
      { step: "w2" },
      { step: "w3" },
      { step: "w4" },
      { step: "w5" },
      { step: "w6" },
      { step: "w7" },
      { step: "w8" },
      { step: "w9" },
      { step: "w10" },
      { step: "w12" },
      { step: "w11" }
    ] }
  ] },
  { id: "washington#29", blocks: [
    { el: "ul", attrs: {"class":"steplist"}, blocks: [
      { step: "w2b-outfront" },
      { step: "w2b-fungo" },
      { step: "w2b-downhill" },
      { step: "w2b-straight" },
      { step: "w2b-tall" },
      { step: "w2b-alignment" }
    ] }
  ] },
  { id: "washington#33", blocks: [
    { el: "ul", attrs: {"class":"steplist"}, blocks: [
      { html: "<li class=\"step-divider\"><span>Hands · everything is preparation for the kill spot</span></li>" },
      { step: "gi-onehand" },
      { step: "gi-center" },
      { step: "gi-pocket" },
      { step: "gi-relax" },
      { step: "gi-killspot" },
      { html: "<li class=\"step-divider\"><span>Reads · decide before it arrives</span></li>" },
      { step: "gi-shortlong" },
      { step: "gi-read" },
      { html: "<li class=\"step-divider\"><span>Feet, feeds and game speed</span></li>" },
      { step: "gi-rightfoot" },
      { step: "gi-rapidfire" },
      { step: "gi-twoshuffles" },
      { step: "gi-onelane" },
      { step: "gi-twospeeds" },
      { step: "gi-feed" }
    ] }
  ] },
  { id: "washington#37", blocks: [
    { el: "ul", attrs: {"class":"steplist"}, blocks: [
      { step: "cat-lkdblock" },
      { step: "cat-toeup" },
      { step: "cat-stance" },
      { step: "cat-framing" },
      { step: "cat-throw" },
      { step: "cat-workload" }
    ] }
  ] },
  { id: "washington#41", blocks: [
    { el: "ul", attrs: {"class":"steplist"}, blocks: [
      { step: "bougie-stance" },
      { step: "bougie-recv-pos135" },
      { step: "bougie-recv-zones" },
      { step: "bougie-recv-decisions" },
      { step: "bougie-recv-drills5" },
      { step: "bougie-frame-preset" },
      { step: "bougie-block-basics" },
      { step: "bougie-block-prog" },
      { step: "bougie-block-reads" },
      { step: "bougie-brickwall" },
      { step: "bougie-glove-thumbsafe" },
      { step: "bougie-throw-elbow-plane" },
      { step: "bougie-throw-hops" },
      { step: "bougie-throw-stepback" },
      { step: "bougie-brace-setup" },
      { step: "bougie-brace-drills" },
      { step: "bougie-decide-intro" },
      { step: "bougie-decide-eyes" },
      { step: "bougie-steal-setups" },
      { step: "bougie-steal-positions" },
      { step: "bougie-steal-screw" },
      { html: "<div class=\"plyo-youth-only\"> <div class=\"card blue\" style=\"margin-top:8px\"> <p>Pop time drills and pro pregame routines are for high-school catchers and up. The fundamentals above — stance, receiving, blocking, and footwork — build a complete young catcher.</p> </div> </div>", altCard: true },
      { step: "bougie-poptime-glute" },
      { step: "bougie-poptime-timing" },
      { step: "bougie-poptime-result" },
      { step: "bougie-pop30-assess" },
      { step: "bougie-pop30-feet" },
      { step: "bougie-pop30-transfer" },
      { step: "bougie-pop30-armpath" },
      { step: "bougie-bailey-routine" },
      { step: "bougie-bailey-recv" },
      { step: "bougie-bailey-throw" },
      { step: "bougie-bailey-reps", note: "/plyo-heavy catching-advanced B-22..B-32" },
      { step: "bougie-lean-drill" },
      { step: "bougie-lean-sticky" },
      { step: "bougie-lean-rotate", note: "/plyo-heavy catching-advanced B-35" },
      { step: "bougie-throw1-elbow" },
      { step: "bougie-throw1-hips" },
      { step: "bougie-solo-drills" },
      { step: "bougie-passball-slide" },
      { step: "bougie-passball-knee" },
      { step: "bougie-passball-reps" },
      { step: "bougie-statcast-baileyknee" },
      { step: "bougie-statcast-framing" },
      { step: "bougie-statcast-glove5pos" },
      { step: "bougie-statcast-trovinho" }
    ] }
  ] },
  { id: "washington#44", blocks: [
    { el: "ul", attrs: {"class":"steplist"}, blocks: [
      { step: "propoint-block-twoknee" },
      { step: "propoint-block-gloveslide" },
      { step: "propoint-block-timing" },
      { step: "propoint-recv-underball" },
      { step: "propoint-recv-getbehind" },
      { step: "propoint-recv-matchangle" }
    ] }
  ] }
] });
BATTERY.register('arm.layout', { section: "pitching", regions: [
  { id: "pitching#4", blocks: [
    { el: "ul", attrs: {"class":"steplist"}, blocks: [
      { step: "pitch-hipfire" },
      { step: "pitch-gloveside" },
      { step: "pitch-hipsep" },
      { step: "pitch-armspiral" },
      { step: "pitch-pulldown" },
      { step: "pitch-clockdrill" },
      { step: "pitch-warmup3" }
    ] }
  ] },
  { id: "pitching#6", blocks: [
    { el: "ul", attrs: {"class":"steplist"}, blocks: [
      { step: "pitch-fosh" },
      { step: "pitch-spin-theory" },
      { step: "pitch-cutter-axis" },
      { step: "pitch-curve-spin" }
    ] }
  ] },
  { id: "pitching#9", blocks: [
    { el: "ul", attrs: {"class":"steplist"}, blocks: [
      { step: "strat-tunnel-def" },
      { step: "strat-tunnel-vert" },
      { step: "strat-tunnel-horz" },
      { step: "strat-cmd-targets" },
      { step: "strat-cmd-session" },
      { step: "strat-ducks-tunnel-read" },
      { step: "strat-ducks-first-pitch" },
      { step: "strat-ducks-splitter-tree" },
      { step: "strat-ducks-new-pitch" },
      { step: "strat-ducks-fb-tunnel-up" },
      { step: "strat-mx-fb-cutter" },
      { step: "strat-mx-three-pitch" },
      { step: "strat-jp-splitter-tunnel" },
      { step: "strat-jp-same-seq" }
    ] }
  ] }
] });
BATTERY.register('arm.layout', { section: "recovery", regions: [
  { id: "recovery#2", blocks: [
    { html: "<div class=\"card gold\"> <div class=\"card-head\"> <div class=\"card-title\">Post-Throwing Stack</div> <span class=\"badge gold\">After Every Throw Day</span> </div> <ul> <li><b>1. Ice/cold</b> — 10-15 min on shoulder + elbow within 30 min of last throw</li> <li><b>2. J-Bands light</b> — 60% effort, same 11 exercises — flushes the muscles</li> <li><b>3. Marc Pro / TENS</b> — 30-60 min, low setting</li> <li><b>4. Sleep</b> — 8 hrs minimum, ideally with cold room</li> <li><b>5. Protein</b> — 30g within 1 hour, hydrate aggressively</li> </ul> <div class=\"cue\">\"The single biggest recovery tool I have is sleep. Everything else is supplementary.\" — Bauer, Tips with Trev Ep. 24</div> </div>", mech: "youthHide" },
    { html: "<h3>Soft Tissue &amp; Stretch · Bauer in Japan</h3>", mech: "youthHide" },
    { html: "<p class=\"lede\">Cut from Bauer's own footage during his season in Japan -- the foam-roller work he does in the weight room and the team stretch circle after practice. All optional / +bonus; the roller steps need a roller, and the stretch circle is a model rather than a prescription.</p>", mech: "youthHide" },
    { el: "ul", attrs: {"class":"steplist"}, blocks: [
      { step: "rc-roll-tspine" },
      { step: "rc-roll-hips" },
      { step: "rc-roll-text" },
      { step: "rc-roll-lats" },
      { step: "rc-ball-pecminor" },
      { step: "rc-ball-infra" },
      { step: "rc-ball-trap" },
      { step: "rc-ball-rhomboid" },
      { step: "rc-teamstretch" },
      { step: "rc-core-floor" }
    ] },
    { html: "<h3>Bauer Recovery Science</h3>", mech: "youthHide" },
    { html: "<p class=\"lede\">Bauer's specific recovery protocols -- eccentric and isometric work, and the CP warmup. These are the \"how\" behind the post-throwing stack above.</p>", mech: "youthHide" },
    { el: "ul", attrs: {"class":"steplist"}, blocks: [
      { step: "rc-eccentric" },
      { step: "rc-iso" },
      { step: "rc-cp-warmup" }
    ] },
    { html: "<h3>Shoulder &amp; Mobility</h3>", mech: "youthHide" },
    { html: "<p class=\"lede\">Shoulder tube work (for recovery-day maintenance, not the pre-throwing warmup -- that lives on the Shoulder Tube tab) and face pull exercises for posterior-chain health.</p>", mech: "youthHide" },
    { el: "ul", attrs: {"class":"steplist"}, blocks: [
      { step: "rc-tube-overhead" },
      { step: "rc-tube-forward" },
      { step: "rc-tube-lateral" },
      { step: "rc-tube-throwing" },
      { step: "rc-facepull1" },
      { step: "rc-facepull2" }
    ] },
    { html: "<h3>Facility-Specific (If Available)</h3>", mech: "youthHide" },
    { html: "<ul> <li><b>Cold plunge:</b> 3-5 min, immediately post-session. Skip if sore the next day from previous session.</li> <li><b>Sauna:</b> 15-20 min, AFTER cold plunge (not before). Heat-cold contrast for circulation.</li> <li><b>Recovery tools:</b> Theragun / Hyperice — focus on lats, pec minor, and forearms.</li> </ul>", mech: "youthHide" },
    { html: "<div class=\"warn\"> <strong>Skip recovery once, no problem. Skip three sessions in a row,</strong> and that's where adult arms break down mid-season. </div>", mech: "youthHide" }
  ] }
] });
BATTERY.register('arm.layout', { section: "extras", regions: [
  { id: "extras#3", blocks: [
    { el: "div", attrs: {"class":"subsection"}, blocks: [
      { html: "<div class=\"subsection-tag\">SECTION 01 · BAUER INTERNATIONAL</div>" },
      { html: "<h3>Japan · Mexico · Long Island Ducks</h3>" },
      { html: "<p>Bauer is the first pitcher to be an All-Star in MLB, NPB, and LMB. After his MLB career, he pitched for the Yokohama DeNA BayStars (NPB, 2023 + 2025), Diablos Rojos del México (LMB, 2024 — Pitcher of the Year, league championship), and signed with the Long Island Ducks (Atlantic League, April 2026). Each environment shaped his training.</p>" },
      { html: "<div class=\"card gold\"> <div class=\"card-head\"> <div class=\"card-title\">What's Different Internationally</div> <span class=\"badge gold\">Confirmed Pattern</span> </div> <p>NPB and LMB programs emphasize <b>single-leg balance work, longer warmups, and lower-body lift volume</b> compared to typical MLB programs. Bauer's content from this era shows more squat work, balance drills, and barehand/footwork integration than his original Driveline-era material.</p> <div class=\"cue\">Specific named drill catalogs aren't fully published — what is documented is the philosophical shift. The exercises below represent the type of work Bauer integrated, not a verbatim Bauer routine.</div> </div>" },
      { html: "<p style=\"font-size:12px;color:var(--dim);margin:14px 0 12px\">Tap the box to check off. Tap the name to expand details.</p>" },
      { el: "ul", attrs: {"class":"steplist"}, blocks: [
        { step: "bi1" },
        { step: "bi2" },
        { step: "bi3" },
        { step: "bi4" },
        { step: "bi5" }
      ] },
      { html: "<div class=\"card\"> <div class=\"card-head\"> <div class=\"card-title\">Bauer's International Channels</div> <span class=\"badge gold\">Confirmed</span> </div> <p>Bauer documents his international training on:</p> <ul> <li><b>Trevor Bauer (YouTube)</b> — main channel, has Japan/Mexico content</li> <li><b>Momentum (@WatchMomentum)</b> — his production company</li> <li><b>BauerOutage TikTok</b> — short-form training clips</li> <li><b>X/Twitter (@BauerOutage)</b> — workout updates, daily content</li> </ul> <div class=\"cue\">Search his channels for \"Japan training\", \"Diablos Rojos workout\", \"Ducks training\" to find specific videos. Routine names vary by post.</div> </div>" },
      { html: "<div class=\"warn\"> <strong>Honest note:</strong> Bauer hasn't published a comprehensive international training PDF or named protocol. The exercises above represent documented training PATTERNS from his international era, not a verbatim \"Bauer NPB routine.\" Treat as well-informed inference, not verbatim instruction. </div>" }
    ] }
  ] }
] });
BATTERY.register('arm.layout', { section: "lifting", regions: [
  { id: "lifting#2", blocks: [
    { html: "<p class=\"lede\">Strength work in service of the four goals: pitching first, general conditioning, first-base/position defense, and a hard focus on hitting. Everything here is <b>optional</b> — it counts as +bonus and never gates the daily arm-care ratio.</p>", mech: "youthHide" },
    { html: "<div class=\"split-bar\" id=\"split-bar\"> <div class=\"split-chip\" data-split=\"all\" onclick=\"setSplit('all')\">All</div> <div class=\"split-chip\" data-split=\"3day\" onclick=\"setSplit('3day')\">3-Day</div> <div class=\"split-chip\" data-split=\"2day\" onclick=\"setSplit('2day')\">2-Day</div> </div>", mech: "youthHide" },
    { html: "<div class=\"split-day\" id=\"split-day\"></div>", mech: "youthHide" },
    { html: "<div class=\"split-note\" id=\"split-note\"></div>", mech: "youthHide", note: "Free-form lifting log (backlog item 4). Inside .youth-hide by construction: the whole weight-room block is adult-only per §4.3." },
    { html: "<div id=\"liftlog-card\" class=\"card\"></div>", mech: "youthHide" },
    { html: "<div class=\"card gold\"> <div class=\"card-head\"> <div class=\"card-title\">How to read this page</div> <span class=\"badge gold\">Coach notes</span> </div> <ul> <li><b>Pull ≥ push.</b> Throwers should row at least as much as they press — throwing is already an anterior-dominant stress; the back side is what protects the shoulder.</li> <li><b>Know which effect you're training.</b> Same lift, different rep range = different adaptation. The quarter squat below is listed twice on purpose.</li> <li><b>Rotation is where the money is.</b> Pitching velocity and bat speed come from hip/trunk rotation speed — not trunk flexion. The rotational block is the highest-transfer addition for both stated goals.</li> </ul> <div class=\"cue\">Coaching guidance, not medical advice. Numbers are starting points — form and controlled fatigue are always the real limits.</div> </div>", mech: "youthHide" },
    { el: "ul", attrs: {"class":"steplist"}, blocks: [
      { step: "lift-row" },
      { step: "lift-press" },
      { step: "lift-curls" },
      { step: "lift-triceps" },
      { step: "lift-qsq-power" },
      { step: "lift-qsq-endur" },
      { step: "lift-deadlift" },
      { step: "lift-goblet" },
      { step: "lift-lunge" },
      { step: "lift-abs", note: "Item 5: these four were already in the routine, but three of them existed only as PROSE inside the Ab Progression entry -- crunches, regular/decline sit-ups, side crunches. Prose cannot be ticked, and it cannot be logged either -- the lifting log builds its picker from .step[data-ex], so a movement buried in a paragraph is invisible to it. Promoted to real entries, marked .opt so they count as bonus rather than inflating the required ratio: they are VARIANTS within a block the athlete already owes, not four new obligations. The parent Ab Progression entry is left untouched so no existing history is orphaned." },
      { step: "lift-crunch-iso" },
      { step: "lift-decline-situp" },
      { step: "lift-side-crunch" },
      { step: "lift-side-plank-dip" },
      { step: "lift-rotcore" },
      { step: "lift-db-bench" },
      { step: "lift-db-incline" },
      { step: "lift-cable-fly" },
      { step: "lift-pushup" },
      { step: "lift-db-row" },
      { step: "lift-pulldown" },
      { step: "lift-facepull" },
      { step: "lift-db-press" },
      { step: "lift-lat-raise" },
      { step: "lift-rear-fly" },
      { step: "lift-hammer" },
      { step: "lift-incline-curl" },
      { step: "lift-pushdown" },
      { step: "lift-oh-ext" },
      { step: "lift-bench-dip" },
      { step: "lift-smith-squat" },
      { step: "lift-db-rdl" },
      { step: "lift-step-up" },
      { step: "lift-calf" },
      { step: "lift-machine-incline" },
      { step: "lift-pec-deck" },
      { step: "lift-pullup" },
      { step: "lift-cable-row" },
      { step: "lift-shrug" },
      { step: "lift-back-ext" },
      { step: "lift-farmer-walk" },
      { step: "lift-dead-hang" },
      { step: "lift-pull-apart" },
      { step: "lift-front-raise" },
      { step: "lift-cable-lat" },
      { step: "lift-rev-pec" },
      { step: "lift-cable-curl" },
      { step: "lift-preacher" },
      { step: "lift-rev-curl" },
      { step: "lift-rope-oh" },
      { step: "lift-kickback" },
      { step: "lift-cgbp" },
      { step: "lift-leg-ext" },
      { step: "lift-leg-curl" },
      { step: "lift-hip-thrust" },
      { step: "lift-seated-calf" },
      { step: "lift-deadbug" },
      { step: "lift-pallof" }
    ] }
  ] }
] });
