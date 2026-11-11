import React from "react";
import { color, font } from "../../styles/theme";
import { Shoe } from "../ep001/mockups";

/* 실제 서비스 로고·디자인은 쓰지 않은 일반적인 예시 화면 */

const Row: React.FC<{ label: string; value: string; on: boolean; active?: boolean }> = ({ label, value, on, active }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
    <div style={{ width: 150, fontSize: 24, fontWeight: 800, color: "#5A6378" }}>{label}</div>
    <div style={{ flex: 1, height: 52, border: `3px solid ${active ? "#7C5CFF" : "#D5DBE8"}`, boxShadow: active ? "0 0 0 5px rgba(124,92,255,0.25)" : undefined, borderRadius: 12, display: "flex", alignItems: "center", padding: "0 16px", fontSize: 24, fontWeight: 700, color: color.ink, background: on ? "#fff" : "#F8F9FC" }}>
      {on ? value : ""}
    </div>
  </div>
);

/** 택배 발송 접수 화면. filled: 채워진 칸 수(0~5), done: 접수 완료 */
export const ParcelSite: React.FC<{ filled: number; done?: boolean; count?: number }> = ({ filled, done, count = 0 }) => {
  const rows: Array<[string, string]> = [["받는 분", "김○○"], ["연락처", "010-****-5678"], ["주소", "서울시 ○○구 ○○로 12"], ["물품", "운동화 (세탁 완료)"], ["수량", "1 박스"]];
  return (
    <div style={{ position: "absolute", inset: 0, padding: "26px 36px", fontFamily: font.family, display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ fontSize: 44 }}>📦</div>
        <div style={{ fontSize: 34, fontWeight: 900 }}>택배 발송 접수</div>
        <div style={{ marginLeft: "auto", background: "#EEF2FF", borderRadius: 999, padding: "6px 18px", fontSize: 22, fontWeight: 800, color: color.point }}>오늘 접수 {count}건</div>
      </div>
      {rows.map(([l, v], i) => <Row key={l} label={l} value={v} on={i < filled} active={i === filled && !done} />)}
      <div style={{ marginTop: 6, alignSelf: "flex-end", background: done ? "#22C55E" : color.point, color: "#fff", borderRadius: 14, padding: "14px 40px", fontSize: 28, fontWeight: 900, border: `4px solid ${color.ink}` }}>{done ? "접수 완료 ✓" : "접수하기"}</div>
    </div>
  );
};

/** 블로그 글쓰기 화면. typed: 본문 글자 수, photo: 사진 표시 */
export const BlogEditor: React.FC<{ title: string; body: string; typed: number; photo: boolean; titleTyped?: number }> = ({ title, body, typed, photo, titleTyped = 999 }) => (
  <div style={{ position: "absolute", inset: 0, padding: "24px 40px", fontFamily: font.family, display: "flex", flexDirection: "column", gap: 16, background: "#fff" }}>
    <div style={{ display: "flex", gap: 10, fontSize: 20, fontWeight: 800, color: "#5A6378" }}>
      {["본문", "사진", "인용구", "구분선"].map((t) => <div key={t} style={{ border: "2px solid #E2E6EF", borderRadius: 8, padding: "4px 12px" }}>{t}</div>)}
      <div style={{ marginLeft: "auto", background: "#16A34A", color: "#fff", borderRadius: 10, padding: "6px 22px", border: `3px solid ${color.ink}` }}>발행</div>
    </div>
    <div style={{ fontSize: 40, fontWeight: 900, borderBottom: "3px solid #EEF0F5", paddingBottom: 12, minHeight: 60 }}>{title.slice(0, titleTyped)}</div>
    <div style={{ display: "flex", gap: 24 }}>
      <div style={{ flex: 1, fontSize: 26, lineHeight: 1.6, fontWeight: 500, color: color.ink }}>{body.slice(0, typed)}{typed < body.length && typed > 0 ? <span style={{ color: "#7C5CFF" }}>▍</span> : null}</div>
      {photo && (
        <div style={{ width: 260, height: 220, background: color.sub, border: `4px solid ${color.ink}`, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Shoe w={190} />
        </div>
      )}
    </div>
  </div>
);

/** SNS 피드 올리기 화면 (인스타 예시). step: 0 사진 고르기 → 1 글 → 2 공유 완료 */
export const FeedPost: React.FC<{ step: number; caption: string; typed: number }> = ({ step, caption, typed }) => (
  <div style={{ position: "absolute", inset: 0, padding: "22px 36px", fontFamily: font.family, display: "flex", gap: 30, background: "#fff" }}>
    <div style={{ width: 420, height: 420, borderRadius: 24, border: `5px solid ${color.ink}`, background: "linear-gradient(135deg,#EAF2FF,#F5EEFF)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", flexShrink: 0 }}>
      <Shoe w={300} />
      <div style={{ position: "absolute", left: 16, top: 16, background: "#fff", border: `3px solid ${color.ink}`, borderRadius: 999, padding: "4px 14px", fontSize: 20, fontWeight: 800 }}>세탁 후 ✨</div>
    </div>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ fontSize: 30, fontWeight: 900 }}>새 게시물</div>
      <div style={{ flex: 1, border: "3px solid #E2E6EF", borderRadius: 16, padding: 18, fontSize: 24, lineHeight: 1.6, fontWeight: 500 }}>
        {step >= 1 ? caption.slice(0, typed) : <span style={{ color: "#9AA3B5" }}>문구 입력…</span>}
      </div>
      <div style={{ alignSelf: "flex-end", background: step >= 2 ? "#22C55E" : "linear-gradient(90deg,#FF7A59,#E1306C,#7C5CFF)", color: "#fff", borderRadius: 14, padding: "12px 40px", fontSize: 28, fontWeight: 900, border: `4px solid ${color.ink}` }}>{step >= 2 ? "공유 완료 ✓" : "공유하기"}</div>
    </div>
  </div>
);
