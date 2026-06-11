#!/usr/bin/env bash
# Regression test for the claim-vs-artifact cross-check (self-review Phase 2.5f).
# Synthetic fixture reproduces: (a) a primary re-designated at manuscript stage,
# (b) an E-value (2.79) that does not recompute from its stated primary HR 1.34,
# (c) a correctly-arithmetic E-value attached to a non-primary (cancer) estimate.
# Stdlib-only (python3).
set -u

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPT="$HERE/../scripts/check_claim_artifact.py"
MAN="$HERE/fixtures/claim_manuscript.md"
PRE="$HERE/fixtures/claim_prereg.md"
OUT="$(mktemp -t ca_XXXX).json"
trap 'rm -f "$OUT"' EXIT

fail=0
check() { local label="$1"; shift
    if "$@" >/dev/null 2>&1; then printf '  PASS  %s\n' "$label"
    else printf '  FAIL  %s\n' "$label"; fail=$((fail+1)); fi
}
has_verdict() { python3 -c "
import json,sys
d=json.load(open('$OUT'))
assert any(c['verdict']=='$1' for c in d['claims']), '$1 not found'
"; }

[[ -f "$SCRIPT" ]] || { echo "ENV-ERR: script missing" >&2; exit 2; }

python3 "$SCRIPT" --manuscript "$MAN" --prereg "$PRE" --out "$OUT" --strict >/dev/null 2>&1
check "exit 1 under --strict (Major present)" test "$?" -eq 1
check "JSON artifact written" test -s "$OUT"
check "PRIMARY_REASSIGNED detected"  has_verdict PRIMARY_REASSIGNED
check "EVALUE_ARITHMETIC detected (2.79 vs HR 1.34)" has_verdict EVALUE_ARITHMETIC
check "EVALUE_NON_PRIMARY detected (cancer sHR)"     has_verdict EVALUE_NON_PRIMARY

# Clean case: primary matches prereg, correct primary E-value, no reassignment.
CLEAN="$(mktemp -t ca_clean_XXXX).md"
trap 'rm -f "$OUT" "$CLEAN"' EXIT
cat > "$CLEAN" <<'EOF'
## Methods
The primary analysis was the association between emphysema and all-cause mortality
in the complete-case multivariable Cox model.
## Results
The E-value for the primary association (HR 1.34) was 2.02.
EOF
python3 "$SCRIPT" --manuscript "$CLEAN" --prereg "$PRE" --strict >/dev/null 2>&1
check "exit 0 on clean manuscript (matching primary, correct E-value)" test "$?" -eq 0

echo "fail=$fail"; [[ "$fail" -eq 0 ]] && echo "ALL PASS" || echo "FAILURES: $fail"
exit "$fail"
