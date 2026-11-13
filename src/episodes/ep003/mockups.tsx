import React from "react";
import { useCurrentFrame } from "remotion";
import { BrandIcon, BRANDS } from "../../brands/registry";
import { color, font, ui } from "../../styles/theme";
import { lerp } from "../../motion/core";

/**
 * 3편 예시 화면 — 가상 1인 식당 '동네밥상'. 내용은 Drive ep03 시연화면 10컷(v2) 참고.
 * 모든 화면은 '시연용 재구성 · 예시 화면' (실제 서비스 캡처 아님)
 */
const F = font.family;
export const DemoTag: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div style={{ position: "absolute", right: 16, top: 14, background: "#FFF3D6", color: "#8A5A00", border: "3px solid #E8B84A", borderRadius: 999, padding: "3px 14px", fontFamily: F, fontWeight: 800, fontSize: 18, zIndex: 5, ...style }}>시연용 재구성 · 예시 화면</div>
);
const Win: React.FC<{ w: number; h: number; title: React.ReactNode; bar?: string; children: React.ReactNode; dark?: boolean; style?: React.CSSProperties }> = ({ w, h, title, bar = color.main, children, dark, style }) => (
  <div style={{ width: w, height: h, background: dark ? "#141821" : "#fff", border: `7px solid ${color.ink}`, borderRadius: 26, boxShadow: ui.shadow(12), overflow: "hidden", display: "flex", flexDirection: "column", fontFamily: F, position: "relative", ...style }}>
    <div style={{ height: 64, background: bar, borderBottom: `5px solid ${color.ink}`, display: "flex", alignItems: "center", gap: 14, padding: "0 22px", color: "#fff", fontWeight: 900, fontSize: 28 }}>{title}</div>
    <div style={{ flex: 1, position: "relative", padding: 28, color: dark ? "#E6EAF2" : color.ink }}>{children}</div>
    <DemoTag style={{ top: 78 }} />
  </div>
);
const Chip: React.FC<{ children: React.ReactNode; bg?: string; fg?: string; style?: React.CSSProperties }> = ({ children, bg = color.sub, fg = color.ink, style }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: bg, color: fg, border: `4px solid ${color.ink}`, borderRadius: 999, padding: "4px 16px", fontWeight: 800, fontSize: 24, ...style }}>{children}</div>
);

/* ── ChatGPT 채팅 ── */
export const ChatGPTChat: React.FC<{ w?: number; h?: number; prompt: string; typed: number; answer?: React.ReactNode }> = ({ w = 1200, h = 680, prompt, typed, answer }) => (
  <Win w={w} h={h} bar="#111" title={<><BrandIcon id="chatgpt" size={40} /> ChatGPT</>}>
    <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 30 }}>
      <div style={{ alignSelf: "flex-end", maxWidth: "78%", background: "#F2F2F2", border: "3px solid #DDD", borderRadius: "24px 24px 6px 24px", padding: "18px 24px", fontSize: 30, fontWeight: 600, lineHeight: 1.5 }}>
        {prompt.slice(0, typed)}{typed < prompt.length && <span style={{ color: BRANDS.chatgpt.colors.secondary }}>▍</span>}
      </div>
      {answer && <div style={{ alignSelf: "flex-start", width: "92%", display: "flex", gap: 14 }}><BrandIcon id="chatgpt" size={44} /><div style={{ flex: 1 }}>{answer}</div></div>}
    </div>
  </Win>
);

/** sc_07: 4개 시스템 기획 카드 (ChatGPT 답변) */
export const FourSystems: React.FC<{ f: number; order?: number[] }> = ({ f, order = [0, 1, 2, 3] }) => {
  const items = [
    ["01 단골 관리", "태블릿 회원가입 · 쿠폰·가게 소식"],
    ["02 홈페이지", "쿠킹클래스 신청 · 가맹 상담"],
    ["03 QR 메뉴", "사진·가격·품절 표시"],
    ["04 재료 발주", "재고 기록 · 구매목록 자동 정리"],
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      {order.map((k, i) => (
        <div key={k} style={{ background: "#F0FAF6", border: `4px solid ${color.ink}`, borderRadius: 18, padding: "14px 18px", opacity: lerp(f - i * 6, 0, 6, 0, 1), transform: `translateY(${lerp(f - i * 6, 0, 8, 30, 0)}px)` }}>
          <div style={{ fontWeight: 900, fontSize: 28, color: "#0E7A5F" }}>{items[k][0]}</div>
          <div style={{ fontWeight: 600, fontSize: 22, marginTop: 4 }}>{items[k][1]}</div>
        </div>
      ))}
    </div>
  );
};

/* ── Claude Code 터미널 ── */
export const ClaudeTerminal: React.FC<{ w?: number; h?: number; lines: Array<[string, string]>; f: number; title?: string }> = ({ w = 1100, h = 620, lines, f, title = "Claude Code" }) => (
  <Win w={w} h={h} dark bar={BRANDS.claude.colors.primary} title={<><BrandIcon id="claude" size={40} /> {title}</>}>
    <div style={{ fontFamily: "DejaVu Sans Mono, monospace", fontSize: 28, lineHeight: 1.7, marginTop: 30 }}>
      {lines.map(([k, t], i) => {
        const shown = Math.floor(lerp(f - i * 10, 0, 8, 0, t.length, (x) => x));
        if (f - i * 10 < 0) return null;
        const c = k === "$" ? "#F5B48C" : k === "✓" ? "#7EE2B8" : k === "!" ? "#FFD27A" : "#9CC7FF";
        return <div key={i}><span style={{ color: c }}>{k}</span> {t.slice(0, shown)}</div>;
      })}
    </div>
  </Win>
);

/* ── sc_08 태블릿 회원 등록 ── */
export const TabletSignup: React.FC<{ f: number }> = ({ f }) => {
  const digits = "01012341234";
  const n = Math.min(digits.length, Math.max(0, Math.floor(f / 3)));
  const shown = digits.slice(0, n).replace(/^(\d{3})(\d{0,4})(\d{0,4}).*/, (_, a, b, c) => [a, b && "****".slice(0, b.length), c].filter(Boolean).join("-"));
  const done = f > 46;
  return (
    <div style={{ width: 1000, height: 680, background: "#20242E", borderRadius: 54, padding: 30, boxShadow: ui.shadow(14), border: `8px solid ${color.ink}`, position: "relative" }}>
      <div style={{ width: "100%", height: "100%", background: "#FFF8EF", borderRadius: 30, padding: "40px 60px", fontFamily: F, position: "relative", overflow: "hidden" }}>
        <DemoTag />
        <div style={{ fontWeight: 900, fontSize: 52 }}>🍚 동네밥상 멤버십</div>
        <div style={{ fontWeight: 600, fontSize: 30, opacity: 0.7, marginTop: 6 }}>식사 후 혜택·소식 받기</div>
        <div style={{ marginTop: 34, height: 96, background: "#fff", border: `5px solid ${done ? "#22C55E" : color.point}`, borderRadius: 20, display: "flex", alignItems: "center", padding: "0 30px", fontSize: 50, fontWeight: 800, letterSpacing: "0.04em" }}>{shown || <span style={{ opacity: 0.35 }}>휴대폰 번호</span>}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginTop: 24 }}>
          {"1234567890".split("").map((d) => <div key={d} style={{ height: 70, background: "#fff", border: `4px solid ${color.ink}`, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 34 }}>{d}</div>)}
        </div>
        <div style={{ marginTop: 24, background: done ? "#22C55E" : color.point, color: "#fff", border: `5px solid ${color.ink}`, borderRadius: 20, padding: "18px", textAlign: "center", fontWeight: 900, fontSize: 38 }}>{done ? "등록 완료! 🎉" : "회원 등록하기"}</div>
      </div>
    </div>
  );
};

/* ── sc_09 쿠폰·소식 ── */
export const CouponCampaign: React.FC<{ f: number }> = ({ f }) => (
  <Win w={1180} h={640} title="📣 단골 관리 · 쿠폰과 가게 소식">
    <div style={{ display: "flex", gap: 26, marginTop: 30 }}>
      <div style={{ flex: 1.1, background: "linear-gradient(135deg,#FFE08A,#FFB86B)", border: `6px solid ${color.ink}`, borderRadius: 26, padding: 28, position: "relative", transform: `rotate(${lerp(f, 0, 12, -8, -2)}deg)`, boxShadow: ui.shadow(8) }}>
        <div style={{ fontWeight: 800, fontSize: 26 }}>단골 감사 쿠폰</div>
        <div style={{ fontWeight: 900, fontSize: 96, letterSpacing: "-0.04em" }}>10% OFF</div>
        <div style={{ fontWeight: 700, fontSize: 24 }}>대상: <b>광고 수신 동의 고객</b> · 이번 달 말까지</div>
        <div style={{ position: "absolute", right: -18, top: "42%", width: 36, height: 36, borderRadius: "50%", background: "#fff", border: `5px solid ${color.ink}` }} />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ fontWeight: 900, fontSize: 30 }}>가게 소식</div>
        {["🆕 신메뉴 출시 안내", "📅 휴무일 변경 알림", "🎉 특별 행사 안내"].map((t, i) => (
          <div key={t} style={{ background: color.sub, border: `4px solid ${color.ink}`, borderRadius: 16, padding: "12px 18px", fontWeight: 800, fontSize: 28, opacity: lerp(f - 10 - i * 6, 0, 6, 0, 1), transform: `translateX(${lerp(f - 10 - i * 6, 0, 8, 60, 0)}px)` }}>{t}</div>
        ))}
        <Chip bg="#FFF3D6" style={{ alignSelf: "flex-start", marginTop: 6 }}>발송 전 동의 확인</Chip>
      </div>
    </div>
  </Win>
);

/* ── sc_10 동의 구분 ── */
export const ConsentForm: React.FC<{ f: number }> = ({ f }) => {
  const c1 = f > 14, c2 = f > 40;
  const Box: React.FC<{ on: boolean; label: string; tag: string; tagBg: string }> = ({ on, label, tag, tagBg }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 18, background: "#fff", border: `4px solid ${color.ink}`, borderRadius: 18, padding: "18px 22px" }}>
      <div style={{ width: 54, height: 54, borderRadius: 12, border: `5px solid ${color.ink}`, background: on ? "#22C55E" : "#fff", color: "#fff", fontSize: 38, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>{on ? "✓" : ""}</div>
      <div style={{ flex: 1, fontWeight: 800, fontSize: 30 }}>{label}</div>
      <Chip bg={tagBg}>{tag}</Chip>
    </div>
  );
  return (
    <Win w={1180} h={640} title="🔐 회원 정보 이용 동의">
      <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 30 }}>
        <Box on={c1} label="개인정보 수집·이용 안내 확인" tag="필수" tagBg="#FFD6D6" />
        <Box on={c2} label="행사·쿠폰 광고성 정보 수신" tag="선택" tagBg="#DDF5E6" />
        <div style={{ fontWeight: 700, fontSize: 24, opacity: 0.75 }}>선택 항목에 동의하지 않아도 기본 회원 이용이 가능하게</div>
        <div style={{ display: "flex", gap: 14 }}><Chip bg="#FFF3D6">수신 거부</Chip><Chip bg="#FFF3D6">동의 변경</Chip></div>
      </div>
    </Win>
  );
};

/* ── sc_11~13 홈페이지 ── */
export const RestaurantSite: React.FC<{ f: number; tab: 0 | 1 | 2; w?: number; h?: number }> = ({ f, tab, w = 1240, h = 700 }) => (
  <div style={{ width: w, height: h, background: "#fff", border: `7px solid ${color.ink}`, borderRadius: 26, boxShadow: ui.shadow(12), overflow: "hidden", fontFamily: F, position: "relative" }}>
    <div style={{ height: 56, background: "#EEF0F6", borderBottom: `4px solid ${color.ink}`, display: "flex", alignItems: "center", gap: 10, padding: "0 18px" }}>
      {["#FF6B6B", "#FACC15", "#4ADE80"].map((c) => <div key={c} style={{ width: 16, height: 16, borderRadius: 8, background: c, border: `2px solid ${color.ink}` }} />)}
      <div style={{ marginLeft: 12, flex: 1, background: "#fff", borderRadius: 10, padding: "6px 16px", fontSize: 22, color: "#5A6378" }}>🔒 dongnebapsang.example</div>
    </div>
    <DemoTag style={{ top: 70 }} />
    <div style={{ height: 70, display: "flex", alignItems: "center", gap: 30, padding: "0 34px", borderBottom: "3px solid #EEE", fontWeight: 800, fontSize: 26 }}>
      <span style={{ fontWeight: 900, fontSize: 32, color: color.main }}>🍚 동네밥상</span>
      {["메뉴", "예약", "쿠킹클래스", "가맹 상담"].map((t, i) => <span key={t} style={{ color: (tab === 1 && i === 2) || (tab === 2 && i === 3) ? "#E06C3C" : color.ink, borderBottom: (tab === 1 && i === 2) || (tab === 2 && i === 3) ? "5px solid #E06C3C" : "none" }}>{t}</span>)}
    </div>
    <div style={{ padding: 34, position: "relative", height: h - 196 }}>
      {tab === 0 && (
        <div style={{ display: "flex", gap: 30, opacity: lerp(f, 0, 8, 0, 1) }}>
          <div style={{ flex: 1.2, height: 380, borderRadius: 24, background: "linear-gradient(135deg,#FFE3C4,#F6B98A)", border: `5px solid ${color.ink}`, padding: 34 }}>
            <div style={{ fontWeight: 900, fontSize: 52, lineHeight: 1.2 }}>한 그릇에 담는 정성,<br />동네밥상</div>
            <div style={{ fontWeight: 700, fontSize: 26, marginTop: 14 }}>오늘의 메뉴 · 영업 안내 · 오시는 길</div>
            <div style={{ display: "flex", gap: 14, marginTop: 30 }}><Chip bg="#E06C3C" fg="#fff">쿠킹클래스 신청</Chip><Chip>가맹 상담 문의</Chip></div>
          </div>
          <div style={{ flex: 0.8, display: "flex", flexDirection: "column", gap: 14 }}>
            {["🍲 메뉴·브랜드 소개", "📅 예약 안내", "👩‍🍳 쿠킹클래스", "🤝 사업 노하우"].map((t, i) => <div key={t} style={{ background: color.sub, border: `4px solid ${color.ink}`, borderRadius: 16, padding: "16px 20px", fontWeight: 800, fontSize: 28, transform: `translateX(${lerp(f - 6 - i * 5, 0, 8, 80, 0)}px)`, opacity: lerp(f - 6 - i * 5, 0, 6, 0, 1) }}>{t}</div>)}
          </div>
        </div>
      )}
      {tab === 1 && (
        <div style={{ display: "flex", gap: 30 }}>
          <div style={{ flex: 1, background: "#FFF4E6", border: `5px solid ${color.ink}`, borderRadius: 24, padding: 30 }}>
            <div style={{ fontWeight: 900, fontSize: 44 }}>퇴근 후 집밥 한 상 클래스</div>
            <div style={{ fontWeight: 700, fontSize: 28, marginTop: 10 }}>90분 · 정원 6명 (예시)<br />배우는 메뉴: 국 · 반찬 2종</div>
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>{["토 11:00", "토 15:00", "일 11:00"].map((d, i) => <Chip key={d} bg={f > 20 && i === 1 ? "#E06C3C" : "#fff"} fg={f > 20 && i === 1 ? "#fff" : color.ink}>{d}</Chip>)}</div>
            <div style={{ marginTop: 28, background: f > 34 ? "#22C55E" : "#E06C3C", color: "#fff", border: `5px solid ${color.ink}`, borderRadius: 18, padding: "16px", textAlign: "center", fontWeight: 900, fontSize: 34 }}>{f > 34 ? "신청 완료 ✓" : "클래스 신청하기"}</div>
          </div>
          <div style={{ flex: 0.7, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontWeight: 900, fontSize: 30 }}>신청 관리</div>
            {["일정·인원 확인", "신청자 목록", "안내문 준비"].map((t) => <Chip key={t} style={{ fontSize: 26 }}>{t}</Chip>)}
            <Chip bg="#FFF3D6" style={{ marginTop: 10 }}>결제 연동은 별도</Chip>
          </div>
        </div>
      )}
      {tab === 2 && (
        <div style={{ display: "flex", gap: 30 }}>
          {[["📚 교육 상담 접수", ["레시피 교육", "매장 운영 방식", "조리 표준화"]], ["🤝 가맹 관심 문의", ["희망 지역", "상담 신청", "사업 소개자료"]]].map(([t, l], i) => (
            <div key={t as string} style={{ flex: 1, background: i ? "#EEF4FF" : "#F0FAF6", border: `5px solid ${color.ink}`, borderRadius: 24, padding: 28, transform: `translateY(${lerp(f - i * 8, 0, 10, 80, 0)}px)`, opacity: lerp(f - i * 8, 0, 6, 0, 1) }}>
              <div style={{ fontWeight: 900, fontSize: 38 }}>{t as string}</div>
              {(l as string[]).map((x) => <div key={x} style={{ fontWeight: 700, fontSize: 28, marginTop: 14 }}>· {x}</div>)}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

/* ── sc_14 QR 메뉴 (손님 휴대폰) ── */
export const QRMenuPhone: React.FC<{ soldOut: boolean; pick?: boolean; w?: number }> = ({ soldOut, pick, w = 380 }) => {
  const menu: Array<[string, string, string]> = [["🥘", "제육 정식", "11,000원"], ["🍲", "된장찌개", "9,000원"], ["🍜", "계절 한정 메뉴", "12,000원"]];
  return (
    <div style={{ width: w, height: w * 2.05, background: color.ink, borderRadius: w * 0.14, padding: w * 0.035, boxShadow: ui.shadow(12) }}>
      <div style={{ width: "100%", height: "100%", background: "#FFF8EF", borderRadius: w * 0.11, overflow: "hidden", fontFamily: F, padding: "56px 24px 20px", position: "relative" }}>
        <div style={{ fontWeight: 900, fontSize: 34 }}>🍚 동네밥상 메뉴</div>
        <div style={{ fontWeight: 700, fontSize: 20, opacity: 0.6 }}>TABLE 03</div>
        {pick && <div style={{ marginTop: 12, background: color.accent, border: `4px solid ${color.ink}`, borderRadius: 14, padding: "6px 12px", fontWeight: 900, fontSize: 22 }}>⭐ 오늘의 추천: 제육 정식</div>}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 16 }}>
          {menu.map(([e, n, p], i) => {
            const out = soldOut && i === 2;
            return (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", border: `4px solid ${color.ink}`, borderRadius: 18, padding: 12, opacity: out ? 0.45 : 1, position: "relative" }}>
                <div style={{ width: 70, height: 70, borderRadius: 14, background: "#FFE3C4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>{e}</div>
                <div style={{ flex: 1 }}><div style={{ fontWeight: 900, fontSize: 24 }}>{n}</div><div style={{ fontWeight: 700, fontSize: 22, color: "#E06C3C" }}>{p}</div></div>
                {out && <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%) rotate(-8deg)", background: "#FF4D4F", color: "#fff", border: `4px solid ${color.ink}`, borderRadius: 10, padding: "2px 12px", fontWeight: 900, fontSize: 24 }}>품절</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/** 사장님 메뉴 관리 화면 (품절 토글) */
export const MenuAdmin: React.FC<{ soldOut: boolean; pick: boolean }> = ({ soldOut, pick }) => {
  const T: React.FC<{ on: boolean }> = ({ on }) => (
    <div style={{ width: 96, height: 50, borderRadius: 25, background: on ? "#FF4D4F" : "#CBD5E1", border: `4px solid ${color.ink}`, position: "relative" }}>
      <div style={{ position: "absolute", top: 3, left: on ? 48 : 4, width: 36, height: 36, borderRadius: "50%", background: "#fff", border: `3px solid ${color.ink}` }} />
    </div>
  );
  return (
    <Win w={760} h={520} title="🛠 사장님 메뉴 관리">
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 30 }}>
        {[["제육 정식", pick ? "⭐ 추천" : ""], ["된장찌개", ""], ["계절 한정 메뉴", soldOut ? "품절" : ""]].map(([n, s], i) => (
          <div key={n} style={{ display: "flex", alignItems: "center", gap: 16, background: color.sub, border: `4px solid ${color.ink}`, borderRadius: 16, padding: "12px 18px" }}>
            <div style={{ flex: 1, fontWeight: 900, fontSize: 30 }}>{n} <span style={{ color: s === "품절" ? "#FF4D4F" : "#B7791F", fontSize: 24 }}>{s}</span></div>
            <span style={{ fontWeight: 800, fontSize: 22, opacity: 0.6 }}>품절</span><T on={i === 2 && soldOut} />
          </div>
        ))}
      </div>
    </Win>
  );
};

/* ── sc_15 재고 → 구매목록 ── */
const STOCK: Array<[string, number, number, string]> = [["🍚 쌀", 6, 10, "kg"], ["🥩 돼지고기", 2, 5, "kg"], ["🥬 대파", 1, 3, "단"], ["🧂 양념", 8, 5, "통"]];
export const StockBoard: React.FC<{ f: number }> = ({ f }) => (
  <Win w={1240} h={660} title="📦 오늘의 재고 → 자동 구매목록">
    <div style={{ display: "flex", gap: 30, marginTop: 30 }}>
      <div style={{ flex: 1.3, display: "flex", flexDirection: "column", gap: 18 }}>
        {STOCK.map(([n, cur, base, u], i) => {
          const v = lerp(f - i * 4, 0, 20, base, cur);
          const low = v < base * 0.8 && cur < base;
          return (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 200, fontWeight: 900, fontSize: 30 }}>{n}</div>
              <div style={{ flex: 1, height: 44, background: "#EEF1F6", border: `4px solid ${color.ink}`, borderRadius: 12, overflow: "hidden" }}>
                <div style={{ width: `${Math.min(100, (v / Math.max(base, cur)) * 100)}%`, height: "100%", background: low ? "#FF6B6B" : "#4ADE80" }} />
              </div>
              <div style={{ width: 160, fontWeight: 800, fontSize: 24 }}>{v.toFixed(0)}{u} / 기준 {base}{u}</div>
            </div>
          );
        })}
      </div>
      <div style={{ flex: 0.8, background: "#FFF8E1", border: `5px solid ${color.ink}`, borderRadius: 22, padding: 22 }}>
        <div style={{ fontWeight: 900, fontSize: 32 }}>🛒 구매목록</div>
        {[["쌀", "4 kg"], ["돼지고기", "3 kg"], ["대파", "2 단"]].map(([n, q], i) => (
          <div key={n} style={{ display: "flex", justifyContent: "space-between", background: "#fff", border: `4px solid ${color.ink}`, borderRadius: 14, padding: "10px 16px", marginTop: 14, fontWeight: 900, fontSize: 28, opacity: lerp(f - 24 - i * 8, 0, 6, 0, 1), transform: `translateX(${lerp(f - 24 - i * 8, 0, 10, -260, 0)}px)` }}><span>{n}</span><span>{q}</span></div>
        ))}
        <div style={{ marginTop: 14, fontWeight: 700, fontSize: 22, opacity: 0.6 }}>양념: 충분 · 재주문 불필요</div>
      </div>
    </div>
  </Win>
);

/* ── sc_16 공급처 비교 → 장바구니 ── */
export const SupplierCompare: React.FC<{ f: number; cart: boolean }> = ({ f, cart }) => (
  <Win w={1240} h={660} title="🏪 공급처 비교 · 돼지고기 3kg">
    <div style={{ display: "flex", gap: 22, marginTop: 30 }}>
      {[["공급처 A", "39,000원", "배송비 4,000원"], ["공급처 B", "40,500원", "배송비 무료"], ["공급처 C", "37,500원", "입고 일정 확인"]].map(([n, p, s], i) => (
        <div key={n} style={{ flex: 1, background: "#fff", border: `5px solid ${color.ink}`, borderRadius: 22, padding: 22, boxShadow: ui.shadow(6), transform: `translateY(${lerp(f - i * 6, 0, 10, 80, 0)}px)`, opacity: lerp(f - i * 6, 0, 6, 0, 1) }}>
          <div style={{ fontWeight: 900, fontSize: 30 }}>{n}</div>
          <div style={{ fontWeight: 900, fontSize: 52, letterSpacing: "-0.03em", marginTop: 8 }}>{p}</div>
          <div style={{ fontWeight: 700, fontSize: 24, opacity: 0.7 }}>{s}</div>
        </div>
      ))}
    </div>
    <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 20, background: cart ? "#EAF2FF" : "#F4F6FA", border: `5px solid ${color.ink}`, borderRadius: 20, padding: "16px 24px", opacity: cart ? 1 : 0.5 }}>
      <div style={{ fontSize: 46 }}>🛒</div>
      <div style={{ flex: 1, fontWeight: 900, fontSize: 30 }}>구매목록을 장바구니로 준비 <span style={{ fontWeight: 700, fontSize: 22, opacity: 0.6 }}>(연동 가능할 때)</span></div>
      <Chip bg="#FFF3D6">구매 확정 대기</Chip>
    </div>
  </Win>
);

/* ── 콘티 3컷 (ChatGPT) ── */
export const Storyboard3: React.FC<{ f: number }> = ({ f }) => (
  <div style={{ display: "flex", gap: 18 }}>
    {[["SC 01", "주문 폭주 😵", "#FFD6D6"], ["SC 02", "AI로 정리 ✨", "#DDF5E6"], ["SC 03", "한눈에! 📊", "#DCE9FF"]].map(([t, c, bg], i) => (
      <div key={t} style={{ width: 260, background: "#fff", border: `4px solid ${color.ink}`, borderRadius: 16, padding: 12, opacity: lerp(f - i * 6, 0, 6, 0, 1), transform: `rotate(${(i - 1) * 3}deg)` }}>
        <div style={{ fontWeight: 900, fontSize: 20, color: "#0E7A5F" }}>{t}</div>
        <div style={{ height: 120, background: bg, borderRadius: 10, border: `3px solid ${color.ink}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 28, marginTop: 6 }}>{c}</div>
      </div>
    ))}
  </div>
);

/** 렌더 미리보기 (움직이는 막대) */
export const RenderPreview: React.FC<{ w?: number }> = ({ w = 640 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ width: w, height: w * 0.62, background: "#0E1A33", border: `7px solid ${color.ink}`, borderRadius: 22, boxShadow: ui.shadow(10), padding: 22, fontFamily: F, color: "#fff", position: "relative", overflow: "hidden" }}>
      <div style={{ fontWeight: 800, fontSize: 20, color: "#7CF1DF" }}>PREVIEW ▶ {String(Math.floor((frame / 30) % 15)).padStart(2, "0")}s / 15s</div>
      <div style={{ fontWeight: 900, fontSize: 36, marginTop: 10 }}>한눈에 보는 동네밥상</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 18, height: w * 0.26, marginTop: 16, borderBottom: "3px solid #6E819B" }}>
        {[0.6, 0.9, 0.7, 1].map((v, i) => <div key={i} style={{ width: 60, height: `${(v * (0.6 + 0.4 * Math.abs(Math.sin(frame * 0.05 + i)))) * 100}%`, background: ["#6EABD6", "#72E5C8", "#E4B78A", "#A98BE8"][i], borderRadius: "8px 8px 0 0" }} />)}
      </div>
      <DemoTag style={{ top: 12 }} />
    </div>
  );
};
