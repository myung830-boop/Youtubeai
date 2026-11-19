import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Boss } from "../character/Boss";
import { GridBg } from "../components/brand";
import { BrandBadge } from "../brands/registry";
import { QRMenuPhone, RestaurantSite, StockBoard, TabletSignup } from "../episodes/ep003/mockups";
import { color, font, ui } from "../styles/theme";

/**
 * 실사 사진 30% 섞기 샘플 (3편 장면으로 시험)
 * 원칙: 사진 = 배경·증거(실제 공간/음식), 그래픽 = 설명(캐릭터·UI·글자). 사진은 굵은 테두리·종이 질감으로 채널 톤에 맞춤.
 * 사진: Unsplash 무료 이미지 (public/stock) — 시험용 예시
 */
const F = font.family;
const Abs: React.FC<{ x: number; y: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ x, y, children, style }) => <div style={{ position: "absolute", left: x, top: y, ...style }}>{children}</div>;
const StockTag: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div style={{ position: "absolute", background: "rgba(27,37,65,0.82)", color: "#fff", borderRadius: 999, padding: "4px 14px", fontFamily: F, fontWeight: 700, fontSize: 20, ...style }}>📷 참고 사진 (스톡 이미지)</div>
);
const Chip: React.FC<{ n: string; label: string }> = ({ n, label }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 18, background: "#fff", border: `7px solid ${color.ink}`, borderRadius: 999, padding: "8px 38px 8px 10px", boxShadow: ui.shadow(10), fontFamily: F, fontWeight: 900, fontSize: 54 }}>
    <div style={{ width: 80, height: 80, borderRadius: "50%", background: color.accent, border: `6px solid ${color.ink}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 46 }}>{n}</div>
    {label}
  </div>
);
const Caption: React.FC<{ t: string }> = ({ t }) => (
  <div style={{ position: "absolute", left: 0, right: 0, bottom: 46, display: "flex", justifyContent: "center" }}>
    <div style={{ background: "#fff", border: `5px solid ${color.ink}`, borderRadius: 16, padding: "8px 28px", fontFamily: F, fontWeight: 800, fontSize: 40, boxShadow: ui.shadow(6) }}>{t}</div>
  </div>
);

/** A. 실제 공간 사진 배경 + 2D 캐릭터·UI (와이드) */
export const MixA: React.FC = () => (
  <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
    <Img src={staticFile("stock/interior.jpg")} style={{ position: "absolute", inset: -20, width: 1960, height: 1120, objectFit: "cover", filter: "blur(3px) saturate(0.85)" }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(27,37,65,0.55) 0%, rgba(27,37,65,0.15) 55%, rgba(27,37,65,0.35) 100%)" }} />
    <Abs x={90} y={70}><Chip n="1" label="단골 회원 · 쿠폰" /></Abs>
    <Abs x={1010} y={190} style={{ transform: "scale(0.78) rotate(2deg)", transformOrigin: "0 0" }}><TabletSignup f={30} /></Abs>
    <Abs x={150} y={300}><div style={{ filter: "drop-shadow(14px 14px 0 rgba(27,37,65,0.9))" }}><Boss pose="present" expression="talk" size={720} /></div></Abs>
    <StockTag style={{ right: 30, top: 30 }} />
    <Caption t="손님이 휴대폰 번호를 입력하면" />
  </AbsoluteFill>
);

/** B. 사진 카드(폴라로이드) + 시연 화면 */
export const MixB: React.FC = () => (
  <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
    <GridBg tone="light" cell={60} bleed />
    <Abs x={110} y={150} style={{ transform: "rotate(-5deg)" }}>
      <div style={{ background: "#fff", border: `7px solid ${color.ink}`, padding: "22px 22px 80px", boxShadow: ui.shadow(14), position: "relative" }}>
        <Img src={staticFile("stock/koreantable.jpg")} style={{ width: 820, height: 560, objectFit: "cover", display: "block", border: `5px solid ${color.ink}` }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 18, textAlign: "center", fontFamily: F, fontWeight: 900, fontSize: 40 }}>테이블에 QR 하나면 📱</div>
        <div style={{ position: "absolute", left: 330, top: -26, width: 200, height: 54, background: "rgba(250,204,21,0.85)", border: `4px solid ${color.ink}`, transform: "rotate(3deg)" }} />
        <StockTag style={{ left: 40, top: 40 }} />
      </div>
    </Abs>
    <Abs x={1040} y={480}><div style={{ fontSize: 140, fontWeight: 900, color: color.accent, fontFamily: F, WebkitTextStroke: `9px ${color.ink}`, paintOrder: "stroke fill" }}>→</div></Abs>
    <Abs x={1270} y={70} style={{ transform: "rotate(5deg)" }}><QRMenuPhone soldOut pick={false} w={420} /></Abs>
    <Abs x={1520} y={700}><Boss pose="thumbsUp" expression="wink" size={420} /></Abs>
    <Caption t="메뉴 사진과 가격을 볼 수 있죠" />
  </AbsoluteFill>
);

/** C. 사진 위에 그래픽 주석 (시장 → 구매목록) */
export const MixC: React.FC = () => (
  <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
    <Img src={staticFile("stock/market.jpg")} style={{ position: "absolute", inset: 0, width: 1920, height: 1080, objectFit: "cover", filter: "saturate(0.9)" }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(27,37,65,0.1) 30%, rgba(27,37,65,0.75) 100%)" }} />
    <Abs x={90} y={70}><Chip n="4" label="식재료 발주" /></Abs>
    {[[380, 330, "🍚 쌀 6/10kg"], [880, 250, "🥩 돼지고기 2/5kg"], [1350, 380, "🥬 대파 1/3단"]].map(([x, y, t]) => (
      <Abs key={t as string} x={x as number} y={y as number}>
        <div style={{ background: color.accent, border: `5px solid ${color.ink}`, borderRadius: 14, padding: "6px 18px", fontFamily: F, fontWeight: 900, fontSize: 36, boxShadow: ui.shadow(6), transform: "rotate(-3deg)" }}>{t}</div>
      </Abs>
    ))}
    <Abs x={1060} y={560} style={{ transform: "scale(0.62) rotate(-2deg)", transformOrigin: "0 0" }}><StockBoard f={120} /></Abs>
    <Abs x={60} y={600}><Boss pose="think" expression="think" size={440} /></Abs>
    <StockTag style={{ right: 30, top: 30 }} />
    <Caption t="부족한 품목이 자동으로 구매목록에" />
  </AbsoluteFill>
);

/** D. 반반 분할: 실제 장면 사진 | 우리 홈페이지 시연 화면 */
export const MixD: React.FC = () => (
  <AbsoluteFill style={{ overflow: "hidden", background: color.main }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 860, height: 1080, overflow: "hidden", borderRight: `10px solid ${color.ink}` }}>
      <Img src={staticFile("stock/cookingclass.jpg")} style={{ width: 860, height: 1080, objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(27,37,65,0.6), rgba(27,37,65,0) 40%)" }} />
      <div style={{ position: "absolute", left: 50, bottom: 150, fontFamily: F, fontWeight: 900, fontSize: 64, color: "#fff", WebkitTextStroke: `10px ${color.ink}`, paintOrder: "stroke fill" }}>퇴근 후 집밥 클래스</div>
      <StockTag style={{ left: 30, top: 30 }} />
    </div>
    <div style={{ position: "absolute", left: 860, top: 0, right: 0, bottom: 0, background: "linear-gradient(135deg,#2D5DB8,#0F3B82)" }} />
    <Abs x={920} y={60}><BrandBadge id="claude" size={56} tone="solid" label="Claude Code로 만든 신청 페이지" /></Abs>
    <Abs x={920} y={190} style={{ transform: "scale(0.78)", transformOrigin: "0 0" }}><RestaurantSite f={60} tab={1} w={1200} h={720} /></Abs>
    <Abs x={1500} y={640}><Boss pose="point" expression="smile" size={400} /></Abs>
    <Caption t="쿠킹 클래스를 열고" />
  </AbsoluteFill>
);
