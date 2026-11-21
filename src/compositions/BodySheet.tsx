import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Boss } from "../character/Boss";
import { GridBg } from "../components/brand";
import { font } from "../styles/theme";

/** 전신 캐릭터 확인용 시트 */
export const BodySheet: React.FC = () => {
  const frame = useCurrentFrame();
  const items: Array<[string, React.ComponentProps<typeof Boss>]> = [
    ["서기", { pose: "default", expression: "smile", legs: "stand" }],
    ["걷기", { pose: "wave", expression: "joy", legs: "walk", t: 8 }],
    ["가리키기", { pose: "present", expression: "talk", legs: "stand" }],
    ["앉아 타이핑", { pose: "typing", expression: "think", legs: "sit" }],
    ["앉아 머그", { pose: "holdMug", expression: "smile", legs: "sit" }],
    ["만세", { pose: "cheer", expression: "starstruck", legs: "stand" }],
  ];
  return (
    <AbsoluteFill>
      <GridBg tone="light" cell={60} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", justifyContent: "space-around", paddingBottom: 60 }}>
        {items.map(([t, p]) => (
          <div key={t} style={{ textAlign: "center", fontFamily: font.family, fontWeight: 900, fontSize: 34 }}>
            <Boss {...p} crop="body" size={600} t={p.t ?? frame} />
            <div>{t}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
