#!/usr/bin/env python3
"""One-time raster replacement of two corrected academic publication covers.

Original WebP imagery is preserved as the base layer inside the two
self-contained corrected SVGs. Render the corrected SVGs and replace
only the two original WebP files, with no changes to titles or logos.
"""
from io import BytesIO
from pathlib import Path
from PIL import Image
import cairosvg

BASE = Path(__file__).resolve().parent.parent / "public" / "research-covers"
DATES = {"02": ("2023", "October"), "03": ("2023", "June")}
for series, (year, month) in DATES.items():
    svg = BASE / f"series-{series}-2023.svg"
    out = BASE / f"series-{series}.webp"
    data = svg.read_bytes()
    assert b"data:image/webp;base64" in data, f"Missing embedded original image: {svg}"
    assert f"{month} {year}".encode() in data, f"Missing corrected date: {svg}"
    png = cairosvg.svg2png(bytestring=data, output_width=1055, output_height=1491)
    image = Image.open(BytesIO(png)).convert("RGB")
    assert image.size == (1055, 1491)
    image.save(out, format="WEBP", quality=92, method=6)
    print(f"Updated {out} to {month} {year}: {out.stat().st_size} bytes")
