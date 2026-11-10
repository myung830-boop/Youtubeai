#!/usr/bin/env bash
# 렌더된 영상의 음량을 유튜브 기준(-14 LUFS)으로 맞춤. 사용: scripts/finalize.sh in.mp4 out.mp4
set -e
DIR="$(cd "$(dirname "$0")/.." && pwd)/node_modules/@remotion/compositor-linux-x64-gnu"
export LD_LIBRARY_PATH="$DIR:$LD_LIBRARY_PATH"
"$DIR/ffmpeg" -v error -y -i "$1" -c:v copy -af loudnorm=I=-14:TP=-1.5:LRA=11 -ar 48000 -c:a aac -b:a 192k "$2"
echo "완성: $2"
