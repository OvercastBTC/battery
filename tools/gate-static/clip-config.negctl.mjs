// NEGATIVE CONTROL for clip-config.test.mjs
//
// clip-config passes against the real build, and a test that has only ever passed
// is not evidence — it might be passing because its precondition is false, because
// it located nothing, or because a regex matched nothing and an empty set trivially
// satisfies "every element is valid". This file mutates a copy of the app once per
// assertion and requires each mutation to turn the suite RED, naming the right
// failure. A mutation that stays green means that assertion is inert.
//
// Run:  node clip-config.negctl.mjs
import fs from 'node:fs'; import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const HERE = path.dirname(fileURLToPath(import.meta.url));

// This defaulted to app-fixed.html beside itself, which was correct while it lived
// in ~/battery-tests (run.sh stages that file there) and broke the moment it moved
// into the repo, where no such file exists. Default to the repo's own index.html --
// the thing anyone running this from a checkout actually means -- and keep the env
// override for the staged-build case.
const APP  = process.env.BATTERY_APP || path.join(HERE, '..', '..', 'index.html');
if (!fs.existsSync(APP)) {
  console.error(`clip-config.negctl: no build to mutate at ${APP}`);
  console.error('  pass one with BATTERY_APP=/path/to/index.html');
  process.exit(2);
}
const BASE = fs.readFileSync(APP, 'utf8');

// Write the mutated copy beside the SUITE, not beside the app: the app may live in
// a checkout we should not litter, and clip-config.test.mjs is what reads it back.
const TMP  = path.join(HERE, 'app-negctl.html');

// Insert a CLIP_EMBED table so the forward-looking assertions can be exercised
// before Lane M has shipped one. This is the only way to prove they work at all.
const withEmbed = (rows) =>
  BASE.replace('  var OFFICIAL_DEMOS=[', `  var CLIP_EMBED=[\n${rows}\n  ];\n  var OFFICIAL_DEMOS=[`);

const CASES = [
  ['table rename is caught, not skipped',
   s => s.replace('var CLIP_SOURCE=[', 'var CLIP_SOURCES=['),
   'table located'],

  // 'fw-' IS a true string-prefix of the existing 'fw-1b-', so this makes that row
  // unreachable. An earlier draft used 'gi-' before 'gi1-', which reads like the
  // same thing but is not one ('gi1-' never has a dash in third position) — it
  // stayed green and exposed the assertion as inert. Kept as a comment because the
  // distinction is exactly what makes this bug class easy to miss by eye.
  ['a shorter prefix placed before a longer one it extends',
   s => s.replace("    ['fw-1b-',", "    ['fw-', 'Bogus', 'https://example.com/x'],\n    ['fw-1b-',"),
   'shadows'],

  ['a duplicate prefix',
   s => s.replace("    ['gi1-',", "    ['wash-', 'Dupe', 'https://example.com/x'],\n    ['gi1-',"),
   'duplicate prefixes'],

  ['a non-https URL',
   s => s.replace("'https://youtu.be/4Xm_WZrLGEY'", "'http://youtu.be/4Xm_WZrLGEY'"),
   'well-formed https URL'],

  ['a prefix that does not end in a dash',
   s => s.replace("['wash-',    'Ron Washington", "['wash',    'Ron Washington"),
   "ends in '-'"],

  ['a row with the wrong arity',
   s => s.replace("    ['plyo-',", "    ['zz-', 'https://example.com/x'],\n    ['plyo-',"),
   '3-tuple'],

  ['a clip referenced in markup with no matching credit prefix',
   s => s.replace("openClip('jbj-overhead.mp4')", "openClip('nosuchprefix-x.mp4')"),
   'uncredited'],

  // Both authoring machines have case-insensitive filesystems, so this mutation
  // resolves fine locally and 404s only on the case-sensitive deploy host. That is
  // precisely why it needs a gate rather than a convention.
  ['an uppercase clip filename (404s only on the deploy host)',
   s => s.replace("openClip('jbj-overhead.mp4')", "openClip('jbj-Overhead.MP4')"),
   'lowercase'],

  // ---- forward-looking: the embed-timestamp assertions --------------------
  ['CLIP_EMBED with start >= end  (THE PROMISED ASSERTION)',
   () => withEmbed("    ['jbj-overhead', 'MeNseDHe5gc', 120, 95]"),
   'start < end'],

  ['CLIP_EMBED with start === end',
   () => withEmbed("    ['jbj-overhead', 'MeNseDHe5gc', 95, 95]"),
   'start < end'],

  ['CLIP_EMBED with a full URL pasted into the id slot',
   () => withEmbed("    ['jbj-overhead', 'https://youtu.be/MeNseDHe5gc', 10, 40]"),
   'well-formed 11-char video ID'],

  ['CLIP_EMBED with a non-numeric start',
   () => withEmbed("    ['jbj-overhead', 'MeNseDHe5gc', '1:35', 40]"),
   'finite numbers'],

  ['CLIP_EMBED with duplicate keys',
   () => withEmbed("    ['jbj-overhead', 'MeNseDHe5gc', 10, 40],\n    ['jbj-overhead', 'VIDd2yMSSnY', 5, 9]"),
   'duplicate keys'],
];

// The positive control matters as much as the negatives: if a well-formed
// CLIP_EMBED also went red, the assertions would be rejecting valid config and
// every red above would be meaningless.
const POSITIVE = ['a well-formed CLIP_EMBED still PASSES',
  () => withEmbed("    ['jbj-overhead', 'MeNseDHe5gc', 10, 40],\n    ['jbj-er-hip', 'VIDd2yMSSnY', 61, 88]")];

function run() {
  try {
    const out = execFileSync(process.execPath, [path.join(HERE, 'clip-config.test.mjs')],
      { env: { ...process.env, CLIP_CONFIG_APP: TMP }, encoding: 'utf8' });
    return { red: false, out };
  } catch (e) {
    return { red: true, out: (e.stdout || '') + (e.stderr || '') };
  }
}

let ok = true;
console.log('NEGATIVE CONTROL — each mutation must turn clip-config RED\n');

for (const [name, mutate, expect] of CASES) {
  fs.writeFileSync(TMP, mutate(BASE));
  const { red, out } = run();
  const named = out.includes(expect);
  const good = red && named;
  ok = ok && good;
  console.log(`  ${good ? '✓' : '✗'} ${name}`);
  if (!red)   console.log(`      STAYED GREEN — this assertion is inert`);
  else if (!named) {
    console.log(`      went red, but not for "${expect}" — it may be failing for the wrong reason`);
    console.log(out.split('\n').filter(l => l.includes('✗')).map(l => '      ' + l.trim()).join('\n'));
  }
}

fs.writeFileSync(TMP, POSITIVE[1](BASE));
{
  const { red, out } = run();
  const good = !red;
  ok = ok && good;
  console.log(`  ${good ? '✓' : '✗'} ${POSITIVE[0]}`);
  if (red) console.log(out.split('\n').filter(l => l.includes('✗')).map(l => '      ' + l.trim()).join('\n'));
}

fs.unlinkSync(TMP);
console.log(ok ? '\nNEGATIVE CONTROL: PASS — every assertion can fail'
               : '\nNEGATIVE CONTROL: FAIL — at least one assertion cannot fail');
process.exit(ok ? 0 : 1);
