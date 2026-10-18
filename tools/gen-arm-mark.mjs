// ONE-TIME MIGRATION (rewrite Stage-2, v259): put a gen:arm-region marker pair around each of the 25 step-bearing page regions of arm.html.
// A region = ONE direct child element of a .page that contains steps. After this runs, tools/gen-arm.mjs owns the text BETWEEN each pair
// (see that file); everything outside the pairs stays hand-edited.  Usage:  node tools/gen-arm-mark.mjs [arm.html]   (idempotent: refuses if markers already exist)
// Needs only node builtins (no browser, no deps): a small tolerant tag scanner over the well-formed hand-written source.
import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const RAW = new Set(['script', 'style', 'textarea', 'title']);

// Scan the element that opens at src[openAt] (a '<div ...>' page). Returns { end, children:[{start,end,tag}] } for its DIRECT element children.
export function scanElement(src, openAt) {
  let i = openAt, depth = 0; const children = []; let cur = null; let pageEnd = -1;
  while (i < src.length) {
    if (src[i] !== '<') { i++; continue; }
    if (src.startsWith('<!--', i)) { const e = src.indexOf('-->', i + 4); if (e < 0) throw new Error('unterminated comment @' + i); i = e + 3; continue; }
    const c1 = src[i + 1];
    if (c1 === '!' || c1 === '?') { const e = src.indexOf('>', i); i = e + 1; continue; }
    const closing = c1 === '/';
    if (!closing && !/[A-Za-z]/.test(c1 || '')) { i++; continue; }          // a bare '<' in text
    if (closing && !/[A-Za-z]/.test(src[i + 2] || '')) { i++; continue; }
    // read the tag name
    let j = i + (closing ? 2 : 1), name = ''; while (j < src.length && /[A-Za-z0-9-]/.test(src[j])) name += src[j++];
    name = name.toLowerCase();
    // find the end of the tag, respecting quoted attribute values (onclick="..>.." etc.)
    let q = null, k = j; while (k < src.length) { const ch = src[k]; if (q) { if (ch === q) q = null; } else if (ch === '"' || ch === "'") q = ch; else if (ch === '>') break; k++; }
    const tagEnd = k + 1, selfClose = src[k - 1] === '/';
    if (closing) {
      depth--;
      if (depth === 1 && cur) { cur.end = tagEnd; children.push(cur); cur = null; }
      if (depth === 0) { pageEnd = tagEnd; break; }
      i = tagEnd; continue;
    }
    if (VOID.has(name) || selfClose) {
      if (depth === 1) children.push({ start: i, end: tagEnd, tag: name });
      i = tagEnd; continue;
    }
    if (RAW.has(name)) {
      const e = src.toLowerCase().indexOf('</' + name, tagEnd); const e2 = src.indexOf('>', e);
      if (depth === 1) children.push({ start: i, end: e2 + 1, tag: name });
      i = e2 + 1; continue;
    }
    if (depth === 1) cur = { start: i, end: -1, tag: name };
    depth++; i = tagEnd;
  }
  if (pageEnd < 0) throw new Error('page element never closed');
  return { end: pageEnd, children };
}

export const START = (id) => `<!-- gen:arm-region ${id} -->`;
export const END = (id) => `<!-- /gen:arm-region ${id} -->`;

export function pages(src) {
  const out = []; const re = /<div class="page(?: [^"]*)?" id="page-([a-z0-9-]+)">/g; let m;
  while ((m = re.exec(src))) { const sc = scanElement(src, m.index); out.push({ page: m[1], at: m.index, ...sc }); re.lastIndex = m.index + 1; }
  return out;
}
const hasStep = (s) => /<li class="step[ "][^>]*data-ex=/.test(s);

export function markRegions(src) {
  if (/gen:arm-region/.test(src)) throw new Error('arm.html already carries gen:arm-region markers');
  const edits = [], seen = [];
  for (const p of pages(src)) {
    p.children.forEach((ch, idx) => {
      const text = src.slice(ch.start, ch.end);
      if (!hasStep(text)) return;
      const id = `${p.page}#${idx}`; seen.push(id);
      // the marker lines carry the child's own indentation (the generator re-indents its output to match)
      const ls = src.lastIndexOf('\n', ch.start - 1) + 1, indent = /^[ \t]*$/.test(src.slice(ls, ch.start)) ? src.slice(ls, ch.start) : '';
      edits.push({ at: ls, ins: indent + START(id) + '\n' }, { at: ch.end, ins: '\n' + indent + END(id) });
    });
  }
  edits.sort((a, b) => b.at - a.at);
  let out = src; for (const e of edits) out = out.slice(0, e.at) + e.ins + out.slice(e.at);
  return { out, ids: seen };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isMain) {
  const file = path.resolve(process.argv[2] || 'arm.html'); const src = fs.readFileSync(file, 'utf8');
  const { out, ids } = markRegions(src); fs.writeFileSync(file, out);
  console.log(`marked ${ids.length} regions in ${path.basename(file)}: ${ids.join(' ')}`);
}
