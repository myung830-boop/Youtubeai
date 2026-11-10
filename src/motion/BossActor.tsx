import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Boss, Expression, Pose } from "../character/Boss";
import { floatY } from "./core";

/**
 * 살아 움직이는 사장님.
 * - poses: [{f, pose, expression?}] 프레임마다 포즈 교체 → 교체 순간 스쿼시&스트레치
 * - enter: 등장 방식 (jump: 아래에서 점프, slideL/slideR: 옆에서 미끄러짐, drop: 위에서 떨어짐)
 * - hops: 이 프레임들에서 깡총 점프
 * - lean: 기울기(도), 말할 때 몸이 살짝 리듬을 탐 (BossLive 컨텍스트의 talk 사용)
 */
export type PoseKey = { f: number; pose: Pose; expression?: Expression };
export const BossActor: React.FC<{
  poses: PoseKey[];
  size?: number;
  enter?: "jump" | "slideL" | "slideR" | "drop" | "none";
  enterAt?: number;
  hops?: number[];
  lean?: number;
  flip?: boolean;
  style?: React.CSSProperties;
}> = ({ poses, size = 640, enter = "jump", enterAt = 0, hops = [], lean = 0, flip = false, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sorted = [...poses].sort((a, b) => a.f - b.f);
  const curIdx = Math.max(0, sorted.filter((p) => p.f <= frame).length - 1);
  const cur = sorted[curIdx];
  const since = frame - cur.f;

  // 포즈 교체 스쿼시 (위아래로 눌렸다가 튐)
  const sq = curIdx === 0 ? 0 : Math.exp(-since / 4) * Math.cos(since * 0.9) * 0.09;

  // 등장
  const ef = frame - enterAt;
  const ep = spring({ frame: ef, fps, config: { damping: 10, stiffness: 120, mass: 0.9 } });
  let ex = 0, ey = 0, er = 0;
  if (enter === "jump") { ey = (1 - ep) * size * 0.9; er = (1 - ep) * -10; }
  if (enter === "slideL") { ex = (1 - ep) * -size * 1.6; er = (1 - ep) * -14; }
  if (enter === "slideR") { ex = (1 - ep) * size * 1.6; er = (1 - ep) * 14; }
  if (enter === "drop") { ey = (1 - ep) * -size * 1.4; }
  const visible = enter === "none" || ef >= 0;

  // 점프
  let hy = 0, hs = 0;
  for (const h of hops) {
    const d = frame - h;
    if (d >= 0 && d < 18) {
      hy += -Math.sin((d / 18) * Math.PI) * size * 0.16;
      if (d < 3) hs += -0.08 * (1 - d / 3); // 웅크림
      if (d >= 16) hs += 0.05;
    }
  }
  // 숨쉬기 + 착지 스쿼시
  const breathe = Math.sin(frame * 0.12) * 0.012;
  const landSq = enter === "drop" ? Math.exp(-Math.max(0, ef - 10) / 4) * (ef > 10 ? 0.12 : 0) * Math.cos((ef - 10) * 0.9) : 0;
  const sy = 1 + breathe + sq + hs - landSq;
  const sx = 1 - (sq + hs - landSq) * 0.6;
  const sway = Math.sin(frame * 0.07) * 1.2;

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transformOrigin: "50% 100%",
        transform: `translate(${ex}px, ${ey + hy + floatY(frame, 3, 0.1)}px) rotate(${er + lean + sway}deg) scale(${(flip ? -1 : 1) * sx}, ${sy})`,
        ...style,
      }}
    >
      <Boss pose={cur.pose} expression={cur.expression} size={size} />
    </div>
  );
};

