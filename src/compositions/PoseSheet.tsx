import React from "react";
import { AbsoluteFill } from "remotion";
import { Boss, DEFAULT_EXPRESSION, POSES, Pose } from "../character/Boss";
import { color, font } from "../styles/theme";

const LABEL: Record<Pose, string> = {
  default: "기본",
  think: "고민",
  point: "설명·가리키기",
  happy: "신남·주먹",
  surprise: "놀람",
  worry: "걱정·땀",
  wave: "인사",
  thumbsUp: "엄지척",
};

export const PoseSheet: React.FC = () => (
  <AbsoluteFill style={{ background: color.bg, fontFamily: font.family, padding: 60 }}>
    <div style={{ display: "flex", alignItems: "baseline", gap: 24, color: color.main }}>
      <div style={{ fontSize: 56, fontWeight: 800 }}>사장님 캐릭터 포즈 시트</div>
      <div style={{ fontSize: 28, fontWeight: 500, color: color.ink, opacity: 0.6 }}>pose · expression</div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 28, marginTop: 36, flex: 1 }}>
      {POSES.map((p) => (
        <div key={p} style={{ background: color.white, borderRadius: 28, border: `3px solid ${color.sub}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingTop: 20, overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", top: 18, left: 22, fontSize: 30, fontWeight: 700, color: color.main }}>{LABEL[p]}</div>
          <div style={{ position: "absolute", top: 58, left: 22, fontSize: 20, fontWeight: 500, color: color.ink, opacity: 0.5 }}>
            pose="{p}" · {DEFAULT_EXPRESSION[p]}
          </div>
          <Boss pose={p} size={340} />
        </div>
      ))}
    </div>
  </AbsoluteFill>
);
