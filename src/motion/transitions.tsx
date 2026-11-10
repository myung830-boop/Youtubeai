import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { clamp01, easeInOut, easeOut } from "./core";

export type TransitionType = "whip" | "whipUp" | "zoom" | "flip" | "iris" | "cut";

/** 들어오는/나가는 순간의 변형 (p: 0→1 진행) */
const enterStyle = (t: TransitionType, p: number): React.CSSProperties => {
  const k = 1 - p;
  switch (t) {
    case "whip":
      return { transform: `translateX(${k * 1400}px) skewX(${-k * 18}deg)`, filter: `blur(${k * 26}px)` };
    case "whipUp":
      return { transform: `translateY(${k * 1100}px) skewY(${k * 6}deg)`, filter: `blur(${k * 24}px)` };
    case "zoom":
      return { transform: `scale(${0.55 + 0.45 * p})`, filter: `blur(${k * 18}px)`, opacity: Math.min(1, p * 2) };
    case "flip":
      return { transform: `perspective(1800px) rotateY(${k * -88}deg)`, transformOrigin: "0% 50%", opacity: p < 0.05 ? 0 : 1 };
    case "iris":
      return { clipPath: `circle(${p * 120}% at 50% 55%)` };
    default:
      return {};
  }
};
const exitStyle = (t: TransitionType, p: number): React.CSSProperties => {
  switch (t) {
    case "whip":
      return { transform: `translateX(${-p * 1400}px) skewX(${p * 18}deg)`, filter: `blur(${p * 26}px)` };
    case "whipUp":
      return { transform: `translateY(${-p * 1100}px)`, filter: `blur(${p * 24}px)` };
    case "zoom":
      return { transform: `scale(${1 + p * 1.8})`, filter: `blur(${p * 20}px)`, opacity: 1 - p };
    case "flip":
      return { transform: `perspective(1800px) rotateY(${p * 88}deg)`, transformOrigin: "100% 50%" };
    default:
      return {};
  }
};

/**
 * 화면 한 '비트'. f = 이 비트 시작 후 프레임, len = 다음 비트까지 길이(프레임).
 * inT/outT 로 들어오고 나가는 전환을 고른다.
 */
export const Beat: React.FC<{ f: number; len: number; inT?: TransitionType; outT?: TransitionType; inDur?: number; outDur?: number; children: React.ReactNode; bg?: string }> = ({
  f,
  len,
  inT = "whip",
  outT = "cut",
  inDur = 9,
  outDur = 7,
  children,
  bg,
}) => {
  if (f < 0 || f >= len) return null;
  const pin = interpolate(f, [0, inDur], [0, 1], { ...clamp01, easing: easeOut });
  const pout = interpolate(f, [len - outDur, len], [0, 1], { ...clamp01, easing: easeInOut });
  const st = f < inDur ? enterStyle(inT, pin) : f > len - outDur && outT !== "cut" ? exitStyle(outT, pout) : {};
  return (
    <AbsoluteFill style={{ background: bg, ...st }}>
      {children}
    </AbsoluteFill>
  );
};

/** 전환 순간 하얀 플래시 */
export const Flash: React.FC<{ f: number; dur?: number; c?: string }> = ({ f, dur = 6, c = "#fff" }) => {
  if (f < 0 || f > dur) return null;
  return <AbsoluteFill style={{ background: c, opacity: interpolate(f, [0, dur], [0.85, 0], clamp01) }} />;
};
