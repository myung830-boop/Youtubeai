import React from "react";
import { color, font, ui } from "../styles/theme";

/** 실험 노트(모눈종이) 배경. tone="light" | "navy" */
export const GridBg: React.FC<{ tone?: "light" | "navy"; cell?: number; children?: React.ReactNode; style?: React.CSSProperties; bleed?: boolean }> = ({
  tone = "light",
  cell = 48,
  children,
  style,
  bleed = false,
}) => {
  const line = tone === "light" ? ui.grid : ui.gridDark;
  return (
    <div
      style={{
        position: "absolute",
        inset: bleed ? -1500 : 0, // bleed: 카메라가 움직여도 가장자리가 안 보이게 크게
        background: tone === "light" ? color.bg : color.main,
        backgroundImage: `linear-gradient(${line} 2px, transparent 2px), linear-gradient(90deg, ${line} 2px, transparent 2px)`,
        backgroundSize: `${cell}px ${cell}px`,
        fontFamily: font.family,
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** 굵은 외곽선 + 어긋난 그림자 카드 */
export const Card: React.FC<{ children: React.ReactNode; bg?: string; shadow?: number; style?: React.CSSProperties }> = ({
  children,
  bg = color.white,
  shadow = 10,
  style,
}) => (
  <div
    style={{
      background: bg,
      border: `${ui.stroke}px solid ${color.ink}`,
      borderRadius: ui.radius,
      boxShadow: ui.shadow(shadow),
      ...style,
    }}
  >
    {children}
  </div>
);

/** 형광펜 강조: 글자 아래쪽 절반에 노란 마커 */
export const Mark: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color: c = color.accent }) => (
  <span style={{ background: `linear-gradient(transparent 55%, ${c} 55%, ${c} 92%, transparent 92%)`, padding: "0 0.08em" }}>{children}</span>
);

/** "실험 #001" 태그 — 모든 영상/썸네일에 붙는 시리즈 번호 */
export const ExperimentTag: React.FC<{ no: number | string; size?: number; style?: React.CSSProperties }> = ({ no, size = 36, style }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: size * 0.3,
      background: color.accent,
      color: color.ink,
      border: `${Math.max(3, size / 8)}px solid ${color.ink}`,
      borderRadius: 999,
      padding: `${size * 0.18}px ${size * 0.6}px`,
      fontFamily: font.family,
      fontWeight: 800,
      fontSize: size,
      boxShadow: ui.shadow(size / 7),
      ...style,
    }}
  >
    <Flask size={size * 0.95} />
    실험 #{typeof no === "number" ? String(no).padStart(3, "0") : no}
  </div>
);

/** 플라스크 아이콘 (실험실 모티프) */
export const Flask: React.FC<{ size?: number; fill?: string }> = ({ size = 40, fill = color.white }) => (
  <svg viewBox="0 0 40 40" width={size} height={size}>
    <path d="M15,5 L25,5 M17,5 L17,15 L7,32 Q5,36 10,36 L30,36 Q35,36 33,32 L23,15 L23,5" fill={fill} stroke={color.ink} strokeWidth={3.5} strokeLinejoin="round" strokeLinecap="round" />
    <path d="M11,27 L29,27 L32,33 Q33,34 30,34 L10,34 Q7,34 8,33 Z" fill={color.point} />
    <circle cx={18} cy={22} r={2} fill={color.point} />
    <circle cx={23} cy={18} r={1.5} fill={color.point} />
  </svg>
);

/** 워드마크: 사장님 [AI] 실험실 */
export const Wordmark: React.FC<{ size?: number; tone?: "light" | "navy"; style?: React.CSSProperties }> = ({ size = 80, tone = "light", style }) => {
  const fg = tone === "light" ? color.main : color.white;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: size * 0.18, fontFamily: font.family, fontWeight: 800, fontSize: size, color: fg, letterSpacing: "-0.03em", lineHeight: 1, ...style }}>
      <span>사장님</span>
      <span
        style={{
          background: color.accent,
          color: color.main,
          border: `${size * 0.07}px solid ${color.ink}`,
          borderRadius: size * 0.22,
          padding: `${size * 0.04}px ${size * 0.16}px ${size * 0.08}px`,
          boxShadow: ui.shadow(size * 0.07),
          transform: "rotate(-4deg)",
          display: "inline-block",
        }}
      >
        AI
      </span>
      <span>실험실</span>
    </div>
  );
};

/** 말풍선 */
export const Bubble: React.FC<{ children: React.ReactNode; tail?: "left" | "right" | "bottom"; style?: React.CSSProperties; fontSize?: number }> = ({
  children,
  tail = "left",
  style,
  fontSize = 44,
}) => {
  const tailPos: Record<string, React.CSSProperties> = {
    left: { left: -22, bottom: 30, transform: "rotate(45deg)" },
    right: { right: -22, bottom: 30, transform: "rotate(45deg)" },
    bottom: { left: 60, bottom: -22, transform: "rotate(45deg)" },
  };
  return (
    <div style={{ position: "relative", display: "inline-block", ...style }}>
      <div
        style={{
          position: "absolute",
          width: 40,
          height: 40,
          background: color.white,
          border: `${ui.stroke}px solid ${color.ink}`,
          ...(tail === "left" ? { borderTop: "none", borderRight: "none" } : tail === "right" ? { borderBottom: "none", borderLeft: "none" } : { borderTop: "none", borderLeft: "none" }),
          ...tailPos[tail],
        }}
      />
      <div
        style={{
          background: color.white,
          border: `${ui.stroke}px solid ${color.ink}`,
          borderRadius: ui.radius,
          padding: "22px 34px",
          fontFamily: font.family,
          fontWeight: 700,
          fontSize,
          color: color.ink,
          lineHeight: 1.35,
        }}
      >
        {children}
      </div>
    </div>
  );
};

/** 영상 자막: 흰 박스 + 네이비 글자, 강조어는 <Mark> */
export const Caption: React.FC<{ children: React.ReactNode; fontSize?: number; style?: React.CSSProperties }> = ({ children, fontSize = 52, style }) => (
  <div
    style={{
      display: "inline-block",
      background: color.white,
      border: `5px solid ${color.ink}`,
      borderRadius: 18,
      padding: "14px 30px",
      fontFamily: font.family,
      fontWeight: 800,
      fontSize,
      color: color.ink,
      lineHeight: 1.3,
      textAlign: "center",
      boxShadow: ui.shadow(7),
      ...style,
    }}
  >
    {children}
  </div>
);

/** 체크 아이템 */
export const CheckItem: React.FC<{ children: React.ReactNode; fontSize?: number }> = ({ children, fontSize = 44 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: fontSize * 0.4, fontFamily: font.family, fontWeight: 700, fontSize, color: color.ink }}>
    <div style={{ width: fontSize * 1.1, height: fontSize * 1.1, borderRadius: fontSize * 0.3, background: color.point, border: `4px solid ${color.ink}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg viewBox="0 0 24 24" width={fontSize * 0.75} height={fontSize * 0.75}>
        <path d="M5,12.5 L10,17 L19,7" fill="none" stroke="#fff" strokeWidth={3.6} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    {children}
  </div>
);
