"""claims_ledger.py — public advisors' checkable claims tracked to outcomes.

Claude extracts falsifiable claims from a transcript/newsletter into a claims
JSON file; this script persists them into a JSONL ledger (one JSON object per
line) and walks each row through a small status machine:

    open ──check()──▶ expired ──adjudicate()──▶ confirmed | refuted
      └──────────────adjudicate()─────────────▶ confirmed | refuted

`check` is the ONLY automatic transition (open→expired once window.end has
passed). Rows recorded with status "excluded" (unfalsifiable claims, kept
with their exclusion_reason instead of being silently dropped) are terminal:
they never expire and cannot be adjudicated.

Row schema:
    {id, recorded, source, claim, window: {start, end} | null,
     mechanism, confidence, status, adjudicated?, note?, exclusion_reason?}
`id` = sha1(claim, window)[:10], so re-recording the same claims is
idempotent and adjudication has a stable address. `confidence` is a
grounding tier: explicit-dated | implied-window | undated. A null window
(open-undated row) never auto-expires.

CLI: record --claims-json C.json | check [--as-of D] | adjudicate --id X
--status confirmed|refuted [--note ...] | list | scorecard [--source A];
all take --ledger L.jsonl. Stdlib only; Python 3.9+.
"""
from __future__ import annotations

import calendar
import hashlib
import json
import re
import sys
from collections import Counter
from datetime import date, datetime
from pathlib import Path

STATUSES = ("open", "expired", "confirmed", "refuted", "excluded")
ADJUDICATED_STATUSES = ("confirmed", "refuted")
CONFIDENCE_TIERS = ("explicit-dated", "implied-window", "undated")


# ── row construction ─────────────────────────────────────────────────────────


def make_id(claim: str, window: dict | None) -> str:
    """sha1 over (claim, window.start, window.end), 10 hex chars. Recorded
    date and source deliberately excluded — same claim+window → same id."""
    start = (window or {}).get("start") or ""
    end = (window or {}).get("end") or ""
    raw = "{}\x1f{}\x1f{}".format(claim, start, end).encode("utf-8")
    return hashlib.sha1(raw).hexdigest()[:10]


def _iso_date(d) -> str:
    if isinstance(d, str):
        return d
    return (d.date() if isinstance(d, datetime) else d).isoformat()


_FULL_DATE_RE = re.compile(r"\b(20\d{2})-(\d{2})-(\d{2})\b")
_YEAR_MONTH_RE = re.compile(r"\b(20\d{2})-(\d{2})\b")
_YEAR_RANGE_RE = re.compile(r"\b(20\d{2})\s*[–—-]\s*(20\d{2})\b")
_YEAR_RE = re.compile(r"\b(20\d{2})\b")


def extract_window(text: str) -> dict | None:
    """Date window from the claim's own text. Patterns in priority order,
    each match blanked out so a date never counts twice: YYYY-MM-DD → that
    day; YYYY-MM → that month; 20XX–20YY → the pair's envelope; bare 20XX →
    the whole-year envelope. Multiple hits → earliest start, latest end.
    No parseable date → None (the row stays open-undated)."""
    s = text or ""
    intervals: list = []

    def _consume(regex, to_interval):
        nonlocal s

        def repl(m):
            try:
                intervals.append(to_interval(m))
            except ValueError:        # e.g. month 13 — leave it unconsumed
                return m.group(0)
            return " " * len(m.group(0))

        s = regex.sub(repl, s)

    _consume(_FULL_DATE_RE,
             lambda m: (date(int(m[1]), int(m[2]), int(m[3])),) * 2)
    _consume(_YEAR_MONTH_RE, lambda m: (
        date(int(m[1]), int(m[2]), 1),
        date(int(m[1]), int(m[2]),
             calendar.monthrange(int(m[1]), int(m[2]))[1])))
    _consume(_YEAR_RANGE_RE,
             lambda m: (date(int(m[1]), 1, 1), date(int(m[2]), 12, 31)))
    _consume(_YEAR_RE,
             lambda m: (date(int(m[1]), 1, 1), date(int(m[1]), 12, 31)))
    if not intervals:
        return None
    return {"start": min(i[0] for i in intervals).isoformat(),
            "end": max(i[1] for i in intervals).isoformat()}


def entries_from_claims(claims: list, default_source: str | None = None,
                        recorded=None) -> list[dict]:
    """Ledger rows from extracted-claims JSON: a list of {claim, source,
    mechanism, confidence, window?} objects, plus {claim, source, status:
    "excluded", exclusion_reason} for unfalsifiable claims. An explicit
    window wins; otherwise it is parsed from the claim text."""
    rows: list[dict] = []
    for i, c in enumerate(claims):
        if not isinstance(c, dict):
            raise ValueError(f"claims[{i}]: expected an object")
        claim = str(c.get("claim") or "").strip()
        if not claim:
            raise ValueError(f"claims[{i}]: 'claim' is required and non-empty")
        excluded = c.get("status") == "excluded"
        reason = str(c.get("exclusion_reason") or "").strip()
        if excluded and not reason:
            raise ValueError(
                f"claims[{i}]: status 'excluded' requires 'exclusion_reason'")
        window = c.get("window")
        if window is not None:
            if not (isinstance(window, dict)
                    and window.get("start") and window.get("end")):
                raise ValueError(f"claims[{i}]: 'window' must be "
                                 f"{{start, end}} ISO dates, or omitted")
            window = {"start": window["start"], "end": window["end"]}
        else:
            window = extract_window(claim)
        confidence = c.get("confidence")
        if not excluded and confidence not in CONFIDENCE_TIERS:
            raise ValueError(f"claims[{i}]: 'confidence' must be one of "
                             f"{CONFIDENCE_TIERS}, got {confidence!r}")
        row = {"id": make_id(claim, window),
               "recorded": _iso_date(recorded) if recorded
               else date.today().isoformat(),
               "source": c.get("source") or default_source or "unknown",
               "claim": claim, "window": window,
               "mechanism": c.get("mechanism") or "",
               "confidence": confidence,
               "status": "excluded" if excluded else "open"}
        if excluded:
            row["exclusion_reason"] = reason
        rows.append(row)
    return rows


# ── ledger I/O ───────────────────────────────────────────────────────────────


def read_ledger(ledger_path) -> list[dict]:
    """All rows in file order; [] when the ledger doesn't exist yet. Corrupt
    lines are skipped with a warning, never fatal."""
    path = Path(ledger_path)
    if not path.is_file():
        return []
    rows = []
    for i, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        if not line.strip():
            continue
        try:
            rows.append(json.loads(line))
        except json.JSONDecodeError:
            print(f"warning: skipping corrupt ledger line {i} in {path}",
                  file=sys.stderr)
    return rows


def write_ledger(ledger_path, rows: list[dict]) -> None:
    """Full rewrite — used by check/adjudicate. record only appends."""
    Path(ledger_path).write_text(
        "".join(json.dumps(r, ensure_ascii=False) + "\n" for r in rows),
        encoding="utf-8")


def append_entries(ledger_path, entries: list[dict]) -> tuple:
    """Append rows whose id is not already in the ledger (or earlier in this
    batch). Returns (appended, skipped) — re-recording is a no-op."""
    seen = {r.get("id") for r in read_ledger(ledger_path)}
    added = skipped = 0
    with open(ledger_path, "a", encoding="utf-8") as fh:
        for row in entries:
            if row["id"] in seen:
                skipped += 1
                continue
            fh.write(json.dumps(row, ensure_ascii=False) + "\n")
            seen.add(row["id"])
            added += 1
    return added, skipped


# ── status machine ───────────────────────────────────────────────────────────


def _as_date(d) -> date:
    if isinstance(d, str):
        return datetime.fromisoformat(d).date()
    return d.date() if isinstance(d, datetime) else d


def check(rows: list[dict], as_of=None) -> dict:
    """The ONLY automatic transition: open → expired for rows whose
    window.end < as_of (default today). Mutates rows in place; undated rows
    stay open forever; verdicts and excluded rows are untouched. Returns
    {"newly_expired", "expired_pending"} — the latter is every row now
    awaiting adjudication, including previously expired ones."""
    when = _as_date(as_of) if as_of is not None else date.today()
    newly: list[dict] = []
    for r in rows:
        end = (r.get("window") or {}).get("end")
        if r.get("status") == "open" and end \
                and datetime.fromisoformat(end).date() < when:
            r["status"] = "expired"
            newly.append(r)
    return {"newly_expired": newly,
            "expired_pending": [r for r in rows
                                if r.get("status") == "expired"]}


def adjudicate(rows: list[dict], row_id: str, status: str,
               note: str | None = None, when=None) -> dict:
    """Verdict on one row: confirmed/refuted only (ValueError otherwise);
    unknown id raises KeyError; excluded rows raise ValueError. Sets
    `adjudicated` and `note` (put the outcome source URL here). Works on
    open AND expired rows — confirming early is allowed."""
    if status not in ADJUDICATED_STATUSES:
        raise ValueError(f"adjudicated status must be one of "
                         f"{ADJUDICATED_STATUSES}, got {status!r}")
    for r in rows:
        if r.get("id") != row_id:
            continue
        if r.get("status") == "excluded":
            raise ValueError(f"row {row_id!r} is excluded "
                             f"({r.get('exclusion_reason')}) — not a "
                             f"prediction, cannot adjudicate")
        r["status"] = status
        r["adjudicated"] = _iso_date(when) if when else date.today().isoformat()
        if note:
            r["note"] = note
        return r
    raise KeyError(f"no ledger row with id {row_id!r}")


# ── scorecard ────────────────────────────────────────────────────────────────


def _hit_rate(confirmed: int, refuted: int) -> str:
    total = confirmed + refuted
    return f"{100.0 * confirmed / total:.0f}% ({confirmed}/{total})" \
        if total else "n/a"


def _window_text(r: dict) -> str:
    w = r.get("window")
    return f"window {w['start']}→{w['end']}" if w else "undated"


def scorecard_markdown(rows: list[dict], source: str | None = None,
                       as_of=None) -> str:
    """Markdown scorecard for one advisor (or the whole ledger): status
    counts, hit rate among adjudicated rows = confirmed/(confirmed+refuted),
    per-confidence-tier breakdown, expired rows pending adjudication, oldest
    open claims, excluded list. Excluded rows never count toward hit rate."""
    when = _as_date(as_of) if as_of is not None else date.today()
    if source:
        rows = [r for r in rows if r.get("source") == source]
    counts = Counter(r.get("status") for r in rows)
    confirmed, refuted = counts.get("confirmed", 0), counts.get("refuted", 0)
    out = [f"# Claim scorecard — {source or 'all sources'}", "",
           f"_Generated {when.isoformat()} · {len(rows)} ledger row(s)_", "",
           "## Status", "", "| Status | Count |", "|---|---|"]
    out += [f"| {s} | {counts.get(s, 0)} |" for s in STATUSES]
    out += ["", "## Hit rate", "",
            f"Adjudicated: {confirmed + refuted} (confirmed {confirmed}, "
            f"refuted {refuted}) — **hit rate {_hit_rate(confirmed, refuted)}**.",
            "Excluded rows are not predictions and never count toward the "
            "hit rate.", "",
            "## By confidence tier", "",
            "| Tier | Total | Open | Expired | Confirmed | Refuted | Hit rate |",
            "|---|---|---|---|---|---|---|"]
    scored = [r for r in rows if r.get("status") != "excluded"]
    for tier in CONFIDENCE_TIERS:
        c = Counter(r.get("status") for r in scored
                    if r.get("confidence") == tier)
        out.append(f"| {tier} | {sum(c.values())} | {c.get('open', 0)} "
                   f"| {c.get('expired', 0)} | {c.get('confirmed', 0)} "
                   f"| {c.get('refuted', 0)} "
                   f"| {_hit_rate(c.get('confirmed', 0), c.get('refuted', 0))} |")
    pending = [r for r in rows if r.get("status") == "expired"]
    if pending:
        out += ["", "## Expired — pending adjudication", ""]
        out += [f"- `{r['id']}` {_window_text(r)} — {r['claim']}"
                for r in pending]
    open_rows = sorted((r for r in rows if r.get("status") == "open"),
                       key=lambda r: (r.get("recorded") or "", r.get("id")))
    if open_rows:
        out += ["", "## Oldest open claims", ""]
        out += [f"- `{r['id']}` recorded {r.get('recorded')}, "
                f"{_window_text(r)} — {r['claim']}" for r in open_rows[:5]]
    excl = [r for r in rows if r.get("status") == "excluded"]
    if excl:
        out += ["", "## Excluded (not falsifiable)", ""]
        out += [f"- {r['claim']} — _{r.get('exclusion_reason')}_" for r in excl]
    return "\n".join(out) + "\n"


# ── CLI ──────────────────────────────────────────────────────────────────────


def _print_rows(rows: list[dict]) -> None:
    for r in rows:
        w = r.get("window")
        wtxt = f"{w['start'][:10]}→{w['end'][:10]}" if w else "undated"
        print(f"{r['id']}  {r['status']:<9}  {wtxt:<23}  "
              f"{r.get('source', '?'):<16}  {r['claim'][:90]}")


def main() -> None:
    import argparse

    ap = argparse.ArgumentParser(
        description="Advisor claims ledger: record falsifiable claims, "
                    "expire them past their window, adjudicate outcomes, "
                    "render scorecards")
    sub = ap.add_subparsers(dest="command", required=True)

    rec = sub.add_parser("record", help="persist extracted claims JSON into "
                         "the ledger (dedupes by id; idempotent)")
    rec.add_argument("--claims-json", required=True,
                     help="JSON file: list of {claim, source, mechanism, "
                          "confidence, window?} (+ excluded rows)")
    rec.add_argument("--source", default=None,
                     help="default source for claims that omit one")

    chk = sub.add_parser("check", help="expire open rows whose window has "
                         "passed; print rows pending adjudication")
    chk.add_argument("--as-of", default=None, help="YYYY-MM-DD (default today)")

    adj = sub.add_parser("adjudicate", help="record the verdict on one row")
    adj.add_argument("--id", required=True)
    adj.add_argument("--status", required=True,
                     choices=list(ADJUDICATED_STATUSES))
    adj.add_argument("--note", default=None,
                     help="verdict basis incl. the outcome source URL")

    lst = sub.add_parser("list", help="print ledger rows")
    lst.add_argument("--status", default=None, choices=list(STATUSES))
    lst.add_argument("--source", default=None)

    sc = sub.add_parser("scorecard",
                        help="render a markdown scorecard to stdout")
    sc.add_argument("--source", default=None, help="restrict to one advisor")

    for p in (rec, chk, adj, lst, sc):
        p.add_argument("--ledger", required=True, help="ledger .jsonl path")
    for p in (rec, chk, adj, lst):
        p.add_argument("--json", action="store_true")

    args = ap.parse_args()

    if args.command == "record":
        path = Path(args.claims_json)
        claims = json.loads(path.read_text(encoding="utf-8"))
        if not isinstance(claims, list):
            ap.error(f"{path}: expected a JSON list of claim objects")
        try:
            entries = entries_from_claims(claims, default_source=args.source)
        except ValueError as exc:
            ap.error(str(exc))
            return
        appended, skipped = append_entries(args.ledger, entries)
        if args.json:
            print(json.dumps({"entries": entries, "appended": appended,
                              "skipped_duplicates": skipped},
                             ensure_ascii=False, indent=2))
        else:
            _print_rows(entries)
            print(f"# {len(entries)} row(s) from {path.name}; appended "
                  f"{appended} (skipped {skipped} duplicates)")

    elif args.command == "check":
        rows = read_ledger(args.ledger)
        result = check(rows, as_of=args.as_of)
        if result["newly_expired"]:
            write_ledger(args.ledger, rows)
        if args.json:
            print(json.dumps(result, ensure_ascii=False, indent=2))
        else:
            print(f"# {len(result['newly_expired'])} newly expired; "
                  f"{len(result['expired_pending'])} pending adjudication")
            _print_rows(result["expired_pending"])

    elif args.command == "adjudicate":
        rows = read_ledger(args.ledger)
        try:
            row = adjudicate(rows, args.id, args.status, note=args.note)
        except (KeyError, ValueError) as exc:
            ap.error(str(exc))
            return
        write_ledger(args.ledger, rows)
        print(json.dumps(row, ensure_ascii=False, indent=2) if args.json
              else f"{row['id']} -> {row['status']} ({row['claim'][:80]})")

    elif args.command == "list":
        rows = read_ledger(args.ledger)
        if args.status:
            rows = [r for r in rows if r.get("status") == args.status]
        if args.source:
            rows = [r for r in rows if r.get("source") == args.source]
        if args.json:
            print(json.dumps(rows, ensure_ascii=False, indent=2))
        else:
            _print_rows(rows)
            print(f"# {len(rows)} row(s)")

    elif args.command == "scorecard":
        print(scorecard_markdown(read_ledger(args.ledger),
                                 source=args.source), end="")


if __name__ == "__main__":
    main()
