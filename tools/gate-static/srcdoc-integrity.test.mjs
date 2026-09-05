// SRCDOC INTEGRITY GATE  (static — no browser, runs in milliseconds)
//
// CLAUDE.md §3 calls this the project's worst footgun and it is not an exaggeration:
// a single literal double quote anywhere inside srcdoc="..." terminates the attribute
// early and silently discards the REST OF THE IFRAME. No console error. No exception.
// `node --check` passes, because what is left is still valid HTML — just truncated.
//
// It is not a theoretical hazard for people who know about it. It was hit TWICE in
// one week by someone actively thinking about it, both times inside a CODE COMMENT:
//   - the word day in quotes, in a comment about UTC day boundaries
//   - a quoted phrase in a comment about a reviewer's doubt
// Both destroyed the entire ARM iframe. Both surfaced only as an unrelated-looking
// "X is not defined" from a behavioural test several minutes later.
//
// Every other suite catches this only indirectly and only by accident of what it
// happens to touch. This asserts it directly, first, and in milliseconds — so the
// failure names the actual cause instead of a downstream symptom.
import fs from 'node:fs'; import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
// BATTERY_APP lets one runner point both static suites at a build. Lane M gates
// its own index.html writes with it directly, no staging step and no npm install.
const APP  = process.env.BATTERY_APP || path.join(HERE, 'app-fixed.html');

let pass = true;
const log = (ok, m) => { pass = pass && ok; console.log(`  ${ok?'✓':'✗'} ${m}`); };

// ENCODING, checked before anything else, because every assertion below is a string
// search and a re-encoded file makes all of them fail at once while naming nothing.
// Windows PowerShell 5.1 writes UTF-16LE-with-BOM by default for `>` and Set-Content,
// so a single `... > index.html` on Lane M silently converts the whole file. The
// symptom would be "f-arm: iframe present ✗" — which reads like the iframe was
// deleted, sending you to look at markup that is perfectly fine.
const raw = fs.readFileSync(APP);
const bom =
  raw[0] === 0xFF && raw[1] === 0xFE ? 'UTF-16LE' :
  raw[0] === 0xFE && raw[1] === 0xFF ? 'UTF-16BE' :
  raw[0] === 0xEF && raw[1] === 0xBB && raw[2] === 0xBF ? 'UTF-8 with BOM' : null;
log(bom === null,
    bom === null ? 'encoding: plain UTF-8, no BOM'
                 : `encoding: file is ${bom} — rewrite it as UTF-8 (PowerShell 5.1's ` +
                   `default redirect does this; use Git Bash, or Set-Content -Encoding utf8)`);
if (bom !== null) { console.log('\nSRCDOC INTEGRITY: FAIL'); process.exit(1); }

const src = fs.readFileSync(APP, 'utf8');

for (const id of ['f-arm', 'f-fuel']) {
  const open = src.indexOf(`<iframe id="${id}"`);
  log(open !== -1, `${id}: iframe present`);
  if (open === -1) continue;

  const sd = src.indexOf('srcdoc="', open);
  log(sd !== -1 && sd < src.indexOf('</iframe>', open), `${id}: has a srcdoc attribute`);
  if (sd === -1) continue;

  const bodyStart = sd + 'srcdoc="'.length;
  const close = src.indexOf('"', bodyStart);

  // THE CHECK: the first double quote after srcdoc=" must be the one that CLOSES it.
  // If the document is intact that character is followed by "></iframe>". If a stray
  // quote truncated it, the terminator lands mid-content and this fails, naming the
  // offending text so the fix is obvious.
  const after = src.slice(close, close + 12);
  const intact = after.startsWith('">');
  log(intact,
    `${id}: srcdoc closes at its real terminator (${close - bodyStart} chars)` +
    (intact ? '' : ` — TRUNCATED. First stray quote is here: …${
      src.slice(Math.max(0, close - 70), close + 1).replace(/\n/g, ' ')}`));

  if (intact) {
    const body = src.slice(bodyStart, close);
    log(!body.includes('"'),
      `${id}: body contains no literal double quote (use &quot;, including in COMMENTS)`);
    log(body.length > 100000,
      `${id}: body is a plausible full document, not a stub (${body.length} chars)`);
  }
}

// Both iframes must survive. A truncated ARM leaves FUEL parseable, so checking one
// proves nothing about the other.
console.log('  ----------------------------------------------');
console.log(pass ? '  PASS — both srcdoc documents are whole.'
                 : '  FAIL — a srcdoc iframe is truncated (see ✗ above).');
process.exit(pass ? 0 : 1);
