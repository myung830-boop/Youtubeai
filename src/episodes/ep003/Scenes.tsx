import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ExperimentTag, GridBg, TodayCalendar, Wordmark } from "../../components/brand";
import { Boss } from "../../character/Boss";
import { BossBack, BossTop, PovHands } from "../../character/BossViews";
import { BossActor, ReactionBubble } from "../../motion/BossActor";
import { Burst, Camera, easeInOut, floatY, impact, KText, lerp, MarkSweep, Pop, Sparkles, SpeedLines, Stamp, useCue } from "../../motion/core";
import { Confetti, PaperPlane, TypeText } from "../../motion/props";
import { Beat, Flash } from "../../motion/transitions";
import { Layer, Parallax } from "../../motion/depth";
import { BrandBadge, BrandIcon, BRANDS, brandBg } from "../../brands/registry";
import { RestaurantInterior, TableTopDown } from "../../sets/Restaurant";
import { color, font, ui } from "../../styles/theme";
import { ChatGPTChat, ClaudeTerminal, ConsentForm, CouponCampaign, FourSystems, MenuAdmin, QRMenuPhone, RenderPreview, RestaurantSite, StockBoard, Storyboard3, SupplierCompare, TabletSignup } from "./mockups";

const Abs: React.FC<{ x: number; y: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ x, y, children, style }) => <div style={{ position: "absolute", left: x, top: y, ...style }}>{children}</div>;
const Card: React.FC<{ children: React.ReactNode; bg?: string; style?: React.CSSProperties }> = ({ children, bg = "#fff", style }) => (
  <div style={{ background: bg, border: `7px solid ${color.ink}`, borderRadius: 30, boxShadow: ui.shadow(12), fontFamily: font.family, ...style }}>{children}</div>
);
const Center: React.FC<{ y: number; children: React.ReactNode }> = ({ y, children }) => <Abs x={0} y={y} style={{ width: 1920, display: "flex", justifyContent: "center" }}>{children}</Abs>;
const Navy: React.FC = () => <GridBg tone="navy" cell={60} bleed />;
const Light: React.FC = () => <GridBg tone="light" cell={60} bleed />;
const GPT_BG = "linear-gradient(135deg,#0B0B0B,#1F3B33)";
const CLAUDE_BG = BRANDS.claude.colors.primary;
/** 2인칭 바스트샷 (시청자를 보고 말함) */
const Bust: React.FC<{ f: number; pose?: React.ComponentProps<typeof Boss>["pose"]; expression?: React.ComponentProps<typeof Boss>["expression"]; size?: number }> = ({ f, pose = "point", expression = "talk", size = 820 }) => (
  <Pop f={f} from={{ y: 400, scale: 0.85 }}><div style={{ filter: "drop-shadow(14px 14px 0 #1B2541)" }}><Boss pose={pose} expression={expression} crop="bust" size={size} /></div></Pop>
);
/** 장면 제목 칩 ①~④ */
const Section: React.FC<{ f: number; n: string; label: string }> = ({ f, n, label }) => (
  <Pop f={f} from={{ x: -300, rotate: -12, scale: 0.4 }}>
    <div style={{ display: "inline-flex", alignItems: "center", gap: 18, background: "#fff", border: `7px solid ${color.ink}`, borderRadius: 999, padding: "8px 38px 8px 10px", boxShadow: ui.shadow(10), fontFamily: font.family, fontWeight: 900, fontSize: 54 }}>
      <div style={{ width: 80, height: 80, borderRadius: "50%", background: color.accent, border: `6px solid ${color.ink}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 46 }}>{n}</div>
      {label}
    </div>
  </Pop>
);
const CHANGES: Array<[string, string, string]> = [["🎟", "단골 쿠폰", "#FFE08A"], ["🌐", "우리 가게 홈페이지", "#DCE9FF"], ["📱", "테이블 QR 메뉴", "#DDF5E6"], ["📦", "식재료 발주 목록", "#FFD9C2"]];
const ChangeCard: React.FC<{ i: number; f: number; glow?: boolean; dim?: boolean }> = ({ i, f, glow, dim }) => (
  <Pop f={f} from={{ y: 300, rotate: (i - 1.5) * 20, scale: 0.3 }}>
    <div style={{ width: 360, height: 300, background: CHANGES[i][2], border: `7px solid ${color.ink}`, borderRadius: 30, boxShadow: glow ? `0 0 0 10px ${color.accent}, ${ui.shadow(12)}` : ui.shadow(12), display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: font.family, transform: `rotate(${(i - 1.5) * 3}deg)`, opacity: dim ? 0.35 : 1 }}>
      <div style={{ fontSize: 110 }}>{CHANGES[i][0]}</div>
      <div style={{ fontWeight: 900, fontSize: 40, textAlign: "center" }}>{CHANGES[i][1]}</div>
    </div>
  </Pop>
);

/* ───────── S01 훅 ───────── */
export const E3S01: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const c1 = useCue("단골에게", 6.9);
  const c2 = useCue("홈페이지에서", 9.3);
  const c3 = useCue("QR 메뉴도", 13.0);
  const c4 = useCue("발주 목록", 16.1);
  const b3 = useCue("저는 실제 매장", 19.6);
  const hit = 16;
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.main }}>
      {/* ⑥ 로우앵글 VS */}
      <Beat f={b1} len={b1 - c1} inT="cut" outT="whip">
        <Camera start={0} keys={[{ f: 0, zoom: 1.3, rx: 10 }, { f: 18, zoom: 1.0, rx: 0 }]} shake={impact(b1 - hit, 30)}>
          <div style={{ position: "absolute", inset: -400, background: GPT_BG, clipPath: "polygon(0 0, 55% 0, 45% 100%, 0 100%)" }} />
          <div style={{ position: "absolute", inset: -400, background: CLAUDE_BG, clipPath: "polygon(55% 0, 100% 0, 100% 100%, 45% 100%)" }} />
          <SpeedLines f={b1} colorLine="#fff" opacity={0.18} />
          <Abs x={lerp(b1, 0, hit, -700, 230)} y={250}><BrandBadge id="chatgpt" size={110} tone="solid" /></Abs>
          <Abs x={lerp(b1, 0, hit, 2400, 1080)} y={250}><BrandBadge id="claude" size={110} tone="solid" /></Abs>
          <Center y={420}><Pop f={b1 - hit} from={{ scale: 4 }}><div style={{ width: 200, height: 200, borderRadius: "50%", background: color.accent, border: `10px solid ${color.ink}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font.family, fontWeight: 900, fontSize: 96, boxShadow: ui.shadow(12) }}>VS</div></Pop></Center>
          <Burst f={b1 - hit} x={960} y={520} r={300} />
          <Center y={680}><KText f={b1 - 30} text="혼자 하는 식당, 얼마나 달라질까?" size={84} color="#fff" stroke /></Center>
          <Flash f={b1 - hit} />
        </Camera>
      </Beat>
      {/* ③ 와이드: 식당 + 4가지 변화 (깊이 효과) */}
      <Beat f={c1} len={c1 - b3} inT="whip" outT="zoom">
        <Parallax start={frame - c1} keys={[{ f: 0, x: -1 }, { f: 380, x: 1 }]}>
          <Layer depth={0.25} blur={2}><RestaurantInterior /></Layer>
          <Layer depth={0.7}>
            {[c1, c2, c3, c4].map((f, i) => <Abs key={i} x={110 + i * 440} y={330 + floatY(frame, 10, 0.08, i * 1.4)}><ChangeCard i={i} f={f} /></Abs>)}
          </Layer>
        </Parallax>
        <Abs x={1560} y={760}><BossActor size={360} enter="peekR" enterAt={frame - c1} poses={[{ f: 0, pose: "present", expression: "talk", look: [-6, 0] }]} /></Abs>
      </Beat>
      {/* ② 2인칭 */}
      <Beat f={b3} len={100000} inT="zoom">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.1 }, { f: 200, zoom: 1.0 }]}>
          <Light />
          <Abs x={120} y={180}><Bust f={b3} pose="point" expression="talk" size={860} /></Abs>
          <Abs x={1020} y={200}><Pop f={b3 + 10} from={{ x: 200 }}><ExperimentTag no={3} size={48} /></Pop></Abs>
          <Abs x={1020} y={340}><KText f={b3 + 18} text="실제 매장을 운영하며" size={66} /></Abs>
          <Abs x={1020} y={440}><KText f={b3 + 30} text="써본 경험으로" size={66} color={color.main} /></Abs>
          <Abs x={1020} y={590}><Stamp f={b3 + 60} bg={color.accent} fg={color.ink} size={70} rot={-5}>구체적으로 보여드려요</Stamp></Abs>
        </Camera>
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S02 두 AI의 역할 ───────── */
export const E3S02: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const g = [useCue("무엇을 만들지", 1.9), useCue("기능을 기획", 4.0), useCue("홍보용 이미지", 5.6)];
  const b2 = useCue("반면", 10.6);
  const c = [useCue("웹사이트나", 12.0), useCue("프로그램", 13.6), useCue("영상 모션", 13.6)];
  const b3 = useCue("못하는 일", 20.5);
  const Panel: React.FC<{ side: "gpt" | "claude"; on: number; items: Array<[string, number]>; title: string; role: string }> = ({ side, on, items, title, role }) => (
    <div style={{ width: 860, height: 760, background: side === "gpt" ? GPT_BG : CLAUDE_BG, border: `8px solid ${color.ink}`, borderRadius: 40, boxShadow: ui.shadow(14), padding: 40, fontFamily: font.family, color: "#fff", opacity: on >= 0 ? 1 : 0.35, transform: `scale(${on >= 0 ? 1 : 0.94})` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}><BrandIcon id={side === "gpt" ? "chatgpt" : "claude"} size={90} /><div style={{ fontWeight: 900, fontSize: 64 }}>{title}</div></div>
      <div style={{ display: "inline-block", marginTop: 18, background: color.accent, color: color.ink, border: `5px solid ${color.ink}`, borderRadius: 14, padding: "4px 20px", fontWeight: 900, fontSize: 40 }}>{role}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 34 }}>
        {items.map(([t, f]) => (
          <Pop key={t} f={f} from={{ x: side === "gpt" ? -120 : 120, scale: 0.6 }}>
            <div style={{ background: "rgba(255,255,255,0.95)", color: color.ink, border: `5px solid ${color.ink}`, borderRadius: 20, padding: "16px 26px", fontWeight: 900, fontSize: 44 }}>{t}</div>
          </Pop>
        ))}
      </div>
    </div>
  );
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      <Beat f={b1} len={b1 - b3} inT="whip" outT="zoom">
        <Camera start={frame - b1} keys={[{ f: 0, zoom: 1.05, x: -120 }, { f: b1 - b2, zoom: 1.05, x: -120 }, { f: b1 - b2 + 24, zoom: 1.0, x: 120 }]}>
          <Light />
          <Abs x={70} y={150}><Panel side="gpt" on={b1} title="ChatGPT" role="기획실장" items={[["📋 무엇을 만들지 정리", g[0]], ["🧩 기능 기획", g[1]], ["🎨 홍보 이미지 · 영상 콘티", g[2]]]} /></Abs>
          <Abs x={990} y={150}><Panel side="claude" on={b2} title="Claude Code" role="제작실장" items={[["🌐 웹사이트", c[0]], ["🗂 관리 프로그램", c[1]], ["🎬 영상 모션그래픽", c[2]]]} /></Abs>
          <Center y={40}><Pop f={b1} from={{ y: -100 }}><Card style={{ padding: "8px 34px", fontSize: 48, fontWeight: 900 }}>제가 써보니 👀</Card></Pop></Center>
        </Camera>
      </Beat>
      <Beat f={b3} len={100000} inT="zoom">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.1 }, { f: 150, zoom: 1.0 }]}>
          <Light />
          <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
            <circle cx={720} cy={430} r={lerp(b3, 0, 14, 0, 300)} fill="rgba(16,163,127,0.25)" stroke={color.ink} strokeWidth={8} />
            <circle cx={1060} cy={430} r={lerp(b3 - 6, 0, 14, 0, 300)} fill="rgba(217,119,87,0.3)" stroke={color.ink} strokeWidth={8} />
          </svg>
          <Abs x={500} y={330}><Pop f={b3 + 8} from={{ scale: 0 }}><BrandIcon id="chatgpt" size={120} /></Pop></Abs>
          <Abs x={1180} y={330}><Pop f={b3 + 14} from={{ scale: 0 }}><BrandIcon id="claude" size={120} /></Pop></Abs>
          <Abs x={790} y={390}><Pop f={b3 + 24} from={{ scale: 0 }}><div style={{ fontFamily: font.family, fontWeight: 900, fontSize: 38, textAlign: "center", lineHeight: 1.2 }}>둘 다<br />할 수 있어요</div></Pop></Abs>
          <Abs x={560} y={790}><Stamp f={b3 + 50} bg={color.accent} fg={color.ink} size={64} rot={-4}>제가 실제로 나누는 방식</Stamp></Abs>
          <Abs x={1420} y={480}><BossActor size={520} enter="slideR" enterAt={frame - b3} poses={[{ f: 0, pose: "shrug", expression: "smile" }, { f: frame - b3 + 50, pose: "thumbsUp", expression: "wink" }]} /></Abs>
        </Camera>
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S03 ① 단골 회원·쿠폰 ───────── */
export const E3S03: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const busyF = useCue("단골손님은", 3.0);
  const b2 = useCue("계산대에", 9.8);
  const b3 = useCue("손님이 원할 때", 17.4);
  const b4 = useCue("다만 휴대폰 번호만", 25.3);
  const tap = Math.max(0, b2 - 30);
  const key = "01012341234"[Math.min(10, Math.floor(tap / 3))];
  const k = "1234567890".indexOf(key);
  const keyX = 620 + (k % 5) * 186, keyY = 610 + Math.floor(k / 5) * 82;
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      {/* ⑦ 하이앵글: 쌓이는 일 */}
      <Beat f={b1} len={b1 - b2} inT="whip" outT="whip">
        <Camera start={frame - b1} keys={[{ f: 0, zoom: 1.25 }, { f: 80, zoom: 1.08 }]} handheld={0.6}>
          <div style={{ position: "absolute", inset: -200, transform: "perspective(1400px) rotateX(-18deg)", transformOrigin: "50% 20%" }}>
            <RestaurantInterior busy={Math.min(1, Math.max(0, busyF + 10) / 120)} />
            <Abs x={840} y={360}><BossActor size={430} enter="none" poses={[{ f: 0, pose: "worry" }, { f: frame - busyF - 60, pose: "facepalm", expression: "tired" }]} /></Abs>
          </div>
          <div style={{ position: "absolute", inset: -300, boxShadow: "inset 0 0 340px 100px rgba(27,37,65,0.5)" }} />
          <Abs x={90} y={60}><Section f={b1} n="1" label="단골 회원 · 쿠폰" /></Abs>
          <Abs x={1180} y={70}><Pop f={busyF + 20} from={{ scale: 0 }}><Card bg="#FFE4E4" style={{ padding: "10px 26px", fontSize: 42, fontWeight: 900 }}>누가 단골이더라? 🤔</Card></Pop></Abs>
        </Camera>
      </Beat>
      {/* ① 1인칭(손님 손): 태블릿 회원 등록 */}
      <Beat f={b2} len={b2 - b3} inT="whip" outT="whipUp">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.1, rx: 8 }, { f: 30, zoom: 1.0, rx: 0 }]} handheld={1.4}>
          <div style={{ position: "absolute", inset: -300, background: "linear-gradient(180deg,#FFF4E6,#E9CDA8)" }} />
          <Abs x={460} y={80}><Pop f={b2} from={{ y: 400, rotateX: 40 }}><TabletSignup f={tap} /></Pop></Abs>
          {b2 > 26 && tap < 36 && <PovHands mode="point" target={[keyX, keyY]} />}
          <Abs x={90} y={60}><Pop f={b2 + 6} from={{ x: -200 }}><Card style={{ padding: "8px 26px", fontSize: 40, fontWeight: 900 }}>🙋 손님 시점</Card></Pop></Abs>
          <Abs x={1480} y={120}><Pop f={b2 + 60} from={{ scale: 0 }}><Card bg="#EAF2FF" style={{ padding: "14px 22px", fontSize: 30, fontWeight: 800 }}>🗂 사장님 관리 화면<br />회원 128명 (가상)</Card></Pop></Abs>
          <Confetti f={tap - 48} x={960} y={500} />
        </Camera>
      </Beat>
      {/* ④ 어깨 너머: 쿠폰·소식 준비 */}
      <Beat f={b3} len={b3 - b4} inT="whipUp" outT="zoom">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.0, x: 80 }, { f: 200, zoom: 1.06, x: 40 }]}>
          <Light />
          <Abs x={600} y={140} style={{ transform: "perspective(1600px) rotateY(-10deg)", transformOrigin: "100% 50%" }}><Pop f={b3} from={{ x: 300, rotateY: -40 }}><CouponCampaign f={b3} /></Pop></Abs>
          <Abs x={-200} y={380} style={{ filter: "blur(1.5px)" }}><Pop f={b3} from={{ x: -300 }} bouncy={false}><BossBack size={1000} turn={6} /></Pop></Abs>
        </Camera>
      </Beat>
      {/* ② 2인칭 주의: 동의 구분 */}
      <Beat f={b4} len={100000} inT="zoom">
        <Camera start={frame - b4} keys={[{ f: 0, zoom: 1.08 }, { f: 160, zoom: 1.0 }]} shake={impact(b4 - 4, 14)}>
          <div style={{ position: "absolute", inset: -600, background: "#FFF7D6" }} />
          <div style={{ position: "absolute", left: -600, right: -600, top: -20, height: 60, background: "repeating-linear-gradient(-45deg, #FACC15 0 40px, #1B2541 40px 80px)" }} />
          <Abs x={70} y={150}><Pop f={b4 + 4} from={{ y: 300 }}><ConsentForm f={b4} /></Pop></Abs>
          <Abs x={1300} y={300}><Bust f={b4} pose="point" expression="determined" size={720} /></Abs>
          <Abs x={1240} y={130}><Stamp f={b4 + 20} bg="#FF4D4F" size={62} rot={6}>번호 ≠ 광고 동의</Stamp></Abs>
        </Camera>
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S04 ② 홈페이지 ───────── */
export const E3S04: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("일반인을", 5.3);
  const b3 = useCue("노하우를", 10.9);
  const b4 = useCue("이 과정에서", 20.9);
  const b5 = useCue("법적", 33.3);
  const tab: 0 | 1 | 2 = b3 >= 0 ? 2 : b2 >= 0 ? 1 : 0;
  const tf = b3 >= 0 ? b3 : b2 >= 0 ? b2 : b1;
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      <Beat f={b1} len={b1 - b4} inT="whip" outT="whip">
        <Camera start={frame - b1} keys={[{ f: 0, zoom: 1.12, ry: 8 }, { f: 30, zoom: 1.0, ry: 0 }, { f: b1 - b2, zoom: 1.0 }, { f: b1 - b2 + 20, zoom: 1.05, x: 40 }]}>
          <Light />
          <Abs x={90} y={50}><Section f={b1} n="2" label="우리 식당 홈페이지" /></Abs>
          <Abs x={340} y={230}><Pop f={b1 + 6} from={{ y: 400, rotateX: 40 }}><RestaurantSite f={tf} tab={tab} w={1240} h={720} /></Pop></Abs>
          <Abs x={20} y={560}><BossActor size={420} enter="peekL" enterAt={frame - b1} poses={[{ f: 0, pose: "point", expression: "talk" }, { f: frame - b2, pose: "holdMug", expression: "smile" }, { f: frame - b3, pose: "point", expression: "determined" }]} /></Abs>
        </Camera>
      </Beat>
      {/* 바통 터치: ChatGPT 기획 → Claude Code 제작 */}
      <Beat f={b4} len={100000} inT="whip">
        <Camera start={frame - b4} keys={[{ f: 0, zoom: 1.0, x: -200 }, { f: 70, zoom: 1.0, x: -200 }, { f: 110, zoom: 1.0, x: 200 }]} shake={impact(b5 - 4, 18)}>
          <Light />
          <Abs x={-120} y={170}>
            <Pop f={b4} from={{ x: -300 }}>
              <ChatGPTChat w={980} h={640} prompt="쿠킹클래스·가맹 상담까지 받는 식당 홈페이지 구조를 기획해줘" typed={Math.floor(Math.max(0, b4) * 1.6)} answer={b4 > 26 ? <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{["① 메뉴·브랜드", "② 예약 안내", "③ 쿠킹클래스 신청", "④ 가맹 상담"].map((t, i) => <div key={t} style={{ background: "#F0FAF6", border: `4px solid ${color.ink}`, borderRadius: 14, padding: "8px 16px", fontWeight: 900, fontSize: 28, opacity: lerp(b4 - 26 - i * 5, 0, 5, 0, 1) }}>{t}</div>)}</div> : undefined} />
            </Pop>
          </Abs>
          <PaperPlane f={b4 - 60} from={[760, 520]} to={[1300, 420]} dur={26} />
          <Abs x={1180} y={170}>
            <Pop f={b4 + 76} from={{ x: 300 }}>
              <ClaudeTerminal w={940} h={640} f={b4 - 86} lines={[["$", "식당 홈페이지 만들어줘 (기획서 첨부)"], ["›", "pages: 메뉴, 예약, 클래스, 가맹"], ["✓", "쿠킹클래스 신청 폼"], ["✓", "가맹 상담 문의 폼"], ["✓", "모바일 화면 확인"]]} />
            </Pop>
          </Abs>
          <Abs x={1420} y={60}><Pop f={b4 + 140} from={{ scale: 0 }}><Card bg="#22C55E" style={{ padding: "8px 26px", color: "#fff", fontSize: 40, fontWeight: 900 }}>사이트 완성 ✓</Card></Pop></Abs>
          <Abs x={540} y={820}><Stamp f={b5} bg="#FF4D4F" size={64} rot={-5}>가맹사업 = 별도 법적 절차 필요</Stamp></Abs>
        </Camera>
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S05 ③ QR 메뉴 ───────── */
export const E3S05: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("테이블에 작은", 2.2);
  const b3 = useCue("메뉴 사진과", 6.6);
  const b4 = useCue("품절", 9.3);
  const b5 = useCue("외부 구독형", 14.6);
  const b6 = useCue("직접 만든다고", 21.7);
  const soldOut = b4 > 30;
  const pick = b4 > 70;
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      {/* ⑤ 위에서 본 식탁 */}
      <Beat f={b1} len={b1 - b3} inT="whipUp" outT="zoom">
        <Camera start={frame - b1} keys={[{ f: 0, zoom: 1.0 }, { f: b1 - b2, zoom: 1.0 }, { f: b1 - b2 + 60, zoom: 1.5, x: 400, y: 230 }]}>
          <TableTopDown qrGlow={b2 >= 0 ? 0.5 + 0.5 * Math.sin(frame * 0.3) : 0} />
          <Abs x={160} y={760}><BossTop size={220} angle={-30} /></Abs>
          <Abs x={90} y={50}><Section f={b1} n="3" label="테이블 QR 메뉴" /></Abs>
        </Camera>
      </Beat>
      {/* 휴대폰 클로즈업 + 사장님 관리 */}
      <Beat f={b3} len={b3 - b6} inT="zoom" outT="whip">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.1 }, { f: 40, zoom: 1.0 }]} shake={impact(b4 - 32, 10)}>
          <Light />
          <Abs x={b4 >= 0 ? 1180 : 760} y={70} style={{ transition: "none" }}><Pop f={b3} from={{ y: 600, rotate: 12 }}><QRMenuPhone soldOut={soldOut} pick={pick} w={410} /></Pop></Abs>
          {b4 >= 0 && <Abs x={180} y={250}><Pop f={b4} from={{ x: -400 }}><MenuAdmin soldOut={soldOut} pick={pick} /></Pop></Abs>}
          {b4 >= 0 && <Abs x={950} y={430}><Pop f={b4 + 24} from={{ scale: 0 }}><div style={{ fontSize: 120, fontWeight: 900, color: color.accent, fontFamily: font.family, WebkitTextStroke: `8px ${color.ink}`, paintOrder: "stroke fill" }}>→</div></Pop></Abs>}
          <Burst f={b4 - 30} x={1390} y={760} c="#FF4D4F" />
          {b4 < 0 && <Abs x={90} y={400}><KText f={b3} text="손님 휴대폰으로" size={76} /></Abs>}
          {b4 < 0 && <Abs x={90} y={500}><KText f={b3 + 12} text="메뉴·사진·가격" size={76} color={color.main} /></Abs>}
          <Abs x={160} y={110}><Stamp f={b5} bg={color.accent} fg={color.ink} size={60} rot={-5}>월 구독 대신 우리 가게 페이지</Stamp></Abs>
        </Camera>
      </Beat>
      {/* 비용 체크 (2인칭) */}
      <Beat f={b6} len={100000} inT="whip">
        <Camera start={frame - b6} keys={[{ f: 0, zoom: 1.08 }, { f: 200, zoom: 1.0 }]}>
          <Light />
          <Abs x={110} y={110}><KText f={b6} text="직접 만들어도 0원은 아니에요" size={70} /></Abs>
          {[["🖥", "서버"], ["🔗", "도메인"], ["🔧", "유지보수"]].map(([e, t], i) => (
            <Abs key={t} x={110 + i * 360} y={330}><Pop f={b6 + 14 + i * 10} from={{ y: 200, scale: 0.4 }}><Card style={{ width: 320, height: 300, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}><div style={{ fontSize: 100 }}>{e}</div><div style={{ fontWeight: 900, fontSize: 48 }}>{t} 비용</div></Card></Pop></Abs>
          ))}
          <Abs x={110} y={730}><Pop f={b6 + 60} from={{ x: -200 }}><Card bg="#FFF3D6" style={{ padding: "16px 30px", fontSize: 40, fontWeight: 900 }}>💳 실제 주문·결제 연결은 추가 기능</Card></Pop></Abs>
          <Abs x={1240} y={300}><Bust f={b6 + 4} pose="present" expression="talk" size={700} /></Abs>
        </Camera>
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S06 ④ 식재료 발주 ───────── */
export const E3S06: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("쌀고기", 3.8);
  const b3 = useCue("여러 거래처", 14.3);
  const b4 = useCue("쇼핑몰에", 20.5);
  const b5 = useCue("다만 모든 사이트", 28.0);
  const b6 = useCue("최종 구매는", 35.5);
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      {/* ③ 와이드: 기억에 의존하는 장보기 */}
      <Beat f={b1} len={b1 - b2} inT="whip" outT="whip">
        <Parallax start={frame - b1} keys={[{ f: 0, x: 1 }, { f: 140, x: -0.4 }]}>
          <Layer depth={0.25} blur={2}><RestaurantInterior /></Layer>
          <Layer depth={0.6}><Abs x={780} y={300}><BossActor size={460} enter="walkR" enterAt={frame - b1} poses={[{ f: 0, pose: "think", expression: "think", tilt: 8, look: [5, -5] }]} /></Abs></Layer>
          <Layer depth={1.3} blur={0}>
            {["🍚 쌀?", "🥩 고기?", "🥬 야채?", "🧂 양념?"].map((t, i) => <Abs key={t} x={520 + i * 260} y={180 + (i % 2) * 70 + floatY(frame, 10, 0.12, i)}><Pop f={b1 + 8 + i * 6} from={{ scale: 0 }}><Card style={{ padding: "10px 22px", fontSize: 40, fontWeight: 900 }}>{t}</Card></Pop></Abs>)}
          </Layer>
        </Parallax>
        <Abs x={90} y={50}><Section f={b1} n="4" label="식재료 발주" /></Abs>
      </Beat>
      <Beat f={b2} len={b2 - b3} inT="whip" outT="whip">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.05 }, { f: 200, zoom: 1.0 }]}>
          <Light />
          <Abs x={340} y={180}><Pop f={b2} from={{ y: 400, rotateX: 40 }}><StockBoard f={b2 - 10} /></Pop></Abs>
          <Abs x={40} y={600}><BossActor size={400} enter="slideL" enterAt={frame - b2} poses={[{ f: 0, pose: "point", expression: "talk" }]} /></Abs>
        </Camera>
      </Beat>
      <Beat f={b3} len={b3 - b5} inT="whip" outT="zoom">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.0 }, { f: b3 - b4, zoom: 1.0 }, { f: b3 - b4 + 20, zoom: 1.08, y: 80 }]}>
          <Light />
          <Abs x={340} y={180}><Pop f={b3} from={{ x: 400 }}><SupplierCompare f={b3} cart={b4 >= 0} /></Pop></Abs>
          <Abs x={40} y={600}><BossActor size={400} enter="none" poses={[{ f: 0, pose: "think", expression: "think" }, { f: frame - b4, pose: "thumbsUp", expression: "wink" }]} /></Abs>
        </Camera>
      </Beat>
      <Beat f={b5} len={100000} inT="zoom">
        <Camera start={frame - b5} keys={[{ f: 0, zoom: 1.08 }, { f: 160, zoom: 1.0 }]} shake={impact(b6 - 4, 18)}>
          <div style={{ position: "absolute", inset: -600, background: "#FFF7D6" }} />
          <Abs x={110} y={150}><Pop f={b5} from={{ x: -300 }}><Card style={{ width: 980, padding: "34px 40px" }}>
            <div style={{ fontSize: 44, fontWeight: 900 }}>⚠ 이건 알고 쓰세요</div>
            <div style={{ fontSize: 40, fontWeight: 800, marginTop: 18 }}>· 모든 사이트가 자동 연결되진 않아요</div>
            <div style={{ fontSize: 40, fontWeight: 800, marginTop: 10, opacity: b5 > 40 ? 1 : 0.2 }}>· 항상 최저가를 보장하진 않아요</div>
          </Card></Pop></Abs>
          <Abs x={160} y={640}><Stamp f={b6} bg={color.accent} fg={color.ink} size={92} rot={-5}>최종 구매는 사장님이 ✓</Stamp></Abs>
          <Abs x={1260} y={260}><Bust f={b5 + 4} pose="point" expression="determined" size={740} /></Abs>
        </Camera>
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S07 두 AI의 역할 분담 ───────── */
export const E3S07: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("저는 ChatGPT에", 3.1);
  const b3 = useCue("회원관리", 11.9);
  const b4 = useCue("기능 설명서", 18.9);
  const b5 = useCue("홍보 이미지는", 25.7);
  const b6 = useCue("가게 소개 영상", 28.8);
  const b7 = useCue("Remotion", 32.2);
  const PROMPT = "1인 식당에서 가장 시간을 잡아먹는 일을 정리하고, 우선순위를 세워줘";
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      <Beat f={b1} len={b1 - b2} inT="zoom" outT="whip">
        <Camera start={frame - b1} keys={[{ f: 0, zoom: 1.2 }, { f: 30, zoom: 1.0 }]}>
          <Navy />
          <Abs x={160} y={380}><Pop f={b1} from={{ x: -400 }}><BrandBadge id="chatgpt" size={100} tone="solid" label="기획" /></Pop></Abs>
          <Abs x={1180} y={380}><Pop f={b1 + 6} from={{ x: 400 }}><BrandBadge id="claude" size={100} tone="solid" label="제작" /></Pop></Abs>
          <Abs x={860} y={390}><Pop f={b1 + 14} from={{ scale: 0 }}><div style={{ fontSize: 140, fontWeight: 900, color: color.accent, fontFamily: font.family, WebkitTextStroke: `8px ${color.ink}`, paintOrder: "stroke fill" }}>→</div></Pop></Abs>
          <Center y={130}><KText f={b1} text="여기서 역할이 나뉩니다" size={90} color="#fff" /></Center>
        </Camera>
      </Beat>
      {/* ① 1인칭: ChatGPT에게 묻기 */}
      <Beat f={b2} len={b2 - b4} inT="whip" outT="whip">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.1, rx: 6 }, { f: 20, zoom: 1.0, rx: 0 }]} handheld={1.5}>
          <div style={{ position: "absolute", inset: -300, background: "radial-gradient(ellipse at 50% 40%, #3D4A75, #1B2238 75%)" }} />
          <Abs x={330} y={50}><div style={{ background: "#11151F", padding: 20, borderRadius: 30, border: `8px solid ${color.ink}` }}>
            <ChatGPTChat w={1220} h={720} prompt={`“${PROMPT}”`} typed={Math.floor(Math.max(0, b2) * 1.5)} answer={b3 >= 0 ? <FourSystems f={b3} order={b3 > 40 ? [0, 2, 1, 3] : [0, 1, 2, 3]} /> : undefined} />
          </div></Abs>
          <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, transform: `translateY(${b3 >= 0 ? 600 : 120}px)` }}><PovHands mode="type" /></div>
          <div style={{ position: "absolute", inset: -300, boxShadow: "inset 0 0 300px 90px rgba(0,0,0,0.5)" }} />
          {b3 > 40 && <Abs x={1420} y={60}><Stamp f={b3 - 40} bg={color.accent} fg={color.ink} size={54} rot={6}>무엇부터 만들지 결정!</Stamp></Abs>}
        </Camera>
      </Beat>
      {/* 바통: 기능 설명서 → Claude Code */}
      <Beat f={b4} len={b4 - b5} inT="whip" outT="zoom">
        <Camera start={frame - b4} keys={[{ f: 0, zoom: 1.0 }, { f: 200, zoom: 1.04 }]}>
          <Light />
          <Abs x={110 + lerp(b4, 0, 30, 0, 260) * 0} y={200}>
            <Pop f={b4} from={{ scale: 0.3, rotate: -20 }}>
              <div style={{ width: 420, height: 540, background: "#fff", border: `7px solid ${color.ink}`, borderRadius: 20, boxShadow: ui.shadow(12), padding: 26, fontFamily: font.family, transform: `translate(${lerp(b4 - 20, 0, 24, 0, 320, easeInOut)}px, 0) rotate(${lerp(b4 - 20, 0, 24, -6, 4)}deg)` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}><BrandIcon id="chatgpt" size={44} /><b style={{ fontSize: 30 }}>기능 설명서</b></div>
                {["회원 등록 (동의 구분)", "쿠폰 발행", "클래스 신청", "QR 메뉴 관리", "재고·구매목록"].map((t) => <div key={t} style={{ fontSize: 26, fontWeight: 700, marginTop: 14 }}>☑ {t}</div>)}
              </div>
            </Pop>
          </Abs>
          <Abs x={880} y={200}><Pop f={b4 + 30} from={{ x: 300 }}><ClaudeTerminal w={940} h={600} f={b4 - 40} lines={[["$", "기능 설명서대로 화면과 코드 만들어줘"], ["›", "modules: 회원, 쿠폰, 클래스, QR, 재고"], ["✓", "관리자 화면"], ["✓", "가상 데이터로 테스트"], ["!", "개인정보·보안은 따로 검토"]]} /></Pop></Abs>
        </Camera>
      </Beat>
      {/* 이미지 시안 → 콘티 → Remotion 모션 */}
      <Beat f={b5} len={100000} inT="zoom">
        <Camera start={frame - b5} keys={[{ f: 0, zoom: 1.0, x: -160 }, { f: b5 - b7, zoom: 1.0, x: -160 }, { f: b5 - b7 + 30, zoom: 1.0, x: 220 }]}>
          <Light />
          <Abs x={-60} y={170}><Pop f={b5} from={{ y: 300 }}><Card style={{ width: 900, padding: 26 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 34, fontWeight: 900 }}><BrandIcon id="chatgpt" size={50} /> 홍보 이미지 시안 · 영상 콘티</div>
            <div style={{ display: "flex", gap: 16, marginTop: 18 }}>
              {[["#FFE3C4", "🥘 오늘의 제육"], ["#DDF5E6", "🌿 집밥 한 상"]].map(([bg, t], i) => <div key={t} style={{ flex: 1, height: 170, background: bg, border: `5px solid ${color.ink}`, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 32, opacity: lerp(b5 - 6 - i * 6, 0, 6, 0, 1) }}>{t}</div>)}
            </div>
            <div style={{ marginTop: 18, opacity: b6 >= 0 ? 1 : 0 }}><Storyboard3 f={b6} /></div>
          </Card></Pop></Abs>
          <Abs x={1020} y={150}>
            <Pop f={b7} from={{ x: 300 }}>
              <div style={{ display: "flex", gap: 14, marginBottom: 14 }}><BrandBadge id="claude" size={44} tone="solid" label="Claude Code" /><BrandBadge id="remotion" size={44} tone="solid" /></div>
              <ClaudeTerminal w={900} h={380} title="Claude Code · Remotion" f={b7 - 6} lines={[["›", "<Sequence> 장면 3개 구성"], ["›", "interpolate() 자막 등장"], ["✓", "미리보기 확인"]]} />
            </Pop>
          </Abs>
          <Abs x={1280} y={600}><Pop f={b7 + 40} from={{ scale: 0.3 }}><RenderPreview w={560} /></Pop></Abs>
          <Abs x={1040} y={960}><Pop f={b7 + 60} from={{ y: 60 }}><div style={{ background: "#fff", border: `4px solid ${color.ink}`, borderRadius: 999, padding: "4px 20px", fontFamily: font.family, fontWeight: 800, fontSize: 24 }}>※ 렌더링은 별도 도구 · 검수 필요</div></Pop></Abs>
        </Camera>
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S08 현실 체크 ───────── */
export const E3S08: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const items: Array<[string, number]> = [["손님이 갑자기 늘진 않아요", useCue("갑자기 손님이", 1.8)], ["식재료가 무조건 싸지진 않아요", useCue("무조건 싸지는", 3.6)], ["만들고 · 테스트하는 시간", useCue("테스트하고", 6.6)], ["유지보수 시간", useCue("유지보수", 9.0)], ["고객정보 동의 · 보안", useCue("동의와 보안", 12.7)]];
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      <Camera start={0} keys={[{ f: 0, zoom: 1.1 }, { f: 300, zoom: 1.0 }]}>
        <Light />
        <Abs x={110} y={110}><KText f={b1} text="물론, 현실적으로 보면" size={76} /></Abs>
        <Abs x={110} y={250}>
          <Card style={{ width: 1050, padding: "30px 40px" }}>
            {items.map(([t, f]) => (
              <Pop key={t} f={f} from={{ x: -120, scale: 0.7 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 44, fontWeight: 900, padding: "10px 0" }}>
                  <div style={{ width: 54, height: 54, borderRadius: 14, background: f > 6 ? color.point : "#fff", border: `5px solid ${color.ink}`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34 }}>{f > 6 ? "✓" : ""}</div>{t}
                </div>
              </Pop>
            ))}
          </Card>
        </Abs>
        <Abs x={1240} y={300}><Bust f={b1 + 4} pose="present" expression="smile" size={740} /></Abs>
      </Camera>
    </AbsoluteFill>
  );
};

/* ───────── S09 매력 ───────── */
export const E3S09: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const unlock = useCue("기술 때문에", 2.5);
  const b2 = useCue("직접 기획해", 6.3);
  const b3 = useCue("매력적이라고", 9.2);
  const Lock: React.FC<{ t: string; f: number; x: number }> = ({ t, f, x }) => {
    const open = f > 0;
    return (
      <Abs x={x} y={330}>
        <div style={{ transform: `translateY(${open ? lerp(f, 0, 20, 0, 600, easeInOut) : 0}px) rotate(${open ? lerp(f, 0, 20, 0, 70) : 0}deg)`, opacity: open ? lerp(f, 10, 22, 1, 0) : 1 }}>
          <svg viewBox="0 0 120 150" width={220} height={275}>
            <path d={open ? "M30,60 L30,40 A30,30 0 0 1 90,40 L90,20" : "M30,60 L30,40 A30,30 0 0 1 90,40 L90,60"} fill="none" stroke={color.ink} strokeWidth={14} />
            <rect x={10} y={60} width={100} height={80} rx={14} fill={color.accent} stroke={color.ink} strokeWidth={8} />
          </svg>
          <div style={{ textAlign: "center", fontFamily: font.family, fontWeight: 900, fontSize: 56, marginTop: -10 }}>{t}</div>
        </div>
      </Abs>
    );
  };
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.main }}>
      <Camera start={0} keys={[{ f: 0, zoom: 1.0, rx: 0 }, { f: Math.max(1, frame - b2), zoom: 1.0, rx: 0 }, { f: frame - b2 + 14, zoom: 1.1, rx: 10 }]} shake={impact(unlock - 2, 22)}>
        <div style={{ position: "absolute", inset: -400, background: "linear-gradient(180deg,#2D5DB8 0%,#0F3B82 70%)" }} />
        <SpeedLines f={b2} colorLine="#fff" opacity={b2 >= 0 ? 0.2 : 0} cy={1300} />
        <Center y={100}><KText f={b1} text="그동안 못 하던 일들" size={84} color="#fff" /></Center>
        <Lock t="비용" f={unlock} x={420} />
        <Lock t="기술" f={unlock - 6} x={1280} />
        {b2 >= 0 && CHANGES.map((c, i) => <Abs key={i} x={170 + i * 420} y={330 + floatY(frame, 10, 0.1, i)}><ChangeCard i={i} f={b2 + i * 5} /></Abs>)}
        <Abs x={760} y={500} style={{ transform: "perspective(1000px) rotateX(14deg)", transformOrigin: "50% 100%" }}><BossActor size={620} enter="popUp" enterAt={frame - b2 - 10} poses={[{ f: 0, pose: "cheer", expression: "starstruck" }]} hops={[frame - b3]} /></Abs>
        <Sparkles f={b3} x={960} y={500} spread={700} />
        <Confetti f={b3} x={960} y={300} n={50} />
      </Camera>
      <Flash f={unlock} />
    </AbsoluteFill>
  );
};

/* ───────── S10 엔딩 ───────── */
export const E3S10: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const g1 = useCue("단골 쿠폰 하나", 3.4);
  const g2 = useCue("QR 메뉴 하나", 4.9);
  const b2 = useCue("여러분 가게라면", 7.5);
  const b3 = useCue("오늘부터 AI 사장님이었습니다", 15.0);
  const jobs = ["🍽 식당", "☕ 카페", "💇 미용실", "👟 세탁소", "📚 학원", "🌸 꽃집"];
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      <Beat f={b1} len={b1 - b2} inT="whip" outT="whip">
        <Camera start={frame - b1} keys={[{ f: 0, zoom: 1.05 }, { f: 200, zoom: 1.0 }]}>
          <Light />
          <Center y={90}><KText f={b1} text="네 가지 다 할 필요 없어요" size={80} /></Center>
          {CHANGES.map((c, i) => <Abs key={i} x={110 + i * 440} y={290}><ChangeCard i={i} f={b1 + 4 + i * 4} glow={(i === 0 && g1 >= 0) || (i === 2 && g2 >= 0)} dim={g1 >= 0 && (i === 1 || i === 3)} /></Abs>)}
          <Center y={700}><Stamp f={g2 + 10} bg={color.accent} fg={color.ink} size={86} rot={-4}>하나부터 시작!</Stamp></Center>
        </Camera>
      </Beat>
      <Beat f={b2} len={b2 - b3} inT="whip" outT="zoom">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.08 }, { f: 200, zoom: 1.0 }]}>
          <Light />
          <Abs x={110} y={110}><KText f={b2} text="여러분 가게는 무엇부터?" size={80} /></Abs>
          {jobs.map((j, i) => <Abs key={j} x={110 + (i % 3) * 340} y={290 + Math.floor(i / 3) * 160}><Pop f={b2 + 10 + i * 5} from={{ y: 100, scale: 0.4 }}><Card style={{ padding: "16px 34px", fontSize: 46, fontWeight: 900 }}>{j}</Card></Pop></Abs>)}
          <Abs x={110} y={640}><Pop f={b2 + 50} from={{ x: -200 }}><Card bg={color.sub} style={{ padding: "18px 30px", fontSize: 40, fontWeight: 800 }}>💬 댓글로 업종과 고민을 알려주세요</Card></Pop></Abs>
          <Abs x={1220} y={280}><Bust f={b2 + 4} pose="point" expression="talk" size={760} /></Abs>
        </Camera>
      </Beat>
      {/* ③ 와이드 → 크레인 업 */}
      <Beat f={b3} len={100000} inT="zoom">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.0, rx: 0, y: 0 }, { f: 40, zoom: 1.0 }, { f: 90, zoom: 1.35, rx: 30, y: -200 }]}>
          <RestaurantInterior>
            <Abs x={830} y={330}><BossActor size={500} enter="jump" enterAt={frame - b3} poses={[{ f: 0, pose: "wave", expression: "joy" }]} /></Abs>
          </RestaurantInterior>
          <Abs x={560} y={60}><Pop f={b3 + 8} from={{ y: -100, scale: 0.4 }}><div style={{ display: "flex", alignItems: "center", gap: 20, background: "#fff", border: `7px solid ${color.ink}`, borderRadius: 30, padding: "14px 30px", boxShadow: ui.shadow(10) }}><TodayCalendar size={90} /><Wordmark size={56} /></div></Pop></Abs>
        </Camera>
      </Beat>
    </AbsoluteFill>
  );
};
