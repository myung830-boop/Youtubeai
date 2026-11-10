import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { color, font, ui } from "../styles/theme";
import { clamp01, easeInOut, lerp, useSpring } from "./core";

/** 마우스 커서: from→to 이동 후 click 프레임에 클릭(눌림+파문) */
export const Cursor: React.FC<{ f: number; from: [number, number]; to: [number, number]; moveDur?: number; click?: number }> = ({ f, from, to, moveDur = 18, click }) => {
  if (f < 0) return null;
  const x = interpolate(f, [0, moveDur], [from[0], to[0]], { ...clamp01, easing: easeInOut });
  const y = interpolate(f, [0, moveDur], [from[1], to[1]], { ...clamp01, easing: easeInOut });
  const c = click !== undefined ? f - click : -1;
  const press = c >= 0 && c < 6 ? 0.8 : 1;
  return (
    <>
      {c >= 0 && c < 16 && (
        <div style={{ position: "absolute", left: x - 60, top: y - 60, width: 120, height: 120, borderRadius: "50%", border: `8px solid ${color.accent}`, transform: `scale(${0.2 + c / 10})`, opacity: 1 - c / 16 }} />
      )}
      <svg viewBox="0 0 40 52" width={64} height={83} style={{ position: "absolute", left: x - 6, top: y - 4, transform: `scale(${press})`, transformOrigin: "10% 10%", filter: "drop-shadow(4px 4px 0 rgba(27,37,65,0.9))" }}>
        <path d="M4,3 L4,40 L13,31 L20,47 L27,44 L20,29 L33,29 Z" fill="#fff" stroke={color.ink} strokeWidth={3.5} strokeLinejoin="round" />
      </svg>
    </>
  );
};

/** 타자 치듯 나오는 글자 (dur 프레임 동안 다 나옴) */
export const TypeText: React.FC<{ f: number; text: string; dur: number; caret?: boolean }> = ({ f, text, dur, caret = true }) => {
  const frame = useCurrentFrame();
  const n = Math.floor(lerp(f, 0, dur, 0, text.length, (t) => t));
  const done = n >= text.length;
  return (
    <span>
      {text.slice(0, Math.max(0, n))}
      {caret && f >= 0 && (!done || frame % 20 < 10) && <span style={{ color: color.point }}>▍</span>}
    </span>
  );
};

/** 동전 */
export const CoinIcon: React.FC<{ size?: number; label?: string; spin?: number }> = ({ size = 120, label = "C", spin = 0 }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", background: color.accent, border: `${size * 0.06}px solid ${color.ink}`, boxShadow: ui.shadow(size * 0.06), display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font.family, fontWeight: 900, fontSize: size * 0.5, color: color.ink, transform: `scaleX(${Math.cos(spin)})` }}>
    {Math.cos(spin) > 0 ? label : ""}
  </div>
);

/** 색종이 */
export const Confetti: React.FC<{ f: number; n?: number; x?: number; y?: number }> = ({ f, n = 40, x = 960, y = 300 }) => {
  if (f < 0 || f > 90) return null;
  const cols = [color.accent, color.point, "#FF4D8D", "#4ADE80", "#B455F6", "#fff"];
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const a = ((i * 137.5) % 360) * (Math.PI / 180);
        const v = 14 + ((i * 31) % 12);
        const px = x + Math.cos(a) * v * f * 1.1;
        const py = y + Math.sin(a) * v * f * 0.8 + 0.55 * f * f;
        return (
          <div key={i} style={{ position: "absolute", left: px, top: py, width: 16 + (i % 3) * 6, height: 26, background: cols[i % cols.length], border: `3px solid ${color.ink}`, borderRadius: 4, transform: `rotate(${f * (8 + (i % 5) * 4)}deg) scaleX(${Math.cos(f * 0.3 + i)})`, opacity: lerp(f, 60, 90, 1, 0) }} />
        );
      })}
    </>
  );
};

/** 큰 제목 칩 (스텝 번호 등) */
export const StepBadge: React.FC<{ f: number; n: number; label: string }> = ({ f, n, label }) => {
  const p = useSpring(f, { damping: 10, stiffness: 200 });
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 18, background: color.white, border: `7px solid ${color.ink}`, borderRadius: 999, padding: "10px 34px 10px 12px", boxShadow: ui.shadow(9), fontFamily: font.family, fontWeight: 900, fontSize: 52, color: color.ink, transform: `scale(${p}) rotate(${(1 - p) * -20}deg)`, opacity: f < 0 ? 0 : 1 }}>
      <div style={{ width: 78, height: 78, borderRadius: "50%", background: color.accent, border: `6px solid ${color.ink}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 46 }}>{n}</div>
      {label}
    </div>
  );
};

/** 사람 아이콘 (손님) */
export const PersonIcon: React.FC<{ size?: number; c?: string }> = ({ size = 70, c = color.point }) => (
  <svg viewBox="0 0 40 46" width={size} height={size * 1.15}>
    <circle cx={20} cy={12} r={9} fill={c} stroke={color.ink} strokeWidth={3} />
    <path d="M4,44 Q4,24 20,24 Q36,24 36,44 Z" fill={c} stroke={color.ink} strokeWidth={3} />
  </svg>
);

/** 종이비행기 경로 */
export const PaperPlane: React.FC<{ f: number; from: [number, number]; to: [number, number]; dur?: number }> = ({ f, from, to, dur = 22 }) => {
  if (f < 0 || f > dur + 4) return null;
  const t = Math.min(1, f / dur);
  const e = easeInOut(t);
  const x = from[0] + (to[0] - from[0]) * e;
  const y = from[1] + (to[1] - from[1]) * e - Math.sin(t * Math.PI) * 220;
  const ang = Math.atan2(to[1] - from[1] - Math.cos(t * Math.PI) * 220 * Math.PI / 2, to[0] - from[0]) * (180 / Math.PI);
  return (
    <svg viewBox="0 0 60 40" width={120} height={80} style={{ position: "absolute", left: x - 60, top: y - 40, transform: `rotate(${ang}deg)`, opacity: f > dur ? 0 : 1 }}>
      <path d="M2,20 L58,2 L40,38 L28,24 Z" fill="#fff" stroke={color.ink} strokeWidth={3} strokeLinejoin="round" />
      <path d="M28,24 L58,2" stroke={color.ink} strokeWidth={3} />
    </svg>
  );
};
