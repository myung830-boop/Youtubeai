import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { color, font, ui } from "../styles/theme";
import { Cue, norm } from "../lib/srt";

/* ───────────── 자막 기준 타이밍 ─────────────
 * 영상 컴포지션이 자막(초)과 장면 시작 프레임을 내려주면,
 * 장면 안에서 useCue("코딩은") 처럼 '그 말이 나온 순간부터 몇 프레임 지났는지'를 얻는다.
 * 말과 화면 움직임이 자동으로 맞는다.
 */
export const CueClock = React.createContext<{ cues: Cue[]; sceneFrom: number; fps: number } | null>(null);

/** 해당 문구가 들어간 자막이 시작된 뒤 지난 프레임 (장면 기준). 못 찾으면 fallback 프레임 기준 */
export const useCue = (snippet: string, fallbackSec = 0, offsetSec = 0): number => {
  const frame = useCurrentFrame();
  const ctx = React.useContext(CueClock);
  const fps = ctx?.fps ?? 30;
  if (!ctx) return frame - Math.round((fallbackSec + offsetSec) * fps);
  const key = norm(snippet);
  const c = ctx.cues.find((q) => norm(q.text).includes(key) && q.start * fps >= ctx.sceneFrom - fps * 0.5);
  const startAbs = c ? c.start * fps : ctx.sceneFrom + fallbackSec * fps;
  return frame - Math.round(startAbs - ctx.sceneFrom + offsetSec * fps);
};

/* ───────────── 이징/스프링 ───────────── */
export const useSpring = (f: number, cfg: { damping?: number; stiffness?: number; mass?: number } = {}) => {
  const { fps } = useVideoConfig();
  return spring({ frame: f, fps, config: { damping: 11, stiffness: 170, mass: 0.8, ...cfg } });
};
export const clamp01 = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);
export const lerp = (f: number, a: number, b: number, from: number, to: number, ease = easeOut) =>
  interpolate(f, [a, b], [from, to], { ...clamp01, easing: ease });
/** 결정적 노이즈 (손떨림 카메라용) */
export const noise = (t: number, seed = 1) => Math.sin(t * 1.3 + seed) * 0.6 + Math.sin(t * 2.7 + seed * 2.1) * 0.3 + Math.sin(t * 5.1 + seed * 3.7) * 0.1;

/* ───────────── 팝 등장 ───────────── */
type PopProps = {
  f: number; // 시작 기준 프레임(0에서 등장 시작)
  from?: { x?: number; y?: number; scale?: number; rotate?: number; rotateX?: number; rotateY?: number };
  out?: number; // 이 프레임부터 퇴장
  children: React.ReactNode;
  style?: React.CSSProperties;
  bouncy?: boolean;
};
export const Pop: React.FC<PopProps> = ({ f, from = {}, out, children, style, bouncy = true }) => {
  const p = useSpring(f, bouncy ? { damping: 9, stiffness: 180 } : { damping: 16, stiffness: 140 });
  const o0 = useSpring(f - (out ?? 100000), { damping: 18, stiffness: 200 });
  const o = out !== undefined ? o0 : 0;
  const k = 1 - p;
  const x = (from.x ?? 0) * k + (out !== undefined ? -60 * o : 0);
  const y = (from.y ?? 40) * k;
  const s = (from.scale ?? 0.4) + (1 - (from.scale ?? 0.4)) * p;
  const r = (from.rotate ?? 0) * k;
  const rx = (from.rotateX ?? 0) * k;
  const ry = (from.rotateY ?? 0) * k;
  const visible = f >= 0 && (out === undefined || o < 0.99);
  return (
    <div
      style={{
        opacity: visible ? Math.min(1, p * 3) * (1 - o) : 0,
        transform: `perspective(1400px) translate(${x}px, ${y}px) scale(${s * (1 - 0.3 * o)}) rotate(${r}deg) rotateX(${rx}deg) rotateY(${ry}deg)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/* ───────────── 키네틱 타이포: 글자 단위 튀어오르기 ───────────── */
export const KText: React.FC<{ f: number; text: string; size?: number; color?: string; stagger?: number; weight?: number; stroke?: boolean; style?: React.CSSProperties }> = ({
  f,
  text,
  size = 80,
  color: c = color.ink,
  stagger = 1.6,
  weight = 900,
  stroke,
  style,
}) => {
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "flex", flexWrap: "nowrap", whiteSpace: "nowrap", fontFamily: font.family, fontWeight: weight, fontSize: size, color: c, letterSpacing: "-0.04em", lineHeight: 1.1, ...style }}>
      {Array.from(text).map((ch, i) => {
        const p = spring({ frame: f - i * stagger, fps, config: { damping: 10, stiffness: 220, mass: 0.6 } });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              whiteSpace: "pre",
              transform: `translateY(${(1 - p) * size * 0.7}px) scale(${0.3 + 0.7 * p}) rotate(${(1 - p) * (i % 2 ? 12 : -12)}deg)`,
              opacity: f - i * stagger < 0 ? 0 : Math.min(1, p * 2),
              ...(stroke ? { WebkitTextStroke: `${size * 0.09}px ${color.ink}`, paintOrder: "stroke fill", textShadow: `${size * 0.06}px ${size * 0.06}px 0 ${color.ink}` } : {}),
            }}
          >
            {ch}
          </span>
        );
      })}
    </div>
  );
};

/* ───────────── 형광펜이 그어지는 강조 ───────────── */
export const MarkSweep: React.FC<{ f: number; children: React.ReactNode; dur?: number; c?: string }> = ({ f, children, dur = 10, c = color.accent }) => {
  const w = lerp(f, 0, dur, 0, 100);
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span style={{ position: "absolute", left: -6, right: -6, bottom: "6%", height: "42%", background: c, transformOrigin: "left", transform: `scaleX(${w / 100}) skewX(-8deg)`, borderRadius: 6, zIndex: 0 }} />
      <span style={{ position: "relative" }}>{children}</span>
    </span>
  );
};

/* ───────────── 카메라: 줌/팬/기울기 + 손떨림 ───────────── */
export type CamKey = { f: number; x?: number; y?: number; zoom?: number; rot?: number; rx?: number; ry?: number };
export const Camera: React.FC<{ keys: CamKey[]; start?: number; shake?: number; children: React.ReactNode; handheld?: number }> = ({ keys, start = 0, shake = 0, handheld = 1, children }) => {
  const frame = useCurrentFrame() - start;
  const val = (prop: keyof CamKey, def: number) => {
    const ks = keys.filter((k) => k[prop] !== undefined);
    if (ks.length === 0) return def;
    if (frame <= ks[0].f) return ks[0][prop] as number;
    for (let i = 0; i < ks.length - 1; i++) {
      const a = ks[i], b = ks[i + 1];
      if (frame <= b.f) return interpolate(frame, [a.f, b.f], [a[prop] as number, b[prop] as number], { ...clamp01, easing: easeInOut });
    }
    return ks[ks.length - 1][prop] as number;
  };
  const t = frame / 30;
  const hx = noise(t * 0.7, 1) * 6 * handheld + noise(t * 25, 3) * shake;
  const hy = noise(t * 0.6, 2) * 5 * handheld + noise(t * 23, 5) * shake;
  const hr = noise(t * 0.5, 4) * 0.35 * handheld;
  return (
    <div style={{ position: "absolute", inset: 0, perspective: 1600, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transformOrigin: "50% 50%",
          transform: `scale(${val("zoom", 1)}) translate(${-val("x", 0) + hx}px, ${-val("y", 0) + hy}px) rotate(${val("rot", 0) + hr}deg) rotateX(${val("rx", 0)}deg) rotateY(${val("ry", 0)}deg)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

/** 충격 시 화면 흔들림 양 (f: 충격 후 프레임) */
export const impact = (f: number, amt = 18) => (f < 0 ? 0 : amt * Math.exp(-f / 5));

/* ───────────── 효과: 집중선 / 폭발 / 반짝이 / 스탬프 ───────────── */
export const SpeedLines: React.FC<{ f: number; cx?: number; cy?: number; colorLine?: string; opacity?: number }> = ({ f, cx = 960, cy = 540, colorLine = color.ink, opacity = 0.12 }) => {
  const lines = Array.from({ length: 36 }, (_, i) => i);
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: f < 0 ? 0 : opacity }}>
      {lines.map((i) => {
        const a = (i / lines.length) * Math.PI * 2 + (i % 3) * 0.05;
        const flick = (Math.sin(f * 0.9 + i * 7.1) + 1) / 2;
        const r0 = 520 + flick * 140, r1 = 1400;
        return <line key={i} x1={cx + Math.cos(a) * r0} y1={cy + Math.sin(a) * r0} x2={cx + Math.cos(a) * r1} y2={cy + Math.sin(a) * r1} stroke={colorLine} strokeWidth={4 + (i % 4) * 5} strokeLinecap="round" />;
      })}
    </svg>
  );
};

export const Burst: React.FC<{ f: number; x: number; y: number; r?: number; c?: string; n?: number }> = ({ f, x, y, r = 120, c = color.accent, n = 10 }) => {
  if (f < 0 || f > 22) return null;
  const p = lerp(f, 0, 18, 0, 1);
  return (
    <svg style={{ position: "absolute", left: x - r * 2, top: y - r * 2, overflow: "visible" }} width={r * 4} height={r * 4}>
      {Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2;
        const d0 = r * (0.5 + p), d1 = r * (0.7 + p * 1.2);
        return (
          <line key={i} x1={r * 2 + Math.cos(a) * d0} y1={r * 2 + Math.sin(a) * d0} x2={r * 2 + Math.cos(a) * d1} y2={r * 2 + Math.sin(a) * d1} stroke={c} strokeWidth={14 * (1 - p) + 2} strokeLinecap="round" />
        );
      })}
      <circle cx={r * 2} cy={r * 2} r={r * (0.3 + p * 1.4)} fill="none" stroke={c} strokeWidth={10 * (1 - p)} opacity={1 - p} />
    </svg>
  );
};

export const Sparkles: React.FC<{ f: number; x: number; y: number; spread?: number }> = ({ f, x, y, spread = 260 }) => {
  if (f < 0) return null;
  return (
    <>
      {Array.from({ length: 7 }, (_, i) => {
        const a = i * 2.4, d = spread * (0.5 + ((i * 37) % 10) / 20);
        const p = lerp(f - i * 2, 0, 20, 0, 1);
        const tw = Math.abs(Math.sin((f + i * 5) * 0.25));
        const s = (0.4 + tw * 0.8) * (f - i * 2 < 0 ? 0 : 1) * (1 - lerp(f, 40, 60, 0, 1));
        return (
          <svg key={i} viewBox="-10 -10 20 20" width={44} height={44} style={{ position: "absolute", left: x + Math.cos(a) * d * p - 22, top: y + Math.sin(a) * d * p - 22, transform: `scale(${s}) rotate(${f * 4}deg)` }}>
            <path d="M0,-10 Q1.5,-1.5 10,0 Q1.5,1.5 0,10 Q-1.5,1.5 -10,0 Q-1.5,-1.5 0,-10 Z" fill={i % 2 ? color.accent : "#FFFFFF"} stroke={color.ink} strokeWidth={1.5} />
          </svg>
        );
      })}
    </>
  );
};

/** 도장처럼 쾅 찍히는 라벨 */
export const Stamp: React.FC<{ f: number; children: React.ReactNode; bg?: string; fg?: string; rot?: number; size?: number; style?: React.CSSProperties }> = ({
  f,
  children,
  bg = "#FF4D4F",
  fg = "#fff",
  rot = -10,
  size = 64,
  style,
}) => {
  if (f < 0) return null;
  const s = interpolate(f, [0, 4, 7, 10], [2.6, 0.9, 1.06, 1], clamp01);
  return (
    <div
      style={{
        display: "inline-block",
        background: bg,
        color: fg,
        border: `${size * 0.1}px solid ${color.ink}`,
        borderRadius: size * 0.25,
        padding: `${size * 0.08}px ${size * 0.35}px`,
        fontFamily: font.family,
        fontWeight: 900,
        fontSize: size,
        letterSpacing: "-0.03em",
        boxShadow: ui.shadow(size * 0.12),
        transform: `rotate(${rot}deg) scale(${s})`,
        opacity: lerp(f, 0, 3, 0, 1),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** 떠다니기 (등장 후 계속 살아있게) */
export const floatY = (frame: number, amp = 8, speed = 0.08, phase = 0) => Math.sin(frame * speed + phase) * amp;
