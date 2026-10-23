/* BATTERY · src/arm/bodies.js — ARM Stage-2 SOURCE DATA (Lane D, D.26.10.16.1). GENERATOR INPUT ONLY: never loaded by a browser, never listed in modules.json.
   Extracted 2026-10-18 from the AUTHORED arm.html @ c297d19 (pre-boot DOM, JS off, immutable committed snapshot). Do not hand-reformat: regenerate with stage2/build-src-arm.mjs, re-verify with verify-src-arm.mjs.
   kind 'arm.step-body' · one payload per section · row order = AUTHORED order (arm.steps.order is the BOOTED order).
   Row: id · title (.step-name text WITHOUT the badge; arm.steps.name === title + (badge ? ' ' + badge.text : '')) · badge {text, style} · target · reps · optional · xcls (extra <li> classes) · attrs {clip, track, mg, sub, eq} = the <li>'s data-* attributes BY THEIR HTML NAMES
   (arm.steps renames mg→muscle; here 'mg' is the attribute mirror) · youth = MIRROR of the arm.steps row · detail = ORDERED blocks of .step-detail: {t:'p'|'em', h} · {t:'btn', fn:'openClip'|'switchTab', arg, [cls], [style], h} · {t:'kid', cls, h}  (h = inline HTML, only <b>).
   Pure data calls: no logic, no cross-frame or DOM tokens. */
BATTERY.register('arm.step-body', { section: "warmup", bodies: [
    {
      id: "fd1", title: "01 · Leg Swings (Forward/Back + Side/Side)", target: "Hip Flexors · Hamstrings · Hip Mobility", reps: "15 each leg, each direction", youth: "safe",
      detail: [
        { t: "p", h: "Hold a wall/fence for support. Swing one leg forward and back like a pendulum, 15 swings. Then side-to-side across the body, 15 swings. Switch legs." },
        { t: "em", h: "The single best hip warmup. Do this every throw day." }
      ]
    },
    {
      id: "fd2", title: "02 · Arm Circles", target: "Shoulder Mobility", reps: "10 small + 10 large each direction", youth: "safe",
      detail: [
        { t: "p", h: "Both arms out to sides. Small forward circles (×10), gradually growing to large circles (×10). Reverse direction. Both arms together — gets blood to both shoulders." },
        { t: "em", h: "Foundation movement, takes 30 seconds" }
      ]
    },
    {
      id: "fd3", title: "03 · Walking Lunge with Twist", target: "Hips · T-Spine · Quads", reps: "10 yards each direction", youth: "safe",
      detail: [
        { t: "p", h: "Forward lunge. In the bottom position, twist torso toward the front leg's side. Hold 1 second. Stand and step into next lunge with opposite leg. Walk 10 yards out, 10 back." },
        { t: "em", h: "Single most efficient dynamic stretch — hits hip flexors, T-spine, and balance simultaneously" }
      ]
    },
    {
      id: "fd4", title: "04 · High Knees + Butt Kicks", target: "Hip Flexors · Hamstrings · Heart Rate", reps: "30 sec each", youth: "safe",
      detail: [
        { t: "p", h: "30 seconds of high knees (knees up to waist), then 30 seconds of butt kicks (heels to glutes). Get the heart rate up." },
        { t: "em", h: "The cardio component of warmup — often skipped, always missed" }
      ]
    },
    {
      id: "fd5", title: "05 · Hip Circles (All-Fours)", target: "Hip Mobility · Active ROM", reps: "10 each side, each direction", youth: "safe",
      detail: [
        { t: "p", h: "On hands and knees. Lift one knee out to the side, then circle it forward, up, and back — as large a circle as your hip allows. 10 forward, 10 reverse. Switch sides." },
        { t: "em", h: "Specifically opens hip ROM — research links hip mobility to 20% reduced injury risk in throwers" }
      ]
    },
    {
      id: "fd6", title: "06 · Side-Lying T-Spine Rotation", target: "Thoracic Spine · Posterior Chain", reps: "8 each side", youth: "safe",
      detail: [
        { t: "p", h: "Lie on side. Top leg crossed over with knee at 90°, planted. Both arms extended forward together. Open the top arm out and across to the other side, following with the eyes. Hold 5 seconds. Return. 8 reps each side." },
        { t: "em", h: "T-spine rotation is the missing link in adult throwers. Don't skip." }
      ]
    },
    {
      id: "fd7", title: "06b · Scapular CARS", target: "Scapular Mobility · Full ROM · Proprioception", reps: "5 circles each direction", youth: "safe",
      detail: [
        { t: "p", h: "Stand tall, arms at sides. Elevate (shrug) the shoulder blade → retract (squeeze back) → depress (push down) → protract (push forward) → return to start. Move slowly through each position, making the biggest circle you can. 5 clockwise, 5 counter-clockwise, each side." },
        { t: "p", style: "margin-top:6px", h: "This is the DELIBERATE version of the shoulder circumduction your body wants to do when things feel stuck. Controlled articular rotations map every position the scapula can reach and teach your nervous system to own each one." },
        { t: "em", h: "If rolling your shoulder around releases tension temporarily, CARS is the drill that makes that release permanent by building motor control at every position in the circle." }
      ]
    },
    {
      id: "fd8", title: "06c · Wall Slides", target: "Serratus Anterior · Lower Trap · Scapular Upward Rotation", reps: "2 × 10", youth: "safe",
      detail: [
        { t: "p", h: "Stand with your back, head, and butt flat against a wall. Arms in goalpost position (elbows at 90°, backs of hands touching the wall). Slide arms up overhead, maintaining wall contact with hands and elbows the entire way. Slide back down. If your hands or elbows lose wall contact, that is the range you are working to restore." },
        { t: "p", style: "margin-top:6px", h: "<b>The test IS the exercise.</b> If you cannot keep your forearms on the wall, your pec minor is short and your serratus anterior is weak — exactly the pattern that causes scapular anterior tilt." },
        { t: "em", h: "Serratus anterior is the muscle that holds your scapula flat against the rib cage. When it is weak, the scapula wings out and the shoulder loses its stable platform. Wall slides are the simplest way to train it." }
      ]
    },
    {
      id: "fs1", title: "07 · Sleeper Stretch", badge: {"text":"(★ PITCHER MVP)","style":"color:var(--blood);font-size:11px"}, target: "Shoulder Internal Rotation · GIRD Prevention", reps: "2 × 30s each shoulder", youth: "safe",
      detail: [
        { t: "p", h: "Lie on the throwing-arm side. Bend that elbow to 90°, upper arm in front of torso. Use the OPPOSITE hand to gently press the wrist toward the floor. Hold 30 seconds, 2 sets each side." },
        { t: "p", style: "margin-top:6px", h: "<b>Gentle.</b> Pushing too hard strains the posterior capsule." },
        { t: "em", h: "Addresses GIRD (Glenohumeral Internal Rotation Deficit) — the most common throwing-shoulder issue and the #1 stretch missing from typical arm care content" }
      ]
    },
    {
      id: "fs2", title: "08 · Couch Stretch", target: "Hip Flexors · Quads", reps: "2 min each leg", youth: "safe",
      detail: [
        { t: "p", h: "Kneel with the back foot up against a wall, couch back, or bench (top of foot on the surface). Front leg in 90° lunge. Drive hips forward, torso upright. 2-minute hold." },
        { t: "p", style: "margin-top:6px", h: "Active version: flex into the stretch for 10–15 reps. Watch film while doing it — it's that long." },
        { t: "em", h: "For pitchers: focus on the lead leg's hip flexor. Most-tight muscle in throwers and hitters." }
      ]
    },
    {
      id: "fs3", title: "09 · 90/90 Hip Stretch", target: "Hip Internal/External Rotation", reps: "30s each side", youth: "safe",
      detail: [
        { t: "p", h: "Sit on the floor. Front leg bent at 90° in front (external rotation). Back leg bent at 90° behind (internal rotation). Keep spine tall. Lean forward over the front leg to feel a stretch in the hip." },
        { t: "em", h: "Hip rotation translates directly to bat speed and throwing power" }
      ]
    },
    {
      id: "fs4", title: "10 · Shoulder Cross-Body Stretch", target: "Posterior Shoulder Capsule", reps: "30s each arm", youth: "safe",
      detail: [
        { t: "p", h: "Pull one arm across the chest, opposite hand holding above the elbow. Pull gently. Hold 30 seconds. Then move the same arm overhead, palm down, gently bend at the elbow." },
        { t: "em", h: "The posterior shoulder is the deceleration brake — tight here means injury risk" }
      ]
    },
    {
      id: "fs5", title: "11 · Wrist Flexor Stretch", target: "Forearm · UCL Region", reps: "30s each arm", youth: "safe",
      detail: [
        { t: "p", h: "Extend one arm forward, palm up. Use the opposite hand to gently pull back on the fingers. Then flip — palm down, pull fingers down. Hold 30 seconds each position." },
        { t: "em", h: "Reduces risk of elbow injury and bicep tendonitis — both common in adult throwers" }
      ]
    },
    {
      id: "fs6", title: "12 · Calf / Ankle Dorsiflexion", target: "Ankle Mobility · Achilles", reps: "30s each leg", youth: "safe",
      detail: [
        { t: "p", h: "Step forward into a small lunge with back leg straight, heel pressed to ground. Hold. Then bend back knee slightly to shift to soleus." },
        { t: "em", h: "Catchers especially — squat depth requires ankle dorsiflexion. Often missing in adult athletes." }
      ]
    },
    {
      id: "fs7", title: "13 · Doorway Pec Stretch", target: "Pec Minor · Pec Major · Anterior Shoulder · Clavicular Fascia", reps: "3 × 30s each side", youth: "safe",
      detail: [
        { t: "p", h: "Stand in a doorway. Place your forearm flat on the door frame with your elbow AT or ABOVE shoulder height. Step through with the near-side foot and lean forward until you feel a stretch across the front of the chest and shoulder. Hold 30 seconds. Three sets per side." },
        { t: "p", style: "margin-top:6px", h: "<b>Elbow height matters.</b> At shoulder height you stretch pec major. Above shoulder height (elbow at ear level) you bias pec minor — the deeper muscle that tilts the scapula forward. Do both positions." },
        { t: "em", h: "The single highest-ROI stretch for anyone whose shoulder rolls forward. Directly counteracts scapular anterior tilt, desk posture, and clavicle rotation. Do it multiple times per day, not just during warm-up." }
      ]
    },
    {
      id: "fb1a", title: "13a · Split Stretch at the Bag", target: "Adductors · Hamstring · The Range You Actually Use", reps: "3 × 30s each side", optional: true, youth: "safe",
      detail: [
        { t: "p", h: "Front foot on a base or a step, back leg straight behind, hips square. Sink into the split the same way you would stretch for a throw in the dirt. Breathe out and let the groin lengthen. Switch feet — you stretch to BOTH sides at first base, not just your strong one." },
        { t: "em", h: "This is the only stretch on this page that is literally the position. Train the shape you get paid to hold." }
      ]
    },
    {
      id: "fb1b", title: "13b · Copenhagen Adduction", target: "Adductor STRENGTH at long length · protects 13a", reps: "3 × 6 slow each side", optional: true, youth: "safe",
      detail: [
        { t: "p", h: "Side plank with the TOP leg resting on a bench or a partner. Lift the bottom leg up to meet it, lower for 3 slow counts. Start short-lever: top knee on the bench, not the ankle. Progress to the full straight-leg version only when 3 × 8 is easy." },
        { t: "em", h: "The strength half of the pair. Adductor strengthening on this protocol has the best evidence base of anything here — it was tested in football/soccer squads and reduced groin problems. Range you cannot control is range you cannot protect." }
      ]
    },
    {
      id: "fb2a", title: "14a · Knee-to-Wall Ankle Dorsiflexion", target: "Ankle · the joint the scoop is actually limited by", reps: "2 × 10 each ankle", optional: true, youth: "safe",
      detail: [
        { t: "p", h: "Foot a few inches from a wall, drive the knee forward OVER the toes without the heel lifting. Back off until the heel stays down, then work that edge. Measure the gap so you can see it improve." },
        { t: "em", h: "A short-hop scoop is an ankle problem before it is a glove problem. If the ankle will not bend, the hips rise and the glove comes with them." }
      ]
    },
    {
      id: "fb2b", title: "14b · Heel-Elevated Split Squat", target: "Loading the bottom of that new ankle range", reps: "2 × 8 each leg", optional: true, youth: "safe",
      detail: [
        { t: "p", h: "Back foot on a bench, front heel slightly raised, sink until the front thigh is past parallel and the knee travels well over the toe. Slow down. Bodyweight first, then hold a dumbbell." },
        { t: "em", h: "Pairs with 14a: you just bought depth, now put load in it so the joint keeps it." }
      ]
    },
    {
      id: "fb3a", title: "15a · 90/90 Hip Switch", target: "Hip Internal AND External Rotation", reps: "10 slow switches", optional: true, youth: "safe",
      detail: [
        { t: "p", h: "Sit with one leg bent 90° in front and one bent 90° behind. Rotate the knees across to the other side without using your hands. Keep the chest tall. Slow — this is not a rep to rush." },
        { t: "em", h: "Picks come from every angle. So does the hip that has to get you there." }
      ]
    },
    {
      id: "fb3b", title: "15b · 90/90 Lift-Offs", target: "Turning passive range into range you own", reps: "5 × 5s hold each side", optional: true, youth: "safe",
      detail: [
        { t: "p", h: "From the 90/90 position, lift the FRONT shin off the floor using only the hip and hold. Then lift the back shin. No hands. Five seconds of honest effort beats thirty seconds of leaning." },
        { t: "em", h: "This is the whole idea of the page in one drill: the range you can lift into is the range that shows up in a game. The rest is decoration." }
      ]
    },
    {
      id: "fb4a", title: "16a · Open-Book T-Spine Rotation", target: "Thoracic Rotation · Shoulder on the Stretch", reps: "8 each side", optional: true, youth: "safe",
      detail: [
        { t: "p", h: "Side-lying, knees stacked and bent, arms straight out in front. Open the top arm across to the other side and follow it with your eyes. Let the ribcage turn, keep the knees down." },
        { t: "em", h: "The stretch at the bag is a rotation as much as a split — and a stiff mid-back makes the shoulder pay for it." }
      ]
    },
    {
      id: "fb4b", title: "16b · Prone Y-T-W", target: "Mid-back and rear shoulder STRENGTH", reps: "2 × 8 each letter", optional: true, youth: "safe",
      detail: [
        { t: "p", h: "Face down on the floor or a bench. Thumbs up, lift the arms into a Y, then a T, then a W. Small range, no momentum, pause at the top. Two-pound plates are plenty. Ego has no role here." },
        { t: "em", h: "Holds the new thoracic range in place, and doubles as posterior-cuff work on a lift day." }
      ]
    },
    {
      id: "fb5a", title: "17a · Wrist Flexor + Extensor Stretch", target: "Forearm · Wrist", reps: "30s each direction", optional: true, youth: "safe",
      detail: [
        { t: "p", h: "Arm straight out, palm up, gently pull the fingers back and down. Then flip the palm down and pull the other way. Both directions, both arms." },
        { t: "em", h: "First base takes more picks and short hops than any other spot on the field. The wrist absorbs every one of them." }
      ]
    },
    {
      id: "fb5b", title: "17b · Reverse Curl + Wrist Roller", target: "Forearm and grip STRENGTH", reps: "2 × 12", optional: true, youth: "safe",
      detail: [
        { t: "p", h: "Reverse curl with a light bar or dumbbells, palms down. Follow with a wrist roller up and down once each way if you have one — a bar with string and a plate does the job." },
        { t: "em", h: "Closes the loop with J-Band #12. A forearm you have strengthened absorbs a bad hop instead of transmitting it." }
      ]
    }
] });
BATTERY.register('arm.step-body', { section: "jbands", bodies: [
    {
      id: "j1", title: "01 · Over-the-head Forearm Extensions", target: "Triceps · Lat · Posterior Shoulder", reps: "25 reps", youth: "safe",
      detail: [
        { t: "p", h: "Face away from anchor, bands behind you. Arms up overhead, elbows bent. Extend forearms forward over the head, then return slowly." },
        { t: "em", h: "Why: opens up the back of the shoulder and warms triceps before any throwing motion" },
        { t: "btn", fn: "openClip", arg: "jbj-overhead.mp4", style: "margin-top:7px", h: "▶ Watch Jaeger demo" }
      ]
    },
    {
      id: "j2", title: "02 · Side Extensions", badge: {"text":"(HELD)","style":"color:var(--blood);font-size:11px"}, target: "Lat Stretch · Posterior Capsule", reps: "2 × 30s", youth: "safe",
      detail: [
        { t: "p", h: "Stand sideways to anchor. Far arm overhead, lean opposite way. <b>HELD STRETCH — breathe into it. 2 × 30 seconds each side.</b>" },
        { t: "em", h: "Not reps. This is a stretch, not a contraction." },
        { t: "btn", fn: "openClip", arg: "jbj-side.mp4", style: "margin-top:7px", h: "▶ Watch Jaeger demo" }
      ]
    },
    {
      id: "j3", title: "03 · Diagonal Extensions", badge: {"text":"(HELD)","style":"color:var(--blood);font-size:11px"}, target: "Lat · T-Spine", reps: "2 × 30s", youth: "safe",
      detail: [
        { t: "p", h: "Similar to side extension but pull on a diagonal across the body. <b>HELD STRETCH — 2 × 30 seconds each side.</b> Breathe through it." },
        { t: "em", h: "Opens thoracic spine rotation — the missing link in most adult throwers." },
        { t: "btn", fn: "openClip", arg: "jbj-diagonal.mp4", style: "margin-top:7px", h: "▶ Watch Jaeger demo" }
      ]
    },
    {
      id: "j4", title: "04 · Forward Flies", target: "Anterior Deltoid · Pec", reps: "25 reps", youth: "safe",
      detail: [
        { t: "p", h: "Face away from anchor, arms out to the sides at shoulder height. Bring the palms together in front of you, then slow return." },
        { t: "em", h: "Why: chest + front of the shoulder — the pressing / finishing side of the throw" },
        { t: "btn", fn: "openClip", arg: "jbj-fwdfly.mp4", style: "margin-top:7px", h: "▶ Watch Jaeger demo" }
      ]
    },
    {
      id: "j5", title: "05 · Reverse Flies", target: "Posterior Deltoid · Rhomboids", reps: "25 reps", youth: "safe",
      detail: [
        { t: "p", h: "Face the anchor, arms forward at shoulder height. Pull straight back and apart, squeezing the shoulder blades. Slow return." },
        { t: "em", h: "Why: rear delts + upper back — balances all the front-side throwing and pressing" },
        { t: "btn", fn: "openClip", arg: "jbj-revfly.mp4", style: "margin-top:7px", h: "▶ Watch Jaeger demo" }
      ]
    },
    {
      id: "j6", title: "06 · Internal Rotation", target: "Subscapularis · Anterior Cuff", reps: "25 reps", youth: "safe",
      detail: [
        { t: "p", h: "Stand sideways, throwing arm closer to anchor. Elbow at 90° tucked to side. Rotate forearm IN across the belly." },
        { t: "em", h: "Critical for deceleration health — what stops the arm after release" },
        { t: "btn", fn: "openClip", arg: "jbj-ir-hip.mp4", style: "margin-top:7px", h: "▶ Watch Jaeger demo" }
      ]
    },
    {
      id: "j7", title: "07 · External Rotation", target: "Infraspinatus · Teres Minor", reps: "25 reps", youth: "safe",
      detail: [
        { t: "p", h: "Same setup but anchor on opposite side. Elbow tucked to side at 90°. Rotate forearm OUT away from belly." },
        { t: "em", h: "The MVP exercise for thrower health. If only one J-Band could be done, this is it." },
        { t: "btn", fn: "openClip", arg: "jbj-er-hip.mp4", style: "margin-top:7px", h: "▶ Watch Jaeger demo" }
      ]
    },
    {
      id: "j8", title: "08 · Elevated Internal Rotation", target: "Subscapularis @ 90° abduction", reps: "25 reps", youth: "safe",
      detail: [
        { t: "p", h: "Arm raised to shoulder height (90° abducted), elbow bent 90°. Forearm starts up, rotates DOWN/forward." },
        { t: "em", h: "Mimics late cocking position — the highest-strain phase of the throw" },
        { t: "btn", fn: "openClip", arg: "jbj-ir-shoulder.mp4", style: "margin-top:7px", h: "▶ Watch Jaeger demo" }
      ]
    },
    {
      id: "j9", title: "09 · Elevated Internal Rotation (Alt)", target: "Subscapularis · Different Angle", reps: "25 reps", youth: "safe",
      detail: [
        { t: "p", h: "Same position, alternate motion path — emphasizes a slightly different fiber angle of subscap. Bauer keeps both." },
        { t: "em", h: "Redundancy is the point — small muscles benefit from varied angles" }
      ]
    },
    {
      id: "j10", title: "10 · Elevated External Rotation", target: "Infraspinatus @ 90° abduction", reps: "25 reps", youth: "safe",
      detail: [
        { t: "p", h: "Arm at 90° abduction, elbow bent. Forearm starts down/forward, rotates UP and back." },
        { t: "em", h: "This is the \"lay-back\" position — protects against UCL stress" },
        { t: "btn", fn: "openClip", arg: "jbj-er-shoulder.mp4", style: "margin-top:7px", h: "▶ Watch Jaeger demo" }
      ]
    },
    {
      id: "j11", title: "11 · Reverse + Forward Throwing", target: "Decel Chain · Full Pattern", reps: "25 + 25", youth: "safe",
      detail: [
        { t: "p", h: "<b>Part A — Reverse throwing:</b> Face the anchor. Mimic throwing motion <b>in reverse</b>, slowly — start at finish position, work back through release, layback, cocking." },
        { t: "p", h: "<b>Part B — Forward throwing:</b> Face away from anchor. Mimic full throwing motion against band resistance. Slow and controlled — loading the pattern." },
        { t: "em", h: "The exit ramp — band-loaded full motion before live throws" },
        { t: "btn", fn: "openClip", arg: "jbj-throwing.mp4", style: "margin-top:7px", h: "▶ A · Reverse demo" },
        { t: "btn", fn: "openClip", arg: "jbj-fwdthrow.mp4", style: "margin-top:7px", h: "▶ B · Forward demo" }
      ]
    },
    {
      id: "j12", title: "12 · Wrist / Forearm Series", badge: {"text":"(BONUS)","style":"color:var(--gold);font-size:11px"}, target: "Forearm + Wrist Stabilizers", reps: "25 each", optional: true, youth: "safe",
      detail: [
        { t: "p", h: "Pronation, supination, wrist flexion, wrist extension. Light resistance, full range. 25 each direction." },
        { t: "em", h: "Not in original Jaeger 11, but critical for release point control. Especially important for 1B (pick scoops) and catchers (snap throws)." }
      ]
    },
    {
      id: "jx-rows", title: "Rows", badge: {"text":"(EXTRA)","style":"color:var(--gold);font-size:11px"}, target: "Rhomboids · Mid-Back", reps: "25 reps", optional: true, youth: "safe",
      detail: [
        { t: "p", h: "Band anchored in front at chest height. Pull the elbows straight back, squeeze the shoulder blades, slow return." },
        { t: "btn", fn: "openClip", arg: "jband-rows.mp4", style: "margin-top:7px", h: "▶ Watch demo" }
      ]
    },
    {
      id: "jx-facepull", title: "Face Pulls", badge: {"text":"(EXTRA)","style":"color:var(--gold);font-size:11px"}, target: "Rear Delt · Rotator Cuff", reps: "25 reps", optional: true, youth: "safe",
      detail: [
        { t: "p", h: "Anchor at face height. Pull the band toward your face, elbows high, rotating the hands back at the end. Slow return." },
        { t: "btn", fn: "openClip", arg: "jband-facepulls.mp4", style: "margin-top:7px", h: "▶ Watch demo" }
      ]
    },
    {
      id: "jx-circles", title: "Shoulder Circles", badge: {"text":"(EXTRA)","style":"color:var(--gold);font-size:11px"}, target: "Cuff Activation", reps: "10 ea way", optional: true, youth: "safe",
      detail: [
        { t: "p", h: "Light band, arms out to the sides. Small, controlled circles — forward, then back. Activation, not strength." },
        { t: "btn", fn: "openClip", arg: "jband-shouldercircles.mp4", style: "margin-top:7px", h: "▶ Watch demo" }
      ]
    },
    {
      id: "jx-fwdback", title: "Forward and Back", badge: {"text":"(EXTRA)","style":"color:var(--gold);font-size:11px"}, target: "Scapular Control", reps: "15 reps", optional: true, youth: "safe",
      detail: [
        { t: "p", h: "Arms extended at shoulder height. Glide the shoulder blades forward (protract), then pull them back (retract). Controlled." },
        { t: "btn", fn: "openClip", arg: "jband-fwdback.mp4", style: "margin-top:7px", h: "▶ Watch demo" }
      ]
    },
    {
      id: "jx-triceps", title: "Triceps Extension", badge: {"text":"(EXTRA)","style":"color:var(--gold);font-size:11px"}, target: "Triceps", reps: "25 reps", optional: true, youth: "safe",
      detail: [
        { t: "p", h: "Anchor high. Keep the elbow fixed at your side and extend the forearm down against the band. Slow return." },
        { t: "btn", fn: "openClip", arg: "jband-triceps.mp4", style: "margin-top:7px", h: "▶ Watch demo" }
      ]
    },
    {
      id: "jx-a", title: "A's", badge: {"text":"(EXTRA)","style":"color:var(--gold);font-size:11px"}, target: "Lower Trap", reps: "15 reps", optional: true, youth: "safe",
      detail: [
        { t: "p", h: "Hinge slightly forward, arms down. Raise the arms back and down into an A shape, thumbs out, squeezing low on the shoulder blades." },
        { t: "btn", fn: "openClip", arg: "jband-as.mp4", style: "margin-top:7px", h: "▶ Watch demo" }
      ]
    },
    {
      id: "jx-t", title: "T's", badge: {"text":"(EXTRA)","style":"color:var(--gold);font-size:11px"}, target: "Mid Trap", reps: "15 reps", optional: true, youth: "safe",
      detail: [
        { t: "p", h: "Arms straight out to the sides into a T, thumbs up. Squeeze the shoulder blades together, slow return." },
        { t: "btn", fn: "openClip", arg: "jband-ts.mp4", style: "margin-top:7px", h: "▶ Watch demo" }
      ]
    },
    {
      id: "jx-y", title: "Y's", badge: {"text":"(EXTRA)","style":"color:var(--gold);font-size:11px"}, target: "Lower Trap", reps: "15 reps", optional: true, youth: "safe",
      detail: [
        { t: "p", h: "Raise the arms overhead into a Y, thumbs up. Drive it from the lower traps, not the neck. Slow return." },
        { t: "btn", fn: "openClip", arg: "jband-ys.mp4", style: "margin-top:7px", h: "▶ Watch demo" }
      ]
    },
    {
      id: "jx-pullapart", title: "Band Pull-Apart", badge: {"text":"(EXTRA)","style":"color:var(--gold);font-size:11px"}, target: "Mid Traps · Scapular Retraction", reps: "2 × 15", optional: true, youth: "safe",
      detail: [
        { t: "p", h: "Same band you use for J-Bands. Arms straight out, pull apart to chest. Light and quick — this is activation, not strength work." },
        { t: "btn", fn: "openClip", arg: "pullapart-demo.mp4", style: "margin-top:7px", h: "▶ Watch demo" },
        { t: "em", h: "Pairs with the A-T-Y series to cover all three trap regions before throwing." }
      ]
    }
] });
BATTERY.register('arm.step-body', { section: "tube", bodies: [
    {
      id: "t1", title: "01 · Forward Plane", target: "Anterior Cuff", reps: "10 sec", attrs: {"clip":"clips/tube-forward.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Arm straight out in front, shoulder height. Tube parallel to ground. Shake forward-back fast." },
        { t: "kid", cls: "kid-cue", h: "💬 Kid cue: shake it like you're flicking water off your hand — fast little buzzes, not big waves." }
      ]
    },
    {
      id: "t2", title: "02 · Lateral Plane", target: "Lateral (Middle) Deltoid · Supraspinatus", reps: "10 sec", attrs: {"clip":"clips/tube-lateral.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Arm out to the side, shoulder height. Tube parallel. Shake side-to-side fast." },
        { t: "kid", cls: "kid-cue", h: "💬 Kid cue: arm out like an airplane wing — buzz the wing as fast as you can." }
      ]
    },
    {
      id: "t3", title: "03 · Overhead", target: "Full Cuff @ overhead position", reps: "10 sec", attrs: {"clip":"clips/tube-overhead.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Arm straight up overhead. Tube horizontal across the top. Shake forward-back." },
        { t: "kid", cls: "kid-cue", h: "💬 Kid cue: hold it up like a superhero antenna and make it hum." }
      ]
    },
    {
      id: "t4", title: "04 · Throwing Position", target: "Lay-back position cuff", reps: "10 sec", attrs: {"clip":"clips/tube-throwing.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Arm in \"L\" — elbow at shoulder height, forearm vertical (cocking position). Shake." },
        { t: "em", h: "This plane is sport-specific — it's the only one not in general rehab protocols" },
        { t: "kid", cls: "kid-cue", h: "💬 Kid cue: make your throwing \"L\" and shake till it tingles — that's your arm waking up." }
      ]
    }
] });
BATTERY.register('arm.step-body', { section: "plyo", bodies: [
    {
      id: "plyo-reverse", title: "01 · Kneeling Reverse Throw", target: "Core / Rotational Warm-up", reps: "10R+10L · 2000g/4lb · RPE 2", attrs: {"clip":"clips/plyo-reverse.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Front knee locked to the ground for a stable base. Open the T-spine and throw across your body. Bauer uses this as a <b>core / rotational</b> warm-up — it is NOT a shoulder drill." },
        { t: "btn", fn: "openClip", arg: "plyo-reverse.mp4", h: "▶ Demo clip · 0:43" },
        { t: "em", h: "Stable base · open the T-spine · rotate, don't reach" }
      ]
    },
    {
      id: "plyo-spiral", title: "02 · Spiral Drill", target: "Elbow Spiral · Rotation Point", reps: "10R+10L · 2000g/4lb · RPE 3", attrs: {"clip":"clips/plyo-spiral.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Yank the glove side first to end range — that's your rotation point. Lead with the <b>back of the elbow</b> (the elbow spiral) and throw STRAIGHT into the wall so it bounces straight back. Do NOT catch off the wall — catch behind your back." },
        { t: "btn", fn: "openClip", arg: "plyo-spiral.mp4", h: "▶ Demo clip · 1:48" },
        { t: "em", h: "Glove side to end range · lead with the elbow · catch behind the back" }
      ]
    },
    {
      id: "plyo-ramp-light", title: "03 · Reverse + Spiral, repeat lighter", target: "Ramp Down a Weight", reps: "10 rev + 10 spiral / side · 1000g/2lb · RPE 4", youth: "adult",
      detail: [
        { t: "p", h: "Same two drills, same cues — drop to the lighter ball and run both again, each side. This is the ramp: heavy to groove it, lighter to add speed." },
        { t: "em", h: "Same cues as 01 &amp; 02 · lighter ball · keep it crisp" },
        { t: "btn", fn: "openClip", arg: "plyo-reverse.mp4", style: "margin-top:7px", h: "▶ Reverse demo (same drill, lighter)" },
        { t: "btn", fn: "openClip", arg: "plyo-spiral.mp4", style: "margin-top:7px", h: "▶ Spiral demo (same drill, lighter)" }
      ]
    },
    {
      id: "plyo-seq-standing", title: "04 · Standing Sequence", target: "Shoulder-Hip Separation", reps: "5 · 1000g/2lb · RPE 4", attrs: {"clip":"clips/plyo-seq-standing.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "<b>MOVE THE HIPS FIRST.</b> Do not let the torso or arms move until the hips move. Turn the front foot in to start the swivel. This trains shoulder-hip separation and the sequence of the delivery." },
        { t: "btn", fn: "openClip", arg: "plyo-seq-standing.mp4", h: "▶ Demo clip · 3:28" },
        { t: "em", h: "Hips first · front foot turns in · torso and arm wait" }
      ]
    },
    {
      id: "plyo-seq-stomp", title: "05 · Stomp Sequence", target: "Stretch-Shortening Cycle", reps: "5 · 1000g/2lb · RPE 4-5", attrs: {"clip":"clips/plyo-seq-stomp.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Attack the ground with the front foot — <b>stomp</b> — to drive hip rotation. Back foot points at the target, hips at roughly 45°. The stomp loads the stretch-shortening cycle." },
        { t: "btn", fn: "openClip", arg: "plyo-seq-stomp.mp4", h: "▶ Demo clip · 4:30" },
        { t: "em", h: "Stomp the front foot · back foot at target · hips ~45°" }
      ]
    },
    {
      id: "plyo-seq-hop", title: "06 · Hop-Step (Javelin Step) Sequence", target: "Block → Hip Rotation", reps: "5 · 1000g/2lb · RPE 4-5", attrs: {"clip":"clips/plyo-seq-hop.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Keep the back foot pointed at the target on landing and land with hips at ~45° — do NOT square off. Blocking the front leg is what drives the hip rotation." },
        { t: "btn", fn: "openClip", arg: "plyo-seq-hop.mp4", h: "▶ Demo clip · 6:24" },
        { t: "em", h: "Back foot at target on landing · hips ~45° · block the front leg" }
      ]
    },
    {
      id: "plyo-dropstep", title: "07 · Drop-Step Pickoffs", target: "Hips Start the Delivery", reps: "5 · 450g/1lb · RPE 5-6", attrs: {"clip":"clips/plyo-dropstep.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Simulates the hips starting the delivery into the block. Drop the back foot behind and gain ground toward the target. This one starts <b>closed</b> (the sequence drills start open). Order stays the same: hips → torso → shoulder → arm." },
        { t: "btn", fn: "openClip", arg: "plyo-dropstep.mp4", h: "▶ Demo clip · 7:14" },
        { t: "em", h: "Start closed · drop back foot, gain ground · hips → torso → shoulder → arm" }
      ]
    },
    {
      id: "plyo-drop", title: "08 · Drop Drill", target: "The Drop Phase · Absorb", reps: "5 · 225g/8oz · RPE 5-6", attrs: {"clip":"clips/plyo-drop.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Single-leg depth drop off a box (no box: pick the back foot up, lift the front foot, land on the back foot). This is the <b>drop phase</b> — absorb the energy. Do NOT push or triple-extend; let the back leg rotate the back hip. It's rotational even though it looks linear." },
        { t: "btn", fn: "openClip", arg: "plyo-drop.mp4", h: "▶ Demo clip · 9:32" },
        { t: "em", h: "Absorb, don't push · no triple extension · back leg rotates the back hip" }
      ]
    },
    {
      id: "plyo-stepbehind", title: "09 · Step-Behind w/ Arm Swing", target: "Add Energy → Block It", reps: "5 · 150g/5oz · RPE 5-6", attrs: {"clip":"clips/plyo-stepbehind.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Now add energy and block it. Step behind, land and accept the energy in the back leg, sink as the back hip rotates, then the front foot contacts and drives the hips into the upper half." },
        { t: "btn", fn: "openClip", arg: "plyo-stepbehind.mp4", h: "▶ Demo clip · 11:58" },
        { t: "em", h: "Accept energy in the back leg · sink as the hip rotates · front foot drives the upper half" }
      ]
    },
    {
      id: "plyo-mound", title: "10 · Mound / Stretch Throws", target: "Full Delivery · Integrate", reps: "5 · 100g/3.5oz · RPE 6", attrs: {"clip":"clips/plyo-mound.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Take it to the mound (or flat ground) and throw out of the stretch: lift leg → drop phase → rotation → block the front leg. This integrates everything — the back-chain is complete and you've rebuilt the full delivery." },
        { t: "btn", fn: "openClip", arg: "plyo-mound.mp4", h: "▶ Demo clip · 12:48" },
        { t: "em", h: "Out of the stretch · lift → drop → rotate → block · everything together" }
      ]
    },
    {
      id: "plyo-humpty", title: "Bonus · Humpty Drill", target: "Lunge/Receive · Indoor Tunnel", reps: "8-12 reps", optional: true, attrs: {"clip":"clips/ru-plyo-humpty.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Indoor tunnel plyoball drill: lunge/receive position with a pink 0.5 LB ball. Includes ball selection explanation (all hand sizes) and outdoor wall throws. From Bauer's \"Rogue Umpire\" vlog, Day 2 pregame." },
        { t: "em", h: "A supplemental plyoball drill outside the standard 10-step routine. Not a replacement for any step above -- pure bonus." }
      ]
    }
] });
BATTERY.register('arm.step-body', { section: "gameday", bodies: [
    {
      id: "gd-measure", title: "01 · Daily Measurements", target: "Sleep · HRV · strength baseline", reps: "~2 min", attrs: {"clip":"clips/bauer-gd-measure.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Before anything, Bauer logs his numbers: <b>sleep</b> (Oura ring), <b>HRV</b> (morning HR strap), <b>shoulder strength</b> in internal &amp; external rotation (a MicroFET II dynamometer), <b>grip strength</b> (full-hand + two-finger, for forearm readiness) and a <b>counter-movement jump</b> on force plates. A bad number and he adjusts the day's warm-up." },
        { t: "btn", fn: "openClip", arg: "bauer-gd-measure.mp4", h: "▶ Demo clip · 0:48" },
        { t: "em", h: "Measure first · let the data set the day" }
      ]
    },
    {
      id: "gd-hottub", title: "02 · Hot Tub + Dress", target: "Raise core temp · optional", reps: "personal", youth: "adult",
      detail: [
        { t: "p", h: "Bauer sits in a hot tub, then gets into his uniform — undershirt, shorts — before heading to the weight room. He's the first to say <b>most people don't have a hot tub before a game</b>, so don't sweat this one. The point is simply to raise core temperature a little before mobility work." },
        { t: "em", h: "Warm the body before you ask it to move" }
      ]
    },
    {
      id: "gd-mobility", title: "03 · Foam Roll + T-Spine", target: "Mobility · thoracic rotation", reps: "few min", attrs: {"clip":"clips/bauer-gd-mobility.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Into the weight room (music on — he treats it as part of the build). Foam-roll routine first, then a T-spine drill: <b>rotate the thoracic spine only — don't let the hips move at all.</b> Pure upper-back rotation to free the throwing motion." },
        { t: "btn", fn: "openClip", arg: "bauer-gd-mobility.mp4", h: "▶ Demo clip · 0:56" },
        { t: "em", h: "Roll out · then rotate the T-spine, hips quiet" }
      ]
    },
    {
      id: "gd-hips", title: "04 · Hip Mobility", target: "Open the hips", reps: "few min", attrs: {"clip":"clips/bauer-gd-hips.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Open the hips through as much range as possible, with a little external rotation in the right (drive-leg) hip. On a game day he <b>modifies the range</b> — enough to feel loose without digging into deep end-range before he has to compete." },
        { t: "btn", fn: "openClip", arg: "bauer-gd-hips.mp4", h: "▶ Demo clip · 0:46" },
        { t: "em", h: "Mobilize, don't max out — it's game day" }
      ]
    },
    {
      id: "gd-activation", title: "05 · Core Activation · Scorpion", target: "Mobility + core activation", reps: "Bauer's favorite", attrs: {"clip":"clips/bauer-gd-activation.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "His favorite: swing the leg out to the side and behind into a <b>scorpion-like</b> position, rocking forward and back, then plant the toe behind. The whole time the <b>hips are pressed off the ground by the bottom leg</b> — so the core stays active while the hips and T-spine move through range. Mobility <em>and</em> activation at once." },
        { t: "btn", fn: "openClip", arg: "bauer-gd-activation.mp4", h: "▶ Demo clip · 0:36" },
        { t: "em", h: "Hips off the floor · core works through the range" }
      ]
    },
    {
      id: "gd-cuff", title: "06 · Cuff Weights", target: "Rotator-cuff prep · 10 lb", reps: "10 lb · 4 drills", attrs: {"clip":"clips/bauer-gd-cuff.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Last thing before leaving the weight room — a 10 lb cuff-weight series, four drills: <b>(1)</b> swings, up and down, to loosen everything; <b>(2)</b> two-hand overhead throws; <b>(3)</b> single-arm rotational throw for the right shoulder; <b>(4)</b> internal-rotation work. It's enough to <b>break a sweat and get him breathing hard.</b>" },
        { t: "btn", fn: "openClip", arg: "bauer-gd-cuff.mp4", h: "▶ Demo clip · 0:25" },
        { t: "em", h: "Swings → overhead → single-arm rotation → internal rotation" }
      ]
    },
    {
      id: "gd-balls", title: "07 · Weighted Balls", target: "CORE warm-up · sequencing", reps: "~10 each · black + green", attrs: {"clip":"clips/bauer-gd-weightedballs.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Full uniform on, back to the weight room. Key point: by now <b>the shoulders are already warm — he uses the weighted balls as a CORE warm-up,</b> for rotation both directions. Reverse throws right hand then left; then ~<b>10 reverse + 10 pivot-picks with the black ball</b> (both hands), ~<b>10 reverse + 10 pivot-picks with the green</b>. Then a <b>walking sequence drill</b> — block the front leg, turn the hips, that turns the shoulders, that delivers the arm — ramping intensity, finishing with 3–5 deliveries off the green ball." },
        { t: "btn", fn: "openClip", arg: "bauer-gd-weightedballs.mp4", h: "▶ Demo clip · 1:05" },
        { t: "btn", fn: "switchTab", arg: "plyo", style: "background:transparent;border:1px solid var(--line)", h: "→ Full PlyoCare routine" },
        { t: "em", h: "Shoulders already warm · this is rotation + sequencing" }
      ]
    },
    {
      id: "gd-tube", title: "08 · Shoulder Tube", target: "On-field · before every game", reps: "full routine", attrs: {"clip":"clips/bauer-gd-shouldertube.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Back to the locker for cleats, the rest of the uniform, the shoulder tube and headphones (pregame playlist). Out to the field, and <b>in front of the dugout he runs his full shoulder-tube routine — every game.</b> The oscillating tube wakes up the stabilizers right before he throws for real." },
        { t: "btn", fn: "openClip", arg: "bauer-gd-shouldertube.mp4", h: "▶ Demo clip · 1:04" },
        { t: "btn", fn: "switchTab", arg: "tube", style: "background:transparent;border:1px solid var(--line)", h: "→ Full Shoulder Tube routine" },
        { t: "em", h: "Stabilizers on · in front of the dugout" }
      ]
    },
    {
      id: "gd-longtoss", title: "09 · Long Toss", target: "Stretch out · pull down", reps: "~50 throws", attrs: {"clip":"clips/bauer-gd-longtoss.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Out to max distance — some days he'll <b>set a long-toss record</b> — then he <b>pulls down,</b> progressing back in with hard, on-a-line effort throws. It works out to about <b>50 throws total</b> in the long-toss session, in the natural cadence of getting fully warm." },
        { t: "btn", fn: "openClip", arg: "bauer-gd-longtoss.mp4", h: "▶ Demo clip · 0:56" },
        { t: "btn", fn: "switchTab", arg: "long", style: "background:transparent;border:1px solid var(--line)", h: "→ Full Long Toss ladder" },
        { t: "em", h: "Stretch out to max · then pull down on a line" }
      ]
    },
    {
      id: "gd-bullpen", title: "10 · Pregame Bullpen", target: "Sequencing & command", reps: "~42 throws", attrs: {"clip":"clips/bauer-gd-bullpen.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Catch his breath, then the mound. He starts to a corner of the zone and works in. Unlike long toss, this is about <b>sequencing and command</b> — he throws realistic sequences (e.g. fastball up-and-in to a righty, then cutter, then slider), working in every pitch, fewer changeups. ~42 throws. The mantra: <b>the bullpen is for warming up, not for hitting every spot</b> — you don't get anyone out in the pen. Be physically ready to compete in the game." },
        { t: "btn", fn: "openClip", arg: "bauer-gd-bullpen.mp4", h: "▶ Demo clip · 1:00" },
        { t: "em", h: "Warm up the sequencing · spots come in the game" }
      ]
    }
] });
BATTERY.register('arm.step-body', { section: "fieldwork", bodies: [
    {
      id: "fw-sprint-90", title: "90-Foot Sprints", target: "Acceleration · Home-to-First", reps: "4-6 × 90ft", youth: "safe",
      detail: [
        { t: "p", h: "Full-effort out of the box. Walk back between reps — this is speed work, not conditioning, and short rest turns it into the wrong thing." },
        { t: "em", h: "The most common in-season sprint miss: running these tired, which trains a slower stride." }
      ]
    },
    {
      id: "fw-first-step", title: "First-Step / Lead Explosiveness", target: "Reaction · Crossover", reps: "8-10 reps", youth: "safe",
      detail: [
        { t: "p", h: "From a lead, explode both directions on a signal. Crossover first, no false step backward." }
      ]
    },
    {
      id: "fw-tempo-jog", title: "Tempo Jog", target: "Aerobic Base · Flush", reps: "8-12 min", youth: "safe",
      detail: [
        { t: "p", h: "Easy, conversational. Good on a day after heavy legs to move blood without adding load." }
      ]
    },
    {
      id: "fw-popfly-if", title: "Infield Pop Fly", target: "Drift · Turn · Communication", reps: "10-15 balls", youth: "safe",
      detail: [
        { t: "p", h: "Turn and drift rather than backpedal. Call it early and loud — infield pops are lost to silence more than to hands." }
      ]
    },
    {
      id: "fw-popfly-of", title: "Outfield Reads", target: "Drop Step · Route", reps: "10-15 balls", youth: "safe",
      detail: [
        { t: "p", h: "First move is the drop step, not a step in. Take the route on an angle, not a curve." }
      ]
    },
    {
      id: "fw-lateral-shuffle", title: "Lateral Shuffle Series", target: "Lateral Range · Hips", reps: "3 × 20 yds", youth: "safe",
      detail: [
        { t: "p", h: "Stay low, do not click the heels together. This is the movement quality every ground ball to the hole depends on." }
      ]
    },
    {
      id: "fw-dig-lr", title: "Left/Right Leaping Digs", target: "Extension · Recovery", reps: "10 / side", youth: "safe",
      detail: [
        { t: "p", h: "Full extension to the glove side and the backhand side, then get up and simulate the throw. The recovery is the drill." }
      ]
    },
    {
      id: "fw-backhand-dirt", title: "Backhand Picks in the Dirt", target: "Backhand · Short Hop", reps: "15 balls", youth: "safe",
      detail: [
        { t: "p", h: "Work the short hop on the backhand specifically — it is the pick most fielders never practise until a game demands it." }
      ]
    },
    {
      id: "fw-1b-stretch", title: "The Stretch at the Bag", target: "Split · Reach · Footwork", reps: "15-20 reps", attrs: {"clip":"clips/fw-1b-stretch.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Find the bag without looking, then stretch to the throw. Practise both feet — a right-side throw you meet with the wrong foot costs the out." },
        { t: "em", h: "Fielding stretch, not a mobility stretch. If you want the hip mobility work for this position, that lives on the Warm Up tab." }
      ]
    },
    {
      id: "fw-1b-scoop", title: "Short-Hop Scoops", target: "Pick · Glove Angle", reps: "20-25 balls", attrs: {"clip":"clips/fw-1b-scoops.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Glove out front and relaxed. Let the hop come to you; reaching at it is what turns a pick into an error." }
      ]
    },
    {
      id: "fw-1b-angles", title: "Picks From Every Angle", target: "Adaptability", reps: "15 balls", attrs: {"clip":"clips/fw-1b-stretch.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "From 3B, SS, 2B and the pitcher. Each arm slot gives a different spin — you want none of them to be new in a game." }
      ]
    },
    {
      id: "fw-box-jump", title: "Box / Step Jumps", target: "Explosive Power", reps: "3 × 5", youth: "safe",
      detail: [
        { t: "p", h: "Land soft and quiet. Step down rather than jumping down — the landing is where the cost is, not the takeoff." },
        { t: "em", h: "Pairs with the Quarter Squat POWER card on the Lifting tab; same quality, different expression." }
      ]
    },
    {
      id: "fw-broad-jump", title: "Broad Jump", target: "Horizontal Power", reps: "3 × 5", youth: "safe",
      detail: [
        { t: "p", h: "Stick the landing for a full second before resetting. Distance without a stuck landing is not a rep." }
      ]
    },
    {
      id: "fw-posture-squat", title: "Posture Squat Drill", target: "Command · Velocity · Posture", reps: "8-10 reps", optional: true, attrs: {"clip":"clips/jp2-drill-posturesquat.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Preset posture squat drill from Bauer's Japan vlog: \"If your posture is being sold at the plate, it's probably affecting your command and velocity.\" Start with feet wider than shoulder width, set the posture you want to keep, squat while maintaining it through the delivery." },
        { t: "em", h: "Posture is the silent variable. When command wanders and nothing else changed, check the posture first." }
      ]
    },
    {
      id: "fw-highknees", title: "Team High Knees", target: "Dynamic Warmup", reps: "2 × length", optional: true, attrs: {"clip":"clips/ru-warmup-highknees.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Team dynamic warmup on the warning track -- high knees as a group. From Bauer's Day 2 pregame routine, three days before his next start." },
        { t: "em", h: "The team warmup is a habit, not an exercise. The habit is what carries the work when motivation does not." }
      ]
    }
] });
BATTERY.register('arm.step-body', { section: "washington", bodies: [
    {
      id: "w0", title: "00 · The Arrow", target: "The Idea Every Other Drill Serves", reps: "before you start", attrs: {"clip":"clips/wash-arrow.mp4","track":"full"}, youth: "safe",
      detail: [
        { t: "p", h: "Before the ball is hit, know the line you have to travel to get to it — and then travel it. Straight there. Not out and back in, not around it. Washington opens and closes the whole session on this: draw your arrow where you are supposed to go, then go." },
        { t: "em", h: "This is not a drill, it is the reason the drills exist. He returns to it twice in eleven minutes, which is how you know it is the spine and not a tip." }
      ]
    },
    {
      id: "w1", title: "Center", target: "At your center mass · 10–15 reps", reps: "10-15", xcls: ["wash-angle"], youth: "safe",
      detail: [
        { t: "p", h: "Straight at the chest. Push through the line of the hop." },
        { t: "em", h: "The foundation. Every other Washington Drill builds on this." }
      ]
    },
    {
      id: "w2", title: "Forehand", target: "Glove side · 10 reps", reps: "10", xcls: ["wash-angle"], youth: "safe",
      detail: [
        { t: "p", h: "Reach out with the glove only; don't shift your body. Catch in the 15-inch zone, push through the hop." },
        { t: "em", h: "Trains reach without losing the catch position." }
      ]
    },
    {
      id: "w3", title: "Backhand", target: "Backhand side · 10 reps", reps: "10", xcls: ["wash-angle"], youth: "safe",
      detail: [
        { t: "p", h: "The hardest of the three; the wrist angle has to be right or the ball squirts past." },
        { t: "em", h: "Catch it in the same part of the glove every time — the middle, with the hands — not out in the webbing. The wall principle still applies." }
      ]
    },
    {
      id: "w4", title: "04 ; Stand, No Glove ; Bare Hand", target: "Hand Path ; 10 reps", reps: "10", attrs: {"clip":"clips/wash-stand-barehand-demo.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Stand up. Drop the glove. Partner rolls slower short hops. Catch barehand. Force the hand path to be correct, since you can't fake it with a glove." },
        { t: "em", h: "The deceptively important step. Glove forgives bad habits; bare hand exposes them." }
      ]
    },
    {
      id: "w5", title: "05 ; Stand, Glove ; Short Hop Mix", target: "Full Pattern ; 15-20 reps", reps: "15-20", attrs: {"clip":"clips/wash-stand-glove.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Glove back on. Standing. Partner throws short hops mixed across center, forehand, backhand. No predictability. React." },
        { t: "em", h: "Now you're game-state. All five principles working at once." }
      ]
    },
    {
      id: "w6", title: "06 ; Number-The-Hops Drill", target: "Eyes + Tracking ; 10 reps", reps: "10", attrs: {"clip":"clips/wash-number-hops.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Wash + Semien drill. Take ground balls (or short hops). Read the bounces and call out the LAST hop — the one you'll actually field — before it reaches you. Wash: the only thing the infielder should worry about is the last hop." },
        { t: "em", h: "Trains your eyes to read the bounce and commit to the hop you field." }
      ]
    },
    {
      id: "w7", title: "07 · Force In, Force Out", target: "Working Both Directions Deliberately", reps: "8-10 each way", attrs: {"clip":"clips/wash-force.mp4","track":"full"}, youth: "safe",
      detail: [
        { t: "p", h: "From the kneeling or short standing position, drive in toward the hop, then work back out away from it. Both directions on purpose, not just whichever way the ball happens to go." },
        { t: "em", h: "Stops you only ever practising the hop that comes to you." }
      ]
    },
    {
      id: "w8", title: "08 · Pad Work · Downhill and the Skip", target: "Reading the Hop Before It Arrives", reps: "2-3 min", attrs: {"clip":"clips/wash-pad.mp4","track":"full"}, youth: "safe",
      detail: [
        { t: "p", h: "Partner throws off a pad so the ball skips. Watch the skip and read where it is going while it is still travelling. Work downhill through it — get on top rather than reaching under." },
        { t: "em", h: "The pad is what turns a clean short-hop drill into a real one. Real infields produce bad hops; a flat gym floor does not." }
      ]
    },
    {
      id: "w9", title: "09 · Never From A Standstill", target: "Move First, Then Field", reps: "every rep from here on", attrs: {"clip":"clips/wash-standstill.mp4","track":"full"}, youth: "safe",
      detail: [
        { t: "p", h: "From this point nothing starts flat-footed. When the ball goes up, you go. Wait for it standing still and you have already given away the step that would have got you there." },
        { t: "em", h: "Washington is explicit: he does not want it from a standstill. Every drill above gets harder and more honest once this rule is on." }
      ]
    },
    {
      id: "w10", title: "10 · Glove Side · Go Get It And Keep Going", target: "Lateral, Through The Ball", reps: "8-10 each side", attrs: {"clip":"clips/wash-gloveside.mp4","track":"full"}, youth: "safe",
      detail: [
        { t: "p", h: "Break to the glove side, pick it up, and keep going through it — do not field it and stop. The catch is a point you pass through, not a place you arrive at." },
        { t: "em", h: "He calls the finished version painting a picture: one continuous line rather than a set of separate movements stapled together." }
      ]
    },
    {
      id: "w12", title: "12 · Crossover Backhand · Cross And Go", target: "Backhand Under Real Range", reps: "6-8 reps", attrs: {"clip":"clips/wash-crossover.mp4","track":"full"}, youth: "safe",
      detail: [
        { t: "p", h: "Ball goes up, you take off — crossover step, then the backhand. Not a reach from where you stand; a crossover that covers ground and arrives with the glove already working down the line." },
        { t: "em", h: "This is the backhand from step 03 after the arrow, the movement and the range have all been added to it." }
      ]
    },
    {
      id: "w11", title: "11 · Fungo Feeds · Feet Moving", target: "Live Off The Bat", reps: "3-4 min", attrs: {"clip":"clips/wash-fungo.mp4","track":"full"}, youth: "safe",
      detail: [
        { t: "p", h: "Off the fungo now, not hand-fed. Keep your feet moving right up until you are ready to catch it. Live contact changes the timing enough that hand-fed reps alone will not prepare you." },
        { t: "em", h: "The first drill on this page where the ball behaves the way it will in a game." }
      ]
    },
    {
      id: "w2b-outfront", title: "2B-1 · Get The Ball Out Front", target: "Where You Meet It · Not Between Your Feet", reps: "10-12 reps", optional: true, attrs: {"clip":"clips/w2b-outfront.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Meet the ball in front of you. The moment you let it get in between your feet you have no adjustment left and no throw. Washington corrects this more than anything else in the session -- three separate times inside the first thirty seconds." },
        { t: "em", h: "The single most-repeated correction on the tape. If you take one thing from this block, take this one." }
      ]
    },
    {
      id: "w2b-fungo", title: "2B-2 · Fungo · Right At You", target: "Live Off The Bat, Straight On", reps: "2-3 min", optional: true, attrs: {"clip":"clips/w2b-fungo.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Off the bat now rather than hand-fed, starting with the ball hit right at you before anything lateral. Then back up a step and repeat from depth." },
        { t: "em", h: "Straight-on first is deliberate: it removes the footwork variable so the hands and the angle are the only thing being tested." }
      ]
    },
    {
      id: "w2b-downhill", title: "2B-3 · Go Downhill And Play With It", target: "Attack The Hop, Do Not Wait For It", reps: "8-10 reps", optional: true, attrs: {"clip":"clips/w2b-downhill.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Work down through the ball rather than staying level and letting it come to you. He is explicit that he does not want you simply arriving and waiting -- get downhill on it and play with it." },
        { t: "em", h: "The same idea as the pad work in the main progression. It is the method in two words: downhill, always." }
      ]
    },
    {
      id: "w2b-straight", title: "2B-4 · Go Straight, Not Around", target: "The Arrow, At Second Base", reps: "8-10 reps", optional: true, attrs: {"clip":"clips/w2b-straight.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "His correction verbatim: you went this way and then came down -- go straight. Travelling out and then back in costs exactly the time you needed, and the ball does not wait while you take the long route." },
        { t: "em", h: "This is step 00 The Arrow applied to the middle infield. Same line, different starting point." }
      ]
    },
    {
      id: "w2b-tall", title: "2B-5 · Tall And Narrow Is Trouble", target: "The Base You Field From", reps: "check every rep", optional: true, attrs: {"clip":"clips/w2b-tall.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Two faults he names in the same breath: standing a little too tall, and letting the feet get narrow. Either alone is survivable. Together there is no base to field from and nothing to throw from." },
        { t: "em", h: "Worth checking on video. It is the fault you cannot feel while you are making it." }
      ]
    },
    {
      id: "w2b-alignment", title: "2B-6 · Alignment", target: "Body, Glove And Target On One Line", reps: "2 min", optional: true, attrs: {"clip":"clips/w2b-alignment.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "He demonstrates it both ways on purpose -- this is alignment, this is not alignment -- because the difference is small enough to stay invisible until you see the wrong version next to the right one." },
        { t: "em", h: "He closes the session on this. The last thing a coach says is usually the thing he most wants remembered." }
      ]
    },
    {
      id: "gi-onehand", title: "GI-1 · One-Handed, In The Middle", target: "Hands Before Anything Else", reps: "10-12 reps", optional: true, attrs: {"clip":"clips/gi3-onehand.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Glove hand only, ball straight at the middle. No throwing, no footwork, nothing to hide behind. Then offset yourself to the glove side and do the forehand version of the same thing." },
        { t: "em", h: "Every session in this program opens here. Take the feet and the throw away and the hands have nowhere to hide." }
      ]
    },
    {
      id: "gi-center", title: "GI-2 · Bring It To The Center", target: "The Glove Path · Not Sent Out Late", reps: "10-12 reps", optional: true, attrs: {"clip":"clips/gi1-center.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Work the glove to the centre of your body rather than out and away. The fault being corrected is sending the glove out late — reaching at the ball instead of receiving it in front of your own mass." },
        { t: "em", h: "Late glove is the most common receiving fault in the whole program, and the hardest to feel yourself doing." }
      ]
    },
    {
      id: "gi-pocket", title: "GI-3 · Show The Pocket · Fingers To The Sky", target: "Glove Angle At The Final Hop", reps: "12-15 reps", optional: true, attrs: {"clip":"clips/gi3-pocket.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Out in front of the bat, showing the pocket to the ball. At the final hop your fingers should still be to the sky — the moment they turn down early you have closed the glove on a ball that has not arrived." },
        { t: "em", h: "The most technical cue in the program, and the one the coach keeps returning to. Fingers down early is a miss you can predict." }
      ]
    },
    {
      id: "gi-relax", title: "GI-4 · Stiff Hands Miss", target: "Relax, Then Find The Range", reps: "8-10 reps", optional: true, attrs: {"clip":"clips/gi3-relax.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Relax first, then find the range out in front. Stiff hands cannot adjust to a hop that changes late, and almost every hop changes late." },
        { t: "em", h: "Pairs with the step above: the right glove angle held with tension is still the wrong answer." }
      ]
    },
    {
      id: "gi-killspot", title: "GI-5 · The Kill Spot", target: "The Same Receiving Position, Every Time", reps: "15-20 reps", optional: true, attrs: {"clip":"clips/gi1-killspot.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Get to the same small spot every single time — one repeatable place where you receive the ball. The whole point of the hand work above is to make that spot automatic, so the hop is the only variable left." },
        { t: "em", h: "The organizing idea of this program, the way the arrow is for Washington. Everything before it is preparation for it." }
      ]
    },
    {
      id: "gi-shortlong", title: "GI-6 · Short Or Long, Called Mid-Flight", target: "Reacting To A Call You Cannot Predict", reps: "10 reps", optional: true, attrs: {"clip":"clips/gi4-shortlong.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Partner calls short or long after the ball is already in the air. You do not get to pre-plan the hop; you get to read it and go." },
        { t: "em", h: "Removes the thing that makes practice easier than a game: knowing what is coming." }
      ]
    },
    {
      id: "gi-read", title: "GI-7 · Flat Early, Give Ground · Steep Early, Come", target: "The Read Rule", reps: "12-15 reps", optional: true, attrs: {"clip":"clips/gi4-read.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "The decision rule, stated plainly: see it flat early and you give ground; see it steep early and you come to it. Made early enough, either read leaves you fine." },
        { t: "em", h: "The clearest single sentence in any of these sessions. Most bad hops are late reads wearing a disguise." }
      ]
    },
    {
      id: "gi-rightfoot", title: "GI-8 · Right Foot Only", target: "Footwork Under Constraint · Scored", reps: "games to 10", optional: true, attrs: {"clip":"clips/gi2-rightfoot.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Field everything off the right foot only, played as a scored game against a partner. The constraint forces the footwork you would otherwise skip when nobody is counting." },
        { t: "em", h: "Made competitive on purpose. Constraint plus a score gets more honest reps than instruction does." }
      ]
    },
    {
      id: "gi-rapidfire", title: "GI-9 · Rapid Fire · The Next One Before I Land", target: "No Reset Between Reps", reps: "30-45 sec", optional: true, attrs: {"clip":"clips/gi2-rapidfire.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Partner releases the next ball as you are still finishing the last. There is no reset, no walk back, no time to rearrange yourself into a good position." },
        { t: "em", h: "Exposes anything you were only doing because you had time to set up for it." }
      ]
    },
    {
      id: "gi-twoshuffles", title: "GI-10 · Two Shuffles After The Catch", target: "The Feet Do Not Stop On Contact", reps: "12-15 reps", optional: true, attrs: {"clip":"clips/gi1-twoshuffles.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Keep the feet going through the catch — two shuffles after the ball is in the glove, every rep. Catching is a moment inside the movement, not the end of it." },
        { t: "em", h: "Same idea as Washington keep going through the ball, arrived at from the footwork side instead of the glove side." }
      ]
    },
    {
      id: "gi-onelane", title: "GI-11 · One Ball, One Lane", target: "Direction Before The Catch", reps: "10-12 reps", optional: true, attrs: {"clip":"clips/gi1-onelane.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "One ball, one lane, and your direction established before the catch rather than after it. If the feet are not aggressive going in, the throw is already late no matter how clean the pick was." },
        { t: "em", h: "Direction before the catch is the phrase to keep. It is where fielding stops being about the glove." }
      ]
    },
    {
      id: "gi-twospeeds", title: "GI-12 · Two Speeds, One Standard", target: "Fast And Slow, Both Low", reps: "2-3 min", optional: true, attrs: {"clip":"clips/gi1-twospeeds.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Work the same drill fast and slow and hold the same quality in both. Being good only at your comfortable speed is being good at nothing a game will actually ask for." },
        { t: "em", h: "The stated goal is consistency across speeds, not maximum speed. Low stays non-negotiable at either." }
      ]
    },
    {
      id: "gi-feed", title: "GI-13 · The Right Feed At The Right Speed", target: "Partner Craft · The Other Half Of Every Drill", reps: "ongoing", optional: true, attrs: {"clip":"clips/gi2-feed.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "How to FEED, not how to field. The right feed at the right speed, chosen from what the drill is trying to teach. A sloppy feeder quietly ruins every rep his partner takes." },
        { t: "em", h: "The only step here aimed at the person NOT fielding — and the reason a partner session either works or does not." }
      ]
    },
    {
      id: "cat-lkdblock", title: "C-1 · Left Knee Down · Block To All Sides", target: "Blocking Base Position", reps: "10-12 each side", optional: true, attrs: {"clip":"clips/cat3-lkdblock.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Left knee down, and block to every side from there rather than only straight ahead. The demo runs all directions back to back so you can see the same base position produce each one." },
        { t: "em", h: "The shortest clip in the app and one of the clearest -- 21 seconds, no talking, just the movement repeated to each side." }
      ]
    },
    {
      id: "cat-toeup", title: "C-2 · Toe Up · The One-Knee Kickstand", target: "Stance And Foot Angle", reps: "8-10 reps", optional: true, attrs: {"clip":"clips/cat2-toeup.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Go toe up as you set. The one-knee stance works like a kickstand -- the back foot angle is what decides whether you can move out of it or are simply parked in it." },
        { t: "em", h: "A stance that looks identical from the front can be a base or a trap depending on that one foot." }
      ]
    },
    {
      id: "cat-stance", title: "C-3 · Do Not Sit Too Far Down", target: "Receiving Height", reps: "check each bullpen", optional: true, attrs: {"clip":"clips/cat1-stance.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Sitting too low buries the glove under the zone and puts your own head across the umpire eyeline -- his phrase is that you end up cutting right across my mouth. Sit where the low strike is still yours to present." },
        { t: "em", h: "The rare cue that is about the UMPIRE seeing the pitch, not about you catching it. Both matter and only one is obvious." }
      ]
    },
    {
      id: "cat-framing", title: "C-4 · Drive It Back Into The Zone", target: "Receiving · Extra Force On The Borderline", reps: "15-20 pitches", optional: true, attrs: {"clip":"clips/cat1-framing.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "On the pitch that is leaving the zone, exaggerate the move and put extra force into driving it back in. Practising it over-exaggerated is what makes the game-speed version subtle enough to work." },
        { t: "em", h: "Train it bigger than you would use it. The version that survives a real bullpen is the quiet one." }
      ]
    },
    {
      id: "cat-throw", title: "C-5 · Stay Behind The Ball · Any Slot", target: "Throwing From Anywhere", reps: "ongoing", optional: true, attrs: {"clip":"clips/cat2-throw.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "From the knees, standing, any arm slot -- as long as you stay behind the ball it does not matter where you throw from. The slot is not the thing being coached; being behind the ball is." },
        { t: "em", h: "Deliberately permissive, and unusual for it. He is protecting a throw that already works rather than replacing it with a textbook one." }
      ]
    },
    {
      id: "cat-workload", title: "C-6 · Short Days Short, Light Days Light", target: "Workload Discipline", reps: "every session", optional: true, attrs: {"clip":"clips/cat1-workload.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Keep the short days short and the light days light, so the long days can actually be long. A catcher who makes every session a medium session has no hard days left in him and no easy ones either." },
        { t: "em", h: "The only workload coaching in ANY of these sources, and it belongs next to arm care rather than buried in a catching video." }
      ]
    },
    {
      id: "bougie-stance", title: "B-1 · Sign Stance vs Resting Stance", target: "Two-Stance Framework", reps: "Watch", optional: true, attrs: {"clip":"clips/bougie-stance-types.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "When to use each catching stance -- sign stance for calling the pitch, resting stance between pitches. Outdoor field demo with the full selection framework." },
        { t: "em", h: "Know which stance you are in and why. Most stance problems come from using one stance for both jobs." }
      ]
    },
    {
      id: "bougie-recv-pos135", title: "B-2 · Position 1-3-5 Receiving", target: "Elbow Drive · Short Hops", reps: "12-15 each", optional: true, attrs: {"clip":"clips/bougie-recv-pos135.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Position 1 (arm extended) to position 3 (half-way) to position 5 (tight). Elbow drives to each position; short hops with regular ball and heavy ball. The elbow leads, the hand follows." },
        { t: "em", h: "The progression teaches the glove path before it teaches the catch. Get the path right and the catch takes care of itself." }
      ]
    },
    {
      id: "bougie-recv-zones", title: "B-3 · Zone Receiving", target: "Low · Mid · High · Scraping Drill", reps: "15-20 pitches", optional: true, attrs: {"clip":"clips/bougie-recv-zones.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Vertical glove vs flat glove philosophy, scraping drill, in-air receiving across low/mid/high pitch zones. \"Elbow leads\" principle applied to every zone." },
        { t: "em", h: "Each zone has a different glove angle. The drill teaches you to find it before the pitch arrives, not after." }
      ]
    },
    {
      id: "bougie-recv-decisions", title: "B-4 · Decisions Drill", target: "Mixed Zone · Preset Angles", reps: "15-20 pitches", optional: true, attrs: {"clip":"clips/bougie-recv-decisions.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Mixed zone receiving -- middle, outside, inside, then anywhere. Preset angles with eyes tracking. Two-knee stable pregame drill that puts all the zone work together." },
        { t: "em", h: "The in-air decision is the skill. Everything before this was building the pieces; this drill assembles them under pressure." }
      ]
    },
    {
      id: "bougie-recv-drills5", title: "B-5 · 5 Best Receiving Drills", target: "Full Session · 5 Drills", reps: "full session", optional: true, attrs: {"clip":"clips/bougie-recv-drills5.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Five receiving drills demonstrated with a youth catcher, approximately 50 seconds each. A complete receiving practice session in one clip." },
        { t: "em", h: "Each drill builds on the last. Run them in order the first time; pick the ones you need after that." }
      ]
    },
    {
      id: "bougie-frame-preset", title: "B-6 · Preset Frame to Right-Knee-Down", target: "Framing · Misfire Slide · Knee-Down", reps: "Watch + drill", optional: true, attrs: {"clip":"clips/bougie-frame-preset-to-kneedown.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Three-part progression: preset frame with bent arm, misfire slide recovery (slide to side and catch back up), then right-knee-down for down-and-in pitches. On-screen technique labels at each segment." },
        { t: "em", h: "The slide recovery is the part most catchers never practise -- when the pitch goes where you did not expect, this is how you get back." }
      ]
    },
    {
      id: "bougie-block-basics", title: "B-7 · Blocking Basics", target: "Square vs Angle · Stay-Square", reps: "10-12 each side", optional: true, attrs: {"clip":"clips/bougie-block-basics.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Square vs angle blocking philosophy, the stay-square principle, and weakness analysis (RKD ball kicks to arm side). Blocking from secondary stance fundamentals." },
        { t: "em", h: "The argument for staying square is simple: one move covers three directions. Angling commits you to one." }
      ]
    },
    {
      id: "bougie-block-prog", title: "B-8 · Blocking Progression", target: "Dry Reps · Inchworms · Triple Threat", reps: "progression", optional: true, attrs: {"clip":"clips/bougie-block-progression.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Regular baseball, dry reps, single knee moves, inchworms, \"relax and watch ball,\" get hips back, triple threat to decisions drill. Blocking progression with a runner in mind." },
        { t: "em", h: "Each stage adds one layer. If a layer breaks, drop back one step rather than grinding through it broken." }
      ]
    },
    {
      id: "bougie-block-reads", title: "B-9 · Block Reads", target: "Pop-Up · Stay Down · Block-to-Throw", reps: "8-10 reps", optional: true, attrs: {"clip":"clips/bougie-block-reads.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Reading the ball off the ground: ball bouncing before plate (pop-up read), stay down on the spiked fastball with the paddle-block approach, and getting around the ball plus block-to-throw." },
        { t: "em", h: "The read decides the technique. A spiked fastball and a bounced curve ask for different blocks, and the catcher who uses one block for both gives away bases." }
      ]
    },
    {
      id: "bougie-brickwall", title: "B-10 · Brick Wall Blocker", target: "Movement Zones · LKD/RKD Diagram", reps: "Watch + concept", optional: true, attrs: {"clip":"clips/bougie-block-brickwall.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "The brick wall blocker concept with whiteboard breakdown. Triangle diagram showing sloppy, proper, and extended movement zones. LKD/RKD framework for how far to move before the wall breaks down." },
        { t: "em", h: "The whiteboard is worth watching twice. The triangle diagram makes a complex movement constraint visual and immediate." }
      ]
    },
    {
      id: "bougie-glove-thumbsafe", title: "B-11 · Thumb-Safe Glove Work", target: "Thumb Position · Mitt Angle", reps: "Watch + practice", optional: true, attrs: {"clip":"clips/bougie-glove-thumbsafe.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Proper thumb positioning inside the mitt to prevent jamming and hyperextension. Coach Bougie's approach to mitt angle and thumb placement that keeps the hand safe across a full game." },
        { t: "em", h: "A jammed thumb is the most common catcher injury that nobody trains around. Fix the position before the volume arrives." }
      ]
    },
    {
      id: "bougie-throw-elbow-plane", title: "B-12 · Elbow Plane Throws", target: "Elbow Path · Release Point", reps: "8-10 throws", optional: true, attrs: {"clip":"clips/bougie-throw-elbow-plane.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Maintaining a clean elbow plane on throws to second base. The elbow leads the hand through the throwing slot — same posterior-chain biomechanics from the receiving drills applied to the throw." },
        { t: "em", h: "A short, direct arm path beats a long loop every time. The elbow plane is why — it decides whether the ball comes out clean or sails." }
      ]
    },
    {
      id: "bougie-throw-hops", title: "B-13 · Hop Transfers", target: "Footwork · Hop-to-Throw", reps: "8-10 reps", optional: true, attrs: {"clip":"clips/bougie-throw-hops.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "The hop transfer from receiving to throwing position. Quick feet under the body, gaining ground toward the target while the hands separate." },
        { t: "em", h: "The hop is not a jump — it is a controlled weight shift that buys time for the arm. Overpower it and the throw goes high." }
      ]
    },
    {
      id: "bougie-throw-stepback", title: "B-14 · Step-Back Throws", target: "Clear the Lane · Weight Transfer", reps: "8-10 reps", optional: true, attrs: {"clip":"clips/bougie-throw-stepback.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "The step-back throw for glove-side pitches — creating space and a clean throwing lane around the batter. Footwork pattern to clear the lane without losing momentum toward the target." },
        { t: "em", h: "This is the throw most young catchers skip because they think they can just throw through the batter. They cannot." }
      ]
    },
    {
      id: "bougie-brace-setup", title: "B-15 · Brace Setup", target: "Brace Position · Body Angle", reps: "Watch + position work", optional: true, attrs: {"clip":"clips/bougie-brace-setup.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Setting up the brace position for blocking: body angle, arm tuck, and how to absorb impact without giving ground. The brace is a posture, not a reaction." },
        { t: "em", h: "Get the setup right at rest and the live block takes care of itself. Most leakage is a setup problem, not a reaction-speed problem." }
      ]
    },
    {
      id: "bougie-brace-drills", title: "B-16 · Brace Drill Progressions", target: "Static · Reactive · Live Reps", reps: "3 sets x 5", optional: true, attrs: {"clip":"clips/bougie-brace-drills.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Progressive brace drills building from static holds to reaction-based blocking. Each level adds one variable — direction, speed, or unpredictability — so the body learns the shape before it has to learn the read." },
        { t: "em", h: "A drill that starts at full speed teaches compensation, not technique. Build the layers." }
      ]
    },
    {
      id: "bougie-decide-intro", title: "B-17 · Decision Framework", target: "Block · Receive · Backhand", reps: "Watch + concept", optional: true, attrs: {"clip":"clips/bougie-decide-intro.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Coach Bougie's decision-making framework for catchers — when to block, when to receive, when to attempt a backhand. The decision tree that separates a reactive catcher from a proactive one." },
        { t: "em", h: "The technique is rarely the problem. Choosing the wrong technique for the pitch is the problem, and this framework fixes that." }
      ]
    },
    {
      id: "bougie-decide-eyes", title: "B-18 · Eyes & Tracking", target: "Eye Path · Pitch Tracking", reps: "Watch + concept", optional: true, attrs: {"clip":"clips/bougie-decide-eyes.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Where the catcher's eyes should be and how to track the pitch from release point to the glove. The visual component that feeds the decision framework — the eyes decide before the body moves." },
        { t: "em", h: "A catcher who reads late blocks late. Train the eyes first and the hands have time to be right." }
      ]
    },
    {
      id: "bougie-steal-setups", title: "B-19 · Steal Setups", target: "Pre-Pitch Read · Runner Tells", reps: "Watch + concept", optional: true, attrs: {"clip":"clips/bougie-steal-setups.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Reading the runner's steal setup before the pitch — weight distribution, lean angle, and timing tells that telegraph intent. The pre-pitch read that buys the catcher an extra half-second." },
        { t: "em", h: "The throw to second starts before the pitch. A catcher who reads the setup controls the running game without a single pickoff." }
      ]
    },
    {
      id: "bougie-steal-positions", title: "B-20 · Steal Positions", target: "Shift · Pre-Load · Target Angle", reps: "Watch + position work", optional: true, attrs: {"clip":"clips/bougie-steal-positions.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Body positioning adjustments with a runner on — the subtle shift, pre-load, and target angle that shave time off the throw without tipping the hitter." },
        { t: "em", h: "The shift is small enough that the batter does not notice and large enough that the throw arrives a step earlier. That is the whole margin." }
      ]
    },
    {
      id: "bougie-steal-screw", title: "B-21 · Screw Step", target: "Footwork · Quick Release", reps: "8-10 reps", optional: true, attrs: {"clip":"clips/bougie-steal-screw.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "The screw step — a rotational footwork pattern that replaces the traditional jab step for faster transfer to throwing position. Feet stay under the body while the hips rotate toward the target." },
        { t: "em", h: "The jab step is a habit, not a requirement. The screw step is shorter, faster, and keeps the momentum going forward instead of sideways." }
      ]
    },
    {
      id: "bougie-poptime-glute", title: "B-22 · Pop Time: Glute Load", target: "Hip Drive · Power Source", reps: "Watch + feel drill", optional: true, attrs: {"clip":"clips/bougie-poptime-glute.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "The glute as the power source for pop time — loading the hip before the ball arrives so the throw starts from the ground up. The fastest catchers throw with their legs, not their arms." },
        { t: "em", h: "If the arm is doing the work, the glute was not loaded. Check the hip angle at catch — that is where the time lives." }
      ]
    },
    {
      id: "bougie-poptime-timing", title: "B-23 · Pop Time: Timing Sequence", target: "Catch · Transfer · Release", reps: "Watch + concept", optional: true, attrs: {"clip":"clips/bougie-poptime-timing.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Breaking down the pop time sequence — catch, transfer, release — and where each tenth of a second lives. Coach Bougie's framework for identifying which phase is costing time." },
        { t: "em", h: "Most catchers try to speed up everything at once. Measure each phase separately — the slow one is almost never the one they think it is." }
      ]
    },
    {
      id: "bougie-poptime-result", title: "B-24 · Pop Time: Result Reads", target: "Film Review · Self-Assessment", reps: "Watch + concept", optional: true, attrs: {"clip":"clips/bougie-poptime-result.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Reading your own pop time results — what the numbers actually mean, which improvements translate to outs, and how to use film to find the leak in your sequence." },
        { t: "em", h: "A 2.0 pop time with a bad transfer is easier to fix than a 1.9 with perfect mechanics. The number alone does not tell you what to work on." }
      ]
    },
    {
      id: "bougie-pop30-assess", title: "B-25 · 30-Day Pop: Assessment", target: "Baseline · Target Setting", reps: "Watch + self-assess", optional: true, attrs: {"clip":"clips/bougie-pop30-assess.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Coach Bougie's 30-day pop time program — starting with an honest baseline assessment. Film yourself, time each phase, and set realistic targets for the month." },
        { t: "em", h: "The program works because it starts with where you actually are, not where you think you are. Film does not lie." }
      ]
    },
    {
      id: "bougie-pop30-feet", title: "B-26 · 30-Day Pop: Feet", target: "Footwork Drills · Speed Ladder", reps: "3 sets x 5", optional: true, attrs: {"clip":"clips/bougie-pop30-feet.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "The footwork phase of the 30-day program — drills that make the feet faster without sacrificing balance. Quick feet under the body, not around it." },
        { t: "em", h: "Fast feet are quiet feet. If you can hear your footwork, the steps are too big." }
      ]
    },
    {
      id: "bougie-pop30-transfer", title: "B-27 · 30-Day Pop: Transfer", target: "Glove-to-Hand · Exchange Speed", reps: "3 sets x 8", optional: true, attrs: {"clip":"clips/bougie-pop30-transfer.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "The transfer phase — getting the ball from glove to throwing hand as fast as possible without fumbling. Hand position at catch, exchange point, and the wrist flip that keeps the ball secure." },
        { t: "em", h: "A clean transfer is worth more than arm strength. The fastest arm in the world cannot make up for a bobbled exchange." }
      ]
    },
    {
      id: "bougie-pop30-armpath", title: "B-28 · 30-Day Pop: Arm Path", target: "Short Arm · Direct Line", reps: "8-10 throws", optional: true, attrs: {"clip":"clips/bougie-pop30-armpath.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "The arm path phase — shortening the arm circle to a direct line from glove to release. The short arm action that eliminates wasted motion without sacrificing velocity." },
        { t: "em", h: "Every inch of extra arm circle is time the runner uses. A direct line from exchange to release is the goal — no wind-up, no loop." }
      ]
    },
    {
      id: "bougie-bailey-routine", title: "B-29 · Bailey Pregame Routine", target: "Full Warmup · Pro Framework", reps: "Watch + concept", optional: true, attrs: {"clip":"clips/bougie-bailey-routine.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Patrick Bailey's complete pregame routine — the full warmup framework a starting MLB catcher uses before every game. Structure, sequence, and pacing from a pro who does this 162 times a year." },
        { t: "em", h: "Watch the whole routine once before breaking it into pieces. The sequence matters as much as the individual drills." }
      ]
    },
    {
      id: "bougie-bailey-recv", title: "B-30 · Bailey: Receiving Warmup", target: "Soft Hands · Mitt Presentation", reps: "Follow along", optional: true, attrs: {"clip":"clips/bougie-bailey-recv.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "The receiving portion of Bailey's pregame — working soft hands and mitt presentation before live pitching. Progressive intensity from slow tosses to full-speed simulation." },
        { t: "em", h: "Pro catchers warm up their hands, not just their arms. The mitt work before live pitching is what makes the first inning look like the sixth." }
      ]
    },
    {
      id: "bougie-bailey-throw", title: "B-31 · Bailey: Throwing Warmup", target: "Pop-Ups · Snap Throws · Down & Tag", reps: "Follow along", optional: true, attrs: {"clip":"clips/bougie-bailey-throw.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Bailey's pregame throwing sequence — pop-ups to second, snap throws, and down-and-tag practice. Building arm speed and accuracy before the game starts." },
        { t: "em", h: "The pregame throw-down sequence is not just arm warm-up — it is the catcher telling the runners what they are dealing with today." }
      ]
    },
    {
      id: "bougie-bailey-reps", title: "B-32 · Bailey: Rep Work", target: "Block Reps · Receive Reps · Volume", reps: "Follow along", optional: true, attrs: {"clip":"clips/bougie-bailey-reps.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "The high-volume rep segment of Bailey's pregame — rapid-fire blocking and receiving drills that build muscle memory through repetition, not instruction." },
        { t: "em", h: "This is the part most youth catchers skip because it looks boring. It is the part that makes game-speed reactions automatic." }
      ]
    },
    {
      id: "bougie-lean-drill", title: "B-33 · Hop-Hop-Throw Drill", target: "Posterior Loading · Transfer Mechanics", reps: "Watch + concept", optional: true, attrs: {"clip":"clips/bougie-lean-drill.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "The hop-hop-throw drill teaches posterior chain loading through the transfer — landing back-hip loaded so the throw starts from the ground up instead of all arm." },
        { t: "em", h: "If you're leaning forward through the exchange, the throw is already late. This drill fixes the lean at the source." }
      ]
    },
    {
      id: "bougie-lean-sticky", title: "B-34 · Step-Back Hop Breakthrough", target: "Feel Shift · \"It Just Unlocked\"", reps: "Watch + concept", optional: true, attrs: {"clip":"clips/bougie-lean-sticky.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "The step-back hop progression that produces the breakthrough moment — when the catcher feels the back hip load instead of thinking about it, the transfer speed jumps without trying harder." },
        { t: "em", h: "Coach Bougie's phrase: \"it just unlocked.\" That feel-shift is the goal, not the rep count." }
      ]
    },
    {
      id: "bougie-lean-rotate", title: "B-35 · Rotational Force Transfer", target: "Bailey Model · Hip Rotation", reps: "Watch + concept", optional: true, attrs: {"clip":"clips/bougie-lean-rotate.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Patrick Bailey's transfer mechanics broken down — how rotational force from the hips translates through the trunk into arm speed. The same principle that makes his pop times elite." },
        { t: "em", h: "Linear catchers push the ball. Rotational catchers whip it. This is the difference." }
      ]
    },
    {
      id: "bougie-throw1-elbow", title: "B-36 · Elbow-Below-Shoulder Fix", target: "Arm Slot · Escalator Cue", reps: "Watch + concept", optional: true, attrs: {"clip":"clips/bougie-throw1-elbow.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "The elbow-below-shoulder problem and the escalator fix — when a catcher's elbow drops below the shoulder line during the throw, accuracy and velocity both suffer. The escalator cue retrains the slot." },
        { t: "em", h: "Not \"throw overhand.\" The cue is \"ride the escalator up\" — it fixes the path without overcomplicating the mechanics." }
      ]
    },
    {
      id: "bougie-throw1-hips", title: "B-37 · Kinetic Chain: Hips to Hand", target: "Sequence · Head Jump Fix", reps: "Watch + concept", optional: true, attrs: {"clip":"clips/bougie-throw1-hips.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "The full kinetic chain sequence — hips fire first, elbow follows, hand is last. When the head jumps forward ahead of the hips, the chain breaks and the arm does all the work." },
        { t: "em", h: "The head jump is the most common leak. If the head moves before the hips, everything downstream is compensating." }
      ]
    },
    {
      id: "bougie-solo-drills", title: "B-38 · 5 Best Solo Catcher Drills", target: "Solo Practice · No Partner Needed", reps: "5 drills", optional: true, attrs: {"clip":"clips/bougie-solo-drills.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Five drills a catcher can do alone — wall work, self-toss receiving, stance transitions, blocking into a net, and glove-path shadow reps. No partner, no coach, just a wall and a ball." },
        { t: "em", h: "The days you train alone are the days that separate. These five cover receiving, blocking, and transitions without needing anyone else." }
      ]
    },
    {
      id: "bougie-passball-slide", title: "B-39 · Passed Ball Recovery: Slide", target: "Slide Fundamentals · Ball Retrieval", reps: "8-10 reps", optional: true, attrs: {"clip":"clips/bougie-passball-slide.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Slide mechanics for recovering a passed ball — push off the inside leg, stay low, glove sweeps the ball into the body. The slide gets you to the ball faster than running because your center of gravity stays low." },
        { t: "em", h: "A passed ball is not a mistake until the runner advances. The slide buys back the time the block missed." }
      ]
    },
    {
      id: "bougie-passball-knee", title: "B-40 · Passed Ball Recovery: Knee Drill", target: "Knee Drive · Hip Engagement", reps: "8-10 reps per side", optional: true, attrs: {"clip":"clips/bougie-passball-knee.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Knee-drive drill for passed ball recovery — the knee pushes toward the ball while the hips rotate to generate momentum. Isolates the lower-body mechanics that make the slide explosive." },
        { t: "em", h: "The knee leads, the hips follow. Same kinetic chain as throwing — just pointed at the backstop instead of second base." }
      ]
    },
    {
      id: "bougie-passball-reps", title: "B-41 · Passed Ball Recovery: Full Reps", target: "Game Speed · Complete Sequence", reps: "6-8 full reps", optional: true, attrs: {"clip":"clips/bougie-passball-reps.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Full-speed passed ball recovery reps — block attempt, locate ball, slide or scramble, secure, pop to throwing position. Combines the slide and knee drill into a game-realistic sequence." },
        { t: "em", h: "The rep is not done when you pick up the ball. It is done when you are in a position to throw." }
      ]
    },
    {
      id: "bougie-statcast-baileyknee", title: "B-42 · Statcast: Bailey Knee-Down Sprinter", target: "Knee-Down Stance · Throw Mechanics", reps: "Watch + concept", optional: true, attrs: {"clip":"clips/bougie-statcast-baileyknee.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Patrick Bailey's knee-down sprinter stance breakdown via Statcast data — how the one-knee-down position enables faster pop times by preloading the throwing leg. Includes throw mechanics from the knee-down position." },
        { t: "em", h: "The stance is not about comfort — it is about pre-loading. Bailey's pop time from one knee is faster than most catchers from two feet because the leg is already coiled." }
      ]
    },
    {
      id: "bougie-statcast-framing", title: "B-43 · Statcast: Shadow Zone Framing", target: "Shadow Zone · Strike Probability", reps: "Watch + concept", optional: true, attrs: {"clip":"clips/bougie-statcast-framing.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Statcast shadow zone breakdown — the border region where called-strike probability drops from 80% to 30%. How MLB catchers frame in the shadow zone by minimizing glove travel and presenting early." },
        { t: "em", h: "Framing is not about moving the glove after the catch. It is about WHERE the glove is BEFORE the pitch arrives." }
      ]
    },
    {
      id: "bougie-statcast-glove5pos", title: "B-44 · Statcast: 5-Position Glove Rotation", target: "Glove Presentation · Zone Coverage", reps: "5 positions × 5 reps", optional: true, attrs: {"clip":"clips/bougie-statcast-glove5pos.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Five-position glove rotation drill — thumb-up, thumb-out, thumb-down, backhand, and reverse. Each position covers a different zone of the strike zone. The rotation trains the wrist to present naturally at every pitch location." },
        { t: "em", h: "One glove position cannot cover the whole zone. Five positions, five habits — and the wrist picks the right one without thinking." }
      ]
    },
    {
      id: "bougie-statcast-trovinho", title: "B-45 · Statcast: Trovinho Breakdown", target: "Reps × Technique · Stance Evolution", reps: "Watch + concept", optional: true, attrs: {"clip":"clips/bougie-statcast-trovinho.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Trovinho catching breakdown via Statcast — how stance evolution in 2025 MLB changed the receiving position. Reps-times-technique framework: the stance that allows the most reps with the least mechanical cost wins over a full season." },
        { t: "em", h: "The best stance is the one you can hold for 140 games. Trovinho's data shows that 95% of MLB catchers moved toward the same answer in 2025." }
      ]
    },
    {
      id: "propoint-block-twoknee", title: "B-46 · Two-Knee Blocking Isolation", target: "Knee Drop · Center Position", reps: "8-10 reps", optional: true, attrs: {"clip":"clips/propoint-block-twoknee.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Two-knee isolation drill — drop both knees simultaneously, chest stays over the ball, glove fills the gap between the legs. Isolates the lower body without the distraction of lateral movement." },
        { t: "em", h: "Block center first. Every other block direction is a variation of this base position." }
      ]
    },
    {
      id: "propoint-block-gloveslide", title: "B-47 · Glove-Slide Absorption", target: "Glove Path · Soft Hands", reps: "8-10 reps per side", optional: true, attrs: {"clip":"clips/propoint-block-gloveslide.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Glove-slide absorption drill — the glove slides down and forward to meet the ball rather than stabbing at it. The wrist stays relaxed so the ball dies on contact instead of ricocheting off the leather." },
        { t: "em", h: "A stiff glove redirects the ball. A soft glove absorbs it. The slide teaches the difference." }
      ]
    },
    {
      id: "propoint-block-timing", title: "B-48 · Delayed 1-2-3 Timing", target: "Read · React · Block", reps: "6-8 reps", optional: true, attrs: {"clip":"clips/propoint-block-timing.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Delayed timing progression — 1 (read the bounce), 2 (commit direction), 3 (execute block). Slowing the sequence down forces the catcher to read before reacting instead of guessing the direction." },
        { t: "em", h: "Most blocking errors are timing errors disguised as technique errors. Read first, then move." }
      ]
    },
    {
      id: "propoint-recv-underball", title: "B-49 · Stay Under the Ball", target: "Glove Below · Ground Contact", reps: "10-12 reps", optional: true, attrs: {"clip":"clips/propoint-recv-underball.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Stay-under-the-ball drill — glove starts below the pitch and works up, never drops down from above. Glove-on-ground position ensures every low pitch is received cleanly instead of scooped." },
        { t: "em", h: "A glove that starts high and drops looks like a ball to the umpire. A glove that starts low and rises looks like a strike." }
      ]
    },
    {
      id: "propoint-recv-getbehind", title: "B-50 · Get Behind the Line", target: "Alignment · Deflection Drill", reps: "10-12 reps", optional: true, attrs: {"clip":"clips/propoint-recv-getbehind.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Get-behind-the-line drill — position the body so the glove, chest, and head are all behind the ball's line of travel. A deflection drill reinforces this: if the ball deflects, it should hit you, not go past you." },
        { t: "em", h: "If the ball gets past your glove and past your body, you were beside the line, not behind it." }
      ]
    },
    {
      id: "propoint-recv-matchangle", title: "B-51 · Match the Angle", target: "Turned Hand · Pitch Path", reps: "10-12 reps", optional: true, attrs: {"clip":"clips/propoint-recv-matchangle.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Match-angle drill — turn the hand so the glove face matches the pitch's angle of entry. A turned-hand position on the corners presents the pocket to the umpire instead of the back of the glove." },
        { t: "em", h: "The glove does not move to the ball. The glove rotates to face the ball. One looks like a catch, the other looks like a reach." }
      ]
    },
    {
      id: "bougie-xfer-5drills", title: "B-52 · Transfer: 5 Drills", target: "Catch-It-Back · Dunk · Rocker · Shuffle-Throw · Through-the-Legs", reps: "Watch + drill", optional: true, attrs: {"clip":"clips/bougie-transfer-5drills.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Five transfer drills for 10U catchers: catch-it-back, dunk, rocker, a preset shuffle-and-throw, and the through-the-legs drill." }
      ]
    },
    {
      id: "bougie-toehang-explain", title: "B-53 · Toe Hang: What It Is", target: "Glove Heel Down · Forearm ~45°", reps: "Watch", optional: true, attrs: {"clip":"clips/bougie-toehang-explain.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Toe hang is the glove heel down, the forearm flat at about 45°, and the glove staying on the pitch plane." }
      ]
    },
    {
      id: "bougie-toehang-drills", title: "B-54 · Toe Hang: Drills", target: "Mallet Drill · Heavy-Ball Paddle Flip", reps: "Watch + drill", optional: true, attrs: {"clip":"clips/bougie-toehang-drills.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Two drills to practice toe hang: a mallet drill, and a paddle flip with a heavy ball." }
      ]
    },
    {
      id: "propoint-popcase", title: "B-55 · Pop Time Case Study", target: "2.09 to 1.91 In One Week", reps: "Watch", optional: true, attrs: {"clip":"clips/propoint-popcase-demo.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "A case study of how one catcher cut his pop time from 2.09 to 1.91 in a week." }
      ]
    },
    {
      id: "propoint-throwacc", title: "B-56 · Throwing Accuracy: 3 Drills", target: "Catcher Throwing Accuracy", reps: "Watch + drill", optional: true, attrs: {"clip":"clips/propoint-throwacc-demo.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Three drills to improve a catcher’s throwing accuracy." }
      ]
    },
    {
      id: "propoint-lowerbody", title: "B-57 · Lower-Body Throwing Velocity", target: "Lower-Body Secrets For Catchers", reps: "Watch", optional: true, attrs: {"clip":"clips/propoint-lowerbody-demo.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Lower-body secrets for catcher throwing velocity." }
      ]
    },
    {
      id: "propoint-reads", title: "B-58 · Block or Receive: Making the Read", target: "Decisions · Reads", reps: "Watch", optional: true, attrs: {"clip":"clips/propoint-reads-demo.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "How to decide when to block a pitch and when to receive it — making the read." }
      ]
    }
] });
BATTERY.register('arm.step-body', { section: "pitching", bodies: [
    {
      id: "pitch-hipfire", title: "Hip-Fire Sequencing", target: "Rotational timing · Hip lead", reps: "Watch + drill", attrs: {"clip":"clips/bauer-pitch-hipfire.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Hips fire first; the arm is a passenger until foot strike. This drill isolates the rotational sequence — hips open, trunk follows, arm lags behind. The goal is timing, not effort." },
        { t: "btn", fn: "openClip", arg: "bauer-pitch-hipfire.mp4", h: "▶ Demo clip · 0:53" }
      ]
    },
    {
      id: "pitch-gloveside", title: "Glove-Side Finish", target: "Scap retraction · Glove stop", reps: "Watch + drill", attrs: {"clip":"clips/bauer-pitch-gloveside.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Hips rotate around a stable axis — scap retracted, glove arm stops outside the line to the plate. The glove is the handle of the whip: when it stops, everything above it accelerates. Dowel-in-ground and walking drills to groove the pattern." },
        { t: "btn", fn: "openClip", arg: "bauer-pitch-gloveside.mp4", h: "▶ Demo clip · 2:03" }
      ]
    },
    {
      id: "pitch-hipsep", title: "Hip Separation Spring", target: "Tendon Spring · Energy Transfer", reps: "Watch", attrs: {"clip":"clips/bauer-mech-hipsep-spring.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Hip-shoulder separation creates a tendon spring effect -- elastic energy stored in the torso transfers through the kinetic chain. The spring loads as the hips open while the shoulders stay closed." }
      ]
    },
    {
      id: "pitch-armspiral", title: "Arm Spiral", target: "Scap Retraction · Arm Path", reps: "Watch", attrs: {"clip":"clips/bauer-mech-armspiral.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Scap retraction into the arm spiral -- the path the arm takes from lay-back through acceleration. The arm spirals forward rather than being pushed; the scap sets the starting position." }
      ]
    },
    {
      id: "pitch-pulldown", title: "Pulldown Drill", target: "Block Leg · Intent", reps: "5-8 throws", attrs: {"clip":"clips/bauer-drill-pulldown.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Pull-down drill targeting the block leg -- the front leg braces to convert forward momentum into rotational velocity. Max-intent throws from a running start." }
      ]
    },
    {
      id: "pitch-clockdrill", title: "Clock Drill", target: "4:30 Position · Run-Rotate-Throw", reps: "5-8 throws", attrs: {"clip":"clips/bauer-drill-clockdrill.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "The clock drill at the 4:30 position -- run, rotate, and throw in one fluid motion. Teaches the body to find the release point from different approach angles." }
      ]
    },
    {
      id: "pitch-warmup3", title: "3-Phase Pregame Warmup", target: "Warmup Overview", reps: "Watch", attrs: {"clip":"clips/bauer-warmup-3phase.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Bauer's 3-phase pregame warmup overview: general movement, activation (J-bands/shoulder tube/cuff weights), and activity-specific work (weighted balls). The structure matters more than the specific exercises." }
      ]
    },
    {
      id: "pitch-fosh", title: "Fosh Grip", target: "Fosh History · Grip · Throw Like FB", reps: "Watch + grip", attrs: {"clip":"clips/zeller-pitch-fosh.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Joe Zeller's fosh grip tutorial -- the history (Boddicker/Gausman), grip mechanics, and the key principle: trust it and throw it like a fastball. The grip does the work; the delivery stays the same." }
      ]
    },
    {
      id: "pitch-spin-theory", title: "Spin Theory", target: "Spin Axis · Why Wrist Manipulation Fails", reps: "Watch", attrs: {"clip":"clips/bauer-design-spin-theory.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Why spin axis matters and why wrist manipulation is not the answer. The ball spins around an axis determined by hand position at release, not by what the wrist does after the fact." }
      ]
    },
    {
      id: "pitch-cutter-axis", title: "Cutter Axis", target: "Spin Axis Visual Demo", reps: "Watch", attrs: {"clip":"clips/bauer-design-cutter-axis.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Visual demonstration of cutter spin axis -- close-up grip and hand footage showing how slight changes in finger pressure shift the axis and produce different movement profiles." }
      ]
    },
    {
      id: "pitch-curve-spin", title: "Curveball Spin", target: "Front Spin Mechanics", reps: "Watch", attrs: {"clip":"clips/bauer-design-curve-spin.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Curveball front-spin mechanics -- what produces the drop, and why the ball needs to come off the front of the fingers rather than the side." }
      ]
    },
    {
      id: "strat-tunnel-def", title: "Tunneling: Definition", target: "Tree/Branch Analogy", reps: "Watch", attrs: {"clip":"clips/bauer-strat-tunnel-def.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "What tunneling means and why it works -- the tree/branch analogy. Two pitches that look the same to the hitter through the decision window, then diverge after the commit point." }
      ]
    },
    {
      id: "strat-tunnel-vert", title: "Vertical Tunnel", target: "FB/Curve · Good vs Bad", reps: "Watch", attrs: {"clip":"clips/bauer-strat-tunnel-vert.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Vertical tunnel with fastball and curveball -- what a good tunnel looks like vs a bad one. Whiteboard animation shows the hitter's decision point and where the pitches diverge." }
      ]
    },
    {
      id: "strat-tunnel-horz", title: "Horizontal Tunnel", target: "FB/Slider · Hitter Deception", reps: "Watch", attrs: {"clip":"clips/bauer-strat-tunnel-horz.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Horizontal tunnel with fastball and slider -- the pitch pair separates left-right instead of up-down. The hitter commits to a location and the ball moves away from it." }
      ]
    },
    {
      id: "strat-cmd-targets", title: "Command Targets", target: "9\" Target · Progressive Shrink", reps: "Watch", attrs: {"clip":"clips/bauer-cmd-targets.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "9-inch target methodology with a progressive shrink protocol -- start with a large target and make it smaller as command improves. The target size matches the pitcher's current ability, not the ideal." }
      ]
    },
    {
      id: "strat-cmd-session", title: "Command Session", target: "Announce · Throw · Mark", reps: "Watch", attrs: {"clip":"clips/bauer-cmd-session.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Command session protocol: announce the pitch and location before throwing, throw it, then mark hit or miss. The announce step is what turns a bullpen into a command session -- intention before execution." }
      ]
    },
    {
      id: "strat-ducks-tunnel-read", title: "Hitter Tunnel Read", target: "Dead Zone Cutter · Up/Down Management", reps: "Watch", attrs: {"clip":"clips/ducks-seq-tunnel-read.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "From the Ducks no-hitter breakdown: reading the hitter's tunnel, the dead-zone cutter concept, and explicit up-tunnel vs down-tunnel management." },
        { t: "em", h: "Game-breakdown format -- Bauer narrates his pitch-by-pitch reasoning over the footage." }
      ]
    },
    {
      id: "strat-ducks-first-pitch", title: "First-Pitch Philosophy", target: "Opener Strategy", reps: "Watch", attrs: {"clip":"clips/ducks-seq-first-pitch.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "\"Normally you throw a first pitch fastball coming out of the gate\" -- Bauer's first-pitch philosophy and when to deviate from it with a cutter or splitter opener." }
      ]
    },
    {
      id: "strat-ducks-splitter-tree", title: "Off-Speed Decision Tree", target: "Splitter · Curveball", reps: "Watch", attrs: {"clip":"clips/ducks-seq-splitter-tree.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Reading hitter tendencies to choose between off-speed pitches -- when the hitter is looking off-speed, go splitter; when the splitter gets the swing pattern you want, follow with curveball." }
      ]
    },
    {
      id: "strat-ducks-new-pitch", title: "New Pitch Decision Tree", target: "Cutter · Sweeper · Curve", reps: "Watch", attrs: {"clip":"clips/ducks-seq-new-pitch.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "How a new pitch (sweeper) fits into the existing repertoire tree: cutter sets up the sweeper, sweeper sets up the curveball. Each pitch earns its place by what it makes the next one do." }
      ]
    },
    {
      id: "strat-ducks-fb-tunnel-up", title: "Up-Tunnel Setup", target: "FB Freeze K", reps: "Watch", attrs: {"clip":"clips/ducks-seq-fb-tunnel-up.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Setting up the up-tunnel: curve/FB/cutter/splitter all share the upper tunnel, then the fastball down freezes the hitter for the strikeout." }
      ]
    },
    {
      id: "strat-mx-fb-cutter", title: "FB/Cutter Same Tunnel", target: "Shared Tunnel Execution", reps: "Watch", attrs: {"clip":"clips/mx-seq-fb-cutter-tunnel.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "From the Mexico breakdowns: an explicit fastball and cutter sharing the same tunnel. \"Well-executed middle-middle fastball... went cutter bottom of the zone. Shared the same tunnel. He was a little out in front.\"" }
      ]
    },
    {
      id: "strat-mx-three-pitch", title: "Three-Pitch Tree", target: "FB · Cutter · Curve/Splitter", reps: "Watch", attrs: {"clip":"clips/mx-seq-three-pitch-tree.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "\"Three fastballs and a cutter. Start off heater... curveball tunnel set up off of that. Splitter down the way.\" The full three-pitch tree built from a fastball foundation." }
      ]
    },
    {
      id: "strat-jp-splitter-tunnel", title: "Splitter-Curveball Tunnel", target: "Tunnel · Sword", reps: "Watch", attrs: {"clip":"clips/jp-seq-splitter-tunnel.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "From Japan: splitter attempts set up a curveball tunnel -- \"set up a good tunnel for a curveball.\" The splitter teaches the hitter to look low, and the curveball exploits that look with a different break." }
      ]
    },
    {
      id: "strat-jp-same-seq", title: "Same Sequence Repetition", target: "Deliberate Repetition", reps: "Watch", attrs: {"clip":"clips/jp-seq-same-sequence.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "\"Exact same sequence as the first guy\" -- deliberate sequence repetition against a second lefty. When the sequence worked, running it again is a decision, not laziness." }
      ]
    },
    {
      id: "pitch-fastballfix", title: "One Fix for a Better Fastball", target: "Glove Side · Linearness · Shoulder Deploy", reps: "Watch", attrs: {"clip":"clips/bauer-pitch-fastballfix-short.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Three cues for a better fastball, shown in a two-person demo: the glove side, how linear the move toward the plate is, and when the shoulder deploys." }
      ]
    },
    {
      id: "pitch-patience", title: "Velocity Comes From Patience", target: "Arm Sequencing · Patient Arm", reps: "Watch", attrs: {"clip":"clips/bauer-pitch-patience-short.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "A rushed arm “dumps” and lags behind the body. A patient arm waits: the body rotates before the hand, and then the forearm deploys. Watch the two side by side." }
      ]
    },
    {
      id: "pitch-armlag", title: "The Pitching Mechanic Everyone Gets Wrong", target: "Arm Lag · Coil · Rotation", reps: "Watch", attrs: {"clip":"clips/bauer-mech-armlag-short.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Arm lag, coil and rotation — and how the timing of the upper body fits with the lower half." }
      ]
    },
    {
      id: "pitch-velosource", title: "Where Your Velocity Comes From", target: "Relaxed Hips · Move, Then Rotate", reps: "Watch", attrs: {"clip":"clips/bauer-mech-velosource-short.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "Velocity comes from relaxed hips: a forward move, then rotation. The clip compares linear movement with rotational movement." }
      ]
    },
    {
      id: "pitch-oneill-grip", title: "Ball Grip & Finger Placement", target: "Grip · Finger Placement", reps: "Watch", attrs: {"clip":"clips/oneill-grip-simple-short.mp4"}, youth: "safe",
      detail: [
        { t: "p", h: "A coach shows the ball grip and finger placement to the camera — a short, simple demo of how the ball sits in the hand." }
      ]
    }
] });
BATTERY.register('arm.step-body', { section: "recovery", bodies: [
    {
      id: "rc-roll-tspine", title: "R-1 · Foam Roll · Mid-Back", target: "Thoracic Spine · Side-Lying", reps: "2 min", optional: true, attrs: {"clip":"clips/jp1-roller-tspine.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Side-lying over the roller, working the mid-back rather than the low back. Slow, and stop on the spots that object instead of rolling past them." },
        { t: "em", h: "The joint that has to rotate for you to throw. Roll it before the shoulder is asked to cover for it." }
      ]
    },
    {
      id: "rc-roll-hips", title: "R-2 · Foam Roll · Hips and Glutes", target: "Hip · Glute · Lateral Chain", reps: "2 min", optional: true, attrs: {"clip":"clips/jp1-roller-hips.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Same roller, down into the hip and glute, still side-lying. Sink in and breathe rather than grinding back and forth." },
        { t: "em", h: "Pairs with the mid-back work above; between them they cover most of what a throwing day tightens." }
      ]
    },
    {
      id: "rc-roll-text", title: "R-2b · Foam Roll · Thoracic Extension", target: "T-Spine Extension · Kyphosis Correction", reps: "2 min", optional: true, youth: "adult",
      detail: [
        { t: "p", h: "Lie face-up with the roller perpendicular to your spine at mid-back. Hands behind head, elbows pointed up. Extend backward over the roller, hold 5 seconds, then move the roller one vertebra up and repeat. Work from mid-back to upper back." },
        { t: "em", h: "Different from R-1 (side-lying rotation). This targets extension — the motion that reverses desk posture and lets your scapulae sit flat on the rib cage." }
      ]
    },
    {
      id: "rc-roll-lats", title: "R-2c · Foam Roll · Lats", target: "Latissimus Dorsi · Lateral Line · Teres Major", reps: "90s / side", optional: true, youth: "adult",
      detail: [
        { t: "p", h: "Side-lying, roller under the armpit area. Bottom arm extended overhead. Roll from armpit to just above the hip. Pause on tender spots. Thumb-up position biases lat; thumb-down biases teres major." },
        { t: "em", h: "Tight lats pull the scapula into depression and internal rotation — releasing them lets the shoulder blade move freely on the rib cage. Part of the lateral fascial line." }
      ]
    },
    {
      id: "rc-ball-pecminor", title: "R-2d · Lacrosse Ball · Pec Minor", target: "Pec Minor · Coracoid Process · Anterior Shoulder", reps: "60-90s / side", optional: true, youth: "adult",
      detail: [
        { t: "p", h: "Stand facing a wall. Place the lacrosse ball on your anterior chest, just below the clavicle and medial to the shoulder — the soft triangle between your collarbone, shoulder, and pec. Lean in and make small movements to find the tender spot over the coracoid process." },
        { t: "p", style: "margin-top:6px", h: "<b>Key release for scapular anterior tilt.</b> If your clavicle feels like it rotates out of position or the front of your shoulder is tight, this is the primary driver. The pec minor attaches to the coracoid and pulls the scapula forward when tight." },
        { t: "em", h: "Highest-value ball work for pitchers and desk workers. Addresses the root cause of most “front of shoulder” complaints." }
      ]
    },
    {
      id: "rc-ball-infra", title: "R-2e · Lacrosse Ball · Posterior Shoulder", target: "Infraspinatus · Teres Minor · Posterior Cuff", reps: "60-90s / side", optional: true, youth: "adult",
      detail: [
        { t: "p", h: "Stand with your back to a wall. Place the ball on the back of your shoulder, in the meaty area below the scapular spine (the bony ridge you can feel across your shoulder blade). Roll slowly, pausing on hot spots. Adjust arm position — hand on opposite shoulder deepens the stretch." },
        { t: "em", h: "The posterior cuff decelerates the arm after release. Pitchers hammer this tissue every throw — releasing it restores internal rotation range." }
      ]
    },
    {
      id: "rc-ball-trap", title: "R-2f · Lacrosse Ball · Upper Trap / Levator Scap", target: "Upper Trapezius · Levator Scapulae · Cervical Tension", reps: "60s / side", optional: true, youth: "adult",
      detail: [
        { t: "p", h: "Stand with your back to a wall. Place the ball at the junction of your neck and shoulder — the upper trap muscle belly. Lean in gently. To shift to levator scapulae, move the ball slightly toward the spine and angle your chin toward the opposite armpit." },
        { t: "p", style: "margin-top:6px", h: "<b>Gentle pressure.</b> This area is reactive — start light and increase gradually." },
        { t: "em", h: "The upper trap and levator scap are the tension holders for stress, screen time, and overhead throwing. Releasing them allows the scapula to depress and rotate properly." }
      ]
    },
    {
      id: "rc-ball-rhomboid", title: "R-2g · Lacrosse Ball · Rhomboid / Mid-Trap", target: "Rhomboids · Mid Trapezius · Medial Scapular Border", reps: "60-90s / side", optional: true, youth: "adult",
      detail: [
        { t: "p", h: "Stand with your back to a wall. Place the ball between your spine and the inner edge of your shoulder blade, about halfway down. Cross the same-side arm across your chest to wing the scapula out (exposes the rhomboid). Lean in and breathe." },
        { t: "em", h: "The “knot between the shoulder blades” is almost always here. These muscles are eccentrically overloaded when pec minor pulls the scapula forward — releasing them AND stretching pec minor is the full fix." }
      ]
    },
    {
      id: "rc-teamstretch", title: "R-3 · The Stretch Circle", target: "Team Static Stretch · Post-Practice", reps: "8-10 min", optional: true, attrs: {"clip":"clips/jp1-teamstretch.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "The whole group on the grass after work, moving through a static stretch series together. Nothing exotic -- the value is that it is scheduled and nobody skips it." },
        { t: "em", h: "What a professional post-practice stretch actually looks like, which is far less elaborate than most people assume." }
      ]
    },
    {
      id: "rc-core-floor", title: "R-4 · Floor Core · Side Plank and Bridge", target: "Anti-Lateral-Flexion · Hip Extension", reps: "2-3 min", optional: true, attrs: {"clip":"clips/jp1-core-floor.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Side plank over a bolster, then bridge work with the feet elevated. Slow and controlled; this sits at the end of a session, not the start." },
        { t: "em", h: "Recovery-day core: enough to keep the trunk switched on without adding fatigue to a day meant for recovering." }
      ]
    },
    {
      id: "rc-eccentric", title: "R-5 · Eccentric Recovery", target: "Overcoming Eccentrics", reps: "Watch + do", optional: true, attrs: {"clip":"clips/bauer-recov-eccentric.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Eccentric recovery work -- the slow, controlled lowering phase that stimulates repair without adding concentric fatigue. Part of Bauer's post-throwing and post-bullpen protocols." },
        { t: "em", h: "The eccentric contraction is the phase your arm does most during deceleration. Recovering it specifically is how the arm stays elastic." }
      ]
    },
    {
      id: "rc-iso", title: "R-6 · Isometric Recovery", target: "Forearm Isometrics", reps: "Watch + do", optional: true, attrs: {"clip":"clips/bauer-recov-iso.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Isometric holds for the forearm and wrist -- no movement, just sustained contraction. Part of the post-bullpen routine alongside the eccentrics." },
        { t: "em", h: "Isometrics flush blood through the muscle without the impact of concentric reps. Recovery, not training." }
      ]
    },
    {
      id: "rc-cp-warmup", title: "R-7 · CP Warmup", target: "Cuff Weights · Pails/Rails", reps: "Watch", optional: true, attrs: {"clip":"clips/bauer-cp-warmup.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Controlled articular rotation warmup -- cuff weights, pails and rails. This is the bridge between general movement and throwing-specific activation." },
        { t: "em", h: "The warmup that sits between rolling/stretching and throwing. It activates the cuff in ranges of motion the throw will demand." }
      ]
    },
    {
      id: "rc-tube-overhead", title: "R-8 · Tube · Overhead", target: "Full Cuff · Overhead Position", reps: "10 sec", optional: true, attrs: {"clip":"clips/tube-overhead.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Overhead tube work for recovery-day shoulder maintenance. Same four planes as the warmup tube routine but at lower intensity for blood flow rather than activation." }
      ]
    },
    {
      id: "rc-tube-forward", title: "R-9 · Tube · Forward", target: "Anterior Cuff", reps: "10 sec", optional: true, attrs: {"clip":"clips/tube-forward.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Forward plane tube work. Arm straight out, shoulder height, shake forward-back. Recovery-day intensity." }
      ]
    },
    {
      id: "rc-tube-lateral", title: "R-10 · Tube · Lateral", target: "Lateral Deltoid · Supraspinatus", reps: "10 sec", optional: true, attrs: {"clip":"clips/tube-lateral.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Lateral plane tube work. Arm out to the side at shoulder height. Recovery-day intensity." }
      ]
    },
    {
      id: "rc-tube-throwing", title: "R-11 · Tube · Throwing Position", target: "Lay-Back Cuff", reps: "10 sec", optional: true, attrs: {"clip":"clips/tube-throwing.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Throwing-position tube work. Arm in the \"L\" cocking position. Sport-specific plane for recovery-day maintenance." }
      ]
    },
    {
      id: "rc-facepull1", title: "R-12 · Face Pull", target: "Posterior Delt · External Rotation", reps: "12-15 reps", optional: true, attrs: {"clip":"clips/jbj-facepull.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Band face pull targeting the posterior deltoid and external rotation. Pull to eye level with elbows high and out, squeezing the shoulder blades together at the top." },
        { t: "em", h: "The posterior chain (scap/back/tricep) is what decelerates the arm. Face pulls strengthen exactly that chain." }
      ]
    },
    {
      id: "rc-facepull2", title: "R-13 · Face Pull (Variation 2)", target: "External Rotation · High Pull", reps: "12-15 reps", optional: true, attrs: {"clip":"clips/jbj-facepull2.mp4"}, youth: "adult",
      detail: [
        { t: "p", h: "Second face pull variation with a different pull angle. Same posterior-chain target, different loading position to cover a wider range of the external rotation arc." }
      ]
    }
] });
BATTERY.register('arm.step-body', { section: "extras", bodies: [
    {
      id: "bi1", title: "01 · Single-Leg Toe Touch w/ Bar Assist", target: "Posterior Chain · Balance · Hip Hinge", reps: "3 × 8 each", youth: "safe",
      detail: [
        { t: "p", h: "Hold a light bar or PVC pipe in front of you for balance assist. Stand on one leg. Hinge at the hip — the free leg extends straight back, opposite hand reaches toward the planted foot. Light bar contact only — you're using it for proprioceptive feedback, not weight support." },
        { t: "em", h: "Builds the pitcher's single-leg landing position. NPB programs feature this heavily." }
      ]
    },
    {
      id: "bi2", title: "02 · Bodyweight Squat Series", target: "Quads · Glutes · Hip Mobility", reps: "3 × 12", youth: "safe",
      detail: [
        { t: "p", h: "Bodyweight squats, full depth, slow descent. Japanese pitcher programs often run these as a daily morning routine before any other work. 3 sets of 12, with 2-second descent, 1-second pause at bottom, controlled rise." },
        { t: "em", h: "NPB-style volume — the slow tempo is the point, not the load." }
      ]
    },
    {
      id: "bi3", title: "03 · Lateral Step-Overs", target: "Hip Mobility · Lateral Power", reps: "2 × 10 each side", youth: "safe",
      detail: [
        { t: "p", h: "Step sideways over a low hurdle or cone (~knee height), lifting the lead knee high. Plant softly, then bring the trailing leg over. Continue down a 15–20 ft path, then reverse." },
        { t: "em", h: "NPB / LMB training puts heavy emphasis on lateral mobility for fielding integration" }
      ]
    },
    {
      id: "bi4", title: "04 · Walking Lunges with Twist", target: "Hip Flexors · T-Spine · Balance", reps: "2 × 10 each side", youth: "safe",
      detail: [
        { t: "p", h: "Step forward into a lunge. Once stable in the bottom position, rotate the torso toward the front leg's side. Hold 1 second. Stand and switch legs." },
        { t: "em", h: "Combines hip mobility and thoracic rotation — the two areas most adult throwers lack" }
      ]
    },
    {
      id: "bi5", title: "05 · Catch-Play with Footwork Pattern", target: "Throw Pattern + Lower Body", reps: "10 throws", youth: "safe",
      detail: [
        { t: "p", h: "Standard catch-play, but every throw is preceded by a defined footwork sequence (drop step, crossover, shuffle). LMB pitcher conditioning integrates fielding-style movement into throwing prep." },
        { t: "em", h: "Bridges arm care into actual baseball movement — bonus for non-pitchers since it's literally what you do in a game" }
      ]
    }
] });
BATTERY.register('arm.step-body', { section: "lifting", bodies: [
    {
      id: "lift-row", title: "Standing Row · plate machine", target: "Lats · Rhomboids · Rear Delt", reps: "3 × 25", attrs: {"mg":"back","sub":"horizontal","eq":"machine"}, youth: "adult",
      detail: [
        { t: "p", h: "Chest tall, pull the handles to the ribs, squeeze the blades, slow return. Current working load ~45+35/side." },
        { t: "em", h: "The pull side of the pull-≥-push rule — never let press volume outgrow this." },
        { t: "em", h: "Short rest: 30–60 sec between sets (endurance/high-rep work)." }
      ]
    },
    {
      id: "lift-press", title: "Standing Press · plate machine", target: "Chest · Front Delt · Triceps", reps: "3 × 25", attrs: {"mg":"chest","sub":"mid","eq":"machine"}, youth: "adult",
      detail: [
        { t: "p", h: "Same machine, press away smooth — no bounce at the turnaround. Keep total press volume at or below row volume." },
        { t: "em", h: "Short rest: 30–60 sec between sets (endurance/high-rep work)." }
      ]
    },
    {
      id: "lift-curls", title: "Biceps Curls · Olympic curl bar", target: "Biceps · Grip", reps: "3 × ?", attrs: {"mg":"bis","sub":"short","eq":"bar"}, youth: "adult",
      detail: [
        { t: "p", h: "Curl strict — no hip swing, controlled eccentric. The curl bar angle eases wrist strain while loading the biceps and building grip strength (useful at 1B and at the plate)." },
        { t: "em", h: "Short rest: 30–60 sec between sets (hypertrophy range)." }
      ]
    },
    {
      id: "lift-triceps", title: "Triceps Extensions · Olympic curl bar", target: "Triceps", reps: "3 × ?", attrs: {"mg":"tris","sub":"lateral","eq":"bar"}, youth: "adult",
      detail: [
        { t: "p", h: "Controlled through the full range — lock the elbows at the top, stretch at the bottom. Smooth tempo, no bounce." },
        { t: "em", h: "Short rest: 30–60 sec between sets (hypertrophy range)." }
      ]
    },
    {
      id: "lift-qsq-power", title: "Quarter Squat · POWER day", target: "Drive-leg power @ pitching depth", reps: "3 × 4–6 heavy", attrs: {"mg":"legs","sub":"quad","eq":"bar"}, youth: "adult",
      detail: [
        { t: "p", h: "The reason to squat PARTIAL is to load the exact joint angle of the drive leg — heavy, low reps, move the bar with intent. That's the power adaptation partials are programmed for." },
        { t: "p", h: "<b>Warm-up ramp:</b> 2–5 progressive sets working from ~40% up to 70–80% of your working weight before the actual working sets. Primes the nervous system for full force output and measurably improves both strength and reps-at-load (NSCA)." },
        { t: "em", h: "If you're doing sets of 25, you're on the endurance card below — both are valid, know which one today is." },
        { t: "em", h: "Long rest: 2–5 min between working sets (power work)." }
      ]
    },
    {
      id: "lift-qsq-endur", title: "Quarter Squat · ENDURANCE day", target: "Leg endurance · current scheme", reps: "3 × 25", attrs: {"mg":"legs","sub":"quad","eq":"bar"}, youth: "adult",
      detail: [
        { t: "p", h: "Your current scheme (~2×45/side). High-rep partials train muscular endurance — fine for long field days, just a different effect than the power card above." },
        { t: "em", h: "Short rest: 30–60 sec between sets (endurance work)." }
      ]
    },
    {
      id: "lift-deadlift", title: "Deadlift", badge: {"text":"(READ THE NOTE)","style":"color:var(--blood);font-size:11px"}, target: "Posterior Chain · Hinge", reps: "3 × 3–8", attrs: {"clip":"clips/ru-gym-deadlift.mp4","mg":"back","sub":"hinge","eq":"bar"}, youth: "adult",
      detail: [
        { t: "p", h: "<b>Safety note — hinge lifts live at LOW reps.</b> Form degrades with fatigue exactly where spinal loading is least forgiving, which is why deadlifts are almost universally programmed at 3–8 reps. If a high-rep set (like 25) is a deliberate conditioning choice, <b>drop the weight substantially</b> and let form — not the number — end the set. The set is over the moment the lower back rounds." },
        { t: "p", h: "<b>Warm-up ramp:</b> 2–5 progressive sets from ~40% up to 70–80% of working weight. Prepares the nervous system for maximal force production and improves strength output (NSCA)." },
        { t: "em", h: "Loss-prevention applied to your own spine: control the exposure, not just the outcome." },
        { t: "em", h: "Long rest: 2–5 min between working sets (strength work)." }
      ]
    },
    {
      id: "lift-goblet", title: "Goblet / KB Squat", target: "Full-ROM legs · Trunk brace", reps: "3 × 10", attrs: {"mg":"legs","sub":"quad","eq":"db"}, youth: "adult",
      detail: [
        { t: "p", h: "Full range, bell at the chest. 3×10 or run the 12-10-8 pyramid. Back in the rotation — you flagged these as paused; this card is the resume button." }
      ]
    },
    {
      id: "lift-lunge", title: "Walking Lunges", target: "Single-leg strength · Balance", reps: "3 × 10 / leg", attrs: {"mg":"legs","sub":"glute","eq":"bw"}, youth: "adult",
      detail: [
        { t: "p", h: "Long controlled steps, torso tall. Single-leg work is the defense-and-baserunning carryover the bilateral lifts don't give you." }
      ]
    },
    {
      id: "lift-abs", title: "Ab Progression · flexion block", target: "Anterior Core", reps: "1–2 × 25 each", attrs: {"mg":"core","sub":"antiext","eq":"bw"}, youth: "adult",
      detail: [
        { t: "p", h: "Your ladder, now broken out below so each rung can be ticked and logged on its own: <b>Crunch (isometric hold)</b> → <b>Decline Bench Assisted Sit-Up</b> → <b>Side Crunch</b>, plus toe-touch-to-pushup walkouts. Tick this entry for the block as a whole; the individual rungs are bonus." },
        { t: "em", h: "Good base — but pair it with the rotational block below; flexion alone doesn't throw or swing." }
      ]
    },
    {
      id: "lift-crunch-iso", title: "Crunch · isometric hold", target: "Anterior Core · Time Under Tension", reps: "3 × 20–30 sec", optional: true, attrs: {"mg":"core","sub":"flexion","eq":"bw"}, youth: "adult",
      detail: [
        { t: "p", h: "Curl up until the shoulder blades clear the floor, then <b>stop and hold there</b> — do not rock. Ribs down, breathe shallow through the hold. Come down slowly rather than dropping." },
        { t: "em", h: "The hold is the point. A fast crunch is mostly hip flexor; holding the top keeps the load on the abs where you want it." }
      ]
    },
    {
      id: "lift-decline-situp", title: "Decline Bench Assisted Sit-Up", target: "Anterior Core · Full Range", reps: "3 × 10–15", optional: true, attrs: {"mg":"core","sub":"flexion","eq":"bench"}, youth: "adult",
      detail: [
        { t: "p", h: "Feet hooked on a decline bench. <b>Assisted</b> means you use a light pull on the bench or a partner’s hand to get through the sticking point — the goal is full range with control, not a rep grind. Lower under control for a slow count." },
        { t: "em", h: "The decline adds range the floor cannot. Assistance is what keeps that range honest instead of turning it into a hip-flexor yank." }
      ]
    },
    {
      id: "lift-side-crunch", title: "Side Crunch", target: "Obliques · Lateral Flexion", reps: "3 × 15 / side", optional: true, attrs: {"mg":"core","sub":"lateral","eq":"bw"}, youth: "adult",
      detail: [
        { t: "p", h: "On the elbow, on a bench or the floor, hips stacked. Crunch the ribcage <b>toward the hip on the same side</b> — a short range, not a big swing. Same reps both sides even if one feels easier." },
        { t: "em", h: "Throwers get lopsided. Doing both sides to the WEAK side’s number is what keeps this from widening the gap." }
      ]
    },
    {
      id: "lift-side-plank-dip", title: "Side Plank Hip Dip", target: "Lateral Chain · Anti-Lateral-Flexion", reps: "3 × 10–12 / side", optional: true, attrs: {"mg":"core","sub":"lateral","eq":"bw"}, youth: "adult",
      detail: [
        { t: "p", h: "Side plank on the elbow, body in one line. Lower the hip toward the floor under control, then drive it back up to the line and a touch past. Shoulder stacked over the elbow throughout." },
        { t: "em", h: "The side plank alone is a hold; the dip makes it a lift. This is the one genuinely NEW movement here — the rest were already prescribed in text." }
      ]
    },
    {
      id: "lift-rotcore", title: "🔥 Rotational Core", badge: {"text":"(NEW — highest transfer)","style":"color:var(--gold);font-size:11px"}, target: "Hip/Trunk Rotation Speed", reps: "3 × 8–10 / side", attrs: {"mg":"core","sub":"antirot","eq":"band"}, youth: "adult",
      detail: [
        { t: "p", h: "Pick one per session: <b>med-ball rotational throws</b> (into a wall, hips lead), <b>wood-choppers</b> (band or cable, high-to-low and low-to-high), or <b>standing rotational twists</b>. Explosive out, controlled back." },
        { t: "em", h: "Pitching velocity and bat speed are rotation — this is the one thing the routine was missing for BOTH of your top goals." }
      ]
    },
    {
      id: "lift-db-bench", title: "DB Floor Press", target: "Chest · Front Delt · Tris", reps: "3 × 8-12", attrs: {"mg":"chest","sub":"mid","eq":"db"}, youth: "adult",
      detail: [
        { t: "p", h: "Lie on the floor, dumbbells. Lower until your upper arms rest on the floor (elbows ~90°), pause a beat, then press up — don't lock hard at the top." },
        { t: "em", h: "No bench on purpose. The floor stops your elbows before the shoulder is dragged into deep extension, and your shoulder blades stay free instead of pinned flat — a flat bench trains the anterior tilt a thrower is fighting. Same pressing strength without that cost. No bench, no rack; DBs let each side work on its own." }
      ]
    },
    {
      id: "lift-db-incline", title: "DB Incline Press", target: "Upper Chest", reps: "3 × 10", attrs: {"mg":"chest","sub":"upper","eq":"db"}, youth: "adult",
      detail: [
        { t: "p", h: "Bench at ~30°. Higher than that and it becomes a shoulder press." }
      ]
    },
    {
      id: "lift-cable-fly", title: "Cable / Band Fly", target: "Chest · Stretch under load", reps: "3 × 12-15", attrs: {"mg":"chest","sub":"fly","eq":"cable"}, youth: "adult",
      detail: [
        { t: "p", h: "Slight elbow bend, hands meet in front. Squeeze, slow return — the stretch is the point, not the load." }
      ]
    },
    {
      id: "lift-pushup", title: "Push-Ups", target: "Chest · Core", reps: "3 × max-2", attrs: {"mg":"chest","sub":"mid","eq":"bw"}, youth: "adult",
      detail: [
        { t: "p", h: "Anywhere, no equipment. Stop 2 reps short of failure so it does not cost you the next lift." }
      ]
    },
    {
      id: "lift-db-row", title: "Single-Arm DB Row", target: "Lat · Mid-Back", reps: "3 × 10 / side", attrs: {"mg":"back","sub":"horizontal","eq":"db"}, youth: "adult",
      detail: [
        { t: "p", h: "Hand and knee on the bench, flat back. Pull the elbow past the ribs, do not twist the torso to cheat it up." },
        { t: "em", h: "Pull volume ≥ push volume for throwers — this is the easiest one to add anywhere." }
      ]
    },
    {
      id: "lift-pulldown", title: "Lat Pulldown", target: "Lat · Teres", reps: "3 × 10-12", attrs: {"mg":"back","sub":"vertical","eq":"cable"}, youth: "adult",
      detail: [
        { t: "p", h: "Chest tall, drive the elbows down and back. If there is no pulldown, a band anchored high works." }
      ]
    },
    {
      id: "lift-facepull", title: "Face Pull", target: "Rear Delt · External Rotators", reps: "3 × 15", attrs: {"mg":"back","sub":"upper","eq":"cable"}, youth: "adult",
      detail: [
        { t: "p", h: "Rope or band at face height. Elbows high, rotate the hands back at the end." },
        { t: "em", h: "The single best shoulder-health accessory for a thrower. Do it even on light days." }
      ]
    },
    {
      id: "lift-db-press", title: "DB Shoulder Press", target: "Delts · Tris", reps: "3 × 8-12", attrs: {"mg":"shoulders","sub":"front","eq":"db"}, youth: "adult",
      detail: [
        { t: "p", h: "Seated or standing. Do not arch the low back to finish a rep — drop the weight instead." }
      ]
    },
    {
      id: "lift-lat-raise", title: "Lateral Raise", target: "Side Delt", reps: "3 × 12-15", attrs: {"mg":"shoulders","sub":"lateral","eq":"db"}, youth: "adult",
      detail: [
        { t: "p", h: "Light. Lead with the elbows, stop at shoulder height. This is a small muscle; ego here shows up as neck tension." }
      ]
    },
    {
      id: "lift-rear-fly", title: "Rear-Delt Fly", target: "Rear Delt", reps: "3 × 15", attrs: {"mg":"shoulders","sub":"rear","eq":"db"}, youth: "adult",
      detail: [
        { t: "p", h: "Hinge forward, thumbs down, wide arc. Balances every pressing motion and every throw." }
      ]
    },
    {
      id: "lift-hammer", title: "Hammer Curl", target: "Biceps · Brachialis · Forearm", reps: "3 × 10-12", attrs: {"mg":"bis","sub":"brach","eq":"db"}, youth: "adult",
      detail: [
        { t: "p", h: "Neutral grip, no swing. Grip carryover matters at 1B and at the plate." }
      ]
    },
    {
      id: "lift-incline-curl", title: "Incline DB Curl", target: "Biceps (long head)", reps: "3 × 10", attrs: {"mg":"bis","sub":"long","eq":"db"}, youth: "adult",
      detail: [
        { t: "p", h: "Bench at 45°, arms hanging back. The stretched position is what makes this different from a standing curl." }
      ]
    },
    {
      id: "lift-pushdown", title: "Cable / Band Pushdown", target: "Triceps", reps: "3 × 12-15", attrs: {"mg":"tris","sub":"lateral","eq":"cable"}, youth: "adult",
      detail: [
        { t: "p", h: "Elbows pinned to the ribs. Only the forearm moves." }
      ]
    },
    {
      id: "lift-oh-ext", title: "Overhead DB Extension", target: "Triceps (long head)", reps: "3 × 10-12", attrs: {"mg":"tris","sub":"long","eq":"db"}, youth: "adult",
      detail: [
        { t: "p", h: "One DB, both hands, elbows close to the ears. The overhead angle is what hits the long head." }
      ]
    },
    {
      id: "lift-bench-dip", title: "Bench Dip", target: "Triceps", reps: "3 × 12", attrs: {"mg":"tris","sub":"press","eq":"bw"}, youth: "adult",
      detail: [
        { t: "p", h: "Hands on a bench behind you. Keep the shoulders down and back — if the front of the shoulder pinches, stop." }
      ]
    },
    {
      id: "lift-smith-squat", title: "Smith Squat", target: "Quads · Glutes", reps: "3 × 8-10", attrs: {"mg":"legs","sub":"quad","eq":"smith"}, youth: "adult",
      detail: [
        { t: "p", h: "When there is no real rack. Feet slightly forward, controlled depth." },
        { t: "em", h: "Hotel-gym substitute for the barbell squat — the Smith is usually the only squatting option on the road." }
      ]
    },
    {
      id: "lift-db-rdl", title: "DB Romanian Deadlift", target: "Hamstrings · Glutes", reps: "3 × 10", attrs: {"mg":"legs","sub":"ham","eq":"db"}, youth: "adult",
      detail: [
        { t: "p", h: "Hinge at the hips, soft knees, DBs close to the legs. Stop where the low back would round." }
      ]
    },
    {
      id: "lift-step-up", title: "Step-Up", target: "Single-Leg · Balance", reps: "3 × 10 / side", attrs: {"mg":"legs","sub":"glute","eq":"db"}, youth: "adult",
      detail: [
        { t: "p", h: "Bench or box at knee height. Drive through the whole foot, control the way down." }
      ]
    },
    {
      id: "lift-calf", title: "Calf Raise", target: "Calves · Ankle Stiffness", reps: "3 × 15-20", attrs: {"mg":"legs","sub":"calf","eq":"bw"}, youth: "adult",
      detail: [
        { t: "p", h: "Any step. Full stretch at the bottom, pause at the top. Ankle stiffness feeds the drive leg." }
      ]
    },
    {
      id: "lift-machine-incline", title: "Incline Press · machine or Smith", target: "Upper Chest · Front Delt", reps: "3 × 8-12", attrs: {"mg":"chest","sub":"upper","eq":"machine"}, youth: "adult",
      detail: [
        { t: "p", h: "Bench set around 30 degrees. Any hotel Smith machine or plate-loaded incline works. Elbows about 45 degrees from the ribs, not flared to 90." },
        { t: "em", h: "Second upper-chest option so the incline sub-group is not one exercise deep." }
      ]
    },
    {
      id: "lift-pec-deck", title: "Pec Deck · or banded fly", target: "Chest · Stretch Position", reps: "3 × 12-15", attrs: {"mg":"chest","sub":"fly","eq":"machine"}, youth: "adult",
      detail: [
        { t: "p", h: "Machine if the gym has one, otherwise a band anchored behind you at chest height. Slow on the way out, feel the stretch, no bounce." },
        { t: "em", h: "Fly work at a fixed path -- useful on a day the shoulder is cranky and pressing is not appealing." }
      ]
    },
    {
      id: "lift-pullup", title: "Pull-Up · assisted or band", target: "Lats · Vertical Pull", reps: "3 × max-2", attrs: {"mg":"back","sub":"vertical","eq":"bw"}, youth: "adult",
      detail: [
        { t: "p", h: "Any bar. Assisted machine or a band under the knee if needed. Full hang at the bottom, chin over the bar at the top. Stop two reps before failure." },
        { t: "em", h: "The vertical-pull anchor. Pulldown is the substitute, not the other way around." }
      ]
    },
    {
      id: "lift-cable-row", title: "Seated Cable Row", target: "Mid-Back · Horizontal Pull", reps: "3 × 10-12", attrs: {"mg":"back","sub":"horizontal","eq":"cable"}, youth: "adult",
      detail: [
        { t: "p", h: "Chest tall, pull to the belly, elbows past the ribs. Let the shoulder blades travel forward at the front -- that stretch is the point." },
        { t: "em", h: "Keep total pull volume at or above total press volume. That ratio protects a throwing shoulder." }
      ]
    },
    {
      id: "lift-shrug", title: "DB Shrug", target: "Upper Traps", reps: "3 × 12-15", attrs: {"mg":"back","sub":"upper","eq":"db"}, youth: "adult",
      detail: [
        { t: "p", h: "Straight up, not rolled. Pause a beat at the top. Heavy is fine here." },
        { t: "em", h: "Upper traps hold the shoulder blade where the cuff can work from. Undertrained in throwers who only do face pulls." }
      ]
    },
    {
      id: "lift-back-ext", title: "Back Extension · bench or floor", target: "Spinal Erectors · Posterior Chain", reps: "3 × 12-15", attrs: {"mg":"back","sub":"hinge","eq":"bw"}, youth: "adult",
      detail: [
        { t: "p", h: "Roman chair if there is one, otherwise a hip hinge over a bench or a floor superman. Squeeze the glutes at the top, do not hyperextend the low back." },
        { t: "em", h: "Hinge option that costs the nervous system far less than a deadlift -- use it in season." }
      ]
    },
    {
      id: "lift-farmer-walk", title: "Farmer Walk · loaded carry", target: "Upper Traps · Full Posterior Chain", reps: "3 × 40-60s", attrs: {"mg":"back","sub":"carry","eq":"db"}, youth: "adult",
      detail: [
        { t: "p", h: "Heavy dumbbells or trap bar. Walk with shoulders packed down, chest up, core braced. Grip will limit before traps do — that is fine." },
        { t: "em", h: "Loads the entire superficial back line from feet to skull under sustained tension. The only exercise that trains the fascial chain as one continuous unit — nothing else does this." }
      ]
    },
    {
      id: "lift-dead-hang", title: "Dead Hang", target: "Scapular Fascia · Lat · Decompression", reps: "3 × 20-30s", attrs: {"mg":"back","sub":"decompress","eq":"bw"}, youth: "adult",
      detail: [
        { t: "p", h: "Full hang, relaxed shoulders, let gravity stretch. Active variant: shrug up and release slowly (scapular pull-ups). Build to 45-60s holds." },
        { t: "em", h: "Decompresses the arm lines under gravity — the opposite of loaded carries. Both sides of the fascial tension system need work." }
      ]
    },
    {
      id: "lift-pull-apart", title: "Band Pull-Apart", target: "Mid Traps · Rear Delts · Rhomboids", reps: "3 × 15-20", attrs: {"mg":"back","sub":"upper","eq":"band"}, youth: "adult",
      detail: [
        { t: "p", h: "Light band at arm's length, pull hands apart until band touches chest. Squeeze shoulder blades together. Can also do overhead variant for lower traps." },
        { t: "btn", fn: "openClip", arg: "pullapart-demo.mp4", style: "margin-top:7px", h: "▶ Watch demo" },
        { t: "em", h: "Free-standing horizontal pull — different from the anchored J-Band Reverse Fly. Higher rep, lower load, perfect for daily scapular health between throwing sessions." }
      ]
    },
    {
      id: "lift-front-raise", title: "DB Front Raise", target: "Front Delt", reps: "2 × 12-15", attrs: {"mg":"shoulders","sub":"front","eq":"db"}, youth: "adult",
      detail: [
        { t: "p", h: "To eye level, thumbs slightly up, no swing. Light. Two sets is enough given how much front delt pressing already gives you." },
        { t: "em", h: "Deliberately low volume: the front delt is the most over-trained head on a pressing program." }
      ]
    },
    {
      id: "lift-cable-lat", title: "Cable Lateral Raise", target: "Side Delt · constant tension", reps: "3 × 12-15", attrs: {"mg":"shoulders","sub":"lateral","eq":"cable"}, youth: "adult",
      detail: [
        { t: "p", h: "Cable from the low pin, or a band under the foot. Lead with the elbow. The cable keeps tension at the bottom where a dumbbell has none." },
        { t: "em", h: "Second side-delt option and the better of the two if a cable is available." }
      ]
    },
    {
      id: "lift-rev-pec", title: "Reverse Pec Deck · or bent-over rear fly", target: "Rear Delt", reps: "3 × 15-20", attrs: {"mg":"shoulders","sub":"rear","eq":"machine"}, youth: "adult",
      detail: [
        { t: "p", h: "Machine reversed, or bent over with light dumbbells. High reps, no momentum. The rear delt responds to reps, not load." },
        { t: "em", h: "Rear delt plus face pull is the pairing that keeps a throwing shoulder square." }
      ]
    },
    {
      id: "lift-cable-curl", title: "Cable Curl · arm behind the body", target: "Biceps Long Head", reps: "3 × 10-12", attrs: {"mg":"bis","sub":"long","eq":"cable"}, youth: "adult",
      detail: [
        { t: "p", h: "Cable from a low pin, step forward so the elbow sits slightly BEHIND the torso. That position puts the long head on stretch through the whole rep." },
        { t: "em", h: "Same job as the incline curl with constant tension. Pick whichever the gym allows that day." }
      ]
    },
    {
      id: "lift-preacher", title: "Preacher Curl · machine or bench", target: "Biceps Short Head", reps: "3 × 10-12", attrs: {"mg":"bis","sub":"short","eq":"machine"}, youth: "adult",
      detail: [
        { t: "p", h: "Elbow supported and slightly in FRONT of the torso. Full extension at the bottom -- do not cut the rep short to keep the weight moving." },
        { t: "em", h: "Front-of-body elbow position biases the short head, the opposite of the cable curl above." }
      ]
    },
    {
      id: "lift-rev-curl", title: "Reverse Curl", target: "Brachialis · Forearm Extensors", reps: "3 × 12-15", attrs: {"mg":"bis","sub":"brach","eq":"db"}, youth: "adult",
      detail: [
        { t: "p", h: "Palms down, light, strict. Pairs with the wrist work on the Warm Up page." },
        { t: "em", h: "Forearm strength is not vanity for an infielder -- it is what absorbs a bad hop." }
      ]
    },
    {
      id: "lift-rope-oh", title: "Overhead Rope Extension", target: "Triceps Long Head", reps: "3 × 12-15", attrs: {"mg":"tris","sub":"long","eq":"cable"}, youth: "adult",
      detail: [
        { t: "p", h: "Cable overhead, elbows pointing forward and held still. Deep stretch at the bottom. The long head only gets loaded with the arm overhead." },
        { t: "em", h: "A pushdown does not train this head in a stretched position. This one does." }
      ]
    },
    {
      id: "lift-kickback", title: "DB Kickback · or single-arm cable", target: "Triceps Lateral Head", reps: "2 × 15", attrs: {"mg":"tris","sub":"lateral","eq":"db"}, youth: "adult",
      detail: [
        { t: "p", h: "Upper arm parallel to the floor and locked there, extend from the elbow only. Very light." },
        { t: "em", h: "Low-cost finisher. Skip it if the pushdown already left the arms cooked." }
      ]
    },
    {
      id: "lift-cgbp", title: "Close-Grip Press · DB or Smith", target: "Triceps · Chest", reps: "3 × 8-12", attrs: {"mg":"tris","sub":"press","eq":"db"}, youth: "adult",
      detail: [
        { t: "p", h: "Hands just inside shoulder width, elbows tucked to the ribs. The heaviest triceps work available without a dip station." },
        { t: "em", h: "Compound option so the triceps sub-group is not all isolation." }
      ]
    },
    {
      id: "lift-leg-ext", title: "Leg Extension", target: "Quad · Knee Health", reps: "3 × 12-15", attrs: {"mg":"legs","sub":"quad","eq":"machine"}, youth: "adult",
      detail: [
        { t: "p", h: "Slow, pause at the top. Nothing else on this list loads the quad at short muscle length." },
        { t: "em", h: "Useful for knee tendon tolerance on a day squatting is not on." }
      ]
    },
    {
      id: "lift-leg-curl", title: "Leg Curl · seated or lying", target: "Hamstring · Knee Flexion", reps: "3 × 10-12", attrs: {"mg":"legs","sub":"ham","eq":"machine"}, youth: "adult",
      detail: [
        { t: "p", h: "Machine if available, otherwise a slider or towel curl on a smooth floor. Control the lowering." },
        { t: "em", h: "The RDL trains the hamstring at the hip. This trains it at the knee. Both, not either." }
      ]
    },
    {
      id: "lift-hip-thrust", title: "DB Hip Thrust", target: "Glutes · Hip Extension", reps: "3 × 10-12", attrs: {"mg":"legs","sub":"glute","eq":"db"}, youth: "adult",
      detail: [
        { t: "p", h: "Shoulders on a bench, dumbbell across the hips on a pad or towel. Squeeze hard at the top and hold a beat, ribs down." },
        { t: "em", h: "Hip extension power is the base of the drive leg. Cheapest strength-per-set on the page." }
      ]
    },
    {
      id: "lift-seated-calf", title: "Seated Calf Raise", target: "Soleus", reps: "3 × 15-20", attrs: {"mg":"legs","sub":"calf","eq":"machine"}, youth: "adult",
      detail: [
        { t: "p", h: "Seated with the knee bent, which is what shifts the work from the gastroc to the soleus. Machine, or a dumbbell on the knee." },
        { t: "em", h: "The standing raise misses the soleus almost entirely. Bent knee is the whole trick." }
      ]
    },
    {
      id: "lift-deadbug", title: "Dead Bug", target: "Anti-Extension · Rib Position", reps: "3 × 8 each side", attrs: {"mg":"core","sub":"antiext","eq":"bw"}, youth: "adult",
      detail: [
        { t: "p", h: "On the back, low back pressed flat and kept there. Extend the opposite arm and leg slowly. The moment the back arches, the set is over." },
        { t: "em", h: "Teaches the rib position everything else on this page depends on." }
      ]
    },
    {
      id: "lift-pallof", title: "Pallof Press", target: "Anti-Rotation", reps: "3 × 10 each side", attrs: {"mg":"core","sub":"antirot","eq":"cable"}, youth: "adult",
      detail: [
        { t: "p", h: "Cable or band at chest height from the side. Press straight out and resist the pull toward the anchor. Do not let the ribs turn." },
        { t: "em", h: "Rotation power is built by RESISTING rotation first. This is the drill that transfers to a throw." }
      ]
    }
] });
