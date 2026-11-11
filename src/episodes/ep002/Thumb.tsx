import React from "react";
import { AbsoluteFill } from "remotion";
import { Boss } from "../../character/Boss";
import { ExperimentTag } from "../../components/brand";
import { AiCursor, AsideBadge, AsideWindow, ASIDE_GRADIENT } from "../../components/aside";
import { color, font, ui } from "../../styles/theme";
import { BlogEditor } from "./mockups";
import { BrandBadge } from "../../brands/registry";

const outline = (px: number): React.CSSProperties => ({ WebkitTextStroke: `${px}px ${color.ink}`, paintOrder: "stroke fill" });

const Mug: React.FC<{ size?: number }> = ({ size = 130 }) => (
  <svg viewBox="0 0 60 64" width={size} height={size * 1.07}>
    <path d="M18,4 q-4,6 0,10 M28,2 q-4,6 0,10 M38,4 q-4,6 0,10" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" opacity={0.9} />
    <path d="M6,18 L46,18 L42,58 Q42,62 38,62 L14,62 Q10,62 10,58 Z" fill="#fff" stroke={color.ink} strokeWidth={4} strokeLinejoin="round" />
    <path d="M46,26 Q58,26 56,38 Q54,48 43,46" fill="none" stroke={color.ink} strokeWidth={5} />
    <rect x={14} y={30} width={24} height={12} rx={3} fill={color.accent} stroke={color.ink} strokeWidth={2.5} />
  </svg>
);

export const Ep002Thumb: React.FC<{ character?: React.ReactNode }> = ({ character }) => (
  <AbsoluteFill style={{ fontFamily: font.family, overflow: "hidden", background: "#14123A" }}>
    <div style={{ position: "absolute", inset: -200, background: "repeating-conic-gradient(from 0deg at 70% 45%, #17154A 0deg 9deg, #1C1A57 9deg 18deg)" }} />
    <div style={{ position: "absolute", left: 600, top: 20, width: 700, height: 640, borderRadius: "50%", background: ASIDE_GRADIENT, filter: "blur(80px)", opacity: 0.5 }} />
    {/* 혼자 일하는 브라우저 */}
    <div style={{ position: "absolute", left: 640, top: 150, transform: "rotate(-7deg)", opacity: 0.97 }}>
      <AsideWindow w={620} h={420} url="blog.naver.com" tab="블로그 글쓰기">
        <div style={{ transform: "scale(0.62)", transformOrigin: "0 0", width: "161%", height: "161%", position: "relative" }}>
          <BlogEditor title="운동화 세탁 전후 비교" body="오늘 맡겨주신 운동화, 이렇게 깨끗해졌어요!" typed={22} photo titleTyped={99} />
        </div>
      </AsideWindow>
      {/* 속도선 */}
      <svg width={300} height={200} style={{ position: "absolute", left: 10, top: 110 }}>
        {[0, 1, 2].map((i) => <line key={i} x1={20} y1={60 + i * 26} x2={120 - i * 20} y2={60 + i * 26} stroke="#C4B5FD" strokeWidth={8} strokeLinecap="round" />)}
      </svg>
      <AiCursor x={150} y={150} scale={1.3} label="AI 직원" />
    </div>
    {/* 캐릭터 + 커피 */}
    {character ? (
      <div style={{ position: "absolute", right: -50, bottom: -40 }}>{character}</div>
    ) : (
    <div style={{ position: "absolute", right: -95, bottom: -130 }}>
      <Boss pose="thumbsUp" expression="wink" size={660} />
    </div>
    )}
    <div style={{ position: "absolute", right: 360, bottom: 40, transform: "rotate(-8deg)" }}><Mug size={120} /></div>
    {/* 어사이드 배지 */}
    <div style={{ position: "absolute", right: 30, top: 24, transform: "rotate(5deg)" }}>
      <div style={{ position: "absolute", inset: -30, background: ASIDE_GRADIENT, filter: "blur(34px)", opacity: 0.75, borderRadius: 999 }} />
      <AsideBadge size={80} style={{ position: "relative" }} />
    </div>
    {/* 텍스트 */}
    <div style={{ position: "absolute", left: 48, top: 40, transform: "rotate(-3deg)" }}><ExperimentTag no={2} size={30} /></div>
    <div style={{ position: "absolute", left: 44, top: 126, fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1.05 }}>
      <div style={{ fontSize: 78, color: color.white, ...outline(13), textShadow: `6px 6px 0 ${color.ink}` }}>
        하루 <span style={{ position: "relative", display: "inline-block" }}>2시간<span style={{ position: "absolute", left: -6, right: -6, top: "48%", height: 14, background: "#FF4D4F", border: `3px solid ${color.ink}`, transform: "rotate(-6deg)", borderRadius: 6 }} /></span> 일이
      </div>
      <div style={{ display: "inline-block", marginTop: 16, background: color.accent, border: `8px solid ${color.ink}`, borderRadius: 20, padding: "0 30px 10px", transform: "rotate(-4deg)", boxShadow: ui.shadow(10) }}>
        <span style={{ fontSize: 150, color: color.ink }}>5분 컷!</span>
      </div>
      <div style={{ marginTop: 14, fontSize: 90, color: "#C4B5FD", ...outline(14), textShadow: `7px 7px 0 ${color.ink}` }}>AI 브라우저</div>
    </div>
    <div style={{ position: "absolute", left: 48, bottom: 34, display: "flex", gap: 12 }}>
      <div style={{ background: color.white, border: `5px solid ${color.ink}`, borderRadius: 999, padding: "6px 20px", fontSize: 30, fontWeight: 800, color: color.main, boxShadow: ui.shadow(5) }}>📦 택배</div>
      <BrandBadge id="naverBlog" size={34} label="블로그" />
      <BrandBadge id="instagram" size={34} label="인스타" />
    </div>
  </AbsoluteFill>
);
