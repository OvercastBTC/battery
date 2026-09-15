// SRCDOC / SRC INTEGRITY GATE  (static — no browser, runs in milliseconds)
//
// Handles both build shapes:
//   MONOLITH: index.html with srcdoc="..." iframes — checks for stray double quotes
//   SPLIT:    index.html with src="arm.html" / src="fuel.html" — checks files exist and are plausible
import fs from 'node:fs'; import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const APP  = process.env.BATTERY_APP || path.join(HERE, 'app-fixed.html');

let pass = true;
const log = (ok, m) => { pass = pass && ok; console.log(`  ${ok?'✓':'✗'} ${m}`); };

// ENCODING check (same for both shapes)
const raw = fs.readFileSync(APP);
const bom =
  raw[0] === 0xFF && raw[1] === 0xFE ? 'UTF-16LE' :
  raw[0] === 0xFE && raw[1] === 0xFF ? 'UTF-16BE' :
  raw[0] === 0xEF && raw[1] === 0xBB && raw[2] === 0xBF ? 'UTF-8 with BOM' : null;
log(bom === null,
    bom === null ? 'encoding: plain UTF-8, no BOM'
                 : `encoding: file is ${bom} — rewrite it as UTF-8`);
if (bom !== null) { console.log('\nSRCDOC INTEGRITY: FAIL'); process.exit(1); }

const src = fs.readFileSync(APP, 'utf8');

// Detect build shape
const isSplit = (src.includes('src="arm.html"') || src.includes("src='arm.html")) &&
                (src.includes('src="fuel.html"') || src.includes("src='fuel.html"));
const isMonolith = src.includes('srcdoc="');

if (isSplit) {
  console.log('  [split build detected — checking src= iframes]');
  const appDir = path.dirname(APP);
  for (const [id, file] of [['f-arm', 'arm.html'], ['f-fuel', 'fuel.html']]) {
    const iframeTag = src.includes(`id="${id}"`);
    log(iframeTag, `${id}: iframe tag present`);

    const srcAttr = src.includes(`src="${file}"`) || src.includes(`src='${file}`);
    log(srcAttr, `${id}: references ${file}`);

    const filePath = path.join(appDir, file);
    const exists = fs.existsSync(filePath);
    log(exists, `${id}: ${file} exists alongside index.html`);
    if (!exists) continue;

    const content = fs.readFileSync(filePath, 'utf8');
    log(content.trimStart().startsWith('<!DOCTYPE') || content.trimStart().startsWith('<!doctype'),
      `${id}: ${file} starts with DOCTYPE`);
    log(content.length > 100000,
      `${id}: ${file} is a plausible full document (${content.length} chars)`);

    // Check encoding of the iframe file too
    const fRaw = fs.readFileSync(filePath);
    const fBom =
      fRaw[0] === 0xFF && fRaw[1] === 0xFE ? 'UTF-16LE' :
      fRaw[0] === 0xFE && fRaw[1] === 0xFF ? 'UTF-16BE' :
      fRaw[0] === 0xEF && fRaw[1] === 0xBB && fRaw[2] === 0xBF ? 'UTF-8 with BOM' : null;
    log(fBom === null,
        `${id}: ${file} encoding is plain UTF-8` +
        (fBom === null ? '' : ` — file is ${fBom}, rewrite it`));
  }
} else if (isMonolith) {
  console.log('  [monolith build detected — checking srcdoc iframes]');
  for (const id of ['f-arm', 'f-fuel']) {
    const open = src.indexOf(`<iframe id="${id}"`);
    log(open !== -1, `${id}: iframe present`);
    if (open === -1) continue;

    const sd = src.indexOf('srcdoc="', open);
    log(sd !== -1 && sd < src.indexOf('</iframe>', open), `${id}: has a srcdoc attribute`);
    if (sd === -1) continue;

    const bodyStart = sd + 'srcdoc="'.length;
    const close = src.indexOf('"', bodyStart);
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
} else {
  log(false, 'neither srcdoc= nor src="arm.html" found — unrecognized build shape');
}

console.log('  ----------------------------------------------');
console.log(pass ? '  PASS — iframe integrity verified.'
                 : '  FAIL — integrity check failed (see ✗ above).');
process.exit(pass ? 0 : 1);
