#!/bin/sh
# 用 headless Chrome 產生 public/og.png（1200×630）和 public/logo.png（512×512）。
set -e
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"

"$CHROME" --headless --hide-scrollbars --timeout=6000 --window-size=1200,630 \
	--screenshot="$ROOT/public/og.png" "file://$ROOT/scripts/og/og.html"
"$CHROME" --headless --hide-scrollbars --window-size=512,512 \
	--screenshot="$ROOT/public/logo.png" "file://$ROOT/public/favicon.svg"
