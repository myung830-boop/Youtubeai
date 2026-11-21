import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { ExperimentTag, GridBg, TodayCalendar, Wordmark } from "../../components/brand";
import { Boss } from "../../character/Boss";
import { BossBack, PovHands } from "../../character/BossViews";
import { BossActor, ReactionBubble } from "../../motion/BossActor";
import { Burst, Camera, easeInOut, floatY, impact, KText, lerp, Pop, Sparkles, SpeedLines, Stamp, useCue } from "../../motion/core";
import { Confetti } from "../../motion/props";
import { Beat, Flash } from "../../motion/transitions";
import { Layer, Parallax } from "../../motion/depth";
import { BrandBadge, BrandIcon } from "../../brands/registry";
import { PhotoBg, PhotoPanel, Polaroid, StockTag } from "../../components/photo";
import { color, font, ui } from "../../styles/theme";
import { AppScreen, BillsSummary, CallScreen, CallSummary, ChatThread, CompareTable, DocsChecklist, ExampleTag, InputBar, PK, PK_DARK, PK_INK, PlanCards, PromoResult, SignupSteps, StoreSearch, TAB_LABELS, TabBar, TaskCard } from "./mockups";
import { Carousel3D, Orbit, Phone3D, PhotoCard, PhotoClock, PickleHub, RoadStep, TabStandCard, TaskChip } from "./fx";

const F = font.family;
const Abs: React.FC<{ x: number; y: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ x, y, children, style }) => <div style={{ position: "absolute", left: x, top: y, ...style }}>{children}</div>;
const Center: React.FC<{ y: number; children: React.ReactNode }> = ({ y, children }) => <Abs x={0} y={y} style={{ width: 1920, display: "flex", justifyContent: "center" }}>{children}</Abs>;
const Card: React.FC<{ children: React.ReactNode; bg?: string; style?: React.CSSProperties }> = ({ children, bg = "#fff", style }) => (
  <div style={{ background: bg, border: `7px solid ${color.ink}`, borderRadius: 30, boxShadow: ui.shadow(12), fontFamily: F, ...style }}>{children}</div>
);
const Light: React.FC = () => <GridBg tone="light" cell={60} bleed />;
const Navy: React.FC = () => <GridBg tone="navy" cell={60} bleed />;
const PickleBg: React.FC = () => <div style={{ position: "absolute", inset: -600, background: "radial-gradient(circle at 50% 45%, #D9F7D6 0%, #A8E8A4 40%, #63D361 100%)" }} />;
const Bust: React.FC<{ f: number; pose?: React.ComponentProps<typeof Boss>["pose"]; expression?: React.ComponentProps<typeof Boss>["expression"]; size?: number }> = ({ f, pose = "point", expression = "talk", size = 780 }) => (
  <Pop f={f} from={{ y: 400, scale: 0.85 }}><div style={{ filter: "drop-shadow(14px 14px 0 #1B2541)" }}><Boss pose={pose} expression={expression} crop="bust" size={size} /></div></Pop>
);
/** 장면 제목 칩 (피클 로고 + 번호) */
const Section: React.FC<{ f: number; n?: string; label: string }> = ({ f, n, label }) => (
  <Pop f={f} from={{ x: -300, rotate: -12, scale: 0.4 }}>
    <div style={{ display: "inline-flex", alignItems: "center", gap: 16, background: "#fff", border: `7px solid ${color.ink}`, borderRadius: 999, padding: "8px 36px 8px 10px", boxShadow: ui.shadow(10), fontFamily: F, fontWeight: 900, fontSize: 52 }}>
      <div style={{ width: 80, height: 80, borderRadius: "50%", background: n ? color.accent : "#fff", border: `6px solid ${color.ink}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44 }}>{n ?? <BrandIcon id="pickle" size={58} />}</div>
      {label}
    </div>
  </Pop>
);
/** 휴대폰 속 채팅 화면 (1인칭에서 손으로 든 휴대폰) */
const ChatPhone: React.FC<{ f: number; msgs: React.ComponentProps<typeof ChatThread>["msgs"]; typing?: { at: number; until: number }; input?: { text: string; at: number; dur: number }; scale?: number; ry?: number; rx?: number }> = ({ f, msgs, typing, input, scale = 1, ry = 0, rx = 0 }) => (
  <Phone3D scale={scale} ry={ry} rx={rx}>
    <AppScreen tab={null}>
      <ChatThread f={f} msgs={msgs} typing={typing} />
      <InputBar text={input && f < input.at + input.dur + 6 ? input.text : ""} f={input ? f - input.at : 0} dur={input?.dur ?? 1} />
    </AppScreen>
  </Phone3D>
);
const Quote: React.FC<{ f: number; t: string; w?: number }> = ({ f, t, w = 760 }) => (
  <Pop f={f} from={{ y: 80, scale: 0.8 }}>
    <div style={{ width: w, background: "#fff", border: `7px solid ${color.ink}`, borderRadius: 28, padding: "22px 30px", boxShadow: ui.shadow(12), fontFamily: F, fontWeight: 900, fontSize: 40, lineHeight: 1.4, position: "relative" }}>
      <div style={{ position: "absolute", left: 24, top: -36, fontSize: 90, color: PK_DARK, lineHeight: 1 }}>“</div>
      {t}
      <div style={{ marginTop: 8, fontSize: 22, color: "#6B737B" }}>— 피클에게 이렇게 부탁</div>
    </div>
  </Pop>
);

/* ───────── S01 훅 ───────── */
export const E4S01: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("공과금도", 5.7);
  const t2 = useCue("주민센터에서", 7.4), t3 = useCue("가게에 필요한", 10.5), t4 = useCue("홍보도", 13.4);
  const b3 = useCue("하루가 금방", 19);
  const b4 = useCue("그런데 이런 일들을", 21.2);
  const b5 = useCue("오늘 소개할", 25.9);
  const todo: Array<[string, string, string]> = [["stock/bills.jpg", "공과금", "#FFE08A"], ["stock/documents.jpg", "서류 발급", "#DCE9FF"], ["stock/deliverybox.jpg", "물품 주문", "#FFD9C2"], ["stock/snsfeed.jpg", "홍보", "#F6D6FF"]];
  const tf = [b2, t2, t3, t4];
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.main }}>
      {/* ③ 와이드: 가게 + 빨리 도는 큰 시계 (깊이 3층) */}
      <Beat f={b1} len={b1 - b2} inT="cut" outT="whip">
        <Parallax start={0} keys={[{ f: 0, x: -1 }, { f: 170, x: 0.6 }]}>
          <Layer depth={0.2} blur={0}><PhotoBg src="stock/shopinterior.jpg" blur={3} tag={false} /></Layer>
          <Layer depth={0.45}><Abs x={1270} y={150}><Pop f={b1 - 6} from={{ scale: 0.2, rotate: -90 }}><PhotoClock size={520} turns={frame / 9} /></Pop></Abs></Layer>
          <Layer depth={0.7}><Abs x={300} y={300}><BossActor size={720} enter="walkR" enterAt={0} poses={[{ f: 0, pose: "worry", expression: "worry" }]} /></Abs></Layer>
        </Parallax>
        <StockTag style={{ left: 30, bottom: 30 }} />
        <Abs x={90} y={80}><KText f={b1 - 10} text="가게 운영 말고도" size={80} color="#fff" stroke /></Abs>
        <Abs x={90} y={190}><KText f={b1 - 24} text="해야 할 일이 너무 많다" size={80} color={color.accent} stroke /></Abs>
      </Beat>
      {/* ⑦ 하이앵글: 할 일 카드가 쌓임 */}
      <Beat f={b2} len={b2 - b3} inT="whip" outT="zoom">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.25, rx: 22 }, { f: 300, zoom: 1.05, rx: 22 }]} handheld={0.6}>
          <div style={{ position: "absolute", inset: -500, background: "#E9EDF5" }} />
          <div style={{ position: "absolute", inset: -500, backgroundImage: "linear-gradient(#D5DCEA 2px, transparent 2px), linear-gradient(90deg, #D5DCEA 2px, transparent 2px)", backgroundSize: "80px 80px" }} />
          <Abs x={780} y={430}><BossActor size={420} enter="none" poses={[{ f: 0, pose: "worry", expression: "worry" }, { f: frame - t4, pose: "facepalm", expression: "tired" }]} /></Abs>
          {todo.map(([src, t, bg], i) => (
            <Abs key={t} x={[170, 1250, 260, 1180][i]} y={[150, 130, 560, 560][i]}>
              <Pop f={tf[i]} from={{ y: -700, rotate: (i % 2 ? 30 : -30), scale: 1.4 }}>
                <div style={{ background: bg, border: `7px solid ${color.ink}`, borderRadius: 24, padding: 12, boxShadow: ui.shadow(12), transform: `rotate(${[-6, 5, 4, -5][i]}deg)` }}>
                  <Img src={staticFile(src)} style={{ width: 420, height: 250, objectFit: "cover", borderRadius: 14, display: "block" }} />
                  <div style={{ textAlign: "center", fontFamily: F, fontWeight: 900, fontSize: 46, marginTop: 6 }}>{t}</div>
                </div>
              </Pop>
            </Abs>
          ))}
          {tf.map((f, i) => <Burst key={i} f={f - 10} x={[380, 1460, 470, 1390][i]} y={[300, 280, 700, 700][i]} />)}
        </Camera>
        <StockTag style={{ right: 30, top: 30 }} />
      </Beat>
      {/* ⑧ 익스트림 클로즈업: 알람시계 */}
      <Beat f={b3} len={b3 - b4} inT="zoom" outT="whip">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.3 }, { f: 70, zoom: 1.1 }]} shake={impact(b3 - 2, 16)}>
          <PhotoBg src="stock/alarmclock.jpg" blur={0} tint="rgba(27,37,65,0.15)" tag={false} />
          <SpeedLines f={b3} colorLine="#fff" opacity={0.25} />
          <Abs x={1180} y={560}><ReactionBubble f={b3 - 6} expression="tired" size={380} bg="#FFB4B4" /></Abs>
          <Abs x={110} y={110}><Stamp f={b3 - 4} bg="#FF4D4F" size={84} rot={-6}>하루가 순삭!</Stamp></Abs>
        </Camera>
        <StockTag style={{ left: 30, bottom: 30 }} />
      </Beat>
      {/* ⑨ 3D 궤도: 할 일들이 AI 비서 휴대폰으로 빨려 들어감 */}
      <Beat f={b4} len={b4 - b5} inT="whip" outT="zoom">
        <Camera start={frame - b4} keys={[{ f: 0, zoom: 0.95, rot: -4 }, { f: 120, zoom: 1.08, rot: 2 }]}>
          <Navy />
          <Orbit f={b4} suckAt={100} speed={0.01} hub={<Phone3D scale={0.42} ry={-12}><AppScreen tab={0}><ChatThread f={0} msgs={[]} /></AppScreen></Phone3D>} items={[<TaskChip key="a" icon="💡" t="공과금" size={50} />, <TaskChip key="b" icon="📄" t="서류" size={50} />, <TaskChip key="c" icon="📦" t="물품 주문" size={50} />, <TaskChip key="d" icon="📣" t="홍보" size={50} />, <TaskChip key="e" icon="📞" t="전화" size={50} />]} />
          <Center y={80}><KText f={b4 - 4} text="AI 비서에게 맡긴다면?" size={84} color="#fff" stroke /></Center>
        </Camera>
      </Beat>
      {/* ⑥ 로우앵글: 피클 로고 리빌 */}
      <Beat f={b5} len={100000} inT="zoom">
        <Camera start={frame - b5} keys={[{ f: 0, zoom: 1.35, rx: -16 }, { f: 22, zoom: 1.0, rx: -10 }, { f: 120, zoom: 1.04, rx: -10 }]} shake={impact(b5 - 10, 26)}>
          <PickleBg />
          <div style={{ position: "absolute", inset: -400, background: "repeating-conic-gradient(from 0deg at 50% 46%, rgba(255,255,255,0) 0deg 8deg, rgba(255,255,255,0.35) 8deg 16deg)", transform: `rotate(${frame * 0.2}deg)` }} />
          <Center y={130}><Pop f={b5 - 8} from={{ scale: 3, rotate: -30 }}><div style={{ filter: "drop-shadow(16px 16px 0 rgba(14,42,18,0.85))" }}><BrandIcon id="pickle" size={420} /></div></Pop></Center>
          <Burst f={b5 - 10} x={960} y={340} r={380} c="#fff" n={14} />
          <Center y={600}><Pop f={b5 - 18} from={{ y: 200 }}><div style={{ fontFamily: F, fontWeight: 900, fontSize: 150, color: "#fff", letterSpacing: "-0.04em", WebkitTextStroke: `14px ${PK_INK}`, paintOrder: "stroke fill", textShadow: `10px 10px 0 ${PK_INK}` }}>피클 Pickle</div></Pop></Center>
          <Center y={800}><Pop f={b5 - 30} from={{ y: 120 }}><div style={{ background: "#fff", border: `6px solid ${PK_INK}`, borderRadius: 999, padding: "8px 34px", fontFamily: F, fontWeight: 900, fontSize: 44, color: PK_INK }}>사장님을 대신해 일하는 AI 비서</div></Pop></Center>
          <Flash f={b5 - 8} />
        </Camera>
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S02 피클이란 ───────── */
export const E4S02: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("저는 이런 AI", 8.7);
  const b3 = useCue("사장님이 해야 할", 14.3);
  const st = [b1 - 50, b1 - 90, b1 - 130];
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      {/* ⑩ 반반: 일반 AI vs 피클 */}
      <Beat f={b1} len={b1 - b2} inT="whip" outT="whip">
        <Camera start={0} keys={[{ f: 0, zoom: 1.06, ry: -6 }, { f: 220, zoom: 1.0, ry: 4 }]}>
          <div style={{ position: "absolute", left: -400, top: -300, width: 1100, height: 1700, background: "#E4E8F1" }} />
          <div style={{ position: "absolute", left: 700, top: -300, width: 1700, height: 1700, background: "linear-gradient(135deg,#E8F9E6,#BFEFBB)" }} />
          <div style={{ position: "absolute", left: 694, top: -300, width: 12, height: 1700, background: color.ink }} />
          <Abs x={90} y={110}><Pop f={b1} from={{ x: -200 }}><div style={{ fontFamily: F, fontWeight: 900, fontSize: 52, color: "#6B737B" }}>보통의 AI</div></Pop></Abs>
          <Abs x={90} y={220}><Pop f={b1 - 8} from={{ y: 60 }}><Card style={{ padding: "18px 26px", fontSize: 36, fontWeight: 800 }}>💬 질문하면</Card></Pop></Abs>
          <Abs x={160} y={360}><Pop f={b1 - 18} from={{ y: 60 }}><Card bg="#F1F3F6" style={{ padding: "18px 26px", fontSize: 36, fontWeight: 800 }}>📝 답만 해줌</Card></Pop></Abs>
          <Abs x={780} y={110}><Pop f={b1 - 30} from={{ x: 200 }}><div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: F, fontWeight: 900, fontSize: 52, color: PK_INK }}><BrandIcon id="pickle" size={70} />피클</div></Pop></Abs>
          {[["🙋 부탁하면", "#fff"], ["⚙️ 직접 작업하고", "#fff"], ["✅ 결과를 알려줌", PK]].map(([t, bg], i) => (
            <React.Fragment key={t}>
              <Abs x={780 + i * 360} y={330 + i * 70}><Pop f={st[i]} from={{ y: 120, scale: 0.5 }}><Card bg={bg} style={{ padding: "20px 24px", fontSize: 38, fontWeight: 900, whiteSpace: "nowrap" }}>{t}</Card></Pop></Abs>
              {i < 2 && <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0 }}><line x1={1040 + i * 360} y1={400 + i * 70} x2={1040 + i * 360 + lerp(st[i + 1] - 6, 0, 10, 0, 100)} y2={400 + i * 70 + lerp(st[i + 1] - 6, 0, 10, 0, 50)} stroke={PK_DARK} strokeWidth={10} strokeLinecap="round" strokeDasharray="4 16" /></svg>}
            </React.Fragment>
          ))}
          <Abs x={1420} y={640}><BossActor size={400} enter="popUp" enterAt={150} poses={[{ f: 0, pose: "thumbsUp", expression: "wink" }]} /></Abs>
        </Camera>
      </Beat>
      {/* ② 2인칭: 가장 큰 장점 = 시간 */}
      <Beat f={b2} len={b2 - b3} inT="whip" outT="zoom">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.12 }, { f: 160, zoom: 1.0 }]}>
          <Light />
          <Abs x={110} y={220}><Bust f={b2} pose="point" expression="talk" size={820} /></Abs>
          <Abs x={1080} y={130}><Pop f={b2 - 10} from={{ rotate: 30, y: 300 }}><Polaroid src="stock/hourglass.jpg" w={600} h={380} rot={5} caption="⏳ 시간을 아껴준다" /></Pop></Abs>
          <Abs x={1000} y={760}><Stamp f={b2 - 50} bg={color.accent} fg={color.ink} size={74} rot={-5}>가장 큰 장점 = 시간</Stamp></Abs>
        </Camera>
      </Beat>
      {/* ⑩→④ 반반: 손님 응대 사진 | 줄어드는 할 일 */}
      <Beat f={b3} len={100000} inT="zoom">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.05, x: -60 }, { f: 200, zoom: 1.0, x: 30 }]}>
          <div style={{ position: "absolute", inset: -300, background: "linear-gradient(135deg,#2D5DB8,#0F3B82)" }} />
          <Pop f={b3} from={{ x: -500 }} bouncy={false}><PhotoPanel src="stock/owner.jpg" w={860} label="손님 응대 · 매출에 집중" /></Pop>
          <Abs x={960} y={140}>
            <Card style={{ width: 820, padding: "26px 34px" }}>
              <div style={{ fontSize: 44, fontWeight: 900, marginBottom: 12 }}>사장님 할 일 목록</div>
              {["💡 공과금 확인", "📄 서류 발급", "📦 소모품 주문", "📣 홍보 문구", "📞 업체 문의"].map((t, i) => {
                const off = b3 - 30 - i * 9;
                return (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 40, fontWeight: 800, padding: "8px 0", opacity: lerp(off, 0, 10, 1, 0.35) }}>
                    <span style={{ position: "relative" }}>{t}<span style={{ position: "absolute", left: 0, top: "52%", height: 6, background: "#FF4D4F", width: `${lerp(off, 0, 8, 0, 100)}%` }} /></span>
                    <span style={{ marginLeft: "auto", fontSize: 30, color: PK_DARK, opacity: lerp(off, 4, 10, 0, 1) }}>→ 피클</span>
                  </div>
                );
              })}
            </Card>
          </Abs>
          <Abs x={1100} y={820}><Pop f={b3 - 90} from={{ scale: 0 }}><Card bg={PK} style={{ padding: "12px 30px", fontSize: 44, fontWeight: 900, color: PK_INK }}>⏰ 시간이 생긴다!</Card></Pop></Abs>
        </Camera>
        <StockTag style={{ left: 30, bottom: 30 }} />
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S03 사용법 지도 (⑤ 스카이뷰 → 길을 따라 비행) ───────── */
export const E4S03: React.FC = () => {
  const frame = useCurrentFrame();
  const steps = ["앱 설치", "가입", "채팅", "일 맡기기"];
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      <Camera start={0} keys={[{ f: 0, zoom: 1.0, rx: 30, x: -120, y: 60 }, { f: 70, zoom: 1.08, rx: 22, x: 120, y: 20 }]}>
        <div style={{ position: "absolute", inset: -800, background: "#DDF2DA" }} />
        <div style={{ position: "absolute", inset: -800, backgroundImage: "radial-gradient(#BFE3BA 3px, transparent 3px)", backgroundSize: "60px 60px" }} />
        <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
          <path d="M-100,820 C300,820 300,420 640,520 S1000,880 1320,600 S1760,300 2100,380" fill="none" stroke={color.ink} strokeWidth={120} strokeLinecap="round" />
          <path d="M-100,820 C300,820 300,420 640,520 S1000,880 1320,600 S1760,300 2100,380" fill="none" stroke="#fff" strokeWidth={10} strokeDasharray="40 30" strokeDashoffset={-frame * 4} />
        </svg>
        {steps.map((t, i) => <Abs key={t} x={[180, 560, 1060, 1500][i]} y={[560, 300, 580, 230][i]}><Pop f={frame - 8 - i * 12} from={{ y: -200, scale: 0.3 }}><div style={{ transform: "rotateX(-22deg) scale(1.25)", transformOrigin: "50% 100%" }}><RoadStep n={i + 1} t={t} on={frame > 60 + i * 8} /></div></Pop></Abs>)}
      </Camera>
      <Center y={40}><Pop f={0} from={{ y: -120, scale: 0.5 }}><Card bg={color.accent} style={{ padding: "8px 40px", fontSize: 72, fontWeight: 900 }}>피클 사용법 4단계</Card></Pop></Center>
    </AbsoluteFill>
  );
};

/* ───────── S04 설치·가입 ───────── */
export const E4S04: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("정확한 앱 이름", 6.0);
  const b3 = useCue("앱을 설치하고", 11.4);
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      {/* ④ 어깨 너머 느낌: 실사 휴대폰 위로 3D 휴대폰 2대 */}
      <Beat f={b1} len={b1 - b2} inT="whip" outT="zoom">
        <Camera start={0} keys={[{ f: 0, zoom: 1.08, ry: 10 }, { f: 180, zoom: 1.0, ry: -4 }]}>
          <PhotoBg src="stock/iphonegalaxy.jpg" blur={7} tint="rgba(246,248,252,0.55)" tag={false} />
          <Abs x={330} y={120}><Pop f={b1} from={{ y: 600, rotate: -20 }}><Phone3D scale={0.95} ry={18} rz={-3}><StoreSearch store="ios" f={b1 - 10} /></Phone3D></Pop></Abs>
          <Abs x={1150} y={120}><Pop f={b1 - 10} from={{ y: 600, rotate: 20 }}><Phone3D scale={0.95} ry={-18} rz={3}><StoreSearch store="android" f={b1 - 20} /></Phone3D></Pop></Abs>
          <Abs x={60} y={70}><Pop f={b1 - 4} from={{ x: -200 }}><Card style={{ padding: "8px 26px", fontSize: 42, fontWeight: 900 }}>🍎 아이폰 → App Store</Card></Pop></Abs>
          <Abs x={1360} y={70}><Pop f={b1 - 14} from={{ x: 200 }}><Card style={{ padding: "8px 26px", fontSize: 42, fontWeight: 900 }}>🤖 갤럭시 → Google Play</Card></Pop></Abs>
          <Center y={470}><Pop f={b1 - 30} from={{ scale: 0.3 }}><Card bg={color.accent} style={{ padding: "10px 34px", fontSize: 56, fontWeight: 900 }}>🔍 '피클' 검색</Card></Pop></Center>
        </Camera>
        <StockTag style={{ left: 30, bottom: 30 }} />
      </Beat>
      {/* ⑧ 익스트림 클로즈업: 앱 이름 */}
      <Beat f={b2} len={b2 - b3} inT="zoom" outT="whip">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.2, rot: -3 }, { f: 150, zoom: 1.05, rot: 0 }]}>
          <PickleBg />
          <Center y={260}><Pop f={b2} from={{ scale: 0.3 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 40, background: "#fff", border: `10px solid ${color.ink}`, borderRadius: 50, padding: "40px 60px", boxShadow: ui.shadow(18) }}>
              <div style={{ width: 260, height: 260, borderRadius: 60, border: `6px solid #E3E6E1`, display: "flex", alignItems: "center", justifyContent: "center" }}><BrandIcon id="pickle" size={210} /></div>
              <div style={{ fontFamily: F }}>
                <div style={{ fontWeight: 900, fontSize: 92, letterSpacing: "-0.04em" }}>피클:</div>
                <div style={{ fontWeight: 900, fontSize: 80, letterSpacing: "-0.04em", color: PK_DARK }}>나만의 AI 에이전트</div>
              </div>
            </div>
          </Pop></Center>
          <Center y={760}><Stamp f={b2 - 30} bg={color.accent} fg={color.ink} size={60} rot={-3}>정확한 앱 이름 체크 ✓</Stamp></Center>
        </Camera>
      </Beat>
      {/* ① 1인칭: 손에 든 휴대폰, 설치 → 가입 */}
      <Beat f={b3} len={100000} inT="whip">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.1, rx: 10 }, { f: 30, zoom: 1.0, rx: 4 }]} handheld={1.4}>
          <PhotoBg src="stock/deskcoffee.jpg" blur={10} tint="rgba(246,248,252,0.35)" tag={false} />
          <Abs x={740} y={70}><Pop f={b3} from={{ y: 500, rotateX: 40 }}><Phone3D scale={1.12} rx={8}><SignupSteps f={b3 - 6} /></Phone3D></Pop></Abs>
          <PovHands mode="hold" />
          <Abs x={90} y={140}><KText f={b3 - 6} text="설치하고" size={74} /></Abs>
          <Abs x={90} y={250}><KText f={b3 - 40} text="안내대로 가입하면 끝" size={74} color={PK_DARK} /></Abs>
          <Abs x={1440} y={640}><BossActor size={420} enter="peekR" enterAt={frame - b3 + 20} poses={[{ f: 0, pose: "thumbsUp", expression: "smile" }]} /></Abs>
        </Camera>
        <StockTag style={{ left: 30, bottom: 30 }} />
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S05 앱 화면·사용법 ───────── */
export const E4S05: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("앱에는 채팅", 4.3);
  const chatHi = useCue("가장 많이 사용할", 9.8);
  const b3 = useCue("사용법도 간단", 13.5);
  const b4 = useCue("피클이 필요한 정보", 20.4);
  const b5 = useCue("그다음에는 피클이", 26.8);
  const tabIcons = ["💬", "🧭", "🗂", <BrandIcon key="p" id="pickle" size={70} />];
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      {/* ① 휴대폰 속으로 들어가기 */}
      <Beat f={b1} len={b1 - b2} inT="zoom" outT="whip">
        <Camera start={0} keys={[{ f: 0, zoom: 0.8 }, { f: 40, zoom: 0.8 }, { f: 75, zoom: 2.2, y: -40 }, { f: 400, zoom: 2.3, y: -40 }]}>
          <PickleBg />
          <Abs x={757} y={110}><Phone3D scale={0.85}><AppScreen><ChatThread f={frame - 30} msgs={[{ from: "pk", text: "안녕하세요! 무엇을 도와드릴까요? 🙂", at: 0 }]} /><InputBar /></AppScreen></Phone3D></Abs>
        </Camera>
        <Abs x={80} y={80}><Section f={b1} label="가입하면 바로 채팅 화면" /></Abs>
      </Beat>
      {/* ⑤ 스카이뷰: 누운 휴대폰 위로 메뉴 4개가 세워짐 */}
      <Beat f={b2} len={b2 - b3} inT="whip" outT="zoom">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 0.95, rx: 52 }, { f: 200, zoom: 1.02, rx: 46 }]}>
          <div style={{ position: "absolute", inset: -800, background: "#E9EDF5" }} />
          <Abs x={360} y={40} style={{ transform: "rotate(-90deg) scale(1.2)", transformOrigin: "50% 50%" }}><div style={{ marginLeft: 430 }}><Phone3D scale={1}><AppScreen><div /></AppScreen></Phone3D></div></Abs>
          <div style={{ position: "absolute", left: 130, top: 330, display: "flex", gap: 50, transformStyle: "preserve-3d", transform: "scale(1.3)", transformOrigin: "0 100%" }}>
            {TAB_LABELS.map((t, i) => (
              <TabStandCard key={t} label={t} icon={<div style={{ fontSize: 70 }}>{tabIcons[i]}</div>} up={lerp(b2 - 6 - i * 14, 0, 14, 0, 1, easeInOut)} on={i === 0 && chatHi >= 0} />
            ))}
          </div>
          <Abs x={300} y={860}><Pop f={chatHi} from={{ y: 80 }}><Card bg={color.accent} style={{ padding: "8px 30px", fontSize: 48, fontWeight: 900 }}>가장 많이 쓰는 곳 = 💬 채팅</Card></Pop></Abs>
        </Camera>
        <Abs x={60} y={60}><Card style={{ padding: "6px 22px", fontSize: 30, fontWeight: 800 }}>실제 앱 하단엔 아이콘만 보여요</Card></Abs>
      </Beat>
      {/* ④ 어깨 너머: 사람에게 부탁하듯 입력 */}
      <Beat f={b3} len={b3 - b4} inT="zoom" outT="whip">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.0, x: 60 }, { f: 200, zoom: 1.06, x: 20 }]}>
          <PhotoBg src="stock/phonehand.jpg" blur={8} tint="rgba(246,248,252,0.45)" tag={false} />
          <Abs x={980} y={60} style={{ transform: "perspective(1600px) rotateY(-12deg)" }}><Pop f={b3} from={{ x: 300 }}><ChatPhone f={b3} scale={1.05} msgs={[{ from: "me", text: "가게에서 쓸 종이컵 좀 찾아줘", at: 70 }]} input={{ text: "가게에서 쓸 종이컵 좀 찾아줘", at: 14, dur: 50 }} /></Pop></Abs>
          <Abs x={-160} y={360} style={{ filter: "blur(1.5px)" }}><Pop f={b3} from={{ x: -300 }} bouncy={false}><BossBack size={1000} turn={8} /></Pop></Abs>
          <Abs x={90} y={90}><KText f={b3 - 6} text="사람에게 부탁하듯" size={78} /></Abs>
          <Abs x={90} y={200}><KText f={b3 - 20} text="채팅창에 입력" size={78} color={PK_DARK} /></Abs>
        </Camera>
        <StockTag style={{ left: 30, bottom: 30 }} />
      </Beat>
      {/* ② 정면: 질문 → 답변 → 작업 확인 */}
      <Beat f={b4} len={b4 - b5} inT="whip" outT="zoom">
        <Camera start={frame - b4} keys={[{ f: 0, zoom: 1.1 }, { f: 180, zoom: 1.0 }]}>
          <Light />
          <Abs x={740} y={70}><ChatPhone f={b4 + 80} scale={1.08} msgs={[{ from: "me", text: "가게에서 쓸 종이컵 좀 찾아줘", at: 0 }, { from: "pk", text: "몇 개 필요하세요? 예산도 알려주세요!", at: 92 }, { from: "me", text: "1,000개, 5만 원 이하", at: 140 }, { from: "pk", node: <TaskCard f={b4 - 80} title="작업 확인" w={290} approve="이대로 진행" rows={[["상품", "종이컵 1,000개"], ["예산", "5만 원 이하"], ["결제", "승인 후 진행"]]} />, at: 170 }]} typing={{ at: 82, until: 92 }} /></Abs>
          {[["① 추가 질문에 답하고", b4 - 10], ["② 작업 내용 확인", b4 - 90]].map(([t, f], i) => <Abs key={t as string} x={i ? 1250 : 160} y={i ? 620 : 300}><Pop f={f as number} from={{ x: i ? 200 : -200 }}><Card bg={i ? PK : "#fff"} style={{ padding: "16px 28px", fontSize: 46, fontWeight: 900 }}>{t}</Card></Pop></Abs>)}
          <Abs x={130} y={620}><BossActor size={380} enter="slideL" enterAt={frame - b4} poses={[{ f: 0, pose: "point", expression: "talk" }]} /></Abs>
        </Camera>
      </Beat>
      {/* ⑨ 3D 궤도: 웹사이트·전화로 작업 → 결과 */}
      <Beat f={b5} len={100000} inT="zoom">
        <Camera start={frame - b5} keys={[{ f: 0, zoom: 1.1, rx: 14, rot: -3 }, { f: 300, zoom: 0.98, rx: 8, rot: 2 }]}>
          <Navy />
          <Orbit f={b5} speed={0.008} rx={600} ry={250} hub={<PickleHub f={frame} size={240} />} items={[
            <PhotoCard key="w" src="stock/laptopphone.jpg" w={300} h={190} label="🌐 웹사이트 이용" />,
            <PhotoCard key="c" src="stock/phonekeypad.jpg" w={300} h={190} label="📞 전화 걸기" />,
            <TaskChip key="r" icon="✅" t="결과 정리" bg={PK} />,
          ]} />
          <Center y={60}><KText f={b5 - 4} text="피클이 직접 작업하고 결과를 알려줘요" size={64} color="#fff" stroke /></Center>
        </Camera>
        <StockTag style={{ left: 30, bottom: 30 }} />
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── 사례 공통: 회전목마 카드 ───────── */
const CASES: Array<[string, string, string]> = [["stock/powerlines.jpg", "① 공과금", "#FFE08A"], ["stock/documents.jpg", "② 행정서류", "#DCE9FF"], ["stock/warehouse.jpg", "③ 물품 구매", "#FFD9C2"], ["stock/snsfeed.jpg", "④ 홍보", "#F6D6FF"], ["stock/phonekeypad.jpg", "⑤ 전화", "#DDF5E6"]];
const CaseCard: React.FC<{ i: number; w?: number }> = ({ i, w = 380 }) => (
  <div style={{ background: CASES[i][2], border: `7px solid ${color.ink}`, borderRadius: 26, padding: 12, boxShadow: ui.shadow(12), fontFamily: F }}>
    <Img src={staticFile(CASES[i][0])} style={{ width: w, height: w * 0.62, objectFit: "cover", borderRadius: 14, display: "block" }} />
    <div style={{ textAlign: "center", fontWeight: 900, fontSize: w * 0.13, marginTop: 6 }}>{CASES[i][1]}</div>
  </div>
);

/* ───────── S06 ① 공과금 ───────── */
export const E4S06: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("첫 번째는 공과금", 4.0);
  const b3 = useCue("이럴 때 피클에게 납부", 15.4);
  const b4 = useCue("사장님은 정리된", 24.0);
  const approveF = useCue("승인하면", 26.3);
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      {/* ③ 와이드: 사례 5장 3D 회전목마 */}
      <Beat f={b1} len={b1 - b2} inT="whip" outT="zoom">
        <Camera start={0} keys={[{ f: 0, zoom: 0.92, rx: 6 }, { f: 120, zoom: 1.0, rx: 0 }]}>
          <Navy />
          <Carousel3D f={frame} items={CASES.map((_, i) => <CaseCard key={i} i={i} />)} radius={640} front={0} spinFrames={100} />
          <Center y={60}><KText f={b1} text="사장님이 맡길 수 있는 일 5가지" size={74} color="#fff" stroke /></Center>
        </Camera>
        <StockTag style={{ left: 30, bottom: 30 }} />
      </Beat>
      {/* ⑦ 하이앵글: 송전탑 + 청구서 */}
      <Beat f={b2} len={b2 - b3} inT="zoom" outT="whip">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.2, rx: 18 }, { f: 300, zoom: 1.05, rx: 14 }]}>
          <PhotoBg src="stock/powerlines.jpg" blur={2} tint="rgba(27,37,65,0.35)" tag={false} />
          {[["⚡", "전기요금"], ["💧", "수도요금"], ["🌐", "인터넷 요금"]].map(([e, t], i) => (
            <Abs key={t} x={250 + i * 500} y={360 + (i % 2) * 60}><Pop f={b2 - 50 + i * 16} from={{ y: -500, rotate: i * 10 - 10 }}>
              <div style={{ width: 400, background: "#fff", border: `7px solid ${color.ink}`, borderRadius: 22, padding: 22, boxShadow: ui.shadow(12), fontFamily: F, transform: `rotate(${[-4, 3, -2][i]}deg)` }}>
                <div style={{ fontSize: 70 }}>{e}</div>
                <div style={{ fontSize: 48, fontWeight: 900 }}>{t}</div>
                <div style={{ marginTop: 8, height: 14, background: "#E9EDF5", borderRadius: 7 }} /><div style={{ marginTop: 8, height: 14, width: "60%", background: "#E9EDF5", borderRadius: 7 }} />
                <div style={{ marginTop: 10, fontSize: 30, fontWeight: 900, color: "#FF4D4F" }}>매달 납부일 📅</div>
              </div>
            </Pop></Abs>
          ))}
        </Camera>
        <Abs x={80} y={70}><Section f={b2} n="1" label="공과금 납부" /></Abs>
        <StockTag style={{ right: 30, bottom: 30 }} />
      </Beat>
      {/* ① 1인칭: 채팅 → 납부 정리 카드 */}
      <Beat f={b3} len={b3 - b4} inT="whip" outT="whip">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.1, rx: 8 }, { f: 30, zoom: 1.0, rx: 3 }]} handheld={1.4}>
          <PhotoBg src="stock/bills.jpg" blur={9} tint="rgba(246,248,252,0.4)" tag={false} />
          <Abs x={720} y={40}><Phone3D scale={1.15} rx={6}><AppScreen tab={null}><ChatThread f={b3} msgs={[{ from: "me", text: "이번 달 공과금이랑 납부일 정리하고, 납부할 사이트랑 결제 절차 준비해줘", at: 10 }, { from: "pk", node: <BillsSummary f={b3 - 60} />, at: 60 }]} typing={{ at: 36, until: 60 }} /></AppScreen></Phone3D></Abs>
          <PovHands mode="hold" />
          <Abs x={90} y={140}><KText f={b3 - 6} text="요금·날짜 확인하고" size={68} /></Abs>
          <Abs x={90} y={240}><KText f={b3 - 30} text="결제 절차까지 준비" size={68} color={PK_DARK} /></Abs>
          <Abs x={90} y={360}><Pop f={b3 - 70} from={{ x: -100 }}><ExampleTag /></Pop></Abs>
        </Camera>
        <StockTag style={{ left: 30, bottom: 30 }} />
      </Beat>
      {/* ⑥ 로우앵글: 승인은 사장님 */}
      <Beat f={b4} len={100000} inT="whip">
        <Camera start={frame - b4} keys={[{ f: 0, zoom: 1.2, rx: -14 }, { f: 40, zoom: 1.0, rx: -10 }]} shake={impact(approveF - 4, 20)}>
          <div style={{ position: "absolute", inset: -500, background: "linear-gradient(180deg,#2D5DB8 0%,#0F3B82 70%)" }} />
          <SpeedLines f={approveF} colorLine="#fff" opacity={0.2} cy={1200} />
          <Abs x={160} y={170}><Pop f={b4} from={{ x: -400, rotate: -20 }}><Polaroid src="stock/cardpay.jpg" w={600} h={420} rot={-4} caption="결제 금액 확인" /></Pop></Abs>
          <Abs x={1000} y={300}><Pop f={approveF} from={{ scale: 0.2 }}>
            <div style={{ width: 640, height: 200, borderRadius: 40, background: PK, border: `10px solid ${color.ink}`, boxShadow: `0 ${approveF > 8 ? 6 : 18}px 0 ${color.ink}`, transform: `translateY(${approveF > 8 && approveF < 14 ? 12 : 0}px)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F, fontWeight: 900, fontSize: 84, color: PK_INK }}>✓ 승인</div>
          </Pop></Abs>
          <Burst f={approveF - 8} x={1320} y={400} r={260} c="#fff" />
          <Abs x={980} y={620}><Stamp f={approveF - 16} bg={color.accent} fg={color.ink} size={70} rot={-4}>결제는 사장님 승인 후!</Stamp></Abs>
        </Camera>
        <StockTag style={{ left: 30, bottom: 30 }} />
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S07 ② 행정서류 ───────── */
export const E4S07: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("예전에는", 9.9);
  const b3 = useCue("이제는 피클에게", 17.0);
  const b4 = useCue("피클의 공식 안내", 26.0);
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      {/* ⑧ 클로즈업: 서류 */}
      <Beat f={b1} len={b1 - b2} inT="whip" outT="whip">
        <Camera start={0} keys={[{ f: 0, zoom: 1.25, rot: 3 }, { f: 280, zoom: 1.08, rot: 0 }]}>
          <PhotoBg src="stock/documents.jpg" blur={1} tint="rgba(27,37,65,0.25)" tag={false} />
          {["주민등록등본", "사업 관련 증명서"].map((t, i) => (
            <Abs key={t} x={300 + i * 700} y={360}><Pop f={b1 - 40 + i * 40} from={{ y: 300, rotate: 20 }}>
              <div style={{ width: 520, background: "#fff", border: `7px solid ${color.ink}`, borderRadius: 16, padding: "26px 30px", boxShadow: ui.shadow(14), fontFamily: F, transform: `rotate(${i ? 4 : -4}deg)` }}>
                <div style={{ fontSize: 52, fontWeight: 900 }}>📄 {t}</div>
                {[90, 70, 80].map((w, k) => <div key={k} style={{ marginTop: 14, height: 16, width: `${w}%`, background: "#E9EDF5", borderRadius: 8 }} />)}
              </div>
            </Pop></Abs>
          ))}
        </Camera>
        <Abs x={80} y={70}><Section f={b1} n="2" label="각종 행정서류" /></Abs>
        <StockTag style={{ right: 30, bottom: 30 }} />
      </Beat>
      {/* ⑦ 하이앵글: 예전 — 주민센터 방문 / 정부 사이트 헤매기 */}
      <Beat f={b2} len={b2 - b3} inT="whip" outT="zoom">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.2, rx: 10 }, { f: 220, zoom: 1.08, rx: 10 }]} handheld={0.8}>
          <div style={{ position: "absolute", inset: -500, background: "#E4E1DA", filter: "saturate(0.4)" }} />
          <Abs x={160} y={170}><Pop f={b2 - 10} from={{ y: -300 }}><Card bg="#F1EEE6" style={{ padding: 30, width: 520, textAlign: "center" }}><div style={{ fontSize: 120 }}>🏛</div><div style={{ fontSize: 50, fontWeight: 900 }}>주민센터 방문</div><div style={{ fontSize: 34, fontWeight: 800, color: "#8B8B8B" }}>번호표 · 대기…</div></Card></Pop></Abs>
          <Abs x={1100} y={150}><Pop f={b2 - 50} from={{ y: -300 }}>
            <div style={{ width: 660, background: "#fff", border: `7px solid ${color.ink}`, borderRadius: 22, overflow: "hidden", boxShadow: ui.shadow(12), fontFamily: F }}>
              <div style={{ display: "flex", gap: 4, background: "#E4E8F1", padding: "10px 10px 0" }}>{["정부24", "홈택스", "민원…", "인증…", "+"].map((t, i) => <div key={i} style={{ flex: 1, background: i === 3 ? "#fff" : "#CBD3E1", borderRadius: "10px 10px 0 0", padding: "8px 6px", fontSize: 22, fontWeight: 800, textAlign: "center" }}>{t}</div>)}</div>
              <div style={{ padding: 26, fontSize: 40, fontWeight: 900 }}>어디서 발급하지? 🤔<div style={{ marginTop: 10, fontSize: 28, color: "#8B8B8B" }}>메뉴 찾기 · 로그인 · 본인인증</div></div>
            </div>
          </Pop></Abs>
          <Abs x={760} y={520}><BossActor size={420} enter="none" poses={[{ f: 0, pose: "think", expression: "think" }, { f: frame - b2 + 70, pose: "facepalm", expression: "tired" }]} /></Abs>
        </Camera>
        <Abs x={80} y={60}><Card bg="#FFE4E4" style={{ padding: "8px 26px", fontSize: 44, fontWeight: 900 }}>예전에는 😓</Card></Abs>
      </Beat>
      {/* ① 1인칭: 피클에게 발급 준비 부탁 */}
      <Beat f={b3} len={b3 - b4} inT="zoom" outT="whip">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.08, ry: -10 }, { f: 200, zoom: 1.0, ry: -4 }]}>
          <PhotoBg src="stock/printer.jpg" blur={8} tint="rgba(246,248,252,0.45)" tag={false} />
          <Abs x={160} y={50}><Phone3D scale={1.15} ry={12}><AppScreen tab={null}><ChatThread f={b3} msgs={[{ from: "me", text: "사업 관련 증명서가 필요해. 어디서 발급되는지 알아보고 온라인 신청 절차 진행해줘", at: 10 }, { from: "pk", node: <DocsChecklist f={b3 - 60} />, at: 60 }]} typing={{ at: 36, until: 60 }} /></AppScreen></Phone3D></Abs>
          <Abs x={760} y={160}><KText f={b3 - 6} text="발급처 확인부터" size={72} /></Abs>
          <Abs x={760} y={270}><KText f={b3 - 24} text="온라인 신청 절차까지" size={72} color={PK_DARK} /></Abs>
          <Abs x={760} y={420}><Pop f={b3 - 90} from={{ x: 200 }}><Card bg="#FFF3D6" style={{ padding: "14px 26px", fontSize: 36, fontWeight: 800 }}>🔐 본인인증·발급 가능 범위는<br />기관·서류마다 달라요</Card></Pop></Abs>
          <Abs x={1440} y={600}><BossActor size={420} enter="popUp" enterAt={frame - b3 + 30} poses={[{ f: 0, pose: "happy", expression: "joy" }]} /></Abs>
        </Camera>
        <StockTag style={{ left: 30, bottom: 30 }} />
      </Beat>
      {/* ② 정면: 공식 안내 인용 */}
      <Beat f={b4} len={100000} inT="whip">
        <Camera start={frame - b4} keys={[{ f: 0, zoom: 1.1 }, { f: 160, zoom: 1.0 }]}>
          <PickleBg />
          <Abs x={140} y={200}><Pop f={b4} from={{ y: 200 }}>
            <Card style={{ width: 1050, padding: "36px 44px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 40, fontWeight: 900, color: PK_DARK }}><BrandIcon id="pickle" size={60} /> 피클 공식 안내의 활용 사례</div>
              <div style={{ fontSize: 58, fontWeight: 900, lineHeight: 1.35, marginTop: 20 }}>"정부 사이트에서 서류를 요청하거나<br />신청서를 제출하는 업무"</div>
              <div style={{ fontSize: 26, color: "#6B737B", fontWeight: 700, marginTop: 16 }}>출처: pickle.com 도움말 · 촬영 시점 기준</div>
            </Card>
          </Pop></Abs>
          <Abs x={1300} y={420}><Bust f={b4 - 8} pose="present" expression="smile" size={680} /></Abs>
        </Camera>
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S08 ③ 물품 구매 ───────── */
export const E4S08: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("그런데 매번 쇼핑몰", 9.2);
  const b3 = useCue("이럴 때 피클에게 이렇게", 13.3);
  const b4 = useCue("이렇게 원하는 조건", 23.6);
  const Q = "우리 가게에서 사용할 종이컵 1,000개가 필요해. 배송비까지 포함해서 저렴한 제품을 찾아줘.";
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      {/* ③ 와이드: 창고 속으로 돌진 */}
      <Beat f={b1} len={b1 - b2} inT="whip" outT="whip">
        <Parallax start={0} keys={[{ f: 0, x: 0, y: 0 }, { f: 260, x: 0.4, y: -0.2 }]}>
          <Layer depth={0.2} blur={0}><div style={{ position: "absolute", inset: 0, transform: `scale(${1 + frame * 0.0015})` }}><PhotoBg src="stock/warehouse.jpg" blur={1} tint="rgba(27,37,65,0.3)" tag={false} /></div></Layer>
          <Layer depth={0.7}>
            {[["📦", "포장 용기"], ["🧽", "청소용품"], ["🥤", "종이컵"]].map(([e, t], i) => <Abs key={t} x={260 + i * 500} y={420 + (i % 2) * 70}><Pop f={b1 - 30 + i * 14} from={{ scale: 0.2, y: -200 }}><TaskChip icon={e} t={t} size={52} /></Pop></Abs>)}
          </Layer>
          <Layer depth={1.3} blur={0}><Abs x={1380} y={640}><Pop f={b1 - 50} from={{ x: 400, rotate: 20 }}><PhotoCard src="stock/cleaningspray.jpg" w={360} h={230} rot={6} /></Pop></Abs></Layer>
        </Parallax>
        <Abs x={80} y={70}><Section f={b1} n="3" label="물품 구매" /></Abs>
        <StockTag style={{ left: 30, bottom: 30 }} />
      </Beat>
      {/* ⑦ 하이앵글: 쇼핑몰 탭이 부채꼴로 쏟아짐 */}
      <Beat f={b2} len={b2 - b3} inT="whip" outT="zoom">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.15, rx: 16 }, { f: 140, zoom: 1.0, rx: 16 }]}>
          <PhotoBg src="stock/shoponline.jpg" blur={8} tint="rgba(27,37,65,0.45)" tag={false} />
          {Array.from({ length: 7 }, (_, i) => (
            <Abs key={i} x={560} y={300}><Pop f={b2 + i * 4} from={{ scale: 0.3, y: 300 }}>
              <div style={{ width: 760, height: 460, background: "#fff", border: `7px solid ${color.ink}`, borderRadius: 22, boxShadow: ui.shadow(10), transform: `rotate(${(i - 3) * 9}deg) translateY(${Math.abs(i - 3) * 20}px)`, transformOrigin: "50% 150%", fontFamily: F, overflow: "hidden" }}>
                <div style={{ height: 56, background: ["#03C75A", "#FF5A5F", "#4F7BFF", "#FFB800", "#8A5CF6", "#00B8D9", "#FF7A45"][i], borderBottom: `5px solid ${color.ink}` }} />
                <div style={{ padding: 20, fontSize: 34, fontWeight: 900 }}>쇼핑몰 {i + 1} · 종이컵 검색<div style={{ marginTop: 10, fontSize: 28, color: "#8B8B8B" }}>가격 · 배송비 · 수량…</div></div>
              </div>
            </Pop></Abs>
          ))}
          <Abs x={140} y={700}><ReactionBubble f={b2 - 30} expression="tired" size={300} bg="#FFB4B4" /></Abs>
        </Camera>
        <Center y={60}><Card bg="#FFE4E4" style={{ padding: "8px 30px", fontSize: 50, fontWeight: 900 }}>매번 가격 비교도 일이에요</Card></Center>
        <StockTag style={{ right: 30, bottom: 30 }} />
      </Beat>
      {/* ① 1인칭: 따옴표 부탁 */}
      <Beat f={b3} len={b3 - b4} inT="zoom" outT="whip">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.1, rx: 8 }, { f: 30, zoom: 1.0, rx: 3 }]} handheld={1.3}>
          <PickleBg />
          <Abs x={1110} y={40}><Phone3D scale={1.12} rx={6} ry={-8}><AppScreen tab={null}><ChatThread f={b3} msgs={[{ from: "me", text: Q, at: 100 }, { from: "pk", text: "좋아요! 배송비 포함 가격으로 비교해 드릴게요 📦", at: 150 }]} typing={{ at: 120, until: 150 }} /><InputBar text={b3 < 106 ? Q : ""} f={b3 - 10} dur={90} /></AppScreen></Phone3D></Abs>
          <Abs x={90} y={250}><Quote f={b3 - 4} t={Q} w={900} /></Abs>
          <PovHands mode="hold" />
        </Camera>
      </Beat>
      {/* ④ 어깨 너머 → 비교표 */}
      <Beat f={b4} len={100000} inT="whip">
        <Camera start={frame - b4} keys={[{ f: 0, zoom: 1.0, x: 80 }, { f: 220, zoom: 1.06, x: 30 }]}>
          <Light />
          <Abs x={500} y={130} style={{ transform: "perspective(1600px) rotateY(-8deg)" }}><Pop f={b4} from={{ x: 400, rotateY: -40 }}><CompareTable f={b4} w={1180} /></Pop></Abs>
          <Abs x={1440} y={700}><Pop f={b4 - 70} from={{ y: 300, rotate: 15 }}><PhotoCard src="stock/deliverybox.jpg" w={300} h={190} rot={5} label="결정은 사장님" /></Pop></Abs>
          <Abs x={-180} y={430} style={{ filter: "blur(1.5px)" }}><Pop f={b4} from={{ x: -300 }} bouncy={false}><BossBack size={900} turn={6} /></Pop></Abs>
        </Camera>
        <StockTag style={{ left: 30, bottom: 30 }} />
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S09 ④ 홍보 ───────── */
export const E4S09: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("하지만 막상", 8.6);
  const b3 = useCue("이런 때에는 피클에게", 17.5);
  const b4 = useCue("할인 이벤트를", 28.7);
  const Q = "이번 주말 할인 이벤트를 진행할 거니까, 손님에게 알릴 문구를 정리하고 홍보 일정을 만들어줘";
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      {/* ⑥ 로우앵글: SNS 사진 + 브랜드 배지 */}
      <Beat f={b1} len={b1 - b2} inT="whip" outT="zoom">
        <Camera start={0} keys={[{ f: 0, zoom: 1.2, rx: -14 }, { f: 220, zoom: 1.04, rx: -10 }]}>
          <PhotoBg src="stock/snsfeed.jpg" blur={2} tint="rgba(27,37,65,0.3)" tag={false} />
          <Abs x={330} y={420}><Pop f={b1 - 40} from={{ y: 300, rotate: -15 }}><BrandBadge id="instagram" size={110} tone="solid" /></Pop></Abs>
          <Abs x={1060} y={520}><Pop f={b1 - 52} from={{ y: 300, rotate: 15 }}><BrandBadge id="naverBlog" size={110} tone="solid" label="블로그" /></Pop></Abs>
          <Center y={800}><Pop f={b1 - 70} from={{ y: 100 }}><Card style={{ padding: "8px 30px", fontSize: 46, fontWeight: 900 }}>꾸준히 가게 소식 올리기 📣</Card></Pop></Center>
        </Camera>
        <Abs x={80} y={70}><Section f={b1} n="4" label="홍보 업무" /></Abs>
        <StockTag style={{ right: 30, bottom: 30 }} />
      </Beat>
      {/* ⑧ 클로즈업: 머리 위 고민 3개 */}
      <Beat f={b2} len={b2 - b3} inT="zoom" outT="whip">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.25 }, { f: 240, zoom: 1.12 }]}>
          <Light />
          <Abs x={560} y={300}><Boss pose="think" expression="think" crop="head" size={800} /></Abs>
          {["무엇을 올리지?", "문구는 어떻게?", "언제 올리지?"].map((t, i) => {
            const a = (b2) * 0.035 + (i * Math.PI * 2) / 3;
            return <Abs key={t} x={900 + Math.cos(a) * 560 - 180} y={300 + Math.sin(a) * 150 - 40}><Pop f={b2 - 10 + i * 30} from={{ scale: 0 }}><Card bg={["#FFE08A", "#DCE9FF", "#FFD9C2"][i]} style={{ padding: "12px 26px", fontSize: 44, fontWeight: 900, whiteSpace: "nowrap" }}>{t}</Card></Pop></Abs>;
          })}
        </Camera>
      </Beat>
      {/* ① 1인칭: 홍보 부탁 */}
      <Beat f={b3} len={b3 - b4} inT="whip" outT="whip">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.1, rx: 8 }, { f: 30, zoom: 1.0, rx: 3 }]} handheld={1.3}>
          <PhotoBg src="stock/calendarcoffee.jpg" blur={9} tint="rgba(246,248,252,0.45)" tag={false} />
          <Abs x={120} y={40}><Phone3D scale={1.12} rx={6} ry={8}><AppScreen tab={null}><ChatThread f={b3} msgs={[{ from: "me", text: Q, at: 100 }]} /><InputBar text={b3 < 106 ? Q : ""} f={b3 - 10} dur={90} /></AppScreen></Phone3D></Abs>
          <Abs x={700} y={240}><Quote f={b3 - 4} t={Q} w={1050} /></Abs>
          <PovHands mode="hold" />
        </Camera>
        <StockTag style={{ right: 30, bottom: 30 }} />
      </Beat>
      {/* ⑤ 스카이뷰: 세일 태그 사진 위 결과 */}
      <Beat f={b4} len={100000} inT="whip">
        <Camera start={frame - b4} keys={[{ f: 0, zoom: 1.0, rx: 30 }, { f: 140, zoom: 1.05, rx: 22 }]}>
          <PhotoBg src="stock/saletags.jpg" blur={3} tint="rgba(27,37,65,0.35)" tag={false} />
          <Abs x={640} y={60}><Phone3D scale={1.15}><AppScreen tab={null}><ChatThread f={b4} msgs={[{ from: "pk", node: <PromoResult f={b4 - 6} />, at: 4 }]} /></AppScreen></Phone3D></Abs>
          <Abs x={1240} y={300}><Pop f={b4 - 40} from={{ x: 200 }}><Card bg={color.accent} style={{ padding: "12px 26px", fontSize: 42, fontWeight: 900 }}>문구 + 일정 준비 완료</Card></Pop></Abs>
          <Abs x={1240} y={440}><Pop f={b4 - 60} from={{ x: 200 }}><Card style={{ padding: "12px 26px", fontSize: 36, fontWeight: 800 }}>📲 올리는 건 사장님이 확인 후</Card></Pop></Abs>
          <Abs x={60} y={560}><BossActor size={420} enter="jump" enterAt={frame - b4 + 20} poses={[{ f: 0, pose: "cheer", expression: "joy" }]} /></Abs>
        </Camera>
        <StockTag style={{ left: 30, top: 30 }} />
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S10 ⑤ 전화 ───────── */
export const E4S10: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("가게 장비가", 6.5);
  const b3 = useCue("이럴 때는 피클에게 출장", 14.6);
  const b4 = useCue("필요한 정보를 확인", 25.1);
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      {/* ⑥ 로우앵글: 키패드 + "특히 유용" */}
      <Beat f={b1} len={b1 - b2} inT="whip" outT="zoom">
        <Camera start={0} keys={[{ f: 0, zoom: 1.25, rx: -16 }, { f: 190, zoom: 1.05, rx: -10 }]}>
          <PhotoBg src="stock/phonekeypad.jpg" blur={2} tint="rgba(27,37,65,0.35)" tag={false} />
          <Abs x={1100} y={300}><Pop f={b1 - 30} from={{ scale: 0.2 }}><div style={{ width: 300, height: 300, borderRadius: "50%", background: PK, border: `10px solid ${color.ink}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 150, boxShadow: `0 0 0 ${20 + 14 * Math.sin(frame * 0.3)}px rgba(99,211,97,0.35)` }}>📞</div></Pop></Abs>
          <Abs x={220} y={600}><Stamp f={b1 - 90} bg={color.accent} fg={color.ink} size={86} rot={-5}>자영업자에게 특히 유용!</Stamp></Abs>
        </Camera>
        <Abs x={80} y={70}><Section f={b1} n="5" label="전화 업무" /></Abs>
        <StockTag style={{ right: 30, bottom: 30 }} />
      </Beat>
      {/* ⑧ 클로즈업: 장비 고장 */}
      <Beat f={b2} len={b2 - b3} inT="zoom" outT="whip">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.3 }, { f: 200, zoom: 1.12 }]} shake={impact(b2 - 6, 22)}>
          <PhotoBg src="stock/repair.jpg" blur={1} tint="rgba(27,37,65,0.3)" tag={false} />
          <Abs x={300} y={260}><Pop f={b2 - 6} from={{ scale: 3 }}><div style={{ fontSize: 220, transform: `rotate(${Math.sin(frame * 0.8) * 6}deg)` }}>⚠️</div></Pop></Abs>
          <Abs x={900} y={300}><KText f={b2 - 10} text="장비 고장!" size={110} color="#fff" stroke /></Abs>
          <Abs x={900} y={460}><Pop f={b2 - 60} from={{ x: 200 }}><Card style={{ padding: "12px 28px", fontSize: 42, fontWeight: 900 }}>📞 업체에 직접 전화해서 문의…</Card></Pop></Abs>
        </Camera>
        <StockTag style={{ left: 30, bottom: 30 }} />
      </Beat>
      {/* ⑩ 반반: 사장님은 손님 응대 | 피클은 업체에 전화 */}
      <Beat f={b3} len={b3 - b4} inT="whip" outT="whip">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.04 }, { f: 300, zoom: 1.0 }]}>
          <div style={{ position: "absolute", inset: -300, background: "linear-gradient(135deg,#14361A,#0E2412)" }} />
          <Pop f={b3} from={{ x: -500 }} bouncy={false}><PhotoPanel src="stock/owner.jpg" w={900} label="사장님은 손님 응대" /></Pop>
          <Abs x={1180} y={30}><Pop f={b3 - 12} from={{ y: 600, rotate: 12 }}><Phone3D scale={1.18} ry={-10}><CallScreen f={b3 - 20} /></Phone3D></Pop></Abs>
          <Abs x={940} y={880}><Pop f={b3 - 30} from={{ y: 100 }}><Card bg={PK} style={{ padding: "8px 24px", fontSize: 36, fontWeight: 900, color: PK_INK }}>피클은 업체에 전화 (발신)</Card></Pop></Abs>
          <Abs x={980} y={300}><Pop f={b3 - 80} from={{ x: 200 }}><PhotoCard src="stock/technician.jpg" w={220} h={150} rot={-6} label="출장 수리" /></Pop></Abs>
        </Camera>
        <StockTag style={{ left: 30, top: 30 }} />
      </Beat>
      {/* ② 정면: 문의 요약 */}
      <Beat f={b4} len={100000} inT="zoom">
        <Camera start={frame - b4} keys={[{ f: 0, zoom: 1.12 }, { f: 100, zoom: 1.0 }]}>
          <Light />
          <Abs x={280} y={160}><Pop f={b4} from={{ scale: 0.4 }}><div style={{ transform: "scale(1.9)", transformOrigin: "0 0" }}><CallSummary f={b4} /></div></Pop></Abs>
          <Abs x={1000} y={760}><ExampleTag t="예시 · 실제 통화 결과 아님" style={{ fontSize: 26 }} /></Abs>
          <Abs x={1280} y={330}><Bust f={b4 - 6} pose="thumbsUp" expression="wink" size={640} /></Abs>
        </Camera>
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S11 정리 ───────── */
export const E4S11: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("피클에서는 필요한", 13.8);
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      {/* ⑨ 궤도 */}
      <Beat f={b1} len={b1 - b2} inT="whip" outT="zoom">
        <Camera start={0} keys={[{ f: 0, zoom: 0.92, rx: 18, rot: -4 }, { f: 400, zoom: 1.05, rx: 10, rot: 3 }]}>
          <Navy />
          <Orbit f={frame} speed={0.007} rx={640} ry={260} hub={<PickleHub f={frame} size={260} />} items={[
            <TaskChip key="1" icon="🗓" t="예약 알아보기" size={48} />, <TaskChip key="2" icon="📋" t="일정 정리" size={48} />, <TaskChip key="3" icon="📦" t="물건 주문" size={48} />, <TaskChip key="4" icon="🔁" t="반복 업무" size={48} />, <TaskChip key="5" icon="💡" t="공과금" size={48} />, <TaskChip key="6" icon="📞" t="전화 문의" size={48} />,
          ]} />
          <Center y={60}><KText f={b1 - 4} text="맡길 수 있는 일이 꽤 많아요" size={74} color="#fff" stroke /></Center>
        </Camera>
      </Beat>
      {/* ④ 타임라인 */}
      <Beat f={b2} len={100000} inT="zoom">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.0, x: -100 }, { f: 200, zoom: 1.0, x: 100 }]}>
          <Light />
          <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0 }}><line x1={200} y1={560} x2={200 + lerp(b2, 0, 60, 0, 1520)} y2={560} stroke={PK_DARK} strokeWidth={16} strokeLinecap="round" /></svg>
          {[["💬", "채팅으로 요청"], ["⏳", "진행 상황 확인"], ["✅", "결과 확인"]].map(([e, t], i) => (
            <Abs key={t} x={140 + i * 620} y={420}><Pop f={b2 - 6 + i * 22} from={{ y: 200, scale: 0.4 }}><Card bg={i === 2 ? PK : "#fff"} style={{ width: 460, padding: "26px 20px", textAlign: "center" }}><div style={{ fontSize: 100 }}>{e}</div><div style={{ fontSize: 50, fontWeight: 900 }}>{t}</div></Card></Pop></Abs>
          ))}
          <Abs x={1500} y={760}><BossActor size={360} enter="slideR" enterAt={frame - b2 + 40} poses={[{ f: 0, pose: "relax", expression: "smile" }]} /></Abs>
        </Camera>
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S12 요금제 ───────── */
export const E4S12: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("플러스", 9.7);
  const b3 = useCue("현재 요금과", 18.6);
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      {/* ③ 와이드: 저금통 */}
      <Beat f={b1} len={b1 - b2} inT="whip" outT="whip">
        <Parallax start={0} keys={[{ f: 0, x: -0.8 }, { f: 300, x: 0.8 }]}>
          <Layer depth={0.2} blur={0}><PhotoBg src="stock/piggybank.jpg" blur={2} tint="rgba(27,37,65,0.35)" tag={false} /></Layer>
          <Layer depth={0.8}>
            <Abs x={220} y={330}><Pop f={b1 - 40} from={{ y: 300 }}><Card style={{ padding: "26px 40px", fontSize: 60, fontWeight: 900 }}>📲 앱 다운로드 <span style={{ color: PK_DARK }}>무료</span></Card></Pop></Abs>
            <Abs x={720} y={560}><Pop f={b1 - 90} from={{ y: 300 }}><Card bg={color.accent} style={{ padding: "26px 40px", fontSize: 60, fontWeight: 900 }}>⚙️ 실제 작업 = 유료 요금제 제공</Card></Pop></Abs>
          </Layer>
        </Parallax>
        <Abs x={80} y={70}><Section f={b1} label="요금제" /></Abs>
        <StockTag style={{ right: 30, bottom: 30 }} />
      </Beat>
      {/* ⑥ 로우앵글: 요금제 카드 계단 */}
      <Beat f={b2} len={b2 - b3} inT="whip" outT="zoom">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.12, rx: -14 }, { f: 220, zoom: 1.0, rx: -8 }]}>
          <PickleBg />
          <Abs x={420} y={260}><PlanCards f={b2} /></Abs>
          <Center y={130}><KText f={b2 - 4} text="요금제마다 매주 쓸 수 있는 크레딧이 달라요" size={58} /></Center>
        </Camera>
      </Beat>
      {/* ① 1인칭: 내 피클 메뉴 + 사장님 경험 */}
      <Beat f={b3} len={100000} inT="zoom">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.1, rx: 8 }, { f: 30, zoom: 1.0, rx: 3 }]} handheld={1.2}>
          <Light />
          <Abs x={160} y={50}><Phone3D scale={1.12} rx={6} ry={10}>
            <AppScreen title="내 피클" tab={3}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, paddingTop: 20 }}>
                <div style={{ width: 170, height: 170, borderRadius: "50%", background: "#fff", border: "2px solid #E3E6E1", display: "flex", alignItems: "center", justifyContent: "center" }}><BrandIcon id="pickle" size={130} /></div>
                <div style={{ width: 300, background: "#fff", border: `3px solid ${PK}`, borderRadius: 18, padding: 14 }}>
                  <div style={{ fontWeight: 900, fontSize: 18 }}>이번 주 사용량</div>
                  <div style={{ marginTop: 8, height: 16, borderRadius: 8, background: "#E9EDF5", overflow: "hidden" }}><div style={{ width: `${lerp(b3, 10, 40, 0, 35)}%`, height: "100%", background: PK }} /></div>
                  <div style={{ marginTop: 10, fontWeight: 900, fontSize: 18 }}>요금제 · 크레딧 확인</div>
                </div>
              </div>
            </AppScreen>
          </Phone3D></Abs>
          <PovHands mode="hold" />
          <Abs x={760} y={170}><KText f={b3 - 6} text="요금·사용량은" size={72} /></Abs>
          <Abs x={760} y={280}><KText f={b3 - 20} text="'내 피클' 메뉴에서 확인" size={72} color={PK_DARK} /></Abs>
          <Abs x={760} y={440}><Pop f={b3 - 50} from={{ x: 200, rotate: 6 }}><Card bg={color.accent} style={{ padding: "18px 30px", fontSize: 46, fontWeight: 900 }}>💬 제 경험: 지금은 무료로도<br />사용량이 충분했어요</Card></Pop></Abs>
          <Abs x={760} y={680}><Card style={{ padding: "8px 22px", fontSize: 28, fontWeight: 800 }}>※ 촬영 시점 기준 · 요금은 앱·공식 페이지에서 확인</Card></Abs>
        </Camera>
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S13 결론 ───────── */
export const E4S13: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("제가 생각하는", 7.7);
  const b3 = useCue("사장님의 시간을 되돌려", 14.1);
  const b4 = useCue("하루 종일 가게를", 17.2);
  const b5 = useCue("여러분이라면", 31.4);
  const b6 = useCue("오늘부터 AI 사장님이었습니다", 39.4);
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      {/* ⑤ 스카이뷰: 오늘 본 것 3묶음 */}
      <Beat f={b1} len={b1 - b2} inT="whip" outT="whip">
        <Camera start={0} keys={[{ f: 0, zoom: 1.0, rx: 40 }, { f: 230, zoom: 1.06, rx: 30 }]}>
          <div style={{ position: "absolute", inset: -800, background: "#DDF2DA" }} />
          {[["📲", "가입 방법"], ["💬", "사용법"], ["🧰", "활용 5가지"]].map(([e, t], i) => (
            <Abs key={t} x={180 + i * 560} y={360}><Pop f={b1 - 8 + i * 14} from={{ y: -300, scale: 0.4 }}><Card bg={i === 2 ? PK : "#fff"} style={{ width: 460, padding: "30px 20px", textAlign: "center" }}><div style={{ fontSize: 110 }}>{e}</div><div style={{ fontSize: 56, fontWeight: 900 }}>{t}</div></Card></Pop></Abs>
          ))}
        </Camera>
        <Center y={60}><KText f={b1} text="오늘 살펴본 것" size={80} /></Center>
      </Beat>
      {/* ② 정면 */}
      <Beat f={b2} len={b2 - b3} inT="whip" outT="zoom">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.1 }, { f: 200, zoom: 1.0 }]}>
          <Light />
          <Abs x={140} y={220}><Bust f={b2} pose="point" expression="talk" size={840} /></Abs>
          <Abs x={1040} y={260}><KText f={b2 - 10} text="AI 비서의 진짜 가치는" size={72} /></Abs>
          <Abs x={1040} y={380}><Pop f={b2 - 40} from={{ x: 200 }}><div style={{ position: "relative", fontFamily: F, fontWeight: 900, fontSize: 72, color: "#8B8B8B" }}>단순히 편리함?<div style={{ position: "absolute", left: -6, right: -6, top: "50%", height: 12, background: "#FF4D4F", width: `${lerp(b2 - 70, 0, 10, 0, 105)}%` }} /></div></Pop></Abs>
        </Camera>
      </Beat>
      {/* ⑧→③ 시계 되감기 */}
      <Beat f={b3} len={b3 - b4} inT="zoom" outT="whip">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.45 }, { f: 40, zoom: 1.0 }]}>
          <PickleBg />
          <Center y={130}><PhotoClock size={640} turns={-(b3) / 6} /></Center>
          {["💡", "📄", "📦", "📣", "📞"].map((e, i) => {
            const t = b3 - 10 - i * 6;
            const ang = (i / 5) * Math.PI * 2;
            return <Abs key={i} x={960 + Math.cos(ang) * lerp(t, 0, 24, 520, 0) - 50} y={450 + Math.sin(ang) * lerp(t, 0, 24, 380, 0) - 50} style={{ opacity: lerp(t, 18, 24, 1, 0) }}><div style={{ fontSize: 100 }}>{e}</div></Abs>;
          })}
          <Center y={820}><Pop f={b3 - 30} from={{ y: 120, scale: 0.5 }}><Card bg={color.accent} style={{ padding: "12px 40px", fontSize: 64, fontWeight: 900 }}>⏰ 사장님의 시간을 되돌려준다</Card></Pop></Center>
          <Sparkles f={b3 - 34} x={960} y={450} spread={600} />
        </Camera>
        <StockTag style={{ left: 30, bottom: 30 }} />
      </Beat>
      {/* ⑥ 로우앵글: 여유를 되찾은 사장님 */}
      <Beat f={b4} len={b4 - b5} inT="whip" outT="zoom">
        <Parallax start={frame - b4} keys={[{ f: 0, x: 0.8 }, { f: 400, x: -0.8 }]}>
          <Layer depth={0.2} blur={0}><PhotoBg src="stock/relaxed.jpg" blur={3} tint="rgba(27,37,65,0.3)" tag={false} /></Layer>
          <Layer depth={0.6}><Abs x={1180} y={230}><Pop f={b4 - 120} from={{ x: 300, rotate: 15 }}><Polaroid src="stock/coffeecheers.jpg" w={460} h={300} rot={6} caption="중요한 일에 집중" /></Pop></Abs></Layer>
          <Layer depth={0.9}><Abs x={240} y={330} style={{ transform: "perspective(1000px) rotateX(12deg)", transformOrigin: "50% 100%" }}><BossActor size={700} enter="popUp" enterAt={frame - b4 + 10} poses={[{ f: 0, pose: "holdMug", expression: "smile" }, { f: frame - b4 + 240, pose: "cheer", expression: "starstruck" }]} /></Abs></Layer>
        </Parallax>
        <Abs x={80} y={70}><KText f={b4 - 4} text="가장 부족한 건 시간" size={78} color="#fff" stroke /></Abs>
        <Abs x={80} y={180}><KText f={b4 - 200} text="작은 일부터 하나씩 AI에게" size={66} color={color.accent} stroke /></Abs>
        <StockTag style={{ right: 30, bottom: 30 }} />
      </Beat>
      {/* ② 정면: 댓글 */}
      <Beat f={b5} len={b5 - b6} inT="zoom" outT="zoom">
        <Camera start={frame - b5} keys={[{ f: 0, zoom: 1.06 }, { f: 200, zoom: 1.0 }]}>
          <Light />
          <Abs x={110} y={100}><KText f={b5} text="가장 먼저 맡기고 싶은 일은?" size={74} /></Abs>
          {CASES.map((_, i) => <Abs key={i} x={110 + (i % 3) * 360} y={260 + Math.floor(i / 3) * 290}><Pop f={b5 - 10 + i * 5} from={{ y: 100, scale: 0.4 }}><CaseCard i={i} w={290} /></Pop></Abs>)}
          <Abs x={1220} y={800}><Pop f={b5 - 50} from={{ x: 200 }}><Card bg={color.sub} style={{ padding: "14px 26px", fontSize: 38, fontWeight: 800 }}>💬 댓글로 업종과 함께!</Card></Pop></Abs>
          <Abs x={1300} y={200}><Bust f={b5 - 6} pose="point" expression="talk" size={600} /></Abs>
        </Camera>
        <StockTag style={{ right: 30, bottom: 30 }} />
      </Beat>
      {/* ③→⑤ 엔딩: 로고 + 크레인 업 */}
      <Beat f={b6} len={100000} inT="zoom">
        <Camera start={frame - b6} keys={[{ f: 0, zoom: 1.0, rx: 0, y: 0 }, { f: 30, zoom: 1.0 }, { f: 90, zoom: 1.12, rx: 14, y: -40 }]}>
          <PhotoBg src="stock/shopinterior.jpg" blur={4} tag={false} />
          <Abs x={420} y={330}><BossActor size={560} enter="jump" enterAt={frame - b6} poses={[{ f: 0, pose: "wave", expression: "joy" }]} /></Abs>
          <Abs x={1080} y={420}><Pop f={b6 - 10} from={{ scale: 0 }}><div style={{ filter: "drop-shadow(10px 10px 0 rgba(14,42,18,0.8))", transform: `translateY(${floatY(frame, 10, 0.12)}px)` }}><BrandIcon id="pickle" size={300} /></div></Pop></Abs>
          <Center y={40}><Pop f={b6 - 8} from={{ y: -150, scale: 0.4 }}><div style={{ display: "flex", alignItems: "center", gap: 20, background: "#fff", border: `7px solid ${color.ink}`, borderRadius: 30, padding: "14px 30px", boxShadow: ui.shadow(10) }}><TodayCalendar size={90} /><Wordmark size={56} /></div></Pop></Center>
          <Confetti f={b6 - 10} x={960} y={200} n={50} />
        </Camera>
        <StockTag style={{ left: 30, bottom: 30 }} />
      </Beat>
    </AbsoluteFill>
  );
};

export const _unused = { ExperimentTag, TabBar, PK };
