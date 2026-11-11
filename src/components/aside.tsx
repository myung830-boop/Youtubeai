import React from "react";
import { useCurrentFrame } from "remotion";
import { color, font, ui } from "../styles/theme";

/**
 * 어사이드(Aside) 관련 화면 부품.
 * ※ 공식 로고가 아닌 채널용 대체 디자인. 공식 로고 파일을 받으면 AsideBadge 안만 바꾸면 됨.
 */
export const ASIDE_GRADIENT = "linear-gradient(135deg, #7C5CFF 0%, #4F7BFF 55%, #22D3EE 100%)";
export const ASIDE_PURPLE = "#7C5CFF";

/** 어사이드 배지 */
export const AsideBadge: React.FC<{ size?: number; style?: React.CSSProperties }> = ({ size = 56, style }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: size * 0.28,
      background: color.white,
      border: `${Math.max(3, size / 10)}px solid ${color.ink}`,
      borderRadius: 999,
      padding: `${size * 0.16}px ${size * 0.55}px ${size * 0.16}px ${size * 0.3}px`,
      boxShadow: ui.shadow(size / 7),
      fontFamily: font.family,
      fontWeight: 900,
      fontSize: size,
      letterSpacing: "-0.03em",
      ...style,
    }}
  >
    <div style={{ width: size * 1.1, height: size * 1.1, borderRadius: size * 0.3, background: ASIDE_GRADIENT, border: `${Math.max(2, size / 16)}px solid ${color.ink}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 40 52" width={size * 0.55} height={size * 0.72}>
        <path d="M4,3 L4,40 L13,31 L20,47 L27,44 L20,29 L33,29 Z" fill="#fff" stroke={color.ink} strokeWidth={4} strokeLinejoin="round" />
      </svg>
    </div>
    <span style={{ background: ASIDE_GRADIENT, WebkitBackgroundClip: "text", color: "transparent" }}>Aside</span>
  </div>
);

/** AI 커서: 보라색 빛 + 'AI' 꼬리표. x,y는 커서 끝 위치 */
export const AiCursor: React.FC<{ x: number; y: number; scale?: number; label?: string; trail?: boolean }> = ({ x, y, scale = 1, label = "AI 직원", trail = true }) => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame * 0.3) * 0.08;
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `scale(${scale})`, transformOrigin: "0 0", pointerEvents: "none" }}>
      {trail && <div style={{ position: "absolute", left: -50, top: -50, width: 130, height: 130, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,92,255,0.55), transparent 65%)", transform: `scale(${pulse})` }} />}
      <svg viewBox="0 0 40 52" width={58} height={75} style={{ position: "absolute", left: -6, top: -4, filter: "drop-shadow(4px 4px 0 rgba(27,37,65,0.9))" }}>
        <path d="M4,3 L4,40 L13,31 L20,47 L27,44 L20,29 L33,29 Z" fill={ASIDE_PURPLE} stroke={color.ink} strokeWidth={3.5} strokeLinejoin="round" />
      </svg>
      <div style={{ position: "absolute", left: 40, top: 52, background: ASIDE_PURPLE, color: "#fff", border: `4px solid ${color.ink}`, borderRadius: 999, padding: "4px 16px", fontFamily: font.family, fontWeight: 900, fontSize: 24, whiteSpace: "nowrap" }}>{label}</div>
    </div>
  );
};

/** 어사이드 브라우저 창: 왼쪽 웹사이트 + 오른쪽 어사이드 채팅 패널 */
export const AsideWindow: React.FC<{
  w: number;
  h: number;
  url: string;
  tab: string;
  prompt?: React.ReactNode;
  status?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ w, h, url, tab, prompt, status, children, style }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ width: w, height: h, background: color.white, border: `${ui.stroke}px solid ${color.ink}`, borderRadius: 26, boxShadow: ui.shadow(12), overflow: "hidden", display: "flex", flexDirection: "column", fontFamily: font.family, ...style }}>
      <div style={{ height: 50, background: "#EEF0F6", display: "flex", alignItems: "flex-end", gap: 8, padding: "0 16px" }}>
        {["#FF6B6B", "#FACC15", "#4ADE80"].map((c) => <div key={c} style={{ width: 14, height: 14, borderRadius: 7, background: c, border: `2px solid ${color.ink}`, marginBottom: 16 }} />)}
        <div style={{ marginLeft: 14, background: "#fff", borderRadius: "12px 12px 0 0", border: `3px solid #D5DBE8`, borderBottom: "none", padding: "8px 22px", fontSize: 20, fontWeight: 800 }}>{tab}</div>
      </div>
      <div style={{ height: 50, borderBottom: `4px solid ${color.ink}`, display: "flex", alignItems: "center", padding: "0 16px", gap: 12 }}>
        <div style={{ flex: 1, background: "#F3F5FA", borderRadius: 10, padding: "6px 14px", fontSize: 20, color: "#5A6378" }}>🔒 {url}</div>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: ASIDE_GRADIENT, border: `3px solid ${color.ink}` }} />
      </div>
      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>{children}</div>
        <div style={{ width: Math.min(360, w * 0.3), borderLeft: `4px solid ${color.ink}`, background: "#F7F5FF", padding: 18, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontWeight: 900, fontSize: 24, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: ASIDE_GRADIENT, border: `2px solid ${color.ink}` }} /> Aside
          </div>
          {prompt && <div style={{ alignSelf: "flex-end", background: ASIDE_PURPLE, color: "#fff", borderRadius: 16, padding: "12px 16px", fontSize: 22, fontWeight: 700, lineHeight: 1.4 }}>{prompt}</div>}
          {status && (
            <div style={{ background: "#fff", border: "3px solid #E2DEFA", borderRadius: 16, padding: "12px 16px", fontSize: 21, fontWeight: 700, display: "flex", gap: 10, alignItems: "center" }}>
              <svg width={22} height={22} viewBox="0 0 22 22" style={{ transform: `rotate(${frame * 12}deg)`, flexShrink: 0 }}><circle cx={11} cy={11} r={8} fill="none" stroke={ASIDE_PURPLE} strokeWidth={4} strokeDasharray="30 20" /></svg>
              {status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
