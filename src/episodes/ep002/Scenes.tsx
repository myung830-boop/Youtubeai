import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ExperimentTag, GridBg, Wordmark } from "../../components/brand";
import { LovableBadge } from "../../components/scenes";
import { AiCursor, AsideBadge, AsideWindow, ASIDE_GRADIENT, ASIDE_PURPLE } from "../../components/aside";
import { BossActor, ReactionBubble } from "../../motion/BossActor";
import { Burst, Camera, clamp01, easeInOut, floatY, impact, KText, lerp, MarkSweep, Pop, Sparkles, SpeedLines, Stamp, useCue } from "../../motion/core";
import { Confetti, Cursor, PersonIcon, TypeText } from "../../motion/props";
import { Beat, Flash } from "../../motion/transitions";
import { BrandBadge, BrandIcon, BRANDS, brandBg } from "../../brands/registry";
import { color, font, ui } from "../../styles/theme";
import { CustomerAppScreen } from "../ep001/mockups";
import { BlogEditor, FeedPost, ParcelSite } from "./mockups";

const Abs: React.FC<{ x: number; y: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ x, y, children, style }) => <div style={{ position: "absolute", left: x, top: y, ...style }}>{children}</div>;
const Card: React.FC<{ children: React.ReactNode; bg?: string; style?: React.CSSProperties }> = ({ children, bg = "#fff", style }) => (
  <div style={{ background: bg, border: `7px solid ${color.ink}`, borderRadius: 32, boxShadow: ui.shadow(12), fontFamily: font.family, ...style }}>{children}</div>
);
const DarkBg: React.FC = () => (
  <>
    <div style={{ position: "absolute", inset: -800, background: "#14123A" }} />
    <div style={{ position: "absolute", inset: -800, background: "repeating-conic-gradient(from 0deg at 50% 50%, rgba(124,92,255,0.12) 0deg 8deg, transparent 8deg 16deg)" }} />
  </>
);
const Mug: React.FC<{ size?: number }> = ({ size = 120 }) => {
  const f = useCurrentFrame();
  return (
    <svg viewBox="0 0 60 64" width={size} height={size * 1.07}>
      {[18, 28, 38].map((x, i) => <path key={x} d={`M${x},${12 - ((f + i * 7) % 20) * 0.3} q-4,6 0,10`} fill="none" stroke="#B8C2D6" strokeWidth={3} strokeLinecap="round" />)}
      <path d="M6,18 L46,18 L42,58 Q42,62 38,62 L14,62 Q10,62 10,58 Z" fill="#fff" stroke={color.ink} strokeWidth={4} strokeLinejoin="round" />
      <path d="M46,26 Q58,26 56,38 Q54,48 43,46" fill="none" stroke={color.ink} strokeWidth={5} />
      <rect x={14} y={30} width={24} height={12} rx={3} fill={color.accent} stroke={color.ink} strokeWidth={2.5} />
    </svg>
  );
};
/** 섹션 제목 칩: "① 택배 발송" */
const Section: React.FC<{ f: number; n: string; label: string; emoji: React.ReactNode }> = ({ f, n, label, emoji }) => (
  <Pop f={f} from={{ x: -300, rotate: -12, scale: 0.4 }}>
    <div style={{ display: "inline-flex", alignItems: "center", gap: 18, background: "#fff", border: `7px solid ${color.ink}`, borderRadius: 999, padding: "10px 40px 10px 12px", boxShadow: ui.shadow(10), fontFamily: font.family, fontWeight: 900, fontSize: 60 }}>
      <div style={{ width: 86, height: 86, borderRadius: "50%", background: ASIDE_GRADIENT, color: "#fff", border: `6px solid ${color.ink}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 50 }}>{n}</div>
      {emoji} {label}
    </div>
  </Pop>
);
/** AI 커서 경로 이동: points 사이를 각 seg 프레임씩 이동 */
const pathAt = (f: number, pts: Array<[number, number]>, seg = 16): [number, number] => {
  if (f <= 0) return pts[0];
  const i = Math.min(pts.length - 2, Math.floor(f / seg));
  const t = interpolate(f - i * seg, [0, seg * 0.7], [0, 1], { ...clamp01, easing: easeInOut });
  return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * t, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * t];
};

/* ───────── S01 훅 ───────── */
export const E2S01: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const five = useCue("5분이면", 2.0);
  const b2 = useCue("택배 접수", 4.6);
  const b3 = useCue("보여드릴게요", 9.0);
  const cur = pathAt(b2 - 4, [[300, 300], [1050, 330], [480, 650], [1180, 640], [700, 380]], 18);
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Beat f={b1} len={b1 - b2} inT="cut" outT="whip">
        <Camera start={0} keys={[{ f: 0, zoom: 1.3 }, { f: 20, zoom: 1.0 }, { f: frame - five, zoom: 1.0 }, { f: frame - five + 6, zoom: 1.15 }]} shake={impact(five - 2, 30)}>
          <DarkBg />
          <SpeedLines f={five} colorLine="#C4B5FD" opacity={five >= 0 ? 0.18 : 0} />
          <Abs x={0} y={150} style={{ width: 1920, display: "flex", justifyContent: "center" }}><KText f={b1} text="하루 2시간 걸리던 일이" size={84} color={color.white} /></Abs>
          <Abs x={0} y={300} style={{ width: 1920, display: "flex", justifyContent: "center" }}>
            <Pop f={five} from={{ scale: 4 }}>
              <div style={{ background: color.accent, border: `10px solid ${color.ink}`, borderRadius: 30, padding: "0 50px 16px", fontFamily: font.family, fontWeight: 900, fontSize: 260, letterSpacing: "-0.05em", boxShadow: ui.shadow(16), transform: "rotate(-3deg)" }}>5분 컷!</div>
            </Pop>
          </Abs>
          <Burst f={five} x={960} y={470} r={300} />
          <Sparkles f={five + 4} x={960} y={470} spread={640} />
          {five < 0 && <Abs x={70} y={520}><ReactionBubble f={b1 - 4} expression="tired" size={440} bg="#C4B5FD" tilt={-6} /></Abs>}
          <Abs x={1420} y={480}><BossActor size={620} enter="popUp" enterAt={frame - five} poses={[{ f: 0, pose: "cheer", expression: "starstruck" }]} hops={[frame - five + 14]} /></Abs>
        </Camera>
        <Flash f={five} />
      </Beat>
      <Beat f={b2} len={b2 - b3} inT="whip" outT="zoom">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.08 }, { f: 120, zoom: 1.0 }]}>
          <GridBg tone="light" cell={60} bleed />
          {[["택배 접수", "parcel.example.com", 120, 170, -4], ["블로그 글쓰기", "blog.naver.com", 860, 140, 3], ["새 게시물", "instagram.com", 300, 560, 2]].map(([tab, url, x, y, r], i) => (
            <Abs key={tab as string} x={x as number} y={(y as number) + floatY(frame, 8, 0.08, i * 2)} style={{ transform: `rotate(${r}deg)` }}>
              <Pop f={b2 + 2 - i * 6} from={{ y: 400, scale: 0.4, rotate: (r as number) * 5 }}>
                <AsideWindow w={760} h={360} url={url as string} tab={tab as string} status={["택배 입력 중…", "글 쓰는 중…", "피드 올리는 중…"][i]}>
                  <div style={{ transform: "scale(0.6)", transformOrigin: "0 0", width: "166%", height: "166%", position: "relative" }}>
                    {i === 0 ? <ParcelSite filled={Math.min(5, Math.floor(Math.max(0, b2) / 10))} count={3} /> : i === 1 ? <BlogEditor title="운동화 세탁 후기" body="오늘 맡겨주신 운동화가 새것처럼 깨끗해졌어요." typed={Math.floor(Math.max(0, b2 - 10) * 0.8)} photo={b2 > 30} /> : <FeedPost step={b2 > 40 ? 1 : 0} caption="세탁 전후 비교 ✨ #신발세탁" typed={Math.floor(Math.max(0, b2 - 40) * 0.6)} />}
                  </div>
                </AsideWindow>
              </Pop>
            </Abs>
          ))}
          <AiCursor x={cur[0]} y={cur[1]} scale={1.2} />
          <Abs x={1360} y={520}>
            <div style={{ position: "relative" }}>
              <BossActor size={600} enter="walkR" enterAt={frame - b2} poses={[{ f: 0, pose: "holdMug", expression: "smug", tilt: -8 }, { f: frame - b2 + 70, pose: "relax", expression: "smug", tilt: 6 }]} />
            </div>
          </Abs>
          <Abs x={1180} y={90}><Pop f={b2 + 30} from={{ scale: 0, rotate: 20 }}><Card bg={color.accent} style={{ padding: "16px 34px", fontSize: 50, fontWeight: 900, transform: "rotate(5deg)" }}>저는 말만 했어요 ☕</Card></Pop></Abs>
        </Camera>
      </Beat>
      <Beat f={b3} len={100000} inT="zoom">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.3 }, { f: 14, zoom: 1.0 }, { f: 90, zoom: 1.06 }]} shake={impact(b3 - 8, 22)}>
          <DarkBg />
          <Abs x={0} y={280} style={{ width: 1920, display: "flex", justifyContent: "center" }}><Pop f={b3} from={{ scale: 0, rotate: -30 }}><AsideBadge size={150} /></Pop></Abs>
          <Abs x={0} y={560} style={{ width: 1920, display: "flex", justifyContent: "center" }}><KText f={b3 + 10} text="AI 브라우저" size={110} color="#C4B5FD" stroke /></Abs>
          <Abs x={140} y={110}><Pop f={b3 + 18} from={{ x: -200 }}><ExperimentTag no={2} size={44} /></Pop></Abs>
          <Burst f={b3 + 2} x={960} y={360} r={320} c={ASIDE_PURPLE} />
          <Abs x={1420} y={560}><BossActor size={560} enter="peekR" enterAt={frame - b3 + 6} poses={[{ f: 0, pose: "present", expression: "talk", look: [-6, 0] }]} /></Abs>
          <Sparkles f={b3 + 4} x={960} y={360} spread={700} />
        </Camera>
        <Flash f={b3} c="#C4B5FD" />
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S02 남은 고민 ───────── */
export const E2S02: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("다른 사이트에서", 3.0);
  const t1 = useCue("택배 사이트에 들어가서", 8.2);
  const t2 = useCue("네이버 블로그에 글", 12.0);
  const t3 = useCue("인스타 피드까지 올리고", 14.0);
  const b3 = useCue("인터넷 작업만", 16.2);
  const tabs: Array<[number, React.ReactNode, string, string]> = [[Math.max(t1, b2 - 20), "📦", "택배 사이트", "#fff"], [t2, <BrandIcon key="n" id="naverBlog" size={84} />, "네이버 블로그", "#E9FBF0"], [t3, <BrandIcon key="i" id="instagram" size={84} />, "인스타그램", "#FFF0F6"]];
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      <Beat f={b1} len={b1 - b2} inT="whip" outT="whip">
        <Camera start={frame - b1} keys={[{ f: 0, zoom: 1.15 }, { f: 70, zoom: 1.0 }]}>
          <GridBg tone="light" cell={60} bleed />
          <Abs x={140} y={150}><KText f={b1} text="지난 영상에서 만든" size={70} /></Abs>
          <Abs x={140} y={250}><KText f={b1 - 10} text="가게 시스템" size={130} color={color.main} /></Abs>
          <Abs x={260} y={460}><Pop f={b1 + 10} from={{ x: -200 }}><LovableBadge size={60} /></Pop></Abs>
          <Abs x={980} y={110} style={{ transform: "rotate(5deg)" }}><Pop f={b1 + 4} from={{ y: 500, rotateY: 50 }}><CustomerAppScreen w={360} /></Pop></Abs>
          <Abs x={940} y={560}><Stamp f={b1 + 30} bg="#22C55E" size={74} rot={-8}>✓ 완성</Stamp></Abs>
          <Abs x={1440} y={420}><BossActor size={560} enter="spin" enterAt={frame - b1} poses={[{ f: 0, pose: "present", expression: "smug" }]} /></Abs>
        </Camera>
      </Beat>
      <Beat f={b2} len={b2 - b3} inT="whip" outT="zoom">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.0 }, { f: b2 - b3, zoom: 1.12 }]} shake={2}>
          <GridBg tone="light" cell={60} bleed />
          <Abs x={120} y={110}><KText f={b2} text="그런데 아직 손이 가는 일" size={76} /></Abs>
          {tabs.map(([f, e, t, bg], i) => (
            <Abs key={t} x={180 + i * 110} y={300 + i * 120}>
              <Pop f={f} from={{ x: 700, rotate: 20, scale: 0.5 }}>
                <div style={{ width: 900, height: 200, background: bg, border: `7px solid ${color.ink}`, borderRadius: 24, boxShadow: ui.shadow(12), display: "flex", alignItems: "center", gap: 24, padding: "0 36px", fontFamily: font.family, fontWeight: 900, fontSize: 60, transform: `rotate(${(i - 1) * 3}deg)` }}>
                  <span style={{ fontSize: 80 }}>{e}</span>{t}
                  <span style={{ marginLeft: "auto", fontSize: 36, color: "#FF4D4F" }}>손으로 하나하나 😵</span>
                </div>
              </Pop>
            </Abs>
          ))}
          <Abs x={1380} y={430}><BossActor size={600} enter="walkR" enterAt={frame - b2} poses={[{ f: 0, pose: "typing", expression: "determined" }, { f: frame - t2, pose: "typing", expression: "worry" }, { f: frame - t3, pose: "facepalm", expression: "tired" }]} /></Abs>
        </Camera>
      </Beat>
      <Beat f={b3} len={100000} inT="zoom">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.4 }, { f: 10, zoom: 1.0 }, { f: 90, zoom: 1.08 }]} shake={impact(b3 - 16, 24)}>
          <DarkBg />
          <Abs x={330} y={240}>
            <Pop f={b3} from={{ scale: 0, rotate: -90 }}>
              <svg viewBox="-110 -110 220 220" width={440} height={440}>
                <circle r={100} fill="#fff" stroke={color.ink} strokeWidth={12} />
                <line x1={0} y1={0} x2={Math.sin(frame * 0.5) * 70} y2={-Math.cos(frame * 0.5) * 70} stroke={color.ink} strokeWidth={10} strokeLinecap="round" />
                <line x1={0} y1={0} x2={Math.sin(frame * 0.04) * 45} y2={-Math.cos(frame * 0.04) * 45} stroke="#FF4D4F" strokeWidth={12} strokeLinecap="round" />
              </svg>
            </Pop>
          </Abs>
          <Abs x={860} y={300}>
            <Pop f={b3 + 14} from={{ scale: 3 }}>
              <div style={{ fontFamily: font.family, fontWeight: 900, fontSize: 220, color: color.accent, WebkitTextStroke: `12px ${color.ink}`, paintOrder: "stroke fill", textShadow: `12px 12px 0 ${color.ink}`, letterSpacing: "-0.05em" }}>하루 2시간</div>
            </Pop>
            <KText f={b3 + 28} text="인터넷 창 일만" size={70} color={color.white} />
          </Abs>
          <Abs x={40} y={600}><ReactionBubble f={b3 + 20} expression="shock" size={400} bg="#FF8A8A" tilt={8} /></Abs>
        </Camera>
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S03 어사이드란? ───────── */
export const E2S03: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("말로 시키면", 3.4);
  const b3 = useCue("러버블이 가게 시스템", 7.2);
  const b4 = useCue("여러 사이트에서", 9.8);
  const cur = pathAt(b2 - 14, [[1500, 900], [560, 360], [560, 430], [560, 500], [560, 570], [880, 640]], 14);
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      <Beat f={b1} len={b1 - b2} inT="zoom" outT="whip">
        <Camera start={frame - b1} keys={[{ f: 0, zoom: 1.2 }, { f: 60, zoom: 1.0 }]}>
          <DarkBg />
          <Abs x={0} y={200} style={{ width: 1920, display: "flex", justifyContent: "center" }}><Pop f={b1} from={{ y: -300, scale: 0.4 }}><AsideBadge size={110} /></Pop></Abs>
          <Abs x={0} y={430} style={{ width: 1920, display: "flex", justifyContent: "center" }}><KText f={b1 + 8} text="인터넷 창을 자동화하는" size={84} color={color.white} /></Abs>
          <Abs x={0} y={560} style={{ width: 1920, display: "flex", justifyContent: "center", fontFamily: font.family, fontWeight: 900, fontSize: 130 }}>
            <MarkSweep f={b1 + 30} c={ASIDE_PURPLE}><KText f={b1 + 20} text="AI 브라우저" size={130} color={color.white} /></MarkSweep>
          </Abs>
          <Abs x={150} y={760}><BossActor size={300} enter="walkL" enterAt={frame - b1} poses={[{ f: 0, pose: "point", expression: "starstruck", tilt: -10, look: [4, -6] }]} /></Abs>
        </Camera>
      </Beat>
      <Beat f={b2} len={b2 - b3} inT="whip" outT="flip">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.0 }, { f: 90, zoom: 1.06, x: 30 }]}>
          <GridBg tone="light" cell={60} bleed />
          <Abs x={110} y={150}>
            <Pop f={b2} from={{ y: 400, rotateX: 50 }}>
              <AsideWindow w={1300} h={700} url="parcel.example.com" tab="택배 접수" prompt={<TypeText f={b2 + 4} text="오늘 보낼 물량 접수해줘" dur={20} />} status={b2 > 26 ? "알아서 클릭하고 입력 중…" : undefined}>
                <ParcelSite filled={Math.min(5, Math.floor(Math.max(0, b2 - 24) / 14))} done={b2 > 24 + 14 * 5 + 6} count={b2 > 24 + 14 * 5 + 6 ? 1 : 0} />
              </AsideWindow>
            </Pop>
          </Abs>
          {b2 > 14 && <AiCursor x={cur[0]} y={cur[1]} scale={1.2} />}
          <Abs x={1450} y={520}><BossActor size={480} enter="peekR" enterAt={frame - b2} poses={[{ f: 0, pose: "default", expression: "starstruck", look: [-6, 2] }, { f: frame - b2 + 50, pose: "clap", expression: "laugh" }]} /></Abs>
        </Camera>
      </Beat>
      <Beat f={b3} len={100000} inT="flip">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.05 }, { f: 140, zoom: 1.0 }]} shake={impact(b4 - 4, 14)}>
          <GridBg tone="light" cell={60} bleed />
          <Abs x={170} y={180}>
            <Pop f={b3} from={{ x: -400, rotate: -15 }}>
              <Card style={{ width: 720, padding: "44px 50px", transform: "rotate(-2deg)" }}>
                <LovableBadge size={56} />
                <div style={{ fontSize: 96, fontWeight: 900, marginTop: 24, letterSpacing: "-0.04em" }}>만들어주는 AI</div>
                <div style={{ fontSize: 42, fontWeight: 700, color: "#5A6378", marginTop: 10 }}>🛠 가게 시스템을 만든다</div>
              </Card>
            </Pop>
          </Abs>
          <Abs x={1000} y={210}>
            <Pop f={b4} from={{ x: 400, rotate: 15 }}>
              <Card bg="#F3EFFF" style={{ width: 760, padding: "44px 50px", transform: "rotate(2deg)" }}>
                <AsideBadge size={56} />
                <div style={{ fontSize: 96, fontWeight: 900, marginTop: 24, letterSpacing: "-0.04em" }}>대신 일하는 AI</div>
                <div style={{ fontSize: 42, fontWeight: 700, color: "#5A6378", marginTop: 10 }}>🧑‍💼 여러 사이트에서 일한다</div>
              </Card>
            </Pop>
          </Abs>
          <Abs x={1240} y={690}><Stamp f={b4 + 20} bg={ASIDE_PURPLE} size={96} rot={-6}>AI 직원!</Stamp></Abs>
          <Abs x={760} y={640}><BossActor size={380} enter="popUp" enterAt={frame - b4 + 18} poses={[{ f: 0, pose: "thumbsUp", expression: "wink" }]} /></Abs>
          <Abs x={840} y={420}><Pop f={b4 - 4} from={{ scale: 3 }}><div style={{ width: 150, height: 150, borderRadius: "50%", background: color.ink, color: color.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font.family, fontWeight: 900, fontSize: 70, border: `6px solid #fff` }}>VS</div></Pop></Abs>
        </Camera>
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S04 시작하기 + 비용 ───────── */
export const E2S04: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const s2 = useCue("사이트에 로그인", 2.5);
  const s3 = useCue("옆 채팅창에", 4.8);
  const b2 = useCue("비용도 부담", 6.6);
  const b3 = useCue("연결해서", 9.6);
  const steps: Array<[number, string, string]> = [[b1 + 2, "💾", "설치"], [s2, "🔐", "평소 사이트 로그인"], [s3, "💬", "말로 시키기"]];
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      <Beat f={b1} len={b1 - b2} inT="whip" outT="whipUp">
        <Camera start={frame - b1} keys={[{ f: 0, zoom: 1.1 }, { f: b1 - s3 + 30, zoom: 1.0 }]}>
          <GridBg tone="light" cell={60} bleed />
          <Abs x={140} y={110}><KText f={b1} text="시작은 간단해요" size={96} color={color.main} /></Abs>
          {steps.map(([f, e, t], i) => (
            <Abs key={t} x={140 + i * 560} y={360}>
              {/* 카드 뒤에서 빼꼼 나오는 미니 사장님 */}
              <Abs x={150} y={-200}>
                <BossActor size={250} enter="popUp" enterAt={frame - f + 10} poses={[{ f: 0, pose: (["typing", "thumbsUp", "point"] as const)[i], expression: (["determined", "wink", "talk"] as const)[i] }]} />
              </Abs>
              <Pop f={f} from={{ y: 300, scale: 0.3, rotate: -20 }}>
                <Card style={{ width: 500, height: 360, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
                  <div style={{ width: 90, height: 90, borderRadius: "50%", background: ASIDE_GRADIENT, border: `6px solid ${color.ink}`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 50, fontWeight: 900 }}>{i + 1}</div>
                  <div style={{ fontSize: 90 }}>{e}</div>
                  <div style={{ fontSize: 48, fontWeight: 900 }}>{t}</div>
                </Card>
              </Pop>
              {i < 2 && <Abs x={500} y={150}><Pop f={steps[i + 1][0] - 4} from={{ x: -40, scale: 0 }}><div style={{ fontSize: 70, fontWeight: 900, color: ASIDE_PURPLE }}>→</div></Pop></Abs>}
            </Abs>
          ))}
        </Camera>
      </Beat>
      <Beat f={b2} len={100000} inT="whipUp">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.0 }, { f: b2 - b3 + 10, zoom: 1.06 }]} shake={impact(b3 - 30, 22)}>
          <DarkBg />
          <Abs x={140} y={110}><KText f={b2} text="비용도 부담 없어요" size={84} color={color.white} /></Abs>
          {([["chatgpt", "ChatGPT 구독", 220], ["claude", "Claude 구독", 560]] as const).map(([id, t, y], i) => (
            <Abs key={t} x={170} y={y}><Pop f={b2 + 10 + i * 8} from={{ x: -300 }}><BrandBadge id={id} size={64} tone="solid" label={t} /></Pop></Abs>
          ))}
          <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
            {[300, 640].map((y, i) => (
              <path key={y} d={`M640,${y} C820,${y} 860,450 1060,450`} fill="none" stroke="#C4B5FD" strokeWidth={14} strokeLinecap="round" strokeDasharray={600} strokeDashoffset={lerp(b3 - i * 4, 0, 18, 600, 0)} />
            ))}
          </svg>
          <Abs x={1060} y={370}><Pop f={b3 + 10} from={{ scale: 0 }}><AsideBadge size={80} /></Pop></Abs>
          <Abs x={700} y={650}><Stamp f={b3 + 30} bg={color.accent} fg={color.ink} size={110} rot={-6}>추가 비용 0원</Stamp></Abs>
          <Confetti f={b3 + 32} x={1350} y={600} />
          <Abs x={1600} y={560}><BossActor size={500} enter="slideR" enterAt={frame - b2} poses={[{ f: 0, pose: "holdMug", expression: "smug", tilt: -6 }, { f: frame - b3 + 30, pose: "cheer", expression: "laugh" }]} hops={[frame - b3 + 32]} /></Abs>
        </Camera>
      </Beat>
    </AbsoluteFill>
  );
};

/** 실전 장면 공통: 제목 → 시킨 말 → 화면 작업 → 마무리 */
const TaskScene: React.FC<{
  n: string; label: string; emoji: React.ReactNode; url: string; brand?: "naverBlog" | "instagram"; tab: string; prompt: string;
  sTitle: string; sPrompt: string; sWork: string; sEnd: string; fb: [number, number, number, number];
  work: (f: number) => React.ReactNode; cursorPts: Array<[number, number]>;
  endPose: React.ComponentProps<typeof BossActor>["poses"][number]["pose"]; endFace: React.ComponentProps<typeof BossActor>["poses"][number]["expression"];
  end: (f: number) => React.ReactNode;
}> = (p) => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue(p.sPrompt, p.fb[1]);
  const b3 = useCue(p.sWork, p.fb[2]);
  const b4 = useCue(p.sEnd, p.fb[3]);
  const cur = pathAt(b3 - 6, p.cursorPts, 16);
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      <Camera start={0} keys={[{ f: 0, zoom: 1.15 }, { f: 18, zoom: 1.0 }, { f: frame - b3, zoom: 1.0 }, { f: frame - b3 + 20, zoom: 1.08, x: 40, y: 30 }, { f: frame - b4, zoom: 1.08, x: 40, y: 30 }, { f: frame - b4 + 16, zoom: 1.0, x: 0, y: 0 }]} shake={impact(b4 - 12, 14)}>
        <GridBg tone="light" cell={60} bleed />
        {p.brand && <div style={{ position: "absolute", left: -800, right: -800, top: -800, height: 1160, background: brandBg(p.brand), borderBottom: `10px solid ${color.ink}` }} />}
        <Abs x={110} y={60}><Section f={b1} n={p.n} label={p.label} emoji={p.emoji} /></Abs>
        <Abs x={110} y={220}>
          <Pop f={b1 + 8} from={{ y: 500, rotateX: 40 }}>
            <AsideWindow w={1340} h={720} url={p.url} tab={p.tab} prompt={b2 >= 0 ? <TypeText f={b2} text={p.prompt} dur={Math.min(40, p.prompt.length * 1.3)} /> : undefined} status={b3 >= 0 && b4 < 0 ? "알아서 작업 중…" : b4 >= 0 ? "완료! 확인해 주세요 ✓" : undefined}>
              {p.work(b3)}
            </AsideWindow>
          </Pop>
        </Abs>
        {b3 >= 0 && b4 < 10 && <AiCursor x={cur[0]} y={cur[1]} scale={1.15} />}
        <Abs x={1500} y={480}><BossActor size={500} enter={p.n === "1" ? "walkR" : "spin"} enterAt={frame - b1} poses={[{ f: 0, pose: "present", expression: "talk", look: [-6, 0] }, { f: frame - b3, pose: "relax", expression: "smug", tilt: -6 }, { f: frame - b4, pose: p.endPose, expression: p.endFace }]} hops={[frame - b4 + 4]} /></Abs>
        {b3 >= 20 && b4 < 0 && <Abs x={1560} y={300}><Pop f={b3 - 20} from={{ scale: 0 }}><div style={{ background: "#fff", border: `5px solid ${color.ink}`, borderRadius: 24, padding: "10px 22px", fontFamily: font.family, fontWeight: 900, fontSize: 34, boxShadow: ui.shadow(6) }}>전 쉬는 중 ☕</div></Pop></Abs>}
        {p.end(b4)}
      </Camera>
    </AbsoluteFill>
  );
};

/* ───────── S05 택배 ───────── */
export const E2S05: React.FC = () => (
  <TaskScene
    n="1" label="택배 발송" emoji="📦" brand={undefined} url="parcel.example.com" tab="택배 발송 접수" prompt="택배 사이트에 로그인해서, 오늘 보낼 물량 접수해줘."
    endPose="cheer" endFace="laugh"
    sTitle="첫 번째" sPrompt="택배 사이트에 로그인" sWork="이렇게 시키면" sEnd="귀찮던" fb={[0, 1.5, 5.5, 9.5]}
    work={(f) => <ParcelSite filled={Math.min(5, Math.floor(Math.max(0, f - 8) / 12))} done={f > 8 + 12 * 5 + 4} count={f > 8 + 12 * 5 + 4 ? Math.min(12, Math.floor((f - 72) / 4) + 1) : 0} />}
    cursorPts={[[1400, 900], [540, 420], [540, 490], [540, 560], [540, 630], [540, 700], [960, 780]]}
    end={(f) => (
      <>
        <Abs x={700} y={330}><Stamp f={f} bg="#22C55E" size={110} rot={-8}>📦 접수 끝!</Stamp></Abs>
        <Sparkles f={f} x={900} y={400} spread={400} />
      </>
    )}
  />
);

/* ───────── S06 블로그 ───────── */
const BLOG_BODY = "오늘 맡겨주신 운동화, 얼룩 하나 없이 새것처럼 돌아왔어요. 세탁 전후를 비교해 보세요!";
export const E2S06: React.FC = () => (
  <TaskScene
    n="2" label="네이버 블로그" emoji={<BrandIcon id="naver" size={64} />} brand="naverBlog" url="blog.naver.com/write" tab="블로그 글쓰기" prompt="오늘 세탁한 신발 사진으로 블로그 글 써서 올려줘."
    endPose="point" endFace="determined"
    sTitle="두 번째" sPrompt="오늘 세탁한 신발" sWork="블로그에 들어가서" sEnd="올리기 전에" fb={[0, 1.5, 5.5, 8.5]}
    work={(f) => <BlogEditor title="운동화 세탁 전후 비교 ✨" titleTyped={Math.floor(Math.max(0, f) * 0.9)} body={BLOG_BODY} typed={Math.floor(Math.max(0, f - 16) * 1.2)} photo={f > 40} />}
    cursorPts={[[1400, 900], [400, 400], [600, 520], [880, 560], [980, 360]]}
    end={(f) => (
      <>
        <Abs x={300 + Math.sin(f * 0.15) * 160} y={480}><Pop f={f} from={{ scale: 0 }}><div style={{ fontSize: 150 }}>🔍</div></Pop></Abs>
        <Abs x={760} y={300}><Stamp f={f + 14} bg={color.accent} fg={color.ink} size={90} rot={-6}>한 번 읽고 발행!</Stamp></Abs>
      </>
    )}
  />
);

/* ───────── S07 인스타 ───────── */
export const E2S07: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("블로그에 올린 내용으로", 1.5);
  const b3 = useCue("블로그에서 인스타로", 5.3);
  const b4 = useCue("홍보는 꾸준히", 8.8);
  const onInsta = b3 > 24;
  const cur = onInsta ? pathAt(b3 - 24, [[700, 330], [460, 600], [900, 560], [1080, 820]], 16) : pathAt(b3, [[900, 700], [560, 310], [700, 330]], 12);
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      <Beat f={b1} len={b1 - b4} inT="whip" outT="zoom">
        <Camera start={frame - b1} keys={[{ f: 0, zoom: 1.15 }, { f: 18, zoom: 1.0 }, { f: b1 - b3, zoom: 1.0 }, { f: b1 - b3 + 20, zoom: 1.06, x: 30 }]}>
          <GridBg tone="light" cell={60} bleed />
          <div style={{ position: "absolute", left: -800, right: -800, top: -800, height: 1160, background: onInsta ? brandBg("instagram") : brandBg("naverBlog"), borderBottom: `10px solid ${color.ink}` }} />
          <Abs x={110} y={60}><Section f={b1} n="3" label="인스타 피드" emoji={<BrandIcon id="instagram" size={64} />} /></Abs>
          <Abs x={110} y={220}>
            <Pop f={b1 + 8} from={{ y: 500, rotateX: 40 }}>
              <AsideWindow w={1340} h={720} url={onInsta ? "instagram.com/create" : "blog.naver.com"} tab={onInsta ? "새 게시물" : "블로그 (발행 완료)"} prompt={b2 >= 0 ? <TypeText f={b2} text="블로그에 올린 내용으로 인스타 피드도 올려줘." dur={36} /> : undefined} status={b3 >= 0 ? (onInsta ? "인스타로 이동해서 올리는 중…" : "블로그 내용 읽는 중…") : undefined}>
                <div style={{ position: "absolute", inset: 0, transform: onInsta ? `translateX(${lerp(b3 - 24, 0, 10, 100, 0)}%)` : undefined }}>
                  {onInsta ? (
                    <FeedPost step={b3 > 80 ? 2 : 1} caption="세탁 전후 비교 ✨ 새것처럼 돌아온 운동화! #신발세탁 #운동화세탁" typed={Math.floor(Math.max(0, b3 - 40) * 1.4)} />
                  ) : (
                    <BlogEditor title="운동화 세탁 전후 비교 ✨" body={BLOG_BODY} typed={999} photo />
                  )}
                </div>
              </AsideWindow>
            </Pop>
          </Abs>
          {b3 >= 0 && <AiCursor x={cur[0]} y={cur[1]} scale={1.15} />}
          {b3 >= 18 && b3 < 30 && <Abs x={420} y={250}><div style={{ fontSize: 80, fontWeight: 900, color: ASIDE_PURPLE, fontFamily: font.family, display: "flex", alignItems: "center", gap: 16 }}><BrandIcon id="naver" size={80} /> ➜ <BrandIcon id="instagram" size={80} /></div></Abs>}
          <Abs x={1500} y={480}><BossActor size={500} enter="peekR" enterAt={frame - b1} poses={[{ f: 0, pose: "point", expression: "talk" }, { f: frame - b3, pose: "holdMug", expression: "smug", tilt: 8 }]} /></Abs>
        </Camera>
      </Beat>
      <Beat f={b4} len={100000} inT="zoom">
        <Camera start={frame - b4} keys={[{ f: 0, zoom: 1.1 }, { f: 90, zoom: 1.0 }]}>
          <GridBg tone="light" cell={60} bleed />
          <Abs x={140} y={120}><KText f={b4} text="홍보는 꾸준히!" size={100} color={color.main} /></Abs>
          <Abs x={140} y={300}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 150px)", gap: 16 }}>
              {["월", "화", "수", "목", "금", "토", "일"].map((d, i) => (
                <Pop key={d} f={b4 + 6 + i * 5} from={{ y: 100, scale: 0.4 }}>
                  <div style={{ height: 190, background: "#fff", border: `6px solid ${color.ink}`, borderRadius: 22, boxShadow: ui.shadow(7), display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: font.family, fontWeight: 900, gap: 8 }}>
                    <div style={{ fontSize: 40 }}>{d}</div>
                    <div style={{ width: 70, height: 70, borderRadius: 18, background: b4 > 14 + i * 5 ? "#22C55E" : "#E5E9F0", border: `5px solid ${color.ink}`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 40 }}>{b4 > 14 + i * 5 ? "✓" : ""}</div>
                  </div>
                </Pop>
              ))}
            </div>
          </Abs>
          <Abs x={300} y={620}><Stamp f={b4 + 50} bg={color.accent} fg={color.ink} size={100} rot={-5}>이제 미룰 일 없음!</Stamp></Abs>
          <Abs x={1440} y={420}><BossActor size={580} enter="jump" enterAt={frame - b4} poses={[{ f: 0, pose: "clap", expression: "laugh" }, { f: frame - b4 + 50, pose: "cheer", expression: "starstruck" }]} hops={[frame - b4 + 50, frame - b4 + 70]} /></Abs>
        </Camera>
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S08 솔직 결산 ───────── */
export const E2S08: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("알아서 사이트를", 3.4);
  const b3 = useCue("아쉬운 점이요", 7.0);
  const b4 = useCue("하나만 기억하세요", 8.9);
  const mins = Math.round(lerp(b1 - 10, 0, 30, 120, 5));
  const sites: Array<[number, number, React.ReactNode]> = [[420, 420, "📦"], [960, 300, <BrandIcon key="n" id="naver" size={150} />], [1500, 420, <BrandIcon key="i" id="instagram" size={150} />]];
  const hop = Math.floor(Math.max(0, b2) / 14) % 3;
  const nxt = (hop + 1) % 3;
  const p = (Math.max(0, b2) % 14) / 14;
  const cx = sites[hop][0] + (sites[nxt][0] - sites[hop][0]) * easeInOut(Math.min(1, p * 1.4));
  const cy = sites[hop][1] + (sites[nxt][1] - sites[hop][1]) * easeInOut(Math.min(1, p * 1.4)) - Math.sin(p * Math.PI) * 120;
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      <Beat f={b1} len={b1 - b2} inT="zoom" outT="whip">
        <Camera start={frame - b1} keys={[{ f: 0, zoom: 1.2 }, { f: 40, zoom: 1.0 }]} shake={impact(b1 - 42, 24)}>
          <DarkBg />
          <Abs x={0} y={170} style={{ width: 1920, display: "flex", justifyContent: "center" }}><KText f={b1} text="하루 인터넷 창 일" size={80} color={color.white} /></Abs>
          <Abs x={0} y={320} style={{ width: 1920, display: "flex", justifyContent: "center" }}>
            <div style={{ fontFamily: font.family, fontWeight: 900, fontSize: 280, letterSpacing: "-0.05em", color: mins <= 5 ? color.accent : "#fff", WebkitTextStroke: `14px ${color.ink}`, paintOrder: "stroke fill", textShadow: `14px 14px 0 ${color.ink}` }}>
              {mins >= 60 ? `${Math.floor(mins / 60)}시간 ${mins % 60 ? `${mins % 60}분` : ""}` : `${mins}분`}
            </div>
          </Abs>
          <Burst f={b1 - 42} x={960} y={480} r={320} />
          {b1 < 42 ? <Abs x={80} y={600}><ReactionBubble f={b1 - 2} expression="tired" size={360} bg="#C4B5FD" tilt={-8} /></Abs> : <Abs x={1440} y={560}><ReactionBubble f={b1 - 42} expression="starstruck" size={400} tilt={8} /></Abs>}
          <Confetti f={b1 - 42} x={960} y={300} n={50} />
        </Camera>
      </Beat>
      <Beat f={b2} len={b2 - b3} inT="whip" outT="zoom">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.0 }]}>
          <GridBg tone="light" cell={60} bleed />
          <Abs x={0} y={120} style={{ width: 1920, display: "flex", justifyContent: "center" }}><KText f={b2} text="알아서 사이트를 옮겨 다녀요" size={80} /></Abs>
          {sites.map(([x, y, e], i) => <Abs key={i} x={x - 130} y={y}><Pop f={b2 + 4 + i * 5} from={{ scale: 0 }}><Card style={{ width: 260, height: 220, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 120 }}>{e}</Card></Pop></Abs>)}
          {b2 > 10 && <AiCursor x={cx} y={cy + 120} scale={1.3} />}
          <Abs x={1560} y={560}><BossActor size={400} enter="walkR" enterAt={frame - b2} poses={[{ f: 0, pose: "relax", expression: "smug", tilt: -8 }]} /></Abs>
          <Abs x={760} y={700}><Stamp f={b2 + 30} bg={ASIDE_PURPLE} size={80} rot={-4}>귀찮은 일은 맡기기!</Stamp></Abs>
        </Camera>
      </Beat>
      <Beat f={b3} len={b3 - b4} inT="zoom" outT="whip">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.1 }, { f: 40, zoom: 1.0 }]} shake={impact(b3 - 16, 20)}>
          <GridBg tone="light" cell={60} bleed />
          <Abs x={160} y={200}><KText f={b3} text="아쉬운 점?" size={130} /></Abs>
          <Abs x={760} y={430}><Stamp f={b3 + 16} bg={color.accent} fg={color.ink} size={140} rot={-6}>아직 없어요!</Stamp></Abs>
          <Abs x={1440} y={300}><BossActor size={640} enter="slideR" enterAt={frame - b3} poses={[{ f: 0, pose: "think", tilt: 10, look: [5, -5] }, { f: frame - b3 + 16, pose: "shrug", expression: "laugh" }]} hops={[frame - b3 + 16]} /></Abs>
        </Camera>
      </Beat>
      <Beat f={b4} len={100000} inT="whip">
        <Camera start={frame - b4} keys={[{ f: 0, zoom: 1.08 }, { f: 120, zoom: 1.0 }]} shake={impact(b4 - 40, 16)}>
          <div style={{ position: "absolute", inset: -600, background: "#FFF7D6" }} />
          <AbsoluteFill style={{ background: "repeating-linear-gradient(-45deg, #FACC15 0 40px, #1B2541 40px 80px)", height: 70, top: 0, bottom: "auto" }} />
          <AbsoluteFill style={{ background: "repeating-linear-gradient(-45deg, #FACC15 0 40px, #1B2541 40px 80px)", height: 70, top: "auto", bottom: 0 }} />
          <Abs x={160} y={160}><KText f={b4} text="하나만 기억하세요" size={90} /></Abs>
          <Abs x={160} y={330}>
            <Pop f={b4 + 10} from={{ y: 200, scale: 0.4 }}>
              <Card style={{ width: 1100, padding: "40px 50px" }}>
                <div style={{ fontSize: 64, fontWeight: 900, display: "flex", gap: 20, alignItems: "center" }}>🛡 글 올리기 · 돈 드는 일은</div>
                <div style={{ fontSize: 100, fontWeight: 900, marginTop: 12 }}><MarkSweep f={b4 + 30}>직접 확인하고 클릭!</MarkSweep></div>
              </Card>
            </Pop>
          </Abs>
          <Cursor f={b4 + 40} from={[1500, 950]} to={[1160, 560]} click={18} />
          <Abs x={1400} y={420}><BossActor size={560} enter="popUp" enterAt={frame - b4} poses={[{ f: 0, pose: "point", expression: "determined" }]} /></Abs>
        </Camera>
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S09 엔딩 ───────── */
export const E2S09: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("다음 실험은", 4.4);
  const b3 = useCue("구독하고", 8.0);
  const ideas = ["예약 확인", "재고 정리", "리뷰 답글", "거래처 주문"];
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.main }}>
      <Beat f={b1} len={b1 - b2} inT="whip" outT="flip">
        <Camera start={frame - b1} keys={[{ f: 0, zoom: 1.1 }, { f: 100, zoom: 1.0 }]}>
          <GridBg tone="light" cell={60} bleed />
          <Abs x={0} y={110} style={{ width: 1920, display: "flex", justifyContent: "center" }}><KText f={b1} text="AI 직원한테 맡기고 싶은 일은?" size={84} /></Abs>
          <Abs x={760} y={300}><Pop f={b1 + 6} from={{ scale: 0 }}><Card bg="#F3EFFF" style={{ padding: "26px 44px", textAlign: "center" }}><div style={{ fontSize: 34, fontWeight: 800, color: ASIDE_PURPLE }}>NAME TAG</div><div style={{ fontSize: 70, fontWeight: 900 }}>🧑‍💼 AI 직원</div></Card></Pop></Abs>
          {ideas.map((t, i) => (
            <Abs key={t} x={520 + i * 340} y={600 + floatY(frame, 10, 0.1, i)}>
              <Pop f={b1 + 20 + i * 8} from={{ y: 200, scale: 0.3 }}>
                <div style={{ background: "#fff", border: `6px solid ${color.ink}`, borderRadius: 26, padding: "18px 30px", fontFamily: font.family, fontWeight: 800, fontSize: 44, boxShadow: ui.shadow(8) }}>💬 {t}?</div>
              </Pop>
            </Abs>
          ))}
          <Abs x={40} y={330}><BossActor size={460} enter="peekL" enterAt={frame - b1} poses={[{ f: 0, pose: "think", expression: "think", tilt: 12 }]} /></Abs>
        </Camera>
      </Beat>
      <Beat f={b2} len={100000} inT="flip">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.1 }, { f: 120, zoom: 1.0 }]} shake={impact(b3 - 10, 14)}>
          <GridBg tone="navy" cell={60} bleed />
          <Abs x={110} y={110}><KText f={b2} text="다음 실험 예고" size={70} color={color.white} /></Abs>
          <Abs x={110} y={240}>
            <Pop f={b2 + 8} from={{ rotateY: 180, scale: 0.6 }}>
              <Card style={{ width: 1060, padding: "44px 56px" }}>
                <div style={{ fontSize: 46, fontWeight: 900, color: color.point }}>🧪 실험 #003</div>
                <div style={{ fontSize: 92, fontWeight: 900, letterSpacing: "-0.05em", marginTop: 8, lineHeight: 1.15 }}>가게 사장님이 <MarkSweep f={b2 + 30}>AI를 쓰면</MarkSweep><br />달라지는 점</div>
              </Card>
            </Pop>
          </Abs>
          <Abs x={140} y={760}>
            <div style={{ display: "flex", gap: 30, alignItems: "center" }}>
              <Pop f={b3} from={{ scale: 0 }}>
                <div style={{ background: b3 > 22 ? "#606060" : "#FF0033", color: "#fff", border: `7px solid ${color.ink}`, borderRadius: 999, padding: "22px 60px", fontFamily: font.family, fontWeight: 900, fontSize: 64, boxShadow: ui.shadow(9), transform: `scale(${b3 > 18 && b3 < 24 ? 0.9 : 1})` }}>{b3 > 22 ? "구독중 ✓" : "구독"}</div>
              </Pop>
              <Pop f={b3 + 26} from={{ scale: 0, rotate: -40 }}><div style={{ fontSize: 110, transform: `rotate(${b3 > 26 ? Math.sin(b3 * 1.2) * 20 * Math.exp(-(b3 - 26) / 20) : 0}deg)` }}>🔔</div></Pop>
            </div>
          </Abs>
          <Cursor f={b3 - 4} from={[900, 1050]} to={[330, 830]} click={20} />
          <Confetti f={b3 + 24} x={400} y={760} />
          <Abs x={1260} y={260}><BossActor size={760} enter="jump" enterAt={frame - b2 + 6} poses={[{ f: 0, pose: "present", expression: "talk", look: [-6, 0] }, { f: frame - b3, pose: "wave", expression: "joy" }]} hops={[frame - b3 + 22]} /></Abs>
          <Abs x={1300} y={90}><Pop f={b3 + 30} from={{ y: -100, scale: 0.4 }}><Wordmark size={46} tone="navy" /></Pop></Abs>
        </Camera>
      </Beat>
    </AbsoluteFill>
  );
};
