"""채널용 오리지널 BGM 생성 (저작권 걱정 없음): 밝고 가벼운 마림바 + 베이스 + 쉐이커 루프.
사용: python3 scripts/make_bgm.py → public/bgm/bright-lab.mp3
"""
import subprocess, wave
from pathlib import Path
import numpy as np

SR = 44100
BPM = 104
BEAT = 60 / BPM
BARS = 16
N = int(round(BARS * 4 * BEAT * SR))
L = np.zeros(N); R = np.zeros(N)
rng = np.random.default_rng(7)

def hz(m): return 440 * 2 ** ((m - 69) / 12)

def add(sig, start_s, pan=0.0):
    i = int(start_s * SR)
    idx = (np.arange(len(sig)) + i) % N  # 루프가 이음새 없이 이어지도록 감아서 더함
    l = np.sqrt((1 - pan) / 2); r = np.sqrt((1 + pan) / 2)
    np.add.at(L, idx, sig * l); np.add.at(R, idx, sig * r)

def marimba(m, dur=0.9, amp=0.22):
    t = np.arange(int(dur * SR)) / SR
    f = hz(m)
    env = np.exp(-t * 7.5) * (1 - np.exp(-t * 900))
    return amp * env * (np.sin(2 * np.pi * f * t) + 0.35 * np.sin(2 * np.pi * f * 4 * t) * np.exp(-t * 22) + 0.15 * np.sin(2 * np.pi * f * 2 * t))

def bass(m, dur, amp=0.32):
    t = np.arange(int(dur * SR)) / SR
    f = hz(m)
    env = np.minimum(1, t * 60) * np.exp(-t * 2.2)
    s = np.sin(2 * np.pi * f * t) + 0.25 * np.sin(2 * np.pi * 2 * f * t)
    return amp * env * s

def pad(ms, dur, amp=0.05):
    t = np.arange(int(dur * SR)) / SR
    env = np.minimum(1, t * 3) * np.minimum(1, (dur - t) * 3)
    s = sum(np.sin(2 * np.pi * hz(m) * t * (1 + d)) for m in ms for d in (-0.003, 0.003))
    return amp * env * s / len(ms)

def kick(amp=0.45):
    t = np.arange(int(0.25 * SR)) / SR
    f = 110 * np.exp(-t * 28) + 45
    return amp * np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 14)

def shaker(amp=0.05):
    n = int(0.06 * SR); t = np.arange(n) / SR
    x = rng.standard_normal(n); x = np.diff(np.concatenate([[0], x]))  # 고역 강조
    return amp * x * np.exp(-t * 60)

def clap(amp=0.12):
    n = int(0.15 * SR); t = np.arange(n) / SR
    return amp * rng.standard_normal(n) * np.exp(-t * 30)

# C - G - Am - F (I–V–vi–IV), 밝고 친근한 진행
chords = [(48, [60, 64, 67]), (43, [59, 62, 67]), (45, [60, 64, 69]), (41, [60, 65, 69])]
# 마림바 리듬 패턴 (8분음표 위치, 화음 구성음 인덱스)
patt = [(0, 0), (1.5, 1), (2, 2), (3, 1), (3.5, 2), (4.5, 0), (5, 1), (6, 2), (7, 1)]
melody = [72, 74, 76, 79, 76, 74, 72, 67]

for bar in range(BARS):
    root, tones = chords[bar % 4]
    t0 = bar * 4 * BEAT
    add(pad(tones, 4 * BEAT), t0)
    add(bass(root, 1.5 * BEAT), t0); add(bass(root, 0.9 * BEAT), t0 + 2.5 * BEAT); add(bass(root + 12, 0.5 * BEAT, 0.18), t0 + 3.5 * BEAT)
    for pos, k in patt:
        add(marimba(tones[k] + 12, amp=0.16), t0 + pos * BEAT / 2, pan=-0.3 if k == 1 else 0.25)
    if bar % 8 >= 4:  # 후반 4마디엔 가벼운 멜로디
        for i in range(4):
            add(marimba(melody[(bar * 4 + i) % 8], 1.2, 0.13), t0 + i * BEAT + BEAT / 2 * (i % 2), pan=0.1)
    if bar >= 2:  # 드럼은 2마디 뒤부터
        for b in range(4):
            if b in (0, 2): add(kick(), t0 + b * BEAT)
            if b in (1, 3): add(clap(), t0 + b * BEAT, pan=0.05)
        for e in range(8):
            add(shaker(0.035 if e % 2 else 0.05), t0 + e * BEAT / 2, pan=0.4)

mix = np.stack([L, R], 1)
mix = np.tanh(mix * 1.4) / np.tanh(1.4)  # 부드러운 리미터
mix = mix / np.max(np.abs(mix)) * 0.89
out = Path(__file__).resolve().parent.parent / "public/bgm"
out.mkdir(parents=True, exist_ok=True)
wav = out / "bright-lab.wav"
with wave.open(str(wav), "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype(np.int16).tobytes())
subprocess.run(["npx", "remotion", "ffmpeg", "-y", "-i", str(wav), "-b:a", "192k", str(out / "bright-lab.mp3")], check=True, capture_output=True)
wav.unlink()
print(f"BGM {N / SR:.1f}s loop → {out / 'bright-lab.mp3'}")
