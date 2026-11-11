import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Boss, BossStyle, Expression, Pose } from "../character/Boss";
import { floatY } from "./core";

/**
 * 살아 움직이는 사장님.
 * - poses: [{f, pose, expression?}] 프레임마다 포즈 교체 → 교체 순간 스쿼시&스트레치
 * - enter: 등장 방식 (jump: 아래에서 점프, slideL/slideR: 옆에서 미끄러짐, drop: 위에서 떨어짐)
 * - hops: 이 프레임들에서 깡총 점프
 * - lean: 기울기(도), 말할 때 몸이 살짝 리듬을 탐 (BossLive 컨텍스트의 talk 사용)
 */
export type PoseKey = { f: number; pose: Pose; expression?: Expression; tilt?: number; look?: [number, number] };
export const BossActor: React.FC<{
  poses: PoseKey[];
  size?: number;
  enter?: "jump" | "slideL" | "slideR" | "drop" | "none" | "peekL" | "peekR" | "popUp" | "spin" | "walkL" | "walkR";
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
  // 옆에서 빼꼼: 몸을 기울인 채 화면 가장자리에서 반쯤 나옴
  if (enter === "peekL") { ex = (1 - ep) * -size * 0.9; er = 14 * ep + (1 - ep) * 30; }
  if (enter === "peekR") { ex = (1 - ep) * size * 0.9; er = -14 * ep - (1 - ep) * 30; }
  // 아래에서 쑥: 빠르게 튀어 올라옴
  if (enter === "popUp") { const pp = spring({ frame: ef, fps, config: { damping: 7, stiffness: 260, mass: 0.6 } }); ey = (1 - pp) * size; }
  // 걸어 들어옴: 통통 튀며 옆에서 이동 (14프레임마다 한 걸음)
  let walkSy = 0;
  if (enter === "walkL" || enter === "walkR") {
    const dur = 40;
    const k = Math.min(1, Math.max(0, ef / dur));
    ex = (1 - k) * (enter === "walkL" ? -size * 1.5 : size * 1.5);
    if (k < 1) { ey = -Math.abs(Math.sin(ef * 0.45)) * size * 0.05; er = Math.sin(ef * 0.45) * 4; walkSy = Math.abs(Math.cos(ef * 0.45)) * 0.03; }
  }
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
  const sy = 1 + breathe + sq + hs - landSq - walkSy;
  const sx = 1 - (sq + hs - landSq) * 0.6;
  // 빙글: 등장할 때 좌우로 한 바퀴 뒤집히며 들어옴
  const spinX = enter === "spin" ? Math.cos((1 - Math.min(1, ep)) * Math.PI * 2) : 1;
  const sway = Math.sin(frame * 0.07) * 1.2;

  const soft = React.useContext(BossStyle) === "soft";
  const w = (size * 440) / 510;
  const lift = Math.min(1, Math.max(0, -(ey + hy) / (size * 0.4)));
  return (
    <div style={{ position: "relative", ...style }}>
      {/* 2.5D: 바닥 그림자 (점프하면 작고 흐려짐) */}
      {soft && visible && (
        <div style={{ position: "absolute", left: ex + w * 0.16, top: size * 0.93, width: w * 0.68, height: size * 0.07, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(27,37,65,0.38), rgba(27,37,65,0) 70%)", transform: `scale(${1 - lift * 0.5})`, opacity: 1 - lift * 0.6 }} />
      )}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transformOrigin: "50% 100%",
          transform: `translate(${ex}px, ${ey + hy + floatY(frame, 3, 0.1)}px) rotate(${er + lean + sway}deg) scale(${(flip ? -1 : 1) * sx * spinX}, ${sy})`,
          filter: soft ? "drop-shadow(10px 14px 10px rgba(27,37,65,0.22))" : undefined,
        }}
      >
        <Boss pose={cur.pose} expression={cur.expression} size={size} headTilt={(cur.tilt ?? 0) + Math.sin(frame * 0.05) * 2} look={cur.look} />
      </div>
    </div>
  );
};


/**
 * 리액션 클로즈업: 원 안에 얼굴을 크게 (집중선 + 튀어나오는 등장).
 * 큰 감정(충격, 반함, 빵 터짐)을 강조할 때 화면 한쪽에 띄운다.
 */
export const ReactionBubble: React.FC<{ f: number; expression: Expression; size?: number; bg?: string; tilt?: number }> = ({ f, expression, size = 420, bg = "#FACC15", tilt = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: f, fps, config: { damping: 8, stiffness: 220, mass: 0.6 } });
  if (f < 0) return null;
  const shake = f < 10 ? Math.sin(f * 3) * 6 * (1 - f / 10) : 0;
  return (
    <div style={{ width: size, height: size, transform: `scale(${p}) rotate(${tilt + shake}deg)`, position: "relative" }}>
      <svg width={size} height={size} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        {Array.from({ length: 16 }, (_, i) => {
          const a = (i / 16) * Math.PI * 2 + frame * 0.02;
          const r0 = size * 0.52, r1 = size * (0.68 + ((i * 7) % 5) * 0.03);
          return <line key={i} x1={size / 2 + Math.cos(a) * r0} y1={size / 2 + Math.sin(a) * r0} x2={size / 2 + Math.cos(a) * r1} y2={size / 2 + Math.sin(a) * r1} stroke="#1B2541" strokeWidth={8} strokeLinecap="round" />;
        })}
      </svg>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: bg, border: "10px solid #1B2541", overflow: "hidden", display: "flex", alignItems: "flex-end", justifyContent: "center", boxShadow: "12px 12px 0 #1B2541" }}>
        <Boss pose="default" expression={expression} crop="head" size={size * 0.95} headTilt={Math.sin(frame * 0.12) * 4} />
      </div>
    </div>
  );
};
