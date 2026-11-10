"""음성인식 기준 단어 시간 vs SRT 자막 시간 비교 → 어긋난 자막 찾기"""
import json, re, sys, unicodedata as ud
N = lambda s: ud.normalize("NFC", s)
w = json.load(open("out/words.json"))
words, cur = [], None
for x in w:
    tok = N(x["tok"]).replace(" ", "▁")
    if re.search("[가-힣]", tok):
        if cur and x["t"] - cur[1] < 0.35 and not tok.startswith("▁"): cur = [cur[0], x["t"], cur[2] + tok.replace("▁", "")]
        else:
            if cur: words.append(cur)
            cur = [x["t"], x["t"], tok.replace("▁", "")]
    else:
        if cur: words.append(cur); cur = None
if cur: words.append(cur)
def rd(p):
    src = N(open(p, encoding="utf-8-sig").read().replace("\r", ""))
    out = []
    for b in re.split(r"\n\s*\n", src.strip()):
        ls = b.split("\n"); k = [i for i, l in enumerate(ls) if "-->" in l][0]
        a, z = ls[k].split("-->")
        f = lambda t: sum(float(x) * m for x, m in zip(t.strip().replace(",", ".").split(":"), [3600, 60, 1]))
        out.append((int(ls[0]), f(a), f(z), " ".join(ls[k + 1:])))
    return out
cues = rd(sys.argv[1] if len(sys.argv) > 1 else "public/ep001/voice.srt")
for a, b, s in words:
    if len(s) < 2: continue
    m = [c for c in cues if s[:2] in c[3].replace(" ", "")]
    near = min(m, key=lambda c: abs((c[1] + c[2]) / 2 - a)) if m else None
    flag = ""
    if near and not (near[1] - 0.3 <= a <= near[2] + 0.3): flag = f"  ⚠ 자막 {near[1]:.1f}-{near[2]:.1f} (차이 {a - near[1]:+.1f}s)"
    print(f"{a:6.1f} {s:8s} → " + (f"#{near[0]:<3d} {near[3][:24]}" if near else "(자막에 없음)") + flag)
