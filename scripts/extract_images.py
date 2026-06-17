#!/usr/bin/env python3
"""Extract image URLs from the messy CLI output files and produce a clean mapping."""
import json
import os
import re
from pathlib import Path

DATA_DIR = Path("/home/z/my-project/data")
OUT_FILE = DATA_DIR / "images.json"

mapping = {}
for f in sorted(DATA_DIR.glob("img_*.json")):
    key = f.stem.replace("img_", "")
    raw = f.read_text()
    # Find the JSON object in the raw text
    match = re.search(r'\{\s*"success".*?\n\}', raw, re.DOTALL)
    if not match:
        print(f"WARN: no JSON found in {f.name}")
        continue
    try:
        data = json.loads(match.group(0))
    except json.JSONDecodeError as e:
        print(f"WARN: bad JSON in {f.name}: {e}")
        continue
    urls = [r.get("original_url", "") for r in data.get("results", []) if r.get("original_url")]
    mapping[key] = urls
    print(f"{key}: {len(urls)} urls")

OUT_FILE.write_text(json.dumps(mapping, indent=2))
print(f"\nSaved -> {OUT_FILE} ({len(mapping)} keys)")
