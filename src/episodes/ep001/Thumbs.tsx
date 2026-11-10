import React from "react";
import { AbsoluteFill } from "remotion";
import { Boss } from "../../character/Boss";
import { ExperimentTag } from "../../components/brand";
import { LOVABLE_GRADIENT, LovableBadge } from "../../components/scenes";
import { color, font, ui } from "../../styles/theme";
import { CustomerAppScreen, IntakeScreen, Shoe } from "./mockups";

const outlineText = (px: number): React.CSSProperties => ({
  WebkitTextStroke: `${px}px ${color.ink}`,
  paintOrder: "stroke fill",
});

/** 방사형 집중선 배경 */
const Burst: React.FC<{ cx: string; cy: string; a: string; b: string }> = ({ cx, cy, a, b }) => (
  <div
    style={{
      position: "absolute",
      inset: -200,
      background: `repeating-conic-gradient(from 0deg at ${cx} ${cy}, ${a} 0deg 9deg, ${b} 9deg 18deg)`,
    }}
  />
);

/** A안: 집중선 + 러버블 하트 글로우 + 기울어진 앱 화면 + 큰 캐릭터 */
export const Ep001ThumbDynamicA: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: font.family, overflow: "hidden", background: color.main }}>
    <Burst cx="72%" cy="45%" a="#0F3B82" b="#123F8C" />
    {/* 러버블 그라데이션 빛 */}
    <div style={{ position: "absolute", left: 640, top: 40, width: 620, height: 620, borderRadius: "50%", background: LOVABLE_GRADIENT, filter: "blur(70px)", opacity: 0.55 }} />
    {/* 앱 화면 (기울어짐) */}
    <div style={{ position: "absolute", left: 650, top: 70, transform: "rotate(-10deg)" }}>
      <CustomerAppScreen w={250} />
    </div>
    <div style={{ position: "absolute", left: 610, top: 330, transform: "rotate(-16deg)", opacity: 0.95 }}>
      <IntakeScreen w={190} />
    </div>
    {/* 캐릭터 */}
    <div style={{ position: "absolute", right: -95, bottom: -130 }}>
      <Boss pose="happy" size={680} />
    </div>
    {/* 러버블 배지 */}
    <div style={{ position: "absolute", right: 26, top: 22, transform: "rotate(6deg)" }}>
      <div style={{ position: "absolute", inset: -30, background: LOVABLE_GRADIENT, filter: "blur(36px)", opacity: 0.7, borderRadius: 999 }} />
      <LovableBadge size={84} style={{ position: "relative" }} />
    </div>
    {/* 텍스트 */}
    <div style={{ position: "absolute", left: 48, top: 40, transform: "rotate(-3deg)" }}>
      <ExperimentTag no={1} size={30} />
    </div>
    <div style={{ position: "absolute", left: 44, top: 128, fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1.04 }}>
      <div style={{ fontSize: 80, color: color.white, ...outlineText(13), textShadow: `6px 6px 0 ${color.ink}` }}>
        <span style={{ color: "#FF6FAE" }}>러버블 AI</span>를 써서
      </div>
      <div style={{ display: "inline-block", marginTop: 16, background: color.accent, border: `8px solid ${color.ink}`, borderRadius: 18, padding: "0 22px 8px", transform: "rotate(-4deg)", boxShadow: ui.shadow(10) }}>
        <span style={{ fontSize: 104, color: color.ink }}>내 가게 시스템</span>
      </div>
      <div style={{ marginTop: 18, fontSize: 100, color: color.white, ...outlineText(14), textShadow: `7px 7px 0 ${color.ink}` }}>
        만들었다!
      </div>
    </div>
    {/* 기능 칩 */}
    <div style={{ position: "absolute", left: 48, bottom: 36, display: "flex", gap: 12 }}>
      {["접수", "사진", "문자", "손님앱"].map((t) => (
        <div key={t} style={{ background: color.white, border: `5px solid ${color.ink}`, borderRadius: 999, padding: "6px 20px", fontSize: 30, fontWeight: 800, color: color.main, boxShadow: ui.shadow(5) }}>
          ✓ {t}
        </div>
      ))}
    </div>
  </AbsoluteFill>
);

/** B안: 대각선 분할 전/후 비교 (종이 장부 → 앱) */
export const Ep001ThumbDynamicB: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: font.family, overflow: "hidden" }}>
    {/* 왼쪽: 전 (회색 종이) */}
    <div style={{ position: "absolute", inset: 0, background: "#E9E4DA" }} />
    <div style={{ position: "absolute", left: 60, top: 200, width: 330, height: 400, background: "#FFFDF6", border: `6px solid ${color.ink}`, transform: "rotate(-8deg)", padding: 26, display: "flex", flexDirection: "column", gap: 22 }}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 280 24" width={270} height={24}>
          <path d={`M4,12 Q40,${4 + (i % 3) * 6} 80,14 T160,10 T${220 + i * 8},14`} fill="none" stroke="#7A7468" strokeWidth={5} strokeLinecap="round" />
        </svg>
      ))}
    </div>
    <div style={{ position: "absolute", left: 120, top: 500, transform: "rotate(-12deg)" }}>
      <Shoe w={170} dirty fill="#EDE6DA" />
    </div>
    {/* 오른쪽: 후 (러버블 그라데이션) */}
    <div style={{ position: "absolute", inset: 0, background: LOVABLE_GRADIENT, clipPath: "polygon(48% 0, 100% 0, 100% 100%, 34% 100%)" }} />
    <Burst cx="78%" cy="50%" a="rgba(255,255,255,0.0)" b="rgba(255,255,255,0.08)" />
    <div style={{ position: "absolute", inset: 0, clipPath: "polygon(48% 0, 100% 0, 100% 100%, 34% 100%)" }}>
      <div style={{ position: "absolute", right: 70, top: 110, transform: "rotate(8deg)" }}>
        <CustomerAppScreen w={270} />
      </div>
    </div>
    {/* 경계선 */}
    <svg style={{ position: "absolute", inset: 0 }} width={1280} height={720}>
      <line x1={614} y1={0} x2={435} y2={720} stroke={color.ink} strokeWidth={12} />
    </svg>
    {/* 전/후 라벨 */}
    <div style={{ position: "absolute", left: 40, top: 110, background: color.ink, color: color.white, borderRadius: 12, padding: "4px 18px", fontSize: 34, fontWeight: 800, transform: "rotate(-4deg)" }}>BEFORE</div>
    <div style={{ position: "absolute", right: 40, top: 40, background: color.white, color: color.ink, border: `5px solid ${color.ink}`, borderRadius: 12, padding: "2px 18px", fontSize: 34, fontWeight: 800, transform: "rotate(4deg)" }}>AFTER</div>
    {/* 캐릭터 가운데 */}
    <div style={{ position: "absolute", left: 360, bottom: -90 }}>
      <Boss pose="surprise" size={560} />
    </div>
    {/* 제목 */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 18, textAlign: "center", fontWeight: 900, letterSpacing: "-0.05em" }}>
      <span style={{ fontSize: 96, color: color.white, ...outlineText(16), textShadow: `7px 7px 0 ${color.ink}` }}>종이장부 → </span>
      <span style={{ display: "inline-block", background: color.accent, border: `8px solid ${color.ink}`, borderRadius: 18, padding: "0 20px 4px", transform: "rotate(-3deg)", boxShadow: ui.shadow(10), fontSize: 96, color: color.ink }}>앱</span>
    </div>
    <div style={{ position: "absolute", right: 34, bottom: 34, display: "flex", alignItems: "center", gap: 14, transform: "rotate(-4deg)" }}>
      <LovableBadge size={46} />
    </div>
    <div style={{ position: "absolute", left: 40, bottom: 36 }}>
      <ExperimentTag no={1} size={30} />
    </div>
  </AbsoluteFill>
);

