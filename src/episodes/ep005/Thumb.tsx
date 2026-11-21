import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { ExperimentTag } from "../../components/brand";
import { BrandIcon } from "../../brands/registry";
import { Boss } from "../../character/Boss";
import { color, font, ui } from "../../styles/theme";

/* 5편 썸네일 — 4편 B 기준(노란 배경·큰 글자), Claude 로고 주인공 */
const outline = (px: number, c: string = color.ink): React.CSSProperties => ({ WebkitTextStroke: `${px}px ${c}`, paintOrder: "stroke fill" });
const CL = "#D97757";

/** A: 캐릭터 없음 */
export const Ep005ThumbA: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: font.family, overflow: "hidden", background: color.accent }}>
    <div style={{ position: "absolute", inset: -300, background: "repeating-conic-gradient(from 0deg at 80% 50%, rgba(255,255,255,0) 0deg 7deg, rgba(255,255,255,0.4) 7deg 14deg)" }} />
    <div style={{ position: "absolute", left: 800, top: -40, width: 580, height: 800, background: "linear-gradient(135deg,#F2A88A,#D97757)", clipPath: "polygon(22% 0, 100% 0, 100% 100%, 0 100%)" }} />
    {/* 유튜브 영상 카드 (실제 채널 썸네일) */}
    <div style={{ position: "absolute", left: 1000, top: 440, background: "#fff", border: `6px solid ${color.ink}`, borderRadius: 16, padding: 6, transform: "rotate(7deg)", boxShadow: ui.shadow(8) }}>
      <Img src={staticFile("ep005/thumbs/ep4.png")} style={{ width: 240, height: 135, objectFit: "cover", borderRadius: 8, display: "block" }} />
      <div style={{ position: "absolute", left: 96, top: 46, width: 60, height: 44, borderRadius: 12, background: "#FF0000", display: "flex", alignItems: "center", justifyContent: "center" }}><svg viewBox="0 0 40 40" width={26} height={26}><path d="M12,8 L32,20 L12,32 Z" fill="#fff" /></svg></div>
    </div>
    {/* Claude 로고 */}
    <div style={{ position: "absolute", left: 890, top: 110 }}>
      <div style={{ position: "absolute", inset: -40, background: "rgba(255,255,255,0.7)", filter: "blur(50px)", borderRadius: "50%" }} />
      <div style={{ position: "relative", filter: "drop-shadow(12px 12px 0 rgba(35,32,30,0.85))" }}><BrandIcon id="claude" size={320} /></div>
    </div>
    <div style={{ position: "absolute", left: 26, top: 14, transform: "rotate(-3deg)" }}><ExperimentTag no={5} size={20} /></div>
    <div style={{ position: "absolute", left: 30, top: 70, transform: "rotate(-2deg)" }}><span style={{ background: color.ink, color: "#fff", borderRadius: 16, padding: "0 20px 6px", fontWeight: 900, fontSize: 60, letterSpacing: "-0.04em", display: "inline-block", boxShadow: "7px 7px 0 rgba(0,0,0,0.25)" }}>촬영·편집 없이</span></div>
    <div style={{ position: "absolute", left: 22, top: 170, fontWeight: 900, fontSize: 168, lineHeight: 1.0, letterSpacing: "-0.06em", color: color.ink, textShadow: "8px 8px 0 #fff" }}>
      클로드로<br /><span style={{ color: CL, ...outline(18), textShadow: `10px 10px 0 ${color.ink}` }}>유튜브</span>
    </div>
    <div style={{ position: "absolute", left: 40, top: 540, background: "#fff", border: `6px solid ${color.ink}`, borderRadius: 18, padding: "4px 20px 8px", fontWeight: 900, fontSize: 48, transform: "rotate(-3deg)", boxShadow: ui.shadow(8), whiteSpace: "nowrap" }}>사장님 첫 영상 만들기</div>
  </AbsoluteFill>
);

/** B: 전신 캐릭터가 로고를 가리킴 */
export const Ep005ThumbB: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: font.family, overflow: "hidden", background: color.accent }}>
    <div style={{ position: "absolute", inset: -300, background: "repeating-conic-gradient(from 0deg at 78% 40%, rgba(255,255,255,0) 0deg 7deg, rgba(255,255,255,0.4) 7deg 14deg)" }} />
    <div style={{ position: "absolute", left: 760, top: -40, width: 620, height: 800, background: "linear-gradient(135deg,#F2A88A,#D97757)", clipPath: "polygon(22% 0, 100% 0, 100% 100%, 0 100%)" }} />
    <div style={{ position: "absolute", left: 940, top: 40, filter: "drop-shadow(10px 10px 0 rgba(35,32,30,0.85))" }}><BrandIcon id="claude" size={240} /></div>
    <div style={{ position: "absolute", left: 800, top: 215 }}><Boss pose="present" expression="joy" crop="body" legs="stand" size={490} /></div>
    <div style={{ position: "absolute", left: 26, top: 14, transform: "rotate(-3deg)" }}><ExperimentTag no={5} size={20} /></div>
    <div style={{ position: "absolute", left: 30, top: 70, transform: "rotate(-2deg)" }}><span style={{ background: color.ink, color: "#fff", borderRadius: 16, padding: "0 20px 6px", fontWeight: 900, fontSize: 60, letterSpacing: "-0.04em", display: "inline-block", boxShadow: "7px 7px 0 rgba(0,0,0,0.25)" }}>촬영·편집 없이</span></div>
    <div style={{ position: "absolute", left: 22, top: 170, fontWeight: 900, fontSize: 168, lineHeight: 1.0, letterSpacing: "-0.06em", color: color.ink, textShadow: "8px 8px 0 #fff" }}>
      클로드로<br /><span style={{ color: CL, ...outline(18), textShadow: `10px 10px 0 ${color.ink}` }}>유튜브</span>
    </div>
    <div style={{ position: "absolute", left: 40, top: 540, background: "#fff", border: `6px solid ${color.ink}`, borderRadius: 18, padding: "4px 20px 8px", fontWeight: 900, fontSize: 48, transform: "rotate(-3deg)", boxShadow: ui.shadow(8), whiteSpace: "nowrap" }}>사장님 첫 영상 만들기</div>
  </AbsoluteFill>
);
