import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { ExperimentTag } from "../../components/brand";
import { BrandIcon } from "../../brands/registry";
import { color, font, ui } from "../../styles/theme";

/* 4편 썸네일 — 3편 D3 기준(노란 배경), 캐릭터 없음, 피클 로고가 주인공 */
const outline = (px: number, c: string = color.ink): React.CSSProperties => ({ WebkitTextStroke: `${px}px ${c}`, paintOrder: "stroke fill" });
const PK = "#63D361";
const Chips: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <div style={{ position: "absolute", left: x, top: y, display: "flex", gap: 10 }}>
    {["💡 공과금", "📄 서류", "📦 주문", "📣 홍보", "📞 전화"].map((t) => <div key={t} style={{ background: "#fff", border: `4px solid ${color.ink}`, borderRadius: 999, padding: "4px 16px", fontSize: 26, fontWeight: 900, boxShadow: ui.shadow(4) }}>{t}</div>)}
  </div>
);

/** A안: 노란 배경 + 오른쪽 초록 패널에 큰 피클 로고와 실사 시계 */
export const Ep004ThumbA: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: font.family, overflow: "hidden", background: color.accent }}>
    <div style={{ position: "absolute", inset: -300, background: "repeating-conic-gradient(from 0deg at 74% 46%, rgba(255,255,255,0) 0deg 7deg, rgba(255,255,255,0.35) 7deg 14deg)" }} />
    <div style={{ position: "absolute", left: 640, top: -40, width: 760, height: 800, background: "linear-gradient(135deg,#8EE68A,#3FAE4A)", clipPath: "polygon(14% 0, 100% 0, 100% 100%, 0 100%)" }} />
    {/* 실사 시계 */}
    <div style={{ position: "absolute", left: 990, top: 40, width: 250, height: 250, borderRadius: "50%", overflow: "hidden", border: `8px solid ${color.ink}`, boxShadow: ui.shadow(10), transform: "rotate(8deg)" }}>
      <Img src={staticFile("stock/clockface.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
    <div style={{ position: "absolute", left: 1060, top: 262, background: "#fff", border: `5px solid ${color.ink}`, borderRadius: 999, padding: "2px 16px", fontWeight: 900, fontSize: 26, whiteSpace: "nowrap", transform: "rotate(6deg)", boxShadow: ui.shadow(5) }}>⏰ 시간 회복!</div>
    {/* 피클 로고 (주인공) */}
    <div style={{ position: "absolute", left: 700, top: 160 }}>
      <div style={{ position: "absolute", inset: -40, background: "rgba(255,255,255,0.8)", filter: "blur(50px)", borderRadius: "50%" }} />
      <div style={{ position: "relative", filter: "drop-shadow(12px 12px 0 rgba(14,42,18,0.85))" }}><BrandIcon id="pickle" size={340} /></div>
    </div>
    <div style={{ position: "absolute", left: 760, top: 545, fontWeight: 900, fontSize: 72, color: "#fff", letterSpacing: "-0.04em", ...outline(12, "#0E2A12"), textShadow: "7px 7px 0 #0E2A12", transform: "rotate(-4deg)" }}>피클 Pickle</div>
    {/* 문구 */}
    <div style={{ position: "absolute", left: 30, top: 18, transform: "rotate(-3deg)" }}><ExperimentTag no={4} size={22} /></div>
    <div style={{ position: "absolute", left: 40, top: 96, transform: "rotate(-2deg)" }}><span style={{ background: color.ink, color: "#fff", borderRadius: 14, padding: "0 16px 4px", fontWeight: 900, fontSize: 46, display: "inline-block", boxShadow: "6px 6px 0 rgba(0,0,0,0.25)" }}>사장님 시간 돌려주는</span></div>
    <div style={{ position: "absolute", left: 36, top: 170, fontWeight: 900, fontSize: 124, lineHeight: 1.0, letterSpacing: "-0.05em", color: color.ink, textShadow: "6px 6px 0 #fff" }}>
      AI 비서<br /><span style={{ color: PK, ...outline(16), textShadow: `9px 9px 0 ${color.ink}` }}>피클</span>
    </div>
    <div style={{ position: "absolute", left: 40, top: 470, fontWeight: 900, fontSize: 40, color: color.ink }}>가입 · 사용법 · 활용 5가지</div>
    <Chips x={36} y={640} />
    <div style={{ position: "absolute", right: 14, bottom: 12, background: "rgba(27,37,65,0.8)", color: "#fff", borderRadius: 999, padding: "2px 10px", fontWeight: 700, fontSize: 14 }}>📷 참고 사진</div>
  </AbsoluteFill>
);

/** B안: 글자 최대 크기 */
export const Ep004ThumbB: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: font.family, overflow: "hidden", background: color.accent }}>
    <div style={{ position: "absolute", inset: -300, background: "repeating-conic-gradient(from 0deg at 82% 52%, rgba(255,255,255,0) 0deg 7deg, rgba(255,255,255,0.4) 7deg 14deg)" }} />
    <div style={{ position: "absolute", left: 820, top: -40, width: 560, height: 800, background: "linear-gradient(135deg,#8EE68A,#3FAE4A)", clipPath: "polygon(22% 0, 100% 0, 100% 100%, 0 100%)" }} />
    {/* 실사 시계 */}
    <div style={{ position: "absolute", left: 1060, top: 22, width: 190, height: 190, borderRadius: "50%", overflow: "hidden", border: `7px solid ${color.ink}`, boxShadow: ui.shadow(8), transform: "rotate(8deg)" }}>
      <Img src={staticFile("stock/clockface.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
    {/* 피클 로고 */}
    <div style={{ position: "absolute", left: 900, top: 230 }}>
      <div style={{ position: "absolute", inset: -40, background: "rgba(255,255,255,0.8)", filter: "blur(50px)", borderRadius: "50%" }} />
      <div style={{ position: "relative", filter: "drop-shadow(12px 12px 0 rgba(14,42,18,0.85))" }}><BrandIcon id="pickle" size={330} /></div>
    </div>
    {/* 문구 (크게) */}
    <div style={{ position: "absolute", left: 26, top: 14, transform: "rotate(-3deg)" }}><ExperimentTag no={4} size={20} /></div>
    <div style={{ position: "absolute", left: 30, top: 70, transform: "rotate(-2deg)" }}><span style={{ background: color.ink, color: "#fff", borderRadius: 16, padding: "0 20px 6px", fontWeight: 900, fontSize: 66, letterSpacing: "-0.04em", display: "inline-block", boxShadow: "7px 7px 0 rgba(0,0,0,0.25)" }}>사장님 시간 돌려주는</span></div>
    <div style={{ position: "absolute", left: 22, top: 172, fontWeight: 900, fontSize: 200, lineHeight: 0.98, letterSpacing: "-0.06em", color: color.ink, textShadow: "8px 8px 0 #fff" }}>
      AI 비서<br /><span style={{ color: PK, ...outline(20), textShadow: `11px 11px 0 ${color.ink}` }}>피클</span>
    </div>
    <div style={{ position: "absolute", left: 470, top: 560, background: "#fff", border: `6px solid ${color.ink}`, borderRadius: 18, padding: "4px 20px 8px", fontWeight: 900, fontSize: 52, transform: "rotate(-4deg)", boxShadow: ui.shadow(8), whiteSpace: "nowrap" }}>활용 5가지</div>
    <div style={{ position: "absolute", right: 14, bottom: 12, background: "rgba(27,37,65,0.8)", color: "#fff", borderRadius: 999, padding: "2px 10px", fontWeight: 700, fontSize: 14 }}>📷 참고 사진</div>
  </AbsoluteFill>
);
