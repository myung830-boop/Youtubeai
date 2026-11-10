"""SRT 타이밍을 실제 녹음에 맞춰 다시 정렬 (자동 자막 앱의 시간 밀림 보정).
원리: 녹음에서 말하는 구간(무음 사이)을 찾고, 자막 글자 수 비율로 말하는 시간 위에 배치한 뒤
      자막 경계를 가장 가까운 '쉼'에 붙인다(동적계획법).
사용: python3 scripts/align_srt.py public/ep001/voice.mp3 public/ep001/voice.srt public/ep001/voice.aligned.srt
"""
import re, subprocess, sys, wave, os
from pathlib import Path
import numpy as np

audio, srt_in, srt_out = sys.argv[1:4]
ROOT = Path(__file__).resolve().parent.parent
FFDIR = ROOT / "node_modules/@remotion/compositor-linux-x64-gnu"
tmp = ROOT / "out/_align.wav"; tmp.parent.mkdir(exist_ok=True)
subprocess.run([str(FFDIR / "ffmpeg"), "-v", "error", "-y", "-i", audio, "-ac", "1", "-ar", "16000", "-c:a", "pcm_s16le", str(tmp)],
               check=True, env={**os.environ, "LD_LIBRARY_PATH": str(FFDIR)})
w = wave.open(str(tmp)); x = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(float)
HOP = 160  # 10ms
n = len(x) // HOP
e = 20 * np.log10(np.sqrt((x[: n * HOP].reshape(n, HOP) ** 2).mean(1)) + 1)
e = np.convolve(e, np.ones(3) / 3, "same")
th = np.percentile(e, 20) + 0.45 * (np.percentile(e, 90) - np.percentile(e, 20))
sp = e > th
# 짧은 끊김 메우기(<120ms), 짧은 소리 제거(<80ms)
def runs(b):
    out, i = [], 0
    while i < len(b):
        j = i
        while j < len(b) and b[j] == b[i]: j += 1
        out.append((b[i], i, j)); i = j
    return out
for v, i, j in runs(sp):
    if not v and j - i < 12 and i > 0: sp[i:j] = True
for v, i, j in runs(sp):
    if v and j - i < 8: sp[i:j] = False
segs = [(i / 100, j / 100) for v, i, j in runs(sp) if v]
gaps = [(segs[k][1], segs[k + 1][0]) for k in range(len(segs) - 1)]  # 쉼 구간

def ts2s(t):
    h, m, s = t.replace(",", ".").split(":"); return int(h) * 3600 + int(m) * 60 + float(s)
def s2ts(s):
    h = int(s // 3600); m = int(s % 3600 // 60); sec = s % 60
    return f"{h:02d}:{m:02d}:{int(sec):02d},{int(round((sec % 1) * 1000)) % 1000:03d}"
blocks = [b for b in re.split(r"\n\s*\n", open(srt_in, encoding="utf-8-sig").read().replace("\r", "").strip()) if "-->" in b]
cues = []
for b in blocks:
    ls = b.split("\n"); k = next(i for i, l in enumerate(ls) if "-->" in l)
    a, z = ls[k].split("-->"); cues.append([ts2s(a), ts2s(z.strip().split()[0]), " ".join(ls[k + 1:]).strip()])
weights = np.array([max(1, len(re.sub(r"[\s\W_]", "", c[2]))) for c in cues], float)

# ── 로컬 말속도 기반 동적계획법 ──
# 경계 후보: 모든 쉼(무음) + 말하는 구간 안의 0.1초 격자(쉼 없이 자르는 경우, 벌점)
speech_mask = np.zeros(int(segs[-1][1] * 10) + 2, bool)
for a, b in segs: speech_mask[int(a * 10):int(b * 10) + 1] = True
def speech_dur(t0, t1):  # t0~t1 사이 실제 말한 시간
    return sum(max(0, min(b, t1) - max(a, t0)) for a, b in segs if b > t0 and a < t1)
cands = []  # (time_end_prev, time_start_next, is_gap)
for g0, g1 in gaps: cands.append((g0 + 0.06, g1 - 0.04, True))
for a, b in segs:
    t = a + 0.3
    while t < b - 0.3: cands.append((t, t, False)); t += 0.1
cands.sort()
syl = weights
rate = syl.sum() / sum(b - a for a, b in segs)  # 초당 글자(음절)
K = len(cues)
P = len(cands)
starts_c = [c[1] for c in cands]
INF = 1e18
# dp[k][j]: k번째 자막이 후보 j에서 끝날 때 최소 비용
prev_cost = {}
first_start = segs[0][0]
def cue_cost(k, t0, t1):
    exp_d = syl[k] / rate
    d = speech_dur(t0, t1)
    sig = 0.22 * exp_d + 0.25
    prior = ((t0 - cues[k][0]) / 6.0) ** 2  # 원래 SRT 시간은 약한 참고만
    return ((d - exp_d) / sig) ** 2 + prior
# 마지막 자막은 녹음 끝에서 끝남
import bisect
layer_prev = {-1: (0.0, None)}  # 후보 index -1 = 시작
layers = []
for k in range(K):
    cur = {}
    exp_d = syl[k] / rate
    for pj, (pc, _) in layer_prev.items():
        t0 = first_start if pj == -1 else cands[pj][1]
        if k == K - 1:
            c = pc + cue_cost(k, t0, segs[-1][1])
            if 'END' not in cur or cur['END'][0] > c: cur['END'] = (c, pj)
            continue
        # 끝 후보: 말한 시간이 기대치의 0.4~2.2배 범위
        lo = bisect.bisect_left(starts_c, t0 + 0.2)
        for j in range(lo, P):
            t1 = cands[j][0]
            d = speech_dur(t0, t1)
            if d < 0.4 * exp_d - 0.2: continue
            if d > 2.2 * exp_d + 0.6: break
            c = pc + cue_cost(k, t0, t1) + (0 if cands[j][2] else 2.5)
            if j not in cur or cur[j][0] > c: cur[j] = (c, pj)
    cur = dict(sorted(cur.items(), key=lambda kv: kv[1][0])[:300])
    layers.append(cur); layer_prev = cur
key = 'END'; bounds = []
for k in range(K - 1, -1, -1):
    _, pj = layers[k][key]; bounds.append(pj); key = pj
bounds.reverse()  # bounds[k] = k번째 자막 시작 직전 경계 후보 (-1 = 처음)
starts, ends = [], []
for k in range(K):
    pj = bounds[k]
    starts.append(first_start if pj == -1 else cands[pj][1])
    if k + 1 < K: ends.append(cands[bounds[k + 1]][0])
ends.append(segs[-1][1] + 0.1)
out = []
for i, c in enumerate(cues):
    out.append(f"{i + 1}\n{s2ts(max(0, starts[i]))} --> {s2ts(ends[i])}\n{c[2]}\n")
open(srt_out, "w", encoding="utf-8").write("\n".join(out))
shifts = [starts[i] - cues[i][0] for i in range(len(cues))]
print(f"speech segs {len(segs)}, gaps {len(gaps)}, cues {len(cues)}; 시작 시간 보정량: 평균 {np.mean(shifts):+.2f}s, 최대 {max(shifts, key=abs):+.2f}s")
for i in range(0, len(cues), max(1, len(cues) // 15)):
    print(f"  #{i+1:3d} {cues[i][0]:7.2f} → {starts[i]:7.2f}  {cues[i][2][:24]}")
