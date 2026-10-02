Run the full BATTERY release gate against the current worktree.

## Steps

1. **Detect lane** — determine which lane worktree we're in:
   - `~/battery-laneA` → Lane A
   - `~/battery-laneE` → Lane E
   - `~/battery-laneM` → Lane M

2. **Run the Playwright gate** (36 suites):

```bash
BATTERY_REPO="$(pwd)" bash ~/battery-tests/run.sh
```

3. **Report result**:
   - If ALL 36 suites pass → `GATE: PASS (36/36) — READY`
   - If any suite fails → `GATE: FAIL (N/36) — BLOCKED` with failure details

## Notes

- The test suite lives at `C:\Users\bacona\battery-tests`
- Tests run against `index.html`, `arm.html`, and `fuel.html` in the target repo
- `run.sh` handles MSYS2 path conversion on AM06
- Lane A runs the gate for validation; only Lane E runs it as part of the release pipeline
- Do NOT skip or work around failing tests
