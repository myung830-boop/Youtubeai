import React from "react";
import { BrandIcon, BRANDS } from "../../brands/registry";
import { color, font, ui } from "../../styles/theme";
import { lerp } from "../../motion/core";

/**
 * 4편 피클 앱 설명용 화면 — 실제 앱 캡처가 아니라 "기능 설명용 재구성 화면".
 * 결제 완료·서류 발급 완료·자동 게시·통화 성공은 그리지 않는다 (준비·확인·승인 단계까지만).
 */
const F = font.family;
export const PK = BRANDS.pickle.colors.primary;
export const PK_DARK = BRANDS.pickle.colors.secondary;
export const PK_INK = BRANDS.pickle.colors.text;
export const SCREEN_W = 380;
export const SCREEN_H = 800;

export const ReconTag: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div style={{ position: "absolute", left: "50%", bottom: 14, transform: "translateX(-50%)", whiteSpace: "nowrap", background: "rgba(27,37,65,0.85)", color: "#fff", borderRadius: 999, padding: "3px 12px", fontFamily: F, fontWeight: 700, fontSize: 14, zIndex: 9, ...style }}>기능 설명용 재구성 화면</div>
);
export const ExampleTag: React.FC<{ t?: string; style?: React.CSSProperties }> = ({ t = "예시 수치 · 실제 가격 아님", style }) => (
  <div style={{ display: "inline-block", background: "#FFF3D6", color: "#8A5A00", border: "3px solid #E8B84A", borderRadius: 999, padding: "2px 12px", fontFamily: F, fontWeight: 800, fontSize: 16, ...style }}>{t}</div>
);

/* ── 앱 공통 틀 ── */
export const AppScreen: React.FC<{ title?: string; children: React.ReactNode; tab?: number | null; bg?: string }> = ({ title = "피클", children, tab = 0, bg = "#F5F6F4" }) => (
  <div style={{ position: "relative", width: SCREEN_W, height: SCREEN_H, background: bg, fontFamily: F, overflow: "hidden", display: "flex", flexDirection: "column" }}>
    <div style={{ height: 44 }} />
    <div style={{ height: 64, display: "flex", alignItems: "center", gap: 10, padding: "0 20px", borderBottom: "2px solid #E6E8E4", background: "#fff" }}>
      <BrandIcon id="pickle" size={38} />
      <div style={{ fontWeight: 900, fontSize: 26, color: color.ink }}>{title}</div>
    </div>
    <div style={{ flex: 1, position: "relative", padding: 16, overflow: "hidden" }}>{children}</div>
    {tab !== null && <TabBar active={tab} />}
    <ReconTag style={{ bottom: tab !== null ? 98 : 14 }} />
  </div>
);

export const TAB_LABELS = ["채팅", "탐색", "보관함", "내 피클"];
const TabIcon: React.FC<{ i: number; on: boolean }> = ({ i, on }) => {
  const c = on ? PK_DARK : "#9AA1A9";
  if (i === 3) return <div style={{ width: 34, height: 34, borderRadius: "50%", overflow: "hidden", border: `3px solid ${on ? PK_DARK : "#C8CDD2"}`, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" }}><BrandIcon id="pickle" size={26} /></div>;
  return (
    <svg viewBox="0 0 32 32" width={34} height={34}>
      {i === 0 && <path d="M5,7 h22 a3,3 0 0 1 3,3 v11 a3,3 0 0 1 -3,3 h-12 l-6,5 v-5 h-4 a3,3 0 0 1 -3,-3 v-11 a3,3 0 0 1 3,-3 z" fill={on ? c : "none"} stroke={c} strokeWidth={2.6} strokeLinejoin="round" />}
      {i === 1 && <><circle cx={16} cy={16} r={12} fill="none" stroke={c} strokeWidth={2.6} /><path d="M20,12 L17.5,17.5 L12,20 L14.5,14.5 Z" fill={c} /></>}
      {i === 2 && <><rect x={5} y={9} width={22} height={17} rx={3} fill="none" stroke={c} strokeWidth={2.6} /><path d="M5,14 h22 M12,19 h8" stroke={c} strokeWidth={2.6} /></>}
    </svg>
  );
};
export const TabBar: React.FC<{ active: number; glow?: number }> = ({ active, glow = -1 }) => (
  <div style={{ height: 86, background: "#fff", borderTop: "2px solid #E6E8E4", display: "flex", alignItems: "center", justifyContent: "space-around", paddingBottom: 10 }}>
    {[0, 1, 2, 3].map((i) => (
      <div key={i} style={{ width: 60, height: 60, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", background: glow === i ? "rgba(99,211,97,0.25)" : "transparent", boxShadow: glow === i ? `0 0 0 4px ${PK}` : "none" }}>
        <TabIcon i={i} on={i === active} />
      </div>
    ))}
  </div>
);

/* ── 채팅 ── */
export type Msg = { from: "me" | "pk"; text?: string; node?: React.ReactNode; at: number; typeDur?: number };
export const ChatThread: React.FC<{ f: number; msgs: Msg[]; typing?: { at: number; until: number } }> = ({ f, msgs, typing }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12, justifyContent: "flex-end", height: "100%", paddingBottom: 40 }}>
    {msgs.filter((m) => f >= m.at).map((m, i) => {
      const t = f - m.at;
      const shown = m.text && m.from === "me" && m.typeDur ? m.text.slice(0, Math.ceil((m.text.length * t) / m.typeDur)) : m.text;
      const me = m.from === "me";
      return (
        <div key={i} style={{ alignSelf: me ? "flex-end" : "flex-start", display: "flex", gap: 8, maxWidth: "88%", opacity: lerp(t, 0, 6, 0, 1), transform: `translateY(${lerp(t, 0, 8, 18, 0)}px) scale(${lerp(t, 0, 8, 0.92, 1)})`, transformOrigin: me ? "100% 100%" : "0 100%" }}>
          {!me && <div style={{ flexShrink: 0, marginTop: 4 }}><BrandIcon id="pickle" size={30} /></div>}
          {m.node ?? (
            <div style={{ background: me ? PK : "#fff", color: me ? PK_INK : color.ink, border: me ? "none" : "2px solid #E3E6E1", borderRadius: me ? "20px 20px 6px 20px" : "20px 20px 20px 6px", padding: "11px 15px", fontSize: 19, fontWeight: 700, lineHeight: 1.45, boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>{shown}</div>
          )}
        </div>
      );
    })}
    {typing && f >= typing.at && f < typing.until && (
      <div style={{ alignSelf: "flex-start", display: "flex", gap: 8 }}>
        <BrandIcon id="pickle" size={30} />
        <div style={{ background: "#fff", border: "2px solid #E3E6E1", borderRadius: 18, padding: "12px 16px", display: "flex", gap: 6 }}>
          {[0, 1, 2].map((k) => <div key={k} style={{ width: 9, height: 9, borderRadius: "50%", background: PK_DARK, opacity: 0.3 + 0.7 * Math.abs(Math.sin((f + k * 5) * 0.25)) }} />)}
        </div>
      </div>
    )}
  </div>
);
export const InputBar: React.FC<{ text?: string; f?: number; dur?: number }> = ({ text = "", f = 999, dur = 1 }) => {
  const shown = text.slice(0, Math.max(0, Math.ceil((text.length * f) / dur)));
  return (
    <div style={{ position: "absolute", left: 12, right: 12, bottom: 8, height: 52, background: "#fff", border: `3px solid ${shown ? PK : "#E3E6E1"}`, borderRadius: 26, display: "flex", alignItems: "center", padding: "0 10px 0 18px", gap: 8, fontSize: 17, fontWeight: 600, color: shown ? color.ink : "#A0A6AC" }}>
      <div style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", direction: shown.length > 22 ? "rtl" : "ltr" }}>{shown || "피클에게 일을 맡겨보세요"}{shown && shown.length < text.length ? "▍" : ""}</div>
      <div style={{ width: 36, height: 36, borderRadius: "50%", background: shown ? PK : "#E3E6E1", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900 }}>↑</div>
    </div>
  );
};

/** 작업 확인 카드 (조건 → 승인) */
export const TaskCard: React.FC<{ title: string; rows: Array<[string, string]>; f: number; approve?: string; approved?: boolean; w?: number }> = ({ title, rows, f, approve = "진행 승인", approved, w = 300 }) => (
  <div style={{ width: w, background: "#fff", border: `3px solid ${PK}`, borderRadius: 18, padding: 14, boxShadow: "0 4px 14px rgba(0,0,0,0.08)", fontFamily: F }}>
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 900, fontSize: 18, color: PK_DARK }}>📋 {title}</div>
    {rows.map(([k, v], i) => (
      <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 700, padding: "6px 0", borderBottom: "1px dashed #E3E6E1", opacity: lerp(f - 6 - i * 5, 0, 6, 0, 1) }}>
        <span style={{ color: "#6B737B" }}>{k}</span><span style={{ color: color.ink }}>{v}</span>
      </div>
    ))}
    <div style={{ marginTop: 10, height: 40, borderRadius: 12, background: approved ? PK_DARK : PK, color: approved ? "#fff" : PK_INK, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18 }}>{approved ? "✓ 승인함" : approve}</div>
  </div>
);

/* ── 스토어 검색 (Apple/Google 로고 대신 글자 표기) ── */
export const StoreSearch: React.FC<{ store: "ios" | "android"; f: number }> = ({ store, f }) => {
  const q = "피클";
  const typed = q.slice(0, Math.max(0, Math.ceil(f / 8)));
  const show = f > 22;
  return (
    <div style={{ width: SCREEN_W, height: SCREEN_H, background: "#fff", fontFamily: F, position: "relative", overflow: "hidden" }}>
      <div style={{ height: 44 }} />
      <div style={{ padding: "8px 20px", fontWeight: 900, fontSize: 30, color: color.ink }}>{store === "ios" ? "App Store" : "Google Play"}</div>
      <div style={{ margin: "6px 16px", height: 48, borderRadius: 14, background: "#EEF0F2", display: "flex", alignItems: "center", gap: 10, padding: "0 14px", fontSize: 20, fontWeight: 700 }}>🔍 {typed}<span style={{ opacity: typed.length < q.length ? 1 : 0 }}>▍</span></div>
      {show && (
        <div style={{ margin: "22px 16px", display: "flex", alignItems: "center", gap: 14, opacity: lerp(f - 22, 0, 8, 0, 1), transform: `translateY(${lerp(f - 22, 0, 8, 20, 0)}px)` }}>
          <div style={{ width: 76, height: 76, borderRadius: 18, background: "#fff", border: "2px solid #E3E6E1", display: "flex", alignItems: "center", justifyContent: "center" }}><BrandIcon id="pickle" size={60} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 900, fontSize: 19, lineHeight: 1.25 }}>피클: 나만의 AI 에이전트</div>
            <div style={{ fontSize: 15, color: "#6B737B", fontWeight: 600 }}>생산성</div>
          </div>
          <div style={{ background: store === "ios" ? "#0A84FF" : "#01875F", color: "#fff", borderRadius: 999, padding: "6px 16px", fontWeight: 900, fontSize: 17 }}>{store === "ios" ? "받기" : "설치"}</div>
        </div>
      )}
      <ReconTag />
    </div>
  );
};

/** 설치 → 가입 안내 → 완료 3단계 */
export const SignupSteps: React.FC<{ f: number }> = ({ f }) => {
  const step = f < 40 ? 0 : f < 80 ? 1 : 2;
  const items = ["앱 설치", "화면 안내대로 가입", "채팅 시작!"];
  return (
    <div style={{ width: SCREEN_W, height: SCREEN_H, background: "#F5F6F4", fontFamily: F, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22 }}>
      <div style={{ transform: `scale(${1 + 0.06 * Math.sin(f * 0.2)})` }}><BrandIcon id="pickle" size={120} /></div>
      {items.map((t, i) => (
        <div key={t} style={{ width: 290, display: "flex", alignItems: "center", gap: 12, background: "#fff", border: `3px solid ${i <= step ? PK : "#E3E6E1"}`, borderRadius: 16, padding: "12px 16px", fontWeight: 800, fontSize: 20, opacity: i <= step ? 1 : 0.45 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: i < step ? PK_DARK : i === step ? PK : "#E3E6E1", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>{i < step ? "✓" : i + 1}</div>{t}
        </div>
      ))}
      {step === 0 && <div style={{ width: 290, height: 12, borderRadius: 6, background: "#E3E6E1", overflow: "hidden" }}><div style={{ width: `${lerp(f, 0, 36, 0, 100)}%`, height: "100%", background: PK }} /></div>}
      <ReconTag />
    </div>
  );
};

/* ── 사례 화면 ── */
export const BillsSummary: React.FC<{ f: number }> = ({ f }) => (
  <TaskCard f={f} w={330} title="이번 달 납부 정리" approve="결제 금액 확인" rows={[["⚡ 전기요금", "84,200원 · 25일"], ["💧 수도요금", "21,500원 · 28일"], ["🌐 인터넷", "33,000원 · 30일"], ["납부 사이트", "준비 완료"]]} />
);
export const DocsChecklist: React.FC<{ f: number }> = ({ f }) => (
  <div style={{ width: 330, background: "#fff", border: `3px solid ${PK}`, borderRadius: 18, padding: 14, fontFamily: F }}>
    <div style={{ fontWeight: 900, fontSize: 18, color: PK_DARK }}>📄 서류 발급 준비</div>
    {[["발급 기관 · 사이트 확인", true], ["온라인 신청 절차 정리", true], ["필요한 정보 체크", true], ["본인인증은 사장님이 직접", false]].map(([t, ok], i) => (
      <div key={t as string} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 17, fontWeight: 800, padding: "7px 0", opacity: lerp(f - 6 - i * 8, 0, 6, 0, 1) }}>
        <div style={{ width: 24, height: 24, borderRadius: 7, background: ok ? PK : "#FFE4A8", border: `2px solid ${ok ? PK_DARK : "#E8B84A"}`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>{ok ? "✓" : "!"}</div>{t}
      </div>
    ))}
  </div>
);
export const CompareTable: React.FC<{ f: number; w?: number }> = ({ f, w = 760 }) => {
  const rows: Array<[string, string, string, string, boolean]> = [["A 쇼핑몰", "38,000원", "3,000원", "41,000원", false], ["B 쇼핑몰", "36,500원", "무료", "36,500원", true], ["C 쇼핑몰", "34,900원", "4,500원", "39,400원", false]];
  return (
    <div style={{ width: w, background: "#fff", border: `7px solid ${color.ink}`, borderRadius: 26, boxShadow: ui.shadow(12), overflow: "hidden", fontFamily: F }}>
      <div style={{ height: 64, background: PK, borderBottom: `5px solid ${color.ink}`, display: "flex", alignItems: "center", gap: 12, padding: "0 22px", fontWeight: 900, fontSize: 28, color: PK_INK }}><BrandIcon id="pickle" size={42} /> 종이컵 1,000개 · 배송비 포함 비교</div>
      <div style={{ padding: "16px 22px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr 1.1fr", fontSize: 22, fontWeight: 800, color: "#6B737B", padding: "6px 10px" }}><span>판매처</span><span>상품가</span><span>배송비</span><span>합계</span></div>
        {rows.map(([n, p, d, t, best], i) => (
          <div key={n} style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr 1.1fr", fontSize: 27, fontWeight: 900, padding: "12px 10px", borderRadius: 14, background: best && f > 50 ? "rgba(99,211,97,0.22)" : "transparent", border: best && f > 50 ? `4px solid ${PK_DARK}` : "4px solid transparent", opacity: lerp(f - 8 - i * 8, 0, 6, 0, 1) }}>
            <span>{n}</span><span>{p}</span><span>{d}</span><span>{t}{best && f > 50 ? " 👍" : ""}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
          <ExampleTag />
          <div style={{ background: "#FFF7D6", border: `4px solid ${color.ink}`, borderRadius: 14, padding: "6px 16px", fontWeight: 900, fontSize: 22, opacity: f > 64 ? 1 : 0 }}>구매 전 사장님 확인 ✓</div>
        </div>
      </div>
    </div>
  );
};
export const PromoResult: React.FC<{ f: number }> = ({ f }) => (
  <div style={{ width: 330, display: "flex", flexDirection: "column", gap: 10, fontFamily: F }}>
    <div style={{ background: "#fff", border: `3px solid ${PK}`, borderRadius: 18, padding: 14, opacity: lerp(f, 0, 6, 0, 1) }}>
      <div style={{ fontWeight: 900, fontSize: 17, color: PK_DARK }}>✍️ 홍보 문구 초안</div>
      <div style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.5, marginTop: 4 }}>"이번 주말만! 단골 감사 10% 할인 🎉<br />토·일 이틀간 진행합니다"</div>
    </div>
    <div style={{ background: "#fff", border: `3px solid ${PK}`, borderRadius: 18, padding: 14, opacity: lerp(f - 12, 0, 6, 0, 1) }}>
      <div style={{ fontWeight: 900, fontSize: 17, color: PK_DARK }}>🗓 홍보 일정</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginTop: 6 }}>
        {["월", "화", "수", "목", "금", "토", "일"].map((d, i) => (
          <div key={d} style={{ textAlign: "center", fontSize: 14, fontWeight: 800, borderRadius: 8, padding: "6px 0", background: [2, 4].includes(i) ? "#FFE08A" : [5, 6].includes(i) ? "rgba(99,211,97,0.35)" : "#F1F3F0" }}>{d}<br />{i === 2 ? "예고" : i === 4 ? "리마인드" : i >= 5 ? "행사" : ""}</div>
        ))}
      </div>
      <div style={{ fontSize: 14, color: "#6B737B", fontWeight: 700, marginTop: 6 }}>게시는 사장님이 확인 후</div>
    </div>
  </div>
);
export const CallScreen: React.FC<{ f: number }> = ({ f }) => (
  <div style={{ width: SCREEN_W, height: SCREEN_H, background: "linear-gradient(180deg,#14361A,#0E2412)", color: "#fff", fontFamily: F, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 110, gap: 14 }}>
    <div style={{ fontSize: 18, fontWeight: 700, opacity: 0.8 }}>피클이 대신 문의 중</div>
    <div style={{ fontSize: 30, fontWeight: 900 }}>OO 냉장고 수리점</div>
    <div style={{ fontSize: 18, opacity: 0.7 }}>010-****-0000 (가상)</div>
    <div style={{ display: "flex", alignItems: "center", gap: 5, height: 90, marginTop: 20 }}>
      {Array.from({ length: 22 }, (_, i) => <div key={i} style={{ width: 7, borderRadius: 4, background: PK, height: 14 + Math.abs(Math.sin(f * 0.35 + i * 0.7)) * 60 * (0.5 + 0.5 * Math.sin(i)) }} />)}
    </div>
    <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10, width: 300 }}>
      {["출장 수리 비용은요?", "이번 주 방문 가능한 날은요?"].map((q, i) => (
        <div key={q} style={{ background: "rgba(255,255,255,0.12)", border: `2px solid ${PK}`, borderRadius: 14, padding: "10px 14px", fontSize: 18, fontWeight: 800, opacity: lerp(f - 20 - i * 24, 0, 6, 0, 1) }}>🗣 {q}</div>
      ))}
    </div>
    <div style={{ position: "absolute", bottom: 60, width: 72, height: 72, borderRadius: "50%", background: "#FF4D4F", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>📞</div>
    <ReconTag style={{ bottom: 14 }} />
  </div>
);
export const CallSummary: React.FC<{ f: number }> = ({ f }) => (
  <TaskCard f={f} w={330} title="문의 결과 요약" approve="방문 예약 진행할까요?" rows={[["업체", "OO 냉장고 수리점"], ["출장비", "30,000원 (부품 별도)"], ["방문 가능", "목 오후 · 금 오전"], ["통화 결과", "예시"]]} />
);
export const PlanCards: React.FC<{ f: number }> = ({ f }) => {
  const plans = ["Plus", "Pro", "Max", "Ultra"];
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 22, fontFamily: F }}>
      {plans.map((p, i) => {
        const t = f - i * 7;
        return (
          <div key={p} style={{ width: 230, height: 230 + i * 70, background: i === 0 ? "#fff" : `rgba(99,211,97,${0.18 + i * 0.18})`, border: `7px solid ${color.ink}`, borderRadius: 26, boxShadow: ui.shadow(12), display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", paddingTop: 26, gap: 14, transform: `translateY(${lerp(t, 0, 14, 400, 0)}px)`, opacity: lerp(t, 0, 6, 0, 1) }}>
            <div style={{ fontSize: 44, fontWeight: 900 }}>{p}</div>
            <div style={{ width: 150, height: 20, borderRadius: 10, background: "#fff", border: `4px solid ${color.ink}`, overflow: "hidden" }}><div style={{ width: `${25 + i * 25}%`, height: "100%", background: PK_DARK }} /></div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#3B4652" }}>주간 크레딧 {"●".repeat(i + 1)}</div>
          </div>
        );
      })}
    </div>
  );
};
