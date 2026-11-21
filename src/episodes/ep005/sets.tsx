import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { Boss } from "../../character/Boss";
import { BrandIcon } from "../../brands/registry";
import { color, font, ui } from "../../styles/theme";
import { lerp } from "../../motion/core";
import { CL } from "./ui";

const F = font.family;

/** 모니터 (정면). 화면 내용은 children (1600x900 기준을 scale) */
export const Monitor: React.FC<{ w: number; children?: React.ReactNode; glow?: boolean }> = ({ w, children, glow = true }) => {
  const h = (w * 9) / 16;
  return (
    <div style={{ position: "relative", width: w + 36, fontFamily: F }}>
      <div style={{ width: w + 36, height: h + 36, background: "#1B2541", borderRadius: 22, padding: 18, boxShadow: glow ? `0 0 60px rgba(217,119,87,0.25), ${ui.shadow(12)}` : ui.shadow(12), border: `6px solid ${color.ink}` }}>
        <div style={{ width: w, height: h, borderRadius: 8, overflow: "hidden", background: "#F7F4ED", position: "relative" }}>
          <div style={{ width: 1600, height: 900, transform: `scale(${w / 1600})`, transformOrigin: "0 0" }}>{children}</div>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 40%)" }} />
        </div>
      </div>
      <div style={{ width: w * 0.12, height: w * 0.1, background: "#2A3350", margin: "0 auto", borderLeft: `6px solid ${color.ink}`, borderRight: `6px solid ${color.ink}` }} />
      <div style={{ width: w * 0.36, height: 22, background: "#2A3350", margin: "0 auto", borderRadius: 12, border: `6px solid ${color.ink}` }} />
    </div>
  );
};

/** 와이드 작업실: 벽·바닥·책상(왼쪽 모니터는 3/4로 돌아감)·식물·조명. 사장님은 밖에서 배치 */
export const Studio: React.FC<{ screen?: React.ReactNode; monitorTurn?: number; children?: React.ReactNode; lamp?: boolean }> = ({ screen, monitorTurn = 24, children, lamp = true }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: -200, overflow: "hidden", fontFamily: F }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 1000, background: "linear-gradient(180deg,#F3EEE4,#E9E1D2)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 1000, bottom: 0, background: "repeating-linear-gradient(90deg,#C9A984 0 180px,#C09E78 180px 360px)", borderTop: `8px solid ${color.ink}` }} />
      {/* 벽 장식: 채널 액자 + 선반 */}
      <div style={{ position: "absolute", left: 1460, top: 300, width: 360, height: 230, background: "#fff", border: `8px solid ${color.ink}`, borderRadius: 16, boxShadow: ui.shadow(8), display: "flex", alignItems: "center", justifyContent: "center", gap: 12, fontWeight: 900, fontSize: 34, color: color.main }}>
        <div style={{ width: 70, height: 70, borderRadius: 16, background: "#FF0000", display: "flex", alignItems: "center", justifyContent: "center" }}><svg viewBox="0 0 40 40" width={40} height={40}><path d="M14,10 L30,20 L14,30 Z" fill="#fff" /></svg></div>
        <div style={{ lineHeight: 1.1 }}>오늘부터<br />AI 사장님</div>
      </div>
      <div style={{ position: "absolute", left: 1880, top: 480, width: 360, height: 26, background: "#8B5E34", border: `6px solid ${color.ink}` }} />
      {["🪴", "📚", "👟"].map((e, i) => <div key={e} style={{ position: "absolute", left: 1900 + i * 110, top: 380, fontSize: 90 }}>{e}</div>)}
      {lamp && <div style={{ position: "absolute", left: 420, top: 0, width: 10, height: 260, background: color.ink }} />}
      {lamp && <div style={{ position: "absolute", left: 360, top: 250, width: 130, height: 70, background: "#FACC15", border: `6px solid ${color.ink}`, borderRadius: "70px 70px 10px 10px", boxShadow: `0 40px 120px 40px rgba(250,204,21,${0.25 + 0.05 * Math.sin(frame * 0.1)})` }} />}
      {/* 책상 */}
      <div style={{ position: "absolute", left: 300, top: 820, width: 1100, height: 46, background: "#B98B5A", border: `8px solid ${color.ink}`, borderRadius: 12, boxShadow: ui.shadow(10) }} />
      <div style={{ position: "absolute", left: 340, top: 866, width: 28, height: 300, background: "#8B5E34", border: `6px solid ${color.ink}` }} />
      <div style={{ position: "absolute", left: 1330, top: 866, width: 28, height: 300, background: "#8B5E34", border: `6px solid ${color.ink}` }} />
      {/* 모니터 (3/4 회전) */}
      <div style={{ position: "absolute", left: 420, top: 360, perspective: 1600 }}>
        <div style={{ transform: `rotateY(${monitorTurn}deg)`, transformOrigin: "0% 50%" }}><Monitor w={720}>{screen}</Monitor></div>
      </div>
      {/* 키보드·커피 */}
      <div style={{ position: "absolute", left: 700, top: 790, width: 360, height: 34, background: "#E9EDF5", border: `6px solid ${color.ink}`, borderRadius: 10 }} />
      <div style={{ position: "absolute", left: 1170, top: 730, fontSize: 90 }}>☕</div>
      {children}
    </div>
  );
};

/** 위에서 본 책상 (탑다운) */
export const DeskTop: React.FC<{ screen?: React.ReactNode; children?: React.ReactNode }> = ({ screen, children }) => (
  <div style={{ position: "absolute", inset: -300, background: "#C9A984", fontFamily: F }}>
    <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0 3px, transparent 3px 70px)" }} />
    <div style={{ position: "absolute", left: 480, top: 330, width: 1560, height: 880, background: "#D9AE7E", border: `12px solid ${color.ink}`, borderRadius: 30, boxShadow: ui.shadow(16) }} />
    {/* 모니터 위에서: 얇은 막대 + 화면은 살짝 세워 보이게 */}
    <div style={{ position: "absolute", left: 760, top: 300, perspective: 1200 }}>
      <div style={{ transform: "rotateX(58deg)", transformOrigin: "50% 100%" }}>
        <div style={{ width: 1000, height: 562, background: "#1B2541", border: `8px solid ${color.ink}`, borderRadius: 18, padding: 14 }}>
          <div style={{ width: 972 - 28, height: 562 - 28 - 16, overflow: "hidden", borderRadius: 6, background: "#F7F4ED" }}>
            <div style={{ width: 1600, height: 900, transform: `scale(${944 / 1600})`, transformOrigin: "0 0" }}>{screen}</div>
          </div>
        </div>
      </div>
    </div>
    <div style={{ position: "absolute", left: 1000, top: 900, width: 560, height: 150, background: "#E9EDF5", border: `8px solid ${color.ink}`, borderRadius: 16, backgroundImage: "repeating-linear-gradient(90deg, transparent 0 42px, #C9D0DE 42px 46px), repeating-linear-gradient(0deg, transparent 0 34px, #C9D0DE 34px 38px)" }} />
    <div style={{ position: "absolute", left: 1620, top: 930, width: 70, height: 110, background: "#E9EDF5", border: `7px solid ${color.ink}`, borderRadius: 40 }} />
    <div style={{ position: "absolute", left: 1760, top: 760, width: 150, height: 150, borderRadius: "50%", background: "#fff", border: `8px solid ${color.ink}`, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 100, height: 100, borderRadius: "50%", background: "#6B3E26" }} /></div>
    <div style={{ position: "absolute", left: 600, top: 820, width: 260, height: 330, background: "#FFF7D6", border: `7px solid ${color.ink}`, transform: "rotate(-8deg)", padding: 18, fontWeight: 900, fontSize: 30 }}>메모<div style={{ fontSize: 24, marginTop: 10, lineHeight: 1.6 }}>☑ 설치<br />☑ 폴더<br />☐ 첫 영상</div></div>
    {children}
  </div>
);

/** 모니터 속 시점: 화면 안에서 사장님을 바라봄 (화면 빛 + 테두리) */
export const MonitorPOV: React.FC<{ expression?: React.ComponentProps<typeof Boss>["expression"]; pose?: React.ComponentProps<typeof Boss>["pose"]; children?: React.ReactNode }> = ({ expression = "think", pose = "typing", children }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: -200, background: "radial-gradient(circle at 50% 40%, #4A3A30 0%, #1B1714 70%)" }} />
      <div style={{ position: "absolute", left: 1400, top: 80, width: 300, height: 400, background: "radial-gradient(circle, rgba(250,204,21,0.35), rgba(250,204,21,0) 70%)" }} />
      <div style={{ position: "absolute", left: 460, top: 160 }}>
        <div style={{ filter: `brightness(1.05) drop-shadow(0 0 40px rgba(217,119,87,${0.35 + 0.08 * Math.sin(frame * 0.2)}))` }}><Boss pose={pose} expression={expression} crop="bust" size={1000} /></div>
      </div>
      {/* 화면 빛이 얼굴에 */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(247,244,237,0.12), rgba(217,119,87,0.10))", mixBlendMode: "screen" }} />
      {children}
      {/* 모니터 테두리 (안쪽에서 본 프레임) */}
      <div style={{ position: "absolute", inset: 0, border: "46px solid #0F1424", borderRadius: 40, boxShadow: "inset 0 0 80px rgba(0,0,0,0.6)" }} />
      <div style={{ position: "absolute", left: 960 - 8, top: 14, width: 16, height: 16, borderRadius: "50%", background: "#2B3350", boxShadow: "0 0 8px rgba(120,200,255,0.6)" }} />
    </div>
  );
};

/* ── 대화 말풍선 ── */
export const BossSays: React.FC<{ f: number; text: string; w?: number; tail?: "left" | "right" | "down"; size?: number; real?: boolean }> = ({ f, text, w = 720, tail = "left", size = 40, real }) => {
  const typed = text.slice(0, Math.max(0, Math.ceil(f * 1.6)));
  if (f < 0) return null;
  return (
    <div style={{ position: "relative", width: w, background: "#fff", border: `7px solid ${color.ink}`, borderRadius: 30, padding: "20px 28px", boxShadow: ui.shadow(10), fontFamily: F, fontWeight: 900, fontSize: size, lineHeight: 1.4, transform: `scale(${lerp(f, 0, 8, 0.6, 1)})`, transformOrigin: tail === "left" ? "0 100%" : tail === "right" ? "100% 100%" : "50% 100%" }}>
      {real && <div style={{ position: "absolute", top: -26, left: 22, background: color.accent, border: `4px solid ${color.ink}`, borderRadius: 999, padding: "0 14px", fontSize: 22 }}>실제로 했던 요청</div>}
      “{typed}{typed.length < text.length ? "▍" : ""}”
      <svg width={60} height={50} style={{ position: "absolute", ...(tail === "left" ? { left: 30, bottom: -44 } : tail === "right" ? { right: 30, bottom: -44 } : { left: w / 2 - 30, bottom: -44 }) }}>
        <path d={tail === "right" ? "M10,0 L50,0 L52,46 Z" : "M10,0 L50,0 L8,46 Z"} fill="#fff" stroke={color.ink} strokeWidth={7} strokeLinejoin="round" />
        <rect x={6} y={-8} width={50} height={12} fill="#fff" />
      </svg>
    </div>
  );
};
export const ClaudeSays: React.FC<{ f: number; text?: string; node?: React.ReactNode; w?: number; size?: number }> = ({ f, text, node, w = 640, size = 34 }) => {
  if (f < 0) return null;
  const typing = f < 14;
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start", fontFamily: F, transform: `translateY(${lerp(f, 0, 8, 30, 0)}px)`, opacity: lerp(f, 0, 6, 0, 1) }}>
      <div style={{ flexShrink: 0, filter: "drop-shadow(4px 4px 0 #1B2541)" }}><BrandIcon id="claude" size={72} /></div>
      <div style={{ width: w, background: "#F7F4ED", border: `6px solid ${CL}`, borderRadius: 26, padding: "18px 24px", boxShadow: ui.shadow(8), fontWeight: 800, fontSize: size, lineHeight: 1.4, color: "#23201E" }}>
        {typing ? (
          <div style={{ display: "flex", gap: 8, padding: "8px 0" }}>{[0, 1, 2].map((k) => <div key={k} style={{ width: 14, height: 14, borderRadius: "50%", background: CL, opacity: 0.3 + 0.7 * Math.abs(Math.sin((f + k * 5) * 0.3)) }} />)}</div>
        ) : (
          <>{text}{node}</>
        )}
      </div>
    </div>
  );
};

/** 실사 사진 원형 */
export const PhotoDisc: React.FC<{ src: string; size: number }> = ({ src, size }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", overflow: "hidden", border: `8px solid ${color.ink}`, boxShadow: ui.shadow(10) }}>
    <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  </div>
);
