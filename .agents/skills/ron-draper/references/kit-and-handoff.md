# Kit & handoff

How to package a confirmed identity so a coding agent can build it faithfully.

## The file kit (generic)

A portable folder. Adapt names to the project, but this shape works:

```
<brand>-kit/
  BRAND.md        the spec: identity, the kernel + tension, palette w/ roles, type voices,
                  logo rules (clear space, min size, do/don'ts), the non-negotiables
  tokens.css      :root custom properties (colors w/ roles, font stacks, font @imports, shape) +
                  inline notes on how each token is meant to be used
  COMPONENTS.md   reusable component specs: purpose, props, states, responsive note — for every
                  real component the product needs
  STATES.md       the full state matrix (loading/empty/error/success/locked + domain verdicts),
                  each expressed with label + icon + (if relevant) strike, never color alone
  kit.html        ONE self-contained page that renders the system + states + key screens, so a
                  human or another agent can open and review it
  logo.svg / mark.svg / favicon.svg   marks as clean vector (prefer pure geometry, no font
                  dependency in the mark itself)
```

Principles:
- **Specs are the source of truth; the HTML is the proof.** Write the rule down *and* show it.
- **Make every signal evidence-safe** (label + icon + strike, not hue alone).
- **Numbers/data in monospace** when credibility matters.
- **State the type-voice rule and the color-restraint rule explicitly** so implementers don't drift.
- Leave deliberately-deferred art as a single named slot component so the final swap is one change.

## The handoff brief

A short doc aimed at the coding agent that will implement the kit. It should:
- Say what's being built in two lines and link the kit as the visual source of truth.
- State the stack only if known; otherwise defer to the implementer.
- Give a **build order in small vertical slices**, with "stop and show me after each slice."
- Spell out guardrails (secrets server-side, honesty/claims limits, accessibility, ask-before-big-moves).
- Provide a **kickoff prompt** the user pastes into the agent's first session that forces it to read
  the kit and confirm understanding *before* writing code.

## David's defaults (OPTIONAL — strip for other users)

When working specifically with David, apply these conveniences. For anyone else, ignore or replace.

- **Deliver a file kit** as above, including an openable `kit.html`/`sample.html`.
- **Don't collide with his agent OS.** David runs a `CLAUDE.md`-based system ("DavidOS") that
  auto-loads. Never name a handoff file `CLAUDE.md`. Name it `<PROJECT>-BRIEF.md` and open it by
  declaring it **subordinate**: DavidOS wins on process/workflow/cadence; the brief only governs
  this project's brand/product decisions. Let DavidOS decide at session end what becomes durable.
- **Relative paths only** inside the kit; in any kickoff prompt use a `<KIT_PATH>` placeholder the
  user fills once, rather than hardcoding a location.
- **Handoff target varies** — sometimes Claude Code, sometimes Codex/Cursor. Write the brief and the
  kickoff prompt for the named agent; keep specs tool-agnostic.
- **Human-only reminders**, listed separately and explicitly *not* handed to the coding agent: lock
  the domain at the registrar; set API keys / env vars yourself in the host dashboard, never in a
  session or commit.
- **A reviewer pass is welcome.** David often shows a sample pack to a second agent (e.g. Codex) for
  feedback before the full build. For that, produce a lean **sample pack** (a rendered `sample.html`,
  tokens, the mark, and a brief *written for a reviewer* that ends with the specific questions worth
  pressure-testing) — not the full spec, which would invite review of undecided things.
