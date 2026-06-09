# Visual craft

How to turn a confirmed kernel into a visual system without losing the soul. Aesthetics here are
illustrative — never reuse a past project's palette or fonts; derive fresh from *this* kernel.

## Read behind the feel (the most important craft move)

When given references (mood images, competitors, old catalogs, screenshots), **extract the underlying
system, never lift surface elements.** Tracing a competitor's exact glyph or tacking on their motif is
theft and it looks like theft. Instead, read for the *grammar*:

- How much air around the mark? Tight or generous?
- Type: condensed or wide; serif or grotesque; how tracked; weight contrast between heading and caption?
- What's the geometry built on — circles, hard verticals, a particular stroke logic?
- Print/era artifacts that signal a time or attitude (registration drift, ink density, paper warmth)?
- Crucially: do *different* references use *different* voices for different jobs? (e.g. a serif for
  heritage/brand vs. a condensed sans for category/value — using the wrong one mislabels the brand.)

Then build something new that obeys the same rules but is unmistakably the client's. A songwriter who
grew up on the records writes a new song that belongs on the shelf — not a cover.

## Type as voices

Strong identities usually run 2–3 *voices*, each with a job, never interchangeable:
- A **display/headline** voice (the attitude).
- A **data/mono** voice when credibility or evidence matters (monospace reads as receipts/proof).
- A **body** voice that gets out of the way.
State the rule plainly in the kit ("serif = soul, sans = utility"; "headline = fist, mono = receipts")
so implementers don't drift.

## Color discipline

- Derive the palette from the kernel and the tension (e.g. anti-incumbent → opposite of the
  incumbent's hue). Keep it flat; avoid gradients/shadows unless the concept demands them.
- Accent colors are scalpels. If a loud accent appears everywhere it reads as a game; used rarely it
  reads as precision. Trust comes from **restraint + evidence**, not from a calmer hue.
- **Never let color carry meaning alone.** Pair every signal with a text label, an icon/arrow, and/or
  a strike-through. This is both accessibility and credibility. Define the rule in tokens.

## Mockups and states

- Lead with one hero that proves the system, then design the **real states** the product needs:
  loading, empty, error, success, locked/unlocked, and any domain-specific verdicts — plus
  responsive (desktop + mobile). A lookbook of one happy-path screen is not a usable kit.
- Keep meaning honest across states (don't frame every outcome as the dramatic one; design the
  neutral and the unfavorable cases too).

## The render-and-check discipline (do not draw blind)

Models place geometry by mental math with no eye in the loop, so freehand illustration and
proportions drift (a guitar comes out looking cubist). Two fixes, in order of preference:

1. **Trace a real reference.** Get a clean silhouette/photo of the real object, trace its outline so
   proportions are correct *by construction*, then re-skin it in the brand's line/colors. Use
   `scripts/trace_silhouette.py` (see its header for usage). It outputs an SVG path + a rendered PNG.
2. **Render → look → measure → correct, in code.** Build the thing in a script, rasterize it, *view*
   the image, measure it against real-world ratios, and iterate. The feedback loop is the point.

Always actually *look* at the rendered result and compare against reality before shipping. State any
residual imperfection honestly in the handoff (e.g. "traced outline carries slight real-world
lumpiness; clean up at vectorization").

## Inline-visual vs. file

If you have an inline visualizer/diagram tool, use it for swatches and mockups so the user sees them
immediately. If not, write a small **self-contained HTML file** (fonts via an allowed CDN, everything
else inline) the user can open in a browser — this doubles as a review artifact you can hand to
another agent for feedback.
