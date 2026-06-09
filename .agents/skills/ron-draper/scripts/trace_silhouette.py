#!/usr/bin/env python3
"""
trace_silhouette.py  —  trace a real reference image into a clean, correctly-proportioned
SVG outline, and render a PNG so you can VERIFY BY EYE before shipping.

Why this exists: drawing object geometry from imagination drifts badly (proportions go cubist).
The fix is to trace a real silhouette so proportions are correct by construction, then re-skin
the outline in the brand's line/colors. Never ship a freehand object without looking at a render.

Dependencies: pillow, numpy, matplotlib  (pip install pillow numpy matplotlib --break-system-packages)

Usage:
    python trace_silhouette.py INPUT.png --out ./out [options]

Options:
    --out DIR          output directory (default: current dir)
    --thresh N         ink threshold 0-255; pixels darker than N are "object" (default: 110)
    --axis auto|cols|rows
                       'cols' = scan each column for top/bottom edge (good for tall objects);
                       'rows' = scan each row for left/right edge (good for wide objects);
                       'auto' picks by aspect ratio (default: auto)
    --rotate DEG       rotate the traced outline by 0/90/180/270 to orient it (default: 0)
    --box W H          target viewBox, preserves aspect inside it (default: 200 470)
    --samples N        number of points in the output path (default: 200)
    --smooth K         moving-average window for de-jagging (default: 4)
    --fill HEX         SVG fill (default: #EAD7A6)   --stroke HEX (default: #3a2110)

Outputs (in --out):
    traced.svg         the outline as <svg> with a single <path>
    traced_path.txt    just the path 'd' string, to paste into your own markup
    traced.png         a rendered preview — LOOK AT THIS and compare to the real object
    measured.txt       bbox width/length and L/W ratio, vs. what you expected

Then: open traced.png, sanity-check proportions against reality, and only then re-skin the
path (add soundhole/bridge/whatever) in the brand palette.
"""
import argparse, sys
import numpy as np

def load_mask(path, thresh):
    from PIL import Image
    a = np.array(Image.open(path).convert("L"))
    return a < thresh

def outline_points(mask, axis):
    H, W = mask.shape
    if axis == "auto":
        axis = "cols" if H >= W else "rows"
    xs_top, xs_bot = [], []
    if axis == "cols":
        for x in range(W):
            ys = np.where(mask[:, x])[0]
            if len(ys):
                xs_top.append((x, ys.min())); xs_bot.append((x, ys.max()))
        a = np.array(xs_top); b = np.array(xs_bot[::-1])
    else:
        for y in range(H):
            xs = np.where(mask[y, :])[0]
            if len(xs):
                xs_top.append((xs.min(), y)); xs_bot.append((xs.max(), y))
        a = np.array(xs_top); b = np.array(xs_bot[::-1])
    if len(a) == 0:
        sys.exit("No object pixels found — adjust --thresh.")
    return np.vstack([a, b]).astype(float)  # closed loop: one edge then the other reversed

def rotate(pts, deg):
    deg %= 360
    x, y = pts[:, 0], pts[:, 1]
    if deg == 0:   return pts
    if deg == 90:  return np.c_[y, -x]
    if deg == 180: return np.c_[-x, -y]
    if deg == 270: return np.c_[-y, x]
    sys.exit("--rotate must be 0/90/180/270")

def smooth_loop(v, k):
    n = len(v); out = v.copy()
    for i in range(n):
        lo, hi = max(0, i - k), min(n, i + k + 1)
        out[i] = v[lo:hi].mean()
    return out

def normalize(pts, boxw, boxh, pad=12):
    x, y = pts[:, 0].copy(), pts[:, 1].copy()
    x -= x.min(); y -= y.min()
    s = min((boxw - 2*pad)/max(x.max(), 1e-6), (boxh - 2*pad)/max(y.max(), 1e-6))
    x *= s; y *= s
    x += (boxw - (x.max() - x.min())) / 2 - x.min()
    y += pad - y.min()
    return np.c_[x, y]

def main():
    p = argparse.ArgumentParser()
    p.add_argument("input")
    p.add_argument("--out", default=".")
    p.add_argument("--thresh", type=int, default=110)
    p.add_argument("--axis", choices=["auto", "cols", "rows"], default="auto")
    p.add_argument("--rotate", type=int, default=0)
    p.add_argument("--box", type=int, nargs=2, default=[200, 470], metavar=("W", "H"))
    p.add_argument("--samples", type=int, default=200)
    p.add_argument("--smooth", type=int, default=4)
    p.add_argument("--fill", default="#EAD7A6")
    p.add_argument("--stroke", default="#3a2110")
    args = p.parse_args()

    import os; os.makedirs(args.out, exist_ok=True)
    mask = load_mask(args.input, args.thresh)
    pts = outline_points(mask, args.axis)
    pts = rotate(pts, args.rotate)
    pts[:, 0] = smooth_loop(pts[:, 0], args.smooth)
    pts[:, 1] = smooth_loop(pts[:, 1], args.smooth)
    boxw, boxh = args.box
    pts = normalize(pts, boxw, boxh)
    idx = np.linspace(0, len(pts) - 1, args.samples).astype(int)
    P = pts[idx]

    d = "M" + " L".join(f"{x:.1f},{y:.1f}" for x, y in P) + " Z"
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {boxw} {boxh}">'
           f'<path d="{d}" fill="{args.fill}" stroke="{args.stroke}" stroke-width="2"/></svg>')
    open(f"{args.out}/traced.svg", "w").write(svg)
    open(f"{args.out}/traced_path.txt", "w").write(d)

    import matplotlib; matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    from matplotlib.patches import Polygon
    fig, ax = plt.subplots(figsize=(4, 4 * boxh / boxw))
    ax.add_patch(Polygon(P, closed=True, facecolor=args.fill, edgecolor=args.stroke, lw=2))
    ax.set_xlim(0, boxw); ax.set_ylim(boxh, 0); ax.set_aspect("equal")
    ax.grid(True, color="#ccc", lw=.3); ax.set_title("VERIFY: compare to the real object")
    plt.tight_layout(); plt.savefig(f"{args.out}/traced.png", dpi=110)

    w = P[:, 0].max() - P[:, 0].min(); h = P[:, 1].max() - P[:, 1].min()
    open(f"{args.out}/measured.txt", "w").write(
        f"width={w:.0f} length={h:.0f} L/W={h/w:.2f}\n"
        f"(compare L/W against the real object's known ratio before trusting this)\n")
    print(f"Wrote traced.svg / traced_path.txt / traced.png / measured.txt to {args.out}")
    print(f"L/W = {h/w:.2f} — open traced.png and check it against reality.")

if __name__ == "__main__":
    main()
