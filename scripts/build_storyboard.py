"""실험 #001 스토리보드 .pptx 생성 (Google Slides에서 열기용).
사용: python3 scripts/build_storyboard.py  → docs/episodes/ep001/storyboard.pptx
먼저 장면 이미지를 out/sb/S01.png ... 와 썸네일 out/Ep001ThumbDynamicA/B.png로 렌더해 둘 것.
"""
import json, io, sys
from pathlib import Path
from PIL import Image
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "docs/episodes/ep001/storyboard.pptx"
FONT = "Noto Sans KR"  # Google Slides 기본 제공 한글 폰트
NAVY, POINT, YELLOW, INK, SUB, BG = (RGBColor.from_string(c) for c in ["0F3B82", "3B82F6", "FACC15", "1B2541", "EAF2FF", "F8FAFF"])

scenes = json.loads((ROOT / "src/episodes/ep001/storyboard.json").read_text())

def jpg(path, w=1600):
    im = Image.open(path).convert("RGB")
    im = im.resize((w, int(im.height * w / im.width)), Image.LANCZOS)
    b = io.BytesIO(); im.save(b, "JPEG", quality=86); b.seek(0)
    return b

prs = Presentation()
prs.slide_width, prs.slide_height = Inches(13.333), Inches(7.5)
blank = prs.slide_layouts[6]

def bg(slide, rgb):
    f = slide.background.fill; f.solid(); f.fore_color.rgb = rgb

def text(slide, x, y, w, h, runs, size=14, color=INK, bold=False, align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP):
    tb = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = tb.text_frame; tf.word_wrap = True; tf.vertical_anchor = anchor
    tf.margin_left = tf.margin_right = Inches(0.05)
    if isinstance(runs, str): runs = [runs]
    for i, line in enumerate(runs):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = align
        r = p.add_run(); r.text = line
        r.font.name = FONT; r.font.size = Pt(size); r.font.bold = bold; r.font.color.rgb = color
    return tb

def box(slide, x, y, w, h, fill, line=None, shape=MSO_SHAPE.ROUNDED_RECTANGLE):
    s = slide.shapes.add_shape(shape, Inches(x), Inches(y), Inches(w), Inches(h))
    s.fill.solid(); s.fill.fore_color.rgb = fill
    if line: s.line.color.rgb = line; s.line.width = Pt(2.5)
    else: s.line.fill.background()
    s.shadow.inherit = False
    if shape == MSO_SHAPE.ROUNDED_RECTANGLE: s.adjustments[0] = 0.12
    return s

# 1) 표지
s = prs.slides.add_slide(blank); bg(s, NAVY)
text(s, 0.8, 1.2, 11, 0.6, "사장님 AI 실험실 · 실험 #001 스토리보드", 20, YELLOW, True)
text(s, 0.8, 1.9, 11.5, 2.2, ["러버블 AI로", "우리 가게 시스템을 만들었어요"], 48, RGBColor(255, 255, 255), True)
text(s, 0.8, 4.6, 11, 1.2, ["신발세탁소 접수 · 사진관리 · 문자발송 · 손님앱", "롱폼 약 9분 · 15개 장면 · 1920×1080"], 18, SUB)
text(s, 0.8, 6.6, 11, 0.5, "[ ] 표시는 사장님 실제 숫자/문장으로 채울 부분 · 화면은 샘플 디자인", 12, SUB)

# 2) 썸네일
s = prs.slides.add_slide(blank); bg(s, BG)
text(s, 0.6, 0.35, 12, 0.6, "썸네일 시안", 26, NAVY, True)
for i, (k, label) in enumerate([("A", "A안 (추천) · 집중선 + 러버블 글로우 + 앱 화면"), ("B", "B안 · 종이장부 → 앱 전후 대비")]):
    x = 0.6 + i * 6.15
    s.shapes.add_picture(jpg(ROOT / f"out/Ep001ThumbDynamic{k}.png", 1280), Inches(x), Inches(1.3), width=Inches(5.95))
    text(s, x, 4.75, 5.95, 0.5, label, 15, INK, True)
text(s, 0.6, 5.5, 12, 1.5, [
    "· 러버블 그라데이션(주황→핑크→보라→파랑)과 하트 배지로 '러버블 영상'임을 바로 알 수 있게",
    "· 실제 앱 화면을 기울여 배치 + 집중선 배경으로 움직임 강조 · 캐릭터는 크게, 표정으로 감정 전달",
    "· 배지는 샘플 디자인입니다. 공식 로고를 쓸 때는 러버블 브랜드 가이드를 확인하고 교체하세요",
], 13, INK)

# 3) 장면별 슬라이드
for sc in scenes:
    s = prs.slides.add_slide(blank); bg(s, BG)
    # 상단 바
    box(s, 0, 0, 13.333, 0.8, NAVY, shape=MSO_SHAPE.RECTANGLE)
    text(s, 0.45, 0.13, 1.3, 0.55, sc["id"], 22, YELLOW, True, anchor=MSO_ANCHOR.MIDDLE)
    text(s, 1.5, 0.13, 7, 0.55, sc["part"], 22, RGBColor(255, 255, 255), True, anchor=MSO_ANCHOR.MIDDLE)
    text(s, 9.3, 0.13, 3.6, 0.55, sc["time"], 18, SUB, True, PP_ALIGN.RIGHT, MSO_ANCHOR.MIDDLE)
    # 화면 이미지
    pic = s.shapes.add_picture(jpg(ROOT / f"out/sb/{sc['id']}.png"), Inches(0.45), Inches(1.15), width=Inches(8.3))
    pic.line.color.rgb = INK; pic.line.width = Pt(2)
    # 오른쪽 설명
    y = 1.15
    for label, key, col in [("화면", "screen", POINT), ("대사 (내레이션)", "line", POINT), ("연출 · 모션", "motion", POINT)]:
        text(s, 9.0, y, 3.9, 0.35, label, 12, col, True)
        n = len(sc[key])
        h = 0.5 + 0.27 * (n // 22 + 1)
        text(s, 9.0, y + 0.32, 3.9, h, sc[key], 13 if key != "line" else 14, INK, key == "line")
        y += 0.32 + h + 0.15
    # 하단 메모 칸
    box(s, 0.45, 6.05, 8.3, 1.05, RGBColor(255, 255, 255), INK)
    text(s, 0.6, 6.12, 8.0, 0.9, ["메모 / 수정 요청:", ""], 12, INK)

prs.save(OUT)
print("saved", OUT, OUT.stat().st_size // 1024, "KB")
