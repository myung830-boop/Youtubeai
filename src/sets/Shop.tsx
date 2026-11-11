import React from "react";
import { useCurrentFrame } from "remotion";
import { color, font, ui } from "../styles/theme";
import { Shoe } from "../episodes/ep001/mockups";

/** 신발세탁소 세트 — 3인칭 와이드샷용 가게 내부 (1920x1080 기준, 카메라로 확대해서 씀) */
export const ShopInterior: React.FC<{ children?: React.ReactNode; counterFront?: React.ReactNode }> = ({ children, counterFront }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", fontFamily: font.family }}>
      {/* 벽 + 바닥 */}
      <div style={{ position: "absolute", inset: "0 0 300px 0", background: "#EAF2FF" }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 300, background: "repeating-linear-gradient(90deg,#D9E3F3 0 120px,#CFDAEC 120px 240px)", borderTop: `8px solid ${color.ink}` }} />
      {/* 간판 */}
      <div style={{ position: "absolute", left: 660, top: 40, width: 600, height: 110, background: color.main, border: `8px solid ${color.ink}`, borderRadius: 22, display: "flex", alignItems: "center", justifyContent: "center", gap: 18, color: "#fff", fontWeight: 900, fontSize: 56, boxShadow: ui.shadow(10) }}>
        <Shoe w={90} /> 신발세탁소
      </div>
      {/* 창문 */}
      <div style={{ position: "absolute", left: 90, top: 190, width: 420, height: 420, background: "linear-gradient(180deg,#BFE3FF,#E8F6FF)", border: `10px solid ${color.ink}`, borderRadius: 18 }}>
        <div style={{ position: "absolute", left: 260, top: 50, width: 90, height: 90, borderRadius: "50%", background: color.accent, border: `6px solid ${color.ink}`, transform: `scale(${1 + Math.sin(frame * 0.08) * 0.04})` }} />
        <div style={{ position: "absolute", left: 200, top: 0, bottom: 0, width: 10, background: color.ink }} />
        <div style={{ position: "absolute", top: 200, left: 0, right: 0, height: 10, background: color.ink }} />
      </div>
      {/* 신발 선반 */}
      <div style={{ position: "absolute", right: 90, top: 190, width: 560, height: 520, border: `10px solid ${color.ink}`, borderRadius: 14, background: "#F7F1E6" }}>
        {[0, 1, 2].map((r) => (
          <div key={r} style={{ position: "absolute", left: 0, right: 0, top: 150 + r * 170, height: 14, background: color.ink }} />
        ))}
        {[0, 1, 2].map((r) => [0, 1, 2].map((c) => (
          <div key={`${r}${c}`} style={{ position: "absolute", left: 30 + c * 175, top: 60 + r * 170 }}><Shoe w={140} fill={(r + c) % 2 ? "#fff" : color.sub} /></div>
        )))}
      </div>
      {/* 세탁기 */}
      {[0, 1].map((i) => (
        <div key={i} style={{ position: "absolute", left: 560 + i * 200, top: 420, width: 180, height: 220, background: "#fff", border: `8px solid ${color.ink}`, borderRadius: 18 }}>
          <div style={{ position: "absolute", left: 30, top: 60, width: 120, height: 120, borderRadius: "50%", border: `8px solid ${color.ink}`, background: "#BFE3FF", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 10, borderRadius: "50%", background: `conic-gradient(from ${frame * (8 + i * 3)}deg, #8EC9FF, #fff, #8EC9FF)` }} />
          </div>
        </div>
      ))}
      {children}
      {/* 카운터 (캐릭터 하반신을 가림) */}
      <div style={{ position: "absolute", left: 620, top: 700, width: 900, height: 260, background: color.main, border: `10px solid ${color.ink}`, borderRadius: "22px 22px 0 0", boxShadow: ui.shadow(10) }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 44, background: "#C9A27A", borderBottom: `8px solid ${color.ink}`, borderRadius: "14px 14px 0 0" }} />
      </div>
      {counterFront}
    </div>
  );
};

/** 스카이뷰: 위에서 내려다본 가게 평면도 */
export const ShopFloorPlan: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden", fontFamily: font.family, background: "#DCE6F5" }}>
    <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(27,37,65,0.08) 3px,transparent 3px),linear-gradient(90deg,rgba(27,37,65,0.08) 3px,transparent 3px)", backgroundSize: "120px 120px" }} />
    {/* 벽 */}
    <div style={{ position: "absolute", left: 160, top: 90, right: 160, bottom: 90, border: `22px solid ${color.ink}`, borderRadius: 10 }} />
    {/* 문 */}
    <div style={{ position: "absolute", left: 880, bottom: 80, width: 200, height: 34, background: "#DCE6F5" }} />
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}><path d="M880,990 A200,200 0 0 1 1080,790" fill="none" stroke={color.ink} strokeWidth={6} strokeDasharray="14 10" /></svg>
    {/* 카운터 */}
    <div style={{ position: "absolute", left: 560, top: 520, width: 800, height: 120, background: color.main, border: `8px solid ${color.ink}`, borderRadius: 18 }} />
    <div style={{ position: "absolute", left: 1180, top: 535, width: 140, height: 90, background: "#CBD5E1", border: `6px solid ${color.ink}`, borderRadius: 10 }} />
    {/* 선반 */}
    <div style={{ position: "absolute", left: 220, top: 160, width: 140, height: 640, background: "#F7F1E6", border: `8px solid ${color.ink}`, borderRadius: 12 }} />
    {/* 세탁기 */}
    {[0, 1, 2].map((i) => (
      <div key={i} style={{ position: "absolute", left: 1500, top: 180 + i * 220, width: 180, height: 180, background: "#fff", border: `8px solid ${color.ink}`, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 110, height: 110, borderRadius: "50%", border: `8px solid ${color.ink}`, background: "#BFE3FF" }} />
      </div>
    ))}
    {/* 라벨 */}
    {[["선반", 290, 470], ["카운터", 900, 580], ["세탁기", 1590, 860], ["입구", 980, 950]].map(([t, x, y]) => (
      <div key={t as string} style={{ position: "absolute", left: (x as number) - 70, top: (y as number) - 22, width: 140, textAlign: "center", fontWeight: 900, fontSize: 30, color: color.ink, opacity: 0.55 }}>{t}</div>
    ))}
    {children}
  </div>
);
