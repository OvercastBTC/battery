---
description: Run the full BATTERY release gate (node --check host script + 11-test Playwright suite) against the current index.html and report PASS/FAIL with a READY/BLOCKED verdict.
---

Run the full BATTERY release gate against the current index.html.

1. Run node --check on the host script block (last <script> in index.html):

```bash
python3 -c "
import re
import subprocess; root=subprocess.check_output(['git','rev-parse','--show-toplevel']).decode().strip(); src = open(root+'/index.html').read()
scripts = re.findall(r'<script[^>]*>(.*?)</script>', src, re.DOTALL)
open('/tmp/battery_host_script.js', 'w').write(scripts[-1])
print(f'Extracted {len(scripts[-1])} chars')
"
node --check /tmp/battery_host_script.js && echo "HOST SCRIPT: PASS" || echo "HOST SCRIPT: FAIL"
```

2. Run the full 11-test Playwright gate (authoritative — this is the only check that catches srcdoc footgun truncation):

```bash
BATTERY_REPO=$(git rev-parse --show-toplevel) bash ~/battery-tests/run.sh
```

3. Summarize results: list each of the 11 test names with PASS or FAIL, report the node --check result, and print a final line: "GATE: X/11 tests passed — [READY TO RELEASE | BLOCKED]". If any test failed, name the failing test(s) and paste the relevant error output.

Note: node --check does NOT catch srcdoc issues (HTML decoding masks them). Only the Playwright gate is authoritative for iframe content.
