"""녹음 → 단어별 시간 (오프라인 음성인식, sherpa-onnx SenseVoice).
사용: python3 scripts/transcribe.py <model_dir> public/ep001/voice.mp3 out/words.json
"""
import json, os, subprocess, sys, wave
from pathlib import Path
import numpy as np
import sherpa_onnx

model_dir, audio, out = sys.argv[1:4]
ROOT = Path(__file__).resolve().parent.parent
FFDIR = ROOT / "node_modules/@remotion/compositor-linux-x64-gnu"
wav = ROOT / "out/_asr.wav"
subprocess.run([str(FFDIR / "ffmpeg"), "-v", "error", "-y", "-i", audio, "-ac", "1", "-ar", "16000", "-c:a", "pcm_s16le", str(wav)], check=True, env={**os.environ, "LD_LIBRARY_PATH": str(FFDIR)})
w = wave.open(str(wav)); x = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768
SR = 16000
rec = sherpa_onnx.OfflineRecognizer.from_sense_voice(model=f"{model_dir}/model.int8.onnx", tokens=f"{model_dir}/tokens.txt", language="ko", use_itn=True, num_threads=4)
# 무음 기준으로 12초 안팎 조각으로 나눔
HOP = 160; n = len(x) // HOP
e = np.sqrt((x[: n * HOP].reshape(n, HOP) ** 2).mean(1))
quiet = e < np.percentile(e, 25) * 1.5
cuts, last = [0], 0
for i in range(n):
    if i * HOP - cuts[-1] > 8 * SR and quiet[i] and quiet[max(0, i - 15):i + 15].all():
        cuts.append(i * HOP)
cuts.append(len(x))
words = []
for a, b in zip(cuts[:-1], cuts[1:]):
    s = rec.create_stream(); s.accept_waveform(SR, x[a:b]); rec.decode_stream(s)
    r = s.result
    for tok, t in zip(r.tokens, r.timestamps):
        words.append({"t": round(a / SR + t, 2), "tok": tok})
    print(f"{a/SR:6.1f}-{b/SR:6.1f}: {r.text}")
json.dump(words, open(out, "w"), ensure_ascii=False)
