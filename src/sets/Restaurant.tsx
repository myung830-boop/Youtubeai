import React from "react";
import { useCurrentFrame } from "remotion";
import { color, font, ui } from "../styles/theme";

/** 가상 1인 식당 '동네밥상' 세트 (1920x1080 기준) */
export const RestaurantInterior: React.FC<{ children?: React.ReactNode; front?: React.ReactNode; busy?: number }> = ({ children, front, busy = 0 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", fontFamily: font.family }}>
      {/* 벽 · 바닥 */}
      <div style={{ position: "absolute", inset: "0 0 280px 0", background: "#FFF4E6" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 120, background: "repeating-linear-gradient(90deg,#F6D9B8 0 60px,#F1CFA9 60px 120px)", borderBottom: `8px solid ${color.ink}` }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 280, background: "repeating-linear-gradient(90deg,#D9B48C 0 160px,#CFA97F 160px 320px)", borderTop: `8px solid ${color.ink}` }} />
      {/* 간판 */}
      <div style={{ position: "absolute", left: 700, top: 150, width: 520, height: 110, background: color.main, border: `8px solid ${color.ink}`, borderRadius: 22, boxShadow: ui.shadow(10), display: "flex", alignItems: "center", justifyContent: "center", gap: 16, color: "#fff", fontWeight: 900, fontSize: 56 }}>
        🍚 동네밥상
      </div>
      {/* 메뉴판 */}
      <div style={{ position: "absolute", left: 90, top: 190, width: 420, height: 330, background: "#2B3A2E", border: `10px solid #8B5E34`, borderRadius: 14, padding: "26px 30px", color: "#F5F1E6", fontWeight: 800, fontSize: 34, lineHeight: 1.7 }}>
        <div style={{ fontSize: 30, color: color.accent }}>오늘의 메뉴</div>
        제육 정식 · 11,000<br />된장찌개 · 9,000<br />계절 한정 · 12,000
      </div>
      {/* 주방 창(패스) */}
      <div style={{ position: "absolute", right: 90, top: 190, width: 560, height: 300, background: "#E7EEF6", border: `10px solid ${color.ink}`, borderRadius: 16, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 60, background: "repeating-linear-gradient(90deg,#fff 0 40px,#FF6B6B 40px 80px)", borderBottom: `6px solid ${color.ink}` }} />
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ position: "absolute", left: 60 + i * 160, top: 130, width: 120, height: 70, borderRadius: "0 0 60px 60px", background: "#fff", border: `6px solid ${color.ink}` }}>
            {[0, 1].map((k) => <div key={k} style={{ position: "absolute", left: 30 + k * 34, top: -46 - ((frame * 1.5 + i * 13 + k * 7) % 30), width: 10, height: 30, borderRadius: 6, background: "#C8D3E3", opacity: 0.8 }} />)}
          </div>
        ))}
      </div>
      {/* 바쁨 표시: 쌓이는 메모 */}
      {Array.from({ length: Math.round(busy * 8) }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 620 + ((i * 167) % 700), top: 300 + ((i * 97) % 160), width: 150, height: 110, background: ["#FFF59D", "#FFCDD2", "#C8E6C9", "#BBDEFB"][i % 4], border: `5px solid ${color.ink}`, transform: `rotate(${((i * 37) % 30) - 15}deg)`, fontWeight: 900, fontSize: 26, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: ui.shadow(5) }}>
          {["단골?", "예약", "재료!", "전화", "쿠폰", "휴무", "발주", "메뉴"][i % 8]}
        </div>
      ))}
      {children}
      {/* 계산대 */}
      <div style={{ position: "absolute", left: 560, top: 720, width: 800, height: 260, background: "#8B5E34", border: `10px solid ${color.ink}`, borderRadius: "22px 22px 0 0", boxShadow: ui.shadow(10) }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 44, background: "#C9A27A", borderBottom: `8px solid ${color.ink}`, borderRadius: "14px 14px 0 0" }} />
      </div>
      {front}
    </div>
  );
};

/** 위에서 내려다본 식탁 (QR 스탠드 · 밥상) */
export const TableTopDown: React.FC<{ qrGlow?: number; children?: React.ReactNode }> = ({ qrGlow = 0, children }) => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#CFA97F", fontFamily: font.family }}>
    <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0 4px, transparent 4px 60px)" }} />
    <div style={{ position: "absolute", left: 360, top: 140, width: 1200, height: 800, background: "#E9C99F", border: `12px solid ${color.ink}`, borderRadius: 40, boxShadow: ui.shadow(16) }} />
    {[[560, 360], [1160, 360], [860, 620]].map(([x, y], i) => (
      <div key={i} style={{ position: "absolute", left: x, top: y, width: 200, height: 200, borderRadius: "50%", background: "#fff", border: `10px solid ${color.ink}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 130, height: 130, borderRadius: "50%", background: ["#E06C3C", "#C58B3B", "#F2E8D5"][i], border: `6px solid ${color.ink}` }} />
      </div>
    ))}
    {/* QR 스탠드 */}
    <div style={{ position: "absolute", left: 1290, top: 640, width: 190, height: 220, background: "#fff", border: `8px solid ${color.ink}`, borderRadius: 18, boxShadow: `0 0 ${qrGlow * 60}px ${qrGlow * 20}px rgba(250,204,21,0.8)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
      <svg viewBox="0 0 21 21" width={120} height={120} shapeRendering="crispEdges">
        {Array.from({ length: 21 * 21 }, (_, k) => {
          const x = k % 21, y = Math.floor(k / 21);
          const inF = (fx: number, fy: number) => x >= fx && x < fx + 7 && y >= fy && y < fy + 7;
          const f = inF(0, 0) ? [0, 0] : inF(14, 0) ? [14, 0] : inF(0, 14) ? [0, 14] : null;
          let on: boolean;
          if (f) {
            const dx = x - f[0], dy = y - f[1];
            on = dx === 0 || dy === 0 || dx === 6 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4);
          } else on = (x * 7 + y * 13 + x * y) % 3 === 0;
          return on ? <rect key={k} x={x} y={y} width={1} height={1} fill={color.ink} /> : null;
        })}
      </svg>
      <div style={{ fontWeight: 900, fontSize: 24 }}>TABLE 03</div>
    </div>
    {children}
  </div>
);
