import React from "react";
import { AbsoluteFill } from "remotion";
import { Boss, DEFAULT_EXPRESSION, Expression, EXPRESSIONS, POSES, Pose } from "../character/Boss";
import { color, font } from "../styles/theme";

const LABEL: Record<Pose, string> = {
  default: "기본",
  think: "고민",
  point: "설명·가리키기",
  happy: "신남·주먹",
  surprise: "놀람",
  worry: "걱정·땀",
  wave: "인사 (손 흔듦)",
  thumbsUp: "엄지척",
  relax: "여유 (뒷짐)",
  cheer: "만세·환호",
  shrug: "어깨 으쓱",
  facepalm: "이마 짚기",
  typing: "노트북 작업",
  holdMug: "커피 한 잔",
  present: "소개하기",
  clap: "박수",
};

const EXP_LABEL: Record<Expression, string> = {
  smile: "미소", talk: "말하기", think: "생각", joy: "기쁨", surprise: "놀람", worry: "걱정", wink: "윙크",
  starstruck: "반함 (별눈)", tired: "지침", smug: "뿌듯·으쓱", laugh: "빵 터짐", shock: "충격", determined: "의지",
};

export const PoseSheet: React.FC = () => (
  <AbsoluteFill style={{ background: color.bg, fontFamily: font.family, padding: "40px 50px" }}>
    <div style={{ display: "flex", alignItems: "baseline", gap: 24, color: color.main }}>
      <div style={{ fontSize: 48, fontWeight: 800 }}>사장님 캐릭터 포즈 16종</div>
      <div style={{ fontSize: 24, fontWeight: 500, color: color.ink, opacity: 0.6 }}>NEW 표시 = 이번에 추가 · 손 흔들기·주먹·타자·박수는 영상에서 계속 움직여요</div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gridTemplateRows: "1fr 1fr", gap: 16, marginTop: 24, flex: 1 }}>
      {POSES.map((p, i) => (
        <div key={p} style={{ background: color.white, borderRadius: 22, border: `3px solid ${i >= 8 ? color.accent : color.sub}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", top: 10, left: 14, fontSize: 22, fontWeight: 800, color: color.main }}>{LABEL[p]}</div>
          {i >= 8 && <div style={{ position: "absolute", top: 10, right: 10, background: color.accent, borderRadius: 8, padding: "2px 8px", fontSize: 16, fontWeight: 900 }}>NEW</div>}
          <div style={{ position: "absolute", top: 40, left: 14, fontSize: 15, fontWeight: 500, opacity: 0.5 }}>{p} · {DEFAULT_EXPRESSION[p]}</div>
          <Boss pose={p} size={330} t={8} />
        </div>
      ))}
    </div>
  </AbsoluteFill>
);

export const ExpressionSheet: React.FC = () => (
  <AbsoluteFill style={{ background: color.bg, fontFamily: font.family, padding: "40px 50px" }}>
    <div style={{ fontSize: 48, fontWeight: 800, color: color.main }}>사장님 표정 13종</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 18, marginTop: 30 }}>
      {EXPRESSIONS.map((e, i) => (
        <div key={e} style={{ background: color.white, borderRadius: 22, border: `3px solid ${i >= 7 ? color.accent : color.sub}`, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 12, overflow: "hidden" }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: color.main }}>{EXP_LABEL[e]}{i >= 7 ? " ✨" : ""}</div>
          <Boss pose="default" expression={e} crop="head" size={220} />
        </div>
      ))}
    </div>
  </AbsoluteFill>
);
