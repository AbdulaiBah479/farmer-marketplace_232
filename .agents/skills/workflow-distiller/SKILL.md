---
name: workflow-distiller
description: Mine your own Claude Code history for the skills you should have. Scans ~/.claude/projects session transcripts (read-only, local-only, aggregates-only) for repeated friction→fix patterns, proposes ranked skill candidates, and drafts SKILL.md files following best practice. Use when the user asks "what skills should I make", "distill my workflows", "mine my transcripts", "turn my habits into skills", "find my repeated workflows", or wants skill ideas grounded in what they actually do every week.
---

# Workflow Distiller

The meta-skill: your transcript history already contains the skills you should have written. Every workflow you've re-explained to Claude three times, every shell ritual you've re-typed, every correction you've made twice — those are skills waiting to be distilled. This skill scans your history in aggregate, clusters the recurring patterns, scores them, and drafts the SKILL.md files for the winners.

The skill has three phases, and they never blur:

1. **Scan** — a small auditable Python script emits aggregates only.
2. **Judge** — Claude clusters the aggregates into named workflow candidates and scores them.
3. **Draft** — the user picks; one SKILL.md per pick, written from the pattern, never from the text.

## Privacy Contract (present this BEFORE anything runs)

This section is read to the user verbatim or paraphrased faithfully, before any scanning happens. It is the first thing that happens when this skill fires — before any tool call, before any file read.

**What is read:**

- `~/.claude/projects/*/*.jsonl` — your local Claude Code session transcripts
- Project directory names (e.g. `-Users-you-Desktop-myapp`)
- Nothing else. No other files, no network calls, no telemetry, no uploads.

**What the scanner emits — aggregates only:**

- Counts: sessions per project, messages per project, malformed lines skipped
- Recurring command n-grams: tool-name 3-grams and, for Bash, the first token of each command (the binary — `git`, `npm`, `ffmpeg` — never the arguments)
- Repeated prompt prefixes: the first 8 words of user prompts, lowercased, counted
- **Never message bodies. Never full commands. Never file contents.** Any token matching common secret patterns (`sk-`, `ghp_`, `gho_`, `AKIA`, `xox`, `password=`, `token=`, `Bearer`) is dropped before counting, so it cannot appear even inside a prefix.

**Where things are written:** drafted skill files go only to the output directory the user chooses in step 6. The scanner itself writes nothing to disk — JSON to stdout, summary to stderr. Nothing is written outside the chosen output directory, ever.

**The honest caveat:** the scanner's JSON output, and anything from it that gets surfaced into this conversation, is processed like any other conversation content — it goes through the model like the rest of the chat. The aggregates are designed to be safe to surface (counts, single binaries, and 8-word prefixes — not bodies), but if you treat even your prompt openings as sensitive, the right answer is no.

**Consent gate:** ask the user explicitly — *"May I run the scanner on your transcripts? (yes/no)"* — and require an explicit "yes" (or an unambiguous equivalent like "go ahead, scan"). Anything else — silence, ambiguity, a topic change, "what would it do?" — means **do not run the scanner**. No consent → stop. Offer to walk through `scripts/scan_transcripts.py` source instead (~240 lines, stdlib only, auditable in one read) so they can verify the contract before deciding.

## Definition of Done

- Explicit consent was obtained in the conversation before the scanner ran.
- The scan ran; the exact command and its stderr summary were shown to the user.
- A ranked candidates table was presented with rubric scores and per-candidate evidence.
- The user picked which candidates to build (you proposed, they chose — never auto-draft).
- One SKILL.md draft per pick was written to the user's chosen output directory.
- Each draft passes `claude plugin validate` frontmatter rules: `name` in kebab-case matching its directory, `description` non-empty and under the length cap, no stray frontmatter keys.
- No transcript text, secret, or real identifier appears in any draft.

## Core Principle

**A skill candidate is a workflow that happened 3+ times with the same shape. One-off heroics make bad skills; repeated friction makes great ones.**

The scanner finds repetition; your judgment finds the shape. A prompt prefix repeated 14 times across 3 projects is a signal. A glorious one-time debugging session is a story, not a skill. When in doubt about whether something is a candidate, ask: "will this exact workflow happen again next month?" — if the answer needs a hypothetical, skip it.

## Workflow

### 1. Consent gate

Present the Privacy Contract above. Require an explicit "yes". No consent → stop here entirely; do not run the scanner, do not preview "what it would find", do not estimate from memory of this conversation.

### 2. Run the scanner

```bash
python3 "${CLAUDE_PLUGIN_ROOT}/scripts/scan_transcripts.py" --days 90 --top 30
```

Print the exact command you ran and the 3-line stderr summary to the user, e.g.:

```
Scanned 12 projects / 687 sessions in the last 90 days (0 malformed lines skipped).
Top prompt prefix: "..." (464x, 5 projects); top bash binary: cd (1627x).
Aggregates only: no message bodies, no command arguments, no secrets in this output.
```

Flags: `--projects-dir` (default `~/.claude/projects`), `--days` (default 90), `--top` (default 30). The JSON lands on stdout — capture it for the next step. If the scan window comes back thin (under ~20 sessions), say so and offer `--days 180` rather than scoring on weak evidence.

### 3. Cluster the aggregates into candidate workflows

This is the judgment work the scanner cannot do. Read the four aggregate lists *together* and look for workflows, not statistics:

| Signal in the JSON | What it suggests |
|---|---|
| Repeated prompt prefix ("fix the failing build in...") | A task the user keeps re-explaining from scratch — prime skill material |
| Recurring bash binary cluster (`ffmpeg`, `gh`, `psql` repeatedly) | A tool ritual with flags and sequences worth canning |
| Hot tool 3-gram (`Read > Edit > Bash` far above baseline) | A repeated edit-verify loop that could carry a checklist |
| One project dominating `sessions_per_project` | Project-specific workflows worth a project-level skill |
| A prefix appearing across many projects | A cross-project habit — high generalizability |
| Prefixes shaped like corrections ("no, actually the...") | A recurring mistake worth an Anti-patterns section somewhere |

Rules of clustering:

- **Cross-reference before counting.** A prompt prefix + a matching binary + a matching tool sequence is *one* candidate backed by three lines of evidence, not three candidates.
- **Discard infrastructure noise.** `cd`, `ls`, `cat`, `[request interrupted by user]`, and prefixes injected by other tooling (scheduled jobs, hook preambles — they show up as high-count identical prefixes with robotic phrasing) are scanner exhaust, not workflows. Name them as excluded if they top the list.
- **Name each candidate as a workflow**, not a statistic: "release-tagging ritual", "API-doc fetch-and-summarize", "VPN-then-portal form dance" — a name the user will recognize as a thing they do.

### 4. Score each candidate

Use the rubric in `references/candidate-rubric.md`: frequency (1-5, distinct sessions) × pain (1-5, manual steps/corrections per occurrence) × generalizability (1-5, who else hits this). Bands: **≥48 build now, 24-47 maybe, <24 skip.** Score honestly — the rubric's product form means one weak dimension sinks the total, which is the point.

### 5. Present the ranked table

| Candidate | Evidence | Freq | Pain | Gen | Score |
|---|---|---|---|---|---|
| release-tagging ritual | `gh` 22x; prefix "cut a release for" 9x/2 proj; `Bash > Bash > Bash` chains | 4 | 4 | 4 | 64 |
| API-doc fetch-and-summarize | prefix "fetch the docs page for" 7x/1 proj; `WebFetch > Write` pairs | 3 | 3 | 3 | 27 |

(Synthetic example — your table comes from the user's actual aggregates.) Sort by score, descending. Show maybe-band candidates in full; show skip-band candidates in one collapsed line each — the user may know something the aggregates don't ("that 2-session pattern is about to become weekly").

### 6. User picks

Ask two things and wait for both:

1. **Which candidates to draft.** Default suggestion: the build-now band only, and even then the top 2-3.
2. **The output directory** for drafts — e.g. `~/.claude/skills/` for personal skills, or a plugin repo path for publishable ones.

Never write drafts before both answers. If the user picks a skip-band candidate, draft it — their call — but say what score it carried.

### 7. Draft each SKILL.md

Follow `references/skill-template.md` exactly: frontmatter (kebab-case `name`, dense `description` with 3-5 quoted trigger phrases), then Definition of Done → Core Principle → Workflow → reference tables → Anti-patterns → Verification.

Drafting discipline:

- **Draft from the pattern, never from the text.** You know the user runs `ffmpeg` 30 times a month and keeps re-explaining the same conversion constraints; you do not copy any transcript line, prompt, or command-with-arguments into the draft.
- Trigger phrases are the phrases the user *would* say — informed by the fact that a prefix recurred, not quoted from it.
- Real hosts, IDs, and tokens become placeholders (`<advertiser-id>`, `$TOKEN`) even when inferable.
- Keep first drafts under ~120 lines. A skill grows from use, not speculation.
- Write each draft to `<output-dir>/<skill-name>/SKILL.md`.

### 8. Defer to skill-creator if available

If the `skill-creator` plugin is installed (check the available-skills list for `skill-creator:skill-creator`), offer explicitly: *"Want me to hand these drafts to skill-creator for refinement and evals?"* If the user accepts, invoke it per draft and let it own the polish loop. If it is not installed, skip silently — the drafts stand on their own. Do not duplicate skill-creator's eval machinery by hand.

### 9. Verify, then report

Run the Verification section below. Then report: the drafted file paths, each skill's score and one-line evidence, and one line each on what would sharpen the skill after real use. Keep it short — the user cares about the drafts, not the methodology.

## A worked example (synthetic, end to end)

What a healthy run looks like, condensed:

```
You:   [privacy contract] ... May I run the scanner on your transcripts? (yes/no)
User:  yes
You:   $ python3 "${CLAUDE_PLUGIN_ROOT}/scripts/scan_transcripts.py" --days 90 --top 30
       Scanned 9 projects / 412 sessions in the last 90 days (3 malformed lines skipped).
       Top prompt prefix: "convert the recording in downloads to a" (11x, 1 project); top bash binary: cd (980x).
       Aggregates only: no message bodies, no command arguments, no secrets in this output.
```

Clustering: `cd`/`ls` excluded as exhaust. Three signals cohere — the "convert the recording..." prefix (11 sessions), `ffmpeg` at 31x, and a hot `Bash > Read > Bash` 3-gram. That is **one** candidate: a media-conversion ritual the user re-specifies every time. A second prefix family ("raise a ticket on...", 6 sessions, 2 projects) plus `openvpn` 8x makes a VPN-then-portal candidate.

| Candidate | Evidence | Freq | Pain | Gen | Score |
|---|---|---|---|---|---|
| media-conversion ritual | prefix 11x/1 proj; `ffmpeg` 31x; `Bash > Read > Bash` | 4 | 3 | 4 | 48 |
| VPN-then-portal ticket dance | prefix 6x/2 proj; `openvpn` 8x | 3 | 5 | 2 | 30 |

User picks the first, names `~/.claude/skills/` as the output dir. One draft lands at `~/.claude/skills/media-convert/SKILL.md`, written from the pattern (ffmpeg, repeated constraints, verify step) with zero transcript text. skill-creator is installed, so you offer the handoff; user declines; done.

This skill's own origin follows the same loop: the repo it ships in began as "I mined 550 of my transcripts" — the scanner you are about to run is the productized version of that first dig.

## After the drafts land

- **Personal skills** (`~/.claude/skills/<name>/SKILL.md`) are auto-discovered; a new session (or `/skills` reload where available) picks them up — tell the user to try one trigger phrase as a live test.
- **Plugin-bound drafts** need the plugin scaffold (`.claude-plugin/plugin.json`) and a marketplace entry before they fire; offer to scaffold but don't touch marketplace files without being asked.
- Either way, end by telling the user which trigger phrase should now work, so the first verification is a real invocation, not a file listing.

## When the scan comes back thin

| Symptom | Response |
|---|---|
| < ~20 sessions in window | Offer `--days 180`; don't score on weak evidence |
| Top prefixes are all tooling exhaust | Say so, exclude them by name, work from binaries + 3-grams instead |
| Lots of sessions, no repeated prefixes | The user phrases tasks freshly each time — lean on bash binaries and tool sequences, which don't depend on phrasing |
| One project is 90% of activity | Propose project-level skills and say the sample is one-project; cap generalizability honestly |
| Nothing clears the maybe band | Report that honestly. "No skill-worthy repetition in this window" is a valid, useful result — do not invent candidates to have something to show |

## Anti-patterns

- **Proposing skills from one-off events.** One spectacular session is not a pattern. 3+ occurrences with the same shape, or it doesn't make the table.
- **Including ANY transcript verbatim in a drafted skill.** Drafts are written from the pattern, not the text. No quoted prompts, no pasted commands-with-args from history, no session excerpts — even flattering ones.
- **Scanning without explicit consent.** "The user probably wants this" is not a yes. "They invoked the skill" is not a yes either — invoking the skill earns them the privacy contract, not a scan.
- **Drafting 10 skills when 2 are load-bearing.** A wall of mediocre skills dilutes triggering and trust. Ship the build-now band only, unless the user insists.
- **Skills whose description has no trigger phrases.** A description that says what the skill is but not when it fires will never fire. Every draft's description carries 3-5 quoted trigger phrases.
- **Treating the scanner output as the answer.** The aggregates are evidence; the candidate list is judgment. Don't present raw JSON rows as "candidates", and don't let `cd` (always the top binary) anywhere near the table.
- **Re-running the scanner with wider windows hunting for a pattern you've already decided exists.** Widen once (step 2's thin-scan rule), then accept the evidence.

## Verification

Run these checks before reporting done:

1. **Frontmatter on every draft.** Each drafted SKILL.md has exactly `name` (kebab-case, matching its directory name) and a dense `description` containing quoted trigger phrases. If the draft lives in a plugin scaffold, run `claude plugin validate <plugin-dir>` and fix until clean; otherwise check the same rules by eye.

2. **No bodies in the scanner output.** Spot-check the JSON:

   ```bash
   python3 -c "import json,sys; d=json.load(open(sys.argv[1])); \
     print('max prefix words:', max((len(p['prefix'].split()) for p in d['prompt_prefixes']), default=0)); \
     print('max binary tokens:', max((len(b['binary'].split()) for b in d['bash_binaries']), default=0))" scan.json
   ```

   Max prefix words must be ≤ 8 and max binary tokens must be 1. If anything looks like a sentence-length body, stop and treat it as a scanner bug — do not proceed to drafting.

3. **No secrets in the scanner output.**

   ```bash
   grep -cE "sk-|ghp_|gho_|AKIA|xox|password=|token=|Bearer" scan.json   # must print 0
   ```

4. **Consent was explicit.** The conversation contains the user's "yes" before the scan command ran. If you cannot point to it, you skipped the gate — say so in the report rather than papering over it.

## Files

| Path | Purpose |
|---|---|
| `scripts/scan_transcripts.py` | The aggregate-only scanner (stdlib Python 3.9+, auditable in one read) |
| `scripts/test_scan_transcripts.py` | Pytest suite incl. secret-leak, body-leak, and window assertions |
| `references/candidate-rubric.md` | Scoring rubric (f×p×g, bands) + friction-pattern taxonomy |
| `references/skill-template.md` | The house SKILL.md skeleton every draft must follow |
