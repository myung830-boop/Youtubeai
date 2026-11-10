import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Boss, Pose } from "../character/Boss";
import { color } from "../styles/theme";

// 1.5초마다 포즈가 바뀌며 튀어오름 + 깜빡임 + 말하기 입모양 테스트
const SEQ: Pose[] = ["wave", "think", "point", "surprise", "happy", "thumbsUp"];

export const CharacterPreview: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const step = Math.floor(fps * 1.5);
  const idx = Math.min(Math.floor(frame / step), SEQ.length - 1);
  const local = frame - idx * step;
  const pop = spring({ frame: local, fps, config: { damping: 9, stiffness: 160 } });
  const scale = interpolate(pop, [0, 1], [0.92, 1]);
  const bob = Math.sin(frame / 6) * 4;
  const blink = frame % 70 >= 66;
  const talk = SEQ[idx] === "point" ? Math.abs(Math.sin(frame / 2.5)) : 0;
  return (
    <AbsoluteFill style={{ background: color.bg, alignItems: "center", justifyContent: "flex-end" }}>
      <div style={{ transform: `translateY(${bob}px) scale(${scale})`, transformOrigin: "50% 100%" }}>
        <Boss pose={SEQ[idx]} blink={blink} talk={talk} size={900} />
      </div>
    </AbsoluteFill>
  );
};
