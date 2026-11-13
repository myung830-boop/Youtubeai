import React from "react";
import { AbsoluteFill } from "remotion";
import { ExperimentTag } from "../../components/brand";
import { BrandBadge, BRANDS } from "../../brands/registry";
import { color, font, ui } from "../../styles/theme";
import { QRMenuPhone, RestaurantSite } from "./mockups";

/* 3편 썸네일 — 2편 v2 기준: 캐릭터 없음, 브랜드가 주인공, 사장님에게 도움 되는 문구 */
const outline = (px: number): React.CSSProperties => ({ WebkitTextStroke: `${px}px ${color.ink}`, paintOrder: "stroke fill" });
const GPT = "linear-gradient(135deg,#050505,#163A30)";
const CLAUDE = BRANDS.claude.colors.primary;
const YellowBox: React.FC<{ children: React.ReactNode; size: number }> = ({ children, size }) => (
  <span style={{ background: color.accent, color: color.ink, border: `5px solid ${color.ink}`, borderRadius: 14, padding: "0 16px 4px", boxShadow: ui.shadow(6), display: "inline-block", WebkitTextStroke: "0px transparent", textShadow: "none", fontSize: size }}>{children}</span>
);
const Role: React.FC<{ t: string; rot: number }> = ({ t, rot }) => (
  <div style={{ display: "inline-block", background: "#fff", border: `6px solid ${color.ink}`, borderRadius: 16, padding: "2px 22px 6px", fontWeight: 900, fontSize: 50, transform: `rotate(${rot}deg)`, boxShadow: ui.shadow(7) }}>{t}</div>
);
const Chips: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <div style={{ position: "absolute", left: x, top: y, display: "flex", gap: 10 }}>
    {["🎟 단골 쿠폰", "🌐 홈페이지", "📱 QR 메뉴", "📦 발주"].map((t) => <div key={t} style={{ background: "#fff", border: `4px solid ${color.ink}`, borderRadius: 999, padding: "4px 16px", fontSize: 26, fontWeight: 800, boxShadow: ui.shadow(4) }}>{t}</div>)}
  </div>
);

/** A안: 좌우 브랜드 대결 + 가운데 큰 문구 */
export const Ep003ThumbA: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: font.family, overflow: "hidden", background: "#111" }}>
    <div style={{ position: "absolute", inset: 0, background: GPT, clipPath: "polygon(0 0, 56% 0, 44% 100%, 0 100%)" }} />
    <div style={{ position: "absolute", inset: 0, background: CLAUDE, clipPath: "polygon(56% 0, 100% 0, 100% 100%, 44% 100%)" }} />
    <div style={{ position: "absolute", inset: -300, background: "repeating-conic-gradient(from 0deg at 50% 30%, rgba(255,255,255,0) 0deg 7deg, rgba(255,255,255,0.07) 7deg 14deg)" }} />
    {/* 브랜드 (주인공) */}
    <div style={{ position: "absolute", left: 40, top: 92, transform: "rotate(-4deg)" }}>
      <div style={{ position: "absolute", inset: -26, background: "#10A37F", filter: "blur(40px)", opacity: 0.7, borderRadius: 999 }} />
      <BrandBadge id="chatgpt" size={74} tone="solid" label="ChatGPT" style={{ position: "relative" }} />
      <div style={{ marginTop: 18, marginLeft: 40 }}><Role t="기획" rot={-4} /></div>
    </div>
    <div style={{ position: "absolute", right: 34, top: 100, transform: "rotate(4deg)", textAlign: "right" }}>
      <div style={{ position: "absolute", inset: -26, background: "#FFB38A", filter: "blur(40px)", opacity: 0.7, borderRadius: 999 }} />
      <BrandBadge id="claude" size={70} tone="solid" label="Claude Code" style={{ position: "relative" }} />
      <div style={{ marginTop: 18, marginRight: 40 }}><Role t="제작" rot={4} /></div>
    </div>
    <div style={{ position: "absolute", left: 560, top: 120, width: 150, height: 150, borderRadius: "50%", background: color.accent, border: `9px solid ${color.ink}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 74, boxShadow: ui.shadow(10), transform: "rotate(-8deg)" }}>VS</div>
    {/* 문구 */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 368, textAlign: "center", fontWeight: 900, fontSize: 50, letterSpacing: "-0.03em", color: "#fff", ...outline(9), textShadow: `5px 5px 0 ${color.ink}` }}>
      <YellowBox size={50}>사장님 혼자서도</YellowBox> 이만큼 달라져요
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 450, textAlign: "center", fontWeight: 900, fontSize: 112, letterSpacing: "-0.05em", color: "#fff", ...outline(15), textShadow: `8px 8px 0 ${color.ink}` }}>
      AI 잘 쓰는 1인 식당
    </div>
    <div style={{ position: "absolute", left: 30, top: 24, transform: "rotate(-3deg)" }}><ExperimentTag no={3} size={24} /></div>
    <Chips x={250} y={640} />
  </AbsoluteFill>
);

/** B안: 왼쪽 브랜드+문구, 오른쪽 결과물(홈페이지·QR 메뉴) */
export const Ep003ThumbB: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: font.family, overflow: "hidden", background: "#15110E" }}>
    <div style={{ position: "absolute", inset: -300, background: "repeating-conic-gradient(from 0deg at 75% 50%, rgba(217,119,87,0) 0deg 7deg, rgba(217,119,87,0.16) 7deg 14deg)" }} />
    <div style={{ position: "absolute", left: 620, top: 60, width: 700, height: 620, borderRadius: "50%", background: CLAUDE, filter: "blur(100px)", opacity: 0.45 }} />
    <div style={{ position: "absolute", left: 640, top: 150, transform: "perspective(1600px) rotateY(-16deg) rotateZ(3deg) scale(0.52)", transformOrigin: "0 0" }}><RestaurantSite f={60} tab={1} w={1100} h={680} /></div>
    <div style={{ position: "absolute", left: 1010, top: 250, transform: "rotate(8deg) scale(0.62)", transformOrigin: "0 0" }}><QRMenuPhone soldOut pick={false} w={380} /></div>
    <div style={{ position: "absolute", left: 40, top: 80, transform: "rotate(-4deg)", display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}><BrandBadge id="chatgpt" size={64} tone="solid" label="ChatGPT" /><Role t="기획" rot={-3} /></div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}><BrandBadge id="claude" size={64} tone="solid" label="Claude Code" /><Role t="제작" rot={3} /></div>
    </div>
    <div style={{ position: "absolute", left: 44, top: 330, fontWeight: 900, fontSize: 42, color: "#fff", ...outline(8), textShadow: `4px 4px 0 ${color.ink}`, transform: "rotate(-2deg)" }}><YellowBox size={42}>사장님 혼자서도</YellowBox></div>
    <div style={{ position: "absolute", left: 44, top: 400, fontWeight: 900, fontSize: 98, lineHeight: 1.04, letterSpacing: "-0.05em", color: "#fff", ...outline(13), textShadow: `7px 7px 0 ${color.ink}` }}>AI 잘 쓰는<br />1인 식당</div>
    <div style={{ position: "absolute", left: 30, top: 20, transform: "rotate(-3deg)" }}><ExperimentTag no={3} size={22} /></div>
    <Chips x={40} y={646} />
  </AbsoluteFill>
);
