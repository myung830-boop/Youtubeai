"""효과음 직접 합성 (저작권 걱정 없음) → public/sfx/*.wav
python3 scripts/make_sfx.py
"""
import numpy as np, wave, os
SR = 44100
out = os.path.join(os.path.dirname(__file__), "..", "public", "sfx")
os.makedirs(out, exist_ok=True)
rng = np.random.default_rng(7)

def save(name, x, gain=0.8):
    x = x / (np.max(np.abs(x)) + 1e-9) * gain
    fade = int(SR * 0.004)
    x[:fade] *= np.linspace(0, 1, fade); x[-fade:] *= np.linspace(1, 0, fade)
    with wave.open(os.path.join(out, name + ".wav"), "w") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())

def t(d): return np.arange(int(SR * d)) / SR
def env(n, a, d):  # attack/decay seconds
    e = np.ones(n); A = max(1, int(SR * a)); e[:A] = np.linspace(0, 1, A)
    e *= np.exp(-np.arange(n) / (SR * d)); return e
def lowpass(x, cut):  # 1-pole, cut can be array
    y = np.zeros_like(x); a = 0.0
    c = np.broadcast_to(cut, x.shape)
    for i in range(len(x)):
        k = 1 - np.exp(-2 * np.pi * c[i] / SR); a += k * (x[i] - a); y[i] = a
    return y

# 휙 (whoosh): 필터 스윕 노이즈
d = 0.42; n = int(SR * d); tt = t(d)
noise = rng.standard_normal(n)
sweep = 300 + 5200 * np.sin(np.pi * tt / d) ** 2
w = lowpass(noise, sweep) * np.sin(np.pi * tt / d) ** 1.5
save("whoosh", w, 0.7)
# 팡 (pop)
d = 0.14; tt = t(d); f = 900 * np.exp(-tt * 18) + 300
save("pop", np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(tt), 0.002, 0.04), 0.8)
# 딸깍 (click)
d = 0.05; tt = t(d)
save("click", (rng.standard_normal(len(tt)) * 0.5 + np.sin(2 * np.pi * 2400 * tt)) * env(len(tt), 0.0005, 0.008), 0.7)
# 타닥 (키보드 한 번)
d = 0.06; tt = t(d)
save("key", lowpass(rng.standard_normal(len(tt)), 3500) * env(len(tt), 0.0005, 0.01) + 0.3 * np.sin(2 * np.pi * 180 * tt) * env(len(tt), 0.001, 0.015), 0.55)
# 타이핑 1.2초 (여러 번)
d = 1.2; buf = np.zeros(int(SR * d)); k = 0.0
key = lowpass(rng.standard_normal(int(SR * 0.05)), 3200) * env(int(SR * 0.05), 0.0005, 0.009)
while k < d - 0.06:
    i = int(k * SR); buf[i:i + len(key)] += key * rng.uniform(0.6, 1.0); k += rng.uniform(0.06, 0.13)
save("typing", buf, 0.5)
# 딩 (성공/답장)
d = 0.9; tt = t(d)
save("ding", (np.sin(2 * np.pi * 1318 * tt) + 0.5 * np.sin(2 * np.pi * 1976 * tt) + 0.25 * np.sin(2 * np.pi * 2637 * tt)) * env(len(tt), 0.002, 0.25), 0.6)
# 메시지 알림 (두 음)
d = 0.36; tt = t(d); half = len(tt) // 2
x = np.concatenate([np.sin(2 * np.pi * 880 * tt[:half]), np.sin(2 * np.pi * 1320 * tt[half:])]) * env(len(tt), 0.002, 0.12)
save("notify", x, 0.5)
# 쾅 (도장)
d = 0.35; tt = t(d)
thump = np.sin(2 * np.pi * np.cumsum(140 * np.exp(-tt * 9) + 45) / SR) * env(len(tt), 0.001, 0.09)
save("stamp", thump + 0.4 * lowpass(rng.standard_normal(len(tt)), 900) * env(len(tt), 0.001, 0.03), 0.9)
# 반짝 (sparkle)
d = 0.7; tt = t(d); x = np.zeros(len(tt))
for i, fr in enumerate([2093, 2637, 3136, 4186]):
    s = int(i * 0.06 * SR); seg = tt[: len(tt) - s]
    x[s:] += np.sin(2 * np.pi * fr * seg) * env(len(seg), 0.001, 0.12)
save("sparkle", x, 0.45)
# 상승음 (rise): 리빌 직전
d = 0.8; tt = t(d)
f = 200 + 900 * (tt / d) ** 2
x = np.sin(2 * np.pi * np.cumsum(f) / SR) * (tt / d) ** 1.5 + 0.3 * lowpass(rng.standard_normal(len(tt)), 2000 + 4000 * tt / d) * (tt / d)
save("rise", x, 0.5)
print("ok", sorted(os.listdir(out)))
