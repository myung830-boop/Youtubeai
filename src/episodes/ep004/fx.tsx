import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { BrandIcon } from "../../brands/registry";
import { color, font, ui } from "../../styles/theme";
import { easeInOut, lerp } from "../../motion/core";
import { PK, PK_DARK, SCREEN_H, SCREEN_W } from "./mockups";

const F = font.family;

/** 두께가 있는 3D 휴대폰. 화면은 SCREEN_W x SCREEN_H 기준으로 scale */
export const Phone3D: React.FC<{ scale?: number; ry?: number; rx?: number; rz?: number; depth?: number; children: React.ReactNode; shadow?: boolean; bodyColor?: string }> = ({ scale = 1, ry = 0, rx = 0, rz = 0, depth = 26, children, shadow = true, bodyColor = "#1B2541" }) => {
  const W = SCREEN_W + 28, H = SCREEN_H + 28, R = 56;
  return (
    <div style={{ width: W * scale, height: H * scale, perspective: 2400 }}>
      <div style={{ width: W, height: H, position: "relative", transformStyle: "preserve-3d", transform: `scale(${scale}) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`, transformOrigin: "0 0" }}>
        {/* 그림자 */}
        {shadow && <div style={{ position: "absolute", left: 30, top: 40, width: W, height: H, borderRadius: R, background: "rgba(27,37,65,0.35)", filter: "blur(18px)", transform: `translateZ(${-depth - 30}px)` }} />}
        {/* 뒤판 */}
        <div style={{ position: "absolute", inset: 0, borderRadius: R, background: bodyColor, transform: `translateZ(${-depth}px)` }} />
        {/* 옆면 (층층이 쌓아 두께) */}
        {Array.from({ length: 6 }, (_, k) => (
          <div key={k} style={{ position: "absolute", inset: 0, borderRadius: R, border: `6px solid ${k % 2 ? "#2C3A63" : "#24305A"}`, transform: `translateZ(${-depth + (k * depth) / 6}px)` }} />
        ))}
        {/* 앞면 */}
        <div style={{ position: "absolute", inset: 0, borderRadius: R, background: bodyColor, padding: 14, boxShadow: "inset 0 0 0 3px #3A4A7A" }}>
          <div style={{ width: SCREEN_W, height: SCREEN_H, borderRadius: R - 14, overflow: "hidden", position: "relative", background: "#fff" }}>
            {children}
            <div style={{ position: "absolute", left: "50%", top: 12, width: 110, height: 30, borderRadius: 16, background: "#0B0F1C", transform: "translateX(-50%)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(115deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 35%)", pointerEvents: "none" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

/** 사진 카드 (작은 폴라로이드) */
export const PhotoCard: React.FC<{ src: string; w: number; h: number; label?: string; rot?: number }> = ({ src, w, h, label, rot = 0 }) => (
  <div style={{ background: "#fff", border: `6px solid ${color.ink}`, borderRadius: 18, padding: 10, boxShadow: ui.shadow(10), transform: `rotate(${rot}deg)`, fontFamily: F }}>
    <Img src={staticFile(src)} style={{ width: w, height: h, objectFit: "cover", display: "block", borderRadius: 10 }} />
    {label && <div style={{ textAlign: "center", fontWeight: 900, fontSize: Math.max(22, w * 0.11), marginTop: 6 }}>{label}</div>}
  </div>
);

/** 3D 회전목마 (카드는 항상 정면): 원형으로 돌다가 front 카드가 가운데 앞에 멈춤 */
export const Carousel3D: React.FC<{ f: number; items: React.ReactNode[]; radius?: number; front?: number; spinFrames?: number; cy?: number }> = ({ f, items, radius = 700, front = 0, spinFrames = 70, cy = 560 }) => {
  const n = items.length;
  const base = lerp(f, 0, spinFrames, 360, 0, easeInOut) - (front * 360) / n;
  const placed = items.map((it, i) => {
    const a = ((base + (i * 360) / n) * Math.PI) / 180;
    const z = Math.cos(a);
    return { it, i, x: Math.sin(a) * radius, z, y: -z * 60 };
  }).sort((p, q) => p.z - q.z);
  return (
    <>
      {placed.map((p) => (
        <div key={p.i} style={{ position: "absolute", left: 960 + p.x, top: cy + p.y, transform: `translate(-50%,-50%) scale(${0.5 + 0.5 * ((p.z + 1) / 2) ** 1.4})`, filter: p.z < 0 ? `blur(${(-p.z * 3).toFixed(1)}px) brightness(${0.75 + 0.25 * (p.z + 1)})` : "none" }}>{p.it}</div>
      ))}
    </>
  );
};

/** 허브-스포크: 가운데 피클, 둘레 아이템이 궤도 회전 → suck 이후 중앙으로 빨려 들어감 */
export const Orbit: React.FC<{ f: number; items: React.ReactNode[]; cx?: number; cy?: number; rx?: number; ry?: number; suckAt?: number; hub?: React.ReactNode; speed?: number }> = ({ f, items, cx = 960, cy = 540, rx = 560, ry = 230, suckAt = 1e9, hub, speed = 0.012 }) => {
  const n = items.length;
  const s = lerp(f - suckAt, 0, 26, 1, 0, easeInOut);
  const placed = items.map((it, i) => {
    const ang = f * speed * Math.PI * 2 + (i / n) * Math.PI * 2;
    const x = Math.cos(ang) * rx * s, y = Math.sin(ang) * ry * s;
    const z = Math.sin(ang);
    return { it, x, y, z, i };
  });
  const sorted = [...placed].sort((a, b) => a.z - b.z);
  const back = sorted.filter((p) => p.z < 0), front = sorted.filter((p) => p.z >= 0);
  const render = (p: (typeof placed)[0]) => (
    <div key={p.i} style={{ position: "absolute", left: cx + p.x, top: cy + p.y, transform: `translate(-50%,-50%) scale(${(0.72 + 0.28 * (p.z + 1) / 2) * (0.3 + 0.7 * s)})`, filter: p.z < -0.3 ? "blur(1.5px) brightness(0.9)" : "none", opacity: lerp(f - suckAt, 20, 28, 1, 0) }}>{p.it}</div>
  );
  return (
    <>
      <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0 }}>
        <ellipse cx={cx} cy={cy} rx={rx * s} ry={ry * s} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth={4} strokeDasharray="14 14" />
      </svg>
      {back.map(render)}
      {hub && <div style={{ position: "absolute", left: cx, top: cy, transform: `translate(-50%,-50%) scale(${1 + 0.25 * lerp(f - suckAt, 18, 26, 0, 1) * lerp(f - suckAt, 26, 40, 1, 0)})` }}>{hub}</div>}
      {front.map(render)}
    </>
  );
};

/** 피클 허브 (원 + 로고 + 빛) */
export const PickleHub: React.FC<{ size?: number; f?: number }> = ({ size = 220, f = 0 }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", background: "#fff", border: `8px solid ${color.ink}`, boxShadow: `0 0 0 ${10 + 6 * Math.sin(f * 0.15)}px rgba(99,211,97,0.45), ${ui.shadow(12)}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <BrandIcon id="pickle" size={size * 0.68} />
  </div>
);

/** 업무 칩 (아이콘+글자) */
export const TaskChip: React.FC<{ icon: string; t: string; bg?: string; size?: number }> = ({ icon, t, bg = "#fff", size = 36 }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: bg, border: `6px solid ${color.ink}`, borderRadius: 20, padding: "10px 22px", boxShadow: ui.shadow(8), fontFamily: F, fontWeight: 900, fontSize: size, whiteSpace: "nowrap" }}>
    <span style={{ fontSize: size * 1.2 }}>{icon}</span>{t}
  </div>
);

/** 시계 (실사 시계 사진 위 바늘). angle은 분침 회전수(바퀴) */
export const PhotoClock: React.FC<{ size: number; turns: number; src?: string }> = ({ size, turns, src = "stock/clockface.jpg" }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", overflow: "hidden", border: `10px solid ${color.ink}`, boxShadow: ui.shadow(14), position: "relative" }}>
    <Img src={staticFile(src)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(1.05) contrast(1.05)" }} />
    <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.25)" }} />
    <svg viewBox="-100 -100 200 200" width={size} height={size} style={{ position: "absolute", inset: 0 }}>
      <line x1={0} y1={0} x2={0} y2={-52} stroke={color.ink} strokeWidth={9} strokeLinecap="round" transform={`rotate(${turns * 30})`} />
      <line x1={0} y1={0} x2={0} y2={-78} stroke="#FF4D4F" strokeWidth={6} strokeLinecap="round" transform={`rotate(${turns * 360})`} />
      <circle r={9} fill={color.ink} />
    </svg>
  </div>
);

/** 길(로드맵) 위 단계 표지판 */
export const RoadStep: React.FC<{ n: number; t: string; on: boolean }> = ({ n, t, on }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, fontFamily: F }}>
    <div style={{ width: 120, height: 120, borderRadius: "50%", background: on ? PK : "#fff", border: `8px solid ${color.ink}`, boxShadow: ui.shadow(10), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 60, fontWeight: 900, color: color.ink }}>{n}</div>
    <div style={{ background: "#fff", border: `6px solid ${color.ink}`, borderRadius: 16, padding: "6px 20px", fontWeight: 900, fontSize: 38, boxShadow: ui.shadow(6), whiteSpace: "nowrap" }}>{t}</div>
  </div>
);

/** 메뉴 탭이 세워지는 카드 (스카이뷰용) */
export const TabStandCard: React.FC<{ label: string; icon: React.ReactNode; up: number; on: boolean }> = ({ label, icon, up, on }) => (
  <div style={{ transformOrigin: "50% 100%", transform: `rotateX(${(1 - up) * -90}deg)`, width: 230, height: 200, background: on ? PK : "#fff", border: `7px solid ${color.ink}`, borderRadius: 26, boxShadow: on ? `0 0 0 10px rgba(99,211,97,0.45)` : "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: F, fontWeight: 900, fontSize: 40 }}>
    {icon}
    {label}
  </div>
);

export const PK_COLORS = { PK, PK_DARK };
