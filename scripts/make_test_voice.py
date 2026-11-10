"""녹음 전 테스트용: 대본에서 예상 타이밍 SRT + 무음 오디오를 만든다.
사용: python3 scripts/make_test_voice.py  → public/ep001/voice.srt, voice.mp3 (실제 녹음이 오면 덮어쓰기)
"""
import re, subprocess
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
md = (ROOT / "docs/episodes/ep001/SCRIPT.md").read_text()
body = md.split("## 녹음용 대사")[1].split("## 녹음 & SRT")[0]
blocks = re.findall(r"```\n(.*?)```", body, re.S)
CPS = 5.2  # 초당 글자수(공백 제외) — 차분한 내레이션 기준
t, out, n = 0.4, [], 1
def ts(x):
    h, x = divmod(x, 3600); m, s = divmod(x, 60)
    return f"{int(h):02d}:{int(m):02d}:{int(s):02d},{int(round((s % 1) * 1000)) % 1000:03d}"
for bi, b in enumerate(blocks):
    for line in [l.strip() for l in b.strip().split("\n") if l.strip()]:
        d = max(1.4, len(re.sub(r"\s", "", line)) / CPS)
        out.append(f"{n}\n{ts(t)} --> {ts(t + d)}\n{line}\n"); n += 1
        t += d + 0.35
    t += 2.2 if bi == 0 else 0.8  # 훅 뒤 인트로 2초, 파트 사이 쉼
dst = ROOT / "public/ep001"; dst.mkdir(parents=True, exist_ok=True)
(dst / "voice.srt").write_text("\n".join(out), encoding="utf-8")
subprocess.run(["npx", "remotion", "ffmpeg", "-y", "-f", "lavfi", "-i", "anullsrc=r=44100:cl=mono", "-t", f"{t + 1:.2f}", "-q:a", "9", str(dst / "voice.mp3")], cwd=ROOT, check=True, capture_output=True)
print(f"{n-1} cues, {t:.1f}s")
