"""Tests for claims_ledger.py — run with `python3 -m pytest scripts/ -q`."""
import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parent))

import claims_ledger as cl


# ── window parsing ───────────────────────────────────────────────────────────


def test_window_full_date():
    assert cl.extract_window("CPI comes in above 4% on 2026-03-12") == \
        {"start": "2026-03-12", "end": "2026-03-12"}


def test_window_year_month():
    assert cl.extract_window("Bitcoin tops in 2026-09") == \
        {"start": "2026-09-01", "end": "2026-09-30"}


def test_window_bare_year_envelope():
    assert cl.extract_window("Nifty hits 30k in 2026") == \
        {"start": "2026-01-01", "end": "2026-12-31"}


def test_window_year_range():
    assert cl.extract_window("US recession between 2025–2027") == \
        {"start": "2025-01-01", "end": "2027-12-31"}


def test_window_multiple_hits_envelope():
    assert cl.extract_window("rally starts 2025-06, resolves by 2026-03-31") \
        == {"start": "2025-06-01", "end": "2026-03-31"}


def test_window_unparseable_is_none():
    assert cl.extract_window("gold will eventually go up") is None


def test_window_invalid_month_not_consumed():
    # 2026-13 is not a month; the bare-year fallback still sees 2026
    assert cl.extract_window("see section 2026-13") == \
        {"start": "2026-01-01", "end": "2026-12-31"}


# ── make_id ──────────────────────────────────────────────────────────────────


def test_make_id_stable_and_distinct():
    w = {"start": "2026-01-01", "end": "2026-12-31"}
    a = cl.make_id("Nifty hits 30k", w)
    assert a == cl.make_id("Nifty hits 30k", w)
    assert len(a) == 10 and int(a, 16) >= 0
    assert a != cl.make_id("Nifty hits 30k", None)        # window-sensitive
    assert a != cl.make_id("Nifty hits 31k", w)           # claim-sensitive


# ── record / idempotency ─────────────────────────────────────────────────────

CLAIMS = [
    {"claim": "Nifty closes above 30000 in 2026", "source": "advisor-a",
     "mechanism": "\"earnings upgrade cycle is intact\"",
     "confidence": "implied-window"},
    {"claim": "Fed cuts rates at the 2024-12 meeting", "source": "advisor-a",
     "mechanism": "\"inflation is already below trend\"",
     "confidence": "explicit-dated"},
    {"claim": "Gold is the only honest asset", "source": "advisor-a",
     "status": "excluded",
     "exclusion_reason": "no checkable outcome or window"},
]


def test_record_idempotent(tmp_path):
    ledger = tmp_path / "ledger.jsonl"
    a1, s1 = cl.append_entries(ledger, cl.entries_from_claims(CLAIMS))
    assert (a1, s1) == (3, 0)
    a2, s2 = cl.append_entries(ledger, cl.entries_from_claims(CLAIMS))
    assert (a2, s2) == (0, 3)                  # re-record appends nothing
    assert len(cl.read_ledger(ledger)) == 3


def test_corrupt_line_tolerated(tmp_path):
    ledger = tmp_path / "ledger.jsonl"
    cl.append_entries(ledger, cl.entries_from_claims(CLAIMS[:1]))
    with open(ledger, "a", encoding="utf-8") as fh:
        fh.write("{this line is not json\n")
    a, s = cl.append_entries(ledger, cl.entries_from_claims(CLAIMS[1:2]))
    assert (a, s) == (1, 0)
    assert len(cl.read_ledger(ledger)) == 2    # corrupt line skipped, not fatal


def test_explicit_window_beats_text_parse():
    rows = cl.entries_from_claims([
        {"claim": "oil spikes within six months", "source": "a",
         "mechanism": "m", "confidence": "implied-window",
         "window": {"start": "2026-06-01", "end": "2026-12-01"}}])
    assert rows[0]["window"] == {"start": "2026-06-01", "end": "2026-12-01"}


def test_invalid_confidence_rejected():
    with pytest.raises(ValueError):
        cl.entries_from_claims([{"claim": "x in 2026", "source": "a",
                                 "mechanism": "m", "confidence": "high"}])


# ── status machine ───────────────────────────────────────────────────────────


def _machine_rows():
    return cl.entries_from_claims([
        {"claim": "Fed cuts rates at the 2024-12 meeting", "source": "a",
         "mechanism": "m", "confidence": "explicit-dated"},
        {"claim": "gold keeps shining", "source": "a",
         "mechanism": "m", "confidence": "undated"},
    ])


def test_check_expires_only_past_window():
    rows = _machine_rows()
    res = cl.check(rows, as_of="2026-06-12")
    assert [r["id"] for r in res["newly_expired"]] == [rows[0]["id"]]
    assert rows[0]["status"] == "expired"
    assert rows[1]["status"] == "open"         # undated never expires


def test_adjudicate_is_terminal():
    rows = _machine_rows()
    cl.check(rows, as_of="2026-06-12")
    row = cl.adjudicate(rows, rows[0]["id"], "refuted",
                        note="held at 4.25-4.50% — https://example.com/fomc")
    assert row["status"] == "refuted"
    assert row["note"].endswith("https://example.com/fomc")
    assert row["adjudicated"]
    res = cl.check(rows, as_of="2030-01-01")   # check never touches verdicts
    assert rows[0]["status"] == "refuted"
    assert res["newly_expired"] == [] and res["expired_pending"] == []


def test_adjudicate_open_row_early_allowed():
    rows = _machine_rows()
    assert cl.adjudicate(rows, rows[1]["id"], "confirmed")["status"] \
        == "confirmed"


def test_adjudicate_rejects_bad_status_and_unknown_id():
    rows = _machine_rows()
    with pytest.raises(ValueError):
        cl.adjudicate(rows, rows[0]["id"], "expired")
    with pytest.raises(KeyError):
        cl.adjudicate(rows, "deadbeef00", "confirmed")


# ── excluded claims ──────────────────────────────────────────────────────────


def test_excluded_requires_reason():
    with pytest.raises(ValueError):
        cl.entries_from_claims([{"claim": "crypto is the future",
                                 "source": "a", "status": "excluded"}])


def test_excluded_recorded_terminal_and_unscored():
    rows = cl.entries_from_claims(CLAIMS)
    excl = [r for r in rows if r["status"] == "excluded"]
    assert len(excl) == 1
    assert excl[0]["exclusion_reason"] == "no checkable outcome or window"
    cl.check(rows, as_of="2030-01-01")
    assert excl[0]["status"] == "excluded"     # never expires
    with pytest.raises(ValueError):
        cl.adjudicate(rows, excl[0]["id"], "confirmed")


# ── scorecard ────────────────────────────────────────────────────────────────


def _scored_rows():
    rows = cl.entries_from_claims([
        {"claim": "A happens by 2024-06-30", "source": "advisor-a",
         "mechanism": "m", "confidence": "explicit-dated"},
        {"claim": "B happens by 2024-09-30", "source": "advisor-a",
         "mechanism": "m", "confidence": "explicit-dated"},
        {"claim": "C happens in 2024", "source": "advisor-a",
         "mechanism": "m", "confidence": "implied-window"},
        {"claim": "D happens in 2026", "source": "advisor-a",
         "mechanism": "m", "confidence": "implied-window"},
        {"claim": "E is inevitable", "source": "advisor-a",
         "status": "excluded", "exclusion_reason": "no window"},
        {"claim": "Z happens by 2024-01-31", "source": "advisor-b",
         "mechanism": "m", "confidence": "explicit-dated"},
    ], recorded="2024-01-01")
    cl.check(rows, as_of="2026-06-12")
    cl.adjudicate(rows, rows[0]["id"], "confirmed", note="u1")
    cl.adjudicate(rows, rows[1]["id"], "confirmed", note="u2")
    cl.adjudicate(rows, rows[2]["id"], "refuted", note="u3")
    return rows


def test_scorecard_hit_rate_and_source_filter():
    md = cl.scorecard_markdown(_scored_rows(), source="advisor-a",
                               as_of="2026-06-12")
    assert "**hit rate 67% (2/3)**" in md       # advisor-b's row excluded
    assert "Z happens" not in md
    assert "| open | 1 |" in md                 # D still open
    assert "| excluded | 1 |" in md


def test_scorecard_tier_breakdown():
    md = cl.scorecard_markdown(_scored_rows(), source="advisor-a",
                               as_of="2026-06-12")
    assert "| explicit-dated | 2 | 0 | 0 | 2 | 0 | 100% (2/2) |" in md
    assert "| implied-window | 2 | 1 | 0 | 0 | 1 | 0% (0/1) |" in md
    assert "| undated | 0 | 0 | 0 | 0 | 0 | n/a |" in md


def test_scorecard_lists_excluded_and_open():
    md = cl.scorecard_markdown(_scored_rows(), as_of="2026-06-12")
    assert "E is inevitable — _no window_" in md
    assert "## Oldest open claims" in md
    assert "D happens in 2026" in md
    assert "## Expired — pending adjudication" in md   # advisor-b's Z row
    assert "Z happens by 2024-01-31" in md
