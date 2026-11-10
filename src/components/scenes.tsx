import React from "react";
import { color, font, ui } from "../styles/theme";

/** 러버블 느낌의 그라데이션 (주황 → 핑크 → 보라 → 파랑). 공식 로고 파일로 바꿔 끼울 수 있음 */
export const LOVABLE_GRADIENT = "linear-gradient(135deg, #FF8A3D 0%, #FF4D8D 38%, #B455F6 70%, #4F7BFF 100%)";

export const LovableHeart: React.FC<{ size?: number; glow?: boolean }> = ({ size = 80, glow = false }) => (
  <svg viewBox="0 0 100 92" width={size} height={size * 0.92} style={glow ? { filter: "drop-shadow(0 0 18px rgba(255,77,141,0.75))" } : undefined}>
    <defs>
      <linearGradient id="lvg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FF8A3D" />
        <stop offset="0.4" stopColor="#FF4D8D" />
        <stop offset="0.72" stopColor="#B455F6" />
        <stop offset="1" stopColor="#4F7BFF" />
      </linearGradient>
    </defs>
    <path d="M50,88 C20,66 4,50 4,28 C4,12 16,3 29,3 C39,3 46,9 50,17 C54,9 61,3 71,3 C84,3 96,12 96,28 C96,50 80,66 50,88 Z" fill="url(#lvg)" />
  </svg>
);

/** "♥ Lovable" 배지 */
export const LovableBadge: React.FC<{ size?: number; dark?: boolean; style?: React.CSSProperties }> = ({ size = 48, dark = false, style }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: size * 0.25,
      background: dark ? "#111018" : color.white,
      border: `${Math.max(3, size / 10)}px solid ${color.ink}`,
      borderRadius: 999,
      padding: `${size * 0.18}px ${size * 0.55}px ${size * 0.18}px ${size * 0.35}px`,
      boxShadow: ui.shadow(size / 7),
      fontFamily: font.family,
      fontWeight: 800,
      fontSize: size,
      letterSpacing: "-0.03em",
      ...style,
    }}
  >
    <LovableHeart size={size * 1.05} />
    <span style={{ background: LOVABLE_GRADIENT, WebkitBackgroundClip: "text", color: "transparent" }}>Lovable</span>
  </div>
);

/** 휴대폰 틀 */
export const Phone: React.FC<{ w?: number; children: React.ReactNode; style?: React.CSSProperties; title?: string }> = ({ w = 360, children, style, title }) => (
  <div style={{ width: w, height: w * 2.05, background: color.ink, borderRadius: w * 0.14, padding: w * 0.035, boxShadow: ui.shadow(12), ...style }}>
    <div style={{ width: "100%", height: "100%", background: color.white, borderRadius: w * 0.11, overflow: "hidden", display: "flex", flexDirection: "column", fontFamily: font.family }}>
      <div style={{ height: w * 0.1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: w * 0.28, height: w * 0.05, background: color.ink, borderRadius: 99 }} />
      </div>
      {title && <div style={{ padding: `${w * 0.02}px ${w * 0.06}px ${w * 0.04}px`, fontSize: w * 0.065, fontWeight: 800, color: color.main }}>{title}</div>}
      <div style={{ flex: 1, padding: `0 ${w * 0.06}px`, display: "flex", flexDirection: "column", gap: w * 0.035, fontSize: w * 0.05 }}>{children}</div>
    </div>
  </div>
);

/** 브라우저(PC) 틀 */
export const Browser: React.FC<{ w: number; h: number; url?: string; children: React.ReactNode; style?: React.CSSProperties }> = ({ w, h, url = "lovable.dev", children, style }) => (
  <div style={{ width: w, height: h, background: color.white, border: `${ui.stroke}px solid ${color.ink}`, borderRadius: 24, boxShadow: ui.shadow(10), overflow: "hidden", display: "flex", flexDirection: "column", fontFamily: font.family, ...style }}>
    <div style={{ height: 56, background: color.sub, borderBottom: `4px solid ${color.ink}`, display: "flex", alignItems: "center", gap: 10, padding: "0 20px" }}>
      {["#FF6B6B", "#FACC15", "#4ADE80"].map((c) => (
        <div key={c} style={{ width: 16, height: 16, borderRadius: 8, background: c, border: `2px solid ${color.ink}` }} />
      ))}
      <div style={{ marginLeft: 16, flex: 1, background: color.white, borderRadius: 10, padding: "6px 16px", fontSize: 22, color: color.ink, opacity: 0.7 }}>{url}</div>
    </div>
    <div style={{ flex: 1, position: "relative" }}>{children}</div>
  </div>
);

/** 앱 화면 안의 입력칸/행 */
export const Field: React.FC<{ label: string; value: string; w?: number }> = ({ label, value, w = 360 }) => (
  <div>
    <div style={{ fontSize: w * 0.038, color: color.ink, opacity: 0.55, fontWeight: 600, marginBottom: 4 }}>{label}</div>
    <div style={{ border: `2px solid #D5DDEB`, borderRadius: w * 0.03, padding: `${w * 0.022}px ${w * 0.035}px`, fontSize: w * 0.048, fontWeight: 600, color: color.ink }}>{value}</div>
  </div>
);

export const AppButton: React.FC<{ children: React.ReactNode; w?: number; bg?: string }> = ({ children, w = 360, bg = color.point }) => (
  <div style={{ background: bg, color: color.white, borderRadius: w * 0.035, padding: `${w * 0.035}px`, textAlign: "center", fontWeight: 800, fontSize: w * 0.05 }}>{children}</div>
);

/** 큰 장면 제목 */
export const SceneTitle: React.FC<{ children: React.ReactNode; size?: number; style?: React.CSSProperties; light?: boolean }> = ({ children, size = 76, style, light }) => (
  <div style={{ fontFamily: font.family, fontWeight: 800, fontSize: size, letterSpacing: "-0.04em", lineHeight: 1.18, color: light ? color.white : color.ink, ...style }}>{children}</div>
);

/** 번호 단계 알약 */
export const StepPill: React.FC<{ n: number; label: string; active?: boolean }> = ({ n, label, active }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 22px 12px 12px",
      borderRadius: 999,
      border: `5px solid ${color.ink}`,
      background: active ? color.accent : color.white,
      boxShadow: active ? ui.shadow(7) : "none",
      fontFamily: font.family,
      fontWeight: 800,
      fontSize: 30,
      color: color.ink,
      opacity: active ? 1 : 0.55,
    }}
  >
    <div style={{ width: 46, height: 46, borderRadius: 23, background: color.main, color: color.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{n}</div>
    {label}
  </div>
);

/** 빨간 X 항목 (고민) */
export const XItem: React.FC<{ children: React.ReactNode; fontSize?: number }> = ({ children, fontSize = 44 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: fontSize * 0.4, fontFamily: font.family, fontWeight: 700, fontSize, color: color.ink }}>
    <div style={{ width: fontSize * 1.1, height: fontSize * 1.1, borderRadius: fontSize * 0.3, background: "#FF5A5F", border: `4px solid ${color.ink}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg viewBox="0 0 24 24" width={fontSize * 0.6} height={fontSize * 0.6}>
        <path d="M6,6 L18,18 M18,6 L6,18" stroke="#fff" strokeWidth={4} strokeLinecap="round" />
      </svg>
    </div>
    {children}
  </div>
);

/** 큰 화살표 */
export const Arrow: React.FC<{ w?: number; color?: string; style?: React.CSSProperties }> = ({ w = 120, color: c = color.accent, style }) => (
  <svg viewBox="0 0 120 60" width={w} height={w / 2} style={style}>
    <path d="M6,22 L72,22 L72,6 L114,30 L72,54 L72,38 L6,38 Z" fill={c} stroke={color.ink} strokeWidth={5} strokeLinejoin="round" />
  </svg>
);

/** 점선 자리표시 (실제 화면 녹화가 들어갈 자리) */
export const Placeholder: React.FC<{ label: string; style?: React.CSSProperties }> = ({ label, style }) => (
  <div style={{ border: `4px dashed ${color.point}`, borderRadius: 20, background: "rgba(59,130,246,0.06)", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontFamily: font.family, fontWeight: 700, fontSize: 28, color: color.point, padding: 20, ...style }}>
    {label}
  </div>
);
