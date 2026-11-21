import React from "react";
import { Img, staticFile } from "remotion";
import { BrandIcon, BRANDS } from "../../brands/registry";
import { color, font, ui } from "../../styles/theme";
import { lerp } from "../../motion/core";

/**
 * 5편 설명용 재구성 화면 — 실제 Windows·Claude 앱 캡처가 아님.
 * 메뉴 이름은 대본 기준(Code 탭, Opus 5.5). 버전·요금제에 따라 다를 수 있음.
 */
const F = font.family;
export const CL = BRANDS.claude.colors.primary; // Claude 오렌지
export const CREAM = "#F7F4ED";
export const ReconTag: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div style={{ position: "absolute", right: 14, bottom: 12, background: "rgba(27,37,65,0.85)", color: "#fff", borderRadius: 999, padding: "3px 14px", fontFamily: F, fontWeight: 700, fontSize: 16, zIndex: 9, whiteSpace: "nowrap", ...style }}>설명용 재구성 화면</div>
);
const Ring: React.FC<{ on: boolean; children: React.ReactNode; style?: React.CSSProperties }> = ({ on, children, style }) => (
  <div style={{ position: "relative", ...style }}>
    {children}
    {on && <div style={{ position: "absolute", inset: -10, borderRadius: 18, border: `6px solid ${CL}`, boxShadow: `0 0 0 6px rgba(217,119,87,0.25)` }} />}
  </div>
);

/* ── 윈도우 창 공통 ── */
export const Win: React.FC<{ w: number; h: number; title: React.ReactNode; children: React.ReactNode; icon?: React.ReactNode; dark?: boolean }> = ({ w, h, title, children, icon, dark }) => (
  <div style={{ width: w, height: h, background: dark ? "#262524" : "#fff", border: `6px solid ${color.ink}`, borderRadius: 18, boxShadow: ui.shadow(12), overflow: "hidden", display: "flex", flexDirection: "column", fontFamily: F, position: "relative" }}>
    <div style={{ height: 50, background: dark ? "#1E1D1C" : "#EEF0F4", borderBottom: `3px solid ${dark ? "#3A3836" : "#D6DAE2"}`, display: "flex", alignItems: "center", gap: 10, padding: "0 16px", fontWeight: 800, fontSize: 20, color: dark ? "#EDE8E0" : color.ink }}>
      {icon}{title}
      <div style={{ marginLeft: "auto", display: "flex", gap: 18, fontSize: 20, opacity: 0.6 }}><span>─</span><span>☐</span><span>✕</span></div>
    </div>
    <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>{children}</div>
  </div>
);

/* ── 바탕화면 ── */
export const Desktop: React.FC<{ folder?: number; children?: React.ReactNode; w?: number; h?: number }> = ({ folder = -1, children, w = 1600, h = 900 }) => (
  <div style={{ width: w, height: h, position: "relative", overflow: "hidden", background: "linear-gradient(135deg,#3B6FD8 0%,#7FA8F2 55%,#C9DBFF 100%)", border: `6px solid ${color.ink}`, borderRadius: 18, fontFamily: F }}>
    <div style={{ position: "absolute", left: 30, top: 30, display: "flex", flexDirection: "column", gap: 26 }}>
      {["🗑 휴지통", "🌐 인터넷"].map((t) => <div key={t} style={{ color: "#fff", fontWeight: 800, fontSize: 22, textShadow: "0 2px 4px rgba(0,0,0,0.4)", textAlign: "center", width: 110 }}><div style={{ fontSize: 54 }}>{t.split(" ")[0]}</div>{t.split(" ")[1]}</div>)}
      {folder >= 0 && (
        <div style={{ color: "#fff", fontWeight: 900, fontSize: 22, textShadow: "0 2px 4px rgba(0,0,0,0.5)", textAlign: "center", width: 150, transform: `scale(${lerp(folder, 0, 8, 0.2, 1)})`, background: folder > 10 ? "rgba(255,255,255,0.25)" : "transparent", borderRadius: 12, padding: 6 }}>
          <div style={{ fontSize: 64 }}>📁</div>내 첫 유튜브
        </div>
      )}
    </div>
    {children}
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 64, background: "rgba(240,243,250,0.92)", borderTop: "2px solid #C9D0DE", display: "flex", alignItems: "center", justifyContent: "center", gap: 18 }}>
      <div style={{ width: 44, height: 44, borderRadius: 10, background: "#2D5DB8", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 15 }}>시작</div>
      <div style={{ fontSize: 34 }}>🌐</div><div style={{ fontSize: 34 }}>📁</div>
    </div>
  </div>
);

/* ── 브라우저 + 주소창 ── */
export const Browser: React.FC<{ w: number; h: number; url: string; typed: number; children?: React.ReactNode }> = ({ w, h, url, typed, children }) => (
  <Win w={w} h={h} title="새 탭" icon={<span>🌐</span>}>
    <div style={{ height: 70, background: "#F5F6F8", display: "flex", alignItems: "center", padding: "0 20px", gap: 14, borderBottom: "2px solid #E1E4EA" }}>
      <span style={{ fontSize: 26, opacity: 0.5 }}>← → ⟳</span>
      <div style={{ flex: 1, height: 48, borderRadius: 24, background: "#fff", border: `4px solid ${typed > 0 ? CL : "#D6DAE2"}`, display: "flex", alignItems: "center", padding: "0 20px", fontSize: 30, fontWeight: 800, fontFamily: "Pretendard, monospace" }}>
        {url.slice(0, typed)}<span style={{ opacity: typed < url.length ? 1 : 0, color: CL }}>▍</span>
      </div>
    </div>
    <div style={{ position: "relative", height: h - 50 - 70 }}>{children}</div>
  </Win>
);
/** claude.com/download 페이지 (재구성) */
export const DownloadPage: React.FC<{ hi?: boolean }> = ({ hi }) => (
  <div style={{ position: "absolute", inset: 0, background: CREAM, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
    <BrandIcon id="claude" size={110} />
    <div style={{ fontWeight: 900, fontSize: 52, color: "#23201E" }}>Claude 다운로드</div>
    <div style={{ display: "flex", gap: 24 }}>
      <Ring on={!!hi}><div style={{ background: "#23201E", color: "#fff", borderRadius: 14, padding: "16px 34px", fontWeight: 900, fontSize: 30 }}>⬇ Windows 다운로드</div></Ring>
      <div style={{ background: "#E8E6DC", color: "#23201E", borderRadius: 14, padding: "16px 34px", fontWeight: 800, fontSize: 30 }}>macOS</div>
    </div>
    <ReconTag />
  </div>
);
/** 설치 진행 창 */
export const Installer: React.FC<{ p: number }> = ({ p }) => (
  <Win w={760} h={330} title="Claude 설치" icon={<BrandIcon id="claude" size={30} />}>
    <div style={{ padding: 34, display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ fontWeight: 900, fontSize: 32 }}>{p < 1 ? "설치하는 중…" : "설치 완료! ✓"}</div>
      <div style={{ height: 30, borderRadius: 15, background: "#E8E6DC", overflow: "hidden", border: `4px solid ${color.ink}` }}><div style={{ width: `${p * 100}%`, height: "100%", background: CL }} /></div>
      <div style={{ fontSize: 24, color: "#6B6560", fontWeight: 700 }}>{Math.round(p * 100)}%</div>
    </div>
    <ReconTag />
  </Win>
);
/** 시작 메뉴 */
export const StartMenu: React.FC<{ hi?: boolean }> = ({ hi }) => (
  <div style={{ width: 620, background: "rgba(245,247,252,0.97)", border: `6px solid ${color.ink}`, borderRadius: 24, boxShadow: ui.shadow(12), padding: 26, fontFamily: F, position: "relative" }}>
    <div style={{ height: 50, borderRadius: 25, background: "#fff", border: "3px solid #D6DAE2", display: "flex", alignItems: "center", padding: "0 20px", fontSize: 22, color: "#8A93A3", fontWeight: 700 }}>🔍 검색</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, marginTop: 22 }}>
      {[["📁", "파일"], ["🌐", "인터넷"], ["claude", "Claude"], ["⚙️", "설정"]].map(([e, t]) => (
        <Ring key={t} on={!!hi && t === "Claude"}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, fontWeight: 800, fontSize: 22 }}>
            {e === "claude" ? <BrandIcon id="claude" size={70} /> : <div style={{ fontSize: 60 }}>{e}</div>}{t}
          </div>
        </Ring>
      ))}
    </div>
    <ReconTag style={{ bottom: -40, right: 0 }} />
  </div>
);

/* ── Claude 데스크톱 앱 ── */
export type ChatMsg = { from: "me" | "cl"; text?: string; node?: React.ReactNode; at: number; typeDur?: number };
export const ClaudeApp: React.FC<{ w: number; h: number; tab?: "chat" | "code"; tabHi?: boolean; model?: string; modelHi?: boolean; folder?: string; children?: React.ReactNode }> = ({ w, h, tab = "code", tabHi, model = "Opus 5.5", modelHi, folder, children }) => (
  <Win w={w} h={h} title="Claude" icon={<BrandIcon id="claude" size={30} />}>
    <div style={{ position: "absolute", inset: 0, background: CREAM, display: "flex" }}>
      <div style={{ width: 220, background: "#EFEBE2", borderRight: "3px solid #E0DACD", padding: 18, display: "flex", flexDirection: "column", gap: 12, fontWeight: 800, fontSize: 20, color: "#5A544D" }}>
        <div style={{ background: "#fff", borderRadius: 12, padding: "10px 14px", border: "2px solid #E0DACD" }}>＋ 새 작업</div>
        {folder && <div style={{ background: "#fff", borderRadius: 12, padding: "10px 14px", border: `3px solid ${CL}`, color: "#23201E" }}>📁 {folder}</div>}
      </div>
      <div style={{ flex: 1, position: "relative", display: "flex", flexDirection: "column" }}>
        <div style={{ height: 70, display: "flex", alignItems: "center", gap: 14, padding: "0 22px", borderBottom: "3px solid #E8E2D6" }}>
          {(["chat", "code"] as const).map((t) => (
            <Ring key={t} on={!!tabHi && t === "code"}><div style={{ padding: "8px 22px", borderRadius: 12, fontWeight: 900, fontSize: 24, background: tab === t ? "#23201E" : "transparent", color: tab === t ? "#fff" : "#5A544D" }}>{t === "chat" ? "Chat" : "Code"}</div></Ring>
          ))}
          <Ring on={!!modelHi} style={{ marginLeft: "auto" }}><div style={{ padding: "8px 18px", borderRadius: 12, border: "3px solid #E0DACD", background: "#fff", fontWeight: 900, fontSize: 22 }}>{model} ▾</div></Ring>
        </div>
        <div style={{ flex: 1, position: "relative", padding: 22, overflow: "hidden" }}>{children}</div>
      </div>
    </div>
    <ReconTag />
  </Win>
);
/** 대화 말풍선 목록 (Claude 앱 안) */
export const CodeChat: React.FC<{ f: number; msgs: ChatMsg[]; size?: number }> = ({ f, msgs, size = 26 }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14, justifyContent: "flex-end", height: "100%", paddingBottom: 70 }}>
    {msgs.filter((m) => f >= m.at).map((m, i) => {
      const t = f - m.at;
      const me = m.from === "me";
      const shown = m.text && m.typeDur ? m.text.slice(0, Math.ceil((m.text.length * t) / m.typeDur)) : m.text;
      return (
        <div key={i} style={{ alignSelf: me ? "flex-end" : "flex-start", display: "flex", gap: 10, maxWidth: "86%", opacity: lerp(t, 0, 6, 0, 1), transform: `translateY(${lerp(t, 0, 8, 16, 0)}px)` }}>
          {!me && <div style={{ flexShrink: 0 }}><BrandIcon id="claude" size={40} /></div>}
          {m.node ?? <div style={{ background: me ? "#E8E2D6" : "#fff", border: me ? "none" : "3px solid #E8E2D6", borderRadius: 18, padding: "12px 18px", fontSize: size, fontWeight: 700, lineHeight: 1.45, color: "#23201E" }}>{shown}</div>}
        </div>
      );
    })}
  </div>
);
export const ChatInput: React.FC<{ text?: string; f?: number; dur?: number }> = ({ text = "", f = 999, dur = 1 }) => {
  const shown = text.slice(0, Math.max(0, Math.ceil((text.length * f) / dur)));
  return (
    <div style={{ position: "absolute", left: 20, right: 20, bottom: 14, minHeight: 56, background: "#fff", border: `3px solid ${shown ? CL : "#E0DACD"}`, borderRadius: 18, display: "flex", alignItems: "center", padding: "8px 14px 8px 20px", gap: 10, fontSize: 22, fontWeight: 700, color: shown ? "#23201E" : "#A39C93" }}>
      <div style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", direction: shown.length > 40 ? "rtl" : "ltr", textAlign: "left" }}>{shown || "클로드에게 무엇이든 요청해 보세요"}{shown && shown.length < text.length ? "▍" : ""}</div>
      <div style={{ width: 40, height: 40, borderRadius: 12, background: shown ? CL : "#E0DACD", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>↑</div>
    </div>
  );
};
/** 모델 선택 드롭다운 */
export const ModelMenu: React.FC<{ sel: boolean }> = ({ sel }) => (
  <div style={{ width: 380, background: "#fff", border: `5px solid ${color.ink}`, borderRadius: 18, boxShadow: ui.shadow(10), padding: 12, fontFamily: F }}>
    {["Opus 5.5", "Sonnet 5.5", "Haiku 5.5"].map((m, i) => (
      <div key={m} style={{ padding: "12px 16px", borderRadius: 12, fontWeight: 900, fontSize: 28, display: "flex", justifyContent: "space-between", background: i === 0 && sel ? "rgba(217,119,87,0.18)" : "transparent", border: i === 0 && sel ? `4px solid ${CL}` : "4px solid transparent" }}>{m}{i === 0 && sel && <span style={{ color: CL }}>✓</span>}</div>
    ))}
    <div style={{ fontSize: 18, color: "#8A8378", fontWeight: 700, padding: "6px 16px" }}>요금제·버전에 따라 메뉴가 다를 수 있어요</div>
  </div>
);
/** 폴더 선택 창 */
export const FolderPicker: React.FC<{ sel: boolean }> = ({ sel }) => (
  <Win w={760} h={440} title="작업 폴더 선택" icon={<span>📁</span>}>
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ fontWeight: 800, fontSize: 22, color: "#6B737B" }}>바탕화면</div>
      {["📁 사진", "📁 내 첫 유튜브", "📁 문서"].map((t, i) => (
        <div key={t} style={{ padding: "12px 18px", borderRadius: 12, fontWeight: 900, fontSize: 30, background: i === 1 && sel ? "rgba(217,119,87,0.18)" : "#F5F6F8", border: i === 1 && sel ? `4px solid ${CL}` : "4px solid transparent" }}>{t}</div>
      ))}
      <div style={{ alignSelf: "flex-end", marginTop: 6, background: sel ? CL : "#D6DAE2", color: "#fff", borderRadius: 12, padding: "10px 30px", fontWeight: 900, fontSize: 26 }}>선택</div>
    </div>
    <ReconTag />
  </Win>
);
/** 권한 확인 카드 */
export const PermissionCard: React.FC<{ f: number; approved: boolean }> = ({ f, approved }) => (
  <div style={{ width: 560, background: "#fff", border: `4px solid ${CL}`, borderRadius: 18, padding: 18, fontFamily: F, boxShadow: "0 6px 18px rgba(0,0,0,0.12)", opacity: lerp(f, 0, 6, 0, 1) }}>
    <div style={{ fontWeight: 900, fontSize: 24, color: "#23201E" }}>🔧 영상 제작 도구를 설치해도 될까요?</div>
    <div style={{ fontSize: 20, color: "#6B6560", fontWeight: 700, marginTop: 6 }}>필요한 프로그램을 내 첫 유튜브 폴더에 설치합니다. (예시 화면)</div>
    <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
      <div style={{ flex: 1, textAlign: "center", padding: "10px 0", borderRadius: 12, fontWeight: 900, fontSize: 24, background: approved ? CL : "#23201E", color: "#fff", transform: `scale(${approved && f < 999 ? 1 : 1})` }}>{approved ? "✓ 허용함" : "허용"}</div>
      <div style={{ flex: 1, textAlign: "center", padding: "10px 0", borderRadius: 12, fontWeight: 900, fontSize: 24, background: "#E8E6DC", color: "#5A544D" }}>거부</div>
    </div>
  </div>
);

/* ── 영상 제작 단계 카드 ── */
export const ScriptCard: React.FC<{ f: number; w?: number }> = ({ f, w = 560 }) => (
  <div style={{ width: w, background: "#fff", border: `4px solid #E8E2D6`, borderRadius: 18, padding: 18, fontFamily: F }}>
    <div style={{ fontWeight: 900, fontSize: 24 }}>📝 대본 초안 · 1분</div>
    {[["도입 10초", "원두, 아무거나 고르시나요?"], ["핵심 40초", "① 로스팅 날짜 ② 원산지 ③ 보관법"], ["마무리 10초", "궁금하면 매장에서 물어보세요!"]].map(([a, b], i) => (
      <div key={a} style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 10, opacity: lerp(f - 6 - i * 8, 0, 6, 0, 1) }}>
        <div style={{ background: [CL, "#23201E", "#8A8378"][i], color: "#fff", borderRadius: 10, padding: "4px 10px", fontWeight: 900, fontSize: 18, whiteSpace: "nowrap" }}>{a}</div>
        <div style={{ fontWeight: 800, fontSize: 21 }}>{b}</div>
      </div>
    ))}
    <div style={{ marginTop: 14, textAlign: "center", padding: "10px 0", borderRadius: 12, background: "#23201E", color: "#fff", fontWeight: 900, fontSize: 22, opacity: lerp(f - 34, 0, 6, 0, 1) }}>확인하면 제작을 시작할게요</div>
  </div>
);
export const STORY = [["☕", "원두, 아무거나?"], ["📅", "① 로스팅 날짜"], ["🌍", "② 원산지"], ["🫙", "③ 보관법"], ["✨", "정리"], ["🏪", "매장으로!"]];
export const StoryCell: React.FC<{ i: number; w?: number }> = ({ i, w = 260 }) => (
  <div style={{ width: w, height: w * 0.72, background: "#fff", border: `6px solid ${color.ink}`, borderRadius: 16, boxShadow: ui.shadow(8), fontFamily: F, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
    <div style={{ position: "absolute", left: 10, top: 8, background: CL, color: "#fff", borderRadius: 8, padding: "0 10px", fontWeight: 900, fontSize: w * 0.075 }}>#{i + 1} · {[8, 10, 10, 10, 12, 10][i]}초</div>
    <div style={{ fontSize: w * 0.26 }}>{STORY[i][0]}</div>
    <div style={{ fontWeight: 900, fontSize: w * 0.09 }}>{STORY[i][1]}</div>
  </div>
);
/** 예시 영상 화면 (카페 원두 3가지) */
export const CoffeeDemo: React.FC<{ f: number; big?: boolean; slow?: boolean; fancy?: boolean; w?: number; h?: number }> = ({ f, big, fancy, w = 960, h = 540 }) => {
  const s = w / 960;
  const items = [["📅", "로스팅 날짜 확인"], ["🌍", "원산지·맛 표시"], ["🫙", "밀폐 용기에 보관"]];
  return (
    <div style={{ width: w, height: h, position: "relative", overflow: "hidden", borderRadius: 12 * s, fontFamily: F, background: "#2A1A12" }}>
      <Img src={staticFile("stock/coffeebeans.jpg")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: fancy ? "brightness(0.55) saturate(1.2)" : "brightness(0.7)", transform: `scale(${1.05 + f * 0.0008})` }} />
      {fancy && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(42,26,18,0.9) 0%, rgba(42,26,18,0.2) 70%)" }} />}
      <div style={{ position: "absolute", left: 50 * s, top: 40 * s, color: "#fff", fontWeight: 900, fontSize: (big ? 64 : 34) * s, textShadow: "0 3px 10px rgba(0,0,0,0.5)" }}>원두 잘 고르는 법 3가지</div>
      {items.map(([e, t], i) => (
        <div key={t} style={{ position: "absolute", left: 50 * s, top: (big ? 170 : 120) * s + i * (big ? 110 : 70) * s, display: "flex", alignItems: "center", gap: 14 * s, background: fancy && i === 0 ? "#FACC15" : "rgba(255,255,255,0.92)", borderRadius: 14 * s, padding: `${8 * s}px ${20 * s}px`, fontWeight: 900, fontSize: (big ? 46 : 26) * s, opacity: lerp(f - 10 - i * 14, 0, 8, 0, 1), transform: `translateX(${lerp(f - 10 - i * 14, 0, 10, -60, 0) * s}px)` }}>
          <span>{e}</span>{t}
        </div>
      ))}
      <div style={{ position: "absolute", right: 14 * s, top: 12 * s, background: "rgba(255,243,214,0.95)", color: "#8A5A00", borderRadius: 999, padding: `${2 * s}px ${12 * s}px`, fontWeight: 800, fontSize: 18 * s }}>제작 예시</div>
    </div>
  );
};
/** 미리보기 플레이어 + 타임라인 + 음성 파형 */
export const PreviewPlayer: React.FC<{ f: number; w?: number; children?: React.ReactNode; wave?: boolean }> = ({ f, w = 1100, children, wave = true }) => (
  <div style={{ width: w, background: "#1E1D1C", border: `6px solid ${color.ink}`, borderRadius: 20, boxShadow: ui.shadow(12), padding: 16, fontFamily: F }}>
    <div style={{ borderRadius: 12, overflow: "hidden" }}>{children ?? <CoffeeDemo f={f} w={w - 32} h={((w - 32) * 9) / 16} />}</div>
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 12, color: "#EDE8E0", fontWeight: 800, fontSize: 20 }}>
      <span>▶</span>
      <div style={{ flex: 1, height: 10, borderRadius: 5, background: "#3A3836" }}><div style={{ width: `${Math.min(100, (f % 240) / 2.4)}%`, height: "100%", borderRadius: 5, background: CL }} /></div>
      <span>0:{String(Math.floor((f % 240) / 4)).padStart(2, "0")} / 1:00</span>
    </div>
    {wave && (
      <div style={{ display: "flex", alignItems: "center", gap: 3, height: 46, marginTop: 10, background: "#262524", borderRadius: 10, padding: "0 10px" }}>
        {Array.from({ length: 90 }, (_, i) => <div key={i} style={{ flex: 1, borderRadius: 2, background: i < ((f % 240) / 240) * 90 ? CL : "#5A544D", height: 6 + Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.23)) * 34 }} />)}
      </div>
    )}
  </div>
);
/** MP4 출력 → 유튜브 업로드 */
export const ExportCard: React.FC<{ p: number }> = ({ p }) => (
  <div style={{ width: 520, background: "#fff", border: `6px solid ${color.ink}`, borderRadius: 22, boxShadow: ui.shadow(12), padding: 26, fontFamily: F }}>
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}><div style={{ width: 90, height: 110, borderRadius: 12, background: "#23201E", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 26 }}>MP4</div><div style={{ fontWeight: 900, fontSize: 30 }}>원두고르기.mp4<div style={{ fontSize: 22, color: "#8A8378" }}>{p < 1 ? `출력 중 ${Math.round(p * 100)}%` : "출력 완료 ✓"}</div></div></div>
    <div style={{ height: 22, borderRadius: 11, background: "#E8E6DC", marginTop: 18, overflow: "hidden", border: `3px solid ${color.ink}` }}><div style={{ width: `${p * 100}%`, height: "100%", background: CL }} /></div>
  </div>
);
export const YouTubeCard: React.FC<{ f: number }> = ({ f }) => (
  <div style={{ width: 560, background: "#fff", border: `6px solid ${color.ink}`, borderRadius: 22, boxShadow: ui.shadow(12), overflow: "hidden", fontFamily: F }}>
    <div style={{ height: 60, background: "#FF0000", display: "flex", alignItems: "center", gap: 12, padding: "0 18px", color: "#fff", fontWeight: 900, fontSize: 28 }}><BrandIcon id="youtube" size={40} />업로드</div>
    <div style={{ padding: 18, display: "flex", gap: 16 }}>
      <div style={{ width: 200, height: 112, borderRadius: 10, overflow: "hidden" }}><CoffeeDemo f={60} w={200} h={112} /></div>
      <div style={{ fontWeight: 900, fontSize: 24, lineHeight: 1.35 }}>원두 잘 고르는 법 3가지 ☕<div style={{ fontSize: 20, color: "#8A8378", marginTop: 6 }}>{f > 20 ? "게시 준비 완료" : "업로드 중…"}</div></div>
    </div>
  </div>
);
